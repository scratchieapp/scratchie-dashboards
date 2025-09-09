import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Gift,
  MessageSquare,
  Trophy,
  Clock,
  QrCode,
  FileText,
  Users,
  Building,
  BarChart3,
  Download,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  TrendingUp,
  Award,
  CheckCircle,
  Calendar,
  Star,
  Zap
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import MapView from './MapView';
import ScratchieModal from './ScratchieModal';

const SiteDashboard = () => {
  const [isScratchieModalOpen, setIsScratchieModalOpen] = useState(false);
  
  // Chisholm McDonald's site location
  const siteLocation = [
    {
      id: 'chisholm-site',
      name: "McDonald's Chisholm Store",
      latitude: -33.6120,
      longitude: 150.7750,
      type: 'site' as const,
      address: 'Chisholm NSW 2322',
      workers: 47,
      status: 'Active'
    }
  ];
  // Sample data for category performance
  const categoryData = [
    { category: 'Safety', value: 42, color: '#3b82f6' },
    { category: 'Quality', value: 34, color: '#16a34a' },
    { category: 'Teamwork', value: 23, color: '#f59e0b' },
    { category: 'Initiative', value: 36, color: '#8b5cf6' },
    { category: 'Environment', value: 26, color: '#ef4444' }
  ];

  const metrics = [
    { 
      label: 'Workers On Site', 
      value: '47', 
      subtitle: 'Updated: 8:30 AM', 
      trend: 'neutral' 
    },
    { 
      label: "Today's Scratchies", 
      value: '12', 
      subtitle: 'On track for target', 
      trend: 'up' 
    },
    { 
      label: "Today's Turbo Scratchies", 
      value: '2', 
      subtitle: 'Cash rewards issued', 
      trend: 'up' 
    },
    { 
      label: "Today's Convo Cards", 
      value: '5', 
      subtitle: '3 responded', 
      trend: 'neutral' 
    },
    { 
      label: 'Active Supervisors', 
      value: '5/6', 
      subtitle: '83% active today', 
      trend: 'neutral' 
    },
    { 
      label: 'Weekly Budget Used', 
      value: '$420/$600', 
      subtitle: '70% utilised', 
      trend: 'neutral' 
    }
  ];

  const topPerformers = [
    { rank: 1, name: 'John Smith', company: 'BuildCorp Pty Ltd', score: 8 },
    { rank: 2, name: 'Sarah Chen', company: 'SafeWork Solutions', score: 7 },
    { rank: 3, name: "Mike O'Brien", company: 'BuildCorp Pty Ltd', score: 6 },
    { rank: 4, name: 'Lisa Wong', company: 'Elite Electrical', score: 5 },
    { rank: 5, name: 'Tom Anderson', company: 'ProPlumb Services', score: 5 }
  ];

  const topContributors = [
    { rank: 1, name: 'David Park', company: 'SafeWork Solutions', score: 12 },
    { rank: 2, name: 'Emma Thompson', company: 'BuildCorp Pty Ltd', score: 9 },
    { rank: 3, name: 'James Liu', company: 'Concrete Plus', score: 7 },
    { rank: 4, name: 'Amy Johnson', company: 'Elite Electrical', score: 6 },
    { rank: 5, name: 'Robert White', company: 'SteelWorks NSW', score: 5 }
  ];

  const recentConvoCards = [
    { text: 'Scaffolding needs inspection on Level 5', status: 'responded', time: '2 hours ago' },
    { text: 'Great teamwork on concrete pour today!', status: 'positive', time: '4 hours ago' },
    { text: 'PPE compliance excellent this week', status: 'positive', time: 'Yesterday' },
    { text: 'Electrical panel needs labelling', status: 'pending', time: 'Yesterday' },
    { text: 'Cleanup needed near loading dock', status: 'responded', time: '2 days ago' }
  ];

  const quickActions = [
    { icon: MessageSquare, label: 'Review Convo Cards' },
    { icon: QrCode, label: 'QR Code Display' },
    { icon: FileText, label: 'Site Report' },
    { icon: Users, label: 'Worker Directory' },
    { icon: Building, label: 'Subcontractors' },
    { icon: BarChart3, label: 'Export Data' }
  ];

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'text-yellow-500 font-bold';
    if (rank === 2) return 'text-gray-500 font-bold';
    if (rank === 3) return 'text-orange-600 font-bold';
    return 'text-gray-400';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'responded':
        return <Badge className="bg-green-100 text-green-700 ml-2">Responded</Badge>;
      case 'positive':
        return <Badge className="bg-blue-100 text-blue-700 ml-2">Positive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 ml-2">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Site Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <img src="/mcdonalds-logo.svg" alt="McDonald's" className="h-16 w-16" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">McDonald's Chisholm Store</h1>
              <div className="flex gap-6 mt-2 text-sm text-gray-600">
                <span>Active Project</span>
                <span>•</span>
                <span>47 Workers On Site</span>
                <span>•</span>
                <span>6 Supervisors</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Site Access Code with Issue Scratchie Button */}
          <Card className="border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-sky-50">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-2">
                    Site Access Code
                  </p>
                  <p className="text-5xl font-bold text-blue-700 font-mono tracking-widest mb-2">
                    AVG7NP
                  </p>
                  <p className="text-sm text-gray-600">
                    Workers use this code to join and access Scratchie rewards
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsScratchieModalOpen(true)}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Issue a Scratchie
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Site Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold text-slate-800 mb-2">{metric.value}</p>
                  <div className="flex items-center gap-2">
                    {metric.trend === 'up' && (
                      <Badge className="bg-green-100 text-green-700">
                        {metric.subtitle}
                      </Badge>
                    )}
                    {metric.trend === 'neutral' && (
                      <Badge variant="secondary">
                        {metric.subtitle}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Map and Category Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Site Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Site Location</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <MapView 
                  locations={siteLocation}
                  center={{ lat: -33.6120, lng: 150.7750 }}
                  zoom={15}
                  height="320px"
                  mapboxToken="pk.eyJ1IjoiamFtZXNrZWxsIiwiYSI6ImNtY2E5eXh5bTAxOGgybXEzd2wwdTlweXMifQ.DcNHH8X0cBd24CdDaZ6G8A"
                />
              </CardContent>
            </Card>

            {/* Category Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recognition by Category - This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6">
                      {categoryData.map((entry, index) => (
                        <Bar key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Three Column Layout for Leaderboards and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Performers - Scratchies */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Top Performers - Scratchies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((performer) => (
                    <div key={performer.rank} className="flex items-center">
                      <span className={`w-8 ${getRankStyle(performer.rank)}`}>
                        {performer.rank}.
                      </span>
                      <div className="flex-1 ml-3">
                        <p className="font-medium text-sm">{performer.name}</p>
                        <p className="text-xs text-gray-500">{performer.company}</p>
                      </div>
                      <span className="font-semibold text-blue-600">{performer.score}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors - Convo Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  Top Contributors - Convo Cards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topContributors.map((contributor) => (
                    <div key={contributor.rank} className="flex items-center">
                      <span className={`w-8 ${getRankStyle(contributor.rank)}`}>
                        {contributor.rank}.
                      </span>
                      <div className="flex-1 ml-3">
                        <p className="font-medium text-sm">{contributor.name}</p>
                        <p className="text-xs text-gray-500">{contributor.company}</p>
                      </div>
                      <span className="font-semibold text-blue-600">{contributor.score}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Convo Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Convo Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentConvoCards.map((card, index) => (
                    <div key={index} className="border-b pb-3 last:border-b-0">
                      <div className="flex items-start">
                        <p className="text-sm flex-1">{card.text}</p>
                        {getStatusBadge(card.status)}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {card.time}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                  <CardContent className="p-4 text-center">
                    <Icon className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                    <p className="text-sm text-gray-600">{action.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="awards">
          <AwardsTabContent />
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">Users management content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">Vendors management content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">Wallet management content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost">
          <SiteCostTabContent />
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">Reports content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">Settings content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Scratchie Creation Modal */}
      <ScratchieModal 
        isOpen={isScratchieModalOpen}
        onClose={() => setIsScratchieModalOpen(false)}
      />
    </div>
  );
};

const SiteCostTabContent = () => {
  const [currentMonth] = useState('November 2024');
  
  // Mock data for transactions
  const transactions = [
    { date: 'Nov 28', worker: 'John Smith', subcontractor: 'Kitchen Crew', category: 'Safety Excellence', amount: 100, fee: 5, total: 105 },
    { date: 'Nov 27', worker: 'Sarah Chen', subcontractor: 'Shift Managers', category: 'Guest Satisfaction', amount: 50, fee: 2.50, total: 52.50 },
    { date: 'Nov 26', worker: "Mike O'Brien", subcontractor: 'Drive Thru Team', category: 'Team Collaboration', amount: 50, fee: 2.50, total: 52.50 },
    { date: 'Nov 25', worker: 'Lisa Wong', subcontractor: 'Front Counter', category: 'Cleanliness Champion', amount: 25, fee: 1.25, total: 26.25 },
    { date: 'Nov 24', worker: 'Tom Anderson', subcontractor: 'McCafe Team', category: 'Going Extra Mile', amount: 50, fee: 2.50, total: 52.50 },
  ];

  const totalAwards = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0);
  const activeWorkers = 47;
  const subscriptionCost = activeWorkers * 10;
  const totalCost = subscriptionCost + totalAwards + totalFees;

  // 6-month trend data
  const trendData = [
    { month: 'Jun', subscription: 380, awards: 520, fee: 26 },
    { month: 'Jul', subscription: 410, awards: 650, fee: 32.50 },
    { month: 'Aug', subscription: 430, awards: 720, fee: 36 },
    { month: 'Sep', subscription: 450, awards: 780, fee: 39 },
    { month: 'Oct', subscription: 460, awards: 825, fee: 41.25 },
    { month: 'Nov', subscription: subscriptionCost, awards: totalAwards, fee: totalFees },
  ];

  // Awards distribution
  const awardsDistribution = [
    { value: 50, count: 12, total: 600 },
    { value: 25, count: 6, total: 150 },
    { value: 100, count: 1, total: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Billing Period Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold">{currentMonth}</span>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Site Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cost Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Site Cost This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalCost.toFixed(2)}</div>
            <div className="mt-4 space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subscription ({activeWorkers} workers)</span>
                <span className="font-semibold">${subscriptionCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Turbo Scratchie Awards</span>
                <span className="font-semibold">${(totalAwards + totalFees).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Awards Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{awardsDistribution.reduce((sum, a) => sum + a.count, 0)} Awards</div>
            <div className="mt-4 space-y-2 pt-4 border-t">
              {awardsDistribution.map((award, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">${award.value} Awards</span>
                  <span className="font-semibold">{award.count} × ${award.value} = ${award.total}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Worker Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeWorkers} Active</div>
            <div className="mt-4 space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Peak Workers (Week 2)</span>
                <span className="font-semibold">52</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Average This Month</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cost per Worker</span>
                <span className="font-semibold">${(totalCost / activeWorkers).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 6-Month Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Site Cost Trend - Last 6 Months</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="subscription" stackId="a" fill="#3b82f6" name="Subscription" />
              <Bar dataKey="awards" stackId="a" fill="#16a34a" name="Awards to Workers" />
              <Bar dataKey="fee" stackId="a" fill="#f59e0b" name="Platform Fee (5%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Transaction Log */}
      <Card>
        <CardHeader>
          <CardTitle>{currentMonth} - Turbo Scratchie Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Worker</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Team</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Award Amount</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Platform Fee</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{transaction.date}</td>
                    <td className="py-3 px-4">{transaction.worker}</td>
                    <td className="py-3 px-4">{transaction.subcontractor}</td>
                    <td className="py-3 px-4">{transaction.category}</td>
                    <td className="py-3 px-4 text-right font-medium">${transaction.amount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-medium">${transaction.fee.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-bold">${transaction.total.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={7} className="py-3 px-4 text-center text-gray-500 italic">
                    ... {Math.floor(Math.random() * 10) + 10} more transactions ...
                  </td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td colSpan={4} className="py-4 px-4">MONTHLY TOTAL</td>
                  <td className="py-4 px-4 text-right">${totalAwards.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">${totalFees.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">${(totalAwards + totalFees).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cost Efficiency Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Cost Efficiency Insight</h3>
              <p className="text-sm text-green-800 leading-relaxed">
                Your site's engagement rate of 74% is above average. Each dollar spent on Scratchie correlates with improved safety outcomes. 
                This month's cost per worker (${(totalCost / activeWorkers).toFixed(2)}) represents strong value when compared to industry 
                averages for safety incentive programmes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Awards Tab Component
const AwardsTabContent = () => {
  const [selectedPeriod] = useState('November 2024');
  const currentMonth = 'November 2024';
  
  // Generate daily data for the month (30 days for November)
  const generateDailyData = () => {
    const data = [];
    for (let day = 1; day <= 30; day++) {
      data.push({
        day: day,
        scratchies: Math.floor(Math.random() * 8) + 2,
        turbo: Math.floor(Math.random() * 3),
        custom: Math.floor(Math.random() * 2)
      });
    }
    return data;
  };
  
  const dailyAwardsData = generateDailyData();
  
  // Calculate totals
  const totalScratchies = dailyAwardsData.reduce((sum, d) => sum + d.scratchies, 0);
  const totalTurbo = dailyAwardsData.reduce((sum, d) => sum + d.turbo, 0);
  const totalCustom = dailyAwardsData.reduce((sum, d) => sum + d.custom, 0);
  
  // Mock awards table data
  const awardsTableData = [
    { 
      date: 'Nov 30, 2024', 
      time: '2:45 PM',
      givenBy: 'David Martinez', 
      recipient: 'John Smith',
      category: 'Safety Excellence', 
      type: 'Scratchie', 
      value: null,
      message: 'Great safety practices on site',
      status: 'Claimed'
    },
    { 
      date: 'Nov 30, 2024', 
      time: '11:30 AM',
      givenBy: 'Sarah Chen', 
      recipient: 'Mike O\'Brien',
      category: 'Team Collaboration', 
      type: 'Turbo', 
      value: 50,
      message: 'Outstanding teamwork during rush hour',
      status: 'Claimed'
    },
    { 
      date: 'Nov 29, 2024',
      time: '4:15 PM', 
      givenBy: 'James Wilson', 
      recipient: 'Lisa Wong',
      category: 'Going Extra Mile', 
      type: 'Custom', 
      value: 100,
      message: 'Employee of the Month - November',
      status: 'Pending'
    },
    { 
      date: 'Nov 29, 2024',
      time: '10:00 AM', 
      givenBy: 'Emma Thompson', 
      recipient: 'Tom Anderson',
      category: 'Guest Satisfaction', 
      type: 'Scratchie', 
      value: null,
      message: 'Excellent customer service',
      status: 'Claimed'
    },
    { 
      date: 'Nov 28, 2024',
      time: '3:20 PM', 
      givenBy: 'Robert White', 
      recipient: 'Amy Johnson',
      category: 'Cleanliness Champion', 
      type: 'Turbo', 
      value: 25,
      message: 'Maintained exceptional cleanliness standards',
      status: 'Claimed'
    },
    { 
      date: 'Nov 28, 2024',
      time: '9:45 AM', 
      givenBy: 'David Martinez', 
      recipient: 'Team - Kitchen',
      category: 'Problem Resolution', 
      type: 'Custom', 
      value: 200,
      message: 'Weekly Team Award - Best Performance',
      status: 'Claimed'
    },
  ];
  
  // Top performers data
  const topPerformers = [
    { name: 'John Smith', awards: 12, trend: 'up' },
    { name: 'Sarah Chen', awards: 10, trend: 'up' },
    { name: 'Mike O\'Brien', awards: 8, trend: 'same' },
    { name: 'Lisa Wong', awards: 7, trend: 'down' },
    { name: 'Tom Anderson', awards: 6, trend: 'up' },
  ];
  
  // Category breakdown data for pie chart simulation
  const categoryBreakdown = [
    { category: 'Safety Excellence', count: 45, color: 'bg-red-500' },
    { category: 'Team Collaboration', count: 38, color: 'bg-blue-500' },
    { category: 'Guest Satisfaction', count: 42, color: 'bg-green-500' },
    { category: 'Cleanliness Champion', count: 35, color: 'bg-purple-500' },
    { category: 'Going Extra Mile', count: 28, color: 'bg-orange-500' },
    { category: 'Problem Resolution', count: 22, color: 'bg-yellow-500' },
  ];
  
  const totalCategoryAwards = categoryBreakdown.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  // Handle previous month
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-lg font-semibold">{selectedPeriod}</span>
                {selectedPeriod === currentMonth && (
                  <Badge className="bg-green-100 text-green-700">Current</Badge>
                )}
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  // Handle next month
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export Awards Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Awards Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-blue-600" />
              Scratchies Given
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalScratchies}</div>
            <p className="text-sm text-gray-600 mt-2">
              Standard recognition awards
            </p>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-600" />
              Turbo Scratchies Given
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTurbo}</div>
            <p className="text-sm text-gray-600 mt-2">
              Cash awards totaling ${totalTurbo * 45}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">+8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Star className="h-4 w-4 text-purple-600" />
              Custom Awards Given
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCustom}</div>
            <p className="text-sm text-gray-600 mt-2">
              Weekly & monthly special awards
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">2 Monthly • 6 Weekly</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Awards Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Awards Distribution - {selectedPeriod}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyAwardsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                tickFormatter={(day) => day % 5 === 0 || day === 1 || day === 30 ? day : ''}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(day) => `November ${day}, 2024`}
              />
              <Legend />
              <Bar dataKey="scratchies" stackId="a" fill="#3b82f6" name="Scratchies" />
              <Bar dataKey="turbo" stackId="a" fill="#f59e0b" name="Turbo Scratchies" />
              <Bar dataKey="custom" stackId="a" fill="#8b5cf6" name="Custom Awards" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Award Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' :
                      index === 1 ? 'bg-gray-100 text-gray-700' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{performer.name}</p>
                      <p className="text-xs text-gray-500">{performer.awards} awards</p>
                    </div>
                  </div>
                  {performer.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                  {performer.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />}
                  {performer.trend === 'same' && <div className="h-4 w-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Awards by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryBreakdown.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{category.category}</span>
                    <span className="text-gray-600">{category.count} ({Math.round(category.count / totalCategoryAwards * 100)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${(category.count / totalCategoryAwards) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Awards Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Awards - {selectedPeriod}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date & Time</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Given By</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Recipient</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Value</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Message</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {awardsTableData.map((award, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium">{award.date}</p>
                        <p className="text-xs text-gray-500">{award.time}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{award.givenBy}</td>
                    <td className="py-3 px-4 text-sm font-medium">{award.recipient}</td>
                    <td className="py-3 px-4 text-sm">{award.category}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${
                        award.type === 'Turbo' ? 'bg-orange-100 text-orange-700' :
                        award.type === 'Custom' ? 'bg-purple-100 text-purple-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {award.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {award.value ? `$${award.value}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">
                      {award.message}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${
                        award.status === 'Claimed' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {award.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              Showing 1-6 of {totalScratchies + totalTurbo + totalCustom} total awards
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteDashboard;