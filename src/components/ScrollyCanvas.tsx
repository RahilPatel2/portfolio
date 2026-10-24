"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const DESKTOP_FRAME_COUNT = 179;
const MOBILE_FRAME_COUNT = 298;

function isMobileOrTabletDevice() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 1024 || window.innerHeight > window.innerWidth;
}

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastDrawnImageRef = useRef<HTMLImageElement | null>(null);
  const isMobileRef = useRef<boolean>(false);

  const [modeKey, setModeKey] = useState<"desktop" | "mobile">("desktop");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = scrollYProgress;

  // Detect mode (desktop vs mobile/tablet) on mount and resize
  useEffect(() => {
    const updateMode = () => {
      const isMob = isMobileOrTabletDevice();
      isMobileRef.current = isMob;
      setModeKey((prev) => {
        const next = isMob ? "mobile" : "desktop";
        return prev !== next ? next : prev;
      });
    };

    updateMode();
    window.addEventListener("resize", updateMode);
    window.addEventListener("orientationchange", updateMode);
    return () => {
      window.removeEventListener("resize", updateMode);
      window.removeEventListener("orientationchange", updateMode);
    };
  }, []);

  // Load appropriate image sequence based on detected mode
  useEffect(() => {
    let isCancelled = false;
    const isMobileMode = modeKey === "mobile";
    isMobileRef.current = isMobileMode;

    const frameCount = isMobileMode ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
    const loadedImages: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    imagesRef.current = loadedImages;

    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = isMobileMode 
        ? `/Data-mobile/Data-mobile/frame_${frameNumber}_delay-0.033s.png`
        : `/sequence/frame_${frameNumber}_delay-0.056s.png`;

      img.onload = () => {
        if (isCancelled) return;
        loadedImages[i] = img;
        loadedCount++;

        // Draw the very first frame immediately as soon as it arrives
        if (i === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            lastDrawnImageRef.current = img;
            drawImageCover(ctx, canvasRef.current, img);
          }
        }

        // When all frames are ready or during progress, ensure current frame is up to date
        if (loadedCount === frameCount && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          const curProgress = smoothProgress.get();
          const target = Math.min(frameCount - 1, Math.max(0, Math.floor(curProgress * frameCount)));
          const targetImg = loadedImages[target];
          if (ctx && targetImg) {
            lastDrawnImageRef.current = targetImg;
            drawImageCover(ctx, canvasRef.current, targetImg);
          }
        }
      };

      // Pre-decode initial 20 frames to avoid initial scroll lag
      if (i < 20 && typeof img.decode === "function") {
        img.decode().catch(() => {});
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [modeKey, smoothProgress]);

  // Handle scroll progress to update canvas frame
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      const frameCount = isMobileRef.current ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
      const targetFrame = Math.min(frameCount - 1, Math.max(0, Math.floor(latest * frameCount)));

      const loadedList = imagesRef.current;
      let imgToDraw = loadedList[targetFrame];

      // If exact frame is still downloading, fall back to closest loaded frame
      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        for (let f = targetFrame - 1; f >= 0; f--) {
          const candidate = loadedList[f];
          if (candidate && candidate.complete && candidate.naturalWidth > 0) {
            imgToDraw = candidate;
            break;
          }
        }
      }

      if (imgToDraw) {
        lastDrawnImageRef.current = imgToDraw;
        requestAnimationFrame(() => {
          if (canvasRef.current && imgToDraw) {
            drawImageCover(ctx, canvasRef.current, imgToDraw);
          }
        });
      }
    });
  }, [smoothProgress]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const ctx = canvasRef.current.getContext("2d");
        if (ctx && lastDrawnImageRef.current) {
          drawImageCover(ctx, canvasRef.current, lastDrawnImageRef.current);
        }
      }
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // TIMELINE
  // DESKTOP TIMINGS (LOCKED)
  const m1Opacity = useTransform(smoothProgress, [0, 0.14, 0.18, 1], [1, 1, 0, 0]);
  const m1Scale = useTransform(smoothProgress, [0, 0.18], [1, 1.05]);
  const m1Blur = useTransform(smoothProgress, [0, 0.14, 0.18], ["blur(0px)", "blur(0px)", "blur(20px)"]);

  const m2Opacity = useTransform(smoothProgress, [0, 0.22, 0.28, 0.42, 0.48, 1], [0, 0, 1, 1, 0, 0]);
  const m2Y = useTransform(smoothProgress, [0.22, 0.48], [40, -40]);
  const m2Scale = useTransform(smoothProgress, [0.22, 0.48], [0.95, 1.05]);
  const m2Blur = useTransform(smoothProgress, [0.22, 0.28, 0.42, 0.48], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  const m3Opacity = useTransform(smoothProgress, [0, 0.52, 0.58, 0.72, 0.78, 1], [0, 0, 1, 1, 0, 0]);
  const m3Y = useTransform(smoothProgress, [0.52, 0.78], [40, -40]);
  const m3Scale = useTransform(smoothProgress, [0.52, 0.78], [0.95, 1.05]);
  const m3Blur = useTransform(smoothProgress, [0.52, 0.58, 0.72, 0.78], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  const m4Opacity = useTransform(smoothProgress, [0, 0.82, 0.88, 0.98, 1], [0, 0, 1, 1, 0]);
  const m4Y = useTransform(smoothProgress, [0.82, 1], [40, -20]);
  const m4Scale = useTransform(smoothProgress, [0.82, 1], [0.95, 1.05]);
  const m4Blur = useTransform(smoothProgress, [0.82, 0.88, 0.98, 1], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  // MOBILE & TABLET TIMINGS
  const mM1Opacity = useTransform(smoothProgress, [0, 0.20, 0.25, 1], [1, 1, 0, 0]);
  const mM1Scale = useTransform(smoothProgress, [0, 0.25], [1, 1.05]);
  const mM1Blur = useTransform(smoothProgress, [0, 0.20, 0.25], ["blur(0px)", "blur(0px)", "blur(20px)"]);

  const mM2Opacity = useTransform(smoothProgress, [0, 0.20, 0.25, 0.50, 0.55, 1], [0, 0, 1, 1, 0, 0]);
  const mM2Y = useTransform(smoothProgress, [0.20, 0.55], [40, -40]);
  const mM2Scale = useTransform(smoothProgress, [0.20, 0.55], [0.95, 1.05]);
  const mM2Blur = useTransform(smoothProgress, [0.20, 0.25, 0.50, 0.55], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  const mM3Opacity = useTransform(smoothProgress, [0, 0.50, 0.55, 0.75, 0.80, 1], [0, 0, 1, 1, 0, 0]);
  const mM3Y = useTransform(smoothProgress, [0.50, 0.80], [40, -40]);
  const mM3Scale = useTransform(smoothProgress, [0.50, 0.80], [0.95, 1.05]);
  const mM3Blur = useTransform(smoothProgress, [0.50, 0.55, 0.75, 0.80], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  const mM4Opacity = useTransform(smoothProgress, [0, 0.75, 0.80, 0.98, 1], [0, 0, 1, 1, 0]);
  const mM4Y = useTransform(smoothProgress, [0.75, 1], [40, -20]);
  const mM4Scale = useTransform(smoothProgress, [0.75, 1], [0.95, 1.05]);
  const mM4Blur = useTransform(smoothProgress, [0.75, 0.80, 0.98, 1], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh]">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black z-0">
        <canvas ref={canvasRef} className="w-full h-full object-cover opacity-60" />
        
        {/* =======================
            MOMENT 1
        ========================= */}
        {/* Desktop (Untouched for screens >= 1024px) */}
        <motion.div style={{ opacity: m1Opacity, scale: m1Scale, filter: m1Blur }} className="hidden lg:flex absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-6">
          <h1 className="text-5xl lg:text-8xl font-light tracking-[0.15em] mb-4 drop-shadow-2xl">RAHIL PAMBHAR</h1>
          <p className="text-xl lg:text-3xl font-mono tracking-[0.3em] text-white/70">
            FULL STACK DEVELOPER
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="inline-block ml-1">|</motion.span>
          </p>
        </motion.div>
        {/* Mobile & Tablet */}
        <motion.div style={{ opacity: mM1Opacity, scale: mM1Scale, filter: mM1Blur }} className="flex lg:hidden absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.15em] mb-3 drop-shadow-2xl text-center w-full">RAHIL PAMBHAR</h1>
          <p className="text-sm sm:text-lg md:text-2xl font-mono tracking-[0.2em] text-white/70 w-full text-center">
            FULL STACK DEVELOPER
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="inline-block ml-1">|</motion.span>
          </p>
        </motion.div>

        {/* =======================
            MOMENT 2
        ========================= */}
        {/* Desktop (Untouched for screens >= 1024px) */}
        <motion.div style={{ opacity: m2Opacity, y: m2Y, scale: m2Scale, filter: m2Blur }} className="hidden lg:flex absolute inset-0 flex-col items-start justify-center pl-8 lg:pl-20 pointer-events-none text-white text-left">
          <h2 className="text-4xl lg:text-7xl font-light tracking-wide mb-5 drop-shadow-2xl max-w-2xl">B.Tech in Computer Science</h2>
          <div className="border-l border-white/30 pl-5">
            <p className="text-2xl lg:text-3xl font-mono tracking-[0.15em] text-white/90">8.91 CGPA</p>
            <p className="text-sm lg:text-lg font-mono tracking-[0.1em] text-white/50 mt-2">Indrashil University · 2022–2026</p>
          </div>
        </motion.div>
        {/* Mobile & Tablet */}
        <motion.div style={{ opacity: mM2Opacity, y: mM2Y, scale: mM2Scale, filter: mM2Blur }} className="flex lg:hidden absolute inset-0 flex-col items-center justify-center px-6 pointer-events-none text-white text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-wide mb-4 drop-shadow-2xl leading-snug max-w-xl">B.Tech in Computer Science</h2>
          <div className="border-t border-white/20 pt-4 flex flex-col items-center">
            <p className="text-xl sm:text-2xl md:text-3xl font-mono tracking-[0.1em] text-white/90">8.91 CGPA</p>
            <p className="text-xs sm:text-sm md:text-base font-mono tracking-[0.1em] text-white/50 mt-2">Indrashil University · 2022–2026</p>
          </div>
        </motion.div>

        {/* =======================
            MOMENT 3
        ========================= */}
        {/* Desktop (Untouched for screens >= 1024px) */}
        <motion.div style={{ opacity: m3Opacity, y: m3Y, scale: m3Scale, filter: m3Blur }} className="hidden lg:flex absolute inset-0 flex-col items-end justify-center pr-8 lg:pr-20 pointer-events-none text-white text-right">
          <h2 className="text-4xl lg:text-7xl font-light tracking-wide mb-5 drop-shadow-2xl max-w-2xl">Full Stack Experience</h2>
          <div className="border-r border-white/30 pr-5">
            <p className="text-xl lg:text-2xl font-mono tracking-[0.15em] text-white/90">INTERNED AT</p>
            <p className="text-sm lg:text-lg font-mono tracking-[0.1em] text-white/50 mt-2 max-w-md">Cloud Elevate Technologies, Magorix Ltd & Vaishnav Technology</p>
          </div>
        </motion.div>
        {/* Mobile & Tablet */}
        <motion.div style={{ opacity: mM3Opacity, y: mM3Y, scale: mM3Scale, filter: mM3Blur }} className="flex lg:hidden absolute inset-0 flex-col items-center justify-center px-6 pointer-events-none text-white text-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-wide mb-4 drop-shadow-2xl leading-snug max-w-xl">Full Stack Experience</h2>
          <div className="border-t border-white/20 pt-4 flex flex-col items-center">
            <p className="text-sm sm:text-base md:text-xl font-mono tracking-[0.15em] text-white/90 mb-2">INTERNED AT</p>
            <p className="text-xs sm:text-sm md:text-base font-mono tracking-widest text-white/60 leading-relaxed max-w-md mx-auto">
              Cloud Elevate Technologies, Magorix Ltd & Vaishnav Technology
            </p>
          </div>
        </motion.div>

        {/* =======================
            MOMENT 4
        ========================= */}
        {/* Desktop (Untouched for screens >= 1024px) */}
        <motion.div style={{ opacity: m4Opacity, y: m4Y, scale: m4Scale, filter: m4Blur }} className="hidden lg:flex absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-6">
          <div className="absolute inset-0 bg-black/20 -z-10" />
          <h2 className="text-4xl lg:text-8xl font-light tracking-tight mb-8 drop-shadow-2xl max-w-4xl">I BUILD DIGITAL EXPERIENCES</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6 text-white/50 font-mono tracking-widest text-xs lg:text-sm">
            <span>SNAP & GET</span>
            <span className="hidden lg:inline-block w-1 h-1 bg-white/20 rounded-full" />
            <span>COLLABORATIVE WHITEBOARD</span>
            <span className="hidden lg:inline-block w-1 h-1 bg-white/20 rounded-full" />
            <span>WEATHER DASHBOARD</span>
          </div>
        </motion.div>
        {/* Mobile & Tablet */}
        <motion.div style={{ opacity: mM4Opacity, y: mM4Y, scale: mM4Scale, filter: mM4Blur }} className="flex lg:hidden absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-4">
          <div className="absolute inset-0 bg-black/30 -z-10" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6 drop-shadow-2xl leading-snug">I BUILD DIGITAL EXPERIENCES</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 text-white/50 font-mono tracking-widest text-[10px] sm:text-xs md:text-sm">
            <span>SNAP & GET</span>
            <span className="hidden sm:inline-block w-1 h-1 bg-white/20 rounded-full" />
            <span>COLLABORATIVE WHITEBOARD</span>
            <span className="hidden sm:inline-block w-1 h-1 bg-white/20 rounded-full" />
            <span>WEATHER DASHBOARD</span>
          </div>
        </motion.div>
        
        {/* Overlay for cinematic gradient fading out at bottom of scroll to transition smoothly */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none"
          style={{
             opacity: useTransform(scrollYProgress, [0.85, 1], [0, 1])
          }}
        />
      </div>
    </div>
  );
}

function drawImageCover(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement) {
  if (!img || !img.complete || img.naturalWidth === 0) return;
  
  const canvasRatio = canvas.width / canvas.height;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  
  let renderWidth = canvas.width;
  let renderHeight = canvas.height;
  let x = 0;
  let y = 0;

  if (canvasRatio > imgRatio) {
    // Canvas is wider than image
    renderHeight = canvas.width / imgRatio;
    y = (canvas.height - renderHeight) / 2;
  } else {
    // Image is wider than canvas
    renderWidth = canvas.height * imgRatio;
    x = (canvas.width - renderWidth) / 2;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, renderWidth, renderHeight);
}


