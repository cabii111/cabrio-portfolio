/**
 * Central portfolio data — generated from Cabrio R's resume.
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Cabrio R',
  displayName: 'Cabrio R',
  firstName: 'CABRIO',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A CABRIO ORIGINAL',
  role: 'Full Stack Designer',
  tagline: ['Full Stack Designer', 'UI/UX Designer', 'Product Designer'],
  intro:
    'Full Stack Designer, UI/UX Designer, and Product Designer with hands-on experience across user research, wireframing, prototyping, design systems, and responsive design-to-development workflows. Experienced in creating websites, interfaces, and digital experiences using Figma, Webflow, Framer, and no-code tools, with practical project experience for Tamil Nadu Agricultural University and BioFarmux.',
  location: 'Coimbatore, Tamil Nadu',
  email: 'capriocaprio00@gmail.com',
  phone: '9025910261',
  links: {
    linkedin: 'https://www.linkedin.com/in/cabii-design/',
    whatsapp: 'https://wa.me/919025910261?text=Hi%20Cabrio,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!',
    github: 'https://cabii-portfolio-1.vercel.app',
  },
  resumePdf: '/assets/Cabrio_R_Resume.pdf',
  portrait: {
    src: '/assets/Main-img.png',
    srcSet: '/assets/Main-img.png',
    alt: 'Portrait of Cabrio R',
  },
  interests: ['3D Modeling', 'Motion Graphics', 'Unity / C# (Learning)'],
};

export const education = [
  {
    school: 'Bharathiar University',
    place: 'Coimbatore, Tamil Nadu',
    degree: 'B.Voc Multimedia & Animation',
    period: 'Currently Pursuing – 3rd Year',
    score: '3rd Year',
  },
];

export const experience = [
  {
    company: 'Digital Marketing Agency',
    role: 'Full Stack Designer',
    place: 'Remote',
    period: '3 Months – Present',
    points: [
      'Design and build responsive, interactive landing pages using Figma, Webflow, and Framer.',
      'Set up and maintain no-code backend systems for data and forms using Supabase.',
      'Collaborate with marketing and development teams from concept through launch.',
      'Use AI-assisted workflows to improve design-to-development handoff and productivity.',
    ],
  },
  {
    company: 'Brand Monk Academy',
    role: 'UX/UI Designer Intern',
    place: 'India',
    period: '5 Months',
    points: [
      'Conducted user research and usability testing to improve user experience.',
      'Created wireframes, user flows, and interactive Figma prototypes.',
      'Designed responsive layouts and reusable Figma components.',
      'Assisted with website redesigns, navigation improvements, and brand consistency.',
    ],
  },
];

export type Metric = { value: string; label: string };
export type ProjectGalleryItem = {
  label: string;
  src: string;
  category?: 'research' | 'screens' | string;
  link?: string;
};
export type ProjectSubItem = {
  title: string;
  badge?: string;
  description: string;
  image: string;
  link?: string;
};

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Omit when the repository isn't public — the GitHub button is hidden instead of linking to a 404. */
  github?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
  image?: string;
  banner?: string;
  subItems?: ProjectSubItem[];
  gallery?: ProjectGalleryItem[];
};

export const projects: Project[] = [
  {
    id: 'hero-page-designs',
    title: 'Hero Page Designs',
    year: '2026',
    genre: 'Web Design • Landing Pages • UI/UX',
    logline: 'A curated collection of 9 responsive hero sections and landing page experiences crafted for SaaS, fintech, AI platforms, and creative agencies.',
    stack: ['Figma', 'UI/UX Design', 'Landing Pages', 'Responsive Design', 'Design Systems'],
    build: [
      'Designed 9 high-conversion hero sections exploring distinct typographic hierarchies, spatial balance, and visual focal points.',
      'Crafted responsive desktop and MacBook Pro 16" viewports with interactive layout compositions and clear call-to-actions.',
      'Developed consistent design token libraries for buttons, floating cards, navigation bars, and glassmorphic badges.',
    ],
    features: [
      '9 distinct hero page compositions',
      'Responsive desktop & laptop viewports',
      'High-impact typographic scale & hierarchy',
      'Conversion-focused CTA placement & visual accents',
    ],
    metrics: [
      { value: '9', label: 'hero page designs' },
      { value: '100%', label: 'custom UI layouts' },
      { value: 'Multi-Industry', label: 'SaaS, FinTech, AI & Studio' },
      { value: 'High', label: 'conversion & engagement focus' },
    ],
    image: '/projects/overview/hero-overview.webp',
    banner: '/projects/overview/hero-overview.webp',
    subItems: [
      {
        title: 'Hero 01 — Enterprise Cloud Portal',
        badge: 'Design 01',
        description: 'Dual-viewport modern SaaS architecture with analytics previews and primary CTAs.',
        image: '/projects/hero pages/hero 1/Desktop - 1.png',
      },
      {
        title: 'Hero 02 — Digital Agency Concept',
        badge: 'Design 02',
        description: 'High-contrast editorial landing page crafted for creative studio branding.',
        image: '/projects/hero pages/hero 2/Desktop - 1 (2).png',
      },
      {
        title: 'Hero 03 — FinTech Analytics Hero',
        badge: 'Design 03',
        description: 'Secure financial analytics platform hero with data visualization and KPI cards.',
        image: '/projects/hero pages/hero 3/Desktop - 1.png',
      },
      {
        title: 'Hero 04 — Modern E-Commerce Landing',
        badge: 'Design 04',
        description: 'Contemporary product discovery hero with clean grid alignment and product staging.',
        image: '/projects/hero pages/hero 4/Desktop - 1.jpg',
      },
      {
        title: 'Hero 05 — Next-Gen AI Platform',
        badge: 'Design 05',
        description: 'Generative AI platform experience with dark mode glow effects and prompt UI.',
        image: '/projects/hero pages/hero 5/Desktop - 1 (1).png',
      },
      {
        title: 'Hero 06 — Creative Portfolio Showcase',
        badge: 'Design 06',
        description: 'Minimalist designer portfolio hero emphasizing whitespace and typography.',
        image: '/projects/hero pages/hero 6/Desktop - 1.jpg',
      },
      {
        title: 'Hero 07 — Enterprise Web App Suite',
        badge: 'Design 07',
        description: 'Comprehensive 4-screen MacBook Pro responsive experience with navigation flow.',
        image: '/projects/hero pages/hero 7/MacBook Pro 16_ - 1.png',
      },
      {
        title: 'Hero 08 — Clean SaaS Architecture',
        badge: 'Design 08',
        description: 'Structured layout for B2B cloud software with feature breakdown and lead capture.',
        image: '/projects/hero pages/hero 8/Desktop - 1 (3).png',
      },
      {
        title: 'Hero 09 — Mobile & Web Showcase',
        badge: 'Design 09',
        description: 'Dynamic split-screen hero spotlighting cross-platform mobile and web responsiveness.',
        image: '/projects/hero pages/hero 9/HOME 2.png',
      },
    ],
    gallery: [
      { label: 'Hero 01 — Modern SaaS Portal (Desktop 1)', src: '/projects/hero pages/hero 1/Desktop - 1.png' },
      { label: 'Hero 01 — Modern SaaS Portal (Desktop 2)', src: '/projects/hero pages/hero 1/Desktop - 2.png' },
      { label: 'Hero 02 — Digital Agency Concept', src: '/projects/hero pages/hero 2/Desktop - 1 (2).png' },
      { label: 'Hero 03 — FinTech Analytics Platform', src: '/projects/hero pages/hero 3/Desktop - 1.png' },
      { label: 'Hero 04 — Modern E-Commerce Landing', src: '/projects/hero pages/hero 4/Desktop - 1.jpg' },
      { label: 'Hero 05 — Next-Gen AI Platform Experience', src: '/projects/hero pages/hero 5/Desktop - 1 (1).png' },
      { label: 'Hero 06 — Creative Studio Showcase', src: '/projects/hero pages/hero 6/Desktop - 1.jpg' },
      { label: 'Hero 07 — Enterprise Web App (Screen 1)', src: '/projects/hero pages/hero 7/MacBook Pro 16_ - 1.png' },
      { label: 'Hero 07 — Enterprise Web App (Screen 2)', src: '/projects/hero pages/hero 7/MacBook Pro 16_ - 2.png' },
      { label: 'Hero 07 — Enterprise Web App (Screen 3)', src: '/projects/hero pages/hero 7/MacBook Pro 16_ - 3.png' },
      { label: 'Hero 07 — Enterprise Web App (Screen 4)', src: '/projects/hero pages/hero 7/MacBook Pro 16_ - 4.png' },
      { label: 'Hero 08 — Clean SaaS Layout Architecture', src: '/projects/hero pages/hero 8/Desktop - 1 (3).png' },
      { label: 'Hero 09 — Cross-Platform Web & Mobile Showcase', src: '/projects/hero pages/hero 9/HOME 2.png' },
    ],
    palette: { from: '#130a21', via: '#381669', to: '#070410', accent: '#a855f7' },
    motif: 'flow',
  },
  {
    id: 'web-designs',
    title: 'Web Designs',
    year: '2026',
    genre: 'Web Design • UI/UX • Live Deployments',
    logline: 'Production web platforms built and deployed for real clients — featuring live websites for Tamil Nadu Agricultural University and BioFarmux.',
    stack: ['Figma', 'UI/UX Design', 'Web Implementation', 'Responsive Design', 'Vercel'],
    build: [
      'Designed and built the official university web portal experience for Tamil Nadu Agricultural University, structuring academic departments, student navigation, and clear visual hierarchy.',
      'Designed and deployed the BioFarmux commercial agriculture website with clear product storytelling, responsive UI components, and modern no-code & AI workflows.',
      'Configured full cross-device responsiveness, performance optimization, and live production deployments on Vercel.',
    ],
    features: [
      'Tamil Nadu Agricultural University live portal experience',
      'BioFarmux commercial agriculture & biotech platform',
      'Live production deployments hosted on Vercel',
      '100% responsive across desktop, tablet, and mobile devices',
    ],
    metrics: [
      { value: '2', label: 'live web platforms' },
      { value: '100%', label: 'responsive design' },
      { value: '2026', label: 'launch & active updates' },
      { value: 'Live', label: 'deployed on Vercel' },
    ],
    image: '/projects/overview/web-overview.webp',
    banner: '/projects/overview/web-overview.webp',
    subItems: [
      {
        title: 'Tamil Nadu Agricultural University',
        badge: 'Client Project · Live Portal',
        description: 'A modern responsive university website experience built with a focus on information architecture, academic navigation, visual hierarchy, and usability.',
        image: '/projects/web design/TN Agri university.png',
        link: 'https://tamil-nadu-agricultural-university.vercel.app',
      },
      {
        title: 'BioFarmux',
        badge: 'Commercial Platform · Live',
        description: 'A responsive commercial agriculture website with clear content structure, modern UI, responsive layouts, and user-friendly navigation built via no-code and AI workflows.',
        image: '/projects/web design/Biofarmux.png',
        link: 'https://biofarmux.vercel.app/',
      },
    ],
    gallery: [
      {
        label: 'Tamil Nadu Agricultural University — Official Website Hero Page',
        src: '/projects/web design/TN Agri university.png',
        link: 'https://tamil-nadu-agricultural-university.vercel.app',
      },
      {
        label: 'BioFarmux — Agricultural Commercial Platform Hero Page',
        src: '/projects/web design/Biofarmux.png',
        link: 'https://biofarmux.vercel.app/',
      },
    ],
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'flow',
  },
  {
    id: 'app-designs',
    title: 'App Designs',
    year: '2025',
    genre: 'UI/UX Design • Mobile App • Design Systems',
    logline: 'End-to-end mobile product design — featuring Quick Byte, an intuitive food pre-ordering app backed by comprehensive user research and 32 production screens.',
    stack: ['Figma', 'UI/UX Design', 'User Research', 'Mobile App', 'Design Systems'],
    build: [
      'Conducted end-to-end UX research including user interviews, empathy mapping, customer journey mapping, and information architecture flowcharts.',
      'Designed 32+ high-fidelity mobile screens covering browsing, meal customization, checkout, digital payments, live order tracking, and account management.',
      'Developed an intuitive user flow to eliminate waiting queues, optimize ordering speed, and streamline pick-up verification.',
      'Built a reusable Figma component library with variants, interactive states, and auto-layout spacing rules.',
    ],
    features: [
      'Comprehensive UX research framework (Empathy Map, Flow Chart, Journey Map)',
      'Quick Byte food pre-ordering app ecosystem',
      '32+ high-fidelity screens from splash to order completion',
      'Atomic design system with reusable UI tokens',
    ],
    metrics: [
      { value: '32', label: 'production screens' },
      { value: '4', label: 'UX research frameworks' },
      { value: '100%', label: 'atomic design system' },
      { value: 'Zero', label: 'friction order-to-pickup flow' },
    ],
    image: '/projects/overview/app-overview.webp',
    banner: '/projects/overview/app-overview.webp',
    subItems: [
      {
        title: 'User Research & UX Discovery',
        badge: 'UX Process · 4 Frameworks',
        description: 'Comprehensive UX research and discovery phase for Quick Byte — featuring Empathy Mapping, User Research synthesis, Customer Journey Mapping, and Information Architecture Flowcharts.',
        image: '/projects/mobile app/user research/User Research.png',
      },
      {
        title: 'Quick Byte — 32 Production Screens',
        badge: 'Mobile App · 32 Screens',
        description: 'Full food pre-ordering mobile application designed with 32 production screens covering onboarding, live menus, food customization, cart, checkout, payment, and real-time order tracking.',
        image: '/projects/mobile app/overview.jpg',
      },
    ],
    gallery: [
      { label: 'UX Research — Findings & User Insights', src: '/projects/mobile app/user research/User Research.png', category: 'research' },
      { label: 'Empathy Map — Needs, Pains & Behaviors', src: '/projects/mobile app/user research/Empathy map.png', category: 'research' },
      { label: 'Flow Chart — Information Architecture & User Flow', src: '/projects/mobile app/user research/FLOW CHART.png', category: 'research' },
      { label: 'Customer Journey Map — End-to-End User Experience', src: '/projects/mobile app/user research/Journey Map.png', category: 'research' },
      { label: 'Screen 01 — Onboarding Splash', src: '/projects/mobile app/32 screens/qb1.jpg', category: 'screens' },
      { label: 'Screen 02 — User Authentication & Login', src: '/projects/mobile app/32 screens/qb2.jpg', category: 'screens' },
      { label: 'Screen 03 — Home & Discovery Feed', src: '/projects/mobile app/32 screens/qb3.jpg', category: 'screens' },
      { label: 'Screen 04 — Menu Items & Categories', src: '/projects/mobile app/32 screens/qb4.jpg', category: 'screens' },
      { label: 'Screen 05 — Outlet & Stall Selection', src: '/projects/mobile app/32 screens/qb5.jpg', category: 'screens' },
      { label: 'Screen 06 — Food Search & Filters', src: '/projects/mobile app/32 screens/qb6.jpg', category: 'screens' },
      { label: 'Screen 07 — Meal Details & Customization', src: '/projects/mobile app/32 screens/qb7.jpg', category: 'screens' },
      { label: 'Screen 08 — Portion & Add-on Selection', src: '/projects/mobile app/32 screens/qb8.jpg', category: 'screens' },
      { label: 'Screen 09 — Dietary & Spice Preferences', src: '/projects/mobile app/32 screens/qb9.jpg', category: 'screens' },
      { label: 'Screen 10 — Cart & Order Review', src: '/projects/mobile app/32 screens/qb10.jpg', category: 'screens' },
      { label: 'Screen 11 — Pre-Order Time Slot Booking', src: '/projects/mobile app/32 screens/qb11.jpg', category: 'screens' },
      { label: 'Screen 12 — Counter Pickup Options', src: '/projects/mobile app/32 screens/qb12.jpg', category: 'screens' },
      { label: 'Screen 13 — Checkout & Payment Methods', src: '/projects/mobile app/32 screens/qb13.jpg', category: 'screens' },
      { label: 'Screen 14 — UPI & Card Processing', src: '/projects/mobile app/32 screens/qb14.jpg', category: 'screens' },
      { label: 'Screen 15 — Order Confirmed & Token', src: '/projects/mobile app/32 screens/qb15.jpg', category: 'screens' },
      { label: 'Screen 16 — Live Kitchen Status', src: '/projects/mobile app/32 screens/qb16.jpg', category: 'screens' },
      { label: 'Screen 17 — Food Preparation Progress', src: '/projects/mobile app/32 screens/qb17.jpg', category: 'screens' },
      { label: 'Screen 18 — Digital Pickup QR Token', src: '/projects/mobile app/32 screens/qb18.jpg', category: 'screens' },
      { label: 'Screen 19 — Order History & Receipts', src: '/projects/mobile app/32 screens/qb19.jpg', category: 'screens' },
      { label: 'Screen 20 — Real-Time Order Tracking', src: '/projects/mobile app/32 screens/qb20.jpg', category: 'screens' },
      { label: 'Screen 21 — Quick Reorder Flow', src: '/projects/mobile app/32 screens/qb21.jpg', category: 'screens' },
      { label: 'Screen 22 — Saved Favorites & Collections', src: '/projects/mobile app/32 screens/qb22.jpg', category: 'screens' },
      { label: 'Screen 23 — User Profile & Settings', src: '/projects/mobile app/32 screens/qb23.jpg', category: 'screens' },
      { label: 'Screen 24 — Payment Methods & Wallets', src: '/projects/mobile app/32 screens/qb24.jpg', category: 'screens' },
      { label: 'Screen 25 — Notifications & Alerts', src: '/projects/mobile app/32 screens/qb25.jpg', category: 'screens' },
      { label: 'Screen 26 — Help Center & Support Chat', src: '/projects/mobile app/32 screens/qb26.jpg', category: 'screens' },
      { label: 'Screen 27 — Rating & Review Submission', src: '/projects/mobile app/32 screens/qb27.jpg', category: 'screens' },
      { label: 'Screen 28 — Promo Codes & Voucher Hub', src: '/projects/mobile app/32 screens/qb28.jpg', category: 'screens' },
      { label: 'Screen 29 — Loyalty Rewards & Points', src: '/projects/mobile app/32 screens/qb29.jpg', category: 'screens' },
      { label: 'Screen 30 — Security & Privacy Settings', src: '/projects/mobile app/32 screens/qb30.jpg', category: 'screens' },
      { label: 'Screen 31 — App Preferences & Theme', src: '/projects/mobile app/32 screens/qb31.jpg', category: 'screens' },
      { label: 'Screen 32 — Order Completed Summary', src: '/projects/mobile app/32 screens/qb32.jpg', category: 'screens' },
    ],
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'shield',
  },
  {
    id: 'graphics-designs',
    title: 'Graphics Designs',
    year: '2025',
    genre: 'Graphic Design • Branding • Card & Poster Systems',
    logline: 'Award-winning visual composition, typographic hierarchy, and brand identity card systems crafted for print and digital media.',
    stack: ['Photoshop', 'Illustrator', 'Visual Composition', 'Typography', 'Print & Digital'],
    build: [
      'Created high-impact visual design systems combining typographic hierarchy, visual storytelling, and balanced negative space.',
      'Designed card and poster designs that earned 2nd Prize in a visual design competition.',
      'Produced production-ready vector assets, print specs, and high-DPI digital campaign graphics.',
    ],
    features: [
      'Award-winning poster & card series',
      'Custom typography & expressive layout styling',
      'Harmonious color palettes & contrast balance',
      'Print and digital social campaign deliverables',
    ],
    metrics: [
      { value: '2nd Prize', label: 'in visual design contest' },
      { value: '5', label: 'production card designs' },
      { value: '100%', label: 'custom typography & layouts' },
      { value: 'Print & Web', label: 'high-DPI deliverables' },
    ],
    image: '/projects/overview/graphics-overview.webp',
    banner: '/projects/overview/graphics-overview.webp',
    subItems: [
      {
        title: 'Card Designs & Visual Identity Series',
        badge: 'Award-Winning Graphic Suite',
        description: 'A cohesive series of 5 visual identity cards and posters exploring bold typography, editorial composition, and high-impact color contrast.',
        image: '/projects/graphic design/card1.jpg',
      },
    ],
    gallery: [
      { label: 'Card 01 — Brand Identity & Visual Hierarchy', src: '/projects/graphic design/card1.jpg' },
      { label: 'Card 02 — Award-Winning Typographic Poster', src: '/projects/graphic design/card2.jpg' },
      { label: 'Card 03 — Expressive Editorial Composition', src: '/projects/graphic design/card3.jpg' },
      { label: 'Card 04 — Modern Digital Campaign Asset', src: '/projects/graphic design/card4.jpg' },
      { label: 'Card 05 — Creative Visual Composition', src: '/projects/graphic design/card5.jpg' },
    ],
    palette: { from: '#1c050a', via: '#520b18', to: '#0d0305', accent: '#ff4d6d' },
    motif: 'shield',
  },
  {
    id: '3d-modeling',
    title: '3D Modeling',
    year: '2026',
    genre: '3D Design • Maya & Blender • Lighting & Materials',
    logline: 'Hard-surface 3D assets, procedural materials, and studio lighting setups rendered in Maya and Blender with spatial fidelity.',
    stack: ['Maya', 'Blender', '3D Modeling', 'Studio Lighting', 'Material Design'],
    build: [
      'Modeled hard-surface 3D objects focusing on accurate edge flow, topology, and realistic surface details.',
      'Configured custom three-point studio lighting and procedural materials to achieve cinematic, high-fidelity renders.',
      'Produced multi-angle spatial views testing reflection properties, ambient occlusion, and clay topology.',
    ],
    features: [
      'Hard-surface polygon modeling with clean edge flow',
      'Studio three-point lighting setups and soft shadows',
      'Realistic procedural shaders, metals, and glass',
      'High-resolution multi-angle camera perspectives',
    ],
    metrics: [
      { value: '4K', label: 'high-resolution renders' },
      { value: 'Clean', label: 'topology & edge flow' },
      { value: 'Studio', label: 'lighting & shaders' },
      { value: 'Spatial', label: 'multi-angle perspectives' },
    ],
    image: '/projects/overview/3d-overview.webp',
    banner: '/projects/overview/3d-overview.webp',
    subItems: [
      {
        title: '3D Hard-Surface & Spatial Models',
        badge: 'Maya & Blender Series',
        description: 'Cinematic 3D model renders exploring lighting angles, edge beveling, realistic roughness reflections, and form hierarchy.',
        image: '/projects/3d models/render1.jpg',
      },
    ],
    gallery: [
      { label: 'Render 01 — Hard-Surface Product Render', src: '/projects/3d models/render1.jpg' },
      { label: 'Render 02 — Studio Lighting & Material Setup', src: '/projects/3d models/render2.jpg' },
      { label: 'Render 03 — Spatial Angle & Composition', src: '/projects/3d models/render3.jpg' },
      { label: 'Render 04 — High-Fidelity Clay & Final Pass', src: '/projects/3d models/render4.jpg' },
    ],
    palette: { from: '#1a0e05', via: '#542c0b', to: '#0a0603', accent: '#ffaa33' },
    motif: 'flow',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'full-stack-designer',
    title: 'Full Stack Designer',
    org: 'Digital Marketing Agency',
    detail: 'Currently designing and building responsive landing pages with Figma, Webflow, Framer, and Supabase backend.',
    laurel: 'Current Role',
  },
  {
    id: 'tnau-project',
    title: 'University Website Redesign',
    org: 'Tamil Nadu Agricultural University',
    detail: 'Designed and built a complete modern responsive website for a major agricultural university.',
    laurel: 'Client Project',
  },
  {
    id: 'brand-monk-intern',
    title: 'UX/UI Designer Intern',
    org: 'Brand Monk Academy',
    detail: '5 months of intensive UX/UI design internship — user research, wireframing, prototyping, and brand consistency.',
    laurel: '5-Month Internship',
    link: '/assets/certificates/brand-monk-certificate.jpg',
  },
  {
    id: 'poster-making-award',
    title: '2nd Prize — Poster Making',
    org: 'National Level Technical Symposium',
    detail: 'Awarded 2nd Prize in Poster Making at a National Level Technical Symposium competition, recognized for visual composition and creative design.',
    laurel: '2nd Prize Winner',
    link: '/assets/certificates/poster-making-award.png',
  },
  {
    id: 'ai-workflows',
    title: 'AI-Assisted Design',
    org: 'Design Workflow',
    detail: 'Integrating AI-assisted workflows to improve design-to-development handoff and productivity.',
    laurel: 'Innovation',
  },
];

export type Certification = {
  id: string;
  issuer: string;
  name: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  image: string;
  link: string;
  isAward?: boolean;
};

export const certifications: Certification[] = [
  {
    id: 'novitech-ui-ux',
    issuer: 'NoviTech R&D',
    name: 'UI/UX Master Course',
    title: 'UI/UX Master Course',
    category: 'Professional Training Credential',
    badge: 'Master Course',
    description: 'Advanced curriculum in user experience architecture, interface design systems, interaction patterns, and industry-standard prototyping in Figma.',
    image: '/assets/certificates/novitech-master-course.jpg',
    link: '/assets/certificates/novitech-master-course.pdf',
    isAward: false,
  },
  {
    id: 'brand-monk-internship',
    issuer: 'Brand Monk Academy',
    name: 'Government Accredited UI/UX Certificate',
    title: 'Government Accredited UI/UX Certificate',
    category: 'UX/UI Design Internship · 5 Months',
    badge: 'Government Accredited',
    description: 'Five-month intensive professional design internship covering user research, information architecture, wireframing, usability testing, and brand consistency.',
    image: '/assets/certificates/brand-monk-certificate.jpg',
    link: '/assets/certificates/brand-monk-certificate.jpg',
    isAward: false,
  },
  {
    id: 'poster-making-award',
    issuer: 'National Level Technical Symposium',
    name: '2nd Prize — Poster Making Competition',
    title: '2nd Prize — Poster Making Competition',
    category: 'National Level Symposium Award',
    badge: '2nd Prize Winner',
    description: 'Awarded 2nd Prize in Poster Making at a National Level Technical Symposium competition, recognized for visual composition, typographic hierarchy, and creative design.',
    image: '/assets/certificates/poster-making-award.png',
    link: '/assets/certificates/poster-making-award.png',
    isAward: true,
  },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'ux-design',
    title: 'UI/UX & Product Design',
    subtitle: 'Research-driven design',
    skills: [
      { name: 'User Research', mono: 'Ur', note: 'Core' },
      { name: 'User Flows', mono: 'Uf' },
      { name: 'Wireframing', mono: 'Wf' },
      { name: 'Prototyping', mono: 'Pt' },
      { name: 'Usability Testing', mono: 'Ut' },
      { name: 'Responsive Design', mono: 'Rd' },
      { name: 'Design Systems', mono: 'Ds' },
      { name: 'Information Architecture', mono: 'Ia' },
    ],
  },
  {
    id: 'design-tools',
    title: 'Design Tools',
    subtitle: 'The creative arsenal',
    skills: [
      { name: 'Figma', mono: 'Fg', note: 'Primary' },
      { name: 'Photoshop', mono: 'Ps' },
      { name: 'Illustrator', mono: 'Ai' },
      { name: 'Premiere Pro', mono: 'Pr' },
      { name: 'After Effects', mono: 'Ae' },
      { name: 'Canva', mono: 'Cv' },
      { name: 'Maya', mono: 'Ma' },
      { name: 'Blender', mono: 'Bl' },
    ],
  },
  {
    id: 'web-nocode',
    title: 'Web & No-Code',
    subtitle: 'Design to production',
    skills: [
      { name: 'Webflow', mono: 'Wf' },
      { name: 'Framer', mono: 'Fr' },
      { name: 'Wix', mono: 'Wx' },
      { name: 'Stitch', mono: 'St' },
      { name: 'Supabase', mono: 'Sb' },
    ],
  },
  {
    id: 'additional',
    title: 'Additional',
    subtitle: 'Expanding horizons',
    skills: [
      { name: 'Branding', mono: 'Br' },
      { name: '3D Modeling', mono: '3D' },
      { name: 'Motion Graphics', mono: 'Mg' },
      { name: 'AI Workflow Integration', mono: 'Ai' },
      { name: 'Unity / C#', mono: 'Un' },
    ],
  },
];

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears in the projects, certifications or achievements on the resume.
 */
export const skillEvidence: Record<string, string[]> = {
  'User Research': ['Brand Monk Academy Internship', 'Quick Byte App'],
  'User Flows': ['Brand Monk Academy Internship', 'Quick Byte App'],
  Wireframing: ['Brand Monk Academy Internship', 'Quick Byte App'],
  Prototyping: ['Brand Monk Academy Internship', 'Quick Byte App'],
  'Usability Testing': ['Brand Monk Academy Internship'],
  'Responsive Design': ['TNAU Website', 'BioFarmux', 'Digital Marketing Agency'],
  'Design Systems': ['Quick Byte — component-based interface'],
  'Information Architecture': ['TNAU Website'],
  Figma: ['Brand Monk Academy', 'Digital Marketing Agency', 'Quick Byte', 'TNAU Website'],
  Photoshop: ['B.Voc Multimedia & Animation'],
  Illustrator: ['B.Voc Multimedia & Animation'],
  'Premiere Pro': ['B.Voc Multimedia & Animation'],
  'After Effects': ['B.Voc Multimedia & Animation'],
  Webflow: ['Digital Marketing Agency', 'BioFarmux'],
  Framer: ['Digital Marketing Agency'],
  Supabase: ['Digital Marketing Agency — no-code backend'],
  Branding: ['Brand Monk Academy — brand consistency'],
  '3D Modeling': ['B.Voc Multimedia & Animation — Maya, Blender'],
  'Motion Graphics': ['B.Voc Multimedia & Animation'],
  'AI Workflow Integration': ['Digital Marketing Agency', 'BioFarmux'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Foundation',
    period: 'Currently Pursuing',
    synopsis: 'B.Voc Multimedia & Animation at Bharathiar University, Coimbatore — UI/UX Design, Graphic Design, Motion Graphics, and Digital Media.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Creative Spark',
        description: 'B.Voc Multimedia & Animation at Bharathiar University — coursework in UI/UX Design, Graphic Design, Motion Graphics, and Digital Media.',
        tags: ['Multimedia', 'Animation', 'Design'],
        runtime: '3rd Year — Present',
        palette: violet,
      },
      {
        code: 'S01 E02',
        title: 'Hands-On Learning',
        description: 'Hands-on experience through creative, interface design, and digital projects during the degree program.',
        tags: ['Interface Design', 'Digital Projects'],
        runtime: 'Bharathiar University',
        palette: amber,
      },
    ],
  },
  {
    number: 2,
    title: 'The Intern Arc',
    period: '5 Months',
    synopsis: 'UX/UI Designer Intern at Brand Monk Academy — user research, wireframes, prototyping, and reusable components.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The Researcher',
        description: 'Conducted user research and usability testing to improve user experience at Brand Monk Academy.',
        tags: ['User Research', 'Usability Testing'],
        runtime: '5 Months',
        palette: ocean,
      },
      {
        code: 'S02 E02',
        title: 'The Prototyper',
        description: 'Created wireframes, user flows, and interactive Figma prototypes. Designed responsive layouts and reusable components.',
        tags: ['Figma', 'Wireframes', 'Prototyping'],
        runtime: 'Brand Monk Academy',
        palette: jade,
      },
      {
        code: 'S02 E03',
        title: 'The Brand Guardian',
        description: 'Assisted with website redesigns, navigation improvements, and brand consistency across platforms.',
        tags: ['Branding', 'Navigation', 'Redesign'],
        runtime: 'Brand Monk Academy',
        palette: crimson,
      },
    ],
  },
  {
    number: 3,
    title: 'Going Full Stack',
    period: '3 Months – Present',
    synopsis: 'Full Stack Designer at a Digital Marketing Agency — Figma, Webflow, Framer, Supabase, and AI-assisted workflows.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'The Builder',
        description: 'Designing and building responsive, interactive landing pages using Figma, Webflow, and Framer.',
        tags: ['Webflow', 'Framer', 'Landing Pages'],
        runtime: '3 Months – Present',
        palette: amber,
      },
      {
        code: 'S03 E02',
        title: 'The No-Code Engineer',
        description: 'Set up and maintain no-code backend systems for data and forms using Supabase.',
        tags: ['Supabase', 'No-Code', 'Backend'],
        runtime: 'Digital Marketing Agency',
        palette: violet,
      },
      {
        code: 'S03 E03',
        title: 'The AI Collaborator',
        description: 'Using AI-assisted workflows to improve design-to-development handoff and productivity.',
        tags: ['AI Workflows', 'Design-to-Dev'],
        runtime: 'Digital Marketing Agency',
        palette: ocean,
      },
    ],
  },
  {
    number: 4,
    title: 'Building Real Products',
    period: '2026',
    synopsis: 'Three Originals — a university website, a business platform, and a mobile app — from concept to launch.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'The University Redesign',
        description: 'TNAU — a modern responsive university website with improved information architecture, navigation, and visual hierarchy.',
        tags: ['TNAU', 'Web Design', 'IA'],
        runtime: '2026',
        palette: ocean,
      },
      {
        code: 'S04 E02',
        title: 'The Business Platform',
        description: 'BioFarmux — responsive business website using no-code and AI-assisted workflows.',
        tags: ['BioFarmux', 'No-Code', 'AI'],
        runtime: '2026',
        palette: jade,
      },
      {
        code: 'S04 E03',
        title: 'The App Designer',
        description: 'Quick Byte — 32+ screens covering browsing, customization, checkout, payment, and order tracking.',
        tags: ['Quick Byte', 'Mobile App', '32+ Screens'],
        runtime: '2025',
        palette: amber,
      },
    ],
  },
  {
    number: 5,
    title: "What's Next",
    period: 'Now streaming',
    synopsis: 'Exploring 3D Modeling, Motion Graphics, and Unity/C# game development.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'The Next Chapter',
        description: 'Expanding into 3D Modeling, Motion Graphics, and Unity/C# development.',
        tags: ['3D Modeling', 'Motion Graphics', 'Unity'],
        runtime: 'In production',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Primary tool', title: 'Figma', detail: 'Wireframes • Prototypes • Design Systems', palette: violet },
  { label: 'The client project', title: 'TNAU Website', detail: 'University website redesign', palette: ocean },
  { label: 'Current role', title: 'Full Stack Designer', detail: 'Digital Marketing Agency', palette: amber },
  { label: 'The app', title: 'Quick Byte', detail: '32+ screens designed', palette: crimson },
  { label: 'No-code stack', title: 'Webflow + Framer', detail: 'Design to production', palette: jade },
  { label: 'Internship', title: 'Brand Monk Academy', detail: '5-Month UX/UI Internship', palette: violet },
  { label: 'Business project', title: 'BioFarmux', detail: 'Responsive business website', palette: jade },
  { label: 'Backend tool', title: 'Supabase', detail: 'No-code backend systems', palette: ocean },
  { label: 'The creative suite', title: 'Adobe Suite', detail: 'Photoshop • Illustrator • After Effects', palette: crimson },
  { label: 'Next frontier', title: 'Unity / C#', detail: '3D & Game Development', palette: amber },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'B.Voc · Multimedia & Animation',
    lines: ['Bharathiar University, Coimbatore', 'Currently Pursuing — 3rd Year'],
    chips: ['UI/UX Design', 'Graphic Design', 'Motion Graphics'],
  },
  {
    kicker: 'Skills',
    title: 'Design first.',
    lines: ['Figma, Webflow, Framer · Photoshop, Illustrator', 'After Effects, Maya, Blender · Supabase, Wix'],
    chips: ['Figma', 'Webflow', 'Framer', 'Photoshop', 'After Effects'],
  },
  {
    kicker: 'Experience',
    title: 'Two Roles. Real Impact.',
    lines: ['Full Stack Designer · Digital Marketing Agency · 3 Months – Present', 'UX/UI Designer Intern · Brand Monk Academy · 5 Months'],
  },
  {
    kicker: 'Projects',
    title: 'Five Originals',
    lines: [
      'TNAU & BioFarmux — University & business platforms',
      'Quick Byte — 32+ screen food pre-ordering app',
      'Visual Identity & 3D Spatial Modeling renders',
    ],
  },
  {
    kicker: 'Certified',
    title: '3 Certifications & Awards',
    lines: [
      'UI/UX Master Course — NoviTech R&D Pvt Ltd',
      'Government Accredited UI/UX — Brand Monk Academy',
      '2nd Prize — Poster Making at National Level Technical Symposium',
    ],
  },
  {
    kicker: 'Current mission',
    title: 'Now exploring',
    lines: ['3D Modeling · Motion Graphics · Unity / C# · AI Workflow Integration'],
  },
];

export type ProfileId = 'cabrio' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'cabrio',
    name: 'Cabrio',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, achievements & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & experience', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals • 2026`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 from the resume', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'My Achievements', meta: `${achievements.length} Moments • ${certifications.length} Certifications`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
