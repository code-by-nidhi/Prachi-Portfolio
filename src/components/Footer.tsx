import { site } from "@/data/site";

// Placeholder footer — redesign later.
export default function Footer() {
  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-[1680px] px-6 sm:px-14 py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-6">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
