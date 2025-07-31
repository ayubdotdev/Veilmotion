
import { motion } from "framer-motion";

export const BouncingCirclesComponent = () => (
    <div className="absolute inset-0 flex justify-center items-center gap-2">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full bg-indigo-500"
          animate={{ y: [0, -10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );