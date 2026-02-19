"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Why don't you do discovery calls?",
    a: "Because a clear form gets us the same info in less time. We review your details, scope the project properly, and send you a direct plan. No scheduling friction, no wasted time.",
  },
  {
    q: 'How long does a project take?',
    a: "Most technical builds take 2-4 weeks. Design-only upgrades can be faster. You'll get a guaranteed timeline in your fixed-price proposal.",
  },
  {
    q: 'What if I already have a website?',
    a: "Perfect. We audit your current build, identify where you're losing customers, and refactor it into a site that actually performs. We don't just build from scratch—we fix what's broken.",
  },
  {
    q: 'Do you write the copy too?',
    a: 'We provide copywriting direction and structural engineering. If you need full, high-conversion copy, we can scope that into your customized project plan.',
  },
  {
    q: "What's the AI optimization exactly?",
    a: "AI tools like ChatGPT and Perplexity are replacing traditional Google searches. We structure your site data so it's proof-driven, semantically clear, and easy for both humans and AI to recommend.",
  },
];

function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="mb-4"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-6 md:p-8 rounded-2xl glass-card border border-white/5 transition-all duration-300 group hover:border-primary/30 ${isOpen ? 'bg-white/[0.03] border-primary/20' : ''}`}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-outfit font-bold text-white text-lg md:text-xl tracking-tight transition-colors group-hover:text-primary">
            {q}
          </h3>
          <div className={`shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180 bg-primary/20' : ''}`}>
            <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-primary' : 'text-muted'}`} />
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-2 border-t border-white/5">
                <p className="text-muted text-base md:text-lg leading-relaxed max-w-3xl">
                  {a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6">
            <span className="text-primary text-[10px] font-bold uppercase tracking-widest label-tracking">Clear Answers</span>
          </div>
          <h2 className="font-outfit font-bold text-white text-[clamp(2.5rem,5vw,3.5rem)] tracking-tight leading-[1.1] mb-6">
            Everything you need to know.
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Transparent explanations on our process, timelines, and technical foundation.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} i={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-white/5 text-center"
        >
          <p className="text-muted text-sm italic">
            Still have questions? <a href="#start" className="text-primary font-bold hover:text-primary/80 transition-colors">Start your audit</a> and we'll answer them in your custom plan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
