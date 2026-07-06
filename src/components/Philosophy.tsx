import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import ScrollRevealText from './ScrollRevealText';

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%' });

  // Numerical metrics counter simulation
  const [counts, setCounts] = useState({ agents: 0, partners: 0, uptime: 0 });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 1500; // milliseconds
    const steps = 60;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      setCounts({
        agents: Math.min(Math.round((42 / steps) * currentStep), 42),
        partners: Math.min(Math.round((24 / steps) * currentStep), 24),
        uptime: Math.min(Math.round((99 / steps) * currentStep), 99),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section 
      ref={containerRef}
      id="philosophy" 
      className="relative min-h-screen py-24 bg-transparent z-10 flex flex-col justify-center border-t border-neutral-900/60"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left columns: stats block */}
        <div className="lg:col-span-4 space-y-12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-brand-blue uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              OUR COMPASS
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-cream">
              RAPHA AI <br />
              <span className="font-serif italic font-normal text-brand-blue">PHILOSOPHY</span>
            </h2>
          </div>

          {/* Core Telemetry counters */}
          <div className="space-y-8">
            <div className="border-l-2 border-brand-peach/40 pl-6 group">
              <span className="font-mono text-[9px] text-neutral-600 block uppercase">ai agents deployed</span>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-4xl text-cream group-hover:text-brand-peach transition-colors duration-300">
                  {counts.agents}
                </span>
                <span className="font-mono text-xs text-brand-peach font-bold">[AGENTS]</span>
              </div>
            </div>

            <div className="border-l-2 border-brand-blue/40 pl-6 group">
              <span className="font-mono text-[9px] text-neutral-600 block uppercase">enterprise partners</span>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-4xl text-cream group-hover:text-brand-blue transition-colors duration-300">
                  {counts.partners}+
                </span>
                <span className="font-mono text-xs text-brand-blue font-bold">[CLIENTS]</span>
              </div>
            </div>

            <div className="border-l-2 border-brand-accent/40 pl-6 group">
              <span className="font-mono text-[9px] text-neutral-600 block uppercase">system uptime metrics</span>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-black text-4xl text-cream group-hover:text-brand-accent transition-colors duration-300">
                  {counts.uptime}.9%
                </span>
                <span className="font-mono text-xs text-brand-accent font-bold">[UPTIME]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right columns: Massive text reveal on scroll */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <span className="font-mono text-[10px] text-neutral-600 block uppercase tracking-widest mb-4">
            [ THE MANIFESTO // READ SECURELY ]
          </span>

          <ScrollRevealText 
            tag="h3"
            className="text-2xl md:text-4xl lg:text-5xl font-display font-black tracking-tight text-cream leading-[1.3] text-left"
            text="We believe AI is not an add-on widget — it is a *fundamental shift* in enterprise capability. We construct deterministic multi-agent networks, context-rich semantic indexes, and custom reasoning paths. We don't just prompt models; we engineer *autonomous ecosystems* that execute processes with precision, compliance, and flawless scale."
          />

          <div className="mt-8 h-px w-full bg-neutral-900/80 relative">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute left-0 top-0 h-full bg-brand-peach/40"
            />
          </div>

          {/* Staggered mini-capabilities chips */}
          <div className="flex flex-wrap gap-3 mt-8">
            {['Multi-Agent Orchestration', 'Semantic Knowledge RAG', 'Deterministic Guardrails', 'Custom Fine-Tuning', 'High-Performance LLMOps'].map((manifestoTag, idx) => (
              <motion.span
                key={manifestoTag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="px-3 py-1.5 rounded-full bg-neutral-950/60 border border-neutral-900/60 text-xs font-mono text-neutral-400 hover:border-neutral-800 hover:text-cream transition-colors cursor-pointer"
                data-cursor="pointer"
              >
                // {manifestoTag.toUpperCase()}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
