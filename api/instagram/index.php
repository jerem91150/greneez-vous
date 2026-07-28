<?php
/**
 * API Instagram - Recuperation des infos d'un post
 * GET /api/instagram/?url=https://instagram.com/p/XXXX
 */

require_once '../config/database.php';
setCorsHeaders();

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'GET') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$url = $_GET['url'] ?? null;

if (!$url) {
    jsonResponse(['error' => 'URL Instagram requise'], 400);
}

// Valider que c'est bien une URL Instagram
if (!preg_match('/instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)/i', $url, $matches)) {
    jsonResponse(['error' => 'URL Instagram invalide. Format attendu: https://instagram.com/p/XXXX ou https://instagram.com/reel/XXXX'], 400);
}

$postId = $matches[2];

// Utiliser l'API oEmbed d'Instagram (gratuite, pas besoin d'auth)
$oembedUrl = 'https://api.instagram.com/oembed/?url=' . urlencode($url) . '&omitscript=true';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $oembedUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$response) {
    jsonResponse(['error' => 'Impossible de recuperer les informations du post Instagram. Verifiez que le post est public.'], 400);
}

$data = json_decode($response, true);

if (!$data) {
    jsonResponse(['error' => 'Reponse Instagram invalide'], 400);
}

// Extraire les infos utiles
$result = [
    'success' => true,
    'title' => $data['title'] ?? '',
    'author' => $data['author_name'] ?? '',
    'thumbnail' => $data['thumbnail_url'] ?? '',
    'html' => $data['html'] ?? '',
    'url' => $url,
    'postId' => $postId
];

// Essayer d'extraire une description du HTML embed (caption)
if (!empty($data['html'])) {
    // Le HTML contient parfois la caption dans un attribut ou texte
    preg_match('/data-instgrm-captioned/i', $data['html'], $captionMatch);
    $result['hasCaptioned'] = !empty($captionMatch);
}

// Si le titre est vide, utiliser le nom de l'auteur
if (empty($result['title'])) {
    $result['title'] = 'Publication de ' . ($result['author'] ?: 'Instagram');
}

jsonResponse($result);
