"use client";

import { motion } from "framer-motion";

export function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      {/* Background Hue */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/20" />
      
      {/* Floating Laptop */}
      <motion.div
        initial={{ opacity: 0, rotateX: 20, y: 100 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.4
        }}
        className="relative w-[80%] aspect-video bg-background rounded-xl shadow-2xl border border-border/50 overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Screen Content */}
        <div className="absolute inset-0 bg-background flex flex-col">
          {/* Window Header */}
          <div className="h-8 bg-muted/50 border-b flex items-center px-4 space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          {/* Editor Area */}
          <div className="flex-1 p-6 font-mono text-sm text-muted-foreground">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <span className="text-primary"># The Architecture of Thought</span>
              <br /><br />
              Writing is not just about words; it's about structure. 
              <br />
              Clean lines. Clear thoughts.
              <br /><br />
              <span className="text-blue-400">## The Void</span>
              <br />
              Where ideas take shape...
            </motion.div>
          </div>
        </div>
        
        {/* Reflection/Sheen */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent pointer-events-none" />
      </motion.div>

      {/* Floating Elements behind */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute -z-10 top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
      />
    </div>
  );
}
