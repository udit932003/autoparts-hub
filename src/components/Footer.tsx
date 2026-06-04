import Link from "next/link";
import { Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-slate-900">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              <Wrench size={18} />
            </span>
            AutoParts<span className="text-brand-600">Hub</span>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Genuine car parts at the best prices. Trusted by 10,000+ mechanics
            and car owners across India.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Shop</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><Link href="/products" className="hover:text-brand-600">All Parts</Link></li>
            <li><Link href="/products?category=brakes" className="hover:text-brand-600">Brakes</Link></li>
            <li><Link href="/products?category=engine" className="hover:text-brand-600">Engine</Link></li>
            <li><Link href="/products?category=batteries" className="hover:text-brand-600">Batteries</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Company</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><span className="cursor-default">About Us</span></li>
            <li><Link href="/contact" className="hover:text-brand-600">Contact / Enquiry</Link></li>
            <li><Link href="/admin" className="hover:text-brand-600">Admin Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900">Support</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              📞{" "}
              <a href="tel:+919211742641" className="hover:text-brand-600">
                +91 92117 42641
              </a>{" "}
              <span className="text-xs text-slate-400">(Sonu Chauhan)</span>
            </li>
            <li>
              💬{" "}
              <a
                href="https://wa.me/919211742641"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600"
              >
                WhatsApp: 92117 42641
              </a>
            </li>
            <li>✉️ help@autopartshub.com</li>
            <li>🚚 Free shipping over ₹2000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} AutoParts Hub. Built with Next.js, Prisma &
        PostgreSQL — a portfolio demo project.
      </div>
    </footer>
  );
}
