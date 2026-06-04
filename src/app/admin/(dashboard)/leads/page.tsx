import { MessageCircle, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { whatsappLink } from "@/lib/contact";
import LeadStatusSelect from "@/components/admin/LeadStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
  const newCount = enquiries.filter((e) => e.status === "NEW").length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Leads / Enquiries</h1>
      <p className="mt-1 text-sm text-slate-500">
        {enquiries.length} total · {newCount} new — customer enquiries from the website
      </p>

      <div className="card mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Message</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Reach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enquiries.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-slate-400">No enquiries yet</td></tr>
              )}
              {enquiries.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-800">{e.name}</td>
                  <td className="px-5 py-4 text-slate-500">
                    <span className="block">{e.phone}</span>
                    <span className="block text-xs">{e.email}</span>
                  </td>
                  <td className="px-5 py-4 max-w-[220px] text-slate-500">{e.message || <span className="text-slate-300">—</span>}</td>
                  <td className="px-5 py-4 text-slate-500">{formatDate(e.createdAt)}</td>
                  <td className="px-5 py-4"><LeadStatusSelect id={e.id} current={e.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <a href={`tel:+91${e.phone.replace(/\D/g, "").slice(-10)}`} className="text-brand-600 hover:text-brand-700" title="Call">
                        <Phone size={16} />
                      </a>
                      <a href={whatsappLink(`Hi ${e.name}, thanks for your enquiry at AutoParts Hub!`)} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700" title="WhatsApp">
                        <MessageCircle size={16} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
