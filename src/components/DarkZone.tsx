"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Wraps the about + projects sections. Once the about block has expanded to full width
// (its top passes 10% of the viewport — same point where AboutIntro's animation ends),
// the whole zone fades to the about block's black so the two sections merge.
export default function DarkZone({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: "#about",
        start: "top 10%",
        toggleClass: { targets: ref.current!, className: "is-dark" },
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="mt-24 sm:mt-32 lg:mt-40 bg-background text-foreground transition-colors duration-700 ease-out zone-dark:bg-ink zone-dark:text-white"
    >
      {children}
    </div>
  );
}
