import { Home, Layers, Zap, Building2, CreditCard, Mail, ChevronDown, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Platform', path: '/platform', icon: Layers },
    { name: 'Solutions', path: '#', icon: Zap },
    { name: 'Industries', path: '#', icon: Building2 },
    { name: 'Pricing', path: '#', icon: CreditCard },
    { name: 'Contact', path: '#', icon: Mail },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left: Logo */}
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <div className="absolute inset-0 bg-blue-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 border border-white/20" />
              <div className="relative z-10 w-9 h-9 bg-gradient-to-br from-white to-blue-200 rounded-lg flex items-center justify-center shadow-xl">
                 <Navigation size={18} className="text-blue-600 fill-blue-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-tight leading-none text-white">NavGati</span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-blue-400 mt-1">Intelligence</span>
            </div>
          </motion.div>
        </Link>

        {/* Center: Navigation Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex glass-pill p-1.5 gap-1 shadow-2xl relative bg-[#020617]/50"
        >
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative flex items-center gap-2.5 px-4 py-2 rounded-full transition-colors z-10 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-lg shadow-blue-500/40"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm font-semibold">{item.name}</span>
                
                {!isActive && (
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div 
                        layoutId="nav-hover"
                        className="absolute inset-0 bg-white/5 rounded-full -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                )}
              </Link>
            )
          })}
        </motion.div>

        {/* Right: Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <button className="hidden sm:block text-gray-400 hover:text-white px-5 py-2.5 text-sm font-semibold transition-colors">
            Log In
          </button>
          <button className="btn-primary flex items-center gap-2 py-2.5 px-6 shadow-xl shadow-blue-600/20 group">
            <span className="text-sm font-bold">Start Free</span>
            <div className="bg-white/20 rounded-full p-0.5 group-hover:translate-x-0.5 transition-transform">
              <ChevronDown size={14} />
            </div>
          </button>
        </motion.div>
      </div>
    </nav>
  );
}
