const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:3003/about', { waitUntil: 'networkidle0' });

    // Wait an extra 2 seconds for any async Helmet updates
    await new Promise(r => setTimeout(r, 2000));

    const tags = await page.evaluate(() => {
        const selectors = [
            'title',
            'meta[name="description"]',
            'meta[name="keywords"]',
            'meta[property^="og:"]',
            'meta[property^="twitter:"]',
            'meta[name^="twitter:"]',
            'link[rel="canonical"]',
            'script[type="application/ld+json"]',
            'meta[data-rh]'
        ];
        const results = {};
        selectors.forEach(s => {
            const els = document.querySelectorAll(s);
            if (els.length > 0) {
                results[s] = Array.from(els).map(e => e.outerHTML);
            }
        });
        return results;
    });

    console.log(JSON.stringify(tags, null, 2));
    await browser.close();
})();
