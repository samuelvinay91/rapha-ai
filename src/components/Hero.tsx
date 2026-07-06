import { motion } from 'motion/react';
import { ArrowDownRight, Award, Flame, Zap } from 'lucide-react';
import MagneticButton from './MagneticButton';
import ScrollInteractiveCanvas from './ScrollInteractiveCanvas';

export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="top"
      className="relative min-h-screen flex flex-col justify-center bg-transparent z-10 overflow-hidden pt-28 pb-12"
    >
      {/* Absolute positional ambient grid */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.03] select-none border-x border-neutral-500/20 max-w-7xl mx-auto px-6 md:px-12">
        {Array(11).fill(0).map((_, i) => (
          <div key={i} className="h-full border-r border-neutral-500/20" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
        {/* Main hero typography content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col justify-center"
        >
          {/* Micro telemetry lines */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2.5 font-mono text-[10px] text-brand-peach uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-peach animate-ping" />
            [ COGNITIVE SYSTEMS & ENTERPRISE LLMOPS ]
          </motion.div>

          {/* Majestic Hero Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-cream mb-6 leading-[1.05]"
          >
            WE ORCHESTRATE <br />
            <span className="font-serif italic font-normal text-stroke-hover text-brand-peach transition-colors duration-300">intelligent</span> <br />
            COGNITIVE WORKFLOWS
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="max-w-xl text-neutral-400 text-sm md:text-base lg:text-lg leading-relaxed mb-10 font-sans font-light"
          >
            Rapha Enterprises AI engineers resilient autonomous agent networks, custom LLM pipelines, and contextual retrieval engines that integrate seamlessly into high-scale enterprise operations.
          </motion.p>

          {/* Action triggers */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6"
          >
            <MagneticButton 
              onClick={() => scrollToSection('#work')}
              className="px-8 py-4 rounded-full bg-brand-peach hover:bg-brand-peach/90 text-neutral-950 font-display font-black text-xs md:text-sm tracking-widest uppercase flex items-center gap-3 transition-colors shadow-xl cursor-pointer"
              dataCursor="pointer"
              dataCursorText="EXPLORE"
            >
              <span>Selected Work</span>
              <ArrowDownRight className="w-4.5 h-4.5" />
            </MagneticButton>

            <button
              onClick={() => scrollToSection('#capabilities')}
              className="group font-mono text-xs md:text-sm text-neutral-400 hover:text-cream tracking-widest uppercase transition-colors py-2 flex items-center gap-2"
              data-cursor="pointer"
            >
              <span>Our Capabilities</span>
              <span className="w-2 h-2 rounded-full bg-brand-blue group-hover:scale-150 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right side: Floating award badges & visual grid */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full py-6">
          {/* Awards grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 gap-4 bg-neutral-950/45 border border-neutral-900/60 p-6 rounded-3xl backdrop-blur-md relative"
          >
            {/* Absolute coordinates */}
            <span className="absolute top-3 right-4 font-mono text-[8px] text-neutral-700 select-none">
              COORD // 37.7749° N, 122.4194° W
            </span>

            <div className="flex flex-col gap-2 p-3 border-r border-b border-neutral-900/80">
              <Award className="w-5 h-5 text-brand-peach" />
              <span className="font-mono text-[9px] text-neutral-500 uppercase">Enterprise AI</span>
              <span className="font-display font-black text-cream text-xs tracking-tight">Agent Orchestration</span>
            </div>

            <div className="flex flex-col gap-2 p-3 border-b border-neutral-900/80">
              <Flame className="w-5 h-5 text-yellow-500" />
              <span className="font-mono text-[9px] text-neutral-500 uppercase">GCP Architecture</span>
              <span className="font-display font-black text-cream text-xs tracking-tight">Certified Cloud</span>
            </div>

            <div className="flex flex-col gap-2 p-3 border-r border-neutral-900/80">
              <Zap className="w-5 h-5 text-brand-blue" />
              <span className="font-mono text-[9px] text-neutral-500 uppercase">LangOps Security</span>
              <span className="font-display font-black text-cream text-xs tracking-tight">Deterministic Vetting</span>
            </div>

            <div className="flex flex-col gap-2 p-3">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse mt-1" />
              <span className="font-mono text-[9px] text-neutral-500 uppercase">Scaling Capacity</span>
              <span className="font-display font-black text-cream text-xs tracking-tight">Infinite Compute</span>
            </div>
          </motion.div>

          {/* Dynamic Scroll & Mouse Interactive Math Video Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-6 group flex items-center justify-center h-72 md:h-96 w-full cursor-none overflow-hidden rounded-3xl bg-neutral-950/20 border border-neutral-900/40 backdrop-blur-xs"
            data-cursor="interactive"
            data-cursor-text="WARP"
          >
            {/* Ambient backing glow matching brand aesthetics */}
            <div className="absolute inset-0 bg-radial from-[#E84311]/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            <div className="absolute top-4 left-6 flex items-center gap-2 select-none pointer-events-none z-20">
              <span className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-pulse" />
              <span className="font-mono text-[8px] text-neutral-500 tracking-wider uppercase">SCROLL-LINKED GEN-VIDEO ENGINE</span>
            </div>
            
            <div className="absolute bottom-4 right-6 select-none pointer-events-none z-20 font-mono text-[8px] text-neutral-600 uppercase tracking-widest text-right">
              MORPH: [ SPHERE → TORUS ]<br />
              WAVE VELOCITY: ACTIVE
            </div>

            <ScrollInteractiveCanvas />
          </motion.div>
        </div>
      </div>

      {/* Downward scroll tracker */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-end text-neutral-600 font-mono text-[9px] uppercase tracking-widest select-none pt-12">
        <div className="flex gap-4">
          <span>LATITUDE: 32.77 // LONGITUDE: -96.79</span>
          <span className="hidden md:inline">[ SYS: ACTIVE // COG-ORB: v1.0 ]</span>
        </div>
        <button 
          onClick={() => scrollToSection('#work')}
          className="flex flex-col items-center gap-2 hover:text-brand-peach transition-colors"
          data-cursor="pointer"
        >
          <span>SCROLL DOWN</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-1 h-6 bg-neutral-800 rounded-full overflow-hidden"
          >
            <div className="w-full h-1/2 bg-brand-peach rounded-full" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
