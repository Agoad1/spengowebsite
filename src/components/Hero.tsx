import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center dot-pattern">
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-4xl"
        >
          <h1 className="font-syne font-extrabold tracking-headline text-white text-[clamp(2.5rem,6vw,5rem)] leading-[1.05]">
            Your website is the only thing between{' '}
            <span className="text-cyan">paid</span> and the{' '}
            <span className="text-cyan">back button</span>.
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-lg text-muted max-w-[640px] leading-[1.7]"
          >
            AI changed how people buy. They ask, they click, they decide in seconds.
            We build websites that earn trust instantly — and convert before they leave.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <motion.a
              href="#start"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-2 bg-cyan text-bg font-dm font-semibold px-7 py-3.5 rounded-lg text-base transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)]"
            >
              Start Your Project
              <span aria-hidden="true">&rarr;</span>
            </motion.a>

            <a
              href="#process"
              className="text-muted hover:text-body transition-colors text-sm"
            >
              See How It Works &darr;
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-12 text-xs text-muted/70"
          >
            Trusted by founders and small businesses ready to compete in the AI era.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
