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

  const togglePlayPause = useCallback(() => {
    setPlayState((prev) => {
      if (prev === "playing") {
        // "Stop" functionality - full reset to beginning
        setCurrentTranscriptIndex(-1);
        setCurrentSliceIndex(-1);
        setActiveNudge(null);
        setShowBreathing(false);
        return "paused";
      } else {
        // "Play" — if at beginning (index -1), start from 0
        if (currentTranscriptIndex === -1) {
          setCurrentTranscriptIndex(0);
          setCurrentSliceIndex(0);
        }
        return "playing";
      }
    });
  }, [currentTranscriptIndex]);

  // Use a sequencer pattern for ultra-stable, slow playback
  useEffect(() => {
    if (playState !== "playing") return;
    
    // Safety check for end of transcript
    if (currentTranscriptIndex >= interaction.transcript.length - 1) {
      setPlayState("paused");
      return;
    }

    const targetIndex = currentTranscriptIndex;

    const timer = setTimeout(() => {
      setCurrentTranscriptIndex((prev) => {
        // Strict guard: only increment if we are exactly where we expect to be
        if (prev === targetIndex) {
          const next = prev + 1;
          if (next >= interaction.transcript.length) {
            setPlayState("paused");
            return prev;
          }
          return next;
        }
        return prev;
      });
    }, 6000); // 6 seconds between lines — readable pacing for demo

    return () => clearTimeout(timer);
  }, [playState, currentTranscriptIndex, interaction.transcript.length, interaction]);

  // Sync biometric slice with transcript index
  useEffect(() => {
    if (currentTranscriptIndex < 0) return;
    
    const sliceTarget = Math.min(
      Math.floor((currentTranscriptIndex / interaction.transcript.length) * interaction.heartbeatSlices.length),
      interaction.heartbeatSlices.length - 1
    );
    setCurrentSliceIndex(sliceTarget);

    const slice = interaction.heartbeatSlices[sliceTarget];
    if (slice) {
      const nudge = determineNudge(slice);
      if (nudge) {
        setActiveNudge(nudge);
        if (nudge === "breathe" || nudge === "pause") {
          setShowBreathing(true);
          setTimeout(() => setShowBreathing(false), 4000);
        }
        setTimeout(() => setActiveNudge(null), 3500);
      }
    }
  }, [currentTranscriptIndex, interaction, determineNudge]);

  const startPlayback = useCallback(() => {
    setCurrentSliceIndex(0);
    setCurrentTranscriptIndex(0);
    setPlayState("playing");
  }, []);

  // Initial auto-start
  useEffect(() => {
    const startTimer = setTimeout(() => {
      startPlayback();
    }, 500);
    return () => clearTimeout(startTimer);
  }, []);

  const skipToNext = useCallback(() => {
    setPlayState("paused");
    setCurrentSliceIndex(-1);
    setCurrentTranscriptIndex(-1);
    setActiveNudge(null);
    setShowBreathing(false);
    // Explicitly reset interaction
    setCurrentInteractionIndex((prev) => (prev + 1) % allInteractions.length);
  }, []);

  const skipToPrev = useCallback(() => {
    setPlayState("paused");
    setCurrentSliceIndex(-1);
    setCurrentTranscriptIndex(-1);
    setActiveNudge(null);
    setShowBreathing(false);
    setCurrentInteractionIndex((prev) =>
      prev === 0 ? allInteractions.length - 1 : prev - 1
    );
  }, []);

  // Handle interaction changes properly
  useEffect(() => {
    if (currentTranscriptIndex === -1) {
      startPlayback();
    }
  }, [currentInteractionIndex, currentTranscriptIndex, startPlayback]);

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
                relationshipType={counterpart.relationshipType}
                lastInteraction={interaction.saveEvent ? "First meeting" : "2 days ago"}
                interactionCount={counterpart?.interactionCount || 1}
                tags={interaction.saveEvent ? ["★ Save"] : interaction.surpriseInsight ? ["⚡ Insight"] : []}
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

          {/* Status bar — above conversation, bottom-center area */}
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

          {/* Conversation flow — below status bar */}
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