const fs = require('fs');
const path = require('path');
const readline = require('readline');
const sharp = require('sharp');

// Paths configuration
const PROJECT_DIR = __dirname;
const UPLOAD_DIR = path.join(PROJECT_DIR, 'Upload');
const PUBLIC_DIR = path.join(PROJECT_DIR, 'public');
const CONSTANTS_FILE = path.join(PROJECT_DIR, 'constants.ts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function run() {
  try {
    console.log('====================================================');
    console.log('      SSG Aesthetics - Gallery Upload Protocol      ');
    console.log('====================================================\n');

    // 1. Ensure directories exist
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      console.log(`Created Upload directory at: ${UPLOAD_DIR}`);
      console.log('Please place your raw images in the Upload folder and run this script again.\n');
      rl.close();
      return;
    }

    // 2. Scan Upload directory for images
    const files = fs.readdirSync(UPLOAD_DIR).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.webp', '.tiff', '.heic', '.heif'].includes(ext);
    });

    if (files.length === 0) {
      console.log(`No images found in the Upload folder: ${UPLOAD_DIR}`);
      console.log('Please copy the images you want to upload into the Upload folder first.\n');
      rl.close();
      return;
    }

    // 3. Prompt user to select an image
    console.log('Select an image to process:');
    files.forEach((file, idx) => {
      const stats = fs.statSync(path.join(UPLOAD_DIR, file));
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`  [${idx + 1}] ${file} (${sizeMB} MB)`);
    });
    
    let imageChoice = -1;
    while (imageChoice < 0 || imageChoice >= files.length) {
      const answer = await question('\nEnter image number (or q to quit): ');
      if (answer.toLowerCase() === 'q') {
        rl.close();
        return;
      }
      const num = parseInt(answer, 10) - 1;
      if (!isNaN(num) && num >= 0 && num < files.length) {
        imageChoice = num;
      } else {
        console.log('Invalid selection. Please try again.');
      }
    }

    const selectedFile = files[imageChoice];
    const inputFilePath = path.join(UPLOAD_DIR, selectedFile);
    console.log(`\nSelected image: ${selectedFile}`);

    // 4. Parse procedures from constants.ts
    if (!fs.existsSync(CONSTANTS_FILE)) {
      console.error(`Error: constants.ts not found at ${CONSTANTS_FILE}`);
      rl.close();
      return;
    }

    const constantsContent = fs.readFileSync(CONSTANTS_FILE, 'utf8');
    const proceduresPart = constantsContent.split('export const BLOG_POSTS')[0];
    const procedureRegex = /id:\s*"([^"]+)",\s*title:\s*"([^"]+)",/g;
    let match;
    const procedures = [];
    while ((match = procedureRegex.exec(proceduresPart)) !== null) {
      procedures.push({ id: match[1], title: match[2] });
    }

    if (procedures.length === 0) {
      console.error('Error: No procedures found in constants.ts!');
      rl.close();
      return;
    }

    // 5. Prompt user to find a procedure
    let selectedProcedure = null;
    while (!selectedProcedure) {
      const search = await question('\nSearch for target procedure (e.g. "tummy", "lipo", "nose", or Enter for all): ');
      const query = search.trim().toLowerCase();
      
      const filtered = procedures.filter(p => 
        p.title.toLowerCase().includes(query) || p.id.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        console.log('No procedures match your search. Showing all.');
        procedures.forEach((p, idx) => {
          console.log(`  [${idx + 1}] ${p.title} (${p.id})`);
        });
      } else {
        console.log('\nMatching Procedures:');
        filtered.forEach((p, idx) => {
          console.log(`  [${idx + 1}] ${p.title} (${p.id})`);
        });
      }

      const listToSelectFrom = filtered.length > 0 ? filtered : procedures;
      const selection = await question('\nEnter procedure number (or s to search again, q to quit): ');
      
      if (selection.toLowerCase() === 'q') {
        rl.close();
        return;
      }
      if (selection.toLowerCase() === 's') {
        continue;
      }

      const num = parseInt(selection, 10) - 1;
      if (!isNaN(num) && num >= 0 && num < listToSelectFrom.length) {
        selectedProcedure = listToSelectFrom[num];
      } else {
        console.log('Invalid selection. Please try again.');
      }
    }

    console.log(`\nSelected Procedure: ${selectedProcedure.title} (${selectedProcedure.id})`);

    // 6. Read constants.ts again to get current gallery list for this procedure
    const fullContent = fs.readFileSync(CONSTANTS_FILE, 'utf8');
    const idIndex = fullContent.indexOf(`id: "${selectedProcedure.id}"`);
    if (idIndex === -1) {
      throw new Error(`Could not locate procedure id "${selectedProcedure.id}" in constants.ts`);
    }

    // Determine boundaries of this procedure block
    // It ends at the next block boundary or end of file
    let nextBoundaryIndex = fullContent.indexOf('  {', idIndex);
    if (nextBoundaryIndex === -1) {
      nextBoundaryIndex = fullContent.indexOf('export const BLOG_POSTS', idIndex);
    }
    if (nextBoundaryIndex === -1) {
      nextBoundaryIndex = fullContent.length;
    }

    const blockText = fullContent.slice(idIndex, nextBoundaryIndex);
    
    // Parse current gallery files in this block to determine count
    // E.g. gallery: ["/path1.webp", "/path2.webp"]
    const galleryRegex = /gallery:\s*\[([\s\S]*?)\]/;
    const galleryMatch = blockText.match(galleryRegex);
    let galleryCount = 0;
    if (galleryMatch) {
      const pathsText = galleryMatch[1];
      const paths = pathsText.split(',').map(p => p.trim()).filter(p => p.length > 0);
      galleryCount = paths.length;
      console.log(`Current gallery count for this procedure: ${galleryCount}`);
    } else {
      console.log('No gallery array currently exists for this procedure (will create one).');
    }

    // Generate output filename
    // Clean procedure name as prefix (e.g. tummy-tuck-chandigarh -> tummy-tuck)
    const namePrefix = selectedProcedure.id
      .replace('-chandigarh', '')
      .replace('-surgery', '')
      .replace('-nose-job', '');
    
    const outputFilename = `${namePrefix}-result-${galleryCount + 1}.webp`;
    const outputFilePath = path.join(PUBLIC_DIR, outputFilename);

    // 7. Process image with Sharp
    console.log('\n----------------------------------------------------');
    console.log(`Optimizing image: ${selectedFile} -> ${outputFilename}...`);
    
    const originalSize = fs.statSync(inputFilePath).size;
    
    await sharp(inputFilePath)
      .resize({ width: 1200, withoutEnlargement: true }) // Standard high-quality responsive width
      .webp({ quality: 80 }) // Highly optimized quality threshold
      .toFile(outputFilePath);

    const optimizedSize = fs.statSync(outputFilePath).size;
    const originalMB = (originalSize / 1024 / 1024).toFixed(2);
    const optimizedKB = (optimizedSize / 1024).toFixed(2);
    const savedPercentage = ((1 - (optimizedSize / originalSize)) * 100).toFixed(1);

    console.log('Image optimization complete!');
    console.log(`  Original Size:  ${originalMB} MB`);
    console.log(`  Optimized Size: ${optimizedKB} KB`);
    console.log(`  Space Saved:    ${savedPercentage}%`);
    console.log('----------------------------------------------------');

    // 8. Update constants.ts
    console.log('\nUpdating constants.ts with new image path...');
    let updatedFullContent = '';
    
    if (galleryMatch) {
      // Gallery array exists, append new image path
      const galleryBlockIndex = fullContent.indexOf('gallery: [', idIndex);
      const insertIndex = galleryBlockIndex + 'gallery: ['.length;
      
      updatedFullContent = 
        fullContent.slice(0, insertIndex) +
        `\n      "/${outputFilename}",` +
        fullContent.slice(insertIndex);
    } else {
      // Gallery array doesn't exist, insert it right after the id line
      const idLineIndex = fullContent.indexOf(`id: "${selectedProcedure.id}",`);
      if (idLineIndex === -1) {
        throw new Error('Could not find id line with trailing comma.');
      }
      const insertIndex = idLineIndex + `id: "${selectedProcedure.id}",`.length;
      
      updatedFullContent =
        fullContent.slice(0, insertIndex) +
        `\n    gallery: ["/${outputFilename}"],` +
        fullContent.slice(insertIndex);
    }

    fs.writeFileSync(CONSTANTS_FILE, updatedFullContent, 'utf8');
    console.log('Successfully updated constants.ts!');
    
    // 9. Remove original file from Upload directory to keep it clean (optional - ask user or just do it)
    console.log(`\nNew image is located at: public/${outputFilename}`);
    console.log('It will automatically show up in the results gallery page.');
    console.log('Feel free to test it by running "npm run dev".\n');

  } catch (error) {
    console.error('\nAn error occurred during execution:', error);
  } finally {
    rl.close();
  }
}

run();
