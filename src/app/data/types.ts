// Pulse Mock Data Types

export type RelationshipType =
  | "partner"
  | "colleague"
  | "manager"
  | "direct_report"
  | "friend"
  | "family"
  | "acquaintance"
  | "client";

export type EmotionalState =
  | "calm"
  | "engaged"
  | "anxious"
  | "frustrated"
  | "joyful"
  | "sad"
  | "defensive"
  | "withdrawn";

export type Speaker = "user" | "counterpart";

export interface PersonProfile {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  avatarUrl?: string; // Profile photo URL
  relationshipType: RelationshipType;
  company: string;
  context: string;
  linkedinHeadline: string;
  instagramHandle?: string;
  interactionCount: number;
  email?: string;
  phone?: string;
}

export interface HeartbeatSlice {
  sliceStart: string;
  sliceEnd: string;
  avgBpm: number;
  hrvMs: number;
  transcriptSegment: string;
  speaker: Speaker;
  emotionalState: EmotionalState;
  triggerFlag: boolean;
}

export interface VocalAffectMarker {
  sentenceIndex: number;
  sentence: string;
  paceWpm: number;
  relativePitch: number;
  volume: number;
  pauseBeforeSpeakingMs: number;
}

export interface TranscriptTurn {
  speaker: Speaker;
  speakerName: string;
  text: string;
  timestamp: string;
}

export interface Interaction {
  interactionId: string;
  date: string;
  dayNumber: number;
  timeStart: string;
  timeEnd: string;
  durationMinutes: number;
  userId: string;
  counterpartId: string;
  location?: string;
  context?: string;
  transcript: TranscriptTurn[];
  heartbeatSlices: HeartbeatSlice[];
  vocalAffectMarkers: VocalAffectMarker[];
  overallEmotionalArc: EmotionalState[];
  narrativeTag?: string;
  saveEvent?: boolean;
  surpriseInsight?: boolean;
}

export interface DailySummary {
  date: string;
  dayNumber: number;
  emotionalWeather: string;
  weatherIcon: string;
  dominantEmotions: EmotionalState[];
  avgBpm: number;
  avgHrv: number;
  totalInteractions: number;
  totalMinutes: number;
  highPoints: string[];
  lowPoints: string[];
  insightOfTheDay: string;
  triggerCount: number;
  saveCount: number;
  topRelationships: {
    personId: string;
    interactionCount: number;
    dominantEmotion: EmotionalState;
  }[];
}

export interface RelationshipTrend {
  personId: string;
  weeklyData: {
    day: number;
    date: string;
    interactionCount: number;
    avgBpm: number;
    avgHrv: number;
    dominantEmotion: EmotionalState;
    stressScore: number; // 0-100
    connectionScore: number; // 0-100
  }[];
  overallTrend: "improving" | "stable" | "declining" | "volatile";
  narrativeArc?: string;
  weekSummary: string;
}