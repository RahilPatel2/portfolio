"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = "I build full-stack digital experiences where engineering meets thoughtful design.".split(" ");

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [0.95, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const mobileOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);
  const mobileBlur = useTransform(scrollYProgress, [0.1, 0.5, 0.9], ["blur(12px)", "blur(0px)", "blur(12px)"]);
  const mobileScale = useTransform(scrollYProgress, [0.1, 0.9], [0.95, 1.05]);
  const mobileY = useTransform(scrollYProgress, [0.1, 0.9], [40, -40]);

  return (
    <section id="about" ref={containerRef} className="relative w-full h-auto py-[200px] md:py-0 md:h-[150vh] bg-black flex items-center justify-center overflow-hidden">
      
      {/* Background Cinematic Noise */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat animate-[spin_60s_linear_infinite]" />

      <motion.div 
        className="relative md:sticky md:top-0 h-auto md:h-screen flex flex-col items-center justify-center max-w-6xl mx-auto px-6 text-center"
        style={{ opacity, scale, y }}
      >
        {/* DESKTOP VERSION (Unchanged) */}
        <h2 className="hidden md:flex text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.2] text-white flex-wrap justify-center gap-x-3 md:gap-x-5 gap-y-2 md:gap-y-4">
          {words.map((word, i) => {
            const start = 0.3 + (i * 0.02);
            const end = start + 0.05;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const wordOpacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const wordY = useTransform(scrollYProgress, [start, end], [20, 0]);
            
            return (
              <motion.span key={i} className="inline-block" style={{ opacity: wordOpacity, y: wordY }}>
                {word}
              </motion.span>
            )
          })}
        </h2>

        {/* MOBILE VERSION */}
        <motion.h2 
          className="flex md:hidden text-2xl font-light tracking-tight leading-[1.4] text-white flex-wrap justify-center text-center px-4"
          style={{ opacity: mobileOpacity, filter: mobileBlur, scale: mobileScale, y: mobileY }}
        >
          I build full-stack digital experiences where engineering meets thoughtful design.
        </motion.h2>
        
        <motion.div 
          className="mt-16 w-[1px] h-32 bg-gradient-to-b from-white/0 via-white/50 to-white/0 hidden md:block"
          style={{
             scaleY: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
             opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
          }}
        />
      </motion.div>
    </section>
  );
}
