/**
 * HM DESIGNZ — studio content.
 *
 * A single source of truth for the marketing site so pages stay consistent.
 * Imagery points at warm, modern interior photography placeholders.
 */

export const STUDIO = {
  name: "HM DESIGNZ",
  founder: "Harish Malviya",
  tagline:
    "Creating unique architectural and interior solutions through thoughtful design",
  city: "Indore",
  region: "Madhya Pradesh, India",
  address: "16/2, Scheme No. 78, Vijay Nagar, Indore, MP 452010",
  phone: "+91 98260 12345",
  whatsapp: "+91 98260 12345",
  email: "studio@hmdesignz.in",
  instagram: "https://instagram.com/hmdesignz",
  youtube: "https://youtube.com/@hmdesignz",
  founded: 2014,
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Studio", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

export const STATS = [
  { value: "180+", label: "Projects Completed" },
  { value: "11", label: "Years of Experience" },
  { value: "150+", label: "Happy Clients" },
  { value: "60+", label: "Vastu-Aligned Designs" },
];

export type ProjectCategory =
  | "Residential"
  | "Interior"
  | "Commercial"
  | "Modular Kitchen"
  | "Vastu";

export interface Project {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  year: string;
  area: string;
  scope: string;
  duration: string;
  tagline: string;
  summary: string;
  story: string[];
  highlights: string[];
  palette: string[];
  materials: string[];
  cover: string;
  gallery: string[];
  featured?: boolean;
}

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PROJECTS: Project[] = [
  {
    slug: "serial-residency",
    title: "Serial Residency",
    location: "Vijay Nagar, Indore",
    category: "Residential",
    year: "2024",
    area: "4,200 sq.ft",
    scope: "Architecture + Interior",
    duration: "14 months",
    tagline: "A family bungalow wrapped in warm stone and daylight.",
    summary:
      "A four-bedroom bungalow planned around a central light court, where travertine walls, teak joinery and layered lighting keep the home calm through Indore's long summers.",
    story: [
      "The clients came to us with a simple brief — a home that feels open yet private, rooted in family rituals but modern in its lines. We began by carving a central light court into the plan, so every room borrows daylight and cross-ventilation instead of relying on the courtyard being seen.",
      "Warm travertine, brushed oak and a restrained champagne palette carry through the interiors. Vastu principles guided the entry orientation and kitchen placement without ever reading as conventional, letting the design stay quiet and contemporary.",
    ],
    highlights: [
      "Double-height central light court",
      "Deep stone jaalis for privacy and shade",
      "Custom teak joinery throughout",
      "Vastu-aligned entry and kitchen",
    ],
    palette: ["#2a241c", "#c9a86a", "#cdbfa7", "#6f7a6a"],
    materials: ["Travertine", "Teak", "Brushed brass", "Lime plaster"],
    cover: img("photo-1600585154340-be6161a56a0c"),
    gallery: [
      img("photo-1600210492486-724fe5c67fb0"),
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1616486338812-3dadae4b4ace", 1200),
      img("photo-1600566753086-00f18fb6b3ea", 1200),
    ],
    featured: true,
  },
  {
    slug: "noir-penthouse",
    title: "Noir Penthouse",
    location: "AB Road, Indore",
    category: "Interior",
    year: "2023",
    area: "3,100 sq.ft",
    scope: "Interior Design",
    duration: "9 months",
    tagline: "A skyline home in smoked oak and soft champagne light.",
    summary:
      "A top-floor penthouse for a young couple, designed as a sequence of dark, enveloping rooms that open to a glowing city view.",
    story: [
      "We treated the penthouse like a gallery of dusk — smoked oak floors, muted terracotta walls and pools of warm light. Every seating group faces the horizon, so the skyline becomes the artwork.",
      "A monolithic kitchen in honed stone anchors the open plan, while sheer linen and low, grounded furniture keep the atmosphere soft and liveable rather than glossy.",
    ],
    highlights: [
      "Honed-stone island kitchen",
      "Layered warm lighting scheme",
      "Floor-to-ceiling corner glazing",
      "Bespoke bar and lounge nook",
    ],
    palette: ["#16130f", "#b5744f", "#c9a86a", "#8f8a7d"],
    materials: ["Smoked oak", "Honed basalt", "Linen", "Amber glass"],
    cover: img("photo-1600607687920-4e2a09cf159d"),
    gallery: [
      img("photo-1618221195710-dd6b41faaea6"),
      img("photo-1556228720-195a672e8a03", 1200),
      img("photo-1522708323590-d24dbb6b0267", 1200),
      img("photo-1493809842364-78817add7ffb", 1200),
    ],
    featured: true,
  },
  {
    slug: "the-courtyard-house",
    title: "The Courtyard House",
    location: "Bicholi Mardana, Indore",
    category: "Vastu",
    year: "2024",
    area: "5,600 sq.ft",
    scope: "Architecture + Vastu",
    duration: "18 months",
    tagline: "Vastu wisdom expressed through modern geometry.",
    summary:
      "A classic Vastu footprint reimagined in clean, contemporary lines — north-east water, south-west mass, and a shaded courtyard at its heart.",
    story: [
      "Vastu here is not decoration; it is structure. We let the zoning, sunlight and airflow follow the traditional grid, then resolved it all in a crisp, minimal language of concrete, stone and timber.",
      "The courtyard cools the house through passive design, while pivot shutters and deep overhangs manage glare gently across the day.",
    ],
    highlights: [
      "Passive-cooled central courtyard",
      "North-east water body",
      "Pivot shutters and deep overhangs",
      "Integrated home temple wall",
    ],
    palette: ["#2a241c", "#cdbfa7", "#c9a86a", "#6f7a6a"],
    materials: ["Board-formed concrete", "Kota stone", "Teak", "Brass"],
    cover: img("photo-1613490493576-7fde63acd811"),
    gallery: [
      img("photo-1512917774080-9991f1c4c750"),
      img("photo-1580587771525-78b9dba3b914", 1200),
      img("photo-1449844908441-8829872d2607", 1200),
      img("photo-1600596542815-ffad4c1539a9", 1200),
    ],
    featured: true,
  },
  {
    slug: "ember-kitchen",
    title: "Ember Kitchen",
    location: "Sapna Sangeeta, Indore",
    category: "Modular Kitchen",
    year: "2023",
    area: "420 sq.ft",
    scope: "Modular Kitchen + Dining",
    duration: "4 months",
    tagline: "A warm, hardworking kitchen built around a family of six.",
    summary:
      "An L-shaped modular kitchen in warm veneer and quartz, planned for the daily rhythm of a joint family.",
    story: [
      "Efficiency first: a tight work triangle, generous tall storage and a breakfast counter that doubles as a homework station. Warm veneer and terracotta accents keep it hospitable, not clinical.",
      "Soft task lighting under the overheads and a full-height pantry wall make the space feel calm even at the busiest hour.",
    ],
    highlights: [
      "Ergonomic work triangle",
      "Full-height pantry wall",
      "Breakfast and homework counter",
      "Soft task lighting",
    ],
    palette: ["#2a241c", "#b5744f", "#c9a86a", "#8f8a7d"],
    materials: ["Warm veneer", "Engineered quartz", "Antique brass", "Matte laminate"],
    cover: img("photo-1631679706909-1844bbd07221"),
    gallery: [
      img("photo-1556909212-d5b604d0c90d"),
      img("photo-1600489000022-c2086d79f9d4", 1200),
      img("photo-1600566752355-35792bedcfea", 1200),
    ],
    featured: true,
  },
  {
    slug: "terra-office",
    title: "Terra Office",
    location: "Palasia, Indore",
    category: "Commercial",
    year: "2022",
    area: "6,800 sq.ft",
    scope: "Workplace Interior",
    duration: "7 months",
    tagline: "A calm headquarters that feels like a garden pavilion.",
    summary:
      "A workplace reimagined as a series of warm, planted rooms — biophilia, acoustic softness and quiet luxury for a growing firm.",
    story: [
      "We broke a deep floorplate into neighbourhoods around planting and daylight. Acoustic felt, oak slats and muted tones keep focus high and voices low.",
      "A terracotta-toned boardroom and a café-like collaboration deck give the brand a memorable, human face.",
    ],
    highlights: [
      "Planted neighbourhoods",
      "Acoustic oak slat ceilings",
      "Terracotta boardroom",
      "Café-style collaboration deck",
    ],
    palette: ["#16130f", "#b5744f", "#6f7a6a", "#cdbfa7"],
    materials: ["Oak slats", "Acoustic felt", "Terracotta tile", "Blackened steel"],
    cover: img("photo-1497366216548-37526070297c"),
    gallery: [
      img("photo-1497366811353-6870744d04b2"),
      img("photo-1524758631624-e2822e304c36", 1200),
      img("photo-1560448204-e02f11c3d0e2", 1200),
    ],
  },
  {
    slug: "serene-loft",
    title: "Serene Loft",
    location: "Sudama Nagar, Indore",
    category: "Residential",
    year: "2023",
    area: "1,850 sq.ft",
    scope: "Interior Design",
    duration: "6 months",
    tagline: "A compact apartment that breathes like a much larger home.",
    summary:
      "A two-bedroom apartment opened up through mirrors, low furniture and a continuous material palette of plaster, oak and champagne brass.",
    story: [
      "Small footprint, generous feeling — we dissolved corridors, let the living and dining run together, and used a low, horizontal furniture language to widen every room.",
      "Fluted glass, concealed storage and a mirrored splashback quietly double the sense of space.",
    ],
    highlights: [
      "Corridor-free open plan",
      "Fluted glass partitions",
      "Full-height concealed storage",
      "Mirrored kitchen splashback",
    ],
    palette: ["#2a241c", "#cdbfa7", "#c9a86a", "#a39f96"],
    materials: ["Lime plaster", "European oak", "Champagne brass", "Fluted glass"],
    cover: img("photo-1586023492125-27b2c045efd7"),
    gallery: [
      img("photo-1502005229762-cf1b2da7c5d6"),
      img("photo-1615874959474-d609969a20ed", 1200),
      img("photo-1616486338812-3dadae4b4ace", 1200),
    ],
  },
  {
    slug: "bloom-boutique",
    title: "Bloom Boutique",
    location: "Old Palasia, Indore",
    category: "Commercial",
    year: "2022",
    area: "1,200 sq.ft",
    scope: "Retail Interior",
    duration: "3 months",
    tagline: "A jewellery boutique that glows like a warm keepsake box.",
    summary:
      "A small luxury retail space where amber light, arched niches and soft velvet make every piece feel considered.",
    story: [
      "We designed the store as a jewel box — arched display niches, champagne lighting and a deep terracotta backdrop that flatters gold and gemstones.",
      "A central consultation table and a private viewing room turn shopping into a slow, personal ritual.",
    ],
    highlights: [
      "Arched display niches",
      "Champagne accent lighting",
      "Private viewing room",
      "Deep terracotta backdrop",
    ],
    palette: ["#2a241c", "#b5744f", "#c9a86a", "#171207"],
    materials: ["Velvet", "Antique mirror", "Brass", "Terrazzo"],
    cover: img("photo-1604014237800-1c9102c219da"),
    gallery: [
      img("photo-1567521464027-f127ff144326", 1200),
      img("photo-1441986300917-64674bd600d8", 1200),
    ],
  },
  {
    slug: "vastu-villa",
    title: "Vastu Villa",
    location: "Dewas, Madhya Pradesh",
    category: "Vastu",
    year: "2021",
    area: "3,900 sq.ft",
    scope: "Architecture + Vastu",
    duration: "15 months",
    tagline: "Tradition, resolved with a clean contemporary hand.",
    summary:
      "A weekend villa for a family that wanted authentic Vastu planning within a minimal, modern envelope.",
    story: [
      "The plan follows the Vastu mandala precisely; the expression does not. Clean volumes, deep verandahs and a water court keep it serene and modern.",
      "Locally quarried stone and a warm neutral palette tie the villa to its landscape.",
    ],
    highlights: [
      "Vastu mandala planning",
      "Water court and verandahs",
      "Locally quarried stone",
      "Minimal modern envelope",
    ],
    palette: ["#2a241c", "#cdbfa7", "#6f7a6a", "#c9a86a"],
    materials: ["Local sandstone", "Lime plaster", "Teak", "Terracotta"],
    cover: img("photo-1507089947368-19c1da9775ae"),
    gallery: [
      img("photo-1512917774080-9991f1c4c750"),
      img("photo-1600596542815-ffad4c1539a9", 1200),
      img("photo-1416331108676-a22ccb276e35", 1200),
    ],
  },
  {
    slug: "ivory-suite",
    title: "Ivory Suite",
    location: "Vijay Nagar, Indore",
    category: "Interior",
    year: "2024",
    area: "560 sq.ft",
    scope: "Master Bedroom",
    duration: "5 months",
    tagline: "A bedroom designed as a slow, restorative retreat.",
    summary:
      "A master suite in soft ivory, warm timber and layered textiles, built for rest and quiet mornings.",
    story: [
      "Everything here lowers the pulse — a muted palette, tactile plaster, blackout layering and lighting that warms and dims with the evening.",
      "A reading nook by the window and a bespoke dresser complete a room that feels both luxurious and deeply calm.",
    ],
    highlights: [
      "Layered blackout and sheer drapery",
      "Bespoke dresser and reading nook",
      "Dimmable warm lighting",
      "Tactile lime plaster walls",
    ],
    palette: ["#2a241c", "#cdbfa7", "#e8dcc4", "#a39f96"],
    materials: ["Lime plaster", "Walnut", "Bouclé", "Linen"],
    cover: img("photo-1615529182904-14819c35db37"),
    gallery: [
      img("photo-1505691938895-1758d7feb511"),
      img("photo-1507652313519-d4e9174996dd", 1200),
      img("photo-1522771739844-6a9f6d5f14af", 1200),
    ],
  },
];

export const PROJECT_CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Residential",
  "Interior",
  "Commercial",
  "Modular Kitchen",
  "Vastu",
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon:
    | "architecture"
    | "interior"
    | "furniture"
    | "renovation"
    | "kitchen"
    | "vastu";
}

export const SERVICES: Service[] = [
  {
    slug: "architecture",
    title: "Architecture",
    tagline: "From first sketch to structure",
    description:
      "Ground-up design for homes, villas and small commercial builds — planning, elevations, and detail drawings resolved as one coherent idea.",
    deliverables: [
      "Site study & feasibility",
      "Concept and 3D visualisation",
      "Working drawings & detailing",
      "Site supervision",
    ],
    icon: "architecture",
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    tagline: "Rooms that feel like you",
    description:
      "Full-scope interiors with a warm, contemporary hand — spatial planning, materials, lighting and styling tailored to how you actually live.",
    deliverables: [
      "Space planning",
      "Material & finish palettes",
      "Lighting design",
      "Furniture & styling",
    ],
    icon: "interior",
  },
  {
    slug: "furniture-design",
    title: "Furniture Design",
    tagline: "Made to measure, made to last",
    description:
      "Bespoke joinery and loose furniture designed by the studio and built by trusted Indore craftspeople in solid timber and stone.",
    deliverables: [
      "Custom joinery drawings",
      "Material sourcing",
      "Artisan coordination",
      "On-site installation",
    ],
    icon: "furniture",
  },
  {
    slug: "renovation",
    title: "Renovation",
    tagline: "New life for loved spaces",
    description:
      "Thoughtful remodels that respect what already works — structural, spatial and cosmetic upgrades delivered with minimal disruption.",
    deliverables: [
      "Condition assessment",
      "Retrofit planning",
      "Phased execution",
      "Finish upgrades",
    ],
    icon: "renovation",
  },
  {
    slug: "modular-kitchen",
    title: "Modular Kitchen",
    tagline: "The warm heart of the home",
    description:
      "Hardworking kitchens planned around your cooking rhythm, in warm veneers and durable stone, engineered for Indian family life.",
    deliverables: [
      "Ergonomic work-triangle planning",
      "Modular joinery layout",
      "Countertop & backsplash design",
      "Appliance integration",
    ],
    icon: "kitchen",
  },
  {
    slug: "vastu-planning",
    title: "Vastu Planning",
    tagline: "Balance, quietly integrated",
    description:
      "Vastu guidance woven into the architecture from day one — directing light, orientation and zoning without compromising modern design.",
    deliverables: [
      "Vastu assessment",
      "Orientation & zoning plan",
      "Remedial recommendations",
      "Contractor coordination",
    ],
    icon: "vastu",
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  summary: string;
  detail: string;
  deliverables: string[];
  duration: string;
}

export const PROCESS: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    summary: "We listen before we draw.",
    detail:
      "A long, unhurried conversation about how you live, what you love and what you can't compromise on. We survey the site, study light and circulation, and align on budget and Vastu priorities.",
    deliverables: ["Brief & lifestyle study", "Site survey", "Budget framework"],
    duration: "1–2 weeks",
  },
  {
    index: "02",
    title: "Concept",
    summary: "The big idea takes shape.",
    detail:
      "We translate the brief into a spatial concept — plans, massing and mood. Material palettes and reference imagery make the direction tangible before any detail is fixed.",
    deliverables: ["Concept plans", "Mood boards", "3D massing"],
    duration: "2–3 weeks",
  },
  {
    index: "03",
    title: "Design",
    summary: "Where the idea becomes buildable.",
    detail:
      "Detailed drawings, finishes, lighting and joinery are resolved together. You see photoreal visualisations and sign off on every material before it is specified.",
    deliverables: ["Working drawings", "Material palettes", "Photoreal 3D"],
    duration: "4–6 weeks",
  },
  {
    index: "04",
    title: "Execution",
    summary: "Craft, coordinated end to end.",
    detail:
      "Our team and trusted Indore contractors build to the drawings, with regular site reviews, sample approvals and transparent progress updates throughout.",
    deliverables: ["Contractor coordination", "Site supervision", "Quality reviews"],
    duration: "Project timeline",
  },
  {
    index: "05",
    title: "Handover",
    summary: "A home, ready to be lived in.",
    detail:
      "Final styling, snag-free closure and a care guide for every material we commissioned. Our relationship continues long after the keys change hands.",
    deliverables: ["Styling & staging", "Care guide", "Warranty support"],
    duration: "1–2 weeks",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Harish and the team understood our family before drawing a single line. The home feels exactly like us — warm, calm and full of light.",
    name: "Ritu & Ankit Sharma",
    role: "Serial Residency, Vijay Nagar",
  },
  {
    quote:
      "They made Vastu feel modern instead of traditional. Every room is balanced, and the design is effortlessly contemporary.",
    name: "Dr. Meena Verma",
    role: "The Courtyard House",
  },
  {
    quote:
      "Our kitchen went from the most stressful room to the most loved. Thoughtful planning, beautiful materials, zero drama.",
    name: "Pooja Agarwal",
    role: "Ember Kitchen",
  },
  {
    quote:
      "Professional, patient and genuinely creative. The office feels like a calm garden — our team noticed the difference in a week.",
    name: "Sanjay Mehta",
    role: "Terra Office, Palasia",
  },
];

export const AWARDS = [
  { year: "2024", title: "Featured Home", body: "Indore Design Collective" },
  { year: "2023", title: "Best Residential Interior", body: "MP Design Awards" },
  { year: "2022", title: "Vastu Innovation Honour", body: "Central India Build Expo" },
  { year: "2021", title: "Rising Studio", body: "Architecture India Notes" },
];

export const INSTAGRAM_FEED = [
  img("photo-1600210492486-724fe5c67fb0", 800),
  img("photo-1616486338812-3dadae4b4ace", 800),
  img("photo-1600607687939-ce8a6c25118c", 800),
  img("photo-1615529182904-14819c35db37", 800),
  img("photo-1631679706909-1844bbd07221", 800),
  img("photo-1600585154340-be6161a56a0c", 800),
];

export const FOUNDER_PORTRAIT = img("photo-1560250097-0b93528c311a", 1000);

export const VALUES = [
  {
    title: "Tailored, never templated",
    body: "Every project begins with your story. We design for the way you live, not from a catalogue of trends.",
  },
  {
    title: "Cozy, not cold",
    body: "Modern doesn't have to be minimal to the point of sterile. We layer warmth — timber, texture and light.",
  },
  {
    title: "Vastu, quietly",
    body: "Traditional wisdom, expressed through clean contemporary geometry, never as decoration.",
  },
  {
    title: "Relationships first",
    body: "Most of our work comes from referrals and returning families. We design for the long term.",
  },
];
