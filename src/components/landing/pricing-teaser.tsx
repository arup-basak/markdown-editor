"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Sparkles, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["Unlimited documents", "Live preview", "Basic themes", "PDF export"],
    cta: "Get Started",
    popular: false,
    gradient: "from-gray-500/10 to-gray-600/10",
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For professionals",
    features: [
      "Everything in Free",
      "Advanced themes",
      "Export to DOCX",
      "Priority support",
      "Version history",
    ],
    cta: "Start Free Trial",
    popular: true,
    gradient: "from-primary/20 to-accent/20",
  },
];

export function PricingTeaser() {
  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(at 50% 50%, hsl(var(--primary))/10 0px, transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Pricing</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Start free and upgrade when you need more
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="relative"
            >
              <Card
                className={`h-full flex flex-col relative overflow-hidden border-2 transition-all duration-500 group ${
                  plan.popular
                    ? "border-primary bg-gradient-to-br from-card via-card/95 to-card shadow-2xl shadow-primary/20"
                    : "border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 hover:bg-card/80"
                }`}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Glow effect for popular plan */}
                {plan.popular && (
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 blur-xl opacity-50"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-center py-2.5 text-sm font-bold rounded-t-lg relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Most Popular
                    </span>
                  </motion.div>
                )}

                <CardHeader className="relative z-10">
                  <CardTitle className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <motion.span
                      className="text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {plan.price}
                    </motion.span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-2 text-lg">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 relative z-10">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: featureIndex * 0.05 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        </motion.div>
                        <span className="text-base leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="relative z-10">
                  <Button
                    asChild
                    className={`w-full group text-lg py-6 relative overflow-hidden ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    <Link href={plan.name === "Free" ? "/signup" : "/pricing"} className="relative z-10 flex items-center">
                      <span>{plan.cta}</span>
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      {plan.popular && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </Button>
                </CardFooter>

                {/* Corner accent */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button asChild variant="link" className="text-lg text-muted-foreground hover:text-primary">
            <Link href="/pricing" className="group flex items-center">
              <span>View all pricing plans</span>
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

