"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import RoamlyVisual from "./project-visuals/RoamlyVisual";
import DeployXVisual from "./project-visuals/DeployXVisual";
import CodeLinuxVisual from "./project-visuals/CodeLinuxVisual";
import GithubIcon from "./icons/GithubIcon";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "center center"],
  });

  const renderProjectVisual = (slug: string) => {
    if (slug === "ai-planner-specification") {
      return <RoamlyVisual interactive={true} />;
    }
    if (slug === "deployx") {
      return <DeployXVisual interactive={true} />;
    }
    return <CodeLinuxVisual interactive={true} />;
  };

  return (
    <section id="work" className="relative w-full bg-black text-white z-20 overflow-hidden flex flex-col items-center">
      {/* Generous spacing above 03 // WORK separating it from Skills */}
      <div className="w-full shrink-0 h-28 md:h-[300px]" />
      
      {/* Centered Section Title — Exact match with original portfolio design */}
      <motion.div 
        ref={headerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        className="relative z-20 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center"
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
        
        {/* Animated subtle underline matching Technology Stack & Experience */}
        <motion.div 
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
          }}
          className="w-[250px] md:w-[350px] lg:w-[450px] h-[1px] bg-white/10 shrink-0 origin-center" 
          style={{ marginTop: "4px" }} 
        />

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } }
          }}
          className="text-sm md:text-base text-white/50 font-light max-w-xl text-center mt-6 font-sans leading-relaxed"
        >
          Featured engineering platforms and architecture specifications.
        </motion.p>
      </motion.div>
      
      {/* Projects List — 100% Centralized Layout matching original portfolio */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center space-y-32 md:space-y-48 mt-16 md:mt-24">
        {projectsData.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            className="w-full flex flex-col items-center text-center group"
          >
            {/* Project Index & Category */}
            <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/40 uppercase mb-4 block">
              Project {project.id} {"//"} {project.category}
            </span>

            {/* Project Title */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 leading-tight max-w-3xl">
              {project.name}
            </h3>

            {/* Project Description */}
            <p className="text-sm sm:text-base md:text-lg text-white/60 font-light max-w-2xl text-center leading-relaxed mb-6 font-sans">
              {project.shortDescription}
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-2xl">
              {project.technologies.slice(0, 6).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md text-xs font-mono text-white/70 bg-white/[0.03] border border-white/10"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 6 && (
                <span className="px-3 py-1 rounded-md text-xs font-mono text-white/40 bg-white/[0.02] border border-white/5">
                  +{project.technologies.length - 6} more
                </span>
              )}
            </div>

            {/* Centered Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <Link
                href={`/projects/${project.slug}`}
                className="text-xs sm:text-sm font-mono tracking-widest text-white border border-white/50 px-8 py-3.5 sm:py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-xl backdrop-blur-md bg-black/40 flex items-center gap-2"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-mono tracking-widest text-white/70 border border-white/20 px-6 py-3.5 sm:py-4 rounded-full hover:border-white/50 hover:text-white transition-all duration-300 flex items-center gap-2 bg-black/20"
              >
                <GithubIcon className="w-4 h-4" />
                <span>SOURCE CODE</span>
              </a>
            </div>

            {/* Large Centered Project Preview Frame */}
            <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
              {renderProjectVisual(project.slug)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Generous spacing below 03 // WORK before 04 // CREDENTIALS */}
      <div className="w-full shrink-0 h-28 md:h-[300px]" />
    </section>
  );
}