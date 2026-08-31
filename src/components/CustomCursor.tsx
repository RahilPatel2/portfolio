"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  
  // Use motion values for direct DOM updates without React re-renders (fixes lag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Very snappy spring config
  const springConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(hover: none)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      if (hidden) setHidden(false);
    };

    const onMouseLeave = () => setHidden(true);

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [hidden, cursorX, cursorY]);

  if (hidden) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999]"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    />
  );
}
