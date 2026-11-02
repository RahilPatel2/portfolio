"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  GitBranch, 
  CheckCircle2, 
  RotateCw, 
  Globe2, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  ExternalLink,
  Zap,
  Server
} from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function DeployXVisual({ interactive = true }: VisualProps) {
  const [activeBranch, setActiveBranch] = useState<"main" | "feature-edge">("main");
  const [deployState, setDeployState] = useState<"idle" | "building" | "live">("live");
  const [buildStep, setBuildStep] = useState(4);
  const [logs, setLogs] = useState<string[]>([
    "✓ Fetched git commit 9b8c21a (feat: edge dynamic routing)",
    "✓ Turbopack compiled 34 client/server routes in 1.4s",
    "✓ Prerendered static pages (3/3 SSG routes generated)",
    "✓ Synced 38 Global Edge POPs across Cloudflare network",
    "🚀 DEPLOYMENT LIVE -> https://deployx-core.run (0ms cold start)"
  ]);

  const triggerDeploy = () => {
    if (deployState === "building") return;
    setDeployState("building");
    setBuildStep(1);
    setLogs(["⚡ Initiating automated CI/CD pipeline..."]);

    setTimeout(() => {
      setBuildStep(2);
      setLogs(prev => [...prev, "✓ Cloning repository from GitHub OAuth Octokit"]);
    }, 400);

    setTimeout(() => {
      setBuildStep(3);
      setLogs(prev => [...prev, "✓ Turbopack compiled bundle: 148kB gzip (Zero Chunk Duplication)"]);
    }, 900);

    setTimeout(() => {
      setBuildStep(4);
      setLogs(prev => [
        ...prev, 
        "✓ Distributed across 38 Edge Nodes (NRT, SFO, LHR, FRA)",
        "🚀 DEPLOYMENT LIVE -> https://deployx.app/preview-7f9a (22ms latency)"
      ]);
      setDeployState("live");
    }, 1500);
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#051119] via-[#03090e] to-[#010406] border border-cyan-500/20 overflow-hidden p-4 sm:p-6 text-white shadow-[0_20px_60px_-15px_rgba(6,182,212,0.15)] flex flex-col justify-between group">
      
      {/* Background Animated Cyan Mesh & Sparkline Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none animate-pulse-ring" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Header: Platform Cockpit & Actions */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Server className="w-5 h-5 text-cyan-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-cyan-300">
                DEPLOYX CLUSTER
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                deployState === "building"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              }`}>
                {deployState === "building" ? "BUILDING PIPELINE..." : "38 NODES HEALTHY"}
              </span>
            </div>
            <p className="text-[11px] font-mono text-white/50">Production Deployment · us-west-1 &amp; Global Edge</p>
          </div>
        </div>

        {/* Interactive Actions: Branch Selector & Trigger Deploy */}
        {interactive && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setActiveBranch("main")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                  activeBranch === "main"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <GitBranch className="w-3 h-3" />
                <span>main</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveBranch("feature-edge")}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                  activeBranch === "feature-edge"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <GitBranch className="w-3 h-3" />
                <span>feat/edge</span>
              </button>
            </div>

            <button
              type="button"
              onClick={triggerDeploy}
              disabled={deployState === "building"}
              className="px-3 py-1.5 rounded-xl bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-300 border border-cyan-400/50 hover:border-cyan-300 text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] active:scale-95 disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${deployState === "building" ? "animate-spin text-cyan-300" : ""}`} />
              <span>{deployState === "building" ? "BUILDING..." : "REDEPLOY"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Middle Interactive Section: Live Streaming Terminal Console */}
      <div className="relative z-10 my-4 sm:my-5 rounded-xl bg-black/70 border border-cyan-500/30 p-3 sm:p-4 backdrop-blur-md font-mono overflow-hidden shadow-[inset_0_1px_2px_rgba(6,182,212,0.2)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 text-[11px] text-white/50">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-white/70 ml-2">deployx-runner --env=production</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[10px]">CPU 1.2% · RAM 86MB</span>
          </div>
        </div>

        {/* Live Build Stepper */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { step: 1, label: "Fetch Repo" },
            { step: 2, label: "Build Next.js" },
            { step: 3, label: "Edge Sync" },
            { step: 4, label: "Live DNS" }
          ].map((s) => {
            const isDone = buildStep >= s.step;
            const isCurrent = buildStep === s.step && deployState === "building";
            return (
              <div 
                key={s.step}
                className={`p-1.5 rounded-lg border text-center transition-all ${
                  isCurrent
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 animate-pulse"
                    : isDone
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-white/[0.02] border-white/5 text-white/30"
                }`}
              >
                <div className="text-[9px] font-mono uppercase tracking-widest">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Terminal Log Stream */}
        <div className="space-y-1.5 min-h-[96px] text-xs">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`leading-relaxed truncate ${
                log.includes("LIVE") 
                  ? "text-emerald-400 font-semibold"
                  : log.includes("Turbopack")
                  ? "text-cyan-300"
                  : "text-white/70"
              }`}
            >
              <span className="text-cyan-500/70 mr-1.5">&gt;</span>
              {log}
            </motion.div>
          ))}
          {deployState === "building" && (
            <div className="flex items-center gap-1.5 text-cyan-400 text-xs animate-pulse">
              <span>Streaming edge deployment telemetry...</span>
            </div>
          )}
        </div>
      </div>

      {/* Global Edge Node Telemetry Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        {[
          { city: "Tokyo NRT", ping: "14ms", status: "Optimal" },
          { city: "SF SFO", ping: "9ms", status: "Optimal" },
          { city: "Frankfurt FRA", ping: "21ms", status: "Optimal" },
          { city: "London LHR", ping: "18ms", status: "Optimal" },
        ].map((node, idx) => (
          <div 
            key={idx}
            className="p-2.5 rounded-xl bg-white/[0.025] border border-white/10 hover:border-cyan-500/40 transition-colors backdrop-blur-sm"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 mb-1">
              <span>{node.city}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono text-white/50">
              <span>Latency: <strong className="text-white">{node.ping}</strong></span>
              <span className="text-emerald-400/80">{node.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
        <div className="flex items-center gap-2">
          <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>SSL/TLS Automated Let&apos;s Encrypt &amp; HTTP/3</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-300">
          <Zap className="w-3 h-3 text-cyan-400" />
          <span>Cold Start: 0ms (V8 Isolates)</span>
        </div>
      </div>
    </div>
  );
}