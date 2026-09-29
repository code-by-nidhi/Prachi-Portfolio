import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Shared chrome for the main site. Pages outside this group (e.g. /hire) render without it.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
