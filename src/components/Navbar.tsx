import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Github, Linkedin, Instagram } from 'lucide-react';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Start Project', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track page scroll to add glassmorphism container backdrop to Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300); // Wait for menu close transition to finish
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled 
            ? 'py-4 bg-neutral-950/60 border-b border-neutral-900/40 backdrop-blur-md' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick('#top')} 
            className="flex items-center gap-1.5 cursor-pointer font-display font-black text-2xl md:text-3xl tracking-tighter text-cream select-none group"
            data-cursor="pointer"
          >
            <span>RAPHA AI</span>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-peach group-hover:bg-brand-accent transition-colors duration-500 animate-pulse" />
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="font-mono text-xs text-neutral-400 hover:text-cream tracking-wider uppercase transition-colors relative py-1 group"
                data-cursor="pointer"
              >
                {link.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-peach group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Action triggers */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <MagneticButton 
                onClick={() => handleLinkClick('#contact')}
                className="px-5 py-2.5 rounded-full bg-cream hover:bg-white text-neutral-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                dataCursor="pointer"
                dataCursorText="HI"
              >
                Let's Talk
              </MagneticButton>
            </div>

            {/* Magnetic Burger button */}
            <MagneticButton
              onClick={toggleMenu}
              className="w-12 h-12 rounded-full border border-neutral-800/80 hover:border-neutral-700 bg-neutral-950/40 flex items-center justify-center text-cream focus:outline-hidden transition-colors cursor-pointer"
              dataCursor="pointer"
              dataCursorText={isOpen ? "CLOSE" : "MENU"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* Full screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-neutral-950/95 z-30 flex flex-col justify-between p-8 md:p-16 overflow-hidden"
          >
            {/* Visual background overlays */}
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-peach/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full flex justify-between items-center mt-12 md:mt-6 border-b border-neutral-900/60 pb-6">
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                [SYSTEM: INDEX NAVIGATION PORTAL]
              </span>
              <span className="font-mono text-[10px] text-neutral-500">
                ACTIVE STATE Q3 2026
              </span>
            </div>

            {/* Mega vertical links */}
            <div className="my-auto max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6 md:gap-8">
                {NAV_LINKS.map((link, idx) => (
                  <div key={link.label} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }}
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter text-cream hover:text-brand-peach transition-colors inline-flex items-center gap-4 group"
                        data-cursor="pointer"
                      >
                        <span className="font-mono text-xs text-neutral-600 block group-hover:text-brand-peach transition-colors select-none">
                          0{idx + 1}
                        </span>
                        <span>{link.label.toUpperCase()}</span>
                        <ArrowUpRight className="w-6 h-6 md:w-10 md:h-10 text-neutral-800 group-hover:text-brand-peach group-hover:translate-x-2 group-hover:-translate-y-2 transition-all" />
                      </a>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Sidebar helper block */}
              <div className="border-t md:border-t-0 md:border-l border-neutral-900 pt-8 md:pt-0 md:pl-16 space-y-8 flex flex-col justify-center">
                <div>
                  <span className="font-mono text-[10px] text-neutral-600 block uppercase mb-2">Our Manifesto</span>
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                    We bridge legacy systems with cognitive intelligence. We build custom reasoning engines, autonomous agent networks, and deterministic compliance pipelines for high-growth enterprises.
                  </p>
                </div>

                <div className="space-y-4">
                  <span className="font-mono text-[10px] text-neutral-600 block uppercase">Explore Channels</span>
                  <div className="flex gap-4 text-xs font-mono">
                    <a href="#" className="text-neutral-400 hover:text-brand-peach transition-colors flex items-center gap-1">
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                    <a href="#" className="text-neutral-400 hover:text-brand-peach transition-colors flex items-center gap-1">
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                    <a href="#" className="text-neutral-400 hover:text-brand-peach transition-colors flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom coordinates */}
            <div className="w-full border-t border-neutral-900/60 pt-6 flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] text-neutral-600 uppercase tracking-wider">
              <span>RAPHA ENTERPRISES AI // COGNITIVE LABS</span>
              <span>ESTABLISHED 2026 // DALLAS // TOKYO</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
