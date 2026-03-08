import { motion } from "motion/react";

interface PeripheralGlowProps {
  color: string;
  intensity: number;
}

export function PeripheralGlow({ color, intensity }: PeripheralGlowProps) {
  return (
    <>
      {/* Top edge glow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
        animate={{
          background: `radial-gradient(ellipse at 50% 0%, ${color} 0%, transparent 70%)`,
          opacity: intensity,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Bottom edge glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        animate={{
          background: `radial-gradient(ellipse at 50% 100%, ${color} 0%, transparent 70%)`,
          opacity: intensity * 0.6,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Left edge glow */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-32 pointer-events-none z-10"
        animate={{
          background: `radial-gradient(ellipse at 0% 50%, ${color} 0%, transparent 70%)`,
          opacity: intensity * 0.8,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Right edge glow */}
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-32 pointer-events-none z-10"
        animate={{
          background: `radial-gradient(ellipse at 100% 50%, ${color} 0%, transparent 70%)`,
          opacity: intensity * 0.8,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </>
  );
}
