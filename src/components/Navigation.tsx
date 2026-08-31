"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show navbar when scrolled down to ~4.5 screens (when M7 "I BUILD DIGITAL EXPERIENCES" starts)
    const threshold = typeof window !== "undefined" ? window.innerHeight * 4.5 : 4000;
    
    if (latest > threshold) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <div className="fixed top-8 left-0 w-full z-50 flex justify-center pointer-events-none">
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1, scale: 1 },
          hidden: { y: -50, opacity: 0, scale: 0.9 },
        }}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center justify-center bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        style={{ padding: "20px 80px" }}
      >
        <nav 
          className="flex items-center justify-center text-xs font-mono tracking-[0.3em] text-white/80 whitespace-nowrap"
          style={{ gap: "60px" }}
        >
          <Link href="#work" className="hover:text-white transition-colors duration-300">
            WORK
          </Link>
          <Link href="#about" className="hover:text-white transition-colors duration-300">
            ABOUT
          </Link>
          <Link href="#experience" className="hover:text-white transition-colors duration-300">
            EXPERIENCE
          </Link>
          <Link href="#contact" className="hover:text-white transition-colors duration-300">
            CONTACT
          </Link>
        </nav>
      </motion.header>
    </div>
  );
}
