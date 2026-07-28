<?php
/**
 * Configuration sensible - TEMPLATE
 * Copier ce fichier vers env.php et remplir les valeurs
 *
 * IMPORTANT: Ne jamais commiter env.php dans Git
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'votre_base_de_donnees');
define('DB_USER', 'votre_utilisateur');
define('DB_PASS', 'votre_mot_de_passe');

// Cle secrete pour signer les tokens HMAC
// Generer avec: php -r "echo bin2hex(random_bytes(32));"
define('TOKEN_SECRET', 'REMPLACER_PAR_UNE_CLE_ALEATOIRE');

// Domaine autorise pour CORS (sans slash final)
define('ALLOWED_ORIGIN', 'https://peachpuff-capybara-465964.hostingersite.com');

// Email admin pour les notifications de commande
define('ADMIN_EMAIL', 'votre-adresse@exemple.fr');

// Email expediteur (From)
define('FROM_EMAIL', 'contact@greenez-vous.fr');
define('FROM_NAME', 'Greenez Vous');
