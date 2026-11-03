"use client";

import Image from "next/image";
import { Compass, MapPin, Calendar, Clock, Navigation } from "lucide-react";

interface VisualProps {
  interactive?: boolean;
}

export default function RoamlyVisual({ interactive = true }: VisualProps) {
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
          roamly.ai // travel-planner
        </div>
        <div className="text-xs font-mono text-white/40 uppercase tracking-widest hidden sm:block">
          GEOLOCATED ROUTE
        </div>
      </div>

      {/* Main Content Showcase */}
      <div className="relative z-10 flex-1 grid grid-cols-1 sm:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
        
        {/* Left: Real Destination Visual */}
        <div className="sm:col-span-5 relative h-full min-h-[220px] sm:min-h-[260px] rounded-xl overflow-hidden border border-white/10 bg-[#141414] group-hover/preview:border-white/20 transition-all duration-500">
          <Image
            src="/images/projects/kyoto-local.jpg"
            alt="Kyoto Heritage Destination Preview"
            fill
            className="object-cover opacity-85 group-hover/preview:scale-105 group-hover/preview:opacity-95 transition-all duration-700 ease-out grayscale contrast-125"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <span className="text-[11px] font-mono tracking-widest uppercase text-white/60 block mb-1">
              KYOTO &amp; NARA // 4 DAYS
            </span>
            <div className="text-base font-medium text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/80" />
              <span>Kansai Historic Corridor</span>
            </div>
            <div className="text-xs font-mono text-white/40 mt-1">
              35.0116° N, 135.7681° E
            </div>
          </div>
        </div>

        {/* Right: Clean Itinerary Timeline with Spacing */}
        <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-white/50 pb-3 border-b border-white/5">
            <span className="flex items-center gap-2 text-white/90">
              <Compass className="w-4 h-4 text-white/60" />
              DAY 01 · CULTURAL CORRIDOR
            </span>
            <span>VERIFIED POIs: 6</span>
          </div>

          {/* Schedule Steps */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#161616] border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono text-white/40 mb-1">08:30 AM · MORNING</div>
                <div className="text-sm font-medium text-white/90">Kinkaku-ji Zen Pavilion</div>
                <div className="text-xs text-white/50 font-mono mt-0.5">Cultural Landmark · 1h 45m visit</div>
              </div>
              <span className="text-xs font-mono text-white/70 px-2 py-1 rounded bg-white/5 border border-white/5">
                ★ 4.9
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#161616] border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono text-white/40 mb-1">12:15 PM · AFTERNOON</div>
                <div className="text-sm font-medium text-white/90">Gion Preservation District</div>
                <div className="text-xs text-white/50 font-mono mt-0.5">Transit: 18m via Rail Route</div>
              </div>
              <span className="text-xs font-mono text-white/70 px-2 py-1 rounded bg-white/5 border border-white/5">
                ★ 4.8
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#161616] border border-white/5 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono text-white/40 mb-1">04:30 PM · GOLDEN HOUR</div>
                <div className="text-sm font-medium text-white/90">Fushimi Inari Torii Gates</div>
                <div className="text-xs text-white/50 font-mono mt-0.5">Scenic Trail · Sunset Window</div>
              </div>
              <span className="text-xs font-mono text-white/70 px-2 py-1 rounded bg-white/5 border border-white/5">
                ★ 4.9
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 px-6 py-3.5 bg-[#141414] border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
        <div className="flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-white/60" />
          <span>Google Places &amp; Maps Geocoded</span>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <span>Route: 94% Optimized</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline">Budget: ¥64,000</span>
        </div>
      </div>
    </div>
  );
}