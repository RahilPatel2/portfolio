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
  Cpu
} from "lucide-react";

interface CaseStudyProps {
  project: ProjectData;
}

function getFeatureIcon(iconName: string) {
  switch (iconName) {
    case "Compass": return <Compass className="w-5 h-5" />;
    case "MapPin": return <MapPin className="w-5 h-5" />;
    case "NavIcon": return <NavIcon className="w-5 h-5" />;
    case "DollarSign": return <DollarSign className="w-5 h-5" />;
    case "CreditCard": return <CreditCard className="w-5 h-5" />;
    case "Lock": return <Lock className="w-5 h-5" />;
    case "GitBranch": return <Workflow className="w-5 h-5" />;
    case "Key": return <Key className="w-5 h-5" />;
    case "RotateCcw": return <RotateCcw className="w-5 h-5" />;
    case "Terminal": return <Terminal className="w-5 h-5" />;
    case "LayoutDashboard": return <LayoutDashboard className="w-5 h-5" />;
    case "Globe": return <Globe className="w-5 h-5" />;
    case "AlertTriangle": return <AlertTriangle className="w-5 h-5" />;
    case "Code2": return <Code2 className="w-5 h-5" />;
    case "Bot": return <Bot className="w-5 h-5" />;
    case "Cpu": return <Cpu className="w-5 h-5" />;
    case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
    case "Workflow": return <Workflow className="w-5 h-5" />;
    case "Box": return <Box className="w-5 h-5" />;
    case "History": return <History className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
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
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#05070a] text-white selection:bg-white/20 selection:text-white">
      
      {/* =========================================================
          DYNAMIC AMBIENT BACKGROUND GLOWS
      ========================================================= */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full blur-[240px] pointer-events-none opacity-20 -z-10 transition-colors duration-1000"
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
          HERO SECTION: EXPANSIVE EDITORIAL PRESENTATION
          Generous breathing room: Badge -> Title -> Subtitle -> Action Buttons -> Flight Metrics
      ========================================================= */}
      <header className="relative w-full pt-40 md:pt-48 pb-20 md:pb-28 px-6 lg:px-12 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          {/* Top Status HUD Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase border ${project.badgeStyle} flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-current animate-ping" />
              PROJECT 0{project.id} // {project.year}
            </span>
            <span className="px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase border border-white/10 bg-white/[0.03] text-white/70">
              {project.category}
            </span>
          </div>

          {/* Large Project Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-8 leading-[1.08] font-sans drop-shadow-2xl">
            {project.name}
          </h1>

          {/* Subtitle Narrative */}
          <p className="text-base sm:text-xl md:text-2xl font-light text-white/70 max-w-2xl mb-12 leading-relaxed font-sans">
            {project.tagline}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
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

          {/* Key Metrics HUD Strip */}
          <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-3 text-center">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-light font-mono text-white mb-1.5">
                  {metric.value}
                </span>
                <span className="text-[11px] font-mono tracking-wider uppercase text-white/50">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </header>

      {/* =========================================================
          INTERACTIVE ARCHITECTURE STUDIO (SHOWCASE CENTERPIECE)
          No giant redundant heading! Sleek tab bar sits cleanly on top.
          Massive spacing separates it from subsequent content.
      ========================================================= */}
      <section className="relative w-full pt-16 md:pt-24 pb-36 md:pb-48 px-6 lg:px-12 border-t border-white/10 bg-[#06080d]/80">
        <div className="max-w-5xl mx-auto w-full">
          
          {/* Subtle Studio Tab Control Bar */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10">
            <button
              onClick={() => setActiveStudioTab("runtime")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-2 ${
                activeStudioTab === "runtime"
                  ? "bg-white text-black font-medium shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105"
                  : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>LIVE RUNTIME CONSOLE</span>
            </button>

            <button
              onClick={() => setActiveStudioTab("blueprint")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-2 ${
                activeStudioTab === "blueprint"
                  ? "bg-white text-black font-medium shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105"
                  : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>SYSTEM BLUEPRINT</span>
            </button>

            <button
              onClick={() => setActiveStudioTab("specs")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-2 ${
                activeStudioTab === "specs"
                  ? "bg-white text-black font-medium shadow-[0_0_20px_rgba(255,255,255,0.25)] scale-105"
                  : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>SPECIFICATIONS</span>
            </button>
          </div>

          {/* Dynamic Studio Frame with Dark Ambient Halo */}
          <div className="relative w-full">
            <div 
              className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none opacity-40 transition-all duration-700"
              style={{ background: project.darkGlow }}
            />

            <div 
              className="relative rounded-2xl overflow-hidden border shadow-2xl transition-all duration-500"
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
                    className="p-8 sm:p-12 space-y-6"
                  >
                    <div className="p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/10">
                      <h4 className="text-sm font-mono tracking-wider text-white uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
                        What is {project.name}?
                      </h4>
                      <p className="text-white/75 leading-relaxed text-base font-light font-sans">{project.overview.what}</p>
                    </div>

                    <div className="p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/10">
                      <h4 className="text-sm font-mono tracking-wider text-white uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
                        Why It Was Developed
                      </h4>
                      <p className="text-white/75 leading-relaxed text-base font-light font-sans">{project.overview.why}</p>
                    </div>

                    <div className="p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/10">
                      <h4 className="text-sm font-mono tracking-wider text-white uppercase mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
                        The Problem It Solves
                      </h4>
                      <p className="text-white/75 leading-relaxed text-base font-light font-sans">{project.overview.problem}</p>
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
                    className="p-8 sm:p-12 space-y-8"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex justify-between items-center text-xs font-mono">
                        <span className="text-white/40">Architecture Role:</span>
                        <span className="text-white font-medium">{project.role}</span>
                      </div>
                      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex justify-between items-center text-xs font-mono">
                        <span className="text-white/40">Production Year:</span>
                        <span className="text-white font-medium">{project.year}</span>
                      </div>
                      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex justify-between items-center text-xs font-mono">
                        <span className="text-white/40">Platform Category:</span>
                        <span className="text-white font-medium">{project.category}</span>
                      </div>
                      <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex justify-between items-center text-xs font-mono">
                        <span className="text-white/40">Internal Codename:</span>
                        <span className="text-white font-medium">{project.internalCodeName}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                        <h5 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
                          Target Demographics
                        </h5>
                        <p className="text-sm text-white/75 font-light leading-relaxed">{project.overview.audience}</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                        <h5 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
                          Architectural Moat
                        </h5>
                        <p className="text-sm text-white/75 font-light leading-relaxed">{project.overview.differentiator}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION: CORE PLATFORM CAPABILITIES
          Clean, understated typography with generous 200px breathing room
      ========================================================= */}
      <section className="relative w-full py-36 md:py-48 px-6 lg:px-12 border-t border-white/10 bg-[#05070a]">
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Refined Section Header */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-20">
            <span className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase mb-3 block">
              CAPABILITIES &amp; ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
              Engineered Modules &amp; Features
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl font-sans font-light leading-relaxed">
              Every system capability is constructed for high reliability, fault tolerance, and developer satisfaction.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group p-8 rounded-2xl bg-[#0c1017]/80 hover:bg-[#10141f] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-xl hover:scale-[1.02]"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/[0.04] text-white/80 border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:border-white/30"
                  >
                    {getFeatureIcon(feature.iconName)}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed mb-6 font-sans">
                    {feature.description}
                  </p>
                </div>
                
                <div className="pt-5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>Capability // 0{i + 1}</span>
                  <span className="text-emerald-400 font-medium">Production Ready</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION: INTERFACE GALLERY & INSPECTOR
      ========================================================= */}
      <section className="relative w-full py-36 md:py-48 px-6 lg:px-12 border-t border-white/10 bg-[#06080d]/80">
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Refined Section Header */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-20">
            <span className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase mb-3 block">
              VISUAL SYSTEMS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
              Interface Gallery &amp; Inspector
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl font-sans font-light leading-relaxed">
              Explore user journeys and high-resolution architecture views. Click any item to inspect in fullscreen modal.
            </p>
          </div>

          {/* Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

      {/* =========================================================
          SECTION: INFRASTRUCTURE & DEPENDENCIES
      ========================================================= */}
      <section className="relative w-full py-36 md:py-48 px-6 lg:px-12 border-t border-white/10 bg-[#05070a]">
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Refined Section Header */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-20">
            <span className="text-xs font-mono tracking-[0.25em] text-white/40 uppercase mb-3 block">
              DEPENDENCIES &amp; RUNTIMES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white mb-4">
              Technology Stack Breakdown
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl font-sans font-light leading-relaxed">
              Carefully chosen libraries, runtimes, and databases powering {project.name}.
            </p>
          </div>

          {/* Tech Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.techStackDetailed.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-8 rounded-2xl bg-[#0c1017]/80 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    {item.category}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">
                    {item.name}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light font-sans">
                    {item.role}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Architecture Layer</span>
                  <span className="text-white/70">Verified</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION: DEPLOYMENT ACCESS & CODEBASE (CLOSING CTA)
      ========================================================= */}
      <section className="relative w-full py-36 md:py-48 px-6 lg:px-12 border-t border-white/10 bg-[#06080d]/80">
        <div className="max-w-5xl mx-auto">
          
          <div 
            className="rounded-3xl p-12 sm:p-24 text-center border relative overflow-hidden shadow-2xl"
            style={{ 
              backgroundColor: project.darkBg,
              borderColor: project.darkBorder 
            }}
          >
            <div 
              className="absolute inset-0 rounded-3xl blur-3xl pointer-events-none opacity-30"
              style={{ background: project.darkGlow }}
            />

            <div className="relative z-10">
              <span className="text-xs font-mono tracking-widest text-white/50 uppercase block mb-4">
                ACCESS &amp; CODEBASE
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-6">
                Experience {project.name}
              </h2>
              <p className="text-base sm:text-lg text-white/60 mb-12 max-w-xl mx-auto font-sans font-light leading-relaxed">
                Launch the live deployment or inspect the production codebase and automated test suites on GitHub.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-5">
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

      {/* =========================================================
          SECTION: PREVIOUS / NEXT CASE STUDY NAVIGATION
      ========================================================= */}
      <footer className="relative w-full py-24 sm:py-32 px-6 lg:px-12 border-t border-white/10 bg-[#05070a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Previous Project Card */}
            <Link
              href={`/projects/${project.prevProject.slug}`}
              className="group p-8 rounded-2xl bg-[#0c1017]/80 hover:bg-[#10141f] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between shadow-xl"
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
              className="group p-8 rounded-2xl bg-[#0c1017]/80 hover:bg-[#10141f] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between sm:text-right shadow-xl"
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

    </div>
  );
}
