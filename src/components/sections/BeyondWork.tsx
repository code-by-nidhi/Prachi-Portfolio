"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { SiteContent } from "@/data/site";
import { isUnoptimized } from "@/lib/image";
import { ArrowUpRightIcon } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Slot = { x: number; y: number; rotate: number; size: number[] };

// Hand-placed scatter for up to 5 photos: where each ends up, as a fraction of the section's
// width/height from its center. `size` is the card's final width: [min px, vw, max px].
const preset = {
  desktop: [
    { x: -0.3, y: -0.3, rotate: -4, size: [88, 11, 160] },
    { x: -0.45, y: -0.02, rotate: 0, size: [88, 15, 220] },
    { x: -0.28, y: 0.3, rotate: 3, size: [88, 9.5, 135] },
    { x: 0.3, y: -0.08, rotate: 0, size: [88, 12, 175] },
    { x: 0.33, y: 0.28, rotate: -3, size: [88, 9.5, 135] },
  ],
  mobile: [
    { x: -0.26, y: -0.39, rotate: -4 },
    { x: 0.28, y: -0.37, rotate: 3 },
    { x: -0.32, y: 0.38, rotate: 3 },
    { x: 0.02, y: 0.41, rotate: 0 },
    { x: 0.33, y: 0.37, rotate: -3 },
  ],
};

const tilts = [-4, 3, 0, -3, 4, -2];

// With more than 5 photos, spread them evenly: around an ellipse on desktop (clear of the centered
// text), and across a top and a bottom row on phones. Cards shrink a little as the count grows.
function layoutFor(count: number) {
  if (count <= preset.desktop.length) {
    return {
      desktop: preset.desktop.slice(0, count),
      mobile: preset.mobile.slice(0, count).map((m, i) => ({ ...m, size: preset.desktop[i].size })),
    };
  }
  const scale = Math.max(0.6, 5 / count);
  const size = [Math.round(80 * scale), +(11 * scale).toFixed(1), Math.round(170 * scale)];
  const desktop: Slot[] = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI * 0.75;
    return { x: Math.cos(angle) * 0.4, y: Math.sin(angle) * 0.34, rotate: tilts[i % tilts.length], size };
  });
  const top = Math.ceil(count / 2);
  const mobile: Slot[] = Array.from({ length: count }, (_, i) => {
    const row = i < top ? 0 : 1;
    const n = row === 0 ? top : count - top;
    const k = row === 0 ? i : i - top;
    const x = n === 1 ? 0 : -0.32 + (0.64 * k) / (n - 1);
    return { x, y: row === 0 ? -0.38 : 0.39, rotate: tilts[i % tilts.length], size };
  });
  return { desktop, mobile };
}

// Small offsets so the initial stack looks like a slightly messy pile.
const stack = [
  { x: 0, rotate: 0 },
  { x: 12, rotate: 4 },
  { x: -12, rotate: -4 },
  { x: 20, rotate: 7 },
  { x: -20, rotate: -7 },
];

export default function BeyondWork({ beyond }: { beyond: SiteContent["beyond"] }) {
  const ref = useRef<HTMLElement>(null);
  const layout = layoutFor(beyond.photos.length);

  useGSAP(
    () => {
      const section = ref.current!;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", section);
      const content = section.querySelector("[data-content]");
      const mm = gsap.matchMedia();

      const build = (targets: { x: number; y: number; rotate: number }[]) => {
        // Pile size: 420px on desktop, 70% of the screen width on phones.
        const pile = () => Math.min(420, window.innerWidth * 0.7);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=150%", // scroll distance the section stays pinned for
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          cards,
          {
            x: (i) => stack[i % stack.length].x,
            y: 0,
            rotation: (i) => stack[i % stack.length].rotate,
            scale: (i, el: HTMLElement) => pile() / el.offsetWidth,
          },
          {
            x: (i) => targets[i].x * section.offsetWidth,
            y: (i) => targets[i].y * section.offsetHeight,
            rotation: (i) => targets[i].rotate,
            scale: 1,
            ease: "power2.inOut",
            stagger: 0.05,
            duration: 1,
          },
          0,
        )
          .fromTo(content, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.6)
          .to({}, { duration: 0.3 }); // short hold at the end before unpinning
      };

      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () =>
        build(layout.desktop),
      );
      mm.add("(prefers-reduced-motion: no-preference) and (max-width: 767px)", () =>
        build(layout.mobile),
      );
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const targets = window.innerWidth >= 768 ? layout.desktop : layout.mobile;
        gsap.set(cards, {
          x: (i) => targets[i].x * section.offsetWidth,
          y: (i) => targets[i].y * section.offsetHeight,
          rotation: (i) => targets[i].rotate,
        });
        gsap.set(content, { autoAlpha: 1 });
      });
    },
    // Rebuild the animation when photos are added/removed.
    { scope: ref, dependencies: [beyond.photos.length], revertOnUpdate: true },
  );

  return (
    <section
      ref={ref}
      id="beyond-work"
      className="relative h-svh min-h-[600px] overflow-hidden bg-background"
    >
      {beyond.photos.map((photo, i) => {
        const [min, vw, max] = layout.desktop[i].size;
        return (
          <div
            key={`${i}-${photo.src}`}
            data-card
            className="absolute left-1/2 top-1/2 -ml-[calc(var(--w)/2)] -mt-[calc(var(--w)/2)] aspect-square w-[var(--w)] overflow-hidden rounded-[20%] shadow-[0_3px_8px_rgba(0,0,0,0.1)] will-change-transform"
            style={{ "--w": `clamp(${min}px, ${vw}vw, ${max}px)`, zIndex: 10 + beyond.photos.length - i } as React.CSSProperties}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="420px"
              unoptimized={isUnoptimized(photo.src)}
              className="object-cover"
            />
          </div>
        );
      })}

      <div
        data-content
        className="invisible absolute inset-0 flex flex-col items-center justify-center px-8 text-center opacity-0"
      >
        <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.04em]">{beyond.title}</h2>
        <p className="mt-5 max-w-[440px] text-base sm:text-lg leading-relaxed text-[#444]">
          {beyond.text}
        </p>
        <Link
          href={beyond.cta.href}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-base font-semibold tracking-[-0.02em] text-white transition-transform hover:scale-[1.03]"
        >
          {beyond.cta.label}
          <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  );
}
