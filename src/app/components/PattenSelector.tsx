
import { AnimatePresence } from 'framer-motion';
import { Check, Copy, Eye, X, Sun, Moon, CheckCircle } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { motion } from 'framer-motion';
import { PatternComponents } from '../components/PatternComponents';
import { patterns } from '../utils/patterns';
import { ReturnPreview, useReturnPreview } from './Return';
import Favorite from './Favorites';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { toast } from 'sonner';

interface Pattern {
  id: string;
  name: string;
  category: 'Grids' | 'Gradients' | 'Effects' | 'Dots';
  style: React.CSSProperties;
  component: React.FC;
  code: string;
  isLightBackground?: boolean;
  previewImage?: string; // NEW - path to static preview image
}

interface PatternSelectorProps {
  activePattern?: Pattern | null;
  setActivePattern?: Dispatch<SetStateAction<Pattern | null>>;
}

const categories = [
  'All',
  'Grids',
  'Gradients',
  'Effects',
  'Dots',
  'Favorites',
] as const;
type Category = (typeof categories)[number];

export default function PatternSelector({
  activePattern,
  setActivePattern,
}: PatternSelectorProps) {
  const { theme, setTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [previewPattern, setPreviewPattern] = useState<Pattern | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const {
    isPreviewActive,
    savePositionAndPreview,
    returnToSavedPosition,
    clearPreview,
  } = useReturnPreview();

  const handleToggleFavorite = (patternId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(patternId)) {
        newFavorites.delete(patternId);
        console.log(`Removed ${patternId} from favorites`);
      } else {
        newFavorites.add(patternId);
        console.log(`Added ${patternId} to favorites`);
      }
      return newFavorites;
    });
  };

  const handleCopyCode = async (pattern: Pattern, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const showCopiedToast = () => {
      toast.success(`Copied "${pattern.name}" to clipboard`, {
        icon: <CheckCircle className="text-green-500" size={20} />,
      });
    };

    try {
      await navigator.clipboard.writeText(pattern.code);
      setIsCopied(pattern.id);
      setTimeout(() => setIsCopied(null), 2000);
      showCopiedToast();
    } catch (err) {
      console.error('Failed to copy code:', err);
      try {
        const textArea = document.createElement('textarea');
        textArea.value = pattern.code;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setIsCopied(pattern.id);
        setTimeout(() => setIsCopied(null), 2000);
        showCopiedToast();
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
        toast.error('Failed to copy code');
      }
    }
  };

  const handlePreview = (pattern: Pattern, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Automatically switch theme based on pattern's isLightBackground property
    if (pattern.isLightBackground) {
      setTheme('light');
      console.log('Switched to light mode for pattern:', pattern.name);
    } else {
      setTheme('dark');
      console.log('Switched to dark mode for pattern:', pattern.name);
    }

    setTimeout(() => {
      setPreviewPattern(pattern);
      if (setActivePattern) {
        setActivePattern(pattern);
      }
      savePositionAndPreview();
      console.log('Preview activated for pattern:', pattern.name);
    }, 150);
  };

  // Clear preview
  const handleClearPreview = () => {
    setPreviewPattern(null);
    if (setActivePattern) {
      setActivePattern(null);
    }
    console.log('Preview cleared');
  };

  const handleReturnToPosition = () => {
    returnToSavedPosition();
  };

  const filteredPatterns =
    activeCategory === 'All'
      ? patterns
      : activeCategory === 'Favorites'
      ? patterns.filter((pattern: Pattern) => favorites.has(pattern.id))
      : patterns.filter(
          (pattern: Pattern) => pattern.category === activeCategory,
        );

  return (
    <div className="min-h-screen relative">
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
              React.createElement(PatternComponents[previewPattern.id])}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear Preview Button */}
      {previewPattern && (
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleClearPreview}
          className="fixed top-20 right-4 mt-8 z-50 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <X size={20} />
        </motion.button>
      )}

      {/* Return to Previous Position Button */}
      <ReturnPreview
        isVisible={isPreviewActive && previewPattern !== null}
        onReturn={handleReturnToPosition}
        className="mt-10 size-10"
      />

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Explore Stunning Animated Backgrounds
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from our collection of animated background patterns. <br />
              Preview them live and copy the React code for your projects.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-10 flex justify-center">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap md:justify-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl gap-2 w-full max-w-sm sm:max-w-md lg:max-w-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative text-sm font-medium transition-all px-4 py-2 rounded-lg text-center ${
                    activeCategory === category
                      ? 'text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-500 rounded-lg"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Empty Favorites Message */}
          {activeCategory === 'Favorites' && favorites.size === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">
                No favorites yet
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Click the heart icon on any pattern to add it to your favorites
              </p>
            </motion.div>
          )}

          {/* Patterns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {filteredPatterns.map((pattern) => (
              <motion.div
                key={pattern.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full max-w-sm"
              >
                {/* Favorite Heart Icon */}
                <Favorite
                  patternId={pattern.id}
                  isFavorited={favorites.has(pattern.id)}
                  onToggleFavorite={handleToggleFavorite}
                />

                {/* Pattern Preview Area (static image in grid) */}
                <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {pattern.previewImage ? (
                    <Image
                      src={pattern.previewImage}
                      alt={pattern.name}
                      fill
                      className="object-cover"
                      quality={100}
                      sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           25vw"
                    />
                  ) : (
                    <div className="w-full h-full" style={pattern.style} />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handlePreview(pattern, e)}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors z-20"
                      >
                        <Eye size={16} />
                        Preview
                      </button>
                      <button
                        onClick={(e) => handleCopyCode(pattern, e)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors z-20 ${
                          isCopied === pattern.id
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-gray-900 hover:bg-gray-100'
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
                  <h3 className="font-semibold text-center text-gray-900 dark:text-white">
                    {pattern.name}
                  </h3>
                </div>

                {/* Active Pattern Indicator */}
                {activePattern?.id === pattern.id && (
                  <motion.div
                    layoutId="activePattern"
                    className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
