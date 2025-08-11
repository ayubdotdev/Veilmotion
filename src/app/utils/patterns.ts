import React from "react";
import { BlinkingDotsComponent, DotNetworkComponent, DotNetworkComponentv2, FadeDotComponent, MovingDotsComponent } from "@/bgs/Dots";
import  {  GlowOrbsComponent, NightSakuraComponent, SmoothRainComponent, SnowAuroraComponent,  } from "@/bgs/Effects";
import { FloatingParticles, GlowingParticles, ParticlesBackgroundComponent, WavyDots} from "@/bgs/Dots";
import { AnimatedBlackGridBackground, MagentaGrid, DarkBg, CoolBlueGrid, WarmAmberGrid, LimeFadeGrid, CyanBurstGrid, VioletMistGrid, MagentaFlame, NeonShock, GreenPunchGrid, ToxicPulse, } from "@/bgs/Geometrics";
import { CyanGradient, CyanGradientBlack, CyanGradientBlackTop, CyanGradientTop, FuchsiaGradient, FuchsiaGradientBlack, FuchsiaGradientBlackTop, FuchsiaGradientTop, PurpleGradient, PurpleGradientBlackTop, PurpleGradientTop, RedGradient, RedGradientBlack, RedGradientBlackTop, RedGradientTop, TealGradient, TealGradientBlackTop, TealGradientTop, } from "@/bgs/Gradients";

interface Pattern {
  id: string;
  name: string;
  category: "Grids" | "Gradients" | "Effects" | "Dots";
  style: React.CSSProperties;
  component: React.FC;
  code: string;
  isLightBackground?: boolean;
  previewImage?: string; 
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
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const DarkBg = () => {
  const gridSize = 32;
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateSize(); // set initial
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const verticalLines = Math.ceil(dimensions.width / gridSize);
  const horizontalLines = Math.ceil(dimensions.height / gridSize);

  const allLines = [];
  for (let i = 0; i < horizontalLines; i++) {
    allLines.push({ type: "horizontal", index: i, position: i * gridSize, staggerIndex: i });
  }
  for (let i = 0; i < verticalLines; i++) {
    allLines.push({ type: "vertical", index: i, position: i * gridSize, staggerIndex: horizontalLines + i });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
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
      transition: { duration: 2.0, ease: "easeOut" as const, delay: 1.5 }
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
            className={\`absolute \${line.type === "vertical" ? "top-0 h-full w-px" : "left-0 w-full h-px"} bg-slate-600\`}
            style={line.type === "vertical" ? { left: \`\${line.position}px\` } : { top: \`\${line.position}px\` }}
            variants={lineVariants}
            custom={line.staggerIndex}
            initial="hidden"
            animate="visible"
          />
        ))}

        <motion.div
          className="absolute inset-0"
          style={{
            background: \`radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)\`
          }}
          variants={radialVariants}
          initial="hidden"
          animate="visible"
        />
      </motion.div>
    </div>
  );
};

// "use client";

// import React from "react";
// import { DarkBg } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Animated Background */}
//       <DarkBg />

//       {/* Foreground Content */}
//       <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
//         <p className="text-4xl font-bold text-white">Your Components Go Here</p>
//         <p className="text-lg text-gray-300 mt-2">
//           Replace this with any UI elements, cards, forms, etc.
//         </p>
//       </div>
//     </div>
//   );
// }
`,
previewImage:"/DarkBg.png"
  },
  {
    id: "black-grid",
    name: "Black Grid",
    category: "Grids",
    style: {
      backgroundColor: "black",
    },
    component: AnimatedBlackGridBackground,
    code: `"use client"
import { motion } from "framer-motion";

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
};

//usage example
//"use client";

//import React from "react";
//import { AnimatedBlackGridBackground } from "./component/bg";

//export default function HomePage() {
//  return (
//    <div className="h-screen relative overflow-hidden">
  //    {/* Background Animation */}
     // <AnimatedBlackGridBackground />

      {/* Foreground Content */}
     // <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* Your components go here */}
       // <div className="text-center">
         // <p className="text-4xl font-bold text-white">Your Components Go Here</p>
          //<p className="text-lg text-gray-300 mt-2">
           // Replace this with any UI elements, cards, forms, etc.
          //</p>
        //</div>
      //</div>
    //</div>
  //);
//}
`,
previewImage:"/BlackGrid.png"

  },


  //linear//
  {
    id: "neon-lime-grid",
    name: "Linear - Cyber Punk Shock",
    category: "Grids",
    style: {},
    component: NeonShock,
    code: `
import { motion } from "framer-motion";
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
        className="absolute top-0 h-full border-l  border-slate-600/30"
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
)          \`,
        backgroundSize: "100% 100%",
            }}
          />
      </motion.div>
    </div>
  );
}

//usage example
//"use client";

// import React from "react";
// import { NeonShock } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <NeonShock    />

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
`,
previewImage:"/Cyber.png"
  },
  {
    id: "toxicpulse-grid",
    name: "Linear - Toxic Pulse",
    category: "Grids",
    style: {},
    component: ToxicPulse,
    code: `
import { motion } from "framer-motion";

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
        className="absolute top-0 h-full border-l  border-slate-600/30"
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
)         \`,
        backgroundSize: "100% 100%",
            }}
          />
      </motion.div>
    </div>
  );
}

//usage eg:
//"use client";

// import React from "react";
// import { ToxicPulse } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <ToxicPulse/>

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
`,
previewImage:"/Toxic.png"
  },
  {
    id: "cyanburst-grid",
    name: "Linear - Cyan Burst",
    category: "Grids",
    style: {},
    component: CyanBurstGrid,
    code: `//"use client";

// import React from "react";
// import { CyanBurstGrid } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <CyanBurstGrid  />

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
};
`,
previewImage:"/Cyan.png"
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

export const IndigoGrid = () => {
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
\`,
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};

//usage eg:
//"use client";
// import React from "react";
// import { IndigoGrid } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <IndigoGrid/>

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
`,
previewImage:"/IndigoMist.png"
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
              key={\`h-\${i}\`}
              className="absolute left-0 w-full border-t border-slate-600/30"
              style={{ top: \`calc(50% + \${offset * spacing}px)\` }}
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
              key={\`v-\${i}\`}
              className="absolute top-0 h-full border-l border-slate-600/30"
              style={{ left: \`calc(50% + \${offset * spacing}px)\` }}
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
            backgroundImage: \`
            linear-gradient(to top,  rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          \`,
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    </div>
  );
};

//"use client";
// //usage eg:
// import React from "react";
// import { MagentaFlame } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <MagentaFlame/>

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
`,
previewImage:"/MagentaFlame.png"
  },

  //radial//
  {
    id: "magenta-grid",
    name: "Radial - Magenta Touch",
    category: "Grids",
    style: {},
    component: MagentaGrid,
    code: `"use client";
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
};

//"use client";
// //usage eg:
// import React from "react";
// import { MagentaGrid } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <MagentaGrid/>

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
`,
previewImage:"/MagentRadial.png"
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
};

//"use client";
// //usage eg:
// import React from "react";
// import { CoolBlueGrid } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <CoolBlueGrid/>

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
`,
previewImage:"/CoolBlue.png"
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
};

//"use client";
// //usage eg:
// import React from "react";
// import { WarmAmberGrid } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <WarmAmberGrid/>

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
`,
previewImage:"/WarmAmber.png"
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
};

//"use client";
// //usage eg:
// import React from "react";
// import { LimeFadeGrid } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <LimeFadeGrid/>

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
`,
previewImage:"/Lime.png"
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

export const GreenPunchGrid = () => {
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
};

//"use client";
// //usage eg:
// import React from "react";
// import { GreenPunchGrid } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <GreenPunchGrid/>

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
`,
previewImage:"/GreenPunch.png"
  },

  //v1-bottom
  //gradients
  {
    id: "indigo-gradient-v1",
    name: "Indigo Bottom",
    category: "Gradients",
    style: {
    },
    isLightBackground: true,
    component: PurpleGradient,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

export const IndigoGradientv1 = () => {
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
//"use client";
// usage eg:
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
`,
previewImage:"/IndigoBtm.png"
  },
  {
    id: "indigo-gradient-v2",
    name: "Indigo Top",
    category: "Gradients",
    style: {
    },
    isLightBackground: true,

    component: PurpleGradientTop,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

export const IndigoGradientv2 = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />
    </div>
  );
};

//"use client";
// //usage eg:
// import React from "react";
// import {   IndigoGradientv2 } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <IndigoGradientv2/>

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
`,
previewImage:"/IndigoTop.png"
  },
  {
    id: "indigo-gradient-black-v2",
    name: "Indigo Black Top",
    category: "Gradients",
    style: {
    },
    component: PurpleGradientBlackTop,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";



export const IndigoGradientBlackv2 = () => {
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
    </div>
  );
};

//"use client";
// //usage eg:
// import React from "react";
// import {   IndigoGradientBlackv2 } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <IndigoGradientBlackv2/>

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
`,
previewImage:"/IndigoBTop.png"
  },
  {
    id: "indigo-gradient-black-v1",
    name: "Indigo Black Bottom",
    category: "Gradients",
    style: {
    },
    component: PurpleGradientTop,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";


export const IndigoGradientBlackv1 = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #0a0a0a 40%, #6366f1 100%)",
        }}
      />

    </div>
  );
};

//"use client";
// //usage eg:
// import React from "react";
// import {   IndigoGradientBlackv1 } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <IndigoGradientBlackv1/>

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
`,
previewImage:"/IndigoBBtm.png"
  },
  

  {
    id: "teal-gradient-v1",
    name: "Teal Bottom",
    category: "Gradients",
    style: {},
    component: TealGradient,
    isLightBackground: true,

    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  
  export const TealBottom = () => {
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
      </div>
    );
  };
  //"use client";
// //usage eg:
// import React from "react";
// import {   TealBottom } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <TealBottom/>

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
`,
previewImage:"/TealBtm.png"
  },
  {
    id: "teal-gradient-v2",
    name: "Teal Top",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: TealGradientTop,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
 
  export const TealTop = () => {
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
      </div>
    );
  };
  
  //"use client";
// //usage eg:
// import React from "react";
// import {   TealTop } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <TealTop/>

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
`,
previewImage:"/TealTop.png"
  },
  {
    id: "teal-gradient-black-v1",
    name: "Teal Black Top",
    category: "Gradients",
    style: {},
    component: TealGradientBlackTop,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  
  export const TealBlackTop = () => {
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
      </div>
    );
  };
  
  //"use client";
// //usage eg:
// import React from "react";
// import {   TealBlackTop } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <TealBlackTop/>

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
`,
previewImage:"/TealBTop.png"
  },
  {
    id: "teal-gradient-black-v2",
    name: "Teal Black Bottom",
    category: "Gradients",
    style: {},
    component: TealGradient,
    code: `"use client";
  
  import {motion} from "framer-motion"
export const TealBlackBtm  = () => {
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
    </div>
  );
};
  //"use client";
// //usage eg:
// import React from "react";
// import {   TealBottom } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <TealBottom/>

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
`,
previewImage:"/TealBBtm.png"
  },

  {
    id: "cyan-gradient-v1",
    name: "Cyan Bottom",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: CyanGradient,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

export const CyanBottom = () => {
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
    </div>
  );
};
//"use client";
// //usage eg:
// import React from "react";
// import {   CyanBottom } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <CyanBottom/>

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
`,
previewImage:"/CyanBtm.png"
  },
  {
    id: "cyan-gradient-v2",
    name: "Cyan Top",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: CyanGradientTop,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

export const CyanTop = () => {
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
    </div>
  );
};
//"use client";
// //usage eg:
// import React from "react";
// import {  CyanTop } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <CyanTop/>

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
`,
previewImage:"/CyanTop.png"
  },
  {
    id: "cyan-gradient-black-v1",
    name: "Cyan Black Top",
    category: "Gradients",
    style: {},
    component: CyanGradientBlackTop,
    code: `  "use client";

  import React from "react";
  import { motion } from "framer-motion";

  export const CyanBlackTop = () => {
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
      </div>
    );
  };
  
  //"use client";
// //usage eg:
// import React from "react";
// import {  CyanBlackTop } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <CyanBlackTop/>

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
`,
previewImage:"/CyanBTop.png"
  },
  {
    id: "cyan-gradient-black-v2",
    name: "Cyan Black Bottom",
    category: "Gradients",
    style: {},
    component: CyanGradientBlack,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";


export const CyanBlackBottom = () => {
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
    </div>
  );
};
//"use client";
// //usage eg:
// import React from "react";
// import {  CyanBlackBottom } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <CyanBlackBottom/>

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
`,
previewImage:"/CyanBBtm.png"
  },

  {
    id: "fuchsia-gradient-v1",
    name: "Fuchsia Bottom",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: FuchsiaGradient,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  
  export const FuchsiaBottom = () => {
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
      </div>
    );
  };
  //"use client";
// //usage eg:
// import React from "react";
// import {  FuchsiaBottom } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <FuchsiaBottom/>

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
`,
previewImage:"/FushBtm.png"
  },
  {
    id: "fuchsia-gradient-v2",
    name: "Fuchsia Top",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: FuchsiaGradientTop,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  

  export const FuchsiaTop = () => {
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
      </div>
    );
  };
 // "use client";
// //usage eg:
// import React from "react";
// import {  FuchsiaTop } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <FuchsiaTop/>

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
`,
previewImage:"/FushTop.png"
  },
  {
    id: "fuchsia-gradient-black-v1",
    name: "Fuchsia Black Top",
    category: "Gradients",
    style: {},
    component: FuchsiaGradientBlackTop,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
 
  export const FuchsiaBlackTop = () => {
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
      </div>
    );
  };
 // "use client";
// //usage eg:
// import React from "react";
// import { FuchsiaBlackTop } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <FuchsiaBlackTop/>

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
`,
previewImage:"/FushBTop.png"
  },
  {
    id: "fuchsia-gradient-black-v2",
    name: "Fuchsia Black Bottom",
    category: "Gradients",
    style: {},
    component: FuchsiaGradientBlack,
    code: `"use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  
  
  export const FuchsiaBlackBottom = () => {
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
      </div>
    );
  };
  //"use client";
// //usage eg:
// import React from "react";
// import { FuchsiaBlackBottom } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <FuchsiaBlackBottom/>

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
`,
previewImage:"/FushBBtm.png"
  },

  {
    id: "red-gradient-v1",
    name: "Red Bottom",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: RedGradient,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";


export const RedBottom = () => {
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
    </div>
  );
};
//"use client";
// //usage eg:
// import React from "react";
// import { RedBottom } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <RedBottom/>

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
`,
previewImage:"/RedBtm.png"
  },
  {
    id: "red-gradient-v2",
    name: "Red Top",
    category: "Gradients",
    isLightBackground: true,

    style: {},
    component: RedGradientTop,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";

export const RedTop = () => {
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
    </div>
  );
};
//"use client";
// //usage eg:
// import React from "react";
// import { RedTop } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <RedTop/>

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
`,
previewImage:"/RedTop.png"
  },
  {
    id: "red-gradient-black-v1",
    name: "Red Black Top",
    category: "Gradients",
    style: {},
    component: RedGradientBlackTop,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";


export const RedBlackTop = () => {
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
    </div>
  );
};
//"use client";
// //usage eg:
// import React from "react";
// import { RedBlackTop } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <RedBlackTop/>

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
`,
previewImage:"/RedBTop.png"
  },
  {
    id: "red-gradient-black-v2",
    name: "Red Black Bottom",
    category: "Gradients",
    style: {},
    component: RedGradientBlack,
    code: `"use client";

import React from "react";
import { motion } from "framer-motion";


export const RedBlackBottom = () => {
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
    </div>
  );
};
//"use client";
// //usage eg:
// import React from "react";
// import {  RedBlackBottom } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <RedBlackBottom/>

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
`,
previewImage:"/RedBBtm.png"
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
    code: `
import {motion} from "framer-motion"
export const GlowOrbsComponent = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-14 h-14 bg-cyan-500 rounded-full blur-lg opacity-50"
          style={{
            top: \`\${20 + i * 30}%\`,
            left: \`\${20 + i * 25}%\`,
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
  )
    //EXAMPLE USAGE
// "use client";

// import React from "react";
// import {  GlowOrbsComponent  } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <GlowOrbsComponent  />

//       {/* Foreground Content */}
//       <div className="absolute inset-0 z-10 flex items-center justify-center">
//         {/* Your components go here */}
//         <div className="text-center">
//           <p className="text-4xl font-bold text-white">Your Components Goes Here</p>
//           <p className="text-lg text-gray-300 mt-2">
//             Replace this with any UI elements, cards, forms, etc.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// } 
  `,
  previewImage:"/GlowOrbs.png"
  },
  {
    id: "smooth-rain",
    name: "Smooth Rain",
    category: "Effects",
    style: {
      backgroundColor: "black",
    },
    component: SmoothRainComponent,
    code: `
    //EXAMPLE USAGE
// "use client";
// import React from "react";
// import {  SmoothRainComponent } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <SmoothRainComponent />

//       {/* Foreground Content */}
//       <div className="absolute inset-0 z-10 flex items-center justify-center">
//         {/* Your components goes here */}
//         <div className="text-center">
//           <p className="text-4xl font-bold text-white">Your Components Goes Here</p>
//           <p className="text-lg text-gray-300 mt-2">
//             Replace this with any UI elements, cards, forms, etc.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const SmoothRainComponent = () => {
  const [raindrops, setRaindrops] = useState<any[]>([]);
  const [ripples, setRipples] = useState<any[]>([]);

  useEffect(() => {
    // Generate random values only after mount
    const generatedRaindrops = [...Array(150)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: -20 - Math.random() * 50,
      length: 8 + Math.random() * 25,
      width: 0.5 + Math.random() * 1.5,
      speed: 3 + Math.random() * 2,
      opacity: 0.25 + Math.random() * 0.25,
      delay: Math.random() * 5,
      angle: -2 + Math.random() * 4,
    }));

    const generatedRipples = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 85 + Math.random() * 15,
      delay: Math.random() * 6,
      duration: 1.8 + Math.random() * 1.5,
      maxScale: 2 + Math.random() * 2,
    }));

    setRaindrops(generatedRaindrops);
    setRipples(generatedRipples);
  }, []);

  if (raindrops.length === 0) return null; // Avoid mismatched initial render

  return (
    <div className="h-screen absolute inset-0 overflow-hidden pointer-events-none">
      {/* Background rain atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-800/10 to-gray-700/30 opacity-60" />

      {/* Heavy rain drops */}
      {raindrops.map((drop) => (
        <motion.div
          key={\`heavy-drop-\${drop.id}\`}
          className="absolute"
          style={{
            left: \`\${drop.x}%\`,
            top: \`\${drop.startY}%\`,
            width: \`\${drop.width}px\`,
            height: \`\${drop.length}px\`,
            background: \`linear-gradient(180deg, 
              rgba(255,255,255,\${drop.opacity}) 0%, 
              rgba(200,230,255,\${drop.opacity * 0.8}) 50%, 
              rgba(150,200,255,\${drop.opacity * 0.5}) 100%)\`,
            borderRadius: "50px",
            transform: \`rotate(\${drop.angle}deg)\`,
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
            key={\`mist-\${i}\`}
            className="absolute rounded-full"
            style={{
              left: \`\${mistDrop.x}%\`,
              top: \`\${mistDrop.y}%\`,
              width: \`\${mistDrop.size}px\`,
              height: \`\${mistDrop.size}px\`,
              background: \`rgba(255, 255, 255, \${mistDrop.opacity})\`,
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
          key={\`\ripple-\${ripple.id}\`}
          className="absolute border border-white/15 rounded-full"
          style={{
            left: \`\${ripple.x}%\`,
            top: \`\${ripple.y}%\`,
            width: "4px",
            height: "2px",
          }}
          animate={{
            width: ["4px", \`\${ripple.maxScale * 15}px\`],
            height: ["2px", \`\${ripple.maxScale * 8}px\`],
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
            key={\`puddle-\${i}\`}
            className="absolute rounded-full"
            style={{
              left: \`\${puddle.x}%\`,
              top: \`\${puddle.y}%\`,
              width: \`\${puddle.width}px\`,
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
  `,
  previewImage:"/Rain.png"
  },
  {
    id: "smooth-snow",
    name: "Smooth Snow",
    category: "Effects",
    style: {
      backgroundColor: "black",
    },
    component: SnowAuroraComponent,
    code:`//EXAMPLE USAGE
// "use client";
// import React from "react";
// import {  SnowAuroraComponent  } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <SnowAuroraComponent  />

//       {/* Foreground Content */}
//       <div className="absolute inset-0 z-10 flex items-center justify-center">
//         {/* Your components goes here */}
//         <div className="text-center">
//           <p className="text-4xl font-bold text-white">Your Components Goes Here</p>
//           <p className="text-lg text-gray-300 mt-2">
//             Replace this with any UI elements, cards, forms, etc.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const SnowAuroraComponent = () => {
  const [snowflakes, setSnowflakes] = useState<any[]>([]);
  const [clouds, setClouds] = useState<any[]>([]);

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
            "radial-gradient(ellipse at top, rgba(80,200,170,0.3) 0%, transparent 60%), radial-gradient(ellipse at 30% 10%, rgba(100,160,255,0.25) 0%, transparent 50%)",
          filter: "blur(50px)",
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
          key={\`cloud-\${cloud.id}\`}
          className="absolute top-0 rounded-full"
          style={{
            left: \`\${cloud.x}%\`,
            width: \`\${cloud.width}px\`,
            height: \`\${cloud.height}px\`,
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
          key={\`snow-\${flake.id}\`}
          className="absolute rounded-full"
          style={{
            left: \`\${flake.x}%\`,
            top: \`\${flake.y}%\`,
            width: \`\${flake.size}px\`,
            height: \`\${flake.size}px\`,
            background: \`rgba(255,255,255,\${flake.opacity})\`,
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
` ,
previewImage:"/Snow.png"
  },
  {
    id: "cheryy-blossom",
    name: "Night Sakura",
    category: "Effects",
    style: {
      backgroundColor: "black",
    },
    component: NightSakuraComponent,
    code:`
    //EXAMPLE USAGE
// "use client";
// import React from "react";
// import { NightSakuraComponent } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <NightSakuraComponent />

//       {/* Foreground Content */}
//       <div className="absolute inset-0 z-10 flex items-center justify-center">
        
//       </div>
//     </div>
//   );
// }

    
    "use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

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
    key={\`petal-\${petal.id}\`}
    src="/petal.png"
    alt="Sakura Petal"
    className="absolute"
    style={{
      left: \`\${petal.x}%\`,
      top: \`\${petal.y}%\`,
      width: \`\${petal.size}px\`,
      height: "auto",
      opacity: petal.opacity,
      filter: \`drop-shadow(0 0 6px rgba(255,182,193,0.8)) drop-shadow(0 0 12px rgba(255,105,180,0.6))\`,
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
        \`drop-shadow(0 0 6px rgba(255,182,193,0.8)) drop-shadow(0 0 12px rgba(255,105,180,0.6))\`,
        \`drop-shadow(0 0 12px rgba(255,182,193,1)) drop-shadow(0 0 20px rgba(255,105,180,0.8))\`,
        \`drop-shadow(0 0 6px rgba(255,182,193,0.8)) drop-shadow(0 0 12px rgba(255,105,180,0.6))\`,
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
` ,
previewImage:"/Sakura.png"
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
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-4 p-4 bg-black">
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
};
//"use client";
// //usage eg:
// import React from "react";
// import {  SoftDotNetwork } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <SoftDotNetwork/>

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
`,
previewImage:"/SoftD1.png"
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

export const SoftDotNetworkv2 = () => (
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
//"use client";
// //usage eg:
// import React from "react";
// import {  SoftDotNetworkv2 } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <SoftDotNetworkv2/>

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
`,
previewImage:"/sdv2.png"
  },
  {
    id: "moving-dots",
    name: "Moving Gradient Dots",
    category: "Dots",
    style: {
      backgroundColor: "black",
    },
    component: MovingDotsComponent,
    code: `
    import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const generateColorCycle = (baseHue: number) => [
  \`hsl(\${baseHue}, 80%, 70%)\`,
  \`hsl(\${(baseHue + 60) % 360}, 80%, 70%)\`,
  \`hsl(\${(baseHue + 120) % 360}, 80%, 70%)\`,
  \`hsl(\${(baseHue + 180) % 360}, 80%, 70%)\`,
];

export const MovingDotsComponent = () => {
  const [dots, setDots] = useState<
    { randomX: number; randomY: number; colorCycle: string[] }[]
  >([]);

  useEffect(() => {
    // generate dots only on client side after mount
    const generatedDots = [...Array(128)].map(() => {
      const randomX = Math.random() * 20 - 10;
      const randomY = Math.random() * 20 - 10;
      const baseHue = Math.floor(Math.random() * 360);
      const colorCycle = generateColorCycle(baseHue);
      return { randomX, randomY, colorCycle };
    });
    setDots(generatedDots);
  }, []);

  if (dots.length === 0) {
    // Optionally, render nothing or a placeholder on first render (server or initial client)
    return null;
  }

 return (
  <div className="absolute inset-0 grid grid-cols-16 grid-rows-8 gap-2">
    {dots.map(({ randomX, randomY, colorCycle }, i) => (
      <motion.div
        key={i}
        className="w-4 h-4 rounded-full"
        style={{
          background: \`radial-gradient(circle at center, \${colorCycle[0]} 0%, transparent 70%)\`,
        }}
        animate={{
          x: [0, randomX, -randomX, 0],
          y: [0, randomY, -randomY, 0],
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.3, 1],
          backgroundImage: [
            \`radial-gradient(circle at center, \${colorCycle[0]} 0%, transparent 70%)\`,
            \`radial-gradient(circle at center, \${colorCycle[1]} 0%, transparent 70%)\`,
            \`radial-gradient(circle at center, \${colorCycle[2]} 0%, transparent 70%)\`,
            \`radial-gradient(circle at center, \${colorCycle[3]} 0%, transparent 70%)\`,
            \`radial-gradient(circle at center, \${colorCycle[0]} 0%, transparent 70%)\`,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: (i % 12) * 0.15,
        }}
      />
    ))}
  </div>
);
};

//EXAMPLE USAGE
// "use client";
// import React from "react";
// import { MovingDotsComponent } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <MovingDotsComponent />

//       {/* Foreground Content */}
//       <div className="absolute inset-0 z-10 flex items-center justify-center">
        
//       </div>
//     </div>
//   );
// }

`,
previewImage:"/movgrddot.png"
  },
  {
    id: "fade-dot",
    name: "Fade Dots",
    category: "Dots",
    style: {
      backgroundColor: "black",
    },
    component: FadeDotComponent,
    code: ` "use client"
import React, { useEffect, useMemo, useState } from 'react';
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
      className="absolute   inset-0 grid bg-black"
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
};

//"use client";
// //usage eg:
// import React from "react";
// import {  FadeDotComponent } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <FadeDotComponent/>

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
`,
previewImage:"/FadeD.png"
  },
  
  
  {
    id: "blinking-dots",
    name: "Blinking Dots",
    category: "Dots",
    style: {
      backgroundColor: "black",
    },
    component: BlinkingDotsComponent,
    code: `
import {motion } from "framer-motion"

export const BlinkingDotsComponent = () => {
  const gridSize = 8;
  const dots = Array.from({ length: gridSize * gridSize }, (_, i) => ({
    id: i,
    x: (i % gridSize) * (100 / gridSize),
    y: Math.floor(i / gridSize) * (100 / gridSize),
    delay: Math.random() * 3
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none bg-black">
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
};
//"use client";
// //usage eg:
// import React from "react";
// import {  BlinkingDotsComponent  } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <BlinkingDotsComponent  />

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
`,
previewImage:"/blinkd.png"
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
};
//"use client";
// //usage eg:
// import React from "react";
// import {  ParticlesBackgroundComponent  } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <ParticlesBackgroundComponent  />

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
`,
previewImage:"/movp.png"
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
   "use client";
// copy below classes at the bottom of globals.css
   /* .galaxy-container {
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
    }*/
import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface GalaxyProps {
  starCount?: number;
}

export const GlowingParticles: React.FC<GalaxyProps> = ({ starCount = 200 }) => {
  const [stars, setStars] = useState<Star[] | null>(null);

  useEffect(() => {
    // generate only on the client after mount
    const generated = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    // tiny timeout to allow a smooth fade-in (optional)
    setTimeout(() => setStars(generated), 0);
  }, [starCount]);

  return (
    <div className={\`galaxy-container \${stars ? "loaded" : ""}\`} aria-hidden>
      {stars?.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: \`\${s.x}%\`,
            top: \`\${s.y}%\`,
            width: \`\${s.size}px\`,
            height: \`\${s.size}px\`,
            animationDelay: \`\${s.delay}s\`,
          }}
        />
      ))}
    </div>
  );
};
//"use client";
// usage eg:

// import React from "react";
// import {  GlowingParticles  } from "./component/bg";

// export default function HomePage() {
//   return (
//     <div className="h-screen relative overflow-hidden">
//       {/* Background Animation */}
//       <GlowingParticles  />

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
`,
previewImage:"/glowp.png"
  },
];

export { patterns };
