import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const services = [
  {
    title: 'Website Builds',
    description:
      'Starting from scratch? We design and develop conversion-focused websites engineered for the AI era. Clear messaging, fast load times, trust-first design — built to turn visitors into buyers.',
    features: [
      'Custom design, no templates',
      'Structured for AI search visibility',
      'Mobile-first, blazing fast',
      'Conversion-optimized from page one',
    ],
  },
  {
    title: 'Website Upgrades',
    description:
      "Already have a site? We rebuild and optimize it into a trust-and-conversion hub. Same brand, sharper execution — designed to compete in a market where attention spans are measured in seconds.",
    features: [
      'Full UX and conversion audit',
      'Redesign key pages for clarity and trust',
      'Speed and performance optimization',
      'Structured for AI answer engines',
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan text-sm font-medium tracking-wide uppercase mb-4">What We Build</p>
          <h2 className="font-syne font-bold text-white text-[clamp(2rem,4vw,3rem)] tracking-headline leading-[1.1]">
            Conversion infrastructure. Not just websites.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid md:grid-cols-2 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="rounded-2xl border border-card-border bg-card p-8 md:p-10 backdrop-blur-sm hover:border-cyan/10 transition-colors duration-300"
            >
              <h3 className="font-syne font-bold text-white text-2xl mb-4">{service.title}</h3>
              <p className="text-muted text-[15px] leading-[1.7] mb-8">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-body text-[15px]">
                    <Check className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
