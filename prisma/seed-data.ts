// Single source of truth for demo catalog data.
// Used by both seed.ts (DB) and gen-images.ts (SVG placeholders),
// so product slugs always match their generated image files.

export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type CategorySeed = {
  name: string;
  slug: string;
  colors: [string, string]; // gradient
};

export type ProductSeed = {
  name: string;
  brand: string;
  price: number;
  stock: number;
  partNumber: string;
  featured: boolean;
  category: string; // category slug
  description: string;
};

export const categories: CategorySeed[] = [
  { name: "Brakes", slug: "brakes", colors: ["#f87171", "#991b1b"] },
  { name: "Engine", slug: "engine", colors: ["#fb923c", "#9a3412"] },
  { name: "Suspension", slug: "suspension", colors: ["#a78bfa", "#5b21b6"] },
  { name: "Lighting", slug: "lighting", colors: ["#fbbf24", "#b45309"] },
  { name: "Tyres & Wheels", slug: "tyres-wheels", colors: ["#38bdf8", "#075985"] },
  { name: "Batteries", slug: "batteries", colors: ["#34d399", "#065f46"] },
  { name: "Sensors & Electronics", slug: "sensors", colors: ["#22d3ee", "#155e75"] },
  { name: "Audio & Infotainment", slug: "audio", colors: ["#f472b6", "#9d174d"] },
  { name: "Accessories", slug: "accessories", colors: ["#94a3b8", "#334155"] },
];

export const products: ProductSeed[] = [
  // Brakes
  { name: "Premium Ceramic Brake Pads (Front)", brand: "Brembo", price: 3499, stock: 45, partNumber: "BRM-P85020", featured: true, category: "brakes", description: "Low-dust ceramic brake pads for superior stopping power and quiet braking. Fits most sedans and hatchbacks." },
  { name: "Vented Disc Brake Rotor", brand: "Bosch", price: 4299, stock: 30, partNumber: "BSH-DR4410", featured: false, category: "brakes", description: "Corrosion-resistant vented rotor for improved heat dissipation and longer pad life." },
  { name: "DOT 4 Brake Fluid 500ml", brand: "Castrol", price: 449, stock: 200, partNumber: "CST-BF0500", featured: false, category: "brakes", description: "High-boiling-point synthetic brake fluid for consistent pedal feel under heavy braking." },

  // Engine
  { name: "High-Performance Oil Filter", brand: "K&N", price: 899, stock: 120, partNumber: "KN-HP1017", featured: true, category: "engine", description: "Premium oil filter with high flow rate and 99% filtration efficiency. Easy-grip nut for quick removal." },
  { name: "Iridium Spark Plug (Set of 4)", brand: "NGK", price: 2199, stock: 80, partNumber: "NGK-IX9648", featured: true, category: "engine", description: "Long-life iridium spark plugs for better fuel economy and smoother engine performance." },
  { name: "Air Intake Filter", brand: "Mann", price: 1299, stock: 65, partNumber: "MN-AF2201", featured: false, category: "engine", description: "High-flow air filter that protects your engine while maximizing airflow and power." },
  { name: "Timing Belt Kit", brand: "Gates", price: 5899, stock: 22, partNumber: "GTS-TB7790", featured: false, category: "engine", description: "Complete timing belt kit with tensioner and idler pulleys for reliable valve timing." },

  // Suspension
  { name: "Gas-Charged Shock Absorber", brand: "Monroe", price: 5499, stock: 25, partNumber: "MNR-SA7733", featured: true, category: "suspension", description: "Gas-charged shock absorber for a smooth, controlled ride on all road conditions." },
  { name: "Front Coil Spring (Pair)", brand: "KYB", price: 6299, stock: 18, partNumber: "KYB-CS5512", featured: false, category: "suspension", description: "Heavy-duty coil springs engineered for OE-quality ride height and comfort." },
  { name: "Lower Control Arm", brand: "Moog", price: 4799, stock: 20, partNumber: "MOG-CA3340", featured: false, category: "suspension", description: "Precision-engineered control arm with pre-installed ball joint and bushings." },

  // Lighting
  { name: "LED Headlight Bulb Kit (H4)", brand: "Philips", price: 2899, stock: 90, partNumber: "PHL-LED9003", featured: true, category: "lighting", description: "6500K ultra-bright LED headlight kit with 300% more brightness than halogen. Plug-and-play install." },
  { name: "Fog Lamp Assembly", brand: "Hella", price: 3199, stock: 40, partNumber: "HLA-FL2280", featured: false, category: "lighting", description: "Weatherproof fog lamp assembly for improved visibility in rain and fog." },
  { name: "LED Tail Light Assembly", brand: "Depo", price: 4499, stock: 28, partNumber: "DPO-TL6610", featured: false, category: "lighting", description: "Smoked LED tail light assembly with integrated turn signals for a modern look." },

  // Tyres & Wheels
  { name: 'All-Season Alloy Wheel 16"', brand: "Enkei", price: 8999, stock: 22, partNumber: "ENK-AW1600", featured: true, category: "tyres-wheels", description: "Lightweight 16-inch alloy wheel with a sleek 5-spoke design. Corrosion-resistant finish." },
  { name: "Tubeless Radial Tyre 195/55 R16", brand: "MRF", price: 6499, stock: 50, partNumber: "MRF-TR1955", featured: false, category: "tyres-wheels", description: "All-weather tubeless radial tyre with excellent grip and low rolling resistance." },

  // Batteries
  { name: "Maintenance-Free Car Battery 45Ah", brand: "Exide", price: 5799, stock: 35, partNumber: "EXD-MF4500", featured: true, category: "batteries", description: "Maintenance-free 45Ah battery with 48-month warranty. High cranking power for reliable starts." },
  { name: "Battery Terminal Kit", brand: "Amaron", price: 349, stock: 150, partNumber: "AMR-BT0090", featured: false, category: "batteries", description: "Heavy-duty lead terminal clamps with anti-corrosion coating for a secure connection." },

  // Sensors & Electronics
  { name: "Oxygen (O2) Sensor", brand: "Denso", price: 3299, stock: 48, partNumber: "DNS-O2-2241", featured: true, category: "sensors", description: "Direct-fit oxygen sensor that optimizes fuel mixture for better mileage and lower emissions." },
  { name: "Reverse Parking Sensor Kit (4)", brand: "Bosch", price: 1899, stock: 70, partNumber: "BSH-PS0044", featured: true, category: "sensors", description: "4-sensor reverse parking kit with buzzer and easy DIY installation. Beeps as you approach obstacles." },
  { name: "HD Reverse Camera", brand: "Sony", price: 2499, stock: 55, partNumber: "SNY-RC1080", featured: false, category: "sensors", description: "Waterproof 1080p reverse camera with wide-angle lens and night vision for safe parking." },
  { name: "ABS Wheel Speed Sensor", brand: "ATE", price: 1599, stock: 60, partNumber: "ATE-ABS3380", featured: false, category: "sensors", description: "Precision ABS wheel speed sensor for accurate anti-lock braking and traction control." },
  { name: "TPMS Tyre Pressure Sensor", brand: "Schrader", price: 1299, stock: 80, partNumber: "SCH-TP0250", featured: false, category: "sensors", description: "Programmable tyre pressure monitoring sensor with long-life battery." },

  // Audio & Infotainment
  { name: 'Touchscreen Car Stereo 7" (CD/MP3/BT)', brand: "Pioneer", price: 8499, stock: 32, partNumber: "PNR-DMH7700", featured: true, category: "audio", description: '7-inch capacitive touchscreen receiver with CD/MP3, Bluetooth, USB and smartphone mirroring.' },
  { name: '6.5" Coaxial Car Speakers (Pair)', brand: "JBL", price: 2999, stock: 64, partNumber: "JBL-CX6500", featured: false, category: "audio", description: "Pair of 6.5-inch 2-way coaxial speakers with crisp highs and punchy bass. 180W peak power." },
  { name: 'Under-Seat Active Subwoofer', brand: "Sony", price: 6999, stock: 26, partNumber: "SNY-SUB8000", featured: false, category: "audio", description: "Slim under-seat powered subwoofer that adds deep bass without taking up boot space." },
  { name: "Full HD Dashcam", brand: "70mai", price: 4299, stock: 58, partNumber: "70M-DC1080", featured: true, category: "audio", description: "1080p dashcam with 140° wide angle, loop recording and G-sensor crash detection." },

  // Accessories
  { name: "Aero Wiper Blades (Pair)", brand: "Bosch", price: 799, stock: 140, partNumber: "BSH-WB2426", featured: false, category: "accessories", description: "Frameless aerodynamic wiper blades for streak-free, quiet wiping in all weather." },
  { name: "Dual-Tone Car Horn", brand: "Roots", price: 1099, stock: 75, partNumber: "RTS-HRN0220", featured: false, category: "accessories", description: "Powerful dual-tone trumpet horn (windtone) with deep, clear sound. 12V universal fit." },
  { name: "All-Weather Floor Mats (Set)", brand: "3M", price: 1799, stock: 90, partNumber: "3M-FM0070", featured: false, category: "accessories", description: "Custom-fit anti-skid floor mats that trap dirt and water. Easy to clean, odour-free." },
];
