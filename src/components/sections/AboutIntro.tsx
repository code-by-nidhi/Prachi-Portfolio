"use client";

import { useEffect, useRef } from "react";
import { SmileyIcon, SparkleIcon } from "@/components/icons";

// Dark intro block: starts inset with rounded corners, expands to full width as it scrolls into view.
// Progress (0 → 1) is written to the --p CSS variable directly to avoid re-rendering on every scroll.
export default function AboutIntro() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const { top } = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top enters the bottom of the screen, 1 once it reaches 35% from the top.
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.65)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Inline (wrappable) on phones so long pills never overflow; a single unbroken pill from sm up.
  const pill =
    "rounded-full px-3 py-1 box-decoration-clone sm:inline-block sm:py-0 sm:leading-[1.6]";

  return (
    <section
      ref={ref}
      id="about"
      className="my-24 sm:my-32 lg:my-40 [--inset:12px] sm:[--inset:40px] lg:[--inset:56px] [--p:0]"
    >
      <div
        className="bg-[#121416] font-open text-[#d2d2d2]"
        style={{
          clipPath:
            "inset(0 calc((1 - var(--p)) * var(--inset)) round calc((1 - var(--p)) * 24px))",
        }}
      >
        <p className="mx-auto max-w-[1680px] px-8 sm:px-20 lg:px-40 py-24 sm:py-32 lg:py-40 font-medium text-[17px] sm:text-2xl lg:text-[28px] leading-[2.3] sm:leading-[2.4] lg:leading-[2.6]">
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
