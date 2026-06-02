"use server";

import { redirect } from "next/navigation";
import { checkCredentials, createSession, destroySession } from "@/lib/auth";

export async function login(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(email, password)) {
    return { error: "Invalid email or password" };
  }

  createSession();
  redirect("/admin");
}

export async function logout() {
  destroySession();
  redirect("/admin/login");
}
