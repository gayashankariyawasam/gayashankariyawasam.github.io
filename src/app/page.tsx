import { Navbar } from "@/components/nav/Navbar";
import { Hero } from "@/components/hero/Hero";
import { MetricsStrip } from "@/components/hero/MetricsStrip";
import { About } from "@/components/about/About";
import { Experience } from "@/components/experience/Experience";
import { Work } from "@/components/work/Work";
import { Research } from "@/components/research/Research";
import { StackMarquee } from "@/components/stack/StackMarquee";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MetricsStrip />
        <About />
        <Experience />
        <Work />
        <Research />
        <StackMarquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
