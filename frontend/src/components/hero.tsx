import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { Typewriter } from "../utils/type-writer";
import { BrutalButton } from "./button";
import { ArrowRight, Code, Sparkles, Zap } from "lucide-react";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  
  // Fade APENAS para os elementos decorativos (não para o conteúdo principal)
  const decorativeOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Smooth spring animation for parallax
  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#F4F4F4]">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ 
        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
        backgroundSize: '40px 40px' 
      }} />

      {/* Floating Decorative Elements - COM FADE */}
      <motion.div
        style={{ opacity: decorativeOpacity }}
        className="absolute top-20 left-10 w-20 h-20 border-4 border-[#CCFF00] opacity-20"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        style={{ opacity: decorativeOpacity }}
        className="absolute bottom-20 right-20 w-16 h-16 bg-[#FF4D00] opacity-10"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, -180, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* CONTEÚDO PRINCIPAL - SEM FADE! */}
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
            <span className="px-3 py-1 bg-black text-white text-xs font-mono font-bold uppercase">
              Luanda, AO
            </span>
            <motion.span 
              className="w-2 h-2 bg-[#006C93] rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-sm font-bold uppercase text-gray-500">
              Since 2024
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
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
            <Typewriter words={['BRUTAL.', 'MODERNA.', 'RÁPIDA.', 'ESCALÁVEL.']} />
          </h1>
          
          {/* Description */}
          <motion.p 
            className="text-xl text-black font-medium max-w-md mb-10 border-l-4 border-black pl-6 py-2 leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            Nós não fazemos apenas sites. Nós construímos 
            <span className="font-black text-[#FF4D00]"> sistemas escaláveis</span> que 
            impulsionam o mercado Angolano.
          </motion.p>

          {/* Stats Cards - SEMPRE VISÍVEIS */}
          <motion.div 
            className="grid grid-cols-3 gap-4 mb-10 max-w-md"
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
                className="text-center p-4 bg-white border-2 border-black group hover:bg-black hover:text-white transition-all cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "4px 4px 0px 0px #FF4D00"
                }}
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-[#006C93] group-hover:text-[#CCFF00]" />
                <div className="text-2xl font-black text-[#006C93] group-hover:text-[#CCFF00]">
                  {stat.value}
                </div>
                <div className="text-xs font-mono uppercase text-gray-600 group-hover:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - SEMPRE VISÍVEIS */}
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

          {/* Trust Badge - SEMPRE VISÍVEL */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <Sparkles size={20} className="text-[#CCFF00]" />
            <span className="text-sm font-mono text-gray-600">
              Confiado por <span className="font-bold text-black">Startups Angolanas</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ y: smoothY }} 
          className="hidden md:flex justify-center items-center relative h-[600px] w-full"
        >
          <div className="relative w-full max-w-md aspect-square">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[3px] border-dashed border-gray-300 rounded-full"
            />
            
            {/* Middle Ring */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border-[3px] border-black rounded-full"
            />
            
            {/* Inner Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-16 border-2 border-[#FF4D00] rounded-full opacity-50"
            />

            {/* Orbiting Dots */}
            {[0, 120, 240].map((angle, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-[#CCFF00] border-2 border-black rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-8px',
                  marginLeft: '-8px'
                }}
                animate={{
                  x: [
                    Math.cos((angle * Math.PI) / 180) * 150,
                    Math.cos(((angle + 360) * Math.PI) / 180) * 150
                  ],
                  y: [
                    Math.sin((angle * Math.PI) / 180) * 150,
                    Math.sin(((angle + 360) * Math.PI) / 180) * 150
                  ]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3
                }}
              />
            ))}
            
            {/* Center Status Card */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_#006C93] w-72"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5
              }}
            >
              <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
                <span className="font-mono text-xs font-bold">SERVER STATUS</span>
                <motion.div 
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.5, 1] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span>UPTIME</span>
                  <motion.span 
                    className="font-bold text-green-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    99.99%
                  </motion.span>
                </div>
                
                <div className="flex justify-between">
                  <span>LATENCY</span>
                  <motion.span 
                    className="font-bold text-blue-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    24ms
                  </motion.span>
                </div>
                
                <div className="flex justify-between">
                  <span>REQUESTS</span>
                  <motion.span 
                    className="font-bold text-purple-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    12k/s
                  </motion.span>
                </div>
                
                {/* Animated Progress Bar */}
                <div className="h-2 bg-gray-200 mt-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-linear-to-r bg-black" 
                    animate={{ width: ["40%", "80%", "50%"] }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>

              {/* Live Indicator */}
              <motion.div 
                className="mt-4 flex items-center gap-2 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase">Live Monitoring</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};