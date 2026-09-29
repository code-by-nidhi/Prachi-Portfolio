import Hero from "@/components/sections/Hero";
import AboutIntro from "@/components/sections/AboutIntro";
import SelectedProjects from "@/components/sections/SelectedProjects";
import Contact from "@/components/sections/Contact";
import BeyondWork from "@/components/sections/BeyondWork";
import DarkZone from "@/components/DarkZone";
import { getContent } from "@/lib/content";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Hero hero={content.hero} site={content.site} />
      <DarkZone>
        <AboutIntro segments={content.about.segments} />
        <SelectedProjects projects={content.projects} />
      </DarkZone>
      <BeyondWork beyond={content.beyond} />
      <Contact cta={content.cta} resumeUrl={content.site.resumeUrl} />
    </>
  );
}
