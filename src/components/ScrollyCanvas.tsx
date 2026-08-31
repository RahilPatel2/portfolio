"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 179;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // By using Lenis, we already have smooth scrolling globally.
  // Using useSpring here causes "double smoothing" lag. Direct mapping is perfectly buttery.
  const smoothProgress = scrollYProgress;

  // Load images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${frameNumber}_delay-0.056s.png`;
      img.onload = async () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          // Pre-decode first 30 frames to prevent initial scroll lag
          try {
            await Promise.all(loadedImages.slice(0, 30).map(image => image.decode()));
          } catch (e) {
            console.error("Decoding error:", e);
          }
          setImages(loadedImages);
          // Draw first frame immediately once all loaded
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) drawImageCover(ctx, canvasRef.current, loadedImages[0]);
          }
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    return frameIndex.on("change", (latest) => {
      if (images.length === FRAME_COUNT && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        const currentFrame = Math.floor(latest);
        if (ctx && images[currentFrame]) {
          requestAnimationFrame(() => {
            drawImageCover(ctx, canvasRef.current!, images[currentFrame]);
          });
        }
      }
    });
  }, [frameIndex, images]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && images.length === FRAME_COUNT) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const ctx = canvasRef.current.getContext("2d");
        const currentFrame = Math.floor(frameIndex.get());
        if (ctx && images[currentFrame]) {
          drawImageCover(ctx, canvasRef.current, images[currentFrame]);
        }
      }
    };

    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

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

  // MOBILE TIMINGS
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
        {/* Desktop */}
        <motion.div style={{ opacity: m1Opacity, scale: m1Scale, filter: m1Blur }} className="hidden md:flex absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-6">
          <h1 className="text-5xl md:text-8xl font-light tracking-[0.15em] mb-4 drop-shadow-2xl">RAHIL PAMBHAR</h1>
          <p className="text-xl md:text-3xl font-mono tracking-[0.3em] text-white/70">
            FULL STACK DEVELOPER
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="inline-block ml-1">|</motion.span>
          </p>
        </motion.div>
        {/* Mobile */}
        <motion.div style={{ opacity: mM1Opacity, scale: mM1Scale, filter: mM1Blur }} className="flex md:hidden absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-4">
          <h1 className="text-4xl font-light tracking-[0.15em] mb-3 drop-shadow-2xl text-center w-full">RAHIL PAMBHAR</h1>
          <p className="text-sm font-mono tracking-[0.2em] text-white/70 w-full text-center">
            FULL STACK DEVELOPER
          </p>
        </motion.div>

        {/* =======================
            MOMENT 2
        ========================= */}
        {/* Desktop */}
        <motion.div style={{ opacity: m2Opacity, y: m2Y, scale: m2Scale, filter: m2Blur }} className="hidden md:flex absolute inset-0 flex-col items-start justify-center pl-8 md:pl-20 pointer-events-none text-white text-left">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-5 drop-shadow-2xl max-w-2xl">B.Tech in Computer Science</h2>
          <div className="border-l border-white/30 pl-5">
            <p className="text-2xl md:text-3xl font-mono tracking-[0.15em] text-white/90">8.91 CGPA</p>
            <p className="text-sm md:text-lg font-mono tracking-[0.1em] text-white/50 mt-2">Indrashil University · 2022–2026</p>
          </div>
        </motion.div>
        {/* Mobile */}
        <motion.div style={{ opacity: mM2Opacity, y: mM2Y, scale: mM2Scale, filter: mM2Blur }} className="flex md:hidden absolute inset-0 flex-col items-center justify-center px-6 pointer-events-none text-white text-center">
          <h2 className="text-3xl font-light tracking-wide mb-4 drop-shadow-2xl leading-snug">B.Tech in Computer Science</h2>
          <p className="text-xl font-mono tracking-[0.1em] text-white/90 border-t border-white/20 pt-4">8.91 CGPA</p>
        </motion.div>

        {/* =======================
            MOMENT 3
        ========================= */}
        {/* Desktop */}
        <motion.div style={{ opacity: m3Opacity, y: m3Y, scale: m3Scale, filter: m3Blur }} className="hidden md:flex absolute inset-0 flex-col items-end justify-center pr-8 md:pr-20 pointer-events-none text-white text-right">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-5 drop-shadow-2xl max-w-2xl">Full Stack Experience</h2>
          <div className="border-r border-white/30 pr-5">
            <p className="text-xl md:text-2xl font-mono tracking-[0.15em] text-white/90">INTERNED AT</p>
            <p className="text-sm md:text-lg font-mono tracking-[0.1em] text-white/50 mt-2 max-w-md">Cloud Elevate Technologies, Magorix Ltd & Vaishnav Technology</p>
          </div>
        </motion.div>
        {/* Mobile */}
        <motion.div style={{ opacity: mM3Opacity, y: mM3Y, scale: mM3Scale, filter: mM3Blur }} className="flex md:hidden absolute inset-0 flex-col items-center justify-center px-6 pointer-events-none text-white text-center">
          <h2 className="text-3xl font-light tracking-wide mb-4 drop-shadow-2xl leading-snug">Full Stack Experience</h2>
          <div className="border-t border-white/20 pt-4">
            <p className="text-sm font-mono tracking-[0.1em] text-white/90 mb-1">INTERNED AT</p>
            <p className="text-xs font-mono tracking-widest text-white/50 leading-relaxed max-w-[250px] mx-auto">Cloud Elevate, Magorix & Vaishnav Tech</p>
          </div>
        </motion.div>

        {/* =======================
            MOMENT 4
        ========================= */}
        {/* Desktop */}
        <motion.div style={{ opacity: m4Opacity, y: m4Y, scale: m4Scale, filter: m4Blur }} className="hidden md:flex absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-6">
          <div className="absolute inset-0 bg-black/20 -z-10" />
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 drop-shadow-2xl max-w-4xl">I BUILD DIGITAL EXPERIENCES</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 text-white/50 font-mono tracking-widest text-xs md:text-sm">
            <span>SNAP & GET</span>
            <span className="hidden md:inline-block w-1 h-1 bg-white/20 rounded-full" />
            <span>COLLABORATIVE WHITEBOARD</span>
            <span className="hidden md:inline-block w-1 h-1 bg-white/20 rounded-full" />
            <span>WEATHER DASHBOARD</span>
          </div>
        </motion.div>
        {/* Mobile */}
        <motion.div style={{ opacity: mM4Opacity, y: mM4Y, scale: mM4Scale, filter: mM4Blur }} className="flex md:hidden absolute inset-0 flex-col items-center justify-center pointer-events-none text-white text-center px-4">
          <div className="absolute inset-0 bg-black/30 -z-10" />
          <h2 className="text-3xl font-light tracking-tight mb-6 drop-shadow-2xl leading-snug">I BUILD DIGITAL EXPERIENCES</h2>
          <div className="flex flex-col items-center justify-center gap-3 text-white/50 font-mono tracking-widest text-[10px]">
            <span>SNAP & GET</span>
            <span>COLLABORATIVE WHITEBOARD</span>
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
  if (!img.complete || img.naturalWidth === 0) return;
  
  const canvasRatio = canvas.width / canvas.height;
  const imgRatio = img.width / img.height;
  
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

