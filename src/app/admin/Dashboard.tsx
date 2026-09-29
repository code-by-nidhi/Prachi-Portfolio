"use client";

import { useEffect, useState, useTransition } from "react";
import { aboutStyles, type AboutStyle, type SiteContent } from "@/data/site";
import { logout, saveSiteContent } from "./actions";
import { Field, ImageInput, List, Text, UrlInput } from "./fields";

const tabs = [
  { id: "general", label: "General & links" },
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "beyond", label: "Life Beyond Office" },
  { id: "cta", label: "Call to action" },
  { id: "hire", label: "Hire me page" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Dashboard({ initial, configured }: { initial: SiteContent; configured: boolean }) {
  const [content, setContent] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [tab, setTab] = useState<TabId>("general");
  const [status, setStatus] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [saving, startSaving] = useTransition();
  const dirty = JSON.stringify(content) !== JSON.stringify(saved);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  // Shallow-merge a patch into one section.
  function set<K extends keyof SiteContent>(section: K, patch: Partial<SiteContent[K]>) {
    setContent((c) => ({ ...c, [section]: { ...c[section], ...patch } }));
    setStatus(null);
  }

  function save() {
    startSaving(async () => {
      const res = await saveSiteContent(content);
      if (res.ok) {
        setSaved(content);
        setStatus({ type: "ok", text: "Saved. Your changes are live." });
      } else {
        setStatus({ type: "error", text: res.error });
      }
    });
  }

  const { site, nav, hero, about, projects, beyond, cta, hire } = content;

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <h1 className="mr-auto text-lg font-semibold tracking-[-0.02em]">Portfolio dashboard</h1>
          {status && (
            <p role="status" className={`text-sm ${status.type === "ok" ? "text-green-700" : "text-red-600"}`}>
              {status.text}
            </p>
          )}
          {dirty && !status && <p className="text-sm text-amber-700">Unsaved changes</p>}
          <a href="/" target="_blank" className="rounded-full px-4 py-2 text-sm font-medium hover:bg-surface">
            View site ↗
          </a>
          <button
            type="button"
            onClick={() => {
              setContent(saved);
              setStatus(null);
            }}
            disabled={!dirty || saving}
            className="rounded-full px-4 py-2 text-sm font-medium hover:bg-surface disabled:opacity-40"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!dirty || saving || !configured}
            className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          <form action={logout}>
            <button className="rounded-full px-3 py-2 text-sm text-muted hover:text-black">Log out</button>
          </form>
        </div>
      </header>

      {!configured && (
        <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
          <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
            Supabase isn&apos;t connected yet, so you can look around but saving and uploads are disabled. Add
            SUPABASE_URL and SUPABASE_SECRET_KEY to <code>.env.local</code> (see README).
          </p>
        </div>
      )}

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 md:flex-row">
        <nav className="flex gap-1 overflow-x-auto md:sticky md:top-20 md:w-52 md:shrink-0 md:flex-col md:self-start" aria-label="Sections">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id ? "page" : undefined}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                tab === t.id ? "bg-black text-white" : "text-[#333] hover:bg-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <main className="min-w-0 flex-1 space-y-6">
          {tab === "general" && (
            <>
              <Card title="Basics">
                <Text label="Name" value={site.name} onChange={(name) => set("site", { name })} hint="Navbar, polaroid, footer" />
                <Text label="Role" value={site.role} onChange={(role) => set("site", { role })} />
                <Text label="Year" value={site.year} onChange={(year) => set("site", { year })} hint="Shown on the polaroid" />
                <Text label="Email" value={site.email} onChange={(email) => set("site", { email })} />
                <Text label="Phone" value={site.phone} onChange={(phone) => set("site", { phone })} hint="Optional, shown on the Hire me page" />
              </Card>
              <Card title="Resume">
                <UrlInput
                  label="Resume link"
                  value={site.resumeUrl}
                  onChange={(resumeUrl) => set("site", { resumeUrl })}
                  hint="Used by every Resume button. Paste a link or upload a PDF."
                  uploadPdf
                />
              </Card>
              <Card title="Social links" description="Shown in the footer. A link labelled “LinkedIn” also appears on the Hire me page.">
                <List
                  items={site.socials}
                  onChange={(socials) => set("site", { socials })}
                  newItem={() => ({ label: "", href: "" })}
                  addLabel="Add link"
                  itemLabel={(l, i) => l.label || `Link ${i + 1}`}
                >
                  {(link, update) => (
                    <>
                      <Text label="Label" value={link.label} onChange={(label) => update({ label })} />
                      <UrlInput label="URL" value={link.href} onChange={(href) => update({ href })} />
                    </>
                  )}
                </List>
              </Card>
              <Card title="Navbar">
                <Text label="About button" value={nav.about} onChange={(v) => set("nav", { about: v })} />
                <Text label="Explore button" value={nav.explore} onChange={(v) => set("nav", { explore: v })} />
              </Card>
            </>
          )}

          {tab === "hero" && (
            <Card title="Hero">
              <ImageInput label="Polaroid photo" value={hero.image} onChange={(image) => set("hero", { image })} />
              <Text label="Greeting" value={hero.greeting} onChange={(greeting) => set("hero", { greeting })} hint="Shown in grey" />
              <Text
                label="Headline"
                rows={4}
                value={hero.headline}
                onChange={(headline) => set("hero", { headline })}
                hint="Each new line starts a new line on large screens"
              />
              <Text label="Button label" value={hero.buttonLabel} onChange={(buttonLabel) => set("hero", { buttonLabel })} hint="Links to your resume" />
            </Card>
          )}

          {tab === "about" && (
            <Card title="About paragraph" description="The paragraph is built from pieces, each with its own style. Pieces are joined with spaces.">
              <List
                items={about.segments}
                onChange={(segments) => set("about", { segments })}
                newItem={() => ({ text: "", style: "plain" as AboutStyle })}
                addLabel="Add piece"
                itemLabel={(s, i) => `${i + 1}. ${aboutStyles[s.style]}`}
              >
                {(segment, update) => (
                  <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
                    <Field label="Style">
                      <select
                        value={segment.style}
                        onChange={(e) => update({ style: e.target.value as AboutStyle })}
                        className="w-full rounded-lg border border-line bg-white px-3 py-2 text-[15px]"
                      >
                        {Object.entries(aboutStyles).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    {segment.style === "sparkle" || segment.style === "smiley" ? (
                      <p className="self-end pb-2 text-sm text-muted">Icons don&apos;t need text.</p>
                    ) : (
                      <Text label="Text" value={segment.text} onChange={(text) => update({ text })} />
                    )}
                  </div>
                )}
              </List>
            </Card>
          )}

          {tab === "projects" && (
            <>
              <Card title="Section">
                <Text label="Title" value={projects.title} onChange={(title) => set("projects", { title })} />
              </Card>
              <Card title="Projects">
                <List
                  items={projects.items}
                  onChange={(items) => set("projects", { items })}
                  newItem={() => ({ slug: `project-${Date.now().toString(36)}`, title: "New project", category: "", year: String(new Date().getFullYear()), summary: "", image: "" })}
                  addLabel="Add project"
                  itemLabel={(p) => p.title || p.slug}
                >
                  {(project, update) => (
                    <>
                      <Text label="Title" value={project.title} onChange={(title) => update({ title })} />
                      <Text
                        label="URL slug"
                        value={project.slug}
                        onChange={(slug) => update({ slug: slugify(slug) })}
                        hint={`Page address: /projects/${project.slug}`}
                      />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Text label="Category" value={project.category} onChange={(category) => update({ category })} />
                        <Text label="Year" value={project.year} onChange={(year) => update({ year })} />
                      </div>
                      <Text label="Summary" rows={3} value={project.summary} onChange={(summary) => update({ summary })} />
                      <ImageInput label="Cover image" value={project.image} onChange={(image) => update({ image })} />
                    </>
                  )}
                </List>
              </Card>
            </>
          )}

          {tab === "beyond" && (
            <>
              <Card title="Text">
                <Text label="Title" value={beyond.title} onChange={(title) => set("beyond", { title })} />
                <Text label="Paragraph" rows={6} value={beyond.text} onChange={(text) => set("beyond", { text })} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Text label="Button label" value={beyond.cta.label} onChange={(label) => set("beyond", { cta: { ...beyond.cta, label } })} />
                  <UrlInput label="Button link" value={beyond.cta.href} onChange={(href) => set("beyond", { cta: { ...beyond.cta, href } })} />
                </div>
              </Card>
              <Card title="Photos" description="The first photo is on top of the pile. Up to 5 keep the hand-placed layout; more are spread out automatically.">
                <List
                  items={beyond.photos}
                  onChange={(photos) => set("beyond", { photos })}
                  newItem={() => ({ src: "", alt: "" })}
                  addLabel="Add photo"
                  itemLabel={(_, i) => `Photo ${i + 1}`}
                >
                  {(photo, update) => (
                    <>
                      <ImageInput label="Image" value={photo.src} onChange={(src) => update({ src })} />
                      <Text label="Description" value={photo.alt} onChange={(alt) => update({ alt })} hint="For screen readers" />
                    </>
                  )}
                </List>
              </Card>
            </>
          )}

          {tab === "cta" && (
            <Card title="Call to action" description="The dark closing section with the typewriter heading.">
              <Text label="Heading" value={cta.title} onChange={(title) => set("cta", { title })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Text label="Hire button" value={cta.hire} onChange={(v) => set("cta", { hire: v })} hint="Opens the Hire me page" />
                <Text label="Resume button" value={cta.resume} onChange={(resume) => set("cta", { resume })} hint="Links to your resume" />
              </div>
            </Card>
          )}

          {tab === "hire" && (
            <Card title="Hire me page">
              <ImageInput label="Photo / avatar" value={hire.image} onChange={(image) => set("hire", { image })} />
              <Text label="Greeting" value={hire.greeting} onChange={(greeting) => set("hire", { greeting })} />
              <Text
                label="Headline"
                rows={2}
                value={hire.headline}
                onChange={(headline) => set("hire", { headline })}
                hint="Wrap words in *asterisks* for the handwritten font"
              />
              <Text label="Intro" rows={3} value={hire.intro} onChange={(intro) => set("hire", { intro })} />
              <Text label="Clients heading" value={hire.clientsTitle} onChange={(clientsTitle) => set("hire", { clientsTitle })} />
              <Text
                label="Clients"
                rows={5}
                value={hire.clients.join("\n")}
                onChange={(v) => set("hire", { clients: v.split("\n") })}
                hint="One per line"
              />
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}

function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-5 ring-1 ring-line sm:p-6">
      <h2 className="text-lg font-semibold tracking-[-0.02em]">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}
