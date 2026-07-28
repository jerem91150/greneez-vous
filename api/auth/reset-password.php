<?php
/**
 * API Reinitialisation de mot de passe
 * POST /api/auth/reset-password.php?action=request  - Demander un lien de reset
 * POST /api/auth/reset-password.php?action=reset    - Reinitialiser le mot de passe
 */

require_once '../config/database.php';
require_once '../config/email.php';
setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'request':
        requestReset();
        break;
    case 'reset':
        performReset();
        break;
    default:
        jsonResponse(['error' => 'Action inconnue'], 400);
}

function requestReset() {

    // Rate limit: 3 demandes par 15 minutes par IP
    checkRateLimit('password_reset', 3, 900);

    $db = getDB();
    $data = getJsonInput();
    $email = trim($data['email'] ?? '');

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['error' => 'Email invalide'], 400);
    }

    // Chercher le client
    $stmt = $db->prepare("SELECT id, first_name, email FROM customers WHERE LOWER(email) = LOWER(?)");
    $stmt->execute([$email]);
    $customer = $stmt->fetch();

    // Toujours repondre succes (meme si email inexistant) pour eviter l'enumeration
    if (!$customer) {
        jsonResponse(['success' => true, 'message' => 'Si un compte existe avec cet email, un lien de reinitialisation a ete envoye.']);
    }

    // Generer un token de reset (valide 1h)
    $resetToken = bin2hex(random_bytes(32));
    $expiry = date('Y-m-d H:i:s', time() + 3600);

    // Stocker le token (on reutilise la table simple: un seul token actif par client)
    // D'abord supprimer les anciens tokens pour ce client
    $stmt = $db->prepare("DELETE FROM password_resets WHERE customer_id = ?");
    $stmt->execute([$customer['id']]);

    $stmt = $db->prepare("INSERT INTO password_resets (customer_id, token, expires_at) VALUES (?, ?, ?)");
    $stmt->execute([$customer['id'], hash('sha256', $resetToken), $expiry]);

    // Envoyer l'email
    sendPasswordResetEmail($customer['email'], $customer['first_name'], $resetToken);

    jsonResponse(['success' => true, 'message' => 'Si un compte existe avec cet email, un lien de reinitialisation a ete envoye.']);
}

function performReset() {

    $db = getDB();
    $data = getJsonInput();

    $token = $data['token'] ?? '';
    $newPassword = $data['password'] ?? '';

    if (empty($token) || empty($newPassword)) {
        jsonResponse(['error' => 'Token et mot de passe requis'], 400);
    }

    if (strlen($newPassword) < 6) {
        jsonResponse(['error' => 'Le mot de passe doit faire minimum 6 caracteres'], 400);
    }

    // Verifier le token
    $tokenHash = hash('sha256', $token);
    $stmt = $db->prepare("SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()");
    $stmt->execute([$tokenHash]);
    $reset = $stmt->fetch();

    if (!$reset) {
        jsonResponse(['error' => 'Lien invalide ou expire. Veuillez refaire une demande.'], 400);
    }

    // Mettre a jour le mot de passe
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    $stmt = $db->prepare("UPDATE customers SET password = ? WHERE id = ?");
    $stmt->execute([$hashedPassword, $reset['customer_id']]);

    // Supprimer le token utilise
    $db->prepare("DELETE FROM password_resets WHERE customer_id = ?")->execute([$reset['customer_id']]);

    jsonResponse(['success' => true, 'message' => 'Mot de passe reinitialise avec succes. Vous pouvez vous connecter.']);
}
