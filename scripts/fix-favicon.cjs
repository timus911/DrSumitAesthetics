const sharp = require('sharp');

const source = process.argv[2] || 'public/favicon.webp';
const output = process.argv[3] || 'public/favicon-192x192.png';

sharp(source)
    .resize(192, 192, { fit: 'cover' })
    .png()
    .toFile(output)
    .then(() => console.log(`Wrote ${output} (192x192) from ${source}`))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
