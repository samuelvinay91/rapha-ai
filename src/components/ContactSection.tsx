import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', budget: '10k-25k', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [error, setError] = useState('');

  // Ticking local digital clock for premium agency detail
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Name and Email are required to initiate contact.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setIsSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative min-h-screen py-24 bg-transparent border-t border-neutral-900 flex flex-col justify-between z-10 overflow-hidden">
      {/* Decorative gradient glow bottom right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-peach/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start flex-1 mb-24">
        {/* Left column: Narrative & Info */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-brand-peach uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-peach animate-pulse" />
              LET'S CO-CREATE
            </div>
            
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-cream mb-6 leading-tight">
              HAVE AN <br />
              <span className="font-serif italic font-normal text-stroke-hover transition-colors duration-300 text-brand-peach">IDEA?</span>
            </h2>

            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              We design and build custom autonomous agents, high-speed semantic search backends, and deterministic LLMOps pipelines. Get in touch to schedule a cognitive engineering audit.
            </p>
          </div>

          {/* Core Info Coordinates */}
          <div className="space-y-6 pt-6 border-t border-neutral-900/80">
            <div className="flex items-center gap-4 group" data-cursor="pointer">
              <div className="w-10 h-10 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-400 group-hover:border-neutral-700 group-hover:text-cream transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-600 block uppercase">write to us</span>
                <span className="text-sm font-mono text-cream hover:text-brand-peach transition-colors">solutions@raphaenterprises.ai</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group" data-cursor="pointer">
              <div className="w-10 h-10 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-400 group-hover:border-neutral-700 group-hover:text-cream transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-600 block uppercase">studio location</span>
                <span className="text-sm font-sans text-cream">Dallas, TX // Tokyo, JP</span>
              </div>
            </div>

            {/* Live Ticking Clock */}
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-neutral-600 block uppercase">local agency time</span>
                <span className="text-sm font-mono text-brand-accent tracking-widest">{currentTime || '12:00:00'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Form */}
        <div className="lg:col-span-7 bg-neutral-950/60 border border-neutral-900/60 p-8 md:p-12 rounded-3xl backdrop-blur-md relative">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-cream mb-2">
                    Brief us on your next project
                  </h3>
                  <p className="text-neutral-500 text-xs font-mono">
                    [0.08 MS DISPATCH DELAY // SECURE ENVELOPE]
                  </p>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-brand-peach/10 border border-brand-peach/30 text-brand-peach text-xs font-mono">
                    {error}
                  </div>
                )}

                {/* Form fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name field */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      id="form-name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-neutral-800 py-3 text-cream text-sm focus:outline-hidden focus:border-brand-peach transition-colors font-sans"
                      placeholder="YOUR NAME"
                    />
                    <label htmlFor="form-name" className="absolute left-0 -top-4 text-[9px] font-mono text-neutral-600 tracking-wider uppercase group-focus-within:text-brand-peach transition-colors">
                      What should we call you?
                    </label>
                  </div>

                  {/* Email field */}
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      id="form-email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-neutral-800 py-3 text-cream text-sm focus:outline-hidden focus:border-brand-peach transition-colors font-sans"
                      placeholder="EMAIL@ADDRESS.COM"
                    />
                    <label htmlFor="form-email" className="absolute left-0 -top-4 text-[9px] font-mono text-neutral-600 tracking-wider uppercase group-focus-within:text-brand-peach transition-colors">
                      Where can we reply?
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Budget Dropdown selection */}
                  <div className="relative group">
                    <select
                      name="budget"
                      id="form-budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-neutral-800 py-3 text-cream text-sm focus:outline-hidden focus:border-brand-peach transition-colors font-mono cursor-pointer"
                    >
                      <option value="5k-10k" className="bg-neutral-950 text-cream">$5,000 — $10,000</option>
                      <option value="10k-25k" className="bg-neutral-950 text-cream">$10,000 — $25,000</option>
                      <option value="25k-50k" className="bg-neutral-950 text-cream">$25,000 — $50,000</option>
                      <option value="50k+" className="bg-neutral-950 text-cream">$50,000+ Unlimited</option>
                    </select>
                    <label htmlFor="form-budget" className="absolute left-0 -top-4 text-[9px] font-mono text-neutral-600 tracking-wider uppercase group-focus-within:text-brand-peach transition-colors">
                      Project Allocation
                    </label>
                  </div>

                  {/* Service type indicator */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="w-2 h-2 rounded-full bg-brand-peach animate-ping" />
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                      Currently Booking for Q3 2026
                    </span>
                  </div>
                </div>

                {/* Message field */}
                <div className="relative group">
                  <textarea
                    name="message"
                    id="form-message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-neutral-800 py-3 text-cream text-sm focus:outline-hidden focus:border-brand-peach transition-colors font-sans resize-none"
                    placeholder="Briefly describe your vision, platform, and timeline constraints..."
                  />
                  <label htmlFor="form-message" className="absolute left-0 -top-4 text-[9px] font-mono text-neutral-600 tracking-wider uppercase group-focus-within:text-brand-peach transition-colors">
                    The Blueprint Details
                  </label>
                </div>

                {/* Magnetic Submit Button */}
                <div className="pt-4 flex justify-end">
                  <MagneticButton 
                    className="px-8 py-4 rounded-full bg-brand-peach hover:bg-brand-peach/90 text-neutral-950 font-display font-black text-sm tracking-widest uppercase flex items-center gap-3 transition-colors shadow-lg"
                    dataCursor="pointer"
                    dataCursorText="SEND"
                  >
                    <span>Transmit Brief</span>
                    <Send className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-brand-accent/15 border border-brand-accent/40 flex items-center justify-center text-brand-accent mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-black text-cream mb-2">
                    TRANSMISSION SUCCESSFUL
                  </h3>
                  <p className="text-neutral-400 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="text-brand-peach font-bold">{formData.name}</span>. Your brief has been decrypted. Our creative engineers will contact you at <span className="text-brand-blue">{formData.email}</span> within 12 hours.
                  </p>
                </div>
                
                <div className="w-full h-px bg-neutral-900 my-4" />
                
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', budget: '10k-25k', message: '' });
                  }}
                  className="font-mono text-xs text-neutral-500 hover:text-cream transition-colors uppercase tracking-widest"
                >
                  [ Send Another Brief ]
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sub-footer metadata */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full border-t border-neutral-900/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-neutral-600 font-mono text-[10px] uppercase tracking-widest">
        <div className="flex flex-wrap gap-8 justify-center md:justify-start">
          <span className="text-neutral-500">© 2026 RAPHA ENTERPRISES AI</span>
          <span>COGNITIVE STUDIO</span>
          <span className="hidden md:inline">PLATFORM: SECURE LLM INTEGRATION</span>
        </div>

        {/* Social channels */}
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-peach transition-colors flex items-center gap-1" data-cursor="pointer">
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a href="#" className="hover:text-brand-peach transition-colors flex items-center gap-1" data-cursor="pointer">
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a href="#" className="hover:text-brand-peach transition-colors flex items-center gap-1" data-cursor="pointer">
            <Instagram className="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>
        </div>

        {/* Magnetic Scroll back to top */}
        <MagneticButton
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full border border-neutral-900 hover:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-cream transition-colors cursor-pointer"
          dataCursor="pointer"
          dataCursorText="TOP"
        >
          <ArrowUp className="w-4 h-4" />
        </MagneticButton>
      </div>
    </footer>
  );
}
