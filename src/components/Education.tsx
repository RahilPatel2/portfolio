"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity1 = useTransform(scrollYProgress, [0.35, 0.4], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0.35, 0.4], [40, 0]);

  const opacity2 = useTransform(scrollYProgress, [0.38, 0.43], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.38, 0.43], [50, 0]);
  const blur2 = useTransform(scrollYProgress, [0.38, 0.43], ["blur(12px)", "blur(0px)"]);
  const scale2 = useTransform(scrollYProgress, [0.38, 0.43], [0.95, 1]);

  const opacity3 = useTransform(scrollYProgress, [0.41, 0.46], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.41, 0.46], [30, 0]);

  const lineScale = useTransform(scrollYProgress, [0.44, 0.49], [0, 1]);

  const opacity4 = useTransform(scrollYProgress, [0.47, 0.52], [0, 1]);
  const y4 = useTransform(scrollYProgress, [0.47, 0.52], [20, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-black text-white overflow-hidden flex flex-col items-center justify-center academics-section" 
    >
      <style dangerouslySetInnerHTML={{__html: `
        .academics-section { padding-top: 150px; padding-bottom: 100px; }
        @media (min-width: 768px) {
          .academics-section { padding-top: 450px; padding-bottom: 450px; }
        }
      `}} />
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        className="max-w-4xl mx-auto px-8 md:px-6 w-full flex flex-col items-center text-center group"
      >
        
        {/* Label */}
        <motion.h3 
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          className="text-xs md:text-sm font-mono tracking-widest text-white/40 group-hover:text-white/70 transition-colors duration-500 uppercase mb-8"
        >
          05 // ACADEMICS
        </motion.h3>
        
        {/* Main Heading & Attribution */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.98, filter: 'blur(12px)' },
            visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
          }}
          className="flex flex-col items-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white/90 group-hover:text-white transition-colors duration-500 mb-4 px-2 md:px-0">
            Indrashil University
          </h2>
          <a 
            href="https://www.google.com/search?q=cadila+pharmaceuticals+net+worth" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] transition-colors duration-300 border border-white/10 rounded-full cursor-pointer pl-6 pr-4 py-2 md:pl-8 md:pr-6 md:py-2 max-w-[90vw] overflow-hidden"
          >
            <span className="text-xs md:text-sm lg:text-base font-light text-white/50 group-hover:text-white/80 transition-colors duration-500 italic truncate">by Cadila Pharmaceuticals</span>
            <div className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-500">
              <img 
                src="https://logo.clearbit.com/cadilapharma.com" 
                alt="Cadila Pharmaceuticals" 
                className="w-full h-full object-contain brightness-0 invert"
                onError={(e) => { 
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.style.display = 'none';
                  }
                }}
              />
            </div>
          </a>
        </motion.div>
        
        {/* Degree */}
        <motion.p 
          className="text-xl md:text-3xl font-light text-white/60 group-hover:text-white/90 transition-colors duration-500 mb-10 md:mb-12"
          style={{ opacity: opacity3, y: y3 }}
        >
          B.Tech in Computer Science
        </motion.p>

        {/* Subtle Divider */}
        <motion.div 
          className="w-[150px] md:w-[250px] h-[1px] bg-white/10 group-hover:bg-white/40 transition-colors duration-500 shrink-0 mb-10 md:mb-12 origin-center" 
          style={{ scaleX: lineScale, opacity: opacity4 }}
        />
        
        {/* Dates & CGPA */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-sm md:text-base font-mono text-white/40 group-hover:text-white/70 transition-colors duration-500 tracking-widest"
          style={{ opacity: opacity4, y: y4 }}
        >
          <span>2022–2026</span>
          <span className="hidden md:inline-block w-1 h-1 bg-white/20 group-hover:bg-white/50 transition-colors duration-500 rounded-full" />
          <span className="text-white/70 group-hover:text-white transition-colors duration-500">CGPA: 8.91/10</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
