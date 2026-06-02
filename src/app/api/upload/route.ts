import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isAuthenticated } from "@/lib/auth";

// Simple local image upload for the demo.
// Saves files to /public/uploads and returns the public URL.
// NOTE: On serverless hosts (Vercel) the filesystem is read-only — swap this
// for Cloudinary / UploadThing / S3 in production. The product form also
// accepts a plain image URL, which works everywhere.
export async function POST(req: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be under 5MB" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e6)}.${ext}`;
  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
