<?php
/**
 * API Actualites
 */

require_once '../config/database.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getActualites();
        break;
    case 'POST':
        requireAdmin();
        createActualite();
        break;
    case 'PUT':
        requireAdmin();
        updateActualite();
        break;
    case 'DELETE':
        requireAdmin();
        deleteActualite();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getActualites() {
    global $db;

    $adminId = verifyAdminToken();
    $active_only = $_GET['active'] ?? 'true';

    if ($adminId || $active_only !== 'true') {
        $stmt = $db->query("SELECT * FROM actualites ORDER BY date DESC, created_at DESC");
    } else {
        $stmt = $db->query("SELECT * FROM actualites WHERE active = 1 ORDER BY date DESC, created_at DESC");
    }

    jsonResponse($stmt->fetchAll());
}

function createActualite() {
    global $db;

    $data = getJsonInput();

    $stmt = $db->prepare("
        INSERT INTO actualites (title, description, image, instagram_url, date, active)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['title'],
        $data['description'] ?? null,
        $data['image'] ?? null,
        $data['instagramUrl'] ?? null,
        $data['date'] ?? date('Y-m-d'),
        isset($data['active']) ? ($data['active'] ? 1 : 0) : 1
    ]);

    jsonResponse(['success' => true, 'id' => $db->lastInsertId()], 201);
}

function updateActualite() {
    global $db;

    $data = getJsonInput();

    if (empty($data['id'])) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    $stmt = $db->prepare("
        UPDATE actualites SET title = ?, description = ?, image = ?, instagram_url = ?, active = ?
        WHERE id = ?
    ");

    $stmt->execute([
        $data['title'],
        $data['description'] ?? null,
        $data['image'] ?? null,
        $data['instagramUrl'] ?? null,
        $data['active'] ? 1 : 0,
        $data['id']
    ]);

    jsonResponse(['success' => true]);
}

function deleteActualite() {
    global $db;

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    $db->prepare("DELETE FROM actualites WHERE id = ?")->execute([$id]);
    jsonResponse(['success' => true]);
}
