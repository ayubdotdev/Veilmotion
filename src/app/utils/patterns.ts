import React from "react";
import { BlinkingDotsComponent, DotGridAnimations, DotNetworkComponent, DotNetworkComponentv2, FadeDotComponent, MovingDotsComponent } from "@/bgs/Dots";
import { GlowOrbsComponent } from "@/bgs/Effects";
import { FloatingParticles, GlowingParticles, ParticlesBackgroundComponent, } from "@/bgs/Dots";
import { AnimatedBlackGridBackground, MagentaGrid, DarkBg, CoolBlueGrid, WarmAmberGrid, LimeFadeGrid, CyanBurstGrid, VioletMistGrid, MagentaFlame, NeonShock, GreenPunchGrid, ToxicPulse, } from "@/bgs/Geometrics";
import { CyanGradient, CyanGradientBlack, CyanGradientBlackTop, CyanGradientTop, FuchsiaGradient, FuchsiaGradientBlack, FuchsiaGradientBlackTop, FuchsiaGradientTop, PurpleGradient, PurpleGradientBlackTop, PurpleGradientTop, RedGradient, RedGradientBlack, RedGradientBlackTop, RedGradientTop, TealGradient, TealGradientBlackTop, TealGradientTop, } from "@/bgs/Gradients";

interface Pattern {
  id: string;
  name: string;
  category: "Grids" | "Gradients" | "Effects" | "Dots";
  style: React.CSSProperties;
  component: React.FC;
  code: string;
  isLightBackground?: boolean
}

const patterns: Pattern[] = [
  //geometrics
  {
    id: "dark-grid",
    name: "Dark Grid",
    category: "Grids",
    style: {
      backgroundColor: "black"
    },
    component: DarkBg,
    code: `
import { motion } from "framer-motion";
import clsx from "clsx";
import { useRef, useEffect, useState } from "react";
export const DarkBg = () => {
  const gridSize = 32;
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;

  const verticalLines = Math.ceil(screenWidth / gridSize);
  const horizontalLines = Math.ceil(screenHeight / gridSize);

  const allLines = [];
  for (let i = 0; i < horizontalLines; i++) {
    allLines.push({ type: 'horizontal', index: i, position: i * gridSize, staggerIndex: i });
  }
  for (let i = 0; i < verticalLines; i++) {
    allLines.push({ type: 'vertical', index: i, position: i * gridSize, staggerIndex: horizontalLines + i });
  }

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
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 0.3, transition: { duration: 1.4, ease: "easeOut" as const } }
  };

  const radialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.15,
      transition: {
        duration: 2.0,
        ease: "easeOut" as const,
        delay: 1.5
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {allLines.map((line) => (
          <motion.div
            key={\`\${line.type}-\${line.index}\`}
            className={\`absolute \${line.type === 'vertical' ? 'top-0 h-full w-px' : 'left-0 w-full h-px'} bg-slate-600\`}
            style={line.type === 'vertical' ? { left: \`\${line.position}px\` } : { top: \`\${line.position}px\` }}
            variants={lineVariants}
            custom={line.staggerIndex}
            initial="hidden"
            animate="visible"
          />
        ))}

        <motion.div
          className="absolute inset-0"
          style={{ background: \`radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)\` }}
          variants={radialVariants}
          initial="hidden"
          animate="visible"
        />
      </motion.div>
    </div>
  );
};`
  },
  {
    id: "black-grid",
    name: "Black Grid",
    category: "Grids",
    style: {
      backgroundColor: "black",
    },
    component: AnimatedBlackGridBackground,
    code: `
    import { motion } from "framer-motion";
    import clsx from "clsx";
    import { useRef, useEffect, useState } from "react";
    export const AnimatedBlackGridBackground = () => {
      const gridSize = 40;
      const lines = 100;
      return (
        <div className="min-h-screen w-full bg-black relative overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[...Array(lines)].map((_, i) => {
              const offset = i - Math.floor(lines / 2);
              return (
                <motion.div
                  key={\`h-\${i}\`}
                  className="absolute left-0 w-full border-t border-slate-800"
                  style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
                  initial={{ scaleX: 0, originX: 0.5 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: Math.abs(offset) * 0.01,
                  }}
                />
              );
            })}
    
            {[...Array(lines)].map((_, i) => {
              const offset = i - Math.floor(lines / 2);
              return (
                <motion.div
                  key={\`v-\${i}\`}
                  className="absolute top-0 h-full border-l border-slate-800"
                  style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
                  initial={{ scaleY: 0, originY: 0.5 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: Math.abs(offset) * 0.01,
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      );
    };`
  },


  //linear//
  {
    id: "neon-lime-grid",
    name: "Linear - Cyber Punk Shock",
    category: "Grids",
    style: {},
    component: NeonShock,
    code: `
  "use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  export const NeonShock = () => {
    const gridSize = 40;
    const lines = 100;
  
    return (
      <div className="min-h-screen w-full bg-[#081104] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(lines)].map((_, i) => {
            const offset = i - Math.floor(lines / 2);
            return (
              <motion.div
                key={\`h-\${i}\`}
                className="absolute left-0 w-full border-t border-lime-400/20"
                style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
                initial={{ scaleX: 0, originX: 0.5 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: Math.abs(offset) * 0.01,
                }}
              />
            );
          })}
  
          {[...Array(lines)].map((_, i) => {
            const offset = i - Math.floor(lines / 2);
            return (
              <motion.div
                key={\`v-\${i}\`}
                className="absolute top-0 h-full border-l border-lime-400/20"
                style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
                initial={{ scaleY: 0, originY: 0.5 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: Math.abs(offset) * 0.01,
                }}
              />
            );
          })}
  
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: \`
linear-gradient(
  to top,
  rgba(0, 255, 200, 0.25),  /* teal neon */
  rgba(128, 0, 255, 0.15),  /* purple glow */
  rgba(0, 0, 0, 0.5) 70%    /* shadowed base */
)                    \`,
              backgroundSize: "100% 100%",
            }}
          />
        </motion.div>
      </div>
    );
  };`
  },
  {
    id: "toxicpulse-grid",
    name: "Linear - Toxic Pulse",
    category: "Grids",
    style: {},
    component: ToxicPulse,
    code: `
  "use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  export const CyanBurstGrid = () => {
    const gridSize = 40;
    const lines = 100;
  
    return (
      <div className="min-h-screen w-full bg-[#0f0318] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(lines)].map((_, i) => {
            const offset = i - Math.floor(lines / 2);
            return (
              <motion.div
                key={\`h-\${i}\`}
                className="absolute left-0 w-full border-t border-fuchsia-500/20"
                style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
                initial={{ scaleX: 0, originX: 0.5 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: Math.abs(offset) * 0.01,
                }}
              />
            );
          })}
  
          {[...Array(lines)].map((_, i) => {
            const offset = i - Math.floor(lines / 2);
            return (
              <motion.div
                key={\`v-\${i}\`}
                className="absolute top-0 h-full border-l border-fuchsia-500/20"
                style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
                initial={{ scaleY: 0, originY: 0.5 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: Math.abs(offset) * 0.01,
                }}
              />
            );
          })}
  
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: \`
 linear-gradient(
  to top,
  rgba(0, 153, 255, 0.25),   /* electric blue */
  rgba(204, 0, 255, 0.15),   /* magenta glow */
  rgba(0, 0, 0, 0.4) 70%     /* deep shadow base */
)
    \`,
              backgroundSize: "100% 100%",
            }}
          />
        </motion.div>
      </div>
    );
  };`
  },
  {
    id: "cyanburst-grid",
    name: "Linear - Cyan Burst",
    category: "Grids",
    style: {},
    component: CyanBurstGrid,
    code: `
"use client";

import React from "react";
import { motion } from "framer-motion";

export const CyanBurstGrid = () => {
  const gridSize = 40;
  const lines = 100;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`h-\${i}\`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleX: 0, originX: 0.5 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`v-\${i}\`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleY: 0, originY: 0.5 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: \`
  linear-gradient(to top, rgba(34,211,238,0.25) 0%, transparent 65%)
\`,

            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};`
  },
  {

    id: "diagonal-grid",
    name: "Linear - Indigo Mist",
    category: "Grids",
    style: {},
    component: VioletMistGrid,
    code: `
"use client";

import React from "react";
import { motion } from "framer-motion";

export const MagentaGrid = () => {
  const gridSize = 40;
  const lines = 100;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`h-\${i}\`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleX: 0, originX: 0.5 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`v-\${i}\`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleY: 0, originY: 0.5 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        <motion.div
          className="absolute inset-0"
          style={{
             backgroundImage: \`
  linear-gradient(to top, rgba(79,70,229,0.5) 0%, transparent 65%)
\`
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};`
  },
  {
    id: "magenta-flame-grid",
    name: "Linear - Magenta Flame",
    category: "Grids",
    style: {},
    component: MagentaFlame,
    code: `
  "use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  export const CyanBurstGrid = () => {
    const gridSize = 40;
    const lines = 100;
  
    return (
      <div className="min-h-screen w-full bg-[#0f0318] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(lines)].map((_, i) => {
            const offset = i - Math.floor(lines / 2);
            return (
              <motion.div
                key={\`h-\${i}\`}
                className="absolute left-0 w-full border-t border-fuchsia-500/20"
                style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
                initial={{ scaleX: 0, originX: 0.5 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: Math.abs(offset) * 0.01,
                }}
              />
            );
          })}
  
          {[...Array(lines)].map((_, i) => {
            const offset = i - Math.floor(lines / 2);
            return (
              <motion.div
                key={\`v-\${i}\`}
                className="absolute top-0 h-full border-l border-fuchsia-500/20"
                style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
                initial={{ scaleY: 0, originY: 0.5 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: Math.abs(offset) * 0.01,
                }}
              />
            );
          })}
  
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: \`
 linear-gradient(to top,  rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)              \`,
              backgroundSize: "100% 100%",
            }}
          />
        </motion.div>
      </div>
    );
  };`
  },

  //radial//
  {
    id: "magenta-grid",
    name: "Radial - Magenta Touch",
    category: "Grids",
    style: {},
    component: MagentaGrid,
    code: `
"use client";

import React from "react";
import { motion } from "framer-motion";

export const MagentaGrid = () => {
  const gridSize = 40;
  const lines = 100;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`h-\${i}\`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleX: 0, originX: 0.5 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`v-\${i}\`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleY: 0, originY: 0.5 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: \`radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)\`,
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};`
  },
  {
    id: "coolblue-grid",
    name: "Radial - Cool Blue",
    category: "Grids",
    style: {},
    component: CoolBlueGrid,
    code: `
"use client";

import React from "react";
import { motion } from "framer-motion";

export const CoolBlueGrid = () => {
  const gridSize = 40;
  const lines = 100;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`h-\${i}\`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleX: 0, originX: 0.5 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`v-\${i}\`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleY: 0, originY: 0.5 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: \`
  radial-gradient(circle at 50% 50%, rgba(56,189,248,0.2) 0%, transparent 70%)
\`,
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};`
  },
  {
    id: "warmamber-grid",
    name: "Radial - Warm Amber",
    category: "Grids",
    style: {},
    component: WarmAmberGrid,
    code: `
"use client";

import React from "react";
import { motion } from "framer-motion";

export const WarmAmberGrid = () => {
  const gridSize = 40;
  const lines = 100;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`h-\${i}\`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleX: 0, originX: 0.5 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`v-\${i}\`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleY: 0, originY: 0.5 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: \`
  radial-gradient(circle at 50% 50%, rgba(251,191,36,0.2) 0%, transparent 70%)
\`,

            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};`
  },
  {
    id: "limefade-grid",
    name: "Radial - Lime Fade",
    category: "Grids",
    style: {},
    component: LimeFadeGrid,
    code: `
"use client";

import React from "react";
import { motion } from "framer-motion";

export const LimeFadeGrid = () => {
  const gridSize = 40;
  const lines = 100;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`h-\${i}\`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleX: 0, originX: 0.5 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`v-\${i}\`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleY: 0, originY: 0.5 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: \`
  radial-gradient(circle at 50% 50%, rgba(132,204,22,0.1) 0%, transparent 80%)
\`,

            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};`
  },
  {
    id: "greenpunch-grid",
    name: "Radial - Green Punch",
    category: "Grids",
    style: {},
    component: GreenPunchGrid,
    code: `
"use client";

import React from "react";
import { motion } from "framer-motion";

export const PinkRoseGrid = () => {
  const gridSize = 40;
  const lines = 100;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`h-\${i}\`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleX: 0, originX: 0.5 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        {[...Array(lines)].map((_, i) => {
          const offset = i - Math.floor(lines / 2);
          return (
            <motion.div
              key={\`v-\${i}\`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: \`calc(50% + \${offset * gridSize}px)\` }}
              initial={{ scaleY: 0, originY: 0.5 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: Math.abs(offset) * 0.01,
              }}
            />
          );
        })}

        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: \`
            radial-gradient(circle at 50% 50%, rgba(34,197,94,0.2) 0%, transparent 60%)
\`,

            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};`
  },

  //v1-bottom
  //gradients
  {
    id: "indigo-gradient-v1",
    name: "Indigo Gradient v1",
    category: "Gradients",
    style: {
    },
    isLightBackground: true,
    component: PurpleGradient,
    code: `
    //"use client";
// //usage eg:
// import React from "react";
// import {  IndigoGradientv1 } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <IndigoGradientv1/>

//       {/* Foreground Content */}
//       <div className="absolute inset-0 z-10 flex items-center justify-center">
//         {/* Your components go here */}
//         <div className="text-center">
//           <p className="text-4xl font-bold text-white">Your Components Go Here</p>
//           <p className="text-lg text-gray-300 mt-2">
//             Replace this with any UI elements, cards, forms, etc.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
    
    "use client";

import React from "react";
import { motion } from "framer-motion";

export const IndigoBottom = () => {
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
    </div>
  );
};
`
  },
  {
    id: "indigo-gradient-v2",
    name: "Indigo Gradient v2",
    category: "Gradients",
    style: {
    },
    isLightBackground: true,

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
  {
    id: "indigo-gradient-black-v1",
    name: "Indigo Gradient Black v1 ",
    category: "Gradients",
    style: {
    },
    component: PurpleGradientTop,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

interface PurpleGradientProps {
  children?: React.ReactNode;
}

export const PurpleGradientTop: React.FC<PurpleGradientProps> = ({ children }) => {
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

`
  },
  {
    id: "indigo-gradient-black-v2",
    name: "Indigo Gradient Black v2",
    category: "Gradients",
    style: {
    },
    component: PurpleGradientBlackTop,
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
          background: "radial-gradient(125% 125% at 50% 10%, #0a0a0a 40%, #6366f1 100%)",
        }}
      />

      {/* Your Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};`
  },

  {
    id: "teal-gradient-v1",
    name: "Teal Gradient v1",
    category: "Gradients",
    style: {},
    component: TealGradient,
    isLightBackground: true,

    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
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
  };`
  },
  {
    id: "teal-gradient-v2",
    name: "Teal Gradient v2",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: TealGradientTop,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  interface TealGradientTopProps {
    children?: React.ReactNode;
  }
  
  export const TealGradientTop: React.FC<TealGradientTopProps> = ({ children }) => {
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
  };`
  },
  {
    id: "teal-gradient-black-v1",
    name: "Teal Gradient Black v1",
    category: "Gradients",
    style: {},
    component: TealGradientBlackTop,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  interface TealGradientProps {
    children?: React.ReactNode;
  }
  
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
  };`
  },
  {
    id: "teal-gradient-black-v2",
    name: "Teal Gradient Black v2",
    category: "Gradients",
    style: {},
    component: TealGradient,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
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
            background: "radial-gradient(125% 125% at 50% 10%, #0a0a0a 40%, #14b8a6 100%)",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    );
  };`
  },

  {
    id: "cyan-gradient-v1",
    name: "Cyan Gradient v1",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: CyanGradient,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

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
};`
  },
  {
    id: "cyan-gradient-v2",
    name: "Cyan Gradient v2",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: CyanGradientTop,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

interface CyanGradientTopProps {
  children?: React.ReactNode;
}

export const CyanGradientTop: React.FC<CyanGradientTopProps> = ({ children }) => {
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
};`
  },
  {
    id: "cyan-gradient-black-v1",
    name: "Cyan Gradient Black v1",
    category: "Gradients",
    style: {},
    component: CyanGradientBlackTop,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

interface CyanGradientProps {
  children?: React.ReactNode;
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
};`
  },
  {
    id: "cyan-gradient-black-v2",
    name: "Cyan Gradient Black v2",
    category: "Gradients",
    style: {},
    component: CyanGradientBlack,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

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
          background: "radial-gradient(125% 125% at 50% 10%, #0a0a0a 40%, #06b6d4 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};`
  },

  {
    id: "fuchsia-gradient-v1",
    name: "Fuchsia Gradient v1",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: FuchsiaGradient,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  interface FuchsiaGradientProps {
    children?: React.ReactNode;
  }
  export const FuchsiaGradient: React.FC<FuchsiaGradientProps> = ({ children }) => {
    return (
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Radial Gradient Background with Fade-in Animation */}
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
  };`
  },
  {
    id: "fuchsia-gradient-v2",
    name: "Fuchsia Gradient v2",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: FuchsiaGradientTop,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  interface FuchsiaGradientTopProps {
    children?: React.ReactNode;
  }
  
  export const FuchsiaGradientTop: React.FC<FuchsiaGradientTopProps> = ({ children }) => {
    return (
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Radial Gradient Background: fuchsia at top fading to white */}
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
  };`
  },
  {
    id: "fuchsia-gradient-black-v1",
    name: "Fuchsia Gradient Black v1",
    category: "Gradients",
    style: {},
    component: FuchsiaGradientBlackTop,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  interface FuchsiaGradientProps {
    children?: React.ReactNode;
  }
  
  export const FuchsiaGradientBlackTop: React.FC<FuchsiaGradientProps> = ({ children }) => {
    return (
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Radial Gradient Background: near-black base fading to fuchsia */}
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
  };`
  },
  {
    id: "fuchsia-gradient-black-v2",
    name: "Fuchsia Gradient Black v2",
    category: "Gradients",
    style: {},
    component: FuchsiaGradientBlack,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  interface FuchsiaGradientProps {
    children?: React.ReactNode;
  }
  export const FuchsiaGradient: React.FC<FuchsiaGradientProps> = ({ children }) => {
    return (
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Radial Gradient Background with Fade-in Animation */}
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
  };`
  },

  {
    id: "red-gradient-v1",
    name: "Red Gradient v1",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: RedGradient,
    code: `"use client";
    
    import React from "react";
    import { motion } from "framer-motion";
    
    interface RedGradientProps {
      children?: React.ReactNode;
    }
    export const RedGradient: React.FC<RedGradientProps> = ({ children }) => {
      return (
        <div className='min-h-screen w-full relative overflow-hidden'>
          <motion.div
            className='absolute inset-0 z-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              background: "radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #ef4444 100%)"
            }}
          />
          <div className='relative z-10'>{children}</div>
        </div>
      );
    };`
  },
  {
    id: "red-gradient-v2",
    name: "Red Gradient v2",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: RedGradientTop,
    code: `"use client";
    
    import React from "react";
    import { motion } from "framer-motion";
    
    interface RedGradientProps {
      children?: React.ReactNode;
    }
    export const RedGradientTop: React.FC<RedGradientProps> = ({ children }) => {
      return (
        <div className='min-h-screen w-full relative overflow-hidden'>
          <motion.div
            className='absolute inset-0 z-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              background: "radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ef4444 100%)"
            }}
          />
          <div className='relative z-10'>{children}</div>
        </div>
      );
    };`
  },
  {
    id: "red-gradient-black-v1",
    name: "Red Gradient Black v1",
    category: "Gradients",
    style: {},
    component: RedGradientBlackTop,
    code: `"use client";
    
    import React from "react";
    import { motion } from "framer-motion";
    
    interface RedGradientProps {
      children?: React.ReactNode;
    }
    export const RedGradientBlackTop: React.FC<RedGradientProps> = ({ children }) => {
      return (
        <div className='min-h-screen w-full relative overflow-hidden'>
          <motion.div
            className='absolute inset-0 z-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              background: "radial-gradient(125% 125% at 50% 90%, #0a0a0a 40%, #ef4444 100%)"
            }}
          />
          <div className='relative z-10'>{children}</div>
        </div>
      );
    };`
  },
  {
    id: "red-gradient-black-v2",
    name: "Red Gradient Black v2",
    category: "Gradients",
    style: {},
    component: RedGradientBlack,
    code: `"use client";
    
    import React from "react";
    import { motion } from "framer-motion";
    
    interface RedGradientProps {
      children?: React.ReactNode;
    }
    export const RedGradientBlack: React.FC<RedGradientProps> = ({ children }) => {
      return (
        <div className='min-h-screen w-full relative overflow-hidden'>
          <motion.div
            className='absolute inset-0 z-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              background: "radial-gradient(125% 125% at 50% 10%, #0a0a0a 40%, #ef4444 100%)"
            }}
          />
          <div className='relative z-10'>{children}</div>
        </div>
      );
    };`
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
    id: "dots-soft-network-v2",
    name: "Soft Dot Network v2",
    category: "Dots",
    style: {
      backgroundColor: "black",
    },
    component: DotNetworkComponentv2,
    code: `import { motion } from "framer-motion";

export const DotNetworkComponent = () => (
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
);`
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
    id: "fade-dot",
    name: "Fade Dots",
    category: "Dots",
    style: {
      backgroundColor: "black",
    },
    component: FadeDotComponent,
    code: ` import React from 'react';
import { motion } from 'framer-motion';

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
        gridTemplateColumns: \`repeat(\${gridSize.cols}, \${DOT_SIZE}px)\`,
        gap: \`\${GAP_SIZE}px\`,
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
};`
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
    id: "moving-particles",
    name: "Moving Particles",
    category: "Dots",
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
    category: "Dots",
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
