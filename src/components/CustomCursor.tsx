import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'hidden'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Motion values for high-performance sub-pixel tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for luxurious trailing lag effect
  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is mobile or touch-enabled
    const checkDevice = () => {
      const mobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listen to mouse hovers to update cursor states dynamically using data attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest element with a data-cursor attribute
      const cursorElement = target.closest('[data-cursor]');
      
      if (cursorElement) {
        const type = cursorElement.getAttribute('data-cursor');
        const text = cursorElement.getAttribute('data-cursor-text') || '';
        
        if (type === 'view' || type === 'drag' || type === 'explore' || type === 'text') {
          setCursorType('text');
          setCursorText(text || type.toUpperCase());
        } else if (type === 'pointer' || type === 'link') {
          setCursorType('pointer');
        } else if (type === 'hide') {
          setCursorType('hidden');
        } else {
          setCursorType('default');
        }
      } else {
        // Fallback for default interactive elements
        if (
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('button') || 
          target.closest('a') ||
          target.style.cursor === 'pointer'
        ) {
          setCursorType('pointer');
        } else {
          setCursorType('default');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkDevice);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  // Variants for custom cursor appearance
  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: '#f5f5f3',
      border: '0px solid transparent',
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(245, 245, 243, 1)',
      mixBlendMode: 'difference' as const,
      border: '0px solid transparent',
    },
    text: {
      width: 90,
      height: 90,
      backgroundColor: '#ff7d59', // Beautiful peach accent
      color: '#080808',
      mixBlendMode: 'normal' as const,
      border: 'none',
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    }
  };

  const activeVariant = variants[cursorType] || variants.default;

  return (
    <>
      {/* Interactive lag element */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
          mixBlendMode: activeVariant.mixBlendMode,
        }}
        animate={{
          width: activeVariant.width,
          height: activeVariant.height,
          backgroundColor: activeVariant.backgroundColor,
          border: activeVariant.border,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.3 }}
        className="fixed pointer-events-none z-50 rounded-full flex items-center justify-center text-center font-mono font-bold text-[10px] tracking-widest overflow-hidden shadow-2xl"
      >
        {cursorType === 'text' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-black select-none pointer-events-none whitespace-nowrap px-2"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny immediate dot for crisp precise tracking */}
      {cursorType === 'default' && (
        <motion.div
          style={{
            left: mouseX,
            top: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="fixed w-2 h-2 bg-brand-peach rounded-full pointer-events-none z-50 mix-blend-difference"
        />
      )}
    </>
  );
}
