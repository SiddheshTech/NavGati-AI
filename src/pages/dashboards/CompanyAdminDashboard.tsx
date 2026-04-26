import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building, Users, Plug, Settings, BarChart3, CreditCard, 
  Search, Bell, ArrowUpRight, ArrowDownRight, Globe, AlertTriangle, 
  Activity, Navigation, Truck, Box
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar
} from 'recharts';

const delayData = [
  { name: 'Mon', delay: 12 },
  { name: 'Tue', delay: 8 },
  { name: 'Wed', delay: 15 },
  { name: 'Thu', delay: 5 },
  { name: 'Fri', delay: 10 },
  { name: 'Sat', delay: 4 },
  { name: 'Sun', delay: 2 },
];

export default function CompanyAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Organization Overview', icon: Building },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'integrations', label: 'Integration Center', icon: Plug },
    { id: 'workflows', label: 'Workflow Config', icon: Settings },
    { id: 'reports', label: 'Performance Reports', icon: BarChart3 },
    { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
  ];

  const stats = [
    { label: 'Active Shipments', value: '1,420', change: '+24', trend: 'up' },
    { label: 'Delay Risk %', value: '4.2%', change: '-1.1%', trend: 'down' },
    { label: 'Monthly Cost', value: '$840k', change: '-$12k', trend: 'down' },
    { label: 'SLA Performance', value: '98.5%', change: '+0.5%', trend: 'up' },
    { label: 'Warehouse Efficiency', value: '88%', change: '+2%', trend: 'up' },
    { label: 'Fleet Utilization', value: '92%', change: '+5%', trend: 'up' },
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
            Company Admin
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
              <Building size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold truncate max-w-[150px]">Titan Logistics Inc.</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Enterprise Plan</p>
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
                placeholder="Search resources, shipments, or team members..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500">All Systems Go</span>
              </div>
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
           </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="flex-1 overflow-y-auto p-8 relative">
           {/* Abstract BG */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none -z-10" />

           {activeTab === 'overview' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div>
                  <h1 className="text-3xl font-display font-black tracking-tight mb-2">Organization Overview</h1>
                  <p className="text-gray-400 font-light">High-level visibility into your company's supply chain health.</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                       <h3 className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">{stat.label}</h3>
                       <div className="flex items-end justify-between">
                         <div className="text-3xl font-black font-display">{stat.value}</div>
                         <div className={`flex items-center gap-1 text-sm font-bold ${
                           stat.trend === 'up' && stat.label.includes('Risk') ? 'text-red-400' :
                           stat.trend === 'up' && stat.label.includes('Cost') ? 'text-red-400' :
                           stat.trend === 'up' ? 'text-emerald-400' : 
                           stat.trend === 'down' && stat.label.includes('Risk') ? 'text-emerald-400' :
                           stat.trend === 'down' && stat.label.includes('Cost') ? 'text-emerald-400' :
                           stat.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                         }`}>
                           {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                           {stat.change}
                         </div>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <div className="lg:col-span-2 glass rounded-3xl p-6 border-white/5">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400">Delay Incidents Over Time</h3>
                      </div>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={delayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} 
                            />
                            <Bar dataKey="delay" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                   </div>

                   {/* Alerts */}
                   <div className="glass rounded-3xl p-6 border-orange-500/10 bg-orange-900/5">
                      <div className="flex items-center justify-between mb-6">
                         <h3 className="font-bold uppercase tracking-widest text-xs text-orange-400 flex items-center gap-2">
                            <AlertTriangle size={14} /> Open Disruption Alerts
                         </h3>
                         <span className="px-2 py-1 bg-orange-500/20 text-orange-500 text-[10px] font-bold rounded-full">3 Needs Action</span>
                      </div>
                      
                      <div className="space-y-4">
                         {[
                           { desc: "Fleet B stuck at Border Crossing (2h delay)", severity: "high" },
                           { desc: "Warehouse 4 Capacity at 98%", severity: "medium" },
                           { desc: "Route 202 requires rerouting due to weather", severity: "high" },
                         ].map((alert, i) => (
                           <div key={i} className="p-4 bg-[#020617]/50 rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer flex gap-4">
                              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alert.severity === 'high' ? 'bg-red-500' : 'bg-orange-500'}`} />
                              <h4 className="text-sm text-gray-300 leading-snug">{alert.desc}</h4>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </motion.div>
           )}

           {/* Placeholder for other tabs */}
           {activeTab !== 'overview' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex items-center justify-center flex-col text-center">
                 <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
                   {(() => {
                     const ActiveIcon = tabs.find(t => t.id === activeTab)?.icon;
                     return ActiveIcon ? <ActiveIcon size={40} className="text-blue-500" /> : null;
                   })()}
                 </div>
                 <h2 className="text-3xl font-display font-black mb-4">{tabs.find(t => t.id === activeTab)?.label} Module</h2>
                 <p className="text-gray-400 max-w-md">
                   This module handles the deeper organizational capabilities for {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.
                   <br/><br/>
                   <button className="btn-primary text-sm px-6 py-2">Initialize Module UI</button>
                 </p>
             </motion.div>
           )}
        </div>
      </main>
    </div>
  );
}
