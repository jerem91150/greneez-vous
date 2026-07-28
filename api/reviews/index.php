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
        checkRateLimit('create_review', 5, 600);
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
        // Tous les avis
        if ($adminId) {
            // Admin voit tous les avis
            $stmt = $db->query("
                SELECT r.*, p.name as product_name
                FROM reviews r
                LEFT JOIN products p ON r.product_id = p.id
                ORDER BY r.approved ASC, r.created_at DESC
            ");
        } else {
            // Public voit seulement les avis approuves
            $stmt = $db->query("
                SELECT r.*, p.name as product_name
                FROM reviews r
                LEFT JOIN products p ON r.product_id = p.id
                WHERE r.approved = 1
                ORDER BY r.created_at DESC
            ");
        }
    }

    jsonResponse($stmt->fetchAll());
}

function createReview() {
    global $db;

    $data = getJsonInput();

    if (empty($data['product_id']) || empty($data['rating'])) {
        jsonResponse(['error' => 'product_id et rating requis'], 400);
    }

    // La note doit rester dans l'echelle 1-5 : sans borne, une note aberrante
    // fausserait durablement la moyenne affichee sur la fiche produit
    $rating = intval($data['rating']);
    if ($rating < 1 || $rating > 5) {
        jsonResponse(['error' => 'La note doit etre comprise entre 1 et 5'], 400);
    }

    // Le produit doit exister et etre actif
    $productId = intval($data['product_id']);
    $stmt = $db->prepare("SELECT id FROM products WHERE id = ? AND active = 1");
    $stmt->execute([$productId]);
    if (!$stmt->fetch()) {
        jsonResponse(['error' => 'Produit introuvable'], 404);
    }

    // Bornes de longueur (la table accepte des textes longs, on evite les abus)
    $customerName = trim($data['customer_name'] ?? '');
    if ($customerName === '') {
        $customerName = 'Anonyme';
    }
    if (mb_strlen($customerName) > 80) {
        jsonResponse(['error' => 'Le nom ne doit pas depasser 80 caracteres'], 400);
    }

    $comment = trim($data['comment'] ?? '');
    if (mb_strlen($comment) > 2000) {
        jsonResponse(['error' => 'Le commentaire ne doit pas depasser 2000 caracteres'], 400);
    }

    $stmt = $db->prepare("
        INSERT INTO reviews (product_id, customer_name, rating, comment, approved)
        VALUES (?, ?, ?, ?, 0)
    ");

    $stmt->execute([
        $productId,
        $customerName,
        $rating,
        $comment !== '' ? $comment : null
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
