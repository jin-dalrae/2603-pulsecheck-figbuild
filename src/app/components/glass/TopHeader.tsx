import { motion } from "motion/react";

interface TopHeaderProps {
  counterpartName: string;
  counterpartInteractionCount: number;
}

export function TopHeader({ counterpartName, counterpartInteractionCount }: TopHeaderProps) {
  const textShadow = "0 1px 4px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.5)";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6 }}
      className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex items-center gap-4">
        <span
          className="text-white/90 text-lg tracking-wide font-bold uppercase"
          style={{ textShadow }}
        >
          {counterpartName}
        </span>
        <div className="w-[1px] h-4 bg-white/25" />
        <span
          className="text-white/60 text-sm tracking-wider"
          style={{ textShadow }}
        >
          {counterpartInteractionCount} interactions
        </span>
      </div>
    </motion.div>
  );
}
