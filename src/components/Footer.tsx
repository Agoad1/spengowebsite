"use client";

import { Twitter, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 bg-[#0a0a0a] relative z-10 font-jakarta">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* Left Side: Identity & Location */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left order-2 md:order-1">
          <p className="text-muted/40 text-[11px] font-bold uppercase tracking-[0.2em]">&copy; 2026 Spengo Technologies</p>
          <p className="text-muted/20 text-[10px] tracking-wider uppercase font-semibold">Engineered for Performance.</p>
          <p className="text-muted/40 text-[10px] font-medium mt-1">Cincinnati, OH | Cleveland, OH</p>
        </div>

        {/* Center: Contact Info */}
        <div className="flex flex-col items-center gap-3 order-1 md:order-2">
          <a
            href="tel:586-909-0660"
            className="flex items-center gap-2 text-muted/60 hover:text-white transition-colors text-sm font-medium"
          >
            <Phone size={14} className="text-primary/50" />
            586-909-0660
          </a>
          <a
            href="mailto:adamgoad22@gmail.com"
            className="flex items-center gap-2 text-muted/60 hover:text-white transition-colors text-sm font-medium"
          >
            <Mail size={14} className="text-primary/50" />
            adamgoad22@gmail.com
          </a>
        </div>

        {/* Right Side: Socials & Status */}
        <div className="flex flex-col items-center md:items-end gap-6 order-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 opacity-30 cursor-not-allowed group relative" title="Coming Soon">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted">
                <Twitter className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/5 px-2 py-1 rounded">Coming Soon</span>
            </div>
            <a
              href="mailto:adamgoad22@gmail.com"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted/60 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted/40 text-[10px] font-bold uppercase tracking-widest">System Status: Optimal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
