import { motion } from "framer-motion";

export const DotNetworkComponent = () => (
    <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-2 p-2">
      {[...Array(32)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-1 bg-white/30 rounded-full"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: (i % 8) * 0.1,
          }}
        />
      ))}
    </div>
  );
  