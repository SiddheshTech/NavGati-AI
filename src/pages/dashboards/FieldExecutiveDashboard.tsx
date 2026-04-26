import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardList, Truck, MessageSquare, AlertTriangle, 
  MapPin, CheckCircle, Camera, Clock, ChevronRight,
  PhoneCall, UploadCloud, AlertOctagon, UserCircle
} from 'lucide-react';

export default function FieldExecutiveDashboard() {
  const [activeTab, setActiveTab] = useState('tasks');

  const tabs = [
    { id: 'tasks', label: 'Daily Tasks', icon: ClipboardList },
    { id: 'update', label: 'Update Status', icon: Truck },
    { id: 'communication', label: 'Comms', icon: MessageSquare },
    { id: 'incident', label: 'Report Incident', icon: AlertTriangle },
  ];

  const tasks = [
    { id: 'TSK-001', type: 'Pickup', location: 'Port of Los Angeles, Dock 42', time: '08:00 AM', status: 'completed' },
    { id: 'TSK-002', type: 'Delivery', location: 'Warehouse B, Riverside', time: '11:30 AM', status: 'in-progress' },
    { id: 'TSK-003', type: 'Cross-dock', location: 'Facility C, San Bernardino', time: '02:00 PM', status: 'pending' },
    { id: 'TSK-004', type: 'Maintenance', location: 'Yard 12', time: '05:00 PM', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row overflow-hidden selection:bg-blue-500/30">
      
      {/* Desktop Sidebar (Hidden on mobile) */}
      <aside className="hidden md:flex w-72 bg-white/5 border-r border-white/10 flex-col hide-scrollbar relative z-20">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 font-black text-xl tracking-tighter text-blue-400 mb-2">
            <Truck size={24} />
            FIELD NAVGATI
          </div>
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
            Supervisor terminal
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all font-bold text-sm ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative h-screen overflow-hidden">
        {/* Mobile Top Header */}
        <header className="h-20 border-b border-white/10 glass px-6 flex items-center justify-between shrink-0 z-10 sticky top-0">
           <div className="flex items-center gap-3 md:hidden font-black text-lg tracking-tighter text-white">
              <Truck size={20} className="text-blue-500" />
              FIELD OPS
           </div>
           <div className="hidden md:flex items-center gap-4 text-gray-400 text-xl font-bold tracking-tighter text-white uppercase italic">
              {tabs.find(t => t.id === activeTab)?.label}
           </div>
           
           <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 animate-pulse relative">
                <AlertOctagon size={18} />
              </button>
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/50 flex items-center justify-center">
                <UserCircle size={20} className="text-blue-400" />
              </div>
           </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-28 md:pb-8 relative">
           {/* Abstract BG */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none -z-10" />

           {activeTab === 'tasks' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl mx-auto">
                
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-display font-black tracking-tight uppercase italic">Active Shift</h2>
                   <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-500/30">
                     Clocked In
                   </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                   <div className="glass p-4 rounded-2xl border-white/5">
                      <div className="text-3xl font-black mb-1">12</div>
                      <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Pending Drops</div>
                   </div>
                   <div className="glass p-4 rounded-2xl border-white/5">
                      <div className="text-3xl font-black mb-1 text-emerald-400">8</div>
                      <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Completed</div>
                   </div>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-bold text-gray-500 tracking-widest mb-4">Today's Itinerary</h3>
                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`p-4 rounded-2xl border flex flex-col gap-3 transition-colors active:scale-[0.98] cursor-pointer ${
                        task.status === 'completed' ? 'bg-white/5 border-white/10 opacity-70' :
                        task.status === 'in-progress' ? 'bg-blue-600/20 border-blue-500/50' : 
                        'bg-black/50 border-white/10 hover:border-white/20'
                      }`}
                    >
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             {task.status === 'completed' && <CheckCircle size={16} className="text-emerald-500" />}
                             {task.status === 'in-progress' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                             {task.status === 'pending' && <Clock size={16} className="text-gray-500" />}
                             <span className="font-bold text-sm">{task.type}</span>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest bg-[#020617] px-2 py-1 rounded-md border border-white/5">
                            {task.time}
                          </span>
                       </div>
                       
                       <div className="flex items-center gap-2 text-gray-300 text-sm">
                         <MapPin size={14} className="text-gray-500 shrink-0" />
                         <span className="truncate">{task.location}</span>
                       </div>
                    </div>
                  ))}
                </div>

             </motion.div>
           )}

           {activeTab === 'update' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-2xl mx-auto">
                <h2 className="text-2xl font-display font-black tracking-tight uppercase italic mb-6">Action Panel</h2>
                
                <div className="glass p-6 rounded-3xl border-white/10 space-y-6 shadow-2xl">
                   <div>
                     <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Action Required</label>
                     <select className="w-full bg-[#020617] border border-white/10 rounded-xl py-4 px-4 text-white font-bold outline-none appearance-none">
                       <option>Arrival at Facility</option>
                       <option>Loading Complete</option>
                       <option>Departure</option>
                       <option>Proof of Delivery (POD)</option>
                     </select>
                   </div>

                   <div>
                     <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-2 block">Upload Verification Context</label>
                     <button className="w-full py-12 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all">
                       <Camera size={32} className="mb-4" />
                       <span className="font-bold text-sm">Tap to Snap Photo or Upload POD</span>
                     </button>
                   </div>

                   <button className="w-full py-4 bg-blue-600 rounded-xl font-black text-lg uppercase tracking-wider shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-[0.98] transition-transform">
                     Confirm Action
                   </button>
                </div>
             </motion.div>
           )}

           {/* Placeholder for others */}
           {['communication', 'incident'].includes(activeTab) && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex items-center justify-center flex-col text-center mt-20">
                 <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
                   {(() => {
                     const ActiveIcon = tabs.find(t => t.id === activeTab)?.icon;
                     return ActiveIcon ? <ActiveIcon size={32} className="text-blue-500" /> : null;
                   })()}
                 </div>
                 <h2 className="text-2xl font-display font-black mb-2">{tabs.find(t => t.id === activeTab)?.label}</h2>
                 <p className="text-gray-400 text-sm max-w-xs">
                   Use this section when active on the field to handle {tabs.find(t => t.id === activeTab)?.label.toLowerCase()}.
                 </p>
             </motion.div>
           )}
        </div>

        {/* Mobile Bottom Navigation Toolbar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 pb-safe z-50">
           <div className="flex justify-around items-center h-20 px-2 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                    activeTab === tab.id ? 'text-blue-400' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${activeTab === tab.id ? 'bg-blue-600/20' : 'transparent'}`}>
                    <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
           </div>
        </nav>
      </main>
    </div>
  );
}
