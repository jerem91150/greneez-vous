<?php
/**
 * API Codes Promo
 */

require_once '../config/database.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getPromos();
        break;
    case 'POST':
        if (isset($_GET['validate'])) {
            validatePromo();
        } else {
            requireAdmin();
            createPromo();
        }
        break;
    case 'PUT':
        requireAdmin();
        updatePromo();
        break;
    case 'DELETE':
        requireAdmin();
        deletePromo();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getPromos() {
    global $db;

    // Admin voit tout
    $adminId = verifyAdminToken();

    if ($adminId) {
        $stmt = $db->query("SELECT * FROM promos ORDER BY created_at DESC");
    } else {
        $stmt = $db->query("SELECT id, code, discount, type, min_order FROM promos WHERE active = 1");
    }

    jsonResponse($stmt->fetchAll());
}

function validatePromo() {
    global $db;

    $data = getJsonInput();
    $code = strtoupper(trim($data['code'] ?? ''));
    $cartTotal = floatval($data['cartTotal'] ?? 0);

    if (empty($code)) {
        jsonResponse(['error' => 'Code requis'], 400);
    }

    $stmt = $db->prepare("SELECT * FROM promos WHERE UPPER(code) = ? AND active = 1");
    $stmt->execute([$code]);
    $promo = $stmt->fetch();

    if (!$promo) {
        jsonResponse(['error' => 'Code promo invalide'], 404);
    }

    if ($promo['usage_count'] >= $promo['max_usage']) {
        jsonResponse(['error' => 'Code promo expire'], 400);
    }

    if ($cartTotal < $promo['min_order']) {
        jsonResponse(['error' => 'Commande minimum de ' . $promo['min_order'] . ' EUR requise'], 400);
    }

    jsonResponse([
        'valid' => true,
        'promo' => [
            'id' => $promo['id'],
            'code' => $promo['code'],
            'discount' => floatval($promo['discount']),
            'type' => $promo['type'],
            'min_order' => floatval($promo['min_order'])
        ]
    ]);
}

function createPromo() {
    global $db;

    $data = getJsonInput();

    $stmt = $db->prepare("
        INSERT INTO promos (code, discount, type, min_order, max_usage, active)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        strtoupper($data['code']),
        floatval($data['discount']),
        $data['type'] ?? 'percent',
        floatval($data['min_order'] ?? 0),
        intval($data['max_usage'] ?? 100),
        isset($data['active']) ? ($data['active'] ? 1 : 0) : 1
    ]);

    jsonResponse(['success' => true, 'id' => $db->lastInsertId()], 201);
}

function updatePromo() {
    global $db;

    $data = getJsonInput();

    if (empty($data['id'])) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    $stmt = $db->prepare("
        UPDATE promos SET code = ?, discount = ?, type = ?, min_order = ?, max_usage = ?, active = ?
        WHERE id = ?
    ");

    $stmt->execute([
        strtoupper($data['code']),
        floatval($data['discount']),
        $data['type'] ?? 'percent',
        floatval($data['min_order'] ?? 0),
        intval($data['max_usage'] ?? 100),
        $data['active'] ? 1 : 0,
        $data['id']
    ]);

    jsonResponse(['success' => true]);
}

function deletePromo() {
    global $db;

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    $db->prepare("DELETE FROM promos WHERE id = ?")->execute([$id]);
    jsonResponse(['success' => true]);
}
