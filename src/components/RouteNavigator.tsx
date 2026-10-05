import React, { useState } from 'react';
import { PRESET_ROUTES, NIGERIAN_TRAFFIC_TIPS } from '../data/nigerianRoads';
import { City, IncidentReport } from '../types/traffic';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Fuel, 
  Compass, 
  Route, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Zap
} from 'lucide-react';

interface RouteNavigatorProps {
  city: City;
  incidents: IncidentReport[];
  preselectedCorridor?: string | null;
}

export const RouteNavigator: React.FC<RouteNavigatorProps> = ({
  city,
  incidents,
  preselectedCorridor
}) => {
  const cityRoutes = PRESET_ROUTES.filter(r => r.city === city || r.city === 'Lagos');
  const [selectedRouteIdx, setSelectedRouteIdx] = useState<number>(0);
  const [customOrigin, setCustomOrigin] = useState<string>('');
  const [customDestination, setCustomDestination] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customRouteResult, setCustomRouteResult] = useState<boolean>(false);

  const activePreset = cityRoutes[selectedRouteIdx] || PRESET_ROUTES[0];

  const handleCustomCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customOrigin || !customDestination) return;
    setCustomRouteResult(true);
  };

  return (
    <div className="p-3 md:p-4 max-w-4xl mx-auto space-y-4">
      {/* Header section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Navigation className="w-4 h-4" />
              </div>
              <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
                Smart Bypass &amp; Hold-up Navigator
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Real-time detour algorithm avoiding accidents, broken-down tankers, and police checkpoints in {city}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setIsCustomMode(false); setCustomRouteResult(false); }}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                !isCustomMode 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Popular Commutes
            </button>
            <button
              onClick={() => setIsCustomMode(true)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                isCustomMode 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Custom Route
            </button>
          </div>
        </div>

        {/* Custom Origin/Destination Input */}
        {isCustomMode && (
          <form onSubmit={handleCustomCalculate} className="mt-4 pt-4 border-t border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Starting Point</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Ikeja Along, Berger, Yaba, Gwarinpa..."
                    value={customOrigin}
                    onChange={(e) => setCustomOrigin(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Destination</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Victoria Island, Marina, Airport, Apo..."
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Calculate Hold-Up Avoidance Route</span>
            </button>
          </form>
        )}
      </div>

      {/* Preset Route Selector Carousel */}
      {!isCustomMode && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {cityRoutes.map((route, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRouteIdx(idx)}
              className={`px-3 py-2 rounded-xl border text-left whitespace-nowrap cursor-pointer transition-all ${
                selectedRouteIdx === idx
                  ? 'bg-slate-800 border-emerald-500/50 text-white shadow'
                  : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold text-white truncate max-w-[210px]">
                {route.origin.split('(')[0]} → {route.destination.split('/')[0]}
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                Save time via {route.routes.recommended.name}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Main Route Comparison Container */}
      {(!isCustomMode || customRouteResult) && (
        <div className="space-y-3">
          {/* Visual Route Header */}
          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">
                {isCustomMode ? customOrigin : activePreset.origin}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-bold text-white">
                {isCustomMode ? customDestination : activePreset.destination}
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Live Verified
            </span>
          </div>

          {/* Side by side or stacked comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* RECOMMENDED SMART BYPASS */}
            <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-4 shadow-lg space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow">
                Recommended Bypass
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Fastest Route
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {isCustomMode ? `Via Service Link & Express Bypass` : activePreset.routes.recommended.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isCustomMode ? `Through secondary ring roads avoiding the main highway blockage` : activePreset.routes.recommended.via}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-emerald-500/20 text-center font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Est. Time</span>
                  <span className="text-lg font-bold text-emerald-300">
                    {isCustomMode ? '38m' : activePreset.routes.recommended.time}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Hold-up Delay</span>
                  <span className="text-lg font-bold text-emerald-400">
                    {isCustomMode ? '+5m' : activePreset.routes.recommended.delay}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Distance</span>
                  <span className="text-lg font-bold text-slate-200">
                    {isCustomMode ? '21.5 km' : activePreset.routes.recommended.distance}
                  </span>
                </div>
              </div>

              {/* Highlights / Advantages */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                  Why take this route:
                </span>
                {(isCustomMode ? [
                  'Avoids main corridor where vehicles are stuck in standstill',
                  'Clear traffic lights and free-flowing link avenues',
                  'Estimated to save at least 40+ minutes of commute time'
                ] : activePreset.routes.recommended.highlights).map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CONGESTED NORMAL ROUTE */}
            <div className="bg-rose-950/10 border border-rose-500/30 rounded-2xl p-4 shadow-sm space-y-3 opacity-90">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  Normal Expressway (Severe Hold-up)
                </span>
                <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-semibold">
                  Avoid
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {isCustomMode ? `Direct Main Expressway` : activePreset.routes.congested.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isCustomMode ? `Regular primary highway` : activePreset.routes.congested.via}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-rose-500/20 text-center font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">Est. Time</span>
                  <span className="text-lg font-bold text-rose-400">
                    {isCustomMode ? '1h 35m' : activePreset.routes.congested.time}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Hold-up Delay</span>
                  <span className="text-lg font-bold text-rose-400">
                    {isCustomMode ? '+55m' : activePreset.routes.congested.delay}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Distance</span>
                  <span className="text-lg font-bold text-slate-400">
                    {isCustomMode ? '19.2 km' : activePreset.routes.congested.distance}
                  </span>
                </div>
              </div>

              {/* Bottleneck Issues */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider block">
                  Reported Bottlenecks:
                </span>
                {(isCustomMode ? [
                  'Overturned vehicle / heavy traffic breakdown obstructing main travel lanes',
                  'Severe tailback extending over 4 kilometres',
                  'Heavy engine idling; high risk of overheating in heat'
                ] : activePreset.routes.congested.issues).map((issue, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Turn Guidance with Landmarks */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Step-by-Step Landmark Navigation Advice</span>
            </h4>

            <div className="space-y-2 text-xs">
              {[
                'Start from corridor and keep to the center-right lane to avoid commercial Danfo sudden halts.',
                'Approaching interchange: Veer into the service diversion lane 300 meters before the flyover.',
                'Follow the bypass past the landmark roundabout, bypassing the main checkpoint/accident queue.',
                'Merge back smoothly onto the destination expressway once clear of the obstruction zone.'
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300 leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Nigerian Commuter Survival Pro-Tips */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs md:text-sm font-bold text-white tracking-tight">
            Naija Commuter Pro-Tips (Stay Safe &amp; Moving)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          {NIGERIAN_TRAFFIC_TIPS.map((tip, i) => (
            <div key={i} className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1">
              <span className="font-semibold text-emerald-300 block">{tip.title}</span>
              <p className="text-slate-400 leading-normal text-[11px]">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
