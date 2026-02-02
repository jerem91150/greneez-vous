<?php
/**
 * API Newsletter
 */

require_once '../config/database.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        requireAdmin();
        getSubscribers();
        break;
    case 'POST':
        subscribe();
        break;
    case 'DELETE':
        requireAdmin();
        unsubscribe();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getSubscribers() {
    global $db;

    $stmt = $db->query("SELECT * FROM newsletter_subscribers ORDER BY created_at DESC");
    jsonResponse($stmt->fetchAll());
}

function subscribe() {
    global $db;

    $data = getJsonInput();
    $email = trim($data['email'] ?? '');
    $firstName = trim($data['firstName'] ?? '');

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['error' => 'Email invalide'], 400);
    }

    // Verifier si deja inscrit
    $stmt = $db->prepare("SELECT id FROM newsletter_subscribers WHERE LOWER(email) = LOWER(?)");
    $stmt->execute([$email]);

    if ($stmt->fetch()) {
        jsonResponse(['error' => 'Cet email est deja inscrit'], 400);
    }

    // Inscrire
    $stmt = $db->prepare("INSERT INTO newsletter_subscribers (email, first_name) VALUES (?, ?)");
    $stmt->execute([$email, $firstName ?: null]);

    // Log email
    $db->prepare("INSERT INTO email_logs (type, recipient, subject, preview) VALUES (?, ?, ?, ?)")
       ->execute([
           'newsletter_welcome',
           $email,
           'Bienvenue dans la newsletter Greenez Vous !',
           'Merci de votre inscription. Profitez de -10% avec le code BIENVENUE10'
       ]);

    jsonResponse(['success' => true, 'message' => 'Inscription reussie'], 201);
}

function unsubscribe() {
    global $db;

    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(['error' => 'ID requis'], 400);
    }

    $db->prepare("DELETE FROM newsletter_subscribers WHERE id = ?")->execute([$id]);
    jsonResponse(['success' => true]);
}
