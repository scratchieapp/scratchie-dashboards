import React, { useState, useMemo } from 'react';
import { Trophy, Zap, Search, X, Calendar } from 'lucide-react';
import type { Award, AwardType, AwardFilters } from '../types/award';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Card, CardContent } from './ui/card';

interface AwardsTableProps {
  awards: Award[];
  initialFilters?: AwardFilters;
  onResetFilters?: () => void;
}

const AwardsTable: React.FC<AwardsTableProps> = ({ 
  awards, 
  initialFilters = {},
  onResetFilters
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<AwardType | 'all'>(initialFilters.type || 'all');
  const [dateFilter, setDateFilter] = useState(initialFilters.dateRange || 'all');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Calculate summary stats
  const stats = useMemo(() => {
    const filtered = typeFilter === 'all' ? awards : awards.filter(a => a.type === typeFilter);
    const scratchies = filtered.filter(a => a.type === 'scratchie');
    const turbos = filtered.filter(a => a.type === 'turbo');
    
    return {
      total: filtered.length,
      scratchies: scratchies.length,
      turbos: turbos.length,
      totalPoints: scratchies.reduce((sum, a) => sum + a.points, 0),
      totalCash: turbos.reduce((sum, a) => sum + (a.cashAmount || 0), 0)
    };
  }, [awards, typeFilter]);

  // Filter awards
  const filteredAwards = useMemo(() => {
    let filtered = [...awards];

    // Apply initial filters if provided
    if (initialFilters.dateRange) {
      const now = new Date();
      if (initialFilters.dateRange === 'today') {
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        filtered = filtered.filter(a => a.date >= todayStart);
      } else if (initialFilters.dateRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(a => a.date >= weekAgo);
      } else if (initialFilters.dateRange === 'month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        filtered = filtered.filter(a => a.date >= monthStart);
      }
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      if (dateFilter === 'today') {
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        filtered = filtered.filter(a => a.date >= todayStart);
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(a => a.date >= weekAgo);
      } else if (dateFilter === 'month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        filtered = filtered.filter(a => a.date >= monthStart);
      }
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(a => a.type === typeFilter);
    }

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(a =>
        a.recipientName.toLowerCase().includes(search) ||
        a.giverName.toLowerCase().includes(search) ||
        a.category.toLowerCase().includes(search) ||
        a.reason.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [awards, searchTerm, typeFilter, dateFilter, initialFilters]);

  // Update hasActiveFilters
  React.useEffect(() => {
    setHasActiveFilters(
      searchTerm !== '' ||
      typeFilter !== 'all' ||
      dateFilter !== 'all' ||
      !!initialFilters.dateRange
    );
  }, [searchTerm, typeFilter, dateFilter, initialFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredAwards.length / rowsPerPage);
  const paginatedAwards = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAwards.slice(start, start + rowsPerPage);
  }, [filteredAwards, currentPage, rowsPerPage]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, dateFilter, rowsPerPage]);

  const handleReset = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setDateFilter('all');
    setCurrentPage(1);
    if (onResetFilters) {
      onResetFilters();
    }
  };

  const TypeBadge: React.FC<{ type: AwardType }> = ({ type }) => {
    if (type === 'turbo') {
      return (
        <Badge className="bg-purple-100 text-purple-800">
          <Zap className="w-3 h-3 mr-1" />
          Turbo
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-100 text-blue-800">
        <Trophy className="w-3 h-3 mr-1" />
        Scratchie
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Awards</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Scratchies</p>
            <p className="text-2xl font-bold text-blue-600">{stats.scratchies}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Turbo Scratchies</p>
            <p className="text-2xl font-bold text-purple-600">{stats.turbos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Points</p>
            <p className="text-2xl font-bold text-green-600">{stats.totalPoints}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Cash</p>
            <p className="text-2xl font-bold text-green-600">${stats.totalCash}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex flex-1 gap-2 items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search awards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as AwardType | 'all')}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="scratchie">Scratchie</SelectItem>
                  <SelectItem value="turbo">Turbo</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Filter */}
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>

              {/* Reset Button */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="whitespace-nowrap"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
              )}
            </div>

            {/* Rows per page */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows:</span>
              <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(parseInt(value))}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active filters indicator */}
          {initialFilters.dateRange && (
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary">
                <Calendar className="w-3 h-3 mr-1" />
                Filtered: {initialFilters.dateRange === 'week' ? 'This Week' : 
                          initialFilters.dateRange === 'today' ? 'Today' : 
                          'This Month'}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Given By</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Reward</TableHead>
                  <TableHead>Site</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAwards.map((award) => (
                  <TableRow key={award.id}>
                    <TableCell className="whitespace-nowrap">
                      {award.date.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <TypeBadge type={award.type} />
                    </TableCell>
                    <TableCell className="font-medium">{award.recipientName}</TableCell>
                    <TableCell>{award.giverName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{award.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate" title={award.reason}>
                      {award.reason}
                    </TableCell>
                    <TableCell>
                      {award.type === 'turbo' ? (
                        <span className="font-bold text-green-600">${award.cashAmount}</span>
                      ) : (
                        <span className="font-bold text-blue-600">{award.points} pts</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{award.site}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-gray-600">
                Showing {paginatedAwards.length} of {filteredAwards.length} awards
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AwardsTable;