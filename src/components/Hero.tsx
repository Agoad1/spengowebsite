import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                If it&rsquo;s slow, outdated, or confusing, they&rsquo;re gone in seconds. We build <span className="soft-highlight">fast, modern</span> sites that make buying <span className="soft-highlight">easy</span> and earn trust instantly.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton href="#start">
                <div className="relative inline-flex items-center gap-2 bg-primary text-white font-jakarta font-semibold px-8 py-4 rounded-lg text-base btn-jump">
                  Start Your Free Audit
                  <span aria-hidden="true" className="text-lg">&rarr;</span>
                </div>
              </MagneticButton>

              <a
                href="#pricing"
                className="text-muted hover:text-body transition-colors text-sm font-medium label-tracking"
              >
                <span className="glow-noise italic">HOW IT WORKS &darr;</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
