// next/image only optimizes local files and Supabase uploads (see next.config.ts); any other
// pasted URL is shown as-is so an unconfigured host never breaks the page.
export function isUnoptimized(src: string) {
  return !(src.startsWith("/") || /^https:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\//.test(src));
}
