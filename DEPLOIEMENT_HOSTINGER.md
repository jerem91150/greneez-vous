# Guide de Deploiement Greenez Vous sur Hostinger

> **Nouveau : le site se compile avant d'etre deploye.**
> Les sources sont dans `src/` (`app.jsx` pour l'application, `styles.css`
> pour la mise en forme). Les fichiers reellement charges par le navigateur,
> `dist/app.js` et `dist/styles.css`, sont generes.
> Avant chaque deploiement, lancez :
> ```bash
> npm install   # la premiere fois seulement
> npm run build
> ```
> Modifier `src/` sans relancer `npm run build` n'a **aucun effet** sur le site
> en ligne. Pendant le developpement, `npm run watch` recompile
> automatiquement a chaque sauvegarde.
>
> **Le fichier `.htaccess` a la racine est obligatoire.** Le site utilise
> desormais de vraies URL (`/boutique`, `/produit/12`) au lieu de fragments
> (`#/boutique`), pour que chaque fiche produit soit indexable par Google.
> C'est `.htaccess` qui indique a Apache de servir `index.html` sur ces
> adresses. **Sans lui, tout lien profond renvoie une erreur 404**
> (l'accueil, lui, continue de fonctionner).
> Les anciens liens `#/suivi` restent valides : ils sont convertis
> automatiquement, vos emails deja envoyes ne sont pas casses.

## 0. Mise a jour d'un site deja en ligne

Si le site tourne deja, appliquez la migration avant d'uploader les fichiers :

1. **phpMyAdmin** > votre base > **Importer** > `sql/migration-2026-07-27.sql`
   (ajoute le statut « commande annulee » et corrige les commandes
   marquees payees a tort par l'ancien tunnel de paiement simule)
2. Uploadez ensuite les fichiers comme decrit en section 4, **sans oublier le
   dossier `dist/`**

## 1. Creer la base de donnees MySQL

1. Connectez-vous a Hostinger (hPanel)
2. Allez dans **Bases de donnees** > **Bases de donnees MySQL**
3. Creez une nouvelle base de donnees :
   - Nom de la BDD : `greenez` (Hostinger ajoutera un prefixe, ex: `u123456789_greenez`)
   - Utilisateur : `admin` (Hostinger ajoutera un prefixe)
   - Mot de passe : Choisissez un mot de passe fort
4. Notez ces informations !

## 2. Importer le schema SQL

1. Allez dans **Bases de donnees** > **phpMyAdmin**
2. Selectionnez votre base de donnees
3. Cliquez sur **Importer**
4. Uploadez le fichier `sql/schema.sql`
5. Cliquez sur **Executer**

## 3. Configurer la connexion base de donnees

La configuration sensible n'est pas dans `api/config/database.php` : elle est lue depuis un fichier `api/config/env.php` que vous devez creer.

1. Copiez le fichier `api/config/env.example.php` vers `api/config/env.php`
2. Ouvrez `api/config/env.php` et renseignez vos identifiants Hostinger :

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_greenez');  // Votre nom de BDD
define('DB_USER', 'u123456789_admin');    // Votre utilisateur
define('DB_PASS', 'VotreMotDePasse');     // Votre mot de passe

// Cle secrete pour signer les tokens (generer avec la commande indiquee dans le fichier)
define('TOKEN_SECRET', '...');

// Domaine autorise pour CORS (sans slash final)
define('ALLOWED_ORIGIN', 'https://votre-domaine.com');

// Email expediteur (From)
define('FROM_EMAIL', 'contact@greenez-vous.fr');
```

3. Sans ce fichier `env.php`, `database.php` s'arrete avec une erreur : c'est un comportement voulu, pour eviter toute connexion avec des identifiants par defaut.

## 4. Uploader les fichiers

1. Allez dans **Fichiers** > **Gestionnaire de fichiers**
2. Ouvrez le dossier `public_html`
3. Supprimez les fichiers par defaut (sauf `.htaccess` si present)
4. Uploadez :
   - `index.html`
   - `.htaccess` (**obligatoire** — sans lui les URL profondes renvoient une 404)
   - `api.js`
   - `dist/app.js` (l'application compilee — **sans lui, le site reste blanc**)
   - `dist/styles.css` (la mise en forme — **sans lui, le site s'affiche sans style**)
   - `robots.txt`
   - `sitemap.xml`
   - Le dossier `api/` (avec tous ses sous-dossiers)
5. NE PAS uploader :
   - Le dossier `sql/` (les scripts SQL s'executent dans phpMyAdmin, pas sur le serveur web)
   - Le dossier `src/` (code source : seul `dist/` est utile en ligne)
   - Le dossier `scripts/` (outils de generation)
   - Le dossier `node_modules/` (outils de compilation uniquement)
   - `package.json` / `package-lock.json` / `tailwind.config.js`
   - Les archives `*.zip`
   - `DEPLOIEMENT_HOSTINGER.md`
   - `api/config/env.example.php` (template inutile en production)

   `.htaccess` bloque deja l'acces a `src/`, `sql/`, `node_modules/` et aux
   fichiers de configuration si l'un d'eux se retrouve en ligne par erreur.

6. Apres tout ajout ou retrait de produit, regenerez le plan du site :
   ```bash
   npm run sitemap
   ```
   puis re-uploadez `sitemap.xml`. Il contient une URL par fiche produit
   (32 URL actuellement, contre une seule auparavant).
6. Verifiez que le fichier `api/add-admin.php` n'existe plus sur le serveur (script d'installation a usage unique, a ne pas deployer)

Structure finale :
```
public_html/
├── .htaccess          <- routage des URL propres (obligatoire)
├── index.html
├── api.js
├── dist/
│   ├── app.js
│   └── styles.css
├── robots.txt
├── sitemap.xml
├── api/
│   ├── .htaccess
│   ├── config/
│   │   ├── database.php
│   │   ├── email.php
│   │   └── env.php
│   ├── auth/
│   │   ├── login.php
│   │   └── reset-password.php
│   ├── products/
│   │   └── index.php
│   ├── orders/
│   │   └── index.php
│   ├── categories/
│   │   └── index.php
│   ├── settings/
│   │   └── index.php
│   ├── promos/
│   │   └── index.php
│   ├── events/
│   │   └── index.php
│   ├── reviews/
│   │   └── index.php
│   ├── newsletter/
│   │   └── index.php
│   ├── actualites/
│   │   └── index.php
│   ├── instagram/
│   │   └── index.php
│   ├── shipping/
│   │   └── index.php
│   └── users/
│       └── index.php
```

## 5. Ajouter les produits initiaux

Une fois la base de donnees configuree, importez les produits via phpMyAdmin :

1. Allez dans **Bases de donnees** > **phpMyAdmin**
2. Selectionnez votre base de donnees puis cliquez sur **Importer**
3. Executez dans l'ordre :
   - `sql/schema.sql` (tables + donnees initiales)
   - `sql/import-products.sql` (catalogue produits)

## 6. Creer le compte administrateur

Le hash du mot de passe n'est **pas** fourni dans `sql/schema.sql` : le depot
etant public, y placer un hash reel permettrait une attaque par force brute.
Vous generez donc votre propre mot de passe a l'installation.

1. Sur votre machine, generez le hash (le mot de passe reste chez vous, seul
   le hash part en base) :
   ```bash
   npm run admin-hash -- "VotreMotDePasse" votre-email@domaine.fr "Votre Nom"
   ```
   Le script affiche une requete SQL prete a coller.
2. Dans **phpMyAdmin** > votre base > onglet **SQL**, collez et executez cette
   requete. Elle cree l'admin (ou met a jour son mot de passe s'il existe deja).
3. Conservez le mot de passe dans un gestionnaire de mots de passe.

> Si Node.js n'est pas disponible et que vous avez PHP en local :
> `php -r "echo password_hash('VotreMotDePasse', PASSWORD_DEFAULT);"`
> puis inserez le hash a la main. **Ne jamais** utiliser un generateur de hash
> en ligne : ce serait confier votre mot de passe a un tiers.

## 7. Tester

1. Accedez a votre site : `https://votre-domaine.com`
2. Connectez-vous a l'administration avec l'email et le mot de passe definis
   a l'etape 6.

## Changer le mot de passe admin plus tard

Meme procedure : `npm run admin-hash -- "NouveauMotDePasse" votre-email@domaine.fr`,
puis executez le SQL affiche dans phpMyAdmin. La requete met a jour le mot de
passe de l'admin existant.

---

## Paiement : etat actuel

Le site **n'encaisse aucun paiement en ligne**. Le tunnel de commande s'arrete
sur une confirmation, et la commande est enregistree avec
`payment_status = 'pending'`.

Le circuit est donc :
1. Le client valide sa commande (aucune donnee bancaire ne lui est demandee)
2. Il recoit un email de confirmation precisant qu'il sera recontacte
3. Vous le recontactez avec le moyen de reglement de votre choix
4. Une fois l'argent recu, cliquez **« Marquer comme reglee »** dans
   Administration > Commandes

Le tableau de bord ne compte dans « Encaisse » que les commandes reellement
reglees, et signale celles qui restent a encaisser.

Pour activer un vrai paiement en ligne (Stripe, SumUp, PayPal), c'est le
webhook du prestataire qui devra passer `payment_status` a `'paid'` — voir le
commentaire dans `api/orders/index.php`, fonction `createOrder()`.

---

## Identifiants par defaut

**Admin**
- Aucun identifiant par defaut. Le compte est cree a l'etape 6 avec le mot de
  passe de votre choix.

**Codes promo**
- BIENVENUE10 : -10% (min 15 EUR)
- HIVER2026 : -5 EUR (min 20 EUR)
- ZERODECHET : -15% (min 30 EUR)

---

## Support

En cas de probleme, verifiez :
1. Les identifiants de la base de donnees dans `api/config/env.php`
2. Que PHP 7.4+ est active sur votre hebergement
3. Les logs d'erreur dans hPanel > Avance > Logs d'erreur
