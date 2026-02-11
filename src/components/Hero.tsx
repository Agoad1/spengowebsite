import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest label-tracking">Available for March projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-outfit font-semibold tracking-[-0.02em] text-white text-[clamp(2.5rem,5vw,60px)] leading-[1.1] max-w-[900px]"
          >
            We Make It Easy For <br />
            Your Website Visitors To Convert
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="mt-6">
              <p className="text-[20px] font-medium leading-[1.5] text-white">
                People don't browse anymore. They land on your site with intent to buy.
              </p>
              <p className="mt-4 text-[18px] font-normal leading-[1.6] text-[#a8a8a8] max-w-[700px]">
                If it&rsquo;s slow, outdated, or confusing, they&rsquo;re gone in seconds. We build fast, modern sites that make buying easy and earn trust instantly.
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
                HOW IT WORKS &darr;
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
