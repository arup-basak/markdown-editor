"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/top-bar";
import Editor from "@/components/editor";
import Preview from "@/components/preview";
import { useStore } from "@/state/store";
import PageStyles from "@/components/page-styles";
import { motion } from "framer-motion";

export default function Home() {
  const [currentHtml, setCurrentHtml] = useState("");
  const { ui } = useStore();
  return (
    <div
      data-theme={ui.theme}
      className={`flex h-screen w-screen bg-background text-foreground ${ui.theme === "dark" ? "dark" : ""}`}
    >
      <PageStyles />
      <Sidebar />
      <div className="flex h-screen flex-1 flex-col">
        <TopBar currentHtml={currentHtml} />
        <div className="grid h-full grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="border-r border-border"
          >
            <Editor />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Preview onHtml={setCurrentHtml} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
