import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Service } from '../types';
import { ChevronDown, Sparkles, Layers, Terminal, Compass } from 'lucide-react';

const SERVICES: Service[] = [
  {
    id: 'creative',
    number: '01',
    title: 'MULTI-AGENT SYSTEMS',
    description: 'Engineering networks of cooperative, autonomous agents that orchestrate complex business processes and handle decision-making loops securely.',
    details: [
      'Autonomous Decision Nodes',
      'Feedback & Self-Correction Loops',
      'Inter-Agent Protocol Design',
      'Context-Aware Agent States',
      'Human-in-the-Loop Safeguards'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'design',
    number: '02',
    title: 'KNOWLEDGE BASES & RAG',
    description: 'Structuring low-latency, contextual indexing pipelines that allow generative models to reason over massive enterprise data sets with absolute accuracy.',
    details: [
      'Vector Index Optimization',
      'Semantic Graph Relations',
      'Hybrid Lexical-Vector Search',
      'Dynamic Context Retrieval',
      'Real-Time Source Grounding'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'development',
    number: '03',
    title: 'LLMOPS & SECURE INFRA',
    description: 'Deploying highly resilient, low-latency AI middleware that guarantees infinite scalability, cost-optimizations, and strict security compliance.',
    details: [
      'Multi-Model Routing & Failover',
      'Deterministic Guardrail Layers',
      'Token Cost-Optimization Loops',
      'Serverless Container Autoscale',
      'Telemetry & Prompt Security'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1617791160505-6f006e121980?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'branding',
    number: '04',
    title: 'COGNITIVE INTEGRATIONS',
    description: 'Formulating strategic operational blueprints, readiness reports, and custom middleware interfaces to bridge legacy data stores with generative intelligence.',
    details: [
      'Legacy DB-to-AI Orchestrators',
      'Cognitive Readiness Audits',
      'TCO & Cost-Benefit Blueprints',
      'Custom LLM Selection Audits',
      'Secure Multi-Tenant Auth Layers'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
  }
];

export default function ServicesAccordion() {
  const [activeId, setActiveId] = useState<string | null>('design');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate tracking inside capabilities container for floating preview portal
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const getIcon = (id: string) => {
    switch (id) {
      case 'creative': return <Compass className="w-5 h-5 text-brand-peach" />;
      case 'design': return <Layers className="w-5 h-5 text-brand-blue" />;
      case 'development': return <Terminal className="w-5 h-5 text-brand-accent" />;
      case 'branding': return <Sparkles className="w-5 h-5 text-yellow-400" />;
      default: return null;
    }
  };

  return (
    <section className="relative min-h-screen py-24 bg-transparent z-10" ref={containerRef}>
      {/* Absolute floating preview portal following cursor */}
      <AnimatePresence>
        {hoveredRowId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 3,
              x: mousePosition.x + 35,
              y: mousePosition.y - 110,
            }}
            exit={{ opacity: 0, scale: 0.7, rotate: -5 }}
            transition={{ type: 'spring', stiffness: 250, damping: 25, mass: 0.4 }}
            className="absolute hidden md:block w-52 h-64 rounded-2xl overflow-hidden pointer-events-none z-30 shadow-2xl border border-white/10"
            style={{ left: 0, top: 0 }}
          >
            <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply" />
            <img 
              src={SERVICES.find(s => s.id === hoveredRowId)?.imageUrl} 
              alt="service-teaser" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="mb-16">
          <div className="flex items-center gap-3 font-mono text-xs text-brand-blue uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            CAPABILITIES & EXPERTISE
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-cream">
            WHAT WE <span className="font-serif italic font-normal text-stroke-hover transition-colors duration-300">DO BEST</span>
          </h2>
        </div>

        {/* Accordion Table */}
        <div className="border-t border-neutral-900 flex flex-col">
          {SERVICES.map((service) => {
            const isOpen = activeId === service.id;
            
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredRowId(service.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                className="border-b border-neutral-900/80 transition-colors duration-300 hover:bg-neutral-950/30"
                data-cursor="explore"
                data-cursor-text={isOpen ? "CLOSE" : "OPEN"}
              >
                <button
                  onClick={() => setActiveId(isOpen ? null : service.id)}
                  className="w-full flex items-center justify-between py-8 text-left focus:outline-hidden group"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span className="font-mono text-sm md:text-base text-neutral-600 group-hover:text-brand-peach transition-colors">
                      {service.number}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-900 group-hover:border-neutral-800 transition-colors">
                        {getIcon(service.id)}
                      </span>
                      <h3 className="text-xl md:text-3xl font-display font-black tracking-tight text-cream group-hover:text-white transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Glowing pill */}
                    <span className="hidden md:inline-block px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-800/40 text-[10px] font-mono text-neutral-500 uppercase">
                      {service.details.length} methods
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="w-10 h-10 rounded-full border border-neutral-900 flex items-center justify-center text-neutral-500 group-hover:text-cream group-hover:border-neutral-800"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                </button>

                {/* Extended Details panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pl-14 md:pl-28 pr-6 flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start">
                        <div className="max-w-lg">
                          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 font-sans">
                            {service.description}
                          </p>
                          <div className="h-0.5 w-16 bg-neutral-900" />
                        </div>

                        {/* Staggered detailed list of bullets */}
                        <div className="flex-1 w-full lg:max-w-md">
                          <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest block mb-4">
                            TECHNICAL METHODOLOGY // CAPABILITIES
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.details.map((detail, idx) => (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.08 }}
                                key={detail}
                                className="flex items-center gap-2.5 font-mono text-xs text-neutral-400 py-1"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-peach flex-shrink-0" />
                                {detail}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
