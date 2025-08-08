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

export const PurpleGradientTop: React.FC<PurpleGradientProps> = ({ children }) => {
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

export const PurpleGradientBlack: React.FC<PurpleGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background: near-black base fading to purple */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #0a0a0a 40%, #6366f1 100%)",
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const PurpleGradientBlackTop: React.FC<PurpleGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background with Fade-in Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #0a0a0a 40%, #6366f1 100%)",
        }}
      />

      {/* Your Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};


interface TealGradientProps {
  children?: React.ReactNode;
}
export const TealGradient: React.FC<TealGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background with Fade-in Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #14b8a6 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export const TealGradientTop: React.FC<TealGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background: teal at top fading to white */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #14b8a6 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export const TealGradientBlackTop: React.FC<TealGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background: near-black base fading to teal */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #0a0a0a 40%, #14b8a6 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export const TealGradientBlack: React.FC<TealGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background with Fade-in Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #0a0a0a 40%, #14b8a6 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};


interface CyanGradientProps {
  children?: React.ReactNode;
}
export const CyanGradient: React.FC<CyanGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background with Fade-in Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #06b6d4 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export const CyanGradientTop: React.FC<CyanGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background: cyan at top fading to white */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #06b6d4 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
export const CyanGradientBlackTop: React.FC<CyanGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background: near-black base fading to cyan */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #0a0a0a 40%, #06b6d4 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export const CyanGradientBlack: React.FC<CyanGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Radial Gradient Background with Fade-in Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #0a0a0a 40%, #06b6d4 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};


interface FuchsiaGradientProps {
  children?: React.ReactNode;
}
export const FuchsiaGradient: React.FC<FuchsiaGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #d946ef 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export const FuchsiaGradientTop: React.FC<FuchsiaGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #d946ef 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export const FuchsiaGradientBlackTop: React.FC<FuchsiaGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #0a0a0a 40%, #d946ef 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export const FuchsiaGradientBlack: React.FC<FuchsiaGradientProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #0a0a0a 40%, #d946ef 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};




interface RedGradientProps {
  children?: React.ReactNode;
}

export const RedGradient: React.FC<RedGradientProps> = ({ children }) => (
  <div className="min-h-screen w-full relative overflow-hidden">
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #ef4444 100%)",
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

export const RedGradientTop: React.FC<RedGradientProps> = ({ children }) => (
  <div className="min-h-screen w-full relative overflow-hidden">
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        background: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ef4444 100%)",
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);
export const RedGradientBlackTop: React.FC<RedGradientProps> = ({ children }) => (
  <div className="min-h-screen w-full relative overflow-hidden">
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        background: "radial-gradient(125% 125% at 50% 90%, #0a0a0a 40%, #ef4444 100%)",
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);
export const RedGradientBlack: React.FC<RedGradientProps> = ({ children }) => (
  <div className="min-h-screen w-full relative overflow-hidden">
    <motion.div
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        background: "radial-gradient(125% 125% at 50% 10%, #0a0a0a 40%, #ef4444 100%)",
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);





