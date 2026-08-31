"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const certs = [
  { org: "Apna College", title: "Full Stack Web Development" },
  { org: "Apna College", title: "Data Structures & Algorithms" },
  { org: "100xDevs", title: "Full Stack Web Development" },
  { org: "IIT Bombay", title: "Artificial Intelligence" },
  { org: "Goldman Sachs", title: "Operations Job Simulation" },
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="credentials" ref={containerRef} className="relative w-full pt-[300px] pb-40 md:pb-64 bg-black text-white overflow-hidden flex flex-col items-center">
      <div className="max-w-5xl mx-auto px-8 md:px-6 w-full relative z-10">
        
        {/* Centered Section Title */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-10%" }}
          className="w-full flex flex-col items-center justify-center text-center mb-12 md:mb-24"
        >
          <motion.h3 
            variants={{
              hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-xs md:text-sm font-mono tracking-widest text-white/40 uppercase mb-4"
          >
            04 // CREDENTIALS
          </motion.h3>
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.98, filter: 'blur(12px)' },
              visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
            }}
            className="text-3xl md:text-5xl font-light tracking-tight text-white w-full text-center"
          >
            Certifications <span className="font-serif italic text-white/60">&amp;</span> Achievements
          </motion.h2>
          
          <div className="w-full h-8 md:h-12 shrink-0" />
          <motion.div 
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
            }}
            className="w-full h-[1px] bg-white/20 shrink-0 origin-center" 
          />
        </motion.div>

        {/* Credentials List */}
        <div className="w-full flex flex-col gap-4 md:gap-10">
          {certs.map((cert, i) => {
            const start = 0.12 + (i * 0.05);
            const end = start + 0.08;
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [start, end], [50, 0]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(scrollYProgress, [start, end], [0.97, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const blur = useTransform(scrollYProgress, [start, end], ["blur(8px)", "blur(0px)"]);

            return (
              <motion.div 
                key={i} 
                className="group relative w-full flex flex-col border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 rounded-lg p-5 md:p-8 cursor-pointer overflow-hidden"
                style={{ opacity, y, scale, filter: blur }}
              >
                {/* Subtle Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left">
                  <div className="flex flex-col gap-2 items-center md:items-start">
                    <h3 className="text-lg md:text-2xl font-light tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <h4 className="text-[10px] md:text-sm font-mono tracking-widest text-white/50 uppercase">
                      {cert.org}
                    </h4>
                  </div>
                  
                  <div className="flex items-center justify-center text-white/30 group-hover:text-white/80 transition-colors duration-300">
                    <span className="text-xs md:text-sm font-mono uppercase tracking-widest flex items-center gap-2">
                      View Credential <span className="text-lg md:text-lg">↗</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Mobile ONLY bottom breathing space */}
        <div className="w-full shrink-0 h-[100px] md:h-0" />
      </div>
    </section>
  );
}
