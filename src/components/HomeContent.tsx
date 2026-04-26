import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import React, { useRef } from 'react';
import { 
  AlertTriangle, Clock, TrendingUp, XCircle, Map, Target,
  RefreshCw, ShieldAlert, Navigation, ArrowUpRight, Train, Truck, Plane
} from 'lucide-react';

const HighlightText = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  return <motion.span ref={ref} style={{ opacity }} className="relative">{children} </motion.span>;
};

export default function HomeContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  return (
    <div ref={containerRef} className="w-full relative overflow-clip">
      
      {/* Decorative full-page swirling lines */}
      <svg className="absolute inset-0 w-full h-[3000px] pointer-events-none z-0 mix-blend-screen opacity-20" preserveAspectRatio="none">
        <motion.path 
          d="M 0,200 C 500,800 -200,1500 800,2000 C 1500,2500 -500,3500 600,5000" 
          fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 20" className="text-blue-500"
          style={{ pathLength: smoothProgress }}
        />
        <motion.path 
          d="M 1200,0 C -500,1000 2500,1800 200,3000" 
          fill="none" stroke="url(#grad2)" strokeWidth="6" strokeLinecap="round"
          style={{ pathLength: smoothProgress }}
        />
        <defs>
          <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Narrative Section - Scroll Highlighting */}
      <section className="py-40 px-6 max-w-6xl mx-auto relative z-10 flex justify-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight max-w-4xl text-center">
          <HighlightText>The old way of moving things is completely broken.</HighlightText>
          <HighlightText>Trucks get stuck in traffic.</HighlightText>
          <HighlightText>Ships wait outside ports forever.</HighlightText>
          <HighlightText>You lose money waiting.</HighlightText>
          <span className="block mt-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            <HighlightText>We fix all of that. Instantly. Before it even happens.</HighlightText>
          </span>
        </h2>
      </section>

      {/* The Mess (Problem) - Chaotic Asymmetrical Layout */}
      <section className="py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[120%] bg-red-900/5 -skew-y-6 -z-10" />
        <div className="max-w-[1400px] mx-auto px-6 relative h-[900px] md:h-[600px]">
          <div className="absolute top-0 right-[10%] text-right font-display font-black text-6xl md:text-8xl text-white/5 uppercase select-none">Chaos</div>
          <div className="absolute bottom-10 left-[5%] font-display font-black text-6xl md:text-8xl text-red-500/5 uppercase -rotate-90 origin-bottom-left select-none">Delays</div>

          <motion.div 
            initial={{ y: 100, rotate: -10, opacity: 0 }} whileInView={{ y: 0, rotate: -5, opacity: 1 }} viewport={{ once:true }}
            className="absolute top-20 left-4 md:left-[10%] glass p-8 rounded-3xl border-red-500/20 max-w-sm rotate-[-5deg] shadow-[0_20px_50px_rgba(239,68,68,0.1)] hover:rotate-0 transition-transform cursor-crosshair"
          >
            <Clock size={40} className="text-red-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Too Late to Fix</h3>
            <p className="text-gray-400 text-lg">You only find out about a delayed shipment after your customer is already angry. There is no time left to save it.</p>
          </motion.div>

          <motion.div 
            initial={{ y: 100, rotate: 10, opacity: 0 }} whileInView={{ y: 0, rotate: 5, opacity: 1 }} viewport={{ once:true }} transition={{ delay: 0.2 }}
            className="absolute top-[40%] md:top-[30%] right-4 md:right-[15%] glass p-8 rounded-3xl border-orange-500/20 max-w-sm rotate-[5deg] shadow-[0_20px_50px_rgba(249,115,22,0.1)] hover:rotate-0 transition-transform cursor-crosshair z-10"
          >
            <TrendingUp size={40} className="text-orange-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Wasting Fuel & Money</h3>
            <p className="text-gray-400 text-lg">Drivers taking the wrong road because they didn't know about the accident ahead. Every mile costs you cash.</p>
          </motion.div>

          <motion.div 
            initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once:true }} transition={{ delay: 0.4 }}
            className="absolute bottom-20 md:bottom-10 left-4 md:left-[30%] glass p-8 rounded-3xl border-purple-500/20 max-w-md shadow-[0_20px_50px_rgba(168,85,247,0.1)] cursor-crosshair z-20"
          >
            <XCircle size={40} className="text-purple-400 mb-4" />
            <h3 className="text-3xl font-display font-black mb-2 tracking-tight">Flying Blind</h3>
            <p className="text-gray-300 text-lg">Hoping things go well is not a strategy. You need to see the entire map of the world, all the time, automatically.</p>
          </motion.div>
        </div>
      </section>

      {/* The Solution - Massive Grid & Bento Box */}
      <section className="py-32 px-6 relative z-10 w-full bg-gradient-to-b from-[#020617] via-[#040b22] to-[#020617]">
        <div className="max-w-[1400px] mx-auto text-center mb-24">
          <p className="text-blue-400 font-bold tracking-widest uppercase mb-4">The new standard</p>
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase text-stroke-thick mb-6">Perfection</h2>
          <motion.h3 
            initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
            className="text-3xl md:text-5xl font-bold gradient-text"
          >
            Let our brilliant system run the show.
          </motion.h3>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
          {/* Big Card 1 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="col-span-1 md:col-span-8 glass rounded-[40px] p-10 flex flex-col justify-end relative overflow-hidden group cursor-pointer min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-20 -right-20 text-blue-500/10 group-hover:text-blue-500/20 transition-colors"><Map size={400}/></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white mb-6 backdrop-blur-md bg-opacity-20 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                <Target size={30} />
              </div>
              <h3 className="text-4xl font-display font-bold mb-4">Spot Trouble Early</h3>
              <p className="text-xl text-gray-300 max-w-xl">Our system looks at millions of events globally—weather, traffic, strikes. If there is a problem, we see it days before your trucks even leave the garage.</p>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="col-span-1 md:col-span-4 glass rounded-[40px] p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group border-emerald-500/20 min-h-[400px]"
          >
            <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
            <ShieldAlert size={60} className="text-emerald-400 mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <h3 className="text-2xl font-bold mb-3">Bulletproof Safety</h3>
            <p className="text-gray-400">Never risk your cargo. We instantly detect safe routes away from storms and hazards.</p>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="col-span-1 md:col-span-4 lg:col-span-3 glass rounded-[40px] p-8 flex flex-col justify-between relative overflow-hidden border-purple-500/20 min-h-[350px]"
          >
            <Navigation size={40} className="text-purple-400" />
            <div>
              <h3 className="text-xl font-bold mb-2 mt-12">New Roads</h3>
              <p className="text-gray-400 text-sm">When one road blocks, we instantly tell your driver to turn left instead. Magic.</p>
            </div>
            <ArrowUpRight className="absolute top-8 right-8 text-white/20" size={30} />
          </motion.div>

          {/* Long Horizontal Card */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="col-span-1 md:col-span-8 lg:col-span-9 glass rounded-[40px] p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between min-h-[350px]"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            <div className="z-10 max-w-lg mb-10 md:mb-0">
              <div className="inline-block px-4 py-2 rounded-full bg-white/10 text-white font-bold text-sm mb-6 shadow-xl backdrop-blur-md">Full Autopilot</div>
              <h3 className="text-4xl font-display font-bold mb-4">We decide. You relax.</h3>
              <p className="text-gray-300 text-lg">Stop staring at screens trying to find the best way. Our engine does thousands of math problems a second to pick the absolute fastest path, and tells your fleet instantly.</p>
            </div>
            <div className="z-10 relative w-full max-w-[250px] aspect-square">
               <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute inset-0 border-4 border-dashed border-blue-500/30 rounded-full" />
               <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute top-4 left-4 right-4 bottom-4 border-2 border-purple-500/40 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center text-black font-black text-2xl shadow-[0_0_50px_rgba(255,255,255,0.8)]">NOW</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transport Modes - Full width image/color blocks */}
      <section className="py-0 flex flex-col md:flex-row w-full h-[60vh] md:h-[80vh] min-h-[600px] relative z-20">
        {[
          { icon: Truck, title: "Over Road", color: "bg-blue-950", delay: 0 },
          { icon: Plane, title: "Through Air", color: "bg-purple-950", delay: 0.2 },
          { icon: Train, title: "On Rails", color: "bg-emerald-950", delay: 0.3 },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: item.delay }}
            className={`flex-1 ${item.color} relative group overflow-hidden border-r border-white/5 flex flex-col items-center justify-center cursor-pointer`}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500" />
            <item.icon size={80} className="text-white/20 group-hover:text-white group-hover:scale-125 transition-all duration-700 relative z-10" />
            <h3 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-display font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-500 whitespace-nowrap z-10">{item.title}</h3>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-24 transition-all duration-500 z-10">
              <span className="bg-white text-black px-6 py-3 text-lg font-bold rounded-full shadow-2xl">Optimized Live</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Deep ROI - Massive Typography and Numbers */}
      <section className="py-32 px-6 relative overflow-hidden bg-white text-black min-h-screen flex items-center">
        <div className="absolute -top-10 -left-10 text-[20vw] font-display font-black text-black/[0.03] leading-none whitespace-nowrap pointer-events-none select-none">RESULTS</div>
        
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <h2 className="text-6xl md:text-8xl font-display font-black mb-8 leading-[0.9] tracking-tighter">Stop losing <br/><span className="text-blue-600">Millions</span> to bad planning.</h2>
            <p className="text-2xl text-gray-600 mb-12 max-w-lg leading-relaxed">The biggest brands in the world use our system because it saves them real, hard cash every single day.</p>
            
            <div className="flex flex-col gap-10">
              <div className="group cursor-default">
                <div className="flex items-end gap-6 border-b-4 border-black/10 pb-4 group-hover:border-blue-600 transition-colors">
                  <span className="text-7xl md:text-9xl font-black font-display tracking-tighter">40%</span>
                  <span className="text-2xl font-bold uppercase pb-3 text-gray-500 group-hover:text-black transition-colors">Faster to fix</span>
                </div>
              </div>
              <div className="group cursor-default">
                <div className="flex items-end gap-6 border-b-4 border-black/10 pb-4 group-hover:border-purple-600 transition-colors">
                  <span className="text-7xl md:text-9xl font-black font-display tracking-tighter">15%</span>
                  <span className="text-2xl font-bold uppercase pb-3 text-gray-500 group-hover:text-black transition-colors">Costs Deleted</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[600px] rounded-[40px] bg-[#020617] p-10 overflow-hidden shadow-2xl flex items-center justify-center perspective-1000">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent animate-pulse" />
            <motion.div 
              animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[800px] h-[800px] border border-white/5 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[600px] h-[600px] border-2 border-dashed border-blue-500/20 rounded-full"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once:true }}
              className="relative z-10 text-center max-w-md mx-auto"
            >
              <div className="text-7xl text-blue-500 opacity-50 mb-2 leading-none font-serif">"</div>
              <p className="text-3xl text-white font-medium leading-tight italic">
                It tells us there is a jam in Europe before our trucks even leave the factory. It's like having a time machine.
              </p>
              <div className="mt-10 inline-flex flex-col items-center">
                <div className="px-6 py-2 bg-white/10 rounded-full text-white font-bold backdrop-blur-md mb-2">VP of Global Logistics</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Fortune 500 Brand</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mega Footer CTA */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative bg-[#020617] overflow-hidden pt-20">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom -z-10 animate-[moveGrid_5s_linear_infinite]" />
        <style>{`@keyframes moveGrid { 0% { transform: perspective(500px) rotateX(60deg) translateY(0); } 100% { transform: perspective(500px) rotateX(60deg) translateY(50px); } }`}</style>
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#020617]/80 to-[#020617] z-0" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="relative z-10 text-center w-full max-w-5xl mix-blend-screen"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm mb-12 tracking-widest uppercase">The Future Is Calling</div>
          <h2 className="text-[12vw] sm:text-[10vw] font-display font-black leading-none uppercase tracking-tighter mb-12 text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] select-none">
            Move <br/> Faster.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 w-full max-w-2xl mx-auto">
            <button className="w-full sm:w-auto px-12 py-6 bg-white text-black text-2xl font-black rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_80px_rgba(255,255,255,0.6)]">
              Get Started Now
            </button>
            <button className="w-full sm:w-auto px-12 py-6 text-white text-xl font-bold uppercase tracking-widest border border-white/20 rounded-full hover:bg-white/10 transition-colors">
              Read More
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
