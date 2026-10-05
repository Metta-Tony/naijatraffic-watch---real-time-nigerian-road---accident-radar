import React, { useState } from 'react';
import { IncidentReport, IncidentType, City } from '../types/traffic';
import { 
  AlertTriangle, 
  AlertOctagon, 
  Waves, 
  Truck, 
  ShieldAlert, 
  Flame, 
  ThumbsUp, 
  ThumbsDown, 
  Volume2, 
  Share2, 
  Clock, 
  MapPin, 
  Check, 
  Search,
  Filter,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface IncidentFeedProps {
  city: City;
  incidents: IncidentReport[];
  onVote: (incidentId: string, type: 'up' | 'down') => void;
  onOpenReportModal: () => void;
  onSelectOnMap?: (incident: IncidentReport) => void;
}

export const IncidentFeed: React.FC<IncidentFeedProps> = ({
  city,
  incidents,
  onVote,
  onOpenReportModal,
  onSelectOnMap
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Filter incidents for this city & filters
  const filteredIncidents = incidents.filter(inc => {
    const matchesCity = city === 'Lagos' ? true : inc.city === city;
    const matchesType = filterType === 'all' || inc.type === filterType;
    const matchesSearch = 
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.corridorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.landmark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesType && matchesSearch;
  });

  const getIncidentIcon = (type: IncidentType) => {
    switch (type) {
      case 'accident':
        return <AlertOctagon className="w-4 h-4 text-rose-400" />;
      case 'flooding':
        return <Waves className="w-4 h-4 text-sky-400" />;
      case 'breakdown':
        return <Truck className="w-4 h-4 text-amber-400" />;
      case 'enforcement':
        return <ShieldAlert className="w-4 h-4 text-purple-400" />;
      case 'fuel_queue':
        return <Flame className="w-4 h-4 text-orange-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getSeverityBadge = (severity: IncidentReport['severity']) => {
    switch (severity) {
      case 'critical':
        return <span className="text-rose-400 text-xs font-semibold">Critical Incident</span>;
      case 'severe':
        return <span className="text-amber-400 text-xs font-semibold">Major Bottleneck</span>;
      case 'moderate':
        return <span className="text-yellow-400 text-xs font-semibold">Moderate Delay</span>;
      case 'cleared':
        return <span className="text-emerald-400 text-xs font-semibold">Cleared Road</span>;
    }
  };

  const handleShare = async (incident: IncidentReport) => {
    const text = `🚨 NaijaTraffic Alert: ${incident.title} on ${incident.corridorName} (${incident.landmark}). Status: ${incident.severity.toUpperCase()}. Stay safe!`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Traffic Alert: ${incident.corridorName}`,
          text: text
        });
      } catch {
        // Fallback to clipboard
        await navigator.clipboard.writeText(text);
        setCopiedId(incident.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } else {
      await navigator.clipboard.writeText(text);
      setCopiedId(incident.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleSpeak = (incident: IncidentReport) => {
    if ('speechSynthesis' in window) {
      if (speakingId === incident.id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const textToRead = `${incident.title}. ${incident.pidginSummary || incident.description}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      
      setSpeakingId(incident.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-3 md:p-4 max-w-4xl mx-auto space-y-4">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search road, bridge, or landmark (e.g., Adeniji, Berger, Lekki)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        <button
          onClick={onOpenReportModal}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs md:text-sm px-4 py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-emerald-500/10"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Report Live Incident</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-medium">
        {[
          { id: 'all', label: 'All Incidents' },
          { id: 'accident', label: '💥 Accidents' },
          { id: 'breakdown', label: '🚌 Breakdowns' },
          { id: 'flooding', label: '🌧️ Waterlogged' },
          { id: 'enforcement', label: '👮 Checkpoints / LASTMA' },
          { id: 'fuel_queue', label: '⛽ Fuel Queues' }
        ].map(chip => (
          <button
            key={chip.id}
            onClick={() => setFilterType(chip.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              filterType === chip.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Live Feed Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing {filteredIncidents.length} verified reports in {city}</span>
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Auto-updating
        </span>
      </div>

      {/* Incident Cards Stream */}
      {filteredIncidents.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
          <h4 className="text-sm font-bold text-white">No active incidents matching your filter</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Roads on this axis are moving freely or reports have been cleared by road safety teams.
          </p>
          <button
            onClick={() => { setFilterType('all'); setSearchQuery(''); }}
            className="mt-4 px-3 py-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredIncidents.map((incident) => {
            const hasUpvoted = incident.userVote === 'up';
            const hasDownvoted = incident.userVote === 'down';

            return (
              <div
                key={incident.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 transition-all shadow-md space-y-3"
              >
                {/* Header row: Severity, Type, Time */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                      {getIncidentIcon(incident.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {getSeverityBadge(incident.severity)}
                        <span className="text-slate-600 text-xs">·</span>
                        <span className="text-xs text-slate-400 font-mono">{incident.timestamp} ({incident.reportedAgoMinutes}m ago)</span>
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-white mt-0.5 tracking-tight">
                        {incident.title}
                      </h3>
                    </div>
                  </div>

                  {/* Audio speech reader */}
                  <button
                    onClick={() => handleSpeak(incident)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                      speakingId === incident.id
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                    title="Read report out loud in Nigerian road alert tone"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Corridor & Landmark Info */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-1.5 font-medium text-emerald-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{incident.corridorName}</span>
                  </div>
                  <span className="text-slate-600 hidden sm:inline">·</span>
                  <div className="text-slate-400">
                    <span className="text-slate-500">Landmark: </span>
                    <span className="text-slate-300 font-medium">{incident.landmark}</span>
                  </div>
                  <span className="text-slate-600 hidden sm:inline">·</span>
                  <div className="text-slate-400">
                    <span className="text-slate-500">Direction: </span>
                    <span className="text-slate-300">{incident.direction}</span>
                  </div>
                </div>

                {/* Standard Description */}
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {incident.description}
                </p>

                {/* Photo attachment if present */}
                {incident.hasPhoto && incident.photoUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-800 max-h-48 relative">
                    <img 
                      src={incident.photoUrl} 
                      alt="Accident on corridor"
                      className="w-full h-48 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-slate-300">
                      Live Photo from Commuter
                    </div>
                  </div>
                )}

                {/* Authentic Nigerian Pidgin Summary Box */}
                {incident.pidginSummary && (
                  <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                        🇳🇬 Road Gist (Pidgin Digest)
                      </span>
                    </div>
                    <p className="text-xs text-amber-200/90 italic leading-normal">
                      "{incident.pidginSummary}"
                    </p>
                  </div>
                )}

                {/* Bottom Row: Reporter, Community Verification Vote, and Share */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
                  {/* Reporter Attribution */}
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span>Reported by</span>
                    <span className="text-slate-200 font-medium">{incident.reporterName}</span>
                    <span className="bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">
                      {incident.reporterRole}
                    </span>
                  </div>

                  {/* Actions: Confirm, Dispute, Share */}
                  <div className="flex items-center gap-2">
                    {/* Upvote: Na True */}
                    <button
                      onClick={() => onVote(incident.id, 'up')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer text-xs ${
                        hasUpvoted
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                      title="Confirm this incident is accurate"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>Na True ({incident.verifiedCount})</span>
                    </button>

                    {/* Downvote: E don clear */}
                    <button
                      onClick={() => onVote(incident.id, 'down')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer text-xs ${
                        hasDownvoted
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                      title="Dispute: Report that road has been cleared"
                    >
                      <ThumbsDown className="w-3 h-3" />
                      <span>E don clear ({incident.disputedCount})</span>
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => handleShare(incident)}
                      className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
                      title="Share traffic alert"
                    >
                      {copiedId === incident.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
