"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  return (
    <div className="py-32 bg-muted/5">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          {/* The Spark (Free) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 bg-background p-12 lg:p-16 border border-border/50 lg:border-r-0 lg:rounded-l-2xl rounded-2xl lg:rounded-r-none"
          >
            <h3 className="text-2xl font-bold mb-2">The Spark</h3>
            <div className="text-4xl font-bold mb-8">$0</div>
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Local storage only</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Basic markdown syntax</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Export to PDF</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full h-12 text-lg">
              Start Free
            </Button>
          </motion.div>

          {/* The Fire (Pro) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 bg-foreground text-background p-12 lg:p-16 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
              Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">The Fire</h3>
            <div className="text-4xl font-bold mb-8">$12<span className="text-lg font-normal opacity-70">/mo</span></div>
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Cloud Sync</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Advanced Themes</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>Collaboration</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>AI Assistant</span>
              </li>
            </ul>
            <Button className="w-full h-12 text-lg bg-background text-foreground hover:bg-background/90">
              Go Pro
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
