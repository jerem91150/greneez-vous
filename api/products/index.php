<?php
/**
 * API Produits
 * GET    /api/products/          - Liste tous les produits
 * GET    /api/products/?id=X     - Un produit specifique
 * POST   /api/products/          - Ajouter un produit (admin)
 * PUT    /api/products/          - Modifier un produit (admin)
 * DELETE /api/products/?id=X     - Supprimer un produit (admin)
 */

require_once '../config/database.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getProducts();
        break;
    case 'POST':
        requireAdmin();
        createProduct();
        break;
    case 'PUT':
        requireAdmin();
        updateProduct();
        break;
    case 'DELETE':
        requireAdmin();
        deleteProduct();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getProducts() {
    global $db;

    $id = $_GET['id'] ?? null;
    $category = $_GET['category'] ?? null;
    $active_only = $_GET['active'] ?? 'true';

    if ($id) {
        // Un seul produit
        $stmt = $db->prepare("
            SELECT p.*, c.name as category_name, c.slug as category_slug
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = ?
        ");
        $stmt->execute([$id]);
        $product = $stmt->fetch();

        if (!$product) {
            jsonResponse(['error' => 'Product not found'], 404);
        }
        jsonResponse($product);
    }

    // Liste des produits
    $sql = "
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE 1=1
    ";
    $params = [];

    if ($active_only === 'true') {
        $sql .= " AND p.active = 1";
    }

    if ($category) {
        $sql .= " AND c.slug = ?";
        $params[] = $category;
    }

    $sql .= " ORDER BY p.featured DESC, p.created_at DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $products = $stmt->fetchAll();

    jsonResponse($products);
}

function createProduct() {
    global $db;

    $data = getJsonInput();

    $required = ['name', 'price'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            jsonResponse(['error' => "Le champ $field est requis"], 400);
        }
    }

    $stmt = $db->prepare("
        INSERT INTO products (name, subtitle, description, price, stock, category_id, image, tag, active, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['name'],
        $data['subtitle'] ?? null,
        $data['description'] ?? null,
        floatval($data['price']),
        intval($data['stock'] ?? 0),
        $data['category_id'] ?? null,
        $data['image'] ?? null,
        $data['tag'] ?? null,
        isset($data['active']) ? ($data['active'] ? 1 : 0) : 1,
        isset($data['featured']) ? ($data['featured'] ? 1 : 0) : 0
    ]);

    $id = $db->lastInsertId();

    jsonResponse(['success' => true, 'id' => $id, 'message' => 'Produit cree'], 201);
}

function updateProduct() {
    global $db;

    $data = getJsonInput();

    if (empty($data['id'])) {
        jsonResponse(['error' => 'ID du produit requis'], 400);
    }

    $fields = [];
    $params = [];

    $allowedFields = ['name', 'subtitle', 'description', 'price', 'stock', 'category_id', 'image', 'tag', 'active', 'featured'];

    foreach ($allowedFields as $field) {
        if (isset($data[$field])) {
            $fields[] = "$field = ?";
            if (in_array($field, ['active', 'featured'])) {
                $params[] = $data[$field] ? 1 : 0;
            } elseif (in_array($field, ['price'])) {
                $params[] = floatval($data[$field]);
            } elseif (in_array($field, ['stock', 'category_id'])) {
                $params[] = intval($data[$field]);
            } else {
                $params[] = $data[$field];
            }
        }
    }

    if (empty($fields)) {
        jsonResponse(['error' => 'Aucun champ a mettre a jour'], 400);
    }

    $params[] = $data['id'];

    $sql = "UPDATE products SET " . implode(', ', $fields) . " WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    jsonResponse(['success' => true, 'message' => 'Produit mis a jour']);
}

function deleteProduct() {
    global $db;

    $id = $_GET['id'] ?? null;

    if (!$id) {
        jsonResponse(['error' => 'ID du produit requis'], 400);
    }

    $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$id]);

    if ($stmt->rowCount() === 0) {
        jsonResponse(['error' => 'Produit non trouve'], 404);
    }

    jsonResponse(['success' => true, 'message' => 'Produit supprime']);
}
