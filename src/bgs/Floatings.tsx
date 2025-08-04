"use client";
import { useEffect, useState } from "react";
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
    if (!hasMounted) return

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



interface RotatingProps {
  starCount?: number;
}

export const RotatingParticles: React.FC<RotatingProps> = ({ starCount = 200 }) => {
  const stars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    orbitRadius: Math.random() * 40 + 5,
    size: Math.random() * 2 + 1,
    animationDuration: Math.random() * 20 + 20,
    initialAngle: Math.random() * 360,
  }));

  return (
    <div className="rotating-galaxy-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-orbit"
          style={{
            animationDuration: `${star.animationDuration}s`,
            transform: `rotate(${star.initialAngle}deg)`,
          }}
        >
          <div
            className="rotating-star"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              marginLeft: `-${star.size / 2}px`,
              marginTop: `-${star.size / 2}px`,
              transform: `translateY(-${star.orbitRadius}vmin)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

