import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { PersonProfile } from "../../data";

interface FaceDisplayProps {
  person: PersonProfile;
}

export function FaceDisplay({ person }: FaceDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="relative">
        {/* Face container with subtle glow */}
        <div className="relative">
          {/* Outer glow ring */}
          <div
            className="absolute -inset-4 rounded-full opacity-30 blur-xl"
            style={{ backgroundColor: person.avatarColor }}
          />

          {/* Face image with circular mask */}
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/10 bg-zinc-900">
            {person.avatarUrl ? (
              <ImageWithFallback
                src={person.avatarUrl}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-4xl text-white"
                style={{ backgroundColor: person.avatarColor }}
              >
                {person.initials}
              </div>
            )}
          </div>

          {/* Subtle scan line animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            }}
            animate={{
              y: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Name label below */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <div className="text-white/80 text-sm tracking-[0.15em] uppercase mb-1">
            {person.name}
          </div>
          <div className="text-white/30 text-[10px] tracking-wider uppercase">
            {person.relationshipType.replace("_", " ")}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
