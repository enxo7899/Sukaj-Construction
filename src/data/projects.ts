export interface Project {
  slug: string;
  title: string;
  location: string;
  year: number;
  typology: string;
  unitMixRange: string;
  status: "completed" | "under-construction" | "planned";
  heroImage: string;
  narrative: string;
  locationContext: string;
  sensoryPassage: string;
  galleryExteriors: string[];
  galleryInteriors: string[];
  galleryMaterials: string[];
}

export const projects: Project[] = [
  {
    slug: "rezidenca-bardhe", // PLACEHOLDER: confirm project name
    title: "Rezidenca Bardhe", // PLACEHOLDER: confirm project name
    location: "Tirana, Blloku", // PLACEHOLDER: confirm exact location
    year: 2022, // PLACEHOLDER: confirm year
    typology: "Residential — 6 floors", // PLACEHOLDER: confirm typology
    unitMixRange: "1–3 bedroom apartments", // PLACEHOLDER: confirm unit mix
    status: "completed",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    narrative:
      "A considered response to the Blloku streetscape — generous ceiling heights, south-facing terraces, and travertine cladding that softens across the day.", // PLACEHOLDER: confirm narrative
    locationContext:
      "Set two blocks from the Grand Park, with unobstructed views of Dajti mountain to the east.", // PLACEHOLDER: confirm context
    sensoryPassage:
      "Morning light enters the east-facing kitchen at a low angle, tracing a slow arc across the stone worktop. By noon the terrace is in full sun. By evening the mountain turns violet.", // PLACEHOLDER: confirm sensory passage
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryInteriors: ["/images/placeholder-interior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryMaterials: ["/images/placeholder-material-1.jpg"], // PLACEHOLDER: replace with real assets
  },
  {
    slug: "kodra-e-diellit", // PLACEHOLDER: confirm project name
    title: "Kodra e Diellit", // PLACEHOLDER: confirm project name
    location: "Tirana, Kodra e Diellit", // PLACEHOLDER: confirm location
    year: 2020, // PLACEHOLDER: confirm year
    typology: "Residential — 8 floors", // PLACEHOLDER: confirm typology
    unitMixRange: "2–4 bedroom apartments", // PLACEHOLDER: confirm unit mix
    status: "completed",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    narrative:
      "Elevated on Tirana's eastern ridge, the building takes its name from the hillside it crowns. The facade is articulated with deep-set loggie that frame views without sacrificing privacy.", // PLACEHOLDER: confirm narrative
    locationContext:
      "The site commands a panoramic view over central Tirana and the Erzen valley to the west.", // PLACEHOLDER: confirm context
    sensoryPassage:
      "The lift opens to a double-height lobby flooded with reflected light from the valley. On clear mornings you can see all the way to Durrës.", // PLACEHOLDER: confirm sensory passage
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryInteriors: ["/images/placeholder-interior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryMaterials: ["/images/placeholder-material-1.jpg"], // PLACEHOLDER: replace with real assets
  },
  {
    slug: "shqiponja-residence", // PLACEHOLDER: confirm project name
    title: "Shqiponja Residence", // PLACEHOLDER: confirm project name
    location: "Tirana, Kombinat", // PLACEHOLDER: confirm location
    year: 2019, // PLACEHOLDER: confirm year
    typology: "Residential — 5 floors", // PLACEHOLDER: confirm typology
    unitMixRange: "Studio–2 bedroom apartments", // PLACEHOLDER: confirm unit mix
    status: "completed",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    narrative:
      "Compact, refined, and purposeful — designed for young professionals who want quality without compromise on scale.", // PLACEHOLDER: confirm narrative
    locationContext:
      "A quiet residential street in Kombinat, close to Ring Mall and the Southern Bypass.", // PLACEHOLDER: confirm context
    sensoryPassage:
      "The courtyard below acts as a sound buffer. Up here, you hear only birdsong and the occasional tram passing the boulevard.", // PLACEHOLDER: confirm sensory passage
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryInteriors: ["/images/placeholder-interior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryMaterials: ["/images/placeholder-material-1.jpg"], // PLACEHOLDER: replace with real assets
  },
  {
    slug: "selvia-tower", // PLACEHOLDER: confirm project name
    title: "Selvia Tower", // PLACEHOLDER: confirm project name
    location: "Tirana, Selvia", // PLACEHOLDER: confirm location
    year: 2018, // PLACEHOLDER: confirm year
    typology: "Mixed-use — 10 floors (retail + residential)", // PLACEHOLDER: confirm typology
    unitMixRange: "2–3 bedroom apartments", // PLACEHOLDER: confirm unit mix
    status: "completed",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    narrative:
      "The ground two floors are given over to small retailers and a pharmacy. Above, nine floors of residences step back from the street line to allow planted balconies on each level.", // PLACEHOLDER: confirm narrative
    locationContext:
      "At the junction of two of Tirana's busiest arteries, with direct access to the Selvia public square.", // PLACEHOLDER: confirm context
    sensoryPassage:
      "The corner apartment on the eighth floor captures both sunrise over the Dajti massif and the city lights spreading westward at dusk — two entirely different views from the same sofa.", // PLACEHOLDER: confirm sensory passage
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryInteriors: ["/images/placeholder-interior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryMaterials: ["/images/placeholder-material-1.jpg"], // PLACEHOLDER: replace with real assets
  },
  {
    slug: "lumi-flats", // PLACEHOLDER: confirm project name
    title: "Lumi Flats", // PLACEHOLDER: confirm project name
    location: "Tirana, Rruga e Kavajës", // PLACEHOLDER: confirm location
    year: 2024, // PLACEHOLDER: confirm year
    typology: "Residential — 7 floors", // PLACEHOLDER: confirm typology
    unitMixRange: "1–2 bedroom apartments", // PLACEHOLDER: confirm unit mix
    status: "completed",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    narrative:
      "Lumi Flats occupies a narrow urban infill site. The constraints became generative — a single-loaded corridor lets every apartment face the rear garden.", // PLACEHOLDER: confirm narrative
    locationContext:
      "One block from Rruga e Kavajës, Tirana's main western artery, in a neighbourhood undergoing significant upgrading.", // PLACEHOLDER: confirm context
    sensoryPassage:
      "From the rear-facing bedrooms you look down into a private garden that belongs entirely to the residents — a rarity this close to the city centre.", // PLACEHOLDER: confirm sensory passage
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryInteriors: ["/images/placeholder-interior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryMaterials: ["/images/placeholder-material-1.jpg"], // PLACEHOLDER: replace with real assets
  },
  {
    slug: "mali-residences", // PLACEHOLDER: confirm project name
    title: "Mali Residences", // PLACEHOLDER: confirm project name
    location: "Tirana, Astir", // PLACEHOLDER: confirm location
    year: 2025, // PLACEHOLDER: confirm year
    typology: "Residential — 9 floors", // PLACEHOLDER: confirm typology
    unitMixRange: "2–4 bedroom apartments", // PLACEHOLDER: confirm unit mix
    status: "under-construction",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    narrative:
      "Mali Residences extends the Sukaj palette northward into Astir, a district that has attracted Tirana's most design-conscious buyers over the past five years.", // PLACEHOLDER: confirm narrative
    locationContext:
      "Set back from the Astir ring road, within walking distance of the new Astir retail park and the Lana river pathway.", // PLACEHOLDER: confirm context
    sensoryPassage:
      "The skeleton is rising now. Stand on the fifth floor and the Dajti cable-car is almost at eye level — a reminder of just how close the mountain is to the centre.", // PLACEHOLDER: confirm sensory passage
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryInteriors: ["/images/placeholder-interior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryMaterials: ["/images/placeholder-material-1.jpg"], // PLACEHOLDER: replace with real assets
  },
  {
    slug: "pinetum-villas", // PLACEHOLDER: confirm project name
    title: "Pinetum Villas", // PLACEHOLDER: confirm project name
    location: "Tirana, Farka Lake", // PLACEHOLDER: confirm location
    year: 2026, // PLACEHOLDER: confirm year
    typology: "Villas — 12 units", // PLACEHOLDER: confirm typology
    unitMixRange: "3–5 bedroom villas", // PLACEHOLDER: confirm unit mix
    status: "under-construction",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    narrative:
      "Twelve detached villas arranged around a shared pine grove. Each unit is oriented to maximise lake views while maintaining privacy between neighbours.", // PLACEHOLDER: confirm narrative
    locationContext:
      "Farka Lake, 6 km south-east of Tirana centre — the city's most sought-after suburban address.", // PLACEHOLDER: confirm context
    sensoryPassage:
      "The smell of pine resin on a warm afternoon. The lake glints between the trunks. A project that genuinely earns the word 'retreat.'", // PLACEHOLDER: confirm sensory passage
    galleryExteriors: ["/images/placeholder-exterior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryInteriors: ["/images/placeholder-interior-1.jpg"], // PLACEHOLDER: replace with real assets
    galleryMaterials: ["/images/placeholder-material-1.jpg"], // PLACEHOLDER: replace with real assets
  },
  {
    slug: "qendra-qytetit-apartments", // PLACEHOLDER: confirm project name
    title: "Qendra Qytetit Apartments", // PLACEHOLDER: confirm project name
    location: "Tirana, City Centre", // PLACEHOLDER: confirm location
    year: 2027, // PLACEHOLDER: confirm year
    typology: "Residential — 12 floors", // PLACEHOLDER: confirm typology
    unitMixRange: "1–3 bedroom apartments", // PLACEHOLDER: confirm unit mix
    status: "planned",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    narrative:
      "An address in the literal centre of Tirana, designed around the idea that proximity to culture and commerce is itself a form of luxury.", // PLACEHOLDER: confirm narrative
    locationContext:
      "Adjacent to Skanderbeg Square, Tirana's civic heart, with direct views of the National History Museum and the Et'hem Bey Mosque.", // PLACEHOLDER: confirm context
    sensoryPassage:
      "Not yet built, but already imagined: the muezzin call at sunset, the city's evening promenade below, and the mountain darkening behind it.", // PLACEHOLDER: confirm sensory passage
    galleryExteriors: [], // PLACEHOLDER: replace with real assets when available
    galleryInteriors: [], // PLACEHOLDER: replace with real assets when available
    galleryMaterials: [], // PLACEHOLDER: replace with real assets when available
  },
  {
    slug: "liqeni-heights", // PLACEHOLDER: confirm project name
    title: "Liqeni Heights", // PLACEHOLDER: confirm project name
    location: "Tirana, Liqeni Artificial", // PLACEHOLDER: confirm location
    year: 2028, // PLACEHOLDER: confirm year
    typology: "Residential — 8 floors", // PLACEHOLDER: confirm typology
    unitMixRange: "2–4 bedroom apartments", // PLACEHOLDER: confirm unit mix
    status: "planned",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    narrative:
      "Set above the Artificial Lake, where the city's most frequented green corridor meets its newest residential edge.", // PLACEHOLDER: confirm narrative
    locationContext:
      "Overlooking the Liqeni Artificial park — 290 hectares of public green space, running trails, and the city's cleanest air.", // PLACEHOLDER: confirm context
    sensoryPassage:
      "A project still on the drawing board, but the lakeside address speaks for itself: a morning run to a waterfront café, then back before the city wakes.", // PLACEHOLDER: confirm sensory passage
    galleryExteriors: [], // PLACEHOLDER: replace with real assets when available
    galleryInteriors: [], // PLACEHOLDER: replace with real assets when available
    galleryMaterials: [], // PLACEHOLDER: replace with real assets when available
  },
  {
    slug: "ura-e-tabakeve", // PLACEHOLDER: confirm project name
    title: "Ura e Tabakëve", // PLACEHOLDER: confirm project name
    location: "Tirana, Tirana e Re", // PLACEHOLDER: confirm location
    year: 2029, // PLACEHOLDER: confirm year
    typology: "Residential — 10 floors", // PLACEHOLDER: confirm typology
    unitMixRange: "2–3 bedroom apartments", // PLACEHOLDER: confirm unit mix
    status: "planned",
    heroImage: "/images/placeholder-hero.jpg", // PLACEHOLDER: replace with real asset
    narrative:
      "Named for the historic tanner's bridge that once stood nearby — a project that acknowledges Tirana's layered history while looking squarely forward.", // PLACEHOLDER: confirm narrative
    locationContext:
      "Tirana e Re, a district undergoing the most ambitious master-planned transformation in the city's post-communist history.", // PLACEHOLDER: confirm context
    sensoryPassage:
      "Still a render, still a promise. The terracotta tones of the facade are a deliberate echo of Ottoman Tirana — an argument in architecture for continuity.", // PLACEHOLDER: confirm sensory passage
    galleryExteriors: [], // PLACEHOLDER: replace with real assets when available
    galleryInteriors: [], // PLACEHOLDER: replace with real assets when available
    galleryMaterials: [], // PLACEHOLDER: replace with real assets when available
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByStatus(
  status: Project["status"]
): Project[] {
  return projects.filter((p) => p.status === status);
}
