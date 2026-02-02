<?php
/**
 * API Options de livraison
 */

require_once '../config/database.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getShippingOptions();
        break;
    case 'POST':
        requireAdmin();
        createShippingOption();
        break;
    case 'PUT':
        requireAdmin();
        updateShippingOption();
        break;
    case 'DELETE':
        requireAdmin();
        deleteShippingOption();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getShippingOptions() {
    global $db;

    $adminId = verifyAdminToken();
    $cartTotal = floatval($_GET['cartTotal'] ?? 0);

    if ($adminId) {
        $stmt = $db->query("SELECT * FROM shipping_options ORDER BY price ASC");
        jsonResponse($stmt->fetchAll());
        return;
    }

    // Pour les clients, filtrer selon le montant du panier
    $stmt = $db->prepare("
        SELECT * FROM shipping_options
        WHERE active = 1
        AND (min_order IS NULL OR min_order <= ?)
        AND (max_order IS NULL OR max_order >= ?)
        ORDER BY price ASC
    ");
    $stmt->execute([$cartTotal, $cartTotal]);
    $options = $stmt->fetchAll();

    // Calculer le prix effectif (gratuit si au-dessus du seuil)
    foreach ($options as &$option) {
        $option['effective_price'] = ($option['free_above'] && $cartTotal >= $option['free_above'])
            ? 0
            : floatval($option['price']);
    }

    jsonResponse($options);
}

function createShippingOption() {
    global $db;

    $data = getJsonInput();

    $stmt = $db->prepare("
        INSERT INTO shipping_options (name, description, price, min_order, max_order, free_above, active)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['name'],
        $data['description'] ?? null,
        floatval($data['price']),
        floatval($data['minOrder'] ?? 0),
        !empty($data['maxOrder']) ? floatval($data['maxOrder']) : null,
        !empty($data['freeAbove']) ? floatval($data['freeAbove']) : null,
        isset($data['active']) ? ($data['active'] ? 1 : 0) : 1
    ]);

    jsonResponse(['success' => true, 'id' => $db->lastInsertId()], 201);
}

function updateShippingOption() {
    global $db;

    $data = getJsonInput();

    if (empty($data['id'])) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    $stmt = $db->prepare("
        UPDATE shipping_options SET name = ?, description = ?, price = ?, min_order = ?, max_order = ?, free_above = ?, active = ?
        WHERE id = ?
    ");

    $stmt->execute([
        $data['name'],
        $data['description'] ?? null,
        floatval($data['price']),
        floatval($data['minOrder'] ?? 0),
        !empty($data['maxOrder']) ? floatval($data['maxOrder']) : null,
        !empty($data['freeAbove']) ? floatval($data['freeAbove']) : null,
        $data['active'] ? 1 : 0,
        $data['id']
    ]);

    jsonResponse(['success' => true]);
}

function deleteShippingOption() {
    global $db;

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    $db->prepare("DELETE FROM shipping_options WHERE id = ?")->execute([$id]);
    jsonResponse(['success' => true]);
}
