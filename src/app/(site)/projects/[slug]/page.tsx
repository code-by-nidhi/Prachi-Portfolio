import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { isUnoptimized } from "@/lib/image";

export async function generateStaticParams() {
  const { projects } = await getContent();
  return projects.items.map((p) => ({ slug: p.slug }));
}

// Placeholder case-study page — redesign later.
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const { projects } = await getContent();
  const project = projects.items.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-[1680px] px-6 sm:px-14 py-24">
      <p className="text-sm text-muted">
        {project.category} · {project.year}
      </p>
      <h1 className="mt-2 text-5xl font-medium tracking-[-0.05em]">{project.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{project.summary}</p>
      <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-lg bg-surface">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1680px) 1570px, 100vw"
            unoptimized={isUnoptimized(project.image)}
            className="object-cover"
          />
        )}
      </div>
    </article>
  );
}
