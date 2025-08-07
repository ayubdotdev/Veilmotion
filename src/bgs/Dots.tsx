'use client';

import { motion, } from "framer-motion";
import React, { useRef, useEffect, useCallback, useMemo, useState } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";


gsap.registerPlugin(InertiaPlugin);

const throttle = <A extends any[], R>(
  func: (...args: A) => R,
  limit: number
): ((...args: A) => void) => {
  let lastCall = 0;

  return function (this: unknown, ...args: A) {
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
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

export const DotGridAnimations: React.FC<DotGridProps> = ({
  dotSize = 5,
  gap = 25,
  baseColor = "#555555",
  activeColor = "#60A5FA",
  proximity = 100,
  shockRadius = 250,
  shockStrength = 14,
  resistance = 1800,
  returnDuration = 2,
  speedTrigger = 80,
  maxSpeed = 3000,
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
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
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
          style = `rgb(${r},${g},${b})`;
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
      (window as Window).addEventListener("resize", buildGrid);
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
      className={`p-4 flex items-center justify-center h-full w-full relative ${className}`}
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
export const MovingDotsComponent = () => (
  <div className="absolute inset-0 grid grid-cols-16 grid-rows-8 gap-4 p-4">
    {[...Array(128)].map((_, i) => {
      const randomX = Math.random() * 20 - 10;
      const randomY = Math.random() * 20 - 10;

      return (
        <motion.div
          key={i}
          className="w-2 h-2 bg-white/40 rounded-full"
          animate={{
            x: [0, randomX, -randomX, 0],
            y: [0, randomY, -randomY, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: (i % 12) * 0.1,
          }}
        />
      );
    })}
  </div>
);
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

