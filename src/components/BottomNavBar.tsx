import React from 'react';
import { MapPin, AlertOctagon, Navigation, PhoneCall, HelpCircle, Plus } from 'lucide-react';

interface BottomNavBarProps {
  activeTab: 'map' | 'incidents' | 'routes' | 'emergency' | 'about';
  setActiveTab: (tab: 'map' | 'incidents' | 'routes' | 'emergency' | 'about') => void;
  incidentCount: number;
  onOpenReportModal: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  incidentCount,
  onOpenReportModal
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1 md:hidden">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto h-14">
        {/* Radar Tab */}
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer transition-colors ${
            activeTab === 'map' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Radar</span>
        </button>

        {/* Incidents Feed Tab */}
        <button
          onClick={() => setActiveTab('incidents')}
          className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer transition-colors ${
            activeTab === 'incidents' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <AlertOctagon className="w-5 h-5" />
            {incidentCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                {incidentCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Alerts</span>
        </button>

        {/* Bypass Routes Tab */}
        <button
          onClick={() => setActiveTab('routes')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer transition-colors ${
            activeTab === 'routes' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Navigation className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Bypass</span>
        </button>

        {/* Emergency / Hotlines Tab */}
        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer transition-colors ${
            activeTab === 'emergency' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PhoneCall className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Hotlines</span>
        </button>

        {/* About & Guide Tab */}
        <button
          onClick={() => setActiveTab('about')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer transition-colors ${
            activeTab === 'about' ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Guide</span>
        </button>
      </div>
    </div>
  );
};
