<?php
/**
 * API Clients
 */

require_once '../config/database.php';
require_once '../config/email.php';
setCorsHeaders();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

switch ($method) {
    case 'GET':
        if ($action === 'profile') {
            getProfile();
        } else if ($action === 'orders') {
            getCustomerOrders();
        } else {
            requireAdmin();
            getCustomers();
        }
        break;
    case 'POST':
        if ($action === 'register') {
            register();
        } else if ($action === 'login') {
            login();
        } else {
            jsonResponse(['error' => 'Action inconnue'], 400);
        }
        break;
    case 'PUT':
        updateProfile();
        break;
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

function getCustomers() {
    global $db;

    $stmt = $db->query("SELECT id, email, first_name, last_name, phone, city, created_at FROM customers ORDER BY created_at DESC");
    jsonResponse($stmt->fetchAll());
}

function register() {
    global $db;

    // Rate limit: 3 inscriptions par 10 minutes par IP
    checkRateLimit('register', 3, 600);

    $data = getJsonInput();

    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';
    $firstName = trim($data['firstName'] ?? '');
    $lastName = trim($data['lastName'] ?? '');

    if (empty($email) || empty($password) || empty($firstName) || empty($lastName)) {
        jsonResponse(['error' => 'Tous les champs sont requis'], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['error' => 'Email invalide'], 400);
    }

    if (strlen($password) < 6) {
        jsonResponse(['error' => 'Mot de passe minimum 6 caracteres'], 400);
    }

    // Verifier si email existe
    $stmt = $db->prepare("SELECT id FROM customers WHERE LOWER(email) = LOWER(?)");
    $stmt->execute([$email]);

    if ($stmt->fetch()) {
        jsonResponse(['error' => 'Un compte existe deja avec cet email'], 400);
    }

    // Creer le compte
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $db->prepare("
        INSERT INTO customers (email, password, first_name, last_name, phone)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $email,
        $hashedPassword,
        $firstName,
        $lastName,
        $data['phone'] ?? null
    ]);

    $customerId = $db->lastInsertId();

    // Token client HMAC signe (valide 7 jours)
    $token = generateToken('customer', $customerId, 604800);

    // Envoyer l'email de bienvenue
    sendWelcomeEmail($email, $firstName);

    jsonResponse([
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $customerId,
            'email' => $email,
            'firstName' => $firstName,
            'lastName' => $lastName
        ]
    ], 201);
}

function login() {
    global $db;

    // Rate limit: 5 tentatives par 5 minutes par IP
    checkRateLimit('login_customer', 5, 300);

    $data = getJsonInput();

    $email = trim($data['email'] ?? '');
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        jsonResponse(['error' => 'Email et mot de passe requis'], 400);
    }

    $stmt = $db->prepare("SELECT * FROM customers WHERE LOWER(email) = LOWER(?)");
    $stmt->execute([$email]);
    $customer = $stmt->fetch();

    if (!$customer || !password_verify($password, $customer['password'])) {
        jsonResponse(['error' => 'Email ou mot de passe incorrect'], 401);
    }

    // Token client HMAC signe (valide 7 jours)
    $token = generateToken('customer', $customer['id'], 604800);

    jsonResponse([
        'success' => true,
        'token' => $token,
        'user' => [
            'id' => $customer['id'],
            'email' => $customer['email'],
            'firstName' => $customer['first_name'],
            'lastName' => $customer['last_name'],
            'phone' => $customer['phone'],
            'address' => $customer['address'],
            'city' => $customer['city'],
            'postalCode' => $customer['postal_code']
        ]
    ]);
}

function getProfile() {
    global $db;

    $customerId = verifyCustomerToken();
    if (!$customerId) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }

    $stmt = $db->prepare("SELECT id, email, first_name, last_name, phone, address, city, postal_code, created_at FROM customers WHERE id = ?");
    $stmt->execute([$customerId]);
    $customer = $stmt->fetch();

    if (!$customer) {
        jsonResponse(['error' => 'User not found'], 404);
    }

    jsonResponse([
        'id' => $customer['id'],
        'email' => $customer['email'],
        'firstName' => $customer['first_name'],
        'lastName' => $customer['last_name'],
        'phone' => $customer['phone'],
        'address' => $customer['address'],
        'city' => $customer['city'],
        'postalCode' => $customer['postal_code'],
        'createdAt' => $customer['created_at']
    ]);
}

function updateProfile() {
    global $db;

    $customerId = verifyCustomerToken();
    if (!$customerId) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }

    $data = getJsonInput();

    $stmt = $db->prepare("
        UPDATE customers SET first_name = ?, last_name = ?, phone = ?, address = ?, city = ?, postal_code = ?
        WHERE id = ?
    ");

    $stmt->execute([
        $data['firstName'] ?? null,
        $data['lastName'] ?? null,
        $data['phone'] ?? null,
        $data['address'] ?? null,
        $data['city'] ?? null,
        $data['postalCode'] ?? null,
        $customerId
    ]);

    jsonResponse(['success' => true]);
}

function getCustomerOrders() {
    global $db;

    $customerId = verifyCustomerToken();
    if (!$customerId) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }

    $stmt = $db->prepare("SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC");
    $stmt->execute([$customerId]);
    $orders = $stmt->fetchAll();

    // Recuperer tous les items en une seule requete (evite un N+1)
    if (!empty($orders)) {
        $orderIds = array_column($orders, 'id');
        $placeholders = implode(',', array_fill(0, count($orderIds), '?'));
        $stmt = $db->prepare("SELECT * FROM order_items WHERE order_id IN ($placeholders)");
        $stmt->execute($orderIds);

        $itemsByOrder = [];
        foreach ($stmt->fetchAll() as $item) {
            $itemsByOrder[$item['order_id']][] = $item;
        }

        foreach ($orders as &$order) {
            $order['items'] = $itemsByOrder[$order['id']] ?? [];
        }
        unset($order);
    }

    jsonResponse($orders);
}

function verifyCustomerToken() {
    $token = getTokenFromHeader();
    $payload = verifyToken($token, 'customer');
    return $payload ? intval($payload['uid']) : false;
}
