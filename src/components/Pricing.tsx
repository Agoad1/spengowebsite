import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for simple, high-converting landing pages.',
    features: [
      '1 page (landing page)',
      'Custom design',
      'Mobile responsive',
      'Contact/lead form',
      '1 round of revisions',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    description: 'Full website build for businesses ready to convert.',
    features: [
      'Up to 5 pages',
      'Custom design + copywriting direction',
      'AI-search optimized structure',
      'Speed optimization',
      '2 rounds of revisions',
    ],
    highlighted: true,
  },
  {
    name: 'Scale',
    description: 'For businesses that need a full conversion system.',
    features: [
      'Unlimited pages',
      'Full conversion audit + strategy',
      'Custom animations and interactions',
      'Ongoing optimization (1 month)',
      'Priority support',
    ],
    highlighted: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan text-sm font-medium tracking-wide uppercase mb-4">Service Plans</p>
          <h2 className="font-syne font-bold text-white text-[clamp(2rem,4vw,3rem)] tracking-headline leading-[1.1]">
            Standardized packages. Custom results.
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`rounded-2xl border p-8 md:p-10 backdrop-blur-sm transition-colors duration-300 ${plan.highlighted
                ? 'border-cyan/30 bg-cyan/[0.03] hover:border-cyan/50'
                : 'border-card-border bg-card hover:border-cyan/10'
                }`}
            >
              {plan.highlighted && (
                <span className="inline-block text-[11px] font-medium text-cyan bg-cyan/10 px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
                  Recommended
                </span>
              )}
              <h3 className="font-syne font-bold text-white text-xl mb-4">{plan.name}</h3>
              <p className="text-muted text-[15px] leading-[1.7] mb-8">{plan.description}</p>
              <ul className="space-y-3 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-body text-[15px]">
                    <Check className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.a
                href="#start"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center justify-center w-full py-3 rounded-lg font-dm font-semibold text-sm transition-all duration-200 ${plan.highlighted
                  ? 'bg-cyan text-bg hover:shadow-[0_0_30px_rgba(0,229,255,0.25)]'
                  : 'border border-cyan/20 text-cyan hover:border-cyan/40'
                  }`}
              >
                Inquire Now
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-muted text-sm"
        >
          Need something custom? Start a project and tell us what you need. We will scope it for you.
        </motion.p>
      </div>
    </section>
  );
}
