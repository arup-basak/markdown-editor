"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "highlighted";
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "default",
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("h-full", className)}
    >
      <Card
        className={cn(
          "h-full relative overflow-hidden border transition-all duration-500 group",
          variant === "highlighted"
            ? "border-primary/50 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-xl shadow-primary/10"
            : "border-border/50 bg-card/50 backdrop-blur-md hover:border-primary/40 hover:bg-card/80",
          "hover:shadow-2xl hover:shadow-primary/20"
        )}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: variant === "highlighted"
              ? "radial-gradient(circle at 50% 0%, hsl(var(--primary))/15, transparent 70%)"
              : "radial-gradient(circle at 50% 0%, hsl(var(--primary))/10, transparent 70%)",
          }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(110deg, transparent 40%, hsl(var(--primary))/20 50%, transparent 60%)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
          style={{
            background: variant === "highlighted"
              ? "linear-gradient(135deg, hsl(var(--primary))/30, hsl(var(--accent))/30)"
              : "linear-gradient(135deg, hsl(var(--primary))/20, hsl(var(--accent))/20)",
          }}
        />

        <CardHeader className="relative z-10">
          <motion.div
            className={cn(
              "inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 relative",
              variant === "highlighted"
                ? "bg-gradient-to-br from-primary/30 to-primary/10 shadow-lg shadow-primary/20"
                : "bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10"
            )}
            whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-7 h-7 text-primary relative z-10" />
            <motion.div
              className="absolute inset-0 rounded-2xl bg-primary/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <CardTitle className="text-2xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground/90 transition-colors">
            {description}
          </CardDescription>
        </CardContent>

        {/* Animated bottom border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  );
}

