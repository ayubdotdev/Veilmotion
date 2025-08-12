"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Raindrop {
  id: number;
  x: number;
  startY: number;
  length: number;
  width: number;
  speed: number;
  opacity: number;
  delay: number;
  angle: number;
}
interface Ripple {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  maxScale: number;
}
interface MistDrop {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}
interface Puddle {
  x: number;
  y: number;
  width: number;
  delay: number;
}
export const SmoothRainComponent = () => {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [mistDrops, setMistDrops] = useState<MistDrop[]>([]);
  const [puddles, setPuddles] = useState<Puddle[]>([]);

  useEffect(() => {
    // Generate all random-based elements only on client
    setRaindrops(
      [...Array(150)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        startY: -20 - Math.random() * 50,
        length: 8 + Math.random() * 25,
        width: 0.5 + Math.random() * 1.5,
        speed: 3 + Math.random() * 2,
        opacity: 0.25 + Math.random() * 0.25,
        delay: Math.random() * 5,
        angle: -2 + Math.random() * 4,
      }))
    );

    setRipples(
      [...Array(20)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 85 + Math.random() * 15,
        delay: Math.random() * 6,
        duration: 1.8 + Math.random() * 1.5,
        maxScale: 2 + Math.random() * 2,
      }))
    );

    setMistDrops(
      [...Array(80)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 1,
        opacity: 0.08 + Math.random() * 0.15,
        duration: 4 + Math.random() * 2,
        delay: Math.random() * 5,
        drift: (Math.random() - 0.5) * 30,
      }))
    );

    setPuddles(
      [...Array(8)].map(() => ({
        x: Math.random() * 80 + 10,
        y: 88 + Math.random() * 8,
        width: 20 + Math.random() * 40,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  if (!raindrops.length) return null; // Avoid SSR mismatch

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-screen absolute inset-0 overflow-hidden pointer-events-none"
    >
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

      {/* Mist drops */}
      {mistDrops.map((mist, i) => (
        <motion.div
          key={`mist-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${mist.x}%`,
            top: `${mist.y}%`,
            width: `${mist.size}px`,
            height: `${mist.size}px`,
            background: `rgba(255, 255, 255, ${mist.opacity})`,
            filter: "blur(0.5px)",
          }}
          animate={{
            y: ["-20px", "100vh"],
            x: [0, mist.drift],
            opacity: [0, mist.opacity, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: mist.duration,
            delay: mist.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Ground ripples */}
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
            duration: ripple.duration + 0.5,
            delay: ripple.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Water puddles */}
      {puddles.map((puddle, i) => (
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
      ))}

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
    </motion.div>
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
    setSnowflakes([...Array(60)].map((_, i) => ({
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="h-screen absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b]">
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


    </motion.div>
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
      [...Array(30)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 1, // start closer to screen top
        size: 16 + Math.random() * 18,
        rotation: Math.random() * 360,
        opacity: 0.5 + Math.random() * 0.5,
        speed: 12 + Math.random() * 8,
        drift: 20 + Math.random() * 60, // sway amplitude
        delay: Math.random() * 1,
      }))
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}


      className="h-screen absolute inset-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#0a0320] via-[#15052f] to-[#1a0f2f]">


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


    </motion.div>
  );
};

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}
interface Mist {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  speed: number;
  opacity: number;
}
export const FireflyForestComponent = () => {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const [mists, setMists] = useState<Mist[]>([]);

  useEffect(() => {
    // Fireflies
    setFireflies(
      [...Array(60)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      }))
    );

    // Mist layers
    setMists(
      [...Array(5)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 50 + Math.random() * 30,
        width: 150 + Math.random() * 150,
        height: 50 + Math.random() * 30,
        delay: Math.random() * 8,
        speed: 20 + Math.random() * 10,
        opacity: 0.04 + Math.random() * 0.05,
      }))
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="absolute inset-0 h-screen overflow-hidden pointer-events-none bg-gradient-to-b from-[#02010a] via-[#04132a] to-[#0a1c1f]
    
    
    
    ">
      {/* Mist layers */}
      {mists.map((mist) => (
        <motion.div
          key={`mist-${mist.id}`}
          className="absolute rounded-full"
          style={{
            left: `${mist.x}%`,
            top: `${mist.y}%`,
            width: `${mist.width}px`,
            height: `${mist.height}px`,
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), transparent 70%)",
            filter: "blur(40px)",
            opacity: mist.opacity,
          }}
          animate={{
            x: ["0%", "10%", "0%"],
          }}
          transition={{
            repeat: Infinity,
            duration: mist.speed,
            delay: mist.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Fireflies */}
      {fireflies.map((fly) => (
        <motion.div
          key={`firefly-${fly.id}`}
          className="absolute rounded-full"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            width: `${fly.size}px`,
            height: `${fly.size}px`,
            background: "rgba(255, 255, 180, 1)",
            boxShadow: "0 0 8px rgba(255,255,180,0.9), 0 0 20px rgba(255,255,200,0.5)",
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: fly.duration,
            delay: fly.delay,
            ease: "easeInOut",
          }}
        />
      ))}


    </motion.div>
  );
};


interface SandParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  delay: number;
}
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  delay: number;
}
export const DesertMirageComponent = () => {
  const [sandParticles, setSandParticles] = useState<SandParticle[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Blowing sand
    setSandParticles(
      [...Array(60)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.05 + Math.random() * 0.15,
        speed: 6 + Math.random() * 6,
        drift: 20 + Math.random() * 40,
        delay: Math.random() * 6,
      }))
    );

    // Stars
    setStars(
      [...Array(100)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 50,
        size: 1 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.8,
        twinkleSpeed: 2 + Math.random() * 3,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}


      className="absolute inset-0 h-screen overflow-hidden pointer-events-none bg-gradient-to-b from-[#0b0b14] via-[#191924] to-[#2d2a23]">


      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: "white",
            opacity: star.opacity,
          }}
          animate={{
            opacity: [0, star.opacity, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: star.twinkleSpeed,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Blowing sand particles */}
      {sandParticles.map((sand) => (
        <motion.div
          key={`sand-${sand.id}`}
          className="absolute rounded-full"
          style={{
            left: `${sand.x}%`,
            top: `${sand.y}%`,
            width: `${sand.size}px`,
            height: `${sand.size}px`,
            background: `rgba(255, 240, 200, ${sand.opacity})`,
            filter: "blur(0.5px)",
          }}
          animate={{
            x: [0, sand.drift],
            y: ["0vh", "100vh"],
            opacity: [0, sand.opacity, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: sand.speed,
            delay: sand.delay,
            ease: "linear",
          }}
        />
      ))}



      {/* Heat distortion glow */}
      <motion.div
        className="absolute bottom-20 left-0 w-full h-12"
        style={{
          background:
            "linear-gradient(to top, rgba(255, 200, 150, 0.04), transparent)",
          filter: "blur(8px)",
        }}
        animate={{
          scaleX: [1, 1.02, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};


interface HoloParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  hue: number;
  delay: number;
  duration: number;
  drift: number;
}
interface LightPanel {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  duration: number;
}
export const CyberpunkHologramComponent = () => {
  const [particles, setParticles] = useState<HoloParticle[]>([]);
  const [panels, setPanels] = useState<LightPanel[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(60)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        hue: Math.floor(Math.random() * 360),
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 4,
        drift: 5 + Math.random() * 15,
      }))
    );

    setPanels(
      [...Array(8)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: 40 + Math.random() * 80,
        height: 10 + Math.random() * 30,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      }))
    );
  }, []);

  return (
    <motion.div 
    initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1.5, ease: "easeOut" }}

    
    className="absolute inset-0 h-screen overflow-hidden pointer-events-none bg-gradient-to-b from-[#05010a] via-[#0b0020] to-[#02010f]">
      {/* Holographic particles */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `hsl(${p.hue}, 100%, 70%)`,
            boxShadow: `0 0 6px hsl(${p.hue}, 100%, 70%), 0 0 12px hsl(${p.hue}, 100%, 50%)`,
          }}
          animate={{
            x: [0, p.drift, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* Light beam sweeps */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, transparent 40%, rgba(0,255,255,0.08) 50%, transparent 60%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};


interface OceanParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  drift: number;
  speed: number;
  delay: number;
  hue: number;
  brightness: number;
}
export const OceanGlowComponent = () => {
  const [particles, setParticles] = useState<OceanParticle[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(80)].map((_, i) => {
        const yPos = Math.random() * 100;
        const isBottomHalf = yPos > 50;

        return {
          id: i,
          x: Math.random() * 100,
          y: yPos,
          size: 1 + Math.random() * 3,
          opacity: isBottomHalf
            ? 0.6 + Math.random() * 0.4 // brighter glow
            : 0.2 + Math.random() * 0.4, // softer top glow
          drift: -5 + Math.random() * 10,
          speed: 6 + Math.random() * 6,
          delay: Math.random() * 6,
          hue: 180 + Math.random() * 80,
          brightness: isBottomHalf ? 100 : 60, // bottom particles more luminous
        };
      })
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}

      className="absolute inset-0 h-screen overflow-hidden pointer-events-none"
      style={{
        background:
          "linear-gradient(to bottom, #a8e0ff 0%, #0077b6 50%, #001d3d 100%)",
      }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={`particle-${p.id}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `hsl(${p.hue}, 100%, ${p.brightness}%)`,
            boxShadow: `0 0 8px hsl(${p.hue}, 100%, ${p.brightness}%),
                        0 0 16px hsl(${p.hue}, 100%, ${p.brightness - 10}%)`,
            opacity: p.opacity,
            filter: "blur(0.5px)",
          }}
          animate={{
            x: [0, p.drift, 0],
            y: ["0vh", "100vh"],
            opacity: [0, p.opacity, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: p.speed,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Light rays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
          mixBlendMode: "screen",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

interface Ember {
  id: number;
  x: number;
  y: number;
  size: number;
  hue: number;
  opacity: number;
  speed: number;
  drift: number;
  delay: number;
}

interface AshCloud {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  speed: number;
  opacity: number;
}

export const VolcanicEmberStormComponent = () => {
  const [embers, setEmbers] = useState<Ember[]>([]);
  const [clouds, setClouds] = useState<AshCloud[]>([]);

  useEffect(() => {
    // Ember particles
    setEmbers(
      [...Array(80)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 60 + Math.random() * 40,
        size: 1 + Math.random() * 2,
        hue: 20 + Math.random() * 40, // orange-red range
        opacity: 0.3 + Math.random() * 0.7,
        speed: 5 + Math.random() * 4,
        drift: -5 + Math.random() * 10,
        delay: Math.random() * 5,
      }))
    );

    // Ash clouds
    setClouds(
      [...Array(5)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 30 + Math.random() * 40,
        width: 200 + Math.random() * 200,
        height: 50 + Math.random() * 40,
        delay: Math.random() * 6,
        speed: 25 + Math.random() * 10,
        opacity: 0.05 + Math.random() * 0.07,
      }))
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}

      className="absolute inset-0 h-screen overflow-hidden pointer-events-none"
      style={{
        background:
          "linear-gradient(to top, #2b0000 0%, #0d0000 40%, #000000 100%)",
      }}
    >
      {/* Ash clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={`cloud-${cloud.id}`}
          className="absolute rounded-full"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            background:
              "radial-gradient(circle at 50% 50%, rgba(50,50,50,0.1), transparent 70%)",
            filter: "blur(60px)",
            opacity: cloud.opacity,
          }}
          animate={{
            x: ["0%", "10%", "0%"],
          }}
          transition={{
            repeat: Infinity,
            duration: cloud.speed,
            delay: cloud.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Ember particles */}
      {embers.map((e) => (
        <motion.div
          key={`ember-${e.id}`}
          className="absolute rounded-full"
          style={{
            left: `${e.x}%`,
            top: `${e.y}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            background: `hsl(${e.hue}, 100%, 60%)`,
            boxShadow: `0 0 8px hsl(${e.hue}, 100%, 60%), 0 0 16px hsl(${e.hue}, 100%, 40%)`,
            opacity: e.opacity,
          }}
          animate={{
            x: [0, e.drift, 0],
            y: ["0vh", "-100vh"],
            opacity: [0, e.opacity, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: e.speed,
            delay: e.delay,
            ease: "easeInOut",
          }}
        />
      ))}

    </motion.div>
  );
};

