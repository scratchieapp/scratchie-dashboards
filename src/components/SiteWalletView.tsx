import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertCircle,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CreditCard,
  RefreshCw,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface Transaction {
  id: string;
  date: Date;
  type: 'scratchie' | 'turbo' | 'top-up' | 'adjustment';
  description: string;
  amount: number;
  balance: number;
  recipient?: string;
  category?: string;
}

const SiteWalletView = () => {
  // Site wallet configuration
  const siteWallet = {
    siteName: "McDonald's Chisholm",
    currentBalance: 850,
    monthlyLimit: 1200,
    minimumBalance: 150,
    topUpAmount: 300,
    monthlySpend: 380,
    monthlyBudget: 1200,
    lastTopUp: new Date('2024-01-18'),
    autoTopUp: true,
    status: 'healthy' as const
  };

  // Transaction history
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: new Date('2024-01-25T14:30:00'),
      type: 'scratchie',
      description: 'Safety Excellence Award',
      amount: -25,
      balance: 850,
      recipient: 'John Smith',
      category: 'Safety'
    },
    {
      id: '2',
      date: new Date('2024-01-25T10:15:00'),
      type: 'turbo',
      description: 'Customer Service Excellence',
      amount: -50,
      balance: 875,
      recipient: 'Sarah Chen',
      category: 'Guest Satisfaction'
    },
    {
      id: '3',
      date: new Date('2024-01-24T16:45:00'),
      type: 'scratchie',
      description: 'Team Collaboration',
      amount: -25,
      balance: 925,
      recipient: 'Mike O\'Brien',
      category: 'Team Work'
    },
    {
      id: '4',
      date: new Date('2024-01-23T09:00:00'),
      type: 'top-up',
      description: 'Automatic Top-up',
      amount: 300,
      balance: 950,
      recipient: '',
      category: ''
    },
    {
      id: '5',
      date: new Date('2024-01-22T15:30:00'),
      type: 'scratchie',
      description: 'Cleanliness Champion',
      amount: -25,
      balance: 650,
      recipient: 'Lisa Wong',
      category: 'Cleanliness'
    },
    {
      id: '6',
      date: new Date('2024-01-22T11:20:00'),
      type: 'scratchie',
      description: 'Problem Resolution',
      amount: -25,
      balance: 675,
      recipient: 'Tom Anderson',
      category: 'Problem Solving'
    },
    {
      id: '7',
      date: new Date('2024-01-21T14:00:00'),
      type: 'turbo',
      description: 'Going Extra Mile',
      amount: -50,
      balance: 700,
      recipient: 'Emma Thompson',
      category: 'Excellence'
    },
    {
      id: '8',
      date: new Date('2024-01-20T10:30:00'),
      type: 'scratchie',
      description: 'Safety Procedures',
      amount: -25,
      balance: 750,
      recipient: 'James Liu',
      category: 'Safety'
    }
  ]);

  // Balance trend data (last 7 days)
  const balanceTrend = [
    { date: 'Jan 19', balance: 650, spend: 75 },
    { date: 'Jan 20', balance: 750, spend: 25 },
    { date: 'Jan 21', balance: 700, spend: 50 },
    { date: 'Jan 22', balance: 650, spend: 50 },
    { date: 'Jan 23', balance: 950, spend: 0 },
    { date: 'Jan 24', balance: 925, spend: 25 },
    { date: 'Jan 25', balance: 850, spend: 75 }
  ];

  // Category spending breakdown
  const categorySpending = [
    { category: 'Safety', amount: 125, count: 5 },
    { category: 'Guest Satisfaction', amount: 100, count: 4 },
    { category: 'Team Work', amount: 75, count: 3 },
    { category: 'Cleanliness', amount: 50, count: 2 },
    { category: 'Excellence', amount: 30, count: 1 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'top-up':
        return <ArrowDownRight className="w-4 h-4 text-green-600" />;
      case 'turbo':
        return <ArrowUpRight className="w-4 h-4 text-orange-600" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'low': return 'text-yellow-600 bg-yellow-50';
      case 'healthy': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Calculate budget utilization
  const budgetUtilization = (siteWallet.monthlySpend / siteWallet.monthlyBudget) * 100;
  const remainingBudget = siteWallet.monthlyBudget - siteWallet.monthlySpend;
  const daysInMonth = 31;
  const currentDay = 25;
  const expectedSpend = (currentDay / daysInMonth) * siteWallet.monthlyBudget;
  const spendingPace = siteWallet.monthlySpend > expectedSpend ? 'above' : 'below';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Wallet Management</h2>
          <p className="text-gray-600 mt-1">{siteWallet.siteName} wallet overview and controls</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Transactions
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Manual Top-up
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{formatCurrency(siteWallet.currentBalance)}</span>
              <Badge className={getStatusColor(siteWallet.status)}>
                {siteWallet.status}
              </Badge>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <Wallet className="w-4 h-4 mr-1 text-gray-400" />
              <span className="text-gray-600">
                {((siteWallet.currentBalance / siteWallet.monthlyLimit) * 100).toFixed(0)}% of limit
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{formatCurrency(siteWallet.monthlySpend)}</span>
              <span className={`text-sm ${spendingPace === 'above' ? 'text-red-600' : 'text-green-600'}`}>
                {spendingPace === 'above' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Budget used</span>
                <span>{budgetUtilization.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${budgetUtilization > 80 ? 'bg-red-600' : 'bg-blue-600'}`}
                  style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{formatCurrency(remainingBudget)}</span>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{daysInMonth - currentDay} days remaining</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Auto Top-up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{formatCurrency(siteWallet.topUpAmount)}</span>
              <Badge className={siteWallet.autoTopUp ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {siteWallet.autoTopUp ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              <span>Triggers at {formatCurrency(siteWallet.minimumBalance)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Monthly Spending Limit</label>
              <div className="mt-1 flex items-center gap-2">
                <Input 
                  type="number" 
                  value={siteWallet.monthlyLimit}
                  className="font-semibold"
                  readOnly
                />
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Minimum Balance</label>
              <div className="mt-1 flex items-center gap-2">
                <Input 
                  type="number" 
                  value={siteWallet.minimumBalance}
                  className="font-semibold"
                  readOnly
                />
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Top-up Amount</label>
              <div className="mt-1 flex items-center gap-2">
                <Input 
                  type="number" 
                  value={siteWallet.topUpAmount}
                  className="font-semibold"
                  readOnly
                />
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Last Top-up</label>
              <div className="mt-1">
                <Input 
                  type="text" 
                  value={siteWallet.lastTopUp.toLocaleDateString()}
                  className="font-semibold"
                  readOnly
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Balance & Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={balanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#93c5fd"
                  name="Balance"
                />
                <Area 
                  type="monotone" 
                  dataKey="spend" 
                  stackId="1"
                  stroke="#ef4444" 
                  fill="#fca5a5"
                  name="Daily Spend"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categorySpending}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" fill="#3b82f6" name="Amount Spent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-sm">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.type)}
                      <Badge variant="outline" className="text-xs">
                        {transaction.type === 'turbo' ? 'Turbo' : 
                         transaction.type === 'top-up' ? 'Top-up' :
                         transaction.type === 'adjustment' ? 'Adjust' : 'Scratchie'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{transaction.recipient || '-'}</TableCell>
                  <TableCell>
                    {transaction.category && (
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className={`text-right font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(transaction.balance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alert if balance is low */}
      {siteWallet.currentBalance < siteWallet.minimumBalance * 1.5 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">Balance Alert</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Current balance ({formatCurrency(siteWallet.currentBalance)}) is approaching the minimum threshold. 
                  {siteWallet.autoTopUp ? ' Automatic top-up will trigger soon.' : ' Consider enabling auto top-up.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SiteWalletView;