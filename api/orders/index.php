<?php
/**
 * API Commandes
 * GET    /api/orders/              - Liste toutes les commandes (admin)
 * GET    /api/orders/?id=X         - Une commande specifique
 * GET    /api/orders/?tracking=X&email=Y - Suivi commande (client)
 * POST   /api/orders/              - Creer une commande
 * PUT    /api/orders/              - Mettre a jour le statut (admin)
 */

require_once '../config/database.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getOrders();
        break;
    case 'POST':
        createOrder();
        break;
    case 'PUT':
        requireAdmin();
        updateOrder();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getOrders() {
    global $db;

    $id = $_GET['id'] ?? null;
    $tracking = $_GET['tracking'] ?? null;
    $email = $_GET['email'] ?? null;

    // Suivi par tracking code + email (client)
    if ($tracking && $email) {
        $stmt = $db->prepare("
            SELECT o.*,
                   GROUP_CONCAT(CONCAT(oi.product_name, '|', oi.product_subtitle, '|', oi.product_image, '|', oi.price, '|', oi.quantity) SEPARATOR ';;') as items_raw
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE o.tracking_code = ? AND LOWER(o.customer_email) = LOWER(?)
            GROUP BY o.id
        ");
        $stmt->execute([$tracking, $email]);
        $order = $stmt->fetch();

        if (!$order) {
            jsonResponse(['error' => 'Commande non trouvee'], 404);
        }

        // Parser les items
        $order['items'] = parseOrderItems($order['items_raw']);
        unset($order['items_raw']);

        // Recuperer l'historique des statuts
        $stmt = $db->prepare("SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at");
        $stmt->execute([$order['id']]);
        $order['status_history'] = $stmt->fetchAll();

        // Recuperer les messages
        $stmt = $db->prepare("SELECT * FROM order_messages WHERE order_id = ? ORDER BY created_at");
        $stmt->execute([$order['id']]);
        $order['messages'] = $stmt->fetchAll();

        jsonResponse($order);
    }

    // Commande par ID (admin)
    if ($id) {
        requireAdmin();
        $stmt = $db->prepare("
            SELECT o.*
            FROM orders o
            WHERE o.id = ?
        ");
        $stmt->execute([$id]);
        $order = $stmt->fetch();

        if (!$order) {
            jsonResponse(['error' => 'Commande non trouvee'], 404);
        }

        // Recuperer les items
        $stmt = $db->prepare("SELECT * FROM order_items WHERE order_id = ?");
        $stmt->execute([$id]);
        $order['items'] = $stmt->fetchAll();

        // Recuperer l'historique
        $stmt = $db->prepare("SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at");
        $stmt->execute([$id]);
        $order['status_history'] = $stmt->fetchAll();

        // Recuperer les messages
        $stmt = $db->prepare("SELECT * FROM order_messages WHERE order_id = ? ORDER BY created_at");
        $stmt->execute([$id]);
        $order['messages'] = $stmt->fetchAll();

        jsonResponse($order);
    }

    // Liste de toutes les commandes (admin)
    requireAdmin();

    $stmt = $db->query("
        SELECT o.*,
               (SELECT COUNT(*) FROM order_messages WHERE order_id = o.id AND sender = 'customer' AND is_read = 0) as unread_messages
        FROM orders o
        ORDER BY o.created_at DESC
    ");
    $orders = $stmt->fetchAll();

    // Recuperer les items pour chaque commande
    foreach ($orders as &$order) {
        $stmt = $db->prepare("SELECT * FROM order_items WHERE order_id = ?");
        $stmt->execute([$order['id']]);
        $order['items'] = $stmt->fetchAll();
    }

    jsonResponse($orders);
}

function parseOrderItems($raw) {
    if (empty($raw)) return [];

    $items = [];
    $rawItems = explode(';;', $raw);

    foreach ($rawItems as $rawItem) {
        $parts = explode('|', $rawItem);
        if (count($parts) >= 5) {
            $items[] = [
                'name' => $parts[0],
                'subtitle' => $parts[1] ?: null,
                'image' => $parts[2],
                'price' => floatval($parts[3]),
                'quantity' => intval($parts[4])
            ];
        }
    }

    return $items;
}

function createOrder() {
    global $db;

    $data = getJsonInput();

    // Validation
    $required = ['customer', 'items'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            jsonResponse(['error' => "Le champ $field est requis"], 400);
        }
    }

    $customer = $data['customer'];
    $items = $data['items'];

    // Generer le code de suivi
    $trackingCode = generateTrackingCode();

    // Calculer le numero de facture
    $stmt = $db->query("SELECT COUNT(*) as count FROM orders");
    $count = $stmt->fetch()['count'];
    $invoiceNumber = 'GV-' . date('Y') . '-' . str_pad($count + 1, 4, '0', STR_PAD_LEFT);

    // Inserer la commande
    $stmt = $db->prepare("
        INSERT INTO orders (
            tracking_code, invoice_number, customer_email, customer_first_name, customer_last_name,
            customer_phone, customer_address, customer_city, customer_postal_code, customer_country,
            subtotal, shipping_cost, shipping_method, promo_code, promo_discount, total,
            status, payment_method, payment_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, 'paid')
    ");

    $stmt->execute([
        $trackingCode,
        $invoiceNumber,
        $customer['email'],
        $customer['firstName'],
        $customer['lastName'],
        $customer['phone'] ?? null,
        $customer['address'] ?? null,
        $customer['city'] ?? null,
        $customer['postalCode'] ?? null,
        $customer['country'] ?? 'France',
        floatval($data['subtotal'] ?? 0),
        floatval($data['shippingCost'] ?? 0),
        $data['shippingMethod'] ?? null,
        $data['promoCode'] ?? null,
        floatval($data['promoDiscount'] ?? 0),
        floatval($data['total'] ?? 0),
        $data['paymentMethod'] ?? 'Carte bancaire'
    ]);

    $orderId = $db->lastInsertId();

    // Inserer les items
    $stmtItem = $db->prepare("
        INSERT INTO order_items (order_id, product_id, product_name, product_subtitle, product_image, price, quantity)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    foreach ($items as $item) {
        $stmtItem->execute([
            $orderId,
            $item['id'] ?? null,
            $item['name'],
            $item['subtitle'] ?? null,
            $item['image'] ?? null,
            floatval($item['price']),
            intval($item['quantity'])
        ]);

        // Mettre a jour le stock
        if (!empty($item['id'])) {
            $db->prepare("UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?")
               ->execute([intval($item['quantity']), $item['id'], intval($item['quantity'])]);
        }
    }

    // Ajouter l'historique du statut
    $db->prepare("INSERT INTO order_status_history (order_id, status, note) VALUES (?, 'pending', 'Commande recue')")
       ->execute([$orderId]);

    // Log email
    $db->prepare("INSERT INTO email_logs (type, recipient, subject, preview) VALUES (?, ?, ?, ?)")
       ->execute([
           'order_confirmation',
           $customer['email'],
           "Confirmation de votre commande #$trackingCode",
           "Merci pour votre commande ! Votre numero de suivi : $trackingCode"
       ]);

    jsonResponse([
        'success' => true,
        'trackingCode' => $trackingCode,
        'invoiceNumber' => $invoiceNumber,
        'orderId' => $orderId
    ], 201);
}

function updateOrder() {
    global $db;

    $data = getJsonInput();

    if (empty($data['id'])) {
        jsonResponse(['error' => 'ID de la commande requis'], 400);
    }

    // Recuperer la commande actuelle
    $stmt = $db->prepare("SELECT * FROM orders WHERE id = ?");
    $stmt->execute([$data['id']]);
    $order = $stmt->fetch();

    if (!$order) {
        jsonResponse(['error' => 'Commande non trouvee'], 404);
    }

    // Mise a jour du statut
    if (isset($data['status'])) {
        $stmt = $db->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->execute([$data['status'], $data['id']]);

        // Ajouter a l'historique
        $note = $data['note'] ?? ('Statut: ' . $data['status']);
        $db->prepare("INSERT INTO order_status_history (order_id, status, note) VALUES (?, ?, ?)")
           ->execute([$data['id'], $data['status'], $note]);

        // Log email si expedition
        if ($data['status'] === 'shipped') {
            $db->prepare("INSERT INTO email_logs (type, recipient, subject, preview) VALUES (?, ?, ?, ?)")
               ->execute([
                   'order_shipped',
                   $order['customer_email'],
                   "Votre commande #{$order['tracking_code']} a ete expediee",
                   "Bonne nouvelle ! Votre colis est en route."
               ]);
        }
    }

    jsonResponse(['success' => true, 'message' => 'Commande mise a jour']);
}
