// Fails the build if the site picks up wording or images that the NMC's
// Guidelines on Ethical Advertising and Public Communication (Public Notice
// R-13014/01/2024-Ethics, 6 October 2026) do not allow. Runs before
// `vite build`, so nothing non-compliant can reach the deploy.
import fs from 'fs';
import path from 'path';

const SOURCES = ['constants.ts', 'index.html', 'App.tsx', 'pages', 'components'];

// [pattern, clause]. Patterns are case-insensitive.
const BANNED = [
    [/\bbest (plastic|cosmetic|aesthetic|surgeon|doctor|clinic|hospital|hair transplant|liposuction|rhinoplasty)/, '8.1(iii), 8.1(ix): "best"'],
    [/\bbest results\b/, '8.1(ix): "best"'],
    [/\bno\.? ?1\b|#1\b|number one/, '8.1(iii), 8.1(ix): "No.1"'],
    [/\btop[- ](rated|surgeon|plastic|doctor|clinic)/, '8.1(ix): "top"'],
    [/\bleading (plastic|aesthetic|cosmetic|surgeon|clinic|hospital|provider|medical finance)/, '8.1(ix): "leading"'],
    [/most trusted|unmatched|unparalleled|world[- ](class|renowned)|\brenowned\b/, '8.1(ix): superiority claim'],
    [/board[- ]certified/, '8.1(iii): unverifiable credential'],
    [/\bguarantee[sd]?\b(?<!can be guaranteed)/, '8.1(iii): "guaranteed"'],
    [/painless|pain-free/, '8.1(iii): "painless treatment"'],
    [/miracle|exclusive cure/, '8.1(iii)'],
    [/100% ?(natural|success|safe|result|satisf)|success rate/, '8.1(iii): success rates'],
    [/0% interest|discount|free consultation|cashback|limited[- ](time|period) offer/, '8.1(x): inducement'],
    [/book (a |your )?(private |confidential )?(consultation|consult|session)|request (a |specialized )?consultation/, '8.1(ii): solicitation'],
    [/state[- ]of[- ]the[- ]art|revolutionary/, '8.1(iii): exaggerated claim'],
];

// Images of patients' results or of patient reviews (8.1(v), 6.2, 3.2 Expl. V).
const BANNED_FILES = [/-result(-\d+)?\.(webp|jpe?g|png)$/i, /^gallery-\d+\./i, /^reviews$/i];

const walk = (p) => fs.statSync(p).isDirectory()
    ? fs.readdirSync(p).flatMap(f => walk(path.join(p, f)))
    : [p];

const problems = [];

for (const file of SOURCES.flatMap(walk).filter(f => /\.(tsx?|html)$/.test(f))) {
    fs.readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
        for (const [re, clause] of BANNED) {
            const m = line.match(new RegExp(re.source, 'i'));
            if (m) problems.push(`${file}:${i + 1}  "${m[0]}"  (${clause})`);
        }
    });
}

for (const name of fs.readdirSync('public')) {
    if (BANNED_FILES.some(re => re.test(name))) problems.push(`public/${name}  (8.1(v) / 3.2 Expl. V: patient results or reviews)`);
}

if (problems.length) {
    console.error('NMC advertising check failed:\n  ' + problems.join('\n  '));
    console.error('\nRewrite these, or tighten the pattern in scripts/check-nmc-compliance.mjs if it is a false match.');
    process.exit(1);
}
console.log('NMC advertising check passed.');
