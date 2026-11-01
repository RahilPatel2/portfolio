"use client";

import { motion } from "framer-motion";
import { Compass, MapPin, Calendar, Clock, Sparkles } from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function RoamlyVisual({ interactive = true }: VisualProps) {
  return (
    <div className="relative w-full h-full min-h-[280px] sm:min-h-[340px] md:min-h-[400px] bg-[#0c0a07] border border-amber-500/20 rounded-2xl overflow-hidden p-4 sm:p-6 flex flex-col justify-between font-sans shadow-[0_0_40px_rgba(245,158,11,0.06)] group">
      {/* Background World Grid Overlay & Amber Atmospheric Glow */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Travel Header & Live Route Status */}
      <div className="relative z-10 flex items-center justify-between border-b border-amber-500/15 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Compass className="w-4 h-4 animate-[spin_12s_linear_infinite]" />
          </div>
          <div>
            <div className="text-xs font-mono font-medium text-amber-200/90 tracking-wider flex items-center gap-1.5">
              ROAMLY AI ENGINE
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] font-mono text-white/40">7-Day Golden Route · Japan</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            AI OPTIMIZED
          </span>
          <span className="hidden sm:inline-flex px-2 py-1 rounded-md text-[10px] font-mono text-white/50 bg-white/[0.03] border border-white/10">
            Transit: Feasible
          </span>
        </div>
      </div>

      {/* Main Visual: Interactive Multi-Day Waypoints */}
      <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Stop 1 */}
        <motion.div 
          whileHover={interactive ? { y: -4, borderColor: "rgba(245,158,11,0.5)" } : {}}
          transition={{ duration: 0.2 }}
          className="bg-white/[0.02] border border-white/10 rounded-xl p-3 sm:p-3.5 backdrop-blur-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-amber-400/80 mb-2">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> DAY 01–02</span>
            <span className="text-white/40">09:00 AM</span>
          </div>
          <div className="text-sm font-medium text-white mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            Tokyo Metropolis
          </div>
          <p className="text-[11px] text-white/50 line-clamp-2">Shinjuku skyline, Meiji Shrine & Shibuya Crossing geocoded route.</p>
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/40">
            <span>Verified POIs: 8</span>
            <span className="text-amber-300/80">★ 4.9 (Google)</span>
          </div>
        </motion.div>

        {/* Stop 2 */}
        <motion.div 
          whileHover={interactive ? { y: -4, borderColor: "rgba(245,158,11,0.5)" } : {}}
          transition={{ duration: 0.2 }}
          className="bg-amber-500/[0.04] border border-amber-500/25 rounded-xl p-3 sm:p-3.5 backdrop-blur-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-2">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> DAY 03–04</span>
            <span className="text-amber-300/70">Shinkansen 2h 15m</span>
          </div>
          <div className="text-sm font-medium text-white mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            Kyoto Heritage
          </div>
          <p className="text-[11px] text-white/60 line-clamp-2">Fushimi Inari Torii gates, Arashiyama Bamboo Grove & Gion dining.</p>
          <div className="mt-2.5 pt-2 border-t border-amber-500/10 flex items-center justify-between text-[9px] font-mono text-amber-400/80">
            <span>Morning Slot · 07:30</span>
            <span className="text-emerald-400">Crowd: Low</span>
          </div>
        </motion.div>

        {/* Stop 3 */}
        <motion.div 
          whileHover={interactive ? { y: -4, borderColor: "rgba(245,158,11,0.5)" } : {}}
          transition={{ duration: 0.2 }}
          className="bg-white/[0.02] border border-white/10 rounded-xl p-3 sm:p-3.5 backdrop-blur-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-amber-400/80 mb-2">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> DAY 05–07</span>
            <span className="text-white/40">Express 45m</span>
          </div>
          <div className="text-sm font-medium text-white mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            Osaka & Dotonbori
          </div>
          <p className="text-[11px] text-white/50 line-clamp-2">Osaka Castle park, culinary street tour, and Kansai airport exit.</p>
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/40">
            <span>Evening Slot</span>
            <span className="text-amber-300/80">Budget: Optimized</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Transit Metrics & Geocoding Footer */}
      <div className="relative z-10 pt-3 border-t border-amber-500/15 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-white/50">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-white/70">
            <Clock className="w-3 h-3 text-amber-400" /> Total Route: 520 km
          </span>
          <span className="hidden sm:inline-block w-1 h-1 bg-white/20 rounded-full" />
          <span className="text-white/60">Estimated Transit: 3h 10m</span>
        </div>
        <div className="flex items-center gap-2 text-amber-300/80">
          <span>Map Polylines: Synced</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-[9px] text-amber-300 border border-amber-500/20">Google Places v3</span>
        </div>
      </div>
    </div>
  );
}
