import type { ConvoCard, SiteConvoCardSummary, CompanyConvoCardSummary } from '../types/convoCard';

// Site-level mock data (McDonald's Chisholm)
export const siteConvoCards: ConvoCard[] = [
  {
    id: 'card-1',
    description: 'Scaffolding joint appears loose, significant movement when workers climb. Risk of collapse.',
    location: 'Level 3 East',
    reportedBy: ['Jake Thompson', 'Mike Wilson'],
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    safetyStatus: 'NOT_SAFE_TO_WORK',
    status: 'open',
    photoCount: 3,
    photoUrls: [
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600',
      'https://images.unsplash.com/photo-1527004760902-f5681c5e5f3d?w=800&h=600'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=200&h=200&fit=crop',
    hasVoiceNote: true,
    voiceNoteUrl: '/audio/safety-concern-1.mp3',
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
    photoUrls: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600',
      'https://images.unsplash.com/photo-1565608087341-404b25492fee?w=800&h=600'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
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
    photoUrls: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop',
    hasVoiceNote: false,
    iconEmoji: '❓'
  },
  {
    id: 'card-4',
    description: 'Morning inspection complete. All safety barriers in place, signage visible, PPE station stocked.',
    location: 'Main Entrance',
    reportedBy: ['Sarah Johnson', 'Alex Rodriguez', 'Emma Davis'],
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    safetyStatus: 'SAFE_TO_WORK',
    status: 'accepted',
    photoCount: 4,
    photoUrls: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc31?w=800&h=600',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc31?w=800&h=600',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc31?w=800&h=600',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc31?w=800&h=600'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc31?w=200&h=200&fit=crop',
    hasVoiceNote: false,
    iconEmoji: '✓',
    isRewarded: true
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
    photoUrls: [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600',
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600'
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop',
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
    photoUrls: ['https://images.unsplash.com/photo-1555992643-3eec6a2af61b?w=800&h=600'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1555992643-3eec6a2af61b?w=200&h=200&fit=crop',
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

// LLM-generated summaries for the Site ConvoCards
export const siteDailySummary = `**Today's Safety Insights at McDonald's Chisholm**

Our team demonstrated excellent safety awareness today with 49 total ConvoCards submitted. The standout theme is proactive hazard identification, with workers actively reporting potential issues before they escalate.

**Key Highlights:**
• **Morning Excellence**: Sarah Johnson's comprehensive entrance inspection set a positive tone for the day, ensuring all safety barriers and PPE stations were properly stocked
• **Quick Response**: The electrical hazard in Storage B12 was identified and resolved within 37 minutes, showcasing effective incident management
• **Team Vigilance**: Multiple reports about the scaffolding issue demonstrate our culture of looking out for each other

**Areas Requiring Attention:**
• **Critical**: Level 3 East scaffolding requires immediate structural assessment - multiple workers have reported movement concerns
• **Process Improvement**: Chemical storage protocols need clarification following MSDS sheet confusion

**Positive Trends:**
The kitchen team continues to excel in maintaining cleanliness standards, with proactive spill reporting preventing potential slip hazards. Our response rate of 87% shows strong engagement across all shifts.

**Tomorrow's Focus**: Schedule scaffolding inspection and conduct brief chemical storage safety refresher during morning huddle.`;

export const siteWeeklySummary = `**Weekly Safety Review: McDonald's Chisholm**

This week marked a significant improvement in our safety culture with 312 ConvoCards submitted - a 23% increase from last week. The team's commitment to hazard identification and prevention is clearly strengthening.

**Week's Achievements:**
• **Zero Lost Time**: No incidents resulted in lost work time, maintaining our 45-day streak
• **Rapid Resolution**: Average critical issue resolution time decreased to 28 minutes (down from 41 minutes last week)
• **Engagement Growth**: New team members are actively participating, with 6 first-time ConvoCard submissions

**Recurring Themes:**
• **Kitchen Safety**: Consistent excellence in spill reporting and equipment maintenance
• **PPE Compliance**: Slight dip in break room area - addressed through targeted reminders
• **Equipment Concerns**: Scaffolding and maintenance equipment flagged multiple times - preventive maintenance scheduled

**Risk Pattern Analysis:**
The most common safety concerns this week were related to temporary equipment (scaffolding, ladders) and chemical storage. This suggests we should enhance our weekly equipment inspection protocols.

**Team Recognition:**
Special recognition to Jake Thompson, Maria Chen, and Tom Williams for their vigilant reporting of the scaffolding concerns. Their persistence in documenting the issue helped prevent a potential serious incident.

**Next Week's Goals**: Complete scaffolding safety audit, implement enhanced chemical storage labeling system, and celebrate our improving safety metrics during Friday's team meeting.`;

// Current user context for close out functionality
export const currentUser = {
  firstName: 'David',
  lastName: 'Martinez',
  fullName: 'David Martinez',
  role: 'Site Supervisor'
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
      reportedAt: new Date(Date.now() - 15 * 60 * 1000),
      siteManager: {
        name: 'Sarah Mitchell',
        mobile: '+61 411 234 567'
      }
    },
    {
      site: 'Sydney West',
      description: 'Crane operation zone breach - workers entered restricted area',
      reportedAt: new Date(Date.now() - 10 * 60 * 1000),
      siteManager: {
        name: 'Marcus Thompson',
        mobile: '+61 422 345 678'
      }
    },
    {
      site: 'Sydney West',
      description: 'Missing fall protection on roof work area - harness points not installed',
      reportedAt: new Date(Date.now() - 5 * 60 * 1000),
      siteManager: {
        name: 'Marcus Thompson',
        mobile: '+61 422 345 678'
      }
    }
  ]
};