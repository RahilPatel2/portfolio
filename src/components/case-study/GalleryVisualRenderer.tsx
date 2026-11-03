"use client";

import { useState } from "react";
import { GalleryItem, ProjectData } from "@/data/projects";
import RoamlyVisual from "../project-visuals/RoamlyVisual";
import DeployXVisual from "../project-visuals/DeployXVisual";
import CodeLinuxVisual from "../project-visuals/CodeLinuxVisual";
import LightboxModal from "./LightboxModal";
import { Maximize2, Sparkles, Map, Terminal, Code2 } from "lucide-react";

interface Props {
  project: ProjectData;
  item: GalleryItem;
  index: number;
}

export default function GalleryVisualRenderer({ project, item, index }: Props) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Render project-specific visual based on slug and item type
  const renderVisualContent = (interactive: boolean = true) => {
    if (project.slug === "ai-planner-specification") {
      return <RoamlyVisual interactive={interactive} />;
    }
    if (project.slug === "deployx") {
      return <DeployXVisual interactive={interactive} />;
    }
    return <CodeLinuxVisual interactive={interactive} />;
  };

  const getBadgeIcon = () => {
    if (project.slug === "ai-planner-specification") return <Map className="w-3.5 h-3.5 text-white/70" />;
    if (project.slug === "deployx") return <Terminal className="w-3.5 h-3.5 text-white/70" />;
    return <Code2 className="w-3.5 h-3.5 text-white/70" />;
  };

  return (
    <>
      <div 
        onClick={() => setIsLightboxOpen(true)}
        className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 bg-white/[0.02] transition-all duration-500 shadow-xl"
      >
        {/* Hover Highlight Badge */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/80 text-[11px] font-mono opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Maximize2 className="w-3 h-3 text-white" />
          <span>Click to Enlarge</span>
        </div>

        {/* Top Tag Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-white/[0.04] border border-white/10">
              {getBadgeIcon()}
            </div>
            <div>
              <span className="text-xs font-mono text-white/40 block">FIG 0{index + 1}</span>
              <h4 className="text-sm font-medium text-white group-hover:text-white/90 transition-colors">
                {item.title}
              </h4>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10 text-white/50 bg-white/[0.02]">
            {item.type}
          </span>
        </div>

        {/* Embedded Interactive Mockup Preview */}
        <div className="p-2 sm:p-4 bg-black/40">
          <div className="transform transition-transform duration-500 group-hover:scale-[1.01]">
            {renderVisualContent(false)}
          </div>
        </div>

        {/* Caption */}
        <div className="p-4 sm:p-5 bg-white/[0.01] border-t border-white/5 flex items-center justify-between text-xs text-white/60 font-mono">
          <span className="line-clamp-2">{item.caption}</span>
        </div>
      </div>

      {/* Lightbox Enlargement Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        title={item.title}
        caption={item.caption}
      >
        <div className="w-full py-2">
          {renderVisualContent(true)}
        </div>
      </LightboxModal>
    </>
  );
}
