<?php
/**
 * API Categories
 * GET /api/categories/ - Liste toutes les categories
 */

require_once '../config/database.php';
setCorsHeaders();

$db = getDB();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$stmt = $db->query("SELECT * FROM categories ORDER BY id");
$categories = $stmt->fetchAll();

jsonResponse($categories);
