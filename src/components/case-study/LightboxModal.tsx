"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { ReactNode } from "react";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  caption: string;
  children: ReactNode;
}

export default function LightboxModal({
  isOpen,
  onClose,
  title,
  caption,
  children,
}: LightboxModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0c0e] border border-white/15 rounded-3xl overflow-hidden flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4 text-white/50" />
                <h3 className="text-sm font-mono font-medium text-white tracking-wider uppercase">
                  {title}
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40">Interactive Inspection View</span>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex items-center justify-center">
              <div className="w-full">
                {children}
              </div>
            </div>

            {/* Caption Footer */}
            <div className="px-6 py-3.5 border-t border-white/10 bg-black/40 text-xs font-mono text-white/60">
              {caption}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
