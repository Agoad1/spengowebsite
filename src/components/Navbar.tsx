"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SpengoLogo } from './SpengoLogo';
import { Search } from 'lucide-react';
import SearchOverlay from './SearchOverlay';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/#pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Changelog', href: '/changelog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

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
            <div key={link.href} className="relative group py-4">
              {link.label === 'How It Works' ? (
                <>
                  <button className={`text-sm transition-colors duration-200 link-underline pb-1 flex items-center gap-1 ${isActive(link.href) ? 'text-primary' : 'text-muted hover:text-body'
                    }`}>
                    <span className="glow-noise">{link.label}</span>
                    <svg className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className="absolute top-full left-[-120px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-[60]">
                    {/* Invisible Bridge */}
                    <div className="absolute top-0 left-0 right-0 h-4" />

                    <div className="bg-[#0f0f0f] border border-white/10 border-t-2 border-t-primary rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden min-w-[650px] p-7 grid grid-cols-3 gap-0 backdrop-blur-xl">
                      {/* Column 1 - Services */}
                      <div className="space-y-3 px-6 border-r border-white/10">
                        <p className="mb-4 text-white/50 text-[10px] font-bold tracking-widest uppercase">WHAT WE DO</p>
                        <ul className="space-y-3">
                          {[
                            'Free Website Audit',
                            'Conversion-Focused Design',
                            'Next.js Development',
                            'AI Performance Optimization'
                          ].map((item) => (
                            <li key={item} className="flex items-center gap-3 group/item cursor-pointer px-2 -ml-2 py-1.5 rounded-lg hover:bg-primary/5 transition-all duration-150">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover/item:bg-primary transition-colors" />
                              <span className="text-sm text-muted group-hover/item:text-primary transition-colors">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2 - Quick CTA */}
                      <div className="space-y-3 px-6 border-r border-white/10">
                        <p className="mb-4 text-white/50 text-[10px] font-bold tracking-widest uppercase">GET STARTED</p>
                        <div className="space-y-4">
                          <p className="text-sm text-white font-medium">Ready to stop losing visitors?</p>
                          <a
                            href="#start"
                            className="inline-flex items-center justify-center w-fit px-5 bg-primary hover:bg-primary/90 text-white text-[11px] font-bold py-2.5 rounded-full transition-all btn-jump"
                          >
                            Start Your Free Audit →
                          </a>
                          <p className="text-[10px] text-muted italic">No credit card. No commitment.</p>
                        </div>
                      </div>

                      {/* Column 3 - How It Works Preview */}
                      <div className="space-y-3 px-6">
                        <p className="mb-4 text-white/50 text-[10px] font-bold tracking-widest uppercase">THE PROCESS</p>
                        <div className="space-y-3">
                          {[
                            { step: '01', text: 'Submit Your Site' },
                            { step: '02', text: 'We Audit Everything' },
                            { step: '03', text: 'Review & Decide' }
                          ].map((item) => (
                            <div key={item.step} className="flex gap-3 group/item cursor-pointer px-2 -ml-2 py-1.5 rounded-lg hover:bg-primary/5 transition-all duration-150">
                              <span className="text-[10px] font-bold text-primary/40 mt-1 group-hover/item:text-primary transition-colors">{item.step}</span>
                              <span className="text-sm text-muted group-hover/item:text-primary transition-colors">{item.text}</span>
                            </div>
                          ))}
                          <div className="pt-2 px-2">
                            <a href="#pricing" className="text-xs text-muted hover:text-primary flex items-center gap-1 transition-colors group/link">
                              See full process
                              <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={link.href}
                  className={`text-sm transition-colors duration-200 link-underline pb-1 ${isActive(link.href) ? 'text-primary glow-noise' : 'text-muted hover:text-body'
                    }`}
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-muted hover:text-primary transition-colors hover:bg-white/5 rounded-full ml-2"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <a
            href="#start"
            className="text-sm text-primary border border-primary/30 hover:border-primary/60 px-4 py-2 rounded-lg btn-jump ml-2"
          >
            Start Your Free Audit
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-muted hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-body transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-5 h-px bg-body transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </div>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

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
                className={`block py-4 text-lg font-outfit transition-colors active:translate-x-1 duration-200 ${isActive(link.href) ? 'text-primary' : 'text-muted hover:text-white'
                  }`}
              >
                <span className={link.label === 'How It Works' || isActive(link.href) ? 'glow-noise' : ''}>
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
