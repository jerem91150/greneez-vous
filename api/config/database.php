<?php
/**
 * Configuration de la base de donnees
 * MODIFIER CES VALEURS AVEC VOS IDENTIFIANTS HOSTINGER
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_greenez'); // Remplacer par votre nom de BDD
define('DB_USER', 'u123456789_admin');   // Remplacer par votre utilisateur
define('DB_PASS', 'VotreMotDePasse');    // Remplacer par votre mot de passe

// Connexion PDO
function getDB() {
    static $db = null;
    if ($db === null) {
        try {
            $db = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            http_response_code(500);
            die(json_encode(['error' => 'Database connection failed']));
        }
    }
    return $db;
}

// Headers CORS pour permettre les requetes depuis le frontend
function setCorsHeaders() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}

// Fonction pour obtenir les donnees JSON du body
function getJsonInput() {
    $input = file_get_contents('php://input');
    return json_decode($input, true) ?? [];
}

// Fonction pour repondre en JSON
function jsonResponse($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

// Fonction pour generer un code de suivi
function generateTrackingCode() {
    $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $code = 'GV-';
    for ($i = 0; $i < 8; $i++) {
        $code .= $chars[random_int(0, strlen($chars) - 1)];
    }
    return $code;
}

// Verification du token admin (simple pour demo)
function verifyAdminToken() {
    $headers = getallheaders();
    $token = $headers['Authorization'] ?? '';
    $token = str_replace('Bearer ', '', $token);

    if (empty($token)) {
        return false;
    }

    // Decoder le token (format simple: base64 de admin_id:timestamp)
    $decoded = base64_decode($token);
    $parts = explode(':', $decoded);

    if (count($parts) !== 2) {
        return false;
    }

    $adminId = $parts[0];
    $timestamp = $parts[1];

    // Token valide pendant 24h
    if (time() - intval($timestamp) > 86400) {
        return false;
    }

    return intval($adminId);
}

// Verification admin obligatoire
function requireAdmin() {
    $adminId = verifyAdminToken();
    if (!$adminId) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    return $adminId;
}
