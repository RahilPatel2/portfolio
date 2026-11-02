"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Play, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  Layers, 
  RotateCcw,
  Cpu,
  Terminal as TermIcon
} from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

const SNIPPETS = {
  typescript: {
    lang: "TypeScript",
    initialCode: `// Target: Find Two Sum in array
function twoSum(nums: number[], target: number): number[] {
  // ⚠️ Warning: O(N²) quadratic nested scan
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [];
}`,
    optimizedCode: `// ⚡ AI Optimized with HashMap O(N) linear time
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement)!, i];
    map.set(nums[i], i);
  }
  return [];
}`,
    initialComplexity: "O(N²)",
    optimizedComplexity: "O(N)",
    speedup: "14.2x Faster",
    testRunOutput: "✓ Solution verified. Input: [2, 7, 11, 15] target=9 -> Output: [0, 1] (0.6ms)"
  },
  python: {
    lang: "Python",
    initialCode: `# Target: Longest Substring Without Repeating
def lengthOfLongestSubstring(s: str) -> int:
  # ⚠️ Inefficient brute-force slice checks
  res = 0
  for i in range(len(s)):
    for j in range(i, len(s)):
      if len(set(s[i:j+1])) == (j - i + 1):
        res = max(res, j - i + 1)
  return res`,
    optimizedCode: `# ⚡ AI Optimized sliding window algorithm O(N)
def lengthOfLongestSubstring(s: str) -> int:
  char_map = {}
  left = max_len = 0
  for right, char in enumerate(s):
    if char in char_map and char_map[char] >= left:
      left = char_map[char] + 1
    char_map[char] = right
    max_len = max(max_len, right - left + 1)
  return max_len`,
    initialComplexity: "O(N³)",
    optimizedComplexity: "O(N)",
    speedup: "28.5x Faster",
    testRunOutput: "✓ Solution verified. Input: 'abcabcbb' -> Output: 3 (0.4ms)"
  },
  cpp: {
    lang: "C++ 20",
    initialCode: `// Target: Binary Tree Maximum Path Sum
int maxPathSum(TreeNode* root) {
  // ⚠️ Recursive re-computation without memo
  if (!root) return 0;
  int left = max(0, maxPathSum(root->left));
  int right = max(0, maxPathSum(root->right));
  return root->val + max(left, right);
}`,
    optimizedCode: `// ⚡ AI Cache with Single-Pass DFS O(N)
int maxSum = INT_MIN;
int dfs(TreeNode* node) {
  if (!node) return 0;
  int l = std::max(0, dfs(node->left));
  int r = std::max(0, dfs(node->right));
  maxSum = std::max(maxSum, node->val + l + r);
  return node->val + std::max(l, r);
}`,
    initialComplexity: "O(2ᴺ)",
    optimizedComplexity: "O(N)",
    speedup: "120x Faster",
    testRunOutput: "✓ Clang compiled with -O3. Execution: 0.2ms (Memory: 8.4MB)"
  }
};

export default function CodeLinuxVisual({ interactive = true }: VisualProps) {
  const [lang, setLang] = useState<"typescript" | "python" | "cpp">("typescript");
  const [isOptimized, setIsOptimized] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const snippet = SNIPPETS[lang];

  const handleToggleOptimize = () => {
    setIsOptimized(!isOptimized);
    setExecutionOutput(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setExecutionOutput("Compiling in Judge0 Linux sandbox container...");
    setTimeout(() => {
      setIsRunning(false);
      setExecutionOutput(snippet.testRunOutput);
    }, 700);
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#140b1e] via-[#09050e] to-[#030105] border border-purple-500/25 overflow-hidden p-4 sm:p-6 text-white shadow-[0_20px_60px_-15px_rgba(168,85,247,0.18)] flex flex-col justify-between group">
      
      {/* Background Cyber Violet Glow & Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/15 rounded-full blur-[90px] pointer-events-none animate-pulse-ring" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Header: IDE Cockpit & Language Switcher */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/35 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
            <Code2 className="w-5 h-5 text-purple-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-purple-200">
                CODELYNX AI COMPILER
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                GEMINI 2.5 FLASH
              </span>
            </div>
            <p className="text-[11px] font-mono text-white/50">Real-Time AST Complexity &amp; Auto-Vectorization</p>
          </div>
        </div>

        {/* Interactive Language Selector */}
        {interactive && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {(["typescript", "python", "cpp"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLang(l);
                  setIsOptimized(false);
                  setExecutionOutput(null);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 uppercase ${
                  lang === l
                    ? "bg-purple-500/25 text-purple-200 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {l === "cpp" ? "C++" : l}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Middle Interactive Code Editor Box */}
      <div className="relative z-10 my-4 sm:my-5 rounded-xl bg-black/75 border border-purple-500/30 p-3 sm:p-4 backdrop-blur-md font-mono overflow-hidden shadow-[inset_0_1px_2px_rgba(168,85,247,0.2)]">
        {/* Editor Tab Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-purple-300/80 font-mono ml-2">solution.{lang === "python" ? "py" : lang === "cpp" ? "cpp" : "ts"}</span>
          </div>

          {/* Interactive Optimize Trigger */}
          {interactive && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleOptimize}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm ${
                  isOptimized
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/40 animate-pulse"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span>{isOptimized ? "AI OPTIMIZED O(N)" : "REFACTOR TO O(N)"}</span>
              </button>

              <button
                type="button"
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <Play className={`w-3 h-3 ${isRunning ? "animate-spin" : "fill-white"}`} />
                <span>RUN</span>
              </button>
            </div>
          )}
        </div>

        {/* Code Content */}
        <pre className="text-xs text-white/80 overflow-x-auto leading-relaxed py-1 selection:bg-purple-500/40">
          <code>
            {isOptimized ? snippet.optimizedCode : snippet.initialCode}
          </code>
        </pre>

        {/* Simulated Sandbox Output */}
        {executionOutput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 pt-2.5 border-t border-white/10 text-xs font-mono flex items-center gap-2 text-emerald-400 bg-emerald-950/20 p-2 rounded-lg"
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{executionOutput}</span>
          </motion.div>
        )}
      </div>

      {/* Real-time Complexity & Engine Metrics Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        <div className="p-2.5 rounded-xl bg-white/[0.025] border border-white/10 backdrop-blur-sm">
          <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Time Complexity</div>
          <div className="flex items-center gap-1.5">
            <span className={`text-base font-mono font-semibold ${isOptimized ? "text-emerald-400" : "text-amber-400"}`}>
              {isOptimized ? snippet.optimizedComplexity : snippet.initialComplexity}
            </span>
            {isOptimized && (
              <span className="text-[10px] font-mono text-emerald-400 px-1 rounded bg-emerald-500/10">
                -94% latency
              </span>
            )}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.025] border border-white/10 backdrop-blur-sm">
          <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Space Complexity</div>
          <div className="text-base font-mono font-semibold text-purple-300">
            {isOptimized ? "O(N) Hash Table" : "O(1) In-Place"}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.025] border border-white/10 backdrop-blur-sm">
          <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Compiler Sandbox</div>
          <div className="text-base font-mono font-semibold text-cyan-300">
            Judge0 v1.13
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-white/[0.025] border border-white/10 backdrop-blur-sm">
          <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Speed Multiplier</div>
          <div className="text-base font-mono font-semibold text-emerald-400">
            {isOptimized ? snippet.speedup : "Baseline 1.0x"}
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="relative z-10 mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
        <div className="flex items-center gap-2">
          <Bot className="w-3.5 h-3.5 text-purple-400" />
          <span>LLVM IR &amp; Google Gemini Context Pipeline</span>
        </div>
        <div className="flex items-center gap-1.5 text-purple-300">
          <Zap className="w-3 h-3 text-purple-400" />
          <span>Multi-Lang AST Engine Active</span>
        </div>
      </div>
    </div>
  );
}