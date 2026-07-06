import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Testimonial } from '../types';
import { Quote } from 'lucide-react';

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: "Rapha Enterprises AI is exceptional. Their attention to agentic detail and custom retrieval accuracy completely transformed our file synthesis. They made our unstructured data work like a high-performance database.",
    author: "Elena Vance",
    role: "VP of Cognitive Engineering",
    company: "Aether RAG Client",
    year: "2026"
  },
  {
    id: 't2',
    quote: "Working with Rapha was a masterclass in enterprise LLMOps. They executed our complex multi-agent routing on a strict schedule while maintaining flawless, deterministic compliance and safety.",
    author: "Marcus Aurel",
    role: "Chief Strategy Architect",
    company: "Vortex Logistics Partner",
    year: "2026"
  },
  {
    id: 't3',
    quote: "The level of engineering rigor Rapha brought to our regulatory vetting is unparalleled. Our contract turnaround time improved by 68%, completely eliminating our review bottlenecks.",
    author: "Celine Zhang",
    role: "Founder & Executive Director",
    company: "Sentinel Compliance Client",
    year: "2025"
  },
  {
    id: 't4',
    quote: "They don't just build simple prompts; they engineer custom cognitive systems. From the custom embeddings index to the multi-model fallback, every node reinforces our operational confidence.",
    author: "Kristian Vane",
    role: "VP of Enterprise Automation",
    company: "Aura Commerce Partner",
    year: "2025"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="relative py-24 bg-transparent overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-brand-peach uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-peach animate-pulse" />
              CLIENT LOVE & WORDS
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-cream">
              CLIENTS <span className="font-serif italic font-normal text-stroke-hover transition-colors duration-300">TRUST US</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              [DRAG TO READ REVIEWS]
            </span>
          </div>
        </div>
      </div>

      {/* Draggable carousel element */}
      <div className="w-full overflow-hidden px-6 md:px-12 cursor-grab active:cursor-grabbing" data-cursor="drag" data-cursor-text="DRAG">
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ right: 0, left: -width - 48 }}
          className="flex gap-6 pb-12 w-max select-none"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="w-[300px] md:w-[420px] bg-neutral-950/80 border border-neutral-900/60 p-8 md:p-10 rounded-3xl flex flex-col justify-between backdrop-blur-md relative overflow-hidden group"
            >
              {/* Giant quote background symbol */}
              <Quote className="absolute -top-4 -right-4 w-32 h-32 text-neutral-900/15 pointer-events-none group-hover:text-neutral-900/30 transition-colors duration-500" />

              <div className="flex flex-col gap-6 z-10">
                {/* Visual stars / indicators */}
                <div className="flex gap-1">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-brand-peach" />
                  ))}
                </div>

                <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-sans font-normal italic">
                  “ {t.quote} ”
                </p>
              </div>

              <div className="border-t border-neutral-900/80 pt-6 mt-8 flex justify-between items-end z-10">
                <div>
                  <h4 className="text-cream font-display font-bold text-base">
                    {t.author}
                  </h4>
                  <p className="text-neutral-500 font-mono text-[10px] uppercase tracking-wider">
                    {t.role} @ <span className="text-brand-peach">{t.company}</span>
                  </p>
                </div>
                <span className="font-mono text-neutral-600 text-[10px]">
                  [{t.year}]
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
