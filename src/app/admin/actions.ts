"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import { CONTENT_TAG, saveContent } from "@/lib/content";
import { SESSION_COOKIE, SESSION_MAX_AGE, checkPassword, createSessionToken, verifySessionToken } from "@/lib/auth";
import { supabaseConfigured, uploadObject } from "@/lib/supabase";

async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) throw new Error("Your session has expired. Please log in again.");
}

export async function login(_prev: string | null, formData: FormData) {
  if (!process.env.ADMIN_PASSWORD) return "ADMIN_PASSWORD is not set in .env.local.";

  if (!(await checkPassword(String(formData.get("password") ?? "")))) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return "Wrong password.";
  }

  (await cookies()).set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export type ActionResult = { ok: true; url?: string } | { ok: false; error: string };

export async function saveSiteContent(content: unknown): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!supabaseConfigured) return { ok: false, error: "Supabase is not configured, so changes can't be saved yet." };
    await saveContent(content);
    updateTag(CONTENT_TAG); // cached content is refetched on the next request
    revalidatePath("/", "layout"); // and every page re-renders with it
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Save failed." };
  }
}

const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "application/pdf": "pdf",
};

export async function uploadFile(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!supabaseConfigured) return { ok: false, error: "Supabase is not configured, so files can't be uploaded yet." };

    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) return { ok: false, error: "No file selected." };
    const ext = allowedTypes[file.type];
    if (!ext) return { ok: false, error: "Use a JPG, PNG, WebP, GIF, AVIF or PDF file." };
    if (file.size > 9 * 1024 * 1024) return { ok: false, error: "File is too large (max 9MB)." };

    const path = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
    return { ok: true, url: await uploadObject(path, file) };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Upload failed." };
  }
}
