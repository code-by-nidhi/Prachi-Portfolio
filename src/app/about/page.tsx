import type { Metadata } from "next";

export const metadata: Metadata = { title: "About me" };

// Placeholder page — redesign later.
export default function AboutPage() {
  return (
    <section className="mx-auto max-w-[1680px] px-6 sm:px-14 py-24">
      <h1 className="text-5xl font-medium tracking-[-0.05em]">About me</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">About page placeholder.</p>
    </section>
  );
}
