import { RelationshipTrend } from "./types";

export const relationshipTrends: RelationshipTrend[] = [
  // === CONSISTENT CALM ARC — Elena Vasquez (Partner) ===
  {
    personId: "person_elena_vasquez",
    weeklyData: [
      { day: 1, date: "2026-03-01", interactionCount: 2, avgBpm: 67, avgHrv: 54, dominantEmotion: "calm", stressScore: 18, connectionScore: 92 },
      { day: 2, date: "2026-03-02", interactionCount: 1, avgBpm: 68, avgHrv: 52, dominantEmotion: "calm", stressScore: 20, connectionScore: 90 },
      { day: 3, date: "2026-03-03", interactionCount: 1, avgBpm: 72, avgHrv: 47, dominantEmotion: "anxious", stressScore: 32, connectionScore: 88 },
      { day: 4, date: "2026-03-04", interactionCount: 1, avgBpm: 70, avgHrv: 48, dominantEmotion: "calm", stressScore: 28, connectionScore: 91 },
      { day: 5, date: "2026-03-05", interactionCount: 1, avgBpm: 65, avgHrv: 55, dominantEmotion: "joyful", stressScore: 15, connectionScore: 93 },
      { day: 6, date: "2026-03-06", interactionCount: 1, avgBpm: 71, avgHrv: 48, dominantEmotion: "engaged", stressScore: 25, connectionScore: 89 },
      { day: 7, date: "2026-03-07", interactionCount: 2, avgBpm: 62, avgHrv: 58, dominantEmotion: "joyful", stressScore: 10, connectionScore: 95 },
    ],
    overallTrend: "stable",
    narrativeArc: "consistent_calm",
    weekSummary:
      "Elena remains your emotional anchor. Your lowest heart rates and highest HRV readings consistently occur during conversations with her. Even on your most stressful days, interactions with Elena brought your biometrics back to baseline within minutes. She is your primary co-regulation partner.",
  },

  // === ESCALATING TENSION ARC — Marcus Chen (Manager) ===
  {
    personId: "person_marcus_chen",
    weeklyData: [
      { day: 1, date: "2026-03-01", interactionCount: 1, avgBpm: 80, avgHrv: 39, dominantEmotion: "anxious", stressScore: 62, connectionScore: 45 },
      { day: 2, date: "2026-03-02", interactionCount: 1, avgBpm: 84, avgHrv: 35, dominantEmotion: "defensive", stressScore: 72, connectionScore: 35 },
      { day: 3, date: "2026-03-03", interactionCount: 1, avgBpm: 86, avgHrv: 32, dominantEmotion: "frustrated", stressScore: 78, connectionScore: 30 },
      { day: 4, date: "2026-03-04", interactionCount: 1, avgBpm: 82, avgHrv: 34, dominantEmotion: "engaged", stressScore: 65, connectionScore: 50 },
      { day: 5, date: "2026-03-05", interactionCount: 1, avgBpm: 80, avgHrv: 37, dominantEmotion: "frustrated", stressScore: 68, connectionScore: 40 },
      { day: 6, date: "2026-03-06", interactionCount: 1, avgBpm: 86, avgHrv: 30, dominantEmotion: "frustrated", stressScore: 82, connectionScore: 38 },
      { day: 7, date: "2026-03-07", interactionCount: 1, avgBpm: 68, avgHrv: 50, dominantEmotion: "joyful", stressScore: 22, connectionScore: 72 },
    ],
    overallTrend: "volatile",
    narrativeArc: "escalating_tension",
    weekSummary:
      "Your relationship with Marcus followed a classic escalation-resolution pattern. Stress scores climbed from 62 to 82 over six days, peaking during Friday's confrontation. Your courageous decision to name the dynamic directly led to a dramatic shift — day 7 showed your lowest stress score (22) and highest connection score (72) with him all week. The data suggests that avoidance amplified the tension while direct communication resolved it rapidly.",
  },

  // === CLOSE COLLEAGUE — Jake Morrison ===
  {
    personId: "person_jake_morrison",
    weeklyData: [
      { day: 1, date: "2026-03-01", interactionCount: 1, avgBpm: 72, avgHrv: 49, dominantEmotion: "engaged", stressScore: 28, connectionScore: 85 },
      { day: 2, date: "2026-03-02", interactionCount: 2, avgBpm: 71, avgHrv: 49, dominantEmotion: "engaged", stressScore: 25, connectionScore: 88 },
      { day: 3, date: "2026-03-03", interactionCount: 1, avgBpm: 72, avgHrv: 48, dominantEmotion: "engaged", stressScore: 28, connectionScore: 86 },
      { day: 4, date: "2026-03-04", interactionCount: 2, avgBpm: 72, avgHrv: 48, dominantEmotion: "joyful", stressScore: 22, connectionScore: 90 },
      { day: 5, date: "2026-03-05", interactionCount: 2, avgBpm: 76, avgHrv: 43, dominantEmotion: "anxious", stressScore: 45, connectionScore: 78 },
      { day: 6, date: "2026-03-06", interactionCount: 2, avgBpm: 70, avgHrv: 50, dominantEmotion: "joyful", stressScore: 22, connectionScore: 88 },
      { day: 7, date: "2026-03-07", interactionCount: 1, avgBpm: 67, avgHrv: 53, dominantEmotion: "joyful", stressScore: 15, connectionScore: 92 },
    ],
    overallTrend: "stable",
    weekSummary:
      "Jake is your most consistent professional relationship. Your biometrics remain stable across 10 interactions, with one notable exception: the day 5 evening call where Jake mentioned potentially leaving. Your verbal affect was supportive but your heart rate stayed elevated throughout — the week's clearest example of performed vs. felt emotion. Day 7's joyful resolution when Jake decided to stay showed the fastest stress-to-joy transition of the week.",
  },

  // === REPAIR ARC — Priya Sharma (Friend) ===
  {
    personId: "person_priya_sharma",
    weeklyData: [
      { day: 2, date: "2026-03-02", interactionCount: 1, avgBpm: 85, avgHrv: 31, dominantEmotion: "sad", stressScore: 78, connectionScore: 30 },
      { day: 5, date: "2026-03-05", interactionCount: 1, avgBpm: 73, avgHrv: 44, dominantEmotion: "engaged", stressScore: 42, connectionScore: 68 },
      { day: 7, date: "2026-03-07", interactionCount: 1, avgBpm: 65, avgHrv: 55, dominantEmotion: "joyful", stressScore: 12, connectionScore: 94 },
    ],
    overallTrend: "improving",
    narrativeArc: "repair_arc",
    weekSummary:
      "The Priya arc is the week's most compelling repair story. Day 2's confrontation about the dropped referral produced your highest sadness-correlated biometrics (85 BPM, 31ms HRV). Days 3-4 showed avoidance — no interactions, but elevated baseline stress on those days suggests unresolved processing. Day 5's candid conversation showed a beautiful progression from anxiety to joy. By day 7, this was your lowest-stress relationship interaction of the entire week. The seven-day rule born from this conversation is now adopted in your partnership with Elena too.",
  },

  // === DIRECT REPORT — Aisha Patel ===
  {
    personId: "person_aisha_patel",
    weeklyData: [
      { day: 1, date: "2026-03-01", interactionCount: 1, avgBpm: 72, avgHrv: 47, dominantEmotion: "engaged", stressScore: 28, connectionScore: 78 },
      { day: 2, date: "2026-03-02", interactionCount: 1, avgBpm: 68, avgHrv: 53, dominantEmotion: "joyful", stressScore: 18, connectionScore: 85 },
      { day: 3, date: "2026-03-03", interactionCount: 1, avgBpm: 67, avgHrv: 54, dominantEmotion: "joyful", stressScore: 15, connectionScore: 88 },
      { day: 4, date: "2026-03-04", interactionCount: 1, avgBpm: 69, avgHrv: 51, dominantEmotion: "joyful", stressScore: 18, connectionScore: 86 },
      { day: 5, date: "2026-03-05", interactionCount: 1, avgBpm: 66, avgHrv: 54, dominantEmotion: "joyful", stressScore: 14, connectionScore: 90 },
      { day: 7, date: "2026-03-07", interactionCount: 1, avgBpm: 64, avgHrv: 56, dominantEmotion: "joyful", stressScore: 10, connectionScore: 92 },
    ],
    overallTrend: "improving",
    weekSummary:
      "Your interactions with Aisha consistently produce your lowest workplace stress scores. The creative collaboration pattern — reviewing designs, brainstorming features — appears to be your optimal professional interaction mode. Aisha's proactive work style reduces your cognitive load, and your biometrics reflect that relief. The mentorship dynamic is healthy and growing.",
  },

  // === COLLEAGUE — Tom Rodriguez ===
  {
    personId: "person_tom_rodriguez",
    weeklyData: [
      { day: 2, date: "2026-03-02", interactionCount: 1, avgBpm: 72, avgHrv: 47, dominantEmotion: "engaged", stressScore: 30, connectionScore: 75 },
      { day: 3, date: "2026-03-03", interactionCount: 2, avgBpm: 71, avgHrv: 49, dominantEmotion: "calm", stressScore: 25, connectionScore: 80 },
      { day: 4, date: "2026-03-04", interactionCount: 1, avgBpm: 68, avgHrv: 52, dominantEmotion: "calm", stressScore: 20, connectionScore: 82 },
      { day: 5, date: "2026-03-05", interactionCount: 1, avgBpm: 72, avgHrv: 47, dominantEmotion: "engaged", stressScore: 28, connectionScore: 78 },
      { day: 6, date: "2026-03-06", interactionCount: 1, avgBpm: 76, avgHrv: 41, dominantEmotion: "anxious", stressScore: 38, connectionScore: 80 },
      { day: 7, date: "2026-03-07", interactionCount: 1, avgBpm: 64, avgHrv: 56, dominantEmotion: "calm", stressScore: 15, connectionScore: 85 },
    ],
    overallTrend: "improving",
    weekSummary:
      "Tom is an emerging trusted relationship. His consistent support — offering GPU resources, validating your pushback against Marcus, checking in on your wellbeing — has deepened the connection. Your stress scores in Tom interactions trend downward over the week, suggesting increasing psychological safety.",
  },

  // === CLIENT — David Kim ===
  {
    personId: "person_david_kim",
    weeklyData: [
      { day: 1, date: "2026-03-01", interactionCount: 1, avgBpm: 73, avgHrv: 46, dominantEmotion: "engaged", stressScore: 32, connectionScore: 70 },
      { day: 3, date: "2026-03-03", interactionCount: 1, avgBpm: 72, avgHrv: 47, dominantEmotion: "engaged", stressScore: 28, connectionScore: 75 },
      { day: 5, date: "2026-03-05", interactionCount: 1, avgBpm: 70, avgHrv: 50, dominantEmotion: "joyful", stressScore: 22, connectionScore: 80 },
      { day: 7, date: "2026-03-07", interactionCount: 1, avgBpm: 69, avgHrv: 51, dominantEmotion: "joyful", stressScore: 18, connectionScore: 88 },
    ],
    overallTrend: "improving",
    weekSummary:
      "The David Kim relationship shows a textbook trust-building arc. Your stress scores decreased steadily from 32 to 18 over four interactions, while connection scores rose from 70 to 88. The product-market alignment and David's genuine enthusiasm are creating a collaborative dynamic that your body responds positively to.",
  },

  // === CLIENT — Ben Tucker ===
  {
    personId: "person_ben_tucker",
    weeklyData: [
      { day: 2, date: "2026-03-02", interactionCount: 1, avgBpm: 70, avgHrv: 50, dominantEmotion: "engaged", stressScore: 22, connectionScore: 72 },
      { day: 4, date: "2026-03-04", interactionCount: 1, avgBpm: 78, avgHrv: 38, dominantEmotion: "defensive", stressScore: 55, connectionScore: 58 },
      { day: 6, date: "2026-03-06", interactionCount: 1, avgBpm: 73, avgHrv: 45, dominantEmotion: "engaged", stressScore: 35, connectionScore: 78 },
    ],
    overallTrend: "volatile",
    weekSummary:
      "Ben Tucker interactions contain both of your 'save moments' — times when you caught yourself heading toward escalation and chose a different path. The defensive spike on day 4 (stress score 55) was your breakthrough awareness moment. By day 6, you caught the same pattern earlier and recovered faster. Ben's positive feedback about your listening suggests the relationship is stronger for having been tested.",
  },

  // === FRIEND — Sarah Okonkwo ===
  {
    personId: "person_sarah_okonkwo",
    weeklyData: [
      { day: 1, date: "2026-03-01", interactionCount: 1, avgBpm: 68, avgHrv: 52, dominantEmotion: "joyful", stressScore: 18, connectionScore: 88 },
      { day: 4, date: "2026-03-04", interactionCount: 2, avgBpm: 70, avgHrv: 50, dominantEmotion: "engaged", stressScore: 22, connectionScore: 85 },
      { day: 6, date: "2026-03-06", interactionCount: 1, avgBpm: 73, avgHrv: 46, dominantEmotion: "sad", stressScore: 32, connectionScore: 82 },
    ],
    overallTrend: "stable",
    weekSummary:
      "Sarah is your processing partner — the person you turn to when emotions need to be spoken aloud. Your day 6 interaction had the highest sadness markers but also showed rapid regulation. Talking to Sarah consistently moves your biometrics toward baseline, suggesting she provides a unique emotional processing function in your life.",
  },

  // === FRIEND — Mia Zhang ===
  {
    personId: "person_mia_zhang",
    weeklyData: [
      { day: 1, date: "2026-03-01", interactionCount: 1, avgBpm: 67, avgHrv: 55, dominantEmotion: "joyful", stressScore: 15, connectionScore: 85 },
      { day: 3, date: "2026-03-03", interactionCount: 1, avgBpm: 73, avgHrv: 46, dominantEmotion: "frustrated", stressScore: 35, connectionScore: 80 },
    ],
    overallTrend: "stable",
    weekSummary:
      "Mia provides outside perspective that helps you see work dynamics more clearly. Her advice on day 3 about naming dynamics with Marcus directly influenced your day 6 conversation. She's a catalytic relationship — fewer interactions but outsized impact on your decision-making.",
  },

  // === ACQUAINTANCE — Ryan Foster ===
  {
    personId: "person_ryan_foster",
    weeklyData: [
      { day: 2, date: "2026-03-02", interactionCount: 1, avgBpm: 69, avgHrv: 51, dominantEmotion: "engaged", stressScore: 20, connectionScore: 55 },
      { day: 5, date: "2026-03-05", interactionCount: 1, avgBpm: 65, avgHrv: 55, dominantEmotion: "calm", stressScore: 12, connectionScore: 58 },
    ],
    overallTrend: "stable",
    weekSummary: "Ryan interactions are low-intensity and professional. They provide a neutral social baseline in your day without emotional demands.",
  },

  // === COLLEAGUE — Linda Nakamura ===
  {
    personId: "person_linda_nakamura",
    weeklyData: [
      { day: 3, date: "2026-03-03", interactionCount: 1, avgBpm: 70, avgHrv: 50, dominantEmotion: "engaged", stressScore: 22, connectionScore: 65 },
      { day: 6, date: "2026-03-06", interactionCount: 1, avgBpm: 66, avgHrv: 54, dominantEmotion: "calm", stressScore: 15, connectionScore: 70 },
    ],
    overallTrend: "stable",
    weekSummary: "Linda provides structured, predictable interactions that reduce uncertainty. Her proactive compliance work lowers your cognitive load around legal concerns.",
  },

  // === ACQUAINTANCE — Carlos Diaz ===
  {
    personId: "person_carlos_diaz",
    weeklyData: [
      { day: 1, date: "2026-03-01", interactionCount: 1, avgBpm: 70, avgHrv: 52, dominantEmotion: "engaged", stressScore: 18, connectionScore: 60 },
      { day: 4, date: "2026-03-04", interactionCount: 1, avgBpm: 66, avgHrv: 55, dominantEmotion: "joyful", stressScore: 12, connectionScore: 65 },
    ],
    overallTrend: "stable",
    weekSummary: "Carlos provides neighborhood social connection that serves as a decompression buffer. Both interactions showed lower-than-average heart rates, suggesting casual social contact has genuine physiological benefits.",
  },

  // === COLLEAGUE — Nadia Al-Rashid ===
  {
    personId: "person_nadia_alrashid",
    weeklyData: [
      { day: 4, date: "2026-03-04", interactionCount: 1, avgBpm: 69, avgHrv: 52, dominantEmotion: "engaged", stressScore: 18, connectionScore: 65 },
      { day: 7, date: "2026-03-07", interactionCount: 1, avgBpm: 66, avgHrv: 54, dominantEmotion: "joyful", stressScore: 14, connectionScore: 72 },
    ],
    overallTrend: "improving",
    weekSummary: "Nadia's technical updates bring a sense of progress that your body responds to positively. The ML accuracy improvement on day 7 produced one of your most joyful workplace moments.",
  },

  // === ACQUAINTANCE — Chris Walters ===
  {
    personId: "person_chris_walters",
    weeklyData: [
      { day: 2, date: "2026-03-02", interactionCount: 1, avgBpm: 72, avgHrv: 48, dominantEmotion: "engaged", stressScore: 25, connectionScore: 62 },
      { day: 6, date: "2026-03-06", interactionCount: 1, avgBpm: 70, avgHrv: 50, dominantEmotion: "joyful", stressScore: 20, connectionScore: 68 },
    ],
    overallTrend: "improving",
    weekSummary: "Chris provides strategic industry validation. Both interactions produced excitement about partnership alignment with Meta Reality Labs, contributing to a sense of product-market direction.",
  },

  // === ONE-OFF — Dr. Amara Johnson ===
  {
    personId: "person_dr_amara_johnson",
    weeklyData: [
      { day: 1, date: "2026-03-01", interactionCount: 1, avgBpm: 74, avgHrv: 44, dominantEmotion: "engaged", stressScore: 30, connectionScore: 72 },
    ],
    overallTrend: "stable",
    weekSummary: "A single interaction that left a lasting positive impression. The initial anxiety (meeting an admired academic) quickly resolved into engaged, joyful collaboration. This interaction type — intellectual respect meeting shared values — produces rapid stress-to-joy transitions.",
  },

  // === ONE-OFF — Kenji Tanaka ===
  {
    personId: "person_kenji_tanaka",
    weeklyData: [
      { day: 3, date: "2026-03-03", interactionCount: 1, avgBpm: 70, avgHrv: 50, dominantEmotion: "engaged", stressScore: 22, connectionScore: 68 },
    ],
    overallTrend: "stable",
    weekSummary: "Kenji's cultural insights about APAC emotional norms produced genuine intellectual engagement with low stress markers. Cross-cultural collaboration may be a growth edge for you.",
  },

  // === ONE-OFF — Fatima Hassan ===
  {
    personId: "person_fatima_hassan",
    weeklyData: [
      { day: 5, date: "2026-03-05", interactionCount: 1, avgBpm: 70, avgHrv: 50, dominantEmotion: "engaged", stressScore: 22, connectionScore: 70 },
    ],
    overallTrend: "stable",
    weekSummary: "Partnership potential with NeuralSense created engaged, forward-looking energy. New introductions via trusted referrals (David Kim) produce lower initial anxiety than cold introductions.",
  },

  // === ONE-OFF — Oliver Brooks ===
  {
    personId: "person_oliver_brooks",
    weeklyData: [
      { day: 6, date: "2026-03-06", interactionCount: 1, avgBpm: 65, avgHrv: 55, dominantEmotion: "joyful", stressScore: 12, connectionScore: 68 },
    ],
    overallTrend: "stable",
    weekSummary: "Welcoming a new team member at the end of a difficult day produced unexpectedly low stress and high joy. Mentorship interactions appear to be restorative for you.",
  },

  // === ONE-OFF — Sophia Reyes ===
  {
    personId: "person_sophia_reyes",
    weeklyData: [
      { day: 7, date: "2026-03-07", interactionCount: 1, avgBpm: 69, avgHrv: 51, dominantEmotion: "engaged", stressScore: 20, connectionScore: 72 },
    ],
    overallTrend: "stable",
    weekSummary: "Sophia's AI ethics perspective created natural resonance. Like the Dr. Johnson interaction, meeting aligned-values professionals produces rapid engagement with minimal stress.",
  },
];
