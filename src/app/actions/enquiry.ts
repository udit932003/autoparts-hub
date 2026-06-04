"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { enquirySchema } from "@/lib/validators";

export type EnquiryResult = { ok: true; id: string } | { ok: false; error: string };

export async function createEnquiry(data: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  try {
    const e = await prisma.enquiry.create({ data: parsed.data });
    revalidatePath("/admin/leads");
    return { ok: true, id: e.id };
  } catch (err) {
    console.error("createEnquiry failed:", err);
    return { ok: false, error: "Could not submit. Please try again." };
  }
}

export async function updateEnquiryStatus(
  id: string,
  status: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isAuthenticated()) return { ok: false, error: "Unauthorized" };
  if (!["NEW", "CONTACTED", "CLOSED"].includes(status))
    return { ok: false, error: "Invalid status" };
  await prisma.enquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
  return { ok: true };
}
