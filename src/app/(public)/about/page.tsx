"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { Code, Zap, Shield, Heart, Users, Sparkles } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/footer";

const features = [
  {
    icon: Code,
    title: "Powerful Markdown Editor",
    description: "Write and edit markdown with a clean, distraction-free interface. Real-time preview helps you see your content as you write.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for performance. Experience instant rendering and smooth editing, even with large documents.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your documents are yours. We prioritize security and privacy, ensuring your content stays safe.",
  },
  {
    icon: Sparkles,
    title: "Beautiful Themes",
    description: "Customize your writing experience with multiple themes and styling options to match your preferences.",
  },
  {
    icon: Heart,
    title: "Built with Care",
    description: "Crafted with attention to detail and a passion for creating the best writing experience possible.",
  },
  {
    icon: Users,
    title: "For Everyone",
    description: "Whether you're a writer, developer, or student, our editor adapts to your workflow and needs.",
  },
];

const team = [
  {
    name: "Our Mission",
    role: "Empowering Creativity",
    description: "We believe everyone deserves great tools for writing and documenting. Our mission is to make markdown editing accessible, powerful, and enjoyable for everyone.",
  },
  {
    name: "Our Vision",
    role: "The Future of Writing",
    description: "We envision a world where writing tools are intuitive, fast, and beautiful. We're building the editor that sets the standard for modern markdown editing.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navigation />
      <div className="max-w-7xl mx-auto space-y-16 px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern markdown editor built for writers, developers, and creators who value simplicity and power.
          </p>
        </motion.div>

        {/* Main Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Story</CardTitle>
              <CardDescription>
                Building the editor we always wanted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We started this project because we were frustrated with existing markdown editors. 
                They were either too complex, too slow, or lacked the features we needed. So we decided 
                to build our own.
              </p>
              <p>
                Our goal was simple: create a markdown editor that's fast, beautiful, and intuitive. 
                One that works seamlessly across devices and provides all the features you need without 
                getting in your way.
              </p>
              <p>
                Today, we're proud to offer a tool that combines powerful functionality with an elegant 
                user experience. We're constantly improving and adding new features based on feedback 
                from our community.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-center">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center space-y-4"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-2">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of users who are already creating amazing content with our editor.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  View Pricing
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Sign Up Free
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

