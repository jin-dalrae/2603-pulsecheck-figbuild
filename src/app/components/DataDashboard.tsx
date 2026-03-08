import { profiles, userProfile, allInteractions, interactionsByDay, dailySummaries, relationshipTrends } from "../data";
import type { EmotionalState } from "../data";
import { Link } from "react-router";
import { ArrowRight, Activity, Users, Calendar, Zap, TrendingUp, Brain } from "lucide-react";

const emotionColors: Record<EmotionalState, string> = {
  calm: "#4ade80",
  engaged: "#3b82f6",
  anxious: "#fb923c",
  frustrated: "#ef4444",
  joyful: "#facc15",
  sad: "#a855f7",
  defensive: "#f43f5e",
  withdrawn: "#64748b",
};

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color = "text-blue-400" }: { 
  icon: any; 
  label: string; 
  value: string | number; 
  sub?: string;
  color?: string;
}) {
  return (
    <GlassCard className="p-6 hover:bg-white/[0.04] transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-widest text-white/50 mb-1">
        {label}
      </div>
      {sub && <div className="text-xs text-white/30 mt-2">{sub}</div>}
    </GlassCard>
  );
}

function DataStructureCard({ title, code }: { title: string; code: string }) {
  return (
    <GlassCard className="p-5 hover:border-white/20 transition-all">
      <div className="text-xs uppercase tracking-widest text-blue-400 mb-3 font-bold">
        {title}
      </div>
      <pre 
        className="text-xs text-white/70 overflow-x-auto leading-relaxed"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {code}
      </pre>
    </GlassCard>
  );
}

export function DataDashboard() {
  const saveInteractions = allInteractions.filter((i) => i.saveEvent);
  const surpriseInteractions = allInteractions.filter((i) => i.surpriseInsight);
  const totalTranscriptTurns = allInteractions.reduce((sum, i) => sum + i.transcript.length, 0);
  const totalHeartbeatSlices = allInteractions.reduce((sum, i) => sum + i.heartbeatSlices.length, 0);
  const totalTriggers = allInteractions.reduce(
    (sum, i) => sum + i.heartbeatSlices.filter((s) => s.triggerFlag).length,
    0
  );

  const sampleInteraction = allInteractions[0];
  const samplePerson = profiles[0];
  const sampleHeartbeat = sampleInteraction.heartbeatSlices[0];
  const sampleTranscript = sampleInteraction.transcript[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-7xl mx-auto p-8">
        {/* Hero Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 
                className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                PULSE_
              </h1>
              <p className="text-white/60 text-lg">AR-Powered Emotional Intelligence Platform</p>
              <p className="text-white/40 text-sm mt-2">
                Data Validation Dashboard • User: {userProfile.name} • Baseline: {userProfile.baselineBpm} BPM / {userProfile.baselineHrv}ms HRV
              </p>
            </div>
            <Link
              to="/glass"
              className="group px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-blue-500/20"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Launch HUD
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Accent Line */}
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <StatCard
            icon={Users}
            label="Profiles"
            value={profiles.length}
            sub="20 target people tracked"
            color="text-cyan-400"
          />
          <StatCard
            icon={Activity}
            label="Interactions"
            value={allInteractions.length}
            sub="70 target (10 per day)"
            color="text-blue-400"
          />
          <StatCard
            icon={Calendar}
            label="Days Tracked"
            value={Object.keys(interactionsByDay).length}
            sub="7-day simulation period"
            color="text-purple-400"
          />
          <StatCard
            icon={Brain}
            label="Transcript Turns"
            value={totalTranscriptTurns}
            sub={`Avg ${Math.round(totalTranscriptTurns / 70)} per interaction`}
            color="text-green-400"
          />
          <StatCard
            icon={TrendingUp}
            label="Heartbeat Slices"
            value={totalHeartbeatSlices}
            sub={`Avg ${Math.round(totalHeartbeatSlices / 70)} per interaction`}
            color="text-orange-400"
          />
          <StatCard
            icon={Zap}
            label="Trigger Events"
            value={totalTriggers}
            sub="1.5σ biometric deviations"
            color="text-yellow-400"
          />
        </div>

        {/* Data Structures */}
        <div className="mb-12">
          <h2 
            className="text-2xl font-bold mb-6 text-white/90"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Data Structures
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DataStructureCard
              title="PersonProfile"
              code={`{
  id: "${samplePerson.id}",
  name: "${samplePerson.name}",
  initials: "${samplePerson.initials}",
  relationshipType: "${samplePerson.relationshipType}",
  company: "${samplePerson.company}",
  context: "${samplePerson.context.substring(0, 35)}...",
  interactionCount: ${samplePerson.interactionCount}
}`}
            />
            <DataStructureCard
              title="HeartbeatSlice"
              code={`{
  sliceStart: "${sampleHeartbeat.sliceStart}",
  sliceEnd: "${sampleHeartbeat.sliceEnd}",
  avgBpm: ${sampleHeartbeat.avgBpm},
  hrvMs: ${sampleHeartbeat.hrvMs},
  emotionalState: "${sampleHeartbeat.emotionalState}",
  triggerFlag: ${sampleHeartbeat.triggerFlag}
}`}
            />
            <DataStructureCard
              title="TranscriptTurn"
              code={`{
  speaker: "${sampleTranscript.speaker}",
  speakerName: "${sampleTranscript.speakerName}",
  timestamp: "${sampleTranscript.timestamp}",
  text: "${sampleTranscript.text.substring(0, 40)}..."
}`}
            />
            <DataStructureCard
              title="Interaction"
              code={`{
  interactionId: "${sampleInteraction.interactionId}",
  date: "${sampleInteraction.date}",
  dayNumber: ${sampleInteraction.dayNumber},
  counterpartId: "${sampleInteraction.counterpartId}",
  durationMinutes: ${sampleInteraction.durationMinutes},
  transcript: TranscriptTurn[${sampleInteraction.transcript.length}],
  heartbeatSlices: HeartbeatSlice[${sampleInteraction.heartbeatSlices.length}]
}`}
            />
          </div>
        </div>

        {/* Narrative Arcs */}
        <div className="mb-12">
          <h2 
            className="text-2xl font-bold mb-6 text-white/90"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Narrative Arcs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <GlassCard className="p-5 border-l-4 border-orange-500">
              <div className="text-sm font-bold text-orange-400 mb-2 uppercase tracking-wider">
                Escalating Tension
              </div>
              <div className="text-xs text-white/70">
                Marcus Chen — 6 interactions, peaks Day 6, resolves Day 7
              </div>
            </GlassCard>
            <GlassCard className="p-5 border-l-4 border-purple-500">
              <div className="text-sm font-bold text-purple-400 mb-2 uppercase tracking-wider">
                Repair Arc
              </div>
              <div className="text-xs text-white/70">
                Priya Sharma — Awkward Day 2 → Avoidance → Repair Day 5 → Restored Day 7
              </div>
            </GlassCard>
            <GlassCard className="p-5 border-l-4 border-green-500">
              <div className="text-sm font-bold text-green-400 mb-2 uppercase tracking-wider">
                Consistent Calm
              </div>
              <div className="text-xs text-white/70">
                Elena Vasquez — Stable anchor, 9 interactions, lowest stress scores
              </div>
            </GlassCard>
            <GlassCard className="p-5 border-l-4 border-yellow-500">
              <div className="text-sm font-bold text-yellow-400 mb-2 uppercase tracking-wider">
                Save Moments
              </div>
              <div className="text-xs text-white/70">
                {saveInteractions.length} events — Ben Tucker Days 4 & 6
              </div>
            </GlassCard>
            <GlassCard className="p-5 border-l-4 border-cyan-500">
              <div className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">
                Surprise Insight
              </div>
              <div className="text-xs text-white/70">
                {surpriseInteractions.length} event — Jake Morrison Day 5
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Daily Summaries */}
        <div className="mb-12">
          <h2 
            className="text-2xl font-bold mb-6 text-white/90"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Daily Summaries
          </h2>
          <div className="space-y-4">
            {dailySummaries.map((day) => (
              <GlassCard key={day.dayNumber} className="p-6 hover:bg-white/[0.04] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-white/30" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      D{day.dayNumber}
                    </div>
                    <div>
                      <div className="text-white font-bold mb-1">{day.date}</div>
                      <div className="text-sm text-white/50">{day.emotionalWeather}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <div className="text-center">
                      <div className="text-white/40 text-xs mb-1">INTERACTIONS</div>
                      <div className="text-white font-bold">{day.totalInteractions}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/40 text-xs mb-1">TIME</div>
                      <div className="text-white font-bold">{day.totalMinutes}m</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/40 text-xs mb-1">BPM</div>
                      <div className="text-orange-400 font-bold">{day.avgBpm}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/40 text-xs mb-1">HRV</div>
                      <div className="text-green-400 font-bold">{day.avgHrv}ms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/40 text-xs mb-1">TRIGGERS</div>
                      <div className="text-yellow-400 font-bold">{day.triggerCount}</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {day.dominantEmotions.map((e, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                      style={{ 
                        backgroundColor: `${emotionColors[e]}20`,
                        color: emotionColors[e],
                        border: `1px solid ${emotionColors[e]}40`
                      }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{day.insightOfTheDay}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* People Grid */}
        <div className="mb-12">
          <h2 
            className="text-2xl font-bold mb-6 text-white/90"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            People ({profiles.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {profiles.map((p) => {
              const trend = relationshipTrends.find((t) => t.personId === p.id);
              return (
                <GlassCard key={p.id} className="p-5 hover:bg-white/[0.04] transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                      style={{ backgroundColor: p.avatarColor, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {p.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white truncate mb-1">{p.name}</div>
                      <div className="text-xs text-white/50">{p.relationshipType}</div>
                      <div className="text-xs text-white/40 mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {p.interactionCount}x interactions
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-white/50 mb-3 line-clamp-2">{p.context}</div>
                  {trend && (
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-1 rounded font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: trend.overallTrend === "improving" 
                            ? "#4ade8020"
                            : trend.overallTrend === "declining"
                            ? "#ef444420"
                            : trend.overallTrend === "volatile"
                            ? "#fb923c20"
                            : "#64748b20",
                          color: trend.overallTrend === "improving"
                            ? "#4ade80"
                            : trend.overallTrend === "declining"
                            ? "#ef4444"
                            : trend.overallTrend === "volatile"
                            ? "#fb923c"
                            : "#64748b",
                          border: `1px solid ${
                            trend.overallTrend === "improving" 
                              ? "#4ade8040"
                              : trend.overallTrend === "declining"
                              ? "#ef444440"
                              : trend.overallTrend === "volatile"
                              ? "#fb923c40"
                              : "#64748b40"
                          }`
                        }}
                      >
                        {trend.overallTrend}
                      </span>
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Interaction Distribution */}
        <div className="mb-12">
          <h2 
            className="text-2xl font-bold mb-6 text-white/90"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            7-Day Interaction Distribution
          </h2>
          <div className="grid grid-cols-7 gap-3">
            {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
              const dayInteractions = interactionsByDay[dayNum as keyof typeof interactionsByDay];
              return (
                <GlassCard key={dayNum} className="p-4 hover:bg-white/[0.04] transition-all">
                  <div className="text-xs text-white/40 mb-2 uppercase tracking-widest">Day {dayNum}</div>
                  <div className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {dayInteractions.length}
                  </div>
                  <div className="space-y-1.5">
                    {dayInteractions.map((interaction) => {
                      const mainEmotion = interaction.overallEmotionalArc[interaction.overallEmotionalArc.length - 1];
                      return (
                        <div
                          key={interaction.interactionId}
                          className="h-2 rounded-full"
                          style={{ backgroundColor: emotionColors[mainEmotion] }}
                          title={`${interaction.counterpartId.replace("person_", "").replace(/_/g, " ")} — ${mainEmotion}`}
                        />
                      );
                    })}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-white/30 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            PULSE_DATA_v1.0 • {profiles.length} profiles • {allInteractions.length} interactions • {dailySummaries.length} daily summaries • {relationshipTrends.length} relationship trends
          </p>
        </div>
      </div>
    </div>
  );
}
