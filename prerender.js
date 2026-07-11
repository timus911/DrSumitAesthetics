import puppeteer from 'puppeteer';
import { exec } from 'child_process';
import waitOn from 'wait-on';
import fs from 'fs';
import path from 'path';
import { ROUTES } from './routes.config.mjs';

const routes = ROUTES.map(r => r.path);

// Static fallback tags from the original index.html template. These are only
// ever removed by exact content match (entity-tolerant — Puppeteer's
// page.content() re-serialises "&" as "&amp;", which a plain literal-string
// match would silently miss), never by position — head-tag insertion order
// varies by tag type (React's own tag sometimes lands before the static one,
// sometimes after), so matching on known content is the only reliable way to
// identify which occurrence is the static leftover.
const STATIC_HEAD_TAGS = [
    '<title>Dr. Sumit - Plastic & Aesthetic Surgeon in Chandigarh | Sector 34</title>',
    '<meta name="description" content="Dr. Sumit Singh Gautam is a Board Certified Plastic Surgeon specializing in high-definition body sculpting, facial aesthetic surgery, and reconstructive procedures in Chandigarh.">',
    '<meta name="keywords" content="best plastic surgeon chandigarh, cosmetic surgeon india, dr sumit singh gautam, liposuction chandigarh, rhinoplasty india">',
    '<meta property="og:image" content="https://drsumitaesthetics.com/dr-sumit-portrait.webp">',
    '<meta property="twitter:image" content="https://drsumitaesthetics.com/dr-sumit-portrait.webp">',
];

function dedupeHeadTags(html) {
    let out = html;
    for (const tag of STATIC_HEAD_TAGS) {
        const pattern = tag
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escape regex metachars
            .replace(/&/g, '(?:&|&amp;)'); // tolerate entity re-encoding
        out = out.replace(new RegExp(pattern), '');
    }
    return out;
}

async function prerender() {
    console.log('Starting preview server for prerendering...');
    const server = exec('npm run preview -- --port 4173');

    await waitOn({
        resources: ['http-get://localhost:4173'],
        timeout: 30000,
    });

    console.log('Server is ready. Starting Puppeteer...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.stack || err.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

    // Create base dist directory if it doesn't exist.
    // We assume `npm run build` runs before this script
    if (!fs.existsSync('dist')) fs.mkdirSync('dist');

    // Captured {filePath, html} pairs are held in memory and only written to
    // disk after every route has been crawled (see below for why).
    const captured = [];

    for (const route of routes) {
        console.log(`Prerendering ${route}...`);
        await page.goto(`http://localhost:4173${route}`, { waitUntil: 'networkidle0' });

        // Capture the fully-rendered HTML after React has mounted and hoisted
        // its <title>/<meta>/<link>/JSON-LD tags into <head>.
        let html = await page.content();

        // Strip the Vite dev-server HMR client script — not needed in static output.
        html = html.replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '');

        // Also strip the importmap block that references esm.sh CDN URLs that were
        // in the dev index.html but are irrelevant for the built, bundled output.
        html = html.replace(/<script type="importmap">[\s\S]*?<\/script>/g, '');

        html = dedupeHeadTags(html);

        const routeDir = path.join('dist', route === '/' ? '' : route);
        const filePath = path.join(routeDir, 'index.html');
        captured.push({ routeDir, filePath, html });
    }

    // Only now write everything to disk. Writing during the crawl loop above
    // would overwrite dist/index.html with the homepage's own rendered output
    // partway through — and since vite preview's SPA fallback serves whatever
    // is currently on disk at dist/index.html for any route not yet written,
    // every route crawled afterwards would inherit the homepage's already-
    // rendered <title>/<meta> tags baked into its fallback shell, on top of
    // its own. Deferring all writes until the crawl is fully done keeps the
    // fallback shell pristine (the original vite-build output) for every route.
    for (const { routeDir, filePath, html } of captured) {
        if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
        }
        fs.writeFileSync(filePath, html);
        console.log(`Saved ${filePath}`);
    }

    if (fs.existsSync('dist/index.html')) {
        fs.copyFileSync('dist/index.html', 'dist/404.html');
        console.log('Created dist/404.html for GitHub Pages fallback.');
    }

    console.log('Done prerendering.');
    await browser.close();
    server.kill();
    process.exit(0);
}

prerender().catch(err => {
    console.error(err);
    process.exit(1);
});
