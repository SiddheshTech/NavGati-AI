import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Info, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

interface Shipment {
  id: string;
  origin: [number, number]; // [lon, lat]
  destination: [number, number];
  progress: number;
  status: 'on-track' | 'delayed' | 'rerouted';
  type: 'truck' | 'ship' | 'plane';
}

const INITIAL_SHIPMENTS: Shipment[] = [
  { id: 'S1', origin: [-74.006, 40.7128], destination: [2.3522, 48.8566], progress: 0.6, status: 'on-track', type: 'plane' },
  { id: 'S2', origin: [139.6503, 35.6762], destination: [-122.4194, 37.7749], progress: 0.35, status: 'delayed', type: 'ship' },
  { id: 'S3', origin: [103.8198, 1.3521], destination: [114.1694, 22.3193], progress: 0.8, status: 'on-track', type: 'ship' },
  { id: 'S4', origin: [77.5946, 12.9716], destination: [55.2708, 25.2048], progress: 0.2, status: 'rerouted', type: 'truck' },
  { id: 'S5', origin: [-0.1276, 51.5074], destination: [12.4964, 41.9028], progress: 0.9, status: 'on-track', type: 'truck' },
];

export default function LiveMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Use a basic projection
    const projection = d3.geoMercator()
      .scale(width / 6.5)
      .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    // Draw stylized background globe grid
    const graticule = d3.geoGraticule();
    svg.select('.grid')
      .datum(graticule())
      .attr('d', path as any)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(59, 130, 246, 0.05)')
      .attr('stroke-width', 0.5);

    // Update shipments progress periodically to simulate real-time
    const interval = setInterval(() => {
      setShipments(prev => prev.map(s => ({
        ...s,
        progress: s.progress >= 1 ? 0 : s.progress + 0.001
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const width = 800;
  const height = 500;
  const projection = d3.geoMercator()
      .scale(width / 6.5)
      .translate([width / 2, height / 1.5]);

  return (
    <div className="relative w-full h-full bg-[#020617] rounded-3xl overflow-hidden border border-white/5">
      <div className="absolute top-6 left-6 z-20 flex gap-4">
        <div className="glass-pill px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Live tracking active</span>
        </div>
        <div className="glass-pill px-4 py-2 flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Shipments:</span>
          <span className="text-xs font-bold text-white">{shipments.length}</span>
        </div>
      </div>

      <svg 
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <path className="grid" />
        
        {/* Simplified World Outlines - Just some circles for major regions for stylized look */}
        <circle cx={width * 0.25} cy={height * 0.4} r={width * 0.1} fill="rgba(37, 99, 235, 0.03)" />
        <circle cx={width * 0.5} cy={height * 0.35} r={width * 0.12} fill="rgba(37, 99, 235, 0.03)" />
        <circle cx={width * 0.75} cy={height * 0.6} r={width * 0.15} fill="rgba(37, 99, 235, 0.03)" />

        {/* Routes */}
        {shipments.map(s => {
          const start = projection(s.origin) || [0, 0];
          const end = projection(s.destination) || [0, 0];
          
          // Bezier curve for routes
          const midX = (start[0] + end[0]) / 2;
          const midY = Math.min(start[1], end[1]) - 50;
          const routePath = `M ${start[0]},${start[1]} Q ${midX},${midY} ${end[0]},${end[1]}`;

          // Current position on path
          const t = s.progress;
          const curX = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * midX + t * t * end[0];
          const curY = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * midY + t * t * end[1];

          return (
            <g key={s.id} onClick={() => setSelectedShipment(s)} className="cursor-pointer group">
              {/* Main Path */}
              <path 
                d={routePath} 
                fill="none" 
                stroke={s.status === 'delayed' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'} 
                strokeWidth="1" 
                strokeDasharray="4 4"
              />
              
              {/* Progress Path */}
              <path 
                d={routePath} 
                fill="none" 
                stroke={s.status === 'delayed' ? '#ef4444' : s.status === 'rerouted' ? '#f59e0b' : '#3b82f6'} 
                strokeWidth="2" 
                strokeDasharray="1000"
                strokeDashoffset={1000 * (1 - s.progress)}
                className="opacity-60"
              />

              {/* Moving Point */}
              <circle 
                cx={curX} 
                cy={curY} 
                r={selectedShipment?.id === s.id ? 6 : 4} 
                fill={s.status === 'delayed' ? '#ef4444' : s.status === 'rerouted' ? '#f59e0b' : '#3b82f6'} 
                className="transition-all duration-300"
              >
                {selectedShipment?.id === s.id && (
                  <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                )}
              </circle>
              
              {/* Interaction Circle */}
              <circle 
                cx={curX} 
                cy={curY} 
                r="15" 
                fill="transparent" 
                className="hover:fill-white/5 transition-colors"
                onMouseEnter={() => setSelectedShipment(s)}
              />
            </g>
          );
        })}
      </svg>

      {/* Shipment Info Panel */}
      <AnimatePresence>
        {selectedShipment && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-6 right-6 w-72 glass p-6 rounded-3xl border border-white/10 z-30"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-white">Shipment {selectedShipment.id}</h4>
              <button onClick={() => setSelectedShipment(null)} className="text-gray-400 hover:text-white">
                <Info size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${selectedShipment.status === 'delayed' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                   {selectedShipment.status === 'on-track' ? <CheckCircle size={18} /> : 
                    selectedShipment.status === 'delayed' ? <ShieldAlert size={18} /> : <AlertTriangle size={18} />}
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Current Status</p>
                  <p className={`font-bold capitalize ${selectedShipment.status === 'delayed' ? 'text-red-400' : 'text-blue-400'}`}>
                    {selectedShipment.status.replace('-', ' ')}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-bold">{Math.round(selectedShipment.progress * 100)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedShipment.progress * 100}%` }}
                    className={`h-full ${selectedShipment.status === 'delayed' ? 'bg-red-500' : 'bg-blue-500'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Type</p>
                  <p className="font-bold text-white capitalize">{selectedShipment.type}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">ETA</p>
                  <p className="font-bold text-white">4h 12m</p>
                </div>
              </div>

              <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-colors border border-white/10 uppercase tracking-widest">
                Open Detailed Logs
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 flex gap-6 px-4 py-2 glass-pill bg-black/40 border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">On-Track</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Delayed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Rerouted</span>
        </div>
      </div>
    </div>
  );
}
