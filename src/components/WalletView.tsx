import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DollarSign, 
  TrendingUp,
  Wallet,
  Edit2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  AlertCircle,
  Download,
  Upload,
  Building2,
  CheckCircle,
  XCircle,
  Clock,
  Check,
  X
} from 'lucide-react';
import CompanyBankAccountModal from './CompanyBankAccountModal';
import SiteBankConsentModal from './SiteBankConsentModal';
import PaymentMethodSelectionModal from './PaymentMethodSelectionModal';
import CreditCardPaymentModal from './CreditCardPaymentModal';

interface SiteWallet {
  id: string;
  siteName: string;
  walletBalance: number;
  monthlyLimit: number;
  minimumBalance: number;
  topUpAmount: number;
  lastTopUp?: Date;
  status: 'healthy' | 'low' | 'critical';
  monthlySpend: number;
  payToStatus: 'active' | 'pending' | 'none';
}

const WalletView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSiteModalOpen, setIsSiteModalOpen] = useState(false);
  const [isPaymentSelectionOpen, setIsPaymentSelectionOpen] = useState(false);
  const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState(false);
  const [isQuickTopUpModalOpen, setIsQuickTopUpModalOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<SiteWallet | null>(null);
  const [quickTopUpSite, setQuickTopUpSite] = useState<SiteWallet | null>(null);
  const [editingField, setEditingField] = useState<{siteId: string, field: string} | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  // Store the bank setup status in localStorage for persistence
  const [companyBankSetup, setCompanyBankSetup] = useState(() => {
    return localStorage.getItem('companyBankSetup') === 'true';
  });
  const [paymentMethod, setPaymentMethod] = useState<'payto' | 'card' | null>(() => {
    return (localStorage.getItem('companyPaymentMethod') as 'payto' | 'card') || null;
  });
  
  // Store payment details in memory for future use (e.g., displaying masked card numbers)
  const [_paymentDetails, setPaymentDetails] = useState<any>(() => {
    const stored = localStorage.getItem('companyPaymentDetails');
    return stored ? JSON.parse(stored) : null;
  });
  const [sites, setSites] = useState<SiteWallet[]>([
    {
      id: '1',
      siteName: 'Randwick',
      walletBalance: 0,
      monthlyLimit: 200,
      minimumBalance: 10,
      topUpAmount: 20,
      status: 'critical',
      monthlySpend: 185,
      lastTopUp: new Date('2024-01-15'),
      payToStatus: 'none'
    },
    {
      id: '2',
      siteName: 'Eastside Rewarding Great People (RGP)',
      walletBalance: 3469,
      monthlyLimit: 1000,
      minimumBalance: 200,
      topUpAmount: 200,
      status: 'healthy',
      monthlySpend: 425,
      lastTopUp: new Date('2024-01-20'),
      payToStatus: 'active'
    },
    {
      id: '3',
      siteName: 'Chisholm',
      walletBalance: 850,
      monthlyLimit: 1200,
      minimumBalance: 150,
      topUpAmount: 300,
      status: 'healthy',
      monthlySpend: 380,
      lastTopUp: new Date('2024-01-18'),
      payToStatus: 'active'
    },
    {
      id: '4',
      siteName: 'Westmead',
      walletBalance: 45,
      monthlyLimit: 800,
      minimumBalance: 100,
      topUpAmount: 150,
      status: 'low',
      monthlySpend: 620,
      lastTopUp: new Date('2024-01-10'),
      payToStatus: 'pending'
    },
    {
      id: '5',
      siteName: 'Parramatta',
      walletBalance: 1200,
      monthlyLimit: 1500,
      minimumBalance: 200,
      topUpAmount: 250,
      status: 'healthy',
      monthlySpend: 290,
      lastTopUp: new Date('2024-01-22'),
      payToStatus: 'active'
    },
    {
      id: '6',
      siteName: 'Castle Hill',
      walletBalance: 320,
      monthlyLimit: 1000,
      minimumBalance: 100,
      topUpAmount: 200,
      status: 'healthy',
      monthlySpend: 510,
      lastTopUp: new Date('2024-01-19'),
      payToStatus: 'active'
    },
    {
      id: '7',
      siteName: 'Penrith',
      walletBalance: 75,
      monthlyLimit: 900,
      minimumBalance: 80,
      topUpAmount: 180,
      status: 'low',
      monthlySpend: 715,
      lastTopUp: new Date('2024-01-12'),
      payToStatus: 'pending'
    },
    {
      id: '8',
      siteName: 'Liverpool',
      walletBalance: 890,
      monthlyLimit: 1100,
      minimumBalance: 150,
      topUpAmount: 220,
      status: 'healthy',
      monthlySpend: 180,
      lastTopUp: new Date('2024-01-21'),
      payToStatus: 'none'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const totalBalance = sites.reduce((sum, site) => sum + site.walletBalance, 0);
  const totalSpentThisMonth = sites.reduce((sum, site) => sum + site.monthlySpend, 0);
  const totalMonthlyLimit = sites.reduce((sum, site) => sum + site.monthlyLimit, 0);

  const handleEdit = (site: SiteWallet) => {
    setSelectedSite(site);
    setIsSiteModalOpen(true);
  };

  const handleTopUp = (siteId: string) => {
    setSites(sites.map(site => {
      if (site.id === siteId) {
        const newBalance = Math.min(site.walletBalance + site.topUpAmount, site.monthlyLimit);
        return {
          ...site,
          walletBalance: newBalance,
          lastTopUp: new Date(),
          status: newBalance < site.minimumBalance ? 'critical' : 
                  newBalance < site.minimumBalance * 2 ? 'low' : 'healthy'
        };
      }
      return site;
    }));
  };

  const startEditing = (siteId: string, field: string, currentValue: number) => {
    setEditingField({ siteId, field });
    setEditValue(currentValue.toString());
  };

  const saveEdit = (siteId: string, field: string) => {
    const value = parseFloat(editValue);
    if (!isNaN(value) && value > 0) {
      setSites(sites.map(site => {
        if (site.id === siteId) {
          return { ...site, [field]: value };
        }
        return site;
      }));
    }
    setEditingField(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const filteredSites = sites.filter(site =>
    site.siteName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSites.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedSites = filteredSites.slice(startIndex, startIndex + rowsPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600';
      case 'low': return 'text-yellow-600';
      case 'healthy': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Wallet Balance</h2>
          <p className="text-gray-600 mt-1">Manage site wallets and spending limits</p>
        </div>
        <div className="flex gap-2">
          {/* Payment Method Section */}
          <div className="flex items-center gap-2">
            {companyBankSetup && paymentMethod ? (
              <>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                  paymentMethod === 'payto' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-purple-50 border border-purple-200'
                }`}>
                  <CheckCircle className={`w-4 h-4 ${
                    paymentMethod === 'payto' ? 'text-green-600' : 'text-purple-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    paymentMethod === 'payto' ? 'text-green-800' : 'text-purple-800'
                  }`}>
                    {paymentMethod === 'payto' ? 'PayTo Active' : 'Credit Card Active'}
                  </span>
                </div>
                <Button 
                  onClick={() => {
                    // Edit existing payment method
                    if (paymentMethod === 'card') {
                      setIsCreditCardModalOpen(true);
                    } else {
                      setIsModalOpen(true);
                    }
                  }}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
                <Button 
                  onClick={() => {
                    // Change payment method - show selection again
                    setIsPaymentSelectionOpen(true);
                  }}
                  variant="outline"
                  size="sm"
                >
                  Change Method
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">No Payment Method</span>
                </div>
                <Button 
                  onClick={() => setIsPaymentSelectionOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  Set Up Payment
                </Button>
              </>
            )}
          </div>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Total Wallet Information */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Total Wallet Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-4xl font-bold">
                {formatCurrency(totalBalance)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">Balance across Sites</p>
              <div className="flex items-center mt-2 text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-xs">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-4xl font-bold">
                {formatCurrency(totalSpentThisMonth)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">Spent this month</p>
              <div className="flex items-center mt-2 text-blue-400">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="text-xs">8 sites active</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-4xl font-bold">
                {formatCurrency(totalMonthlyLimit)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">Total Monthly Spending Limit</p>
              <div className="flex items-center mt-2 text-purple-400">
                <Wallet className="w-4 h-4 mr-1" />
                <span className="text-xs">Combined monthly limit</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alerts for Low Balance Sites */}
      {sites.filter(s => s.status !== 'healthy').length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">Low Balance Alert</p>
                <p className="text-sm text-yellow-700 mt-1">
                  {sites.filter(s => s.status === 'critical').length} sites critically low, 
                  {' '}{sites.filter(s => s.status === 'low').length} sites below recommended minimum
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Site Wallets Information */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Site Wallets Information</h3>
          <Input
            placeholder="Search sites..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-900 hover:bg-slate-900">
                  <TableHead className="text-white font-semibold">Site Name</TableHead>
                  <TableHead className="text-white font-semibold text-center">PayTo Status</TableHead>
                  <TableHead className="text-white font-semibold text-right">Wallet Balance</TableHead>
                  <TableHead className="text-white font-semibold text-right">Monthly Spending Limit</TableHead>
                  <TableHead className="text-white font-semibold text-right">Minimum Balance</TableHead>
                  <TableHead className="text-white font-semibold text-right">Top-up Amount</TableHead>
                  <TableHead className="text-white font-semibold text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSites.map((site) => (
                  <TableRow key={site.id} className="group">
                    <TableCell className="font-medium">
                      <div>
                        <p>{site.siteName}</p>
                        {site.status !== 'healthy' && (
                          <span className={`text-xs ${getStatusColor(site.status)}`}>
                            {site.status === 'critical' ? '⚠️ Critical' : '⚠️ Low'}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {site.payToStatus === 'active' ? (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded-full">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-medium text-green-700">Active</span>
                        </div>
                      ) : site.payToStatus === 'pending' ? (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 border border-orange-200 rounded-full">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-xs font-medium text-orange-700">Pending</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 border border-red-200 rounded-full">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="text-xs font-medium text-red-700">Not Setup</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className={`text-right font-semibold ${getStatusColor(site.status)}`}>
                      {formatCurrency(site.walletBalance)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingField?.siteId === site.id && editingField?.field === 'monthlyLimit' ? (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">$</span>
                            <Input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEdit(site.id, 'monthlyLimit');
                                if (e.key === 'Escape') cancelEdit();
                              }}
                              className="w-24 h-7 text-sm text-right"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => saveEdit(site.id, 'monthlyLimit')}
                              className="h-6 w-6 p-0"
                            >
                              <Check className="w-3 h-3 text-green-600" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={cancelEdit}
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-3 h-3 text-red-600" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <span className="text-lg font-semibold">{formatCurrency(site.monthlyLimit)}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditing(site.id, 'monthlyLimit', site.monthlyLimit)}
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Edit2 className="w-3 h-3 text-gray-500" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingField?.siteId === site.id && editingField?.field === 'minimumBalance' ? (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">$</span>
                            <Input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEdit(site.id, 'minimumBalance');
                                if (e.key === 'Escape') cancelEdit();
                              }}
                              className="w-24 h-7 text-sm text-right"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => saveEdit(site.id, 'minimumBalance')}
                              className="h-6 w-6 p-0"
                            >
                              <Check className="w-3 h-3 text-green-600" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={cancelEdit}
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-3 h-3 text-red-600" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <span className="text-lg font-semibold">{formatCurrency(site.minimumBalance)}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditing(site.id, 'minimumBalance', site.minimumBalance)}
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Edit2 className="w-3 h-3 text-gray-500" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingField?.siteId === site.id && editingField?.field === 'topUpAmount' ? (
                          <div className="flex items-center gap-1">
                            <span className="text-gray-500">$</span>
                            <Input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEdit(site.id, 'topUpAmount');
                                if (e.key === 'Escape') cancelEdit();
                              }}
                              className="w-24 h-7 text-sm text-right"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => saveEdit(site.id, 'topUpAmount')}
                              className="h-6 w-6 p-0"
                            >
                              <Check className="w-3 h-3 text-green-600" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={cancelEdit}
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-3 h-3 text-red-600" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <span className="text-lg font-semibold text-blue-600">{formatCurrency(site.topUpAmount)}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditing(site.id, 'topUpAmount', site.topUpAmount)}
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Edit2 className="w-3 h-3 text-gray-500" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm text-gray-600">
                        {site.lastTopUp ? new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }).format(site.lastTopUp) : 'Never'}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(site)}
                          className="h-8 w-8 p-0"
                          title="Edit Site Consent"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTopUp(site.id)}
                          className="h-8 px-3 text-xs"
                          title={`Top up $${site.topUpAmount}`}
                        >
                          Top Up
                        </Button>
                        {site.status !== 'healthy' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setQuickTopUpSite(site);
                              setIsQuickTopUpModalOpen(true);
                            }}
                            className="h-8 px-3 text-xs border-purple-500 text-purple-600 hover:bg-purple-50"
                            title="Quick top-up with credit card"
                          >
                            Quick Top-Up
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Rows per page</span>
                  <Select
                    value={rowsPerPage.toString()}
                    onValueChange={(value: string) => {
                      setRowsPerPage(Number(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sites Below Minimum</p>
                <p className="text-2xl font-bold text-red-600">
                  {sites.filter(s => s.walletBalance < s.minimumBalance).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Balance</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalBalance / sites.length)}
                </p>
              </div>
              <Wallet className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sites</p>
                <p className="text-2xl font-bold">{sites.length}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Monthly Spend</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalSpentThisMonth / sites.length)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method Selection Modal */}
      <PaymentMethodSelectionModal
        isOpen={isPaymentSelectionOpen}
        onClose={() => setIsPaymentSelectionOpen(false)}
        onSelectPayTo={() => {
          setIsPaymentSelectionOpen(false);
          setIsModalOpen(true);
        }}
        onSelectCreditCard={() => {
          setIsPaymentSelectionOpen(false);
          setIsCreditCardModalOpen(true);
        }}
        isCompanyLevel={true}
      />

      {/* Company Bank Account Modal (PayTo) */}
      <CompanyBankAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => {
          setCompanyBankSetup(true);
          setPaymentMethod('payto');
          setPaymentDetails(data);
          localStorage.setItem('companyBankSetup', 'true');
          localStorage.setItem('companyPaymentMethod', 'payto');
          localStorage.setItem('companyPaymentDetails', JSON.stringify(data));
          setIsModalOpen(false);
          console.log('Bank account setup complete:', data);
        }}
      />

      {/* Credit Card Payment Modal */}
      <CreditCardPaymentModal
        isOpen={isCreditCardModalOpen}
        onClose={() => setIsCreditCardModalOpen(false)}
        onSuccess={(data) => {
          setCompanyBankSetup(true);
          setPaymentMethod('card');
          setPaymentDetails(data);
          localStorage.setItem('companyBankSetup', 'true');
          localStorage.setItem('companyPaymentMethod', 'card');
          localStorage.setItem('companyPaymentDetails', JSON.stringify(data));
          setIsCreditCardModalOpen(false);
          console.log('Credit card setup complete:', data);
        }}
        isCompanyLevel={true}
      />

      {/* Site Bank Consent Modal */}
      {selectedSite && (
        <SiteBankConsentModal
          isOpen={isSiteModalOpen}
          onClose={() => {
            setIsSiteModalOpen(false);
            setSelectedSite(null);
          }}
          onSuccess={(data) => {
            // Update the site with new consent data and set PayTo status to active
            setSites(sites.map(site => 
              site.id === selectedSite.id 
                ? { 
                    ...site, 
                    monthlyLimit: parseFloat(data.siteMonthlyCapCeiling),
                    payToStatus: 'active' as const
                  }
                : site
            ));
            setIsSiteModalOpen(false);
            setSelectedSite(null);
            console.log('Site consent setup complete:', data);
          }}
          siteName={selectedSite.siteName}
          companyBankDetails={{
            accountName: 'McDonald\'s Westside QSR',
            bsb: '123456',
            accountNumber: '12345678',
            email: 'finance@mcdonalds-westside.com.au',
            monthlyCapCeiling: 1500  // Default ceiling of $1500
          }}
        />
      )}

      {/* Quick Top-Up Modal for urgent site funding */}
      {quickTopUpSite && (
        <CreditCardPaymentModal
          isOpen={isQuickTopUpModalOpen}
          onClose={() => {
            setIsQuickTopUpModalOpen(false);
            setQuickTopUpSite(null);
          }}
          onSuccess={(data) => {
            // Process the quick top-up
            const topUpAmount = parseFloat(data.topUpAmount);
            setSites(sites.map(site => {
              if (site.id === quickTopUpSite.id) {
                const newBalance = site.walletBalance + topUpAmount;
                return {
                  ...site,
                  walletBalance: newBalance,
                  lastTopUp: new Date(),
                  status: newBalance < site.minimumBalance ? 'critical' : 
                          newBalance < site.minimumBalance * 2 ? 'low' : 'healthy'
                };
              }
              return site;
            }));
            setIsQuickTopUpModalOpen(false);
            setQuickTopUpSite(null);
            console.log('Quick top-up complete:', data);
          }}
          isQuickTopUp={true}
          siteName={quickTopUpSite.siteName}
          suggestedAmount={Math.max(500, quickTopUpSite.minimumBalance * 3)}
        />
      )}
    </div>
  );
};

export default WalletView;