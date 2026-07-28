<?php
/**
 * API Newsletter
 */

require_once '../config/database.php';
require_once '../config/email.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        requireAdmin();
        getSubscribers();
        break;
    case 'POST':
        checkRateLimit('newsletter_subscribe', 3, 600);
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
    $existing = $stmt->fetch();

    // Reponse identique que l'email soit deja inscrit ou non : repondre
    // differemment permettrait de tester si une adresse est dans la base.
    // On se contente de ne pas reinserer ni renvoyer l'email de bienvenue.
    if (!$existing) {
        $stmt = $db->prepare("INSERT INTO newsletter_subscribers (email, first_name) VALUES (?, ?)");
        $stmt->execute([$email, $firstName ?: null]);

        sendNewsletterWelcome($email, $firstName);
    }

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
