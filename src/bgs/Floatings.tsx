import { motion } from "framer-motion";

export const FloatingSquaresComponent = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-white/20 border border-white/40"
          style={{
            top: `${20 + i * 15}%`,
            left: `${15 + i * 20}%`,
          }}
          animate={{ y: ["0%", "-20%", "0%"] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );