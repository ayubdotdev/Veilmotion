
import { DotNetworkComponent } from "@/bgs/Dots";
import { GlowOrbsComponent } from "@/bgs/Effects";
import { FloatingSquaresComponent } from "@/bgs/Floatings";
import { BouncingCirclesComponent } from "@/bgs/Geometrics";
import { RadialPulseComponent } from "@/bgs/Gradients";

interface Pattern {
  id: string;
  name: string;
  category: "Geometrics" | "Gradients" | "Effects" | "Floatings" | "Dots";
  description: string;
  style: React.CSSProperties;
  component: React.FC; 
  code: string;
}


// Patterns with clean React code for copying
const patterns: Pattern[] = [
  {
    id: "geometrics-circles-bounce",
    name: "Bouncing Circles",
    category: "Geometrics",
    description: "Multiple bouncing circles creating a rhythmic geometric pattern.",
    style: {
      backgroundColor: "#0f172a",
      overflow: "hidden",
    },
    component: BouncingCirclesComponent,
    code: `import { motion } from "framer-motion";

export const BouncingCircles = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center gap-4 bg-slate-900">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-6 h-6 rounded-full bg-indigo-500"
          animate={{ y: [0, -20, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};`
  },
  {
    id: "gradient-radial-pulse",
    name: "Radial Pulse Gradient",
    category: "Gradients",
    description: "A pulsing radial gradient that fades in and out softly.",
    style: {
      background: "radial-gradient(circle, #6366f1 0%, #0f172a 100%)",
    },
    component: RadialPulseComponent,
    code: `import { motion } from "framer-motion";

export const RadialPulse = () => {
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle, #6366f1 0%, #0f172a 100%)",
      }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  );
};`
  },
  {
    id: "effect-glow-orbs",
    name: "Floating Glow Orbs",
    category: "Effects",
    description: "Colorful glowing orbs floating softly across the screen.",
    style: {
      backgroundColor: "#0f172a",
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
  {
    id: "floating-squares-random",
    name: "Floating Squares",
    category: "Floatings",
    description: "Randomly floating squares with soft transitions.",
    style: {
      backgroundColor: "#111827",
    },
    component: FloatingSquaresComponent,
    code: `import { motion } from "framer-motion";

export const FloatingSquares = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gray-900">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 bg-white/10 border border-white/30"
          style={{
            top: \`\${Math.random() * 100}%\`,
            left: \`\${Math.random() * 100}%\`,
          }}
          animate={{ y: ["0%", "-40%", "0%"] }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};`
  },
  {
    id: "dots-soft-network",
    name: "Soft Dot Network",  
    category: "Dots",
    description: "A dotted grid that softly pulses and fades.",
    style: {
      backgroundColor: "#1e293b",
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
  }
];