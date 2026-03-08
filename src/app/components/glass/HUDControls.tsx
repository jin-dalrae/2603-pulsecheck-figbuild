import { motion } from "motion/react";
import { Play, Square, SkipForward, SkipBack, Eye, EyeOff } from "lucide-react";
import type { PlayState } from "./GlassHUD";

interface HUDControlsProps {
  playState: PlayState;
  hudVisible: boolean;
  onTogglePlay: () => void;
  onSkipNext: () => void;
  onSkipPrev: () => void;
  onToggleHud: () => void;
  interactionLabel: string;
  interactionTitle: string;
}

export function HUDControls({
  playState,
  hudVisible,
  onTogglePlay,
  onSkipNext,
  onSkipPrev,
  onToggleHud,
  interactionLabel,
  interactionTitle,
}: HUDControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="absolute bottom-6 right-8 z-40"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Title and label */}
      <div className="mb-3 text-right">
        
        
      </div>

      {/* Controls grid */}
      <div className="flex items-center gap-2 justify-end">
        <button
          onClick={onSkipPrev}
          className="p-1.5 text-white/25 hover:text-white/60 transition-colors bg-white/[0.02] border border-white/[0.05] rounded"
        >
          <SkipBack size={12} />
        </button>

        {playState === "playing" || playState === "paused" ? (
          <button
            onClick={onTogglePlay}
            className="p-1.5 text-white/35 hover:text-white/70 transition-colors bg-white/[0.03] border border-white/[0.08] rounded"
          >
            {playState === "playing" ? <Square size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
          </button>
        ) : null}

        <button
          onClick={onSkipNext}
          className="p-1.5 text-white/25 hover:text-white/60 transition-colors bg-white/[0.02] border border-white/[0.05] rounded"
        >
          <SkipForward size={12} />
        </button>

        <div className="w-[1px] h-4 bg-white/[0.06] mx-0.5" />

        <button
          onClick={onToggleHud}
          className="p-1.5 text-white/20 hover:text-white/50 transition-colors bg-white/[0.02] border border-white/[0.05] rounded"
        >
          {hudVisible ? <Eye size={12} /> : <EyeOff size={12} />}
        </button>
      </div>
    </motion.div>
  );
}