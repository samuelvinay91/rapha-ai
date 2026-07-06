import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export default function ScrollProgress() {
  const [percent, setPercent] = useState(0);

  // Hook into framer-motion scroll-linked state
  const { scrollYProgress } = useScroll();

  // Create a highly responsive spring effect for fluid lag-free easing
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 18,
    restDelta: 0.001
  });

  // Keep a separate state updated for the high-end numerical text counter
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Transform scaleX color dynamically (shifts from warm orange to futuristic cyan at the end)
  const glowColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['rgba(232, 67, 17, 0.65)', 'rgba(255, 125, 89, 0.65)', 'rgba(0, 229, 255, 0.75)']
  );

  return (
    <>
      {/* 1. Ultra-Thin Glowing Progress Bar on Top */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] origin-left bg-gradient-to-r from-[#E84311] via-[#ff7d59] to-[#00e5ff]"
        style={{ 
          scaleX,
          boxShadow: `0 0.5px 6px 0px rgba(0,0,0,0.5)`
        }}
      />

      {/* 2. Delicate neon laser glow underlay */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1.5px] z-[59] origin-left bg-gradient-to-r from-[#E84311] via-[#ff7d59] to-[#00e5ff] blur-[2.5px]"
        style={{ 
          scaleX,
          opacity: 0.85
        }}
      />

      {/* 3. Luxury Monospace Scroll Depth Overlay Widget */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
        className="fixed top-20 right-8 md:right-12 z-[41] select-none pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] text-neutral-400 bg-neutral-950/40 border border-white/5 backdrop-blur-md px-2 py-1 rounded-sm shadow-xl"
      >
        <span className="w-1 h-1 rounded-full bg-[#E84311] animate-ping" />
        <span className="text-white/30">[</span>
        <span className="text-cream font-bold">DEPTH: {percent.toString().padStart(3, '0')}%</span>
        <span className="text-white/30">]</span>
      </motion.div>
    </>
  );
}
