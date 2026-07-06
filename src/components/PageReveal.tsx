import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function PageReveal() {
  const [percent, setPercent] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Premium, variable-speed counting sequence (simulating loading system modules)
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear increment for a organic, custom "thinking" feel
      const increment = Math.floor(Math.random() * 8) + 3;
      current += increment;

      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(interval);
        
        // Brief dramatic pause at 100% before releasing the screen
        setTimeout(() => {
          setIsComplete(true);
          document.body.style.overflow = '';
        }, 600);
      } else {
        setPercent(current);
      }
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          id="page-reveal-preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            transition: { 
              duration: 1.1, 
              ease: [0.85, 0, 0.15, 1], // Custom ultra-premium cubic-bezier curve
            }
          }}
          className="fixed inset-0 bg-[#0A0A0A] z-[999] flex flex-col justify-between p-10 md:p-16 select-none pointer-events-auto"
        >
          {/* Top Metadata Header */}
          <div className="w-full flex justify-between items-start font-mono text-[8px] md:text-[9px] text-neutral-600 uppercase tracking-[0.3em]">
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-[#E84311] rounded-full animate-pulse" />
              <span>SYSTEM: ONLINE // RAPHA COGNITIVE NODE</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-right hidden sm:block"
            >
              [ ORCHESTRATION ENGINE v1.0 ]
            </motion.div>
          </div>

          {/* Central Luxury Typography Counter */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative overflow-hidden flex flex-col items-center">
              {/* Giant numeral counter backplate */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute text-[12rem] md:text-[20rem] font-display font-black text-white pointer-events-none select-none select-none tracking-tighter -z-10"
              >
                {percent.toString().padStart(3, '0')}
              </motion.div>

              {/* Main minimalist counters */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline font-display font-black tracking-tighter"
              >
                <span className="text-6xl md:text-8xl lg:text-9xl text-cream">
                  {percent.toString().padStart(3, '0')}
                </span>
                <span className="text-xl md:text-2xl text-[#E84311] ml-2 font-mono font-medium">%</span>
              </motion.div>

              {/* Status prompt */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 mt-4 text-center"
              >
                {percent < 30 && "INITIALIZING SYSTEM THREADS..."}
                {percent >= 30 && percent < 70 && "SYNAPSE MAPPING COGNITIVE NODES..."}
                {percent >= 70 && percent < 100 && "ESTABLISHING DETERMINISTIC SECURE INTERFACE..."}
                {percent === 100 && "SYSTEM DEPLOYMENT SUCCESSFUL // RELEASE"}
              </motion.div>
            </div>
          </div>

          {/* Bottom Branding / Manifesto */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 border-t border-neutral-900/60 pt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest text-center md:text-left"
            >
              RAPHA ENTERPRISES AI // COGNITIVE SYSTEMS
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden md:block font-mono text-[8px] text-neutral-600 uppercase tracking-[0.25em] text-right"
            >
              DALLAS // TOKYO // LONDON
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
