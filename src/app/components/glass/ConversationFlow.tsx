import { motion, AnimatePresence } from "motion/react";
import type { Interaction } from "../../data";

interface ConversationFlowProps {
  interaction: Interaction;
  currentIndex: number;
  counterpartName: string;
}

export function ConversationFlow({ interaction, currentIndex, counterpartName }: ConversationFlowProps) {
  if (currentIndex < 0) return null;

  const currentTurn = interaction.transcript[currentIndex];
  const prevTurn = currentIndex > 0 ? interaction.transcript[currentIndex - 1] : null;

  if (!currentTurn) return null;

  const isUser = currentTurn.speaker === "user";
  const prevIsUser = prevTurn ? prevTurn.speaker === "user" : false;

  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + "…" : text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[560px] max-w-[90%] z-20 pointer-events-none"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex flex-col w-full">
        {/* Previous turn — fading context */}
        <AnimatePresence mode="popLayout">
          {prevTurn && (
            <motion.div
              key={`prev-${currentIndex - 1}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 0.15, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.4 }}
              className="mb-2 w-full"
            >
              <div className={`flex items-center gap-2 mb-0.5 ${prevIsUser ? "justify-end" : "justify-start"}`}>
                {!prevIsUser && (
                  <>
                    <span className="text-white/10 text-[9px] tracking-wider uppercase">
                      {prevTurn.speakerName}
                    </span>
                    <span className="text-white/[0.06] text-[8px]">
                      {prevTurn.timestamp.substring(0, 5)}
                    </span>
                  </>
                )}
                {prevIsUser && (
                  <>
                    <span className="text-white/[0.06] text-[8px]">
                      {prevTurn.timestamp.substring(0, 5)}
                    </span>
                    <span className="text-white/10 text-[9px] tracking-wider uppercase">
                      {prevTurn.speakerName}
                    </span>
                  </>
                )}
              </div>
              <p className={`text-white/10 text-[10px] line-clamp-1 tracking-wide ${prevIsUser ? "text-right" : "text-left"}`}>
                {truncate(prevTurn.text, 150)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Current turn */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`current-${currentIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
          >
            <div className={`flex items-center gap-2 mb-1 ${isUser ? "justify-end" : "justify-start"}`}>
              {!isUser && (
                <>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[10px] tracking-wider uppercase text-white/25">
                    {currentTurn.speakerName}
                  </span>
                  <span className="text-white/[0.08] text-[8px]">
                    {currentTurn.timestamp.substring(0, 5)}
                  </span>
                </>
              )}
              {isUser && (
                <>
                  <span className="text-white/[0.08] text-[8px]">
                    {currentTurn.timestamp.substring(0, 5)}
                  </span>
                  <span className="text-[10px] tracking-wider uppercase text-blue-400/50">
                    YOU
                  </span>
                  <div className="w-1 h-1 rounded-full bg-blue-400/40" />
                </>
              )}
            </div>
            <p
              className={`text-sm leading-relaxed tracking-wide ${
                isUser ? "text-center text-white/80" : "text-center text-white/70"
              }`}
            >
              {currentTurn.text.length > 150 ? truncate(currentTurn.text, 150) : currentTurn.text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Subtle divider line */}
        <motion.div
          className={`mt-3 h-[1px] w-full ${isUser ? "ml-auto" : "mr-auto"}`}
          animate={{
            background: isUser
              ? "linear-gradient(270deg, rgba(100, 181, 246, 0.25) 0%, transparent 100%)"
              : "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)",
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
}