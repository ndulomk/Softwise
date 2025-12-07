import { useQuery } from "@tanstack/react-query";
import type { Project } from "../types/main.types";
import { SectionHeader } from "./section-header";
import { BrutalButton } from "./button";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

export const Projects = () => {
  const fetchProjects = async (): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
      {
        id: "1",
        title: "Fanito",
        category: "ERP / Fintech",
        description: "Sistema completo de facturação certificado pela AGT com exportação SAFT-PT/AO, gestão avançada de stock (lotes, séries, vencimentos, multi-armazém), controlo de despesas, contas correntes, reconciliação bancária automática e POS integrado.",
        imageUrl: "/fanito.png",
        tags: ["TypeScript", "Next.js", "Drizzle ORM", "PostgreSQL", "Node.js", "Electron", "SAFT-AO", "Zod", "Tailwind"],
        metrics: {
          users: "50+",
          uptime: "99.9%",
          performance: "A+"
        }
      },
      {
        id: "2",
        title: "InstantPay",
        category: "Payment Gateway",
        description: "Gateway de pagamentos nacional em construção com arquitetura de micro-serviços. Suporte a transferências bancárias, carteiras móveis e QR dinâmico. Foco em alta disponibilidade, reconciliação automática e webhooks em tempo real.",
        imageUrl: "/instant.jpg",
        tags: ["Go", "TypeScript", "PostgreSQL", "Docker", "Kubernetes", "Redis", "gRPC", "REST"],
        metrics: {
          transactions: "1k+",
          uptime: "99.99%",
          latency: "<100ms"
        }
      }
    ];
  };

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <section id="portfolio" className="py-24 px-6 bg-black text-white overflow-hidden relative">
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border-4 border-[#CCFF00] opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute bottom-40 left-10 w-24 h-24 bg-[#FF4D00] opacity-5"
        animate={{ 
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <SectionHeader 
          title="Trabalhos Recentes" 
          subtitle="Portfolio" 
          dark 
          align="left" 
        />

        <div className="grid gap-28">
          {isLoading ? (
            <motion.div 
              className="text-center py-32 font-mono text-2xl text-[#CCFF00]"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⚙️
                </motion.span>
                [ CARREGANDO PROJECTOS... ]
              </div>
            </motion.div>
          ) : (
            projects?.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-20 items-center group`}
              >
                {/* Image Section */}
                <div className="w-full md:w-3/5 relative">
                  {/* Shadow Layers */}
                  <motion.div 
                    className="absolute inset-0 bg-[#CCFF00] translate-x-4 translate-y-4 -z-10"
                    whileHover={{ scale: 1.02 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-[#FF4D00] translate-x-6 translate-y-6 -z-20 hidden lg:block"
                    whileHover={{ scale: 1.03 }}
                  />
                  
                  <motion.div 
                    className="relative border-4 border-white overflow-hidden bg-gray-900 h-80 md:h-[520px]"
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10 opacity-60" />

                    <motion.img
                      src={p.imageUrl}
                      alt={`${p.title} - Projeto Softwise Angola`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                      loading="lazy"
                    />

                    {/* Hover Overlay with Metrics */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="flex gap-4">
                        {Object.entries(p.metrics || {}).map(([key, value]) => (
                          <motion.div 
                            key={key} 
                            className="bg-black/80 backdrop-blur-sm px-4 py-2 border border-[#CCFF00]"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="text-[#CCFF00] text-xs font-mono uppercase">{key}</div>
                            <div className="text-white font-black text-lg">{value}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Info Section */}
                <div className="w-full md:w-2/5 space-y-8">
                  <div className="flex items-center gap-6">
                    <motion.span 
                      className="text-[#CCFF00] font-black text-8xl opacity-30 leading-none"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    >
                      0{i + 1}
                    </motion.span>
                    <motion.span 
                      className="bg-white text-black px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider inline-block"
                      whileHover={{ 
                        backgroundColor: "#FF4D00",
                        color: "white",
                        scale: 1.05
                      }}
                    >
                      {p.category}
                    </motion.span>
                  </div>

                  <motion.h3 
                    className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter"
                    whileHover={{ color: "#CCFF00" }}
                  >
                    {p.title}
                  </motion.h3>

                  <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {p.tags.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-2 border border-gray-600 text-xs font-mono uppercase tracking-wider cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + techIndex * 0.05 }}
                        whileHover={{ 
                          borderColor: "#CCFF00",
                          color: "#CCFF00",
                          scale: 1.05,
                          backgroundColor: "rgba(204, 255, 0, 0.1)"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <BrutalButton 
                      variant="dark" 
                      icon={ArrowRight}
                    >
                      Ver Caso de Estudo
                    </BrutalButton>
                    
                    <motion.button
                      className="px-4 py-2 border-2 border-gray-600 text-gray-400 font-mono text-xs uppercase flex items-center gap-2 hover:border-white hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                      Demo
                    </motion.button>

                    <motion.button
                      className="px-4 py-2 border-2 border-gray-600 text-gray-400 font-mono text-xs uppercase flex items-center gap-2 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      Code
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>

        {/* CTA Final */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-xl mb-6 font-mono">
            Quer ver mais projectos?
          </p>
          <BrutalButton 
            variant="dark"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Vamos Conversar
          </BrutalButton>
        </motion.div>
      </div>
    </section>
  );
};