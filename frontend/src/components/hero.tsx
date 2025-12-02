import { useScroll, useTransform, motion } from "framer-motion";
import { Typewriter } from "../utils/type-writer";
import { BrutalButton } from "./button";
import { ArrowRight, Code } from "lucide-react";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F4F4F4]">
      <div className="absolute inset-0 opacity-[0.05]" style={{ 
        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
        backgroundSize: '40px 40px' 
      }}></div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-black text-white text-xs font-mono font-bold uppercase">Luanda, AO</span>
            <span className="w-2 h-2 bg-[#006C93] rounded-full"></span>
            <span className="font-mono text-sm font-bold uppercase text-gray-500">Since 2024</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
            SOFTWARE <br/>
            <span className="text-[#006C93]">HOUSE</span> <br/>
            <Typewriter words={['BRUTAL.', 'MODERNA.', 'RÁPIDA.', 'ESCALÁVEL.']} />
          </h1>
          
          <p className="text-xl text-black font-medium max-w-md mb-10 border-l-4 border-black pl-6 py-2 leading-relaxed">
            Nós não fazemos apenas sites. Nós construímos sistemas escaláveis que impulsionam o mercado Angolano.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <BrutalButton icon={ArrowRight} onClick={() => document.getElementById('contato')?.scrollIntoView({behavior:'smooth'})}>
              Iniciar Projecto
            </BrutalButton>
            <BrutalButton variant="secondary" icon={Code} onClick={() => document.getElementById('stack')?.scrollIntoView({behavior:'smooth'})}>
              Nossa Stack
            </BrutalButton>
          </div>
        </motion.div>

        {/* Abstract Tech Visual */}
        <motion.div style={{ y }} className="hidden md:flex justify-center items-center relative h-[600px] w-full">
           <div className="relative w-full max-w-md aspect-square">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border-[3px] border-dashed border-gray-300 rounded-full"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute inset-8 border-[3px] border-black rounded-full"
             />
             
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_#006C93] w-64">
                <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
                  <span className="font-mono text-xs font-bold">SERVER STATUS</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between"><span>UPTIME</span><span className="font-bold">99.99%</span></div>
                  <div className="flex justify-between"><span>LATENCY</span><span className="font-bold">24ms</span></div>
                  <div className="flex justify-between"><span>REQUESTS</span><span className="font-bold">12k/s</span></div>
                  <div className="h-2 bg-gray-200 mt-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#FF4D00]" 
                      animate={{ width: ["40%", "80%", "50%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};
