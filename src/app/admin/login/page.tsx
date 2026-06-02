"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Wrench, Loader2 } from "lucide-react";
import { login } from "@/app/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full">
      {pending ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : "Sign in"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(login, { error: "" });

  return (
    <div className="grid min-h-screen place-items-center bg-slate-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2 font-extrabold text-white">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-600">
            <Wrench size={22} />
          </span>
          <span className="text-xl">AutoParts<span className="text-brand-500">Hub</span></span>
        </div>
        <div className="card p-8">
          <h1 className="text-xl font-bold text-slate-900">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to manage your store</p>

          <form action={formAction} className="mt-6 space-y-4">
            {state?.error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
            )}
            <div>
              <label className="label">Email</label>
              <input name="email" type="email" required className="input" defaultValue="admin@autoparts.com" />
            </div>
            <div>
              <label className="label">Password</label>
              <input name="password" type="password" required className="input" defaultValue="admin123" />
            </div>
            <SubmitButton />
          </form>

          <p className="mt-4 rounded-lg bg-slate-50 p-3 text-center text-xs text-slate-500">
            Demo credentials are pre-filled.<br />
            <span className="font-mono">admin@autoparts.com / admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
