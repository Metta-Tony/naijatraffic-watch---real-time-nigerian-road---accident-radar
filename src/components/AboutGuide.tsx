import React, { useState } from 'react';
import { 
  Info, 
  MapPin, 
  Volume2, 
  Navigation, 
  AlertTriangle, 
  ThumbsUp, 
  PhoneCall, 
  Zap, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Radio, 
  Clock, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink,
  Car,
  Flame,
  ArrowRight
} from 'lucide-react';

interface AboutGuideProps {
  onNavigateTab: (tab: 'map' | 'incidents' | 'routes' | 'emergency') => void;
  onOpenReportModal: () => void;
}

export const AboutGuide: React.FC<AboutGuideProps> = ({
  onNavigateTab,
  onOpenReportModal
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    {
      stepNumber: '01',
      title: 'Scan the Live Road Radar',
      desc: 'Check the real-time interactive map before leaving home or office. Green lines indicate free flow (>50 km/h), amber shows heavy crawl, and pulsating red signals standstill gridlocks or accidents.',
      actionLabel: 'Open Live Radar',
      actionTab: 'map' as const,
      icon: MapPin,
      color: 'text-emerald-400'
    },
    {
      stepNumber: '02',
      title: 'Listen to Voice Radio Bulletins Hands-Free',
      desc: 'Driving alone? Tap the radio volume icon to launch the Traffic 96.1 FM Voice Digest. The system reads top road incidents aloud in clear road reporter style so you keep both hands on the wheel.',
      actionLabel: 'View Incident Feed',
      actionTab: 'incidents' as const,
      icon: Volume2,
      color: 'text-sky-400'
    },
    {
      stepNumber: '03',
      title: 'Calculate Smart Hold-Up Bypass Routes',
      desc: 'Stuck in a notorious commuting bottleneck (like Third Mainland Bridge or Nyanya-Mararaba)? The Smart Bypass tool calculates alternate detours with landmark-by-landmark cues that save 40+ minutes.',
      actionLabel: 'Calculate Bypass',
      actionTab: 'routes' as const,
      icon: Navigation,
      color: 'text-amber-400'
    },
    {
      stepNumber: '04',
      title: 'Report Road Wahala in 30 Seconds',
      desc: 'Spot an overturned container truck, broken-down Danfo bus, waterlogged puddle, or police checkpoint? Tap the "Report Road Wahala" button to alert other commuters with landmark tags and photo proof.',
      actionLabel: 'Make a Report',
      actionCustom: () => onOpenReportModal(),
      icon: AlertTriangle,
      color: 'text-rose-400'
    },
    {
      stepNumber: '05',
      title: 'Verify or Dispute Active Incidents',
      desc: 'Community trust powers NaijaTraffic. In the Incident Feed, tap "Na True 👍" to confirm an active blockage or "E don clear 👎" if LASTMA or tow trucks have cleared the lanes.',
      actionLabel: 'Check Incidents',
      actionTab: 'incidents' as const,
      icon: ThumbsUp,
      color: 'text-purple-400'
    },
    {
      stepNumber: '06',
      title: 'One-Tap Emergency Rescue Hotlines',
      desc: 'In case of road collisions, fuel tanker leakages, or medical emergencies, access toll-free speed dials for FRSC (122), Lagos Emergency (112 / 767), LASTMA Control, and Police Rapid Response Squad.',
      actionLabel: 'View Emergency Hotlines',
      actionTab: 'emergency' as const,
      icon: PhoneCall,
      color: 'text-rose-400'
    },
    {
      stepNumber: '07',
      title: 'Switch on Data Saver Mode on Weak Networks',
      desc: 'Experiencing slow 2G/3G connectivity or conserving mobile data? Toggle "Data Saver" at the top banner to swap heavy graphics for a streamlined, ultra-fast text bulletin.',
      actionLabel: 'Back to Radar',
      actionTab: 'map' as const,
      icon: Zap,
      color: 'text-emerald-400'
    }
  ];

  const faqs = [
    {
      question: 'How does NaijaTraffic get its real-time incident information?',
      answer: 'NaijaTraffic blends crowd-sourced reports from active Nigerian drivers, dispatch riders, and commuters with field alerts from official traffic agencies (FRSC, LASTMA, LASEMA). Every incident has a community verification score ("Na True" vs "E don clear") to prevent false alarms.'
    },
    {
      question: 'Are the emergency hotline numbers free of charge in Nigeria?',
      answer: 'Yes! FRSC (122) and Lagos State Emergency (112 / 767) are completely toll-free on all Nigerian mobile networks (MTN, Airtel, Glo, 9mobile) and can be dialed even with zero airtime balance.'
    },
    {
      question: 'Why are there Pidgin English summaries for incidents?',
      answer: 'Nigerian road commuting is dynamic, and informal road reporting (e.g., "Container truck don fall brush two Danfo after Adeniji...") provides instant, relatable clarity for commercial drivers and private motorists alike.'
    },
    {
      question: 'Which cities are currently supported?',
      answer: 'The system actively tracks primary expressways, bridges, and key bottlenecks in Lagos, Abuja (FCT), Port Harcourt (Rivers State), and Ibadan (Oyo State), with expansion to other major commercial corridors.'
    },
    {
      question: 'Does the application work in low data or offline mode?',
      answer: 'Yes. With the built-in "Data Saver" mode, radar queries are compressed into low-bandwidth text payloads (<1 KB per refresh) so you can receive life-saving road updates even in slow network patches.'
    }
  ];

  return (
    <div className="p-3 md:p-6 max-w-4xl mx-auto space-y-6">
      {/* About App Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-5 md:p-7 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                About NaijaTraffic Watch
              </h1>
              <p className="text-xs text-emerald-400 font-mono">
                Nigeria's Community-Powered Road Radar &amp; Rescue Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Active across 4 Major Metros</span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          NaijaTraffic Watch is an alert and navigation platform built explicitly for the infrastructural realities of Nigerian roads. From Lagos island-mainland bridge lockdowns and Lekki flash floods, to Abuja’s Nyanya military checkpoint queues and Port Harcourt’s Aba Road gridlocks, we empower motorists with real-time crowd-intelligence, intelligent detour routes, and instant emergency dispatch.
        </p>

        {/* Key Metrics / Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 font-mono">
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Coverage</span>
            <span className="text-base md:text-lg font-bold text-white">4 Cities</span>
            <span className="text-[10px] text-slate-400 block">Lagos, Abuja, PH, Ibadan</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Response Hotlines</span>
            <span className="text-base md:text-lg font-bold text-emerald-400">122 &amp; 112</span>
            <span className="text-[10px] text-slate-400 block">Toll-free FRSC &amp; LASEMA</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Voice Broadcast</span>
            <span className="text-base md:text-lg font-bold text-sky-400">96.1 FM</span>
            <span className="text-[10px] text-slate-400 block">Hands-free road digest</span>
          </div>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Verification</span>
            <span className="text-base md:text-lg font-bold text-amber-400">Na True / Clear</span>
            <span className="text-[10px] text-slate-400 block">Community crowd consensus</span>
          </div>
        </div>
      </div>

      {/* STEP-BY-STEP USER GUIDE SECTION */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>How to Use NaijaTraffic</span>
            <span className="text-xs font-normal text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              7-Step Guide
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Follow these practical steps to navigate traffic jams, avoid accidents, and help fellow commuters.
          </p>
        </div>

        <div className="space-y-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-4 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 flex-1">
                  <div className="flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      STEP {item.stepNumber}
                    </span>
                    <div className="mt-2 p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm md:text-base font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
                  <button
                    onClick={() => {
                      if (item.actionCustom) {
                        item.actionCustom();
                      } else if (item.actionTab) {
                        onNavigateTab(item.actionTab);
                      }
                    }}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm whitespace-nowrap"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* NIGERIAN ROAD CODE & SAFETY PROTOCOLS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
            Key Nigerian Road Safety Directives (FRSC &amp; LASTMA Rules)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-amber-300 block">Yellow Danfo Hazard Distance</span>
            <p className="text-slate-400 leading-relaxed">
              Always maintain at least two car lengths behind commercial buses near bus stops; they frequently slam brakes abruptly without directional signal lights.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-300 block">Rainy Season Island Commuting</span>
            <p className="text-slate-400 leading-relaxed">
              On Lekki-Epe expressway and Ahmadu Bello Way (Victoria Island), avoid the far right drain channels during rainstorms to prevent water intake into engine air filters.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-sky-300 block">BRT Dedicated Lane Prohibition</span>
            <p className="text-slate-400 leading-relaxed">
              In Lagos, driving private vehicles in red BRT lanes attracts heavy LASTMA penalties and impoundment unless officially diverted during multi-vehicle clearing.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-rose-300 block">Highway Breakdown Triangle Protocol</span>
            <p className="text-slate-400 leading-relaxed">
              If your vehicle stalls on expressways (Long Bridge, 3rd Mainland, or Airport Road), deploy C-Caution reflective triangles 45 meters behind the rear bumper immediately.
            </p>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-2 text-xs">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-3 text-left font-semibold text-slate-200 hover:text-white flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-emerald-400 shrink-0 rotate-180 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 transition-transform" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 pt-1 text-slate-400 border-t border-slate-800/80 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
        <h4 className="text-base font-bold text-white">Ready to hit the road?</h4>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Monitor your route on the Live Radar or calculate an alternate detour to bypass the morning hold-up.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <button
            onClick={() => onNavigateTab('map')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors cursor-pointer"
          >
            Launch Live Road Radar
          </button>
          <button
            onClick={() => onNavigateTab('routes')}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Explore Bypass Routes
          </button>
        </div>
      </div>
    </div>
  );
};
