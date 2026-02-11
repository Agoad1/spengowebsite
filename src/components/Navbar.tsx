import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SpengoLogo } from './SpengoLogo';

const navLinks = [
  { label: 'How It Works', href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-bg/80 backdrop-blur-xl border-b border-card-border'
        : 'bg-transparent'
        }`}
    >
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
          <SpengoLogo className="w-9 h-9" />
          <span className="font-outfit text-2xl font-bold text-white tracking-tighter group-hover:text-white/90 transition-colors">
            SPENGO
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-body transition-colors duration-200 link-underline pb-1"
            >
              <span className={link.label === 'How It Works' ? 'glow-noise' : ''}>
                {link.label}
              </span>
            </a>
          ))}
          <a
            href="#start"
            className="text-sm text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-lg btn-jump"
          >
            Start Your Free Audit
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-body transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`block w-5 h-px bg-body transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-2xl border-b border-white/5 px-6 pb-8 pt-4 overflow-hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-4 text-lg font-outfit text-muted hover:text-white transition-colors active:text-primary active:translate-x-1 duration-200"
              >
                <span className={link.label === 'How It Works' ? 'glow-noise' : ''}>
                  {link.label}
                </span>
              </a>
            ))}
            <a
              href="#start"
              onClick={() => setMobileOpen(false)}
              className="mt-4 flex items-center justify-center bg-primary text-white font-jakarta font-bold py-4 rounded-xl text-base shadow-[0_10px_20px_rgba(168,85,247,0.2)] active:scale-98 transition-transform"
            >
              Start Your Free Audit
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
