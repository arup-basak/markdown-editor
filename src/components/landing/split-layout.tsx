"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SplitLayoutProps {
  left: ReactNode;
  right: ReactNode;
  nav: ReactNode;
  footer: ReactNode;
}

export function SplitLayout({ left, right, nav, footer }: SplitLayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* The Lintel (Navigation) */}
      <div className="absolute top-0 left-0 right-0 z-50">
        {nav}
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* The West (Logic/Typography) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative flex items-center justify-center p-8 lg:p-20 bg-background z-10"
        >
          {left}
        </motion.div>

        {/* The Great Divide (Invisible Line) */}
        
        {/* The East (Dream/Visual) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-screen bg-muted/10 flex items-center justify-center overflow-hidden"
        >
          {right}
        </motion.div>
      </div>

      {/* The Foundation (Floating Cards) */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none">
        {footer}
      </div>
    </div>
  );
}
