"use client";

import { SplitLayout } from "@/components/landing/split-layout";
import { TypographySection } from "@/components/landing/typography-section";
import { HeroVisual } from "@/components/landing/hero-visual";
import { Navigation } from "@/components/landing/navigation";
import { FloatingCards } from "@/components/landing/floating-cards";
import { FeatureSplit } from "@/components/landing/feature-split";
import { TestimonialGrid } from "@/components/landing/testimonial-grid";
import { PricingSection } from "@/components/landing/pricing-section";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* Hero Section (The Split) */}
      <SplitLayout 
        nav={<Navigation />}
        left={<TypographySection />}
        right={<HeroVisual />}
        footer={<FloatingCards />}
      />

      {/* The Deep Dive (Features) */}
      <section id="features">
        <FeatureSplit 
          index={0}
          align="left"
          title="Focus Mode"
          description="Distraction-free writing. When you type, the interface fades away. It's just you and your thoughts, unburdened by the noise of the world."
          visual={
            <div className="w-3/4 aspect-square bg-background border border-border rounded-lg shadow-xl p-8 flex items-center justify-center">
              <div className="space-y-4 w-full opacity-50">
                <div className="h-4 w-3/4 bg-foreground/10 rounded" />
                <div className="h-4 w-full bg-foreground/10 rounded" />
                <div className="h-4 w-5/6 bg-foreground/10 rounded" />
                <div className="h-4 w-full bg-foreground/10 rounded" />
              </div>
            </div>
          }
        />
        <FeatureSplit 
          index={1}
          align="right"
          title="Cloud Sync"
          description="Everywhere, instantly. Start on your laptop, finish on your tablet. Your words flow seamlessly across devices, anchored in the cloud."
          visual={
            <div className="relative w-3/4 aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
              <div className="relative z-10 w-32 h-32 bg-background border border-border rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 animate-pulse" />
              </div>
            </div>
          }
        />
        <FeatureSplit 
          index={2}
          align="left"
          title="Universal Export"
          description="Your words, your format. Export to PDF, HTML, or copy as rich text. Your content is never locked in; it's ready to travel."
          visual={
            <div className="w-3/4 aspect-square grid grid-cols-2 gap-4 p-8">
              <div className="bg-background border border-border rounded-lg shadow-sm hover:-translate-y-2 transition-transform duration-300 flex items-center justify-center text-xs font-mono">.PDF</div>
              <div className="bg-background border border-border rounded-lg shadow-sm hover:-translate-y-2 transition-transform duration-300 delay-75 flex items-center justify-center text-xs font-mono">.MD</div>
              <div className="bg-background border border-border rounded-lg shadow-sm hover:-translate-y-2 transition-transform duration-300 delay-150 flex items-center justify-center text-xs font-mono">.HTML</div>
              <div className="bg-background border border-border rounded-lg shadow-sm hover:-translate-y-2 transition-transform duration-300 delay-200 flex items-center justify-center text-xs font-mono">.TXT</div>
            </div>
          }
        />
      </section>

      {/* The Chorus (Testimonials) */}
      <TestimonialGrid />

      {/* The Investment (Pricing) */}
      <PricingSection />
    </div>
  );
}
