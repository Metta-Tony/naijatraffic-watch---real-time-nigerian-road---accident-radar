import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  isDeviceFrame: boolean;
  onToggleFrame: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  isDeviceFrame,
  onToggleFrame
}) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!isDeviceFrame) {
    return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center py-6 px-4">
      {/* Device Frame Wrapper */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[92vh] bg-slate-900 border-[10px] border-slate-800 rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col ring-1 ring-slate-700/50">
        
        {/* Smartphone Dynamic Island / Speaker Notch */}
        <div className="w-full bg-slate-950 px-6 pt-3 pb-2 flex items-center justify-between text-white text-xs select-none z-50 shrink-0">
          <span className="font-semibold text-xs tracking-tight">{currentTime}</span>
          
          {/* Dynamic Island pill */}
          <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500/80 mr-2 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          </div>

          {/* Network & Battery */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-[10px] font-mono text-emerald-400 font-bold">MTN 5G</span>
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Inner Phone Screen Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none bg-slate-950 flex flex-col relative">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="w-full bg-slate-950 py-1.5 flex items-center justify-center z-50 shrink-0">
          <div className="w-32 h-1 bg-slate-700 rounded-full" />
        </div>
      </div>

      {/* Frame Dismiss / Info hint */}
      <div className="mt-3 text-center text-xs text-slate-400 flex items-center gap-2">
        <span>Smartphone Preview Mode</span>
        <span>·</span>
        <button
          onClick={onToggleFrame}
          className="text-emerald-400 hover:underline cursor-pointer"
        >
          Expand to Full Width
        </button>
      </div>
    </div>
  );
};
