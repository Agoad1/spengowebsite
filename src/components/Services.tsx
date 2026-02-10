import { motion } from 'framer-motion';
import { Check, Zap, Shield, Cpu, Gauge } from 'lucide-react';

const services = [
  {
    title: 'A Brand New Website',
    description:
      'A beautiful, custom-made site that tells your story and sells your service. No boring templates, no busy work—just a site that works.',
    features: [
      'Design that fits your brand',
      'Words that actually sell',
      'Works perfectly on phones',
    ],
    icon: Cpu,
    className: 'md:col-span-8',
  },
  {
    title: 'Make Your Site Fast',
    description: 'Speed makes people stay. We make your current site load in the blink of an eye.',
    features: ['Instant interactions', 'Google-approved speed'],
    icon: Zap,
    className: 'md:col-span-4',
  },
  {
    title: 'Trust & Profit Audit',
    description: 'We find exactly where your site is losing money and show you how to fix it.',
    features: ['Stop losing customers', 'Fix broken trust signals'],
    icon: Shield,
    className: 'md:col-span-4 space-y-2',
  },
  {
    title: 'Get Found by AI',
    description:
      'People are asking ChatGPT and Google for answers. We set up your site so these tools understand and recommend you.',
    features: [
      'Built for AI search engines',
      'Easy-to-read structure',
      'Better ranking results',
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <span className="text-cyan text-[10px] font-bold uppercase tracking-widest label-tracking">Our Capabilities</span>
          </div>
          <h2 className="font-outfit font-bold text-white text-[clamp(2.5rem,5vw,4rem)] tracking-tight leading-[1] max-w-3xl">
            We build what you actually need. <span className="opacity-40 italic">Not just websites.</span>
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
              className={`glass-card shimmer rounded-3xl p-8 transition-all duration-300 group ${service.className}`}
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
