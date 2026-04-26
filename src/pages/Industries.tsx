import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, Factory, Zap, Thermometer, Store, Globe, 
  ArrowRight, Box, CheckCircle2, TrendingUp
} from 'lucide-react';

interface IndustryProps {
  icon: any;
  title: string;
  description: string;
  features: string[];
  imageColor: string;
  delay: number;
}

const IndustryCard: React.FC<IndustryProps> = ({ icon: Icon, title, description, features, imageColor, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="glass rounded-[40px] overflow-hidden group border-white/5 hover:border-blue-500/30 transition-all flex flex-col h-full"
  >
    <div className={`h-48 w-full ${imageColor} relative overflow-hidden flex items-center justify-center`}>
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
      <Icon size={80} className="text-white relative z-10 group-hover:scale-110 transition-transform duration-700 opacity-80" />
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
        Industry Vertical
      </div>
    </div>
    
    <div className="p-8 flex flex-col flex-1">
      <h3 className="text-2xl font-display font-bold mb-3 tracking-tight group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400 mb-6 text-sm leading-relaxed">{description}</p>
      
      <div className="space-y-3 mb-8 flex-1">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-xs text-gray-300 font-medium">
            <CheckCircle2 size={14} className="text-blue-500" />
            {feature}
          </div>
        ))}
      </div>
      
      <button className="flex items-center gap-2 text-white font-bold text-sm group-hover:gap-3 transition-all mt-auto pt-6 border-t border-white/5">
        View Case Study <ArrowRight size={16} className="text-blue-500" />
      </button>
    </div>
  </motion.div>
);

export default function Industries() {
  const industries = [
    {
      icon: ShoppingBag,
      title: "E-Commerce",
      description: "In a world of one-day delivery, speed is survival. We optimize every leg of your fulfillment journey.",
      features: ["Next-day delivery pathing", "Automated fulfillment logic", "Customer-ready tracking"],
      imageColor: "bg-blue-600/20",
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Production lines can't wait. We ensure raw materials and finished goods flow without friction.",
      features: ["Just-in-time inventory sync", "Assembly line continuity", "Vendor risk management"],
      imageColor: "bg-purple-600/20",
    },
    {
      icon: Zap,
      title: "FMCG",
      description: "High volume requires rapid decisions. Our AI manages the distribution of high-turnover goods.",
      features: ["Rapid refresh distribution", "Shelf-life optimization", "Market-first logistics"],
      imageColor: "bg-emerald-600/20",
    },
    {
      icon: Thermometer,
      title: "Cold Chain",
      description: "Temperature-sensitive cargo needs more than just speed. We monitor the math of safety.",
      features: ["Climate-aware routing", "Spoilage prevention AI", "Redundant sensor logs"],
      imageColor: "bg-cyan-600/20",
    },
    {
      icon: Store,
      title: "Retail Logistics",
      description: "From DC to Store to Customer. We bridge the gap between digital inventory and physical location.",
      features: ["Store replenishment math", "Inventory movement tools", "Omnichannel delivery"],
      imageColor: "bg-orange-600/20",
    },
    {
      icon: Globe,
      title: "International Shipping",
      description: "Navigating ports, customs, and global borders. We see the world's risks before they touch your cargo.",
      features: ["Port congestion prediction", "Global risk map sync", "Cross-border automation"],
      imageColor: "bg-indigo-600/20",
    },
  ];

  return (
    <div className="relative z-10 pt-40 pb-20 overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-blue-600/10 blur-[150px] -z-10" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-purple-600/10 blur-[150px] -z-10" />

      <section className="px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs mb-8 tracking-[0.3em] uppercase border border-blue-500/20"
          >
            Specialized Solutions
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-[0.9]"
          >
            Built for <span className="gradient-text">Your Industry.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-400 font-light max-w-2xl border-l-2 border-blue-500/50 pl-8"
          >
            Generic logistics is for yesterday. NavGati AI provides high-precision intelligence tailored to the specific needs of your vertical.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, i) => (
            <IndustryCard key={ind.title} {...ind} delay={i * 0.1} />
          ))}
        </div>

        {/* Global Reach Counter */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 p-12 glass rounded-[60px] relative overflow-hidden border-white/5">
           <div className="absolute inset-0 bg-blue-600/[0.02] -z-10" />
           <div className="text-center">
              <div className="text-5xl font-display font-black mb-2">200+</div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">Global Regions</div>
           </div>
           <div className="text-center md:border-x border-white/10">
              <div className="text-5xl font-display font-black mb-2">10M+</div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">Shipments Tracked</div>
           </div>
           <div className="text-center">
              <div className="text-5xl font-display font-black mb-2">99.9%</div>
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">SLA Accuracy</div>
           </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-40 px-6 max-w-5xl mx-auto text-center">
        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-transparent mx-auto mb-12" />
        <p className="text-3xl md:text-4xl font-display font-medium text-white italic leading-relaxed mb-12">
          "NavGati didn't just give us a map; they gave us the ability to predict the future of our supply chain. Our manufacturing uptime has never been higher."
        </p>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-blue-600/20 mb-4 flex items-center justify-center font-bold text-xl text-blue-400 border border-blue-500/20">JS</div>
          <p className="font-bold text-white">James Sterling</p>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Director of Global Supply Chain, Sterling Titan Inc.</p>
        </div>
      </section>
    </div>
  );
}
