import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { projectsData } from '../data';

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === id);

  useEffect(() => {
    if (!project) navigate("/");
    window.scrollTo(0, 0);
  }, [id, project, navigate]);

  // Barra de progresso de leitura (Brutal style)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  if (!project) return null;

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-[#CCFF00] selection:text-black overflow-x-hidden">
      
      {/* Barra de Progresso Superior */}
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-black origin-left z-[60]" style={{ scaleX }} />

      {/* Navegação - Floating & Brutal */}
      <nav className="fixed top-8 left-6 right-6 flex justify-between items-start z-50 pointer-events-none">
        <Link 
            to="/" 
            className="pointer-events-auto bg-black text-white px-4 py-2 font-mono text-sm uppercase font-bold hover:bg-[#FF4D00] transition-colors flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          <ArrowLeft size={16} /> Voltar
        </Link>
        
        <div className="pointer-events-auto bg-white border-2 border-black px-4 py-2 font-mono text-xs font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {project.year} — {project.category}
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <header className="pt-40 px-6 container mx-auto max-w-7xl min-h-[80vh] flex flex-col justify-between border-x-2 border-transparent md:border-black/5">
            <div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                >
                    <span className="font-mono text-xs font-bold bg-[#CCFF00] px-2 py-1 border border-black mb-4 inline-block">
                        CASE STUDY 00{project.id === 'toycity' ? '1' : '2'}
                    </span>
                    <h1 className="text-6xl md:text-[8rem] leading-[0.85] font-black tracking-tighter uppercase mb-8">
                        {project.title}
                    </h1>
                </motion.div>
                
                <div className="flex flex-col md:flex-row gap-12 border-t-2 border-black pt-8 mt-12">
                    <p className="text-xl md:text-2xl font-medium leading-tight max-w-xl">
                        {project.fullDescription}
                    </p>
                    
                    {/* Tags Brutalistas */}
                    <div className="flex flex-wrap gap-2 content-start">
                        {project.tags.map(tag => (
                            <span key={tag} className="border border-black px-3 py-1 text-xs font-mono font-bold uppercase hover:bg-black hover:text-white transition-colors cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </header>

        {/* IMAGEM HERO COM PARALLAX E BORDAS */}
        <div className="border-y-2 border-black overflow-hidden relative h-[60vh] md:h-[90vh]">
            <motion.div style={{ y: yParallax }} className="w-full h-[120%] relative -top-[10%]">
                 <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                 />
            </motion.div>
            {/* Overlay decorativo */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
        </div>

        {/* INFO GRID - LAYOUT TABULAR */}
        <section className="border-b-2 border-black bg-[#CCFF00]">
            <div className="container mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 divide-x-2 divide-black text-center">
                <div className="p-8">
                    <span className="block font-mono text-xs font-bold mb-2">CLIENTE</span>
                    <span className="text-lg md:text-xl font-black uppercase">{project.client}</span>
                </div>
                <div className="p-8">
                    <span className="block font-mono text-xs font-bold mb-2">FUNÇÃO</span>
                    <span className="text-lg md:text-xl font-black uppercase">{project.role}</span>
                </div>
                <div className="p-8">
                    <span className="block font-mono text-xs font-bold mb-2">METRICAS</span>
                    <span className="text-lg md:text-xl font-black uppercase">
                        {Object.values(project.metrics || {})[0] || "N/A"}
                    </span>
                </div>
                <Link to="#" className="p-8 bg-black text-white hover:bg-[#FF4D00] hover:text-black transition-colors flex flex-col justify-center items-center group">
                    <span className="font-mono text-xs font-bold mb-2 group-hover:underline">LIVE PREVIEW</span>
                    <ArrowUpRight className="group-hover:scale-125 transition-transform" />
                </Link>
            </div>
        </section>

        {/* NARRATIVA - STICKY LAYOUT */}
        <section className="container mx-auto max-w-7xl px-6 py-32">
            {/* O Desafio */}
            <div className="grid md:grid-cols-12 gap-12 mb-32 border-l-4 border-black pl-6 md:pl-0 md:border-l-0">
                <div className="md:col-span-4 md:border-r-2 border-black md:pr-12">
                    <div className="sticky top-32">
                        <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">O Desafio</h2>
                        <span className="font-mono text-xs bg-black text-white px-2 py-1">CONTEXTO</span>
                    </div>
                </div>
                <div className="md:col-span-8">
                    <p className="text-xl md:text-3xl font-medium leading-relaxed">
                        {project.challenge}
                    </p>
                </div>
            </div>

            {/* A Solução */}
            <div className="grid md:grid-cols-12 gap-12">
                 <div className="md:col-span-4 md:border-r-2 border-black md:pr-12 order-1 md:order-1">
                    <div className="sticky top-32">
                        <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 text-[#006C93]">A Solução</h2>
                         <span className="font-mono text-xs bg-[#006C93] text-white px-2 py-1">EXECUÇÃO</span>
                    </div>
                </div>
                <div className="md:col-span-8 order-2 md:order-2">
                    <p className="text-xl md:text-3xl font-medium leading-relaxed">
                        {project.solution}
                    </p>
                </div>
            </div>
        </section>

        {/* MARQUEE SEPARATOR */}
        <div className="bg-black py-4 overflow-hidden -rotate-1 scale-105 border-y-4 border-[#FF4D00]">
             <motion.div 
                className="flex whitespace-nowrap text-4xl font-black text-white uppercase italic"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="mx-8">
                        Galeria do Projecto <span className="text-[#FF4D00]">●</span> UI Design <span className="text-[#CCFF00]">●</span> Visual Identity <span className="text-[#006C93]">●</span>
                    </span>
                ))}
            </motion.div>
        </div>

        {/* GALERIA */}
        {project.gallery && (
            <section className="py-24 px-6 container mx-auto max-w-7xl">
                <div className="grid md:grid-cols-2 gap-8">
                    {project.gallery.map((img, index) => (
                        <div key={index} className={`relative border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${index === 2 ? 'md:col-span-2' : ''}`}>
                            <div className="absolute top-4 left-4 z-10 bg-white border border-black px-2 py-1 font-mono text-xs font-bold">
                                IMG_0{index + 1}.JPG
                            </div>
                            <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Gallery" />
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* NEXT PROJECT FOOTER */}
        <Link to={`/work/${project.id === 'toycity' ? 'pharmapp' : 'toycity'}`} className="block group border-t-4 border-black bg-white hover:bg-black hover:text-[#CCFF00] transition-colors duration-500">
            <div className="container mx-auto max-w-7xl py-32 px-6 flex flex-col items-center justify-center text-center">
                <span className="font-mono text-sm font-bold uppercase tracking-widest mb-4 group-hover:text-white">Próximo Projecto</span>
                <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                    {project.id === 'toycity' ? 'Pharmapp' : 'ToyCity'}
                </h2>
                <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-lg font-bold">VER ESTUDO DE CASO</span>
                    <ArrowRight size={24} />
                </div>
            </div>
        </Link>
        
      </main>
    </div>
  );
};