"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Navigation2, 
  Sun, 
  Clock, 
  DollarSign, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap
} from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

interface DestinationData {
  name: string;
  region: string;
  days: string;
  timeEstimate: string;
  budgetEst: string;
  crowdLevel: string;
  weather: string;
  temp: string;
  highlights: { title: string; time: string; tag: string; rating: string }[];
  routePath: string;
  pins: { x: number; y: number; label: string; id: number }[];
}

const DESTINATIONS: Record<string, DestinationData> = {
  kyoto: {
    name: "Kyoto & Nara Heritage",
    region: "Kansai, Japan",
    days: "4 Days / 3 Nights",
    timeEstimate: "AI Optimized: -2.4h travel",
    budgetEst: "¥68,500 / person",
    crowdLevel: "Low (AI Timing)",
    weather: "Clear Sky",
    temp: "21°C",
    highlights: [
      { title: "Fushimi Inari Torii Gates", time: "07:30 AM", tag: "Golden Hour Photo", rating: "4.9 ★" },
      { title: "Kinkaku-ji Zen Pavilion", time: "11:15 AM", tag: "Cultural Landmark", rating: "4.8 ★" },
      { title: "Arashiyama Bamboo Grove", time: "03:45 PM", tag: "Scenic Walkway", rating: "4.9 ★" },
    ],
    routePath: "M 40,110 Q 120,40 220,80 T 380,60",
    pins: [
      { x: 40, y: 110, label: "Kyoto Stn", id: 1 },
      { x: 140, y: 55, label: "Kinkaku-ji", id: 2 },
      { x: 250, y: 85, label: "Gion District", id: 3 },
      { x: 380, y: 60, label: "Fushimi Inari", id: 4 },
    ]
  },
  tokyo: {
    name: "Tokyo Cyber & Culture",
    region: "Kanto, Japan",
    days: "5 Days / 4 Nights",
    timeEstimate: "AI Subways: 12m avg transit",
    budgetEst: "¥84,200 / person",
    crowdLevel: "Moderate",
    weather: "Neon Drizzle",
    temp: "19°C",
    highlights: [
      { title: "Shinjuku Omoide Yokocho", time: "06:00 PM", tag: "Culinary Tasting", rating: "4.9 ★" },
      { title: "Shibuya Sky Observation Deck", time: "08:15 PM", tag: "Night Panorama", rating: "5.0 ★" },
      { title: "Akihabara Tech District", time: "02:00 PM", tag: "Innovation Hub", rating: "4.7 ★" },
    ],
    routePath: "M 50,70 Q 160,130 260,60 T 390,100",
    pins: [
      { x: 50, y: 70, label: "Shibuya", id: 1 },
      { x: 180, y: 115, label: "Roppongi", id: 2 },
      { x: 270, y: 65, label: "Ginza", id: 3 },
      { x: 390, y: 100, label: "Akihabara", id: 4 },
    ]
  },
  fuji: {
    name: "Mount Fuji & Five Lakes",
    region: "Chubu, Japan",
    days: "3 Days / 2 Nights",
    timeEstimate: "Scenic Rail: Panoramic View",
    budgetEst: "¥52,000 / person",
    crowdLevel: "Quiet Serenity",
    weather: "Crystal Crisp",
    temp: "14°C",
    highlights: [
      { title: "Chureito Pagoda Viewpoint", time: "06:00 AM", tag: "Sunrise Wonder", rating: "5.0 ★" },
      { title: "Lake Kawaguchiko Cruise", time: "11:00 AM", tag: "Reflecting Water", rating: "4.8 ★" },
      { title: "Oshino Hakkai Natural Springs", time: "02:30 PM", tag: "Crystal Springs", rating: "4.9 ★" },
    ],
    routePath: "M 40,90 Q 150,20 280,100 T 390,40",
    pins: [
      { x: 40, y: 90, label: "Kawaguchiko", id: 1 },
      { x: 160, y: 35, label: "Chureito", id: 2 },
      { x: 270, y: 95, label: "Oshino", id: 3 },
      { x: 390, y: 40, label: "Fuji 5th Stn", id: 4 },
    ]
  }
};

export default function RoamlyVisual({ interactive = true }: VisualProps) {
  const [activeTab, setActiveTab] = useState<"kyoto" | "tokyo" | "fuji">("kyoto");
  const [selectedPin, setSelectedPin] = useState<number | null>(2);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const current = DESTINATIONS[activeTab];

  const handleSwitchTab = (tab: "kyoto" | "tokyo" | "fuji") => {
    if (tab === activeTab) return;
    setIsOptimizing(true);
    setActiveTab(tab);
    setSelectedPin(2);
    setTimeout(() => setIsOptimizing(false), 500);
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#120d06] via-[#090805] to-[#040402] border border-amber-500/20 overflow-hidden p-4 sm:p-6 text-white shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)] flex flex-col justify-between group">
      
      {/* Background Animated Radar Sweep & Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/15 rounded-full blur-[90px] pointer-events-none animate-pulse-ring" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Top Header: System Status & Interactive Tabs */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: "20s" }} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-amber-300">
                ROAMLY AI ENGINE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LIVE 24MS
              </span>
            </div>
            <p className="text-[11px] font-mono text-white/50">{current.region} · {current.days}</p>
          </div>
        </div>

        {/* Interactive Destination Switcher */}
        {interactive && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {(["kyoto", "tokyo", "fuji"] as const).map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => handleSwitchTab(dest)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 capitalize flex items-center gap-1.5 ${
                  activeTab === dest
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                    : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span>{dest}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Middle Interactive Section: GPS Radar Vector Map */}
      <div className="relative z-10 my-4 sm:my-5 rounded-xl bg-black/40 border border-amber-500/20 p-3 sm:p-4 backdrop-blur-sm overflow-hidden">
        {/* Subtle Map Scanlines */}
        <div className="absolute inset-0 bg-cyber-dots opacity-20 pointer-events-none" />

        <div className="flex items-center justify-between text-[11px] font-mono text-white/60 mb-3">
          <div className="flex items-center gap-2">
            <Navigation2 className="w-3.5 h-3.5 text-amber-400 transform rotate-45" />
            <span className="text-amber-200">ACTIVE FLIGHT &amp; RAIL VECTOR</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-white/70">
              <Sun className="w-3.5 h-3.5 text-amber-400" /> {current.temp} {current.weather}
            </span>
            <span className="text-amber-300/80 font-medium">{current.budgetEst}</span>
          </div>
        </div>

        {/* Animated SVG Trajectory Canvas */}
        <div className="relative w-full h-32 sm:h-36">
          <svg className="w-full h-full" viewBox="0 0 420 140" fill="none">
            <defs>
              <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Grid Coordinates */}
            <line x1="20" y1="35" x2="400" y2="35" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
            <line x1="20" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
            <line x1="20" y1="105" x2="400" y2="105" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

            {/* Glowing Trajectory Path */}
            <motion.path
              d={current.routePath}
              stroke="url(#amberGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="6 6"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Interactive Waypoint Pins */}
            {current.pins.map((pin) => {
              const isSelected = selectedPin === pin.id;
              return (
                <g 
                  key={pin.id} 
                  className="cursor-pointer"
                  onClick={() => interactive && setSelectedPin(pin.id)}
                >
                  {/* Ping Effect */}
                  {isSelected && (
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="12"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      className="animate-ping"
                    />
                  )}
                  {/* Outer circle */}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={isSelected ? "6" : "4.5"}
                    fill={isSelected ? "#fbbf24" : "#f59e0b"}
                    stroke="#000"
                    strokeWidth="1.5"
                    className="transition-all duration-300"
                  />
                  {/* Label */}
                  <text
                    x={pin.x}
                    y={pin.y + 16}
                    fill={isSelected ? "#fde68a" : "rgba(255,255,255,0.6)"}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="transition-colors duration-200"
                  >
                    {pin.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating AI Optimization Indicator */}
          <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md flex items-center gap-1.5 text-[10px] font-mono text-amber-300">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>{current.timeEstimate}</span>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Itinerary Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <AnimatePresence mode="wait">
          {current.highlights.map((item, idx) => (
            <motion.div
              key={`${activeTab}-${idx}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-3 rounded-xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/10 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-sm group/card cursor-pointer"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-amber-400/90 mb-1.5">
                <span className="flex items-center gap-1 text-white/50">
                  <Clock className="w-3 h-3 text-amber-400" /> {item.time}
                </span>
                <span className="text-amber-300 font-semibold">{item.rating}</span>
              </div>
              <h5 className="text-xs font-medium text-white group-hover/card:text-amber-200 transition-colors truncate">
                {item.title}
              </h5>
              <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-white/40">
                <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300/80 border border-amber-500/20">
                  {item.tag}
                </span>
                <ChevronRight className="w-3 h-3 text-white/20 group-hover/card:text-amber-300 transition-colors" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer Status Bar */}
      <div className="relative z-10 mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Google Places API &amp; Maps Engine Connected</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-400/80">
          <TrendingUp className="w-3 h-3" />
          <span>{current.crowdLevel}</span>
        </div>
      </div>
    </div>
  );
}