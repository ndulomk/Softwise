import type { SelectChipProps } from "../types/main.types";
import { motion } from "framer-motion";
export const SelectChip: React.FC<SelectChipProps> = ({ label, icon: Icon, selected, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-3 border-2 font-bold text-sm uppercase transition-all
      ${selected 
        ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#FF4D00]' 
        : 'bg-white text-gray-500 border-gray-300 hover:border-black hover:text-black'
      }
    `}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.95 }}
  >
    {Icon && <Icon size={16} />}
    {label}
  </motion.button>
);