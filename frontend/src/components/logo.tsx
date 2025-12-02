import type { SoftwiseLogoProps } from "../types/main.types";
import { motion } from "framer-motion";

export const SoftwiseLogo: React.FC<SoftwiseLogoProps> = ({ 
  className = "h-10", 
  showText = true, 
  theme = "light" 
}) => (
  <motion.div 
    className={`flex items-center gap-3 ${className}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <motion.svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-full w-auto"
      whileHover={{ rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.5 }}
    >
      <motion.path 
        d="M20 20 H80 V45 H40 V55 H80 V80 H20 V55 H60 V45 H20 V20Z" 
        fill="#006C93" 
        stroke="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      /> 
      
      <motion.path 
        d="M80 55 V80 H95 V55 H80Z" 
        fill="#FF8C00"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </motion.svg>
    
    {showText && (
      <motion.div 
        className={`font-sans font-bold text-2xl tracking-tight leading-none flex flex-col justify-center ${theme === 'dark' ? 'text-white' : 'text-[#006C93]'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.span
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Soft<motion.span 
            className="text-[#FF8C00]"
            whileHover={{ color: "#FF4D00" }}
          >
            wise
          </motion.span>
        </motion.span>
      </motion.div>
    )}
  </motion.div>
);
