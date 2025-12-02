import type { BrutalButtonProps } from "../types/main.types";
import { motion } from "framer-motion";

export const BrutalButton: React.FC<BrutalButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  icon: Icon, 
  type = "button", 
  disabled = false 
}) => {
  const baseStyles = "relative px-6 py-4 font-bold text-sm md:text-base uppercase tracking-wider border-2 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
  
  const variants = {
    primary: "bg-[#FF4D00] text-white border-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none",
    secondary: "bg-white text-black border-black hover:bg-[#CCFF00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    outline: "bg-transparent text-black border-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    dark: "bg-white text-black border-white hover:bg-[#FF4D00] hover:border-[#FF4D00] hover:text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]"
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ 
        x: 2, 
        y: 2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        x: 4,
        y: 4
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sliding Background Effect */}
      <motion.div 
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
        transition={{ duration: 0.6 }}
      />
      
      <span className="relative z-10">{children}</span>
      
      {Icon && (
        <motion.span
          className="relative z-10"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={18} />
        </motion.span>
      )}
    </motion.button>
  );
};