import puppeteer from 'puppeteer';
import { exec } from 'child_process';
import waitOn from 'wait-on';

async function test() {
    console.log('Starting dev server...');
    const server = exec('npm run dev');

    await waitOn({
        resources: ['http-get://localhost:3000'],
        timeout: 30000,
    });

    console.log('Server ready. Starting Puppeteer...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('pageerror', err => console.log('PAGE ERROR:\n', err.stack || err.message));
    page.on('console', msg => console.log('CONSOLE:', msg.text()));

    console.log('Navigating to /aesthetic...');
    await page.goto('http://localhost:3000/aesthetic', { waitUntil: 'networkidle0' });
    
    await browser.close();
    server.kill();
    process.exit(0);
}

test();
