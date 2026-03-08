import { motion } from "motion/react";
import type { NudgeType } from "./GlassHUD";

interface NudgeSystemProps {
  type: NudgeType;
}

const nudgeConfig = {
  awareness: {
    text: null,
    color: "rgba(255, 152, 0, 0.6)",
    glowColor: "rgba(255, 152, 0, 0.15)",
    position: "left" as const,
  },
  breathe: {
    text: "B R E A T H E",
    subtitle: "Elevated heart rate detected",
    color: "rgba(100, 181, 246, 0.9)",
    glowColor: "rgba(100, 181, 246, 0.12)",
    position: "center" as const,
  },
  pause: {
    text: "P A U S E",
    subtitle: "High stress markers present",
    color: "rgba(255, 183, 77, 0.9)",
    glowColor: "rgba(255, 183, 77, 0.15)",
    position: "center" as const,
  },
  exit: {
    text: "S T E P  A W A Y",
    subtitle: "Critical arousal levels",
    color: "rgba(239, 83, 80, 0.9)",
    glowColor: "rgba(239, 83, 80, 0.2)",
    position: "center" as const,
  },
};

export function NudgeSystem({ type }: NudgeSystemProps) {
  if (!type) return null;
  const config = nudgeConfig[type];

  // Awareness nudge — just a peripheral glow, no text
  if (type === "awareness") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.7, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
      >
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: config.color,
            boxShadow: `0 0 20px 8px ${config.glowColor}, 0 0 40px 16px ${config.glowColor}`,
          }}
        />
      </motion.div>
    );
  }

  // Text-based nudges — bold center announcement
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Main announcement text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl tracking-[0.5em] font-light mb-4"
          style={{
            color: config.color,
            textShadow: `0 0 40px ${config.glowColor}, 0 0 80px ${config.glowColor}`,
          }}
        >
          {config.text}
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: config.color }}
        >
          {config.subtitle}
        </motion.div>
      </motion.div>

      {/* Decorative lines */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-64 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 w-64 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${config.color}, transparent)` }}
      />
    </motion.div>
  );
}