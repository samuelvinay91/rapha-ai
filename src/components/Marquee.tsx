import { motion } from 'motion/react';

interface MarqueeProps {
  texts: string[];
  direction?: 'left' | 'right';
  speed?: number; // lower means faster/more time, default 25
  className?: string;
  outline?: boolean;
}

export default function Marquee({
  texts,
  direction = 'left',
  speed = 25,
  className = '',
  outline = false,
}: MarqueeProps) {
  const repeatedTexts = Array(8).fill(texts).flat();

  const xValue = direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'];

  return (
    <div className="w-full overflow-hidden flex whitespace-nowrap py-6 select-none border-y border-neutral-900/40 bg-black/10 backdrop-blur-xs">
      <motion.div
        animate={{ x: xValue }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        className="flex gap-16 pr-16 text-6xl md:text-8xl lg:text-9xl font-display font-black uppercase tracking-tight"
      >
        {repeatedTexts.map((text, idx) => (
          <span 
            key={idx} 
            className={`flex items-center gap-6 ${
              outline 
                ? 'text-stroke text-stroke-hover' 
                : 'text-cream'
            } ${className}`}
          >
            {text}
            <span className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-brand-peach flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
