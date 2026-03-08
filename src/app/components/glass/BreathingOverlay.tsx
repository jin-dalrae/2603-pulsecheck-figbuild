import { motion } from "motion/react";

export function BreathingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-none"
    >
      {/* Concentric breathing circles */}
      <div className="relative w-32 h-32">
        {/* Outer ring */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1.4, 1],
            opacity: [0.15, 0.25, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.6, 1],
          }}
          className="absolute inset-0 rounded-full border border-blue-400/20"
          style={{
            boxShadow: "0 0 40px 8px rgba(100, 181, 246, 0.05)",
          }}
        />

        {/* Middle ring */}
        <motion.div
          animate={{
            scale: [0.7, 1.1, 1.1, 0.7],
            opacity: [0.2, 0.35, 0.35, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.6, 1],
          }}
          className="absolute inset-4 rounded-full border border-blue-300/25"
        />

        {/* Inner core */}
        <motion.div
          animate={{
            scale: [0.5, 0.85, 0.85, 0.5],
            opacity: [0.25, 0.5, 0.5, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.6, 1],
          }}
          className="absolute inset-8 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(100, 181, 246, 0.15), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}
