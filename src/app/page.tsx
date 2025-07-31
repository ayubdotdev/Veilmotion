"use client"
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import { Navbar } from "./components/Navbar";
import PatternSelector from "./components/PattenSelector";

interface Pattern {
  id: string;
  name: string;
  category: "Geometrics" | "Gradients" | "Effects" | "Floatings" | "Dots";
  description: string;
  style: React.CSSProperties;
  component: React.FC; 
  code: string;
}


export default function Home() {
  const [activePattern, setActivePattern] = useState<Pattern | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load active pattern from localStorage on initial render
  useEffect(() => {
    const savedId = localStorage.getItem("activePatternId");
    const found = patterns.find((p) => p.id === savedId);
    if (found) {
      setActivePattern(found);
    }
  }, []);

  // Save active pattern to localStorage whenever it changes
  useEffect(() => {
    if (activePattern) {
      localStorage.setItem("activePatternId", activePattern.id);
    }
  }, [activePattern]);

  // Update the document theme based on the selected pattern's brightness
  useEffect(() => {
    if (activePattern) {
      const background = activePattern.style.background || "";
      const isDark =
        activePattern.id.startsWith("dark-") ||
        (typeof background === "string" &&
          (background.includes("#0") ||
            background.includes("#1") ||
            background.includes("rgba(0,") ||
            background.includes("rgba(1,")));

      setTheme(isDark ? "dark" : "light");
    } else {
      setTheme("light");
    }
  }, [activePattern]);

  // Apply the theme to the root <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <main className="relative bg-white dark:bg-black">
      {/* Global Background Element */}
      {activePattern && (
        <div
          className="fixed inset-0 -z-10 transition-all duration-500"
          style={activePattern.style}
          dangerouslySetInnerHTML={{ __html: activePattern.code }}
        />
      )}
      
      <Navbar />
      <Hero
        activePattern={activePattern?.id || null}
        setActivePattern={(id) => {
          const pattern = patterns.find(p => p.id === id);
          setActivePattern(pattern || null);
        }}
        theme={theme}
      />
      <PatternSelector 
        activePattern={activePattern}
        setActivePattern={setActivePattern}
      />
    </main>
  )
}