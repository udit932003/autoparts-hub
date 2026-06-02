import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "ap_admin_session";
const SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";

function sign(value: string) {
  const hmac = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  return `${value}.${hmac}`;
}

function verify(signed: string) {
  const [value, hmac] = signed.split(".");
  if (!value || !hmac) return null;
  const expected = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  // timing-safe comparison
  const a = Buffer.from(hmac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return value;
}

export function checkCredentials(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@autoparts.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  return email === adminEmail && password === adminPassword;
}

export function createSession() {
  const payload = `admin:${Date.now()}`;
  cookies().set(COOKIE_NAME, sign(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export function destroySession() {
  cookies().delete(COOKIE_NAME);
}

export function isAuthenticated() {
  const cookie = cookies().get(COOKIE_NAME);
  if (!cookie) return false;
  return verify(cookie.value) !== null;
}
