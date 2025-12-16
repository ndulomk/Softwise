import { motion, useScroll, useSpring } from 'framer-motion';
import { Code, Database, Layers, MessageSquare, Globe, Zap, Smartphone, ServerCrash, Cpu, Palette, Container, ArrowRight } from 'lucide-react';
import { Navbar } from './layout/navbar';
import { Hero } from './components/hero';
import { SectionHeader } from './components/section-header';
import { Projects } from './components/projects';
import { EnhancedContactForm } from './components/contact-form'; // Certifica que o caminho está certo
import { SoftwiseLogo } from './components/logo';
import { useEffect } from 'react';

// Hooks utilitários
function useSEO(title?: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
}

const technologies = [
  { name: "React / Next.js", icon: Cpu, desc: "Frontend Architecture" },
  { name: "Bun / Node", icon: Zap, desc: "High Performance Runtime" },
  { name: "TypeScript", icon: Code, desc: "Type Safety" },
  { name: "Tailwind", icon: Palette, desc: "Design System" },
  { name: "PostgreSQL", icon: Database, desc: "Relational Data" },
  { name: "Docker", icon: Container, desc: "Containerization" }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useSEO(
    'Softwise Angola | Desenvolvimento Web & Apps | Software House Luanda',
    'Softwise é a Software House líder em Angola. Desenvolvemos websites, apps mobile e sistemas de gestão com React, TypeScript e Bun.'
  );

  return (
    <div className="font-sans text-black selection:bg-[#006C93] selection:text-white overflow-x-hidden bg-white">
      {/* Barra de Progresso Superior */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#FF4D00] origin-left z-50"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Marquee Separator */}
        <div className="bg-[#FF4D00] py-4 md:py-6 border-y-4 border-black overflow-hidden relative -rotate-1 scale-[1.02] z-20">
          <motion.div 
            className="flex whitespace-nowrap text-xl md:text-3xl font-black uppercase tracking-tighter gap-8 md:gap-12 text-white"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 md:gap-12">
                <span>Alta Escalabilidade</span>
                <Database size={20} className="text-black md:w-6 md:h-6" />
                <span>Código Limpo</span>
                <Code size={20} className="text-black md:w-6 md:h-6" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Serviços Section */}
        <section id="serviços" className="py-16 md:py-24 px-4 md:px-6 bg-white relative">
          <div className="container mx-auto max-w-7xl">
            <SectionHeader title="Nossas Especialidades" subtitle="O que fazemos" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[
                { 
                  title: "Web Apps", 
                  icon: Globe, 
                  desc: "Aplicações React de alta performance com SSR e otimização SEO.",
                  color: "#006C93"
                },
                { 
                  title: "Mobile", 
                  icon: Smartphone, 
                  desc: "Apps iOS e Android nativos com React Native e Flutter.",
                  color: "#FF4D00"
                },
                { 
                  title: "Backend", 
                  icon: ServerCrash, 
                  desc: "APIs robustas em Bun, Node.js e Go com arquitetura escalável.",
                  color: "#CCFF00"
                },
                { 
                  title: "Design", 
                  icon: Layers, 
                  desc: "UI/UX focado em conversão e experiência do usuário.",
                  color: "#FF8C00"
                }
              ].map((s, i) => (
                <motion.article
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -8, 
                    boxShadow: "8px 8px 0px 0px #FF4D00", // Sombra ajustada
                    transition: { duration: 0.3 }
                  }}
                  className="border-2 border-black p-6 md:p-8 transition-all cursor-pointer bg-white group relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                    style={{ backgroundColor: s.color }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="mb-6 w-14 h-14 md:w-16 md:h-16 bg-[#CCFF00] border-2 border-black flex items-center justify-center text-black transition-all duration-300"
                      whileHover={{ 
                        backgroundColor: "#FF4D00",
                        rotate: 5,
                        scale: 1.1
                      }}
                    >
                      <s.icon size={28} className="md:w-8 md:h-8" strokeWidth={2.5} />
                    </motion.div>
                    
                    <h3 className="font-black text-xl uppercase mb-3 group-hover:text-[#006C93] transition-colors">
                      {s.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Stack Section - Refinada Mobile */}
        <section id="stack" className="py-20 md:py-32 px-4 md:px-6 bg-black text-white relative border-t border-white/10">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              
              <motion.div 
                className="w-full lg:w-1/3 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div>
                  <span className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4 block">
                    [ Tecnologia ]
                  </span>
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
                    Modern Stack
                  </h2>
                  
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    Adotamos tecnologias de ponta para maximizar 
                    <span className="text-white"> velocidade</span>
                    <span className="text-white"> escalabilidade</span> e 
                    <span className="text-white"> eficiência operacional</span>.
                  </p>
                </div>

                <div>
                    <a 
                      href="https://github.com/softwise-angola" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors group"
                    >
                      Github da Softwise
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
              </motion.div>
              
              <div className="w-full lg:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-3 border-l border-t border-white/10">
                  {technologies.map((tech, i) => (
                    <motion.div 
                      key={tech.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="group relative border-r border-b border-white/10 p-6 md:p-12 hover:bg-white/5 transition-colors duration-500 cursor-default"
                    >
                      <div className="mb-4 md:mb-6 text-white/40 group-hover:text-white transition-colors duration-500">
                        <tech.icon strokeWidth={1.5} size={28} className="md:w-8 md:h-8" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-white tracking-wide">
                            {tech.name}
                        </div>
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest group-hover:text-white/50 transition-colors">
                            {tech.desc}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Projectos Component (Assume que consome o projectsData atualizado) */}
        <Projects />

        {/* Contacto e Footer */}
        <section id="contato" className="relative py-16 md:py-24 px-4 md:px-6 bg-[#F4F4F4]">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              
              {/* Informação de Contacto */}
              <motion.div 
                className="w-full lg:w-1/3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SectionHeader title="Vamos Construir?" subtitle="Contato" />
                
                <p className="text-lg md:text-xl font-bold mb-8 text-gray-800 leading-relaxed mt-6">
                  Tem um desafio técnico ou uma ideia disruptiva? 
                  <span className="text-[#FF4D00]"> A nossa equipa está pronta</span>.
                </p>
                
                <div className="space-y-6">
                  {/* Email */}
                  <motion.div 
                    className="flex items-center gap-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-black text-white flex items-center justify-center rounded-full group-hover:bg-[#006C93] transition-colors shrink-0">
                      <MessageSquare size={18} className="md:w-5 md:h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold uppercase text-gray-500">Email Comercial</div>
                      <a href="mailto:geral@softwise-investments.com" className="font-bold text-base md:text-lg hover:text-[#006C93] transition-colors break-words">
                        geral@softwise-investments.com
                      </a>
                    </div>
                  </motion.div>
                  
                  {/* Telefone */}
                  <motion.div 
                    className="flex items-center gap-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-black text-white flex items-center justify-center rounded-full group-hover:bg-[#FF4D00] transition-colors shrink-0">
                      <Smartphone size={18} className="md:w-5 md:h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-gray-500">Telefone</div>
                      <a href="tel:+244922293555" className="font-bold text-base md:text-lg hover:text-[#FF4D00] transition-colors">
                        +244 922 293 555
                      </a>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  className="mt-8 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-xs font-bold uppercase text-gray-500 mb-2">Horário (Luanda)</div>
                  <div className="font-mono text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Segunda - Sexta</span>
                      <span className="font-bold">08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Sábado</span>
                      <span>10:00 - 14:00</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Formulário Funcional */}
              <motion.div 
                className="w-full lg:w-2/3"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <EnhancedContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white pt-16 md:pt-20 pb-10 px-6 border-t-4 border-[#FF4D00]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SoftwiseLogo theme="dark" className="h-10 md:h-12 mb-4" />
              <p className="text-gray-400 max-w-md font-mono text-sm">
                Construindo o futuro digital de Angola, uma linha de código por vez.
              </p>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              {[
                { name: 'LinkedIn', url: 'https://linkedin.com/company/softwise-angola' },
                { name: 'Instagram', url: 'https://instagram.com/softwise.ao' },
                { name: 'Github', url: 'https://github.com/softwise-angola' }
              ].map((social, i) => (
                <motion.a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold uppercase hover:text-[#FF4D00] transition-colors underline underline-offset-4 text-sm md:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between text-[10px] md:text-xs font-mono text-gray-500 uppercase gap-4">
            <p>&copy; 2025 Softwise Investments. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <span>Código feito em Luanda</span>
              <span className="text-[#CCFF00]">●</span>
              <span>Made with ❤️</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}