"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Bot, TrendingUp, CheckCircle, Play } from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function CodeLinuxVisual({ interactive = true }: VisualProps) {
  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px] bg-[#0c0812] border border-purple-500/20 rounded-2xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between font-mono shadow-[0_0_40px_rgba(168,85,247,0.06)] group">
      {/* Background Cyber Violet Grid & Neon Atmosphere */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: IDE Title & Big-O Complexity Badge */}
      <div className="relative z-10 flex items-center justify-between border-b border-purple-500/15 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-medium text-purple-200/90 tracking-wider flex items-center gap-1.5">
              CODELYNX CLOUD IDE
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-white/40 flex items-center gap-1.5">
              <span>solution.cpp · C++ 20 (GCC)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1">
            <TrendingUp className="w-2.5 h-2.5 text-purple-400" />
            COMPLEXITY: O(N)
          </span>
          <span className="hidden sm:inline-flex px-2 py-1 rounded-md text-[10px] text-white/50 bg-white/[0.03] border border-white/10">
            Sandbox: Judge0
          </span>
        </div>
      </div>

      {/* Middle: Code Editor & AI Diff Inspector Split */}
      <div className="relative z-10 my-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Editor Pane */}
        <motion.div 
          whileHover={interactive ? { borderColor: "rgba(168,85,247,0.4)" } : {}}
          className="bg-black/60 border border-white/10 rounded-xl p-3 sm:p-3.5 backdrop-blur-md flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[10px] text-white/40">
            <span className="text-purple-300/80">editor / active-file</span>
            <span className="text-emerald-400 flex items-center gap-1"><Play className="w-2.5 h-2.5 fill-current" /> Compiled 0.04s</span>
          </div>

          <div className="space-y-1 text-[11px] leading-relaxed text-white/70">
            <div><span className="text-purple-400">vector&lt;int&gt;</span> twoSum(<span className="text-purple-400">vector&lt;int&gt;&amp;</span> nums, <span className="text-purple-400">int</span> target) &#123;</div>
            <div className="pl-3 text-emerald-400/90 font-medium">+ unordered_map&lt;int, int&gt; mp;</div>
            <div className="pl-3 text-white/60">for (<span className="text-purple-400">int</span> i = 0; i &lt; nums.size(); ++i) &#123;</div>
            <div className="pl-6 text-white/60"><span className="text-purple-400">int</span> complement = target - nums[i];</div>
            <div className="pl-6 text-emerald-400/90 font-medium">+ if (mp.count(complement)) return &#123;mp[complement], i&#125;;</div>
            <div className="pl-6 text-white/60">mp[nums[i]] = i;</div>
            <div className="pl-3 text-white/60">&#125;</div>
            <div>&#125;</div>
          </div>
        </motion.div>

        {/* AI Insight & Complexity Pane */}
        <motion.div 
          whileHover={interactive ? { borderColor: "rgba(168,85,247,0.4)" } : {}}
          className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3 sm:p-3.5 backdrop-blur-md flex flex-col justify-between"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-500/10 text-[10px]">
            <span className="text-purple-300 font-medium flex items-center gap-1.5">
              <Bot className="w-3 h-3 text-purple-400" />
              AI Mistake Inspector
            </span>
            <span className="text-emerald-400">Test Cases: 14/14 Passed</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="p-2 rounded bg-black/40 border border-purple-500/15">
              <div className="text-[10px] text-purple-300/80 mb-0.5">Asymptotic Optimization:</div>
              <div className="flex items-center justify-between text-white/80">
                <span>Time: <span className="line-through text-red-400">O(N²)</span> → <strong className="text-emerald-400">O(N)</strong></span>
                <span>Space: <strong className="text-purple-300">O(N)</strong></span>
              </div>
            </div>

            <p className="text-[10.5px] text-white/60 leading-normal">
              Replaced brute-force nested iteration with a single-pass hash map. Reduced auxiliary runtime by 98.2% on boundary vectors.
            </p>
          </div>

          <div className="mt-2 pt-2 border-t border-purple-500/10 flex items-center justify-between text-[9px] text-purple-300/80">
            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> Diff Approved</span>
            <span>Gemini 2.5 AI Model</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Telemetry & Compiler Sandbox Status */}
      <div className="relative z-10 pt-3 border-t border-purple-500/15 flex flex-wrap items-center justify-between gap-2 text-[10px] text-white/50">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-white/70">
            <Cpu className="w-3 h-3 text-purple-400" /> Isolated Sandbox: Safe
          </span>
          <span className="hidden sm:inline-block w-1 h-1 bg-white/20 rounded-full" />
          <span className="text-white/60">Memory Peak: 14.2 MB</span>
        </div>
        <div className="flex items-center gap-2 text-purple-300/80">
          <span>Multi-Language Engine</span>
          <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-[9px] text-purple-300 border border-purple-500/20">10 Compilers</span>
        </div>
      </div>
    </div>
  );
}
