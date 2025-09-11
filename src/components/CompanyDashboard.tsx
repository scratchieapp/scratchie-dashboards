import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  Download,
  ChevronLeft,
  ChevronRight,
  Info,
  DollarSign,
  TrendingUp,
  Award
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
import WalletView from './WalletView';
import UserTable from './UserTable';
import UserActivityChart from './UserActivityChart';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import type { User } from '../types/user';
import { companyUsers, userActivityData } from '../data/mockUsers';

const CompanyDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(companyUsers);
  // McDonald's Westside QSR locations data
  const locations = [
    { 
      id: 'head-office',
      name: "McDonald's Westside QSR Head Office",
      latitude: -33.6157,
      longitude: 150.7794,
      type: 'head-office' as const,
      address: 'Chisholm Business Park, NSW'
    },
    {
      id: 'site-1',
      name: 'Chisholm Store',
      latitude: -33.6120,
      longitude: 150.7750,
      type: 'active-site' as const,
      address: 'Chisholm NSW 2322',
      workers: 47,
      status: 'Active'
    },
    {
      id: 'site-2',
      name: 'Westfield Store',
      latitude: -33.6080,
      longitude: 150.7820,
      type: 'active-site' as const,
      address: 'Westfield Shopping Centre',
      workers: 35,
      status: 'Active'
    },
    {
      id: 'site-3',
      name: 'Airport Drive-Thru',
      latitude: -33.6200,
      longitude: 150.7900,
      type: 'active-site' as const,
      address: 'Airport Precinct',
      workers: 28,
      status: 'Active'
    },
    {
      id: 'site-4',
      name: 'University Store',
      latitude: -33.6050,
      longitude: 150.7700,
      type: 'inactive-site' as const,
      address: 'University Campus',
      workers: 0,
      status: 'Under Renovation'
    },
    {
      id: 'site-5',
      name: 'Highway South',
      latitude: -33.6300,
      longitude: 150.7850,
      type: 'active-site' as const,
      address: 'M1 Highway South',
      workers: 42,
      status: 'Active'
    },
    {
      id: 'site-6',
      name: 'Central Station',
      latitude: -33.6000,
      longitude: 150.7650,
      type: 'active-site' as const,
      address: 'Central Station Complex',
      workers: 38,
      status: 'Active'
    },
    {
      id: 'site-7',
      name: 'Beach Road',
      latitude: -33.5950,
      longitude: 150.8000,
      type: 'active-site' as const,
      address: 'Beach Road Plaza',
      workers: 31,
      status: 'Active'
    },
    {
      id: 'site-8',
      name: 'Industrial Park',
      latitude: -33.6400,
      longitude: 150.7600,
      type: 'inactive-site' as const,
      address: 'Industrial Estate',
      workers: 0,
      status: 'Planned'
    }
  ];
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
          <div className="flex items-center gap-4">
            <img src="/mcdonalds-logo.svg" alt="McDonald's" className="h-16 w-16" />
            <div>
              <h1 className="text-3xl font-bold text-slate-800">McDonald's Westside QSR</h1>
              <div className="flex gap-6 mt-2 text-sm text-gray-600">
                <span>12 Total Sites</span>
                <span>•</span>
                <span>8 Active Sites</span>
                <span>•</span>
                <span>342 Total Users</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="sites">Sites</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
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
                  <Bar dataKey="scratchies" stackId="a" fill="#3b82f6" name="Scratchies" />
                  <Bar dataKey="turbo" stackId="a" fill="#f59e0b" name="Turbo Scratchies" />
                  <Bar dataKey="convo" stackId="a" fill="#16a34a" name="Convo Cards" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Map and Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Store Locations</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <MapView 
                  locations={locations}
                  center={{ lat: -33.6157, lng: 150.7794 }}
                  zoom={11}
                  height="400px"
                />
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
          <div className="space-y-6">
            {/* User Activity Chart */}
            <UserActivityChart 
              data={userActivityData}
              onMonthClick={setSelectedMonth}
              selectedMonth={selectedMonth}
            />
            
            {/* User Table */}
            <Card>
              <CardContent className="p-6">
                <UserTable 
                  users={users}
                  onUserClick={(user) => {
                    setSelectedUser(user);
                    setIsEditUserOpen(true);
                  }}
                  onAddUser={() => setIsAddUserOpen(true)}
                  selectedMonth={selectedMonth}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Modals */}
          <AddUserModal
            isOpen={isAddUserOpen}
            onClose={() => setIsAddUserOpen(false)}
            onAddUser={(userData) => {
              // In a real app, this would make an API call
              const newUser: User = {
                id: `user-${users.length + 1}`,
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email,
                mobile: userData.mobile || '',
                role: userData.role,
                status: 'pending',
                sites: ['McDonald\'s Westside QSR'],
                department: 'Management',
                lastActive: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                awardsReceived: 0,
                recognitionsGiven: 0,
              };
              setUsers([...users, newUser]);
            }}
            isCompanyLevel={true}
          />
          
          <EditUserModal
            isOpen={isEditUserOpen}
            onClose={() => {
              setIsEditUserOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
            onSave={(updatedUser) => {
              setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
            }}
            isCompanyLevel={true}
          />
        </TabsContent>

        <TabsContent value="wallet">
          <WalletView />
        </TabsContent>

        <TabsContent value="cost">
          <CostTabContent />
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

const CostTabContent = () => {
  const [currentMonth] = useState('November 2024');
  
  // Mock data for sites
  const sitesData = [
    { code: 'CHI001', name: 'Chisholm Store', workers: 47, subscription: 470, awards: 850, fee: 42.50, total: 1362.50 },
    { code: 'WES002', name: 'Westfield Store', workers: 35, subscription: 350, awards: 1200, fee: 60, total: 1610 },
    { code: 'APT003', name: 'Airport Drive-Thru', workers: 28, subscription: 280, awards: 650, fee: 32.50, total: 962.50 },
    { code: 'UNI004', name: 'University Store', workers: 0, subscription: 0, awards: 0, fee: 0, total: 0 },
    { code: 'HWY005', name: 'Highway South', workers: 42, subscription: 420, awards: 1425, fee: 71.25, total: 1916.25 },
    { code: 'CEN006', name: 'Central Station', workers: 38, subscription: 380, awards: 425, fee: 21.25, total: 826.25 },
    { code: 'BCH007', name: 'Beach Road', workers: 31, subscription: 310, awards: 550, fee: 27.50, total: 887.50 },
    { code: 'IND008', name: 'Industrial Park', workers: 0, subscription: 0, awards: 0, fee: 0, total: 0 },
  ];

  const activeSites = sitesData.filter(s => s.workers > 0);
  const totalSubscription = activeSites.reduce((sum, site) => sum + site.subscription, 0);
  const totalAwards = activeSites.reduce((sum, site) => sum + site.awards, 0);
  const totalFees = activeSites.reduce((sum, site) => sum + site.fee, 0);
  const totalCost = totalSubscription + totalAwards + totalFees;

  // 6-month trend data
  const trendData = [
    { month: 'Jun', subscription: 2800, awards: 3900, fee: 195 },
    { month: 'Jul', subscription: 3000, awards: 4200, fee: 210 },
    { month: 'Aug', subscription: 3200, awards: 4500, fee: 225 },
    { month: 'Sep', subscription: 3300, awards: 4800, fee: 240 },
    { month: 'Oct', subscription: 3400, awards: 5100, fee: 255 },
    { month: 'Nov', subscription: totalSubscription, awards: totalAwards, fee: totalFees },
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
              Download Invoice
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
              Total Monthly Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalCost.toLocaleString()}</div>
            <div className="mt-4 space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subscription ({activeSites.reduce((sum, s) => sum + s.workers, 0)} workers)</span>
                <span className="font-semibold">${totalSubscription.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Turbo Scratchie Awards</span>
                <span className="font-semibold">${(totalAwards + totalFees).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Turbo Scratchie Breakdown
              <Info className="h-3 w-3 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(totalAwards + totalFees).toLocaleString()}</div>
            <div className="mt-4 space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Awards to Workers (95%)</span>
                <span className="font-semibold">${totalAwards.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform Fee (5%)</span>
                <Badge className="bg-yellow-100 text-yellow-800">${totalFees.toFixed(2)}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Subscription Details
              <Info className="h-3 w-3 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalSubscription.toLocaleString()}</div>
            <div className="mt-4 space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Workers</span>
                <span className="font-semibold">{activeSites.reduce((sum, s) => sum + s.workers, 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rate per Worker</span>
                <span className="font-semibold">$10.00/month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Structure Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">How Scratchie Pricing Works</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Subscription:</strong> $10 per active worker per month covers platform access and standard Scratchies.<br />
                <strong>Turbo Scratchies:</strong> Cash awards where 95% goes directly to workers and 5% platform fee to Scratchie.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6-Month Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>6-Month Cost Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`} />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="subscription" stackId="a" fill="#3b82f6" name="Subscription" />
              <Bar dataKey="awards" stackId="a" fill="#16a34a" name="Awards to Workers" />
              <Bar dataKey="fee" stackId="a" fill="#f59e0b" name="Platform Fee (5%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Site-by-Site Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>{currentMonth} - Store Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Store Code</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Store Name</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Active Workers</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Subscription</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Turbo Awards</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Platform Fee</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {sitesData.map((site) => (
                  <tr key={site.code} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-mono text-blue-600 font-semibold">{site.code}</span>
                    </td>
                    <td className="py-3 px-4">{site.name}</td>
                    <td className="py-3 px-4 text-right">{site.workers || '-'}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      {site.subscription > 0 ? `$${site.subscription.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {site.awards > 0 ? `$${site.awards.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {site.fee > 0 ? `$${site.fee.toFixed(2)}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-right font-bold">
                      {site.total > 0 ? `$${site.total.toFixed(2)}` : '-'}
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-50 font-bold">
                  <td colSpan={2} className="py-4 px-4">TOTAL</td>
                  <td className="py-4 px-4 text-right">{activeSites.reduce((sum, s) => sum + s.workers, 0)}</td>
                  <td className="py-4 px-4 text-right">${totalSubscription.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">${totalAwards.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">${totalFees.toFixed(2)}</td>
                  <td className="py-4 px-4 text-right">${totalCost.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyDashboard;