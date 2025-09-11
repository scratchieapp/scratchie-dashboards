export type AwardType = 'scratchie' | 'turbo';

export interface Award {
  id: string;
  type: AwardType;
  recipientId: string;
  recipientName: string;
  giverId: string;
  giverName: string;
  category: string;
  reason: string;
  points: number;
  cashAmount?: number; // Only for turbo scratchies
  date: Date;
  site: string;
  department?: string;
}

export interface AwardFilters {
  type?: AwardType | 'all';
  dateRange?: 'today' | 'week' | 'month' | 'custom';
  startDate?: Date;
  endDate?: Date;
  site?: string;
  recipient?: string;
  giver?: string;
}