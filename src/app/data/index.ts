// Pulse Mock Data - Central Index
// 20 profiles, 70 interactions (7 days × 10), daily summaries, relationship trends

export { profiles, userProfile, getProfile } from "./profiles";
export { dailySummaries } from "./daily-summaries";
export { relationshipTrends } from "./relationship-trends";

// Interaction data by day
import { day1 } from "./interactions/day1";
import { day2 } from "./interactions/day2";
import { day3 } from "./interactions/day3";
import { day4 } from "./interactions/day4";
import { day5 } from "./interactions/day5";
import { day6 } from "./interactions/day6";
import { day7 } from "./interactions/day7";

export const interactionsByDay = {
  1: day1,
  2: day2,
  3: day3,
  4: day4,
  5: day5,
  6: day6,
  7: day7,
};

export const allInteractions = [
  ...day1,
  ...day2,
  ...day3,
  ...day4,
  ...day5,
  ...day6,
  ...day7,
];

// Re-export types
export type {
  PersonProfile,
  Interaction,
  HeartbeatSlice,
  VocalAffectMarker,
  TranscriptTurn,
  DailySummary,
  RelationshipTrend,
  EmotionalState,
  RelationshipType,
  Speaker,
} from "./types";

// === Data Statistics ===
// Total profiles: 20
// Total interactions: 70 (10 per day × 7 days)
// Total daily summaries: 7
// Total relationship trends: 20
//
// === Narrative Arcs ===
// 1. Escalating Tension: Marcus Chen (Days 1-6, resolved Day 7)
//    - Progressive stress increase from 62 to 82 stress score
//    - Peak at Day 6 confrontation (94 BPM, 22ms HRV)
//    - Resolution through direct conversation
//
// 2. Repair Arc: Priya Sharma (Day 2 → Day 5 → Day 7)
//    - Awkward confrontation Day 2 (85 BPM, 31ms HRV)
//    - Avoidance Days 3-4
//    - Candid repair conversation Day 5
//    - Full restoration Day 7 (65 BPM, 55ms HRV)
//    - Birth of "the seven-day rule"
//
// 3. Consistent Calm: Elena Vasquez (All 7 days)
//    - Stable low stress (10-32 score range)
//    - Highest connection scores throughout
//    - Primary co-regulation partner
//
// 4. Save Moments:
//    - Day 4: Ben Tucker — caught defensive escalation mid-sentence
//    - Day 6: Ben Tucker — caught defensive impulse earlier, recovered faster
//
// 5. Surprise Insight:
//    - Day 5 evening: Jake Morrison conversation
//    - Verbal tone = supportive and warm
//    - Biometrics = sustained elevated HR (78-84 BPM), low HRV (34-40ms)
//    - Gap between performed and felt emotion
