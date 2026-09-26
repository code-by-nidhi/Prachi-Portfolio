import Link from "next/link";
import { projects } from "@/data/site";

// Placeholder section — redesign later.
export default function SelectedProjects() {
  return (
    <section id="projects" className="mx-auto max-w-[1680px] px-6 sm:px-14 py-20">
      <h2 className="text-4xl font-medium tracking-[-0.04em]">Selected projects</h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
            <div className="aspect-[4/3] rounded-lg bg-surface flex items-center justify-center text-muted transition-colors group-hover:bg-neutral-200">
              Project image
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
              <span className="text-sm text-muted">
                {project.category} · {project.year}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
