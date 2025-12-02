import { motion, useScroll, useSpring, } from 'framer-motion';
import {  Code, Database, Layers, MessageSquare, Globe, Zap, Smartphone, ServerCrash,
  Cpu,
  Palette,
  Container
} from 'lucide-react';
import { Navbar } from './layout/navbar';
import { Hero } from './components/hero';
import { SectionHeader } from './components/section-header';
import { BrutalButton } from './components/button';
import { Projects } from './components/projects';
import { EnhancedContactForm } from './components/contact-form';
import { SoftwiseLogo } from './components/logo';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (

      <div className="font-sans text-black selection:bg-[#006C93] selection:text-white overflow-x-hidden bg-white">
        {/* Progress Bar */}
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

          <div id="serviços" className="py-24 px-6 bg-white relative">
             <div className="container mx-auto">
                <SectionHeader title="Nossas Especialidades" subtitle="O que fazemos" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {[
                     { title: "Web Apps", icon: Globe, desc: "Aplicações React de alta performance." },
                     { title: "Mobile", icon: Smartphone, desc: "Apps iOS e Android nativos." },
                     { title: "Backend", icon: ServerCrash, desc: "APIs robustas em Bun e Node." },
                     { title: "Design", icon: Layers, desc: "UI/UX focado em conversão." }
                   ].map((s, i) => (
                     <motion.div 
                        key={i} 
                        whileHover={{ y: -8, boxShadow: "12px 12px 0px 0px #FF4D00" }}
                        className="border-2 border-black p-8 transition-all cursor-default bg-white group relative overflow-hidden"
                      >
                        <div className="mb-6 w-16 h-16 bg-[#CCFF00] border-2 border-black flex items-center justify-center text-black group-hover:bg-[#FF4D00] group-hover:text-white transition-colors">
                          <s.icon size={32} />
                        </div>
                        <h3 className="font-black text-xl uppercase mb-2">{s.title}</h3>
                        <p className="text-gray-600 text-sm font-medium leading-relaxed">{s.desc}</p>
                     </motion.div>
                   ))}
                </div>
             </div>
          </div>

          <div id="stack" className="py-24 px-6 bg-[#CCFF00] border-t-4 border-black">
             <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2">
                  <SectionHeader title="Stack Moderna" subtitle="Tecnologia" />
                  <p className="text-xl font-bold mb-6">Usamos ferramentas que garantem velocidade e escalabilidade.</p>
                  <BrutalButton variant="outline" onClick={() => window.open('https://github.com', '_blank')}>Github da Softwise</BrutalButton>
                </div>
                <div className="w-full md:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                   {[
                    { name: "React", icon: Cpu }, 
                    { name: "Bun", icon: Zap }, 
                    { name: "TypeScript", icon: Code }, 
                    { name: "Tailwind", icon: Palette }, 
                    { name: "Postgres", icon: Database }, 
                    { name: "Docker", icon: Container }
                   ].map((tech, i) => (
                     <motion.div 
                       key={tech.name}
                       whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2, backgroundColor: "#FF4D00", color: "white", borderColor: "white" }}
                       className="bg-white border-2 border-black p-6 font-black text-center uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] flex flex-col items-center gap-3 transition-colors"
                     >
                       <tech.icon size={32} strokeWidth={2.5} />
                       <span>{tech.name}</span>
                     </motion.div>
                   ))}
                </div>
             </div>
          </div>

          <Projects />

          <section id="contato" className="relative py-24 px-6 bg-[#F4F4F4]">
            <div className="container mx-auto max-w-6xl">
              <div className="flex flex-col lg:flex-row gap-16">
                <div className="w-full lg:w-1/3">
                  <SectionHeader title="Vamos Construir?" subtitle="Contato" />
                  <p className="text-xl font-bold mb-8 text-gray-800">
                    Tem um desafio técnico ou uma ideia disruptiva? A nossa equipa está pronta.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase text-gray-500">Email</div>
                        <div className="font-bold text-lg">hello@softwise.ao</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase text-gray-500">Telefone</div>
                        <div className="font-bold text-lg">+244 923 000 000</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-2/3">
                  <EnhancedContactForm />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-black text-white pt-20 pb-10 px-6 border-t-4 border-[#FF4D00]">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
              <SoftwiseLogo theme="dark" className="h-12" />
              <div className="flex gap-6">
                 {['Linkedin', 'Instagram', 'Github'].map(social => (
                   <a key={social} href="#" className="font-bold uppercase hover:text-[#FF4D00] transition-colors underline underline-offset-4">{social}</a>
                 ))}
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between text-xs font-mono text-gray-500 uppercase">
              <p>&copy; 2025 Softwise Angola. Todos os direitos reservados.</p>
              <p>Código feito em Luanda.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}