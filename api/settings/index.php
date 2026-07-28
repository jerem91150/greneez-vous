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

/**
 * Cles autorisees dans site_settings.
 * Sans cette liste, l'endpoint accepterait n'importe quelle cle et la table
 * deviendrait un stockage libre : toute cle injectee finirait rendue cote
 * client (les pages legales sont affichees en HTML brut).
 */
function allowedSettingKeys() {
    return [
        // Accueil - hero
        'heroTitle', 'heroTitleItalic', 'heroSubtitle', 'heroBadge', 'heroImage', 'heroQuote',
        // A propos
        'aboutTitle', 'aboutText', 'aboutImage',
        // Categories
        'categoryImage1', 'categoryTitle1', 'categoryDesc1',
        'categoryImage2', 'categoryTitle2',
        'categoryImage3', 'categoryTitle3',
        // Bloc libre
        'customTitle', 'customText',
        // Bandeau defilant
        'marquee1', 'marquee2', 'marquee3',
        // Selection produits
        'featuredLabel', 'featuredTitle',
        // Pied de page et contact
        'footerText', 'contactEmail', 'contactPhone', 'instagram', 'facebook',
        // Pages legales (JSON : {title, content})
        'legal_cgv', 'legal_mentions', 'legal_confidentialite'
    ];
}

function updateSettings() {
    global $db;

    $data = getJsonInput();

    if (!is_array($data) || empty($data)) {
        jsonResponse(['error' => 'Aucun parametre a mettre a jour'], 400);
    }

    $allowed = allowedSettingKeys();
    $rejected = [];

    $stmt = $db->prepare("
        INSERT INTO site_settings (setting_key, setting_value)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
    ");

    foreach ($data as $key => $value) {
        if (!in_array($key, $allowed, true)) {
            $rejected[] = $key;
            continue;
        }
        // Valeurs scalaires uniquement ; les structures sont envoyees en JSON
        if (is_array($value) || is_object($value)) {
            $value = json_encode($value, JSON_UNESCAPED_UNICODE);
        }
        $stmt->execute([$key, (string)$value]);
    }

    $response = ['success' => true, 'message' => 'Parametres mis a jour'];
    if (!empty($rejected)) {
        $response['ignored'] = $rejected;
    }

    jsonResponse($response);
}
