import { motion } from 'motion/react';

export default function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[99] opacity-[0.045] noise-bg overflow-hidden"
      style={{
        animation: 'noise 1.5s steps(8) infinite',
        width: '200%',
        height: '200%',
        left: '-50%',
        top: '-50%',
      }}
    />
  );
}
