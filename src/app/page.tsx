"use client"
import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import { Navbar } from "./components/Navbar";
import PatternSelector from "./components/PattenSelector";
import { PatternComponents } from "./components/PatternComponents"; 
import { patterns } from "./utils/patterns";
import { useTheme } from "next-themes";

interface Pattern {
  id: string;
  name: string;
  category: "Geometrics" | "Gradients" | "Effects" | "Floatings" | "Dots";
  style: React.CSSProperties;
  component: React.FC; 
  code: string;
}


export default function Home() {
  const [activePattern, setActivePattern] = useState<Pattern | null>(null);
  const { theme } = useTheme(); // Get the current theme from next-themes
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load active pattern from localStorage on initial render (only in browser)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedId = localStorage.getItem("activePatternId");
      const found = patterns.find((p) => p.id === savedId);
      if (found) {
        setActivePattern(found);
      }
    }
  }, []);

  // Save active pattern to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && activePattern) {
      localStorage.setItem("activePatternId", activePattern.id);
    } else if (typeof window !== 'undefined' && !activePattern) {
      localStorage.removeItem("activePatternId");
    }
  }, [activePattern]);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <main className="relative bg-white dark:bg-black">
      {/* Global Background Element */}
      {activePattern && (
        <div
          className="fixed inset-0 -z-10 transition-all duration-500"
          style={activePattern.style}
        >
          {PatternComponents[activePattern.id] && 
            React.createElement(PatternComponents[activePattern.id])
          }
        </div>
      )}
      
      <Navbar />
      <Hero
        activePattern={activePattern?.id || null}
        setActivePattern={(id) => {
          const pattern = patterns.find(p => p.id === id);
          setActivePattern(pattern || null);
        }}
        theme={theme === "dark" ? "dark" : "light"}
      />
      <PatternSelector 
        activePattern={activePattern}
        setActivePattern={setActivePattern}
      />
    </main>
  )
}