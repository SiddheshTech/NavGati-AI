import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Users, ShieldCheck, Activity, CreditCard, 
  BrainCircuit, Key, LayoutGrid, Search, Bell, 
  ArrowUpRight, ArrowDownRight, Globe, AlertTriangle, 
  Server, Database, ShieldAlert, Settings, UserCircle, BarChart3,
  TrendingUp, TrendingDown, Ship, Truck, Box, Plug, Zap, Lock, Fingerprint, Eye, Shield, Link, Share2
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar
} from 'recharts';
import LiveMap from '../../components/LiveMap';

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
    { id: 'companies', label: 'Company Management', icon: Building2 },
    { id: 'users', label: 'User Access Control', icon: Users },
    { id: 'integrations', label: 'Integrations & APIs', icon: Server },
    { id: 'ai', label: 'AI Model Center', icon: BrainCircuit },
    { id: 'billing', label: 'Revenue & Billing', icon: CreditCard },
    { id: 'security', label: 'Security & Compliance', icon: ShieldCheck },
    { id: 'health', label: 'Platform Health', icon: Activity },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'support', label: 'Support & Escalations', icon: ShieldAlert },
    { id: 'settings', label: 'System Settings', icon: Settings },
    { id: 'profile', label: 'Profile Management', icon: UserCircle },
  ];

  const stats = [
    { 
      label: 'Total Active Companies', value: '1,204', trend: 'up', change: '+12%',
      details: ['942 Enterprise', '210 Trial', '52 Onboarded', '4 Suspended'] 
    },
    { 
      label: 'Shipments Tracked', value: '8.4M', trend: 'up', change: '+18%',
      details: ['Daily: 280k', 'Monthly: 8.4M', 'Active: 42k', 'Delayed: 1.2k']
    },
    { 
      label: 'Total Active Users', value: '45,210', trend: 'up', change: '+8%',
      details: ['1.2k Admins', '8.4k Ops', '4.1k Analysts', '22k Field']
    },
    { 
      label: 'Platform Health', value: '99.99%', trend: 'up', change: 'Stable',
      details: ['API: Nominal', 'Server: 18ms', 'AI: 99.4%', 'Data: Synced']
    },
    { 
      label: 'Monthly Revenue', value: '$4.2M', trend: 'up', change: '+15%',
      details: ['MRR: $3.8M', 'ARR: $45M', 'Renewals: 98%', 'Overdue: 2']
    },
    { 
      label: 'Enterprise Clients', value: '142', trend: 'up', change: '+4',
      details: ['Top: 10', 'Contracts: 142', 'Renewal Pipeline: 12', 'Churn: 0.1%']
    },
    { 
      label: 'Global Risk Alerts', value: '24', trend: 'down', change: '-5',
      details: ['Critical: 4', 'Active: 12', 'High Risk Routes: 8', 'Escalated: 2']
    },
    { 
      label: 'SLA Performance', value: '99.8%', trend: 'up', change: 'Stable',
      details: ['On-time: 99.4%', 'Avg Delay: 1h', 'Compliance: 100%', 'Gap: -0.2%']
    },
  ];

  const clientRankings = [
    { name: 'Titan Logistics', sla: '99.9%', delivery: '98.5%', recovery: 'Fast', efficiency: '+12%', sat: '4.9/5' },
    { name: 'Swift Transports', sla: '99.4%', delivery: '97.2%', recovery: 'Normal', efficiency: '+8%', sat: '4.7/5' },
    { name: 'Ocean Carriers', sla: '98.8%', delivery: '96.4%', recovery: 'Fast', efficiency: '+15%', sat: '4.8/5' },
    { name: 'Global Haulage', sla: '97.5%', delivery: '95.1%', recovery: 'Delayed', efficiency: '+4%', sat: '4.2/5' },
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
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2">Platform Command Center</h1>
                    <p className="text-gray-400 font-light text-lg">Real-time global ecosystem telemetry and strategic oversight.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-xl font-bold text-sm hover:bg-blue-600/20 transition-all">
                      Strategic Report
                    </button>
                    <button className="px-6 py-2 bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 rounded-xl font-bold text-sm hover:bg-emerald-600/20 transition-all">
                      Live Export
                    </button>
                  </div>
                </div>

                {/* Detailed KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-3xl border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-xl">
                       <div className="flex justify-between items-start mb-4">
                         <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">{stat.label}</h3>
                         <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${
                           stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                         }`}>
                           {stat.change}
                         </div>
                       </div>
                       <div className="text-4xl font-black font-display mb-4 tracking-tighter">{stat.value}</div>
                       <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-white/5 pt-4">
                         {stat.details?.map((detail, idx) => (
                           <div key={idx} className="text-[10px] text-gray-400 font-medium truncate flex items-center gap-1.5 leading-tight">
                             <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                             {detail}
                           </div>
                         ))}
                       </div>
                    </div>
                  ))}
                </div>

                {/* Global Live Map Section */}
                <div className="glass rounded-[40px] border-white/10 overflow-hidden shadow-2xl relative h-[600px]">
                   <div className="absolute top-8 left-8 z-10 space-y-4">
                      <div className="glass p-4 rounded-2xl border-white/10 backdrop-blur-xl">
                         <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">Live Fleet Operations</h3>
                         <div className="flex items-center gap-4 text-xs font-bold">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" /> 42k Active</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" /> 1.2k Risk</div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> 28k Delivered</div>
                         </div>
                      </div>

                      <div className="glass p-4 rounded-2xl border-white/10 backdrop-blur-xl space-y-2">
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Global Filters</div>
                        <div className="flex gap-2">
                           {['Ocean', 'Air', 'Road', 'Rail'].map(f => (
                             <button key={f} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold hover:bg-white/10 transition-all">{f}</button>
                           ))}
                        </div>
                      </div>
                   </div>

                   <div className="absolute inset-0 grayscale opacity-40 hover:grayscale-0 transition-all duration-1000">
                      <LiveMap />
                   </div>

                   <div className="absolute bottom-8 right-8 flex gap-4">
                      <div className="glass p-4 rounded-2xl border-white/10 backdrop-blur-xl">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">System Load</h4>
                        <div className="text-lg font-black text-white">18.4 <span className="text-[10px] font-normal text-gray-400 uppercase tracking-widest ml-1">Req / Sec</span></div>
                      </div>
                      <div className="glass p-4 rounded-2xl border-white/10 backdrop-blur-xl">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Global latency</h4>
                        <div className="text-lg font-black text-white">42 <span className="text-[10px] font-normal text-gray-400 uppercase tracking-widest ml-1">ms avg</span></div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {/* Enterprise Performance Ranking */}
                   <div className="lg:col-span-2 glass rounded-[40px] p-8 border-white/5 shadow-2xl relative overflow-hidden">
                      <div className="flex items-center justify-between mb-8">
                         <div>
                            <h3 className="font-display font-black text-2xl tracking-tight">Enterprise Performance Ranking</h3>
                            <p className="text-gray-500 text-sm italic font-light">Leaderboard based on SLA compliance and recovery speed.</p>
                         </div>
                         <button className="text-xs font-bold text-blue-400 uppercase tracking-widest hover:underline">View All Clients</button>
                      </div>

                      <div className="space-y-2">
                        <div className="grid grid-cols-6 gap-4 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5 mb-4">
                          <div className="col-span-2">Organization</div>
                          <div className="text-center">SLA</div>
                          <div className="text-center">On-Time</div>
                          <div className="text-center">Eff. Gain</div>
                          <div className="text-right">CSAT</div>
                        </div>
                        {clientRankings.map((client, i) => (
                           <div key={i} className="grid grid-cols-6 gap-4 px-6 py-5 bg-white/0 hover:bg-white/5 rounded-2xl transition-all items-center group cursor-pointer border border-transparent hover:border-white/5">
                              <div className="col-span-2 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center font-black text-xs text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                                  {i + 1}
                                </div>
                                <span className="font-bold text-sm text-gray-200">{client.name}</span>
                              </div>
                              <div className="text-center font-mono font-black text-sm text-emerald-400">{client.sla}</div>
                              <div className="text-center text-sm font-medium text-gray-400">{client.delivery}</div>
                              <div className="text-center font-mono text-sm text-blue-400 font-bold">{client.efficiency}</div>
                              <div className="text-right text-sm font-bold text-yellow-500/80 tracking-tighter italic">{client.sat}</div>
                           </div>
                        ))}
                      </div>
                   </div>

                   {/* Enhanced Critical Alert Feed */}
                   <div className="glass rounded-[40px] p-8 border-red-500/20 bg-red-950/5 relative overflow-hidden backdrop-blur-2xl">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="font-display font-black text-2xl tracking-tight text-red-500 flex items-center gap-3">
                            <AlertTriangle size={24} className="animate-pulse" /> Alerts
                         </h3>
                         <span className="px-3 py-1 bg-red-500/20 text-red-500 text-[10px] font-black rounded-full uppercase tracking-tighter border border-red-500/20">24 Pending</span>
                      </div>
                      
                      <div className="space-y-4">
                         {[
                           { title: "Panama Canal Drought", scope: "Major Route Disruption", impact: "High", companies: 124, type: "Operational", time: "12m ago" },
                           { title: "Hamburg Port Strike", scope: "Dock Closure imminent", impact: "Critical", companies: 84, type: "Infrastructure", time: "1h ago" },
                           { title: "API Outage: SAP Legacy", scope: "Data Sync Failure", impact: "Medium", companies: 12, type: "Technical", time: "3h ago" },
                           { title: "Peak Season Congestion", scope: "LAX Hub Delay Spikes", impact: "High", companies: 310, type: "Systemic", time: "5h ago" },
                         ].map((alert, i) => (
                           <div key={i} className="p-5 bg-black/40 rounded-3xl border border-white/5 hover:border-red-500/20 transition-all group cursor-pointer">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-500/70">{alert.type}</span>
                                <span className="text-[10px] text-gray-600 font-bold">{alert.time}</span>
                              </div>
                              <h4 className="font-black text-lg text-white mb-2 leading-tight group-hover:text-red-400 transition-colors uppercase italic">{alert.title}</h4>
                              <p className="text-[11px] text-gray-500 mb-4 font-medium italic">{alert.scope}</p>
                              
                              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                <div className="flex items-center gap-4">
                                  <div className="flex flex-col">
                                    <span className="text-[8px] uppercase font-bold text-gray-600 tracking-widest">Impact</span>
                                    <span className={`text-[10px] font-black uppercase ${alert.impact === 'Critical' ? 'text-red-500' : 'text-orange-500'}`}>{alert.impact}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[8px] uppercase font-bold text-gray-600 tracking-widest">Companies</span>
                                    <span className="text-[10px] font-black text-gray-400 capitalize">{alert.companies} affected</span>
                                  </div>
                                </div>
                                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                   <ArrowUpRight size={14} className="text-gray-500" />
                                </button>
                              </div>
                           </div>
                         ))}
                      </div>
                      <button className="w-full mt-6 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all">
                        Execute Crisis Protocol
                      </button>
                   </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'companies' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">Company Management</h1>
                    <p className="text-gray-400 font-light text-lg italic">Full lifecycle control for PredictRoute AI enterprise organizations.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl shadow-white/5 flex items-center gap-2">
                       <Building2 size={16} /> Add New Organization
                    </button>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                       Bulk Import
                    </button>
                  </div>
                </div>

                {/* Company Oversight Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-3 glass rounded-[40px] p-8 border-white/5 shadow-2xl">
                     <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-4 text-gray-400 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 w-96">
                          <Search size={18} />
                          <input type="text" placeholder="Search by name, industry, or owner..." className="bg-transparent border-none outline-none text-sm w-full font-medium" />
                       </div>
                       <div className="flex gap-2">
                          {['Enterprise', 'Trial', 'Suspended'].map(filter => (
                            <button key={filter} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                              {filter}
                            </button>
                          ))}
                       </div>
                     </div>

                     <div className="space-y-3">
                        {[
                          { name: 'Titan Logistics', industry: 'Energy', plan: 'Enterprise', status: 'Healthy', score: 98, volume: '2.4M', owner: 'M. Chen' },
                          { name: 'Swift Transports', industry: 'Retail', plan: 'Enterprise Plus', status: 'Warning', score: 72, volume: '1.8M', owner: 'A. Smith' },
                          { name: 'Ocean Carriers', industry: 'Maritime', plan: 'Custom', status: 'Healthy', score: 95, volume: '4.1M', owner: 'J. Doe' },
                          { name: 'Global Haulage', industry: 'Logistics', plan: 'Trial', status: 'Healthy', score: 88, volume: '240k', owner: 'S. Ray' },
                          { name: 'Skyline Freight', industry: 'Aerospace', plan: 'Enterprise', status: 'Critical', score: 34, volume: '680k', owner: 'R. Paul' },
                        ].map((company, i) => (
                          <div key={i} className="group p-5 bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-[24px] transition-all grid grid-cols-7 gap-4 items-center">
                             <div className="col-span-2 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-white/5 flex items-center justify-center font-black text-blue-400">
                                   {company.name[0]}
                                </div>
                                <div>
                                   <div className="font-bold text-gray-200">{company.name}</div>
                                   <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{company.industry}</div>
                                </div>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[8px] uppercase font-black text-gray-600 mb-1">Subscription</span>
                                <span className="text-xs font-bold text-gray-300">{company.plan}</span>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[8px] uppercase font-black text-gray-600 mb-1">Volume</span>
                                <span className="text-xs font-bold text-gray-300">{company.volume}</span>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[8px] uppercase font-black text-gray-600 mb-1">Health Score</span>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-1 bg-white/10 rounded-full max-w-[40px]">
                                    <div className={`h-full rounded-full ${company.score > 80 ? 'bg-emerald-500' : company.score > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${company.score}%` }} />
                                  </div>
                                  <span className="text-xs font-bold text-gray-300">{company.score}</span>
                                </div>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[8px] uppercase font-black text-gray-600 mb-1">Owner</span>
                                <span className="text-xs font-bold text-gray-400">{company.owner}</span>
                             </div>
                             <div className="text-right">
                                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600/20 group-hover:border-blue-500/20 transition-all border border-transparent">
                                   <ArrowUpRight size={16} className="text-gray-500 group-hover:text-blue-400" />
                                </button>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                     {/* Retention Monitoring */}
                     <div className="glass rounded-[40px] p-6 border-white/5 bg-blue-900/5 relative overflow-hidden backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-6">
                           <ShieldAlert size={20} className="text-blue-400" />
                           <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Churn Watch</h3>
                        </div>
                        <div className="space-y-4">
                           {[
                             { name: 'Skyline Freight', risk: 'Critical', prob: '84%', trend: 'down' },
                             { name: 'Swift Transports', risk: 'Elevated', prob: '42%', trend: 'down' },
                           ].map((item, i) => (
                              <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5">
                                 <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-black text-white">{item.name}</span>
                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${item.risk === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                       {item.risk}
                                    </span>
                                 </div>
                                 <div className="flex items-center justify-between">
                                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Churn Prob.</div>
                                    <div className="flex items-center gap-1">
                                       <TrendingUp size={12} className={item.risk === 'Critical' ? 'text-red-500' : 'text-yellow-500'} />
                                       <span className="text-xs font-black text-gray-300">{item.prob}</span>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <button className="w-full mt-6 py-3 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                           Launch Retention Playbook
                        </button>
                     </div>

                     {/* Subscription Meta */}
                     <div className="glass rounded-[40px] p-6 border-emerald-500/10 bg-emerald-950/5 relative overflow-hidden backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-6">
                           <CreditCard size={20} className="text-emerald-400" />
                           <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400">Contract Lifecycle</h3>
                        </div>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Renewals (90d)</span>
                              <span className="text-sm font-black text-emerald-400">12</span>
                           </div>
                           <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Expansion Potential</span>
                              <span className="text-sm font-black text-blue-400">$2.4M</span>
                           </div>
                           <div className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">At-Risk Value</span>
                              <span className="text-sm font-black text-red-500">$840k</span>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'users' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">User Access Control</h1>
                    <p className="text-gray-400 font-light text-lg italic">Platform-wide identity governance and permission hierarchies.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2">
                       <Users size={16} /> Manage Roles
                    </button>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                       Global MFA Policy
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-3 glass rounded-[40px] p-8 border-white/5 shadow-2xl">
                     <div className="flex items-center justify-between mb-8">
                       <div className="flex items-center gap-4 text-gray-400 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 w-96">
                          <Search size={18} />
                          <input type="text" placeholder="Search users by name, company, or IP..." className="bg-transparent border-none outline-none text-sm w-full font-medium" />
                       </div>
                       <div className="flex gap-2">
                          {['Admins', 'Ops', 'Risk High'].map(filter => (
                            <button key={filter} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all font-mono">
                              {filter}
                            </button>
                          ))}
                       </div>
                     </div>

                     <div className="space-y-3">
                        {[
                          { name: 'Sarah Miller', company: 'Titan Logistics', role: 'Company Admin', dept: 'Operations', status: 'Active', activity: '2m ago', risk: 'Low' },
                          { name: 'Robert Zhang', company: 'Swift Transports', role: 'Ops Manager', dept: 'Logistics', status: 'Active', activity: '14m ago', risk: 'Medium' },
                          { name: 'Elena Petrova', company: 'Ocean Carriers', role: 'Analyst', dept: 'Intelligence', status: 'Away', activity: '2h ago', risk: 'Low' },
                          { name: 'David Kojo', company: 'Global Haulage', role: 'Security Officer', dept: 'Risk', status: 'Active', activity: 'Now', risk: 'Low' },
                          { name: 'Marc Dupont', company: 'Skyline Freight', role: 'Field Exec', dept: 'Transit', status: 'LOCKED', activity: '1d ago', risk: 'CRITICAL' },
                        ].map((user, i) => (
                          <div key={i} className="group p-5 bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-[24px] transition-all grid grid-cols-7 gap-4 items-center">
                             <div className="col-span-2 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center font-black text-blue-400 overflow-hidden">
                                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" referrerPolicy="no-referrer" />
                                </div>
                                <div>
                                   <div className="font-bold text-gray-200">{user.name}</div>
                                   <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{user.company}</div>
                                </div>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[8px] uppercase font-black text-gray-600 mb-1">Role</span>
                                <span className="text-xs font-bold text-gray-300">{user.role}</span>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[8px] uppercase font-black text-gray-600 mb-1">Department</span>
                                <span className="text-xs font-bold text-gray-300">{user.dept}</span>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[8px] uppercase font-black text-gray-600 mb-1">Status</span>
                                <div className="flex items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : user.status === 'LOCKED' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-yellow-500'}`} />
                                  <span className={`text-xs font-bold ${user.status === 'LOCKED' ? 'text-red-500' : 'text-gray-300'}`}>{user.status}</span>
                                </div>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[8px] uppercase font-black text-gray-600 mb-1">Last Active</span>
                                <span className="text-xs font-bold text-gray-400">{user.activity}</span>
                             </div>
                             <div className="text-right flex justify-end gap-2">
                                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600/20 group-hover:border-red-500/20 transition-all border border-transparent">
                                   <ShieldAlert size={16} className="text-gray-500 group-hover:text-red-400" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600/20 group-hover:border-blue-500/20 transition-all border border-transparent">
                                   <ArrowUpRight size={16} className="text-gray-500 group-hover:text-blue-400" />
                                </button>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                     {/* Security Monitoring */}
                     <div className="glass rounded-[40px] p-6 border-red-500/20 bg-red-950/5 relative overflow-hidden backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-6 text-red-500">
                           <ShieldAlert size={20} className="animate-pulse" />
                           <h3 className="text-xs font-black uppercase tracking-widest">Active Security Threats</h3>
                        </div>
                        <div className="space-y-4">
                           {[
                             { user: 'Marc Dupont', company: 'Skyline Freight', type: 'Brute Force Attempt', time: '12m ago', severity: 'Critical' },
                             { user: 'IP: 192.168.1.42', company: 'Swift Transports', type: 'Unusual Location Login', time: '44m ago', severity: 'High' },
                             { user: 'Admin Account', company: 'Titan Logistics', type: 'Mass Export Detected', time: '1h ago', severity: 'High' },
                           ].map((threat, i) => (
                              <div key={i} className="p-4 bg-black/40 rounded-2xl border border-red-500/10">
                                 <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-white truncate max-w-[120px]">{threat.user}</span>
                                    <span className="text-[8px] font-black uppercase text-red-500">{threat.severity}</span>
                                 </div>
                                 <div className="text-[10px] text-red-400/80 font-bold mb-1 italic">{threat.type}</div>
                                 <div className="flex items-center justify-between">
                                    <span className="text-[8px] text-gray-600 font-bold uppercase">{threat.company}</span>
                                    <span className="text-[8px] text-gray-600 font-bold uppercase">{threat.time}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <button className="w-full mt-6 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-red-600/20">
                           Lock All High-Risk Sessions
                        </button>
                     </div>

                     {/* Role Inheritance */}
                     <div className="glass rounded-[40px] p-6 border-blue-500/10 bg-blue-950/5 relative overflow-hidden backdrop-blur-xl">
                        <div className="flex items-center gap-2 mb-6 text-blue-400">
                           <Key size={20} />
                           <h3 className="text-xs font-black uppercase tracking-widest">Access Inheritance</h3>
                        </div>
                        <div className="space-y-3">
                           {[
                             { role: 'Platform Admin', usage: '12 Accounts', access: 'Full Root' },
                             { role: 'Global Support', usage: '28 Accounts', access: 'Tier 3' },
                             { role: 'Audit Viewer', usage: '5 Accounts', access: 'Read Only' },
                           ].map((role, i) => (
                              <div key={i} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                                 <div>
                                    <div className="text-[10px] font-black text-gray-200">{role.role}</div>
                                    <div className="text-[8px] font-bold text-gray-500 uppercase">{role.usage}</div>
                                 </div>
                                 <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                                    {role.access}
                                 </span>
                              </div>
                           ))}
                        </div>
                        <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                           Modify Template Matrix
                        </button>
                     </div>
                  </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'integrations' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">Integrations & API Control</h1>
                    <p className="text-gray-400 font-light text-lg italic">Enterprise orchestration, data pipeline telemetry, and ecosystem connectivity.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl flex items-center gap-2">
                       <Plug size={16} /> Generate API Key
                    </button>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                       Pipeline Auto-Recovery
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Section A: API Management */}
                  <div className="glass rounded-[40px] p-8 border-white/5 shadow-2xl flex flex-col justify-between">
                     <div>
                        <div className="flex items-center justify-between mb-8">
                           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                              <Key size={16} /> API Management
                           </h3>
                        </div>

                        <div className="space-y-6">
                           <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 italic">Active Keys & Scopes</div>
                              <div className="space-y-3">
                                 {[
                                   { name: 'Titan_ERP_Prod', scope: 'Read/Write', exp: '14 days', status: 'Active' },
                                   { name: 'Ocean_Analytics', scope: 'Read-only', exp: 'Expired', status: 'Revoked' },
                                   { name: 'Global_WMS_Hub', scope: 'Admin', exp: '240 days', status: 'Active' },
                                 ].map((key, i) => (
                                   <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                                      <div>
                                         <div className="text-xs font-bold text-gray-200">{key.name}</div>
                                         <div className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">{key.scope} • Exp: {key.exp}</div>
                                      </div>
                                      <div className={`w-2 h-2 rounded-full ${key.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-red-500'}`} />
                                   </div>
                                 ))}
                              </div>
                           </div>

                           <div className="pt-6 border-t border-white/5">
                              <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 italic">Webhook Setup</div>
                              <div className="space-y-3">
                                 {[
                                   { event: 'Shipment Created', url: 'https://hooks.titan.com/...' },
                                   { event: 'ETA Updated', url: 'https://api.ocean.net/hooks' },
                                 ].map((hook, i) => (
                                   <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-4">
                                      <Share2 size={16} className="text-blue-500" />
                                      <div className="overflow-hidden">
                                         <div className="text-[10px] font-black text-gray-200 uppercase">{hook.event}</div>
                                         <div className="text-[10px] text-gray-600 font-mono truncate">{hook.url}</div>
                                      </div>
                                   </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8 space-y-4">
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                           <p className="text-[10px] text-yellow-500 uppercase font-black tracking-tighter leading-tight italic">
                             Warning: Rate limit saturation detected on "Titan_ERP_Prod" key (84% capacity).
                           </p>
                        </div>
                        <button className="w-full py-4 bg-red-600/10 border border-red-500/30 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                           Revoke Compromised Keys
                        </button>
                     </div>
                  </div>

                  {/* Section B/C: Systems & Data Pipeline */}
                  <div className="lg:col-span-2 space-y-6">
                     <div className="glass rounded-[40px] p-8 border-white/5 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                              <Server size={16} /> ERP / TMS / WMS Monitoring
                           </h3>
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Global Sync Active</span>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                           {[
                             { name: 'SAP S/4HANA', type: 'ERP', latency: '42ms', status: 'Healthy' },
                             { name: 'Oracle GTM', type: 'TMS', latency: '128ms', status: 'Warning' },
                             { name: 'BlueYonder', type: 'WMS', latency: '24ms', status: 'Healthy' },
                             { name: 'Project44', type: 'GPS', latency: '8ms', status: 'Healthy' },
                             { name: 'Salesforce', type: 'CRM', latency: '412ms', status: 'Healthy' },
                             { name: 'FleetMaster', type: 'Fleet', latency: '12ms', status: 'Healthy' },
                           ].map((sys, i) => (
                             <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl group hover:border-white/20 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                   <div className="text-[10px] font-black text-gray-500 uppercase">{sys.type}</div>
                                   <div className={`w-1.5 h-1.5 rounded-full ${sys.status === 'Healthy' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                </div>
                                <div className="text-sm font-bold text-gray-200 mb-1">{sys.name}</div>
                                <div className="flex justify-between items-center">
                                   <span className="text-[8px] font-mono text-gray-600">{sys.latency}</span>
                                   <button className="text-[8px] font-black text-blue-400 uppercase hover:underline opacity-0 group-hover:opacity-100 transition-all">Retry Sync</button>
                                </div>
                             </div>
                           ))}
                        </div>

                        <div>
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 italic">Data Pipeline Health</h4>
                           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="space-y-2">
                                 <div className="flex justify-between text-[8px] font-black uppercase text-gray-400">
                                    <span>Ingestion Status</span>
                                    <span>99.4%</span>
                                 </div>
                                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[99.4%]" />
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <div className="flex justify-between text-[8px] font-black uppercase text-gray-400">
                                    <span>Event Stream Latency</span>
                                    <span>182ms</span>
                                 </div>
                                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[42%]" />
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <div className="flex justify-between text-[8px] font-black uppercase text-gray-400">
                                    <span>Anomaly Detection</span>
                                    <span className="text-emerald-500">Active</span>
                                 </div>
                                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-full" />
                                 </div>
                              </div>
                           </div>

                           <div className="mt-8 p-6 bg-red-500/5 border border-red-500/10 rounded-3xl relative overflow-hidden group">
                              <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-500" />
                              <div className="flex items-center gap-4">
                                 <AlertTriangle size={24} className="text-red-500" />
                                 <div>
                                    <h5 className="text-[10px] font-black uppercase text-red-500 mb-1">Integration Error Alert</h5>
                                    <p className="text-sm font-bold text-gray-300">Timeout on Oracle GTM Sync - Blocked 14 event records (APAC Cluster).</p>
                                 </div>
                                 <button className="ml-auto px-4 py-2 bg-red-500 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-red-500/20">Auto-Recover</button>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="glass rounded-[40px] p-8 border-white/5 shadow-2xl overflow-hidden relative">
                        <div className="flex justify-between items-center mb-8">
                           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                              <Activity size={16} /> API Usage Real-time Logs
                           </h3>
                           <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1 group">
                              Expand Logs <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                           </button>
                        </div>
                        <div className="space-y-2 font-mono text-[10px]">
                           {[
                             { method: 'POST', endpoint: '/v1/shipments', code: 202, time: '822ms ago' },
                             { method: 'GET', endpoint: '/v1/tracking/live', code: 200, time: '1.2s ago' },
                             { method: 'PUT', endpoint: '/v1/erp/sync/status', code: 504, time: '4.8s ago', alert: true },
                             { method: 'POST', endpoint: '/v2/ai/route/optimize', code: 200, time: '12s ago' },
                           ].map((log, i) => (
                             <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${log.alert ? 'bg-red-500/10' : 'hover:bg-white/5'} transition-all`}>
                                <div className="flex items-center gap-4">
                                   <span className={`w-12 font-black ${log.method === 'GET' ? 'text-blue-400' : 'text-emerald-400'}`}>{log.method}</span>
                                   <span className="text-gray-400">{log.endpoint}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                   <span className={log.code >= 400 ? 'text-red-500' : 'text-emerald-500'}>{log.code}</span>
                                   <span className="text-gray-600">{log.time}</span>
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'ai' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">AI Model Center</h1>
                    <p className="text-gray-400 font-light text-lg italic">Global neural network telemetry, accuracy benchmarks, and computational efficiency.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl flex items-center gap-2">
                       <Zap size={16} /> Deploy New Version
                    </button>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                       Global Retraining Task
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Model Performance Overview */}
                  <div className="glass rounded-[40px] p-8 border-white/5 shadow-2xl lg:col-span-2">
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Neural Network Benchmarks</h3>
                       <div className="flex items-center gap-4 text-[10px] font-black">
                          <span className="flex items-center gap-1 text-emerald-500"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Accuracy: 99.4%</span>
                          <span className="flex items-center gap-1 text-blue-500"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Drift: 0.02%</span>
                       </div>
                    </div>
                    
                    <div className="h-80 mb-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { name: 'T-Minus 6', val: 92 }, { name: 'T-Minus 5', val: 94 },
                          { name: 'T-Minus 4', val: 91 }, { name: 'T-Minus 3', val: 96 },
                          { name: 'T-Minus 2', val: 97 }, { name: 'T-Minus 1', val: 99.4 }
                        ]}>
                          <defs>
                            <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorAI)" />
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="name" hide />
                          <YAxis domain={[80, 100]} hide />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {[
                         { name: 'Predictive ETA Gen-5', load: 'Critical High', latency: '12ms', reliability: '99.9%' },
                         { name: 'Disruption Risk V2', load: 'Normal', latency: '45ms', reliability: '98.4%' },
                         { name: 'Route Optimizer R-7', load: 'Optimized', latency: '240ms', reliability: '100%' },
                         { name: 'LLM Extraction Hub', load: 'Normal', latency: '1.2s', reliability: '99.1%' },
                       ].map((model, i) => (
                         <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between">
                            <div>
                               <div className="text-sm font-bold text-gray-200">{model.name}</div>
                               <div className="text-[10px] font-black uppercase text-gray-600">Reliability: {model.reliability}</div>
                            </div>
                            <div className="text-right">
                               <div className="text-xs font-black text-blue-400">{model.latency}</div>
                               <div className="text-[8px] uppercase font-bold text-gray-500">{model.load}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* GPU & Infra Load */}
                  <div className="glass rounded-[40px] p-8 border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-8">Infrastructure Compute</h3>
                      <div className="space-y-8">
                         <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                               <span>GPU Utilization (H100 Cluster)</span>
                               <span>84%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-blue-500 w-[84%] shadow-[0_0_12px_#3b82f6]" />
                            </div>
                         </div>
                         <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                               <span>Memory Buffer</span>
                               <span>22%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-emerald-500 w-[22%]" />
                            </div>
                         </div>
                         <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                               <span>Token Throughput</span>
                               <span>92% Cap</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                               <div className="h-full bg-orange-500 w-[92%]" />
                            </div>
                         </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                      <div className="flex items-center gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                         <ShieldAlert size={20} className="text-red-500 shrink-0" />
                         <p className="text-[10px] leading-relaxed text-red-500/80 font-bold uppercase tracking-tighter">
                           Warning: Accuracy drop detected in EU-West-1 inference node due to regional weather drift.
                         </p>
                      </div>
                    </div>
                  </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'billing' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">Revenue & Billing Panel</h1>
                    <p className="text-gray-400 font-light text-lg italic">Full financial control center, client profitability, and enterprise invoicing.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl">
                       Export Financials
                    </button>
                    <button className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20">
                       Generate Monthly Audit
                    </button>
                  </div>
                </div>

                {/* Section A: Subscription Revenue Dashboard */}
                <div className="glass rounded-[40px] p-8 border-white/5 shadow-2xl relative overflow-hidden">
                   <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none" />
                   <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500 mb-8 flex items-center gap-2">
                      <TrendingUp size={16} /> Subscription Revenue Dashboard
                   </h3>
                   
                   <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                      <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                         <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Total ARR</div>
                         <div className="text-3xl font-black font-display tracking-tighter">$45.2M</div>
                         <div className="text-emerald-500 text-[10px] font-bold mt-2 flex items-center gap-1"><ArrowUpRight size={12} /> +15.4% YoY</div>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                         <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Current MRR</div>
                         <div className="text-3xl font-black font-display tracking-tighter">$3.76M</div>
                         <div className="text-emerald-500 text-[10px] font-bold mt-2 flex items-center gap-1"><ArrowUpRight size={12} /> +2.1% MoM</div>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                         <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Enterprise Rev.</div>
                         <div className="text-3xl font-black font-display tracking-tighter text-blue-400">82%</div>
                         <div className="text-gray-500 text-[10px] font-bold mt-2 flex items-center gap-1">Share of Total</div>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                         <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Upgrade Rev.</div>
                         <div className="text-3xl font-black font-display tracking-tighter text-emerald-400">$840K</div>
                         <div className="text-gray-500 text-[10px] font-bold mt-2 flex items-center gap-1">This Quarter</div>
                      </div>
                      <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-3xl">
                         <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Churn Rate</div>
                         <div className="text-3xl font-black font-display tracking-tighter text-red-400">1.2%</div>
                         <div className="text-emerald-500 text-[10px] font-bold mt-2 flex items-center gap-1"><ArrowDownRight size={12} /> -0.3% vs Q2</div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   {/* Section B: Invoice Management */}
                   <div className="glass rounded-[40px] p-8 border-white/5 shadow-2xl">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-8 flex items-center gap-2">
                         <Database size={16} /> Invoice Management
                      </h3>

                      <div className="flex gap-4 mb-8">
                         <div className="flex-1 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
                            <div className="text-2xl font-black text-emerald-500 tracking-tighter mb-1">1,248</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">Issued (30d)</div>
                         </div>
                         <div className="flex-1 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                            <div className="text-2xl font-black text-red-500 tracking-tighter mb-1">14</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-red-500/60">Overdue</div>
                         </div>
                         <div className="flex-1 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-center">
                            <div className="text-2xl font-black text-orange-500 tracking-tighter mb-1">3</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-orange-500/60">Failed Alerts</div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Payment Tracking</div>
                         {[
                           { client: 'Ocean Carriers', status: 'Paid', amount: '$42,500', time: '2m ago' },
                           { client: 'Swift Transports', status: 'Failed', amount: '$12,800', time: '14m ago', alert: true },
                           { client: 'Titan Logistics', status: 'Processing', amount: '$122,000', time: '1h ago' },
                           { client: 'Global Haulage', status: 'Overdue', amount: '$84,200', time: '3d ago', alert: true },
                         ].map((tx, i) => (
                           <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${tx.alert ? 'bg-red-500/5 border-red-500/20' : 'bg-white/[0.02] border-white/5'}`}>
                              <div>
                                 <div className="text-sm font-bold text-gray-200">{tx.client}</div>
                                 <div className={`text-[10px] font-black uppercase mt-1 ${
                                    tx.status === 'Paid' ? 'text-emerald-500' :
                                    tx.status === 'Failed' || tx.status === 'Overdue' ? 'text-red-500' : 'text-blue-400'
                                 }`}>{tx.status}</div>
                              </div>
                              <div className="text-right">
                                 <div className="text-sm font-mono font-bold text-white">{tx.amount}</div>
                                 <div className="text-[10px] text-gray-500">{tx.time}</div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Section C: Client Billing Reports */}
                   <div className="glass rounded-[40px] p-8 border-white/5 shadow-2xl flex flex-col justify-between">
                      <div>
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-8 flex items-center gap-2">
                            <BarChart3 size={16} /> Client Billing Reports
                         </h3>

                         <div className="space-y-6">
                            {[
                              { label: 'Platform Usage (API calls)', val: '86%', usage: '8.6M / 10M' },
                              { label: 'Overage Billing Projected', val: '42%', usage: '$14.2K expected' },
                              { label: 'Storage Usage (TB)', val: '92%', usage: '92TB / 100TB' },
                            ].map((stat, i) => (
                              <div key={i} className="p-4 bg-black/40 rounded-3xl border border-white/5">
                                 <div className="flex justify-between items-center mb-3">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
                                    <span className="text-[10px] font-mono text-blue-400">{stat.usage}</span>
                                 </div>
                                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: stat.val }} />
                                 </div>
                              </div>
                            ))}
                         </div>

                         <div className="mt-8 pt-8 border-t border-white/5">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Contract Profitability High-Watermarks</h4>
                            <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                               <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-black">T</div>
                                  <div>
                                     <div className="text-sm font-bold text-gray-200">Titan Logistics</div>
                                     <div className="text-[10px] font-black uppercase text-gray-500">Margin: +62%</div>
                                  </div>
                               </div>
                               <button className="px-3 py-1 bg-white/5 text-[10px] font-black uppercase rounded-lg hover:bg-white/10 transition-colors">View Details</button>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'security' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">Security & Compliance Center</h1>
                    <p className="text-gray-400 font-light text-lg italic">Enterprise trust, global governance, and advanced threat orchestration.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl">
                       New Compliance Audit
                    </button>
                    <button className="px-6 py-3 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-500/20">
                       Emergency Lockdown
                    </button>
                  </div>
                </div>

                {/* Section A: Compliance Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <div className="lg:col-span-2 glass rounded-[40px] p-8 border-white/5 shadow-2xl">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                            <ShieldCheck size={16} /> Compliance Dashboard
                         </h3>
                         <span className="text-[10px] font-black text-emerald-500 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Audit Ready</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                         <div className="p-6 bg-white/5 border border-white/5 rounded-3xl text-center">
                            <div className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">GDPR Readiness</div>
                            <div className="relative w-20 h-20 mx-auto">
                               <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={226} strokeDashoffset={226 * 0.02} className="text-emerald-500" />
                               </svg>
                               <div className="absolute inset-0 flex items-center justify-center text-sm font-black italic">98%</div>
                            </div>
                         </div>
                         <div className="p-6 bg-white/5 border border-white/5 rounded-3xl text-center">
                            <div className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">ISO 27001</div>
                            <div className="relative w-20 h-20 mx-auto">
                               <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={226} strokeDashoffset={226 * 0.05} className="text-blue-500" />
                               </svg>
                               <div className="absolute inset-0 flex items-center justify-center text-sm font-black italic">95%</div>
                            </div>
                         </div>
                         <div className="p-6 bg-white/5 border border-white/5 rounded-3xl text-center">
                            <div className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">SOC2 TYPE II</div>
                            <div className="relative w-20 h-20 mx-auto">
                               <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={226} strokeDashoffset={0} className="text-emerald-500" />
                               </svg>
                               <div className="absolute inset-0 flex items-center justify-center text-sm font-black italic">100%</div>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Client Compliance Reports</h4>
                         {[
                           { client: 'Titan Logistics', status: 'Compliant', lastAudit: '2d ago', score: 99 },
                           { client: 'Swift Transports', status: 'Pending Review', lastAudit: '12d ago', score: 84 },
                           { client: 'Ocean Carriers', status: 'Compliant', lastAudit: '1mo ago', score: 96 },
                         ].map((report, i) => (
                           <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 font-black">
                                    {report.client[0]}
                                 </div>
                                 <div>
                                    <div className="text-sm font-bold text-gray-200">{report.client}</div>
                                    <div className="text-[10px] text-gray-500 font-bold uppercase">Last Audit: {report.lastAudit}</div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-8">
                                 <div className="text-right">
                                    <div className={`text-[10px] font-black uppercase ${report.status === 'Compliant' ? 'text-emerald-500' : 'text-yellow-500'}`}>{report.status}</div>
                                    <div className="text-xs font-mono font-bold text-gray-400">Score: {report.score}</div>
                                 </div>
                                 <button className="p-2 hover:bg-white/5 rounded-lg transition-colors"><ArrowUpRight size={14} className="text-gray-500" /></button>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Section B: Threat Detection Center */}
                   <div className="glass rounded-[40px] p-8 border-red-500/20 bg-red-950/5 relative overflow-hidden backdrop-blur-2xl">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
                            <ShieldAlert size={20} className="animate-pulse" /> Threat Detection
                         </h3>
                         <span className="text-[10px] font-black text-red-500 uppercase bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">3 High Priority</span>
                      </div>

                      <div className="space-y-6">
                         <div>
                            <div className="text-[10px] font-black text-gray-500 uppercase mb-4 tracking-widest">Active Threats (Global)</div>
                            <div className="space-y-3">
                               {[
                                 { type: 'Breach Attempt', origin: 'CN-Shenzhen', target: 'Auth-API', status: 'Blocked', time: '12m ago' },
                                 { type: 'Suspicious Activity', origin: 'RU-Moscow', target: 'Titan-ERP-Sync', status: 'Flagged', time: '1h ago' },
                                 { type: 'Insider Risk', origin: 'US-Chicago', target: 'Mass-Export-PDF', status: 'Review', time: '3h ago' },
                               ].map((threat, i) => (
                                 <div key={i} className="p-4 bg-black/40 rounded-2xl border border-white/5">
                                    <div className="flex justify-between items-start mb-2">
                                       <span className="text-[10px] font-black text-red-400 uppercase tracking-tighter italic">{threat.type}</span>
                                       <span className="text-[8px] text-gray-600 font-bold uppercase">{threat.time}</span>
                                    </div>
                                    <p className="text-xs font-bold text-gray-200 mb-2">{threat.origin} → {threat.target}</p>
                                    <div className={`text-[8px] font-black uppercase inline-block px-2 py-0.5 rounded-full border ${
                                       threat.status === 'Blocked' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                                       threat.status === 'Flagged' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                                       'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                    }`}>{threat.status}</div>
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="pt-6 border-t border-white/5">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Insider Risk Score</h4>
                            <div className="space-y-4">
                               <div className="flex justify-between items-center bg-black/20 p-4 rounded-2xl border border-white/5">
                                  <div className="flex items-center gap-3">
                                     <Fingerprint size={16} className="text-red-500" />
                                     <span className="text-xs font-bold text-gray-300">Anomalous Data Access</span>
                                  </div>
                                  <span className="text-xs font-black text-red-500">84/100</span>
                               </div>
                               <div className="flex justify-between items-center bg-black/20 p-4 rounded-2xl border border-white/5">
                                  <div className="flex items-center gap-3">
                                     <Eye size={16} className="text-yellow-500" />
                                     <span className="text-xs font-bold text-gray-300">Off-Hours Traffic</span>
                                  </div>
                                  <span className="text-xs font-black text-yellow-500">42/100</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Section C: Encryption Monitoring */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                   <div className="lg:col-span-3 glass rounded-[40px] p-8 border-white/5 shadow-2xl">
                      <div className="flex items-center justify-between mb-8">
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                            <Lock size={16} /> Encryption Monitoring
                         </h3>
                         <div className="flex gap-4">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> <span className="text-[10px] font-black uppercase text-gray-400">At Rest: AES-256</span></div>
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" /> <span className="text-[10px] font-black uppercase text-gray-400">In Transit: TLS 1.3</span></div>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Storage Security Matrix</h4>
                            <div className="space-y-6">
                               {[
                                 { storage: 'Primary Data Lake', encrypted: true, type: 'Customer Managed Key', status: 'Healthy' },
                                 { storage: 'Transaction Logs', encrypted: true, type: 'Platform Managed Key', status: 'Healthy' },
                                 { storage: 'AI Training Sets', encrypted: true, type: 'Hardware Security Module', status: 'Re-keying' },
                                 { storage: 'Cold Archive', encrypted: true, type: 'Multi-layer PGP', status: 'Healthy' },
                               ].map((s, i) => (
                                 <div key={i} className="flex items-center justify-between">
                                    <div>
                                       <div className="text-sm font-bold text-gray-200">{s.storage}</div>
                                       <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{s.type}</div>
                                    </div>
                                    <div className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase ${s.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                                       {s.status}
                                    </div>
                                 </div>
                               ))}
                            </div>
                         </div>

                         <div className="relative">
                            <div className="absolute inset-0 bg-blue-600/5 blur-[80px] pointer-events-none" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Global Transfer Monitoring</h4>
                            <div className="h-64 flex items-center justify-center">
                               <div className="relative w-48 h-48">
                                  <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping opacity-20" />
                                  <div className="absolute inset-4 rounded-full border border-blue-500/40 animate-pulse" />
                                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                     <Globe size={40} className="text-blue-500 mb-2" />
                                     <div className="text-2xl font-black font-display italic">100%</div>
                                     <div className="text-[8px] font-black uppercase text-gray-500 tracking-widest italic">Encrypted Traffic</div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="glass rounded-[40px] p-6 border-blue-500/10 bg-blue-950/5 flex flex-col justify-between">
                      <div>
                         <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6">Hardening Protocols</h3>
                         <div className="space-y-4">
                            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                               <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-400">
                                  <span>Network Isolation</span>
                                  <span className="text-emerald-500">Active</span>
                               </div>
                               <div className="h-1 w-full bg-white/5 rounded-full">
                                  <div className="h-full bg-emerald-500 w-full" />
                               </div>
                            </div>
                            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                               <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-400">
                                  <span>Zero-Trust Verification</span>
                                  <span className="text-emerald-500">Active</span>
                               </div>
                               <div className="h-1 w-full bg-white/5 rounded-full">
                                  <div className="h-full bg-emerald-500 w-full" />
                               </div>
                            </div>
                            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                               <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-400">
                                  <span>Key Rotation (Auto)</span>
                                  <span className="text-blue-400">Running</span>
                               </div>
                               <div className="h-1 w-full bg-white/5 rounded-full">
                                  <div className="h-full bg-blue-500 w-3/4" />
                               </div>
                            </div>
                         </div>
                      </div>
                      <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                         Rotate Global Master Key
                      </button>
                   </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'health' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">Platform Health</h1>
                    <p className="text-gray-400 font-light text-lg italic">Global infrastructure telemetry, regional uptime, and incident lifecycle management.</p>
                  </div>
                  <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                     View Status Page
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                   {['Global API', 'Data Lake', 'Auth Service', 'AI Inference'].map((service, i) => (
                     <div key={i} className="glass p-6 rounded-3xl border-white/5 shadow-xl relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                           <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">{service}</h3>
                           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                        </div>
                        <div className="text-3xl font-black mb-1">99.99%</div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">Uptime • 30 Days</p>
                     </div>
                   ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl lg:col-span-2">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8">Regional Latency Telemetry</h3>
                      <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { name: '12:00', us: 42, eu: 38, apac: 112 },
                              { name: '13:00', us: 45, eu: 35, apac: 124 },
                              { name: '14:00', us: 41, eu: 42, apac: 118 },
                              { name: '15:00', us: 38, eu: 44, apac: 105 },
                              { name: '16:00', us: 40, eu: 32, apac: 98 },
                            ]}>
                               <XAxis dataKey="name" hide />
                               <YAxis hide />
                               <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                               <Line type="monotone" dataKey="us" stroke="#3b82f6" strokeWidth={3} dot={false} />
                               <Line type="monotone" dataKey="eu" stroke="#10b981" strokeWidth={3} dot={false} />
                               <Line type="monotone" dataKey="apac" stroke="#f59e0b" strokeWidth={3} dot={false} />
                            </LineChart>
                         </ResponsiveContainer>
                      </div>
                      <div className="flex gap-6 mt-6 justify-center">
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400"><div className="w-2 h-2 rounded-full bg-blue-500" /> US-East</div>
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400"><div className="w-2 h-2 rounded-full bg-emerald-500" /> EU-Central</div>
                         <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400"><div className="w-2 h-2 rounded-full bg-amber-500" /> APAC-South</div>
                      </div>
                   </div>

                   <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Active Incidents</h3>
                      <div className="space-y-4">
                        <div className="p-5 bg-orange-500/10 border border-orange-500/20 rounded-3xl">
                           <div className="flex justify-between text-[10px] font-black text-orange-500 uppercase mb-2">
                              <span>Investigating</span>
                              <span>12m ago</span>
                           </div>
                           <h4 className="text-sm font-bold text-gray-100 mb-1">Latency Spike - APAC</h4>
                           <p className="text-[10px] text-gray-500 font-medium leading-relaxed italic">Engineers are investigating elevated latency across Tokyo nodes.</p>
                        </div>
                        <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                           Report Global Incident
                        </button>
                      </div>
                   </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'reports' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">Reports & Analytics</h1>
                    <p className="text-gray-400 font-light text-lg italic">Executive insights, operational telemetry, and board-level reporting.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                       <ArrowDownRight size={16} /> Export PDF
                    </button>
                    <button className="px-6 py-3 bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600/20 transition-all flex items-center gap-2">
                       <ArrowDownRight size={16} /> Export Excel
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {/* Operational & Executive Analytics */}
                   <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl lg:col-span-2 space-y-8">
                      <div className="flex justify-between items-center mb-6">
                         <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Operational Analytics & Ecosystem Growth</h3>
                         <div className="bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 text-[10px] text-blue-500 font-black uppercase">Live Telemetry</div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                         <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                            <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Global Shipments</div>
                            <div className="text-2xl font-black font-display tracking-tighter">1.8M</div>
                            <div className="text-[10px] text-emerald-500 mt-1 font-bold">+12% MoM</div>
                         </div>
                         <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                            <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Total Payload (TEU)</div>
                            <div className="text-2xl font-black font-display tracking-tighter">4.2M</div>
                            <div className="text-[10px] text-emerald-500 mt-1 font-bold">+8% MoM</div>
                         </div>
                         <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                            <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Cost Avoidance</div>
                            <div className="text-2xl font-black font-display tracking-tighter text-emerald-400">$84M</div>
                            <div className="text-[10px] text-gray-500 mt-1 font-bold">Via AI Routing</div>
                         </div>
                         <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                            <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Carbon Saved (t)</div>
                            <div className="text-2xl font-black font-display tracking-tighter text-emerald-400">224K</div>
                            <div className="text-[10px] text-gray-500 mt-1 font-bold">Via AI Routing</div>
                         </div>
                      </div>

                      <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                              { name: 'Jan', val: 4.2 }, { name: 'Feb', val: 5.8 },
                              { name: 'Mar', val: 6.4 }, { name: 'Apr', val: 8.4 },
                              { name: 'May', val: 9.1 }, { name: 'Jun', val: 12.4 },
                            ]}>
                               <defs>
                                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                </linearGradient>
                               </defs>
                               <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                               <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                               <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                               <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                               <Area type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorGrowth)" />
                            </AreaChart>
                         </ResponsiveContainer>
                      </div>
                   </div>

                   {/* Strategic Summaries */}
                   <div className="space-y-6">
                      <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl flex flex-col justify-between">
                         <h3 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-6 w-full flex items-center gap-2">
                            <TrendingUp size={16} /> Board-Level Summaries
                         </h3>
                         <div className="space-y-4">
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl group cursor-pointer hover:bg-white/[0.05] transition-all">
                               <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-bold text-gray-200">Q2 Strategic Review</span>
                                  <span className="text-[10px] font-mono text-gray-500">PDF • 2.4MB</span>
                               </div>
                               <p className="text-[10px] text-gray-400 line-clamp-2">Comprehensive overview of global expansion, market penetration modeling, and competitive moat analysis.</p>
                            </div>
                            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl group cursor-pointer hover:bg-white/[0.05] transition-all">
                               <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-bold text-gray-200">Expansion Modeling FY27</span>
                                  <span className="text-[10px] font-mono text-gray-500">XLSX • 1.1MB</span>
                               </div>
                               <p className="text-[10px] text-gray-400 line-clamp-2">Financial projections, CapEx requirements, and expected EBITDA margins for the upcoming fiscal cycle.</p>
                            </div>
                         </div>
                      </div>

                      <div className="glass p-8 rounded-[40px] border-amber-500/10 bg-amber-950/5 flex flex-col justify-between">
                         <h3 className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6 flex items-center gap-2">
                            <Briefcase size={16} /> Investor Reports
                         </h3>
                         <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                               <span>Annual Run Rate (ARR)</span>
                               <span className="text-amber-500">$45.2M</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                               <span>Customer Acquisition Cost</span>
                               <span className="text-amber-500">$12.4K</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                               <span>Lifetime Value (LTV)</span>
                               <span className="text-amber-500">$1.8M</span>
                            </div>
                         </div>
                         <button className="w-full py-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500/20 transition-all text-center">
                            Generate Pitch Deck Data
                         </button>
                      </div>
                   </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'support' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">Support & Escalations</h1>
                    <p className="text-gray-400 font-light text-lg italic">Enterprise-grade issue resolution and platinum-tier support orchestration.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                   <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl space-y-8">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Escalation Velocity</h3>
                        <div className="text-4xl font-black">2.4h</div>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase mt-1">Avg. Resolution Time</p>
                      </div>
                      <div className="space-y-4 pt-8 border-t border-white/5">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                           <span>Open Tickets</span>
                           <span className="text-white">124</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                           <span>SLA Breaches (24h)</span>
                           <span className="text-red-500">0</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500">
                           <span>Client Satisfaction</span>
                           <span className="text-emerald-500">4.9/5</span>
                        </div>
                      </div>
                   </div>

                   <div className="lg:col-span-3 glass p-8 rounded-[40px] border-white/5 shadow-2xl">
                      <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8">Critical Escalation Feed</h3>
                      <div className="space-y-4">
                        {[
                          { id: 'SC-842', client: 'Ocean Carriers', priority: 'Critical', issue: 'Failed Rerouting Engine on 400 shipments', status: 'In Progress', owner: 'Senior Engineering' },
                          { id: 'SC-839', client: 'Titan Logistics', priority: 'High', issue: 'API Key Revocation Request - Security Breach', status: 'Investigating', owner: 'Platform Security' },
                          { id: 'SC-832', client: 'Swift Transports', priority: 'Medium', issue: 'Onboarding Delay - ERP Sync Failure', status: 'Pending', owner: 'Customer Success' },
                        ].map((ticket, i) => (
                           <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between group hover:border-white/10 transition-all cursor-pointer">
                              <div className="flex items-center gap-6">
                                 <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${ticket.priority === 'Critical' ? 'bg-red-500/20 text-red-500' : ticket.priority === 'High' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                    {ticket.priority}
                                 </div>
                                 <div>
                                    <div className="flex items-center gap-2 mb-1">
                                       <span className="text-[10px] font-mono text-gray-600">{ticket.id}</span>
                                       <span className="text-sm font-bold text-gray-200">{ticket.client}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium italic">{ticket.issue}</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-[10px] font-black text-blue-400 uppercase tracking-tighter mb-1">{ticket.status}</div>
                                 <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Assigned: {ticket.owner}</div>
                              </div>
                           </div>
                        ))}
                      </div>
                   </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'settings' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20 max-w-6xl mx-auto">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">System Settings</h1>
                    <p className="text-gray-400 font-light text-lg italic">Platform branding, operational thresholds, and global disaster recovery controls.</p>
                  </div>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
                     Commit Global Config
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      {/* Platform Branding */}
                      <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl">
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2 text-emerald-500">
                            <Settings size={16} /> Platform Branding
                         </h3>
                         <div className="space-y-4">
                            <div>
                               <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 mb-1 block">Platform Name</label>
                               <input type="text" defaultValue="Titan Global OS" className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-bold text-white focus:border-blue-500 focus:outline-none transition-colors" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl italic text-white shadow-lg">T</div>
                                  <div>
                                     <div className="text-sm font-bold text-gray-200">Primary Monogram</div>
                                     <div className="text-[10px] font-mono text-gray-500">512x512 PNG</div>
                                  </div>
                               </div>
                               <button className="text-[10px] font-black uppercase text-blue-400 hover:text-blue-300">Update</button>
                            </div>
                            <div>
                               <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1 mb-1 block">Accent Hex Strategy</label>
                               <div className="flex gap-2">
                                  <div className="h-10 flex-1 bg-blue-600 rounded-xl border border-white/10 flex items-center justify-center text-[10px] font-mono font-black">#3B82F6</div>
                                  <div className="h-10 flex-1 bg-emerald-500 rounded-xl border border-white/10 flex items-center justify-center text-[10px] font-mono font-black text-black">#10B981</div>
                                  <div className="h-10 flex-1 bg-slate-900 rounded-xl border border-white/10 flex items-center justify-center text-[10px] font-mono font-black text-white">#0F172A</div>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Notif & SLAs */}
                      <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl">
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6 pb-6 border-b border-white/5 text-blue-400">
                            Notification & SLA Overrides
                         </h3>
                         <div className="space-y-6">
                            <div>
                               <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-bold text-white">Global Alert Threshold</span>
                                  <span className="text-[10px] font-black uppercase text-blue-400 border border-blue-500/20 px-2 py-1 rounded-md bg-blue-500/10">Critical Only</span>
                               </div>
                               <p className="text-[10px] text-gray-500 italic mb-4">Dictates minimum severity required to trigger SMS / PagerDuty to executive staff.</p>
                            </div>
                            <div className="space-y-3">
                               <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                  <span className="text-xs font-bold text-gray-300">SLA Response (Platinum)</span>
                                  <span className="text-xs font-mono text-emerald-400">15 mins</span>
                               </div>
                               <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                  <span className="text-xs font-bold text-gray-300">SLA Response (Standard)</span>
                                  <span className="text-xs font-mono text-gray-400">4 hours</span>
                               </div>
                               <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                  <span className="text-xs font-bold text-red-500">Auto-Escalation Breach</span>
                                  <span className="text-xs font-mono text-red-400">T + 60 mins</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-6">
                      {/* Automation Rules */}
                      <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl">
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6 text-purple-400">
                            Global Automation Engine
                         </h3>
                         <div className="space-y-4">
                            {[
                              { rule: 'Auto-Reroute on Weather', trigger: 'Category 3 Storm', action: 'Move to Rail/Air', active: true },
                              { rule: 'Port Strike Bypass', trigger: 'Labor Alert > 80%', action: 'Divert to Secondary', active: true },
                              { rule: 'Predictive Maintenance', trigger: 'Vessel Sensor Err', action: 'Schedule Inspection', active: false },
                            ].map((auto, i) => (
                              <div key={i} className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between opacity-100 hover:border-white/20 transition-all cursor-pointer">
                                 <div>
                                    <div className="text-sm font-bold text-gray-200">{auto.rule}</div>
                                    <div className="text-[10px] text-gray-500 font-mono mt-1">IF: {auto.trigger} → THEN: {auto.action}</div>
                                 </div>
                                 <button className={`w-10 h-5 rounded-full relative border ${auto.active ? 'bg-emerald-600 border-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-white/5 border-white/20'}`}>
                                    <div className={`absolute top-0.5 bottom-0.5 w-4 rounded-full transition-all ${auto.active ? 'right-0.5 bg-white' : 'left-0.5 bg-gray-500'}`} />
                                 </button>
                              </div>
                            ))}
                         </div>
                      </div>

                      {/* Backup & DR */}
                      <div className="glass p-8 rounded-[40px] border-red-500/10 bg-red-950/10 shadow-2xl space-y-8 relative overflow-hidden">
                         <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-red-500 to-transparent" />
                         <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-500 flex items-center gap-2">
                            <ShieldAlert size={16} /> Backup & Disaster Recovery
                         </h3>
                         
                         <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                               <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Cold Storage Sync</div>
                               <div className="text-xl font-black text-white">4h 12m ago</div>
                               <div className="text-[10px] text-emerald-500 font-bold mt-1">Verified Integrity</div>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                               <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Failover Region</div>
                               <div className="text-xl font-black text-white">EU-Central</div>
                               <div className="text-[10px] text-blue-400 font-bold mt-1">Latency: 12ms</div>
                            </div>
                         </div>

                         <div className="space-y-4 pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between">
                               <div>
                                  <h4 className="text-sm font-bold text-gray-200">Continuous Snapshot Replication</h4>
                                  <p className="text-[10px] text-gray-500 italic mt-1">Delta backups pushed to deep freeze every 5 minutes.</p>
                               </div>
                               <div className="text-xs font-black uppercase text-emerald-500 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 rounded-lg">Active</div>
                            </div>
                         </div>

                         <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-2xl">
                            <h4 className="text-xs font-black uppercase text-red-500 mb-2 flex items-center gap-2">
                               <AlertTriangle size={14} /> Total System Failover
                            </h4>
                            <p className="text-[10px] text-red-400/80 leading-relaxed italic mb-4">
                               Initiates immediate traffic diversion to the EU-Central shadow infrastructure. This will temporarily degrade API writing speed. Use only in apocalyptic DR scenarios.
                            </p>
                            <button className="w-full py-3 bg-red-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20">
                               Initialize Failover Protocol
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'profile' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-20 max-w-4xl">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">Super Admin Profile</h1>
                    <p className="text-gray-400 font-light text-lg italic">Secured administrative identity and access key management.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl lg:col-span-1 flex flex-col items-center text-center">
                      <div className="w-32 h-32 rounded-full border-4 border-blue-600 p-1 mb-6 relative group overflow-hidden">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SuperAdmin" alt="Admin" className="w-full h-full rounded-full bg-slate-800" />
                         <div className="absolute inset-0 bg-blue-600/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                            <LayoutGrid size={24} className="text-white" />
                         </div>
                      </div>
                      <h2 className="text-2xl font-black italic uppercase tracking-tighter">Alexander Sterling</h2>
                      <p className="text-blue-400 text-xs font-black uppercase tracking-widest mt-1">Platform Systems Director</p>
                      <div className="mt-8 pt-8 border-t border-white/5 w-full space-y-4">
                         <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 tracking-widest text-left">
                            <span>Admin Tier</span>
                            <span className="text-emerald-500">Root / Master</span>
                         </div>
                         <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500 tracking-widest text-left">
                            <span>Key Type</span>
                            <span className="text-blue-400">Yubico Physical</span>
                         </div>
                      </div>
                   </div>

                   <div className="lg:col-span-2 space-y-6">
                      <div className="glass p-8 rounded-[40px] border-white/5 shadow-2xl">
                         <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8 italic">Security Settings</h3>
                         <div className="space-y-6">
                            <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between">
                               <div>
                                  <h4 className="text-sm font-bold text-gray-200">Hardware Security Key</h4>
                                  <p className="text-[10px] text-gray-500">Physical MFA is required for all root actions.</p>
                               </div>
                               <button className="px-4 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-black uppercase rounded-xl">Verified</button>
                            </div>
                            <div className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between">
                               <div>
                                  <h4 className="text-sm font-bold text-gray-200">IP Whitelisting</h4>
                                  <p className="text-[10px] text-gray-500">Restrict admin login to registered corporate VPN IPs.</p>
                               </div>
                               <button className="px-4 py-2 bg-blue-600/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase rounded-xl">Manage</button>
                            </div>
                            <button className="w-full py-4 bg-red-600/10 border border-red-500/30 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest">
                               Initiate Emergency Account Purge
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
           )}

           {/* Placeholder for other tabs */}
           {activeTab !== 'command' && activeTab !== 'companies' && activeTab !== 'users' && activeTab !== 'integrations' && activeTab !== 'ai' && activeTab !== 'billing' && activeTab !== 'security' && activeTab !== 'health' && activeTab !== 'reports' && activeTab !== 'support' && activeTab !== 'settings' && activeTab !== 'profile' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex items-center justify-center flex-col text-center p-20 border-2 border-dashed border-white/5 rounded-[60px] bg-white/[0.02] m-8">
                 <div className="w-32 h-32 bg-blue-600/10 rounded-[40px] flex items-center justify-center mb-8 border border-blue-500/20 shadow-2xl shadow-blue-600/20">
                   {(() => {
                     const ActiveIcon = tabs.find(t => t.id === activeTab)?.icon;
                     return ActiveIcon ? <ActiveIcon size={56} className="text-blue-500" strokeWidth={1.5} /> : null;
                   })()}
                 </div>
                 <h2 className="text-4xl font-display font-black mb-6 tracking-tighter uppercase italic">{tabs.find(t => t.id === activeTab)?.label} Control</h2>
                 <p className="text-gray-400 max-w-xl text-lg font-light leading-relaxed mb-10">
                   The {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} module is ready for full-scale platform management. 
                   Monitor, regulate, and optimize global {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} across all enterprise clients.
                 </p>
                 <div className="flex gap-4">
                   <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/30 hover:scale-105 transition-all">
                     Initialize High-Priority Controller
                   </button>
                   <button className="px-8 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-2xl font-bold text-xs hover:bg-white/10 transition-all">
                     View System Documentation
                   </button>
                 </div>
             </motion.div>
           )}
        </div>
      </main>
    </div>
  );
}
