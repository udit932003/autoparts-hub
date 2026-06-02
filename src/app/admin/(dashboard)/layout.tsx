import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </div>
    </div>
  );
}
