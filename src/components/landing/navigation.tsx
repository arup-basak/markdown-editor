"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navigation() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto"
    >
      <Link href="/" className="group">
        <span className="text-xl font-bold tracking-tighter group-hover:text-primary transition-colors">
          Flowprint
        </span>
      </Link>
      
      <div className="flex items-center space-x-8 text-sm font-medium text-muted-foreground">
        <Link href="/about" className="hover:text-foreground transition-colors">
          Manifesto
        </Link>
        <Link href="/pricing" className="hover:text-foreground transition-colors">
          Pricing
        </Link>
        <Link href="/login" className="hover:text-foreground transition-colors">
          Sign In
        </Link>
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
