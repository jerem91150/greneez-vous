# Guide de Deploiement Greenez Vous sur Hostinger

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

1. Ouvrez le fichier `api/config/database.php`
2. Modifiez les valeurs avec vos identifiants Hostinger :

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'u123456789_greenez');  // Votre nom de BDD
define('DB_USER', 'u123456789_admin');    // Votre utilisateur
define('DB_PASS', 'VotreMotDePasse');     // Votre mot de passe
```

## 4. Uploader les fichiers

1. Allez dans **Fichiers** > **Gestionnaire de fichiers**
2. Ouvrez le dossier `public_html`
3. Supprimez les fichiers par defaut (sauf `.htaccess` si present)
4. Uploadez :
   - `index.html`
   - Le dossier `api/` (avec tous ses sous-dossiers)

Structure finale :
```
public_html/
├── index.html
├── api/
│   ├── .htaccess
│   ├── config/
│   │   └── database.php
│   ├── auth/
│   │   └── login.php
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
│   ├── shipping/
│   │   └── index.php
│   └── users/
│       └── index.php
```

## 5. Ajouter les produits initiaux

Une fois la base de donnees configuree, connectez-vous en admin et ajoutez les produits manuellement, ou executez ce script SQL dans phpMyAdmin pour ajouter des produits de test.

## 6. Tester

1. Accedez a votre site : `https://votre-domaine.com`
2. Testez la connexion admin :
   - Email: `admin@greenez.fr`
   - Mot de passe: `admin123`

## 7. Changer le mot de passe admin (IMPORTANT!)

Dans phpMyAdmin, executez :
```sql
UPDATE admins SET password = '$2y$10$NOUVEAU_HASH' WHERE email = 'admin@greenez.fr';
```

Pour generer un nouveau hash, utilisez : https://bcrypt-generator.com/

---

## Identifiants par defaut

**Admin**
- Email: admin@greenez.fr
- Mot de passe: admin123

**Codes promo**
- BIENVENUE10 : -10% (min 15 EUR)
- HIVER2026 : -5 EUR (min 20 EUR)
- ZERODECHET : -15% (min 30 EUR)

---

## Support

En cas de probleme, verifiez :
1. Les identifiants de la base de donnees dans `api/config/database.php`
2. Que PHP 7.4+ est active sur votre hebergement
3. Les logs d'erreur dans hPanel > Avance > Logs d'erreur
