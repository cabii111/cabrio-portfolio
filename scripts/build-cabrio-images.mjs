import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';

const OUT = 'public/assets';
mkdirSync(OUT, { recursive: true });

// User's uploaded cutout in root
const src = 'pic.png';

for (const w of [1100, 720, 420]) {
  await sharp(src)
    .resize(w, null, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 0.8, m2: 1.5 })
    .webp({ quality: 95, alphaQuality: 100 })
    .toFile(`${OUT}/portrait-${w}.webp`);
}

// Check if user uploaded banner exists
const bannerUpload = 'C:/Users/DELL/.gemini/antigravity/brain/b2316479-212f-4fb4-ab2b-9ee59b98be1a/.user_uploaded/media_1793362147404_f9567a22.jpg';
if (existsSync(bannerUpload)) {
  await sharp(bannerUpload)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92 })
    .toFile(`${OUT}/og-image.jpg`);
}

console.log('Cabrio portrait assets rebuilt from pic.png successfully!');
