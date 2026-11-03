"use client";

import Image from "next/image";
import { Compass, MapPin, Calendar, Clock, Navigation, CheckCircle2 } from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function RoamlyVisual({ interactive = true }: VisualProps) {
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
          roamly.ai // travel-planner
        </div>
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden sm:block">
          AI GEOCODED ROUTE
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col gap-4">
        
        {/* Destination Hero Header Banner */}
        <div className="relative w-full h-36 sm:h-44 rounded-lg overflow-hidden border border-white/10 bg-[#161616]">
          <Image
            src="/images/projects/kyoto-local.jpg"
            alt="Kyoto Heritage Destination Preview"
            fill
            className="object-cover opacity-75 group-hover/preview:scale-105 group-hover/preview:opacity-85 transition-all duration-700 ease-out grayscale contrast-125"
            sizes="(max-width: 1200px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/50 block mb-1">
                JAPAN CULTURAL ITINERARY // 4 DAYS
              </span>
              <div className="text-base sm:text-lg font-medium text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-white/80 shrink-0" />
                <span>Kyoto &amp; Nara Corridor</span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-mono text-white/70 block">¥64,000 budget</span>
              <span className="text-[10px] font-mono text-white/40">Efficiency: 94%</span>
            </div>
          </div>
        </div>

        {/* Schedule List */}
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-[#141414] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-mono text-white/40 w-16 shrink-0">08:30 AM</div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-white/90">Kinkaku-ji Zen Pavilion</div>
                <div className="text-[11px] text-white/50 font-mono">Cultural Landmark · 1h 45m visit</div>
              </div>
            </div>
            <span className="text-xs font-mono text-white/70 px-2 py-0.5 rounded bg-white/5 border border-white/5">
              ★ 4.9
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#141414] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-mono text-white/40 w-16 shrink-0">12:15 PM</div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-white/90">Gion Preservation District</div>
                <div className="text-[11px] text-white/50 font-mono">Historic Walking Route · 18m Rail Transit</div>
              </div>
            </div>
            <span className="text-xs font-mono text-white/70 px-2 py-0.5 rounded bg-white/5 border border-white/5">
              ★ 4.8
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#141414] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-mono text-white/40 w-16 shrink-0">04:30 PM</div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-white/90">Fushimi Inari Torii Gates</div>
                <div className="text-[11px] text-white/50 font-mono">Sunset Golden Hour · Verified Path</div>
              </div>
            </div>
            <span className="text-xs font-mono text-white/70 px-2 py-0.5 rounded bg-white/5 border border-white/5">
              ★ 4.9
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 px-4 sm:px-6 py-2.5 bg-[#141414] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-white/60" />
          <span>Google Places &amp; Maps Geocoded</span>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <span>6 POIs Connected</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline">Transit Validated</span>
        </div>
      </div>
    </div>
  );
}