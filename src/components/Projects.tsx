"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import RoamlyVisual from "./project-visuals/RoamlyVisual";
import DeployXVisual from "./project-visuals/DeployXVisual";
import CodeLinuxVisual from "./project-visuals/CodeLinuxVisual";
import GithubIcon from "./icons/GithubIcon";
import { ArrowUpRight, Sparkles } from "lucide-react";

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
    <section id="work" className="relative w-full bg-black text-white z-20 overflow-hidden">
      {/* Responsive spacer to guarantee separation from Technology Stack */}
      <div className="w-full shrink-0 h-28 md:h-[300px]" />
      
      {/* Centered Section Title */}
      <motion.div 
        ref={headerRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
        className="relative z-20 w-full flex flex-col items-center justify-center text-center px-4"
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
        
        {/* Animated subtle underline */}
        <motion.div 
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 } }
          }}
          className="w-[250px] md:w-[350px] lg:w-[450px] h-[1px] bg-white/10 shrink-0 origin-center" 
          style={{ marginTop: "4px" }} 
        />
      </motion.div>
      
      {/* Flagship Projects Showcase */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 space-y-20 sm:space-y-32">
        {projectsData.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-3xl border border-white/10 bg-white/[0.015] p-6 sm:p-10 lg:p-12 backdrop-blur-md overflow-hidden hover:border-white/20 transition-all duration-700 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Ambient Background Glow matching project color */}
            <div 
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-700"
              style={{ backgroundColor: project.color }}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Information & Actions */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono font-medium tracking-widest text-white/40">
                      PROJECT {project.id} // 03
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span 
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border flex items-center gap-1"
                      style={{ 
                        borderColor: project.borderColor, 
                        backgroundColor: `${project.color}15`,
                        color: project.color 
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4 leading-tight group-hover:text-white transition-colors">
                    {project.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm sm:text-base font-light text-white/60 leading-relaxed mb-6">
                    {project.shortDescription}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.slice(0, 6).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono text-white/60 bg-white/[0.03] border border-white/10 group-hover:border-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="px-2 py-1 rounded-md text-[11px] font-mono text-white/40 bg-white/[0.02] border border-white/5">
                        +{project.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="px-6 py-3.5 rounded-full bg-white text-black font-mono tracking-wider text-xs uppercase font-medium flex items-center gap-2 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 text-white/70 hover:text-white hover:scale-105 active:scale-95 transition-all"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Thumbnail / Visual Preview */}
              <div className="lg:col-span-7">
                <Link 
                  href={`/projects/${project.slug}`}
                  className="block relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/25 transition-all duration-500 shadow-2xl"
                >
                  <div className="transform transition-transform duration-700 group-hover:scale-[1.02]">
                    {renderProjectVisual(project.slug)}
                  </div>

                  {/* Subtle Click Indicator overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-white/[0.02] transition-colors pointer-events-none" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
