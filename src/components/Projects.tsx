"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import RoamlyVisual from "./project-visuals/RoamlyVisual";
import DeployXVisual from "./project-visuals/DeployXVisual";
import CodeLinuxVisual from "./project-visuals/CodeLinuxVisual";
import GithubIcon from "./icons/GithubIcon";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
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
    <section id="work" className="relative w-full bg-black text-white z-20 overflow-hidden">
      {/* Top breathing space matching portfolio standard */}
      <div className="w-full shrink-0 h-24 sm:h-32 md:h-44" />
      
      {/* Main Centered Container */}
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center">
        
        {/* Section Heading — Centered and Aligned */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-col items-center justify-center text-center w-full mb-14 sm:mb-20"
        >
          <motion.h3 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-xs sm:text-sm font-mono tracking-widest text-white/40 uppercase mb-4"
          >
            03 // WORK
          </motion.h3>

          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
            }}
            className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4"
          >
            Flagship Engineering Projects
          </motion.h2>

          <motion.div 
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }
            }}
            className="w-[200px] sm:w-[300px] md:w-[400px] h-[1px] bg-white/10 shrink-0 origin-center" 
          />

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2 } }
            }}
            className="text-sm sm:text-base text-white/50 font-light max-w-xl text-center mt-6 font-sans leading-relaxed"
          >
            Architectural case studies and production full-stack systems designed with performance and clean code.
          </motion.p>
        </motion.div>

        {/* Project Presentation Cards */}
        <div className="w-full space-y-12 sm:space-y-16 lg:space-y-20">
          {projectsData.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group relative w-full rounded-2xl bg-[#0D0D0D] border border-white/10 hover:border-white/25 transition-all duration-500 overflow-hidden p-6 sm:p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center w-full">
                
                {/* Left Column: Project Information & Actions (42%) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                  <div>
                    {/* Project Number & Category */}
                    <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-white/40 mb-3">
                      <span>PROJECT {project.id}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-white/60">{project.category}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white mb-4 leading-tight group-hover:text-white transition-colors">
                      {project.name}
                    </h3>

                    {/* Project Short Description */}
                    <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed mb-6 font-sans">
                      {project.shortDescription}
                    </p>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.slice(0, 6).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono text-white/70 bg-[#171717] border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 6 && (
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono text-white/40 bg-[#141414] border border-white/5">
                          +{project.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="px-6 py-3 rounded-full bg-white text-black font-mono tracking-wider text-xs uppercase font-medium flex items-center gap-2 hover:bg-neutral-200 transition-all duration-300 shadow-sm"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-full bg-[#171717] hover:bg-[#222222] border border-white/10 hover:border-white/25 text-white/80 hover:text-white font-mono tracking-wider text-xs uppercase flex items-center gap-2 transition-all duration-300"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>SOURCE</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Large Project Preview (58%) */}
                <div className="lg:col-span-7 w-full">
                  <div className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.01]">
                    {renderProjectVisual(project.slug)}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom breathing space */}
      <div className="w-full shrink-0 h-24 sm:h-32 md:h-44" />
    </section>
  );
}