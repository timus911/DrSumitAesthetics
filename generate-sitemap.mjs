import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import { ROUTES } from './routes.config.mjs';

const HOSTNAME = 'https://drsumitaesthetics.com';

async function generateSitemap() {
    const lastmod = new Date().toISOString();

    const links = ROUTES
        .filter(r => r.sitemap)
        // Emit the trailing-slash form: GitHub Pages 301s /slug to /slug/, so the
        // bare path listed here was pointing Google at a redirect on every URL.
        .map(({ path, priority, changefreq }) => ({
            url: path === '/' ? '/' : `${path}/`, priority, changefreq, lastmod
        }));

    const stream = new SitemapStream({ hostname: HOSTNAME });
    const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(data => data.toString());

    if (!fs.existsSync('dist')) fs.mkdirSync('dist');
    fs.writeFileSync('dist/sitemap.xml', xml);

    console.log(`Wrote dist/sitemap.xml (${links.length} URLs).`);
}

generateSitemap().catch(err => {
    console.error(err);
    process.exit(1);
});
