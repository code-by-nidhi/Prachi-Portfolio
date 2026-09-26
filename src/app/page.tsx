import Hero from "@/components/sections/Hero";
import AboutIntro from "@/components/sections/AboutIntro";
import SelectedProjects from "@/components/sections/SelectedProjects";
import Contact from "@/components/sections/Contact";
import DarkZone from "@/components/DarkZone";

export default function Home() {
  return (
    <>
      <Hero />
      <DarkZone>
        <AboutIntro />
        <SelectedProjects />
      </DarkZone>
      <Contact />
    </>
  );
}
