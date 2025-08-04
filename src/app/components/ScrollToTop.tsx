"use client";

import { useEffect } from "react";

interface ScrollToTopProps {
  shouldScroll: boolean;
  onScrollComplete?: () => void;
  behavior?: "smooth" | "instant";
  offset?: number;
}

export const ScrollToTop = ({ 
  shouldScroll, 
  onScrollComplete, 
  behavior = "smooth",
  offset = 0 
}: ScrollToTopProps) => {
  useEffect(() => {
    if (shouldScroll) {
      // Small delay to ensure the component has rendered
      const timer = setTimeout(() => {
        window.scrollTo({
          top: offset,
          behavior: behavior,
        });
        
        // Call completion callback after scroll animation
        if (onScrollComplete) {
          // Wait for scroll animation to complete (approximately 500ms for smooth scroll)
          const scrollTimer = setTimeout(() => {
            onScrollComplete();
          }, behavior === "smooth" ? 600 : 100);
          
          return () => clearTimeout(scrollTimer);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [shouldScroll, onScrollComplete, behavior, offset]);

  return null; // This component doesn't render anything
};

export const useScrollToTop = () => {
  const scrollToTop = (options?: {
    behavior?: "smooth" | "instant";
    offset?: number;
  }) => {
    const { behavior = "smooth", offset = 0 } = options || {};
    
    window.scrollTo({
      top: offset,
      behavior: behavior,
    });
  };

  const scrollToElement = (elementId: string, options?: {
    behavior?: "smooth" | "instant";
    offset?: number;
  }) => {
    const { behavior = "smooth", offset = 0 } = options || {};
    const element = document.getElementById(elementId);
    
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: behavior,
      });
    }
  };

  return { scrollToTop, scrollToElement };
};