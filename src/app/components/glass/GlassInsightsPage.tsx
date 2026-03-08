import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { dailySummaries, relationshipTrends, getProfile } from "../../data";
import type { EmotionalState } from "../../data";
import {
  ArrowLeft,
  Activity,
  Heart,
  Zap,
  User,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const emotionColors: Record<string, string> = {
  calm: "#4CAF50",
  engaged: "#2196F3",
  anxious: "#FF9800",
  frustrated: "#F44336",
  joyful: "#FFD700",
  sad: "#9C27B0",
  defensive: "#E91E63",
  withdrawn: "#607D8B",
};

export function GlassInsightsPage() {
  const [activeTab, setActiveTab] = useState<"me" | "others">("me");
  const [expandedProfiles, setExpandedProfiles] = useState<Set<string>>(new Set());

  const toggleProfile = (id: string) => {
    setExpandedProfiles(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Format data for the charts
  const chartData = dailySummaries.map((day) => ({
    name: `Day ${day.dayNumber}`,
    bpm: day.avgBpm,
    hrv: day.avgHrv,
    stress: day.avgBpm - day.avgHrv, // simplified derived metric
  }));

  return (
    <div
      className="min-h-screen w-full bg-zinc-950 text-white relative overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Dynamic Background: Bright Day Living Room */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1696986324679-dad26261d579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBzdW5saXQlMjBtaW5pbWFsaXN0JTIwZW1wdHklMjBsaXZpbmclMjByb29tJTIwd2hpdGUlMjB3YWxscyUyMGxhcmdlJTIwd2luZG93c3xlbnwxfHx8fDE3NzI5NTQ4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Bright Sunlit Living Room"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.85]"
        />
        {/* Subtle glass tint to ensure white HUD elements stay legible */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        
        {/* Dynamic environmental blurs, reduced intensity for day mode */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 shrink-0">
          <div className="flex items-center gap-6">
            <Link
              to="/glass"
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={18} className="text-white/70" />
            </Link>
            <div>
              <h1 className="text-2xl font-light tracking-tight flex items-center gap-3">
                Pulse <span className="text-white/30 font-mono text-sm uppercase tracking-widest mt-1">Insights</span>
              </h1>
            </div>
          </div>

          <div className="flex bg-white/20 border border-white/20 p-1 rounded-full backdrop-blur-md shadow-sm">
            <button
              onClick={() => setActiveTab("me")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "me"
                  ? "bg-white/30 text-white shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity size={16} />
                My State
              </div>
            </button>
            <button
              onClick={() => setActiveTab("others")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "others"
                  ? "bg-white/30 text-white shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users size={16} />
                Others
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-4 custom-scrollbar pb-12">
          {activeTab === "me" ? (
            <motion.div
              key="me"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Daily Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/15 border border-white/20 rounded-2xl p-6 backdrop-blur-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/20 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-red-400/30 transition-colors duration-700" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/70 font-mono text-xs tracking-wider uppercase">Avg BPM</span>
                    <Heart size={16} className="text-red-400" />
                  </div>
                  <div className="text-4xl font-light tracking-tighter mb-1 text-white shadow-sm">
                    {Math.round(dailySummaries.reduce((acc, curr) => acc + curr.avgBpm, 0) / dailySummaries.length)}
                  </div>
                  <div className="text-white/50 text-xs font-mono">7-DAY AVERAGE</div>
                </div>

                <div className="bg-white/15 border border-white/20 rounded-2xl p-6 backdrop-blur-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-blue-400/30 transition-colors duration-700" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/70 font-mono text-xs tracking-wider uppercase">Avg HRV</span>
                    <Activity size={16} className="text-blue-400" />
                  </div>
                  <div className="text-4xl font-light tracking-tighter mb-1 text-white shadow-sm">
                    {Math.round(dailySummaries.reduce((acc, curr) => acc + curr.avgHrv, 0) / dailySummaries.length)}
                    <span className="text-lg text-white/60 ml-1">ms</span>
                  </div>
                  <div className="text-white/50 text-xs font-mono">7-DAY AVERAGE</div>
                </div>

                <div className="bg-white/15 border border-white/20 rounded-2xl p-6 backdrop-blur-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-amber-400/30 transition-colors duration-700" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/70 font-mono text-xs tracking-wider uppercase">Triggers</span>
                    <Zap size={16} className="text-amber-400" />
                  </div>
                  <div className="text-4xl font-light tracking-tighter mb-1 text-white shadow-sm">
                    {dailySummaries.reduce((acc, curr) => acc + curr.triggerCount, 0)}
                  </div>
                  <div className="text-white/50 text-xs font-mono">7-DAY TOTAL</div>
                </div>
              </div>

              {/* Biometrics Chart */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-2xl">
                <h3 className="text-white font-mono text-xs tracking-widest uppercase mb-8">
                  Physiological Trends Over Time
                </h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs key="chart-defs">
                        <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1" key="gradient-bpm">
                          <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} key="stop-bpm-5" />
                          <stop offset="95%" stopColor="#f87171" stopOpacity={0} key="stop-bpm-95" />
                        </linearGradient>
                        <linearGradient id="colorHrv" x1="0" y1="0" x2="0" y2="1" key="gradient-hrv">
                          <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} key="stop-hrv-5" />
                          <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} key="stop-hrv-95" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} key="grid" />
                      <XAxis
                        key="x-axis"
                        dataKey="name"
                        stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis
                        key="y-axis"
                        stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        key="tooltip"
                        contentStyle={{
                          backgroundColor: 'rgba(9, 9, 11, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(12px)',
                          color: '#fff',
                          fontFamily: 'monospace',
                          fontSize: '12px'
                        }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area
                        key="area-bpm"
                        type="monotone"
                        dataKey="bpm"
                        name="BPM"
                        stroke="#f87171"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorBpm)"
                      />
                      <Area
                        key="area-hrv"
                        type="monotone"
                        dataKey="hrv"
                        name="HRV (ms)"
                        stroke="#60a5fa"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorHrv)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Day-by-day emotional timeline */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-2xl">
                <h3 className="text-white font-mono text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
                  <Calendar size={14} />
                  Daily Emotional States
                </h3>
                <div className="space-y-4">
                  {dailySummaries.map((day) => (
                    <div key={day.date} className="flex flex-col md:flex-row md:items-center gap-4 bg-white/10 border border-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors">
                      <div className="w-24 shrink-0">
                        <div className="text-white text-sm font-semibold">Day {day.dayNumber}</div>
                        <div className="text-white/60 text-xs font-mono mt-1">{day.emotionalWeather}</div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {day.dominantEmotions.map((emotion) => (
                            <span
                              key={`${day.date}-${emotion}`}
                              className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider border shadow-sm bg-white/10"
                              style={{
                                borderColor: `${emotionColors[emotion] || '#fff'}50`,
                                color: emotionColors[emotion] || '#fff'
                              }}
                            >
                              {emotion}
                            </span>
                          ))}
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed truncate md:whitespace-normal">
                          {day.insightOfTheDay}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 md:w-48 shrink-0 justify-end md:justify-start mt-2 md:mt-0 pt-2 md:pt-0 border-t border-white/10 md:border-0">
                         <div className="text-right">
                           <div className="text-white/40 text-[10px] font-mono uppercase tracking-widest">BPM</div>
                           <div className="text-red-400 text-sm font-bold">{day.avgBpm}</div>
                         </div>
                         <div className="text-right">
                           <div className="text-white/40 text-[10px] font-mono uppercase tracking-widest">HRV</div>
                           <div className="text-blue-400 text-sm font-bold">{day.avgHrv}</div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="others"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {relationshipTrends.map((trend) => {
                  const person = getProfile(trend.personId);
                  if (!person) return null;

                  const isExpanded = expandedProfiles.has(trend.personId);

                  return (
                    <div key={trend.personId} className="bg-white/15 border border-white/20 rounded-2xl p-6 backdrop-blur-2xl hover:bg-white/20 transition-all duration-300 group">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {person.avatarUrl ? (
                              <ImageWithFallback
                                src={person.avatarUrl}
                                alt={person.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-white/20 shadow-md"
                              />
                            ) : (
                              <div
                                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium shadow-inner border-2 border-white/20"
                                style={{ backgroundColor: person.avatarColor, color: '#fff' }}
                              >
                                {person.initials}
                              </div>
                            )}
                            <div
                              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-900"
                              style={{
                                backgroundColor: trend.overallTrend === 'improving' ? '#10b981' :
                                                trend.overallTrend === 'declining' ? '#ef4444' :
                                                trend.overallTrend === 'volatile' ? '#f59e0b' : '#6b7280'
                              }}
                            >
                              {trend.overallTrend === 'improving' && <TrendingUp size={10} className="text-white" />}
                              {trend.overallTrend === 'declining' && <TrendingDown size={10} className="text-white" />}
                              {trend.overallTrend === 'volatile' && <Activity size={10} className="text-white" />}
                              {trend.overallTrend === 'stable' && <Minus size={10} className="text-white" />}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">{person.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-white/60 text-xs font-mono uppercase tracking-wider">{person.relationshipType}</span>
                              <span className="text-white/30 text-xs">•</span>
                              <span className="text-white/60 text-xs font-mono capitalize">{trend.overallTrend}</span>
                            </div>
                          </div>
                        </div>

                        {/* Sparkline for connection score */}
                        <div className="w-24 h-12 opacity-90">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trend.weeklyData}>
                              <defs key={`defs-${trend.personId}`}>
                                <linearGradient id={`colorScore-${trend.personId}`} x1="0" y1="0" x2="0" y2="1" key={`gradient-${trend.personId}`}>
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} key="stop-1" />
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} key="stop-2" />
                                </linearGradient>
                              </defs>
                              <Area
                                key={`area-${trend.personId}`}
                                type="monotone"
                                dataKey="connectionScore"
                                stroke="#10b981"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill={`url(#colorScore-${trend.personId})`}
                                isAnimationActive={false}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="mb-5 bg-white/5 rounded-xl p-4 border border-white/10 relative">
                        <p className={`text-white/80 text-sm leading-relaxed transition-all duration-300 ${isExpanded ? "" : "line-clamp-4"}`}>
                          {trend.weekSummary}
                        </p>
                        <button
                          onClick={() => toggleProfile(trend.personId)}
                          className="text-white/60 hover:text-white font-mono mt-3 uppercase tracking-wider transition-colors text-[10px]"
                        >
                          {isExpanded ? "Show Less" : "Read Full Report"}
                        </button>
                      </div>

                      {/* Emotion Distribution Bar */}
                      <div>
                        <h4 className="text-white/60 text-[10px] font-mono uppercase tracking-widest mb-2">Dominant Interaction States</h4>
                        <div className="flex h-3 w-full rounded-full overflow-hidden gap-0.5 opacity-90">
                          {trend.weeklyData.map((d) => (
                            <div
                              key={`bar-${trend.personId}-${d.day}`}
                              className="h-full flex-1 transition-all duration-300 hover:opacity-100 hover:scale-y-125"
                              style={{ backgroundColor: emotionColors[d.dominantEmotion] || '#4b5563' }}
                              title={`Day ${d.day}: ${d.dominantEmotion}`}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between mt-1">
                           <span className="text-white/40 text-[9px] font-mono">Day 1</span>
                           <span className="text-white/40 text-[9px] font-mono">Day 7</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
