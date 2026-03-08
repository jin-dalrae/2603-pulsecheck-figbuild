import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
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
  Minus,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
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
  const [hudVisible, setHudVisible] = useState(true);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);

  const toggleProfile = (id: string) => {
    setExpandedProfiles(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const nextDay = () => {
    setCurrentDayIndex((prev) => (prev + 1) % dailySummaries.length);
  };

  const prevDay = () => {
    setCurrentDayIndex((prev) => (prev - 1 + dailySummaries.length) % dailySummaries.length);
  };

  const nextPerson = () => {
    setCurrentPersonIndex((prev) => (prev + 1) % relationshipTrends.length);
  };

  const prevPerson = () => {
    setCurrentPersonIndex((prev) => (prev - 1 + relationshipTrends.length) % relationshipTrends.length);
  };

  // Format data for the charts
  const chartData = dailySummaries.map((day) => ({
    name: `Day ${day.dayNumber}`,
    bpm: day.avgBpm,
    hrv: day.avgHrv,
    stress: day.avgBpm - day.avgHrv, // simplified derived metric
  }));

  // Compute weekly averages for radial display
  const avgBpm = Math.round(dailySummaries.reduce((acc, curr) => acc + curr.avgBpm, 0) / dailySummaries.length);
  const avgHrv = Math.round(dailySummaries.reduce((acc, curr) => acc + curr.avgHrv, 0) / dailySummaries.length);
  const totalTriggers = dailySummaries.reduce((acc, curr) => acc + curr.triggerCount, 0);

  // Radial chart data for heart rate (0-200 scale)
  const radialBpmData = [
    {
      name: "BPM",
      value: avgBpm,
      fill: "#ef4444",
    },
  ];

  // Radial chart data for HRV (0-100 scale)
  const radialHrvData = [
    {
      name: "HRV",
      value: avgHrv,
      fill: "#3b82f6",
    },
  ];

  return (
    <div
      className="min-h-screen w-full bg-black text-white relative overflow-hidden"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* AR Glass Effect: See-through simulation with subtle environmental hints */}
      <div className="absolute inset-0 z-0">
        {/* Real-world background visible through AR glasses */}
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1696986324679-dad26261d579?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBzdW5saXQlMjBtaW5pbWFsaXN0JTIwZW1wdHklMjBsaXZpbmclMjByb29tJTIwd2hpdGUlMjB3YWxscyUyMGxhcmdlJTIwd2luZG93c3xlbnwxfHx8fDE3NzI5NTQ4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Real-world environment through AR glasses"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* AR glass tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-black/40 to-zinc-900/60" />
        
        {/* Subtle lens distortion overlay */}
        <div className="absolute inset-4 rounded-[2rem] border border-white/[0.03]" />
        
        {/* Lens curvature highlight (top reflection) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-24 bg-gradient-to-b from-white/[0.015] to-transparent rounded-b-full" />
        
        {/* Environmental glow hints (simulating ambient light) */}
        <div className="absolute top-[-15%] right-[-10%] w-[40%] h-[40%] bg-blue-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] bg-purple-500/[0.02] blur-[140px] rounded-full" />
      </div>

      {/* HUD Layer with barrel warp simulation */}
      <div
        className="absolute inset-0 z-10"
        style={{ perspective: '600px', perspectiveOrigin: '50% 50%' }}
      >
        {/* Top Section - warps downward */}
        <div
          className="absolute top-0 left-0 right-0 h-[20%]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(2deg)',
            transformOrigin: 'center bottom',
          }}
        >
          {/* Header Navigation */}
          <AnimatePresence>
            {hudVisible && (
              <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-between p-6 md:p-8"
              >
                <div className="flex items-center gap-4">
                  <Link
                    to="/glass"
                    className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md"
                  >
                    <ArrowLeft size={16} className="text-white/70" />
                  </Link>
                  <div>
                    <h1 className="text-lg font-bold tracking-tight flex items-center gap-3 uppercase text-white/90">
                      PULSE <span className="text-white/30 text-xs tracking-widest">/ INSIGHTS</span>
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* HUD visibility toggle */}
                  <button
                    onClick={() => setHudVisible(!hudVisible)}
                    className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md"
                  >
                    {hudVisible ? <Eye size={16} className="text-white/70" /> : <EyeOff size={16} className="text-white/70" />}
                  </button>

                  {/* Tab Switcher - Gaming HUD style */}
                  <div className="flex bg-white/[0.08] border border-white/15 p-1 rounded-lg backdrop-blur-xl">
                    <button
                      onClick={() => setActiveTab("me")}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                        activeTab === "me"
                          ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
                          : "text-white/50 hover:text-white/80"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Activity size={12} />
                        ME
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveTab("others")}
                      className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                        activeTab === "others"
                          ? "bg-purple-500/30 text-purple-300 border border-purple-400/30 shadow-lg shadow-purple-500/20"
                          : "text-white/50 hover:text-white/80"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Users size={12} />
                        OTHERS
                      </div>
                    </button>
                  </div>
                </div>
              </motion.header>
            )}
          </AnimatePresence>
        </div>

        {/* Center-Bottom Section - Primary viewing zone (downward glance) */}
        <div
          className="absolute bottom-[8%] left-0 right-0 h-[72%] overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-1.5deg)',
            transformOrigin: 'center top',
          }}
        >
          <div className="h-full overflow-y-auto px-6 md:px-12 custom-scrollbar pb-8">
            <AnimatePresence mode="wait">
              {activeTab === "me" && hudVisible ? (
                <motion.div
                  key="me"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 max-w-2xl mx-auto snap-y snap-mandatory h-full overflow-y-auto"
                  style={{ scrollSnapType: 'y mandatory' }}
                >
                  {/* Radial Vital Stats - Stacked vertically in center */}
                  <div className="snap-start snap-always min-h-screen flex flex-col items-center justify-center gap-6 py-12"
                    style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
                  >
                    {/* BPM Radial */}
                    <div className="relative">
                      <div className="w-56 h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="65%"
                            outerRadius="100%"
                            data={radialBpmData}
                            startAngle={90}
                            endAngle={-270}
                          >
                            <PolarAngleAxis type="number" domain={[0, 200]} angleAxisId={0} tick={false} />
                            <RadialBar
                              background={{ fill: 'rgba(255,255,255,0.05)' }}
                              clockWise
                              dataKey="value"
                              cornerRadius={10}
                              fill="#ef4444"
                            />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Heart size={24} className="text-red-400 mb-2 animate-pulse" />
                        <div className="text-5xl font-bold text-white tracking-tighter">{avgBpm}</div>
                        <div className="text-xs uppercase tracking-widest text-white/50 mt-1">AVG BPM</div>
                        <div className="text-[10px] uppercase tracking-widest text-white/30 mt-0.5">7-DAY</div>
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl -z-10" />
                    </div>

                    {/* HRV & Triggers - Side by side below BPM */}
                    <div className="flex gap-6">
                      {/* HRV */}
                      <div className="relative">
                        <div className="w-40 h-40">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart
                              cx="50%"
                              cy="50%"
                              innerRadius="65%"
                              outerRadius="100%"
                              data={radialHrvData}
                              startAngle={90}
                              endAngle={-270}
                            >
                              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                              <RadialBar
                                background={{ fill: 'rgba(255,255,255,0.05)' }}
                                clockWise
                                dataKey="value"
                                cornerRadius={10}
                                fill="#3b82f6"
                              />
                            </RadialBarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Activity size={18} className="text-blue-400 mb-1" />
                          <div className="text-3xl font-bold text-white tracking-tighter">{avgHrv}</div>
                          <div className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">HRV MS</div>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl -z-10" />
                      </div>

                      {/* Triggers */}
                      <div className="relative">
                        <div className="w-40 h-40 flex items-center justify-center">
                          <div className="w-full h-full rounded-full border-2 border-amber-500/30 bg-white/[0.02] backdrop-blur-md flex flex-col items-center justify-center">
                            <Zap size={18} className="text-amber-400 mb-1" />
                            <div className="text-3xl font-bold text-white tracking-tighter">{totalTriggers}</div>
                            <div className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">TRIGGERS</div>
                          </div>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl -z-10" />
                      </div>
                    </div>
                  </div>

                  {/* Biometric Timeline - Holographic chart */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 backdrop-blur-xl relative overflow-hidden snap-start snap-always min-h-screen flex flex-col justify-center"
                    style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
                  >
                    {/* Scan line effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-32 pointer-events-none"
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    <h3 className="text-white/60 text-xs tracking-widest uppercase mb-6 flex items-center gap-2 justify-center">
                      <Activity size={14} className="text-cyan-400" />
                      PHYSIOLOGICAL TRENDS
                    </h3>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs key="chart-defs">
                            <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1" key="gradient-bpm">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} key="stop-bpm-5" />
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} key="stop-bpm-95" />
                            </linearGradient>
                            <linearGradient id="colorHrv" x1="0" y1="0" x2="0" y2="1" key="gradient-hrv">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} key="stop-hrv-5" />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} key="stop-hrv-95" />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} key="grid" />
                          <XAxis
                            key="x-axis"
                            dataKey="name"
                            stroke="rgba(255,255,255,0.15)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                          />
                          <YAxis
                            key="y-axis"
                            stroke="rgba(255,255,255,0.15)"
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip
                            key="tooltip"
                            contentStyle={{
                              backgroundColor: 'rgba(0, 0, 0, 0.9)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '8px',
                              backdropFilter: 'blur(12px)',
                              color: '#fff',
                              fontFamily: 'JetBrains Mono',
                              fontSize: '12px'
                            }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Area
                            key="area-bpm"
                            type="monotone"
                            dataKey="bpm"
                            name="BPM"
                            stroke="#ef4444"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorBpm)"
                          />
                          <Area
                            key="area-hrv"
                            type="monotone"
                            dataKey="hrv"
                            name="HRV (ms)"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorHrv)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Emotional Timeline - Single day view with navigation */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-5">
                      <button
                        onClick={prevDay}
                        className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors"
                        aria-label="Previous day"
                      >
                        <ChevronLeft size={18} className="text-white/70" />
                      </button>
                      
                      <h3 className="text-white/60 text-xs tracking-widest uppercase flex items-center gap-2">
                        <Calendar size={14} className="text-purple-400" />
                        DAY {currentDayIndex + 1} / 7
                      </h3>

                      <button
                        onClick={nextDay}
                        className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors"
                        aria-label="Next day"
                      >
                        <ChevronRight size={18} className="text-white/70" />
                      </button>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentDayIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-4"
                      >
                        {/* Day and weather */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-white text-base font-bold">DAY {dailySummaries[currentDayIndex].dayNumber}</div>
                            <div className="text-white/50 text-xs uppercase tracking-wider">{dailySummaries[currentDayIndex].emotionalWeather}</div>
                          </div>
                          {/* Vitals */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-red-400 text-sm font-bold">{dailySummaries[currentDayIndex].avgBpm}</div>
                              <div className="text-white/30 text-[9px] uppercase tracking-widest">BPM</div>
                            </div>
                            <div className="text-right">
                              <div className="text-blue-400 text-sm font-bold">{dailySummaries[currentDayIndex].avgHrv}</div>
                              <div className="text-white/30 text-[9px] uppercase tracking-widest">HRV</div>
                            </div>
                          </div>
                        </div>

                        {/* Emotion tags */}
                        <div className="flex flex-wrap gap-2 justify-center">
                          {dailySummaries[currentDayIndex].dominantEmotions.map((emotion) => (
                            <span
                              key={`${dailySummaries[currentDayIndex].date}-${emotion}`}
                              className="px-3 py-1 rounded text-[10px] uppercase tracking-widest border font-bold"
                              style={{
                                borderColor: `${emotionColors[emotion] || '#fff'}40`,
                                color: emotionColors[emotion] || '#fff',
                                backgroundColor: `${emotionColors[emotion] || '#fff'}10`
                              }}
                            >
                              {emotion}
                            </span>
                          ))}
                        </div>

                        {/* Day insight summary */}
                        <div className="mt-4 pt-3 border-t border-white/[0.06]">
                          <p className="text-white/60 text-xs leading-relaxed text-center">
                            {dailySummaries[currentDayIndex].insightOfTheDay}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : activeTab === "others" && hudVisible ? (
                <motion.div
                  key="others"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-2xl mx-auto"
                >
                  {/* Navigation controls */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={prevPerson}
                      className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors"
                      aria-label="Previous person"
                    >
                      <ChevronLeft size={18} className="text-white/70" />
                    </button>
                    
                    <h3 className="text-white/60 text-xs tracking-widest uppercase flex items-center gap-2">
                      <Users size={14} className="text-purple-400" />
                      PERSON {currentPersonIndex + 1} / {relationshipTrends.length}
                    </h3>

                    <button
                      onClick={nextPerson}
                      className="p-2 rounded-lg bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-colors"
                      aria-label="Next person"
                    >
                      <ChevronRight size={18} className="text-white/70" />
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {(() => {
                      const trend = relationshipTrends[currentPersonIndex];
                      const person = getProfile(trend.personId);
                      if (!person) return null;

                      const isExpanded = expandedProfiles.has(trend.personId);

                      return (
                        <motion.div
                          key={trend.personId}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white/[0.04] border border-white/10 rounded-xl p-6 backdrop-blur-xl hover:bg-white/[0.08] transition-all duration-300 group relative overflow-hidden"
                        >
                          {/* Glow effect based on trend */}
                          <div
                            className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                            style={{
                              backgroundColor: trend.overallTrend === 'improving' ? '#10b98140' :
                                              trend.overallTrend === 'declining' ? '#ef444440' :
                                              trend.overallTrend === 'volatile' ? '#f59e0b40' : '#6b728040'
                            }}
                          />

                          {/* Header with avatar and trend */}
                          <div className="flex items-start justify-between mb-5 relative z-10">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                {person.avatarUrl ? (
                                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/20">
                                    <ImageWithFallback
                                      src={person.avatarUrl}
                                      alt={person.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="w-16 h-16 rounded-lg flex items-center justify-center text-xl font-bold border-2 border-white/20"
                                    style={{ backgroundColor: person.avatarColor, color: '#fff' }}
                                  >
                                    {person.initials}
                                  </div>
                                )}
                                {/* Trend indicator */}
                                <div
                                  className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-md flex items-center justify-center border-2 border-black/50"
                                  style={{
                                    backgroundColor: trend.overallTrend === 'improving' ? '#10b981' :
                                                    trend.overallTrend === 'declining' ? '#ef4444' :
                                                    trend.overallTrend === 'volatile' ? '#f59e0b' : '#6b7280'
                                  }}
                                >
                                  {trend.overallTrend === 'improving' && <TrendingUp size={12} className="text-white" />}
                                  {trend.overallTrend === 'declining' && <TrendingDown size={12} className="text-white" />}
                                  {trend.overallTrend === 'volatile' && <Activity size={12} className="text-white" />}
                                  {trend.overallTrend === 'stable' && <Minus size={12} className="text-white" />}
                                </div>
                              </div>

                              <div>
                                <h3 className="text-lg font-bold text-white uppercase tracking-wide">{person.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-white/60 text-xs uppercase tracking-wider">{person.relationshipType}</span>
                                  <span className="text-white/30 text-xs">•</span>
                                  <span className="text-white/60 text-xs uppercase tracking-wider">{trend.overallTrend}</span>
                                </div>
                              </div>
                            </div>

                            {/* Sparkline - larger */}
                            <div className="w-32 h-16">
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

                          {/* Summary text - larger */}
                          <div className="mb-5 bg-white/[0.02] rounded-lg p-4 border border-white/[0.05] relative z-10">
                            <p className={`text-white/80 text-sm leading-relaxed transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"}`}>
                              {trend.weekSummary}
                            </p>
                            <button
                              onClick={() => toggleProfile(trend.personId)}
                              className="text-cyan-400/80 hover:text-cyan-300 uppercase tracking-widest transition-colors text-[10px] mt-3"
                            >
                              {isExpanded ? "[ COLLAPSE ]" : "[ EXPAND ]"}
                            </button>
                          </div>

                          {/* Emotion distribution bar - taller */}
                          <div className="relative z-10">
                            <h4 className="text-white/50 text-[11px] uppercase tracking-widest mb-3">INTERACTION STATES</h4>
                            <div className="flex h-3 w-full rounded-full overflow-hidden gap-1">
                              {trend.weeklyData.map((d) => (
                                <div
                                  key={`bar-${trend.personId}-${d.day}`}
                                  className="h-full flex-1 transition-all duration-300 hover:scale-y-125"
                                  style={{ backgroundColor: emotionColors[d.dominantEmotion] || '#4b5563' }}
                                  title={`Day ${d.day}: ${d.dominantEmotion}`}
                                />
                              ))}
                            </div>
                            <div className="flex justify-between mt-2">
                              <span className="text-white/40 text-[10px]">DAY 1</span>
                              <span className="text-white/40 text-[10px]">DAY 7</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })()}
                  </AnimatePresence>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom edge indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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