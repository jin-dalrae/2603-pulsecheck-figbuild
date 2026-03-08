import { motion } from "motion/react";
import type { EmotionalState } from "../../data";

interface TopStatusBarProps {
  time: string;
  bpm: number;
  baselineBpm: number;
  emotionalState: EmotionalState;
  counterpartName: string;
  counterpartInteractionCount: number;
  satisfactionScore: number; // 0-100
}

const emotionEmoji: Record<EmotionalState, string> = {
  calm: "😌",
  engaged: "🤝",
  anxious: "😰",
  frustrated: "😤",
  joyful: "😊",
  sad: "😔",
  defensive: "🛡️",
  withdrawn: "🫥",
};

const emotionColor: Record<EmotionalState, string> = {
  calm: "rgba(76, 175, 80, 0.7)",
  engaged: "rgba(33, 150, 243, 0.7)",
  anxious: "rgba(255, 152, 0, 0.7)",
  frustrated: "rgba(244, 67, 54, 0.7)",
  joyful: "rgba(255, 215, 0, 0.7)",
  sad: "rgba(156, 39, 176, 0.7)",
  defensive: "rgba(233, 30, 99, 0.7)",
  withdrawn: "rgba(96, 125, 139, 0.7)",
};

export function TopStatusBar({
  time,
  bpm,
  baselineBpm,
  emotionalState,
  counterpartName,
  counterpartInteractionCount,
  satisfactionScore,
}: TopStatusBarProps) {
  const bpmDelta = bpm - baselineBpm;
  const elevated = bpmDelta > 10;
  const high = bpmDelta > 18;

  const heartColor = high
    ? "rgba(244, 67, 54, 1)"
    : elevated
    ? "rgba(255, 152, 0, 0.95)"
    : "rgba(76, 175, 80, 0.9)";

  const heartGlow = high
    ? "rgba(244, 67, 54, 0.5)"
    : elevated
    ? "rgba(255, 152, 0, 0.4)"
    : "rgba(76, 175, 80, 0.3)";

  const pulseDuration = 60 / bpm;

  const moodColor = emotionColor[emotionalState];

  const satisfactionColor =
    satisfactionScore >= 70
      ? "rgba(76, 175, 80, 0.9)"
      : satisfactionScore >= 40
      ? "rgba(255, 152, 0, 0.9)"
      : "rgba(244, 67, 54, 0.9)";

  const satisfactionLabel =
    satisfactionScore >= 70
      ? "Positive"
      : satisfactionScore >= 40
      ? "Neutral"
      : "Difficult";

  // Shared text shadow for legibility over any background
  const textShadow = "0 1px 4px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.5)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.6 }}
      className="absolute bottom-52 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Single compact bar — all info in one horizontal strip */}
      <div className="flex items-center gap-5 px-6 py-3.5 rounded-xl bg-black/50 border border-white/[0.08] backdrop-blur-md">
        {/* Heart rate - LARGER */}
        <div className="flex items-center gap-2.5">
          <motion.div
            className="relative flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1, 1.1, 1] }}
            transition={{
              duration: pulseDuration * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              viewBox="0 0 24 22"
              className="w-7 h-7"
              style={{ filter: `drop-shadow(0 0 10px ${heartGlow})` }}
            >
              <path
                d="M12 21 C12 21 1.5 14 1.5 7 C1.5 3.5 4.5 1 7.5 1 C9.5 1 11 2.5 12 4 C13 2.5 14.5 1 16.5 1 C19.5 1 22.5 3.5 22.5 7 C22.5 14 12 21 12 21Z"
                fill={heartColor}
                stroke={heartColor}
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>
          <motion.span
            key={bpm}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold tracking-tight"
            style={{ color: heartColor, textShadow: `0 0 12px ${heartGlow}, ${textShadow}` }}
          >
            {bpm}
          </motion.span>
          <span
            className="text-white/50 text-xs tracking-wider uppercase font-bold"
            style={{ textShadow }}
          >
            BPM
          </span>
        </div>

        {/* Separator */}
        <div className="w-[1px] h-5 bg-white/20" />

        {/* Mood - LARGER */}
        <div className="flex items-center gap-2.5">
          <span className="text-xl" style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.7))" }}>{emotionEmoji[emotionalState]}</span>
          <span
            className="text-sm tracking-wider uppercase font-bold"
            style={{ color: moodColor, textShadow }}
          >
            {emotionalState}
          </span>
        </div>

        {/* Separator */}
        <div className="w-[1px] h-5 bg-white/20" />

        {/* Satisfaction */}
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: satisfactionColor, boxShadow: `0 0 8px ${satisfactionColor}` }}
          />
          <span
            className="text-xs tracking-wider uppercase font-bold"
            style={{ color: satisfactionColor, textShadow }}
          >
            {satisfactionLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}