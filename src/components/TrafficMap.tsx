import React, { useState } from 'react';
import { RoadCorridor, IncidentReport, City, TrafficStatus } from '../types/traffic';
import { 
  AlertTriangle, 
  Clock, 
  Gauge, 
  MapPin, 
  ShieldAlert, 
  ArrowRight, 
  Eye, 
  CheckCircle2, 
  Flame, 
  Waves, 
  Truck, 
  AlertOctagon,
  ChevronRight,
  RefreshCw,
  Compass
} from 'lucide-react';

interface TrafficMapProps {
  city: City;
  corridors: RoadCorridor[];
  incidents: IncidentReport[];
  onSelectIncident: (incident: IncidentReport) => void;
  onSelectRouteBypass: (corridorName: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const TrafficMap: React.FC<TrafficMapProps> = ({
  city,
  corridors,
  incidents,
  onSelectIncident,
  onSelectRouteBypass,
  onRefresh,
  isRefreshing
}) => {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string | null>(
    corridors.length > 0 ? corridors[0].id : null
  );
  const [showIncidentPins, setShowIncidentPins] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const cityCorridors = corridors.filter(c => c.city === city);
  const cityIncidents = incidents.filter(i => i.city === city);

  const activeCorridor = cityCorridors.find(c => c.id === selectedCorridorId) || cityCorridors[0];

  const getStatusColor = (status: TrafficStatus) => {
    switch (status) {
      case 'standstill':
        return '#ef4444'; // Red
      case 'heavy':
        return '#f97316'; // Orange
      case 'slow':
        return '#eab308'; // Amber/Yellow
      case 'free':
        return '#10b981'; // Emerald
      default:
        return '#64748b';
    }
  };

  const getStatusBadge = (status: TrafficStatus) => {
    switch (status) {
      case 'standstill':
        return { text: 'Standstill / Lock-up', bg: 'text-rose-400 bg-rose-500/10 border-rose-500/30' };
      case 'heavy':
        return { text: 'Heavy Go-Slow', bg: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
      case 'slow':
        return { text: 'Slow Crawl', bg: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30' };
      case 'free':
        return { text: 'Free Flow', bg: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    }
  };

  const getIncidentIcon = (type: IncidentReport['type']) => {
    switch (type) {
      case 'accident':
        return <AlertOctagon className="w-3.5 h-3.5 text-rose-300" />;
      case 'flooding':
        return <Waves className="w-3.5 h-3.5 text-sky-300" />;
      case 'breakdown':
        return <Truck className="w-3.5 h-3.5 text-amber-300" />;
      case 'enforcement':
        return <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />;
      case 'fuel_queue':
        return <Flame className="w-3.5 h-3.5 text-orange-300" />;
      default:
        return <AlertTriangle className="w-3.5 h-3.5 text-yellow-300" />;
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 md:p-4 max-w-7xl mx-auto">
      {/* Top Banner / City Status Overview */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs md:text-sm font-semibold text-white">
            {city} Live Road Radar
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            · {cityCorridors.length} major corridors monitored
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowIncidentPins(!showIncidentPins)}
            className={`text-xs px-2.5 py-1 rounded-md border transition-colors cursor-pointer flex items-center gap-1 ${
              showIncidentPins 
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>{showIncidentPins ? 'Hide Pins' : 'Show Pins'}</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div className="relative w-full aspect-4/3 sm:aspect-16/9 max-h-[460px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* City Geography & Waterway representations */}
        <svg 
          viewBox="0 0 540 420" 
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            <linearGradient id="lagoonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.15" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {city === 'Lagos' && (
            <>
              {/* Lagos Lagoon Waterbody */}
              <path
                d="M 200 40 Q 250 160 310 250 T 400 340 L 530 380 L 530 0 L 200 0 Z"
                fill="url(#lagoonGrad)"
                stroke="#0369a1"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.5"
              />
              <text x="360" y="140" fill="#38bdf8" opacity="0.3" fontSize="12" fontWeight="bold" letterSpacing="2">
                LAGOS LAGOON
              </text>
              <text x="370" y="390" fill="#38bdf8" opacity="0.3" fontSize="11" letterSpacing="1">
                ATLANTIC OCEAN
              </text>

              {/* Geographic Labels */}
              <text x="70" y="50" fill="#94a3b8" fontSize="10" opacity="0.6">MAINLAND (IKEJA / BERGER)</text>
              <text x="130" y="270" fill="#94a3b8" fontSize="10" opacity="0.6">SURULERE / YABA</text>
              <text x="330" y="315" fill="#e2e8f0" fontSize="10" fontWeight="bold">LAGOS ISLAND / CMS</text>
              <text x="360" y="345" fill="#e2e8f0" fontSize="10">VICTORIA ISLAND</text>
              <text x="440" y="390" fill="#94a3b8" fontSize="10">LEKKI - AJAH</text>
            </>
          )}

          {city === 'Abuja' && (
            <>
              {/* Abuja Topography / Hills */}
              <circle cx="280" cy="120" r="45" fill="#1e293b" opacity="0.4" />
              <text x="250" y="125" fill="#64748b" fontSize="11" fontWeight="bold">ASO ROCK</text>
              <text x="210" y="220" fill="#94a3b8" fontSize="10">CENTRAL BUSINESS DISTRICT</text>
              <text x="60" y="340" fill="#94a3b8" fontSize="10">AIRPORT / LUGBE</text>
              <text x="360" y="270" fill="#94a3b8" fontSize="10">NYANYA / MARARABA</text>
            </>
          )}

          {city === 'Port Harcourt' && (
            <>
              {/* Rivers & Creeks */}
              <path d="M 60 380 Q 200 350 350 390 L 500 410" fill="none" stroke="#0284c7" strokeWidth="2" opacity="0.4" />
              <text x="220" y="140" fill="#94a3b8" fontSize="10">ABA ROAD AXIS</text>
              <text x="120" y="280" fill="#94a3b8" fontSize="10">RUMUOKORO / CHOBA</text>
              <text x="350" y="240" fill="#94a3b8" fontSize="10">GARRISON / TRANS-AMADI</text>
            </>
          )}

          {city === 'Ibadan' && (
            <>
              <text x="140" y="80" fill="#94a3b8" fontSize="10">OJOO / UI AXIS</text>
              <text x="280" y="190" fill="#94a3b8" fontSize="10">IWO ROAD INTERCHANGE</text>
              <text x="290" y="330" fill="#94a3b8" fontSize="10">CHALLENGE / TOLL GATE</text>
            </>
          )}

          {/* Render Road Arteries with Dynamic Traffic Flow */}
          {cityCorridors.map((corridor) => {
            const isSelected = corridor.id === activeCorridor?.id;
            const color = getStatusColor(corridor.status);

            return (
              <g 
                key={corridor.id} 
                className="cursor-pointer group"
                onClick={() => setSelectedCorridorId(corridor.id)}
              >
                {/* Background road casing */}
                <path
                  d={corridor.svgPath}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth={isSelected ? "14" : "10"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-200"
                />

                {/* Outer Glow for Selected / Congested Road */}
                {isSelected && (
                  <path
                    d={corridor.svgPath}
                    fill="none"
                    stroke={color}
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeOpacity="0.25"
                    filter="url(#glow)"
                  />
                )}

                {/* Real-time traffic flow stroke */}
                <path
                  d={corridor.svgPath}
                  fill="none"
                  stroke={color}
                  strokeWidth={isSelected ? "6" : "4.5"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={corridor.status === 'standstill' ? "8 6" : corridor.status === 'slow' ? "12 4" : "none"}
                  className={`transition-all ${corridor.status === 'standstill' ? 'animate-pulse' : ''}`}
                />

                {/* Animated vehicle simulation dots for flow rate */}
                {corridor.status !== 'standstill' && (
                  <circle r="3" fill="#ffffff" opacity="0.8">
                    <animateMotion
                      path={corridor.svgPath}
                      dur={corridor.status === 'free' ? "4s" : "10s"}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Interactive Click target expander */}
                <path
                  d={corridor.svgPath}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="24"
                />
              </g>
            );
          })}

          {/* Incident Pins on Map */}
          {showIncidentPins && cityIncidents.map((inc) => {
            const [x, y] = inc.coords;
            const isCritical = inc.severity === 'critical';

            return (
              <g
                key={inc.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCorridorId(inc.corridorId);
                  onSelectIncident(inc);
                }}
              >
                {/* Pulsing ring for critical alert */}
                {isCritical && (
                  <circle r="14" fill="#ef4444" opacity="0.3" className="animate-ping" />
                )}
                
                {/* Pin shadow */}
                <ellipse cx="0" cy="10" rx="6" ry="2.5" fill="#000000" opacity="0.6" />

                {/* Pin Base */}
                <circle
                  r="9"
                  fill={inc.severity === 'critical' ? '#ef4444' : inc.severity === 'severe' ? '#f97316' : '#eab308'}
                  stroke="#020617"
                  strokeWidth="2"
                  className="transition-transform group-hover:scale-125"
                />

                {/* Center marker symbol */}
                <circle r="3.5" fill="#ffffff" />
              </g>
            );
          })}
        </svg>

        {/* Compass / Legend Overlay */}
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2 text-[10px] space-y-1 pointer-events-none">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Traffic Speed</span>
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="w-2.5 h-1 rounded-full bg-emerald-400 inline-block" />
            <span>Free Flow (&gt;50 km/h)</span>
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="w-2.5 h-1 rounded-full bg-yellow-400 inline-block" />
            <span>Slow Crawl (25-45)</span>
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="w-2.5 h-1 rounded-full bg-rose-500 inline-block animate-pulse" />
            <span>Standstill Hold-up</span>
          </div>
        </div>

        {/* Map Zoom Controls */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2))}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center font-bold text-sm shadow cursor-pointer"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.85))}
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center font-bold text-sm shadow cursor-pointer"
            title="Zoom Out"
          >
            -
          </button>
        </div>
      </div>

      {/* Selected Corridor Live Intelligence Sheet */}
      {activeCorridor && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  {activeCorridor.name}
                </h3>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getStatusBadge(activeCorridor.status).bg}`}>
                  {getStatusBadge(activeCorridor.status).text}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeCorridor.direction} · Updated {activeCorridor.lastUpdated}
              </p>
            </div>

            {/* Quick Speed & Delay Metrics */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <Gauge className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-white font-bold tabular-nums">{activeCorridor.currentSpeedKmH}</span>
                  <span className="text-slate-500 text-[10px]"> / {activeCorridor.normalSpeedKmH} km/h</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <Clock className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="text-white font-bold tabular-nums">+{activeCorridor.delayMinutes}m</span>
                  <span className="text-slate-500 text-[10px]"> delay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Landmarks / Corridor Points */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400 text-[11px] font-medium mr-1">Key landmarks:</span>
            {activeCorridor.popularLandmarks.map((lm, idx) => (
              <span key={idx} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px]">
                {lm}
              </span>
            ))}
          </div>

          {/* Alternate Bypass Recommendation */}
          <div className="mt-3 p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-emerald-300">Recommended Smart Detour:</span>
                <p className="text-xs text-slate-300 mt-0.5">
                  {activeCorridor.alternateRoute}
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectRouteBypass(activeCorridor.name)}
              className="text-xs font-semibold text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>View Route</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Active Incidents on this Corridor */}
          {cityIncidents.filter(i => i.corridorId === activeCorridor.id).length > 0 && (
            <div className="mt-3 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Active Road Reports on This Corridor
              </span>
              <div className="space-y-1.5">
                {cityIncidents.filter(i => i.corridorId === activeCorridor.id).map(inc => (
                  <div
                    key={inc.id}
                    onClick={() => onSelectIncident(inc)}
                    className="p-2.5 bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-lg flex items-center justify-between gap-2 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                        {getIncidentIcon(inc.type)}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-semibold text-white block truncate">{inc.title}</span>
                        <span className="text-[11px] text-slate-400 block truncate">{inc.landmark} · {inc.reportedAgoMinutes}m ago</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Corridor Quick Select Horizontal Carousel */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-300">Monitored Nigerian Expressways</span>
          <span className="text-[11px] text-slate-500">Tap to inspect radar</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {cityCorridors.map((c) => {
            const isSelected = c.id === activeCorridor?.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCorridorId(c.id)}
                className={`px-3 py-2 rounded-xl text-left border transition-all whitespace-nowrap min-w-[190px] cursor-pointer shrink-0 ${
                  isSelected 
                    ? 'bg-slate-800 border-emerald-500/50 text-white shadow-md' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-white truncate max-w-[130px]">{c.name}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    c.status === 'standstill' ? 'bg-rose-500 animate-pulse' :
                    c.status === 'heavy' ? 'bg-amber-500' :
                    c.status === 'slow' ? 'bg-yellow-400' : 'bg-emerald-400'
                  }`} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>{c.currentSpeedKmH} km/h</span>
                  <span className={c.delayMinutes > 30 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                    +{c.delayMinutes}m delay
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
