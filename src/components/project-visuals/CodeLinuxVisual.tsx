"use client";

import { Code2, Cpu, CheckCircle2, Bot, Layers } from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function CodeLinuxVisual({ interactive = true }: VisualProps) {
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
          codelynx.ai // solution.ts
        </div>
        <div className="text-xs font-mono text-white/40 uppercase tracking-widest hidden sm:block">
          LINUX SANDBOX: ONLINE
        </div>
      </div>

      {/* Main Content Area with Generous Spacing */}
      <div className="relative z-10 flex-1 grid grid-cols-1 sm:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
        
        {/* Left: Code Editor View */}
        <div className="sm:col-span-7 h-full flex flex-col justify-between p-5 rounded-xl bg-[#141414] border border-white/10 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs text-white/50">
            <div className="flex items-center gap-2 text-white/80">
              <Code2 className="w-4 h-4 text-white/60" />
              <span>TypeScript 5.4 · Monaco Engine</span>
            </div>
            <span>O(N) Algorithm</span>
          </div>

          <pre className="py-4 text-xs leading-relaxed overflow-x-auto text-white/85">
            <code>
              <span className="text-white/40">// AI Algorithmic Optimization Engine</span>{"\n"}
              <span className="text-white font-medium">function</span>{" "}
              <span className="text-white">twoSum</span>(nums:{" "}
              <span className="text-white/60">number[]</span>, target:{" "}
              <span className="text-white/60">number</span>):{" "}
              <span className="text-white/60">number[]</span> {"{"}{"\n"}
              {"  "}const cache = new Map&lt;number, number&gt;();{"\n"}
              {"  "}for (let i = 0; i &lt; nums.length; i++) {"{"}{"\n"}
              {"    "}const complement = target - nums[i];{"\n"}
              {"    "}if (cache.has(complement)) return [cache.get(complement)!, i];{"\n"}
              {"    "}cache.set(nums[i], i);{"\n"}
              {"  "}{"}"}{"\n"}
              {"  "}return [];{"\n"}
              {"}"}
            </code>
          </pre>

          <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-white/40">
            <span className="flex items-center gap-2 text-white/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              Compilation: Clang -O3 Verified
            </span>
            <span>UTF-8 · LF</span>
          </div>
        </div>

        {/* Right: Algorithmic Complexity Metrics */}
        <div className="sm:col-span-5 flex flex-col justify-between h-full space-y-3.5">
          <div className="p-4 rounded-xl bg-[#161616] border border-white/5">
            <div className="text-[11px] font-mono text-white/40 uppercase mb-1">Time Complexity</div>
            <div className="text-xl font-mono font-medium text-white">O(N) Linear</div>
            <div className="text-xs font-mono text-white/50 mt-1">Refactored from O(N²) Quadratic</div>
          </div>

          <div className="p-4 rounded-xl bg-[#161616] border border-white/5">
            <div className="text-[11px] font-mono text-white/40 uppercase mb-1">Space Complexity</div>
            <div className="text-xl font-mono font-medium text-white">O(N) Hash Cache</div>
            <div className="text-xs font-mono text-white/50 mt-1">Minimal Auxiliary Allocation</div>
          </div>

          <div className="p-4 rounded-xl bg-[#161616] border border-white/5">
            <div className="text-[11px] font-mono text-white/40 uppercase mb-1">Judge0 Sandbox Speed</div>
            <div className="text-sm font-mono font-medium text-white">0.8ms Execution</div>
            <div className="text-xs font-mono text-white/50 mt-1">Linux Container Isolated</div>
          </div>
        </div>

      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 px-6 py-3.5 bg-[#141414] border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 text-white/60" />
          <span>Google Gemini &amp; AST Engine Integrated</span>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <span>Tests: 12/12 Passed</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline">Memory: 12.4 MB</span>
        </div>
      </div>
    </div>
  );
}