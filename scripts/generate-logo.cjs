const sharp = require('sharp');

const source = process.argv[2] || 'public/logo.svg';
const output = process.argv[3] || 'public/logo-512.png';

const CANVAS = 512;
const CONTENT = 380; // leaves a margin around the mark rather than edge-to-edge
const OFFSET = (CANVAS - CONTENT) / 2;
const BACKGROUND = '#0a0a0a'; // site background color (index.html body style)

async function run() {
    // sharp's trim() doesn't operate correctly when chained directly onto an
    // SVG source — materialize to a raster buffer first, then trim the
    // rasterized image's transparent margins (the source SVG's viewBox has
    // a lot of empty space around the actual mark).
    const raw = await sharp(source, { density: 300 }).png().toBuffer();
    const trimmed = await sharp(raw).trim().toBuffer();
    const mark = await sharp(trimmed)
        .resize(CONTENT, CONTENT, { fit: 'contain', background: '#00000000' })
        .png()
        .toBuffer();

    // Composite onto an explicit opaque canvas rather than flatten()'ing —
    // more reliable for fully eliminating transparency at the resize/pad
    // seams than chaining resize -> extend -> flatten.
    await sharp({
        create: { width: CANVAS, height: CANVAS, channels: 3, background: BACKGROUND },
    })
        .composite([{ input: mark, left: OFFSET, top: OFFSET }])
        .png()
        .toFile(output);

    console.log(`Wrote ${output} (${CANVAS}x${CANVAS}) from ${source}`);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
