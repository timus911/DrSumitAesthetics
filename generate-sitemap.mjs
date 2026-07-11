import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import { ROUTES } from './routes.config.mjs';

const HOSTNAME = 'https://drsumitaesthetics.com';

async function generateSitemap() {
    const lastmod = new Date().toISOString();

    const links = ROUTES
        .filter(r => r.sitemap)
        .map(({ path, priority, changefreq }) => ({ url: path, priority, changefreq, lastmod }));

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
