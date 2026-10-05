import React from 'react';
import { IncidentReport } from '../types/traffic';
import { 
  X, 
  MapPin, 
  Clock, 
  Volume2, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Check, 
  AlertOctagon, 
  Truck, 
  Waves, 
  ShieldAlert, 
  Flame, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface IncidentDetailModalProps {
  incident: IncidentReport | null;
  onClose: () => void;
  onVote: (incidentId: string, type: 'up' | 'down') => void;
  onNavigateBypass: (corridorName: string) => void;
}

export const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({
  incident,
  onClose,
  onVote,
  onNavigateBypass
}) => {
  const [copied, setCopied] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  if (!incident) return null;

  const handleShare = async () => {
    const text = `🚨 NaijaTraffic Live Alert: ${incident.title} at ${incident.landmark} on ${incident.corridorName}. Stay safe!`;
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${incident.title}. ${incident.pidginSummary || incident.description}`);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                incident.severity === 'critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                incident.severity === 'severe' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
              }`}>
                {incident.severity.toUpperCase()} INCIDENT
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {incident.timestamp} ({incident.reportedAgoMinutes}m ago)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              {incident.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Landmark */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{incident.corridorName}</span>
          </div>
          <div className="text-slate-300">
            <span className="text-slate-500">Exact Spot: </span>
            {incident.landmark} ({incident.direction})
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {incident.description}
        </p>

        {/* Live Photo if available */}
        {incident.hasPhoto && incident.photoUrl && (
          <div className="rounded-xl overflow-hidden border border-slate-800 max-h-52 relative">
            <img 
              src={incident.photoUrl} 
              alt="Live scene capture"
              className="w-full h-52 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] text-slate-300 font-mono">
              Live Field Camera
            </div>
          </div>
        )}

        {/* Authentic Nigerian Pidgin Summary */}
        {incident.pidginSummary && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
              🇳🇬 Road Reporter Gist
            </span>
            <p className="text-xs text-amber-200/90 italic">
              "{incident.pidginSummary}"
            </p>
          </div>
        )}

        {/* Action Button: Explore Smart Bypass */}
        <button
          onClick={() => {
            onClose();
            onNavigateBypass(incident.corridorName);
          }}
          className="w-full py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          <span>Calculate Smart Bypass Around This Incident</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Verification and Audio Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onVote(incident.id, 'up')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                incident.userVote === 'up'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Confirm Na True ({incident.verifiedCount})</span>
            </button>

            <button
              onClick={() => onVote(incident.id, 'down')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                incident.userVote === 'down'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Road Clear ({incident.disputedCount})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSpeaking 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Voice alert"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
              title="Share alert"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
