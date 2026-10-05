import React from 'react';
import { Radio, AlertTriangle, ShieldAlert, Volume2, VolumeX, Smartphone, Monitor, Info } from 'lucide-react';
import { City } from '../types/traffic';

interface HeaderBarProps {
  activeTab: 'map' | 'incidents' | 'routes' | 'emergency' | 'about';
  setActiveTab: (tab: 'map' | 'incidents' | 'routes' | 'emergency' | 'about') => void;
  selectedCity: City;
  setSelectedCity: (city: City) => void;
  onOpenReportModal: () => void;
  audioBulletinActive: boolean;
  onToggleAudioBulletin: () => void;
  isDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  dataSaverMode: boolean;
  onToggleDataSaver: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  activeTab,
  setActiveTab,
  selectedCity,
  setSelectedCity,
  onOpenReportModal,
  audioBulletinActive,
  onToggleAudioBulletin,
  isDeviceFrame,
  onToggleDeviceFrame,
  dataSaverMode,
  onToggleDataSaver
}) => {
  const cities: City[] = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-3 md:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('map'); }}
              className="text-base md:text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <span>NaijaTraffic</span>
              <span className="text-emerald-400 text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-mono">LIVE</span>
            </a>
          </div>
        </div>

        {/* Zone 2: Navigation Links (5 links, strictly following top bar contract) */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
          <button 
            onClick={() => setActiveTab('map')} 
            className={`transition-colors cursor-pointer py-1 ${activeTab === 'map' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : 'hover:text-white'}`}
          >
            Live Radar
          </button>
          <button 
            onClick={() => setActiveTab('incidents')} 
            className={`transition-colors cursor-pointer py-1 ${activeTab === 'incidents' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : 'hover:text-white'}`}
          >
            Incident Feed
          </button>
          <button 
            onClick={() => setActiveTab('routes')} 
            className={`transition-colors cursor-pointer py-1 ${activeTab === 'routes' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : 'hover:text-white'}`}
          >
            Smart Bypass
          </button>
          <button 
            onClick={() => setActiveTab('emergency')} 
            className={`transition-colors cursor-pointer py-1 ${activeTab === 'emergency' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : 'hover:text-white'}`}
          >
            Rescue Hotlines
          </button>
          <button 
            onClick={() => setActiveTab('about')} 
            className={`transition-colors cursor-pointer py-1 ${activeTab === 'about' ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400' : 'hover:text-white'}`}
          >
            About &amp; Guide
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2">
          {/* City Selector */}
          <select 
            aria-label="Select City"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value as City)}
            className="text-xs bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Quick Info/Guide icon for mobile & desktop */}
          <button
            onClick={() => setActiveTab('about')}
            title="About NaijaTraffic and How-To-Use Guide"
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              activeTab === 'about'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Voice bulletin trigger */}
          <button
            onClick={onToggleAudioBulletin}
            title={audioBulletinActive ? 'Mute traffic radio' : 'Play live traffic audio radio'}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              audioBulletinActive 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {audioBulletinActive ? <Volume2 className="w-4 h-4 text-emerald-400 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Desktop/Mobile Device Frame Toggle (on desktop) */}
          <button
            onClick={onToggleDeviceFrame}
            title={isDeviceFrame ? 'Switch to Full Web View' : 'Preview in Mobile Phone Shell'}
            className="hidden lg:flex items-center p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 cursor-pointer text-xs"
          >
            {isDeviceFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Report Button (Primary CTA) */}
          <button
            onClick={onOpenReportModal}
            className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Report Road Wahala</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};
