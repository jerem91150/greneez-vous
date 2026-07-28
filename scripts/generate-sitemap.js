/**
 * Genere sitemap.xml a partir des produits publies par l'API.
 *
 * Usage :
 *   npm run sitemap
 *   SITE_URL=https://mon-domaine.fr npm run sitemap
 *
 * A relancer apres avoir ajoute ou retire des produits.
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = (process.env.SITE_URL || 'https://peachpuff-capybara-465964.hostingersite.com')
    .replace(/\/+$/, '');

// Pages fixes : priorite decroissante selon leur importance commerciale
const STATIC_PAGES = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/boutique', priority: '0.9', changefreq: 'weekly' },
    { loc: '/atelier', priority: '0.7', changefreq: 'monthly' },
    { loc: '/actualites', priority: '0.6', changefreq: 'weekly' },
    { loc: '/evenements', priority: '0.6', changefreq: 'weekly' },
    { loc: '/suivi', priority: '0.4', changefreq: 'yearly' },
    { loc: '/mentions-legales/cgv', priority: '0.3', changefreq: 'yearly' },
    { loc: '/mentions-legales/mentions', priority: '0.3', changefreq: 'yearly' },
    { loc: '/mentions-legales/confidentialite', priority: '0.3', changefreq: 'yearly' },
];

// Pages volontairement absentes : sans interet pour un moteur de recherche
// (panier, compte, admin) ou reservees a un visiteur identifie.

const escapeXml = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const urlEntry = ({ loc, priority, changefreq, lastmod }) => [
    '  <url>',
    `    <loc>${escapeXml(SITE_URL + loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
].join('\n');

async function main() {
    const today = new Date().toISOString().slice(0, 10);
    const entries = STATIC_PAGES.map(p => urlEntry({ ...p, lastmod: today }));

    let products = [];
    try {
        const res = await fetch(`${SITE_URL}/api/products/index.php?active=true`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        products = await res.json();
        if (!Array.isArray(products)) throw new Error('reponse inattendue');
    } catch (err) {
        console.error(`Impossible de recuperer les produits (${err.message}).`);
        console.error('Le sitemap est genere avec les pages fixes uniquement.');
    }

    for (const product of products) {
        // Un produit inactif ne doit pas etre reference
        if (product.active !== undefined && !Number(product.active)) continue;
        entries.push(urlEntry({
            loc: `/produit/${product.id}`,
            priority: '0.8',
            changefreq: 'monthly',
            lastmod: (product.updated_at || product.created_at || today).slice(0, 10),
        }));
    }

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...entries,
        '</urlset>',
        '',
    ].join('\n');

    const target = path.join(__dirname, '..', 'sitemap.xml');
    fs.writeFileSync(target, xml, 'utf8');
    console.log(`sitemap.xml genere : ${STATIC_PAGES.length} pages fixes + ${entries.length - STATIC_PAGES.length} produits`);
    console.log(`Domaine utilise : ${SITE_URL}`);
}

main();
