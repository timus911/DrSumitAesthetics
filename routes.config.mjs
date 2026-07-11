// Single source of truth for every prerenderable route on the site.
// Both prerender.js (which crawls each path) and generate-sitemap.mjs
// (which lists each path in sitemap.xml) import from here, so the two
// can no longer drift apart the way prerender.js, vite.config.ts's old
// vite-plugin-sitemap config, and the committed public/sitemap.xml did.
//
// Each entry: { path, priority, changefreq, sitemap }.
// `sitemap` defaults to true; set it false to still prerender a route
// (so it's reachable and has real content) without listing it in
// sitemap.xml — used for the SurgiSet privacy policy, which isn't
// content Google should be directed to promote.

const CORE_PAGES = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/about', priority: 0.6, changefreq: 'monthly' },
    { path: '/gallery', priority: 0.6, changefreq: 'monthly' },
    { path: '/reviews', priority: 0.6, changefreq: 'monthly' },
    { path: '/patient-journey', priority: 0.6, changefreq: 'monthly' },
    { path: '/international', priority: 0.6, changefreq: 'monthly' },
    { path: '/plastic-surgery-cost-chandigarh', priority: 0.6, changefreq: 'monthly' },
    { path: '/contact', priority: 0.6, changefreq: 'monthly' },
    { path: '/concerns', priority: 0.6, changefreq: 'monthly' },
    { path: '/blog', priority: 0.6, changefreq: 'monthly' },
    { path: '/faqs', priority: 0.6, changefreq: 'monthly' },
    { path: '/surgiset-privacy', priority: 0.3, changefreq: 'yearly', sitemap: false },
];

const CATEGORY_PAGES = [
    '/aesthetic',
    '/reconstructive',
    '/non-surgical',
    '/vascular',
].map(path => ({ path, priority: 0.8, changefreq: 'monthly' }));

// Mirrors constants.ts's PROCEDURES array ids. Kept as a flat list here
// (rather than imported from constants.ts) because prerender.js runs as
// plain Node and can't load a .ts module without a transpile step.
const PROCEDURE_IDS = [
    'tummy-tuck-chandigarh',
    'liposuction-chandigarh',
    'body-contouring-chandigarh',
    'fat-grafting-chandigarh',
    'buttock-lift-chandigarh',
    'facelift-chandigarh',
    'neck-lift-chandigarh',
    'lip-lift-chandigarh',
    'hair-transplant-chandigarh',
    'blepharoplasty-chandigarh',
    'rhinoplasty-nose-job-chandigarh',
    'otoplasty-chandigarh',
    'breast-augmentation-chandigarh',
    'breast-reduction-chandigarh',
    'breast-lift-chandigarh',
    'gynecomastia-surgery-chandigarh',
    'vaginoplasty-chandigarh',
    'labiaplasty-chandigarh',
    'scar-revision-chandigarh',
    'botox-chandigarh',
    'microneedling-chandigarh',
    'chemical-peeling',
    'dermal-fillers',
    'microvascular-repair',
    'traumatic-reconstruction',
    'facial-fracture-surgery',
    'nerve-vessel-tendon-repair',
    'hand-surgery-chandigarh',
    'hand-deformity-chandigarh',
    'cleft-lip-chandigarh',
    'burn-surgery-chandigarh',
    'bed-sore-surgery-chandigarh',
    'diabetic-foot-chandigarh',
    'varicose-veins-chandigarh',
    'vascular-surgery-chandigarh',
];
const PROCEDURE_PAGES = PROCEDURE_IDS.map(id => ({
    path: `/${id}`,
    priority: 0.9,
    changefreq: 'weekly',
}));

// Mirrors pages/Concerns.tsx's zone ids (App.tsx: /concerns/:region).
const CONCERN_ZONES = [
    'Face', 'Nose', 'Eyes', 'Ears', 'Lips', 'Neck',
    'Breasts', 'Abdomen', 'Body', 'Buttock', 'Thighs', 'Arms',
];
const CONCERN_PAGES = CONCERN_ZONES.map(zone => ({
    path: `/concerns/${zone}`,
    priority: 0.6,
    changefreq: 'monthly',
}));

const BLOG_POST_IDS = [
    'what-to-expect-from-liposuction-recovery',
    'liposuction-vs-tummy-tuck-which-is-right-for-you',
    'does-liposuction-remove-fat-permanently',
    'the-mommy-makeover-journey',
    'high-definition-hd-liposuction-sculpting',
    'rhinoplasty-recovery-timeline',
    'preservation-rhinoplasty-secret-to-natural-noses',
    'blepharoplasty-eyelid-surgery-anti-aging',
    'traditional-vs-mini-facelift',
    'gynecomastia-surgery-india-causes-treatment',
    'breast-augmentation-implants-vs-fat-transfer',
    'what-to-expect-after-breast-reduction',
    'botox-vs-dermal-fillers',
    'the-rise-of-prejuvenation',
    'how-long-do-dermal-fillers-last',
    'preparing-for-your-first-aesthetic-consultation',
];
// '/blog' (the listing page itself) is already in CORE_PAGES.
const BLOG_PAGES = BLOG_POST_IDS.map(id => ({
    path: `/blog/${id}`,
    priority: 0.7,
    changefreq: 'monthly',
}));

export const ROUTES = [
    ...CORE_PAGES,
    ...CATEGORY_PAGES,
    ...PROCEDURE_PAGES,
    ...CONCERN_PAGES,
    ...BLOG_PAGES,
].map(r => ({ sitemap: true, ...r }));
