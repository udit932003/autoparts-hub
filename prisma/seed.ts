import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Brakes", slug: "brakes", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80" },
  { name: "Engine", slug: "engine", image: "https://images.unsplash.com/photo-1602025882379-e01cf08baa51?w=600&q=80" },
  { name: "Suspension", slug: "suspension", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80" },
  { name: "Lighting", slug: "lighting", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80" },
  { name: "Tyres & Wheels", slug: "tyres-wheels", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80" },
  { name: "Batteries", slug: "batteries", image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80" },
];

const products = [
  { name: "Premium Ceramic Brake Pads (Front)", brand: "Brembo", price: 3499, stock: 45, partNumber: "BRM-P85020", featured: true, category: "brakes", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80", description: "Low-dust ceramic brake pads for superior stopping power and quiet braking. Fits most sedans and hatchbacks." },
  { name: "Vented Disc Brake Rotor", brand: "Bosch", price: 4299, stock: 30, partNumber: "BSH-DR4410", featured: false, category: "brakes", image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&q=80", description: "Corrosion-resistant vented rotor for improved heat dissipation and longer pad life." },
  { name: "High-Performance Oil Filter", brand: "K&N", price: 899, stock: 120, partNumber: "KN-HP1017", featured: true, category: "engine", image: "https://images.unsplash.com/photo-1635784063504-f3a3e8d8c9d3?w=600&q=80", description: "Premium oil filter with high flow rate and 99% filtration efficiency. Easy-grip nut for quick removal." },
  { name: "Iridium Spark Plug (Set of 4)", brand: "NGK", price: 2199, stock: 80, partNumber: "NGK-IX9648", featured: true, category: "engine", image: "https://images.unsplash.com/photo-1599256871679-6b3c1a3e5e8e?w=600&q=80", description: "Long-life iridium spark plugs for better fuel economy and smoother engine performance." },
  { name: "Air Intake Filter", brand: "Mann", price: 1299, stock: 65, partNumber: "MN-AF2201", featured: false, category: "engine", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80", description: "High-flow air filter that protects your engine while maximizing airflow and power." },
  { name: "Gas-Charged Shock Absorber", brand: "Monroe", price: 5499, stock: 25, partNumber: "MNR-SA7733", featured: true, category: "suspension", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80", description: "Gas-charged shock absorber for a smooth, controlled ride on all road conditions." },
  { name: "Front Coil Spring (Pair)", brand: "KYB", price: 6299, stock: 18, partNumber: "KYB-CS5512", featured: false, category: "suspension", image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&q=80", description: "Heavy-duty coil springs engineered for OE-quality ride height and comfort." },
  { name: "LED Headlight Bulb Kit (H4)", brand: "Philips", price: 2899, stock: 90, partNumber: "PHL-LED9003", featured: true, category: "lighting", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80", description: "6500K ultra-bright LED headlight kit with 300% more brightness than halogen. Plug-and-play install." },
  { name: "Fog Lamp Assembly", brand: "Hella", price: 3199, stock: 40, partNumber: "HLA-FL2280", featured: false, category: "lighting", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80", description: "Weatherproof fog lamp assembly for improved visibility in rain and fog." },
  { name: "All-Season Alloy Wheel 16\"", brand: "Enkei", price: 8999, stock: 22, partNumber: "ENK-AW1600", featured: true, category: "tyres-wheels", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80", description: "Lightweight 16-inch alloy wheel with a sleek 5-spoke design. Corrosion-resistant finish." },
  { name: "Tubeless Radial Tyre 195/55 R16", brand: "MRF", price: 6499, stock: 50, partNumber: "MRF-TR1955", featured: false, category: "tyres-wheels", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80", description: "All-weather tubeless radial tyre with excellent grip and low rolling resistance." },
  { name: "Maintenance-Free Car Battery 45Ah", brand: "Exide", price: 5799, stock: 35, partNumber: "EXD-MF4500", featured: true, category: "batteries", image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80", description: "Maintenance-free 45Ah battery with 48-month warranty. High cranking power for reliable starts." },
];

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("🌱 Seeding database...");

  // Clean slate
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categoryMap: Record<string, string> = {};
  for (const c of categories) {
    const created = await prisma.category.create({ data: c });
    categoryMap[c.slug] = created.id;
  }
  console.log(`✅ Created ${categories.length} categories`);

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: slugify(p.name),
        description: p.description,
        brand: p.brand,
        price: p.price,
        stock: p.stock,
        image: p.image,
        partNumber: p.partNumber,
        featured: p.featured,
        categoryId: categoryMap[p.category],
      },
    });
  }
  console.log(`✅ Created ${products.length} products`);

  // Sample orders
  const allProducts = await prisma.product.findMany();
  const sampleOrders = [
    { customerName: "Rahul Sharma", customerEmail: "rahul@example.com", customerPhone: "9876543210", address: "12 MG Road", city: "Pune", status: "DELIVERED" as const },
    { customerName: "Priya Patel", customerEmail: "priya@example.com", customerPhone: "9123456780", address: "55 Anna Salai", city: "Chennai", status: "SHIPPED" as const },
    { customerName: "Amit Verma", customerEmail: "amit@example.com", customerPhone: "9988776655", address: "8 Park Street", city: "Kolkata", status: "PENDING" as const },
  ];

  let orderCount = 0;
  for (const o of sampleOrders) {
    const items = allProducts.slice(orderCount, orderCount + 2).map((p) => ({
      productId: p.id,
      name: p.name,
      price: p.price,
      quantity: (orderCount % 2) + 1,
    }));
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    await prisma.order.create({
      data: {
        orderNumber: `ORD-${1001 + orderCount}`,
        ...o,
        total,
        items: { create: items },
      },
    });
    orderCount++;
  }
  console.log(`✅ Created ${sampleOrders.length} sample orders`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
