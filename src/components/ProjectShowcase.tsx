import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS: Project[] = [
  {
    id: 'aether',
    title: 'Aether RAG',
    subtitle: 'Enterprise Cognitive Search & PDF Synthesis',
    category: 'Cognitive Systems',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    color: '#8b5cf6', // Violet
    href: '#',
    tags: ['Vector DB', 'Semantic Search', 'LangChain', 'LLMOps'],
  },
  {
    id: 'helios',
    title: 'Vortex Logistics',
    subtitle: 'Autonomous Shipping Routing & Cost Optimization',
    category: 'Multi-Agent Loops',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    color: '#00e5ff', // Cyan
    href: '#',
    tags: ['AI Agents', 'Pathfinding', 'Cost IQ', 'Dynamic Routings'],
  },
  {
    id: 'chronos',
    title: 'Sentinel Vetting',
    subtitle: 'Automated Clinical Compliance & Regulatory Vetting',
    category: 'Healthcare Compliance',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    color: '#ff7d59', // Peach
    href: '#',
    tags: ['Clinical NLP', 'EMR Vetting', 'Compliance', 'Security'],
  },
  {
    id: 'valkyrie',
    title: 'Aura Semantic',
    subtitle: 'Intelligent Product Matching & E-Commerce Personalization',
    category: 'Cognitive Commerce',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1617791160505-6f006e121980?auto=format&fit=crop&w=800&q=80',
    color: '#00ff66', // Green
    href: '#',
    tags: ['Embeddings', 'Product Search', 'Recommenders', 'Real-Time'],
  },
  {
    id: 'solaria',
    title: 'Helix Smart Grid',
    subtitle: 'Predictive Power Routing & Load Balancing Loops',
    category: 'System Optimization',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    color: '#eab308', // Yellow
    href: '#',
    tags: ['Telemetry', 'Neural Nets', 'Edge Compute', 'Carbon-Meters'],
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      duration: 0.8,
    },
  },
};

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Horizontal scroll tracking
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="relative min-h-screen py-24 flex flex-col justify-center overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-brand-peach uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-peach animate-pulse" />
            Featured Works
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-cream">
            SELECTED <span className="font-serif italic font-normal text-stroke-hover transition-colors duration-300">PRODUCTS</span>
          </h2>
        </div>
        <p className="max-w-md text-neutral-400 text-sm md:text-base leading-relaxed">
          A hand-picked selection of high-end cognitive agents, semantic database layers, and deterministic compliance architectures deployed for forward-thinking enterprises.
        </p>
      </div>

      {/* Draggable slider container */}
      <div className="w-full overflow-hidden px-6 md:px-12 cursor-grab active:cursor-grabbing" data-cursor="drag" data-cursor-text="DRAG">
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ right: 0, left: -width - 48 }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex gap-8 pb-12 w-max select-none"
        >
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="relative w-[320px] md:w-[460px] h-[480px] md:h-[580px] rounded-3xl bg-neutral-950/80 border border-neutral-900/60 overflow-hidden flex flex-col justify-between p-6 md:p-8 backdrop-blur-md group"
              onHoverStart={() => setActiveProject(project.id)}
              onHoverEnd={() => setActiveProject(null)}
              whileHover={{ 
                y: -10, 
                transition: { type: 'spring', stiffness: 200, damping: 20 } 
              }}
              data-cursor="view"
              data-cursor-text="VIEW"
            >
              {/* Card visual feedback glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at 50% 50%, ${project.color}15, transparent 75%)`,
                }}
              />

              {/* Upper Header info */}
              <div className="flex justify-between items-start z-10">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                  [{idx + 1} // {PROJECTS.length}]
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  {project.year}
                </span>
              </div>

              {/* Central Immersive Image with Zoom & Parallax-tilt */}
              <div className="relative flex-1 my-6 rounded-2xl overflow-hidden bg-neutral-900">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover pointer-events-none select-none filter brightness-90 group-hover:brightness-100"
                  animate={{
                    scale: activeProject === project.id ? 1.08 : 1,
                    rotate: activeProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                />
                
                {/* Image neon border highlight */}
                <div 
                  className="absolute inset-0 border border-transparent group-hover:border-cream/10 rounded-2xl transition-all duration-500 pointer-events-none"
                  style={{
                    borderColor: activeProject === project.id ? `${project.color}30` : 'transparent',
                  }}
                />
              </div>

              {/* Lower Info block */}
              <div className="z-10 flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs font-mono text-brand-peach uppercase mb-1 block">
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-cream tracking-tight group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Floating Link Circle button */}
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 transition-all duration-500"
                    style={{
                      borderColor: activeProject === project.id ? project.color : 'rgba(38, 38, 38, 0.6)',
                      backgroundColor: activeProject === project.id ? project.color : 'transparent',
                      color: activeProject === project.id ? '#080808' : '#f5f5f3',
                    }}
                  >
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>

                {/* Tags bottom container */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-900/80">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2.5 py-1 rounded-full bg-neutral-900/50 border border-neutral-800/40 text-[10px] font-mono text-neutral-400 group-hover:text-cream/90 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Swipe status indicator */}
      <div className="max-w-7xl mx-auto px-6 w-full text-center md:text-left mt-2">
        <span className="font-mono text-neutral-600 text-[10px] tracking-widest uppercase inline-flex items-center gap-2">
          ← DRAG HORIZONTALLY TO BROWSE RECENT PROJECTS →
        </span>
      </div>
    </section>
  );
}
