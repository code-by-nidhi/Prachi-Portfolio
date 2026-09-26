"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { beyondWork } from "@/data/site";
import { ArrowUpRightIcon } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Where each photo ends up after scattering, as a fraction of the section's width/height from its center.
// `size` is the card's final width: [min px, vw, max px]. Order matches beyondWork.photos.
const layout = {
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

// Small offsets so the initial stack looks like a slightly messy pile.
const stack = [
  { x: 0, rotate: 0 },
  { x: 12, rotate: 4 },
  { x: -12, rotate: -4 },
  { x: 20, rotate: 7 },
  { x: -20, rotate: -7 },
];

export default function BeyondWork() {
  const ref = useRef<HTMLElement>(null);

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
            x: (i) => stack[i].x,
            y: 0,
            rotation: (i) => stack[i].rotate,
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
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="beyond-work"
      className="relative h-svh min-h-[600px] overflow-hidden bg-background"
    >
      {beyondWork.photos.map((photo, i) => {
        const [min, vw, max] = layout.desktop[i].size;
        return (
          <div
            key={photo.src}
            data-card
            className="absolute left-1/2 top-1/2 -ml-[calc(var(--w)/2)] -mt-[calc(var(--w)/2)] aspect-square w-[var(--w)] overflow-hidden rounded-[20%] shadow-[0_3px_8px_rgba(0,0,0,0.1)] will-change-transform"
            style={{ "--w": `clamp(${min}px, ${vw}vw, ${max}px)`, zIndex: 10 + beyondWork.photos.length - i } as React.CSSProperties}
          >
            <Image src={photo.src} alt={photo.alt} fill sizes="420px" className="object-cover" />
          </div>
        );
      })}

      <div
        data-content
        className="invisible absolute inset-0 flex flex-col items-center justify-center px-8 text-center opacity-0"
      >
        <h2 className="text-4xl sm:text-5xl font-medium tracking-[-0.04em]">{beyondWork.title}</h2>
        <p className="mt-5 max-w-[440px] text-base sm:text-lg leading-relaxed text-[#444]">
          {beyondWork.text}
        </p>
        <Link
          href={beyondWork.cta.href}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-base font-semibold tracking-[-0.02em] text-white transition-transform hover:scale-[1.03]"
        >
          {beyondWork.cta.label}
          <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>
    </section>
  );
}
