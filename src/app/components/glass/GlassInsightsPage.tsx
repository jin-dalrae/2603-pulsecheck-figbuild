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
  BarChart,
  Bar,
  Cell,
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
      className="min-h-screen w-full bg-black text-white relative overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] opacity-[0.03] bg-cover bg-center mix-blend-overlay" />
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

          <div className="flex bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
            <button
              onClick={() => setActiveTab("me")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "me"
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <div className="flex items-center gap-2">
                <Activity size={16} />
                My State
              </div>
            </button>
            <button
              onClick={() => setActiveTab("others")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "others"
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/50 hover:text-white/80"
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
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-red-500/20 transition-colors duration-700" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/50 font-mono text-xs tracking-wider uppercase">Avg BPM</span>
                    <Heart size={16} className="text-red-400/70" />
                  </div>
                  <div className="text-4xl font-light tracking-tighter mb-1">
                    {Math.round(dailySummaries.reduce((acc, curr) => acc + curr.avgBpm, 0) / dailySummaries.length)}
                  </div>
                  <div className="text-white/40 text-xs font-mono">7-DAY AVERAGE</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors duration-700" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/50 font-mono text-xs tracking-wider uppercase">Avg HRV</span>
                    <Activity size={16} className="text-blue-400/70" />
                  </div>
                  <div className="text-4xl font-light tracking-tighter mb-1">
                    {Math.round(dailySummaries.reduce((acc, curr) => acc + curr.avgHrv, 0) / dailySummaries.length)}
                    <span className="text-lg text-white/40 ml-1">ms</span>
                  </div>
                  <div className="text-white/40 text-xs font-mono">7-DAY AVERAGE</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-amber-500/20 transition-colors duration-700" />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/50 font-mono text-xs tracking-wider uppercase">Triggers</span>
                    <Zap size={16} className="text-amber-400/70" />
                  </div>
                  <div className="text-4xl font-light tracking-tighter mb-1">
                    {dailySummaries.reduce((acc, curr) => acc + curr.triggerCount, 0)}
                  </div>
                  <div className="text-white/40 text-xs font-mono">7-DAY TOTAL</div>
                </div>
              </div>

              {/* Biometrics Chart */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="text-white/70 font-mono text-xs tracking-widest uppercase mb-8">
                  Physiological Trends Over Time
                </h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorHrv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis
                        dataKey="name"
                        stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
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
                        type="monotone"
                        dataKey="bpm"
                        name="BPM"
                        stroke="#f87171"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorBpm)"
                      />
                      <Area
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
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                <h3 className="text-white/70 font-mono text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
                  <Calendar size={14} />
                  Daily Emotional States
                </h3>
                <div className="space-y-4">
                  {dailySummaries.map((day) => (
                    <div key={day.date} className="flex flex-col md:flex-row md:items-center gap-4 bg-white/5 border border-white/5 rounded-xl p-4 hover:bg-white/[0.07] transition-colors">
                      <div className="w-24 shrink-0">
                        <div className="text-white/80 text-sm font-medium">Day {day.dayNumber}</div>
                        <div className="text-white/40 text-xs font-mono mt-1">{day.emotionalWeather}</div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {day.dominantEmotions.map(emotion => (
                            <span
                              key={emotion}
                              className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider border"
                              style={{
                                backgroundColor: `${emotionColors[emotion] || '#fff'}15`,
                                borderColor: `${emotionColors[emotion] || '#fff'}30`,
                                color: emotionColors[emotion] || '#fff'
                              }}
                            >
                              {emotion}
                            </span>
                          ))}
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed truncate md:whitespace-normal">
                          {day.insightOfTheDay}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 md:w-48 shrink-0 justify-end md:justify-start mt-2 md:mt-0 pt-2 md:pt-0 border-t border-white/5 md:border-0">
                         <div className="text-right">
                           <div className="text-white/30 text-[10px] font-mono uppercase tracking-widest">BPM</div>
                           <div className="text-red-400/90 text-sm font-mono">{day.avgBpm}</div>
                         </div>
                         <div className="text-right">
                           <div className="text-white/30 text-[10px] font-mono uppercase tracking-widest">HRV</div>
                           <div className="text-blue-400/90 text-sm font-mono">{day.avgHrv}</div>
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
                    <div key={trend.personId} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-300">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {person.avatarUrl ? (
                              <ImageWithFallback
                                src={person.avatarUrl}
                                alt={person.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                              />
                            ) : (
                              <div
                                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium shadow-inner"
                                style={{ backgroundColor: person.avatarColor, color: '#fff' }}
                              >
                                {person.initials}
                              </div>
                            )}
                            <div
                              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]"
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
                            <h3 className="text-lg font-medium text-white/90">{person.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-white/40 text-xs font-mono uppercase tracking-wider">{person.relationshipType}</span>
                              <span className="text-white/20 text-xs">•</span>
                              <span className="text-white/40 text-xs font-mono capitalize">{trend.overallTrend}</span>
                            </div>
                          </div>
                        </div>

                        {/* Sparkline for connection score */}
                        <div className="w-24 h-12 opacity-70">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trend.weeklyData}>
                              <defs>
                                <linearGradient id={`colorScore-${trend.personId}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <Area
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

                      <div className="mb-5 bg-black/20 rounded-xl p-4 border border-white/5 relative">
                        <p className={`text-white/60 text-sm leading-relaxed transition-all duration-300 ${isExpanded ? "" : "line-clamp-4"}`}>
                          {trend.weekSummary}
                        </p>
                        <button
                          onClick={() => toggleProfile(trend.personId)}
                          className="text-white/40 hover:text-white/80 text-[10px] font-mono mt-3 uppercase tracking-wider transition-colors"
                        >
                          {isExpanded ? "Show Less" : "Read Full Report"}
                        </button>
                      </div>

                      {/* Emotion Distribution Bar */}
                      <div>
                        <h4 className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-2">Dominant Interaction States</h4>
                        <div className="flex h-3 w-full rounded-full overflow-hidden gap-0.5 opacity-80">
                          {trend.weeklyData.map((d, i) => (
                            <div
                              key={i}
                              className="h-full flex-1 transition-all duration-300 hover:opacity-100"
                              style={{ backgroundColor: emotionColors[d.dominantEmotion] || '#4b5563' }}
                              title={`Day ${d.day}: ${d.dominantEmotion}`}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between mt-1">
                           <span className="text-white/30 text-[9px] font-mono">Day 1</span>
                           <span className="text-white/30 text-[9px] font-mono">Day 7</span>
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
