<?php
/**
 * API Clients
 */

require_once '../config/database.php';
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

    // Token client
    $token = base64_encode('customer:' . $customerId . ':' . time());

    // Log email
    $db->prepare("INSERT INTO email_logs (type, recipient, subject, preview) VALUES (?, ?, ?, ?)")
       ->execute([
           'account_created',
           $email,
           'Bienvenue chez Greenez Vous !',
           'Votre compte a ete cree avec succes.'
       ]);

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

    $token = base64_encode('customer:' . $customer['id'] . ':' . time());

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

    foreach ($orders as &$order) {
        $stmtItems = $db->prepare("SELECT * FROM order_items WHERE order_id = ?");
        $stmtItems->execute([$order['id']]);
        $order['items'] = $stmtItems->fetchAll();
    }

    jsonResponse($orders);
}

function verifyCustomerToken() {
    $headers = getallheaders();
    $token = $headers['Authorization'] ?? '';
    $token = str_replace('Bearer ', '', $token);

    if (empty($token)) {
        return false;
    }

    $decoded = base64_decode($token);
    $parts = explode(':', $decoded);

    if (count($parts) !== 3 || $parts[0] !== 'customer') {
        return false;
    }

    // Token valide 7 jours
    if (time() - intval($parts[2]) > 604800) {
        return false;
    }

    return intval($parts[1]);
}
