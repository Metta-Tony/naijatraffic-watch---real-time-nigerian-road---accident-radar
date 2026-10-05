import React, { useState } from 'react';
import { City, IncidentType, Severity, IncidentReport, RoadCorridor } from '../types/traffic';
import { 
  X, 
  AlertTriangle, 
  MapPin, 
  Camera, 
  Send, 
  CheckCircle2, 
  AlertOctagon, 
  Truck, 
  Waves, 
  ShieldAlert, 
  Flame,
  Check
} from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: IncidentReport) => void;
  city: City;
  corridors: RoadCorridor[];
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  city,
  corridors
}) => {
  const [selectedCity, setSelectedCity] = useState<City>(city);
  const [corridorId, setCorridorId] = useState<string>(corridors[0]?.id || '');
  const [customRoad, setCustomRoad] = useState<string>('');
  const [incidentType, setIncidentType] = useState<IncidentType>('accident');
  const [severity, setSeverity] = useState<Severity>('severe');
  const [landmark, setLandmark] = useState<string>('');
  const [direction, setDirection] = useState<string>('Inward');
  const [description, setDescription] = useState<string>('');
  const [pidginSummary, setPidginSummary] = useState<string>('');
  const [reporterName, setReporterName] = useState<string>('');
  const [reporterRole, setReporterRole] = useState<IncidentReport['reporterRole']>('Driver');
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const relevantCorridors = corridors.filter(c => c.city === selectedCity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const activeCorridor = corridors.find(c => c.id === corridorId);
    const resolvedCorridorName = corridorId === 'custom' 
      ? customRoad || 'Local Link Road' 
      : (activeCorridor?.name || 'Main Expressway');

    const newReport: IncidentReport = {
      id: `user-inc-${Date.now()}`,
      title: incidentType === 'accident' ? `Accident reported near ${landmark || resolvedCorridorName}` :
             incidentType === 'breakdown' ? `Broken down vehicle obstructing lane` :
             incidentType === 'flooding' ? `Severe waterlogged road near ${landmark}` :
             incidentType === 'enforcement' ? `Security / LASTMA checkpoint operation` :
             `Heavy traffic bottleneck and hold-up`,
      corridorId: corridorId === 'custom' ? 'lag-custom' : corridorId,
      corridorName: resolvedCorridorName,
      city: selectedCity,
      type: incidentType,
      severity: severity,
      description: description || `Heavy slow crawl reported along ${resolvedCorridorName}. Motorists are advised to seek bypass.`,
      pidginSummary: pidginSummary || (description ? `Wahala dey for ${resolvedCorridorName}. Make drivers calm down or take bypass.` : ''),
      landmark: landmark || 'Around major junction',
      direction: direction,
      reportedAgoMinutes: 1,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      verifiedCount: 1,
      disputedCount: 0,
      reporterName: reporterName.trim() || 'Anonymous Commuter',
      reporterRole: reporterRole,
      coords: activeCorridor ? activeCorridor.startPoint : [240, 200],
      hasPhoto: hasPhoto,
      photoUrl: hasPhoto ? '/src/assets/images/lagos_traffic_skyline_1791191737287.jpg' : undefined
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSubmit(newReport);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Report Road Wahala</h2>
              <p className="text-xs text-slate-400">Help fellow Nigerian commuters avoid hold-up</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        {showSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Alert Broadcasted Successfully!</h3>
            <p className="text-xs text-slate-300 max-w-xs">
              Thank you for updating the community. Your report is now live on the map and active radar.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
            {/* City Selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">State / City</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'] as City[]).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => {
                      setSelectedCity(c);
                      const newCorridors = corridors.filter(cr => cr.city === c);
                      if (newCorridors.length > 0) setCorridorId(newCorridors[0].id);
                    }}
                    className={`py-1.5 px-2 rounded-lg font-medium text-center border transition-colors cursor-pointer truncate ${
                      selectedCity === c
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Road Corridor Selection */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Road or Expressway</label>
              <select
                value={corridorId}
                onChange={(e) => setCorridorId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {relevantCorridors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
                <option value="custom">+ Other Road / Inner Link Street</option>
              </select>

              {corridorId === 'custom' && (
                <input
                  type="text"
                  placeholder="Enter road name (e.g., Agungi bypass, Ring Road, Wuse 2)..."
                  value={customRoad}
                  onChange={(e) => setCustomRoad(e.target.value)}
                  className="w-full mt-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
              )}
            </div>

            {/* Incident Type Grid */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Incident Category</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'accident', label: 'Accident', icon: AlertOctagon, color: 'text-rose-400' },
                  { id: 'gridlock', label: 'Heavy Go-Slow', icon: AlertTriangle, color: 'text-amber-400' },
                  { id: 'breakdown', label: 'Broken Danfo/Truck', icon: Truck, color: 'text-yellow-400' },
                  { id: 'flooding', label: 'Waterlogged / Rain', icon: Waves, color: 'text-sky-400' },
                  { id: 'enforcement', label: 'FRSC / LASTMA Stop', icon: ShieldAlert, color: 'text-purple-400' },
                  { id: 'fuel_queue', label: 'Fuel Station Queue', icon: Flame, color: 'text-orange-400' }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = incidentType === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setIncidentType(item.id as IncidentType)}
                      className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-emerald-500/50 text-white shadow-sm'
                          : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                      <span className="text-[11px] font-medium text-center leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Severity Level */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Impact on Movement</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'critical', label: 'Total Lockdown (Standstill)', sub: 'Vehicles not moving at all' },
                  { id: 'severe', label: 'Severe Hold-up (30-60m delay)', sub: 'First & second gear crawl' },
                  { id: 'moderate', label: 'Moderate Bottleneck (15m)', sub: 'Moving with slowdown' }
                ].map((sev) => (
                  <button
                    type="button"
                    key={sev.id}
                    onClick={() => setSeverity(sev.id as Severity)}
                    className={`p-2 rounded-xl border text-left cursor-pointer transition-colors ${
                      severity === sev.id
                        ? 'bg-slate-800 border-emerald-500/50 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-[11px]">{sev.label}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{sev.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Landmark & Direction */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Exact Landmark / Bus Stop</label>
                <input
                  type="text"
                  placeholder="e.g., Just before Adeniji Adele ramp, near Total filling station..."
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Direction of Traffic</label>
                <input
                  type="text"
                  placeholder="e.g., Inward Island, Outward Berger, Both sides..."
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Incident Details & Pidgin Gist */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Incident Description (What happened?)</label>
              <textarea
                rows={2}
                placeholder="Give details: e.g., 20ft container broke down in middle lane, oil spilling on road, tow truck just arrived..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                🇳🇬 Pidgin Summary <span className="text-slate-500 font-normal">(Optional Road Gist)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., 'Make una hold on o, tanker don block two lanes kpatakpata!'"
                value={pidginSummary}
                onChange={(e) => setPidginSummary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Reporter Info & Photo Attachment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Name / Handle</label>
                <input
                  type="text"
                  placeholder="e.g., Tony M., Driver Emeka, Captain B."
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Role on the Road</label>
                <select
                  value={reporterRole}
                  onChange={(e) => setReporterRole(e.target.value as IncidentReport['reporterRole'])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Driver">Motorist / Private Driver</option>
                  <option value="Commuter">Passenger / Commuter</option>
                  <option value="Dispatch Rider">Dispatch Rider / Okada</option>
                  <option value="LASTMA Official">LASTMA Official</option>
                  <option value="FRSC Marshall">FRSC Marshall</option>
                </select>
              </div>
            </div>

            {/* Quick Photo Simulation Toggle */}
            <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-slate-200 font-medium block">Attach Scene Photo</span>
                  <span className="text-[10px] text-slate-500">Helps FRSC & LASTMA verify faster</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setHasPhoto(!hasPhoto)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                  hasPhoto 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-slate-900 text-slate-400 border-slate-700'
                }`}
              >
                {hasPhoto ? 'Photo Attached ✓' : '+ Add Photo'}
              </button>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 active:scale-[0.99] text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Broadcasting Alert...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post Real-Time Traffic Alert</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
