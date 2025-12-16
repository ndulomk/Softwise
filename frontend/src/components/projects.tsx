import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from '../data';

export const Projects = () => {
  
  return (
    <section id="portfolio" className="py-32 px-6 bg-black text-white relative">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-24 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Selected Works</h2>
            <p className="text-white/40 font-mono text-sm">[ 2024 — 2025 ]</p>
        </div>

        <div className="flex flex-col gap-32">
            {projectsData.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  
                  {/* Texto */}
                  <div className="md:col-span-4 flex flex-col justify-between h-full pt-4">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-white/40 font-mono text-xs">
                           <span>0{i + 1}</span>
                           <span className="h-px w-8 bg-white/20"></span>
                           <span className="uppercase tracking-widest">{p.category}</span>
                        </div>

                        {/* Título com Link */}
                        <Link to={`/work/${p.id}`}>
                            <h3 className="text-3xl font-medium text-white group-hover:text-white/80 transition-colors cursor-pointer flex items-center gap-2">
                            {p.title}
                            </h3>
                        </Link>

                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                          {p.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-4">
                          {p.tags.map((tech) => (
                            <span key={tech} className="text-xs text-white/30 font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                    </div>
                  </div>

                  {/* Imagem com Link */}
                  <div className="md:col-span-8 relative">
                    <Link to={`/work/${p.id}`}>
                        <div className="overflow-hidden bg-neutral-900 aspect-[16/10] relative cursor-pointer">
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 z-10 transition-colors duration-500" />
                            <motion.img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                            />
                            <div className="absolute bottom-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                <button className="bg-white text-black px-6 py-3 text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-neutral-200 transition-colors">
                                    Ver Detalhes <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
        </div>
      </div>
    </section>
  );
};