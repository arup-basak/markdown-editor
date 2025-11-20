"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TypographySection() {
  return (
    <div className="max-w-xl w-full space-y-12">
      <div className="space-y-6">
        {/* Headline: The Loud Hook */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]"
        >
          Write with
          <br />
          <span className="text-primary">Absolute Focus.</span>
        </motion.h1>

        {/* Subtext: The Quiet Whisper */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl text-muted-foreground max-w-md leading-relaxed"
        >
          A markdown editor designed for clarity. No distractions, just you and your words. 
          Experience the perfect balance of power and simplicity.
        </motion.p>
      </div>

      {/* Button: The Singular Sun */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Button size="lg" className="h-14 px-8 text-lg rounded-full group">
          Start Writing
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
}
