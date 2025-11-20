"use client";

import { motion } from "framer-motion";

export function AuthVisual() {
  return (
    <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      {/* Abstract Visual */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="text-[12rem] font-black text-white tracking-tighter leading-none select-none opacity-90 mix-blend-difference">
            FLOWPRINT
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="h-2 bg-white mt-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 text-xl text-neutral-400 font-mono tracking-widest text-right"
          >
            THE ARCHITECTURE OF FOCUS
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[1, 2, 3].map((id) => (
          <motion.div
            key={id}
            className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
            }}
            animate={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
