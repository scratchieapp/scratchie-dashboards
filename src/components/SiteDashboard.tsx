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
  BarChart3
} from 'lucide-react';
import MapView from './MapView';
import ScratchieModal from './ScratchieModal';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

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
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
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
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">Awards management content would go here</p>
            </CardContent>
          </Card>
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

export default SiteDashboard;