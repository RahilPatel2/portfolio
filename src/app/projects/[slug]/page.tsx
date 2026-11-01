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
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
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
  FileCode,
  Box,
  History,
  DollarSign,
  Navigation as NavIcon,
  CreditCard
} from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate Static Params for all 3 flagship projects
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Rahil Pambhar",
    };
  }

  return {
    title: `${project.name} — Case Study | Rahil Pambhar`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.name} — Interactive Case Study`,
      description: project.shortDescription,
      type: "article",
    },
  };
}

// Helper icon resolver
function getFeatureIcon(iconName: string) {
  switch (iconName) {
    case "Compass": return <Compass className="w-5 h-5" />;
    case "Globe": return <Globe className="w-5 h-5" />;
    case "MapPin": return <MapPin className="w-5 h-5" />;
    case "Navigation": return <NavIcon className="w-5 h-5" />;
    case "DollarSign": return <DollarSign className="w-5 h-5" />;
    case "Sparkles": return <Sparkles className="w-5 h-5" />;
    case "ShieldCheck": return <ShieldCheck className="w-5 h-5" />;
    case "CreditCard": return <CreditCard className="w-5 h-5" />;
    case "GitBranch": return <Workflow className="w-5 h-5" />;
    case "Lock": return <Lock className="w-5 h-5" />;
    case "Workflow": return <Workflow className="w-5 h-5" />;
    case "Terminal": return <Terminal className="w-5 h-5" />;
    case "RotateCcw": return <RotateCcw className="w-5 h-5" />;
    case "LayoutDashboard": return <LayoutDashboard className="w-5 h-5" />;
    case "Key": return <Key className="w-5 h-5" />;
    case "AlertTriangle": return <AlertTriangle className="w-5 h-5" />;
    case "Code2": return <Code2 className="w-5 h-5" />;
    case "Cpu": return <Cpu className="w-5 h-5" />;
    case "Bot": return <Bot className="w-5 h-5" />;
    case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
    case "FileCode": return <FileCode className="w-5 h-5" />;
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

  // Render project-specific hero visual
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
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      {/* =========================================================
          TOP STICKY NAVBAR
      ========================================================= */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Link
            href="/#work"
            className="group flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-wider text-white/70 hover:text-white transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>BACK TO PROJECTS</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/40">
            <span>PROJECT {project.id}</span>
            <span>//</span>
            <span className="text-white/80">{project.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.03] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all"
              title="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">REPO</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-1.5 rounded-full bg-white text-black text-xs font-mono font-medium flex items-center gap-1.5 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>LIVE DEMO</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for Fixed Navbar */}
      <div className="h-16 sm:h-20" />

      {/* =========================================================
          SECTION A — HERO
      ========================================================= */}
      <section className="relative w-full pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
        {/* Ambient Project-Specific Glow */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ backgroundColor: project.color }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase bg-white/[0.05] border border-white/10 text-white/80">
              PROJECT {project.id} // {project.year}
            </span>
            <span 
              className="px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase border flex items-center gap-1.5"
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

          {/* Large Project Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[1.08] font-sans">
            {project.name}
          </h1>

          {/* Introduction Tagline */}
          <p className="text-lg sm:text-2xl font-light text-white/70 max-w-4xl mb-10 leading-relaxed">
            {project.tagline}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10">
            {project.technologies.map((tech, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-white/60 bg-white/[0.02] border border-white/10 hover:border-white/25 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-16">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-black font-mono tracking-widest text-xs uppercase font-medium hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>EXPLORE LIVE PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/40 text-white font-mono tracking-widest text-xs uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>VIEW SOURCE CODE</span>
            </a>
          </div>

          {/* Hero Visual Showcase */}
          <div className="relative w-full rounded-3xl overflow-hidden border border-white/15 p-2 sm:p-4 bg-white/[0.01] backdrop-blur-sm shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
            <div className="relative w-full">
              {renderHeroVisual(project)}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION B — PROJECT OVERVIEW & METRICS
      ========================================================= */}
      <section className="relative w-full py-16 sm:py-24 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading & Role */}
            <div className="lg:col-span-4">
              <span className="text-xs font-mono tracking-widest text-white/40 uppercase block mb-3">
                01 // DEEP DIVE
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-6">
                Project Overview &amp; Architecture
              </h2>
              <div className="space-y-4 text-xs font-mono text-white/50 border-t border-white/10 pt-6">
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="text-white/80">{project.role}</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeline:</span>
                  <span className="text-white/80">{project.year}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="text-white/80">{project.category}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Questions */}
            <div className="lg:col-span-8 space-y-8 text-white/70 font-light leading-relaxed text-base sm:text-lg">
              <div>
                <h3 className="text-sm font-mono tracking-wider text-white uppercase mb-2">
                  What is {project.name}?
                </h3>
                <p>{project.overview.what}</p>
              </div>

              <div>
                <h3 className="text-sm font-mono tracking-wider text-white uppercase mb-2">
                  Why it was developed
                </h3>
                <p>{project.overview.why}</p>
              </div>

              <div>
                <h3 className="text-sm font-mono tracking-wider text-white uppercase mb-2">
                  The Problem It Solves
                </h3>
                <p>{project.overview.problem}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
                    Target Audience
                  </h4>
                  <p className="text-sm text-white/80">{project.overview.audience}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
                    Core Differentiator
                  </h4>
                  <p className="text-sm text-white/80">{project.overview.differentiator}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-12 border-t border-white/10">
            {project.metrics.map((metric, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
              >
                <div className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
                  {metric.label}
                </div>
                <div 
                  className="text-3xl sm:text-5xl font-light tracking-tight mb-2 font-mono"
                  style={{ color: project.color }}
                >
                  {metric.value}
                </div>
                <div className="text-xs text-white/50 font-mono">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION C — PROJECT GALLERY & LIGHTBOX
      ========================================================= */}
      <section className="relative w-full py-16 sm:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start mb-12 sm:mb-16">
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
              02 // VISUAL EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
              Interface Gallery &amp; Architecture
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-2xl font-mono">
              Click any interface preview below to inspect in high-resolution interactive lightbox mode.
            </p>
          </div>

          {/* Editorial Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
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
          SECTION D — FEATURES SHOWCASE
      ========================================================= */}
      <section className="relative w-full py-16 sm:py-24 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start mb-12 sm:mb-16">
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
              03 // CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
              Core Technical Features
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-2xl font-mono">
              Every feature is architected for production reliability, user delight, and low-latency response times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${project.color}15`, 
                        borderColor: `${project.color}30`,
                        color: project.color 
                      }}
                    >
                      {getFeatureIcon(feature.iconName)}
                    </div>
                    <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/[0.03] text-white/40 border border-white/5">
                      {feature.category}
                    </span>
                  </div>

                  <h3 className="text-base font-medium text-white mb-2.5 group-hover:text-white/95 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-white/40 group-hover:text-white/70 transition-colors">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified Feature</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION E — TECHNOLOGY STACK
      ========================================================= */}
      <section className="relative w-full py-16 sm:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start mb-12 sm:mb-16">
            <span className="text-xs font-mono tracking-widest text-white/40 uppercase mb-3">
              04 // INFRASTRUCTURE
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
              Technology Stack Breakdown
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-2xl font-mono">
              Carefully chosen libraries, runtimes, and databases that power {project.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.techStackDetailed.map((item, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                    {item.role}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>Architecture Layer</span>
                  <span className="text-white/60">Production</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION F — PROJECT LINKS & REPOSITORY
      ========================================================= */}
      <section className="relative w-full py-16 sm:py-24 border-t border-white/10 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-mono tracking-widest text-white/40 uppercase block mb-3">
            05 // DEPLOYMENT ACCESS
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-6">
            Explore {project.name}
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-10 max-w-xl mx-auto font-mono">
            Launch the live deployment or inspect the production codebase and automated test suites on GitHub.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white text-black font-mono tracking-widest text-xs uppercase font-medium hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>LIVE PROJECT DEMO</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/40 text-white font-mono tracking-widest text-xs uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GITHUB REPOSITORY</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION G — PREVIOUS / NEXT PROJECT NAVIGATION
      ========================================================= */}
      <section className="relative w-full py-12 sm:py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Previous Project Card */}
            <Link
              href={`/projects/${project.prevProject.slug}`}
              className="group p-6 sm:p-8 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors mb-3">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>PREVIOUS PROJECT</span>
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
              className="group p-6 sm:p-8 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between text-right"
            >
              <div className="flex items-center justify-end gap-2 text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors mb-3">
                <span>NEXT PROJECT</span>
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

          {/* Centralized Back to Projects link */}
          <div className="text-center mt-12">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/50 hover:text-white transition-colors pb-1 border-b border-white/20 hover:border-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO MAIN PORTFOLIO WORK SECTION</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 border-t border-white/10 text-center text-xs font-mono text-white/30">
        © 2026 Rahil Pambhar · All Projects Built with Precision &amp; Thoughtful Architecture
      </footer>
    </div>
  );
}
