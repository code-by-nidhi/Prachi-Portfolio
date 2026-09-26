import Link from "next/link";
import { projects } from "@/data/site";

// The list is repeated so one half of the track is always wider than the screen,
// then rendered twice so the marquee can loop seamlessly by sliding exactly one half.
const half = [...projects, ...projects];
const track = [...half, ...half];

// Placeholder cards — redesign later.
export default function SelectedProjects() {
  return (
    <section id="projects" className="pt-12 sm:pt-16 pb-24 sm:pb-32 lg:pb-40">
      <div className="mx-auto max-w-[1680px] px-6 sm:px-14">
        <h2 className="text-4xl font-medium tracking-[-0.04em]">Selected projects</h2>
      </div>

      <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <ul className="animate-marquee flex w-max [--marquee-duration:50s]">
          {track.map((project, i) => {
            const duplicate = i >= projects.length;
            return (
              <li
                key={`${project.slug}-${i}`}
                aria-hidden={duplicate || undefined}
                className="w-[78vw] sm:w-[420px] lg:w-[480px] shrink-0 pr-4 sm:pr-6"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  tabIndex={duplicate ? -1 : undefined}
                  className="group block"
                >
                  <div className="aspect-[4/3] rounded-lg flex items-center justify-center bg-surface text-muted transition-colors duration-700 group-hover:bg-neutral-200 zone-dark:bg-white/[0.06] zone-dark:text-white/50 zone-dark:group-hover:bg-white/10">
                    Project image
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
                    <span className="text-sm text-muted transition-colors duration-700 zone-dark:text-white/50">
                      {project.category} · {project.year}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
