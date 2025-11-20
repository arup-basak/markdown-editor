"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureSplitProps {
  title: string;
  description: string;
  visual: ReactNode;
  align?: "left" | "right";
  index: number;
}

export function FeatureSplit({ title, description, visual, align = "left", index }: FeatureSplitProps) {
  return (
    <div className="min-h-[80vh] flex flex-col lg:flex-row overflow-hidden">
      {/* Text Side */}
      <motion.div 
        initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-20%" }}
        className={cn(
          "w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 bg-background z-10",
          align === "right" ? "lg:order-2" : "lg:order-1"
        )}
      >
        <div className="max-w-md space-y-6">
          <div className="text-sm font-mono text-primary mb-4">0{index + 1}</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>

      {/* Visual Side */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, margin: "-20%" }}
        className={cn(
          "w-full lg:w-1/2 min-h-[50vh] lg:min-h-[80vh] bg-muted/5 flex items-center justify-center overflow-hidden relative",
          align === "right" ? "lg:order-1" : "lg:order-2"
        )}
      >
        {visual}
      </motion.div>
    </div>
  );
}
