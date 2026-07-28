<?php
/**
 * Systeme d'envoi d'emails Greenez Vous
 * Utilise PHP mail() natif (supporte par Hostinger)
 */

/**
 * Echapper une valeur pour insertion dans le HTML des emails
 */
function e($value) {
    return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
}

/**
 * Supprimer les caracteres d'injection d'en-tetes (CRLF) d'une valeur
 */
function sanitizeHeaderValue($value) {
    return str_ireplace(["\r", "\n", '%0a', '%0d'], '', (string)$value);
}

/**
 * Envoyer un email HTML
 * @param string $to Destinataire
 * @param string $subject Sujet
 * @param string $htmlBody Corps HTML
 * @param string|null $replyTo Adresse de reponse (optionnel)
 * @return bool Succes ou echec
 */
function sendEmail($to, $subject, $htmlBody, $replyTo = null) {
    $fromEmail = defined('FROM_EMAIL') ? FROM_EMAIL : 'contact@greenez-vous.fr';
    $fromName = defined('FROM_NAME') ? FROM_NAME : 'Greenez Vous';

    // Assainir les valeurs interpolees dans les en-tetes (anti injection CRLF)
    $fromName = sanitizeHeaderValue($fromName);
    $replyTo = sanitizeHeaderValue($replyTo ?: $fromEmail);
    if (!filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $replyTo = $fromEmail;
    }

    $headers = "From: $fromName <$fromEmail>\r\n";
    $headers .= "Reply-To: $replyTo\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: Greenez-Vous/1.0\r\n";

    $result = @mail($to, $subject, $htmlBody, $headers);

    // Log dans la base de donnees
    try {
        $db = getDB();
        $db->prepare("INSERT INTO email_logs (type, recipient, subject, preview, status) VALUES (?, ?, ?, ?, ?)")
           ->execute([
               'email',
               $to,
               $subject,
               mb_substr(strip_tags($htmlBody), 0, 200),
               $result ? 'sent' : 'failed'
           ]);
    } catch (Exception $e) {
        error_log('Email log error: ' . $e->getMessage());
    }

    return $result;
}

/**
 * Envoyer la notification admin pour nouvelle commande
 */
function sendAdminOrderNotification($order, $items, $customer) {
    $adminEmail = defined('ADMIN_EMAIL') ? ADMIN_EMAIL : 'votre-adresse@exemple.fr';

    $itemsHtml = '';
    foreach ($items as $item) {
        $qty = intval($item['quantity']);
        $price = number_format(floatval($item['price']) * $qty, 2, ',', ' ');
        $name = e($item['name']);
        $itemsHtml .= "<tr>
            <td style='padding:8px 12px;border-bottom:1px solid #e7e5e4;'>{$name}</td>
            <td style='padding:8px 12px;border-bottom:1px solid #e7e5e4;text-align:center;'>x{$qty}</td>
            <td style='padding:8px 12px;border-bottom:1px solid #e7e5e4;text-align:right;'>{$price} &euro;</td>
        </tr>";
    }

    $total = number_format(floatval($order['total']), 2, ',', ' ');
    $tracking = $order['tracking_code'];

    $custFirstName = e($customer['firstName'] ?? '');
    $custLastName = e($customer['lastName'] ?? '');
    $custEmail = e($customer['email'] ?? '');
    $custPhone = e($customer['phone'] ?? '');
    $custAddress = e($customer['address'] ?? '');
    $custPostalCode = e($customer['postalCode'] ?? '');
    $custCity = e($customer['city'] ?? '');

    $html = emailLayout("Nouvelle commande #{$tracking}", "
        <h2 style='color:#064e3b;margin:0 0 20px;font-size:22px;'>Nouvelle commande !</h2>
        <div style='background:#ecfdf5;border-radius:12px;padding:16px;margin-bottom:20px;'>
            <p style='margin:0;color:#064e3b;font-weight:600;font-size:18px;'>Commande #{$tracking}</p>
            <p style='margin:4px 0 0;color:#065f46;'>Total: <strong>{$total} &euro;</strong></p>
        </div>

        <h3 style='color:#064e3b;margin:20px 0 10px;font-size:16px;'>Client</h3>
        <p style='margin:0;color:#44403c;'>
            {$custFirstName} {$custLastName}<br>
            {$custEmail}<br>
            {$custPhone}<br>
            {$custAddress}<br>
            {$custPostalCode} {$custCity}
        </p>

        <h3 style='color:#064e3b;margin:20px 0 10px;font-size:16px;'>Articles</h3>
        <table style='width:100%;border-collapse:collapse;'>
            <thead><tr style='background:#f5f5f4;'>
                <th style='padding:8px 12px;text-align:left;font-size:13px;color:#78716c;'>Produit</th>
                <th style='padding:8px 12px;text-align:center;font-size:13px;color:#78716c;'>Qte</th>
                <th style='padding:8px 12px;text-align:right;font-size:13px;color:#78716c;'>Prix</th>
            </tr></thead>
            <tbody>{$itemsHtml}</tbody>
        </table>
    ");

    return sendEmail($adminEmail, "Nouvelle commande #{$tracking} - {$total} EUR", $html, $customer['email'] ?? null);
}

/**
 * Envoyer la confirmation de commande au client
 */
function sendOrderConfirmation($order, $items, $customer) {
    $tracking = $order['tracking_code'];
    $total = number_format(floatval($order['total']), 2, ',', ' ');
    $subtotal = number_format(floatval($order['subtotal']), 2, ',', ' ');
    $shipping = number_format(floatval($order['shipping_cost']), 2, ',', ' ');
    $shippingMethod = e($order['shipping_method'] ?? 'Standard');
    $firstName = e($customer['firstName'] ?? 'Client');

    $itemsHtml = '';
    foreach ($items as $item) {
        $qty = intval($item['quantity']);
        $price = number_format(floatval($item['price']) * $qty, 2, ',', ' ');
        $imgUrl = e($item['image'] ?? '');
        $name = e($item['name']);
        $itemsHtml .= "<tr>
            <td style='padding:10px;border-bottom:1px solid #e7e5e4;'>
                " . ($imgUrl ? "<img src='{$imgUrl}' width='50' height='50' style='border-radius:8px;object-fit:cover;vertical-align:middle;margin-right:10px;' alt='{$name}'/>" : '') . "
                <span style='vertical-align:middle;'>{$name}</span>
            </td>
            <td style='padding:10px;border-bottom:1px solid #e7e5e4;text-align:center;'>x{$qty}</td>
            <td style='padding:10px;border-bottom:1px solid #e7e5e4;text-align:right;font-weight:600;'>{$price} &euro;</td>
        </tr>";
    }

    $promoHtml = '';
    if (!empty($order['promo_code'])) {
        $promoCode = e($order['promo_code']);
        $promoDiscount = number_format(floatval($order['promo_discount']), 2, ',', ' ');
        $promoHtml = "<tr><td colspan='2' style='padding:6px 12px;color:#059669;'>Promo ({$promoCode})</td><td style='padding:6px 12px;text-align:right;color:#059669;'>-{$promoDiscount} &euro;</td></tr>";
    }

    $siteUrl = defined('ALLOWED_ORIGIN') ? ALLOWED_ORIGIN : 'https://peachpuff-capybara-465964.hostingersite.com';

    $custFirstName = e($customer['firstName'] ?? '');
    $custLastName = e($customer['lastName'] ?? '');
    $custAddress = e($customer['address'] ?? '');
    $custPostalCode = e($customer['postalCode'] ?? '');
    $custCity = e($customer['city'] ?? '');

    $html = emailLayout("Confirmation de commande", "
        <h2 style='color:#064e3b;margin:0 0 8px;font-size:22px;'>Merci pour votre commande, {$firstName} !</h2>
        <p style='color:#78716c;margin:0 0 24px;'>Votre commande a bien ete enregistree.</p>

        <div style='background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px;margin-bottom:24px;'>
            <p style='margin:0 0 6px;color:#92400e;font-weight:600;font-size:15px;'>En attente de reglement</p>
            <p style='margin:0;color:#b45309;font-size:14px;line-height:1.5;'>Le paiement en ligne n'est pas encore disponible sur la boutique. Nous revenons vers vous sous 24&nbsp;h avec le moyen de reglement, puis la confection demarre. <strong>Aucun paiement ne vous a ete debite.</strong></p>
        </div>

        <div style='background:#ecfdf5;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center;'>
            <p style='margin:0 0 4px;color:#065f46;font-size:13px;'>Votre code de suivi</p>
            <p style='margin:0;color:#064e3b;font-weight:700;font-size:24px;letter-spacing:2px;'>{$tracking}</p>
        </div>

        <h3 style='color:#064e3b;margin:0 0 12px;font-size:16px;'>Vos articles</h3>
        <table style='width:100%;border-collapse:collapse;margin-bottom:16px;'>
            <tbody>{$itemsHtml}</tbody>
        </table>

        <table style='width:100%;margin-bottom:24px;'>
            <tr><td style='padding:6px 12px;color:#78716c;'>Sous-total</td><td style='padding:6px 12px;text-align:right;'>{$subtotal} &euro;</td></tr>
            {$promoHtml}
            <tr><td style='padding:6px 12px;color:#78716c;'>Livraison ({$shippingMethod})</td><td style='padding:6px 12px;text-align:right;'>{$shipping} &euro;</td></tr>
            <tr style='font-size:18px;font-weight:700;'><td style='padding:10px 12px;border-top:2px solid #064e3b;color:#064e3b;'>Total</td><td style='padding:10px 12px;border-top:2px solid #064e3b;text-align:right;color:#064e3b;'>{$total} &euro;</td></tr>
        </table>

        <h3 style='color:#064e3b;margin:0 0 8px;font-size:16px;'>Adresse de livraison</h3>
        <p style='color:#44403c;margin:0 0 24px;'>
            {$custFirstName} {$custLastName}<br>
            {$custAddress}<br>
            {$custPostalCode} {$custCity}
        </p>

        <div style='text-align:center;margin:24px 0;'>
            <a href='{$siteUrl}/#/suivi' style='display:inline-block;background:#064e3b;color:#ffffff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:15px;'>Suivre ma commande</a>
        </div>

        <p style='color:#a8a29e;font-size:13px;text-align:center;margin:24px 0 0;'>Chaque piece est creee a la main dans notre atelier lyonnais. Merci pour votre patience et votre confiance !</p>
    ");

    return sendEmail($customer['email'], "Confirmation de votre commande #{$tracking}", $html);
}

/**
 * Envoyer la notification d'expedition au client
 */
function sendShippingNotification($order) {
    $tracking = $order['tracking_code'];
    $firstName = e($order['customer_first_name'] ?? 'Client');
    $siteUrl = defined('ALLOWED_ORIGIN') ? ALLOWED_ORIGIN : 'https://peachpuff-capybara-465964.hostingersite.com';

    $shippingMethod = e($order['shipping_method'] ?? 'Standard');
    $address = e($order['customer_address'] ?? '');
    $postalCode = e($order['customer_postal_code'] ?? '');
    $city = e($order['customer_city'] ?? '');

    $html = emailLayout("Votre colis est en route !", "
        <div style='text-align:center;margin-bottom:24px;'>
            <div style='font-size:48px;margin-bottom:8px;'>&#128230;</div>
            <h2 style='color:#064e3b;margin:0 0 8px;font-size:22px;'>Bonne nouvelle, {$firstName} !</h2>
            <p style='color:#78716c;margin:0;'>Votre commande a ete expediee et est en route vers vous.</p>
        </div>

        <div style='background:#ecfdf5;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center;'>
            <p style='margin:0 0 4px;color:#065f46;font-size:13px;'>Code de suivi</p>
            <p style='margin:0;color:#064e3b;font-weight:700;font-size:20px;letter-spacing:2px;'>{$tracking}</p>
        </div>

        <div style='background:#f5f5f4;border-radius:12px;padding:16px;margin-bottom:24px;'>
            <p style='margin:0;color:#44403c;font-size:14px;'><strong>Mode de livraison :</strong> {$shippingMethod}</p>
            <p style='margin:8px 0 0;color:#44403c;font-size:14px;'><strong>Adresse :</strong> {$address}, {$postalCode} {$city}</p>
        </div>

        <div style='text-align:center;margin:24px 0;'>
            <a href='{$siteUrl}/#/suivi' style='display:inline-block;background:#064e3b;color:#ffffff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:15px;'>Suivre mon colis</a>
        </div>
    ");

    return sendEmail($order['customer_email'], "Votre commande #{$tracking} a ete expediee !", $html);
}

/**
 * Envoyer l'email de bienvenue apres inscription
 */
function sendWelcomeEmail($email, $firstName) {
    $siteUrl = defined('ALLOWED_ORIGIN') ? ALLOWED_ORIGIN : 'https://peachpuff-capybara-465964.hostingersite.com';
    $name = e($firstName);

    $html = emailLayout("Bienvenue chez Greenez Vous !", "
        <div style='text-align:center;margin-bottom:24px;'>
            <div style='font-size:48px;margin-bottom:8px;'>&#127807;</div>
            <h2 style='color:#064e3b;margin:0 0 8px;font-size:22px;'>Bienvenue, {$name} !</h2>
            <p style='color:#78716c;margin:0;'>Votre compte Greenez Vous a ete cree avec succes.</p>
        </div>

        <div style='background:#ecfdf5;border-radius:12px;padding:20px;margin-bottom:24px;'>
            <h3 style='color:#064e3b;margin:0 0 12px;font-size:16px;'>Ce que vous pouvez faire :</h3>
            <ul style='color:#44403c;margin:0;padding-left:20px;line-height:1.8;'>
                <li>Suivre vos commandes en temps reel</li>
                <li>Sauvegarder vos produits favoris</li>
                <li>Pre-remplir vos informations de livraison</li>
                <li>Acceder a votre historique d'achats</li>
            </ul>
        </div>

        <div style='text-align:center;margin:24px 0;'>
            <a href='{$siteUrl}/#/boutique' style='display:inline-block;background:#064e3b;color:#ffffff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:15px;'>Decouvrir la boutique</a>
        </div>
    ");

    return sendEmail($email, "Bienvenue chez Greenez Vous, {$name} !", $html);
}

/**
 * Envoyer l'email de bienvenue newsletter
 */
function sendNewsletterWelcome($email, $firstName) {
    $name = e($firstName ?: 'ami(e)');

    $html = emailLayout("Bienvenue dans notre newsletter !", "
        <div style='text-align:center;margin-bottom:24px;'>
            <div style='font-size:48px;margin-bottom:8px;'>&#128140;</div>
            <h2 style='color:#064e3b;margin:0 0 8px;font-size:22px;'>Merci, {$name} !</h2>
            <p style='color:#78716c;margin:0;'>Vous etes inscrit(e) a notre newsletter.</p>
        </div>

        <div style='background:#ecfdf5;border-radius:12px;padding:20px;margin-bottom:24px;'>
            <p style='margin:0 0 4px;color:#065f46;font-weight:600;font-size:16px;'>Votre code de bienvenue</p>
            <p style='margin:0;color:#064e3b;font-weight:700;font-size:28px;letter-spacing:3px;'>BIENVENUE10</p>
            <p style='margin:8px 0 0;color:#065f46;font-size:13px;'>-10% sur votre prochaine commande</p>
        </div>

        <p style='color:#78716c;font-size:14px;text-align:center;'>Vous recevrez en avant-premiere nos nouveautes, conseils zero dechet et offres exclusives.</p>
    ");

    return sendEmail($email, "Bienvenue ! Votre code -10% : BIENVENUE10", $html);
}

/**
 * Envoyer l'email de reinitialisation de mot de passe
 */
function sendPasswordResetEmail($email, $firstName, $resetToken) {
    $siteUrl = defined('ALLOWED_ORIGIN') ? ALLOWED_ORIGIN : 'https://peachpuff-capybara-465964.hostingersite.com';
    $resetUrl = $siteUrl . '/#/reset-password/' . $resetToken;
    $name = e($firstName ?: 'Client');

    $html = emailLayout("Reinitialisation du mot de passe", "
        <h2 style='color:#064e3b;margin:0 0 8px;font-size:22px;'>Bonjour, {$name}</h2>
        <p style='color:#78716c;margin:0 0 24px;'>Vous avez demande la reinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour en choisir un nouveau.</p>

        <div style='text-align:center;margin:24px 0;'>
            <a href='{$resetUrl}' style='display:inline-block;background:#064e3b;color:#ffffff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;font-size:15px;'>Reinitialiser mon mot de passe</a>
        </div>

        <p style='color:#a8a29e;font-size:13px;margin:24px 0 0;'>Ce lien expire dans 1 heure. Si vous n'avez pas fait cette demande, ignorez cet email.</p>
        <p style='color:#a8a29e;font-size:12px;margin:8px 0 0;word-break:break-all;'>Lien direct : {$resetUrl}</p>
    ");

    return sendEmail($email, "Reinitialisation de votre mot de passe - Greenez Vous", $html);
}

/**
 * Template HTML commun pour tous les emails
 */
function emailLayout($title, $content) {
    $year = date('Y');
    return "<!DOCTYPE html>
<html lang='fr'>
<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1.0'><title>{$title}</title></head>
<body style='margin:0;padding:0;background:#f5f5f4;font-family:Arial,Helvetica,sans-serif;'>
<table width='100%' cellpadding='0' cellspacing='0' style='background:#f5f5f4;padding:32px 16px;'>
<tr><td align='center'>
<table width='600' cellpadding='0' cellspacing='0' style='max-width:600px;width:100%;'>

    <!-- Header -->
    <tr><td style='background:#064e3b;padding:24px 32px;border-radius:16px 16px 0 0;text-align:center;'>
        <span style='color:#ecfdf5;font-size:24px;font-weight:700;letter-spacing:1px;'>&#127807; Greenez Vous</span>
    </td></tr>

    <!-- Body -->
    <tr><td style='background:#ffffff;padding:32px;'>
        {$content}
    </td></tr>

    <!-- Footer -->
    <tr><td style='background:#fafaf9;padding:24px 32px;border-radius:0 0 16px 16px;text-align:center;border-top:1px solid #e7e5e4;'>
        <p style='margin:0 0 8px;color:#78716c;font-size:13px;'>Greenez Vous - Creations textiles artisanales</p>
        <p style='margin:0 0 8px;color:#a8a29e;font-size:12px;'>Lyon, France | contact@greenez-vous.fr</p>
        <p style='margin:0;color:#a8a29e;font-size:11px;'>&copy; {$year} Greenez Vous. Tous droits reserves.</p>
    </td></tr>

</table>
</td></tr>
</table>
</body>
</html>";
}
