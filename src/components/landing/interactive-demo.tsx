"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Code, Eye, Palette, Sparkles } from "lucide-react";

const sampleMarkdown = `# Welcome to Markdown Editor

Write your content here with **bold** and *italic* text.

## Features

- Live preview
- Export to PDF/DOCX
- Beautiful themes
- Auto-save

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> Great things happen when you focus on writing.`;

const themes = [
  { name: "Light", value: "light", bg: "bg-white", text: "text-gray-900", accent: "from-blue-500/10 to-purple-500/10" },
  { name: "Dark", value: "dark", bg: "bg-gray-900", text: "text-white", accent: "from-blue-500/20 to-purple-500/20" },
  { name: "Sepia", value: "sepia", bg: "bg-amber-50", text: "text-amber-900", accent: "from-amber-500/10 to-orange-500/10" },
];

export function InteractiveDemo() {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    setIsTyping(true);
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < sampleMarkdown.length) {
        setTypedText(sampleMarkdown.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [isInView]);

  return (
    <section ref={ref} className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(at 40% 20%, hsl(var(--primary))/10 0px, transparent 50%),
                            radial-gradient(at 80% 0%, hsl(var(--accent))/10 0px, transparent 50%)`,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
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
            <span className="text-sm font-semibold text-primary">Interactive Demo</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            See It In Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the power of live preview and real-time editing in action
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {themes.map((theme, index) => (
            <motion.button
              key={theme.value}
              onClick={() => setSelectedTheme(index)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-5 py-2.5 rounded-xl border-2 transition-all backdrop-blur-sm ${
                selectedTheme === index
                  ? "border-primary bg-primary/20 shadow-lg shadow-primary/20"
                  : "border-border/50 bg-card/50 hover:border-primary/50 hover:bg-card/80"
              }`}
            >
              <div className="flex items-center gap-2 relative z-10">
                <Palette className={`w-4 h-4 ${selectedTheme === index ? "text-primary" : ""}`} />
                <span className={`font-medium ${selectedTheme === index ? "text-primary" : ""}`}>
                  {theme.name}
                </span>
              </div>
              {selectedTheme === index && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20"
                  layoutId="activeTheme"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-border/50 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/10">
            {/* Animated border glow */}
            <motion.div
              className="absolute -inset-0.5 rounded-2xl opacity-50"
              style={{
                background: `linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))`,
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className={`relative ${themes[selectedTheme].bg} ${themes[selectedTheme].text} transition-colors duration-500`}>
              {/* Window chrome */}
              <div className="flex items-center gap-2 p-4 border-b border-border/30 bg-black/5 backdrop-blur-sm">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
                </div>
                <div className="flex-1 flex items-center gap-3 px-4">
                  <Code className="w-4 h-4 opacity-60" />
                  <span className="text-sm font-medium opacity-70">editor.md</span>
                  <motion.div
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 border border-primary/20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs text-primary font-medium ml-1">Live</span>
                  </motion.div>
                </div>
                <Eye className="w-4 h-4 opacity-60" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/30">
                {/* Editor side */}
                <div className="relative p-8 bg-gradient-to-br from-background/50 to-background/30">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                  <div className="font-mono text-sm leading-relaxed">
                    <pre className="whitespace-pre-wrap text-foreground/90">
                      {typedText}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="inline-block w-2 h-4 bg-primary ml-1 rounded-sm"
                        />
                      )}
                    </pre>
                  </div>
                </div>
                
                {/* Preview side */}
                <div className="relative p-8 bg-gradient-to-br from-background/30 to-background/50">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                  <div className="prose prose-sm max-w-none">
                    <div className="text-sm leading-relaxed">
                      {typedText.split("\n").map((line, i) => {
                        if (line.startsWith("# ")) {
                          return <h1 key={i} className="text-2xl font-bold mb-3 text-foreground">{line.slice(2)}</h1>;
                        }
                        if (line.startsWith("## ")) {
                          return <h2 key={i} className="text-xl font-bold mb-2 mt-4 text-foreground">{line.slice(3)}</h2>;
                        }
                        if (line.startsWith("- ")) {
                          return <li key={i} className="ml-4 mb-1 text-foreground/90">{line.slice(2)}</li>;
                        }
                        if (line.startsWith("> ")) {
                          return <blockquote key={i} className="border-l-4 border-primary/30 pl-4 italic my-2 text-foreground/80">{line.slice(2)}</blockquote>;
                        }
                        if (line.startsWith("```")) {
                          return null;
                        }
                        if (line.trim() === "") {
                          return <br key={i} />;
                        }
                        return <p key={i} className="text-foreground/90 mb-2">{line}</p>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

