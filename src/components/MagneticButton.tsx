import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number; // Pull factor (default 0.35)
  dataCursor?: string;
  dataCursorText?: string;
  id?: string;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.35,
  dataCursor = 'pointer',
  dataCursorText = '',
  id,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for magnetic displacement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for elastic recoil
  const springConfig = { damping: 15, stiffness: 150, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Find relative mouse position from button center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    // Apply strength pull
    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="inline-block"
      id={id}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={className}
        data-cursor={dataCursor}
        data-cursor-text={dataCursorText}
      >
        {children}
      </motion.div>
    </div>
  );
}
