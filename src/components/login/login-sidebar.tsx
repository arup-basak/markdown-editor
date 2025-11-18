"use client";

import React from "react";
import { useDarkMode } from "@/hooks/use-theme";

const LoginSidebar = () => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className="lg:w-1/2 p-4 lg:flex hidden bg-background">
      <div className={`bg-gradient-to-br ${
        isDarkMode 
          ? "from-primary/30 to-primary/20" 
          : "from-primary/10 to-primary/5"
      } rounded-xl p-12 flex flex-col justify-between border border-border/50 w-full transition-colors duration-200`}>
        <div>
          <h1 className="text-4xl font-bold mb-2 text-foreground">Markdown Editor</h1>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold leading-tight text-foreground">
            Write, Preview & Export
            <br />
            Your Markdown Content
          </h2>
          <p className="text-lg text-muted-foreground">
            Welcome back! Log in to continue working on your documents and
            access all your saved content.
          </p>

          {/* Feature Steps */}
          <div className="grid gap-6 mt-12">
            <div className={`${
              isDarkMode 
                ? "bg-card/50 backdrop-blur-sm border border-border/50" 
                : "bg-card/80 backdrop-blur-sm border border-border/30"
            } rounded-xl p-6 duration-200`}>
              <div className="text-2xl font-bold mb-2 text-primary">1</div>
              <div className="font-semibold mb-1 text-foreground">Sign in to your account</div>
            </div>
            <div className={`${
              isDarkMode 
                ? "bg-card/50 backdrop-blur-sm border border-border/50" 
                : "bg-card/80 backdrop-blur-sm border border-border/30"
            } rounded-xl p-6 duration-200`}>
              <div className="text-2xl font-bold mb-2 text-primary">2</div>
              <div className="font-semibold mb-1 text-foreground">
                Access your workspace and documents
              </div>
            </div>
            <div className={`${
              isDarkMode 
                ? "bg-card/50 backdrop-blur-sm border border-border/50" 
                : "bg-card/80 backdrop-blur-sm border border-border/30"
            } rounded-xl p-6 duration-200`}>
              <div className="text-2xl font-bold mb-2 text-primary">3</div>
              <div className="font-semibold mb-1 text-foreground">
                Continue creating amazing content
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSidebar;
