import { motion } from "motion/react";

interface HeartRateIconProps {
  bpm: number;
  baselineBpm: number;
}

export function HeartRateIcon({ bpm, baselineBpm }: HeartRateIconProps) {
  const delta = bpm - baselineBpm;
  const elevated = delta > 10;
  const high = delta > 18;

  const color = high
    ? "rgba(244, 67, 54, 0.85)"
    : elevated
    ? "rgba(255, 152, 0, 0.75)"
    : "rgba(76, 175, 80, 0.65)";

  const glowColor = high
    ? "rgba(244, 67, 54, 0.3)"
    : elevated
    ? "rgba(255, 152, 0, 0.2)"
    : "rgba(76, 175, 80, 0.15)";

  const pulseDuration = 60 / bpm;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.6 }}
      className="absolute top-8 left-8 z-20 pointer-events-none flex items-center justify-center"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: [1, 1.12, 1, 1.06, 1],
        }}
        transition={{
          duration: pulseDuration * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow behind heart */}
        <div
          className="absolute inset-0 blur-xl rounded-full"
          style={{ backgroundColor: glowColor, transform: "scale(2)" }}
        />

        {/* Heart SVG */}
        <svg
          viewBox="0 0 64 58"
          className="w-14 h-14 relative z-10"
          style={{ filter: `drop-shadow(0 0 8px ${glowColor})` }}
        >
          <path
            d="M32 56 C32 56 4 38 4 18 C4 8 12 2 20 2 C26 2 30 6 32 10 C34 6 38 2 44 2 C52 2 60 8 60 18 C60 38 32 56 32 56Z"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M32 56 C32 56 4 38 4 18 C4 8 12 2 20 2 C26 2 30 6 32 10 C34 6 38 2 44 2 C52 2 60 8 60 18 C60 38 32 56 32 56Z"
            fill={color}
            opacity="0.12"
          />
        </svg>

        {/* BPM value inside heart */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20" style={{ paddingBottom: '4px' }}>
          <motion.span
            key={bpm}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-sm tracking-tight"
            style={{ color, textShadow: `0 0 6px ${glowColor}` }}
          >
            {bpm}
          </motion.span>
          <span
            className="text-[6px] tracking-widest uppercase"
            style={{ color, opacity: 0.5 }}
          >
            BPM
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
