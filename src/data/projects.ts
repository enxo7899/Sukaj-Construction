export interface ProjectTimeline {
  planned?: string;       // e.g. "2021" — PLACEHOLDER
  permits?: string;       // e.g. "2022 Q1" — PLACEHOLDER
  construction?: string;  // e.g. "2022–2023" — PLACEHOLDER
  handover?: string;      // e.g. "2023 Q3" — PLACEHOLDER
  usePremit?: string;     // Leje Përdorimi date — PLACEHOLDER
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  year: number;
  typology: string;
  unitMixRange: string;
  status: "completed" | "under-construction" | "planned";
  heroImage: string;
  essence: string;           // One-line essence for cards
  narrative: string;
  locationContext: string;
  sensoryPassage: string;
  materialPalette: string[]; // e.g. ["Travertine", "Porcelain"] — PLACEHOLDER
  timeline: ProjectTimeline;
  permitReference: string;   // e.g. "Leje Ndërtimi — Ref. TBD" — PLACEHOLDER
  galleryExteriors: string[];
  galleryInteriors: string[];
  galleryMaterials: string[];
}

export const projects: Project[] = [
  {
    slug: "rezidenca-bardhe", // PLACEHOLDER: confirm project name
    title: "Rezidenca Bardhe",
    location: "Tirana, Blloku",
    year: 2022,
    typology: "Residential — 6 floors",
    unitMixRange: "1–3 bedroom apartments",
    status: "completed",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    essence: "South-facing terraces above the Blloku district.",
    narrative:
      "A considered response to the Blloku streetscape — generous ceiling heights, south-facing terraces, and travertine cladding that softens across the day.",
    locationContext:
      "Set two blocks from the Grand Park, with unobstructed views of Dajti mountain to the east. The Blloku district offers walkable access to the city's most established commercial strip without the density of the centre.",
    sensoryPassage:
      "Morning light enters the east-facing kitchen at a low angle, tracing a slow arc across the stone worktop. By noon the terrace is in full sun. By evening the mountain turns violet behind the skyline.",
    materialPalette: ["Travertine (facade)", "Porcelain tile (floors)", "Aluminium fenestration"], // PLACEHOLDER: confirm
    timeline: {
      planned: "2020",       // PLACEHOLDER
      permits: "2020 Q4",   // PLACEHOLDER
      construction: "2021–2022", // PLACEHOLDER
      handover: "2022 Q3",   // PLACEHOLDER
      usePremit: "2022",     // PLACEHOLDER
    },
    permitReference: "Leje Ndërtimi — Ref. PLACEHOLDER",
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"],
    galleryInteriors: ["/images/placeholder-interior-1.jpg"],
    galleryMaterials: ["/images/placeholder-material-1.jpg"],
  },
  {
    slug: "kodra-e-diellit", // PLACEHOLDER: confirm project name
    title: "Kodra e Diellit",
    location: "Tirana, Kodra e Diellit",
    year: 2020,
    typology: "Residential — 8 floors",
    unitMixRange: "2–4 bedroom apartments",
    status: "completed",
    heroImage: "/images/placeholder-hero.jpg",
    essence: "Elevated on Tirana's eastern ridge, framing the Erzen valley.",
    narrative:
      "Elevated on Tirana's eastern ridge, the building takes its name from the hillside it crowns. The facade is articulated with deep-set loggie that frame views without sacrificing privacy.",
    locationContext:
      "The site commands a panoramic view over central Tirana and the Erzen valley to the west. The hillside orientation means principal rooms face south-west — the longest sun exposure available in the city.",
    sensoryPassage:
      "The lift opens to a double-height lobby flooded with reflected light from the valley. On clear mornings you can see all the way to Durrës. By evening the western horizon is unbroken.",
    materialPalette: ["Limestone (facade)", "Marble (lobby)", "Teak (loggias)"], // PLACEHOLDER: confirm
    timeline: {
      planned: "2018",
      permits: "2018 Q3",
      construction: "2019–2020",
      handover: "2020 Q2",
      usePremit: "2020",
    },
    permitReference: "Leje Ndërtimi — Ref. PLACEHOLDER",
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"],
    galleryInteriors: ["/images/placeholder-interior-1.jpg"],
    galleryMaterials: ["/images/placeholder-material-1.jpg"],
  },
  {
    slug: "shqiponja-residence",
    title: "Shqiponja Residence",
    location: "Tirana, Kombinat",
    year: 2019,
    typology: "Residential — 5 floors",
    unitMixRange: "Studio–2 bedroom apartments",
    status: "completed",
    heroImage: "/images/placeholder-hero.jpg",
    essence: "Compact and purposeful — quality without compromise on scale.",
    narrative:
      "Compact, refined, and purposeful — designed for young professionals who want quality without compromise on scale. Every square metre is considered.",
    locationContext:
      "A quiet residential street in Kombinat, close to Ring Mall and the Southern Bypass. Good access to both the city centre and the southern ring road.",
    sensoryPassage:
      "The courtyard below acts as a sound buffer. Up here, you hear only birdsong and the occasional tram passing the boulevard. The south balcony catches afternoon light from October through April.",
    materialPalette: ["Render (facade)", "Porcelain (floors)", "PVC fenestration"], // PLACEHOLDER: confirm
    timeline: {
      planned: "2017",
      permits: "2017 Q4",
      construction: "2018–2019",
      handover: "2019 Q2",
      usePremit: "2019",
    },
    permitReference: "Leje Ndërtimi — Ref. PLACEHOLDER",
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"],
    galleryInteriors: ["/images/placeholder-interior-1.jpg"],
    galleryMaterials: ["/images/placeholder-material-1.jpg"],
  },
  {
    slug: "selvia-tower",
    title: "Selvia Tower",
    location: "Tirana, Selvia",
    year: 2018,
    typology: "Mixed-use — 10 floors (retail + residential)",
    unitMixRange: "2–3 bedroom apartments",
    status: "completed",
    heroImage: "/images/placeholder-hero.jpg",
    essence: "Mixed-use corner building at one of Tirana's key intersections.",
    narrative:
      "The ground two floors are given over to small retailers and a pharmacy. Above, nine floors of residences step back from the street line to allow planted balconies on each level.",
    locationContext:
      "At the junction of two of Tirana's busiest arteries, with direct access to the Selvia public square. The corner position gives every apartment a dual-aspect layout.",
    sensoryPassage:
      "The corner apartment on the eighth floor captures both sunrise over the Dajti massif and the city lights spreading westward at dusk — two entirely different views from the same sofa.",
    materialPalette: ["Aluminium cladding (facade)", "Granite (retail base)", "Teak screening (balconies)"], // PLACEHOLDER: confirm
    timeline: {
      planned: "2016",
      permits: "2016 Q3",
      construction: "2017–2018",
      handover: "2018 Q1",
      usePremit: "2018",
    },
    permitReference: "Leje Ndërtimi — Ref. PLACEHOLDER",
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"],
    galleryInteriors: ["/images/placeholder-interior-1.jpg"],
    galleryMaterials: ["/images/placeholder-material-1.jpg"],
  },
  {
    slug: "lumi-flats",
    title: "Lumi Flats",
    location: "Tirana, Rruga e Kavajës",
    year: 2024,
    typology: "Residential — 7 floors",
    unitMixRange: "1–2 bedroom apartments",
    status: "under-construction",
    heroImage: "/images/placeholder-hero.jpg",
    essence: "Urban infill on Tirana's main western boulevard.",
    narrative:
      "An infill building on a narrow city-centre plot, resolving a gap in the Kavajës streetwall with a restrained limestone facade and deep-set window reveals.",
    locationContext:
      "Rruga e Kavajës is Tirana's main commercial artery running west from the centre. The site is three minutes from Skanderbeg Square on foot, with direct bus connections to all districts.",
    sensoryPassage:
      "The upper floors clear the adjacent roofline and open to a diagonal view south-west — the stadium, the Tirana Eye, and beyond that open hillside. The noise of the boulevard is absent by the fourth floor.",
    materialPalette: ["Limestone (facade)", "Aluminium (windows)", "Stone (lobby)"], // PLACEHOLDER: confirm
    timeline: {
      planned: "2022",
      permits: "2023 Q1",
      construction: "2023–2024",
      handover: "2024 Q4", // PLACEHOLDER
    },
    permitReference: "Leje Ndërtimi — Ref. PLACEHOLDER",
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"],
    galleryInteriors: ["/images/placeholder-interior-1.jpg"],
    galleryMaterials: ["/images/placeholder-material-1.jpg"],
  },
  {
    slug: "park-residences",
    title: "Park Residences",
    location: "Tirana, Parku Rinia",
    year: 2025,
    typology: "Residential — 9 floors",
    unitMixRange: "2–4 bedroom apartments",
    status: "under-construction",
    heroImage: "/images/placeholder-hero.jpg",
    essence: "Generous plans facing the city's largest park.",
    narrative:
      "Set back from the park boundary on a landscaped podium, Park Residences prioritises views, cross-ventilation, and outdoor space at every level.",
    locationContext:
      "Adjacent to Parku Rinia — Tirana's largest green space — the site benefits from a protected northern view corridor. The park boundary is classified as a buffer zone; no further construction is permitted between the building and the park.",
    sensoryPassage:
      "On autumn mornings a low mist settles over the park and the building appears to float above the tree canopy. The lobby opens at grade onto a landscaped garden — part private, part shared.",
    materialPalette: ["Travertine (base)", "Through-body porcelain (tower)", "Bronze (fenestration)"], // PLACEHOLDER: confirm
    timeline: {
      planned: "2023",
      permits: "2024 Q1",
      construction: "2024–2025",
      handover: "2025 Q4", // PLACEHOLDER
    },
    permitReference: "Leje Ndërtimi — Ref. PLACEHOLDER",
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"],
    galleryInteriors: ["/images/placeholder-interior-1.jpg"],
    galleryMaterials: ["/images/placeholder-material-1.jpg"],
  },
  {
    slug: "dajti-skyline",
    title: "Dajti Skyline",
    location: "Tirana, Sauk",
    year: 2026,
    typology: "Residential — 12 floors",
    unitMixRange: "2–5 bedroom apartments",
    status: "planned",
    heroImage: "/images/placeholder-hero.jpg",
    essence: "Panoramic living at the foot of Dajti National Park.",
    narrative:
      "A slender tower set on a landscaped podium at the edge of the Sauk ridge, designed to maximise the Dajti and Tirana valley panorama from every apartment.",
    locationContext:
      "Sauk sits at the foot of Dajti National Park — a protected mountain landscape 20 minutes from the city centre. The air quality on the ridge is noticeably better than the valley floor. The building site is elevated above 220m, giving unobstructed westward views across the basin.",
    sensoryPassage:
      "In winter the mountain is occasionally dusted with snow — visible from every north-facing room. In summer, the park trail is 400 metres from the lobby. At dusk, the basin lights up below while the terrace remains in cool shade.",
    materialPalette: ["Marble (base)", "Natural stone (tower)", "Timber (terraces)"], // PLACEHOLDER: confirm
    timeline: {
      planned: "2024",
      permits: "2025", // PLACEHOLDER
      construction: "2025–2026", // PLACEHOLDER
      handover: "2026 Q4", // PLACEHOLDER
    },
    permitReference: "Leje Ndërtimi — Ref. PLACEHOLDER (in progress)",
    galleryExteriors: [],
    galleryInteriors: [],
    galleryMaterials: [],
  },
  {
    slug: "bregu-i-lumit",
    title: "Bregu i Lumit",
    location: "Tirana, Bregu i Lumit",
    year: 2025,
    typology: "Residential — 8 floors",
    unitMixRange: "2–3 bedroom apartments",
    status: "under-construction",
    heroImage: "/images/placeholder-hero.jpg",
    essence: "Riverside living on the Lana canal, Tirana.",
    narrative:
      "A residential building sited on the Lana canal embankment, with generous south-facing terraces and a restrained rendered facade that responds to the waterside setting.",
    locationContext:
      "The Lana canal runs east-west through central Tirana. The embankment path is traffic-free and connects to the Zoological Garden and the riverbank walkway. An unusual amenity for a city-centre address.",
    sensoryPassage:
      "In the evening the canal reflects the building lights and the sound of water is audible from the lower floor terraces. In summer the embankment trees provide dappled shade to the main facade.",
    materialPalette: ["Textured render (facade)", "Limestone (base)", "Steel (balustrades)"], // PLACEHOLDER: confirm
    timeline: {
      planned: "2022",
      permits: "2023 Q2",
      construction: "2023–2025",
      handover: "2025 Q2", // PLACEHOLDER
    },
    permitReference: "Leje Ndërtimi — Ref. PLACEHOLDER",
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"],
    galleryInteriors: ["/images/placeholder-interior-1.jpg"],
    galleryMaterials: [],
  },
  {
    slug: "qyteti-student",
    title: "Qyteti Student",
    location: "Tirana, Qyteti Studenti",
    year: 2027,
    typology: "Residential — 10 floors",
    unitMixRange: "Studio–3 bedroom apartments",
    status: "planned",
    heroImage: "/images/placeholder-hero.jpg",
    essence: "Close to university campus — studios and compact apartments.",
    narrative:
      "A mixed-scale building near Tirana's university campus, offering a range of apartment sizes from compact studios to three-bedroom layouts.",
    locationContext:
      "Qyteti Studenti is one of Tirana's most walkable districts — close to the polytechnic, the academy of arts, and the main bus corridor east. The area has seen significant investment in cafes and services over the past five years.",
    sensoryPassage:
      "The building steps back from the street on the south face, creating a small planted forecourt that separates the lobby entrance from the pavement. The upper apartments face south over the rooftop terrace.",
    materialPalette: ["Through-body porcelain (facade)", "Concrete (frame, expressed)", "Steel (balconies)"], // PLACEHOLDER: confirm
    timeline: {
      planned: "2025",
      permits: "2026", // PLACEHOLDER
      construction: "2026–2027", // PLACEHOLDER
      handover: "2027 Q4", // PLACEHOLDER
    },
    permitReference: "Leje Ndërtimi — Ref. PLACEHOLDER (not yet submitted)",
    galleryExteriors: [],
    galleryInteriors: [],
    galleryMaterials: [],
  },
  {
    slug: "21-nentor",
    title: "21 Nëntor",
    location: "Tirana, 21 Dhjetori",
    year: 2023,
    typology: "Residential — 7 floors",
    unitMixRange: "2–4 bedroom apartments",
    status: "completed",
    heroImage: "/images/placeholder-hero.jpg",
    essence: "Well-connected address near Tirana's diplomatic quarter.",
    narrative:
      "A 7-floor residential building on a well-established Tirana street, with a travertine facade, large private terraces, and underground parking.",
    locationContext:
      "Close to the diplomatic quarter and the main international school corridor. The neighbourhood has a quiet character despite its central location — wide tree-lined streets and low-rise surroundings.",
    sensoryPassage:
      "The entrance is set back from the street behind a planting strip of olive trees. Inside, the lobby uses natural light well — a high window at the stair brings afternoon sun deep into the ground floor.",
    materialPalette: ["Travertine (facade)", "Oak (lobby)", "Marble (entrance floor)"], // PLACEHOLDER: confirm
    timeline: {
      planned: "2021",
      permits: "2021 Q3",
      construction: "2022–2023",
      handover: "2023 Q2",
      usePremit: "2023",
    },
    permitReference: "Leje Ndërtimi — Ref. PLACEHOLDER",
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"],
    galleryInteriors: ["/images/placeholder-interior-1.jpg"],
    galleryMaterials: ["/images/placeholder-material-1.jpg"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
