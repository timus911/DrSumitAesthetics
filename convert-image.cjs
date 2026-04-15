const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputFile = 'Upload/UpperBleph.png';
const outputFile = 'public/blepharoplasty-result-1.webp';

async function convertImage() {
    try {
        console.log(`Processing ${inputFile}...`);
        
        await sharp(inputFile)
            .resize({ width: 1200, withoutEnlargement: true }) // Standard content width
            .webp({ quality: 80 }) // High quality but optimized
            .toFile(outputFile);
            
        console.log(`Successfully converted to ${outputFile}`);
        
        // Final size check
        const stats = fs.statSync(outputFile);
        console.log(`Original Size: ${(fs.statSync(inputFile).size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`New Size: ${(stats.size / 1024).toFixed(2)} KB`);
        
    } catch (error) {
        console.error('Error during conversion:', error);
        process.exit(1);
    }
}

convertImage();
