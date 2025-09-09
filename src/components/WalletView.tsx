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
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  AlertCircle,
  Plus,
  Download,
  Upload
} from 'lucide-react';

interface SiteWallet {
  id: string;
  siteName: string;
  walletBalance: number;
  maximumBalance: number;
  minimumBalance: number;
  topUpAmount: number;
  lastTopUp?: Date;
  status: 'healthy' | 'low' | 'critical';
  monthlySpend: number;
}

const WalletView = () => {
  const [sites, setSites] = useState<SiteWallet[]>([
    {
      id: '1',
      siteName: 'Randwick',
      walletBalance: 0,
      maximumBalance: 200,
      minimumBalance: 10,
      topUpAmount: 20,
      status: 'critical',
      monthlySpend: 185,
      lastTopUp: new Date('2024-01-15')
    },
    {
      id: '2',
      siteName: 'Eastside Rewarding Great People (RGP)',
      walletBalance: 3469,
      maximumBalance: 1000,
      minimumBalance: 200,
      topUpAmount: 200,
      status: 'healthy',
      monthlySpend: 425,
      lastTopUp: new Date('2024-01-20')
    },
    {
      id: '3',
      siteName: 'Chisholm',
      walletBalance: 850,
      maximumBalance: 1200,
      minimumBalance: 150,
      topUpAmount: 300,
      status: 'healthy',
      monthlySpend: 380,
      lastTopUp: new Date('2024-01-18')
    },
    {
      id: '4',
      siteName: 'Westmead',
      walletBalance: 45,
      maximumBalance: 800,
      minimumBalance: 100,
      topUpAmount: 150,
      status: 'low',
      monthlySpend: 620,
      lastTopUp: new Date('2024-01-10')
    },
    {
      id: '5',
      siteName: 'Parramatta',
      walletBalance: 1200,
      maximumBalance: 1500,
      minimumBalance: 200,
      topUpAmount: 250,
      status: 'healthy',
      monthlySpend: 290,
      lastTopUp: new Date('2024-01-22')
    },
    {
      id: '6',
      siteName: 'Castle Hill',
      walletBalance: 320,
      maximumBalance: 1000,
      minimumBalance: 100,
      topUpAmount: 200,
      status: 'healthy',
      monthlySpend: 510,
      lastTopUp: new Date('2024-01-19')
    },
    {
      id: '7',
      siteName: 'Penrith',
      walletBalance: 75,
      maximumBalance: 900,
      minimumBalance: 80,
      topUpAmount: 180,
      status: 'low',
      monthlySpend: 715,
      lastTopUp: new Date('2024-01-12')
    },
    {
      id: '8',
      siteName: 'Liverpool',
      walletBalance: 890,
      maximumBalance: 1100,
      minimumBalance: 150,
      topUpAmount: 220,
      status: 'healthy',
      monthlySpend: 180,
      lastTopUp: new Date('2024-01-21')
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<SiteWallet>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const totalBalance = sites.reduce((sum, site) => sum + site.walletBalance, 0);
  const totalSpentThisMonth = sites.reduce((sum, site) => sum + site.monthlySpend, 0);
  const totalMaximumBalance = sites.reduce((sum, site) => sum + site.maximumBalance, 0);

  const handleEdit = (site: SiteWallet) => {
    setEditingId(site.id);
    setEditValues({
      maximumBalance: site.maximumBalance,
      minimumBalance: site.minimumBalance,
      topUpAmount: site.topUpAmount,
    });
  };

  const handleSave = () => {
    if (editingId) {
      setSites(sites.map(site => 
        site.id === editingId 
          ? { ...site, ...editValues }
          : site
      ));
      setEditingId(null);
      setEditValues({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const handleTopUp = (siteId: string) => {
    setSites(sites.map(site => {
      if (site.id === siteId) {
        const newBalance = Math.min(site.walletBalance + site.topUpAmount, site.maximumBalance);
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
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Site Wallet
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
                {formatCurrency(totalMaximumBalance)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">Site Maximum Balance</p>
              <div className="flex items-center mt-2 text-purple-400">
                <Wallet className="w-4 h-4 mr-1" />
                <span className="text-xs">Combined limit</span>
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
                  <TableHead className="text-white font-semibold text-right">Wallet Balance</TableHead>
                  <TableHead className="text-white font-semibold text-right">Maximum Balance</TableHead>
                  <TableHead className="text-white font-semibold text-right">Minimum Balance</TableHead>
                  <TableHead className="text-white font-semibold text-right">Top-up Amount</TableHead>
                  <TableHead className="text-white font-semibold text-center">Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSites.map((site) => (
                  <TableRow key={site.id}>
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
                    <TableCell className={`text-right font-semibold ${getStatusColor(site.status)}`}>
                      {formatCurrency(site.walletBalance)}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === site.id ? (
                        <Input
                          type="number"
                          value={editValues.maximumBalance}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setEditValues({ ...editValues, maximumBalance: Number(e.target.value) })
                          }
                          className="w-28 ml-auto"
                        />
                      ) : (
                        formatCurrency(site.maximumBalance)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === site.id ? (
                        <Input
                          type="number"
                          value={editValues.minimumBalance}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setEditValues({ ...editValues, minimumBalance: Number(e.target.value) })
                          }
                          className="w-28 ml-auto"
                        />
                      ) : (
                        formatCurrency(site.minimumBalance)
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === site.id ? (
                        <Input
                          type="number"
                          value={editValues.topUpAmount}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setEditValues({ ...editValues, topUpAmount: Number(e.target.value) })
                          }
                          className="w-28 ml-auto"
                        />
                      ) : (
                        <span className="text-blue-600 font-semibold">
                          {formatCurrency(site.topUpAmount)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {editingId === site.id ? (
                        <div className="flex justify-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleSave}
                            className="h-8 w-8 p-0"
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancel}
                            className="h-8 w-8 p-0"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(site)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          {site.walletBalance < site.minimumBalance && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleTopUp(site.id)}
                              className="h-8 px-2 text-blue-600 hover:text-blue-700"
                            >
                              Top Up
                            </Button>
                          )}
                        </div>
                      )}
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
    </div>
  );
};

export default WalletView;