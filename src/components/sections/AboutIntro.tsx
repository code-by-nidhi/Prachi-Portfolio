"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SmileyIcon, SparkleIcon } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Dark intro block: starts inset with rounded corners, then slowly expands to full width while scrolling.
// GSAP scrubs the --p CSS variable (0 → 1); the clip-path below reads it.
export default function AboutIntro() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { "--p": 0 },
          {
            "--p": 1,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom", // section's top enters the bottom of the screen
              end: "top 10%", // fully expanded when its top is near the top of the screen
              scrub: 1.5, // smoothing lag in seconds — higher feels slower/softer
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(ref.current, { "--p": 1 });
      });
    },
    { scope: ref },
  );

  // Inline (wrappable) on phones so long pills never overflow; a single unbroken pill from sm up.
  const pill =
    "rounded-full px-3 py-1 box-decoration-clone sm:inline-block sm:py-0 sm:leading-[1.6]";

  // --inset: starting side gap. --pad: text padding inside the block (added to the inset so text never gets clipped).
  return (
    <section
      ref={ref}
      id="about"
      className="[--inset:20px] [--pad:24px] sm:[--inset:64px] sm:[--pad:48px] lg:[--inset:140px] lg:[--pad:80px] [--p:0]"
    >
      <div
        className="bg-ink font-open text-[#d2d2d2]"
        style={{
          clipPath:
            "inset(0 calc((1 - var(--p)) * var(--inset)) round calc((1 - var(--p)) * 32px))",
        }}
      >
        <p className="mx-auto max-w-[1680px] px-[calc(var(--inset)+var(--pad))] py-24 sm:py-32 lg:py-40 font-medium text-[17px] sm:text-2xl lg:text-[28px] leading-[2.3] sm:leading-[2.4] lg:leading-[2.6]">
          I am a versatile designer who enjoys delving into{" "}
          <em className="font-extrabold tracking-[0.08em] text-white">various art forms and mediums</em>{" "}
          <SparkleIcon className="inline-block size-[1.4em] align-middle text-white" />{" "}
          <span className="font-semibold text-white">weaving stories</span>{" "}
          <em className={`${pill} border-[1.5px] border-[#d2d2d2] font-medium tracking-[0.06em]`}>
            through my designs and concepts
          </em>{" "}
          <SmileyIcon className="inline-block size-[1.3em] align-middle" />
          <span className="font-semibold text-white"> . Catch me in my natural habitat,</span>{" "}
          <span className="font-semibold text-white">soaking up</span>{" "}
          <em className={`${pill} bg-[#c9cacb] font-light text-[#3a3a3a]`}>
            inspiration from the chaos of life
          </em>{" "}
          <span className="font-semibold text-white">and</span>{" "}
          <span className={`${pill} border-[1.5px] border-[#d2d2d2] font-semibold text-white`}>
            occasionally going bonkers
          </span>{" "}
          <span className="font-semibold">with my </span>
          <span className="whitespace-nowrap font-semibold">
            craft <SparkleIcon className="inline-block size-[1.4em] align-middle text-white" />
          </span>
        </p>
      </div>
    </section>
  );
}
