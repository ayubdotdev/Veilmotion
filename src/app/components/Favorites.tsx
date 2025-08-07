import { Heart } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface FavoriteProps {
  patternId: string;
  isFavorited: boolean;
  onToggleFavorite: (patternId: string) => void;
  className?: string;
}

export const Favorite: React.FC<FavoriteProps> = ({
  patternId,
  isFavorited,
  onToggleFavorite,
  className = ""
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleFavorite(patternId);

    if (!isFavorited) {
      toast.success("Added to favorites!", {
        icon: <Heart className="text-red-500 fill-red-500 w-5 h-5" />,
      });
    } else {
      toast("Removed from favorites.");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`absolute top-3 left-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 shadow-sm hover:shadow-md ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{
        scale: isFavorited ? [1, 1.2, 1] : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <Heart
        size={18}
        className={`transition-all duration-200 ${
          isFavorited 
            ? "fill-red-500 text-red-500" 
            : "text-gray-600 hover:text-red-400"
        }`}
      />
    </motion.button>
  );
};

export default Favorite;
