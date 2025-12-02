import { useQuery } from "@tanstack/react-query";
import type { Project } from "../types/main.types";
import { SectionHeader } from "./section-header";
import { BrutalButton } from "./button";
import { ArrowRight } from "lucide-react";
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
        imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138ed1cb?auto=format&fit=crop&w=1600&q=80",
        tags: ["TypeScript", "Next.js", "Drizzle ORM", "PostgreSQL", "Node.js", "Electron", "SAFT-AO", "Zod", "Tailwind"],
      },
      {
        id: "2",
        title: "InstantPay",
        category: "Payment Gateway",
        description: "Gateway de pagamentos nacional em construção com arquitetura de micro-serviços. Suporte a Multicaixa Express, EMIS Pay, transferências bancárias, carteiras móveis e QR dinâmico. Foco em alta disponibilidade, reconciliação automática e webhooks em tempo real.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=1600&q=80",
        tags: ["Go", "TypeScript", "PostgreSQL", "NATS", "Docker", "Kubernetes", "Redis", "gRPC", "REST"],
      }
    ];
  };

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <section id="portfolio" className="py-24 px-6 bg-black text-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <SectionHeader title="Trabalhos Recentes" subtitle="Portfolio" dark align="left" />

        <div className="grid gap-28">
          {isLoading ? (
            <div className="text-center py-32 font-mono text-2xl animate-pulse text-[#CCFF00]">
              [ ESTAMOS A CARREGAR OS SERVIDORES... ]
            </div>
          ) : (
            projects?.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 lg:gap-20 items-center group`}
              >

                {/* Imagem com offset brutalista */}
                <div className="w-full md:w-3/5 relative">
                  <div className="absolute inset-0 bg-[#CCFF00] translate-x-4 translate-y-4 -z-10"></div>
                  <div className="absolute inset-0 bg-[#FF4D00] translate-x-6 translate-y-6 -z-20 hidden lg:block"></div>
                  
                  <div className="relative border-4 border-white overflow-hidden bg-gray-900 group-hover:-translate-y-3 transition-all duration-500 h-80 md:h-[520px]">
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10 opacity-60" />

                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="w-full md:w-2/5 space-y-8">
                  <div className="flex items-center gap-6">
                    <span className="text-[#CCFF00] font-black text-8xl opacity-30 leading-none">
                      0{i + 1}
                    </span>
                    <div>
                      <span className="bg-white text-black px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-5xl md:text-6xl font-black uppercase leading-none tracking-tighter">
                    {p.title}
                  </h3>

                  <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {p.tags.map(tech => (
                      <span
                        key={tech}
                        className="px-4 py-2 border border-gray-600 text-xs font-mono uppercase tracking-wider hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <BrutalButton variant="outline" icon={ArrowRight}>
                      Case Study Completo
                    </BrutalButton>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};