"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SmileyIcon, SparkleIcon } from "@/components/icons";
import type { AboutSegment } from "@/data/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Dark intro block: starts inset with rounded corners, then slowly expands to full width while scrolling.
// GSAP scrubs the --p CSS variable (0 → 1); the clip-path below reads it.
export default function AboutIntro({ segments }: { segments: AboutSegment[] }) {
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
          {segments.map((segment, i) => (
            <Fragment key={i}>
              <Segment {...segment} />{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}

// Inline (wrappable) on phones so long pills never overflow; a single unbroken pill from sm up.
const pill = "rounded-full px-3 py-1 box-decoration-clone sm:inline-block sm:py-0 sm:leading-[1.6]";

// One styled piece of the paragraph; styles are picked per piece in the admin dashboard.
function Segment({ text, style }: AboutSegment) {
  switch (style) {
    case "sparkle":
      return <SparkleIcon className="inline-block size-[1.4em] align-middle text-white" />;
    case "smiley":
      return <SmileyIcon className="inline-block size-[1.3em] align-middle" />;
    case "bold":
      return <span className="font-semibold text-white">{text}</span>;
    case "emphasis":
      return <em className="font-extrabold tracking-[0.08em] text-white">{text}</em>;
    case "outline-pill":
      return <em className={`${pill} border-[1.5px] border-[#d2d2d2] font-medium tracking-[0.06em]`}>{text}</em>;
    case "bold-pill":
      return <span className={`${pill} border-[1.5px] border-[#d2d2d2] font-semibold text-white`}>{text}</span>;
    case "filled-pill":
      return <em className={`${pill} bg-[#c9cacb] font-light text-[#3a3a3a]`}>{text}</em>;
    default:
      return <>{text}</>;
  }
}
