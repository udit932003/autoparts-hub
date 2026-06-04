import { Phone, MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { SALES_CONTACT, telLink, whatsappLink } from "@/lib/contact";

export const metadata = {
  title: "Contact & Enquiry — AutoParts Hub",
  description: "Get in touch — call, WhatsApp, or send an enquiry for car parts.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Get in touch</h1>
        <p className="mt-2 text-slate-500">
          Looking for a part or a bulk quote? Call, WhatsApp, or send us an enquiry —
          our team will reach out fast.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Contact options */}
        <div className="space-y-4">
          <a href={telLink()} className="card flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600">
              <Phone size={22} />
            </span>
            <div>
              <p className="text-sm text-slate-500">Call us</p>
              <p className="text-lg font-bold text-slate-900">{SALES_CONTACT.phone}</p>
              <p className="text-xs text-slate-400">{SALES_CONTACT.name} · Sales</p>
            </div>
          </a>

          <a href={whatsappLink("Hi! I have a question about car parts.")} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-green-50 text-green-600">
              <MessageCircle size={22} />
            </span>
            <div>
              <p className="text-sm text-slate-500">WhatsApp</p>
              <p className="text-lg font-bold text-slate-900">{SALES_CONTACT.phone}</p>
              <p className="text-xs text-slate-400">Chat with us instantly</p>
            </div>
          </a>

          <div className="card space-y-3 p-5 text-sm text-slate-600">
            <p className="flex items-center gap-2"><Mail size={18} className="text-brand-600" /> help@autopartshub.com</p>
            <p className="flex items-center gap-2"><Clock size={18} className="text-brand-600" /> Mon–Sat, 9 AM – 8 PM</p>
            <p className="flex items-center gap-2"><MapPin size={18} className="text-brand-600" /> Delhi NCR, India</p>
          </div>
        </div>

        {/* Enquiry form */}
        <EnquiryForm />
      </div>
    </div>
  );
}
