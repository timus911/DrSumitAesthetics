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
    '/tummy-tuck-chandigarh',
    '/rhinoplasty-nose-job-chandigarh',
    '/breast-augmentation-chandigarh',
    '/facelift-chandigarh',
    '/gynecomastia-surgery-chandigarh',
    '/hair-transplant-chandigarh',
    '/blepharoplasty-chandigarh',
    '/blog',
    '/blog/what-to-expect-from-liposuction-recovery',
    '/blog/liposuction-vs-tummy-tuck-which-is-right-for-you',
    '/blog/does-liposuction-remove-fat-permanently',
    '/blog/the-mommy-makeover-journey',
    '/blog/high-definition-hd-liposuction-sculpting',
    '/blog/rhinoplasty-recovery-timeline',
    '/blog/preservation-rhinoplasty-secret-to-natural-noses',
    '/blog/blepharoplasty-eyelid-surgery-anti-aging',
    '/blog/traditional-vs-mini-facelift',
    '/blog/gynecomastia-surgery-india-causes-treatment',
    '/blog/breast-augmentation-implants-vs-fat-transfer',
    '/blog/what-to-expect-after-breast-reduction',
    '/blog/botox-vs-dermal-fillers',
    '/blog/the-rise-of-prejuvenation',
    '/blog/how-long-do-dermal-fillers-last',
    '/blog/preparing-for-your-first-aesthetic-consultation'
];

async function prerender() {
    console.log('Starting dev server for prerendering...');
    const server = exec('npm run dev');

    await waitOn({
        resources: ['http-get://localhost:3000'],
        timeout: 30000,
    });

    console.log('Server is ready. Starting Puppeteer...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });
    const page = await browser.newPage();

    // Create base dist directory if it doesn't exist.
    // We assume `npm run build` runs before this script
    if (!fs.existsSync('dist')) fs.mkdirSync('dist');

    for (const route of routes) {
        console.log(`Prerendering ${route}...`);
        await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0' });

        // Capture the fully-rendered HTML after React + Helmet have mounted.
        // Using page.content() directly is the correct approach: Puppeteer serialises
        // the live DOM *after* networkidle0, so react-helmet-async has already injected
        // all dynamic <title>, <meta>, <link rel="canonical">, og:*, twitter:*, and
        // JSON-LD <script> tags into <head>. No surgical string-replacement needed.
        let html = await page.content();

        // Strip the Vite dev-server HMR client script — not needed in static output.
        html = html.replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '');

        // Also strip the importmap block that references esm.sh CDN URLs that were
        // in the dev index.html but are irrelevant for the built, bundled output.
        html = html.replace(/<script type="importmap">[\s\S]*?<\/script>/g, '');

        const routeDir = path.join('dist', route === '/' ? '' : route);
        if (!fs.existsSync(routeDir)) {
            fs.mkdirSync(routeDir, { recursive: true });
        }

        const filePath = path.join(routeDir, 'index.html');

        // Remove redundant fallback SEO tags from index.html template
        // React 19 hoists its own tags, so we want to keep ONLY the ones React injected
        // specifically for the ones that usually exist only once (title, description)
        
        // Remove the original static title (the one without data-rh or the later one)
        // Actually, since we use page.content(), we might have two <title> tags.
        // We want to keep the one React put in. 
        // A simple way is to remove the specific fallback strings.
        const fallbackTitle = "<title>Dr. Sumit - Plastic & Aesthetic Surgeon in Chandigarh | Sector 34</title>";
        const fallbackDesc = '<meta name="description" content="Dr. Sumit Singh Gautam is a Board Certified Plastic Surgeon specializing in high-definition body sculpting, facial aesthetic surgery, and reconstructive procedures in Chandigarh.">';
        const fallbackKeywords = '<meta name="keywords" content="best plastic surgeon chandigarh, cosmetic surgeon india, dr sumit singh gautam, liposuction chandigarh, rhinoplasty india">';

        html = html.replace(fallbackTitle, '');
        html = html.replace(fallbackDesc, '');
        html = html.replace(fallbackKeywords, '');

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
