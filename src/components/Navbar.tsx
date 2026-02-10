import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const navLinks = [
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
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
        <a href="/" className="font-outfit text-2xl font-bold text-white tracking-tighter">
          SPENGO<span className="text-cyan">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-body transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <motion.a
            href="#start"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm text-cyan border border-cyan/30 hover:border-cyan/60 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Free Audit
          </motion.a>
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-card-border px-6 pb-6 pt-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-muted hover:text-body transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#start"
            onClick={() => setMobileOpen(false)}
            className="inline-block mt-2 text-sm text-cyan border border-cyan/30 px-4 py-2 rounded-lg"
          >
            Free Audit
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
