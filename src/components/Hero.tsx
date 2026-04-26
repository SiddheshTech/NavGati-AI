import { Shield, ArrowRight, Play, MapPin, AlertCircle, TrendingDown, Clock, Zap, Target } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[120vh] w-full overflow-hidden flex items-center justify-center pt-20">
      {/* Massive Background Text Density */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex flex-col justify-center select-none opacity-20">
        <motion.div style={{ x: y1 }} className="text-[15vw] font-display font-black text-stroke whitespace-nowrap leading-[0.8] tracking-tighter ml-[-5vw]">
          NEVER LATE
        </motion.div>
        <motion.div style={{ x: y2 }} className="text-[18vw] font-display font-black text-white/5 whitespace-nowrap leading-[0.8] tracking-tighter ml-[10vw]">
          PREDICT
        </motion.div>
        <motion.div style={{ x: y3 }} className="text-[15vw] font-display font-black text-stroke-thick whitespace-nowrap leading-[0.8] tracking-tighter ml-[-15vw]">
          EVERYTHING
        </motion.div>
      </div>

      {/* Floating Dense Background Elements to Fill Empty Spaces */}
      <motion.div style={{ y: y1 }} className="absolute top-[15%] left-[5%] text-blue-500/30 blur-sm">
        <MapPin size={120} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-[20%] right-[10%] text-purple-500/20 blur-md">
        <Zap size={200} />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute top-[40%] right-[5%] text-emerald-500/20 blur-[2px]">
        <Target size={150} />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Content Asymmetric Layout */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Staggered Text */}
        <motion.div style={{ opacity: opacityText }} className="xl:col-span-7 flex flex-col items-start justify-center h-full">
          <motion.div
            initial={{ opacity: 0, rotate: -5, x: -50 }}
            animate={{ opacity: 1, rotate: 0, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-2 glass-pill mb-12 ml-10 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-blue-100">
              The Future of Shipping is Here
            </span>
          </motion.div>

          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-display font-black leading-[0.9] tracking-tighter"
          >
            <motion.span 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
              className="block"
            >
              KNOW THE
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="block ml-[10%] gradient-text"
            >
              PROBLEM
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
              className="block text-stroke-thick"
            >
              BEFORE IT
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="block ml-[20%]"
            >
              HAPPENS.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
            className="max-w-xl text-xl md:text-2xl text-gray-300 font-light mt-12 mb-12 ml-[5%] border-l-4 border-blue-500 pl-6 space-y-4"
          >
            Traditional shipping is guessing. We don't guess. We use real-time world data to spot traffic, bad weather, and delays days before they touch your profits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-6 ml-[10%]"
          >
            <button className="btn-primary group overflow-hidden relative">
              <div className="absolute inset-0 w-0 bg-blue-600 transition-all duration-[250ms] ease-out group-hover:w-full -z-10" />
              <span className="flex items-center gap-2 group-hover:text-white transition-colors">
                Start Optimizing <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            <button className="flex items-center gap-4 text-white font-bold group">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <Play size={20} fill="currentColor" className="ml-1" />
              </div>
              See Magic Happen
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: Dense Overlapping Floating Mockups */}
        <div className="xl:col-span-5 h-[600px] relative hidden md:block perspective-1000 mt-20 xl:mt-0">
          
          {/* Main Map Card */}
          <motion.div 
            style={{ y: y3, rotateX: 10, rotateY: -15 }}
            className="absolute top-0 right-0 w-[450px] glass p-4 rounded-3xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-20"
          >
            <div className="w-full h-48 bg-[#020617] rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5">
              {/* Animated Map Route */}
              <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full opacity-50">
                <motion.path 
                  d="M 50,150 Q 150,50 250,150 T 350,50" 
                  fill="none" 
                  stroke="url(#grad)" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute top-1/2 shrink-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 glass-pill bg-black/80 flex items-center gap-2">
                <MapPin className="text-blue-400" size={16} /> <span>Live Route Found</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 px-2">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Estimated Time</p>
                <p className="text-2xl font-black font-display">2h 14m</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase">Status</p>
                <p className="text-lg font-black text-emerald-400">On Track</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Alert Card */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-[40%] -left-10 w-[300px] bg-red-950/80 backdrop-blur-xl p-4 rounded-2xl border border-red-500/30 shadow-2xl z-30"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/20 rounded-xl text-red-500 animate-bounce">
                <AlertCircle size={24} />
              </div>
              <div>
                <p className="font-bold text-white leading-tight">Storm Approaching</p>
                <p className="text-xs text-red-200 mt-1">Found danger ahead. Diverted 14 trucks to save 8 hours.</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Savings Card */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-10 right-10 w-[240px] bg-emerald-950/80 backdrop-blur-xl p-5 rounded-2xl border border-emerald-500/30 shadow-2xl z-40"
          >
            <p className="text-sm text-emerald-200 font-bold mb-1">Money Saved Today</p>
            <p className="text-4xl font-display font-black text-emerald-400">$42,940</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-emerald-300">
              <TrendingDown size={14} /> <span>14% down from yesterday</span>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Down indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 z-10"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </section>
  );
}
