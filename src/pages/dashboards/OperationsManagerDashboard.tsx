import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building, Users, Plug, Settings, BarChart3, CreditCard, 
  Search, Bell, ArrowUpRight, ArrowDownRight, Globe, AlertTriangle, 
  Activity, Navigation, Truck, Box, ShieldAlert, Route, Crosshair
} from 'lucide-react';
import LiveMap from '../../components/LiveMap';
import { api } from '../../lib/api';
import { useToast } from '../../context/ToastContext';

export default function OperationsManagerDashboard() {
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

  const [activeTab, setActiveTab] = useState('live_control');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const loadData = async () => {
      try {
        const data = await api.getDashboard('operations-manager');
        setDashboardData(data.data);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };
    loadData();
  }, []);

  const tabs = [
    { id: 'live_control', label: 'Live Control Tower', icon: Navigation },
    { id: 'disruption', label: 'Disruption Alerts', icon: ShieldAlert },
    { id: 'route_optimization', label: 'Route Optimization', icon: Route },
    { id: 'warehouse', label: 'Warehouse Coordination', icon: Box },
    { id: 'fleet', label: 'Fleet Management', icon: Truck },
    { id: 'emergency', label: 'Emergency Console', icon: Crosshair },
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
            Operations Manager
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
              <Activity size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold truncate max-w-[150px]">{user?.name || 'Loading...'}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Ops Manager</p>
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
                placeholder="Search shipments, vehicles, or alerts..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
           </div>
           
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-500">
                  {dashboardData?.disruptionAlerts || 0} Active Interventions
                </span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }} className="relative p-2 text-gray-400 hover:text-white transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
           </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="flex-1 overflow-y-auto p-4 relative">
           {/* Abstract BG */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none -z-10" />

           {activeTab === 'live_control' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col gap-4">
               
               <div className="flex justify-between items-end px-4">
                 <div>
                   <h1 className="text-3xl font-display font-black tracking-tight mb-2">Live Control Tower</h1>
                   <p className="text-gray-400 font-light text-sm">Real-time status of all active shipments globally.</p>
                 </div>
                 <div className="flex gap-4">
                   <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-blue-500"></span> {dashboardData?.activeShipments || 0} On Track
                   </div>
                   <div className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> {dashboardData?.pendingRouteApprovals || 0} At Risk
                   </div>
                 </div>
               </div>

               {/* Live Map Area */}
               <div className="flex-1 glass rounded-3xl overflow-hidden border-white/10 relative">
                  <div className="absolute inset-0 z-0">
                    <LiveMap />
                  </div>
               </div>
             </motion.div>
           )}

           {/* Placeholder for other tabs */}
           {activeTab !== 'live_control' && (
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex items-center justify-center flex-col text-center">
                 <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
                   {(() => {
                     const ActiveIcon = tabs.find(t => t.id === activeTab)?.icon;
                     return ActiveIcon ? <ActiveIcon size={40} className="text-blue-500" /> : null;
                   })()}
                 </div>
                 <h2 className="text-3xl font-display font-black mb-4">{tabs.find(t => t.id === activeTab)?.label} Module</h2>
                 <p className="text-gray-400 max-w-md">
                   This module provides specialized tools for {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} operations.
                   <br/><br/>
                   <button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }} className="btn-primary text-sm px-6 py-2">Initialize Module UI</button>
                 </p>
             </motion.div>
           )}
        </div>
      </main>
    </div>
  );
}
