"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Code2, Palette } from "lucide-react";
import { AnimatedBackground } from "./animated-background";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground variant="blobs" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000;
          const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1000;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x: randomX,
                y: randomY,
              }}
              animate={{
                y: [null, typeof window !== 'undefined' ? Math.random() * window.innerHeight : randomY + 200],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          );
        })}
      </div>

      {/* Gradient spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary))/20, transparent 40%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 backdrop-blur-md mb-8 shadow-lg shadow-primary/10"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Now with AI-Powered Features
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight"
          >
            <span className="block mb-2">
              <span 
                className="bg-gradient-to-r from-foreground via-primary via-60% to-foreground bg-clip-text text-transparent"
                style={{
                  backgroundSize: "200% auto",
                  animation: "shimmer 3s linear infinite",
                }}
              >
                Write Beautiful
              </span>
            </span>
            <span className="block">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Markdown
              </span>
              <span className="text-foreground"> Instantly</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          >
            The <span className="font-semibold text-foreground">modern markdown editor</span> that transforms your writing experience.
            <br />
            <span className="text-lg md:text-xl">Real-time preview • Beautiful themes • Powerful exports</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl shadow-primary/25 border-0"
              >
                <Link href="/signup" className="relative z-10 flex items-center">
                  <span>Get Started Free</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group text-lg px-8 py-6 border-2 bg-background/50 backdrop-blur-sm hover:bg-accent/10 hover:border-primary/50 transition-all"
              >
                <Link href="/pricing">
                  View Pricing
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {[
              { icon: Zap, text: "Lightning Fast" },
              { icon: Code2, text: "Live Preview" },
              { icon: Palette, text: "Beautiful Themes" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-md border border-border/50 shadow-sm"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Modern preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-8"
        >
          <div className="relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl p-1 shadow-2xl shadow-primary/10 overflow-hidden">
            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-50"
              style={{
                background: "linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <div className="relative rounded-xl bg-background/90 backdrop-blur-sm p-8 md:p-12">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-border via-border/50 to-transparent ml-4" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="h-3 w-3/4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full" />
                  <div className="h-3 w-full bg-gradient-to-r from-muted to-muted/50 rounded-full" />
                  <div className="h-3 w-5/6 bg-gradient-to-r from-primary/10 to-transparent rounded-full" />
                  <div className="h-3 w-4/5 bg-gradient-to-r from-muted/80 to-muted/40 rounded-full mt-4" />
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-full bg-gradient-to-r from-muted to-muted/50 rounded-full" />
                  <div className="h-3 w-4/5 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full" />
                  <div className="h-3 w-3/4 bg-gradient-to-r from-muted/60 to-muted/30 rounded-full" />
                  <div className="h-3 w-5/6 bg-gradient-to-r from-primary/10 to-transparent rounded-full mt-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

