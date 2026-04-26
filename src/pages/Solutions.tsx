import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Route, Eye, Warehouse, Truck, Clock, 
  ArrowRight, ShieldAlert, BarChart3, Zap
} from 'lucide-react';

interface SolutionProps {
  icon: any;
  title: string;
  description: string;
  delay: number;
}

const SolutionCard: React.FC<SolutionProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="glass p-10 rounded-[40px] border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 text-blue-500/5 group-hover:text-blue-500/10 transition-colors">
      <Icon size={120} />
    </div>
    <div className="relative z-10">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-400/10 flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 shadow-lg">
        <Icon size={30} />
      </div>
      <h3 className="text-3xl font-display font-bold mb-4 tracking-tight">{title}</h3>
      <p className="text-xl text-gray-400 leading-relaxed max-w-sm">{description}</p>
      
      <div className="mt-8 flex items-center gap-2 text-blue-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0">
        Discover Outcome <ArrowRight size={18} />
      </div>
    </div>
  </motion.div>
);

export default function Solutions() {
  const navigate = useNavigate();
  const solutions = [
    {
      icon: ShieldAlert,
      title: "Predictive Delay Prevention",
      description: "Stop delays before they happen. Our engine spots global risks days before they impact your Bottom line."
    },
    {
      icon: Route,
      title: "Smart Route Optimization",
      description: "AI finds best routes dynamically. Navigate traffic, weather, and congestion with machine precision."
    },
    {
      icon: Eye,
      title: "Supply Chain Visibility",
      description: "End-to-end transparency. See every item, every mile, every minute in one unified workspace."
    },
    {
      icon: Warehouse,
      title: "Warehouse Flow Intelligence",
      description: "Prevent bottlenecks before products arrive. Smooth your intake and dispatch with predictive load balancing."
    },
    {
      icon: Truck,
      title: "Fleet Performance Optimization",
      description: "Better driver, route, and fuel decisions. Maximize your asset utilization with intelligent fleet management."
    },
    {
      icon: Clock,
      title: "SLA Protection System",
      description: "Prevent late deliveries and keep your promises. Our system active-guards your most critical KPIs."
    }
  ];

  return (
    <div className="relative z-10 pt-40 pb-20">
      {/* Background Accents */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
      </div>

      <section className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-sm mb-8 tracking-widest uppercase border border-blue-500/20"
          >
            Business Outcomes Measured
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-8"
          >
            Real Problems. <br/> <span className="gradient-text">AI Solutions.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            NavGati AI transforms logistics from a cost center into a competitive advantage. We solve the friction points that hold your enterprise back.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
          {solutions.map((s, i) => (
            <SolutionCard 
              key={s.title} 
              icon={s.icon}
              title={s.title}
              description={s.description}
              delay={i * 0.1} 
            />
          ))}
        </div>

        {/* Outcome Metrics Section */}
        <div className="glass rounded-[60px] p-12 md:p-24 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 to-transparent -z-10" />
          <h2 className="text-4xl md:text-6xl font-display font-black mb-16 uppercase tracking-tight">The NavGati <span className="text-blue-500">Difference</span></h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Efficiency Boost", value: "35%", icon: Zap },
              { label: "Cost Reduction", value: "22%", icon: BarChart3 },
              { label: "Delay Prevention", value: "92%", icon: ShieldCheck },
              { label: "ROI Positive", value: "3Mo", icon: Clock },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <stat.icon className="mx-auto text-blue-500 mb-4 opacity-50" size={30} />
                <div className="text-5xl md:text-7xl font-display font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-none">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep Link to Platform */}
      <section className="py-40 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-10">How do we do it? <br/> <span className="text-gray-500">Discover the platform engine.</span></h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/platform')}
          className="btn-primary text-xl px-12"
        >
          Explore Platform
        </motion.button>
      </section>
    </div>
  );
}
