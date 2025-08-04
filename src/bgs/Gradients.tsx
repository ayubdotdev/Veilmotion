"use client";

import React from "react";
import { motion } from "framer-motion";

interface PurpleGradientProps {
  children?: React.ReactNode;
}
export const PurpleGradient: React.FC<PurpleGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background with Fade-in Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
        }}
      />

      {/* Your Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface PurpleGradientTopProps {
  children?: React.ReactNode;
}

export const PurpleGradientTop: React.FC<PurpleGradientTopProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background: purple at top fading to white */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};










