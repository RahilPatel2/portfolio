"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ProjectData } from "@/data/projects";
import GithubIcon from "./icons/GithubIcon";
import { ArrowUpRight } from "lucide-react";
import RoamlyVisual from "./project-visuals/RoamlyVisual";
import DeployXVisual from "./project-visuals/DeployXVisual";
import CodeLinuxVisual from "./project-visuals/CodeLinuxVisual";

interface ProjectSceneProps {
  project: ProjectData;
  index: number;
}

export default function ProjectScene({ project, index }: ProjectSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.92, 1, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.65, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [30, 0, 0, -30]);

  const renderVisual = (slug: string) => {
    if (slug === "ai-planner-specification") {
      return <RoamlyVisual interactive={false} />;
    }
    if (slug === "deployx") {
      return <DeployXVisual interactive={false} />;
    }
    return <CodeLinuxVisual interactive={false} />;
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[140vh] md:h-[200vh] flex items-center justify-center"
    >
      <motion.div 
        className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6"
        style={{ opacity, scale, y }}
      >
        {/* Background Subtle Device Frame */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="w-[92vw] sm:w-[82vw] lg:w-[68vw] max-w-5xl h-[60vh] sm:h-[70vh] max-h-[580px] rounded-2xl border border-white/10 bg-[#0A0A0A]/90 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center opacity-25 md:opacity-35 transition-opacity duration-700">
            <div className="w-full h-full p-2 sm:p-4 opacity-75">
              {renderVisual(project.slug)}
            </div>
          </div>
        </div>

        {/* Centered Project Information — 100% Centralized matching original website */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl px-4 sm:px-6">
          
          {/* Project Index & Category */}
          <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-white/50 uppercase mb-4 md:mb-6 block drop-shadow-md">
            Project {project.id} {"//"} {project.category}
          </span>

          {/* Project Title */}
          <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl">
            {project.name}
          </h3>

          {/* Narrative Description */}
          <p className="text-sm sm:text-base md:text-lg text-white/70 font-light max-w-2xl text-center leading-relaxed mb-6 md:mb-8 font-sans drop-shadow-lg">
            {project.shortDescription}
          </p>

          {/* Minimalist Tech Stack Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 md:mb-10 max-w-2xl">
            {project.technologies.slice(0, 6).map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1 rounded-full text-xs font-mono text-white/75 bg-white/[0.04] border border-white/10 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Centered Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs sm:text-sm font-mono tracking-widest text-white border border-white/50 px-8 py-3.5 sm:py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-xl backdrop-blur-md bg-black/40 flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>VIEW CASE STUDY</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-mono tracking-widest text-white/70 border border-white/20 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full hover:border-white/50 hover:text-white transition-all duration-300 flex items-center gap-2 backdrop-blur-md bg-black/20 hover:scale-105 active:scale-95"
            >
              <GithubIcon className="w-4 h-4" />
              <span>SOURCE CODE</span>
            </a>
          </div>

        </div>
      </motion.div>
    </div>
  );
}