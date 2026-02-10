import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const titleWords = "Your website either wins a customer or loses one in a split second.".split(" ");

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 * i },
  }),
};

const child = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

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
            variants={container}
            initial="hidden"
            animate="visible"
            className="font-outfit font-extrabold tracking-tighter text-white text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] lg:max-w-5xl"
          >
            {titleWords.map((word, index) => (
              <motion.span
                variants={child}
                key={index}
                className="inline-block mr-[0.2em]"
              >
                {word === "wins" || word === "loses" ? (
                  <span className="text-cyan">{word}</span>
                ) : word === "split" || word === "second." ? (
                  <span className="opacity-40 font-light">{word}</span>
                ) : word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            <p className="mt-12 text-xl md:text-2xl font-outfit font-medium text-white/90 max-w-2xl leading-tight">
              The internet doesn&rsquo;t browse anymore. <span className="text-cyan italic">People are in a hurry.</span>
            </p>
            <p className="mt-4 text-lg text-muted max-w-[600px] leading-relaxed">
              If your site looks old or load times are slow, they leave. We build the infrastructure that turns skepticism into trust instantly.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton href="#start">
                <div className="relative inline-flex items-center gap-2 bg-cyan text-bg font-jakarta font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,229,255,0.3)] hover:scale-[1.02]">
                  Start Your Audit
                  <span aria-hidden="true" className="text-lg">&rarr;</span>
                </div>
              </MagneticButton>

              <a
                href="#process"
                className="text-muted hover:text-body transition-colors text-sm font-medium label-tracking"
              >
                THE PROCESS &darr;
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
