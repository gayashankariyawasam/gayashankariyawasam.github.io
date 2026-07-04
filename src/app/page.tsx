import { Navbar } from "@/components/nav/Navbar";
import { CinematicHero } from "@/components/cinema/CinematicHero";
import { StatsStrip } from "@/components/cinema/StatsStrip";
import { Pillars } from "@/components/cinema/Pillars";
import { WorkCinema } from "@/components/cinema/WorkCinema";
import { TimelineCinema } from "@/components/cinema/TimelineCinema";
import { ResearchCinema } from "@/components/cinema/ResearchCinema";
import { SkillsMarquee } from "@/components/cinema/SkillsMarquee";
import { Finale } from "@/components/cinema/Finale";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <CinematicHero />
        <StatsStrip />
        <Pillars />
        <WorkCinema />
        <TimelineCinema />
        <ResearchCinema />
        <SkillsMarquee />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
