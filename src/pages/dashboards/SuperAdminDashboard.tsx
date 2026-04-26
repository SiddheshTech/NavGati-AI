import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Users, ShieldCheck, Activity, CreditCard, 
  BrainCircuit, Key, LayoutGrid, Search, Bell, 
  ArrowUpRight, ArrowDownRight, Globe, AlertTriangle, 
  Server, Database, ShieldAlert, Settings, UserCircle, BarChart3,
  TrendingUp, TrendingDown, Ship, Truck, Box
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
                    <h1 className="text-4xl font-display font-black tracking-tight mb-2 uppercase italic">Integrations & APIs</h1>
                    <p className="text-gray-400 font-light text-lg italic">Platform connectivity, data pipeline health, and third-party orchestration.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl flex items-center gap-2">
                       <Plug size={16} /> New API Key
                    </button>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                       Force Pipeline Refresh
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Pipeline Health */}
                  <div className="glass rounded-[40px] p-8 border-white/5 shadow-2xl lg:col-span-2">
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Live Data Pipelines</h3>
                       <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-black text-emerald-500 uppercase">Operational</span>
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                       <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                          <div className="text-[8px] font-black uppercase text-gray-500 mb-1">Ingestion Rate</div>
                          <div className="text-xl font-black">4,284 <span className="text-[10px] font-normal text-gray-600">eps</span></div>
                       </div>
                       <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                          <div className="text-[8px] font-black uppercase text-gray-500 mb-1">Avg Latency</div>
                          <div className="text-xl font-black text-blue-400">182 <span className="text-[10px] font-normal text-gray-600">ms</span></div>
                       </div>
                       <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                          <div className="text-[8px] font-black uppercase text-gray-500 mb-1">Failed Records</div>
                          <div className="text-xl font-black text-red-500">12 <span className="text-[10px] font-normal text-gray-600">last hr</span></div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Connected Enterprise Systems</h4>
                       {[
                         { name: 'SAP S/4HANA (Titan)', status: 'Syncing', latency: '42ms', errors: 0, health: 100 },
                         { name: 'Oracle TMS (Ocean)', status: 'Syncing', latency: '124ms', errors: 2, health: 98 },
                         { name: 'WMS Global Hub (Global)', status: 'Warning', latency: '840ms', errors: 42, health: 64 },
                         { name: 'GPS Master Feed', status: 'Syncing', latency: '12ms', errors: 0, health: 100 },
                       ].map((sys, i) => (
                         <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all">
                            <div className="flex items-center gap-4">
                               <div className={`w-2 h-2 rounded-full ${sys.health > 90 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                               <div>
                                  <div className="text-sm font-bold text-gray-200">{sys.name}</div>
                                  <div className="text-[10px] font-black uppercase text-gray-600 tracking-tighter">{sys.status} • {sys.latency} Latency</div>
                               </div>
                            </div>
                            <div className="flex items-center gap-6">
                               {sys.errors > 0 && <div className="text-xs font-black text-red-500/80">{sys.errors} Errors</div>}
                               <button className="text-[10px] font-black uppercase text-blue-400 hover:underline">Retry</button>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* API Management */}
                  <div className="glass rounded-[40px] p-8 border-white/5 shadow-2xl space-y-8">
                     <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Active API Scopes</h3>
                        <div className="space-y-4">
                           {['Shipment Write', 'Analytic Read', 'User Admin', 'Webhook Control'].map(scope => (
                             <div key={scope} className="flex items-center justify-between px-4 py-3 bg-black/40 rounded-xl border border-white/5">
                                <span className="text-xs font-bold text-gray-300">{scope}</span>
                                <div className="w-8 h-4 bg-blue-600/20 rounded-full relative">
                                   <div className="absolute right-1 top-1 bottom-1 w-2 bg-blue-500 rounded-full" />
                                </div>
                             </div>
                           ))}
                        </div>
                     </div>

                     <div className="pt-6 border-t border-white/5">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-4">API Usage Logs</h3>
                        <div className="space-y-2">
                           {[
                             { endpoint: '/v1/shipments', code: 200, time: '2s ago' },
                             { endpoint: '/v1/auth/token', code: 200, time: '14s ago' },
                             { endpoint: '/v1/clients/list', code: 403, time: '1m ago' },
                             { endpoint: '/v1/data/ingest', code: 500, time: '2m ago' },
                           ].map((log, i) => (
                             <div key={i} className="flex items-center justify-between text-[10px] font-mono">
                                <div className="flex items-center gap-2">
                                   <span className={log.code === 200 ? 'text-emerald-500' : 'text-red-500'}>[{log.code}]</span>
                                   <span className="text-gray-400">{log.endpoint}</span>
                                </div>
                                <span className="text-gray-600">{log.time}</span>
                             </div>
                           ))}
                        </div>
                     </div>

                     <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        <ArrowUpRight size={14} /> Full Traffic Monitor
                     </button>
                  </div>
                </div>
             </motion.div>
           )}

           {/* Placeholder for other tabs */}
           {activeTab !== 'command' && activeTab !== 'companies' && activeTab !== 'users' && (
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
