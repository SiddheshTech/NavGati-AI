import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Users, ShieldCheck, Activity, CreditCard, 
  BrainCircuit, Key, LayoutGrid, Search, Bell, 
  ArrowUpRight, ArrowDownRight, Globe, AlertTriangle, 
  Server, Database, ShieldAlert
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 3.2, shipments: 5.4 },
  { name: 'Feb', revenue: 3.5, shipments: 6.1 },
  { name: 'Mar', revenue: 3.8, shipments: 6.8 },
  { name: 'Apr', revenue: 3.6, shipments: 6.5 },
  { name: 'May', revenue: 4.0, shipments: 7.2 },
  { name: 'Jun', revenue: 4.2, shipments: 8.4 },
];

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState('command');

  const tabs = [
    { id: 'command', label: 'Command Center', icon: LayoutGrid },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'users', label: 'Users & Access', icon: Users },
    { id: 'integrations', label: 'API & Integrations', icon: Server },
    { id: 'ai', label: 'Global AI Models', icon: BrainCircuit },
    { id: 'billing', label: 'Revenue & Billing', icon: CreditCard },
    { id: 'security', label: 'Security & Compliance', icon: ShieldCheck },
  ];

  const stats = [
    { label: 'Total Companies', value: '1,204', change: '+12%', trend: 'up' },
    { label: 'Monthly Revenue', value: '$4.2M', change: '+15%', trend: 'up' },
    { label: 'Platform Health', value: '99.99%', change: '+0.01%', trend: 'up' },
    { label: 'Risk Alerts', value: '24', change: '-5', trend: 'down' },
    { label: 'Shipments Tracked', value: '8.4M', change: '+18%', trend: 'up' },
    { label: 'Active Users', value: '45,210', change: '+8%', trend: 'up' },
    { label: 'Enterprise Clients', value: '142', change: '+4', trend: 'up' },
    { label: 'SLA Performance', value: '99.8%', change: 'Stable', trend: 'neutral' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white/5 border-r border-white/10 flex flex-col hide-scrollbar relative z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 font-black text-xl tracking-tighter text-blue-400 mb-2">
            <Globe size={24} />
            NAVGATI AI
          </div>
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
            Super Admin View
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
              <Key size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold">PredictRoute Core</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">SysAdmin Role</p>
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
                placeholder="Search queries, companies, logs..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500">System Nominal</span>
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

           {activeTab === 'command' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div>
                  <h1 className="text-3xl font-display font-black tracking-tight mb-2">Executive Command Center</h1>
                  <p className="text-gray-400 font-light">Global platform visibility and infrastructure controls.</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-2xl border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                       <h3 className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">{stat.label}</h3>
                       <div className="flex items-end justify-between">
                         <div className="text-3xl font-black font-display">{stat.value}</div>
                         <div className={`flex items-center gap-1 text-sm font-bold ${
                           stat.trend === 'up' ? 'text-emerald-400' : stat.trend === 'down' ? 'text-blue-400' : 'text-gray-400'
                         }`}>
                           {stat.trend === 'up' && <ArrowUpRight size={16} />}
                           {stat.trend === 'down' && <ArrowDownRight size={16} />}
                           {stat.change}
                         </div>
                       </div>
                    </div>
                  ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <div className="lg:col-span-2 glass rounded-3xl p-6 border-white/5">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400">Shipment Volume vs Revenue</h3>
                      </div>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                   </div>

                   {/* Critical Alerts */}
                   <div className="glass rounded-3xl p-6 border-red-500/10 bg-red-900/5">
                      <div className="flex items-center justify-between mb-6">
                         <h3 className="font-bold uppercase tracking-widest text-xs text-red-400 flex items-center gap-2">
                            <AlertTriangle size={14} /> Global Risk Alerts
                         </h3>
                         <span className="px-2 py-1 bg-red-500/20 text-red-500 text-[10px] font-bold rounded-lg rounded-full">24 Critical</span>
                      </div>
                      
                      <div className="space-y-4">
                         {[
                           { title: "Panama Canal Drought restriction", scope: "124 Companies affected", time: "12m ago" },
                           { title: "Hamburg Port Labor Strike", scope: "84 Companies affected", time: "1h ago" },
                           { title: "API Outage: Legacy ERP-A", scope: "12 Companies affected", time: "3h ago" },
                           { title: "Typhoon Approaching APAC", scope: "310 Companies affected", time: "5h ago" },
                         ].map((alert, i) => (
                           <div key={i} className="p-4 bg-[#020617]/50 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-colors cursor-pointer">
                              <h4 className="font-bold text-sm text-gray-200 mb-1">{alert.title}</h4>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{alert.scope}</span>
                                <span>{alert.time}</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </motion.div>
           )}

           {/* Placeholder for other tabs */}
           {activeTab !== 'command' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex items-center justify-center flex-col text-center">
                 <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
                   {(() => {
                     const ActiveIcon = tabs.find(t => t.id === activeTab)?.icon;
                     return ActiveIcon ? <ActiveIcon size={40} className="text-blue-500" /> : null;
                   })()}
                 </div>
                 <h2 className="text-3xl font-display font-black mb-4">{tabs.find(t => t.id === activeTab)?.label} Module</h2>
                 <p className="text-gray-400 max-w-md">
                   This module handles the deeper administrative capabilities for {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}. 
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
