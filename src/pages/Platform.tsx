import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Eye, Map, GitMerge, Settings, ShieldAlert, Navigation, 
  Layers, Zap, Route, Activity, Globe,
  ShieldCheck, ArrowUpRight, Target
} from 'lucide-react';
import LiveMap from '../components/LiveMap';
import NetworkLines from '../components/NetworkLines';
import ScrollTextHighlight from '../components/ScrollTextHighlight';

export default function Platform() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="bg-[#020617] text-white selection:bg-blue-500/30 overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0, 0.2], [0.6, 0.1]),
            scale: useTransform(smoothProgress, [0, 1], [1, 1.5]),
          }}
          className="absolute top-0 left-0 w-full h-[120vh] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" 
        />
        <NetworkLines />
      </div>

      {/* 1. IMMERSIVE HERO */}
      <section className="relative min-h-[150vh] pt-40 px-6 flex flex-col items-center justify-start overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs mb-12 tracking-[0.5em] uppercase"
          >
            THE NAVGATI ENGINE
          </motion.div>
          
          <motion.div style={{ y: useTransform(smoothProgress, [0, 0.4], [0, -200]) }}>
            <h1 className="text-[12vw] font-display font-black leading-[0.8] tracking-tighter mb-12 uppercase italic">
              Infinite <br />
              <span className="gradient-text">Visibility.</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto font-light leading-relaxed mb-20 px-4">
              A Living, Breathing Digital Twin of Your Entire Global Supply Chain. 
              No gaps. No blind spots. No compromises.
            </p>
          </motion.div>
        </div>

        {/* Floating abstract media elements */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none">
           <motion.div 
             style={{ 
               y: useTransform(smoothProgress, [0, 0.5], [100, -300]),
               rotate: -10,
               opacity: useTransform(smoothProgress, [0, 0.3], [0, 0.4])
             }}
             className="absolute left-[5%] top-1/2 w-96 h-64 glass rounded-[40px] border-white/5 overflow-hidden"
           >
              <div className="absolute inset-0 bg-blue-600/20" />
              <Activity className="absolute bottom-8 right-8 text-blue-400 opacity-50" size={100} />
           </motion.div>

           <motion.div 
             style={{ 
               y: useTransform(smoothProgress, [0, 0.5], [200, -500]),
               rotate: 15,
               opacity: useTransform(smoothProgress, [0.05, 0.35], [0, 0.3])
             }}
             className="absolute right-[8%] top-1/3 w-80 h-96 glass rounded-[40px] border-white/5 flex items-center justify-center"
           >
              <Globe className="text-white opacity-20" size={150} />
           </motion.div>
        </div>
      </section>

      {/* 2. THE BIG STATEMENT REVEAL */}
      <section className="py-60 px-6 max-w-7xl mx-auto relative z-10">
        <ScrollTextHighlight 
          text="Lately, logistics has become a game of reactive firefighting. We changed the rules. Our platform doesn't just watch your cargo move; it anticipates the friction points of tomorrow before they manifest today."
          className="text-4xl md:text-7xl font-display font-bold leading-tight tracking-tight uppercase"
        />
      </section>

      {/* 3. CONTROL TOWER CLUSTER (BENTO DENSITY) */}
      <section className="py-40 px-6 max-w-[1600px] mx-auto z-10 relative">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Map Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-8 glass rounded-[60px] p-2 overflow-hidden min-h-[700px] border-white/10 shadow-2xl relative group"
          >
             <div className="absolute inset-0 z-0 h-full w-full">
                <LiveMap />
             </div>
             <div className="absolute top-10 left-10 z-20 pointer-events-none">
                <div className="glass-pill px-6 py-3 border-blue-500/30 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
                  <span className="text-sm font-bold uppercase tracking-widest text-white">Global Command Active</span>
                </div>
             </div>
          </motion.div>

          {/* Side Info Blobs (Random Alignment) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="col-span-12 lg:col-span-4 flex flex-col gap-6"
          >
            <div className="glass p-10 rounded-[50px] border-white/5 group hover:border-blue-500/20 transition-all flex flex-col justify-between h-1/2">
               <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-12 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                 <GitMerge size={24} className="text-white" />
               </div>
               <div>
                  <h3 className="text-3xl font-display font-bold mb-4 uppercase tracking-tighter">Hyper-Integration</h3>
                  <p className="text-gray-400 leading-relaxed font-light">Direct neural-link to your ERP, TMS, and WMS. We ingest 5,000+ data points per second to provide absolute truth.</p>
               </div>
            </div>

            <div className="glass p-10 rounded-[50px] border-white/5 bg-gradient-to-br from-purple-600/10 to-transparent group hover:border-purple-500/20 transition-all h-1/2">
               <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">99.8%</div>
                 <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Prediction Accuracy</div>
               </div>
               <h3 className="text-3xl font-display font-bold mb-4 uppercase tracking-tighter">AI Foresight</h3>
               <p className="text-gray-400 leading-relaxed font-light">Spotting micro-trends in global port congestion and weather patterns before they hit your P&L.</p>
            </div>
          </motion.div>

          {/* Wide Metric Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-12 glass p-12 rounded-[50px] border-white/5 flex flex-wrap items-center justify-between gap-12 group"
          >
             {[
               { label: "Active Tracking", value: "14,209", icon: Navigation },
               { label: "Predictive Signals", value: "852", icon: Zap },
               { label: "Risk Mitigation", value: "$4.2M", icon: ShieldCheck },
               { label: "System Uptime", value: "99.999%", icon: Activity },
             ].map((m) => (
               <div key={m.label} className="flex gap-6 items-center">
                  <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-blue-600/20 transition-all">
                    <m.icon size={24} className="text-gray-500 group-hover:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-display font-black text-white">{m.value}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.2em]">{m.label}</div>
                  </div>
               </div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* 4. SCATTERED DETAIL MODULES (Deeply Detailed, randomly aligned) */}
      <section className="py-40 px-6 max-w-7xl mx-auto space-y-60 relative z-10">
        
        {/* Module 1: Left Aligned */}
        <div className="flex justify-start">
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="text-blue-500 font-black text-[10vw] leading-none mb-8 opacity-10 font-display italic">01</div>
            <h2 className="text-5xl md:text-7xl font-display font-black mb-8 leading-none tracking-tighter uppercase">
              The Digital <br /> <span className="text-blue-600">Core.</span>
            </h2>
            <p className="text-2xl text-gray-400 font-light leading-relaxed mb-12">
              Every shipment is mapped to its digital twin. We don't just see a truck; we see fuel efficiency, 
              driver fatigue patterns, local weather pressure, and traffic density—all in real-time. 
              This data isn't just captured; it's understood.
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                 <div className="font-bold text-white uppercase text-xs tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Hardware Agnostic
                 </div>
                 <p className="text-gray-500 text-sm">Connect with any GPS, ELD, or IoT sensor instantly.</p>
               </div>
               <div className="space-y-2">
                 <div className="font-bold text-white uppercase text-xs tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Edge Processing
                 </div>
                 <p className="text-gray-500 text-sm">Real-time alerts processed at the source for zero latency.</p>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Module 2: Right Aligned */}
        <div className="flex justify-end">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl text-right"
          >
            <div className="text-purple-500 font-black text-[10vw] leading-none mb-8 opacity-10 font-display italic">02</div>
            <h2 className="text-5xl md:text-7xl font-display font-black mb-8 leading-none tracking-tighter uppercase">
              Predictive <br /> <span className="text-purple-600">Pulse.</span>
            </h2>
            <p className="text-2xl text-gray-400 font-light leading-relaxed mb-12">
              Our AI engine runs 400,000 simulations per minute for every route. If a storm is brewing 
              near a port or a labor strike is brewing at a border crossing, NavGati AI reroutes your 
              assets before you even know there's a problem.
            </p>
            <div className="grid grid-cols-1 gap-6">
               <div className="glass p-6 rounded-3xl border-purple-500/10 flex items-center gap-6 justify-end text-left group hover:bg-purple-600/5 transition-all">
                  <div>
                    <h4 className="font-bold text-white">Dynamic Rerouting</h4>
                    <p className="text-xs text-gray-500">Auto-calculated alternative paths for 22,000+ routes.</p>
                  </div>
                  <div className="p-4 bg-purple-600/20 rounded-2xl text-purple-400">
                    <Route size={24} />
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Module 3: Center Wide (Media Focused) */}
        <motion.div 
           initial={{ opacity: 0, y: 100 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="relative glass rounded-[80px] p-2 border-white/5 aspect-video overflow-hidden group shadow-2xl"
        >
           <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent z-10" />
           <div className="absolute bottom-20 left-20 z-20 max-w-xl">
              <h2 className="text-6xl font-display font-bold mb-4 uppercase italic">Global Sync.</h2>
              <p className="text-xl text-gray-400 italic">One unified screen. Every warehouse. Every fleet. Every ocean. Every second.</p>
           </div>
           
           <div className="absolute inset-0 z-0 bg-[#020617]">
              {/* Geometric moving shapes for "modern abstract media" feel */}
               {[...Array(20)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ 
                     x: Math.random() * 100 + "%", 
                     y: Math.random() * 100 + "%",
                     opacity: Math.random() * 0.3
                   }}
                   animate={{ 
                     x: [Math.random() * 100 + "%", Math.random() * 100 + "%"], 
                     y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                   }}
                   transition={{ 
                     duration: 20 + Math.random() * 20, 
                     repeat: Infinity, 
                     ease: "linear" 
                   }}
                   className="absolute w-64 h-64 border border-blue-500/10 rounded-full"
                 />
               ))}
           </div>
        </motion.div>
      </section>

      {/* 5. LIVE DATA FEEDS (Technical aesthetic but simple outcome words) */}
      <section className="py-40 bg-white/2 overflow-hidden border-y border-white/5 relative z-10">
         <div className="flex whitespace-nowrap gap-20 items-center">
            {[...Array(4)].map((_, i) => (
              <motion.div 
                key={i}
                animate={{ x: [0, -1000] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="flex gap-20 items-center shrink-0"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-4xl font-display font-medium text-gray-500 uppercase tracking-widest italic">Inventory Optimization</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-4xl font-display font-medium text-gray-500 uppercase tracking-widest italic">Risk Mitigation</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-4xl font-display font-medium text-gray-500 uppercase tracking-widest italic">Predictive Delivery</span>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-4xl font-display font-medium text-gray-500 uppercase tracking-widest italic">Infinite Visibility</span>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* 6. THE FINALE: CALL TO ACTION (Clean, Massive, Premium) */}
      <section className="py-60 px-6 text-center relative z-10 overflow-hidden">
        <motion.div 
          style={{ scale: useTransform(smoothProgress, [0.8, 1], [0.8, 1]) }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-[10vw] font-display font-black leading-none uppercase italic tracking-tighter mb-16">
            The Future <br /> <span className="gradient-text">is NavGati.</span>
          </h2>
          <p className="text-2xl md:text-3xl text-gray-500 max-w-2xl mx-auto mb-20 font-light leading-relaxed italic">
            Stop reacting. Start knowing. Elevate your supply chain to a state of absolute intelligence today.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
             <motion.button 
               whileHover={{ scale: 1.1, rotate: 2 }}
               whileTap={{ scale: 0.9 }}
               className="px-16 py-8 bg-blue-600 rounded-[30px] font-display font-black text-2xl uppercase italic tracking-widest shadow-[0_0_50px_rgba(37,99,235,0.4)]"
             >
               Explore Demo
             </motion.button>
             <motion.button 
               whileHover={{ scale: 1.1, rotate: -2 }}
               whileTap={{ scale: 0.9 }}
               className="px-16 py-8 glass rounded-[30px] font-display font-black text-2xl uppercase italic tracking-widest border-white/10"
             >
               Contact Team
             </motion.button>
          </div>
        </motion.div>

        {/* Closing decorative line */}
        <div className="mt-60 h-[100vh] w-px bg-gradient-to-b from-blue-500 to-transparent mx-auto opacity-30" />
      </section>

      {/* Footer Meta Labels (Small caps tracking design pattern) */}
      <footer className="py-20 px-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-8 relative z-10 glass">
         <div className="text-[10px] uppercase font-bold text-gray-500 tracking-[0.5em]">NavGati AI Operational Systems © 2026</div>
         <div className="flex gap-12 text-[10px] uppercase font-bold text-gray-500 tracking-[0.5em]">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Security</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Global Network</a>
         </div>
         <div className="text-[10px] uppercase font-bold text-blue-500 tracking-[0.5em]">System Status: Nominal</div>
      </footer>
    </div>
  );
}
