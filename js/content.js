/* ==========================================================================
   Site content — edit this file to update skills, projects and gallery
   without touching any markup. Every array below feeds index.html /
   gallery.html directly.
   ========================================================================== */

const SITE_CONTENT = {
  roles: ["AI Agent Engineer", "AI Developer", "Character Artist", "Graphic Designer"],

  skills: {
    tech: [
      { name: "Python", level: 95 },
      { name: "Prompt Engineering", level: 92 },
      { name: "LLMs", level: 90 },
      { name: "n8n", level: 90 },
      { name: "Workflow Automation", level: 90 },
      { name: "REST APIs", level: 88 },
      { name: "Make.com", level: 85 },
      { name: "Google ADK", level: 82 },
      { name: "Web Scraping", level: 88 },
      { name: "JavaScript", level: 80 },
      { name: "PHP", level: 78 },
      { name: "SQL / MySQL", level: 82 }
    ],
    art: [
      { name: "Adobe Photoshop", level: 93 },
      { name: "Adobe Illustrator", level: 85 },
      { name: "Autodesk SketchBook", level: 88 },
      { name: "Digital Illustration", level: 92 },
      { name: "Character Design", level: 94 },
      { name: "Line Art", level: 90 },
      { name: "Drawing", level: 88 },
      { name: "Concept Art", level: 86 },
      { name: "Visual Design", level: 84 },
      { name: "Graphic Design", level: 87 }
    ]
  },

  projects: [
    {
      title: "Webspire Studio",
      subtitle: "Web Design Agency Site — Services, Portfolio & Pricing",
      desc: "A dark, high-contrast agency website for Webspire Studio, a web design & development studio — built to sell its own services: clear package pricing, a filterable portfolio, and a full services breakdown, all in a bold black-and-neon-green identity.",
      overview: "Designed and built the marketing site for Webspire Studio, a web design and development agency. The site had to do double duty as both a portfolio piece and a sales tool — communicating credibility and design skill at a glance while making it dead simple for a visitor to understand what's offered, what it costs, and how to get started.",
      features: [
        "Service Overview Grid — a clean card grid on the homepage summarizing all five offerings (Web Development, E-Commerce, SEO, Website Maintenance, Branding & Logo Design) with icons and one-line descriptions.",
        "Transparent Package Pricing — four flat-rate pricing cards (Web Development, E-Commerce, SEO, Branding) each listing exactly what's included and a direct \"Choose\" call-to-action, removing the friction of a quote request for standard jobs.",
        "Dedicated Service Detail Pages — an in-depth breakdown per service (e.g. Website Design & Development) pairing benefit-led copy and a checklist with supporting imagery.",
        "Filterable Portfolio — a project showcase filterable by category (All, Development, E-Commerce, Branding), with multi-image carousels on each portfolio piece.",
        "Bold Brand Identity — a black-and-neon-green dark theme with angular, sticker-style buttons, bold display type, and a marquee ticker of service names for a confident, modern studio feel."
      ],
      tech: ["Web Design", "Front-End Development", "UI/UX", "Responsive Design"],
      category: "Web Development",
      slug: "webspire-studio",
      images: [
        "assets/img/projects/webspire-studio-1.jpg",
        "assets/img/projects/webspire-studio-2.jpg",
        "assets/img/projects/webspire-studio-3.jpg",
        "assets/img/projects/webspire-studio-4.jpg",
        "assets/img/projects/webspire-studio-5.jpg"
      ],
      link: "projects.html#webspire-studio"
    },
    {
      title: "Forex BluePips",
      subtitle: "Algorithmic & Forex Trading Landing Page",
      desc: "A sleek, high-converting landing page for a trading community focused on structured signal delivery, risk management, and market insights — real-time data feeds, built-in interactive tools, and social proof unified in a dark-mode interface for retail traders.",
      overview: "Designed and built a sleek, high-converting landing page for Forex BluePips, a trading community focused on structured signal delivery, risk management, and market insights. The platform combines real-time data feeds, built-in interactive tools, and social proof into a unified dark-mode interface tailored for retail traders.",
      features: [
        "Real-Time Ticker Stream — a top-bar ticker displaying live asset prices and percentage shifts for major Forex pairs (EUR/USD, GBP/USD), cryptocurrencies (BTC, ETH, SOL), and commodities (XAU/USD).",
        "Interactive Trader Toolkit — custom client-side calculators (Profit Calculator, Lot Size Calculator, and Risk/Reward Ratio Calculator) letting users calculate pip values, position sizes, and trade outcomes instantly without leaving the page.",
        "Community & Conversion Funnel — streamlined lead conversion via call-to-action triggers linking directly to Telegram channels and WhatsApp support routing.",
        "Interactive Proof Showcase — a dynamic carousel highlighting community testimonials, real trade setups, and verified account balance screenshots.",
        "Modern UI/UX — styled with a premium dark-gold aesthetic featuring clean typography, high contrast design, card layouts, and responsive components."
      ],
      tech: ["HTML/CSS/JS", "Live Market Data", "Responsive Design", "UI/UX"],
      category: "Web Development",
      slug: "forex-bluepips",
      images: [
        "assets/img/projects/forex-bluepips-1.jpg",
        "assets/img/projects/forex-bluepips-2.jpg",
        "assets/img/projects/forex-bluepips-3.jpg",
        "assets/img/projects/forex-bluepips-4.jpg"
      ],
      link: "projects.html#forex-bluepips"
    },
    { title: "Auto Part Assistant", subtitle: "AI-Powered Parts Inquiry & Ordering", desc: "AI-powered spare-parts inquiry and ordering automation with structured outputs, workflow orchestration, ERP/CRM simulations, validation rules, pricing automation, and AI decision-making.", tech: ["n8n", "ElevenLabs", "Twilio", "AI Agents", "JSON"], category: "AI", link: "" },
    { title: "Email Generating Agent", subtitle: "Structured-output AI writer", desc: "An AI agent that drafts intelligent, on-brand emails with structured outputs and fine-grained tone control — built on Google ADK with Gemini 2.0 Flash.", tech: ["Gemini 2.0 Flash", "Google ADK", "JSON Schema"], category: "AI", link: "" },
    { title: "WhatsApp Chatbot", subtitle: "Automated messaging workflows", desc: "Automated WhatsApp chatbot handling messaging workflows, customer interactions, and downstream API calls — orchestrated end-to-end in n8n.", tech: ["UltraMsg API", "n8n", "Webhooks"], category: "AI", link: "" },
    { title: "Character Design Series", subtitle: "Original concept characters", desc: "A series of original character designs blending sci-fi and fantasy — full color illustrations, turnarounds, and expression sheets crafted in Photoshop.", tech: ["Photoshop", "SketchBook", "Procreate"], category: "Character Design", link: "" },
    { title: "Brand Identity Pack", subtitle: "Logos, color systems, type", desc: "End-to-end brand identity work — logo design, color systems, typography pairings and social media kits for small businesses and creators.", tech: ["Illustrator", "Photoshop", "Figma"], category: "Branding", link: "" },
    { title: "Portrait Illustrations", subtitle: "Commissioned digital portraits", desc: "Custom commissioned digital portrait illustrations with a painterly finish and clean line work — delivered print-ready in multiple formats.", tech: ["Photoshop", "Wacom", "Line Art"], category: "Art", link: "" }
  ],

  gallery: [
    { title: "Phoenix Wing Swordswoman", category: "Character Design", image: "assets/img/art/phoenix-wing-swordswoman.jpg" },
    { title: "Silver Knight", category: "Character Design", image: "assets/img/art/silver-knight.jpg" },
    { title: "Griffin Businessman", category: "Character Design", image: "assets/img/art/griffin-businessman.jpg" },
    { title: "Wolf on the Beach", category: "Character Design", image: "assets/img/art/wolf-on-the-beach.jpg" },
    { title: "Panther Turnaround", category: "Character Design", image: "assets/img/art/panther-turnaround.jpg" },
    { title: "Green Ferret", category: "Character Design", image: "assets/img/art/green-ferret.jpg" },
    { title: "Fox Ranger", category: "Character Design", image: "assets/img/art/fox-ranger.jpg" },
    { title: "Harlequin", category: "Character Design", image: "assets/img/art/harlequin.jpg" },
    { title: "Hooded Rogue", category: "Portrait Art", image: "assets/img/art/hooded-rogue.jpg" },
    { title: "Oni Mask", category: "Concept Art", image: "assets/img/art/oni-mask.jpg" },
    { title: "Character Study", category: "Illustration", image: "assets/img/art/character-study.jpg" },
    { title: "Sci-Fi Soldier", category: "Fan Art", image: "assets/img/art/scifi-soldier.jpg" },
    { title: "Anime Portrait", category: "Fan Art", image: "assets/img/art/anime-portrait.jpg" },
    { title: "Throne of Shadows", category: "Fan Art", image: "assets/img/art/throne-of-shadows.jpg" },
    { title: "Dragon", category: "Pixel Art", image: "assets/img/art/dragon-pixel-art.jpg" },
    { title: "Pixel Avatar", category: "Pixel Art", image: "assets/img/art/pixel-avatar.jpg" },
    { title: "Winged Guardians", category: "Character Design", image: "assets/img/art/winged-guardians.jpg" },
    { title: "Wolf in Purple", category: "Character Design", image: "assets/img/art/wolf-in-purple.jpg" },
    { title: "Pixel Portrait I", category: "Pixel Art", image: "assets/img/art/pixel-portrait-one.jpg" },
    { title: "Pixel Portrait II", category: "Pixel Art", image: "assets/img/art/pixel-portrait-two.jpg" },
    { title: "Pride Flag Bearer", category: "Character Design", image: "assets/img/art/pride-flag-bearer.jpg" },
    { title: "Husky Character Study", category: "Character Design", image: "assets/img/art/husky-character.jpg" },
    { title: "Portrait Study I", category: "Line Art", image: "assets/img/art/portrait-study-pencil-1.jpg" },
    { title: "Portrait Study II", category: "Line Art", image: "assets/img/art/portrait-study-pencil-2.jpg" },
    { title: "Vespa Ride", category: "Illustration", image: "assets/img/art/vespa-ride.jpg" },
    { title: "Eye Can Tell Everything", category: "Graphic Design", image: "assets/img/art/eye-can-tell-everything.jpg" },
    { title: "Vector Self Portrait", category: "Character Design", image: "assets/img/art/vector-self-portrait.jpg" },
    { title: "Keffiyeh Portrait", category: "Character Design", image: "assets/img/art/keffiyeh-portrait.jpg" },
    { title: "Fractured Portrait", category: "Portrait Art", image: "assets/img/art/fractured-portrait.jpg" },
    { title: "Violet Hood", category: "Portrait Art", image: "assets/img/art/violet-hood.jpg" },
    { title: "Studio Portrait", category: "Portrait Art", image: "assets/img/art/studio-portrait.jpg" },
    { title: "Vintage Shades", category: "Portrait Art", image: "assets/img/art/vintage-shades.jpg" },
    { title: "White Cap", category: "Portrait Art", image: "assets/img/art/white-cap-portrait.jpg" },
    { title: "Profile Sketch", category: "Line Art", image: "assets/img/art/profile-sketch.jpg" },
    { title: "Midnight Blue", category: "Concept Art", image: "assets/img/art/midnight-blue.jpg" },
    { title: "Graphite Portrait", category: "Line Art", image: "assets/img/art/graphite-portrait.jpg" },
    { title: "Side Profile Study", category: "Line Art", image: "assets/img/art/side-profile-study.jpg" }
  ]
};

const ICON_BOT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 16h.01M16 16h.01"/></svg>';
const ICON_SPARK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>';
const ICON_LINK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6M10 14L21 3"/></svg>';

if (typeof module !== "undefined") module.exports = SITE_CONTENT;
