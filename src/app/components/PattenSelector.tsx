import { AnimatePresence } from "framer-motion";
import { Check, Copy, Eye, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BouncingCirclesComponent } from "@/bgs/Geometrics";
import { RadialPulseComponent } from "@/bgs/Gradients";
import { GlowOrbsComponent } from "@/bgs/Effects";
import { FloatingSquaresComponent } from "@/bgs/Floatings";
import { DotNetworkComponent } from "@/bgs/Dots";

interface Pattern {
  id: string;
  name: string;
  category: "Geometrics" | "Gradients" | "Effects" | "Floatings" | "Dots";
  description: string;
  style: React.CSSProperties;
  component: React.FC; 
  code: string;       
}

const categories = ["All", "Geometrics", "Gradients", "Effects", "Floatings", "Dots"] as const;
type Category = (typeof categories)[number];


// Individual Pattern Components for Rendering
const PatternComponents: Record<string, React.FC> = {
  "geometrics-circles-bounce": BouncingCirclesComponent,
  "gradient-radial-pulse": RadialPulseComponent,
  "effect-glow-orbs": GlowOrbsComponent,
  "floating-squares-random": FloatingSquaresComponent,
  "dots-soft-network": DotNetworkComponent,
};
// Main Component
export default function PatternSelector() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activePattern, setActivePattern] = useState<Pattern | null>(null);
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [previewPattern, setPreviewPattern] = useState<Pattern | null>(null);

  // Handle copying with improved feedback
  const handleCopyCode = async (pattern: Pattern) => {
    try {
      await navigator.clipboard.writeText(pattern.code);
      setIsCopied(pattern.id);
      setTimeout(() => setIsCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = pattern.code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(pattern.id);
      setTimeout(() => setIsCopied(null), 2000);
    }
  };

  // Handle preview with proper global application
  const handlePreview = (pattern: Pattern) => {
    setPreviewPattern(pattern);
    setActivePattern(pattern);
  };

  // Clear preview
  const clearPreview = () => {
    setPreviewPattern(null);
    setActivePattern(null);
  };

  // Filter patterns based on category
  const filteredPatterns = activeCategory === "All" 
    ? patterns 
    : patterns.filter((pattern: Pattern) => pattern.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      {/* Global Background Preview */}
      <AnimatePresence>
        {previewPattern && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-0"
            style={previewPattern.style}
          >
            {PatternComponents[previewPattern.id] && 
              React.createElement(PatternComponents[previewPattern.id])
            }
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear Preview Button */}
      {previewPattern && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={clearPreview}
          className="fixed top-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
        >
          <X size={20} />
        </motion.button>
      )}

      {/* Main Content */}
      <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Background Pattern Library
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our collection of animated background patterns. Preview them live and copy the React code for your projects.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex gap-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    activeCategory === category
                      ? "text-white shadow-md"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-500 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Patterns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatterns.map((pattern) => (
              <motion.div
                key={pattern.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Pattern Preview Area */}
                <div 
                  className="relative h-48 overflow-hidden"
                  style={pattern.style}
                >
                  {React.createElement(pattern.component)}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePreview(pattern)}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        <Eye size={16} />
                        Preview
                      </button>
                      <button
                        onClick={() => handleCopyCode(pattern)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isCopied === pattern.id
                            ? "bg-green-500 text-white"
                            : "bg-white text-gray-900 hover:bg-gray-100"
                        }`}
                      >
                        {isCopied === pattern.id ? (
                          <>
                            <Check size={16} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pattern Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {pattern.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {pattern.description}
                  </p>
                  <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md">
                    {pattern.category}
                  </span>
                </div>

                {/* Active Pattern Indicator */}
                {activePattern?.id === pattern.id && (
                  <motion.div
                    layoutId="activePattern"
                    className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}