/**
 * Deploiement manuel vers Hostinger par FTPS.
 *
 * Alternative au workflow GitHub Actions, utilisable quand Actions n'est pas
 * disponible. Le contenu envoye est strictement le meme.
 *
 * Identifiants : places dans un fichier .env.deploy a la racine (ignore par
 * Git, il ne quittera jamais votre machine) :
 *
 *   FTP_SERVER=ftp.votredomaine.fr
 *   FTP_USERNAME=votre_identifiant
 *   FTP_PASSWORD=votre_mot_de_passe
 *
 * Usage :
 *   npm run deploy -- --dry-run   affiche ce qui serait envoye, sans rien faire
 *   npm run deploy                envoie reellement
 */
const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');

const ROOT = path.join(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

// Liste blanche : seuls ces elements partent en ligne. Une liste blanche est
// plus sure qu'une liste d'exclusions — un nouveau fichier de travail ajoute
// a la racine ne se retrouvera jamais publie par oubli.
const FILES = ['index.html', '.htaccess', 'api.js', 'robots.txt', 'sitemap.xml'];
const DIRS = ['dist', 'api'];

// Jamais transmis. env.php contient les identifiants de la base : il vit
// uniquement sur le serveur, et l'ecraser depuis une machine de dev le
// remplacerait par une version absente ou erronee.
const NEVER_SEND = new Set(['api/config/env.php', 'api/config/env.example.php']);

function collect(dir, base = dir) {
    const out = [];
    for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
        const rel = path.posix.join(dir, entry.name);
        if (entry.isDirectory()) {
            out.push(...collect(rel, base));
        } else if (!NEVER_SEND.has(rel)) {
            out.push(rel);
        }
    }
    return out;
}

function buildFileList() {
    const missing = [];
    const list = [];

    for (const f of FILES) {
        if (fs.existsSync(path.join(ROOT, f))) list.push(f);
        else missing.push(f);
    }
    for (const d of DIRS) {
        if (fs.existsSync(path.join(ROOT, d))) list.push(...collect(d));
        else missing.push(d + '/');
    }
    return { list, missing };
}

function loadEnv() {
    const envPath = path.join(ROOT, '.env.deploy');
    if (fs.existsSync(envPath)) {
        for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
            const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
            if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
        }
    }
}

async function main() {
    loadEnv();

    const { list, missing } = buildFileList();

    if (missing.length) {
        console.error('Fichiers manquants : ' + missing.join(', '));
        console.error('Lancez `npm run build` avant de deployer.');
        process.exit(1);
    }

    // Garde-fous : deployer sans ces fichiers casserait le site
    for (const critical of ['dist/app.js', 'dist/styles.css', 'index.html', '.htaccess']) {
        const full = path.join(ROOT, critical);
        if (!fs.existsSync(full) || fs.statSync(full).size === 0) {
            console.error(`${critical} absent ou vide. Lancez \`npm run build\`.`);
            process.exit(1);
        }
    }

    const totalKo = Math.round(
        list.reduce((s, f) => s + fs.statSync(path.join(ROOT, f)).size, 0) / 1024
    );

    console.log(`\n${list.length} fichiers a envoyer (${totalKo} Ko) vers public_html/ :\n`);
    for (const f of list) console.log('  ' + f);
    console.log('\nJamais transmis : ' + [...NEVER_SEND].join(', '));

    if (DRY_RUN) {
        console.log('\n--dry-run : rien n\'a ete envoye.\n');
        return;
    }

    const { FTP_SERVER, FTP_USERNAME, FTP_PASSWORD } = process.env;
    if (!FTP_SERVER || !FTP_USERNAME || !FTP_PASSWORD) {
        console.error('\nIdentifiants FTP absents.');
        console.error('Creez un fichier .env.deploy a la racine (voir l\'en-tete de ce script).');
        process.exit(1);
    }

    const client = new ftp.Client(30000);
    try {
        await client.access({
            host: FTP_SERVER,
            user: FTP_USERNAME,
            password: FTP_PASSWORD,
            secure: true,               // FTPS : sans cela le mot de passe circule en clair
            secureOptions: { rejectUnauthorized: false },
        });

        console.log('\nConnecte. Envoi en cours...\n');
        for (const rel of list) {
            const remote = path.posix.join('public_html', rel);
            await client.ensureDir(path.posix.dirname(remote));
            await client.cd('/');
            await client.uploadFrom(path.join(ROOT, rel), remote);
            console.log('  envoye  ' + rel);
        }
        console.log(`\nDeploiement termine : ${list.length} fichiers.\n`);
    } catch (err) {
        console.error('\nEchec du deploiement : ' + err.message);
        process.exit(1);
    } finally {
        client.close();
    }
}

main();
