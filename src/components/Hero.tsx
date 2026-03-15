"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import { trackClick } from '@/lib/analytics';

export default function Hero() {
  const [location, setLocation] = useState('across the country');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.city && data.region) {
          setLocation(`${data.city}, ${data.region}`);
        }
      })
      .catch(err => console.error('Location fetch error:', err));
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Hero Background Image */}
      <div style={{ backgroundImage: `url('/images/hero.png')` }} className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" />

      {/* Positioned under navbar links */}
      <div className="absolute top-24 left-0 right-0 z-20 pointer-events-none hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -25, 0, 20, 0],
              x: [0, 15, 0, -10, 0],
            }}
            transition={{
              opacity: { duration: 1, delay: 1.5 },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="relative group">
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-primary/30 blur-2xl rounded-full -z-10"
              />
              <div className="relative flex items-center gap-4 bg-white/[0.05] backdrop-blur-xl border border-white/10 px-6 py-3.5 rounded-2xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_12px_rgba(168,85,247,0.6)]"></span>
                </span>
                <span className="text-[12px] font-black text-white/70 uppercase tracking-[0.25em] whitespace-nowrap">
                  📍 Serving {location}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 bg-white/[0.03] backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-10 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></span>
            </span>
            <span className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.2em] group-hover:text-white/80 transition-colors">
              Available for March projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-outfit font-semibold tracking-[-0.02em] text-white text-[clamp(2.5rem,5vw,60px)] leading-[1.1] max-w-[900px]"
          >
            We Make It <span className="soft-highlight">Easy</span> For <br />
            Your Website Visitors To <span className="soft-highlight">Convert</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="mt-6">
              <p className="text-[20px] font-medium leading-[1.5] text-white">
                People don't browse anymore. They land on your site with <span className="soft-highlight">intent to buy</span>.
              </p>
              <p className="mt-4 text-[18px] font-normal leading-[1.6] text-[#a8a8a8] max-w-[700px]">
                If it's slow, outdated, or confusing, they're gone in seconds. We build <span className="soft-highlight">fast, modern</span> sites that make buying <span className="soft-highlight">easy</span> and earn trust instantly.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton href="#start" onClick={() => trackClick('hero_start_audit')}>
                <div className="relative inline-flex items-center gap-2 bg-primary text-white font-jakarta font-semibold px-8 py-4 rounded-lg text-base btn-jump">
                  Start Your Free Audit
                  <span aria-hidden="true" className="text-lg">→</span>
                </div>
              </MagneticButton>

              
                href="#pricing"
                onClick={() => trackClick('hero_how_it_works')}
                className="text-muted hover:text-body transition-colors text-sm font-medium label-tracking"
              >
                <span className="glow-noise italic">HOW IT WORKS ↓</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
