import { site } from "@/data/site";

// Placeholder section — redesign later.
export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1680px] px-6 sm:px-14 py-20 border-t border-line">
      <h2 className="text-4xl font-medium tracking-[-0.04em]">Let&apos;s talk</h2>
      <p className="mt-6 text-lg text-muted">Contact section placeholder.</p>
      <a href={`mailto:${site.email}`} className="mt-4 inline-block text-2xl underline underline-offset-4">
        {site.email}
      </a>
    </section>
  );
}
