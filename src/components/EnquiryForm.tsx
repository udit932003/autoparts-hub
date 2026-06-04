"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { createEnquiry } from "@/app/actions/enquiry";
import { whatsappLink, enquiryWhatsappText, SALES_CONTACT } from "@/lib/contact";

export default function EnquiryForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || "") || undefined,
    };

    const res = await createEnquiry(payload);
    if (!res.ok) {
      setError(res.error);
      setLoading(false);
      return;
    }

    // Forward the lead to the sales person on WhatsApp (prefilled message)
    const url = whatsappLink(enquiryWhatsappText(payload));
    window.open(url, "_blank");
    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div className="card grid place-items-center p-10 text-center">
        <CheckCircle2 size={48} className="text-green-600" />
        <h3 className="mt-4 text-xl font-bold text-slate-900">Enquiry sent! ✅</h3>
        <p className="mt-2 text-sm text-slate-500">
          Thanks! Your details have reached our team. We&apos;ll get back to you shortly.
          <br />
          If WhatsApp didn&apos;t open,{" "}
          <a href={whatsappLink()} target="_blank" className="font-semibold text-brand-600 underline">
            chat with us here
          </a>
          .
        </p>
        <button onClick={() => setDone(false)} className="btn-outline mt-5">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6">
      <h3 className="text-lg font-bold text-slate-900">Send an enquiry</h3>
      <p className="-mt-2 text-sm text-slate-500">
        Fill the form — our sales team ({SALES_CONTACT.name}) will reach out to you.
      </p>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="label">Your name</label>
        <input name="name" required className="input" placeholder="Your full name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Email</label>
          <input name="email" type="email" required className="input" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input name="phone" required className="input" placeholder="98765 43210" />
        </div>
      </div>
      <div>
        <label className="label">Message (optional)</label>
        <textarea name="message" rows={3} className="input resize-none" placeholder="Which part are you looking for?" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send enquiry</>}
      </button>
    </form>
  );
}
