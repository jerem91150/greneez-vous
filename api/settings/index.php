<?php
/**
 * API Settings
 * GET /api/settings/     - Recuperer tous les parametres
 * PUT /api/settings/     - Mettre a jour les parametres (admin)
 */

require_once '../config/database.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getSettings();
        break;
    case 'PUT':
        requireAdmin();
        updateSettings();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getSettings() {
    global $db;

    $stmt = $db->query("SELECT setting_key, setting_value FROM site_settings");
    $rows = $stmt->fetchAll();

    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }

    jsonResponse($settings);
}

function updateSettings() {
    global $db;

    $data = getJsonInput();

    $stmt = $db->prepare("
        INSERT INTO site_settings (setting_key, setting_value)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
    ");

    foreach ($data as $key => $value) {
        $stmt->execute([$key, $value]);
    }

    jsonResponse(['success' => true, 'message' => 'Parametres mis a jour']);
}
