export type City = 'Lagos' | 'Abuja' | 'Port Harcourt' | 'Ibadan';

export type IncidentType = 
  | 'accident'
  | 'gridlock'
  | 'breakdown'
  | 'flooding'
  | 'enforcement'
  | 'construction'
  | 'fuel_queue';

export type Severity = 'critical' | 'severe' | 'moderate' | 'cleared';

export type TrafficStatus = 'free' | 'slow' | 'heavy' | 'standstill';

export interface RoadCorridor {
  id: string;
  name: string;
  city: City;
  direction: string;
  status: TrafficStatus;
  currentSpeedKmH: number;
  normalSpeedKmH: number;
  delayMinutes: number;
  incidentCount: number;
  svgPath: string; // for map rendering
  startPoint: [number, number];
  endPoint: [number, number];
  lastUpdated: string;
  alternateRoute: string;
  popularLandmarks: string[];
}

export interface IncidentReport {
  id: string;
  title: string;
  corridorId: string;
  corridorName: string;
  city: City;
  type: IncidentType;
  severity: Severity;
  description: string;
  pidginSummary: string;
  landmark: string;
  direction: string;
  reportedAgoMinutes: number;
  timestamp: string;
  verifiedCount: number;
  disputedCount: number;
  userVote?: 'up' | 'down' | null;
  reporterName: string;
  reporterRole: 'Driver' | 'LASTMA Official' | 'FRSC Marshall' | 'Dispatch Rider' | 'Commuter';
  hasPhoto?: boolean;
  photoUrl?: string;
  coords: [number, number];
}

export interface EmergencyContact {
  id: string;
  name: string;
  acronym: string;
  category: 'Rescue' | 'Traffic Control' | 'Police' | 'Towing';
  phone: string;
  tollFree?: string;
  city: 'All' | City;
  responseTime: string;
  description: string;
}

export interface RouteOption {
  id: string;
  name: string;
  via: string;
  durationMinutes: number;
  distanceKm: number;
  trafficLevel: 'Low' | 'Moderate' | 'Heavy' | 'Standstill';
  delayMinutes: number;
  isRecommended: boolean;
  warnings: string[];
  steps: string[];
}
