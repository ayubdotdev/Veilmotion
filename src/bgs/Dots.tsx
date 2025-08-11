'use client';

import { motion, } from "framer-motion";
import React, {  useEffect, useMemo, useState } from "react";










export const DotNetworkComponent = () => (
  <div className="absolute inset-0 grid grid-cols-16 grid-rows-8 gap-2 p-2">
    {[...Array(128)].map((_, i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-white/30 rounded-full"
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: (i % 16) * 0.1, // match new number of columns
        }}
      />
    ))}
  </div>
);
export const DotNetworkComponentv2 = () => (
  <div className="absolute inset-0 grid grid-cols-16 grid-rows-8 gap-2 p-2">
    {[...Array(128)].map((_, i) => {
      const row = Math.floor(i / 16); // Get the row number (0–7)

      return (
        <motion.div
          key={i}
          className="w-2 h-2 bg-white/30 rounded-full"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: row * 0.2, // Delay based on row index
          }}
        />
      );
    })}
  </div>
);
const generateColorCycle = (baseHue: number) => [
  `hsl(${baseHue}, 80%, 70%)`,
  `hsl(${(baseHue + 60) % 360}, 80%, 70%)`,
  `hsl(${(baseHue + 120) % 360}, 80%, 70%)`,
  `hsl(${(baseHue + 180) % 360}, 80%, 70%)`,
];
export const MovingDotsComponent = () => {
  const [dots, setDots] = useState<
    { randomX: number; randomY: number; colorCycle: string[] }[]
  >([]);

  useEffect(() => {
    // generate dots only on client side after mount
    const generatedDots = [...Array(128)].map(() => {
      const randomX = Math.random() * 20 - 10;
      const randomY = Math.random() * 20 - 10;
      const baseHue = Math.floor(Math.random() * 360);
      const colorCycle = generateColorCycle(baseHue);
      return { randomX, randomY, colorCycle };
    });
    setDots(generatedDots);
  }, []);

  if (dots.length === 0) {
    // Optionally, render nothing or a placeholder on first render (server or initial client)
    return null;
  }

 return (
  <div className="absolute inset-0 grid grid-cols-16 grid-rows-8 gap-2">
    {dots.map(({ randomX, randomY, colorCycle }, i) => (
      <motion.div
        key={i}
        className="w-4 h-4 rounded-full"
        style={{
          background: `radial-gradient(circle at center, ${colorCycle[0]} 0%, transparent 70%)`,
        }}
        animate={{
          x: [0, randomX, -randomX, 0],
          y: [0, randomY, -randomY, 0],
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.3, 1],
          backgroundImage: [
            `radial-gradient(circle at center, ${colorCycle[0]} 0%, transparent 70%)`,
            `radial-gradient(circle at center, ${colorCycle[1]} 0%, transparent 70%)`,
            `radial-gradient(circle at center, ${colorCycle[2]} 0%, transparent 70%)`,
            `radial-gradient(circle at center, ${colorCycle[3]} 0%, transparent 70%)`,
            `radial-gradient(circle at center, ${colorCycle[0]} 0%, transparent 70%)`,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: (i % 12) * 0.15,
        }}
      />
    ))}
  </div>
);
};

export const BlinkingDotsComponent = () => {
  const gridSize = 8;
  const dots = Array.from({ length: gridSize * gridSize }, (_, i) => ({
    id: i,
    x: (i % gridSize) * (100 / gridSize),
    y: Math.floor(i / gridSize) * (100 / gridSize),
    delay: Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
export const FadeDotComponent = () => {
  const DOT_SIZE = 2; // px
  const GAP_SIZE = 16; // px

  const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    const updateGridSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const cols = Math.floor(width / (DOT_SIZE + GAP_SIZE));
      const rows = Math.floor(height / (DOT_SIZE + GAP_SIZE));
      setGridSize({ cols, rows });
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);
    return () => window.removeEventListener("resize", updateGridSize);
  }, []);

  const dots = useMemo(() => {
    const { cols, rows } = gridSize;
    const centerX = (cols - 1) / 2;
    const centerY = (rows - 1) / 2;
    const maxDist = Math.sqrt(centerX ** 2 + centerY ** 2);

    return Array.from({ length: cols * rows }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const dist = Math.sqrt((col - centerX) ** 2 + (row - centerY) ** 2);
      const opacity = Math.max(0.1, 1 - (dist / maxDist) ** 2);
      const delay = Math.random() * 2;
      return { opacity, delay };
    });
  }, [gridSize]);

  return (
    <div
      className="absolute    inset-0 grid bg-black"
      style={{
        gridTemplateColumns: `repeat(${gridSize.cols}, ${DOT_SIZE}px)`,
        gap: `${GAP_SIZE}px`,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="rounded-full bg-white/60"
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: dot.opacity,
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const WavyDots = () => {
  const gridSize = 20;
  const cols = Math.floor(window.innerWidth / gridSize);
  const rows = Math.floor(window.innerHeight / gridSize);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Grid lines */}
      {[...Array(cols)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 h-full border-l border-slate-700/30"
          style={{ left: `${i * gridSize}px` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: i * 0.02 }}
        />
      ))}
      {[...Array(rows)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 w-full border-t border-slate-700/30"
          style={{ top: `${i * gridSize}px` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: i * 0.02 }}
        />
      ))}

      {/* Pulsing dots */}
      {[...Array(cols * rows)].map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: 3,
              height: 3,
              left: col * gridSize + gridSize / 2,
              top: row * gridSize + gridSize / 2,
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: (col + row) * 0.05,
            }}
          />
        );
      })}
    </div>
  );
};




interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
}
export const ParticlesBackgroundComponent = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hasMounted, setHasMounted] = useState(false);

  // Set initial dimensions and indicate that component has mounted
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setHasMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    // Create initial particles
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    }));

    setParticles(initialParticles);

    // Resize handler
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Particle animation
    const animateInterval = setInterval(() => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          if (newX < 0 || newX > dimensions.width) {
            newX = Math.random() * dimensions.width;
          }
          if (newY < 0 || newY > dimensions.height) {
            newY = Math.random() * dimensions.height;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
    }, 50);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(animateInterval);
    };
  }, [hasMounted, dimensions.width, dimensions.height]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          animate={{
            x: particle.x,
            y: particle.y,
          }}
          transition={{ duration: 5, ease: "linear" }}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
};


interface GlowingProps {
  starCount?: number;
}
export const GlowingParticles: React.FC<GlowingProps> = ({ starCount = 200 }) => {
  const stars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
  }));

  return (
    <div className="galaxy-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};































































interface Particlee {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}
interface FloatingProps {
  particleCount?: number;
}
export const FloatingParticles: React.FC<FloatingProps> = ({ particleCount = 50 }) => {
  const particles: Particlee[] = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: `0 0 4px rgba(255, 255, 255, 0.6), 0 0 6px rgba(255, 255, 255, 0.4)`,
            opacity: 0.8,
          }}
          animate={{
            x: [0, 5, 0, -5, 0],
            y: [0, -5, 0, 5, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

