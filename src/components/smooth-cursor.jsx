"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function SmoothCursor() {
  const cursorX = useMotionValue(-100); // awalnya di luar layar
  const cursorY = useMotionValue(-100);

  // Biar gerakannya smooth
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 10); // -10 biar center
      cursorY.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="hidden lg:block fixed top-0 left-0 w-8 h-8 rounded-full border border-white/80 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        translateX: springX,
        translateY: springY,
      }}
    />
  );
}
