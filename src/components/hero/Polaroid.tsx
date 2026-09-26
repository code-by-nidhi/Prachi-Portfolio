import Image from "next/image";
import Paperclip from "./Paperclip";

type PolaroidProps = {
  src: string;
  name: string;
  caption: string;
  year: string;
};

export default function Polaroid({ src, name, caption, year }: PolaroidProps) {
  return (
    <figure className="relative w-[296px] shrink-0">
      <div className="grain bg-[#fafaf8] p-5 pb-4 shadow-[0_2px_6px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)]">
        <div className="relative aspect-[258/245] overflow-hidden rounded-[3px] bg-neutral-300">
          <Image
            src={src}
            alt={name}
            fill
            priority
            sizes="258px"
            className="object-cover grayscale contrast-[1.1]"
          />
          <div className="grain absolute inset-0 opacity-70 mix-blend-multiply" />
        </div>

        <figcaption className="mt-5 flex items-end justify-between font-mono text-[#1f1f1f]">
          <div className="leading-tight">
            <p className="text-base tracking-wide uppercase">{name}</p>
            <p className="text-[10px] tracking-wider uppercase">{caption}</p>
          </div>
          <span className="text-base text-neutral-500">{year}</span>
        </figcaption>
      </div>

      <Paperclip className="absolute top-10 -right-[76px] w-[118px]" />
    </figure>
  );
}
