import React, { useState, useEffect } from 'react';
import { City, IncidentReport, RoadCorridor } from './types/traffic';
import { INITIAL_CORRIDORS, INITIAL_INCIDENTS } from './data/nigerianRoads';
import { HeaderBar } from './components/HeaderBar';
import { BottomNavBar } from './components/BottomNavBar';
import { TrafficMap } from './components/TrafficMap';
import { IncidentFeed } from './components/IncidentFeed';
import { RouteNavigator } from './components/RouteNavigator';
import { EmergencyDirectory } from './components/EmergencyDirectory';
import { AboutGuide } from './components/AboutGuide';
import { ReportModal } from './components/ReportModal';
import { IncidentDetailModal } from './components/IncidentDetailModal';
import { AudioBulletin } from './components/AudioBulletin';
import { MobileFrame } from './components/MobileFrame';
import { DataSaverBanner } from './components/DataSaverBanner';
import { AlertOctagon, CheckCircle2, BellRing, X, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'incidents' | 'routes' | 'emergency' | 'about'>('map');
  const [selectedCity, setSelectedCity] = useState<City>('Lagos');
  const [corridors, setCorridors] = useState<RoadCorridor[]>(INITIAL_CORRIDORS);
  const [incidents, setIncidents] = useState<IncidentReport[]>(INITIAL_INCIDENTS);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);
  const [audioBulletinActive, setAudioBulletinActive] = useState<boolean>(false);
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(false);
  const [dataSaverMode, setDataSaverMode] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [liveToast, setLiveToast] = useState<string | null>(null);
  const [preselectedBypassCorridor, setPreselectedBypassCorridor] = useState<string | null>(null);

  // Periodic simulated live updates to make the road network feel truly live
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate slight speed fluctuations and occasional new report
      setCorridors(prev => prev.map(c => {
        if (c.status === 'standstill') {
          return {
            ...c,
            currentSpeedKmH: Math.max(5, Math.min(15, c.currentSpeedKmH + (Math.random() > 0.5 ? 1 : -1)))
          };
        }
        if (c.status === 'slow') {
          return {
            ...c,
            currentSpeedKmH: Math.max(20, Math.min(42, c.currentSpeedKmH + (Math.random() > 0.5 ? 2 : -2)))
          };
        }
        return c;
      }));
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLiveToast(`Refreshed ${selectedCity} road radar. 6 corridors verified.`);
      setTimeout(() => setLiveToast(null), 3000);
    }, 700);
  };

  const handleVote = (incidentId: string, type: 'up' | 'down') => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id !== incidentId) return inc;
      const alreadyVoted = inc.userVote === type;

      if (type === 'up') {
        return {
          ...inc,
          userVote: alreadyVoted ? null : 'up',
          verifiedCount: alreadyVoted ? inc.verifiedCount - 1 : inc.verifiedCount + 1,
          disputedCount: inc.userVote === 'down' ? Math.max(0, inc.disputedCount - 1) : inc.disputedCount
        };
      } else {
        return {
          ...inc,
          userVote: alreadyVoted ? null : 'down',
          disputedCount: alreadyVoted ? inc.disputedCount - 1 : inc.disputedCount + 1,
          verifiedCount: inc.userVote === 'up' ? Math.max(0, inc.verifiedCount - 1) : inc.verifiedCount
        };
      }
    }));

    if (selectedIncident && selectedIncident.id === incidentId) {
      setSelectedIncident(prev => prev ? {
        ...prev,
        userVote: prev.userVote === type ? null : type,
        verifiedCount: type === 'up' ? (prev.userVote === 'up' ? prev.verifiedCount - 1 : prev.verifiedCount + 1) : prev.verifiedCount,
        disputedCount: type === 'down' ? (prev.userVote === 'down' ? prev.disputedCount - 1 : prev.disputedCount + 1) : prev.disputedCount
      } : null);
    }

    setLiveToast(type === 'up' ? 'Report verified by you 👍' : 'Dispute logged - monitoring clearance 👎');
    setTimeout(() => setLiveToast(null), 2500);
  };

  const handleAddNewReport = (report: IncidentReport) => {
    setIncidents(prev => [report, ...prev]);

    // Update corridor status if matched
    setCorridors(prev => prev.map(c => {
      if (c.id === report.corridorId) {
        return {
          ...c,
          status: report.severity === 'critical' ? 'standstill' : 'heavy',
          incidentCount: c.incidentCount + 1,
          delayMinutes: c.delayMinutes + 25,
          currentSpeedKmH: Math.max(6, Math.floor(c.currentSpeedKmH * 0.6))
        };
      }
      return c;
    }));

    setLiveToast(`New alert added: ${report.title}`);
    setTimeout(() => setLiveToast(null), 3500);
  };

  const handleNavigateBypass = (corridorName: string) => {
    setPreselectedBypassCorridor(corridorName);
    setActiveTab('routes');
  };

  const activeCityIncidents = incidents.filter(i => i.city === selectedCity);

  return (
    <MobileFrame isDeviceFrame={isDeviceFrame} onToggleFrame={() => setIsDeviceFrame(!isDeviceFrame)}>
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 pb-16 md:pb-6">
        {/* Top Navigation Bar */}
        <HeaderBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          audioBulletinActive={audioBulletinActive}
          onToggleAudioBulletin={() => setAudioBulletinActive(!audioBulletinActive)}
          isDeviceFrame={isDeviceFrame}
          onToggleDeviceFrame={() => setIsDeviceFrame(!isDeviceFrame)}
          dataSaverMode={dataSaverMode}
          onToggleDataSaver={() => setDataSaverMode(!dataSaverMode)}
        />

        {/* Data Saver Mesh Banner */}
        <DataSaverBanner
          dataSaverMode={dataSaverMode}
          onToggleDataSaver={() => setDataSaverMode(!dataSaverMode)}
        />

        {/* Live Toast Notification Banner */}
        {liveToast && (
          <div className="fixed top-16 right-4 left-4 sm:left-auto sm:w-80 z-50 bg-emerald-500 text-slate-950 px-3.5 py-2.5 rounded-xl shadow-xl flex items-center justify-between gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 truncate">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="truncate">{liveToast}</span>
            </div>
            <button onClick={() => setLiveToast(null)} className="p-0.5 hover:opacity-75">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Body Content based on active tab */}
        <main className="flex-1">
          {activeTab === 'map' && (
            <>
              <TrafficMap
                city={selectedCity}
                corridors={corridors}
                incidents={incidents}
                onSelectIncident={(inc) => setSelectedIncident(inc)}
                onSelectRouteBypass={handleNavigateBypass}
                onRefresh={handleRefresh}
                isRefreshing={isRefreshing}
              />
              
              {/* Quick Guide Strip */}
              <div className="max-w-7xl mx-auto px-3 md:px-4 pb-2">
                <div 
                  onClick={() => setActiveTab('about')}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between gap-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300 font-medium">
                      First time on NaijaTraffic? Read our 7-step guide to avoiding hold-up
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold shrink-0">
                    View Guide →
                  </span>
                </div>
              </div>
            </>
          )}

          {activeTab === 'incidents' && (
            <IncidentFeed
              city={selectedCity}
              incidents={incidents}
              onVote={handleVote}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onSelectOnMap={(inc) => {
                setSelectedIncident(inc);
                setActiveTab('map');
              }}
            />
          )}

          {activeTab === 'routes' && (
            <RouteNavigator
              city={selectedCity}
              incidents={incidents}
              preselectedCorridor={preselectedBypassCorridor}
            />
          )}

          {activeTab === 'emergency' && (
            <EmergencyDirectory city={selectedCity} />
          )}

          {activeTab === 'about' && (
            <AboutGuide
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          )}
        </main>

        {/* Radio Broadcast Live Digest Panel */}
        <AudioBulletin
          city={selectedCity}
          incidents={incidents}
          isOpen={audioBulletinActive}
          onClose={() => setAudioBulletinActive(false)}
        />

        {/* Incident Detail / Inspection Bottom Sheet */}
        <IncidentDetailModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onVote={handleVote}
          onNavigateBypass={handleNavigateBypass}
        />

        {/* Community Incident Report Modal */}
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={handleAddNewReport}
          city={selectedCity}
          corridors={corridors}
        />

        {/* Mobile Fixed Bottom Navigation Bar */}
        <BottomNavBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          incidentCount={activeCityIncidents.length}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />
      </div>
    </MobileFrame>
  );
}
