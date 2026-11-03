"use client";

import { Code2, Cpu, CheckCircle2, Bot, Layers } from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function CodeLinuxVisual({ interactive = true }: VisualProps) {
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
          codelynx.ai // solution.ts
        </div>
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden sm:block">
          LINUX SANDBOX: ONLINE
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col gap-4">
        
        {/* Code Editor View */}
        <div className="w-full p-4 rounded-lg bg-[#141414] border border-white/10 font-mono text-xs">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/5 text-[11px] text-white/40">
            <div className="flex items-center gap-2 text-white/80">
              <Code2 className="w-3.5 h-3.5 text-white/50" />
              <span>TypeScript 5.4 · Monaco Engine</span>
            </div>
            <span>O(N) Algorithm</span>
          </div>

          <pre className="py-3 text-xs leading-relaxed overflow-x-auto text-white/85">
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
        </div>

        {/* Complexity Analysis Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-[#141414] border border-white/5">
            <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Time Complexity</div>
            <div className="text-base sm:text-lg font-mono font-medium text-white">O(N) Linear</div>
            <div className="text-[10px] font-mono text-white/50 mt-0.5">Refactored from O(N²)</div>
          </div>

          <div className="p-3 rounded-lg bg-[#141414] border border-white/5">
            <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Space Complexity</div>
            <div className="text-base sm:text-lg font-mono font-medium text-white">O(N) Hash Cache</div>
            <div className="text-[10px] font-mono text-white/50 mt-0.5">Single-Pass Table</div>
          </div>

          <div className="p-3 rounded-lg bg-[#141414] border border-white/5 col-span-2 sm:col-span-1">
            <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Execution Speed</div>
            <div className="text-base sm:text-lg font-mono font-medium text-white">0.8ms Linux</div>
            <div className="text-[10px] font-mono text-white/50 mt-0.5">Judge0 Sandbox</div>
          </div>
        </div>

      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 px-4 sm:px-6 py-2.5 bg-[#141414] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 text-white/60" />
          <span>Google Gemini &amp; AST Engine Integrated</span>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <span>Tests: 12/12 Passed</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline">Memory: 12.4 MB</span>
        </div>
      </div>
    </div>
  );
}