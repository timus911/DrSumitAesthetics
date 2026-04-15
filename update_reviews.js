import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REVIEWS_DIR = path.join(__dirname, 'public', 'reviews');
const TARGET_FILE = path.join(__dirname, 'pages', 'Reviews.tsx');

const files = fs.readdirSync(REVIEWS_DIR)
    .filter(file => file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'));

console.log(`Found ${files.length} review images.`);

const reviewsArrayString = `const GOOGLE_REVIEWS = [\n` + files.map((file, index) => {
    return `    { id: ${index + 1}, src: \`\${import.meta.env.BASE_URL}reviews/${file}\`, alt: "Patient Review ${index + 1}" },`;
}).join('\n') + `\n];`;

let content = fs.readFileSync(TARGET_FILE, 'utf8');

// Regex to find the existing GOOGLE_REVIEWS definition
// It looks for "const GOOGLE_REVIEWS =" followed by anything until the matching closing bracket/semicolon.
// Since we have a complex replacement, we'll look for the start and a robust end or just replace the specific placeholder we added earlier if it matches.
// The previous code has:
// const GOOGLE_REVIEWS = Array.from({ length: 147 }, (_, i) => ({
//   id: i + 1,
//   src: `${import.meta.env.BASE_URL}reviews/review${i + 1}.jpg`, // Adjust extension if they are png
//   alt: `Patient Review ${i + 1}`
// }));

// We will replace the entire variable declaration block.
const regex = /const GOOGLE_REVIEWS = [\s\S]*? \}\)\);/;

if (regex.test(content)) {
    content = content.replace(regex, reviewsArrayString);
} else {
    // Fallback if the previous regex doesn't match exactly (e.g. formatting differences)
    // We try to match "const GOOGLE_REVIEWS = ... ;"
    // But since we just edited it, let's try to match what we wrote.
    // If that fails, we can try to matches the array syntax if it was reverted.
    const regexBackup = /const GOOGLE_REVIEWS = Array\.from[\s\S]*?\)\);/;
    if (regexBackup.test(content)) {
        content = content.replace(regexBackup, reviewsArrayString);
    } else {
        console.error("Could not find GOOGLE_REVIEWS definition to replace.");
        process.exit(1);
    }
}

fs.writeFileSync(TARGET_FILE, content, 'utf8');
console.log("Successfully updated Reviews.tsx");
