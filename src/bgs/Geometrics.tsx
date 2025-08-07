
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";




export const DarkBg = () => {
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
              key={`h-${i}`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: `calc(50% + ${offset * gridSize}px)` }}
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
              key={`v-${i}`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: `calc(50% + ${offset * gridSize}px)` }}
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
};
export const AnimatedBlackGridBackground = () => {
  const gridSize = 40;
  const lines = 100
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
              key={`h-${i}`}
              className="absolute left-0 w-full border-t border-slate-800"
              style={{ top: `calc(50% + ${offset * gridSize}px)` }}
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
              key={`v-${i}`}
              className="absolute top-0 h-full border-l border-slate-800"
              style={{ left: `calc(50% + ${offset * gridSize}px)` }}
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
};


//radial
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
              key={`h-${i}`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: `calc(50% + ${offset * gridSize}px)` }}
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
              key={`v-${i}`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: `calc(50% + ${offset * gridSize}px)` }}
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
            backgroundImage: `radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)`,
            backgroundSize: "100% 100%",
          }}

        />
      </motion.div>
    </div>
  );
};
export const CoolBlueGrid = () => {
  const lineCount = 100;
  const spacing = 40;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: `calc(50% + ${offset * spacing}px)` }}
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

        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: `calc(50% + ${offset * spacing}px)` }}
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
  radial-gradient(circle at 50% 50%, rgba(56,189,248,0.2) 0%, transparent 70%)
`,
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};
export const WarmAmberGrid = () => {
  const lineCount = 100;
  const spacing = 40;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: `calc(50% + ${offset * spacing}px)` }}
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

        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: `calc(50% + ${offset * spacing}px)` }}
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
  radial-gradient(circle at 50% 50%, rgba(251,191,36,0.2) 0%, transparent 70%)`,
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};
export const LimeFadeGrid = () => {
  const lineCount = 100;
  const spacing = 40;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: `calc(50% + ${offset * spacing}px)` }}
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

        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: `calc(50% + ${offset * spacing}px)` }}
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
  radial-gradient(circle at 50% 50%, rgba(132,204,22,0.1) 0%, transparent 80%)
`,
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};
export const GreenPunchGrid = () => {
  const lineCount = 100;
  const spacing = 40;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: `calc(50% + ${offset * spacing}px)` }}
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

        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: `calc(50% + ${offset * spacing}px)` }}
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(34,197,94,0.2) 0%, transparent 60%)

           `,

            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};

//linear
export const CyanBurstGrid = () => {
  const lineCount = 100;
  const spacing = 40;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: `calc(50% + ${offset * spacing}px)` }}
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

        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: `calc(50% + ${offset * spacing}px)` }}
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
  linear-gradient(to top, rgba(34,211,238,0.25) 0%, transparent 65%)
`,

            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};

export const VioletMistGrid = () => {
  const lineCount = 100;
  const spacing = 40;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: `calc(50% + ${offset * spacing}px)` }}
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

        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: `calc(50% + ${offset * spacing}px)` }}
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
  linear-gradient(to top, rgba(79,70,229,0.5) 0%, transparent 65%)
`
,
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};

export const MagentaFlame = () => {
  const lineCount = 100;
  const spacing = 40;

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: `calc(50% + ${offset * spacing}px)` }}
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

        {[...Array(lineCount)].map((_, i) => {
          const offset = i - Math.floor(lineCount / 2);
          return (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: `calc(50% + ${offset * spacing}px)` }}
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
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to top,  rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};

export const NeonShock = () => {
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
              key={`h-${i}`}
        className="absolute left-0 w-full border-t border-slate-600/30"
        style={{ top: `calc(50% + ${offset * gridSize}px)` }}
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
              key={`v-${i}`}
        className="absolute top-0 h-full border-l  border-slate-600/30"
        style={{ left: `calc(50% + ${offset * gridSize}px)` }}
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
            backgroundImage: `
linear-gradient(
  to top,
  rgba(0, 255, 200, 0.25),  /* teal neon */
  rgba(128, 0, 255, 0.15),  /* purple glow */
  rgba(0, 0, 0, 0.5) 70%    /* shadowed base */
)          `,
        backgroundSize: "100% 100%",
            }}
          />
      </motion.div>
    </div>
  );
}
export const ToxicPulse = () => {
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
              key={`h-${i}`}
        className="absolute left-0 w-full border-t border-slate-600/30"
        style={{ top: `calc(50% + ${offset * gridSize}px)` }}
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
              key={`v-${i}`}
        className="absolute top-0 h-full border-l  border-slate-600/30"
        style={{ left: `calc(50% + ${offset * gridSize}px)` }}
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
            backgroundImage: `
linear-gradient(
  to top,
  rgba(0, 153, 255, 0.25),   /* electric blue */
  rgba(204, 0, 255, 0.15),   /* magenta glow */
  rgba(0, 0, 0, 0.4) 70%     /* deep shadow base */
)         `,
        backgroundSize: "100% 100%",
            }}
          />
      </motion.div>
    </div>
  );
}









