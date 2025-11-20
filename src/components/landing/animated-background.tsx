"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface AnimatedBackgroundProps {
  variant?: "grid" | "blobs" | "mesh";
  className?: string;
}

export function AnimatedBackground({
  variant = "blobs",
  className = "",
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  if (variant === "grid") {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>
    );
  }

  if (variant === "blobs") {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden ${className}`}
      >
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.1 - 200,
            y: mousePosition.y * 0.1 - 200,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.1 + 200,
            y: mousePosition.y * -0.1 + 200,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.05,
            y: mousePosition.y * 0.05,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>
    );
  }

  if (variant === "mesh") {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(at 40% 20%, hsl(var(--primary)) 0px, transparent 50%),
                              radial-gradient(at 80% 0%, hsl(var(--accent)) 0px, transparent 50%),
                              radial-gradient(at 0% 50%, hsl(var(--primary)) 0px, transparent 50%),
                              radial-gradient(at 80% 50%, hsl(var(--accent)) 0px, transparent 50%),
                              radial-gradient(at 0% 100%, hsl(var(--primary)) 0px, transparent 50%),
                              radial-gradient(at 80% 100%, hsl(var(--accent)) 0px, transparent 50%),
                              radial-gradient(at 0% 0%, hsl(var(--primary)) 0px, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: [
              "0% 0%",
              "100% 100%",
              "0% 0%",
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return null;
}

