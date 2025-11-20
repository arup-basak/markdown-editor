"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "It's not just an editor. It's a sanctuary for thought.",
    author: "Sarah J., Novelist"
  },
  {
    quote: "Finally, software that respects my attention span.",
    author: "Mark T., Developer"
  },
  {
    quote: "The split view changed how I structure my arguments.",
    author: "Elena R., Essayist"
  },
  {
    quote: "Minimalism done right. Nothing more, nothing less.",
    author: "David K., Designer"
  }
];

export function TestimonialGrid() {
  return (
    <div className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-16 tracking-tight"
        >
          The Chorus
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border-l-2 border-primary/20 pl-6 py-2"
            >
              <p className="text-2xl font-medium leading-relaxed mb-4">
                "{t.quote}"
              </p>
              <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">
                — {t.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
