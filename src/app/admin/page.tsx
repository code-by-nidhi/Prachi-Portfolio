import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { supabaseConfigured } from "@/lib/supabase";
import Dashboard from "./Dashboard";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false, follow: false } };

export default async function AdminPage() {
  if (!(await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value))) redirect("/admin/login");
  const content = await getContent({ fresh: true });
  return <Dashboard initial={content} configured={supabaseConfigured} />;
}
