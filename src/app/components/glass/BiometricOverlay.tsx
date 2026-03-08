import { motion } from "motion/react";
import type { HeartbeatSlice } from "../../data";

interface BiometricOverlayProps {
  slice: HeartbeatSlice;
  baseline: { baselineBpm: number; baselineHrv: number };
}

export function BiometricOverlay({ slice, baseline }: BiometricOverlayProps) {
  const bpmDelta = slice.avgBpm - baseline.baselineBpm;
  const bpmElevated = bpmDelta > 10;
  const bpmHigh = bpmDelta > 18;

  const bpmColor = bpmHigh
    ? "rgba(244, 67, 54, 0.8)"
    : bpmElevated
    ? "rgba(255, 152, 0, 0.7)"
    : "rgba(76, 175, 80, 0.6)";

  const hrvLow = slice.hrvMs < baseline.baselineHrv - 10;
  const hrvColor = hrvLow ? "rgba(255, 152, 0, 0.6)" : "rgba(76, 175, 80, 0.5)";

  // Heartbeat pulse animation speed based on BPM
  const pulseDuration = 60 / slice.avgBpm;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.6 }}
      className="absolute top-8 right-8 z-20 pointer-events-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Heartbeat wave — top accent */}
      <div className="mb-3 w-24 h-8 relative overflow-hidden opacity-30">
        <svg
          viewBox="0 0 96 32"
          className="w-full h-full"
          style={{ filter: `drop-shadow(0 0 4px ${bpmColor})` }}
        >
          <motion.path
            d="M0,16 Q6,16 12,16 L18,16 L22,5 L26,26 L31,10 L36,20 L40,16 Q46,16 54,16 L60,16 L64,5 L68,26 L73,10 L78,20 L82,16 Q88,16 96,16"
            fill="none"
            stroke={bpmColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: pulseDuration * 2, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.5 },
            }}
          />
        </svg>
      </div>

      {/* Stats grid */}
      <div className="space-y-2.5">
        {/* Heart rate */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                scale: [1, 1.3, 1, 1.15, 1],
                opacity: [0.6, 1, 0.6, 0.85, 0.6],
              }}
              transition={{
                duration: pulseDuration * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: bpmColor }}
            />
            <span className="text-white/20 text-[9px] tracking-wider uppercase">
              BPM
            </span>
          </div>
          <motion.span
            key={slice.avgBpm}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-lg tracking-tight font-light"
            style={{ color: bpmColor }}
          >
            {slice.avgBpm}
          </motion.span>
        </div>

        {/* HRV */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-sm"
              style={{ backgroundColor: hrvColor }}
            />
            <span className="text-white/20 text-[9px] tracking-wider uppercase">
              HRV
            </span>
          </div>
          <span
            className="text-sm tracking-tight font-light"
            style={{ color: hrvColor }}
          >
            {slice.hrvMs}
          </span>
        </div>

        {/* Delta indicator */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/15 text-[9px] tracking-wider uppercase">
            Δ
          </span>
          <span className={`text-xs ${bpmDelta > 0 ? 'text-amber-400/40' : 'text-green-400/40'}`}>
            {bpmDelta > 0 ? '+' : ''}{bpmDelta}
          </span>
        </div>
      </div>

      {/* Decorative line */}
      <div className="mt-4 w-16 h-[1px] bg-gradient-to-l from-white/20 to-transparent" />
    </motion.div>
  );
}