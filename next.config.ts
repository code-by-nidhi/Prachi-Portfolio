import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images uploaded through the admin dashboard live in Supabase Storage.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
  experimental: {
    // Room for image / PDF uploads from the dashboard (default is 1MB).
    serverActions: { bodySizeLimit: "10mb" },
  },
};

export default nextConfig;
