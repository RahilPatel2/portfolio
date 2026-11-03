"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProjectData } from "@/data/projects";
import RoamlyVisual from "@/components/project-visuals/RoamlyVisual";
import DeployXVisual from "@/components/project-visuals/DeployXVisual";
import CodeLinuxVisual from "@/components/project-visuals/CodeLinuxVisual";
import GalleryVisualRenderer from "@/components/case-study/GalleryVisualRenderer";
import GithubIcon from "@/components/icons/GithubIcon";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Globe, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Compass,
  MapPin,
  Terminal,
  Code2,
  Workflow,
  Lock,
  RotateCcw,
  LayoutDashboard,
  Key,
  AlertTriangle,
  Bot,
  TrendingUp,
  Box,
  History,
  DollarSign,
  Navigation as NavIcon,
  CreditCard,
  ArrowDown,
  Cpu
} from "lucide-react";

interface CaseStudyProps {
  project: ProjectData;
}

function getFeatureIcon(iconName: string) {
  switch (iconName) {
    case "Compass": return <Compass className="w-6 h-6" />;
    case "MapPin": return <MapPin className="w-6 h-6" />;
    case "NavIcon": return <NavIcon className="w-6 h-6" />;
    case "DollarSign": return <DollarSign className="w-6 h-6" />;
    case "CreditCard": return <CreditCard className="w-6 h-6" />;
    case "Lock": return <Lock className="w-6 h-6" />;
    case "GitBranch": return <Workflow className="w-6 h-6" />;
    case "Key": return <Key className="w-6 h-6" />;
    case "RotateCcw": return <RotateCcw className="w-6 h-6" />;
    case "Terminal": return <Terminal className="w-6 h-6" />;
    case "LayoutDashboard": return <LayoutDashboard className="w-6 h-6" />;
    case "Globe": return <Globe className="w-6 h-6" />;
    case "AlertTriangle": return <AlertTriangle className="w-6 h-6" />;
    case "Code2": return <Code2 className="w-6 h-6" />;
    case "Bot": return <Bot className="w-6 h-6" />;
    case "Cpu": return <Cpu className="w-6 h-6" />;
    case "TrendingUp": return <TrendingUp className="w-6 h-6" />;
    case "Workflow": return <Workflow className="w-6 h-6" />;
    case "Box": return <Box className="w-6 h-6" />;
    case "History": return <History className="w-6 h-6" />;
    default: return <Sparkles className="w-6 h-6" />;
  }
}

export default function CaseStudyExperience({ project }: CaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStudioTab, setActiveStudioTab] = useState<"runtime" | "blueprint" | "specs">("runtime");

  const renderVisualComponent = (interactive = true) => {
    if (project.slug === "ai-planner-specification") {
      return <RoamlyVisual interactive={interactive} />;
    }
    if (project.slug === "deployx") {
      return <DeployXVisual interactive={interactive} />;
    }
    return <CodeLinuxVisual interactive={interactive} />;
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#05070a] text-white selection:bg-white/20 selection:text-white overflow-hidden flex flex-col items-center">
      
      {/* =========================================================
          DYNAMIC AMBIENT BACKGROUND GLOWS
      ========================================================= */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[750px] rounded-full blur-[240px] pointer-events-none opacity-20 -z-10 transition-colors duration-1000"
        style={{ background: project.darkGlow }}
      />
      <div 
        className="fixed bottom-0 right-0 w-[700px] h-[700px] rounded-full blur-[260px] pointer-events-none opacity-15 -z-10"
        style={{ background: project.darkGlow }}
      />

      {/* =========================================================
          STICKY TOP NAVIGATION BAR
      ========================================================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#05070a]/90 backdrop-blur-2xl border-b border-white/10 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link
            href="/#work"
            className="group flex items-center gap-3 text-xs sm:text-sm font-mono tracking-widest text-white/70 hover:text-white transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>BACK TO PORTFOLIO</span>
          </Link>

          <div className="hidden md:flex items-center gap-3 text-xs font-mono">
            <span className={`px-3 py-1 rounded-full border text-[11px] ${project.badgeStyle}`}>
              PROJECT 0{project.id}
            </span>
            <span className="text-white/80 font-medium">{project.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/15 text-white/80 hover:text-white text-xs font-mono flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              title="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">SOURCE</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full bg-white text-black text-xs font-mono font-medium flex items-center gap-2 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)]"
            >
              <Globe className="w-4 h-4" />
              <span>LIVE DEMO</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* =========================================================
          HERO SECTION: 100% CENTRALISED & PROPER SPACING DESIGN
      ========================================================= */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 lg:px-12 pt-36 pb-20">
        
        {/* Top Space */}
        <div className="w-full shrink-0 h-6 md:h-12" />

        {/* Central Content */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto flex flex-col items-center w-full"
        >
          {/* Centered Telemetry Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase border ${project.badgeStyle} flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-current animate-ping" />
              PROJECT 0{project.id} // {project.year}
            </span>
            <span className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase border border-white/10 bg-white/[0.03] text-white/70">
              {project.category}
            </span>
          </div>

          {/* Centered Large Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white mb-6 leading-[1.05] font-sans drop-shadow-2xl">
            {project.name}
          </h1>

          {/* Signature Animated Underline Line matching main website */}
          <div className="w-[250px] md:w-[350px] lg:w-[450px] h-[1px] bg-white/15 shrink-0 mx-auto mb-8" />

          {/* Centered Tagline Narrative */}
          <p className="text-lg sm:text-2xl font-light text-white/75 max-w-3xl mb-12 leading-relaxed font-sans">
            {project.tagline}
          </p>

          {/* Centered Action Cockpit Buttons with generous margin */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-14">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-4 rounded-full bg-white text-black font-mono tracking-widest text-xs uppercase font-medium hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(255,255,255,0.25)] flex items-center gap-2.5 group"
            >
              <Globe className="w-4 h-4" />
              <span>EXPLORE LIVE APPLICATION</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/35 text-white font-mono tracking-widest text-xs uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-2 backdrop-blur-md"
            >
              <GithubIcon className="w-4 h-4" />
              <span>VIEW SOURCE CODE</span>
            </a>
          </div>

          {/* Centered Flight Instrument Metrics HUD with generous internal padding */}
          <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 p-8 md:p-10 rounded-3xl bg-[#0c1017]/80 border border-white/10 backdrop-blur-2xl mb-12 shadow-2xl">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 text-center">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-light font-mono text-white mb-2">
                  {metric.value}
                </span>
                <span className="text-xs font-mono tracking-wider uppercase text-white/50">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Centered Scroll Prompt */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[11px] font-mono tracking-widest text-white/40 uppercase mt-4 shrink-0"
        >
          <span>SCROLL DOWN TO EXPLORE ARCHITECTURE</span>
          <ArrowDown className="w-3.5 h-3.5 text-white/40" />
        </motion.div>
      </section>

      {/* Guaranteed Responsive Breathing Space separating Hero from Chapter 01 */}
      <div className="w-full shrink-0 h-28 md:h-[220px]" />

      {/* =========================================================
          CHAPTER 01: ARCHITECTURE & RUNTIME STUDIO
          100% Centralised Design matching original website
      ========================================================= */}
      <section className="relative w-full flex flex-col items-center justify-center px-6 lg:px-12">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          
          {/* Centered Chapter Header matching Skills.tsx & Projects.tsx */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center w-full"
          >
            <span className="text-xs md:text-sm font-mono tracking-widest text-white/40 uppercase mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              01 // ARCHITECTURE &amp; RUNTIME STUDIO
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white/80">
              System Architecture &amp; Console
            </h2>

            {/* Signature Underline */}
            <div className="w-[250px] md:w-[350px] lg:w-[450px] h-[1px] bg-white/10 shrink-0 mx-auto mt-4 mb-4" />

            <p className="text-sm md:text-base text-white/50 font-light max-w-xl mx-auto font-sans leading-relaxed">
              Explore the live execution environment, architectural blueprint, and technical specifications via the interactive studio below.
            </p>
          </motion.div>

          {/* Spacer below header */}
          <div className="w-full shrink-0 h-10 md:h-16" />

          {/* Centered Interactive Studio Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveStudioTab("runtime")}
              className={`px-6 py-3 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-2.5 ${
                activeStudioTab === "runtime"
                  ? "bg-white text-black font-medium shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  : "bg-white/[0.03] text-white/60 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>LIVE RUNTIME CONSOLE</span>
            </button>

            <button
              onClick={() => setActiveStudioTab("blueprint")}
              className={`px-6 py-3 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-2.5 ${
                activeStudioTab === "blueprint"
                  ? "bg-white text-black font-medium shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  : "bg-white/[0.03] text-white/60 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              <Workflow className="w-4 h-4" />
              <span>SYSTEM BLUEPRINT</span>
            </button>

            <button
              onClick={() => setActiveStudioTab("specs")}
              className={`px-6 py-3 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-2.5 ${
                activeStudioTab === "specs"
                  ? "bg-white text-black font-medium shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  : "bg-white/[0.03] text-white/60 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>SPECIFICATIONS</span>
            </button>
          </div>

          {/* Centered Studio Hardware Frame with generous internal padding */}
          <div className="relative w-full max-w-5xl mx-auto">
            {/* Ambient Dark Glow */}
            <div 
              className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none opacity-40 transition-all duration-700"
              style={{ background: project.darkGlow }}
            />

            <div 
              className="relative rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500"
              style={{ 
                backgroundColor: project.darkBg,
                borderColor: project.darkBorder 
              }}
            >
              <AnimatePresence mode="wait">
                {activeStudioTab === "runtime" && (
                  <motion.div
                    key="runtime"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderVisualComponent(true)}
                  </motion.div>
                )}

                {activeStudioTab === "blueprint" && (
                  <motion.div
                    key="blueprint"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="p-10 sm:p-16 space-y-8 text-left"
                  >
                    <div className="p-8 sm:p-12 rounded-2xl bg-[#0c1017]/90 border border-white/10 shadow-xl">
                      <div className="text-xs font-mono tracking-widest text-white/50 uppercase mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
                        Core Identity &amp; Platform Definition
                      </div>
                      <h4 className="text-2xl font-medium text-white mb-4">
                        What is {project.name}?
                      </h4>
                      <p className="text-white/75 leading-relaxed text-base sm:text-lg font-light font-sans">{project.overview.what}</p>
                    </div>

                    <div className="p-8 sm:p-12 rounded-2xl bg-[#0c1017]/90 border border-white/10 shadow-xl">
                      <div className="text-xs font-mono tracking-widest text-white/50 uppercase mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
                        Engineering Motivation
                      </div>
                      <h4 className="text-2xl font-medium text-white mb-4">
                        Why It Was Developed
                      </h4>
                      <p className="text-white/75 leading-relaxed text-base sm:text-lg font-light font-sans">{project.overview.why}</p>
                    </div>

                    <div className="p-8 sm:p-12 rounded-2xl bg-[#0c1017]/90 border border-white/10 shadow-xl">
                      <div className="text-xs font-mono tracking-widest text-white/50 uppercase mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
                        Architectural Solution
                      </div>
                      <h4 className="text-2xl font-medium text-white mb-4">
                        The Problem It Solves
                      </h4>
                      <p className="text-white/75 leading-relaxed text-base sm:text-lg font-light font-sans">{project.overview.problem}</p>
                    </div>
                  </motion.div>
                )}

                {activeStudioTab === "specs" && (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="p-10 sm:p-16 space-y-8 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-8 rounded-2xl bg-[#0c1017]/90 border border-white/10 flex justify-between items-center text-sm font-mono shadow-lg">
                        <span className="text-white/40">Architecture Role:</span>
                        <span className="text-white font-medium">{project.role}</span>
                      </div>
                      <div className="p-8 rounded-2xl bg-[#0c1017]/90 border border-white/10 flex justify-between items-center text-sm font-mono shadow-lg">
                        <span className="text-white/40">Production Year:</span>
                        <span className="text-white font-medium">{project.year}</span>
                      </div>
                      <div className="p-8 rounded-2xl bg-[#0c1017]/90 border border-white/10 flex justify-between items-center text-sm font-mono shadow-lg">
                        <span className="text-white/40">Platform Category:</span>
                        <span className="text-white font-medium">{project.category}</span>
                      </div>
                      <div className="p-8 rounded-2xl bg-[#0c1017]/90 border border-white/10 flex justify-between items-center text-sm font-mono shadow-lg">
                        <span className="text-white/40">Internal Codename:</span>
                        <span className="text-white font-medium">{project.internalCodeName}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-8 sm:p-10 rounded-2xl bg-[#0c1017]/90 border border-white/10 shadow-lg">
                        <h5 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-3">
                          Target Demographics
                        </h5>
                        <p className="text-base text-white/75 font-light leading-relaxed font-sans">{project.overview.audience}</p>
                      </div>
                      <div className="p-8 sm:p-10 rounded-2xl bg-[#0c1017]/90 border border-white/10 shadow-lg">
                        <h5 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-3">
                          Architectural Moat
                        </h5>
                        <p className="text-base text-white/75 font-light leading-relaxed font-sans">{project.overview.differentiator}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* Guaranteed Responsive Breathing Space separating Chapter 01 from Chapter 02 */}
      <div className="w-full shrink-0 h-28 md:h-[240px]" />

      {/* =========================================================
          CHAPTER 02: CORE PLATFORM CAPABILITIES
          Generous Card Padding (p-10 md:p-12) & Ample Breathing Room
      ========================================================= */}
      <section className="relative w-full flex flex-col items-center justify-center px-6 lg:px-12">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          
          {/* Centered Chapter Header matching Skills.tsx & Projects.tsx */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center w-full"
          >
            <span className="text-xs md:text-sm font-mono tracking-widest text-white/40 uppercase mb-4">
              02 // CORE CAPABILITIES
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white/80">
              Engineered Features &amp; Modules
            </h2>

            {/* Signature Underline */}
            <div className="w-[250px] md:w-[350px] lg:w-[450px] h-[1px] bg-white/10 shrink-0 mx-auto mt-4 mb-4" />

            <p className="text-sm md:text-base text-white/50 font-light max-w-xl mx-auto font-sans leading-relaxed">
              Every system capability is constructed for high reliability, fault tolerance, and developer satisfaction.
            </p>
          </motion.div>

          {/* Spacer below header */}
          <div className="w-full shrink-0 h-10 md:h-16" />

          {/* Centered Bento Grid with Generous Card Padding */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {project.features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group p-10 md:p-12 rounded-3xl bg-[#0c1017]/90 hover:bg-[#101524] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-2xl hover:scale-[1.02] text-left min-h-[340px]"
              >
                <div>
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-white/[0.04] text-white/80 border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:border-white/30"
                  >
                    {getFeatureIcon(feature.iconName)}
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-base text-white/65 font-light leading-relaxed mb-8 font-sans">
                    {feature.description}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>Capability // 0{i + 1}</span>
                  <span className="text-emerald-400 font-medium">Production Ready</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Guaranteed Responsive Breathing Space separating Chapter 02 from Chapter 03 */}
      <div className="w-full shrink-0 h-28 md:h-[240px]" />

      {/* =========================================================
          CHAPTER 03: VISUAL ARCHITECTURE & INTERFACE GALLERY
          100% Centralised Design matching original website
      ========================================================= */}
      <section className="relative w-full flex flex-col items-center justify-center px-6 lg:px-12">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          
          {/* Centered Chapter Header matching Skills.tsx & Projects.tsx */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center w-full"
          >
            <span className="text-xs md:text-sm font-mono tracking-widest text-white/40 uppercase mb-4">
              03 // VISUAL ARCHITECTURE
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white/80">
              Interface Gallery &amp; Inspector
            </h2>

            {/* Signature Underline */}
            <div className="w-[250px] md:w-[350px] lg:w-[450px] h-[1px] bg-white/10 shrink-0 mx-auto mt-4 mb-4" />

            <p className="text-sm md:text-base text-white/50 font-light max-w-xl mx-auto font-sans leading-relaxed">
              Explore user journeys and high-resolution architecture views. Click any item to inspect in fullscreen modal.
            </p>
          </motion.div>

          {/* Spacer below header */}
          <div className="w-full shrink-0 h-10 md:h-16" />

          {/* Centered 2-column Gallery Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
            {project.gallery.map((item, index) => (
              <div 
                key={item.id}
                className={index === 0 ? "lg:col-span-2" : "lg:col-span-1"}
              >
                <GalleryVisualRenderer 
                  project={project} 
                  item={item} 
                  index={index} 
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Guaranteed Responsive Breathing Space separating Chapter 03 from Chapter 04 */}
      <div className="w-full shrink-0 h-28 md:h-[240px]" />

      {/* =========================================================
          CHAPTER 04: INFRASTRUCTURE & DEPENDENCIES (TECH STACK)
          Generous Card Padding (p-10 md:p-12) & Ample Breathing Room
      ========================================================= */}
      <section className="relative w-full flex flex-col items-center justify-center px-6 lg:px-12">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
          
          {/* Centered Chapter Header matching Skills.tsx & Projects.tsx */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center text-center w-full"
          >
            <span className="text-xs md:text-sm font-mono tracking-widest text-white/40 uppercase mb-4">
              04 // INFRASTRUCTURE &amp; DEPENDENCIES
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white/80">
              Technology Stack Breakdown
            </h2>

            {/* Signature Underline */}
            <div className="w-[250px] md:w-[350px] lg:w-[450px] h-[1px] bg-white/10 shrink-0 mx-auto mt-4 mb-4" />

            <p className="text-sm md:text-base text-white/50 font-light max-w-xl mx-auto font-sans leading-relaxed">
              Carefully chosen libraries, runtimes, and databases powering {project.name}.
            </p>
          </motion.div>

          {/* Spacer below header */}
          <div className="w-full shrink-0 h-10 md:h-16" />

          {/* Centered Tech Cards Grid with Generous Padding (p-10 md:p-12, min-h-[280px]) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {project.techStackDetailed.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-10 md:p-12 rounded-3xl bg-[#0c1017]/90 hover:bg-[#101524] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-2xl text-left min-h-[280px]"
              >
                <div>
                  <div className="text-xs font-mono tracking-widest text-white/50 uppercase mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
                    {item.category}
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4">
                    {item.name}
                  </h3>
                  <p className="text-base text-white/65 leading-relaxed font-light font-sans mb-8">
                    {item.role}
                  </p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>Architecture Layer</span>
                  <span className="text-emerald-400 font-medium">Verified Active</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Guaranteed Responsive Breathing Space separating Chapter 04 from Chapter 05 */}
      <div className="w-full shrink-0 h-28 md:h-[240px]" />

      {/* =========================================================
          CHAPTER 05: DEPLOYMENT ACCESS (CLOSING CTA)
          100% Centralised Design matching original website
      ========================================================= */}
      <section className="relative w-full flex flex-col items-center justify-center px-6 lg:px-12">
        <div className="max-w-5xl mx-auto w-full">
          
          <div 
            className="rounded-[2.5rem] p-14 sm:p-28 text-center border relative overflow-hidden shadow-2xl flex flex-col items-center justify-center bg-gradient-to-b from-[#0c1017] to-[#07090f]"
            style={{ 
              borderColor: project.darkBorder 
            }}
          >
            {/* Ambient Dark Glow */}
            <div 
              className="absolute inset-0 rounded-3xl blur-3xl pointer-events-none opacity-30"
              style={{ background: project.darkGlow }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs font-mono tracking-widest text-white/50 uppercase block mb-6">
                05 // ACCESS &amp; PRODUCTION RUNTIME
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white mb-8">
                Experience {project.name}
              </h2>
              <p className="text-lg sm:text-xl text-white/65 mb-14 max-w-xl mx-auto font-sans font-light leading-relaxed">
                Launch the live deployment or inspect the production codebase and automated test suites on GitHub.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 rounded-full bg-white text-black font-mono tracking-widest text-xs uppercase font-medium hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(255,255,255,0.25)] flex items-center gap-2.5"
                >
                  <Globe className="w-4 h-4" />
                  <span>LIVE PROJECT DEMO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/40 text-white font-mono tracking-widest text-xs uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-2 backdrop-blur-md"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GITHUB REPOSITORY</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Guaranteed Responsive Breathing Space before Next/Prev Nav */}
      <div className="w-full shrink-0 h-24 md:h-[180px]" />

      {/* =========================================================
          CHAPTER 06: PREVIOUS / NEXT CASE STUDY NAVIGATION
      ========================================================= */}
      <footer className="relative w-full flex flex-col items-center justify-center px-6 lg:px-12">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {/* Previous Project Card */}
            <Link
              href={`/projects/${project.prevProject.slug}`}
              className="group p-10 md:p-14 rounded-3xl bg-[#0c1017]/90 hover:bg-[#101524] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-2xl min-h-[220px]"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors mb-4">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>PREVIOUS CASE STUDY</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                  {project.prevProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:text-white transition-colors">
                  {project.prevProject.name}
                </h3>
              </div>
            </Link>

            {/* Next Project Card */}
            <Link
              href={`/projects/${project.nextProject.slug}`}
              className="group p-10 md:p-14 rounded-3xl bg-[#0c1017]/90 hover:bg-[#101524] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between sm:text-right shadow-2xl min-h-[220px]"
            >
              <div className="flex items-center sm:justify-end gap-2 text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors mb-4">
                <span>NEXT CASE STUDY</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                  {project.nextProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:text-white transition-colors">
                  {project.nextProject.name}
                </h3>
              </div>
            </Link>
          </div>

          {/* Return to Portfolio Link */}
          <div className="mt-16 text-center">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white/40 hover:text-white uppercase transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO MAIN PORTFOLIO</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* Responsive breathing space below footer before page ends */}
      <div className="w-full shrink-0 h-24 md:h-[200px]" />

    </div>
  );
}
