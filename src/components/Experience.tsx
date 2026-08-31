"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    company: "Cloud Elevate Technologies",
    role: "Full Stack Developer Intern",
    date: "Dec 2025 – Feb 2026",
  },
  {
    company: "Magorix Ltd",
    role: "Full Stack Developer Intern",
    date: "Sept 2025 – Dec 2025",
  },
  {
    company: "Vaishnav Technology",
    role: "Frontend Developer Intern",
    date: "Jan 2025 – Apr 2025",
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section 
      id="experience" 
      ref={containerRef} 
      className="relative w-full pb-[200px] md:pb-64 bg-black text-white overflow-hidden exp-section"
      style={{ paddingTop: "300px" }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .exp-section { padding-left: 28px; padding-right: 28px; }
        @media (min-width: 768px) {
          .exp-section { padding-left: 48px; padding-right: 48px; }
        }
        @media (min-width: 1024px) {
          .exp-section { padding-left: 120px; padding-right: 120px; }
        }
      `}} />
      
      {/* Background Depth */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [300, -300]) }}
      />

      <div className="w-full relative z-10 flex flex-col items-center">
        <motion.div style={{ y }} className="w-full flex flex-col items-center">
          
          {/* Centered Section Title */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            className="flex flex-col items-center justify-center text-center w-full"
          >
            <motion.h3 
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className="text-xs md:text-sm font-mono tracking-widest text-white/40 uppercase mb-4"
            >
              01 // EXPERIENCE
            </motion.h3>
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98, filter: 'blur(12px)' },
                visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
              }}
              className="text-3xl md:text-5xl font-light tracking-tight text-white w-full text-center"
            >
              Professional Journey
            </motion.h2>
          </motion.div>

          {/* Top spacer to guarantee space below the title */}
          <div className="w-full h-8 md:h-12 shrink-0" />
          
          {/* The actual horizontal line */}
          <div className="w-full h-[1px] bg-white/20 shrink-0" />
          
          {/* Bottom spacer to guarantee space above the jobs list */}
          <div className="w-full h-8 md:h-12 shrink-0" />

          {/* Experience List */}
          <div className="w-full flex flex-col gap-12 md:gap-16">
            {experiences.map((exp, i) => {
              const start = 0.2 + (i * 0.15);
              const end = start + 0.15;
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const itemY = useTransform(scrollYProgress, [start, end], [30, 0]);

              return (
                <motion.div 
                  key={i} 
                  className="w-full flex flex-col items-center md:items-start group" 
                  style={{ opacity, y: itemY }}
                >
                  {/* Top row: Company (Left) and Date (Right) */}
                  <div className="w-full flex flex-col md:flex-row md:items-baseline justify-between mb-2 md:mb-1">
                    <h3 className="text-2xl md:text-2xl font-medium tracking-wide text-white transition-colors duration-300 group-hover:text-blue-400 text-center md:text-left">
                      {exp.company}
                    </h3>
                    <h4 className="text-xs md:text-sm font-mono tracking-widest text-white/50 text-center md:text-right shrink-0 mt-2 md:mt-0">
                      {exp.date}
                    </h4>
                  </div>
                  
                  {/* Bottom row: Role (Left) */}
                  <p className="text-base md:text-lg text-white/70 font-light text-center md:text-left">
                    {exp.role}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
