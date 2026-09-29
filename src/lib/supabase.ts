// Minimal server-side Supabase access over its REST APIs (no SDK needed).
// Uses the secret/service-role key, so this must only ever run on the server.

const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
const key = process.env.SUPABASE_SECRET_KEY;
export const bucket = process.env.SUPABASE_BUCKET || "portfolio";

export const supabaseConfigured = Boolean(url && key);

function headers(extra: Record<string, string> = {}) {
  const h: Record<string, string> = { apikey: key!, ...extra };
  // Legacy service_role keys are JWTs and go in Authorization too; new sb_secret_ keys only use `apikey`.
  if (key!.startsWith("eyJ")) h.Authorization = `Bearer ${key}`;
  return h;
}

function assertConfigured() {
  if (!supabaseConfigured) {
    throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local.");
  }
}

export async function readContentRow(init: RequestInit & { next?: { tags?: string[] } }) {
  assertConfigured();
  const res = await fetch(`${url}/rest/v1/site_content?id=eq.1&select=data`, { ...init, headers: headers() });
  if (!res.ok) throw new Error(`Supabase read failed (${res.status}): ${await res.text()}`);
  const rows = (await res.json()) as { data: unknown }[];
  return rows[0]?.data ?? null;
}

export async function writeContentRow(data: unknown) {
  assertConfigured();
  const res = await fetch(`${url}/rest/v1/site_content`, {
    method: "POST",
    cache: "no-store",
    headers: headers({
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    }),
    body: JSON.stringify({ id: 1, data, updated_at: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Supabase save failed (${res.status}): ${await res.text()}`);
}

export async function uploadObject(path: string, file: File) {
  assertConfigured();
  const res = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
    method: "POST",
    cache: "no-store",
    headers: headers({ "Content-Type": file.type, "Cache-Control": "31536000", "x-upsert": "false" }),
    body: file,
  });
  if (!res.ok) throw new Error(`Supabase upload failed (${res.status}): ${await res.text()}`);
  return `${url}/storage/v1/object/public/${bucket}/${path}`;
}
