"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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


interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  delay: number;
}

interface Cloud {
  id: number;
  x: number;
  width: number;
  height: number;
  opacity: number;
  delay: number;
}
export const SnowAuroraComponent = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    setSnowflakes([...Array(120)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.7,
      speed: 6 + Math.random() * 6,
      drift: (Math.random() - 0.5) * 40,
      delay: Math.random() * 6,
    })));

    setClouds([...Array(5)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      width: 150 + Math.random() * 200,
      height: 40 + Math.random() * 20,
      opacity: 0.1 + Math.random() * 0.08,
      delay: Math.random() * 10,
    })));
  }, []);

  return (
    <div className="h-screen absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b]">
      {/* Aurora glow */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(80,200,170,0.3) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 30% 10%, rgba(100,160,255,0.25) 0%, transparent 50%)",
          filter: "blur(50px)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "150% 150%, 120% 120%",
          backgroundPosition: "50% 0%, 30% 10%",
        }}
        animate={{
          backgroundPosition: [
            "50% 0%, 30% 10%",   // start
            "50% 10%, 35% 15%",  // shift the second gradient slightly diagonally
            "50% 0%, 30% 10%",   // back to start
          ],
          backgroundSize: [
            "150% 150%, 120% 120%",
            "150% 150%, 130% 130%",  // gently increase the second gradient size
            "150% 150%, 120% 120%",
          ],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "easeInOut",
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
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25), transparent 70%)",
            filter: "blur(25px)",
            opacity: cloud.opacity,
          }}
          animate={{
            x: ["0%", "15%", "0%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 70,
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
            "linear-gradient(to top, rgba(255,255,255,0.08), transparent)",
        }}
        animate={{
          opacity: [0.05, 0.15, 0.05],
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




interface Petal {
  id: number;
  x: number;       // percentage position horizontally
  y: number;       // percentage position vertically
  size: number;    // pixel size
  rotation: number;
  opacity: number;
  speed: number;   // fall duration
  drift: number;   // horizontal drift amplitude
  delay: number;   // animation delay
}
export const NightSakuraComponent = () => {
  const petalImage = "/images/petal.png";

  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      [...Array(50)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 100, // some start above the screen
        size: 16 + Math.random() * 18,
        rotation: Math.random() * 360,
        opacity: 0.5 + Math.random() * 0.5,
        speed: 12 + Math.random() * 8,
        drift: 20 + Math.random() * 60, // sway amplitude
        delay: Math.random() * 8,
      }))
    );
  }, []);

  return (
    <div className="h-screen absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#0a0320] via-[#15052f] to-[#1a0f2f]">
      {/* Moon glow */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(255,182,193,0.15) 0%, transparent 70%), radial-gradient(ellipse at 70% 20%, rgba(200,150,255,0.1) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 50,
          ease: "linear",
        }}
      />

      {/* Petals */}
      {petals.map((petal) => (
  <motion.img
    key={`petal-${petal.id}`}
    src="/petal.png"
    alt="Sakura Petal"
    className="absolute"
    style={{
      left: `${petal.x}%`,
      top: `${petal.y}%`,
      width: `${petal.size}px`,
      height: "auto",
      opacity: petal.opacity,
      filter: `drop-shadow(0 0 6px rgba(255,182,193,0.8)) drop-shadow(0 0 12px rgba(255,105,180,0.6))`,
    }}
    animate={{
      y: ["-10vh", "110vh"],
      x: [0, petal.drift, -petal.drift, 0],
      rotate: [
        petal.rotation,
        petal.rotation + 180,
        petal.rotation + 360,
      ],
      opacity: [0, petal.opacity, petal.opacity, 0],
      filter: [
        `drop-shadow(0 0 6px rgba(255,182,193,0.8)) drop-shadow(0 0 12px rgba(255,105,180,0.6))`,
        `drop-shadow(0 0 12px rgba(255,182,193,1)) drop-shadow(0 0 20px rgba(255,105,180,0.8))`,
        `drop-shadow(0 0 6px rgba(255,182,193,0.8)) drop-shadow(0 0 12px rgba(255,105,180,0.6))`,
      ],
    }}
    transition={{
      repeat: Infinity,
      duration: petal.speed,
      delay: petal.delay,
      ease: "easeInOut",
    }}
  />
))}

      {/* Ground shimmer */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-20"
        style={{
          background:
            "linear-gradient(to top, rgba(255,192,203,0.08), transparent)",
        }}
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};


