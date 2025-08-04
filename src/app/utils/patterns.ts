import React from "react";
import {  BlinkingDotsComponent, DotGridAnimations, DotNetworkComponent, MovingDotsComponent } from "@/bgs/Dots";
import { GlowOrbsComponent } from "@/bgs/Effects";
import {  GlowingParticles, ParticlesBackgroundComponent, RotatingParticles } from "@/bgs/Floatings";
import { AnimatedBlackGridBackground, AnimatedGrid, RandomGeometricComponent, SphereBgComponent, } from "@/bgs/Geometrics";
import { PurpleGradient, PurpleGradientTop } from "@/bgs/Gradients";

interface Pattern {
  id: string;
  name: string;
  category: "Geometrics" | "Gradients" | "Effects" | "Floatings" | "Dots";
  style: React.CSSProperties;
  component: React.FC;
  code: string;
}

const patterns: Pattern[] = [
  //geometrics
 
  {
    id: "random-geometrics",
    name: "Random Geometry",
    category: "Geometrics",
    style: {
      backgroundColor: "black",
    },
    component: RandomGeometricComponent,
    code: `import React, { useEffect, useRef, useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  
  interface Dot {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    color: number;
    duration: number;
    delay: number;
  }
  
  export const PremiumDotsComponent = () => {
    const [dots, setDots] = useState<Dot[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const generateDots = () => {
        const newDots = [];
        const dotCount = 80;
        for (let i = 0; i < dotCount; i++) {
          newDots.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 3,
            opacity: Math.random() * 0.5 + 0.1,
            color: Math.floor(Math.random() * 5),
            duration: Math.random() * 4 + 4,
            delay: Math.random() * 2,
          });
        }
        setDots(newDots);
      };
      generateDots();
    }, []);
  
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }
      };
  
      const container = containerRef.current;
      if (container) {
        container.addEventListener('mousemove', handleMouseMove);
        return () => container.removeEventListener('mousemove', handleMouseMove);
      }
    }, []);
  
    const getColorClasses = (colorIndex: number): string => {
      const colors = [
        'bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600',
        'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
        'bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600',
        'bg-gradient-to-r from-amber-400 via-orange-500 to-red-600',
        'bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600',
      ];
      return colors[colorIndex];
    };
  
    const getShadowClasses = (colorIndex: number): string => {
      const shadows = [
        'shadow-blue-500/40', 'shadow-pink-500/40', 'shadow-emerald-500/40',
        'shadow-amber-500/40', 'shadow-purple-500/40',
      ];
      return shadows[colorIndex];
    };
  
    return (
      <div
        ref={containerRef}
        className="relative w-full h-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-purple-950/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(120,119,198,0.1),_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(168,85,247,0.1),_transparent_50%)]"></div>
  
        <div className="absolute inset-0">
          <AnimatePresence>
            {dots.map((dot) => {
              const distanceFromMouse = Math.sqrt(
                Math.pow(dot.x - mousePos.x, 2) + Math.pow(dot.y - mousePos.y, 2)
              );
              const mouseInfluence = Math.max(0, 25 - distanceFromMouse) / 25;
  
              return (
                <motion.div
                  key={dot.id}
                  className={\`absolute rounded-full \${getColorClasses(dot.color)} shadow-lg \${getShadowClasses(dot.color)} backdrop-blur-sm\`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1 + mouseInfluence * 0.8,
                    opacity: Math.min(1, dot.opacity + mouseInfluence * 0.4),
                    x: [0, Math.random() * 40 - 20, 0],
                    y: [0, Math.random() * 40 - 20, 0],
                    filter: mouseInfluence > 0.3 ? 'brightness(1.5)' : 'brightness(1)',
                  }}
                  transition={{
                    duration: dot.duration,
                    delay: dot.delay,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                  style={{
                    left: \`\${dot.x}%\`,
                    top: \`\${dot.y}%\`,
                    width: \`\${dot.size}px\`,
                    height: \`\${dot.size}px\`,
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>
  
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.4)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.6)" />
            </linearGradient>
          </defs>
          {dots.map((dot, i) =>
            dots.slice(i + 1).map((otherDot, j) => {
              const distance = Math.sqrt(
                Math.pow(dot.x - otherDot.x, 2) + Math.pow(dot.y - otherDot.y, 2)
              );
              if (distance < 18) {
                const opacity = Math.max(0, (18 - distance) / 18) * 0.5;
                return (
                  <motion.line
                    key={\`\${i}-\${j}\`}
                    x1={\`\${dot.x}%\`} y1={\`\${dot.y}%\`}
                    x2={\`\${otherDot.x}%\`} y2={\`\${otherDot.y}%\`}
                    stroke="url(#lineGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [opacity, opacity * 2.5, opacity] }}
                    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                    strokeWidth={opacity * 2}
                  />
                );
              }
              return null;
            })
          )}
        </svg>
      </div>
    );
  };`
  },
  {
    id: "dark-sphere",
    name: "Dark Sphere",
    category: "Geometrics",
    style: {
      backgroundColor: "black"
    },
    component: SphereBgComponent,
    code: `interface SphereBgComponentProps {
    children?: React.ReactNode;
  }
  export const SphereBgComponent: React.FC<SphereBgComponentProps> = ({ children }) => {
    const gridSize = 32;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    const verticalLines = Math.ceil(screenWidth / gridSize);
    const horizontalLines = Math.ceil(screenHeight / gridSize);
  
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.3
        }
      }
    };
    
    const lineVariants = {
      hidden: {
        scaleY: 0,
        opacity: 0
      },
      visible: {
        scaleY: 1,
        opacity: 0.3,
        transition: {
          duration: 1.4,
          ease: "easeOut"
        }
      }
    };
    
    const horizontalLineVariants = {
      hidden: {
        scaleX: 0,
        opacity: 0
      },
      visible: {
        scaleX: 1,
        opacity: 0.3,
        transition: {
          duration: 1.4,
          ease: "easeOut"
        }
      }
    };
    
    const radialVariants = {
      hidden: {
        scale: 0,
        opacity: 0
      },
      visible: {
        scale: 1,
        opacity: 0.15,
        transition: {
          duration: 2.0,
          ease: "easeOut",
          delay: 1.5
        }
      }
    };
  
    const allLines = [];
  
    for (let i = 0; i < horizontalLines; i++) {
      allLines.push({
        type: 'horizontal',
        index: i,
        position: i * gridSize,
        staggerIndex: i
      });
    }
    
    for (let i = 0; i < verticalLines; i++) {
      allLines.push({
        type: 'vertical',
        index: i,
        position: i * gridSize,
        staggerIndex: horizontalLines + i
      });
    }
  
    return (
      <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
        {/* Animated Grid Background */}
        <motion.div
          className="absolute inset-0 z-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* All Grid Lines with Top-to-Bottom Stagger */}
          {allLines.map((line) => (
            <motion.div
              key={\`\${line.type}-\${line.index}\`}
              className={\`absolute \${line.type === 'vertical' ? 'top-0 h-full w-px' : 'left-0 w-full h-px'} bg-slate-600\`}
              style={
                line.type === 'vertical'
                  ? { left: \`\${line.position}px\` }
                  : { top: \`\${line.position}px\` }
              }
              variants={line.type === 'vertical' ? lineVariants : horizontalLineVariants}
              custom={line.staggerIndex}
              transition={{
                delay: line.staggerIndex * 0.12,
                duration: 1.4,
                ease: "easeOut"
              }}
              initial="hidden"
              animate="visible"
            />
          ))}
  
          {/* Animated Radial Gradient Overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: \`radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)\`
            }}
            variants={radialVariants}
          />
        </motion.div>
  
        {/* Content Layer */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  };`
  },  
  {
    id: "black-grid",
    name: "Black Grid",
    category: "Geometrics",
    style: {
      backgroundColor: "black",
    },
    component: AnimatedBlackGridBackground,
    code: `interface AnimatedBlackGridBackgroundProps {
    children?: React.ReactNode;
  }
  export const AnimatedBlackGridBackground: React.FC<AnimatedBlackGridBackgroundProps> = ({ children }) => {
    const gridSize = 40;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
  
    const verticalLines = Math.ceil(screenWidth / gridSize);
    const horizontalLines = Math.ceil(screenHeight / gridSize);
  
    const lineVariants = {
      hidden: {
        scale: 0,
        opacity: 0
      },
      visible: {
        scale: 1,
        opacity: 0.4,
        transition: {
          duration: 0.8,
          ease: "easeOut"
        }
      }
    };
  
    return (
      <div className="min-h-screen w-full bg-black relative overflow-hidden">
        {/* Grid lines rendered without staggered parent */}
        <div className="absolute inset-0 z-0">
          {/* Vertical Lines */}
          {Array.from({ length: verticalLines }).map((_, i) => (
            <motion.div
              key={\`v-\${i}\`}
              className="absolute top-0 h-full w-px"
              style={{
                left: \`\${i * gridSize}px\`,
                backgroundColor: '#6B7280'
              }}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            />
          ))}
  
          {/* Horizontal Lines */}
          {Array.from({ length: horizontalLines }).map((_, i) => (
            <motion.div
              key={\`h-\${i}\`}
              className="absolute left-0 w-full h-px"
              style={{
                top: \`\${i * gridSize}px\`,
                backgroundColor: '#6B7280'
              }}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            />
          ))}
        </div>
  
        {/* Content Layer */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  };`
  },  
  {
    id: "animated-grid",
    name: "Animated Grid",
    category: "Geometrics",
    style: {
    
    },
    component: AnimatedGrid,
    code: `interface AnimatedGridProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}
export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoveredSquareRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "#060010");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoveredSquareY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return <canvas ref={canvasRef} className="w-full h-full border-none block" />;
};`
  },
    

  //gradients
  {
    id: "purple-gradient",
    name: "Purple Gradient",
    category: "Gradients",
    style: {
    },
    component: PurpleGradient,
    code: `"use client";

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
`
  },
  {
    id: "purple-gradient-top",
    name: "Purple Gradient Bottom",
    category: "Gradients",
    style: {
    },
    component: PurpleGradientTop,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

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
`
  },
  //effects
  {
    id: "effect-glow-orbs",
    name: "Floating Glow Orbs",
    category: "Effects",
    style: {
      backgroundColor: "black",
    },
    component: GlowOrbsComponent,
    code: `import { motion } from "framer-motion";

export const FloatingGlowOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-900">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 bg-pink-500 rounded-full blur-2xl opacity-50"
          style={{
            top: \`\${Math.random() * 80}%\`,
            left: \`\${Math.random() * 80}%\`,
          }}
          animate={{ y: [0, -40, 0] }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};`
  },

  //floatings
  
  {
    id: "moving-particles",
    name: "Moving Particles",
    category: "Floatings",
    style: {
      backgroundColor: "black",
    },
    component: ParticlesBackgroundComponent,
    code: `import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
            transition: { duration: 5, ease: "linear" },
          }}
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
};`
  },
  {
    id: "glowing-particles",
    name: "Glowing Particles",
    category: "Floatings",
    style: {
      backgroundColor: "black",
    },
    component: GlowingParticles,
    code: `
    // globals.css
    .galaxy-container {
      position: absolute;
      inset: 0;
      overflow: hidden;
      background: radial-gradient(ellipse at center, #000014 0%, #000000 100%);
      z-index: 0;
    }
  
    .star {
      position: absolute;
      background-color: white;
      border-radius: 50%;
      opacity: 0.8;
      animation: twinkle 2s infinite ease-in-out;
    }
  
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.5); }
    }
  
    // main component
    interface GalaxyProps {
      starCount?: number;
    }
  
    export const GlowingParticles: React.FC<GalaxyProps> = ({ starCount = 200 }) => {
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
                left: \`\${star.x}%\`,
                top: \`\${star.y}%\`,
                width: \`\${star.size}px\`,
                height: \`\${star.size}px\`,
                animationDelay: \`\${star.delay}s\`,
              }}
            />
          ))}
        </div>
      );
    };`
  },
  {
    id: "rotating-particles",
    name: "Rotating Particles",
    category: "Floatings",
    style: {
      backgroundColor: "black",
    },
    component: RotatingParticles,
    code: `
    // globals.css
    .galaxy-container {
      position: absolute;
      inset: 0;
      overflow: hidden;
      background: radial-gradient(ellipse at center, #000014 0%, #000000 100%);
      z-index: 0;
    }
  
    .star {
      position: absolute;
      background-color: white;
      border-radius: 50%;
      opacity: 0.8;
      animation: twinkle 2s infinite ease-in-out;
    }
  
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.5); }
    }
  
    // main component
    interface GalaxyProps {
      starCount?: number;
    }
  
    export const GlowingParticles: React.FC<GalaxyProps> = ({ starCount = 200 }) => {
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
                left: \`\${star.x}%\`,
                top: \`\${star.y}%\`,
                width: \`\${star.size}px\`,
                height: \`\${star.size}px\`,
                animationDelay: \`\${star.delay}s\`,
              }}
            />
          ))}
        </div>
      );
    };`
  },

  //dots
  {
    id: "dots-soft-network",
    name: "Soft Dot Network",
    category: "Dots",
    style: {
      backgroundColor: "black",
    },
    component: DotNetworkComponent,
    code: `import { motion } from "framer-motion";

export const SoftDotNetwork = () => {
  return (
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-4 p-4 bg-slate-800">
      {[...Array(72)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-white/20 rounded-full"
          animate={{ 
            opacity: [0.2, 0.8, 0.2], 
            scale: [1, 1.2, 1] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: (i % 12) * 0.1,
          }}
        />
      ))}
    </div>
  );
};`
  },
  {
    id: "moving-dots",
    name: "Moving Dots",
    category: "Dots",
    style: {
      backgroundColor: "black",
    },
    component: MovingDotsComponent,
    code: `  export const MovingDotsComponent = () => (
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-2 p-2 overflow-hidden">
        {[...Array(32)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 bg-white/30 rounded-full"
            animate={{ x: ["0%", "100%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: (i % 8) * 0.2, // stagger horizontally
            }}
          />
        ))}
      </div>
    );`
  },
  {
    id: "blinking-dots",
    name: "Blinking Dots",
    category: "Dots",
    style: {
      backgroundColor: "black",
    },
    component: BlinkingDotsComponent,
    code: `export const BlinkingDotsComponent = () => {
    const gridSize = 8;
    const dots = Array.from({ length: gridSize * gridSize }, (_, i) => ({
      id: i,
      x: (i % gridSize) * (100 / gridSize),
      y: Math.floor(i / gridSize) * (100 / gridSize),
      delay: Math.random() * 3
    }));
  
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none bg-gradient-to-tr from-gray-900 to-slate-800">
        {dots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: \`\${dot.x}%\`,
              top: \`\${dot.y}%\`,
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
  };`
  },
  {
    id: "dot-grid",
    name: "React-Bits Dot Grid",
    category: "Dots",
    style: {
      backgroundColor: "black"
    },
    component: DotGridAnimations,
    code: `import { motion } from "framer-motion";
  import React, { useRef, useEffect, useCallback, useMemo } from "react";
  import { gsap } from "gsap";
  import { InertiaPlugin } from "gsap/InertiaPlugin";
  
  gsap.registerPlugin(InertiaPlugin);
  
  const throttle = (func: (...args: any[]) => void, limit: number) => {
    let lastCall = 0;
    return function (this: any, ...args: any[]) {
      const now = performance.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func.apply(this, args);
      }
    };
  };
  
  interface Dot {
    cx: number;
    cy: number;
    xOffset: number;
    yOffset: number;
    _inertiaApplied: boolean;
  }
  
  export interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    activeColor?: string;
    proximity?: number;
    speedTrigger?: number;
    shockRadius?: number;
    shockStrength?: number;
    maxSpeed?: number;
    resistance?: number;
    returnDuration?: number;
    className?: string;
    style?: React.CSSProperties;
  }
  
  function hexToRgb(hex: string) {
    const m = hex.match(/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16),
    };
  }
  
  export const DotGridAnimations: React.FC<DotGridProps> = ({
    dotSize = 16,
    gap = 32,
    baseColor = "#5227FF",
    activeColor = "#5227FF",
    proximity = 150,
    speedTrigger = 100,
    shockRadius = 250,
    shockStrength = 5,
    maxSpeed = 5000,
    resistance = 750,
    returnDuration = 1.5,
    className = "",
    style,
  }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const pointerRef = useRef({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      speed: 0,
      lastTime: 0,
      lastX: 0,
      lastY: 0,
    });
  
    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);
  
    const circlePath = useMemo(() => {
      if (typeof window === "undefined" || !window.Path2D) return null;
      const p = new Path2D();
      p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
      return p;
    }, [dotSize]);
  
    const buildGrid = useCallback(() => {
      const wrap = wrapperRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;
  
      const { width, height } = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = \`\${width}px\`;
      canvas.style.height = \`\${height}px\`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
  
      const cols = Math.floor((width + gap) / (dotSize + gap));
      const rows = Math.floor((height + gap) / (dotSize + gap));
      const cell = dotSize + gap;
  
      const gridW = cell * cols - gap;
      const gridH = cell * rows - gap;
  
      const extraX = width - gridW;
      const extraY = height - gridH;
  
      const startX = extraX / 2 + dotSize / 2;
      const startY = extraY / 2 + dotSize / 2;
  
      const dots: Dot[] = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cx = startX + x * cell;
          const cy = startY + y * cell;
          dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
        }
      }
      dotsRef.current = dots;
    }, [dotSize, gap]);
  
    useEffect(() => {
      if (!circlePath) return;
      let rafId: number;
      const proxSq = proximity * proximity;
      const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const { x: px, y: py } = pointerRef.current;
        for (const dot of dotsRef.current) {
          const ox = dot.cx + dot.xOffset;
          const oy = dot.cy + dot.yOffset;
          const dx = dot.cx - px;
          const dy = dot.cy - py;
          const dsq = dx * dx + dy * dy;
  
          let style = baseColor;
          if (dsq <= proxSq) {
            const dist = Math.sqrt(dsq);
            const t = 1 - dist / proximity;
            const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
            const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
            const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
            style = \`rgb(\${r},\${g},\${b})\`;
          }
  
          ctx.save();
          ctx.translate(ox, oy);
          ctx.fillStyle = style;
          ctx.fill(circlePath);
          ctx.restore();
        }
  
        rafId = requestAnimationFrame(draw);
      };
      draw();
      return () => cancelAnimationFrame(rafId);
    }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);
  
    useEffect(() => {
      buildGrid();
      let ro: ResizeObserver | null = null;
      if ("ResizeObserver" in window) {
        ro = new ResizeObserver(buildGrid);
        wrapperRef.current && ro.observe(wrapperRef.current);
      } else {
        window.addEventListener("resize", buildGrid);
      }
      return () => {
        if (ro) ro.disconnect();
        else window.removeEventListener("resize", buildGrid);
      };
    }, [buildGrid]);
  
    useEffect(() => {
      const onMove = (e: MouseEvent) => {
        const now = performance.now();
        const pr = pointerRef.current;
        const dt = pr.lastTime ? now - pr.lastTime : 16;
        const dx = e.clientX - pr.lastX;
        const dy = e.clientY - pr.lastY;
        let vx = (dx / dt) * 1000;
        let vy = (dy / dt) * 1000;
        let speed = Math.hypot(vx, vy);
        if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          vx *= scale;
          vy *= scale;
          speed = maxSpeed;
        }
        pr.lastTime = now;
        pr.lastX = e.clientX;
        pr.lastY = e.clientY;
        pr.vx = vx;
        pr.vy = vy;
        pr.speed = speed;
  
        const rect = canvasRef.current!.getBoundingClientRect();
        pr.x = e.clientX - rect.left;
        pr.y = e.clientY - rect.top;
  
        for (const dot of dotsRef.current) {
          const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
          if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
            dot._inertiaApplied = true;
            gsap.killTweensOf(dot);
            const pushX = dot.cx - pr.x + vx * 0.005;
            const pushY = dot.cy - pr.y + vy * 0.005;
            gsap.to(dot, {
              inertia: { xOffset: pushX, yOffset: pushY, resistance },
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: "elastic.out(1,0.75)",
                });
                dot._inertiaApplied = false;
              },
            });
          }
        }
      };
  
      const onClick = (e: MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        for (const dot of dotsRef.current) {
          const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
          if (dist < shockRadius && !dot._inertiaApplied) {
            dot._inertiaApplied = true;
            gsap.killTweensOf(dot);
            const falloff = Math.max(0, 1 - dist / shockRadius);
            const pushX = (dot.cx - cx) * shockStrength * falloff;
            const pushY = (dot.cy - cy) * shockStrength * falloff;
            gsap.to(dot, {
              inertia: { xOffset: pushX, yOffset: pushY, resistance },
              onComplete: () => {
                gsap.to(dot, {
                  xOffset: 0,
                  yOffset: 0,
                  duration: returnDuration,
                  ease: "elastic.out(1,0.75)",
                });
                dot._inertiaApplied = false;
              },
            });
          }
        }
      };
  
      const throttledMove = throttle(onMove, 50);
      window.addEventListener("mousemove", throttledMove, { passive: true });
      window.addEventListener("click", onClick);
      return () => {
        window.removeEventListener("mousemove", throttledMove);
        window.removeEventListener("click", onClick);
      };
    }, [
      maxSpeed,
      speedTrigger,
      proximity,
      resistance,
      returnDuration,
      shockRadius,
      shockStrength,
    ]);
  
    return (
      <section
        className={\`p-4 flex items-center justify-center h-full w-full relative \${className}\`}
        style={style}
      >
        <div ref={wrapperRef} className="w-full h-full relative">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
        </div>
      </section>
    );
  };
  `
  },  

];

export { patterns };
