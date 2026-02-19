"use client";

import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const steps = [
  {
    number: '01',
    title: 'You Submit Your Site',
    description: 'Takes 2 minutes. No credit card. No commitment.',
  },
  {
    number: '02',
    title: 'We Audit Everything',
    description: "You'll receive a detailed scope, custom pricing, and technical breakdown. No pointless discovery calls.",
  },
  {
    number: '03',
    title: 'Review The Roadmap & Decide',
    description: "We show you exactly what's broken and how to fix it. If you like the plan, we build it. If not, you keep the audit and walk away for free.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export default function Pricing() {
  return (
    <motion.section
      id="pricing"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="relative py-24 md:py-32 overflow-hidden bg-bg"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="max-w-2xl text-center mb-16">
          <h2 className="font-outfit font-bold text-white text-[clamp(2rem,4vw,3.5rem)] tracking-tight leading-[1.1]">
            How It Works
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="w-full max-w-[800px] flex flex-col gap-4 relative"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="glass-card group p-8 rounded-2xl relative z-10"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <span className="font-outfit font-black text-6xl md:text-7xl text-primary opacity-20 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-outfit font-bold text-white text-xl md:text-2xl mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted text-base md:text-lg leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center max-w-2xl"
        >
          <p className="text-body/80 text-lg leading-relaxed mb-10">
            Every site is different. After your audit, we'll give you a price range based on what we find. Most projects range from <span className="text-white font-bold">$500 - $1,500</span>.
          </p>

          <MagneticButton href="#start">
            <div className="relative inline-flex items-center gap-2 bg-primary text-white font-jakarta font-semibold px-10 py-5 rounded-lg text-lg btn-jump">
              Start Your Free Audit
              <span aria-hidden="true" className="text-xl">&rarr;</span>
            </div>
          </MagneticButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
