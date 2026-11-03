import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { projectsData, getProjectBySlug, ProjectData } from "@/data/projects";
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
  CheckCircle2, 
  Cpu, 
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
  Zap,
  Activity,
  Server,
  Layers,
  ShieldCheck
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} — Technical Case Study | Rahil Patel`,
    description: project.tagline,
  };
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
    case "CheckCircle2": return <CheckCircle2 className="w-5 h-5" />;
    case "Box": return <Box className="w-5 h-5" />;
    case "History": return <History className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const renderHeroVisual = (p: ProjectData) => {
    if (p.slug === "ai-planner-specification") {
      return <RoamlyVisual interactive={true} />;
    }
    if (p.slug === "deployx") {
      return <DeployXVisual interactive={true} />;
    }
    return <CodeLinuxVisual interactive={true} />;
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-white selection:bg-white/20 selection:text-white">
      {/* Dynamic Project-Specific Subtle Ambient Dark Glow */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-30 -z-10"
        style={{ background: project.darkGlow }}
      />
      
      {/* =========================================================
          TOP STICKY NAVBAR
      ========================================================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#06080d]/85 backdrop-blur-2xl border-b border-white/10 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          <Link
            href="/#work"
            className="group flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-wider text-white/70 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>BACK TO PORTFOLIO</span>
          </Link>

          <div className="hidden md:flex items-center gap-3 text-xs font-mono">
            <span className={`px-2.5 py-0.5 rounded-full border text-[11px] ${project.badgeStyle}`}>
              PROJECT 0{project.id}
            </span>
            <span className="text-white/80 font-medium">{project.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/15 text-white/80 hover:text-white text-xs font-mono flex items-center gap-2 transition-all"
              title="GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SOURCE</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-white text-black text-xs font-mono font-medium flex items-center gap-2 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>LIVE DEMO</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Clean Navbar Spacer */}
      <div className="h-20 sm:h-24" />

      {/* =========================================================
          SECTION A — EDITORIAL HERO
      ========================================================= */}
      <header className="relative w-full pt-12 sm:pt-20 pb-20 sm:pb-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          
          {/* Top Telemetry Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase border ${project.badgeStyle}`}>
              PROJECT 0{project.id} // {project.year}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase border border-white/10 bg-white/[0.03] text-white/70">
              {project.category}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-white/60 bg-white/[0.02] border border-white/10">
              <Activity className="w-3 h-3 text-white/50" />
              <span>PRODUCTION ARCHITECTURE</span>
            </span>
          </div>

          {/* Large Editorial Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[1.08] font-sans">
            {project.name}
          </h1>

          {/* Tagline Narrative */}
          <p className="text-lg sm:text-2xl font-light text-white/75 max-w-4xl mb-10 leading-relaxed font-sans">
            {project.tagline}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5 mb-10">
            {project.technologies.map((tech, i) => (
              <span 
                key={i}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono text-white/80 bg-white/[0.04] border border-white/10 hover:border-white/30 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-black font-mono tracking-widest text-xs uppercase font-medium hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(255,255,255,0.25)] flex items-center gap-2.5 group/btn"
            >
              <Globe className="w-4 h-4" />
              <span>EXPLORE LIVE APPLICATION</span>
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/35 text-white font-mono tracking-widest text-xs uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>VIEW SOURCE CODE</span>
            </a>
          </div>

        </div>
      </header>

      {/* =========================================================
          SECTION 01 — DEDICATED LIVE ARCHITECTURE SIMULATOR
          Spacious, distinct, not colliding with any section
      ========================================================= */}
      <section className="relative w-full py-20 sm:py-32 border-t border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Chapter Header */}
          <div className="flex flex-col items-start mb-12 sm:mb-16">
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              01 // LIVE ARCHITECTURE SIMULATOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
              Interactive System Environment
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl font-mono leading-relaxed">
              Test live operations, observe runtime state changes, and inspect execution telemetry directly within the simulated hardware container below.
            </p>
          </div>

          {/* Luxury Frame Container with Project Dark Tone */}
          <div className="relative w-full">
            {/* Ambient Dark Glow */}
            <div 
              className="absolute -inset-4 rounded-3xl blur-3xl pointer-events-none opacity-40"
              style={{ background: project.darkGlow }}
            />

            <div 
              className="relative rounded-2xl overflow-hidden border shadow-2xl transition-all duration-500"
              style={{ 
                backgroundColor: project.darkBg,
                borderColor: project.darkBorder 
              }}
            >
              {renderHeroVisual(project)}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 02 — SYSTEM OVERVIEW & ENGINEERING BLUEPRINT
      ========================================================= */}
      <section className="relative w-full py-24 sm:py-36 border-t border-white/10 bg-[#07090f]/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Chapter Header */}
          <div className="flex flex-col items-start mb-16 sm:mb-20">
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
              02 // ENGINEERING BLUEPRINT
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
              System Architecture &amp; Purpose
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl font-mono leading-relaxed">
              Detailed breakdown of why {project.name} was engineered and how its technical foundation is structured.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Metadata & System Specs Card */}
            <div className="lg:col-span-4 p-8 rounded-2xl bg-[#0c1017]/80 border border-white/10 shadow-xl">
              <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase block mb-4">
                SPECIFICATION MATRIX
              </span>
              <h3 className="text-lg font-medium text-white mb-6">
                System Telemetry
              </h3>

              <div className="space-y-4 text-xs font-mono text-white/60 border-t border-white/10 pt-6">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-white/40">Architecture Role:</span>
                  <span className="text-white font-medium text-right">{project.role}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-white/40">Production Year:</span>
                  <span className="text-white font-medium">{project.year}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-white/40">Category:</span>
                  <span className="text-white font-medium text-right">{project.category}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-white/40">Code Name:</span>
                  <span className="text-white font-medium">{project.internalCodeName}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-white/40">Deployment Target:</span>
                  <span className="text-emerald-400 font-medium">Global Edge Network</span>
                </div>
              </div>
            </div>

            {/* Right Column: In-depth Technical Narrative */}
            <div className="lg:col-span-8 space-y-6 text-white/80 font-light leading-relaxed text-base sm:text-lg">
              
              <div className="p-8 rounded-2xl bg-[#0c1017]/60 border border-white/10 hover:border-white/20 transition-all">
                <h4 className="text-sm font-mono tracking-wider text-white uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                  What is {project.name}?
                </h4>
                <p className="text-white/75 leading-relaxed text-base">{project.overview.what}</p>
              </div>

              <div className="p-8 rounded-2xl bg-[#0c1017]/60 border border-white/10 hover:border-white/20 transition-all">
                <h4 className="text-sm font-mono tracking-wider text-white uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                  Why It Was Developed
                </h4>
                <p className="text-white/75 leading-relaxed text-base">{project.overview.why}</p>
              </div>

              <div className="p-8 rounded-2xl bg-[#0c1017]/60 border border-white/10 hover:border-white/20 transition-all">
                <h4 className="text-sm font-mono tracking-wider text-white uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                  The Problem It Solves
                </h4>
                <p className="text-white/75 leading-relaxed text-base">{project.overview.problem}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-6 rounded-2xl bg-[#0c1017]/50 border border-white/10">
                  <h5 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
                    Target Demographics
                  </h5>
                  <p className="text-sm text-white/70 font-light leading-relaxed">{project.overview.audience}</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#0c1017]/50 border border-white/10">
                  <h5 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
                    Architectural Edge
                  </h5>
                  <p className="text-sm text-white/70 font-light leading-relaxed">{project.overview.differentiator}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Key Architecture Performance Metrics (KPIs) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-16 border-t border-white/10">
            {project.metrics.map((metric, i) => (
              <div 
                key={i}
                className="p-8 rounded-2xl bg-[#0c1017]/70 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between shadow-lg"
              >
                <div className="text-xs font-mono tracking-widest text-white/40 uppercase mb-4">
                  {metric.label}
                </div>
                <div 
                  className="text-3xl sm:text-5xl font-light tracking-tight mb-3 font-mono"
                  style={{ color: project.accentColor }}
                >
                  {metric.value}
                </div>
                <div className="text-xs text-white/60 font-mono">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 03 — VISUAL ARCHITECTURE & INTERFACE GALLERY
      ========================================================= */}
      <section className="relative w-full py-24 sm:py-36 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Chapter Header */}
          <div className="flex flex-col items-start mb-16 sm:mb-20">
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
              03 // VISUAL ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
              Interface Gallery &amp; Lightbox Inspector
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl font-mono leading-relaxed">
              Explore user flows and console views in detail. Click any interface card below to open the interactive high-resolution lightbox inspector.
            </p>
          </div>

          {/* Spacious Editorial Grid */}
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
          SECTION 04 — CORE CAPABILITIES (PLATFORM FEATURES)
      ========================================================= */}
      <section className="relative w-full py-24 sm:py-36 border-t border-white/10 bg-[#07090f]/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Chapter Header */}
          <div className="flex flex-col items-start mb-16 sm:mb-20">
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
              04 // CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
              Engineered Capabilities &amp; Features
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl font-mono leading-relaxed">
              Every feature below is engineered from the ground up for stability, scalability, and modern developer experience.
            </p>
          </div>

          {/* Spacious Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.features.map((feature, i) => (
              <div 
                key={i}
                className="group p-8 rounded-2xl bg-[#0c1017]/80 hover:bg-[#10141f] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-white/[0.04] text-white/80 border border-white/10 transition-all duration-300 group-hover:scale-105 group-hover:border-white/30"
                  >
                    {getFeatureIcon(feature.iconName)}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>Capability // 0{i + 1}</span>
                  <span className="text-emerald-400 font-medium">Production Ready</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 05 — INFRASTRUCTURE & TECHNOLOGY STACK
      ========================================================= */}
      <section className="relative w-full py-24 sm:py-36 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Chapter Header */}
          <div className="flex flex-col items-start mb-16 sm:mb-20">
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
              05 // INFRASTRUCTURE &amp; DEPENDENCIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
              Technology Stack Breakdown
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl font-mono leading-relaxed">
              Carefully chosen libraries, runtimes, and databases powering {project.name}.
            </p>
          </div>

          {/* Spacious Tech Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.techStackDetailed.map((item, i) => (
              <div 
                key={i}
                className="p-7 rounded-2xl bg-[#0c1017]/80 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    {item.category}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    {item.role}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>Architecture Layer</span>
                  <span className="text-white/70">Verified</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 06 — DEPLOYMENT ACCESS & VERIFICATION (CTA)
      ========================================================= */}
      <section className="relative w-full py-28 sm:py-40 border-t border-white/10 bg-[#07090f]/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div 
            className="rounded-3xl p-10 sm:p-20 text-center border relative overflow-hidden shadow-2xl"
            style={{ 
              backgroundColor: project.darkBg,
              borderColor: project.darkBorder 
            }}
          >
            {/* Ambient Dark Glow */}
            <div 
              className="absolute inset-0 rounded-3xl blur-3xl pointer-events-none opacity-30"
              style={{ background: project.darkGlow }}
            />

            <div className="relative z-10">
              <span className="text-xs font-mono tracking-widest text-white/50 uppercase block mb-4">
                06 // DEPLOYMENT ACCESS &amp; CODEBASE
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-6">
                Experience {project.name}
              </h2>
              <p className="text-sm sm:text-base text-white/60 mb-10 max-w-xl mx-auto font-mono leading-relaxed">
                Launch the live edge deployment or inspect the production codebase and automated test suites on GitHub.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-9 py-4 rounded-full bg-white text-black font-mono tracking-widest text-xs uppercase font-medium hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_35px_rgba(255,255,255,0.25)] flex items-center gap-2.5"
                >
                  <Globe className="w-4 h-4" />
                  <span>LIVE PROJECT DEMO</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-9 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/40 text-white font-mono tracking-widest text-xs uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
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
          SECTION 07 — PREVIOUS / NEXT CASE STUDY NAVIGATION
      ========================================================= */}
      <footer className="relative w-full py-20 sm:py-28 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h3 className="text-xl sm:text-2xl font-light text-white group-hover:text-white transition-colors">
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
                <h3 className="text-xl sm:text-2xl font-light text-white group-hover:text-white transition-colors">
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
