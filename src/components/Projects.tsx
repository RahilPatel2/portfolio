"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { projectsData, ProjectData } from "@/data/projects";
import RoamlyVisual from "./project-visuals/RoamlyVisual";
import DeployXVisual from "./project-visuals/DeployXVisual";
import CodeLinuxVisual from "./project-visuals/CodeLinuxVisual";
import GithubIcon from "./icons/GithubIcon";
import { ArrowUpRight, Sparkles, ExternalLink, Activity, Terminal } from "lucide-react";

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.005] p-6 sm:p-10 lg:p-12 backdrop-blur-xl overflow-hidden transition-all duration-700 hover:border-white/25 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
    >
      {/* Dynamic Cursor Spotlight that tracks mouse position */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, ${project.color}20, transparent 40%)`,
        }}
      />

      {/* Atmospheric Ambient Color Aura */}
      <div 
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-15 group-hover:opacity-30 transition-opacity duration-700"
        style={{ backgroundColor: project.color }}
      />
      <div 
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-700"
        style={{ backgroundColor: project.color }}
      />

      {/* Giant Ghost Index Watermark in Background */}
      <div className="absolute right-6 top-4 pointer-events-none select-none font-mono text-8xl sm:text-9xl font-extralight tracking-tighter text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-700">
        0{project.id}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Project Identity, Description & CTAs */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          <div>
            {/* Top Indicator Bar */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-xs font-mono font-medium tracking-widest text-white/40">
                PROJECT 0{project.id} // 03
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span 
                className="px-3 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase border flex items-center gap-1.5 backdrop-blur-md"
                style={{ 
                  borderColor: project.borderColor, 
                  backgroundColor: `${project.color}15`,
                  color: project.color 
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: project.color }} />
                <span>{project.category}</span>
              </span>
            </div>

            {/* Project Title with Subtle Shimmer */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-4 leading-[1.15] group-hover:text-white transition-colors">
              {project.name}
            </h3>

            {/* Short Narrative Description */}
            <p className="text-sm sm:text-base font-light text-white/65 leading-relaxed mb-6 font-sans">
              {project.shortDescription}
            </p>

            {/* Key Technical Highlights Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.slice(0, 6).map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-white/60 bg-white/[0.03] border border-white/10 group-hover:border-white/20 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 6 && (
                <span className="px-2 py-1 rounded-lg text-[11px] font-mono text-white/40 bg-white/[0.02] border border-white/5">
                  +{project.technologies.length - 6} more
                </span>
              )}
            </div>

            {/* Live Metrics Quick Row */}
            <div className="grid grid-cols-2 gap-3 mb-8 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
              {project.metrics.slice(0, 2).map((m, mi) => (
                <div key={mi}>
                  <div className="text-[10px] font-mono uppercase text-white/40">{m.label}</div>
                  <div className="text-lg font-mono font-medium" style={{ color: project.color }}>
                    {m.value}
                  </div>
                  <div className="text-[10px] font-mono text-white/40 truncate">{m.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={`/projects/${project.slug}`}
              className="px-7 py-4 rounded-full bg-white text-black font-mono tracking-wider text-xs uppercase font-medium flex items-center gap-2.5 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] group/btn"
            >
              <span>VIEW FULL CASE STUDY</span>
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-white/35 text-white/80 hover:text-white font-mono tracking-wider text-xs uppercase flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              title="View GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">SOURCE</span>
            </a>
          </div>
        </div>

        {/* Right Column: Live Interactive Architecture Visual Simulation */}
        <div className="lg:col-span-7 w-full">
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/10 via-transparent to-white/5 shadow-2xl">
            {renderProjectVisual(project.slug)}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "center center"],
  });

  return (
    <section id="work" className="relative w-full bg-black text-white z-20 overflow-hidden">
      {/* Responsive spacer to guarantee separation from Technology Stack */}
      <div className="w-full shrink-0 h-28 md:h-[260px]" />
      
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
          Flagship Engineering Projects
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
        
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } }
          }}
          className="text-xs sm:text-sm font-mono text-white/40 max-w-xl text-center mt-6"
        >
          Explore interactive platform simulations and deep-dive technical case studies.
        </motion.p>
      </motion.div>
      
      {/* Flagship Projects Showcase Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 space-y-16 sm:space-y-28">
        {projectsData.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Bottom breathing space */}
      <div className="w-full shrink-0 h-28 md:h-[200px]" />
    </section>
  );
}