"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Zap, Target, Shield, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for performance with instant rendering and smooth editing, even with large documents. No lag, no waiting.",
    gradient: "from-yellow-500/20 to-orange-500/20",
    iconGradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Focus on Writing",
    description: "Distraction-free interface that helps you focus on what matters most - your content. No clutter, just writing.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconGradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your documents are yours. We prioritize security and privacy, ensuring your content stays safe and accessible only to you.",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconGradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Rocket,
    title: "Professional Output",
    description: "Export to professional formats with beautiful styling. Perfect for sharing, printing, or archiving your work.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconGradient: "from-purple-500 to-pink-500",
  },
];

export function BenefitSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Why Choose Our Editor?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with care to provide the best writing experience possible
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full relative overflow-hidden border-2 group bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute -inset-1 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}
                  />

                  <CardContent className="relative z-10 p-8">
                    <div className="flex gap-6 items-start">
                      <motion.div
                        className="flex-shrink-0 relative"
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow relative`}>
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.iconGradient} opacity-30 group-hover:opacity-40 transition-opacity`} />
                          <Icon className="w-10 h-10 text-primary relative z-10" />
                        </div>
                        <motion.div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.iconGradient} opacity-30`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                      
                      <div className="flex-1 pt-1">
                        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                          {benefit.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">
                          {benefit.description}
                        </p>
                      </div>
                    </div>

                    {/* Animated border */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.iconGradient}`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

