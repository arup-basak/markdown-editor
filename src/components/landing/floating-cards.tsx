"use client";

import { motion } from "framer-motion";
import { FileText, Zap, Shield } from "lucide-react";

const cards = [
  {
    icon: FileText,
    title: "Pure Markdown",
    description: "Standard compliant."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Zero latency typing."
  },
  {
    icon: Shield,
    title: "Local First",
    description: "Your data is yours."
  }
];

export function FloatingCards() {
  return (
    <div className="w-full max-w-7xl mx-auto px-8 pb-8 flex justify-center lg:justify-start gap-6 overflow-hidden">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 1 + (index * 0.1),
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ y: -10 }}
          className="bg-background/80 backdrop-blur-sm border border-border p-4 rounded-lg shadow-lg w-48 pointer-events-auto cursor-default"
        >
          <card.icon className="w-6 h-6 text-primary mb-2" />
          <h3 className="font-semibold text-sm">{card.title}</h3>
          <p className="text-xs text-muted-foreground">{card.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
