
import { AnimatePresence, motion } from "framer-motion";

import { useRef, useEffect, useState } from "react";


interface AnimatedGridProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}
export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
  direction = "diagonal",
speed = 0.4,
squareSize = 40,
borderColor = "mediumslateblue",
hoverFillColor = "mediumpurple"}) => {
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
};




interface SphereBgComponentProps {
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
        staggerChildren: 0.12, // was 0.08 — slowed down
        delayChildren: 0.3     // was 0.2 — slight delay before starting
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
        duration: 1.4, // was 1.0 — slower expansion
        ease: "easeOut" as const
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
        duration: 1.4, // was 1.0 — slower expansion
        ease: "easeOut" as const
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
        duration: 2.0, // was 1.5 — slower radial fade
        ease: "easeOut" as const,
        delay: 1.5     // was 1.2 — slower entrance
      }
    }
  };

  // Create combined grid lines with position data for top-to-bottom stagger
  const allLines = [];
  
  // Add horizontal lines with their row index for staggering
  for (let i = 0; i < horizontalLines; i++) {
    allLines.push({
      type: 'horizontal',
      index: i,
      position: i * gridSize,
      staggerIndex: i
    });
  }
  
  // Add vertical lines, staggered after horizontal lines
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
            key={`${line.type}-${line.index}`}
            className={`absolute ${
              line.type === 'vertical' 
                ? 'top-0 h-full w-px' 
                : 'left-0 w-full h-px'
            } bg-slate-600`}
            style={
              line.type === 'vertical' 
                ? { left: `${line.position}px` }
                : { top: `${line.position}px` }
            }
            variants={line.type === 'vertical' ? lineVariants : horizontalLineVariants}
            custom={line.staggerIndex}
            transition={{
              delay: line.staggerIndex * 0.12, // was 0.08 — slower stagger
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
            background: `radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)`
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
};


interface AnimatedBlackGridBackgroundProps {
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
        ease: "easeOut" as const
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
            key={`v-${i}`}
            className="absolute top-0 h-full w-px"
            style={{
              left: `${i * gridSize}px`,
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
            key={`h-${i}`}
            className="absolute left-0 w-full h-px"
            style={{
              top: `${i * gridSize}px`,
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
};


interface randomProps {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: number;
  duration: number;
  delay: number;
  dx: number
  dy: number
}
export const RandomGeometricComponent = () => {
  const [dots, setDots] = useState<randomProps[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const generateDots = () => {
      const newDots: randomProps[] = [];
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
          dx: Math.random() * 20 - 10, // random horizontal motion offset
          dy: Math.random() * 20 - 10, // random vertical motion offset
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
    return colors.filter((_, index) => index === colorIndex)[0] || colors?.[0];
  };
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-screen overflow-hidden bg-black"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-black animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_rgba(120,119,198,0.1),_transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(168,85,247,0.1),_transparent_50%)]"></div>


      {/* Animated dots */}
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
                className={`absolute rounded-full ${getColorClasses(dot.color)} backdrop-blur-sm`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1 + mouseInfluence * 0.8,
                  opacity: Math.min(1, dot.opacity + mouseInfluence * 0.4),
                  x: `${dot.x + mouseInfluence * dot.dx * 0.1}%`,
                  y: `${dot.y + mouseInfluence * dot.dy * 0.1}%`,
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
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>


      {/* Connecting lines */}
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
              const avgDX = (dot.dx + otherDot.dx) / 2;
              const avgDY = (dot.dy + otherDot.dy) / 2;
              return (
                <motion.line
                  key={`${i}-${j}`}
                  x1={`${dot.x}%`} y1={`${dot.y}%`}
                  x2={`${otherDot.x}%`} y2={`${otherDot.y}%`}
                  stroke="url(#lineGradient)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [opacity, opacity * 2.5, opacity],
                    x1: `${dot.x + avgDX * 0.05}%`,
                    y1: `${dot.y + avgDY * 0.05}%`,
                    x2: `${otherDot.x + avgDX * 0.05}%`,
                    y2: `${otherDot.y + avgDY * 0.05}%`,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                  }}
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
};