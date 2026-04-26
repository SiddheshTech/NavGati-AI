import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Mail, Phone, MessageSquare, MapPin, 
  Globe, Clock, ArrowRight, CheckCircle, Send,
  Users, Building, Briefcase, ChevronRight
} from 'lucide-react';

export default function Contact() {
  const [formType, setFormType] = useState<'general' | 'demo'>('general');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const offices = [
    { 
      type: 'HQ', 
      city: 'San Francisco', 
      address: '333 Market Street, Suite 900, San Francisco, CA 94105',
      timezone: 'PST'
    },
    { 
      type: 'Regional', 
      city: 'Singapore', 
      address: '10 Collyer Quay, Ocean Financial Centre, Singapore 049315',
      timezone: 'SGT'
    },
    { 
      type: 'Regional', 
      city: 'London', 
      address: '22 Bishopsgate, London EC2N 4AJ, United Kingdom',
      timezone: 'GMT'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Users },
    { name: 'Twitter', icon: Send },
    { name: 'Global Network', icon: Globe }
  ];

  return (
    <div className="relative z-10 pt-40 pb-20">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
      </div>

      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Info & Context */}
          <div className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-xs mb-8 tracking-[0.3em] uppercase border border-blue-500/20"
              >
                Global Operations
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 leading-[0.9]"
              >
                Let's Build <br/> <span className="gradient-text">Certainty.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl text-gray-400 font-light max-w-xl leading-relaxed"
              >
                Connect with our logistics experts to design a supply chain that moves at the speed of intelligence.
              </motion.p>
            </div>

            {/* Quick Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Mail, label: 'Email', value: 'intelligence@navgati.ai' },
                { icon: Phone, label: 'Phone', value: '+1 (888) NAV-GATI' },
                { icon: MessageSquare, label: 'Live Chat', value: '24/7 Operations Room' },
                { icon: Clock, label: 'Global Support', value: 'Always Active' },
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={item.label} 
                  className="glass p-6 rounded-3xl border-white/5 hover:border-blue-500/20 transition-all group"
                >
                  <item.icon className="text-blue-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" size={24} />
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">{item.label}</p>
                  <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Office Locations */}
            <div>
              <h3 className="text-xl font-display font-bold mb-8 uppercase tracking-tight text-white/50">Global Node Centers</h3>
              <div className="space-y-6">
                {offices.map((office, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={office.city} 
                    className="flex gap-6 group cursor-default"
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/20 transition-all">
                      <MapPin size={20} className="text-gray-400 group-hover:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-white text-lg">{office.city}</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-lg border border-blue-500/20">{office.type}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{office.timezone}</span>
                      </div>
                      <p className="text-gray-500 text-sm max-w-xs group-hover:text-gray-400 transition-colors">{office.address}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="relative">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="glass rounded-[40px] p-8 md:p-12 border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600" />
              
              {/* Form Tab Toggles */}
              <div className="flex bg-white/5 rounded-2xl p-1 mb-10 border border-white/5">
                <button 
                  onClick={() => setFormType('general')}
                  className={`flex-1 py-3 text-sm font-bold rounded-[14px] transition-all ${formType === 'general' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  General Inquiry
                </button>
                <button 
                  onClick={() => setFormType('demo')}
                  className={`flex-1 py-3 text-sm font-bold rounded-[14px] transition-all ${formType === 'demo' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  Request Platform Demo
                </button>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key={formType}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-2">First & Last Name</label>
                        <div className="relative">
                          <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input type="text" required placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-2">Company Name</label>
                        <div className="relative">
                          <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input type="text" required placeholder="Titan Logistics Inc." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-2">Business Email</label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input type="email" required placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-2">Phone Number</label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input type="tel" required placeholder="+1 (555) 000-0000" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-2">Industry Vertical</label>
                        <div className="relative">
                          <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none appearance-none">
                            <option className="bg-[#020617]">Manufacturing</option>
                            <option className="bg-[#020617]">E-Commerce</option>
                            <option className="bg-[#020617]">Cold Chain</option>
                            <option className="bg-[#020617]">FMCG</option>
                            <option className="bg-[#020617]">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-2">Estimated Fleet Size</label>
                        <div className="relative">
                          <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none appearance-none">
                            <option className="bg-[#020617]">1-50 Assets</option>
                            <option className="bg-[#020617]">50-200 Assets</option>
                            <option className="bg-[#020617]">200-1000 Assets</option>
                            <option className="bg-[#020617]">1000+ Enterprise</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-2">Detailed Context</label>
                      <textarea rows={4} placeholder="Tell us about your specific supply chain challenges..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none resize-none"></textarea>
                    </div>

                    <div className="pt-4">
                      <button className={`w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 group relative overflow-hidden ${formType === 'demo' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'}`}>
                        {formType === 'demo' ? 'Schedule System Walkthrough' : 'Send Inquiry'}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                    
                    <p className="text-[10px] text-gray-600 text-center px-8">
                      By submitting this form, you agree to our <span className="text-gray-400 underline cursor-pointer">Privacy Policy</span> and consent to NavGati AI contacting you regarding specialized logistics strategy.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/30">
                      <CheckCircle size={40} className="text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tight">Transmission Received</h2>
                    <p className="text-gray-400 max-w-sm mx-auto mb-10">
                      Your operational data has been routed to our strategy team. We'll be in touch within 4 hours to discuss the next steps of your supply chain evolution.
                    </p>
                    <button onClick={() => setIsSubmitted(false)} className="text-blue-400 font-bold hover:text-blue-300 flex items-center gap-2 mx-auto transition-colors">
                      Send another message <ChevronRight size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Form floating accent */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-600/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>

        {/* Final CTA Strip */}
        <section className="mt-40 mb-20 text-center relative py-20 px-6 rounded-[60px] overflow-hidden border border-white/5 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10">
           <div className="relative z-10">
             <h2 className="text-4xl md:text-5xl font-display font-black mb-8 uppercase tracking-tight">Let's Build <span className="gradient-text">Smarter Supply Chains</span> Together</h2>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="btn-primary px-12 py-5 text-xl relative z-10"
             >
               Schedule a Strategy Consultation
             </motion.button>
           </div>
        </section>
      </section>
    </div>
  );
}
