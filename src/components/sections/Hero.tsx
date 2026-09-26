import Link from "next/link";
import { site } from "@/data/site";
import { ArrowCircleIcon } from "@/components/icons";
import Polaroid from "@/components/hero/Polaroid";
import Tape from "@/components/hero/Tape";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1680px] px-6 sm:px-14 pt-16 lg:pt-32 pb-16 lg:pb-[75px]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16">
          <div className="max-w-[540px]">
            <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.02] tracking-[-0.05em]">
              <span className="text-muted">Hello,</span> I design <br className="hidden lg:block" />
              products and <br className="hidden lg:block" />
              create content that <br className="hidden lg:block" />
              tells stories.
            </h1>

            <Link
              href={site.resumeUrl}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-lg font-semibold tracking-[-0.02em] text-white transition-transform hover:scale-[1.03]"
            >
              Resume
              <ArrowCircleIcon className="size-5" />
            </Link>
          </div>

          <div className="lg:mr-[100px] self-center lg:self-auto">
            <Polaroid src={site.profileImage} name={site.name} caption={site.role} year={site.year} />
          </div>
        </div>
      </div>

      <Tape className="hidden lg:block absolute -right-3 top-[355px] h-[180px] w-[58px] rotate-[1.5deg]" />

      <div className="mx-8 border-b border-line" />
    </section>
  );
}
