"use client";

import { motion } from 'framer-motion';
import TactileCard from './TactileCard';

const steps = [
  {
    num: '01',
    title: 'Submit Your Website',
    body: 'Tell us your link and your goals. It takes 2 minutes. No credit card required.',
  },
  {
    num: '02',
    title: 'We Review & Audit',
    body: "We find the problems and tell you how to fix them. No pointless discovery calls.",
  },
  {
    num: '03',
    title: 'We Build the Fix',
    body: 'We design and build the improvements with regular updates. You see progress in real-time.',
  },
  {
    num: '04',
    title: 'We Go Live',
    body: "The site is fast, professional, and ready to win customers. We make sure everything is perfect.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Process() {
  return (
    <motion.section
      id="process"
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan text-[10px] font-bold uppercase tracking-widest mb-4 label-tracking">The Low-Friction Way</p>
          <h2 className="font-outfit font-bold text-white text-[clamp(2rem,4vw,3rem)] tracking-headline leading-[1.1]">
            How it works in 4 steps.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid md:grid-cols-4 gap-4"
        >
          {steps.map((step, i) => (
            <TactileCard
              key={step.num}
              delay={i * 0.1}
              className="rounded-3xl p-8 overflow-hidden group"
            >
              <div className="absolute -top-4 -right-2 font-outfit font-black text-white/5 text-8xl leading-none pointer-events-none">
                {step.num}
              </div>
              <div className="relative pt-6">
                <div className="text-cyan text-xs font-bold tracking-widest uppercase mb-4 opacity-50">Step {step.num}</div>
                <h3 className="font-outfit font-bold text-white text-xl mb-4 tracking-tight">{step.title}</h3>
                <p className="text-muted text-[14px] leading-relaxed">{step.body}</p>
              </div>
            </TactileCard>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
