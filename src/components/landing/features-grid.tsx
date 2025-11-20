"use client";

import {
  Eye,
  FileDown,
  Palette,
  Type,
  Save,
  FolderTree,
} from "lucide-react";
import { FeatureCard } from "./feature-card";

const features = [
  {
    icon: Eye,
    title: "Live Preview",
    description: "See your markdown rendered in real-time as you type. No more switching between tabs or guessing how your content will look.",
  },
  {
    icon: FileDown,
    title: "Export Options",
    description: "Export your documents to PDF or DOCX formats with professional styling. Perfect for sharing and printing.",
  },
  {
    icon: Palette,
    title: "Beautiful Themes",
    description: "Choose from light, dark, or sepia themes. Customize fonts, page sizes, and orientations to match your preferences.",
  },
  {
    icon: Type,
    title: "Font Customization",
    description: "Switch between system, serif, or monospace fonts. Find the perfect typography for your writing style.",
  },
  {
    icon: Save,
    title: "Auto-Save",
    description: "Never lose your work. Documents are automatically saved as you type, with intelligent debouncing for optimal performance.",
  },
  {
    icon: FolderTree,
    title: "Document Management",
    description: "Organize multiple documents with drag-and-drop reordering, search functionality, and intuitive sidebar navigation.",
  },
];

export function FeaturesGrid() {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Write Beautiful Markdown
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make your writing experience seamless and enjoyable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={index === 0 ? "highlighted" : "default"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

