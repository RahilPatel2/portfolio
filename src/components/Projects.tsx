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
    <section id="work" className="relative w-full bg-black text-white z-20 overflow-hidden py-32 sm:py-40 md:py-52 lg:py-64">
      {/* Centered Main Container */}
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center">
        
        {/* Section Heading — Generously Spaced and Centered */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-col items-center justify-center text-center w-full mb-20 sm:mb-28 md:mb-36"
        >
          <motion.h3 
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/40 uppercase mb-5"
          >
            03 // WORK
          </motion.h3>

          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 } }
            }}
            className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-6"
          >
            Flagship Engineering Projects
          </motion.h2>

          <motion.div 
            variants={{
              hidden: { scaleX: 0, opacity: 0 },
              visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }
            }}
            className="w-[200px] sm:w-[320px] md:w-[420px] h-[1px] bg-white/20 shrink-0 origin-center" 
          />

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
            }}
            className="text-base sm:text-lg text-white/50 font-light max-w-2xl text-center mt-8 font-sans leading-relaxed"
          >
            Full-stack systems and architectural specifications engineered with performance, scalability, and clean code.
          </motion.p>
        </motion.div>

        {/* Project Presentation Cards Stack with Expansive Spacing */}
        <div className="w-full space-y-20 sm:space-y-28 md:space-y-36">
          {projectsData.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group relative w-full rounded-3xl bg-[#0D0D0D] border border-white/10 hover:border-white/25 transition-all duration-500 overflow-hidden p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 xl:gap-16 items-center w-full">
                
                {/* Left Column: Project Information & Actions (42%) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
                  <div>
                    {/* Project Number & Category */}
                    <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-white/40 mb-4">
                      <span>PROJECT {project.id}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="text-white/60">{project.category}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-6 leading-[1.12] group-hover:text-white transition-colors">
                      {project.name}
                    </h3>

                    {/* Project Short Description */}
                    <p className="text-base lg:text-lg text-white/60 font-light leading-relaxed mb-8 font-sans">
                      {project.shortDescription}
                    </p>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2.5 mb-10">
                      {project.technologies.slice(0, 6).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-white/70 bg-[#161616] border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 6 && (
                        <span className="px-3 py-1.5 rounded-lg text-xs font-mono text-white/40 bg-[#141414] border border-white/5">
                          +{project.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/5">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="px-7 py-3.5 rounded-full bg-white text-black font-mono tracking-wider text-xs uppercase font-medium flex items-center gap-2.5 hover:bg-neutral-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-full bg-[#161616] hover:bg-[#202020] border border-white/10 hover:border-white/25 text-white/80 hover:text-white font-mono tracking-wider text-xs uppercase flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>SOURCE</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Large Project Preview (58%) */}
                <div className="lg:col-span-7 w-full">
                  <div className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]">
                    {renderProjectVisual(project.slug)}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}