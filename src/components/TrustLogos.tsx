import { motion } from 'motion/react';

export default function TrustLogos() {
  const industries = [
    'Manufacturing', 'E-commerce', 'FMCG', 'Retail', 'Logistics Partners'
  ];

  return (
    <section className="py-20 border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-500 text-sm font-medium mb-12 uppercase tracking-widest">
          Trusted by Leaders In
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {industries.map((ind) => (
            <span 
              key={ind} 
              className="text-xl md:text-2xl font-display font-bold text-white tracking-tight"
            >
              {ind}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
