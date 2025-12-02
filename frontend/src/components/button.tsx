import type { BrutalButtonProps } from "../types/main.types";
import { motion } from "framer-motion";
export const BrutalButton: React.FC<BrutalButtonProps> = ({ children, onClick, variant = 'primary', className = '', icon: Icon, type = "button", disabled = false }) => {
  const baseStyles = "relative px-6 py-4 font-bold text-sm md:text-base uppercase tracking-wider border-2 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#FF4D00] text-white border-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1",
    secondary: "bg-white text-black border-black hover:bg-[#CCFF00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    outline: "bg-transparent text-black border-black hover:bg-black hover:text-white",
    dark: "bg-white text-black border-white hover:bg-[#FF4D00] hover:border-[#FF4D00] hover:text-white"
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {Icon && <Icon size={18} />}
    </motion.button>
  );
};