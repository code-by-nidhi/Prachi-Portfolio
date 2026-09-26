import { notFound } from "next/navigation";
import { projects } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Placeholder case-study page — redesign later.
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-[1680px] px-6 sm:px-14 py-24">
      <p className="text-sm text-muted">
        {project.category} · {project.year}
      </p>
      <h1 className="mt-2 text-5xl font-medium tracking-[-0.05em]">{project.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{project.summary}</p>
      <div className="mt-12 aspect-[16/9] rounded-lg bg-surface" />
    </article>
  );
}
