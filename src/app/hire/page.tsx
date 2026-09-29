import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { isUnoptimized } from "@/lib/image";

export const metadata: Metadata = { title: "Hire me" };

// Standalone dark page opened from the CTA's "Hire me" button (no site navbar/footer).
export default async function HirePage() {
  const { site, hire } = await getContent();
  const linkedin = site.socials.find((s) => s.label.toLowerCase() === "linkedin");
  // Odd-numbered pieces were wrapped in *asterisks* and render in the handwritten font.
  const headline = hire.headline.split("*");
  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-10 py-8 sm:py-10">
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2 text-base text-white/60 transition-colors hover:text-white"
        >
          <span className="grid size-6 place-items-center rounded-full border border-current">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5" aria-hidden>
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Back
        </Link>

        <div className="mt-10 sm:mt-16 grid gap-6 sm:gap-10 lg:grid-cols-[1.7fr_1fr]">
          {/* Intro card */}
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1b1d20] to-black p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full">
                  <Image src={hire.image} alt="" fill sizes="56px" unoptimized={isUnoptimized(hire.image)} className="object-cover" />
                </div>
                <div>
                  <p className="text-lg font-medium">{hire.greeting}</p>
                  <p className="text-white/50">{site.role}</p>
                </div>
              </div>
              {linkedin?.href && (
                <a
                  href={linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-2xl border border-white/25 px-5 py-3 text-base transition-colors hover:bg-white hover:text-black"
                >
                  {linkedin.label}
                </a>
              )}
            </div>

            <h1 className="mt-8 text-4xl sm:text-5xl font-medium leading-[1.2] tracking-[-0.03em]">
              {headline.map((part, i) =>
                i % 2 ? (
                  <span key={i} className="font-script font-normal tracking-normal">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </h1>

            <p className="mt-6 max-w-[520px] leading-relaxed text-white/50">{hire.intro}</p>
            <p className="mt-3 font-medium">
              Contact me:{" "}
              <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                {site.email}
              </a>
              {site.phone && (
                <>
                  ;{" "}
                  <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="underline-offset-4 hover:underline">
                    {site.phone}
                  </a>
                </>
              )}
            </p>
          </div>

          {/* Avatar card */}
          <div className="starfield relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/10">
            <Image
              src={hire.image}
              alt={site.name}
              fill
              sizes="(min-width: 1024px) 400px, 100vw"
              unoptimized={isUnoptimized(hire.image)}
              className="object-contain object-bottom mix-blend-lighten"
            />
          </div>
        </div>

        <section className="mt-20 sm:mt-28 text-center">
          <h2 className="text-lg text-white/80">{hire.clientsTitle}</h2>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4 text-xl font-medium text-white/40">
            {hire.clients.filter((name) => name.trim()).map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
