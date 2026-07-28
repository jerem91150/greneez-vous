-- =====================================================
-- Migration du 27/07/2026
-- A executer une seule fois sur la base de production (phpMyAdmin)
-- =====================================================

-- 1. Ajouter le statut "annulee" aux commandes
--    Sans ce statut, une commande ne pouvait pas etre annulee et le stock
--    reserve restait bloque indefiniment.
ALTER TABLE `orders`
  MODIFY `status` ENUM(
    'pending', 'confirmed', 'crafting', 'quality',
    'packing', 'shipped', 'delivered', 'cancelled'
  ) NOT NULL DEFAULT 'pending';

-- 2. Le paiement en ligne n'est pas encore branche : les commandes existantes
--    avaient toutes ete enregistrees comme "payees" alors qu'aucun encaissement
--    n'a eu lieu. On repasse en "en attente" celles qui ne sont pas livrees,
--    pour que le tableau de bord reflete la realite.
--    /!\ Si vous avez deja encaisse certaines de ces commandes a la main,
--        remettez-les a 'paid' individuellement apres verification.
UPDATE `orders`
   SET `payment_status` = 'pending'
 WHERE `payment_status` = 'paid'
   AND `status` <> 'delivered';

-- 3. Reglages du site : renommer les cles snake_case en camelCase.
--    Constate en production le 28/07/2026 : la table contenait 11 cles en
--    snake_case (issues du schema initial) et 17 en camelCase (ecrites par le
--    panneau d'administration). Le site ne lit que le camelCase, donc 9
--    reglages personnalises n'etaient tout simplement pas affiches : le site
--    montrait ses textes par defaut a la place.
--
--    UPDATE IGNORE : si la cle camelCase existe deja, la ligne snake_case est
--    laissee telle quelle (on ne veut pas ecraser une valeur plus recente),
--    puis supprimee par le DELETE qui suit.
UPDATE IGNORE `site_settings` SET `setting_key` = 'heroBadge'       WHERE `setting_key` = 'hero_badge';
UPDATE IGNORE `site_settings` SET `setting_key` = 'heroTitle'       WHERE `setting_key` = 'hero_title';
UPDATE IGNORE `site_settings` SET `setting_key` = 'heroTitleItalic' WHERE `setting_key` = 'hero_title_italic';
UPDATE IGNORE `site_settings` SET `setting_key` = 'heroSubtitle'    WHERE `setting_key` = 'hero_subtitle';
UPDATE IGNORE `site_settings` SET `setting_key` = 'aboutTitle'      WHERE `setting_key` = 'about_title';
UPDATE IGNORE `site_settings` SET `setting_key` = 'aboutText'       WHERE `setting_key` = 'about_text';
UPDATE IGNORE `site_settings` SET `setting_key` = 'footerText'      WHERE `setting_key` = 'footer_text';
UPDATE IGNORE `site_settings` SET `setting_key` = 'contactEmail'    WHERE `setting_key` = 'contact_email';
UPDATE IGNORE `site_settings` SET `setting_key` = 'contactPhone'    WHERE `setting_key` = 'contact_phone';

-- Nettoyer les eventuelles lignes snake_case restantes (cas ou la cle
-- camelCase existait deja et a donc ete conservee)
DELETE FROM `site_settings`
 WHERE `setting_key` IN (
   'hero_badge', 'hero_title', 'hero_title_italic', 'hero_subtitle',
   'about_title', 'about_text', 'footer_text', 'contact_email', 'contact_phone'
 );
