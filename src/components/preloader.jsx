"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [hideBg, setHideBg] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          setHideBg(true);
          if (onFinish) onFinish();
        }, 1000);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!hideBg && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 md:gap-4 text-white font-bold">
            <div className="flex items-center justify-center w-3 h-3">
              <span className="text-xs md:text-base">0</span>
            </div>
            {/* Garis progres */}
            <div className="relative h-[1px] bg-gray-700 rounded-full overflow-hidden w-[150px] md:w-[250px]">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
            <div className="flex items-center justify-center w-6 md:w-8 h-3">
              <span className="text-xs md:text-base">{progress}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
