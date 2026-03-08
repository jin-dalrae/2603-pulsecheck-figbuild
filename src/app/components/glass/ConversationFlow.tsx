import { motion, AnimatePresence } from "motion/react";
import type { Interaction } from "../../data";

interface ConversationFlowProps {
  interaction: Interaction;
  currentIndex: number;
  counterpartName: string;
}

export function ConversationFlow({ interaction, currentIndex, counterpartName }: ConversationFlowProps) {
  if (currentIndex < 0) return null;

  // Find the most recent turn for each speaker type up to the current index
  const turnsUpToCurrent = interaction.transcript.slice(0, currentIndex + 1);
  
  // Find the last turn for each speaker by scanning backwards through the current transcript slice
  let lastUserTurn = null;
  let lastOtherTurn = null;
  let lastUserIndex = -1;
  let lastOtherIndex = -1;

  for (let i = turnsUpToCurrent.length - 1; i >= 0; i--) {
    const turn = turnsUpToCurrent[i];
    if (turn.speaker === "user" && !lastUserTurn) {
      lastUserTurn = turn;
      lastUserIndex = i;
    } else if (turn.speaker !== "user" && !lastOtherTurn) {
      lastOtherTurn = turn;
      lastOtherIndex = i;
    }
  }

  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + "…" : text;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[640px] max-w-[92%] z-20 pointer-events-none flex flex-col gap-6"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex flex-col gap-8">
        {/* Other Person's Talk - Left Aligned */}
        <div className="w-full flex justify-start">
          <AnimatePresence mode="popLayout">
            {lastOtherTurn && (
              <motion.div
                key={`other-turn-${lastOtherIndex}`}
                initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -10, filter: "blur(2px)" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[85%]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/60">
                    {lastOtherTurn.speakerName}
                  </span>
                  <span className="text-white/[0.18] text-[9px] font-light">
                    {lastOtherTurn.timestamp.substring(0, 5)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed tracking-wide text-white text-left pl-4 border-l-2 border-white/20">
                  {lastOtherTurn.text.length > 250 ? truncate(lastOtherTurn.text, 250) : lastOtherTurn.text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User's Talk - Right Aligned */}
        <div className="w-full flex justify-end">
          <AnimatePresence mode="popLayout">
            {lastUserTurn && (
              <motion.div
                key={`user-turn-${lastUserIndex}`}
                initial={{ opacity: 0, x: 15, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 10, filter: "blur(2px)" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[85%]"
              >
                <div className="flex items-center gap-2 mb-2 justify-end">
                  <span className="text-white/[0.18] text-[9px] font-light">
                    {lastUserTurn.timestamp.substring(0, 5)}
                  </span>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-blue-400/80">
                    YOU
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/60 shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
                </div>
                <p className="text-sm leading-relaxed tracking-wide text-white text-right pr-4 border-r-2 border-blue-500/40">
                  {lastUserTurn.text.length > 250 ? truncate(lastUserTurn.text, 250) : lastUserTurn.text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}