"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;

    let ringX = -100;
    let ringY = -100;

    let isVisible = false;
    let isHovered = false;
    let isClicking = false;
    let isTextHovered = false;
    let isTouchActive = false;

    let rafId: number;
    let isFirstMove = true;

    // Direct event listener for zero-latency tracking
    const onMouseMove = (e: MouseEvent) => {
      if (isTouchActive) return;

      mouseX = e.clientX;
      mouseY = e.clientY;

      if (isFirstMove) {
        ringX = mouseX;
        ringY = mouseY;
        isFirstMove = false;
      }

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Check target element for interactive states
      const target = e.target as HTMLElement | null;
      if (target) {
        isHovered = Boolean(
          target.closest("a, button, [role='button'], input[type='submit'], .cursor-pointer")
        );
        isTextHovered = Boolean(
          target.closest("input, textarea, [contenteditable='true']")
        );
      }
    };

    const onTouchStart = () => {
      isTouchActive = true;
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onTouchEnd = () => {
      // Re-enable mouse visibility only after touch finishes
      setTimeout(() => {
        isTouchActive = false;
      }, 500);
    };

    const onMouseDown = () => {
      if (!isTouchActive) isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      if (!isTouchActive) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    // Ultra-smooth 60-120fps render loop
    const animate = () => {
      if (isVisible && !isTouchActive) {
        // Dot moves with ZERO latency (instantaneous native speed)
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${
          isTextHovered ? 0 : isHovered ? 0.6 : 1
        })`;

        // Ring smoothly glides with buttery inertia
        const lerpFactor = 0.22;
        ringX += (mouseX - ringX) * lerpFactor;
        ringY += (mouseY - ringY) * lerpFactor;

        // Velocity stretch for organic fluid feel
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const stretch = Math.min(distance * 0.003, 0.25);

        const baseScale = isTextHovered ? 0 : isClicking ? 0.8 : isHovered ? 1.6 : 1;
        const scaleX = baseScale * (1 + stretch);
        const scaleY = baseScale * (1 - stretch);

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;

        // Interactive styling updates
        if (isHovered) {
          ring.style.borderColor = "rgba(255, 255, 255, 0.85)";
          ring.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
        } else {
          ring.style.borderColor = "rgba(255, 255, 255, 0.4)";
          ring.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Instant Center Dot: 0ms Latency */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[99999] opacity-0 transition-opacity duration-200"
        style={{
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
          willChange: "transform, opacity",
        }}
      />

      {/* Fluid Trailing Halo: Buttery Inertia */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/40 pointer-events-none z-[99998] opacity-0 transition-opacity duration-200"
        style={{
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 10px rgba(255, 255, 255, 0.05)",
          willChange: "transform, opacity",
          backdropFilter: "blur(0.5px)",
        }}
      />
    </>
  );
}
