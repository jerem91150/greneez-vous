<?php
/**
 * API Avis
 */

require_once '../config/database.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getReviews();
        break;
    case 'POST':
        createReview();
        break;
    case 'PUT':
        requireAdmin();
        updateReview();
        break;
    case 'DELETE':
        requireAdmin();
        deleteReview();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getReviews() {
    global $db;

    $productId = $_GET['product_id'] ?? null;
    $adminId = verifyAdminToken();

    if ($productId) {
        // Avis pour un produit specifique (approuves uniquement pour les clients)
        if ($adminId) {
            $stmt = $db->prepare("SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC");
        } else {
            $stmt = $db->prepare("SELECT * FROM reviews WHERE product_id = ? AND approved = 1 ORDER BY created_at DESC");
        }
        $stmt->execute([$productId]);
    } else {
        // Tous les avis (admin seulement)
        if (!$adminId) {
            jsonResponse(['error' => 'Unauthorized'], 401);
        }
        $stmt = $db->query("
            SELECT r.*, p.name as product_name
            FROM reviews r
            LEFT JOIN products p ON r.product_id = p.id
            ORDER BY r.approved ASC, r.created_at DESC
        ");
    }

    jsonResponse($stmt->fetchAll());
}

function createReview() {
    global $db;

    $data = getJsonInput();

    if (empty($data['product_id']) || empty($data['rating'])) {
        jsonResponse(['error' => 'product_id et rating requis'], 400);
    }

    $stmt = $db->prepare("
        INSERT INTO reviews (product_id, customer_name, rating, comment, approved)
        VALUES (?, ?, ?, ?, 0)
    ");

    $stmt->execute([
        intval($data['product_id']),
        $data['customer_name'] ?? 'Anonyme',
        intval($data['rating']),
        $data['comment'] ?? null
    ]);

    jsonResponse(['success' => true, 'message' => 'Avis soumis, en attente de validation'], 201);
}

function updateReview() {
    global $db;

    $data = getJsonInput();

    if (empty($data['id'])) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    // Approuver ou modifier
    if (isset($data['approved'])) {
        $stmt = $db->prepare("UPDATE reviews SET approved = ? WHERE id = ?");
        $stmt->execute([$data['approved'] ? 1 : 0, $data['id']]);
    }

    jsonResponse(['success' => true]);
}

function deleteReview() {
    global $db;

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    $db->prepare("DELETE FROM reviews WHERE id = ?")->execute([$id]);
    jsonResponse(['success' => true]);
}
