import type { SectionHeaderProps } from "../types/main.types";
import { motion } from "framer-motion";

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  align = "left", 
  dark = false 
}) => (
  <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
    <motion.div 
      initial={{ opacity: 0, x: align === "center" ? 0 : -20, y: align === "center" ? -20 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-2 px-3 py-1 border-2 border-black font-mono text-xs font-bold mb-4 tracking-widest uppercase ${dark ? 'bg-[#FF8C00] text-black' : 'bg-[#CCFF00] text-black'}`}
    >
      <motion.span 
        className="w-2 h-2 bg-black rounded-full"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {subtitle}
    </motion.div>

    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.6 }}
      className={`text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.9] ${dark ? 'text-white' : 'text-black'}`}
    >
      {title.split(' ').map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
          className="inline-block mr-4"
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>

    <motion.div
      className={`mt-4 h-1 ${dark ? 'bg-[#CCFF00]' : 'bg-[#006C93]'}`}
      initial={{ width: 0 }}
      whileInView={{ width: align === "center" ? "200px" : "100px" }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.8 }}
      style={{ 
        marginLeft: align === "center" ? "auto" : 0,
        marginRight: align === "center" ? "auto" : 0
      }}
    />
  </div>
);
