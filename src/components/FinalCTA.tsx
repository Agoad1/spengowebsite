import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-syne font-extrabold text-white text-[clamp(2rem,4.5vw,3.25rem)] tracking-headline leading-[1.1]">
            Your next customer is one click away from choosing you. Or leaving forever.
          </h2>
          <p className="mt-6 text-muted text-lg">Ensure your site earns that click.</p>
          <motion.a
            href="#start"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 mt-10 bg-cyan text-bg font-dm font-semibold px-8 py-4 rounded-lg text-base transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)]"
          >
            Start Your Project
            <span aria-hidden="true">&rarr;</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
