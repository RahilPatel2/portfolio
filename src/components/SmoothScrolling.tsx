"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Determine if device is a touchscreen (mobile/tablet)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    // On touch devices, native momentum scrolling is 120Hz hardware-accelerated.
    // Lenis is configured to smooth wheel events on desktop without hijacking touch.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: !isTouch,
      syncTouch: false,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
