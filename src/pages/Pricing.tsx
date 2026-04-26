import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, Info, HelpCircle, ArrowRight, Zap, 
  ShieldCheck, Globe, Cpu, Users, MessageSquare 
} from 'lucide-react';

interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  delay: number;
}

const PricingCard: React.FC<PricingPlanProps> = ({ name, price, description, features, cta, popular, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className={`relative glass rounded-[40px] p-10 flex flex-col h-full border-white/5 transition-all duration-500 hover:border-blue-500/30 ${popular ? 'border-blue-500/20 bg-blue-600/[0.03] scale-105 z-10 shadow-2xl shadow-blue-500/10' : ''}`}
  >
    {popular && (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.5)]">
        Most Popular
      </div>
    )}
    
    <div className="mb-10">
      <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-4">{name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-5xl font-display font-black text-white">{price}</span>
        {price !== 'Custom' && <span className="text-gray-500 font-bold">/mo</span>}
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>

    <div className="space-y-4 mb-12 flex-1">
      {features.map((feature) => (
        <div key={feature} className="flex items-start gap-3">
          <div className="mt-1 bg-blue-500/20 rounded-full p-0.5">
            <Check size={14} className="text-blue-400" />
          </div>
          <span className="text-gray-300 text-sm font-medium">{feature}</span>
        </div>
      ))}
    </div>

    <button className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group ${popular ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
      {cta} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter Plan",
      price: isAnnual ? "$499" : "$599",
      description: "Ideal for growing logistics teams looking to digitize basic visibility.",
      features: [
        "Real-time Dashboard Access",
        "Basic Operational Analytics",
        "Up to 5 API Integrations",
        "Limited GPS Tracking Ports",
        "Email Support",
        "Core Route Monitoring"
      ],
      cta: "Start Free Trial",
      delay: 0.1
    },
    {
      name: "Growth Plan",
      price: isAnnual ? "$1,299" : "$1,499",
      description: "Full predictive power for scaling operations across complex networks.",
      features: [
        "AI Predictive Delay Engine",
        "Dynamic Route Optimization",
        "Disruption Severity Alerts",
        "Advanced ESG Reporting",
        "24/7 Priority Support",
        "Custom Workflow Automation"
      ],
      popular: true,
      cta: "Get Started",
      delay: 0.2
    },
    {
      name: "Enterprise Plan",
      price: "Custom",
      description: "Bespoke AI deployment for global organizations with unique constraints.",
      features: [
        "Custom Trained AI Models",
        "Unlimited API Access",
        "Full Autonomous Automation",
        "On-premise Deployment Option",
        "Dedicated Success Manager",
        "SLA Guarantee Protection"
      ],
      cta: "Contact Sales",
      delay: 0.3
    }
  ];

  return (
    <div className="relative z-10 pt-40 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <section className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs mb-8 tracking-[0.3em] uppercase border border-blue-500/20"
          >
            Transparent Scalability
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8"
          >
            Invest in <span className="gradient-text">Certainty.</span>
          </motion.h1>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 bg-blue-600/20 rounded-full relative p-1 border border-blue-500/30 transition-colors"
            >
              <motion.div 
                animate={{ x: isAnnual ? 24 : 0 }}
                className="w-6 h-6 bg-blue-500 rounded-full shadow-lg"
              />
            </button>
            <span className={`text-sm font-bold ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
              Annual <span className="text-emerald-400 text-[10px] ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>

        {/* FAQ - Quick Section */}
        <div className="max-w-4xl mx-auto mb-40">
           <h2 className="text-4xl font-display font-black text-center mb-16 uppercase tracking-tight">Common <span className="text-blue-500">Questions</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { q: "How long does deployment take?", a: "Starter plans typically deploy in 48 hours. Enterprise deployments take 4-6 weeks for full AI model training." },
                { q: "Can we integrate existing hardware?", a: "Yes, NavGati AI connects with 95% of industrial GPS, ELD, and sensor hardware through our Core API." },
                { q: "Is there a long-term contract?", a: "Monthly plans have no commitment. Annual plans offer significant discounts and priority implementation." },
                { q: "How secure is our data?", a: "We are SOC2 Type II compliant. Your logistics data is encrypted at rest and in transit with enterprise-grade security." },
              ].map((faq, i) => (
                <div key={i} className="glass p-8 rounded-3xl border-white/5">
                  <div className="flex gap-4 mb-4">
                     <HelpCircle size={20} className="text-blue-500 shrink-0" />
                     <h4 className="font-bold text-white leading-tight">{faq.q}</h4>
                  </div>
                  <p className="text-sm text-gray-400 pl-9 leading-relaxed">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>

        {/* CTA Section */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="glass rounded-[60px] p-12 md:p-24 relative overflow-hidden text-center border-blue-500/10 shadow-2xl"
        >
           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 -z-10" />
           <h2 className="text-4xl md:text-6xl font-display font-black mb-6 uppercase tracking-tight">Need Custom <span className="text-blue-500">Enterprise</span> Deployment?</h2>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
             We provide bespoke infrastructure for global scale. Let's design a strategy that fits your unique operational topography.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="btn-primary px-10 py-5 text-xl">Book Strategy Consultation</button>
              <button className="px-10 py-5 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-white border border-white/10 transition-all flex items-center gap-2">
                <MessageSquare size={20} /> Talk to an Expert
              </button>
           </div>
           
           <div className="mt-16 flex flex-wrap items-center justify-center gap-12 grayscale opacity-30">
              <Cpu size={40} />
              <Globe size={40} />
              <Users size={40} />
              <ShieldCheck size={40} />
           </div>
        </motion.div>
      </section>
    </div>
  );
}
