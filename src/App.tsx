import { useState } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Calendar, DollarSign, Users, TrendingUp, AlertCircle, Award, Wallet, Building, ChevronDown, ChevronUp, Settings, CreditCard } from 'lucide-react';

const App = () => {
  const [activeView, setActiveView] = useState('site');
  const [selectedMonth, setSelectedMonth] = useState<'june' | 'july' | 'august'>('august');
  const [expandedSite, setExpandedSite] = useState<number | null>(null);

  // Mock data for demonstrations
  const siteData = {
    name: "Barangaroo Tower Site",
    company: "Multiplex Constructions",
    limits: {
      monthly: 1000,
      lowerLimit: 200,
      topUpAmount: 300
    },
    monthlyData: {
      june: {
        activeUsers: 45,
        subscriptionCost: 225,
        turboUsed: 850,
        turboAwarded: 807.50,
        platformFee: 42.50,
        paidOut: 650,
        unclaimed: 157.50,
        topUps: 3
      },
      july: {
        activeUsers: 52,
        subscriptionCost: 260,
        turboUsed: 920,
        turboAwarded: 874,
        platformFee: 46,
        paidOut: 750,
        unclaimed: 124,
        topUps: 4
      },
      august: {
        activeUsers: 48,
        subscriptionCost: 240,
        turboUsed: 680,
        turboAwarded: 646,
        platformFee: 34,
        paidOut: 520,
        unclaimed: 126,
        topUps: 2,
        currentBalance: 320
      }
    }
  };

  const companyData = {
    name: "Multiplex Constructions",
    abn: "12 345 678 901",
    sites: [
      {
        name: "Barangaroo Tower",
        activeUsers: 48,
        monthlyLimit: 1000,
        spent: 680,
        unclaimed: 126
      },
      {
        name: "Circular Quay Station",
        activeUsers: 35,
        monthlyLimit: 800,
        spent: 450,
        unclaimed: 89
      },
      {
        name: "Western Sydney Airport",
        activeUsers: 67,
        monthlyLimit: 1500,
        spent: 1200,
        unclaimed: 245
      },
      {
        name: "Parramatta Light Rail",
        activeUsers: 29,
        monthlyLimit: 600,
        spent: 380,
        unclaimed: 45
      }
    ],
    totalMonthly: {
      june: { subscription: 890, turbo: 2850, total: 3740 },
      july: { subscription: 950, turbo: 3120, total: 4070 },
      august: { subscription: 895, turbo: 2710, total: 3605 }
    }
  };

  const userData = {
    name: "James Mitchell",
    employeeId: "EMP-2847",
    currentBalance: 45.50,
    totalEarned: 485.50,
    awards: [
      { date: "22 Aug 2025", site: "Barangaroo Tower", amount: 15, status: "unclaimed", category: "PPE Excellence" },
      { date: "19 Aug 2025", site: "Barangaroo Tower", amount: 20, status: "unclaimed", category: "Hazard Reporting" },
      { date: "15 Aug 2025", site: "Barangaroo Tower", amount: 10.50, status: "unclaimed", category: "Toolbox Talk" },
      { date: "08 Aug 2025", site: "Barangaroo Tower", amount: 25, status: "paid", paidDate: "12 Aug 2025", category: "Safety Innovation" },
      { date: "01 Aug 2025", site: "Barangaroo Tower", amount: 30, status: "paid", paidDate: "05 Aug 2025", category: "Monthly Safety Star" },
      { date: "28 Jul 2025", site: "Circular Quay Station", amount: 20, status: "paid", paidDate: "30 Jul 2025", category: "Team Safety" }
    ]
  };

  const monthlyTrendData = [
    { month: 'Jun', subscription: 225, turbo: 850, unclaimed: 157.50 },
    { month: 'Jul', subscription: 260, turbo: 920, unclaimed: 124 },
    { month: 'Aug', subscription: 240, turbo: 680, unclaimed: 126 }
  ];

  const fundFlowData = [
    { name: 'Funds In', value: 680, fill: '#10b981' },
    { name: 'Platform Fee (5%)', value: 34, fill: '#f59e0b' },
    { name: 'Paid Out', value: 520, fill: '#3b82f6' },
    { name: 'Unclaimed', value: 126, fill: '#8b5cf6' }
  ];

  const renderSiteDashboard = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{siteData.name}</h1>
              <p className="text-gray-600 mt-1">{siteData.company}</p>
            </div>
            <div className="flex gap-4">
              <select 
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value as 'june' | 'july' | 'august')}
              >
                <option value="june">June 2025</option>
                <option value="july">July 2025</option>
                <option value="august">August 2025</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configure Limits
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-green-600 font-medium">Active</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {siteData.monthlyData[selectedMonth].activeUsers}
            </div>
            <div className="text-sm text-gray-600 mt-1">Active Users</div>
            <div className="text-xs text-gray-500 mt-2">
              ${siteData.monthlyData[selectedMonth].subscriptionCost} subscription
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-blue-600 font-medium">
                {((siteData.monthlyData[selectedMonth].turboUsed / siteData.limits.monthly) * 100).toFixed(0)}% used
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${siteData.monthlyData[selectedMonth].turboUsed}
            </div>
            <div className="text-sm text-gray-600 mt-1">Turbo Scratchies Used</div>
            <div className="text-xs text-gray-500 mt-2">
              of ${siteData.limits.monthly} limit
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-amber-600 font-medium">Escrow</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${siteData.monthlyData[selectedMonth].unclaimed}
            </div>
            <div className="text-sm text-gray-600 mt-1">Unclaimed Funds</div>
            <div className="text-xs text-gray-500 mt-2">
              Awaiting worker claims
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 text-gray-400" />
              {selectedMonth === 'august' && (
                <span className="text-xs text-green-600 font-medium">Available</span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${selectedMonth === 'august' ? siteData.monthlyData[selectedMonth].currentBalance : '0'}
            </div>
            <div className="text-sm text-gray-600 mt-1">Current Balance</div>
            <div className="text-xs text-gray-500 mt-2">
              Top-up at ${siteData.limits.lowerLimit}
            </div>
          </div>
        </div>

        {/* Turbo Scratchie Configuration */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Turbo Scratchie Configuration</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Monthly Limit</div>
              <div className="text-2xl font-bold text-gray-900">${siteData.limits.monthly}</div>
              <div className="text-xs text-gray-500">Maximum spend per month</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Top-up Trigger</div>
              <div className="text-2xl font-bold text-gray-900">${siteData.limits.lowerLimit}</div>
              <div className="text-xs text-gray-500">Balance threshold for auto top-up</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Top-up Amount</div>
              <div className="text-2xl font-bold text-gray-900">${siteData.limits.topUpAmount}</div>
              <div className="text-xs text-gray-500">Standard top-up value</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                {siteData.monthlyData[selectedMonth].topUps} top-ups processed in {selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}. 
                Next top-up will trigger when balance reaches ${siteData.limits.lowerLimit}.
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="subscription" stroke="#3b82f6" name="Subscription" strokeWidth={2} />
                <Line type="monotone" dataKey="turbo" stroke="#10b981" name="Turbo Scratchies" strokeWidth={2} />
                <Line type="monotone" dataKey="unclaimed" stroke="#f59e0b" name="Unclaimed" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fund Flow - {selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={fundFlowData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: $${value}`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {fundFlowData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fund Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Fund Breakdown - {selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Funds Collected</span>
              </div>
              <span className="font-bold text-gray-900">${siteData.monthlyData[selectedMonth].turboUsed}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Platform Fee (5%)</span>
              </div>
              <span className="font-bold text-gray-900">-${siteData.monthlyData[selectedMonth].platformFee}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Available for Awards</span>
              </div>
              <span className="font-bold text-gray-900">${siteData.monthlyData[selectedMonth].turboAwarded}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Paid Out to Workers</span>
              </div>
              <span className="font-bold text-gray-900">${siteData.monthlyData[selectedMonth].paidOut}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Held in Escrow (Unclaimed)</span>
              </div>
              <span className="font-bold text-gray-900">${siteData.monthlyData[selectedMonth].unclaimed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompanyDashboard = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{companyData.name}</h1>
              <p className="text-gray-600 mt-1">ABN: {companyData.abn}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Monthly Cost</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${companyData.totalMonthly.august.total.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">August 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Building className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{companyData.sites.length}</div>
            <div className="text-sm text-gray-600 mt-1">Active Sites</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {companyData.sites.reduce((sum, site) => sum + site.activeUsers, 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Active Users</div>
            <div className="text-xs text-gray-500 mt-2">
              ${companyData.totalMonthly.august.subscription} subscription
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${companyData.totalMonthly.august.turbo.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Turbo Scratchies</div>
            <div className="text-xs text-gray-500 mt-2">August 2025</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${companyData.sites.reduce((sum, site) => sum + site.unclaimed, 0)}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Unclaimed</div>
            <div className="text-xs text-gray-500 mt-2">Across all sites</div>
          </div>
        </div>

        {/* Monthly Comparison Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Cost Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={[
              { month: 'June', subscription: 890, turbo: 2850 },
              { month: 'July', subscription: 950, turbo: 3120 },
              { month: 'August', subscription: 895, turbo: 2710 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="subscription" stackId="1" stroke="#3b82f6" fill="#dbeafe" name="Subscriptions" />
              <Area type="monotone" dataKey="turbo" stackId="1" stroke="#10b981" fill="#d1fae5" name="Turbo Scratchies" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sites Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sites Breakdown - August 2025</h2>
          <div className="space-y-3">
            {companyData.sites.map((site, index) => (
              <div key={index} className="border rounded-lg">
                <div 
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setExpandedSite(expandedSite === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Building className="w-5 h-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{site.name}</div>
                        <div className="text-sm text-gray-600">{site.activeUsers} active users</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Monthly Cost</div>
                        <div className="font-bold text-gray-900">
                          ${(site.activeUsers * 5 + site.spent).toLocaleString()}
                        </div>
                      </div>
                      {expandedSite === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                </div>
                {expandedSite === index && (
                  <div className="px-4 pb-4 border-t">
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div>
                        <div className="text-sm text-gray-600">Subscription</div>
                        <div className="font-bold text-gray-900">${site.activeUsers * 5}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Turbo Scratchies</div>
                        <div className="font-bold text-gray-900">${site.spent}</div>
                        <div className="text-xs text-gray-500">of ${site.monthlyLimit} limit</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Utilisation</div>
                        <div className="font-bold text-gray-900">{((site.spent / site.monthlyLimit) * 100).toFixed(0)}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Unclaimed</div>
                        <div className="font-bold text-amber-600">${site.unclaimed}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(site.spent / site.monthlyLimit) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserDashboard = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
              <p className="text-gray-600 mt-1">Employee ID: {userData.employeeId}</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Claim Funds
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-5 h-5 text-gray-400" />
              <span className="text-xs text-green-600 font-medium">Available</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">${userData.currentBalance}</div>
            <div className="text-sm text-gray-600 mt-1">Current Balance</div>
            <div className="text-xs text-gray-500 mt-2">Ready to claim</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">${userData.totalEarned}</div>
            <div className="text-sm text-gray-600 mt-1">Total Earned</div>
            <div className="text-xs text-gray-500 mt-2">Lifetime earnings</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userData.awards.length}</div>
            <div className="text-sm text-gray-600 mt-1">Total Awards</div>
            <div className="text-xs text-gray-500 mt-2">Last 2 months</div>
          </div>
        </div>

        {/* Awards History */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Award History</h2>
          <div className="space-y-3">
            {userData.awards.map((award, index) => (
              <div key={index} className={`p-4 rounded-lg border ${award.status === 'unclaimed' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${award.status === 'unclaimed' ? 'bg-amber-100' : 'bg-green-100'}`}>
                      <Award className={`w-4 h-4 ${award.status === 'unclaimed' ? 'text-amber-600' : 'text-green-600'}`} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{award.category}</div>
                      <div className="text-sm text-gray-600">{award.site}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {award.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">${award.amount}</div>
                    <div className={`text-xs font-medium mt-1 ${award.status === 'unclaimed' ? 'text-amber-600' : 'text-green-600'}`}>
                      {award.status === 'unclaimed' ? 'Unclaimed' : `Paid ${award.paidDate}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">Unclaimed Awards</div>
              <div className="space-y-2">
                {userData.awards.filter(a => a.status === 'unclaimed').map((award, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-amber-50 rounded">
                    <span className="text-sm text-gray-700">{award.category}</span>
                    <span className="font-medium text-gray-900">${award.amount}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Total Unclaimed</span>
                  <span className="text-lg font-bold text-amber-600">${userData.currentBalance}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Recent Payouts</div>
              <div className="space-y-2">
                {userData.awards.filter(a => a.status === 'paid').slice(0, 3).map((award, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="text-sm text-gray-700">{award.paidDate}</span>
                    <span className="font-medium text-gray-900">${award.amount}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Total Paid Out</span>
                  <span className="text-lg font-bold text-green-600">
                    ${(userData.totalEarned - userData.currentBalance).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-blue-600">Scratchie R3</h1>
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveView('site')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeView === 'site' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Site Dashboard
                </button>
                <button
                  onClick={() => setActiveView('company')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeView === 'company' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Company Dashboard
                </button>
                <button
                  onClick={() => setActiveView('user')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeView === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  User Dashboard
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Airwallex Integration Active
            </div>
          </div>
        </div>
      </div>

      {/* Render Active Dashboard */}
      {activeView === 'site' && renderSiteDashboard()}
      {activeView === 'company' && renderCompanyDashboard()}
      {activeView === 'user' && renderUserDashboard()}
    </div>
  );
};

export default App;