/**
 * Genere le hash bcrypt d'un mot de passe administrateur, et la requete SQL
 * a coller dans phpMyAdmin.
 *
 * Le mot de passe reste sur votre machine : seul le hash (non reversible)
 * est affiche. C'est ce hash qui va en base, jamais le mot de passe en clair.
 *
 * Usage :
 *   node scripts/generate-admin-hash.js "MonMotDePasse" [email] [nom]
 *
 * Exemple :
 *   node scripts/generate-admin-hash.js "Zt7!fraise-atelier" contact@greenez-vous.fr "Jeremy"
 *
 * Le hash produit ($2a$) est compatible avec password_verify() de PHP,
 * qui accepte indifferemment les variantes $2a$, $2b$ et $2y$.
 */
const bcrypt = require('bcryptjs');

const password = process.argv[2];
const email = process.argv[3] || 'admin@greenez.fr';
const name = process.argv[4] || 'Administrateur';

if (!password) {
    console.error('Usage : node scripts/generate-admin-hash.js "MotDePasse" [email] [nom]');
    process.exit(1);
}

if (password.length < 10) {
    console.error('Mot de passe trop court : 10 caracteres minimum recommandes.');
    process.exit(1);
}

// Cout 10 : identique au PASSWORD_DEFAULT de PHP utilise par le backend
const hash = bcrypt.hashSync(password, 10);

// Echapper les apostrophes pour l'insertion SQL
const esc = (s) => String(s).replace(/'/g, "\\'");

console.log('\nHash bcrypt genere :');
console.log('  ' + hash);
console.log('\n--- A coller dans phpMyAdmin (onglet SQL de votre base) ---\n');
console.log("-- Cree l'admin, ou met a jour son mot de passe s'il existe deja");
console.log(`INSERT INTO admins (email, password, name) VALUES ('${esc(email)}', '${hash}', '${esc(name)}')`);
console.log(`ON DUPLICATE KEY UPDATE password = '${hash}';`);
console.log('\nConservez le mot de passe dans un gestionnaire de mots de passe.');
console.log('Il n\'apparait nulle part en base : seul le hash ci-dessus y est stocke.\n');
