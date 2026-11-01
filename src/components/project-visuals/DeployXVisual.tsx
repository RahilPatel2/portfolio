"use client";

import { motion } from "framer-motion";
import { Terminal, GitBranch, CheckCircle2, Globe, Cpu, ArrowUpRight } from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function DeployXVisual({ interactive = true }: VisualProps) {
  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px] bg-[#070b10] border border-cyan-500/20 rounded-2xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between font-mono shadow-[0_0_40px_rgba(6,182,212,0.06)] group">
      {/* Background Cyan Pulse & Cloud Edge Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Pipeline Status & Branch */}
      <div className="relative z-10 flex items-center justify-between border-b border-cyan-500/15 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-medium text-cyan-200/90 tracking-wider flex items-center gap-1.5">
              DEPLOYX CI/CD PIPELINE
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div className="text-[10px] text-white/40 flex items-center gap-1.5">
              <GitBranch className="w-2.5 h-2.5 text-cyan-400" />
              <span>main · commit 9a8c1f0</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] tracking-widest bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
            PRODUCTION READY
          </span>
          <span className="hidden sm:inline-flex px-2 py-1 rounded-md text-[10px] text-white/50 bg-white/[0.03] border border-white/10">
            Next.js 15
          </span>
        </div>
      </div>

      {/* Middle: Live Streaming Build Terminal Output */}
      <motion.div 
        whileHover={interactive ? { borderColor: "rgba(6,182,212,0.4)" } : {}}
        className="relative z-10 my-3.5 bg-black/60 border border-white/10 rounded-xl p-3.5 sm:p-4 text-xs font-mono backdrop-blur-md flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[10px] text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            <span className="ml-1 text-white/60">build-stdout.log</span>
          </div>
          <span className="text-cyan-400/80">Edge Region: BOM (0.24ms)</span>
        </div>

        <div className="space-y-1.5 text-[11px] leading-relaxed">
          <div className="flex items-center gap-2 text-white/50">
            <span className="text-cyan-400">01.02s</span>
            <span>Cloning repository from github.com/user/prod-app...</span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <span className="text-cyan-400">03.45s</span>
            <span>Framework detected: <strong className="text-white">Next.js 15 (App Router)</strong></span>
          </div>
          <div className="flex items-center gap-2 text-white/50">
            <span className="text-cyan-400">08.12s</span>
            <span>Generating static pages and compiling serverless functions...</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="text-cyan-400">14.88s</span>
            <span>✓ Build completed in 14.88s. Deploying to Cloudflare Edge CDN.</span>
          </div>
        </div>

        {/* Live URL Pill */}
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-cyan-300">
            <Globe className="w-3 h-3 text-cyan-400" />
            <span className="truncate">https://prod-app.deployx.app</span>
          </div>
          <span className="text-[9px] text-white/40 flex items-center gap-0.5 group-hover:text-cyan-300 transition-colors">
            Inspect Deploy <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </motion.div>

      {/* Bottom Bar: Telemetry & Instant Rollback Status */}
      <div className="relative z-10 pt-3 border-t border-cyan-500/15 flex flex-wrap items-center justify-between gap-2 text-[10px] text-white/50">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-white/70">
            <Cpu className="w-3 h-3 text-cyan-400" /> CPU: 42ms
          </span>
          <span className="hidden sm:inline-block w-1 h-1 bg-white/20 rounded-full" />
          <span className="text-white/60">Memory: 128 MB</span>
          <span className="hidden sm:inline-block w-1 h-1 bg-white/20 rounded-full" />
          <span className="text-emerald-400">200 OK (100% Health)</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-300/80">
          <span>Rollback Available</span>
          <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-[9px] text-cyan-300 border border-cyan-500/20">Active v2.4</span>
        </div>
      </div>
    </div>
  );
}
