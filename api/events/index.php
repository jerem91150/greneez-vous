<?php
/**
 * API Evenements
 */

require_once '../config/database.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getEvents();
        break;
    case 'POST':
        requireAdmin();
        createEvent();
        break;
    case 'PUT':
        requireAdmin();
        updateEvent();
        break;
    case 'DELETE':
        requireAdmin();
        deleteEvent();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getEvents() {
    global $db;

    $adminId = verifyAdminToken();

    // Les contenus inactifs ne sont visibles qu'avec un token admin valide
    if ($adminId) {
        $stmt = $db->query("SELECT * FROM events ORDER BY date DESC");
    } else {
        $stmt = $db->query("SELECT * FROM events WHERE active = 1 ORDER BY date DESC");
    }

    jsonResponse($stmt->fetchAll());
}

function createEvent() {
    global $db;

    $data = getJsonInput();

    $stmt = $db->prepare("
        INSERT INTO events (title, description, date, location, active)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['title'],
        $data['description'] ?? null,
        $data['date'],
        $data['location'] ?? null,
        isset($data['active']) ? ($data['active'] ? 1 : 0) : 1
    ]);

    jsonResponse(['success' => true, 'id' => $db->lastInsertId()], 201);
}

function updateEvent() {
    global $db;

    $data = getJsonInput();

    if (empty($data['id'])) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    $stmt = $db->prepare("
        UPDATE events SET title = ?, description = ?, date = ?, location = ?, active = ?
        WHERE id = ?
    ");

    $stmt->execute([
        $data['title'],
        $data['description'] ?? null,
        $data['date'],
        $data['location'] ?? null,
        $data['active'] ? 1 : 0,
        $data['id']
    ]);

    jsonResponse(['success' => true]);
}

function deleteEvent() {
    global $db;

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    $db->prepare("DELETE FROM events WHERE id = ?")->execute([$id]);
    jsonResponse(['success' => true]);
}
