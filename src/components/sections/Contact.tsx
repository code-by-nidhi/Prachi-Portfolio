"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { SiteContent } from "@/data/site";
import { ArrowUpRightIcon } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Closing call-to-action. When the section scrolls into view its background fades to ink
// (same `is-dark` class + zone-dark variant as DarkZone), the heading types itself out,
// and the buttons fade in once typing finishes.
export default function Contact({ cta, resumeUrl }: { cta: SiteContent["cta"]; resumeUrl: string }) {
  const ref = useRef<HTMLElement>(null);
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const section = ref.current!;
      const counter = { n: 0 };
      let started = false;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        // Measure after BeyondWork's pin above (which matchMedia can recreate later), otherwise
        // the start ignores the pin spacer and the CTA triggers while Life Beyond Office is still on screen.
        refreshPriority: -1,
        toggleClass: { targets: section, className: "is-dark" },
        onEnter: () => {
          if (started) return; // type only the first time; the background still toggles
          started = true;
          if (reduceMotion) {
            setTyped(cta.title.length);
            setDone(true);
            return;
          }
          gsap.to(counter, {
            n: cta.title.length,
            duration: cta.title.length * 0.08,
            delay: 0.4, // let the background start darkening first
            ease: "none",
            onUpdate: () => setTyped(Math.round(counter.n)),
            onComplete: () => setDone(true),
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="contact"
      className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center bg-background text-foreground transition-colors duration-700 ease-out zone-dark:bg-ink zone-dark:text-white"
    >
      <h2
        aria-label={cta.title}
        className="relative text-5xl sm:text-7xl lg:text-8xl font-medium tracking-[-0.05em]"
      >
        {/* Invisible full title reserves the final size so nothing shifts while typing. */}
        <span aria-hidden className="invisible">
          {cta.title}
        </span>
        <span aria-hidden className="absolute inset-0">
          {cta.title.slice(0, typed)}
          {/* Zero-width wrapper so the caret never wraps onto its own line; removed once typing finishes. */}
          {!done && (
            <span className="relative inline-block w-0">
              <span className="animate-caret absolute bottom-[-0.08em] left-1 h-[0.85em] w-[3px] bg-current" />
            </span>
          )}
        </span>
      </h2>

      <div
        className={`mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ease-out ${
          done ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <Link
          href="/hire"
          className="rounded-full bg-black px-8 py-4 text-lg font-semibold tracking-[-0.02em] text-white shadow-[0_0_24px_rgba(120,170,255,0.35)] ring-1 ring-white/10 transition-transform hover:scale-[1.04]"
        >
          {cta.hire}
        </Link>
        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-current px-8 py-4 text-lg font-semibold tracking-[-0.02em] transition-transform hover:scale-[1.04]"
        >
          {cta.resume}
          <ArrowUpRightIcon className="size-4" />
        </a>
      </div>
    </section>
  );
}
