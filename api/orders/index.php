<?php
/**
 * API Commandes
 * GET    /api/orders/              - Liste toutes les commandes (admin)
 * GET    /api/orders/?id=X         - Une commande specifique
 * GET    /api/orders/?tracking=X&email=Y - Suivi commande (client)
 * POST   /api/orders/              - Creer une commande
 * POST   /api/orders/?action=message       - Envoyer un message sur une commande
 * PUT    /api/orders/              - Mettre a jour le statut (admin)
 * PUT    /api/orders/?action=read-messages - Marquer les messages comme lus
 */

require_once '../config/database.php';
require_once '../config/email.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

switch ($method) {
    case 'GET':
        getOrders();
        break;
    case 'POST':
        if ($action === 'message') {
            addOrderMessage();
        } else {
            checkRateLimit('create_order', 5, 600);
            createOrder();
        }
        break;
    case 'PUT':
        if ($action === 'read-messages') {
            markMessagesRead();
        } else {
            requireAdmin();
            updateOrder();
        }
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
        // Augmenter la limite GROUP_CONCAT pour les commandes avec beaucoup d'articles
        $db->exec("SET SESSION group_concat_max_len = 65535");

        // COALESCE: evite que CONCAT retourne NULL si un champ est NULL
        $stmt = $db->prepare("
            SELECT o.*,
                   GROUP_CONCAT(CONCAT(oi.product_name, '|', COALESCE(oi.product_subtitle, ''), '|', COALESCE(oi.product_image, ''), '|', oi.price, '|', oi.quantity) SEPARATOR ';;') as items_raw
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

    // Liste de toutes les commandes (admin seulement)
    requireAdmin();

    $stmt = $db->query("
        SELECT o.*,
               (SELECT COUNT(*) FROM order_messages WHERE order_id = o.id AND sender = 'customer' AND is_read = 0) as unread_messages
        FROM orders o
        ORDER BY o.created_at DESC
    ");
    $orders = $stmt->fetchAll();

    // Recuperer tous les items en une seule requete (fix N+1)
    if (!empty($orders)) {
        $orderIds = array_column($orders, 'id');
        $placeholders = implode(',', array_fill(0, count($orderIds), '?'));
        $stmt = $db->prepare("SELECT * FROM order_items WHERE order_id IN ($placeholders)");
        $stmt->execute($orderIds);
        $allItems = $stmt->fetchAll();

        // Grouper les items par order_id
        $itemsByOrder = [];
        foreach ($allItems as $item) {
            $itemsByOrder[$item['order_id']][] = $item;
        }

        foreach ($orders as &$order) {
            $order['items'] = $itemsByOrder[$order['id']] ?? [];
        }
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

    // Validation des champs client
    $email = trim($customer['email'] ?? '');
    $firstName = trim($customer['firstName'] ?? '');
    $lastName = trim($customer['lastName'] ?? '');

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['error' => 'Email invalide'], 400);
    }

    if (empty($firstName) || empty($lastName)) {
        jsonResponse(['error' => 'Prenom et nom requis'], 400);
    }

    if (!is_array($items) || count($items) === 0) {
        jsonResponse(['error' => 'Le panier est vide'], 400);
    }

    foreach ($items as $item) {
        if (empty($item['name']) || intval($item['quantity'] ?? 0) < 1) {
            jsonResponse(['error' => 'Chaque article doit avoir un nom et une quantite valide'], 400);
        }
    }

    // Recalculer les prix cote serveur depuis la table products
    // (ne jamais faire confiance aux montants envoyes par le client)
    $orderItems = [];
    $subtotalBrut = 0;
    $stmtProduct = $db->prepare("SELECT id, name, subtitle, image, price, stock FROM products WHERE id = ? AND active = 1");

    foreach ($items as $item) {
        $productId = intval($item['product_id'] ?? $item['id'] ?? 0);
        $qty = intval($item['quantity']);

        $stmtProduct->execute([$productId]);
        $product = $stmtProduct->fetch();

        if (!$product) {
            jsonResponse(['error' => 'Produit invalide ou inactif (id: ' . $productId . ')'], 400);
        }

        if ($product['stock'] < $qty) {
            jsonResponse(['error' => 'Stock insuffisant pour: ' . $product['name'] . ' (stock: ' . $product['stock'] . ', demande: ' . $qty . ')'], 400);
        }

        $price = floatval($product['price']);
        $subtotalBrut += $price * $qty;

        $orderItems[] = [
            'product_id' => $product['id'],
            'name' => $product['name'],
            'subtitle' => $product['subtitle'],
            'image' => $product['image'],
            'price' => $price,
            'quantity' => $qty
        ];
    }

    // Revalider le code promo cote serveur et recalculer la remise
    $promoId = null;
    $promoCode = null;
    $promoDiscount = 0;

    if (!empty($data['promoCode'])) {
        $stmt = $db->prepare("SELECT * FROM promos WHERE UPPER(code) = UPPER(?) AND active = 1");
        $stmt->execute([trim($data['promoCode'])]);
        $promo = $stmt->fetch();

        if (!$promo) {
            jsonResponse(['error' => 'Code promo invalide'], 400);
        }

        if ($promo['usage_count'] >= $promo['max_usage']) {
            jsonResponse(['error' => 'Code promo expire'], 400);
        }

        if ($subtotalBrut < floatval($promo['min_order'])) {
            jsonResponse(['error' => 'Commande minimum de ' . $promo['min_order'] . ' EUR requise pour ce code promo'], 400);
        }

        $promoId = $promo['id'];
        $promoCode = $promo['code'];
        if ($promo['type'] === 'percent') {
            $promoDiscount = round($subtotalBrut * floatval($promo['discount']) / 100, 2);
        } else {
            $promoDiscount = min(floatval($promo['discount']), $subtotalBrut);
        }
    }

    $subtotal = round($subtotalBrut - $promoDiscount, 2);

    // Recalculer les frais de port cote serveur depuis shipping_options
    $shippingMethod = trim($data['shippingMethod'] ?? '');
    $shippingCost = 0;

    if ($shippingMethod !== '' && $shippingMethod !== 'Non specifie') {
        $stmt = $db->prepare("SELECT * FROM shipping_options WHERE name = ? AND active = 1");
        $stmt->execute([$shippingMethod]);
        $option = $stmt->fetch();

        if (!$option) {
            jsonResponse(['error' => 'Mode de livraison invalide'], 400);
        }

        if (($option['min_order'] !== null && $subtotalBrut < floatval($option['min_order']))
            || ($option['max_order'] !== null && $subtotalBrut > floatval($option['max_order']))) {
            jsonResponse(['error' => 'Mode de livraison indisponible pour ce montant de commande'], 400);
        }

        // Gratuit au-dessus du seuil (calcule sur le panier avant remise, comme la boutique)
        $shippingCost = ($option['free_above'] !== null && $subtotalBrut >= floatval($option['free_above']))
            ? 0
            : floatval($option['price']);
    }

    $total = round($subtotal + $shippingCost, 2);

    // Detecter si le client est connecte pour lier customer_id
    $customerId = null;
    $token = getTokenFromHeader();
    if ($token) {
        $payload = verifyToken($token, 'customer');
        if ($payload) {
            $customerId = intval($payload['uid']);
        }
    }

    // Generer le code de suivi
    $trackingCode = generateTrackingCode();

    // Creation complete dans une transaction (commande + items + stock + historique + promo)
    try {
        $db->beginTransaction();

        // Inserer la commande (le numero de facture est attribue apres insertion)
        $stmt = $db->prepare("
            INSERT INTO orders (
                tracking_code, invoice_number, customer_id, customer_email, customer_first_name, customer_last_name,
                customer_phone, customer_address, customer_city, customer_postal_code, customer_country,
                subtotal, shipping_cost, shipping_method, promo_code, promo_discount, total,
                status, payment_method, payment_status
            ) VALUES (?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, 'pending')
        ");
        // payment_status = 'pending' : aucun prestataire de paiement n'est
        // branche pour l'instant. Marquer la commande comme payee ici
        // enregistrerait un encaissement qui n'a jamais eu lieu.
        // Quand le paiement en ligne sera actif, c'est le webhook du
        // prestataire qui devra passer ce champ a 'paid'.

        $stmt->execute([
            $trackingCode,
            $customerId,
            $email,
            $firstName,
            $lastName,
            $customer['phone'] ?? null,
            $customer['address'] ?? null,
            $customer['city'] ?? null,
            $customer['postalCode'] ?? null,
            $customer['country'] ?? 'France',
            $subtotal,
            $shippingCost,
            $shippingMethod ?: null,
            $promoCode,
            $promoDiscount,
            $total,
            $data['paymentMethod'] ?? 'Carte bancaire'
        ]);

        $orderId = $db->lastInsertId();

        // Numero de facture base sur l'id auto-incremente (pas de doublon possible)
        $invoiceNumber = 'GV-' . date('Y') . '-' . str_pad($orderId, 4, '0', STR_PAD_LEFT);
        $db->prepare("UPDATE orders SET invoice_number = ? WHERE id = ?")
           ->execute([$invoiceNumber, $orderId]);

        // Inserer les items et mettre a jour le stock de facon atomique
        $stmtItem = $db->prepare("
            INSERT INTO order_items (order_id, product_id, product_name, product_subtitle, product_image, price, quantity)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");

        $stmtStock = $db->prepare("UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?");

        foreach ($orderItems as $item) {
            $stmtItem->execute([
                $orderId,
                $item['product_id'],
                $item['name'],
                $item['subtitle'],
                $item['image'],
                $item['price'],
                $item['quantity']
            ]);

            // Mettre a jour le stock ; en cas d'echec (race condition), tout annuler
            $stmtStock->execute([$item['quantity'], $item['product_id'], $item['quantity']]);
            if ($stmtStock->rowCount() === 0) {
                throw new Exception('Stock insuffisant pour: ' . $item['name']);
            }
        }

        // Ajouter l'historique du statut
        $db->prepare("INSERT INTO order_status_history (order_id, status, note) VALUES (?, 'pending', 'Commande recue')")
           ->execute([$orderId]);

        // Incrementer le compteur d'utilisation du code promo
        if ($promoId) {
            $db->prepare("UPDATE promos SET usage_count = usage_count + 1 WHERE id = ?")
               ->execute([$promoId]);
        }

        $db->commit();
    } catch (Exception $e) {
        if ($db->inTransaction()) {
            $db->rollBack();
        }
        if (strpos($e->getMessage(), 'Stock insuffisant') === 0) {
            jsonResponse(['error' => $e->getMessage()], 400);
        }
        error_log('Erreur creation commande: ' . $e->getMessage());
        jsonResponse(['error' => 'Erreur lors de la creation de la commande'], 500);
    }

    // Envoyer les emails (apres le commit pour ne pas bloquer la transaction)
    $orderData = [
        'tracking_code' => $trackingCode,
        'invoice_number' => $invoiceNumber,
        'total' => $total,
        'subtotal' => $subtotal,
        'shipping_cost' => $shippingCost,
        'shipping_method' => $shippingMethod ?: null,
        'promo_code' => $promoCode,
        'promo_discount' => $promoDiscount
    ];

    // Email de confirmation au client
    sendOrderConfirmation($orderData, $orderItems, $customer);

    // Notification admin
    sendAdminOrderNotification($orderData, $orderItems, $customer);

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
        // Valider le statut contre l'ENUM de la table orders
        $allowedStatuses = ['pending', 'confirmed', 'crafting', 'quality', 'packing', 'shipped', 'delivered', 'cancelled'];
        if (!in_array($data['status'], $allowedStatuses, true)) {
            jsonResponse(['error' => 'Statut invalide'], 400);
        }

        $newStatus = $data['status'];
        $note = $data['note'] ?? ('Statut: ' . $newStatus);

        // Une commande deja annulee ne peut pas etre relancee : le stock a ete
        // remis en rayon et a pu etre vendu entre-temps.
        if ($order['status'] === 'cancelled' && $newStatus !== 'cancelled') {
            jsonResponse(['error' => 'Une commande annulee ne peut pas etre reactivee. Creez une nouvelle commande.'], 400);
        }

        // Annulation : remettre le stock en rayon et liberer le code promo.
        // La condition sur le statut precedent rend l'operation idempotente
        // (annuler deux fois ne credite pas le stock deux fois).
        if ($newStatus === 'cancelled' && $order['status'] !== 'cancelled') {
            try {
                $db->beginTransaction();

                $stmt = $db->prepare("SELECT product_id, quantity FROM order_items WHERE order_id = ? AND product_id IS NOT NULL");
                $stmt->execute([$order['id']]);
                $stmtRestore = $db->prepare("UPDATE products SET stock = stock + ? WHERE id = ?");
                foreach ($stmt->fetchAll() as $item) {
                    $stmtRestore->execute([intval($item['quantity']), intval($item['product_id'])]);
                }

                // Rendre une utilisation au code promo
                if (!empty($order['promo_code'])) {
                    $db->prepare("UPDATE promos SET usage_count = GREATEST(usage_count - 1, 0) WHERE UPPER(code) = UPPER(?)")
                       ->execute([$order['promo_code']]);
                }

                $db->prepare("UPDATE orders SET status = 'cancelled' WHERE id = ?")->execute([$order['id']]);
                $db->prepare("INSERT INTO order_status_history (order_id, status, note) VALUES (?, 'cancelled', ?)")
                   ->execute([$order['id'], $note]);

                $db->commit();
            } catch (Exception $e) {
                if ($db->inTransaction()) {
                    $db->rollBack();
                }
                error_log('Erreur annulation commande: ' . $e->getMessage());
                jsonResponse(['error' => "Erreur lors de l'annulation de la commande"], 500);
            }

            jsonResponse(['success' => true, 'message' => 'Commande annulee, stock restitue']);
        }

        // Deja annulee : ne rien reecrire, pour ne pas empiler des lignes
        // d'historique identiques
        if ($newStatus === 'cancelled') {
            jsonResponse(['success' => true, 'message' => 'Commande deja annulee']);
        }

        $stmt = $db->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->execute([$newStatus, $order['id']]);

        // Ajouter a l'historique
        $db->prepare("INSERT INTO order_status_history (order_id, status, note) VALUES (?, ?, ?)")
           ->execute([$order['id'], $newStatus, $note]);

        // Email d'expedition au client
        if ($newStatus === 'shipped') {
            sendShippingNotification($order);
        }
    }

    // Mise a jour du statut de paiement (encaissement manuel en attendant
    // le branchement d'un prestataire de paiement)
    if (isset($data['payment_status'])) {
        $allowedPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];
        if (!in_array($data['payment_status'], $allowedPaymentStatuses, true)) {
            jsonResponse(['error' => 'Statut de paiement invalide'], 400);
        }

        $db->prepare("UPDATE orders SET payment_status = ? WHERE id = ?")
           ->execute([$data['payment_status'], $order['id']]);
    }

    jsonResponse(['success' => true, 'message' => 'Commande mise a jour']);
}

/**
 * Identifier l'expediteur d'un message sur une commande
 * Retourne 'admin', 'customer' ou null si non autorise
 */
function identifyMessageSender($order, $trackingCode) {
    global $db;

    // Token admin valide
    if (verifyAdminToken()) {
        return 'admin';
    }

    // Token utilisateur valide : l'email doit correspondre a celui de la commande
    $token = getTokenFromHeader();
    if ($token) {
        $payload = verifyToken($token, 'customer');
        if ($payload) {
            $stmt = $db->prepare("SELECT email FROM customers WHERE id = ?");
            $stmt->execute([intval($payload['uid'])]);
            $customer = $stmt->fetch();
            if ($customer && strtolower($customer['email']) === strtolower($order['customer_email'])) {
                return 'customer';
            }
        }
    }

    // Sinon, code de suivi correspondant a la commande
    if (!empty($trackingCode) && $trackingCode === $order['tracking_code']) {
        return 'customer';
    }

    return null;
}

function addOrderMessage() {
    global $db;

    $data = getJsonInput();

    if (empty($data['order_id'])) {
        jsonResponse(['error' => 'ID de la commande requis'], 400);
    }

    $content = (isset($data['content']) && is_string($data['content'])) ? trim($data['content']) : '';
    if ($content === '' || mb_strlen($content) > 2000) {
        jsonResponse(['error' => 'Le message est requis (2000 caracteres max)'], 400);
    }

    // Recuperer la commande
    $stmt = $db->prepare("SELECT id, tracking_code, customer_email FROM orders WHERE id = ?");
    $stmt->execute([$data['order_id']]);
    $order = $stmt->fetch();

    if (!$order) {
        jsonResponse(['error' => 'Commande non trouvee'], 404);
    }

    $sender = identifyMessageSender($order, $data['tracking_code'] ?? null);
    if (!$sender) {
        jsonResponse(['error' => 'Forbidden'], 403);
    }

    $stmt = $db->prepare("INSERT INTO order_messages (order_id, sender, message) VALUES (?, ?, ?)");
    $stmt->execute([$order['id'], $sender, $content]);
    $messageId = $db->lastInsertId();

    // Retourner le message insere pour la mise a jour optimiste cote client
    $stmt = $db->prepare("SELECT id, sender, message, created_at FROM order_messages WHERE id = ?");
    $stmt->execute([$messageId]);

    jsonResponse(['success' => true, 'message' => $stmt->fetch()], 201);
}

function markMessagesRead() {
    global $db;

    $data = getJsonInput();

    if (empty($data['order_id'])) {
        jsonResponse(['error' => 'ID de la commande requis'], 400);
    }

    // Recuperer la commande
    $stmt = $db->prepare("SELECT id, tracking_code, customer_email FROM orders WHERE id = ?");
    $stmt->execute([$data['order_id']]);
    $order = $stmt->fetch();

    if (!$order) {
        jsonResponse(['error' => 'Commande non trouvee'], 404);
    }

    $sender = identifyMessageSender($order, $data['tracking_code'] ?? null);
    if (!$sender) {
        jsonResponse(['error' => 'Forbidden'], 403);
    }

    // L'admin marque comme lus les messages du client, et inversement
    $senderToMark = ($sender === 'admin') ? 'customer' : 'admin';

    $stmt = $db->prepare("UPDATE order_messages SET is_read = 1 WHERE order_id = ? AND sender = ?");
    $stmt->execute([$order['id'], $senderToMark]);

    jsonResponse(['success' => true]);
}
