import Navigation from "@/components/Navigation";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import FinalScene from "@/components/FinalScene";

export default function Home() {
  return (
    <main className="w-full bg-black">
      <Navigation />
      
      {/* 
        The ScrollyCanvas acts as the cinematic hero sequence. 
        It is a large sticky section containing the image sequence. 
      */}
      <ScrollyCanvas />

      {/* 
        The rest of the page flows directly after the hero.
        Because ScrollyCanvas is 500vh with a sticky child, 
        these components appear naturally as the user scrolls past the sequence.
      */}
      <div className="relative z-10 w-full bg-black">
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <FinalScene />
      </div>
    </main>
  );
}
