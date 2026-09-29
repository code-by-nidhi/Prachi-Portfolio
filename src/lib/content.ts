import { defaultContent, type SiteContent } from "@/data/site";
import { readContentRow, supabaseConfigured, writeContentRow } from "@/lib/supabase";

export const CONTENT_TAG = "site-content";

// Loads the site content: saved edits from Supabase merged over the defaults.
// Cached under CONTENT_TAG and refreshed whenever the dashboard saves. `fresh` skips the cache (admin).
export async function getContent({ fresh = false } = {}): Promise<SiteContent> {
  if (!supabaseConfigured) return defaultContent;
  try {
    const stored = await readContentRow(
      fresh ? { cache: "no-store" } : { cache: "force-cache", next: { tags: [CONTENT_TAG] } },
    );
    return normalizeContent(stored);
  } catch (err) {
    console.error(err);
    return defaultContent; // never take the site down because the database is unreachable
  }
}

export async function saveContent(input: unknown) {
  const content = normalizeContent(input);
  await writeContentRow(content);
  return content;
}

// Coerces any input into a valid SiteContent: unknown keys are dropped, wrong types fall back to the
// default, array items are shaped like the default's first item, and links/images are sanitized.
export function normalizeContent(input: unknown): SiteContent {
  return merge(defaultContent, input, "") as SiteContent;
}

function merge(def: unknown, value: unknown, key: string): unknown {
  if (Array.isArray(def)) {
    if (!Array.isArray(value)) return def;
    const template = def[0];
    return value.slice(0, 200).map((item) => merge(template, item, key));
  }
  if (def && typeof def === "object") {
    const src = value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
    return Object.fromEntries(
      Object.entries(def as Record<string, unknown>).map(([k, d]) => [k, merge(d, src[k], k)]),
    );
  }
  if (typeof def === "string") {
    const s = typeof value === "string" ? value.slice(0, 5000) : def;
    if (/^(href|src|image)$|Url$/.test(key)) return safeUrl(s);
    return s;
  }
  return typeof value === typeof def ? value : def;
}

// Only allow site-relative paths, http(s), mailto and tel links (blocks javascript: and friends).
function safeUrl(s: string) {
  const v = s.trim();
  if (v === "" || /^\/(?!\/)/.test(v) || /^#/.test(v)) return v;
  if (/^(https?:|mailto:|tel:)/i.test(v)) return v;
  return "";
}
