import { motion } from "motion/react";

interface ContextPanelProps {
  personName: string;
  relationshipType: string;
  lastInteraction: string;
  interactionCount: number;
  tags?: string[];
}

export function ContextPanel({
  personName,
  relationshipType,
  lastInteraction,
  interactionCount,
  tags = [],
}: ContextPanelProps) {
  return (
    null
  );
}
