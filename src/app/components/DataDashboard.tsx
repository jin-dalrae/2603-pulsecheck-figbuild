import { profiles, userProfile, allInteractions, interactionsByDay, dailySummaries, relationshipTrends } from "../data";
import type { EmotionalState } from "../data";
import { Link } from "react-router";

const emotionColors: Record<EmotionalState, string> = {
  calm: "#4CAF50",
  engaged: "#2196F3",
  anxious: "#FF9800",
  frustrated: "#F44336",
  joyful: "#FFD700",
  sad: "#9C27B0",
  defensive: "#E91E63",
  withdrawn: "#607D8B",
};

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
      <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{label}</div>
      <div className="text-white text-2xl">{value}</div>
      {sub && <div className="text-zinc-400 text-xs mt-1">{sub}</div>}
    </div>
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

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl tracking-tight text-white">Pulse</h1>
            <p className="text-zinc-400 mt-1">Mock Data Validation Dashboard</p>
            <p className="text-zinc-600 text-sm mt-1">
              User: {userProfile.name} | Baseline: {userProfile.baselineBpm} BPM / {userProfile.baselineHrv}ms HRV
            </p>
          </div>
          <Link
            to="/glass"
            className="bg-white/5 border border-white/10 text-white/60 px-4 py-2 rounded-full text-sm hover:bg-white/10 hover:text-white/80 transition-all"
          >
            Launch Glass HUD →
          </Link>
        </div>

        {/* Top-level Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          <StatCard label="Profiles" value={profiles.length} sub="20 target" />
          <StatCard label="Interactions" value={allInteractions.length} sub="70 target (10/day)" />
          <StatCard label="Days" value={Object.keys(interactionsByDay).length} sub="7 target" />
          <StatCard label="Transcript Turns" value={totalTranscriptTurns} sub={`Avg ${Math.round(totalTranscriptTurns / 70)} per interaction`} />
          <StatCard label="Heartbeat Slices" value={totalHeartbeatSlices} sub={`Avg ${Math.round(totalHeartbeatSlices / 70)} per interaction`} />
          <StatCard label="Trigger Events" value={totalTriggers} sub="1.5σ deviations" />
        </div>

        {/* Narrative Arc Badges */}
        <div className="mb-8">
          <h2 className="text-lg text-zinc-300 mb-3">Narrative Arcs</h2>
          <div className="flex flex-wrap gap-3">
            <div className="bg-red-950/50 border border-red-800 rounded-lg px-4 py-3">
              <div className="text-red-400 text-sm">Escalating Tension</div>
              <div className="text-white text-xs mt-1">Marcus Chen — 6 interactions, peaks Day 6, resolves Day 7</div>
            </div>
            <div className="bg-purple-950/50 border border-purple-800 rounded-lg px-4 py-3">
              <div className="text-purple-400 text-sm">Repair Arc</div>
              <div className="text-white text-xs mt-1">Priya Sharma — Awkward Day 2 → Avoidance → Repair Day 5 → Restored Day 7</div>
            </div>
            <div className="bg-green-950/50 border border-green-800 rounded-lg px-4 py-3">
              <div className="text-green-400 text-sm">Consistent Calm</div>
              <div className="text-white text-xs mt-1">Elena Vasquez — Stable anchor, 9 interactions, lowest stress scores</div>
            </div>
            <div className="bg-yellow-950/50 border border-yellow-800 rounded-lg px-4 py-3">
              <div className="text-yellow-400 text-sm">Save Moments</div>
              <div className="text-white text-xs mt-1">{saveInteractions.length} events — Ben Tucker Days 4 & 6</div>
            </div>
            <div className="bg-cyan-950/50 border border-cyan-800 rounded-lg px-4 py-3">
              <div className="text-cyan-400 text-sm">Surprise Insight</div>
              <div className="text-white text-xs mt-1">{surpriseInteractions.length} event — Jake Morrison Day 5 (performed vs felt emotion)</div>
            </div>
          </div>
        </div>

        {/* Day-by-day summary */}
        <div className="mb-8">
          <h2 className="text-lg text-zinc-300 mb-3">Daily Summaries</h2>
          <div className="space-y-3">
            {dailySummaries.map((day) => (
              <div key={day.dayNumber} className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 text-sm">Day {day.dayNumber}</span>
                    <span className="text-white">{day.date}</span>
                    <span className="text-zinc-400 text-sm">{day.emotionalWeather}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-zinc-400">{day.totalInteractions} interactions</span>
                    <span className="text-zinc-400">{day.totalMinutes} min</span>
                    <span className="text-red-400">{day.avgBpm} BPM</span>
                    <span className="text-blue-400">{day.avgHrv}ms HRV</span>
                    <span className="text-yellow-400">{day.triggerCount} triggers</span>
                  </div>
                </div>
                <div className="flex gap-1.5 mb-2">
                  {day.dominantEmotions.map((e, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${emotionColors[e]}22`, color: emotionColors[e] }}
                    >
                      {e}
                    </span>
                  ))}
                </div>
                <p className="text-zinc-500 text-xs">{day.insightOfTheDay}</p>
              </div>
            ))}
          </div>
        </div>

        {/* People Grid */}
        <div className="mb-8">
          <h2 className="text-lg text-zinc-300 mb-3">People Profiles ({profiles.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {profiles.map((p) => {
              const trend = relationshipTrends.find((t) => t.personId === p.id);
              return (
                <div key={p.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs shrink-0"
                      style={{ backgroundColor: p.avatarColor }}
                    >
                      {p.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-sm truncate">{p.name}</div>
                      <div className="text-zinc-500 text-xs">{p.relationshipType} · {p.interactionCount}x</div>
                    </div>
                  </div>
                  <div className="text-zinc-600 text-xs truncate">{p.context}</div>
                  {trend && (
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          trend.overallTrend === "improving"
                            ? "bg-green-950 text-green-400"
                            : trend.overallTrend === "declining"
                            ? "bg-red-950 text-red-400"
                            : trend.overallTrend === "volatile"
                            ? "bg-yellow-950 text-yellow-400"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {trend.overallTrend}
                      </span>
                      {trend.narrativeArc && (
                        <span className="text-xs text-zinc-600">{trend.narrativeArc}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interaction Distribution */}
        <div className="mb-8">
          <h2 className="text-lg text-zinc-300 mb-3">Interaction Distribution</h2>
          <div className="grid grid-cols-7 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((dayNum) => {
              const dayInteractions = interactionsByDay[dayNum as keyof typeof interactionsByDay];
              return (
                <div key={dayNum} className="bg-zinc-900 rounded-lg border border-zinc-800 p-3">
                  <div className="text-zinc-500 text-xs mb-2">Day {dayNum}</div>
                  <div className="text-white text-lg mb-2">{dayInteractions.length}</div>
                  <div className="space-y-1">
                    {dayInteractions.map((interaction) => {
                      const mainEmotion = interaction.overallEmotionalArc[interaction.overallEmotionalArc.length - 1];
                      return (
                        <div
                          key={interaction.interactionId}
                          className="h-1.5 rounded-full"
                          style={{ backgroundColor: emotionColors[mainEmotion] }}
                          title={`${interaction.counterpartId.replace("person_", "").replace(/_/g, " ")} — ${mainEmotion}`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-zinc-700 text-xs py-8 border-t border-zinc-900">
          Pulse Mock Data v1.0 — {profiles.length} profiles · {allInteractions.length} interactions · {dailySummaries.length} daily summaries · {relationshipTrends.length} relationship trends
        </div>
      </div>
    </div>
  );
}
