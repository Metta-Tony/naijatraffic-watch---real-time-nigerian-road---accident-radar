import { RoadCorridor, IncidentReport, EmergencyContact, City } from '../types/traffic';

export const INITIAL_CORRIDORS: RoadCorridor[] = [
  // LAGOS CORRIDORS
  {
    id: 'lag-tmb-inbound',
    name: 'Third Mainland Bridge (Inward Island)',
    city: 'Lagos',
    direction: 'Mainland -> Victoria Island / Ikoyi',
    status: 'standstill',
    currentSpeedKmH: 8,
    normalSpeedKmH: 80,
    delayMinutes: 65,
    incidentCount: 2,
    svgPath: 'M 180 80 Q 240 140 280 230 T 310 320',
    startPoint: [180, 80],
    endPoint: [310, 320],
    lastUpdated: '2 mins ago',
    alternateRoute: 'Divert through Ikorodu Road -> Eko Bridge via Costain bypass.',
    popularLandmarks: ['Oworonshoki', 'Adekunle Ramp', 'Adeniji Adele', 'Obalende']
  },
  {
    id: 'lag-tmb-outbound',
    name: 'Third Mainland Bridge (Outward Mainland)',
    city: 'Lagos',
    direction: 'Island -> Oworonshoki / Berger',
    status: 'slow',
    currentSpeedKmH: 35,
    normalSpeedKmH: 80,
    delayMinutes: 20,
    incidentCount: 1,
    svgPath: 'M 320 320 Q 290 230 250 140 T 190 80',
    startPoint: [320, 320],
    endPoint: [190, 80],
    lastUpdated: '5 mins ago',
    alternateRoute: 'Carter Bridge via Iddo to Otto corridor is moving faster.',
    popularLandmarks: ['Adeniji Adele', 'Ilubirin', 'Odo Iya Alaro', 'Oworonshoki']
  },
  {
    id: 'lag-lekki-epe',
    name: 'Lekki - Epe Expressway',
    city: 'Lagos',
    direction: 'Lekki Toll Gate <-> Ajah Roundabout',
    status: 'heavy',
    currentSpeedKmH: 15,
    normalSpeedKmH: 60,
    delayMinutes: 45,
    incidentCount: 3,
    svgPath: 'M 310 330 Q 360 360 420 380 T 480 400',
    startPoint: [310, 330],
    endPoint: [480, 400],
    lastUpdated: '3 mins ago',
    alternateRoute: 'Take Regional Road / Freedom Way via Ikate bypass.',
    popularLandmarks: ['Admiralty Circle Toll', 'Marwa', 'Jakande Roundabout', 'Chevron', 'VGC', 'Ajah']
  },
  {
    id: 'lag-ikorodu-rd',
    name: 'Ikorodu Road Corridor',
    city: 'Lagos',
    direction: 'Mile 12 <-> Ojota <-> Fadeyi',
    status: 'slow',
    currentSpeedKmH: 28,
    normalSpeedKmH: 70,
    delayMinutes: 25,
    incidentCount: 1,
    svgPath: 'M 160 50 L 170 120 L 190 190 L 210 260',
    startPoint: [160, 50],
    endPoint: [210, 260],
    lastUpdated: '1 min ago',
    alternateRoute: 'Use Service Lane through Maryland - Anthony Village.',
    popularLandmarks: ['Mile 12', 'Ketu', 'Ojota interchange', 'Maryland', 'Palmgrove', 'Fadeyi']
  },
  {
    id: 'lag-berger-express',
    name: 'Berger - Long Bridge (Lagos-Ibadan)',
    city: 'Lagos',
    direction: 'Berger Bus Stop <-> Kara Cattle Market',
    status: 'heavy',
    currentSpeedKmH: 12,
    normalSpeedKmH: 90,
    delayMinutes: 50,
    incidentCount: 2,
    svgPath: 'M 140 20 L 160 50 L 170 80',
    startPoint: [140, 20],
    endPoint: [170, 80],
    lastUpdated: '4 mins ago',
    alternateRoute: 'Stick to center lanes; avoid inner shoulder near Kara turn-off.',
    popularLandmarks: ['Berger Pedestrian Bridge', 'Kara Market', 'OPIC', 'Warewa']
  },
  {
    id: 'lag-ojuelegba',
    name: 'Ojuelegba - Funsho Williams Ave',
    city: 'Lagos',
    direction: 'Stadium <-> Costain <-> Eko Bridge',
    status: 'free',
    currentSpeedKmH: 52,
    normalSpeedKmH: 60,
    delayMinutes: 5,
    incidentCount: 0,
    svgPath: 'M 190 190 L 220 250 L 250 290',
    startPoint: [190, 190],
    endPoint: [250, 290],
    lastUpdated: '6 mins ago',
    alternateRoute: 'Direct clear route onto Island via Eko Bridge.',
    popularLandmarks: ['Ojuelegba Underbridge', 'National Stadium', 'Barracks', 'Costain']
  },

  // ABUJA CORRIDORS
  {
    id: 'abj-nyanya-mararaba',
    name: 'Nyanya - Kugbo - Mararaba Expressway',
    city: 'Abuja',
    direction: 'Mararaba border <-> AYA Roundabout',
    status: 'standstill',
    currentSpeedKmH: 6,
    normalSpeedKmH: 70,
    delayMinutes: 75,
    incidentCount: 2,
    svgPath: 'M 120 220 Q 200 240 290 250 T 420 260',
    startPoint: [120, 220],
    endPoint: [420, 260],
    lastUpdated: '3 mins ago',
    alternateRoute: 'Use Karshi - Apo road extension if traveling from deeper Nasarawa.',
    popularLandmarks: ['Mararaba Junction', 'Nyanya Bridge', 'Kugbo Military Checkpoint', 'AYA']
  },
  {
    id: 'abj-airport-rd',
    name: 'Umaru Yar’Adua Way (Airport Road)',
    city: 'Abuja',
    direction: 'Nnamdi Azikiwe Airport <-> City Gate',
    status: 'free',
    currentSpeedKmH: 82,
    normalSpeedKmH: 90,
    delayMinutes: 0,
    incidentCount: 0,
    svgPath: 'M 90 340 L 180 280 L 260 210',
    startPoint: [90, 340],
    endPoint: [260, 210],
    lastUpdated: '10 mins ago',
    alternateRoute: 'Smooth expressway. Maintain speed limit of 90 km/h.',
    popularLandmarks: ['Airport Toll', 'Lugbe Federal Housing', 'Games Village', 'City Gate']
  },
  {
    id: 'abj-kubwa-express',
    name: 'Kubwa - Zuba Expressway',
    city: 'Abuja',
    direction: 'Kubwa <-> Gwarinpa <-> Katampe',
    status: 'slow',
    currentSpeedKmH: 40,
    normalSpeedKmH: 80,
    delayMinutes: 18,
    incidentCount: 1,
    svgPath: 'M 80 80 Q 150 140 230 180',
    startPoint: [80, 80],
    endPoint: [230, 180],
    lastUpdated: '8 mins ago',
    alternateRoute: 'Divert through Gwarinpa 3rd Avenue to bypass pedestrian bridge works.',
    popularLandmarks: ['Dutse Junction', 'Kubwa 2-1 Gate', 'Gwarinpa Roundabout', 'Katampe Hill']
  },

  // PORT HARCOURT CORRIDORS
  {
    id: 'ph-aba-road',
    name: 'Port Harcourt - Aba Road Corridor',
    city: 'Port Harcourt',
    direction: 'Artillery <-> Waterlines <-> Garrison',
    status: 'heavy',
    currentSpeedKmH: 14,
    normalSpeedKmH: 60,
    delayMinutes: 40,
    incidentCount: 2,
    svgPath: 'M 100 150 Q 220 180 340 220 T 420 280',
    startPoint: [100, 150],
    endPoint: [420, 280],
    lastUpdated: '5 mins ago',
    alternateRoute: 'Use Stadium Road connecting into Elekahia bypass.',
    popularLandmarks: ['Artillery Junction', 'Waterlines', 'Garrison Flyover', 'Airforce Base']
  },
  {
    id: 'ph-rumuokoro',
    name: 'Rumuokoro Flyover - Choba Axis',
    city: 'Port Harcourt',
    direction: 'Rumuokoro Roundabout <-> Uniport campus',
    status: 'slow',
    currentSpeedKmH: 22,
    normalSpeedKmH: 55,
    delayMinutes: 22,
    incidentCount: 1,
    svgPath: 'M 140 260 L 260 270 L 380 290',
    startPoint: [140, 260],
    endPoint: [380, 290],
    lastUpdated: '12 mins ago',
    alternateRoute: 'Follow East-West Road service lane toward Nkpolu.',
    popularLandmarks: ['Rumuokoro Market', 'Nkpolu', 'Choba Bridge']
  },

  // IBADAN CORRIDORS
  {
    id: 'ib-iwo-road',
    name: 'Iwo Road Interchange & Ring Road',
    city: 'Ibadan',
    direction: 'Ojoo <-> Iwo Road <-> Challenge',
    status: 'heavy',
    currentSpeedKmH: 18,
    normalSpeedKmH: 65,
    delayMinutes: 35,
    incidentCount: 1,
    svgPath: 'M 110 90 Q 220 180 310 240 T 390 340',
    startPoint: [110, 90],
    endPoint: [390, 340],
    lastUpdated: '7 mins ago',
    alternateRoute: 'Route through New Ife Road bypass toward Agodi Gate.',
    popularLandmarks: ['Iwo Road Flyover', 'Agodi Gate', 'Bodija', 'Challenge']
  }
];

export const INITIAL_INCIDENTS: IncidentReport[] = [
  {
    id: 'inc-001',
    title: 'Multi-Vehicle Collision & Overturned Container',
    corridorId: 'lag-tmb-inbound',
    corridorName: 'Third Mainland Bridge (Inward Island)',
    city: 'Lagos',
    type: 'accident',
    severity: 'critical',
    description: '40ft Mack container truck lost brakes and brushed 2 yellow commercial buses (Danfo) just after Adeniji Adele ramp. Emergency recovery trucks currently blocking 2 out of 3 lanes.',
    pidginSummary: 'Container truck don fall brush two Danfo after Adeniji Adele! Two lanes don block kpatakpata. LASTMA and LRU tow truck dey ground dey clear am.',
    landmark: 'Just past Adeniji Adele descent toward Obalende',
    direction: 'Inward Island',
    reportedAgoMinutes: 6,
    timestamp: '10:48 AM',
    verifiedCount: 47,
    disputedCount: 2,
    reporterName: 'Engr. Femi Alabi',
    reporterRole: 'Driver',
    coords: [280, 230],
    hasPhoto: true,
    photoUrl: '/src/assets/images/lagos_traffic_skyline_1791191737287.jpg'
  },
  {
    id: 'inc-002',
    title: 'Severe Flash Flooding & Stranded Saloon Cars',
    corridorId: 'lag-lekki-epe',
    corridorName: 'Lekki - Epe Expressway',
    city: 'Lagos',
    type: 'flooding',
    severity: 'severe',
    description: 'Heavy downpour has submerged the road around Jakande roundabout and Chevron access. Water level knee-high on the right lane; small sedans stalling in middle.',
    pidginSummary: 'Water don full road for Jakande roundabout reach Chevron! Saloon cars dey quench engine. If your motor low, avoid that side now o.',
    landmark: 'Jakande Roundabout near Circle Mall',
    direction: 'Both Directions',
    reportedAgoMinutes: 14,
    timestamp: '10:40 AM',
    verifiedCount: 38,
    disputedCount: 1,
    reporterName: 'Chidera Okafor',
    reporterRole: 'Commuter',
    coords: [360, 360],
    hasPhoto: false
  },
  {
    id: 'inc-003',
    title: 'Broken Down Tanker Leaking Diesel',
    corridorId: 'lag-berger-express',
    corridorName: 'Berger - Long Bridge (Lagos-Ibadan)',
    city: 'Lagos',
    type: 'breakdown',
    severity: 'critical',
    description: 'Loaded 33,000L petrol tanker suffered broken axle on Long Bridge near Kara cattle market. Fire service and FRSC cordoning off the section. Outward traffic crawled to a halt.',
    pidginSummary: 'Tanker break axle for Long Bridge near Kara! Fuel dey drip small, Fire Service and Road Safety don block the lane make wahala no happen.',
    landmark: 'Long Bridge, 500m before Kara Cattle Market',
    direction: 'Outward Lagos to Sagamu/Ibadan',
    reportedAgoMinutes: 22,
    timestamp: '10:32 AM',
    verifiedCount: 63,
    disputedCount: 3,
    reporterName: 'Commander J. Balogun',
    reporterRole: 'FRSC Marshall',
    coords: [150, 40],
    hasPhoto: false
  },
  {
    id: 'inc-004',
    title: 'Intense Kugbo Hill Checkpoint Gridlock',
    corridorId: 'abj-nyanya-mararaba',
    corridorName: 'Nyanya - Kugbo - Mararaba Expressway',
    city: 'Abuja',
    type: 'enforcement',
    severity: 'severe',
    description: 'Joint security stop-and-search combined with commercial vehicle inspection at Kugbo military post causing over 5km tailback reaching Nyanya bridge.',
    pidginSummary: 'Hold-up don tie Nyanya people again for Kugbo Hill! Soldiers and VIO dey check motors one by one. Over 1 hour delay.',
    landmark: 'Kugbo Hill before Army checkpoint',
    direction: 'Inward Central Area / AYA',
    reportedAgoMinutes: 30,
    timestamp: '10:24 AM',
    verifiedCount: 89,
    disputedCount: 2,
    reporterName: 'Usman Garba',
    reporterRole: 'Driver',
    coords: [240, 245],
    hasPhoto: false
  },
  {
    id: 'inc-005',
    title: 'BRT Lane Breakdown & Spillover',
    corridorId: 'lag-ikorodu-rd',
    corridorName: 'Ikorodu Road Corridor',
    city: 'Lagos',
    type: 'breakdown',
    severity: 'moderate',
    description: 'Blue Primo BRT bus with flat dual rear tire halted at Ojota interchange. Private vehicles encroaching the main expressway causing 25 min slow crawl.',
    pidginSummary: 'BRT bus pack well for Ojota! People dey crowd pass through main expressway so go-slow don start to build up.',
    landmark: 'Ojota Underbridge inward Maryland',
    direction: 'Inward Yaba / CMS',
    reportedAgoMinutes: 45,
    timestamp: '10:09 AM',
    verifiedCount: 24,
    disputedCount: 0,
    reporterName: 'Babatunde LASTMA 44',
    reporterRole: 'LASTMA Official',
    coords: [180, 150],
    hasPhoto: false
  },
  {
    id: 'inc-006',
    title: 'Artillery Drainage Reconstruction Works',
    corridorId: 'ph-aba-road',
    corridorName: 'Port Harcourt - Aba Road Corridor',
    city: 'Port Harcourt',
    type: 'construction',
    severity: 'moderate',
    description: 'Rivers State Ministry of Works excavating drainage channels near Artillery junction. One lane diverted onto service road.',
    pidginSummary: 'Dem dey dig gutters for Artillery junction. Road squeeze enter one lane. Small hold-up dey there.',
    landmark: 'Artillery Junction near Zenith Bank',
    direction: 'Inward Garrison',
    reportedAgoMinutes: 55,
    timestamp: '9:59 AM',
    verifiedCount: 19,
    disputedCount: 1,
    reporterName: 'Tamuno Briggs',
    reporterRole: 'Dispatch Rider',
    coords: [260, 200],
    hasPhoto: false
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-1',
    name: 'Federal Road Safety Corps (FRSC)',
    acronym: 'FRSC',
    category: 'Rescue',
    phone: '122',
    tollFree: '122',
    city: 'All',
    responseTime: '~10 - 18 mins',
    description: 'Federal emergency rescue corps for nationwide highway accidents, tanker fire response, and clearance operations.'
  },
  {
    id: 'em-2',
    name: 'Lagos State Emergency Management Agency',
    acronym: 'LASEMA (LRU)',
    category: 'Rescue',
    phone: '112',
    tollFree: '767',
    city: 'Lagos',
    responseTime: '~8 - 15 mins',
    description: 'Specialized heavy duty cranes, mobile paramedics, fire response, and road extrication team across Lagos State.'
  },
  {
    id: 'em-3',
    name: 'Lagos State Traffic Management Authority',
    acronym: 'LASTMA Control',
    category: 'Traffic Control',
    phone: '+234 802 922 8292',
    city: 'Lagos',
    responseTime: '~12 - 20 mins',
    description: 'Lagos traffic regulation, towing of broken down trucks, clearance of yellow Danfo impasses, and signal control.'
  },
  {
    id: 'em-4',
    name: 'Nigeria Police Rapid Response Squad (RRS)',
    acronym: 'RRS / Highway Patrol',
    category: 'Police',
    phone: '+234 905 395 0347',
    tollFree: '112',
    city: 'All',
    responseTime: '~15 mins',
    description: 'Armed highway security escort, anti-robbery response during stationary gridlocks, and scene securing.'
  },
  {
    id: 'em-5',
    name: 'National Emergency Management Agency',
    acronym: 'NEMA Nigeria',
    category: 'Rescue',
    phone: '+234 800 2255 6362',
    city: 'All',
    responseTime: '~20 mins',
    description: 'National disaster coordination, massive bridge collapse or fuel tanker explosion relief and evacuation.'
  }
];

export const PRESET_ROUTES: {
  origin: string;
  destination: string;
  city: City;
  corridor: string;
  routes: {
    recommended: {
      name: string;
      via: string;
      time: string;
      delay: string;
      distance: string;
      status: string;
      highlights: string[];
    };
    congested: {
      name: string;
      via: string;
      time: string;
      delay: string;
      distance: string;
      status: string;
      issues: string[];
    };
  };
}[] = [
  {
    origin: 'Berger Bus Stop (Mainland)',
    destination: 'Victoria Island / CMS',
    city: 'Lagos',
    corridor: 'Third Mainland vs Eko Bridge',
    routes: {
      recommended: {
        name: 'Smart Mainland Bypass',
        via: 'Ikorodu Road -> Jibowu -> Eko Bridge',
        time: '52 mins',
        delay: '+10 mins',
        distance: '24.2 km',
        status: 'Moving steadily',
        highlights: [
          'Bypasses Adeniji Adele container accident on 3rd Mainland',
          'Smooth ascent at Costain into Marina',
          'Saves 48 minutes over regular route'
        ]
      },
      congested: {
        name: 'Direct Third Mainland Bridge',
        via: 'Oworonshoki -> Adekunle -> Obalende',
        time: '1 hr 45 mins',
        delay: '+65 mins',
        distance: '21.8 km',
        status: 'Gridlock / Accident at Adeniji',
        issues: [
          'Broken container truck blocking 2 lanes at Adeniji Adele',
          'Heavy bumper-to-bumper queue starting from Adekunle ramp'
        ]
      }
    }
  },
  {
    origin: 'Lekki Phase 1 Gate',
    destination: 'Ikeja City Mall (Alausa)',
    city: 'Lagos',
    corridor: 'Lekki-Ikoyi Link vs Ozumba',
    routes: {
      recommended: {
        name: 'Ikoyi Link & Eko Bridge Express',
        via: 'Lekki-Ikoyi Link Bridge -> Alfred Rewane -> Third Mainland outbound',
        time: '44 mins',
        delay: '+8 mins',
        distance: '27.4 km',
        status: 'Smooth flow outbound',
        highlights: [
          'Third Mainland outbound (Island to Mainland) is moving freely at 65 km/h',
          'Easy transition from Oworonshoki onto Anthony - Maryland'
        ]
      },
      congested: {
        name: 'Ozumba Mbadiwe -> Costain Axis',
        via: 'Bonny Camp -> Stadium -> Ojuelegba',
        time: '1 hr 20 mins',
        delay: '+38 mins',
        distance: '28.9 km',
        status: 'Flooding & bottle-neck delay',
        issues: [
          'Flooding puddles at Bonny Camp roundabout',
          'Danfo loading bottleneck at Barracks'
        ]
      }
    }
  },
  {
    origin: 'Mararaba / Nyanya (Nasarawa border)',
    destination: 'Federal Secretariat / CBD Abuja',
    city: 'Abuja',
    corridor: 'Kugbo Hill Axis',
    routes: {
      recommended: {
        name: 'Karshi - Apo Express Bypass',
        via: 'Karshi Road -> Apo Resettlement -> Area 11',
        time: '48 mins',
        delay: '+12 mins',
        distance: '32.1 km',
        status: 'Free bypass',
        highlights: [
          'Completely bypasses military checkpoints at Kugbo hill',
          'Wide dual carriageway entering through Apo roundabout'
        ]
      },
      congested: {
        name: 'Regular Nyanya - AYA Highway',
        via: 'Nyanya Bridge -> Kugbo Hill -> AYA',
        time: '1 hr 55 mins',
        delay: '+75 mins',
        distance: '18.6 km',
        status: 'Standstill checkpoint queue',
        issues: [
          'Military checkpoint stopping vehicles one-by-one',
          'Over 6km queue reaching beyond Mararaba bridge'
        ]
      }
    }
  }
];

export const NIGERIAN_TRAFFIC_TIPS = [
  {
    title: 'Danfo Stop Rule',
    tip: 'Never tail a yellow commercial bus too closely near major junctions (Ojota, Oshodi, Berger); they brake without hazard lights to pick passengers.'
  },
  {
    title: 'Rainy Season & Lekki Axis',
    tip: 'During heavy rain, always take center lanes on Lekki-Epe expressway and Ahmadu Bello Way to avoid waterlogged outer channels that stall smaller engines.'
  },
  {
    title: 'Fuel Station Spillover',
    tip: 'Watch out for sudden right-lane bottlenecks near NNPC mega stations where queues spill into the fast lane.'
  },
  {
    title: 'FRSC & LASTMA Checkpoints',
    tip: 'Ensure your valid driver’s license, fire extinguisher, and reflective triangle are in the car to prevent unnecessary delays at inspection points.'
  }
];
