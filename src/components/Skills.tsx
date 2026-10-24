"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  { category: "Languages", items: ["C++", "C", "JavaScript"] },
  { category: "Frontend", items: ["React.js", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
  { category: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL"] },
  { category: "Real-Time", items: ["Socket.IO", "WebSockets"] },
  { category: "Tools & APIs", items: ["Git", "Cloudinary", "OpenAI API", "Razorpay"] },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="skills" ref={containerRef} className="relative w-full pt-0 pb-0 bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full px-6 z-10 relative">
        {/* 200px empty space above the heading */}
        <div className="w-full shrink-0" style={{ height: "200px" }} />
        
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
            02 // EXPERTISE
          </motion.h3>
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.98, filter: 'blur(12px)' },
              visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
            }}
            className="text-4xl md:text-6xl font-light tracking-tight text-white/70"
          >
            Technology Stack
          </motion.h2>
          
          <motion.div 
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
            }}
            className="w-[250px] md:w-[350px] lg:w-[450px] h-[1px] bg-white/10 shrink-0 origin-center" 
            style={{ marginTop: "4px" }} 
          />
          
          {/* 100px space below the underline before categories begin */}
          <div className="w-full shrink-0" style={{ height: "100px" }} />
        </motion.div>
      
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-16 lg:gap-x-24 md:gap-y-10 w-full px-4 md:px-0">
          {skills.map((skillGroup, i) => {
            // Stagger by row and column
            const row = Math.floor(i / 3);
            const col = i % 3;
            const start = 0.25 + (row * 0.15) + (col * 0.05);
            const end = start + 0.15;
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const itemOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const categoryY = useTransform(scrollYProgress, [start, end], [30, 0]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const itemsY = useTransform(scrollYProgress, [start, end], [50, 0]); // Parallax (moves more than category)
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const lineScaleX = useTransform(scrollYProgress, [start + 0.05, end + 0.05], [0, 1]);

            return (
              <motion.div 
                key={i} 
                className="flex flex-col items-center text-center group"
                style={{ opacity: itemOpacity }}
              >
                <motion.div className="w-full flex flex-col items-center" style={{ y: categoryY }}>
                  <h4 className="text-xs md:text-sm font-mono tracking-[0.2em] text-white/70 uppercase">
                    {skillGroup.category}
                  </h4>
                  <motion.div 
                    className="w-full h-[1px] bg-white/10 origin-center" 
                    style={{ marginTop: "4px", scaleX: lineScaleX }} 
                  />
                  {/* Exactly 5px of vertical spacing below the underline */}
                  <div className="w-full shrink-0" style={{ height: "5px" }} />
                </motion.div>
                
                <motion.div className="flex flex-col gap-2 md:gap-3 items-center" style={{ y: itemsY }}>
                  {skillGroup.items.map((item, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ scale: 1.1, x: 10 }}
                      className="text-base sm:text-lg md:text-2xl lg:text-3xl font-light text-white/60 transition-all duration-300 hover:text-white"
                    >
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Mobile ONLY bottom breathing space */}
        <div className="w-full shrink-0 h-[200px] md:h-0" />
      </div>
    </section>
  );
}
