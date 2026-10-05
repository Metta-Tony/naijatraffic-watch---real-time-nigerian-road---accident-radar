import React, { useState } from 'react';
import { EMERGENCY_CONTACTS } from '../data/nigerianRoads';
import { City, EmergencyContact } from '../types/traffic';
import { 
  PhoneCall, 
  ShieldAlert, 
  Clock, 
  Copy, 
  Check, 
  AlertOctagon, 
  Truck, 
  LifeBuoy, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface EmergencyDirectoryProps {
  city: City;
}

export const EmergencyDirectory: React.FC<EmergencyDirectoryProps> = ({ city }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const contacts = EMERGENCY_CONTACTS.filter(c => c.city === 'All' || c.city === city);

  const handleCopy = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-3 md:p-4 max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-bold text-white tracking-tight">
              Emergency Road Rescue &amp; Hotlines
            </h2>
            <p className="text-xs text-slate-400">
              Direct emergency dispatch for road collisions, overturned tankers, vehicle towing, and medical triage in {city}.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Quick Dial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 shadow-sm space-y-3 transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  {contact.category}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white mt-0.5">
                  {contact.name}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {contact.acronym}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{contact.responseTime}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {contact.description}
            </p>

            {/* Calling Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <a
                href={`tel:${contact.tollFree || contact.phone}`}
                className="flex-1 py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call {contact.tollFree ? `Toll-Free (${contact.tollFree})` : contact.phone}</span>
              </a>

              <button
                onClick={() => handleCopy(contact.id, contact.tollFree || contact.phone)}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors cursor-pointer"
                title="Copy phone number"
              >
                {copiedId === contact.id ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Incident Protocol Guide */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs md:text-sm font-bold text-white tracking-tight">
            Accident Scene Checklist: What to Tell FRSC / 112
          </h3>
        </div>

        <div className="space-y-2 text-xs">
          {[
            {
              title: '1. Exact Landmark & Highway Direction',
              desc: 'State the highway (e.g. "Third Mainland Bridge inward Adeniji", or "Lagos-Ibadan Expressway near Kara Cattle Market"). Mention the closest pedestrian bridge or kilometer post.'
            },
            {
              title: '2. Vehicle Types & Hazards Involved',
              desc: 'Clearly mention if a fuel tanker (petrol/diesel leak), container truck, or passenger bus (Danfo) is involved. Highly critical for dispatching chemical foam vs regular rescue.'
            },
            {
              title: '3. Trapped Persons & Casualties',
              desc: 'Inform the dispatcher if victims are trapped inside vehicles so the heavy-duty extrication squad (Jaws of Life) is deployed immediately.'
            },
            {
              title: '4. Reflective Warning Triangles',
              desc: 'Place reflective triangles at least 45 meters behind the scene to prevent secondary pile-up collisions from speeding oncoming vehicles.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="font-bold text-amber-300 block mb-0.5">{item.title}</span>
              <p className="text-slate-400 leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
