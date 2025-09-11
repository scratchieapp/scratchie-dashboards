import type { ConvoCard, SiteConvoCardSummary, CompanyConvoCardSummary } from '../types/convoCard';

// Site-level mock data (McDonald's Chisholm)
export const siteConvoCards: ConvoCard[] = [
  {
    id: 'card-1',
    description: 'Scaffolding joint appears loose, significant movement when workers climb. Risk of collapse.',
    location: 'Level 3 East',
    reportedBy: 'Jake Thompson',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    safetyStatus: 'NOT_SAFE_TO_WORK',
    status: 'open',
    photoCount: 3,
    hasVoiceNote: true,
    integrationTarget: 'HammerTech',
    iconEmoji: '⚠️'
  },
  {
    id: 'card-2',
    description: 'Exposed live wiring found behind damaged panel. Area needs immediate isolation.',
    location: 'Storage B12',
    reportedBy: 'Maria Chen',
    timestamp: new Date(Date.now() - 19 * 60 * 1000), // 19 minutes ago
    safetyStatus: 'NOT_SAFE_TO_WORK',
    status: 'closed',
    photoCount: 2,
    hasVoiceNote: false,
    integrationTarget: 'HammerTech',
    closedBy: 'M. Chen',
    closedAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    iconEmoji: '⚡'
  },
  {
    id: 'card-3',
    description: 'New chemical containers delivered. No MSDS sheets visible. Not sure about proper storage requirements.',
    location: 'Chemical Storage',
    reportedBy: 'Tom Williams',
    timestamp: new Date(Date.now() - 42 * 60 * 1000), // 42 minutes ago
    safetyStatus: 'I_DONT_KNOW',
    status: 'needs_review',
    photoCount: 1,
    hasVoiceNote: false,
    iconEmoji: '❓'
  },
  {
    id: 'card-4',
    description: 'Morning inspection complete. All safety barriers in place, signage visible, PPE station stocked.',
    location: 'Main Entrance',
    reportedBy: 'Sarah Johnson',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    safetyStatus: 'SAFE_TO_WORK',
    status: 'accepted',
    photoCount: 4,
    hasVoiceNote: false,
    iconEmoji: '✓'
  },
  {
    id: 'card-5',
    description: 'Spill on kitchen floor near fryer station. Already cleaned but floor may be slippery.',
    location: 'Kitchen - Fryer Station',
    reportedBy: 'David Miller',
    timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
    safetyStatus: 'SAFE_TO_WORK',
    status: 'accepted',
    photoCount: 2,
    hasVoiceNote: false,
    iconEmoji: '🧽'
  },
  {
    id: 'card-6',
    description: 'Fire extinguisher missing from break room wall mount. Need replacement urgently.',
    location: 'Break Room',
    reportedBy: 'Lisa Park',
    timestamp: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
    safetyStatus: 'NOT_SAFE_TO_WORK',
    status: 'open',
    photoCount: 1,
    hasVoiceNote: false,
    iconEmoji: '🧯'
  }
];

export const siteConvoCardSummary: SiteConvoCardSummary = {
  siteName: 'McDonald\'s Chisholm',
  unclosedCritical: 1,
  needsReview: 5,
  safeToWork: 43,
  responseRate: 87,
  status: 'warning',
  lastUpdated: new Date(Date.now() - 15 * 60 * 1000),
  summary: '1 unclosed critical: unstable scaffolding at Level 3 East. Electrical issue in storage resolved at 7:15 AM. PPE compliance trending down in concrete pour area.'
};

// Company-level mock data
export const companyConvoCards: SiteConvoCardSummary[] = [
  {
    siteName: 'Brisbane Site',
    unclosedCritical: 1,
    needsReview: 5,
    safeToWork: 43,
    responseRate: 87,
    status: 'warning',
    lastUpdated: new Date(),
    summary: '1 unclosed critical: unstable scaffolding at Level 3 East. Electrical issue in storage resolved at 7:15 AM. PPE compliance trending down in concrete pour area.'
  },
  {
    siteName: 'Sydney West',
    unclosedCritical: 2,
    needsReview: 8,
    safeToWork: 67,
    responseRate: 91,
    status: 'critical',
    lastUpdated: new Date(),
    summary: '2 critical issues: crane zone breach and missing fall protection. High engagement but concerning safety patterns emerging.'
  },
  {
    siteName: 'Melbourne Central',
    unclosedCritical: 0,
    needsReview: 3,
    safeToWork: 89,
    responseRate: 94,
    status: 'normal',
    lastUpdated: new Date(),
    summary: 'Excellent safety performance. All critical issues resolved within 30 minutes. Strong worker engagement and proactive reporting.'
  },
  {
    siteName: 'Perth North',
    unclosedCritical: 0,
    needsReview: 2,
    safeToWork: 76,
    responseRate: 88,
    status: 'normal',
    lastUpdated: new Date(),
    summary: 'Stable safety metrics. Recent improvement in PPE compliance following targeted recognition program.'
  },
  {
    siteName: 'Adelaide South',
    unclosedCritical: 0,
    needsReview: 4,
    safeToWork: 82,
    responseRate: 92,
    status: 'normal',
    lastUpdated: new Date(),
    summary: 'Good safety culture. Proactive hazard identification trending upward. Night shift showing exemplary performance.'
  }
];

export const companyConvoCardSummary: CompanyConvoCardSummary = {
  totalCardsToday: 412,
  unclosedCritical: 3,
  unclosedCriticalTotal: 5,
  safeToWorkRate: 89,
  sitesNeedAttention: 2,
  responseCompliance: 92,
  lastUpdated: new Date(),
  executiveSummary: '3 unclosed critical safety issues require immediate attention at Brisbane (1) and Sydney West (2) sites. 2 critical issues were successfully closed this morning. Common pattern detected: scaffolding-related issues across multiple sites suggest need for company-wide scaffolding safety review. Night shift operations showing exemplary safety performance with zero incidents across all locations for the past week. Recommend immediate scaffolding audit protocol and recognition program for night shift teams.',
  criticalIssues: [
    {
      site: 'Brisbane Site',
      description: 'Scaffolding at Level 3 East - unstable joint, risk of collapse',
      reportedAt: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      site: 'Sydney West',
      description: 'Crane operation zone breach - workers entered restricted area',
      reportedAt: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
      site: 'Sydney West',
      description: 'Missing fall protection on roof work area - harness points not installed',
      reportedAt: new Date(Date.now() - 5 * 60 * 1000)
    }
  ]
};