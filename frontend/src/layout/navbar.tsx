import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SoftwiseLogo } from "../components/logo";
import { BrutalButton } from "../components/button";
import { Menu, X } from "lucide-react";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-black flex justify-between items-center px-6 py-4">
        <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <SoftwiseLogo className="h-10" />
        </div>

        <div className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-wide items-center">
          {['Portfolio', 'Serviços', 'Stack'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase())}
              className="hover:text-[#FF4D00] hover:underline decoration-4 underline-offset-4 transition-all"
            >
              {item}
            </button>
          ))}
          <BrutalButton variant="primary" className="py-2 px-6 text-xs shadow-[2px_2px_0px_0px_black]" onClick={() => scrollToSection('contato')}>
            Vamos Conversar
          </BrutalButton>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsOpen(true)}>
          <Menu size={32} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-60 flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-6 right-6 text-white hover:text-[#FF4D00] transition-colors" onClick={() => setIsOpen(false)}>
              <X size={48} />
            </button>
            <SoftwiseLogo theme="dark" className="h-16 mb-8" />
            {['Portfolio', 'Serviços', 'Stack', 'Contato'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-5xl font-black text-white hover:text-[#CCFF00] hover:translate-x-4 transition-all uppercase"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
