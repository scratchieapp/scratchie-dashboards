export type SafetyStatus = 'SAFE_TO_WORK' | 'NOT_SAFE_TO_WORK' | 'I_DONT_KNOW';

export type ConvoCardStatus = 'open' | 'closed' | 'needs_review' | 'accepted' | 'rejected';

export interface ConvoCard {
  id: string;
  description: string;
  location: string;
  reportedBy: string;
  timestamp: Date;
  safetyStatus: SafetyStatus;
  status: ConvoCardStatus;
  photoCount: number;
  hasVoiceNote: boolean;
  integrationTarget?: string; // e.g., "HammerTech"
  closedBy?: string;
  closedAt?: Date;
  iconEmoji: string; // emoji to display
}

export interface SiteConvoCardSummary {
  siteName: string;
  unclosedCritical: number;
  needsReview: number;
  safeToWork: number;
  responseRate: number;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: Date;
  summary: string;
}

export interface CompanyConvoCardSummary {
  totalCardsToday: number;
  unclosedCritical: number;
  unclosedCriticalTotal: number;
  safeToWorkRate: number;
  sitesNeedAttention: number;
  responseCompliance: number;
  lastUpdated: Date;
  executiveSummary: string;
  criticalIssues: Array<{
    site: string;
    description: string;
    reportedAt: Date;
  }>;
}

export interface ConvoCardFilters {
  status?: ConvoCardStatus[];
  safetyStatus?: SafetyStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  site?: string;
  searchTerm?: string;
}