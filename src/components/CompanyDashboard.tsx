import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  Building2
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

const CompanyDashboard = () => {
  // Sample data for the recognition trends chart
  const recognitionData = [
    { day: 'Mon', scratchies: 28, turbo: 2, convo: 8 },
    { day: 'Tue', scratchies: 35, turbo: 3, convo: 12 },
    { day: 'Wed', scratchies: 42, turbo: 1, convo: 15 },
    { day: 'Thu', scratchies: 31, turbo: 4, convo: 10 },
    { day: 'Fri', scratchies: 48, turbo: 5, convo: 18 },
    { day: 'Sat', scratchies: 33, turbo: 2, convo: 7 },
    { day: 'Sun', scratchies: 30, turbo: 1, convo: 9 }
  ];

  const metrics = [
    { 
      label: 'Scratchies This Week', 
      value: '247', 
      change: '12% from last week', 
      trend: 'up' 
    },
    { 
      label: 'Turbo Scratchies (Cash)', 
      value: '18', 
      change: '5% from last week', 
      trend: 'up' 
    },
    { 
      label: 'Convo Cards Created', 
      value: '89', 
      change: '23% from last week', 
      trend: 'up' 
    },
    { 
      label: 'Convo Cards Responded', 
      value: '76', 
      change: '85% response rate', 
      trend: 'neutral' 
    },
    { 
      label: 'Active Sites Today', 
      value: '8/12', 
      change: '67% active', 
      trend: 'neutral' 
    },
    { 
      label: 'New Users This Week', 
      value: '28', 
      change: '8 from last week', 
      trend: 'up' 
    },
    { 
      label: 'Engagement Rate', 
      value: '74%', 
      change: '3% from last month', 
      trend: 'up' 
    },
    { 
      label: 'Budget Utilisation', 
      value: '68%', 
      change: '$3,400 of $5,000', 
      trend: 'neutral' 
    }
  ];

  const recentActivity = [
    { text: 'Site AVG7NP awarded 12 Scratchies', time: '2 hours ago' },
    { text: 'New Convo Card: "Great teamwork on Level 3"', time: '3 hours ago' },
    { text: 'Turbo Scratchie awarded at Site BKD9PL', time: '5 hours ago' },
    { text: '8 new users onboarded at Site NRT2QX', time: 'Yesterday' },
    { text: 'Weekly budget alert: 68% utilised', time: 'Yesterday' },
    { text: 'Site FGH4KL response rate: 100%', time: '2 days ago' }
  ];

  const quickActions = [
    { icon: '📊', label: 'Export Weekly Report' },
    { icon: '💰', label: 'Adjust Budget' },
    { icon: '👥', label: 'Bulk Add Users' },
    { icon: '🎯', label: 'Set KPI Targets' },
    { icon: '📈', label: 'View Analytics' },
    { icon: '🏗️', label: 'Add New Site' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Company Header */}
      <Card>
        <CardHeader>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Chisholm Plaza</h1>
            <div className="flex gap-6 mt-2 text-sm text-gray-600">
              <span>12 Total Sites</span>
              <span>•</span>
              <span>8 Active Sites</span>
              <span>•</span>
              <span>342 Total Users</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="sites">Sites</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600 mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold text-slate-800 mb-2">{metric.value}</p>
                  <div className="flex items-center gap-2">
                    {metric.trend === 'up' && (
                      <Badge className="bg-green-100 text-green-700">
                        <ArrowUpIcon className="w-3 h-3 mr-1" />
                        {metric.change}
                      </Badge>
                    )}
                    {metric.trend === 'down' && (
                      <Badge className="bg-red-100 text-red-700">
                        <ArrowDownIcon className="w-3 h-3 mr-1" />
                        {metric.change}
                      </Badge>
                    )}
                    {metric.trend === 'neutral' && (
                      <Badge variant="secondary">
                        {metric.change}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recognition Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recognition Trends - Last 7 Days</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={recognitionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="scratchies" fill="#3b82f6" name="Scratchies" />
                  <Bar dataKey="turbo" fill="#f59e0b" name="Turbo Scratchies" />
                  <Bar dataKey="convo" fill="#16a34a" name="Convo Cards" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Map and Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Building2 className="w-12 h-12 mx-auto mb-2" />
                    <p>[Interactive Map: Head Office + All Sites]</p>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-white p-3 rounded-lg shadow-md">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Head Office</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Active Sites</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Inactive Sites</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="border-b pb-3 last:border-b-0">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <p className="text-sm text-gray-600">{action.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sites">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">Sites management content would go here</p>
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

        <TabsContent value="wallet">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500">Wallet management content would go here</p>
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
    </div>
  );
};

export default CompanyDashboard;