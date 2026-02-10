import { motion } from 'framer-motion';
import { Check, Zap, Shield, Cpu, Gauge } from 'lucide-react';

const services = [
  {
    title: 'Flagship Website Builds',
    description:
      'The foundation of your digital authority. We design and develop conversion-focused websites engineered for the AI era. No templates, no bloat—just pure performance.',
    features: [
      'Identity-driven custom design',
      'High-conversion copywriting',
      'Mobile-first architecture',
    ],
    icon: Cpu,
    className: 'md:col-span-8',
  },
  {
    title: 'Performance Optimization',
    description: 'Speed is a trust signal. We push your site to sub-second load times.',
    features: ['Instant interactions', 'Perfect Core Web Vitals'],
    icon: Zap,
    className: 'md:col-span-4',
  },
  {
    title: 'Trust & ROI Audit',
    description: 'We identify where your site is bleeding money and how to stop it.',
    features: ['Conversion gap analysis', 'Trust-signal optimization'],
    icon: Shield,
    className: 'md:col-span-4 space-y-2',
  },
  {
    title: 'AI-Ready Infrastructure',
    description:
      'Search has changed. We structure your site so AI answer engines (Perplexity, ChatGPT, Gemini) can find, understand, and recommend your business to high-intent leads.',
    features: [
      'Semantic HTML/Schema implementation',
      'LLM-readable content structure',
      'Automated technical SEO pipelines',
    ],
    icon: Gauge,
    className: 'md:col-span-8',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/20 px-3 py-1 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan"></span>
            </span>
            <span className="text-cyan text-[10px] font-bold uppercase tracking-widest">Our Capabilities</span>
          </div>
          <h2 className="font-outfit font-bold text-white text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-[1] max-w-3xl">
            We build conversion infrastructure. <span className="opacity-40 italic">Not just websites.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className={`glass-card rounded-3xl p-8 transition-all duration-300 group ${service.className}`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan/30 transition-colors">
                  <service.icon className="w-6 h-6 text-white group-hover:text-cyan transition-colors" />
                </div>

                <h3 className="font-outfit font-bold text-white text-2xl mb-4 tracking-tight">{service.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed mb-auto max-w-lg">{service.description}</p>

                <div className="mt-8 pt-8 border-t border-white/5">
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-body/80 text-[13px]">
                        <Check className="w-3.5 h-3.5 text-cyan" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
