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
      className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[720px] max-w-[92%] z-20 pointer-events-none flex flex-col gap-6"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex flex-col gap-10">
        {/* Other Person's Talk - Left Aligned, LARGER */}
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
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-2 h-2 rounded-full bg-white/40 shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
                  <span className="text-xs tracking-[0.25em] uppercase text-white/70 font-bold">
                    {lastOtherTurn.speakerName}
                  </span>
                  <span className="text-white/[0.25] text-[10px] font-light">
                    {lastOtherTurn.timestamp.substring(0, 5)}
                  </span>
                </div>
                <p className="text-xs leading-relaxed tracking-wide text-white text-left pl-5 border-l-[3px] border-white/25 font-medium">
                  {lastOtherTurn.text.length > 250 ? truncate(lastOtherTurn.text, 250) : lastOtherTurn.text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User's Talk - Right Aligned, LARGER */}
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
                <div className="flex items-center gap-2.5 mb-2.5 justify-end">
                  <span className="text-white/[0.25] text-[10px] font-light">
                    {lastUserTurn.timestamp.substring(0, 5)}
                  </span>
                  <span className="text-xs tracking-[0.25em] uppercase text-blue-400 font-bold">
                    YOU
                  </span>
                  <div className="w-2 h-2 rounded-full bg-blue-500/70 shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
                </div>
                <p className="text-xs leading-relaxed tracking-wide text-white text-right pr-5 border-r-[3px] border-blue-500/50 font-medium">
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
