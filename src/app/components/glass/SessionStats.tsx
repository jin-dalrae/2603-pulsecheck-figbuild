import { motion } from "motion/react";

interface SessionStatsProps {
  interactionNumber: number;
  totalInteractions: number;
  date: string;
  time: string;
  emotionalState: string;
}

export function SessionStats({
  interactionNumber,
  totalInteractions,
  date,
  time,
  emotionalState,
}: SessionStatsProps) {
  const progress = interactionNumber / totalInteractions;
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="absolute bottom-8 left-8 z-20 pointer-events-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="relative flex items-center justify-center w-[76px] h-[76px]">
        {/* Outer glow */}
        <div
          className="absolute inset-0 rounded-full blur-lg"
          style={{ backgroundColor: "rgba(33, 150, 243, 0.1)" }}
        />

        {/* Background ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 76 76"
        >
          {/* Translucent background fill */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="rgba(255, 255, 255, 0.04)"
          />
          {/* Track */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="3"
          />
          {/* Progress arc */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            stroke="rgba(33, 150, 243, 0.5)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>

        {/* Inner circle background */}
        <div className="absolute inset-[6px] rounded-full bg-white/[0.03] border border-white/[0.04] backdrop-blur-sm" />

        {/* People icon + number */}
        <div className="relative flex flex-col items-center justify-center z-10">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-white/25 mb-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <motion.span
            key={interactionNumber}
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white/70 text-lg tabular-nums"
            style={{ textShadow: "0 0 10px rgba(33, 150, 243, 0.3)" }}
          >
            {interactionNumber}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
