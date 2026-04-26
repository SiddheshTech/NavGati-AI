import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Eye, Map, GitMerge, Settings, ShieldAlert, Navigation, Layers, Zap, Route } from 'lucide-react';

export default function Platform() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="relative z-10 w-full overflow-hidden" ref={containerRef}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-10">
        <svg className="w-full h-full">
          <motion.path 
            d="M -100,100 C 600,0 200,800 1200,500" 
            fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="10 20"
            style={{ x: y }}
          />
          <motion.path 
            d="M 100,800 C 500,1000 800,-200 1200,800" 
            fill="none" stroke="#8b5cf6" strokeWidth="4" className="opacity-50"
            style={{ x: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
          />
        </svg>
      </div>

      {/* Platform Header */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-pill mb-8 text-blue-300">
            <Layers size={16} /> <span className="text-sm font-bold tracking-widest uppercase">The Operating System for Global Trade</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8 text-white drop-shadow-2xl">
            NavGati <span className="gradient-text">Logistics</span> <br/> Control Tower.
          </h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto font-light border-l-4 border-blue-500 pl-6 text-left">
            NavGati AI acts as a centralized logistics control tower where all operational intelligence is managed in one place. Stop switching tabs. See the world from here.
          </p>
        </motion.div>
      </section>

      {/* Core Modules Grid */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Live Control Tower */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true }}
            className="glass rounded-[40px] p-10 relative overflow-hidden group min-h-[500px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] to-blue-900/20 z-0" />
            <div className="absolute top-10 right-10 text-blue-500/10 group-hover:scale-110 transition-transform duration-700 z-0">
              <Eye size={250} />
            </div>
            <div className="relative z-10">
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(37,99,235,0.5)]">
                <Map size={30} className="text-white" />
              </div>
              <h2 className="text-4xl font-display font-bold mb-4 uppercase tracking-tight">Live Control Tower</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-md">Absolute real-time visibility across all your fleets, ships, and trains in a single, unified dashboard tracking system.</p>
              <ul className="space-y-4">
                {['Real-time shipment tracking', 'Operational visibility', 'Customizable dashboard monitoring'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-400 font-medium">
                    <div className="w-2 h-2 rounded-full bg-blue-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Risk Detection Engine */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once:true }} transition={{ delay: 0.1 }}
            className="glass rounded-[40px] p-10 relative overflow-hidden group min-h-[500px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] to-red-900/20 z-0" />
            <div className="absolute top-10 right-10 text-red-500/10 group-hover:scale-110 transition-transform duration-700 z-0">
              <ShieldAlert size={250} />
            </div>
            <div className="relative z-10">
              <div className="bg-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(220,38,38,0.5)]">
                <ShieldAlert size={30} className="text-white" />
              </div>
              <h2 className="text-4xl font-display font-bold mb-4 uppercase tracking-tight text-white">Risk Detection Engine</h2>
              <p className="text-xl text-red-200 mb-8 max-w-md">Our AI spots anomalies before they become disasters. Weather, strikes, blockages—we see them, you avoid them.</p>
              <ul className="space-y-4">
                {['Delay prediction models', 'Anomaly and outlier detection', 'Instant disruption alerts'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-red-300/80 font-medium">
                    <div className="w-2 h-2 rounded-full bg-red-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Route Optimization */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.2 }}
            className="glass rounded-[40px] p-10 relative overflow-hidden group min-h-[500px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] to-emerald-900/20 z-0" />
            <div className="absolute top-10 right-10 text-emerald-500/10 group-hover:scale-110 transition-transform duration-700 z-0">
              <Route size={250} />
            </div>
            <div className="relative z-10">
              <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(5,150,105,0.5)]">
                <Navigation size={30} className="text-white" />
              </div>
              <h2 className="text-4xl font-display font-bold mb-4 uppercase tracking-tight">Route Optimization</h2>
              <p className="text-xl text-emerald-200 mb-8 max-w-md">The fastest way from A to B is rarely a straight line. We compute millions of variables to find the cheapest, fastest path.</p>
              <ul className="space-y-4">
                {['Alternative route generation', 'Fuel & cost optimization', 'Strict SLA preservation'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-emerald-300/80 font-medium">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Autonomous Action */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.3 }}
            className="glass rounded-[40px] p-10 relative overflow-hidden group min-h-[500px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] to-purple-900/20 z-0" />
            <div className="absolute top-10 right-10 text-purple-500/10 group-hover:scale-110 transition-transform duration-700 z-0">
              <Zap size={250} />
            </div>
            <div className="relative z-10">
              <div className="bg-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(147,51,234,0.5)]">
                <GitMerge size={30} className="text-white" />
              </div>
              <h2 className="text-4xl font-display font-bold mb-4 uppercase tracking-tight">Autonomous Action</h2>
              <p className="text-xl text-purple-200 mb-8 max-w-md">Don't wait for your team to click a button. Let the platform reroute automatically and request approval on the fly.</p>
              <ul className="space-y-4">
                {['Autonomous rerouting', 'Automated workflow approvals', 'Intelligent alerts & escalation'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-purple-300/80 font-medium">
                    <div className="w-2 h-2 rounded-full bg-purple-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Screen Showcase */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[100px] -z-10" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-5xl md:text-7xl font-black font-display tracking-tight mb-6">See It In <br/> <span className="text-blue-500">Action.</span></h2>
            <p className="text-2xl text-gray-400 mb-10 max-w-lg">A dark, gorgeous, and infinitely actionable UI. Designed for operators who need speed, clarity, and power.</p>
            <button className="btn-primary text-xl">Explore the UI</button>
          </div>
          
          <div className="flex-1 w-full relative h-[600px] perspective-1000">
            {/* Main Showcase Image Placeholder */}
            <motion.div 
              style={{ rotateY: -15, rotateX: 10 }}
              className="absolute inset-0 glass rounded-3xl p-4 shadow-2xl border border-white/20 bg-black/80 flex flex-col"
            >
              <div className="w-full h-8 border-b border-white/10 flex items-center gap-2 px-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 relative flex items-center justify-center border border-white/5 rounded-xl bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_100%)]"></div>
                <Map size={100} className="text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute top-1/4 left-1/4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-lg border border-red-500/30 text-xs">
                  ⚠️ Severe Storm Warning
                </div>
                <div className="absolute bottom-1/4 right-1/4 px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-lg border border-emerald-500/50 text-xs text-emerald-400 font-bold">
                  ✓ Found New Route (+2h)
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-40 px-6 max-w-7xl mx-auto text-center border-t border-white/5 relative z-10">
        <h2 className="text-5xl font-black font-display mb-6">Integrate With <span className="text-purple-500">Everything.</span></h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16">
          NavGati AI slides perfectly into your existing stack. We connect to the tools you already use, pulling data in and pushing decisions out.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
          {['ERP Systems', 'WMS', 'TMS', 'GPS Providers', 'CRM', 'Custom APIs'].map((item, i) => (
             <motion.div 
              key={item}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              viewport={{ once:true }}
              className="px-8 py-6 glass rounded-2xl font-bold text-xl hover:bg-white/10 transition-colors shadow-xl border border-white/10 cursor-pointer flex items-center gap-4"
             >
               <Settings size={24} className="text-gray-400" />
               {item}
             </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
