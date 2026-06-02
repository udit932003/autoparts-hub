import { PrismaClient } from "@prisma/client";
import { categories, products, slugify } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean slate
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categoryMap: Record<string, string> = {};
  for (const c of categories) {
    const created = await prisma.category.create({
      data: { name: c.name, slug: c.slug, image: `/categories/${c.slug}.svg` },
    });
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
        image: `/products/${slugify(p.name)}.svg`,
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
    { customerName: "Rahul Sharma", customerEmail: "rahul@example.com", customerPhone: "9876543210", address: "12 MG Road", city: "Pune", status: "DELIVERED" },
    { customerName: "Priya Patel", customerEmail: "priya@example.com", customerPhone: "9123456780", address: "55 Anna Salai", city: "Chennai", status: "SHIPPED" },
    { customerName: "Amit Verma", customerEmail: "amit@example.com", customerPhone: "9988776655", address: "8 Park Street", city: "Kolkata", status: "PENDING" },
    { customerName: "Sneha Reddy", customerEmail: "sneha@example.com", customerPhone: "9001122334", address: "21 Banjara Hills", city: "Hyderabad", status: "PROCESSING" },
  ];

  let orderCount = 0;
  for (const o of sampleOrders) {
    const items = allProducts.slice(orderCount * 2, orderCount * 2 + 2).map((p) => ({
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
