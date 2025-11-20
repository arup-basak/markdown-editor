"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Rocket, Users, Zap } from "lucide-react";

export function CTASection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary))/20 0%, hsl(var(--accent))/10 50%, hsl(var(--primary))/20 100%)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary))/30, transparent 50%)`,
        }}
      />

      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full blur-3xl opacity-20"
          style={{
            background: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))",
            left: `${(i * 20) % 100}%`,
            top: `${(i * 15) % 100}%`,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 backdrop-blur-md shadow-lg shadow-primary/10"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="text-base font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Ready to Get Started?
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
            <span className="block mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Start Writing Beautiful
            </span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Markdown Today
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join <span className="font-semibold text-foreground">thousands</span> of writers, developers, and creators who trust our editor
            for their markdown needs. <span className="font-semibold text-primary">Free forever</span>, upgrade anytime.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { icon: Users, value: "10K+", label: "Active Users" },
              { icon: Zap, value: "99.9%", label: "Uptime" },
              { icon: Rocket, value: "1M+", label: "Documents Created" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -4 }}
                className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl bg-card/50 backdrop-blur-md border border-border/50 shadow-sm"
              >
                <stat.icon className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden text-lg px-10 py-7 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-2xl shadow-primary/30 border-0"
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
                className="text-lg px-10 py-7 border-2 bg-background/50 backdrop-blur-sm hover:bg-accent/10 hover:border-primary/50 transition-all"
              >
                <Link href="/pricing" className="flex items-center">
                  View Pricing
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

