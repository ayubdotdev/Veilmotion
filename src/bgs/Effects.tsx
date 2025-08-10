"use client";
import { motion } from "framer-motion";

export const GlowOrbsComponent = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-14 h-14 bg-cyan-500 rounded-full blur-lg opacity-50"
        style={{
          top: `${20 + i * 30}%`,
          left: `${20 + i * 25}%`,
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4 + i,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);
export const SmoothRainComponent = () => {
  const raindrops = [...Array(150)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    startY: -20 - Math.random() * 50,
    length: 8 + Math.random() * 25,
    width: 0.5 + Math.random() * 1.5,
    speed: 3 + Math.random() * 2, // slower: 3–5s
    opacity: 0.25 + Math.random() * 0.25,
    delay: Math.random() * 5,
    angle: -2 + Math.random() * 4,
  }));

  const ripples = [...Array(20)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: 85 + Math.random() * 15,
    delay: Math.random() * 6,
    duration: 1.8 + Math.random() * 1.5,
    maxScale: 2 + Math.random() * 2,
  }));

  return (
    <div className="h-screen absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background rain atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-800/10 to-gray-700/30 opacity-60" />

      {/* Heavy rain drops */}
      {raindrops.map((drop) => (
        <motion.div
          key={`heavy-drop-${drop.id}`}
          className="absolute"
          style={{
            left: `${drop.x}%`,
            top: `${drop.startY}%`,
            width: `${drop.width}px`,
            height: `${drop.length}px`,
            background: `linear-gradient(180deg, 
                rgba(255,255,255,${drop.opacity}) 0%, 
                rgba(200,230,255,${drop.opacity * 0.8}) 50%, 
                rgba(150,200,255,${drop.opacity * 0.5}) 100%)`,
            borderRadius: "50px",
            transform: `rotate(${drop.angle}deg)`,
            filter: "blur(0.3px)",
          }}
          animate={{
            y: ["0vh", "120vh"],
            opacity: [0, drop.opacity, drop.opacity, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: drop.speed,
            delay: drop.delay,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Light mist drops */}
      {[...Array(80)].map((_, i) => {
        const mistDrop = {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 0.5 + Math.random() * 1,
          opacity: 0.08 + Math.random() * 0.15,
          duration: 4 + Math.random() * 2, // slower
          delay: Math.random() * 5,
        };

        return (
          <motion.div
            key={`mist-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${mistDrop.x}%`,
              top: `${mistDrop.y}%`,
              width: `${mistDrop.size}px`,
              height: `${mistDrop.size}px`,
              background: `rgba(255, 255, 255, ${mistDrop.opacity})`,
              filter: "blur(0.5px)",
            }}
            animate={{
              y: ["-20px", "100vh"],
              x: [0, (Math.random() - 0.5) * 30],
              opacity: [0, mistDrop.opacity, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: mistDrop.duration,
              delay: mistDrop.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Ground splash ripples */}
      {ripples.map((ripple) => (
        <motion.div
          key={`ripple-${ripple.id}`}
          className="absolute border border-white/15 rounded-full"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            width: "4px",
            height: "2px",
          }}
          animate={{
            width: ["4px", `${ripple.maxScale * 15}px`],
            height: ["2px", `${ripple.maxScale * 8}px`],
            opacity: [0.4, 0.2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: ripple.duration + 0.5, // slower ripples
            delay: ripple.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Water puddle reflections */}
      {[...Array(8)].map((_, i) => {
        const puddle = {
          x: Math.random() * 80 + 10,
          y: 88 + Math.random() * 8,
          width: 20 + Math.random() * 40,
          delay: Math.random() * 3,
        };

        return (
          <motion.div
            key={`puddle-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${puddle.x}%`,
              top: `${puddle.y}%`,
              width: `${puddle.width}px`,
              height: "3px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
              filter: "blur(1px)",
            }}
            animate={{
              opacity: [0.1, 0.25, 0.1],
              scaleX: [0.9, 1.1, 0.9],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 1.5,
              delay: puddle.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Lightning flash */}
      <motion.div
        className="absolute inset-0 bg-white/5 pointer-events-none"
        animate={{
          opacity: [0, 0, 0, 0.25, 0, 0, 0.08, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          times: [0, 0.7, 0.72, 0.73, 0.74, 0.76, 0.77, 1],
        }}
      />
    </div>
  );
};
export const SnowAuroraComponent = () => {
  const snowflakes = [...Array(120)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 3,
    opacity: 0.3 + Math.random() * 0.7,
    speed: 6 + Math.random() * 6,
    drift: (Math.random() - 0.5) * 40,
    delay: Math.random() * 6,
  }));

  const clouds = [...Array(5)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    width: 150 + Math.random() * 200,
    height: 40 + Math.random() * 20,
    opacity: 0.15 + Math.random() * 0.1,
    delay: Math.random() * 10,
  }));

  return (
    <div className="h-screen absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700">
      {/* Aurora glow */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(100,255,200,0.3) 0%, transparent 60%), radial-gradient(ellipse at 30% 10%, rgba(150,200,255,0.25) 0%, transparent 50%)",
          filter: "blur(40px)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      />

      {/* Clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={`cloud-${cloud.id}`}
          className="absolute top-0 rounded-full"
          style={{
            left: `${cloud.x}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4), transparent 70%)",
            filter: "blur(20px)",
            opacity: cloud.opacity,
          }}
          animate={{
            x: ["0%", "20%", "0%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 60,
            delay: cloud.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <motion.div
          key={`snow-${flake.id}`}
          className="absolute rounded-full"
          style={{
            left: `${flake.x}%`,
            top: `${flake.y}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            background: `rgba(255,255,255,${flake.opacity})`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: ["-10vh", "110vh"],
            x: [0, flake.drift],
            opacity: [0, flake.opacity, flake.opacity, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: flake.speed,
            delay: flake.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Ground frost shimmer */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-16"
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.15), transparent)",
        }}
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};


