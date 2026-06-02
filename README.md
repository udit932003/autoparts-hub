# 🔧 AutoParts Hub — Car Parts E-commerce + Admin Dashboard

A full-stack e-commerce store for car parts (brakes, engine, suspension, lighting, tyres, batteries) with a complete **admin dashboard** for managing products and orders.

Built with **Next.js 14 (App Router)**, **Prisma**, **SQLite** (zero-setup; swappable for PostgreSQL), **TypeScript** and **Tailwind CSS**.

![Tech](https://img.shields.io/badge/Next.js-14-black) ![Tech](https://img.shields.io/badge/Prisma-5-2D3748) ![Tech](https://img.shields.io/badge/SQLite-003B57) ![Tech](https://img.shields.io/badge/TypeScript-5-3178C6) ![Tech](https://img.shields.io/badge/TailwindCSS-3-38BDF8)

---

## ✨ Features

### 🛒 Storefront
- Modern landing page with hero, categories & featured products
- Product catalog with **search**, **category filters** and **sorting**
- Product detail pages with related products
- **Shopping cart** (persists in localStorage) with quantity controls
- **Checkout** with server-side validation & stock checks
- Order confirmation page

### 📊 Admin Dashboard
- Secure **admin login** (cookie session, HMAC-signed)
- Dashboard with **revenue chart** (Recharts), KPIs & low-stock alerts
- **Product management** — create, edit, delete (full CRUD)
- **Image upload** (local) *or* paste an image URL — change product images anytime
- **Order management** — view orders & update status (Pending → Delivered)

### 🛠 Engineering
- Server Actions for mutations (no separate API layer needed)
- Server-side price/stock validation (cart can't be tampered with)
- Atomic order + stock-decrement using a Prisma transaction
- Type-safe forms with **Zod** validation
- Fully responsive UI

---

## 🚀 Getting Started

```bash
npm install            # installs deps + generates Prisma client
cp .env.example .env   # uses SQLite by default — zero config
npm run setup          # creates the database + seeds demo data
npm run dev            # start the app
```

Open **http://localhost:3000** 🎉

> `npm run setup` = `prisma db push` + the seed script. It creates `prisma/dev.db` with 6 categories, 12 products and sample orders.

### Want to use PostgreSQL instead? (optional, for production)
1. In `prisma/schema.prisma` change the datasource provider from `sqlite` to `postgresql`.
2. Change the `status` field type back to an enum if you prefer (optional).
3. Put a Postgres connection string in `.env` — a free [Neon](https://neon.tech) database works great:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/autoparts?schema=public"
   ```
4. Run `npm run setup` again.

| Page | URL |
|------|-----|
| Storefront | http://localhost:3000 |
| Admin dashboard | http://localhost:3000/admin |

**Admin login:** `admin@autoparts.com` / `admin123` (configurable in `.env`)

---

## 🧱 Tech Stack & Project Structure

```
src/
├── app/
│   ├── (shop)/              # Storefront route group (Navbar + Footer + Cart)
│   │   ├── page.tsx         # Home
│   │   ├── products/        # Listing + detail
│   │   ├── cart/            # Cart page
│   │   ├── checkout/        # Checkout
│   │   └── order/           # Order confirmation
│   ├── admin/
│   │   ├── login/           # Admin login (unguarded)
│   │   └── (dashboard)/     # Guarded admin area
│   │       ├── page.tsx     # Dashboard + chart
│   │       ├── products/    # Product CRUD
│   │       └── orders/      # Order management
│   ├── actions/             # Server Actions (order, product, auth)
│   └── api/upload/          # Image upload endpoint
├── components/              # UI + admin components
└── lib/                     # prisma, auth, cart, utils, validators
prisma/
├── schema.prisma           # Category, Product, Order, OrderItem
└── seed.ts                 # Demo data
```

## 📦 Available Scripts
| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:push` | Push schema to DB |
| `npm run db:seed` | Seed demo data |
| `npm run db:studio` | Open Prisma Studio (visual DB editor) |

---

## ☁️ Deploy
Deploy free on **[Vercel](https://vercel.com)**: connect the repo, add the `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `AUTH_SECRET` env vars, and deploy.

> **Note on image uploads:** the local upload endpoint writes to `/public/uploads`, which works in development. Serverless hosts (Vercel) have a read-only filesystem — for production, swap the upload route for **Cloudinary**, **UploadThing**, or **S3**. The "paste image URL" option works everywhere.

---

Built as a portfolio project. Feel free to use it as a template. ⭐
