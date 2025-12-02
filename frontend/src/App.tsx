import { motion, useScroll, useSpring } from 'framer-motion';
import { Code, Database, Layers, MessageSquare, Globe, Zap, Smartphone, ServerCrash, Cpu, Palette, Container } from 'lucide-react';
import { Navbar } from './layout/navbar';
import { Hero } from './components/hero';
import { SectionHeader } from './components/section-header';
import { BrutalButton } from './components/button';
import { Projects } from './components/projects';
import { EnhancedContactForm } from './components/contact-form';
import { SoftwiseLogo } from './components/logo';
import { useEffect } from 'react';

function useSEO(title?: string, description?: string) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }

    if (window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: window.location.pathname
      });
    }
  }, [title, description]);
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useSEO(
    'Softwise Angola | Desenvolvimento Web & Apps | Software House Luanda',
    'Softwise é a Software House líder em Angola. Desenvolvemos websites, apps mobile e sistemas de gestão com React, TypeScript e Bun. Solicite orçamento!'
  );

  return (
    <div className="font-sans text-black selection:bg-[#006C93] selection:text-white overflow-x-hidden bg-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#FF4D00] origin-left z-100"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        
        <div className="bg-[#FF4D00] py-6 border-y-4 border-black overflow-hidden relative -rotate-1 scale-[1.02] z-20">
          <motion.div 
            className="flex whitespace-nowrap text-3xl font-black uppercase tracking-tighter gap-12 text-white"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-12">
                <span>Alta Escalabilidade</span>
                <Database size={24} className="text-black" />
                <span>Código Limpo</span>
                <Code size={24} className="text-black" />
              </div>
            ))}
          </motion.div>
        </div>

        <section id="serviços" className="py-24 px-6 bg-white relative">
          <div className="container mx-auto max-w-7xl">
            <SectionHeader title="Nossas Especialidades" subtitle="O que fazemos" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    boxShadow: "12px 12px 0px 0px #FF4D00",
                    transition: { duration: 0.3 }
                  }}
                  className="border-2 border-black p-8 transition-all cursor-pointer bg-white group relative overflow-hidden"
                >
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                    style={{ backgroundColor: s.color }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="mb-6 w-16 h-16 bg-[#CCFF00] border-2 border-black flex items-center justify-center text-black transition-all duration-300"
                      whileHover={{ 
                        backgroundColor: "#FF4D00",
                        rotate: 5,
                        scale: 1.1
                      }}
                    >
                      <s.icon size={32} strokeWidth={2.5} />
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

        <section id="stack" className="py-24 px-6 bg-[#CCFF00] border-t-4 border-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }} />
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                className="w-full md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SectionHeader title="Stack Moderna" subtitle="Tecnologia" />
                
                <p className="text-xl font-bold mb-6 leading-relaxed max-w-lg">
                  Usamos as ferramentas mais modernas do mercado para garantir 
                  <span className="text-[#006C93]"> velocidade</span>, 
                  <span className="text-[#FF4D00]"> escalabilidade</span> e 
                  <span className="text-black"> performance</span>.
                </p>
                
                <BrutalButton 
                  variant="outline" 
                  onClick={() => window.open('https://github.com/softwise-angola', '_blank')}
                >
                  Github da Softwise
                </BrutalButton>
              </motion.div>
              
              <div className="w-full md:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: "React", icon: Cpu, desc: "UI Library" }, 
                  { name: "Bun", icon: Zap, desc: "Runtime" }, 
                  { name: "TypeScript", icon: Code, desc: "Language" }, 
                  { name: "Tailwind", icon: Palette, desc: "CSS" }, 
                  { name: "Postgres", icon: Database, desc: "Database" }, 
                  { name: "Docker", icon: Container, desc: "Container" }
                ].map((tech, i) => (
                  <motion.div 
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: i % 2 === 0 ? 3 : -3,
                      backgroundColor: "#FF4D00", 
                      color: "white",
                      borderColor: "white",
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white border-2 border-black p-6 font-black text-center uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center gap-3 transition-all cursor-pointer group"
                  >
                    <tech.icon size={32} strokeWidth={2.5} className="group-hover:animate-pulse" />
                    <div>
                      <div className="text-base">{tech.name}</div>
                      <div className="text-[10px] font-mono opacity-60">{tech.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Projects />

        <section id="contato" className="relative py-24 px-6 bg-[#F4F4F4]">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-16">
              <motion.div 
                className="w-full lg:w-1/3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SectionHeader title="Vamos Construir?" subtitle="Contato" />
                
                <p className="text-xl font-bold mb-8 text-gray-800 leading-relaxed">
                  Tem um desafio técnico ou uma ideia disruptiva? 
                  <span className="text-[#FF4D00]"> A nossa equipa está pronta</span>.
                </p>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-center gap-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full group-hover:bg-[#006C93] transition-colors">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-gray-500">Email</div>
                      <a href="mailto:hello@softwise.ao" className="font-bold text-lg hover:text-[#006C93] transition-colors">
                        hello@softwise.ao
                      </a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-4 group cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full group-hover:bg-[#FF4D00] transition-colors">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-gray-500">Telefone</div>
                      <a href="tel:+244923000000" className="font-bold text-lg hover:text-[#FF4D00] transition-colors">
                        +244 923 000 000
                      </a>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  className="mt-8 p-4 bg-white border-2 border-black"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-xs font-bold uppercase text-gray-500 mb-2">Horário</div>
                  <div className="font-mono text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Segunda - Sexta</span>
                      <span className="font-bold">08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Sábado</span>
                      <span>Fechado</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

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

      <footer className="bg-black text-white pt-20 pb-10 px-6 border-t-4 border-[#FF4D00]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SoftwiseLogo theme="dark" className="h-12 mb-4" />
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
                  className="font-bold uppercase hover:text-[#FF4D00] transition-colors underline underline-offset-4"
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
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between text-xs font-mono text-gray-500 uppercase gap-4">
            <p>&copy; 2025 Softwise Angola. Todos os direitos reservados.</p>
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