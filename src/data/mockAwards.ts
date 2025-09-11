import type { Award } from '../types/award';

const givers = [
  'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emma Davis', 'David Wilson',
  'Lisa Anderson', 'Robert Taylor', 'Jennifer Martinez', 'William Lee', 'Patricia White'
];

const recipients = [
  'James Wilson', 'Mary Johnson', 'Robert Davis', 'Linda Martinez', 'Michael Anderson',
  'Sarah Thomas', 'David Garcia', 'Emma Rodriguez', 'Christopher Brown', 'Jessica Lee',
  'Daniel Miller', 'Susan Wilson', 'Matthew Davis', 'Margaret Anderson', 'Anthony Garcia',
  'Dorothy Martinez', 'Mark Thompson', 'Sandra Robinson', 'Donald Clark', 'Ashley Lewis'
];

const categories = [
  'Safety Excellence',
  'Team Collaboration', 
  'Guest Satisfaction',
  'Quality Work',
  'Initiative',
  'Problem Solving',
  'Environmental Care',
  'Training & Development'
];

const reasons = [
  'Excellent safety protocol compliance during shift',
  'Helped team member complete urgent task',
  'Went above and beyond for customer service',
  'Maintained perfect quality standards',
  'Identified and fixed equipment issue',
  'Kept work area exceptionally clean',
  'Mentored new team member effectively',
  'Suggested process improvement that saved time',
  'Handled difficult customer situation professionally',
  'Completed safety training ahead of schedule'
];

const sites = [
  "McDonald's Chisholm",
  "McDonald's Newtown",
  "McDonald's Riverside",
  "McDonald's Central",
  "McDonald's Westfield",
  "McDonald's Airport"
];

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateAwards(count: number): Award[] {
  const awards: Award[] = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);
  
  for (let i = 0; i < count; i++) {
    const isTurbo = Math.random() > 0.85; // 15% are turbo scratchies
    const date = randomDate(sixMonthsAgo, now);
    
    awards.push({
      id: `award-${i + 1}`,
      type: isTurbo ? 'turbo' : 'scratchie',
      recipientId: `recipient-${Math.floor(Math.random() * recipients.length) + 1}`,
      recipientName: recipients[Math.floor(Math.random() * recipients.length)],
      giverId: `giver-${Math.floor(Math.random() * givers.length) + 1}`,
      giverName: givers[Math.floor(Math.random() * givers.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
      reason: reasons[Math.floor(Math.random() * reasons.length)],
      points: isTurbo ? 0 : Math.floor(Math.random() * 4 + 1) * 10, // 10, 20, 30, 40 points
      cashAmount: isTurbo ? Math.floor(Math.random() * 4 + 1) * 5 : undefined, // $5, $10, $15, $20
      date,
      site: sites[Math.floor(Math.random() * sites.length)],
      department: ['Kitchen', 'Front Counter', 'Drive-Thru', 'Maintenance'][Math.floor(Math.random() * 4)]
    });
  }
  
  return awards.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export const companyAwards = generateAwards(500);
export const siteAwards = companyAwards.filter(a => a.site === "McDonald's Chisholm").slice(0, 100);

// Helper functions for filtering
export function getAwardsThisWeek(awards: Award[]): Award[] {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return awards.filter(a => a.date >= weekAgo);
}

export function getAwardsThisMonth(awards: Award[]): Award[] {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  return awards.filter(a => a.date >= monthStart);
}

export function getAwardsToday(awards: Award[]): Award[] {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return awards.filter(a => a.date >= todayStart);
}