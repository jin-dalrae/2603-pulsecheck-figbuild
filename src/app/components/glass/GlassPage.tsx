import { GlassHUD } from "./GlassHUD";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Activity } from "lucide-react";

export function GlassPage() {
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Glass simulator label — minimal top center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute top-5 right-8 z-50 flex items-center gap-4"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/40 animate-pulse" />
          <span className="text-white/10 text-[10px] tracking-[0.3em] uppercase">
            PULSE AR
          </span>
        </div>

        <div className="w-[1px] h-4 bg-white/10" />

        <Link 
          to="/insights" 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-colors text-white/30 hover:text-white/70"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="text-[10px] tracking-wider uppercase">Insights</span>
        </Link>
      </motion.div>

      <GlassHUD />
    </div>
  );
}