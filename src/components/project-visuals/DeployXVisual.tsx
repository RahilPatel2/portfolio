"use client";

import { Terminal, GitBranch, Globe, Server, CheckCircle2 } from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function DeployXVisual({ interactive = true }: VisualProps) {
  return (
    <div className="relative w-full aspect-[16/10] min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] rounded-2xl bg-[#0F0F0F] border border-white/10 overflow-hidden flex flex-col justify-between group/preview transition-all duration-500 shadow-2xl">
      
      {/* Top Window Bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#161616]">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-white/20" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
          <span className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <div className="px-4 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-white/60 tracking-wider">
          deployx.sh // project-dashboard
        </div>
        <div className="text-xs font-mono text-white/40 uppercase tracking-widest hidden sm:block">
          EDGE RUNTIME: ACTIVE
        </div>
      </div>

      {/* Main Content Area with Generous Spacing */}
      <div className="relative z-10 flex-1 grid grid-cols-1 sm:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
        
        {/* Left: Terminal Output Stream */}
        <div className="sm:col-span-7 h-full flex flex-col justify-between p-5 rounded-xl bg-[#141414] border border-white/10 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs text-white/50">
            <div className="flex items-center gap-2 text-white/80">
              <Terminal className="w-4 h-4 text-white/60" />
              <span>deployx-runner --prod</span>
            </div>
            <span>v1.4.2</span>
          </div>

          <div className="space-y-2.5 py-4 text-xs leading-relaxed">
            <div className="text-white/50 truncate">
              <span className="text-white/30 mr-3">01:42:04</span>
              <span>[git] Fetch branch origin/main (commit 4b8e21a)</span>
            </div>
            <div className="text-white/60 truncate">
              <span className="text-white/30 mr-3">01:42:05</span>
              <span>[build] Turbopack compiled 34 routes in 1.4s</span>
            </div>
            <div className="text-white/60 truncate">
              <span className="text-white/30 mr-3">01:42:07</span>
              <span>[edge] Synced 38 global edge POPs (NRT, SFO, LHR)</span>
            </div>
            <div className="text-white font-medium truncate pt-2 border-t border-white/5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
              <span>Live deployment: https://deployx-core.run</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-white/40">
            <span className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5" /> branch: main
            </span>
            <span>Zero chunk duplication</span>
          </div>
        </div>

        {/* Right: Edge Telemetry Metrics */}
        <div className="sm:col-span-5 flex flex-col justify-between h-full space-y-3.5">
          <div className="p-4 rounded-xl bg-[#161616] border border-white/5">
            <div className="text-[11px] font-mono text-white/40 uppercase mb-1">Global POP Distribution</div>
            <div className="text-xl font-mono font-medium text-white">38 Edge Nodes</div>
            <div className="text-xs font-mono text-white/50 mt-1">Automated DNS Anycast Routing</div>
          </div>

          <div className="p-4 rounded-xl bg-[#161616] border border-white/5">
            <div className="text-[11px] font-mono text-white/40 uppercase mb-1">Cold Start Latency</div>
            <div className="text-xl font-mono font-medium text-white">0ms (V8 Isolates)</div>
            <div className="text-xs font-mono text-white/50 mt-1">Global Instant Execution</div>
          </div>

          <div className="p-4 rounded-xl bg-[#161616] border border-white/5">
            <div className="text-[11px] font-mono text-white/40 uppercase mb-1">Deployment Security</div>
            <div className="text-sm font-mono font-medium text-white">TLS 1.3 · HTTPS Auto</div>
            <div className="text-xs font-mono text-white/50 mt-1">Automated Let&apos;s Encrypt</div>
          </div>
        </div>

      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 px-6 py-3.5 bg-[#141414] border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center gap-2">
          <Server className="w-3.5 h-3.5 text-white/60" />
          <span>GitHub OAuth &amp; Octokit Integrated</span>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <span>Health: 200 OK</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline">Edge: 14ms Latency</span>
        </div>
      </div>
    </div>
  );
}