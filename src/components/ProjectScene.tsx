"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProjectSceneProps {
  index: number;
  title: string;
  category: string;
  color: string;
}

export default function ProjectScene({ index, title, category, color }: ProjectSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = scrollYProgress;

  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] flex items-center justify-center">
      <motion.div 
        className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ opacity }}
      >
        {/* Abstract Cinematic Visual Representation */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center -z-10"
          style={{ scale }}
        >
          <div 
            className="w-[70vw] h-[70vh] rounded-2xl opacity-20 blur-3xl mix-blend-screen transition-colors duration-1000"
            style={{ backgroundColor: color }}
          />
          <div className="absolute w-[50vw] h-[50vh] border border-white/10 rounded-xl bg-black/50 backdrop-blur-md flex items-center justify-center overflow-hidden">
             {/* Decorative abstract UI elements */}
             <div className="absolute top-0 left-0 w-full h-10 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
             </div>
             <motion.div 
                className="w-[80%] h-[60%] border border-white/5 bg-white/[0.02] rounded"
                style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
             />
          </div>
        </motion.div>

        {/* Project Info */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-5xl px-6 mt-32">
          <h4 className="text-xs md:text-sm font-mono tracking-[0.3em] text-white/60 mb-6 uppercase drop-shadow-md">
            Project {String(index).padStart(2, "0")} {"//"} {category}
          </h4>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-12 drop-shadow-lg leading-tight">
            {title}
          </h3>
          <div className="pointer-events-auto z-20">
            <button className="text-sm font-mono tracking-widest text-white border border-white/50 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-colors duration-300 shadow-xl backdrop-blur-md bg-black/20">
              VIEW CASE STUDY
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
