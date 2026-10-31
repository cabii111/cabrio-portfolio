import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'public/projects/overview';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const W = 1600;
const H = 1000;

// Helper to create a dark canvas with radial gradient
function createGradientCanvas(bgHex, radialGlowHex, glowX = 800, glowY = 500, glowR = 700) {
  return Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="${glowX}" cy="${glowY}" r="${glowR}" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="${radialGlowHex}" stop-opacity="0.35"/>
          <stop offset="60%" stop-color="${radialGlowHex}" stop-opacity="0.08"/>
          <stop offset="100%" stop-color="${radialGlowHex}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="${bgHex}"/>
      <rect width="${W}" height="${H}" fill="url(#bgGlow)"/>
    </svg>
  `);
}

// 1. HERO PAGES OVERVIEW
async function buildHeroOverview() {
  console.log('Generating Hero Pages Overview...');
  const bg = await sharp(createGradientCanvas('#0c0914', '#a855f7', 950, 420, 850))
    .png()
    .toBuffer();

  // Hero 1 (Caphuse - 3063x2231)
  const hero1Raw = await sharp('public/projects/hero pages/hero 1/Desktop - 1.png')
    .resize(980, 640, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Hero 2 (Creative Agency - 3061x2229)
  const hero2Raw = await sharp('public/projects/hero pages/hero 2/Desktop - 1 (2).png')
    .resize(680, 440, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Hero 7 (MacBook Pro responsive screen - 1728x1117)
  const hero7Raw = await sharp('public/projects/hero pages/hero 7/MacBook Pro 16_ - 1.png')
    .resize(720, 465, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Helper to wrap image with rounded corners, subtle border, and shadow
  async function wrapCard(imgBuffer, width, height, radius = 14, borderColor = 'rgba(255,255,255,0.18)') {
    const mask = Buffer.from(`
      <svg width="${width}" height="${height}">
        <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="#fff"/>
      </svg>
    `);
    const rounded = await sharp(imgBuffer)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const border = Buffer.from(`
      <svg width="${width}" height="${height}">
        <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${radius}" ry="${radius}" fill="none" stroke="${borderColor}" stroke-width="1.2"/>
      </svg>
    `);

    return sharp(rounded)
      .composite([{ input: border }])
      .png()
      .toBuffer();
  }

  // Create drop shadow box
  function createDropShadow(w, h, rx = 14, blur = 30, opacity = 0.65) {
    return Buffer.from(`
      <svg width="${w + blur * 2}" height="${h + blur * 2}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="${Math.round(blur * 0.4)}" stdDeviation="${Math.round(blur * 0.5)}" flood-color="#000" flood-opacity="${opacity}"/>
          </filter>
        </defs>
        <rect x="${blur}" y="${blur}" width="${w}" height="${h}" rx="${rx}" fill="#000" filter="url(#shadow)"/>
      </svg>
    `);
  }

  const c1 = await wrapCard(hero1Raw, 980, 640, 16, 'rgba(255,255,255,0.22)');
  const c2 = await wrapCard(hero2Raw, 680, 440, 12, 'rgba(255,255,255,0.15)');
  const c7 = await wrapCard(hero7Raw, 720, 465, 12, 'rgba(255,255,255,0.18)');

  // Tag badge
  const badge = Buffer.from(`
    <svg width="340" height="42" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="340" height="42" rx="21" fill="#000" fill-opacity="0.75" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <circle cx="24" cy="21" r="5" fill="#a855f7"/>
      <text x="38" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#fff" letter-spacing="2.5">9 RESPONSIVE HERO SECTIONS</text>
    </svg>
  `);

  const s1 = createDropShadow(980, 640, 16, 40, 0.85);
  const s2 = createDropShadow(680, 440, 12, 30, 0.7);
  const s7 = createDropShadow(720, 465, 12, 35, 0.75);

  const heroFinal = await sharp(bg)
    .composite([
      // Layer 1: Left background card (Hero 2 - Creative Studio)
      { input: s2, left: 60 - 30, top: 120 - 30 },
      { input: c2, left: 60, top: 120 },

      // Layer 2: Right background card (Hero 7 - MacBook Pro)
      { input: s7, left: 820 - 35, top: 415 - 35 },
      { input: c7, left: 820, top: 415 },

      // Layer 3: Main prominent hero card (Hero 1 - Caphuse)
      { input: s1, left: 240 - 40, top: 180 - 40 },
      { input: c1, left: 240, top: 180 },

      // Layer 4: Floating badge
      { input: badge, left: 630, top: 138 },
    ])
    .webp({ quality: 92 })
    .toFile(`${OUT_DIR}/hero-overview.webp`);

  // Also write jpeg for universal fallback
  await sharp(`${OUT_DIR}/hero-overview.webp`)
    .jpeg({ quality: 92 })
    .toFile(`${OUT_DIR}/hero-overview.jpg`);

  console.log('✓ Hero Pages Overview created:', `${OUT_DIR}/hero-overview.webp`);
}

// 2. WEB DESIGNS OVERVIEW (TN Agri University & BioFarmux)
async function buildWebOverview() {
  console.log('Generating Web Designs Overview...');
  const bg = await sharp(createGradientCanvas('#060c14', '#0f4c6e', 1100, 380, 900))
    .png()
    .toBuffer();

  const tnRaw = await sharp('public/projects/web design/TN Agri university.png')
    .resize(1000, 500, { fit: 'cover', position: 'top' })
    .toBuffer();

  const bioRaw = await sharp('public/projects/web design/Biofarmux.png')
    .resize(1000, 500, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Create desktop browser mockup
  async function createBrowserMockup(imgBuffer, url, width = 1000, contentHeight = 500) {
    const chromeHeight = 40;
    const totalHeight = chromeHeight + contentHeight;
    const radius = 14;

    const chromeSvg = Buffer.from(`
      <svg width="${width}" height="${chromeHeight}" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0,${radius} Q 0,0 ${radius},0 L ${width - radius},0 Q ${width},0 ${width},${radius} L ${width},${chromeHeight} L 0,${chromeHeight} Z" fill="#14171d"/>
        <line x1="0" y1="${chromeHeight}" x2="${width}" y2="${chromeHeight}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
        <!-- Window Controls -->
        <circle cx="22" cy="20" r="5.5" fill="#ff5f56"/>
        <circle cx="38" cy="20" r="5.5" fill="#ffbd2e"/>
        <circle cx="54" cy="20" r="5.5" fill="#27c93f"/>
        <!-- Address Bar -->
        <rect x="90" y="8" width="${width - 180}" height="24" rx="12" fill="#0c0e12" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
        <!-- Lock icon & URL -->
        <text x="${width / 2}" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#a0aab8" text-anchor="middle" letter-spacing="0.5">https://${url}</text>
      </svg>
    `);

    // Combine chrome + image
    const combined = await sharp({
      create: {
        width,
        height: totalHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        { input: chromeSvg, top: 0, left: 0 },
        { input: imgBuffer, top: chromeHeight, left: 0 },
      ])
      .png()
      .toBuffer();

    // Round the outer container
    const mask = Buffer.from(`
      <svg width="${width}" height="${totalHeight}">
        <rect x="0" y="0" width="${width}" height="${totalHeight}" rx="${radius}" ry="${radius}" fill="#fff"/>
      </svg>
    `);

    const rounded = await sharp(combined)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const border = Buffer.from(`
      <svg width="${width}" height="${totalHeight}">
        <rect x="0.5" y="0.5" width="${width - 1}" height="${totalHeight - 1}" rx="${radius}" ry="${radius}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.2"/>
      </svg>
    `);

    return sharp(rounded)
      .composite([{ input: border }])
      .png()
      .toBuffer();
  }

  const browserTN = await createBrowserMockup(tnRaw, 'tamil-nadu-agricultural-university.vercel.app', 1040, 520);
  const browserBio = await createBrowserMockup(bioRaw, 'biofarmux.vercel.app', 1040, 520);

  // Drop shadow generator
  function createDropShadow(w, h, rx = 14, blur = 35, opacity = 0.8) {
    return Buffer.from(`
      <svg width="${w + blur * 2}" height="${h + blur * 2}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="${Math.round(blur * 0.45)}" stdDeviation="${Math.round(blur * 0.5)}" flood-color="#000" flood-opacity="${opacity}"/>
          </filter>
        </defs>
        <rect x="${blur}" y="${blur}" width="${w}" height="${h}" rx="${rx}" fill="#000" filter="url(#shadow)"/>
      </svg>
    `);
  }

  const sTN = createDropShadow(1040, 560, 14, 35, 0.7);
  const sBio = createDropShadow(1040, 560, 14, 45, 0.9);

  // Floating label badge
  const badge = Buffer.from(`
    <svg width="340" height="42" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="340" height="42" rx="21" fill="#000" fill-opacity="0.8" stroke="rgba(76,201,255,0.4)" stroke-width="1.2"/>
      <circle cx="24" cy="21" r="5" fill="#4cc9ff"/>
      <text x="38" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#fff" letter-spacing="2.5">LIVE PRODUCTION PLATFORMS</text>
    </svg>
  `);

  await sharp(bg)
    .composite([
      // Card 1: TN Agri University (top-left offset)
      { input: sTN, left: 60 - 35, top: 75 - 35 },
      { input: browserTN, left: 60, top: 75 },

      // Card 2: BioFarmux (bottom-right offset, overlapping in front)
      { input: sBio, left: 500 - 45, top: 350 - 45 },
      { input: browserBio, left: 500, top: 350 },

      // Floating badge
      { input: badge, left: 60, top: 30 },
    ])
    .webp({ quality: 92 })
    .toFile(`${OUT_DIR}/web-overview.webp`);

  await sharp(`${OUT_DIR}/web-overview.webp`)
    .jpeg({ quality: 92 })
    .toFile(`${OUT_DIR}/web-overview.jpg`);

  console.log('✓ Web Designs Overview created:', `${OUT_DIR}/web-overview.webp`);
}

// 3. APP DESIGNS OVERVIEW (Quick Byte Mobile 32 Screens)
async function buildAppOverview() {
  console.log('Generating App Designs Overview...');
  const bg = await sharp(createGradientCanvas('#0d0804', '#ff8c00', 800, 480, 800))
    .png()
    .toBuffer();

  // Screens to feature:
  // Center: qb1.jpg (Popular meals & food discovery)
  // Left: qb2.jpg (Item detail / burger toppings)
  // Right: qb20.jpg (Real-time order tracking)
  const qb1 = await sharp('public/projects/mobile app/32 screens/qb1.jpg')
    .resize(360, 780, { fit: 'cover' })
    .toBuffer();

  const qb2 = await sharp('public/projects/mobile app/32 screens/qb2.jpg')
    .resize(330, 715, { fit: 'cover' })
    .toBuffer();

  const qb20 = await sharp('public/projects/mobile app/32 screens/qb20.jpg')
    .resize(330, 715, { fit: 'cover' })
    .toBuffer();

  // Smartphone Mockup Maker
  async function createPhoneMockup(imgBuffer, width, height, isCenter = false) {
    const bezel = isCenter ? 12 : 10;
    const phoneW = width + bezel * 2;
    const phoneH = height + bezel * 2;
    const radius = 42;

    const screenRadius = radius - bezel + 2;
    const screenMask = Buffer.from(`
      <svg width="${width}" height="${height}">
        <rect x="0" y="0" width="${width}" height="${height}" rx="${screenRadius}" ry="${screenRadius}" fill="#fff"/>
      </svg>
    `);

    const screenRounded = await sharp(imgBuffer)
      .composite([{ input: screenMask, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Smartphone chassis SVG
    const chassisSvg = Buffer.from(`
      <svg width="${phoneW}" height="${phoneH}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bezelGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${isCenter ? '#2a1a0c' : '#1a1816'}"/>
            <stop offset="50%" stop-color="#0a0a0a"/>
            <stop offset="100%" stop-color="${isCenter ? '#3d240d' : '#141414'}"/>
          </linearGradient>
        </defs>
        <!-- Phone outer body -->
        <rect x="0" y="0" width="${phoneW}" height="${phoneH}" rx="${radius}" ry="${radius}" fill="url(#bezelGrad)"/>
        <!-- Metallic outer edge ring -->
        <rect x="0.8" y="0.8" width="${phoneW - 1.6}" height="${phoneH - 1.6}" rx="${radius}" ry="${radius}" fill="none" stroke="${
      isCenter ? 'rgba(255,170,51,0.5)' : 'rgba(255,255,255,0.18)'
    }" stroke-width="${isCenter ? '1.8' : '1.2'}"/>
        <!-- Inner bezel screen border -->
        <rect x="${bezel - 0.5}" y="${bezel - 0.5}" width="${width + 1}" height="${height + 1}" rx="${screenRadius}" ry="${screenRadius}" fill="none" stroke="#000" stroke-width="1.5"/>
      </svg>
    `);

    // Dynamic island & top speaker overlay on screen
    const islandSvg = Buffer.from(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Dynamic Island pill -->
        <rect x="${(width - 96) / 2}" y="10" width="96" height="26" rx="13" fill="#000"/>
        <!-- Camera dot -->
        <circle cx="${(width - 96) / 2 + 74}" cy="23" r="4.5" fill="#0d1424"/>
        <circle cx="${(width - 96) / 2 + 74}" cy="23" r="2" fill="#1b2a4a"/>
        <!-- Home bar -->
        <rect x="${(width - 120) / 2}" y="${height - 12}" width="120" height="4" rx="2" fill="#ffffff" fill-opacity="0.45"/>
      </svg>
    `);

    const screenWithIsland = await sharp(screenRounded)
      .composite([{ input: islandSvg }])
      .png()
      .toBuffer();

    return sharp(chassisSvg)
      .composite([{ input: screenWithIsland, top: bezel, left: bezel }])
      .png()
      .toBuffer();
  }

  function createDropShadow(w, h, rx = 42, blur = 40, opacity = 0.85) {
    return Buffer.from(`
      <svg width="${w + blur * 2}" height="${h + blur * 2}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="${Math.round(blur * 0.5)}" stdDeviation="${Math.round(blur * 0.5)}" flood-color="#000" flood-opacity="${opacity}"/>
          </filter>
        </defs>
        <rect x="${blur}" y="${blur}" width="${w}" height="${h}" rx="${rx}" fill="#000" filter="url(#shadow)"/>
      </svg>
    `);
  }

  const phoneCenter = await createPhoneMockup(qb1, 360, 780, true);
  const phoneLeft = await createPhoneMockup(qb2, 330, 715, false);
  const phoneRight = await createPhoneMockup(qb20, 330, 715, false);

  const sC = createDropShadow(384, 804, 42, 50, 0.95);
  const sL = createDropShadow(350, 735, 42, 35, 0.75);
  const sR = createDropShadow(350, 735, 42, 35, 0.75);

  // Badge
  const badge = Buffer.from(`
    <svg width="390" height="42" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="390" height="42" rx="21" fill="#000" fill-opacity="0.8" stroke="rgba(255,181,71,0.4)" stroke-width="1.2"/>
      <circle cx="24" cy="21" r="5" fill="#ffb547"/>
      <text x="38" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#fff" letter-spacing="2.2">QUICK BYTE · 32 PRODUCTION SCREENS</text>
    </svg>
  `);

  await sharp(bg)
    .composite([
      // Left phone (Screen 2: Dish detail)
      { input: sL, left: 240 - 35, top: 150 - 35 },
      { input: phoneLeft, left: 240, top: 150 },

      // Right phone (Screen 20: Order tracking)
      { input: sR, left: 1010 - 35, top: 150 - 35 },
      { input: phoneRight, left: 1010, top: 150 },

      // Center phone (Screen 1: Home / Discovery)
      { input: sC, left: 608 - 50, top: 105 - 50 },
      { input: phoneCenter, left: 608, top: 105 },

      // Floating badge
      { input: badge, left: 605, top: 40 },
    ])
    .webp({ quality: 92 })
    .toFile(`${OUT_DIR}/app-overview.webp`);

  await sharp(`${OUT_DIR}/app-overview.webp`)
    .jpeg({ quality: 92 })
    .toFile(`${OUT_DIR}/app-overview.jpg`);

  console.log('✓ App Designs Overview created:', `${OUT_DIR}/app-overview.webp`);
}

// 4. GRAPHICS DESIGNS OVERVIEW (Editorial Collage)
async function buildGraphicsOverview() {
  console.log('Generating Graphics Designs Overview...');
  const bg = await sharp(createGradientCanvas('#0e0508', '#ff4d6d', 750, 480, 850))
    .png()
    .toBuffer();

  // Cards: card1 (1110x1417), card2 (1393x1129), card3 (1402x1122), card5 (4096x4096)
  const c1 = await sharp('public/projects/graphic design/card1.jpg')
    .resize(380, 485, { fit: 'cover' })
    .toBuffer();

  const c2 = await sharp('public/projects/graphic design/card2.jpg')
    .resize(520, 660, { fit: 'cover' })
    .toBuffer();

  const c3 = await sharp('public/projects/graphic design/card3.jpg')
    .resize(400, 490, { fit: 'cover' })
    .toBuffer();

  const c5 = await sharp('public/projects/graphic design/card5.jpg')
    .resize(480, 480, { fit: 'cover' })
    .toBuffer();

  // Helper to frame art cards with clean editorial white borders and shadows
  async function frameArtCard(buf, w, h, radius = 10, borderColor = 'rgba(255,255,255,0.25)') {
    const mask = Buffer.from(`
      <svg width="${w}" height="${h}">
        <rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" ry="${radius}" fill="#fff"/>
      </svg>
    `);
    const rounded = await sharp(buf)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const border = Buffer.from(`
      <svg width="${w}" height="${h}">
        <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${radius}" ry="${radius}" fill="none" stroke="${borderColor}" stroke-width="1.5"/>
      </svg>
    `);

    return sharp(rounded)
      .composite([{ input: border }])
      .png()
      .toBuffer();
  }

  function createDropShadow(w, h, rx = 10, blur = 35, opacity = 0.75) {
    return Buffer.from(`
      <svg width="${w + blur * 2}" height="${h + blur * 2}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="${Math.round(blur * 0.4)}" stdDeviation="${Math.round(blur * 0.5)}" flood-color="#000" flood-opacity="${opacity}"/>
          </filter>
        </defs>
        <rect x="${blur}" y="${blur}" width="${w}" height="${h}" rx="${rx}" fill="#000" filter="url(#shadow)"/>
      </svg>
    `);
  }

  const art1 = await frameArtCard(c1, 380, 485, 10);
  const art2 = await frameArtCard(c2, 520, 660, 14, 'rgba(255,255,255,0.35)');
  const art3 = await frameArtCard(c3, 400, 490, 10);
  const art5 = await frameArtCard(c5, 480, 480, 12, 'rgba(255,77,109,0.4)');

  const s1 = createDropShadow(380, 485, 10, 30, 0.7);
  const s2 = createDropShadow(520, 660, 14, 45, 0.9);
  const s3 = createDropShadow(400, 490, 10, 30, 0.7);
  const s5 = createDropShadow(480, 480, 12, 35, 0.8);

  const badge = Buffer.from(`
    <svg width="370" height="42" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="370" height="42" rx="21" fill="#000" fill-opacity="0.8" stroke="rgba(255,77,109,0.4)" stroke-width="1.2"/>
      <circle cx="24" cy="21" r="5" fill="#ff4d6d"/>
      <text x="38" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#fff" letter-spacing="2.2">VISUAL IDENTITY &amp; POSTER SERIES</text>
    </svg>
  `);

  await sharp(bg)
    .composite([
      // Layer 1: Left card (Brand identity)
      { input: s1, left: 100 - 30, top: 120 - 30 },
      { input: art1, left: 100, top: 120 },

      // Layer 2: Right top card (Creative composition 5)
      { input: s5, left: 1000 - 35, top: 80 - 35 },
      { input: art5, left: 1000, top: 80 },

      // Layer 3: Right bottom card (Editorial composition 3)
      { input: s3, left: 950 - 30, top: 430 - 30 },
      { input: art3, left: 950, top: 430 },

      // Layer 4: Prominent center card (Award-winning typographic poster 2)
      { input: s2, left: 470 - 45, top: 165 - 45 },
      { input: art2, left: 470, top: 165 },

      // Floating badge
      { input: badge, left: 615, top: 90 },
    ])
    .webp({ quality: 92 })
    .toFile(`${OUT_DIR}/graphics-overview.webp`);

  await sharp(`${OUT_DIR}/graphics-overview.webp`)
    .jpeg({ quality: 92 })
    .toFile(`${OUT_DIR}/graphics-overview.jpg`);

  console.log('✓ Graphics Designs Overview created:', `${OUT_DIR}/graphics-overview.webp`);
}

// 5. 3D MODELING OVERVIEW (Clean Studio Visual Composition)
async function build3DOverview() {
  console.log('Generating 3D Modeling Overview...');
  const bg = await sharp(createGradientCanvas('#090807', '#ffaa33', 750, 480, 850))
    .png()
    .toBuffer();

  // Renders 1, 2, 3, 4
  const r1 = await sharp('public/projects/3d models/render1.jpg')
    .resize(720, 720, { fit: 'cover' })
    .toBuffer();

  const r2 = await sharp('public/projects/3d models/render2.jpg')
    .resize(360, 360, { fit: 'cover' })
    .toBuffer();

  const r3 = await sharp('public/projects/3d models/render3.jpg')
    .resize(360, 360, { fit: 'cover' })
    .toBuffer();

  const r4 = await sharp('public/projects/3d models/render4.jpg')
    .resize(360, 360, { fit: 'cover' })
    .toBuffer();

  async function frameRender(buf, w, h, label = '', isHero = false) {
    const radius = 14;
    const mask = Buffer.from(`
      <svg width="${w}" height="${h}">
        <rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" ry="${radius}" fill="#fff"/>
      </svg>
    `);
    const rounded = await sharp(buf)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();

    const border = Buffer.from(`
      <svg width="${w}" height="${h}">
        <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="${radius}" ry="${radius}" fill="none" stroke="${
      isHero ? 'rgba(255,170,51,0.45)' : 'rgba(255,255,255,0.18)'
    }" stroke-width="${isHero ? '1.8' : '1.2'}"/>
        ${
          label
            ? `<rect x="14" y="14" width="160" height="26" rx="13" fill="#000" fill-opacity="0.75" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
               <text x="94" y="31" font-family="monospace" font-size="9" font-weight="700" fill="#ffaa33" text-anchor="middle" letter-spacing="1.5">${label}</text>`
            : ''
        }
      </svg>
    `);

    return sharp(rounded)
      .composite([{ input: border }])
      .png()
      .toBuffer();
  }

  function createDropShadow(w, h, rx = 14, blur = 35, opacity = 0.8) {
    return Buffer.from(`
      <svg width="${w + blur * 2}" height="${h + blur * 2}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="${Math.round(blur * 0.45)}" stdDeviation="${Math.round(blur * 0.5)}" flood-color="#000" flood-opacity="${opacity}"/>
          </filter>
        </defs>
        <rect x="${blur}" y="${blur}" width="${w}" height="${h}" rx="${rx}" fill="#000" filter="url(#shadow)"/>
      </svg>
    `);
  }

  const heroRender = await frameRender(r1, 720, 720, 'MAYA HARD-SURFACE', true);
  const subRender2 = await frameRender(r2, 350, 350, 'STUDIO LIGHTING');
  const subRender3 = await frameRender(r3, 350, 350, 'SPATIAL VIEW');
  const subRender4 = await frameRender(r4, 350, 350, 'TOPOLOGY / CLAY');

  const sHero = createDropShadow(720, 720, 14, 50, 0.95);
  const s2 = createDropShadow(350, 350, 14, 25, 0.7);
  const s3 = createDropShadow(350, 350, 14, 25, 0.7);
  const s4 = createDropShadow(350, 350, 14, 25, 0.7);

  const badge = Buffer.from(`
    <svg width="350" height="42" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="350" height="42" rx="21" fill="#000" fill-opacity="0.8" stroke="rgba(255,170,51,0.4)" stroke-width="1.2"/>
      <circle cx="24" cy="21" r="5" fill="#ffaa33"/>
      <text x="38" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#fff" letter-spacing="2.2">MAYA &amp; BLENDER 3D RENDERS</text>
    </svg>
  `);

  await sharp(bg)
    .composite([
      // Main hero render (left/center)
      { input: sHero, left: 110 - 50, top: 140 - 50 },
      { input: heroRender, left: 110, top: 140 },

      // Sub-render 2: Studio lighting (top right)
      { input: s2, left: 880 - 25, top: 140 - 25 },
      { input: subRender2, left: 880, top: 140 },

      // Sub-render 3: Spatial angle (middle-right)
      { input: s3, left: 1250 - 25, top: 140 - 25 },
      { input: subRender3, left: 1250, top: 140 },

      // Sub-render 4: Clay pass (bottom right wide/centered)
      { input: s4, left: 1065 - 25, top: 510 - 25 },
      { input: subRender4, left: 1065, top: 510 },

      // Floating badge
      { input: badge, left: 110, top: 75 },
    ])
    .webp({ quality: 92 })
    .toFile(`${OUT_DIR}/3d-overview.webp`);

  await sharp(`${OUT_DIR}/3d-overview.webp`)
    .jpeg({ quality: 92 })
    .toFile(`${OUT_DIR}/3d-overview.jpg`);

  console.log('✓ 3D Modeling Overview created:', `${OUT_DIR}/3d-overview.webp`);
}

async function run() {
  await buildHeroOverview();
  await buildWebOverview();
  await buildAppOverview();
  await buildGraphicsOverview();
  await build3DOverview();
  console.log('All 5 category overview images generated successfully!');
}

run().catch((err) => {
  console.error('Error generating overview images:', err);
  process.exit(1);
});

