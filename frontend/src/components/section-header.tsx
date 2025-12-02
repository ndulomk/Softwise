import type { SectionHeaderProps } from "../types/main.types";
import { motion } from "framer-motion";

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, align = "left", dark = false }) => (
  <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs font-bold mb-4 tracking-widest uppercase ${dark ? 'bg-[#FF8C00] text-black' : 'bg-[#CCFF00] text-black'}`}
    >
      <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
      {subtitle}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] ${dark ? 'text-white' : 'text-black'}`}
    >
      {title}
    </motion.h2>
  </div>
);
