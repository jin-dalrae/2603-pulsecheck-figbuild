import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { allInteractions, getProfile, userProfile } from "../../data";
import type { HeartbeatSlice, EmotionalState } from "../../data";
import { BiometricOverlay } from "./BiometricOverlay";
import { TopStatusBar } from "./TopStatusBar";
import { NudgeSystem } from "./NudgeSystem";
import { PeripheralGlow } from "./PeripheralGlow";
import { PreInteractionPrompt } from "./PreInteractionPrompt";
import { ConversationFlow } from "./ConversationFlow";
import { HUDControls } from "./HUDControls";
import { BreathingOverlay } from "./BreathingOverlay";
import { SessionStats } from "./SessionStats";
import { ContextPanel } from "./ContextPanel";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// All interactions are now available
export type NudgeType = "awareness" | "breathe" | "pause" | "exit" | null;
export type PlayState = "pre-interaction" | "playing" | "paused";

export function GlassHUD() {
  const [currentInteractionIndex, setCurrentInteractionIndex] = useState(0);
  const [playState, setPlayState] = useState<PlayState>("pre-interaction");
  const [currentSliceIndex, setCurrentSliceIndex] = useState(-1);
  const [currentTranscriptIndex, setCurrentTranscriptIndex] = useState(-1);
  const [activeNudge, setActiveNudge] = useState<NudgeType>(null);
  const [showBreathing, setShowBreathing] = useState(false);
  const [hudVisible, setHudVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const advanceRef = useRef<() => void>(() => {});

  const interaction = allInteractions[currentInteractionIndex];
  const counterpart = getProfile(interaction.counterpartId);
  const currentSlice: HeartbeatSlice | null =
    currentSliceIndex >= 0 && currentSliceIndex < interaction.heartbeatSlices.length
      ? interaction.heartbeatSlices[currentSliceIndex]
      : null;

  const determineNudge = useCallback(
    (slice: HeartbeatSlice): NudgeType => {
      const bpmDelta = slice.avgBpm - userProfile.baselineBpm;
      const hrvDrop = userProfile.baselineHrv - slice.hrvMs;

      if (bpmDelta > 25 && hrvDrop > 20) return "exit";
      if (bpmDelta > 18 && hrvDrop > 15) return "pause";
      if (bpmDelta > 12 || hrvDrop > 12) return "breathe";
      if (slice.triggerFlag) return "awareness";
      return null;
    },
    []
  );

  const advanceSlice = useCallback(() => {
    setCurrentSliceIndex((prev) => {
      const next = prev + 1;
      if (next >= interaction.heartbeatSlices.length) {
        setPlayState("paused");
        if (intervalRef.current) clearInterval(intervalRef.current);
        return prev;
      }

      const slice = interaction.heartbeatSlices[next];

      // advance transcript to match
      const transcriptTarget = Math.min(
        Math.floor((next / interaction.heartbeatSlices.length) * interaction.transcript.length),
        interaction.transcript.length - 1
      );
      setCurrentTranscriptIndex(transcriptTarget);

      // determine nudge
      const nudge = determineNudge(slice);
      if (nudge) {
        setActiveNudge(nudge);
        if (nudge === "breathe" || nudge === "pause") {
          setShowBreathing(true);
          setTimeout(() => setShowBreathing(false), 4000);
        }
        setTimeout(() => setActiveNudge(null), 3500);
      }

      return next;
    });
  }, [interaction, determineNudge]);

  // Keep ref in sync with latest advanceSlice to avoid stale closures in setInterval
  useEffect(() => {
    advanceRef.current = advanceSlice;
  }, [advanceSlice]);

  const startPlayback = useCallback(() => {
    setPlayState("playing");
    setCurrentSliceIndex(0);
    setCurrentTranscriptIndex(0);

    const firstSlice = interaction.heartbeatSlices[0];
    const nudge = determineNudge(firstSlice);
    if (nudge) {
      setActiveNudge(nudge);
      setTimeout(() => setActiveNudge(null), 3500);
    }

    intervalRef.current = setInterval(() => advanceRef.current(), 3000);
  }, [interaction, determineNudge]);

  // Auto-start playback on mount so the home page shows the active HUD immediately
  const hasAutoStarted = useRef(false);
  useEffect(() => {
    if (!hasAutoStarted.current) {
      hasAutoStarted.current = true;
      startPlayback();
    }
  }, [startPlayback]);

  const skipToNext = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentSliceIndex(-1);
    setCurrentTranscriptIndex(-1);
    setActiveNudge(null);
    setShowBreathing(false);
    setCurrentInteractionIndex((prev) => (prev + 1) % allInteractions.length);
  }, []);

  const skipToPrev = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentSliceIndex(-1);
    setCurrentTranscriptIndex(-1);
    setActiveNudge(null);
    setShowBreathing(false);
    setCurrentInteractionIndex((prev) =>
      prev === 0 ? allInteractions.length - 1 : prev - 1
    );
  }, []);

  // Auto-start when interaction changes (skip/prev)
  useEffect(() => {
    if (hasAutoStarted.current && playState !== "playing") {
      startPlayback();
    }
    // Only trigger on interaction change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInteractionIndex]);

  const togglePlayPause = useCallback(() => {
    if (playState === "playing") {
      setPlayState("paused");
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else if (playState === "paused") {
      // If we are at the end, hitting play again could just skip to next, or do nothing.
      // Let's just restart or skip to next if they try to play at the end.
      if (currentSliceIndex >= interaction.heartbeatSlices.length - 1) {
        skipToNext();
      } else {
        setPlayState("playing");
        intervalRef.current = setInterval(() => advanceRef.current(), 3000);
      }
    }
  }, [playState, currentSliceIndex, interaction.heartbeatSlices.length, skipToNext]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const emotionToGlowColor = (emotion: EmotionalState): string => {
    const colors: Record<EmotionalState, string> = {
      calm: "rgba(76, 175, 80, 0.15)",
      engaged: "rgba(33, 150, 243, 0.12)",
      anxious: "rgba(255, 152, 0, 0.2)",
      frustrated: "rgba(244, 67, 54, 0.25)",
      joyful: "rgba(255, 215, 0, 0.12)",
      sad: "rgba(156, 39, 176, 0.18)",
      defensive: "rgba(233, 30, 99, 0.22)",
      withdrawn: "rgba(96, 125, 139, 0.15)",
    };
    return colors[emotion];
  };

  const progress =
    interaction.heartbeatSlices.length > 0
      ? Math.max(0, (currentSliceIndex + 1) / interaction.heartbeatSlices.length)
      : 0;

  // Format date and time from interaction
  const interactionDate = interaction.interactionId.substring(4, 12); // "20260304"
  const formattedDate = `${interactionDate.substring(4, 6)}.${interactionDate.substring(6, 8)}`;
  const interactionTime = interaction.transcript[0]?.timestamp.substring(0, 5) || "00:00";

  // Derive satisfaction score from emotional arc
  const satisfactionScore = (() => {
    const positiveStates = ["calm", "engaged", "joyful"];
    const negativeStates = ["frustrated", "defensive", "anxious"];
    const arc = interaction.overallEmotionalArc;
    if (!arc.length) return 60;
    const positiveCount = arc.filter((e) => positiveStates.includes(e)).length;
    const negativeCount = arc.filter((e) => negativeStates.includes(e)).length;
    const base = (positiveCount / arc.length) * 100;
    const penalty = (negativeCount / arc.length) * 30;
    return Math.round(Math.min(100, Math.max(0, base - penalty + 20)));
  })();

  return (
    <div className="w-full h-screen relative overflow-hidden select-none bg-black" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Background Image of counterpart */}
      {counterpart?.avatarUrl && (
        <ImageWithFallback
          src={counterpart.avatarUrl}
          alt={counterpart.name}
          className="absolute inset-0 w-full h-full object-cover z-0 scale-110"
          style={{ objectPosition: "center 15%" }}
        />
      )}

      {/* Glass lens effect — simulated transparent view */}
      <div className="absolute inset-0 z-10">
        {/* Dark gradient simulating looking through tinted glass, slightly more transparent now */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/40 to-zinc-950/70" />

        {/* Subtle glass border/frame */}
        <div className="absolute inset-4 rounded-[2rem] border border-white/[0.04]" />

        {/* Lens curvature highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-gradient-to-b from-white/[0.02] to-transparent rounded-b-full" />
      </div>

      {/* Peripheral Glow — emotional state indicator */}
      <PeripheralGlow
        color={currentSlice ? emotionToGlowColor(currentSlice.emotionalState) : "rgba(76, 175, 80, 0.08)"}
        intensity={currentSlice?.triggerFlag ? 1.5 : 1}
      />

      {/* HUD content layer — subtle barrel warp to simulate AR lens optics */}
      <div
        className="absolute inset-0 z-20"
        style={{ perspective: '600px', perspectiveOrigin: '50% 50%' }}
      >
        {/* Top HUD group — warps slightly downward toward center */}
        <div
          className="absolute top-0 left-0 right-0 h-[45%]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(2.5deg)',
            transformOrigin: 'center bottom',
          }}
        >
          {/* Top status bar — time, weather, mood, heart rate, interaction count */}
          <AnimatePresence>
            {hudVisible && playState !== "pre-interaction" && currentSlice && (
              <TopStatusBar
                time={interactionTime}
                bpm={currentSlice.avgBpm}
                baselineBpm={userProfile.baselineBpm}
                emotionalState={currentSlice.emotionalState}
                counterpartName={counterpart?.name || "Unknown"}
                counterpartInteractionCount={counterpart?.interactionCount || 0}
                satisfactionScore={satisfactionScore}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom HUD group — warps slightly upward toward center */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45%]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-2.5deg)',
            transformOrigin: 'center top',
          }}
        >
          {/* Context panel — bottom left */}
          <AnimatePresence>
            {hudVisible && playState !== "pre-interaction" && counterpart && (
              <ContextPanel
                personName={counterpart.name}
                relationshipType={counterpart.relationship}
                lastInteraction={interaction.saveEvent ? "First meeting" : "2 days ago"}
                interactionCount={Math.floor(Math.random() * 15) + 5}
                tags={interaction.saveEvent ? ["⭐ Save Moment"] : interaction.surpriseInsight ? ["⚡ Insight"] : [counterpart.relationship]}
              />
            )}
          </AnimatePresence>

          {/* Session stats — bottom left */}
          <AnimatePresence>
            {hudVisible && playState !== "pre-interaction" && (
              <SessionStats
                interactionNumber={currentInteractionIndex + 1}
                totalInteractions={allInteractions.length}
                date={formattedDate}
                time={interactionTime}
                emotionalState={currentSlice?.emotionalState || "calm"}
              />
            )}
          </AnimatePresence>

          {/* Conversation flow — bottom center */}
          <AnimatePresence>
            {playState !== "pre-interaction" && (
              <ConversationFlow
                interaction={interaction}
                currentIndex={currentTranscriptIndex}
                counterpartName={counterpart?.name || "Unknown"}
              />
            )}
          </AnimatePresence>

          {/* HUD Controls — bottom right */}
          <HUDControls
            playState={playState}
            hudVisible={hudVisible}
            onTogglePlay={togglePlayPause}
            onSkipNext={skipToNext}
            onSkipPrev={skipToPrev}
            onToggleHud={() => setHudVisible(!hudVisible)}
            interactionLabel={`${currentInteractionIndex + 1}/${allInteractions.length}`}
            interactionTitle={interaction.saveEvent ? "★ Save Moment" : interaction.surpriseInsight ? "⚡ Surprise Insight" : counterpart?.name || ""}
          />

          {/* Progress bar — very subtle bottom edge */}
          {playState !== "pre-interaction" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.03]">
              <motion.div
                className="h-full bg-white/20"
                initial={{ width: "0%" }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>

        {/* Center elements — no warp (nudges, breathing) */}
        {/* Nudge system — central announcements */}
        <AnimatePresence>
          {activeNudge && <NudgeSystem type={activeNudge} />}
        </AnimatePresence>

        {/* Breathing overlay */}
        <AnimatePresence>
          {showBreathing && <BreathingOverlay />}
        </AnimatePresence>
      </div>

      {/* Pre-Interaction Prompt — outside warp layer */}
      <AnimatePresence>
        {playState === "pre-interaction" && counterpart && (
          <PreInteractionPrompt
            person={counterpart}
            interaction={interaction}
            onStart={startPlayback}
          />
        )}
      </AnimatePresence>
    </div>
  );
}