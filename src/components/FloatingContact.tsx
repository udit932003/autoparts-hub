"use client";

import { Phone } from "lucide-react";
import { telLink, whatsappLink } from "@/lib/contact";

// Floating Call + WhatsApp buttons shown on every storefront page.
export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={whatsappLink("Hi! I have a question about car parts.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff" aria-hidden>
          <path d="M16.04 4C9.5 4 4.2 9.3 4.2 15.84c0 2.4.72 4.62 1.96 6.5L4 28l5.84-2.1a11.7 11.7 0 0 0 6.2 1.78h.01c6.54 0 11.84-5.3 11.84-11.84C27.89 9.3 22.58 4 16.04 4Zm0 21.3h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.46 1.24 1.27-3.38-.22-.35a9.43 9.43 0 0 1-1.45-5.05c0-5.22 4.27-9.48 9.5-9.48 2.54 0 4.92.99 6.71 2.78a9.43 9.43 0 0 1 2.78 6.71c0 5.23-4.26 9.49-9.49 9.49Zm5.2-7.1c-.28-.14-1.68-.83-1.94-.93-.26-.1-.45-.14-.64.14-.19.28-.74.92-.9 1.11-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.41-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.46-.48-.64-.49l-.54-.01c-.19 0-.49.07-.74.35-.26.28-.97.95-.97 2.32 0 1.37.99 2.69 1.13 2.88.14.19 1.96 2.99 4.74 4.19.66.29 1.18.46 1.58.59.66.21 1.27.18 1.74.11.53-.08 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.54-.33Z" />
        </svg>
      </a>
      {/* Call */}
      <a
        href={telLink()}
        aria-label="Call us"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-transform hover:scale-110"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
