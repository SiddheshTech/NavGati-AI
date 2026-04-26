import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Eye, Map, BarChart, FileText, LifeBuoy, Search, 
  Bell, Globe, Package, Clock, CheckCircle2, AlertTriangle,
  Download, MessageSquare
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';

const performanceData = [
  { month: 'Jan', onTime: 92 },
  { month: 'Feb', onTime: 95 },
  { month: 'Mar', onTime: 91 },
  { month: 'Apr', onTime: 96 },
  { month: 'May', onTime: 97 },
  { month: 'Jun', onTime: 98 },
];

export default function ViewerDashboard() {
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

  const [activeTab, setActiveTab] = useState('visibility');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const loadData = async () => {
      try {
        const data = await api.getDashboard('viewer');
        setDashboardData(data.data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };
    loadData();
  }, []);

  const tabs = [
    { id: 'visibility', label: 'Shipment Visibility', icon: Map },
    { id: 'performance', label: 'Performance', icon: BarChart },
    { id: 'reports', label: 'Reports Access', icon: FileText },
    { id: 'support', label: 'Support Center', icon: LifeBuoy },
  ];

  const shipments = [
    { id: 'SHP-8842', origin: 'Shanghai', dest: 'Los Angeles', eta: 'Tomorrow, 14:00', status: 'In Transit', progress: 85 },
    { id: 'SHP-8843', origin: 'Hamburg', dest: 'New York', eta: 'Delayed (2h)', status: 'Delayed', progress: 40 },
    { id: 'SHP-8844', origin: 'Singapore', dest: 'Rotterdam', eta: 'May 12, 09:00', status: 'On Track', progress: 15 },
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
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 flex items-center gap-2">
            <Eye size={12} /> Client Portal
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
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <Package size={18} className="text-gray-300" />
            </div>
            <div>
              <p className="text-sm font-bold truncate max-w-[150px]">{user?.name || 'Loading...'}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{user?.role?.replace('_', ' ') || 'Partner Vendor'}</p>
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
                placeholder="Track by Tracking ID, PO number..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                readOnly
              />
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }} className="text-[10px] uppercase font-bold tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
                   Download Report PDF
                 </button>
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

           {activeTab === 'visibility' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-5xl">
                <div>
                  <h1 className="text-3xl font-display font-black tracking-tight mb-2">Live Shipments</h1>
                  <p className="text-gray-400 font-light text-sm">Real-time status updates and ETAs for your active freight.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="glass p-5 rounded-2xl border-white/5">
                    <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Total Shipments</h3>
                    <p className="text-3xl font-black font-display">{dashboardData?.totalShipments || 0}</p>
                  </div>
                  <div className="glass p-5 rounded-2xl border-white/5">
                    <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Delivered</h3>
                    <p className="text-3xl font-black font-display text-emerald-400">{dashboardData?.delivered || 0}</p>
                  </div>
                  <div className="glass p-5 rounded-2xl border-white/5 bg-blue-900/10 border-blue-500/10">
                    <h3 className="text-[10px] uppercase font-bold text-blue-500/70 tracking-widest mb-1">In Transit</h3>
                    <p className="text-3xl font-black font-display text-blue-400">{dashboardData?.inTransit || 0}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {shipments.map((shipment) => (
                    <div key={shipment.id} className="glass p-6 rounded-3xl border-white/10 hover:border-white/20 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                        <div>
                          <div className="text-xs font-bold text-blue-400 mb-1">{shipment.id}</div>
                          <div className="flex items-center gap-3 text-lg font-bold">
                            <span>{shipment.origin}</span>
                            <span className="text-gray-600">→</span>
                            <span>{shipment.dest}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                            <Clock size={16} className="text-gray-400" />
                            <span className="text-sm font-bold text-gray-300">ETA: {shipment.eta}</span>
                          </div>
                          
                          <div className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${
                            shipment.status === 'Delayed' 
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                              : shipment.status === 'On Track'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          }`}>
                            {shipment.status === 'Delayed' && <AlertTriangle size={16} />}
                            {shipment.status === 'On Track' && <CheckCircle2 size={16} />}
                            {shipment.status === 'In Transit' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                            {shipment.status}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className={`absolute top-0 left-0 h-full ${shipment.status === 'Delayed' ? 'bg-red-500' : 'bg-blue-500'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${shipment.progress}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-[10px] uppercase font-bold tracking-widest text-gray-500">
                        <span>Dispatched</span>
                        <span>In Transit</span>
                        <span>Delivered</span>
                      </div>
                    </div>
                  ))}
                </div>
             </motion.div>
           )}

           {activeTab === 'performance' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-5xl">
                <div>
                  <h1 className="text-3xl font-display font-black tracking-tight mb-2">Performance Dashboard</h1>
                  <p className="text-gray-400 font-light text-sm">Review SLA compliance and service metrics.</p>
                </div>

                <div className="glass p-8 rounded-3xl border-white/5">
                   <h3 className="text-xs uppercase font-bold text-gray-500 tracking-widest mb-6">On-Time Delivery Rate (%)</h3>
                   <div className="h-80">
                     <ResponsiveContainer width="100%" height="100%">
                         <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                           <defs>
                             <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                             </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                           <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                           <YAxis stroke="rgba(255,255,255,0.2)" domain={[80, 100]} fontSize={12} tickLine={false} axisLine={false} />
                           <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                           <Area type="monotone" dataKey="onTime" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPerf)" />
                         </AreaChart>
                     </ResponsiveContainer>
                   </div>
                </div>
             </motion.div>
           )}

           {activeTab === 'support' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-2xl">
                <div>
                  <h1 className="text-3xl font-display font-black tracking-tight mb-2">Support Center</h1>
                  <p className="text-gray-400 font-light text-sm">Need help? Raise a ticket or contact your Account Manager.</p>
                </div>
                
                <div className="glass p-8 rounded-3xl border-white/10 space-y-6 shadow-2xl">
                   <div>
                     <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Subject</label>
                     <input type="text" placeholder="e.g. Discrepancy in Shipment SHP-8843" className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500" />
                   </div>
                   
                   <div>
                     <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Message / Description</label>
                     <textarea placeholder="Describe the issue you are facing..." rows={4} className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 resize-none"></textarea>
                   </div>

                   <div className="flex items-center gap-4 pt-2">
                     <button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }} className="flex-1 py-4 bg-blue-600 rounded-xl font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-colors flex items-center justify-center gap-2">
                       <MessageSquare size={18} /> Submit Ticket
                     </button>
                     <button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }} className="px-6 py-4 border border-white/10 rounded-xl font-bold uppercase tracking-wider hover:bg-white/5 transition-colors text-xs text-gray-400">
                       Contact AM
                     </button>
                   </div>
                </div>
             </motion.div>
           )}

           {/* Placeholder for reports tab */}
           {activeTab === 'reports' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex items-center justify-center flex-col text-center">
                 <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
                   <FileText size={40} className="text-blue-500" />
                 </div>
                 <h2 className="text-3xl font-display font-black mb-4">Reports Archive</h2>
                 <p className="text-gray-400 max-w-md">
                   Download your monthly billing statements, SLA delivery reports, and shipment histories.
                   <br/><br/>
                   <button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }} className="btn-primary text-sm px-6 py-2 flex items-center justify-center gap-2 mx-auto">
                     <Download size={16} /> Export All (PDF)
                   </button>
                 </p>
             </motion.div>
           )}
        </div>
      </main>
    </div>
  );
}
