<?php
/**
 * API Authentification Admin
 * POST /api/auth/login.php
 */

require_once '../config/database.php';
setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

// Rate limit: 5 tentatives par 5 minutes par IP
checkRateLimit('login_admin', 5, 300);

$data = getJsonInput();

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    jsonResponse(['error' => 'Email et mot de passe requis'], 400);
}

$db = getDB();

// Chercher l'admin
$stmt = $db->prepare("SELECT id, email, password, name FROM admins WHERE email = ?");
$stmt->execute([$email]);
$admin = $stmt->fetch();

if (!$admin || !password_verify($password, $admin['password'])) {
    jsonResponse(['error' => 'Email ou mot de passe incorrect'], 401);
}

// Generer un token HMAC signe (valide 24h)
$token = generateToken('admin', $admin['id'], 86400);

jsonResponse([
    'success' => true,
    'token' => $token,
    'admin' => [
        'id' => $admin['id'],
        'email' => $admin['email'],
        'name' => $admin['name']
    ]
]);
