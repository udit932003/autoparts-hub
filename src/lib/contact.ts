// Central place for the sales contact (lead receiver).
export const SALES_CONTACT = {
  name: "Sonu Chauhan",
  phone: "9211742641", // display
  tel: "+919211742641", // for tel: links
  whatsapp: "919211742641", // for wa.me links (country code + number)
};

export function telLink() {
  return `tel:${SALES_CONTACT.tel}`;
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SALES_CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Builds the WhatsApp message sent to the sales person for a new enquiry.
export function enquiryWhatsappText(e: {
  name: string;
  email: string;
  phone: string;
  message?: string;
}) {
  return [
    "🔧 *New AutoParts Hub Enquiry*",
    "",
    `*Name:* ${e.name}`,
    `*Phone:* ${e.phone}`,
    `*Email:* ${e.email}`,
    e.message ? `*Message:* ${e.message}` : null,
    "",
    "(Sent from the AutoParts Hub website)",
  ]
    .filter(Boolean)
    .join("\n");
}
