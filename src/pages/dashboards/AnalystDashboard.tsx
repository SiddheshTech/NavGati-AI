import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LineChart as LineChartIcon, PieChart, BrainCircuit, 
  Target, FileSpreadsheet, Search, Bell, Globe, 
  ArrowUpRight, ArrowDownRight, Activity, Zap, Beaker
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';

const forecastData = [
  { month: 'Jan', actualDelay: 12, predictedDelay: 11 },
  { month: 'Feb', actualDelay: 15, predictedDelay: 14 },
  { month: 'Mar', actualDelay: 8, predictedDelay: 9 },
  { month: 'Apr', actualDelay: 10, predictedDelay: 11 },
  { month: 'May', actualDelay: 18, predictedDelay: 17 },
  { month: 'Jun', actualDelay: 22, predictedDelay: 21 }, // Current
  { month: 'Jul', predictedDelay: 25 },
  { month: 'Aug', predictedDelay: 19 },
  { month: 'Sep', predictedDelay: 15 },
];

export default function AnalystDashboard() {
  const { addToast, updateToast } = useToast();

  const handleAction = async (actionName: string) => {
    const toastId = addToast('loading', `Executing ${actionName}...`);
    try {
      const result = await api.executeAction(actionName);
      updateToast(toastId, 'success', result.message || `${actionName} executed successfully`);
    } catch (error: any) {
      updateToast(toastId, 'error', error.message || `Failed to execute ${actionName}`);
    }
  };

  const [activeTab, setActiveTab] = useState('predictive');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const loadData = async () => {
      try {
        const data = await api.getDashboard('analyst');
        setDashboardData(data.data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };
    loadData();
  }, []);

  const tabs = [
    { id: 'predictive', label: 'Predictive Analytics', icon: LineChartIcon },
    { id: 'kpi', label: 'KPI Intelligence', icon: PieChart },
    { id: 'recommendations', label: 'AI Review', icon: BrainCircuit },
    { id: 'optimization', label: 'Optimization Lab', icon: Beaker },
    { id: 'reports', label: 'Reporting Center', icon: FileSpreadsheet },
  ];

  const metrics = [
    { label: 'Delivery Success Rate', value: '96.2%', change: '+1.2%', trend: 'up' },
    { label: 'Avg Delay Time', value: '2.4 hrs', change: '-45 min', trend: 'down' },
    { label: 'Route Efficiency', value: '92.1%', change: '+3.4%', trend: 'up' },
    { label: 'SLA Compliance', value: '98.8%', change: '+0.1%', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex overflow-hidden selection:bg-blue-500/30">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white/5 border-r border-white/10 flex flex-col hide-scrollbar relative z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 font-black text-xl tracking-tighter text-blue-400 mb-2">
            <Globe size={24} />
            NAVGATI AI
          </div>
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
            Supply Chain Analyst
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center">
              <Target size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold truncate max-w-[150px]">{user?.name || 'Loading...'}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user?.role?.replace('_', ' ') || 'Data Analyst'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 glass px-8 flex items-center justify-between shrink-0 z-10 relative">
           <div className="flex items-center gap-4 text-gray-400 w-96 relative">
              <Search size={18} className="absolute left-4" />
              <input 
                type="text" 
                placeholder="Search metrics, reports, or scenarios..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-500">Models Synced</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }} className="relative p-2 text-gray-400 hover:text-white transition-colors">
                 <Bell size={20} />
              </button>
           </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="flex-1 overflow-y-auto p-8 relative">
           {/* Abstract BG */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none -z-10" />

           {activeTab === 'predictive' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div>
                  <h1 className="text-3xl font-display font-black tracking-tight mb-2">Predictive Analytics Center</h1>
                  <p className="text-gray-400 font-light">Forecasting future bottlenecks and seasonal risk analysis.</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {metrics.map((stat, i) => {
                    // Inject dynamic data for the first two metrics
                    let displayValue = stat.value;
                    if (dashboardData) {
                      if (i === 0) displayValue = dashboardData.kpiTracking.onTimeDelivery;
                      if (i === 1) displayValue = dashboardData.riskScoreAverage + ' (Risk)';
                    }
                    
                    return (
                      <div key={i} className="glass p-6 rounded-2xl border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                         <h3 className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">{stat.label}</h3>
                         <div className="flex items-end justify-between">
                           <div className="text-3xl font-black font-display">{displayValue}</div>
                           <div className={`flex items-center gap-1 text-sm font-bold ${
                             stat.trend === 'up' && stat.label.includes('Delay') ? 'text-red-400' :
                             stat.trend === 'up' ? 'text-emerald-400' : 
                             stat.trend === 'down' && stat.label.includes('Delay') ? 'text-emerald-400' :
                             stat.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                           }`}>
                             {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                             {stat.change}
                           </div>
                         </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <div className="lg:col-span-2 glass rounded-3xl p-6 border-white/5">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400">Delay Forecasting (Actual vs Predicted)</h3>
                      </div>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                               contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} 
                            />
                            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
                            <Area type="monotone" dataKey="actualDelay" name="Actual Delay (k)" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                            <Area type="monotone" dataKey="predictedDelay" name="Predicted Delay (k)" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                   </div>

                   {/* AI Recommendations */}
                   <div className="glass rounded-3xl p-6 border-white/5">
                      <div className="flex items-center justify-between mb-6">
                         <h3 className="font-bold uppercase tracking-widest text-xs text-blue-400 flex items-center gap-2">
                            <Zap size={14} /> AI Risk Confidence
                         </h3>
                      </div>
                      
                      <div className="space-y-4">
                         {[
                           { action: "Reroute EU-APAC via Cape", score: "94%", risk: "Low", savings: "$45k" },
                           { action: "Increase buffering at WH-4", score: "88%", risk: "Medium", savings: "$12k" },
                           { action: "Switch carrier for Route A2", score: "76%", risk: "High", savings: "$8k" },
                         ].map((rec, i) => (
                           <div key={i} className="p-4 bg-[#020617]/50 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-colors cursor-pointer">
                              <h4 className="text-sm font-bold text-gray-200 mb-2 truncate">{rec.action}</h4>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] uppercase font-bold text-gray-500">Confidence</span>
                                  <span className="text-xs font-bold text-blue-400">{rec.score}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] uppercase font-bold text-gray-500">Est Savings</span>
                                  <span className="text-xs font-bold text-emerald-400">{rec.savings}</span>
                                </div>
                              </div>
                           </div>
                         ))}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }} className="w-full mt-4 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
                        Run Simulation Lab
                      </button>
                   </div>
                </div>
             </motion.div>
           )}

           {/* Placeholder for other tabs */}
           {activeTab !== 'predictive' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex items-center justify-center flex-col text-center">
                 <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
                   {(() => {
                     const ActiveIcon = tabs.find(t => t.id === activeTab)?.icon;
                     return ActiveIcon ? <ActiveIcon size={40} className="text-blue-500" /> : null;
                   })()}
                 </div>
                 <h2 className="text-3xl font-display font-black mb-4">{tabs.find(t => t.id === activeTab)?.label} Module</h2>
                 <p className="text-gray-400 max-w-md">
                   This module provides advanced data modeling and reporting for {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.
                   <br/><br/>
                   <button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }} className="btn-primary text-sm px-6 py-2">Load Data Models</button>
                 </p>
             </motion.div>
           )}
        </div>
      </main>
    </div>
  );
}
