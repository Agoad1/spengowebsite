import { motion } from 'framer-motion';

const faqs = [
  {
    q: "Why don't you do calls?",
    a: "Because a clear form gets us the same info in less time. We review your details, scope the project properly, and send you a plan. No scheduling friction, no wasted time.",
  },
  {
    q: 'How long does a project take?',
    a: "Most builds take 2-4 weeks depending on scope. Upgrades can be faster. You'll get a clear timeline in your proposal.",
  },
  {
    q: 'What if I already have a website?',
    a: "Perfect. We audit it, identify what's costing you conversions, and upgrade it into a site that actually performs.",
  },
  {
    q: 'Do you write the copy too?',
    a: 'We provide copywriting direction and structure. If you need full copy, we can scope that into your project.',
  },
  {
    q: "What's the AI optimization about?",
    a: "AI tools like ChatGPT and Perplexity are replacing Google for a lot of searches. We structure your site so it's clear, proof-driven, and easy for both humans and AI to understand and recommend.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan text-[10px] font-bold uppercase tracking-widest mb-4 label-tracking">FAQ</p>
          <h2 className="font-outfit font-bold text-white text-[clamp(2rem,4vw,3rem)] tracking-headline leading-[1.1] mb-12">
            Questions? Answered.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {faqs.map((item, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 h-full">
              <h3 className="font-outfit font-bold text-white text-lg mb-3 tracking-tight">{item.q}</h3>
              <p className="text-muted text-[14px] leading-relaxed">{item.a}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
