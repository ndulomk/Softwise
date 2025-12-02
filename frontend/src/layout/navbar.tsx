import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { SoftwiseLogo } from "../components/logo";
import { BrutalButton } from "../components/button";
import { Menu, X, ArrowRight } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.9)", "rgba(255, 255, 255, 0.95)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['portfolio', 'serviços', 'stack', 'contato'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Serviços', id: 'serviços' },
    { name: 'Stack', id: 'stack' }
  ];

  const mobileNavItems = [
    { name: 'Portfolio', id: 'portfolio', delay: 0.1 },
    { name: 'Serviços', id: 'serviços', delay: 0.2 },
    { name: 'Stack', id: 'stack', delay: 0.3 },
    { name: 'Contato', id: 'contato', delay: 0.4 }
  ];

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 border-b-2 border-black transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
        style={{ 
          backgroundColor: scrolled ? backgroundColor : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SoftwiseLogo className={scrolled ? "h-9" : "h-10"} />
          </motion.div>

          <div className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-wide items-center">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative group ${
                  activeSection === item.id ? 'text-[#FF4D00]' : 'text-black'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{item.name}</span>
                
                {/* Underline Animation */}
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF4D00] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    scaleX: activeSection === item.id ? 1 : 0 
                  }}
                />

                <motion.span
                  className="absolute inset-0 bg-[#CCFF00] -z-10 opacity-0 group-hover:opacity-20"
                  initial={false}
                  whileHover={{ opacity: 0.2 }}
                />
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <BrutalButton 
                variant="primary" 
                className="py-2 px-6 text-xs shadow-[3px_3px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black]" 
                onClick={() => scrollToSection('contato')}
                icon={ArrowRight}
              >
                Vamos Conversar
              </BrutalButton>
            </motion.div>
          </div>

          <motion.button 
            className="md:hidden p-2 relative group"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Menu size={32} className="relative z-10" />
            </motion.div>
            
            <motion.div
              className="absolute inset-0 bg-[#FF4D00] rounded-full -z-10 opacity-0 group-hover:opacity-20"
              whileHover={{ scale: 1.2 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-60 flex flex-col items-center justify-center overflow-hidden"
          >
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 border-4 border-[#CCFF00] opacity-20"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <motion.div
              className="absolute bottom-20 right-10 w-24 h-24 bg-[#FF4D00] opacity-10"
              animate={{ 
                rotate: -360,
                y: [0, -30, 0]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Close Button */}
            <motion.button 
              className="absolute top-6 right-6 text-white p-2 group"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, rotate: -90, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={48} />
              <motion.div
                className="absolute inset-0 bg-[#FF4D00] rounded-full -z-10 opacity-0 group-hover:opacity-30"
                whileHover={{ scale: 1.5 }}
              />
            </motion.button>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <SoftwiseLogo theme="dark" className="h-16" />
            </motion.div>

            {/* Menu Items */}
            <div className="flex flex-col items-center gap-6 w-full px-8">
              {mobileNavItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-5xl font-black text-white hover:text-[#CCFF00] transition-all uppercase relative group w-full text-center"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ 
                    delay: item.delay,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    x: 20
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Number Prefix */}
                  <motion.span 
                    className="absolute -left-12 top-1/2 -translate-y-1/2 text-[#006C93] text-3xl font-mono opacity-40 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: item.delay + 0.2 }}
                  >
                    0{index + 1}
                  </motion.span>

                  {/* Text */}
                  <span className="relative z-10">{item.name}</span>

                  {/* Underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#CCFF00]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Arrow Icon */}
                  <motion.span
                    className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <ArrowRight size={40} className="text-[#FF4D00]" />
                  </motion.span>
                </motion.button>
              ))}
            </div>

            {/* Social Links */}
            <motion.div 
              className="absolute bottom-10 flex gap-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { name: 'LI', url: 'https://linkedin.com/company/softwise-angola' },
                { name: 'IG', url: 'https://instagram.com/softwise.ao' },
                { name: 'GH', url: 'https://github.com/softwise-angola' }
              ].map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-2 border-white text-white font-black flex items-center justify-center hover:bg-[#FF4D00] hover:border-[#FF4D00] transition-all font-mono text-sm"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 5
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="absolute top-20 right-8 text-right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-[#CCFF00] font-mono text-xs uppercase mb-2">
                Get in touch
              </div>
              <a 
                href="mailto:hello@softwise.ao"
                className="text-white font-bold text-sm hover:text-[#FF4D00] transition-colors block mb-1"
              >
                hello@softwise.ao
              </a>
              <a 
                href="tel:+244923000000"
                className="text-white font-bold text-sm hover:text-[#FF4D00] transition-colors block"
              >
                +244 923 000 000
              </a>
            </motion.div>

            {/* Decorative Text */}
            <motion.div
              className="absolute bottom-32 left-1/2 -translate-x-1/2 font-mono text-xs text-gray-600 uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Softwise Angola © 2025
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};