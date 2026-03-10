const fs = require('fs');
const { BLOG_POSTS } = require('./constants.js'); // Wait, constants is TS. I'll just parse it.

const constantsCode = fs.readFileSync('./constants.ts', 'utf8');

// Extract all IDs from the text roughly using a regex matched to id: "..."
const idMatches = [...constantsCode.matchAll(/id:\s*"([^"]+)"/g)];
// the first match might not be a blog post, but in constants.ts blog posts are the only ones with an 'id' string property? 
// Procedure items have 'id' as well!
// Let's just hardcode the 14 new routes to append to vite.config.ts

const newRoutes = [
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

let viteConfig = fs.readFileSync('./vite.config.ts', 'utf8');

// Find the routes array end:
//     '/blog/what-to-expect-from-liposuction-recovery'
//   ];
let appendStr = '';
newRoutes.forEach(r => {
    appendStr += \`,\n    '\${r}'\`;
});

viteConfig = viteConfig.replace(
    "'/blog/what-to-expect-from-liposuction-recovery'", 
    "'/blog/what-to-expect-from-liposuction-recovery'" + appendStr
);

fs.writeFileSync('./vite.config.ts', viteConfig, 'utf8');
console.log("Updated vite.config.ts with 14 new blog routes");
