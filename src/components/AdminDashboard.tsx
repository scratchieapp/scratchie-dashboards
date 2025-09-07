import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
// Recharts components removed for now
import { Target, Diamond, Users, TrendingUp, DollarSign, Clock, Award, Building, AlertCircle, Info } from 'lucide-react';

// TypeScript interfaces for data structures
interface MetricCard {
  label: string;
  sublabel: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
}

interface FunnelStage {
  name: string;
  count: number;
  rate: string;
}

interface ViralMetric {
  label: string;
  info: string;
  value: string;
  hasIndicator?: boolean;
}

interface FreemiumUser {
  name: string;
  email: string;
  teamSize: string;
  convoActivity: {
    cards: string;
    width: number;
  };
  managerResponse: string;
  daysActive: number;
  conversionScore: {
    score: number;
    label: string;
    level: 'high' | 'medium' | 'low';
  };
  companySize: string;
  action: string;
}

interface ProCompany {
  name: string;
  since: string;
  activeUsers: number;
  monthlyGrowth: string;
  engagement: {
    percentage: string;
    width: number;
  };
  mrr: string;
  healthScore: {
    score: number;
    label: string;
    level: 'excellent' | 'strong' | 'good';
  };
  opportunity: string;
}

interface AdminDashboardData {
  freemiumMetrics: MetricCard[];
  funnelStages: FunnelStage[];
  viralMetrics: ViralMetric[];
  freemiumUsers: FreemiumUser[];
  proMetrics: MetricCard[];
  proHealthMetrics: ViralMetric[];
  proGrowthMetrics: ViralMetric[];
  proCompanies: ProCompany[];
}

// Mock data
const mockData: AdminDashboardData = {
  freemiumMetrics: [
    {
      label: 'Total Freemium Users',
      sublabel: 'All time signups',
      value: '2,847',
      change: '+312 this month',
      changeType: 'positive',
      icon: <Users className="w-5 h-5" />
    },
    {
      label: 'Freemium → Pro Conversion',
      sublabel: '90-day cohort average',
      value: '8.3%',
      change: '↑ from 6.2% last quarter',
      changeType: 'positive',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      label: 'Time to Pro',
      sublabel: 'Median days from signup',
      value: '42 days',
      change: '7 days faster',
      changeType: 'positive',
      icon: <Clock className="w-5 h-5" />
    },
    {
      label: 'Worker → Manager Cards',
      sublabel: 'Weekly average per active user',
      value: '3.4',
      change: '+0.8 vs last month',
      changeType: 'positive',
      icon: <Award className="w-5 h-5" />
    },
    {
      label: 'Manager Response Rate',
      sublabel: '% responding within 7 days',
      value: '34%',
      change: 'Key conversion indicator',
      changeType: 'positive',
      icon: <Target className="w-5 h-5" />
    },
    {
      label: 'Teams at 8+ Users',
      sublabel: 'Approaching limit (high intent)',
      value: '47',
      change: 'Prime for conversion',
      changeType: 'positive',
      icon: <Building className="w-5 h-5" />
    }
  ],
  funnelStages: [
    { name: 'Freemium Signups', count: 312, rate: '100%' },
    { name: 'Weekly Active Users', count: 250, rate: '80.1%' },
    { name: 'Participating in Convo Cards', count: 198, rate: '63.5%' },
    { name: 'Manager Responded', count: 89, rate: '28.5%' },
    { name: 'Converted to Pro', count: 26, rate: '8.3%' }
  ],
  viralMetrics: [
    {
      label: 'K-Factor (Viral Coefficient)',
      info: 'Each user brings 0.47 new users',
      value: '0.47',
      hasIndicator: true
    },
    {
      label: 'Avg Team Size',
      info: 'Users per freemium group',
      value: '7.2 / 10'
    },
    {
      label: 'Time to 10 Users',
      info: 'Days to reach limit',
      value: '14 days'
    },
    {
      label: 'Worker → Manager Cards',
      info: 'Weekly average',
      value: '847 / week'
    },
    {
      label: 'Manager Response %',
      info: 'Within 7 days',
      value: '34%'
    },
    {
      label: 'Organic Signups',
      info: 'Via referral/word-of-mouth',
      value: '67%'
    }
  ],
  freemiumUsers: [
    {
      name: 'Sarah Chen',
      email: 's.chen@buildcorp.com.au',
      teamSize: '9 / 10',
      convoActivity: { cards: '47 cards/wk', width: 90 },
      managerResponse: 'Yes (8x)',
      daysActive: 52,
      conversionScore: { score: 92, label: 'HIGH', level: 'high' },
      companySize: '~450',
      action: 'Trigger Upgrade'
    },
    {
      name: 'Mike Johnson',
      email: 'mjohnson@safetyfirst.com.au',
      teamSize: '10 / 10',
      convoActivity: { cards: '89 cards/wk', width: 120 },
      managerResponse: 'Yes (15x)',
      daysActive: 78,
      conversionScore: { score: 95, label: 'URGENT', level: 'high' },
      companySize: '~890',
      action: 'Contact Now'
    },
    {
      name: 'Emma Williams',
      email: 'emma@techman.com.au',
      teamSize: '8 / 10',
      convoActivity: { cards: '31 cards/wk', width: 60 },
      managerResponse: 'Yes (5x)',
      daysActive: 34,
      conversionScore: { score: 78, label: 'HIGH', level: 'high' },
      companySize: '~320',
      action: 'Send Case Study'
    },
    {
      name: 'James Torres',
      email: 'j.torres@regcon.net.au',
      teamSize: '6 / 10',
      convoActivity: { cards: '18 cards/wk', width: 35 },
      managerResponse: 'Yes (3x)',
      daysActive: 21,
      conversionScore: { score: 45, label: 'MEDIUM', level: 'medium' },
      companySize: '~150',
      action: 'Nurture'
    }
  ],
  proMetrics: [
    {
      label: 'Total Pro Companies',
      sublabel: 'Active subscriptions',
      value: '142',
      change: '+21 this quarter',
      changeType: 'positive',
      icon: <Building className="w-5 h-5" />
    },
    {
      label: 'Monthly Recurring Revenue',
      sublabel: 'All pro subscriptions',
      value: '$284k',
      change: '+$42k MRR added',
      changeType: 'positive',
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      label: 'Net Revenue Retention',
      sublabel: 'Expansion vs churn',
      value: '112%',
      change: 'Healthy expansion',
      changeType: 'positive',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      label: 'Average Users per Company',
      sublabel: 'After 30 days',
      value: '342',
      change: 'Stable',
      changeType: 'neutral',
      icon: <Users className="w-5 h-5" />
    },
    {
      label: 'User Engagement Rate',
      sublabel: 'Weekly active / total',
      value: '68%',
      change: '+5% vs target',
      changeType: 'positive',
      icon: <Target className="w-5 h-5" />
    },
    {
      label: 'Enterprise Pipeline',
      sublabel: 'Companies 500+ employees',
      value: '8',
      change: '$180k potential',
      changeType: 'positive',
      icon: <Diamond className="w-5 h-5" />
    }
  ],
  proHealthMetrics: [
    {
      label: 'Average Company Size',
      info: 'Measured after 30 days',
      value: '342 users'
    },
    {
      label: 'Expansion Rate',
      info: 'Companies adding users monthly',
      value: '47%'
    },
    {
      label: 'Feature Adoption',
      info: 'Using 3+ premium features',
      value: '82%'
    },
    {
      label: 'Monthly Churn Rate',
      info: 'Companies cancelling',
      value: '2.1%'
    },
    {
      label: 'Support Tickets',
      info: 'Per 100 companies/month',
      value: '8.3'
    }
  ],
  proGrowthMetrics: [
    {
      label: 'Organic User Growth',
      info: 'New users within pro companies',
      value: '+18% MoM'
    },
    {
      label: 'Department Penetration',
      info: 'Avg departments per company',
      value: '3.2'
    },
    {
      label: 'Referral Rate',
      info: 'Pro companies referring others',
      value: '23%'
    },
    {
      label: 'Case Study Participants',
      info: 'Willing to share success',
      value: '31 companies'
    },
    {
      label: 'NPS Score',
      info: 'Net Promoter Score',
      value: '72'
    }
  ],
  proCompanies: [
    {
      name: 'MegaBuild Construction',
      since: 'Since Jan 2024',
      activeUsers: 892,
      monthlyGrowth: '+12%',
      engagement: { percentage: '78% WAU', width: 100 },
      mrr: '$4,460/mo',
      healthScore: { score: 95, label: 'EXCELLENT', level: 'excellent' },
      opportunity: 'Enterprise Upsell'
    },
    {
      name: 'National Mining Corp',
      since: 'Since Mar 2024',
      activeUsers: 567,
      monthlyGrowth: '+8%',
      engagement: { percentage: '71% WAU', width: 90 },
      mrr: '$2,835/mo',
      healthScore: { score: 88, label: 'STRONG', level: 'strong' },
      opportunity: 'Case Study'
    }
  ]
};

// Removed unused chart data

const AdminDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [cohort, setCohort] = useState('all-cohorts');

  const MetricCard: React.FC<{ metric: MetricCard; variant?: 'orange' | 'green' }> = ({ 
    metric, 
    variant = 'orange' 
  }) => (
    <Card className={`relative overflow-hidden ${
      variant === 'green' 
        ? 'border-t-4 border-t-green-500 bg-gradient-to-b from-green-50/50 to-white' 
        : 'border-t-4 border-t-primary bg-gradient-to-b from-orange-50/50 to-white'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          {metric.icon && (
            <div className="text-gray-400">
              {metric.icon}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {metric.label}
          </p>
          <p className="text-xs text-gray-400 font-normal">
            {metric.sublabel}
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {metric.value}
          </p>
          <Badge 
            variant="secondary"
            className={`text-xs ${
              metric.changeType === 'positive' 
                ? 'bg-green-100 text-green-600' 
                : metric.changeType === 'negative'
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {metric.change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  const FunnelStage: React.FC<{ stage: FunnelStage; isLast?: boolean }> = ({ stage, isLast }) => (
    <div className="relative mb-4">
      <div className="flex items-center bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg border-l-3 border-l-primary">
        <span className="flex-1 font-medium text-gray-700">{stage.name}</span>
        <span className="text-xl font-bold text-primary mr-4">{stage.count}</span>
        <Badge variant="secondary" className="bg-white text-gray-600 text-sm">
          {stage.rate}
        </Badge>
      </div>
      {!isLast && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-orange-300 text-xl">
          ↓
        </div>
      )}
    </div>
  );

  const ViralMetricRow: React.FC<{ metric: ViralMetric }> = ({ metric }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
      <div>
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-700">{metric.label}</span>
          <Info className="w-3 h-3 text-gray-400 cursor-help" />
        </div>
        <p className="text-xs text-gray-500 mt-1">{metric.info}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-primary">{metric.value}</span>
        {metric.hasIndicator && (
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        )}
      </div>
    </div>
  );

  const getScoreColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-gray-600';
      case 'excellent': return 'text-green-600';
      case 'strong': return 'text-blue-600';
      case 'good': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getScoreBackgroundColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-100';
      case 'medium': return 'bg-orange-100';
      case 'low': return 'bg-gray-100';
      case 'excellent': return 'bg-green-100';
      case 'strong': return 'bg-blue-100';
      case 'good': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-orange-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  <span className="text-primary">Scratchie</span> Admin Dashboard
                </CardTitle>
              </div>
              <div className="flex gap-4">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                    <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                    <SelectItem value="year-to-date">Year to Date</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={cohort} onValueChange={setCohort}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-cohorts">All Cohorts</SelectItem>
                    <SelectItem value="q1-2025">Q1 2025 Signups</SelectItem>
                    <SelectItem value="q4-2024">Q4 2024 Signups</SelectItem>
                    <SelectItem value="q3-2024">Q3 2024 Signups</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Tab Navigation */}
        <Tabs defaultValue="freemium" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-14 bg-white shadow-sm">
            <TabsTrigger 
              value="freemium" 
              className="text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-orange-400 data-[state=active]:text-white"
            >
              <Target className="w-5 h-5 mr-2" />
              Freemium Conversion
            </TabsTrigger>
            <TabsTrigger 
              value="pro"
              className="text-lg font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-400 data-[state=active]:text-white"
            >
              <Diamond className="w-5 h-5 mr-2" />
              Pro Engagement & Growth
            </TabsTrigger>
          </TabsList>

          {/* Freemium Tab Content */}
          <TabsContent value="freemium" className="space-y-6">
            {/* Cohort Note */}
            <Alert className="bg-orange-50 border-orange-200 text-orange-800">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription>
                <strong>Cohort View:</strong> Showing metrics for users who signed up in the selected period. 
                Conversion rates calculated after 90-day maturation period.
              </AlertDescription>
            </Alert>

            {/* Freemium Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.freemiumMetrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} variant="orange" />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Individual User Funnel */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Individual User Journey</CardTitle>
                  <CardDescription>Last 30 days cohort (n=312)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockData.funnelStages.map((stage, index) => (
                      <FunnelStage 
                        key={index} 
                        stage={stage} 
                        isLast={index === mockData.funnelStages.length - 1}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Viral Growth Metrics */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Viral Growth Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {mockData.viralMetrics.map((metric, index) => (
                      <ViralMetricRow key={index} metric={metric} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* High Conversion Potential Tracker */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">High Conversion Potential Users</CardTitle>
                <CardDescription>Freemium users showing strong engagement signals</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Details</TableHead>
                      <TableHead>Team Size</TableHead>
                      <TableHead>Convo Activity</TableHead>
                      <TableHead>Manager Response</TableHead>
                      <TableHead>Days Active</TableHead>
                      <TableHead>Conversion Score</TableHead>
                      <TableHead>Est. Company Size</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.freemiumUsers.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-700">{user.teamSize}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{user.convoActivity.cards}</span>
                            <div 
                              className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                              style={{ width: `${Math.min(user.convoActivity.width, 100)}px` }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-primary">{user.managerResponse}</span>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-semibold text-gray-700">{user.daysActive}</div>
                            <div className="text-xs text-gray-400">days</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className={`text-xl font-bold ${getScoreColor(user.conversionScore.level)}`}>
                              {user.conversionScore.score}%
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getScoreBackgroundColor(user.conversionScore.level)} ${getScoreColor(user.conversionScore.level)}`}
                            >
                              {user.conversionScore.label}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-bold">{user.companySize}</div>
                            <div className="text-xs text-gray-500">via Apollo API</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant={user.conversionScore.level === 'high' ? 'default' : 'outline'}
                            className={user.conversionScore.level === 'high' ? 'bg-gradient-to-r from-primary to-orange-400 hover:from-primary/90 hover:to-orange-400/90' : ''}
                          >
                            {user.action}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pro Tab Content */}
          <TabsContent value="pro" className="space-y-6">
            {/* Pro Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.proMetrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} variant="green" />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pro Company Health Metrics */}
              <Card className="shadow-sm border-2 border-green-200 bg-gradient-to-b from-green-50/50 to-white">
                <CardHeader>
                  <CardTitle className="text-lg">Pro Company Health Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {mockData.proHealthMetrics.map((metric, index) => (
                      <ViralMetricRow key={index} metric={metric} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Growth & Expansion Metrics */}
              <Card className="shadow-sm border-2 border-green-200 bg-gradient-to-b from-green-50/50 to-white">
                <CardHeader>
                  <CardTitle className="text-lg">Growth & Expansion Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {mockData.proGrowthMetrics.map((metric, index) => (
                      <ViralMetricRow key={index} metric={metric} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pro Company Performance Table */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Pro Companies</CardTitle>
                <CardDescription>By engagement and expansion potential</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Active Users</TableHead>
                      <TableHead>Monthly Growth</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>MRR</TableHead>
                      <TableHead>Health Score</TableHead>
                      <TableHead>Opportunity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockData.proCompanies.map((company, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <div className="font-semibold text-gray-900">{company.name}</div>
                            <div className="text-sm text-gray-500">{company.since}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-700">{company.activeUsers} users</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-600">{company.monthlyGrowth}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{company.engagement.percentage}</span>
                            <div 
                              className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                              style={{ width: `${Math.min(company.engagement.width, 100)}px` }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold">{company.mrr}</span>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className={`text-xl font-bold ${getScoreColor(company.healthScore.level)}`}>
                              {company.healthScore.score}
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getScoreBackgroundColor(company.healthScore.level)} ${getScoreColor(company.healthScore.level)}`}
                            >
                              {company.healthScore.label}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant={company.healthScore.level === 'excellent' ? 'default' : 'outline'}
                            className={company.healthScore.level === 'excellent' ? 'bg-gradient-to-r from-green-500 to-green-400 hover:from-green-500/90 hover:to-green-400/90' : ''}
                          >
                            {company.opportunity}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;