<?php
/**
 * Configuration de la base de donnees et fonctions utilitaires
 * Les credentials sont dans env.php (non commite dans Git)
 */

// Charger la configuration sensible
$envFile = __DIR__ . '/env.php';
if (!file_exists($envFile)) {
    http_response_code(500);
    die(json_encode(['error' => 'Configuration file missing. Copy env.example.php to env.php']));
}
require_once $envFile;

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

// Headers CORS - restreint au domaine autorise
function setCorsHeaders() {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    // En production, seul le domaine autorise est accepte
    // En dev local, accepter localhost
    $allowedOrigins = [ALLOWED_ORIGIN];
    if (strpos(ALLOWED_ORIGIN, 'localhost') !== false) {
        $allowedOrigins[] = 'http://localhost:3000';
        $allowedOrigins[] = 'http://localhost:8000';
        $allowedOrigins[] = 'http://127.0.0.1:3000';
    }

    if (in_array($origin, $allowedOrigins)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    } else {
        header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
    }

    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
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

// =====================================================
// TOKENS HMAC-SHA256 (remplace les anciens tokens base64)
// =====================================================

/**
 * Generer un token signe HMAC-SHA256
 * Format: base64(payload).signature
 */
function generateToken($type, $userId, $ttl = 86400) {
    $payload = json_encode([
        'type' => $type,
        'uid' => $userId,
        'iat' => time(),
        'exp' => time() + $ttl
    ]);
    $payloadB64 = rtrim(base64_encode($payload), '=');
    $signature = hash_hmac('sha256', $payloadB64, TOKEN_SECRET);
    return $payloadB64 . '.' . $signature;
}

/**
 * Verifier et decoder un token signe
 * Retourne le payload decode ou false si invalide
 */
function verifyToken($token, $expectedType) {
    if (empty($token)) {
        return false;
    }

    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        return false;
    }

    $payloadB64 = $parts[0];
    $signature = $parts[1];

    // Verifier la signature HMAC
    $expectedSignature = hash_hmac('sha256', $payloadB64, TOKEN_SECRET);
    if (!hash_equals($expectedSignature, $signature)) {
        return false;
    }

    // Decoder le payload
    $payload = json_decode(base64_decode($payloadB64), true);
    if (!$payload) {
        return false;
    }

    // Verifier le type
    if (($payload['type'] ?? '') !== $expectedType) {
        return false;
    }

    // Verifier l'expiration
    if (time() > ($payload['exp'] ?? 0)) {
        return false;
    }

    return $payload;
}

/**
 * Extraire le token du header Authorization
 */
function getTokenFromHeader() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    return str_replace('Bearer ', '', $auth);
}

// Verification du token admin
function verifyAdminToken() {
    $token = getTokenFromHeader();
    $payload = verifyToken($token, 'admin');
    return $payload ? intval($payload['uid']) : false;
}

// Verification admin obligatoire
function requireAdmin() {
    $adminId = verifyAdminToken();
    if (!$adminId) {
        jsonResponse(['error' => 'Unauthorized'], 401);
    }
    return $adminId;
}

// =====================================================
// RATE LIMITING (fichier temporaire, par IP)
// =====================================================

/**
 * Verifie le rate limit pour une action donnee
 * $action: identifiant unique (ex: 'login_admin', 'login_customer')
 * $maxAttempts: nombre max de tentatives
 * $windowSeconds: fenetre de temps en secondes
 * Bloque avec HTTP 429 si la limite est depassee
 */
function checkRateLimit($action, $maxAttempts = 5, $windowSeconds = 300) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $key = md5($action . '_' . $ip);
    $dir = sys_get_temp_dir() . '/greenez_ratelimit';

    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }

    $file = $dir . '/' . $key;

    // Lire les tentatives existantes
    $attempts = [];
    if (file_exists($file)) {
        $content = @file_get_contents($file);
        if ($content) {
            $attempts = json_decode($content, true) ?: [];
        }
    }

    // Filtrer les tentatives dans la fenetre de temps
    $now = time();
    $attempts = array_filter($attempts, function($t) use ($now, $windowSeconds) {
        return ($now - $t) < $windowSeconds;
    });

    // Verifier la limite
    if (count($attempts) >= $maxAttempts) {
        $retryAfter = $windowSeconds - ($now - min($attempts));
        header('Retry-After: ' . $retryAfter);
        jsonResponse(['error' => 'Trop de tentatives. Reessayez dans ' . ceil($retryAfter / 60) . ' minute(s).'], 429);
    }

    // Enregistrer cette tentative
    $attempts[] = $now;
    @file_put_contents($file, json_encode(array_values($attempts)), LOCK_EX);
}
