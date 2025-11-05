"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";

export default function SimpleLoader({ fadingOut }) {
  return (
    <AnimatePresence>
      {!fadingOut && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
            }}
          >
            <Spinner className="w-5 h-5" />
          </motion.div>
        </motion.div>
      )}

      {fadingOut && (
        <motion.div
          key="fadeout"
          className="fixed inset-0 z-50 flex items-center justify-center bg-accent"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Spinner className="w-5 h-5" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
