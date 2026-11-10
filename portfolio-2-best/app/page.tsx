import { Preloader } from "@/components/Preloader";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Featured } from "@/sections/Featured";
import { Hardware } from "@/sections/Hardware";
import { Archive } from "@/sections/Archive";
import { Career } from "@/sections/Career";
import { Finale } from "@/sections/Finale";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Featured />
        <Hardware />
        <Archive />
        <Career />
        <Finale />
        <Contact />
      </main>
      <Footer />
    </>
  );
}