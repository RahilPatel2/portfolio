"use client";

import { Terminal, GitBranch, Globe, Server, CheckCircle2 } from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function DeployXVisual({ interactive = true }: VisualProps) {
  return (
    <div className="relative w-full rounded-xl bg-[#0D0D0D] border border-white/10 overflow-hidden flex flex-col justify-between group/preview transition-all duration-500 shadow-2xl">
      
      {/* Top Browser Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#141414]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/60 tracking-wider">
          deployx.sh // project-dashboard
        </div>
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden sm:block">
          EDGE RUNTIME: ACTIVE
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col gap-4">
        
        {/* Terminal Console Output */}
        <div className="w-full p-4 rounded-lg bg-[#141414] border border-white/10 font-mono text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/5 text-[11px] text-white/40">
            <div className="flex items-center gap-2 text-white/80">
              <Terminal className="w-3.5 h-3.5 text-white/50" />
              <span>deployx-runner --env=production</span>
            </div>
            <span>v1.4.2</span>
          </div>

          <div className="space-y-2 py-3 text-xs leading-relaxed">
            <div className="text-white/50 truncate">
              <span className="text-white/30 mr-2.5">01:42:04</span>
              <span>[git] Fetch branch origin/main (commit 4b8e21a)</span>
            </div>
            <div className="text-white/60 truncate">
              <span className="text-white/30 mr-2.5">01:42:05</span>
              <span>[build] Turbopack compiled 34 routes in 1.4s</span>
            </div>
            <div className="text-white/60 truncate">
              <span className="text-white/30 mr-2.5">01:42:07</span>
              <span>[edge] Synced 38 global edge POPs (NRT, SFO, LHR)</span>
            </div>
            <div className="text-white font-medium truncate pt-1.5 border-t border-white/5 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
              <span>Live deployment: https://deployx-core.run</span>
            </div>
          </div>
        </div>

        {/* Infrastructure Metrics Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-[#141414] border border-white/5">
            <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Global POPs</div>
            <div className="text-base sm:text-lg font-mono font-medium text-white">38 Edge Nodes</div>
            <div className="text-[10px] font-mono text-white/50 mt-0.5">DNS Anycast</div>
          </div>

          <div className="p-3 rounded-lg bg-[#141414] border border-white/5">
            <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Cold Start</div>
            <div className="text-base sm:text-lg font-mono font-medium text-white">0ms (V8)</div>
            <div className="text-[10px] font-mono text-white/50 mt-0.5">Isolates Run</div>
          </div>

          <div className="p-3 rounded-lg bg-[#141414] border border-white/5 col-span-2 sm:col-span-1">
            <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Security</div>
            <div className="text-base sm:text-lg font-mono font-medium text-white">TLS 1.3 Auto</div>
            <div className="text-[10px] font-mono text-white/50 mt-0.5">Let&apos;s Encrypt</div>
          </div>
        </div>

      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 px-4 sm:px-6 py-2.5 bg-[#141414] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-2">
          <Server className="w-3.5 h-3.5 text-white/60" />
          <span>GitHub OAuth &amp; Octokit Integrated</span>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <span>Health: 200 OK</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline">Edge: 14ms Latency</span>
        </div>
      </div>
    </div>
  );
}