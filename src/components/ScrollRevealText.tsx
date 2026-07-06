import { motion } from 'motion/react';
import { useRef } from 'react';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p';
}

export default function ScrollRevealText({
  text,
  className = '',
  tag = 'h2',
}: ScrollRevealTextProps) {
  const words = text.split(' ');
  const containerRef = useRef<HTMLDivElement>(null);

  const Tag = tag;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '30%',
      opacity: 0.15,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
      >
        <Tag className={`flex flex-wrap ${className}`}>
          {words.map((word, index) => {
            // Check if word has asterisks like *extraordinary*
            const isItalicSerif = word.startsWith('*') && word.endsWith('*');
            const cleanWord = isItalicSerif ? word.slice(1, -1) : word;

            return (
              <span key={index} className="inline-block overflow-hidden mr-[0.25em] py-1">
                <motion.span
                  variants={wordVariants}
                  className={`inline-block origin-bottom ${
                    isItalicSerif
                      ? 'font-serif italic text-brand-peach'
                      : ''
                  }`}
                >
                  {cleanWord}
                </motion.span>
              </span>
            );
          })}
        </Tag>
      </motion.div>
    </div>
  );
}
