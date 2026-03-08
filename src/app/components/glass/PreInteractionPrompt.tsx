import { motion } from "motion/react";
import type { PersonProfile, Interaction } from "../../data";
import { relationshipTrends, userProfile } from "../../data";

interface PreInteractionPromptProps {
  person: PersonProfile;
  interaction: Interaction;
  onStart: () => void;
}

export function PreInteractionPrompt({ person, interaction, onStart }: PreInteractionPromptProps) {
  const trend = relationshipTrends.find((t) => t.personId === person.id);
  const lastDayData = trend?.weeklyData[trend.weeklyData.length - 1];

  // Generate a context-appropriate prompt based on relationship data
  const getPatternSummary = (): string => {
    if (interaction.saveEvent) {
      return "Previous interaction showed elevated stress. Be aware of defensive patterns.";
    }
    if (interaction.surpriseInsight) {
      return "Your verbal tone may mask physiological stress. Check in with your body.";
    }
    if (trend?.overallTrend === "volatile") {
      return `Interactions have been high-intensity. Your avg BPM with ${person.name.split(" ")[0]}: ${lastDayData?.avgBpm || "—"}`;
    }
    if (lastDayData && lastDayData.stressScore > 50) {
      return `Recent stress score: ${lastDayData.stressScore}/100. Consider grounding before engaging.`;
    }
    return `${person.relationshipType === "client" ? "Client interaction" : person.relationshipType === "manager" ? "Management sync" : "Conversation"} · ${interaction.context || ""}`;
  };

  const showGroundingOption =
    (lastDayData?.stressScore || 0) > 40 || interaction.saveEvent || trend?.overallTrend === "volatile";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 flex items-center justify-center z-30"
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-md w-full mx-8"
      >
        {/* Calendar-style pre-interaction card */}
        <div className="relative">
          {/* Subtle backdrop */}
          <div className="absolute -inset-8 bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl" />

          <div className="relative">
            {/* Time and context */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
              <span
                className="text-white/30 text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {interaction.timeStart.substring(0, 5)} · {interaction.location}
              </span>
            </div>

            {/* Person identity */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 text-sm shrink-0"
                style={{
                  backgroundColor: person.avatarColor + "30",
                  border: `1px solid ${person.avatarColor}40`,
                }}
              >
                {person.initials}
              </div>
              <div>
                <div className="text-white/70 text-sm">{person.name}</div>
                <div className="text-white/25 text-xs">{person.company} · {person.relationshipType}</div>
              </div>
            </div>

            {/* Pattern summary */}
            <div className="text-white/35 text-xs mb-6 leading-relaxed">
              {getPatternSummary()}
            </div>

            {/* Biometric context */}
            {lastDayData && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                  <span className="text-white/25 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Baseline {userProfile.baselineBpm} BPM
                  </span>
                </div>
                {lastDayData.stressScore > 40 && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                    <span className="text-white/25 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Recent: {lastDayData.avgBpm} BPM
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onStart}
                className="text-white/50 text-xs border border-white/10 px-5 py-2 rounded-full hover:bg-white/5 hover:text-white/70 transition-all"
              >
                Begin monitoring
              </motion.button>
              {showGroundingOption && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onStart}
                  className="text-blue-400/50 text-xs border border-blue-400/15 px-5 py-2 rounded-full hover:bg-blue-400/5 hover:text-blue-400/70 transition-all"
                >
                  Ground first
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
