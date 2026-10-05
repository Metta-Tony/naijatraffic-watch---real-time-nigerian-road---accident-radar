import React from 'react';
import { WifiOff, Zap, ShieldCheck } from 'lucide-react';

interface DataSaverBannerProps {
  dataSaverMode: boolean;
  onToggleDataSaver: () => void;
}

export const DataSaverBanner: React.FC<DataSaverBannerProps> = ({
  dataSaverMode,
  onToggleDataSaver
}) => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 text-[11px] flex items-center justify-between gap-2 max-w-7xl mx-auto">
      <div className="flex items-center gap-1.5 text-slate-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="font-medium">Naija Road Mesh:</span>
        <span className="text-slate-400 hidden sm:inline">
          {dataSaverMode ? 'Text-First Lite Mode active (0.4 KB/req)' : 'Live Vector Radar active'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleDataSaver}
          className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-colors cursor-pointer flex items-center gap-1 ${
            dataSaverMode
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3 h-3" />
          <span>{dataSaverMode ? 'Data Saver: ON' : 'Data Saver: OFF'}</span>
        </button>
      </div>
    </div>
  );
};
