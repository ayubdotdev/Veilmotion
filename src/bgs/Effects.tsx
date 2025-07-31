import { motion } from "framer-motion";

export const GlowOrbsComponent = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 bg-pink-500 rounded-full blur-lg opacity-50"
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
  