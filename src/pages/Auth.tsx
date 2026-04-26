import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, ArrowRight, Mail, Lock, User, 
  Github, Chrome, CheckCircle2, Globe, Truck,
  ChevronLeft, Briefcase, ChevronDown
} from 'lucide-react';
import { api } from '../lib/api';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState('super_admin');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.login({ role });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      if (role === 'super_admin') {
        navigate('/dashboard/super-admin');
      } else if (role === 'company_admin') {
        navigate('/dashboard/company-admin');
      } else if (role === 'operations_manager') {
        navigate('/dashboard/operations-manager');
      } else if (role === 'analyst') {
        navigate('/dashboard/analyst');
      } else if (role === 'field_exec') {
        navigate('/dashboard/field-executive');
      } else if (role === 'viewer') {
        navigate('/dashboard/viewer');
      } else {
        // Default fallback for demo purposes
        navigate('/dashboard/viewer');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col lg:flex-row overflow-hidden selection:bg-blue-500/30">
      
      {/* 1. ATMosphere / BRAND SIDE (50%) */}
      <div className="hidden lg:flex w-1/2 relative bg-blue-600 overflow-hidden flex-col justify-between p-16">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating elements */}
        <motion.div 
           animate={{ 
             y: [0, -20, 0],
             rotate: [0, 5, 0]
           }}
           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/4 right-10 w-64 h-64 glass rounded-[40px] border-white/20 flex items-center justify-center -rotate-12 backdrop-blur-xl"
        >
          <Truck size={100} className="text-white/20" />
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className="relative z-10"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-white font-black text-2xl tracking-tighter mb-20 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 group-hover:rotate-12 transition-transform">
              <Globe size={24} />
            </div>
            NAVGATI AI
          </Link>

          <h1 className="text-7xl font-display font-black text-white leading-[0.85] tracking-tighter uppercase italic mb-8">
            The Hub of <br />
            <span className="text-blue-200">Certainty.</span>
          </h1>
          <p className="text-blue-100 text-xl font-light max-w-md leading-relaxed border-l-2 border-white/30 pl-8">
            Join 2,000+ global logistics networks predicting the future of their supply chain with NavGati AI.
          </p>
        </motion.div>

        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-8">
            {[
              { label: "SLA Guarantee", icon: ShieldCheck },
              { label: "Global Network", icon: Globe },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <item.icon size={20} />
                </div>
                <span className="font-bold text-sm tracking-widest uppercase">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Big Background Text */}
        <div className="absolute -bottom-10 -left-10 text-[20vw] font-display font-black text-white/5 leading-none select-none tracking-tighter">
          CERTAIN
        </div>
      </div>

      {/* 2. FORM SIDE (50%) */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-20 relative bg-[#020617]">
        
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-8 left-8">
          <Link to="/" className="text-white font-black text-xl tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Globe size={18} />
            </div>
            NAVGATI
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors mb-8"
            >
              <ChevronLeft size={16} /> Back to Home
            </button>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter uppercase italic leading-none">
              {mode === 'login' ? 'Welcome Back.' : 'Start Scaling.'}
            </h2>
            <p className="text-gray-500 font-medium">
              {mode === 'login' 
                ? "Sign in to manage your global operational intelligence." 
                : "Create your workspace and predict your first delay today."
              }
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === 'login' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${mode === 'signup' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Get Started
            </button>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all group">
              <Chrome size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all group">
              <Github size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm">GitHub</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center py-4">
            <div className="absolute inset-x-0 h-px bg-white/10" />
            <span className="relative z-10 bg-[#020617] px-6 text-[10px] font-black uppercase text-gray-600 tracking-[0.3em]">Or use Enterprise Email</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-2">Full Legal Name</label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input type="text" placeholder="Johnathan Sterling" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-2">Account Role</label>
              <div className="relative">
                <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-[#020617] text-gray-500">Select your role</option>
                  <option value="super_admin" className="bg-[#020617]">Super Admin (Full Platform Control)</option>
                  <option value="company_admin" className="bg-[#020617]">Company Admin (Organization Level)</option>
                  <option value="operations_manager" className="bg-[#020617]">Operations Manager (Daily Logistics)</option>
                  <option value="analyst" className="bg-[#020617]">Analyst (Data Intelligence)</option>
                  <option value="field_exec" className="bg-[#020617]">Field Executive (Ground Level)</option>
                  <option value="viewer" className="bg-[#020617]">Viewer / Client Access (Read-only)</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
              <p className="text-[10px] text-gray-500 px-2 mt-1">Select your access level to load the correct dashboard.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest px-2">Corporate Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Secret Key</label>
                {mode === 'login' && <button type="button" className="text-[10px] font-bold text-blue-500 hover:text-blue-400">Forgot Code?</button>}
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-blue-500 focus:bg-white/10 transition-all outline-none" />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="flex items-start gap-3 px-2">
                <input type="checkbox" className="mt-1 accent-blue-600 rounded bg-white/5 border-white/10" />
                <span className="text-xs text-gray-500 leading-relaxed">
                  I agree to the <span className="text-gray-300 underline cursor-pointer">SLA Terms</span> and understand my data will be used for predictive modeling.
                </span>
              </div>
            )}

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-3 group">
              {mode === 'login' ? 'Access Control Tower' : 'Launch Workspace'}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              {mode === 'login' ? "Don't have a workspace?" : "Already have access?"}
              <button 
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-blue-500 font-bold hover:text-blue-400 transition-colors"
              >
                {mode === 'login' ? 'Get Started for Free' : 'Sign In Now'}
              </button>
            </p>
          </div>
        </motion.div>

        {/* Bottom copyright/legal */}
        <div className="mt-auto pt-20 text-[10px] uppercase font-bold text-gray-600 tracking-widest">
            NAVGATI AI SECURE GATEWAY © 2026
        </div>
      </div>
    </div>
  );
}
