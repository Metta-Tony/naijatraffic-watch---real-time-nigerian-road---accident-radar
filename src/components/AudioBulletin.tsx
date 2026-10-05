import React, { useState, useEffect } from 'react';
import { IncidentReport, City } from '../types/traffic';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  SkipForward, 
  X, 
  Sparkles,
  Headphones
} from 'lucide-react';

interface AudioBulletinProps {
  city: City;
  incidents: IncidentReport[];
  isOpen: boolean;
  onClose: () => void;
}

export const AudioBulletin: React.FC<AudioBulletinProps> = ({
  city,
  incidents,
  isOpen,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [voiceSupported, setVoiceSupported] = useState<boolean>(true);

  const cityIncidents = incidents.filter(i => i.city === city || i.city === 'Lagos');
  const activeIncident = cityIncidents[currentIndex] || cityIncidents[0];

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setVoiceSupported(false);
    }
  }, []);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    // Pick English voices if available
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en-NG') || v.lang.includes('en-US'));
    if (enVoice) utterance.voice = enVoice;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => {
      setIsPlaying(false);
    };
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      if (!activeIncident) return;
      const announcement = `Live Traffic Radio Alert for ${city}. ${activeIncident.title} on ${activeIncident.corridorName}. ${activeIncident.pidginSummary || activeIncident.description}`;
      speakText(announcement);
    }
  };

  const handleNext = () => {
    if (cityIncidents.length === 0) return;
    const nextIdx = (currentIndex + 1) % cityIncidents.length;
    setCurrentIndex(nextIdx);

    const nextIncident = cityIncidents[nextIdx];
    if (isPlaying && nextIncident) {
      const announcement = `Next update: ${nextIncident.title} on ${nextIncident.corridorName}. ${nextIncident.pidginSummary || nextIncident.description}`;
      speakText(announcement);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 right-3 left-3 md:left-auto md:w-96 z-40 bg-slate-900/95 border border-emerald-500/40 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-200">
      {/* Radio Header */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Traffic 96.1 FM Live Bulletin</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">
              Road Broadcaster Digest · {city}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            setIsPlaying(false);
            onClose();
          }}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Active Incident Summary */}
      {activeIncident ? (
        <div className="py-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-emerald-400 truncate max-w-[200px]">
              {activeIncident.corridorName}
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Report {currentIndex + 1} of {cityIncidents.length}
            </span>
          </div>

          <p className="text-xs text-slate-200 font-medium line-clamp-2 leading-snug">
            {activeIncident.pidginSummary || activeIncident.description}
          </p>

          {/* Equalizer Visualizer Bars */}
          <div className="flex items-center gap-1 h-3 pt-1">
            {[40, 90, 60, 100, 30, 80, 50, 95, 70, 40].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isPlaying ? 'bg-emerald-400' : 'bg-slate-700'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(20, (h + (i % 3) * 15) % 100)}%` : '20%',
                  animationDelay: `${i * 80}ms`
                }}
              />
            ))}
            <span className="text-[10px] text-slate-400 font-mono ml-auto">
              {isPlaying ? 'Broadcasting live audio...' : 'Audio ready'}
            </span>
          </div>
        </div>
      ) : (
        <div className="py-3 text-center text-xs text-slate-400">
          No reports to announce right now.
        </div>
      )}

      {/* Control bar */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
        <button
          onClick={handleTogglePlay}
          className="flex-1 py-1.5 px-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause Bulletin</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Road Bulletin</span>
            </>
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
          title="Next alert"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
