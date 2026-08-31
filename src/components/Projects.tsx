"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectScene from "./ProjectScene";

const projects = [
  {
    title: "Snap & Get",
    category: "Food Ordering & Delivery",
    color: "#ff4d4d"
  },
  {
    title: "Real-Time Collaborative Whiteboard",
    category: "Interactive Application",
    color: "#4da6ff"
  },
  {
    title: "Real-Time Weather Dashboard",
    category: "Data Visualization",
    color: "#4dffb8"
  },
  {
    title: "Personal Finance & Expense Platform",
    category: "Fintech Application",
    color: "#b84dff"
  }
];

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress specifically for the header element
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  return (
    <section id="work" className="relative w-full bg-black text-white z-20">
      {/* 300px physical spacer to guarantee separation from Technology Stack */}
      <div className="w-full shrink-0" style={{ height: "300px" }} />
      
      {/* Centered Section Title */}
      <motion.div 
        ref={headerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        className="relative z-20 w-full flex flex-col items-center justify-center text-center"
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
      
      <div className="relative z-10 w-full" style={{ marginTop: "-50vh" }}>
        {projects.map((project, i) => (
          <ProjectScene 
            key={i}
            index={i + 1}
            title={project.title}
            category={project.category}
            color={project.color}
          />
        ))}
      </div>
    </section>
  );
}
