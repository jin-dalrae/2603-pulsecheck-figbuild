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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 right-0 z-30 pointer-events-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Bar content */}
      <div className="relative flex items-center justify-between px-8 pt-5 pb-2">
        {/* Left group: Heart rate + Mood + Weather */}
        <div className="flex items-center gap-5">
          {/* Heart rate */}
          <div className="flex items-center gap-2">
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
                className="w-6 h-6"
                style={{ filter: `drop-shadow(0 0 8px ${heartGlow})` }}
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
              className="text-base tracking-tight"
              style={{ color: heartColor, textShadow: `0 0 10px ${heartGlow}, ${textShadow}` }}
            >
              {bpm}
            </motion.span>
            <span
              className="text-white/50 text-[10px] tracking-wider uppercase"
              style={{ textShadow }}
            >
              BPM
            </span>
          </div>

          {/* Separator */}
          <div className="w-[1px] h-5 bg-white/15" />

          {/* Mood */}
          <div className="flex items-center gap-2">
            <span className="text-base" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }}>{emotionEmoji[emotionalState]}</span>
            <span
              className="text-[12px] tracking-wider uppercase"
              style={{ color: moodColor, textShadow }}
            >
              {emotionalState}
            </span>
          </div>

          {/* Separator */}
          <div className="w-[1px] h-5 bg-white/15" />

          {/* Weather */}
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-yellow-400/70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }}
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <span
              className="text-white/60 text-[12px] tracking-wider"
              style={{ textShadow }}
            >
              72°F
            </span>
          </div>
        </div>

        {/* Center: Current time */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <span
            className="text-white/90 text-xl tracking-widest tabular-nums"
            style={{ textShadow }}
          >
            {time}
          </span>
        </div>

        {/* Right: spacer to balance flex layout */}
        <div />
      </div>

      {/* Counterpart info row — below icons */}
      <div className="relative flex items-center gap-3 px-8 pb-3">
        <span
          className="text-white/80 text-[13px] tracking-wide"
          style={{ textShadow }}
        >
          {counterpartName}
        </span>
        <div className="w-[1px] h-3.5 bg-white/15" />
        <span
          className="text-white/50 text-[11px] tracking-wider"
          style={{ textShadow }}
        >
          {counterpartInteractionCount} interactions
        </span>
        <div className="w-[1px] h-3.5 bg-white/15" />
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: satisfactionColor, boxShadow: `0 0 6px ${satisfactionColor}` }}
          />
          <span
            className="text-[11px] tracking-wider uppercase"
            style={{ color: satisfactionColor, textShadow }}
          >
            {satisfactionLabel}
          </span>
        </div>
      </div>

      {/* Subtle bottom edge line */}
      <div className="mx-8 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </motion.div>
  );
}