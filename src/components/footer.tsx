"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "License", href: "/license" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Twitter", href: "https://twitter.com" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Discord", href: "https://discord.com" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-border/40 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/5 opacity-50" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-8">
          {/* Brand Section with CTA */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="block group">
                <span className="text-4xl font-black tracking-tighter bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                  Flowprint
                </span>
              </Link>
              <p className="text-muted-foreground mt-4 leading-relaxed max-w-md">
                The focus-first markdown editor for those who dream in code and write in prose.
                Designed for the architecture of your mind.
              </p>
            </motion.div>

            {/* Newsletter signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/80">
                Stay Updated
              </h3>
              <div className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-muted/50 border border-border/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <button type="button" className="px-6 h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                  Join
                </button>
              </div>
            </motion.div>

            <div className="pt-4 text-sm text-muted-foreground/60 border-t border-border/20">
              © {currentYear} Flowprint. All rights reserved.
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                className="space-y-4"
              >
                <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Big watermark text at bottom */}
        <div className="mt-24 pt-8 border-t border-border/20">
          <div className="flex justify-center items-center select-none overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <span className="text-[clamp(4rem,15vw,12rem)] font-black tracking-tighter leading-none opacity-[0.03] dark:opacity-[0.05] bg-linear-to-r from-foreground via-foreground/50 to-foreground bg-clip-text text-transparent">
                FLOWPRINT
              </span>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-primary/5 to-primary/10 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
