"use client";

import Image from "next/image";
import { Compass, MapPin, Calendar, Clock, Navigation } from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function RoamlyVisual({ interactive = true }: VisualProps) {
  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[380px] lg:min-h-[410px] rounded-xl bg-[#0D0D0D] border border-white/10 overflow-hidden flex flex-col justify-between group/preview transition-all duration-500">
      
      {/* Top Window Bar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#141414]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/60 tracking-wider">
          roamly.ai // travel-intelligence
        </div>
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden sm:block">
          GEOLOCATED ROUTE
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-4 sm:p-5 flex-1 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        
        {/* Left: Destination Visual Card */}
        <div className="sm:col-span-5 relative h-48 sm:h-full min-h-[180px] rounded-lg overflow-hidden border border-white/10 bg-[#171717] group-hover/preview:border-white/20 transition-all">
          <Image
            src="/images/projects/kyoto-local.jpg"
            alt="Kyoto Heritage Destination Preview"
            fill
            className="object-cover opacity-80 group-hover/preview:scale-105 group-hover/preview:opacity-90 transition-all duration-700 ease-out grayscale contrast-125"
            sizes="(max-width: 768px) 100vw, 350px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          <div className="absolute bottom-3 left-3 right-3 text-left">
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/60 block mb-1">
              KYOTO &amp; NARA // 4 DAYS
            </span>
            <div className="text-sm font-medium text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-white/70" />
              <span>Kansai Historic Corridor</span>
            </div>
            <div className="text-[10px] font-mono text-white/40 mt-1">
              35.0116° N, 135.7681° E
            </div>
          </div>
        </div>

        {/* Right: Synthesized Itinerary Timeline */}
        <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-white/50 pb-2 border-b border-white/5">
            <span className="flex items-center gap-1.5 text-white/80">
              <Compass className="w-3.5 h-3.5 text-white/60" />
              DAY 01 SCHEDULE
            </span>
            <span>VERIFIED POIs: 6</span>
          </div>

          {/* Schedule Steps */}
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-[#141414] border border-white/5 flex items-start justify-between">
              <div>
                <div className="text-[10px] font-mono text-white/40 mb-0.5">08:30 AM · MORNING</div>
                <div className="text-xs font-medium text-white/90">Kinkaku-ji Zen Pavilion</div>
                <div className="text-[10px] text-white/50 font-mono mt-0.5">Cultural Landmark · 1h 45m visit</div>
              </div>
              <span className="text-[10px] font-mono text-white/60 px-1.5 py-0.5 rounded bg-white/5">
                ★ 4.9
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#141414] border border-white/5 flex items-start justify-between">
              <div>
                <div className="text-[10px] font-mono text-white/40 mb-0.5">12:15 PM · AFTERNOON</div>
                <div className="text-xs font-medium text-white/90">Gion Preservation District</div>
                <div className="text-[10px] text-white/50 font-mono mt-0.5">Transit: 18m via Rail Route</div>
              </div>
              <span className="text-[10px] font-mono text-white/60 px-1.5 py-0.5 rounded bg-white/5">
                ★ 4.8
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#141414] border border-white/5 flex items-start justify-between">
              <div>
                <div className="text-[10px] font-mono text-white/40 mb-0.5">04:30 PM · GOLDEN HOUR</div>
                <div className="text-xs font-medium text-white/90">Fushimi Inari Torii Gates</div>
                <div className="text-[10px] text-white/50 font-mono mt-0.5">Scenic Trail · Sunset Window</div>
              </div>
              <span className="text-[10px] font-mono text-white/60 px-1.5 py-0.5 rounded bg-white/5">
                ★ 4.9
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 px-4 py-2.5 bg-[#111111] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
        <div className="flex items-center gap-2">
          <Navigation className="w-3 h-3 text-white/60" />
          <span>Google Places &amp; Maps Geocoded</span>
        </div>
        <div className="flex items-center gap-3 text-white/70">
          <span>Route: 94% Optimized</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline">Budget: ¥64,000</span>
        </div>
      </div>
    </div>
  );
}