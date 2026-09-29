import { Fragment } from "react";
import type { SiteContent } from "@/data/site";
import { ArrowCircleIcon } from "@/components/icons";
import Polaroid from "@/components/hero/Polaroid";
import Tape from "@/components/hero/Tape";

type HeroProps = { hero: SiteContent["hero"]; site: SiteContent["site"] };

export default function Hero({ hero, site }: HeroProps) {
  const lines = hero.headline.split("\n");

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-[1680px] px-6 sm:px-14 pt-16 lg:pt-32 pb-16 lg:pb-[75px]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-16">
          <div className="max-w-[540px]">
            <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-medium leading-[1.02] tracking-[-0.05em]">
              {hero.greeting && <span className="text-muted">{hero.greeting}</span>}{" "}
              {lines.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && (
                    <>
                      {" "}
                      <br className="hidden lg:block" />
                    </>
                  )}
                  {line}
                </Fragment>
              ))}
            </h1>

            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3.5 text-lg font-semibold tracking-[-0.02em] text-white transition-transform hover:scale-[1.03]"
            >
              {hero.buttonLabel}
              <ArrowCircleIcon className="size-5" />
            </a>
          </div>

          <div className="lg:mr-[100px] self-center lg:self-auto">
            <Polaroid src={hero.image} name={site.name} caption={site.role} year={site.year} />
          </div>
        </div>
      </div>

      <Tape className="hidden lg:block absolute -right-3 top-[355px] h-[180px] w-[58px] rotate-[1.5deg]" />

      <div className="mx-8 border-b border-line" />
    </section>
  );
}
