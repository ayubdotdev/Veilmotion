import { motion } from "framer-motion";


export const RadialPulseComponent = () => (
    <motion.div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle, #6366f1 0%, #0f172a 100%)",
      }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  );
  