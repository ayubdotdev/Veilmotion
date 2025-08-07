"use client";

import {  useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface ReturnPreviewProps {
  isVisible: boolean;
  onReturn: () => void;
  className?: string;
}

export const ReturnPreview = ({ isVisible, onReturn, className = "" }: ReturnPreviewProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          onClick={onReturn}
          className={`fixed top-32 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <ArrowDown size={16} className="inline" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export const useReturnPreview = () => {
  const [savedScrollPosition, setSavedScrollPosition] = useState<number>(0);
  const [isPreviewActive, setIsPreviewActive] = useState<boolean>(false);

  // Save current scroll position before preview
  const savePositionAndPreview = () => {
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    setSavedScrollPosition(currentPosition);
    setIsPreviewActive(true);
    
    // Scroll to top for preview
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };

  // Return to saved position
  const returnToSavedPosition = () => {
    window.scrollTo({
      top: savedScrollPosition,
      behavior: "smooth",
    });
    setIsPreviewActive(false);
  };

  // Clear preview state
  const clearPreview = () => {
    setIsPreviewActive(false);
    setSavedScrollPosition(0);
  };

  return {
    savedScrollPosition,
    isPreviewActive,
    savePositionAndPreview,
    returnToSavedPosition,
    clearPreview,
  };
};

export const ReturnPreviewButton = ({ 
  isVisible, 
  onReturn, 
  position = "top-right",
  variant = "default",
  showText = true 
}: {
  isVisible: boolean;
  onReturn: () => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  variant?: "default" | "minimal" | "pill";
  showText?: boolean;
}) => {
  const positionClasses = {
    "top-right": "top-32 right-4",
    "top-left": "top-32 left-4", 
    "bottom-right": "bottom-8 right-4",
    "bottom-left": "bottom-8 left-4",
  };

  const variantClasses = {
    default: "bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full",
    minimal: "bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-lg border border-white/20",
    pill: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onReturn}
          className={`fixed z-50 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${positionClasses[position]} ${variantClasses[variant]}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
              
                <ArrowDown size={16} className="inline" />
                
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};