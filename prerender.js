import puppeteer from 'puppeteer';
import { exec } from 'child_process';
import waitOn from 'wait-on';
import fs from 'fs';
import path from 'path';

const routes = [
    '/',
    '/about',
    '/aesthetic',
    '/reconstructive',
    '/non-surgical',
    '/vascular',
    '/gallery',
    '/reviews',
    '/patient-journey',
    '/international',
    '/plastic-surgery-cost-chandigarh',
    '/surgiset-privacy',
    '/contact',
    '/concerns',
    '/liposuction-chandigarh',
    '/blog',
    '/blog/what-to-expect-from-liposuction-recovery'
];

async function prerender() {
    console.log('Starting dev server for prerendering...');
    const server = exec('npm run dev');

    await waitOn({
        resources: ['http-get://localhost:3000'],
        timeout: 30000,
    });

    console.log('Server is ready. Starting Puppeteer...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Create base dist directory if it doesn't exist.
    // We assume `npm run build` runs before this script
    if (!fs.existsSync('dist')) fs.mkdirSync('dist');

    for (const route of routes) {
        console.log(`Prerendering ${route}...`);
        await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0' });

        let html = await page.content();

        // Remove dev server scripts injected by Vite
        html = html.replace(/<script type="module" src="\/@vite\/client"><\/script>/, '');

        const routeDir = path.join('dist', route === '/' ? '' : route);
        if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
        }

        const filePath = path.join(routeDir, 'index.html');
        // If an index.html exists, inject the app HTML into the root div
        // We'll scrape the #root innerHTML and inject it.
        const rootContent = await page.evaluate(() => document.getElementById('root')?.innerHTML || '');

        if (fs.existsSync('dist/index.html')) {
            let baseHtml = fs.readFileSync('dist/index.html', 'utf8');
            baseHtml = baseHtml.replace('<div id="root"></div>', `<div id="root">${rootContent}</div>`);
            // Add static title based on route purely for SSG bot crawling
            baseHtml = baseHtml.replace('<title>Dr. Sumit Aesthetics</title>', `<title>Dr. Sumit Aesthetics - ${route}</title>`);
            fs.writeFileSync(filePath, baseHtml);
        } else {
            // Fallback if built dist/index.html isn't there
            fs.writeFileSync(filePath, html);
        }

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
