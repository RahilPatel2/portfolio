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
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

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
    window.addEventListener("resize", updateMode, { passive: true });
    window.addEventListener("orientationchange", updateMode, { passive: true });
    return () => {
      window.removeEventListener("resize", updateMode);
      window.removeEventListener("orientationchange", updateMode);
    };
  }, []);

  // Staged Progressive Preloader (Instant first frame -> Sparse keyframes -> Infill)
  useEffect(() => {
    let isCancelled = false;
    const isMobileMode = modeKey === "mobile";
    isMobileRef.current = isMobileMode;

    const frameCount = isMobileMode ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
    const loadedImages: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    imagesRef.current = loadedImages;

    const getFrameUrl = (index: number) => {
      const frameNumber = index.toString().padStart(3, "0");
      return isMobileMode
        ? `/mobile-sequence/frame_${frameNumber}_delay-0.033s.jpg`
        : `/desktop-sequence/frame_${frameNumber}_delay-0.056s.jpg`;
    };

    const loadSingleFrame = (index: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        if (loadedImages[index]) {
          resolve(loadedImages[index]);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (isCancelled) return resolve(null);
          loadedImages[index] = img;

          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = ctxRef.current || canvas.getContext("2d");
            if (ctx) ctxRef.current = ctx;

            const curProgress = smoothProgress.get();
            const curTarget = Math.min(frameCount - 1, Math.max(0, Math.floor(curProgress * frameCount)));

            // Draw frame 0 immediately as soon as ready, or current frame if matching
            if (index === 0 && !lastDrawnImageRef.current) {
              if (ctx) {
                lastDrawnImageRef.current = img;
                drawImageCover(ctx, canvas, img);
              }
            } else if (index === curTarget) {
              if (ctx) {
                lastDrawnImageRef.current = img;
                drawImageCover(ctx, canvas, img);
              }
            }
          }
          resolve(img);
        };
        img.onerror = () => resolve(null);
      });
    };

    const loadAllFramesProgressively = async () => {
      // 1. Critical Phase: Frame 0 (Instant Hero Render)
      await loadSingleFrame(0);
      if (isCancelled) return;

      // 2. Keyframes Phase: Sample keyframes evenly across the entire scroll range
      // Gives instant 100% scroll range coverage in ~200-300ms
      const keyframeIndices: number[] = [];
      const step = isMobileMode ? 8 : 6;
      for (let i = step; i < frameCount; i += step) {
        keyframeIndices.push(i);
      }
      if (keyframeIndices[keyframeIndices.length - 1] !== frameCount - 1) {
        keyframeIndices.push(frameCount - 1);
      }

      // Load keyframes in concurrent batches of 6 (concurrency limit)
      const BATCH_SIZE = 6;
      for (let i = 0; i < keyframeIndices.length; i += BATCH_SIZE) {
        if (isCancelled) return;
        const batch = keyframeIndices.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map((idx) => loadSingleFrame(idx)));
      }

      // 3. Dense Infill Phase: Stream in all remaining intermediate frames smoothly
      const remainingIndices: number[] = [];
      for (let i = 0; i < frameCount; i++) {
        if (!loadedImages[i]) remainingIndices.push(i);
      }

      for (let i = 0; i < remainingIndices.length; i += BATCH_SIZE) {
        if (isCancelled) return;
        const batch = remainingIndices.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map((idx) => loadSingleFrame(idx)));
      }
    };

    loadAllFramesProgressively();

    return () => {
      isCancelled = true;
    };
  }, [modeKey, smoothProgress]);

  // Handle Scroll Progress with RAF Coalescing & Bi-directional Fallback
  useEffect(() => {
    let animFrameId: number | null = null;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      let ctx = ctxRef.current;
      if (!ctx) {
        ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
      }
      if (!ctx) return;

      const progress = smoothProgress.get();
      const frameCount = isMobileRef.current ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
      const targetIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(progress * frameCount)));

      const loadedList = imagesRef.current;
      let imgToDraw = loadedList[targetIndex];

      // Bi-directional nearest-frame search if target frame is pending
      if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
        for (let offset = 1; offset < frameCount; offset++) {
          const prev = loadedList[targetIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            imgToDraw = prev;
            break;
          }
          const next = loadedList[targetIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            imgToDraw = next;
            break;
          }
        }
      }

      if (imgToDraw && imgToDraw !== lastDrawnImageRef.current) {
        lastDrawnImageRef.current = imgToDraw;
        drawImageCover(ctx, canvas, imgToDraw);
      }
    };

    const unsubscribe = smoothProgress.on("change", () => {
      if (animFrameId !== null) return;
      animFrameId = requestAnimationFrame(() => {
        animFrameId = null;
        render();
      });
    });

    return () => {
      unsubscribe();
      if (animFrameId !== null) cancelAnimationFrame(animFrameId);
    };
  }, [smoothProgress]);

  // High-DPI Canvas Sizing with Mobile Dynamic URL-Bar Protection
  useEffect(() => {
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;

    const setupCanvas = (force = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const curW = window.innerWidth;
      const curH = window.innerHeight;

      // On mobile, URL bar collapse/expand shifts window.innerHeight by < 100px.
      // Avoid re-allocating canvas bitmap during scrolling unless width changes or orientation flips!
      if (!force && curW === lastW && Math.abs(curH - lastH) < 120) {
        return;
      }

      lastW = curW;
      lastH = curH;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(curW * dpr);
      canvas.height = Math.round(curH * dpr);

      let ctx = ctxRef.current;
      if (!ctx) {
        ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
      }

      if (ctx && lastDrawnImageRef.current) {
        drawImageCover(ctx, canvas, lastDrawnImageRef.current);
      }
    };

    setupCanvas(true);
    window.addEventListener("resize", () => setupCanvas(false), { passive: true });
    window.addEventListener("orientationchange", () => setupCanvas(true), { passive: true });

    return () => {
      window.removeEventListener("resize", () => setupCanvas(false));
      window.removeEventListener("orientationchange", () => setupCanvas(true));
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
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover opacity-85 md:opacity-75 transition-opacity duration-700" 
        />
        
        {/* Subtle cinematic gradient vignette for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* =======================
            MOMENT 1
        ========================= */}
        {/* Desktop (Untouched for screens >= 1024px) */}
        <motion.div style={{ opacity: m1Opacity, scale: m1Scale, filter: m1Blur }} className="hidden lg:flex absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-6">
          <h1 className="text-5xl lg:text-8xl font-light tracking-[0.15em] mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">RAHIL PAMBHAR</h1>
          <p className="text-xl lg:text-3xl font-mono tracking-[0.3em] text-white/80 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            FULL STACK DEVELOPER
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="inline-block ml-1">|</motion.span>
          </p>
        </motion.div>
        {/* Mobile & Tablet */}
        <motion.div style={{ opacity: mM1Opacity, scale: mM1Scale, filter: mM1Blur }} className="flex lg:hidden absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-6">
          <div className="flex flex-col items-center max-w-sm">
            <h1 className="text-4xl sm:text-6xl font-light tracking-[0.15em] mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] text-center w-full">RAHIL PAMBHAR</h1>
            <p className="text-sm sm:text-lg font-mono tracking-[0.2em] text-white/80 w-full text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              FULL STACK DEVELOPER
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="inline-block ml-1">|</motion.span>
            </p>
          </div>
        </motion.div>

        {/* =======================
            MOMENT 2
        ========================= */}
        {/* Desktop (Untouched for screens >= 1024px) */}
        <motion.div style={{ opacity: m2Opacity, y: m2Y, scale: m2Scale, filter: m2Blur }} className="hidden lg:flex absolute inset-0 flex-col items-start justify-center pl-8 lg:pl-20 pointer-events-none text-white text-left">
          <h2 className="text-4xl lg:text-7xl font-light tracking-wide mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-2xl">B.Tech in Computer Science</h2>
          <div className="border-l border-white/30 pl-5">
            <p className="text-2xl lg:text-3xl font-mono tracking-[0.15em] text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">8.91 CGPA</p>
            <p className="text-sm lg:text-lg font-mono tracking-[0.1em] text-white/60 mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">Indrashil University · 2022–2026</p>
          </div>
        </motion.div>
        {/* Mobile & Tablet */}
        <motion.div style={{ opacity: mM2Opacity, y: mM2Y, scale: mM2Scale, filter: mM2Blur }} className="flex lg:hidden absolute inset-0 flex-col items-center justify-center px-6 pointer-events-none text-white text-center">
          <div className="flex flex-col items-center max-w-sm">
            <h2 className="text-3xl sm:text-5xl font-light tracking-wide mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-snug">B.Tech in Computer Science</h2>
            <div className="border-t border-white/20 pt-4 flex flex-col items-center w-full">
              <p className="text-xl sm:text-2xl font-mono tracking-[0.1em] text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">8.91 CGPA</p>
              <p className="text-xs sm:text-sm font-mono tracking-[0.1em] text-white/60 mt-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">Indrashil University · 2022–2026</p>
            </div>
          </div>
        </motion.div>

        {/* =======================
            MOMENT 3
        ========================= */}
        {/* Desktop (Untouched for screens >= 1024px) */}
        <motion.div style={{ opacity: m3Opacity, y: m3Y, scale: m3Scale, filter: m3Blur }} className="hidden lg:flex absolute inset-0 flex-col items-end justify-center pr-8 lg:pr-20 pointer-events-none text-white text-right">
          <h2 className="text-4xl lg:text-7xl font-light tracking-wide mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-2xl">Full Stack Experience</h2>
          <div className="border-r border-white/30 pr-5">
            <p className="text-xl lg:text-2xl font-mono tracking-[0.15em] text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">INTERNED AT</p>
            <p className="text-sm lg:text-lg font-mono tracking-[0.1em] text-white/60 mt-2 max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">Cloud Elevate Technologies, Magorix Ltd & Vaishnav Technology</p>
          </div>
        </motion.div>
        {/* Mobile & Tablet */}
        <motion.div style={{ opacity: mM3Opacity, y: mM3Y, scale: mM3Scale, filter: mM3Blur }} className="flex lg:hidden absolute inset-0 flex-col items-center justify-center px-6 pointer-events-none text-white text-center">
          <div className="flex flex-col items-center max-w-sm">
            <h2 className="text-3xl sm:text-5xl font-light tracking-wide mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-snug">Full Stack Experience</h2>
            <div className="border-t border-white/20 pt-4 flex flex-col items-center w-full">
              <p className="text-sm sm:text-base font-mono tracking-[0.15em] text-white/90 mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">INTERNED AT</p>
              <p className="text-xs sm:text-sm font-mono tracking-widest text-white/60 leading-relaxed max-w-xs mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Cloud Elevate Technologies, Magorix Ltd & Vaishnav Technology
              </p>
            </div>
          </div>
        </motion.div>

        {/* =======================
            MOMENT 4
        ========================= */}
        {/* Desktop (Untouched for screens >= 1024px) */}
        <motion.div style={{ opacity: m4Opacity, y: m4Y, scale: m4Scale, filter: m4Blur }} className="hidden lg:flex absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-6">
          <h2 className="text-4xl lg:text-8xl font-light tracking-tight mb-8 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-4xl">I BUILD DIGITAL EXPERIENCES</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-6 text-white/60 font-mono tracking-widest text-xs lg:text-sm drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            <span>AI PLANNER SPECIFICATION</span>
            <span className="hidden lg:inline-block w-1 h-1 bg-white/20 rounded-full" />
            <span>DEPLOYX</span>
            <span className="hidden lg:inline-block w-1 h-1 bg-white/20 rounded-full" />
            <span>CODE LINUX AI</span>
          </div>
        </motion.div>
        {/* Mobile & Tablet */}
        <motion.div style={{ opacity: mM4Opacity, y: mM4Y, scale: mM4Scale, filter: mM4Blur }} className="flex lg:hidden absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-6">
          <div className="flex flex-col items-center max-w-sm">
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-snug">I BUILD DIGITAL EXPERIENCES</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 text-white/60 font-mono tracking-widest text-[11px] sm:text-xs drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              <span>AI PLANNER SPECIFICATION</span>
              <span className="hidden sm:inline-block w-1 h-1 bg-white/20 rounded-full" />
              <span>DEPLOYX</span>
              <span className="hidden sm:inline-block w-1 h-1 bg-white/20 rounded-full" />
              <span>CODE LINUX AI</span>
            </div>
          </div>
        </motion.div>
        
        {/* Smooth Bottom Transition to Content Sections */}
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
  
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const canvasRatio = canvasWidth / canvasHeight;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  
  let renderWidth = canvasWidth;
  let renderHeight = canvasHeight;
  let x = 0;
  let y = 0;

  if (canvasRatio > imgRatio) {
    renderHeight = canvasWidth / imgRatio;
    y = (canvasHeight - renderHeight) / 2;
  } else {
    renderWidth = canvasHeight * imgRatio;
    x = (canvasWidth - renderWidth) / 2;
  }

  // Draw directly without clearRect to prevent micro-flicker
  ctx.drawImage(img, x, y, renderWidth, renderHeight);
}
