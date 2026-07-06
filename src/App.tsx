import { useEffect } from 'react';
import PageReveal from './components/PageReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ProjectShowcase from './components/ProjectShowcase';
import ServicesAccordion from './components/ServicesAccordion';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Marquee from './components/Marquee';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import CanvasBackground from './components/CanvasBackground';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  // Ensure the page starts at the top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-cream overflow-x-hidden selection:bg-[#E84311] selection:text-neutral-950 font-sans">
      {/* 0. Luxury Page Reveal Transition & Preloader */}
      <PageReveal />

      {/* Scroll depth tracking progress bar */}
      <ScrollProgress />

      {/* 1. Interactive WebGL/Particles Background Canvas */}
      <CanvasBackground />

      {/* 2. Film Grain/Noise Overlay */}
      <NoiseOverlay />

      {/* 3. Luxury Motion Custom Cursor */}
      <CustomCursor />

      {/* 4. Elegant Vertical Rail (Left Sidebar) - "Artistic Flair" Layout Pattern */}
      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-24 border-r border-white/10 flex-col justify-between items-center py-16 z-30 pointer-events-none">
        <div className="[writing-mode:vertical-rl] rotate-180 text-[9px] uppercase tracking-[0.3em] text-white/30 font-mono select-none">
          COGNITIVE ENGINEERING LABS
        </div>
        <div className="w-px h-24 bg-white/10" />
        <div className="[writing-mode:vertical-rl] rotate-180 text-[9px] uppercase tracking-[0.3em] text-[#E84311] font-mono font-bold select-none">
          EST. 2024 // RAPHA ENTERPRISES
        </div>
      </div>

      {/* 5. Main Scrolling Content Wrapper - Shifted for Vertical Rail on large displays */}
      <div className="relative z-10 lg:pl-24 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar />

        {/* Content sections */}
        <main className="flex-1 flex flex-col">
          {/* Hero Section */}
          <Hero />

          {/* Philosophy & Studio Compass Section */}
          <Philosophy />

          {/* Running Text Marquee 1 */}
          <Marquee 
            texts={["Rapha Enterprises AI", "Cognitive Strategy", "Multi-Agent Systems", "RAG Pipelines", "LLMOps Scaling", "Deterministic Intelligence"]} 
            outline={true} 
            speed={22} 
          />

          {/* Portfolio Selected Works Showcase */}
          <div id="work" className="scroll-mt-24">
            <ProjectShowcase />
          </div>

          {/* Running Text Marquee 2 */}
          <Marquee 
            texts={["Autonomous Workflows", "Knowledge Synthesis", "Cognitive Audits", "Secure Middleware", "High Performance AI", "Production Ready"]} 
            direction="right"
            speed={28} 
          />

          {/* Capabilities/Services Accordion */}
          <div id="capabilities" className="scroll-mt-24">
            <ServicesAccordion />
          </div>

          {/* Reviews/Testimonials Grid */}
          <div id="reviews" className="scroll-mt-24">
            <Testimonials />
          </div>

          {/* Interactive Project Inquiry Brief Form & Footer */}
          <div id="contact" className="scroll-mt-24">
            <ContactSection />
          </div>
        </main>
      </div>
    </div>
  );
}
