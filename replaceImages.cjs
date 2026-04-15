const fs = require('fs');

let code = fs.readFileSync('constants.ts', 'utf8');

const replacements = {
    "/blog-lipo-vs-tummy-tuck.png": "/tummy-tuck-aesthetic.jpg",
    "/blog-permanence.png": "/body-contouring-aesthetic.png",
    "/blog-mommy-makeover.png": "/tummy-tuck-aesthetic.jpg",
    "/blog-hd-lipo.png": "/hd-lipo-aesthetic.jpg",
    "/blog-rhinoplasty-recovery.png": "/rhinoplasty-aesthetic.jpg",
    "/blog-preservation-rhino.png": "/rhinoplasty-aesthetic.jpg",
    "/blog-eyelid-surgery.png": "/blepharoplasty-aesthetic.jpg",
    "/blog-facelift-options.png": "/facelift-aesthetic.jpg",
    "/blog-gynecomastia.png": "/gynecomastia-aesthetic.jpg",
    "/blog-breast-aug-options.png": "/breast-augmentation-aesthetic.png",
    "/blog-breast-reduction.png": "/breast-reduction-aesthetic.jpg",
    "/blog-botox-vs-fillers.png": "/botox-procedure.jpg",
    "/blog-prejuvenation.png": "/injectables-non-surgical.jpg",
    "/blog-filler-longevity.png": "/fat-grafting-aesthetic.jpg",
    "/blog-consultation-prep.png": "/dr-sumit-portrait.jpg"
};

Object.keys(replacements).forEach(key => {
    const value = replacements[key];
    code = code.split('image: "' + key + '"').join('image: "' + value + '"');
});

fs.writeFileSync('constants.ts', code);
console.log('Replaced placeholder blog images with procedure images.');
