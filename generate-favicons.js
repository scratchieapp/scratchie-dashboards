import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read the SVG file
const svgBuffer = readFileSync(join(__dirname, 'public', 'favicon.svg'));

// Generate different sizes
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' }
];

async function generateFavicons() {
  for (const { size, name } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(__dirname, 'public', name));
    console.log(`Generated ${name}`);
  }
  
  // Also create a standard favicon.ico (using 32x32)
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(join(__dirname, 'public', 'favicon.ico'));
  console.log('Generated favicon.ico');
}

generateFavicons().catch(console.error);