import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Typewriter } from "../utils/type-writer";
import { BrutalButton } from "./button"; // Assumindo que já tens este
import { ArrowRight, Code, Sparkles, Zap } from "lucide-react";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  
  // Fade apenas para elementos decorativos
  const decorativeOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-30 overflow-hidden bg-[#F4F4F4]">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ 
        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
        backgroundSize: '40px 40px' 
      }} />

      {/* Floating Decorative Elements */}
      <motion.div
        style={{ opacity: decorativeOpacity }}
        className="absolute top-20 left-10 w-20 h-20 border-4 border-[#CCFF00] opacity-20 hidden md:block"
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* CONTEÚDO PRINCIPAL */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Location Badge */}
          <motion.div 
            className="flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="px-3 py-1 bg-black text-white text-[10px] md:text-xs font-mono font-bold uppercase">
              Luanda, AO
            </span>
            <motion.span 
              className="w-2 h-2 bg-[#006C93] rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter mb-8">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              SOFTWARE
            </motion.span>
            <br/>
            <motion.span 
              className="text-[#006C93]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              HOUSE
            </motion.span>
            <br/>
            
            {/* SOLUÇÃO DO LAYOUT SHIFT AQUI */}
            {/* Definimos min-h-[1em] para reservar a altura da linha mesmo vazia */}
            <span className="text-[#FF4D00] block min-h-[1em] min-w-[300px]">
               <Typewriter words={['BRUTAL.', 'MODERNA.', 'RÁPIDA.', 'ESCALÁVEL.']} />
            </span>
          </h1>
          
          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-black font-medium max-w-md mb-10 border-l-4 border-black pl-6 py-2 leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
           Construímos <span className="font-black text-[#FF4D00]"> infraestruturas digitais escaláveis</span> para impulsionar o crescimento sustentável do mercado angolano.
          </motion.p>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-3 gap-2 md:gap-4 mb-10 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {[
              { value: "50+", label: "Projectos", icon: Zap },
              { value: "99%", label: "Satisfação", icon: Sparkles },
              { value: "24/7", label: "Suporte", icon: Code }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center p-3 md:p-4 bg-white border-2 border-black group hover:bg-black hover:text-white transition-all cursor-default"
                whileHover={{ y: -5, boxShadow: "4px 4px 0px 0px #FF4D00" }}
              >
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-[#006C93] group-hover:text-[#CCFF00]" />
                <div className="text-xl md:text-2xl font-black text-[#006C93] group-hover:text-[#CCFF00]">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs font-mono uppercase text-gray-600 group-hover:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <BrutalButton 
              icon={ArrowRight} 
              onClick={() => document.getElementById('contato')?.scrollIntoView({behavior:'smooth'})}
            >
              Iniciar Projecto
            </BrutalButton>
            <BrutalButton 
              variant="secondary" 
              icon={Code} 
              onClick={() => document.getElementById('stack')?.scrollIntoView({behavior:'smooth'})}
            >
              Nossa Stack
            </BrutalButton>
          </motion.div>
        </motion.div>

        {/* Visual 3D Orbit - Hidden on Mobile to save space */}
        <motion.div 
          style={{ y: smoothY }} 
          className="hidden md:flex justify-center items-center relative h-[600px] w-full"
        >
          {/* O código do Visual 3D permanece o mesmo, é excelente */}
           <div className="relative w-full max-w-md aspect-square">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[3px] border-dashed border-gray-300 rounded-full"
            />
             <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_#006C93] w-72"
            >
               <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
                <span className="font-mono text-xs font-bold">SERVER STATUS</span>
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                />
              </div>
              <div className="space-y-2 font-mono text-xs">
                 <div className="flex justify-between"><span>UPTIME</span><span className="font-bold text-green-600">99.99%</span></div>
                 <div className="h-2 bg-gray-200 mt-2 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-black" animate={{ width: ["40%", "80%", "50%"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut"}} />
                </div>
              </div>
            </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};