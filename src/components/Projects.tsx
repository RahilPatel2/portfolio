"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { projectsData } from "@/data/projects";
import ProjectScene from "./ProjectScene";

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress specifically for the header element
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "center center"],
  });

  return (
    <section id="work" className="relative w-full bg-black text-white z-20 flex flex-col items-center">
      {/* Responsive spacer to guarantee generous separation above 03 // WORK */}
      <div className="w-full shrink-0 h-28 md:h-[300px]" />
      
      {/* Centered Section Title matching original portfolio design */}
      <motion.div 
        ref={headerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        className="relative z-20 w-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h3 
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="text-xs md:text-sm font-mono tracking-widest text-white/40 uppercase mb-4"
        >
          03 // WORK
        </motion.h3>
        
        <motion.h2 
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.98, filter: 'blur(12px)' },
            visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
          }}
          className="text-4xl md:text-6xl font-light tracking-tight text-white/70"
        >
          Projects
        </motion.h2>
        
        {/* Animated subtle underline matching Technology Stack */}
        <motion.div 
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
          }}
          className="w-[250px] md:w-[350px] lg:w-[450px] h-[1px] bg-white/10 shrink-0 origin-center" 
          style={{ marginTop: "4px" }} 
        />
      </motion.div>
      
      {/* Cinematic Full-Screen Sticky Project Scenes */}
      <div className="relative z-10 w-full mt-12 md:mt-[-30vh]">
        {projectsData.map((project, i) => (
          <ProjectScene 
            key={project.id}
            project={project}
            index={i + 1}
          />
        ))}
      </div>

      {/* Responsive spacer to guarantee separation below 03 // WORK before 04 // CREDENTIALS */}
      <div className="w-full shrink-0 h-28 md:h-[300px]" />
    </section>
  );
}