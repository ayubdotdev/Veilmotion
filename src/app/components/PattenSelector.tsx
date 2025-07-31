// components/PatternSelector.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Pattern } from "../types/pattern"; // Assuming this type is defined
import { patterns } from "../utils/patterns"; // Your patterns data
import { cn } from "@/lib/utils";
import { Check, Copy, Eye } from "lucide-react"; // Optional: for icons

// Define the categories for the tabs, adding "All" for a complete view
const categories = [
  "All",
  "Geometrics",
  "Gradients",
  "Effects",
  "Floatings",
  "Dots",
] as const;
type Category = (typeof categories)[number];

interface PatternSelectorProps {
  activePattern: Pattern | null;
  setActivePattern: (pattern: Pattern | null) => void;
}

export const PatternSelector = ({ activePattern, setActivePattern }: PatternSelectorProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [isCopied, setIsCopied] = useState<string | null>(null);

  // Handle copying the pattern's code to the clipboard
  const handleCopyCode = (code: string, patternId: string) => {
    navigator.clipboard.writeText(code);
    setIsCopied(patternId);
    setTimeout(() => setIsCopied(null), 2000); // Reset after 2 seconds
  };

  // Handle preview - this should trigger the pattern to appear on entire site
  const handlePreview = (pattern: Pattern) => {
    setActivePattern(pattern);
    // You might need to trigger additional logic here to apply the pattern site-wide
    // For example, dispatching an event or updating a global state
    window.dispatchEvent(new CustomEvent('patternChanged', {
      detail: { pattern }
    }));
  };

  // Filter patterns based on the selected category tab
  const filteredPatterns =
    activeCategory === "All"
      ? patterns
      : patterns.filter((p) => p.category === activeCategory);

  return (
    <div className="relative">
      <section className="mt-10 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white text-center">
          Choose Your Background
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Select a category and click on a card or the 'Preview' button to apply a background. Hover to see details and copy its code.
        </p>

        {/* Category Tabs in a rounded container */}
        <div className="w-full max-w-4xl mx-auto mb-8 px-4 sm:px-6">
          <div className="relative bg-slate-50/70 dark:bg-slate-800/70 border border-gray-300 dark:border-gray-800  backdrop-blur-sm p-1.5 sm:p-2 rounded-2xl">
            <div className="flex justify-center items-center overflow-x-auto scrollbar-hide">
              <div className="flex gap-0.5 sm:gap-1 min-w-max px-2 sm:px-0">
                {categories.map((category, index) => (
                  <div key={category} className="flex items-center">
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "relative py-2.5 sm:py-3 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none whitespace-nowrap",
                        activeCategory === category
                          ? "text-white shadow-md"
                          : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-700/40"
                      )}
                    >
                      {/* Animated background for active tab */}
                      {activeCategory === category && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Tab text */}
                      <motion.span
                        className="relative z-10"
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {category}
                      </motion.span>
                    </button>

                    {/* Subtle separation line */}
                    {index < categories.length - 1 && (
                      <div className="w-px h-4 sm:h-5 bg-slate-300/40 dark:bg-slate-600/40 mx-0.5 sm:mx-1 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 px-4 sm:px-0">
          {filteredPatterns.map((pattern) => (
          <div
          key={pattern.id}
          className={cn(
            "group relative rounded-2xl backdrop-blur-sm p-2 sm:p-3 cursor-pointer outline-none",
          )}
        >
              {/* Aspect Ratio Container */}
              <div
                className="relative w-full rounded-xl overflow-hidden "
                style={{
                  aspectRatio: '16/25',
                  ...pattern.style
                }}
              >
                {/* Hover Overlay (always present, but hidden until hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/70 to-transparent flex flex-col items-center justify-end p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                  {/* Pattern Name */}
                  <div className="text-white font-semibold text-sm sm:text-base text-center  drop-shadow-sm transform group-hover:translate-y-0 translate-y-2 pb-4 opacity-0 group-hover:opacity-100 transition duration-300 delay-100">
                    {pattern.name}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2.5 w-full max-w-32 transform group-hover:translate-y-0 translate-y-4 opacity-0 group-hover:opacity-100 pb-15 transition duration-300 delay-150">
                    {/* Preview Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreview(pattern);
                      }}
                      className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                    >
                      <Eye size={14} /> Preview
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCode(pattern.code, pattern.id);
                      }}
                      className={cn(
                        "flex items-center justify-center gap-2 text-xs sm:text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-200",
                        isCopied === pattern.id
                          ? "bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/25"
                          : "bg-white/90 hover:bg-white text-slate-700"
                      )}
                    >
                      {isCopied === pattern.id ? (
                        <>
                          <Check size={14} className="text-white" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Active Pattern Border Animation */}
                {activePattern?.id === pattern.id && (
                  <motion.div
                    layoutId="activePatternBorder"
                    className="absolute inset-0 border  border-b-cyan-300  rounded-2xl pointer-events-none"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};