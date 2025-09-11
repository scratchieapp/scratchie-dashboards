import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock,
  Camera,
  Mic,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  Users,
  User,
  Gift,
  X,
  Check,
} from 'lucide-react';
import type { ConvoCard, SafetyStatus } from '../types/convoCard';
import { siteConvoCards, siteConvoCardSummary, siteDailySummary, siteWeeklySummary, currentUser } from '../data/mockConvoCards';
import ConvoCardDetailModal from './ConvoCardDetailModal';

const SiteConvoCards = () => {
  const [cards, setCards] = useState<ConvoCard[]>(siteConvoCards);
  const [summary] = useState(siteConvoCardSummary);
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week'>('today');
  const [safetyStatusFilter, setSafetyStatusFilter] = useState<SafetyStatus | 'all'>('all');
  const [periodFilter, setPeriodFilter] = useState<'today' | 'week' | 'month'>('today');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [selectedCard, setSelectedCard] = useState<ConvoCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle close out functionality
  const handleCloseOut = (cardId: string, isChecked: boolean) => {
    setCards(prev => prev.map(card => {
      if (card.id === cardId) {
        if (isChecked) {
          return {
            ...card,
            status: 'closed' as const,
            closedBy: currentUser.fullName,
            closedAt: new Date()
          };
        } else {
          return {
            ...card,
            status: 'open' as const,
            closedBy: undefined,
            closedAt: undefined
          };
        }
      }
      return card;
    }));
  };

  // Handle status changes (accept/reject)
  const handleStatusChange = (cardId: string, newStatus: 'accepted' | 'rejected' | 'closed') => {
    setCards(prev => prev.map(card => {
      if (card.id === cardId) {
        if (newStatus === 'closed') {
          return {
            ...card,
            status: newStatus,
            closedBy: currentUser.fullName,
            closedAt: new Date()
          };
        }
        return { ...card, status: newStatus };
      }
      return card;
    }));
  };

  // Handle reward
  const handleReward = (cardId: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isRewarded: true } : card
    ));
  };

  // Open card detail
  const handleCardClick = (card: ConvoCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  // Format multiple reporters
  const formatReporters = (reportedBy: string | string[]) => {
    if (Array.isArray(reportedBy)) {
      if (reportedBy.length === 1) return reportedBy[0];
      if (reportedBy.length === 2) return reportedBy.join(' & ');
      return `${reportedBy[0]} +${reportedBy.length - 1}`;
    }
    return reportedBy;
  };

  // Filter cards based on criteria
  const filteredCards = cards.filter(card => {
    // Safety status filter
    if (safetyStatusFilter !== 'all' && card.safetyStatus !== safetyStatusFilter) {
      return false;
    }
    
    // Period filter (for demo, we'll just filter based on timestamp relative to now)
    const now = new Date();
    const cardTime = card.timestamp;
    
    if (periodFilter === 'today') {
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      if (cardTime < startOfDay) return false;
    } else if (periodFilter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      if (cardTime < weekAgo) return false;
    } else if (periodFilter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      if (cardTime < monthAgo) return false;
    }
    
    // Keywords filter
    if (searchKeywords) {
      const keywords = searchKeywords.toLowerCase();
      const searchableText = [
        card.description,
        card.location,
        card.reportedBy
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(keywords)) return false;
    }
    
    return true;
  });

  const getSafetyStatusStyle = (status: SafetyStatus) => {
    switch (status) {
      case 'SAFE_TO_WORK':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'NOT_SAFE_TO_WORK':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'I_DONT_KNOW':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSafetyStatusIcon = (status: SafetyStatus) => {
    switch (status) {
      case 'SAFE_TO_WORK':
        return <CheckCircle className="h-4 w-4" />;
      case 'NOT_SAFE_TO_WORK':
        return <AlertTriangle className="h-4 w-4" />;
      case 'I_DONT_KNOW':
        return <HelpCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} mins ago`;
    } else if (diffMinutes < 1440) {
      const hours = Math.floor(diffMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-AU', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getCardActions = (card: ConvoCard, event?: React.MouseEvent) => {
    // Prevent card click when clicking actions
    if (event) {
      event.stopPropagation();
    }

    if (card.status === 'closed') {
      return (
        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-green-600">
            ✓ Closed by {card.closedBy}
          </div>
          {card.isRewarded && (
            <Badge className="bg-purple-100 text-purple-700">
              <Gift className="h-3 w-3 mr-1" />
              Rewarded
            </Badge>
          )}
        </div>
      );
    }

    if (card.status === 'accepted') {
      return (
        <div className="flex flex-col items-end gap-2">
          <Badge className="bg-green-100 text-green-700">
            <Check className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
          {card.isRewarded ? (
            <Badge className="bg-purple-100 text-purple-700">
              <Gift className="h-3 w-3 mr-1" />
              Rewarded
            </Badge>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-purple-50 hover:bg-purple-100"
              onClick={(e) => {
                e.stopPropagation();
                handleReward(card.id);
              }}
            >
              <Gift className="h-4 w-4 mr-1" />
              Reward
            </Button>
          )}
        </div>
      );
    }

    if (card.status === 'rejected') {
      return (
        <Badge className="bg-red-100 text-red-700">
          <X className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      );
    }

    // Open or needs_review status
    return (
      <div className="flex gap-1">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-green-50 hover:bg-green-100"
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(card.id, 'accepted');
          }}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-red-50 hover:bg-red-100"
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(card.id, 'rejected');
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* LLM-Generated Summary - The Star Feature */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl font-semibold text-blue-900">AI Safety Insights</CardTitle>
            </div>
            <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as 'today' | 'week')}>
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPeriod}>
            <TabsContent value="today">
              <div className="prose max-w-none text-sm">
                {siteDailySummary.split('\n').map((line, index) => (
                  <div key={index} className={`${line.startsWith('**') ? 'font-semibold text-blue-900 mt-3 mb-1' : 'text-gray-700'} ${line.startsWith('•') ? 'ml-4' : ''}`}>
                    {line.replace(/\*\*/g, '')}
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="week">
              <div className="prose max-w-none text-sm">
                {siteWeeklySummary.split('\n').map((line, index) => (
                  <div key={index} className={`${line.startsWith('**') ? 'font-semibold text-blue-900 mt-3 mb-1' : 'text-gray-700'} ${line.startsWith('•') ? 'ml-4' : ''}`}>
                    {line.replace(/\*\*/g, '')}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className={`${summary.unclosedCritical > 0 ? 'bg-red-50 border-red-200' : ''}`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{summary.unclosedCritical}</div>
            <div className="text-xs text-gray-600 uppercase">Unclosed Critical</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{summary.safeToWork}</div>
            <div className="text-xs text-gray-600 uppercase">Safe to Work</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{summary.responseRate}%</div>
            <div className="text-xs text-gray-600 uppercase">Response Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtering Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              ConvoCards Filter
            </CardTitle>
            <span className="text-sm text-gray-600">
              {filteredCards.length} of {cards.length} cards
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Safety Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Safety Status</label>
              <Select value={safetyStatusFilter} onValueChange={(value) => setSafetyStatusFilter(value as SafetyStatus | 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="NOT_SAFE_TO_WORK">🚨 Not Safe to Work</SelectItem>
                  <SelectItem value="I_DONT_KNOW">❓ I Don't Know</SelectItem>
                  <SelectItem value="SAFE_TO_WORK">✅ Safe to Work</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Period Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select value={periodFilter} onValueChange={(value) => setPeriodFilter(value as 'today' | 'week' | 'month')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Keywords Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Keywords</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search descriptions, locations..."
                  value={searchKeywords}
                  onChange={(e) => setSearchKeywords(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">ConvoCards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCards.map((card) => (
              <div 
                key={card.id} 
                className={`flex gap-4 p-4 border rounded-lg cursor-pointer ${
                  card.safetyStatus === 'NOT_SAFE_TO_WORK' ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
                } hover:shadow-md transition-shadow`}
                onClick={() => handleCardClick(card)}
              >
                {/* Thumbnail or Icon */}
                <div className="w-16 h-16 flex-shrink-0">
                  {card.thumbnailUrl ? (
                    <img 
                      src={card.thumbnailUrl} 
                      alt="Safety observation" 
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        // Fallback to icon on image error
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-16 h-16 flex items-center justify-center rounded-lg text-2xl ${
                            card.safetyStatus === 'NOT_SAFE_TO_WORK' ? 'bg-red-500' :
                            card.safetyStatus === 'I_DONT_KNOW' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }"><span class="text-white">${card.iconEmoji}</span></div>`;
                        }
                      }}
                    />
                  ) : (
                    <div className={`w-16 h-16 flex items-center justify-center rounded-lg text-2xl ${
                      card.safetyStatus === 'NOT_SAFE_TO_WORK' ? 'bg-red-500' :
                      card.safetyStatus === 'I_DONT_KNOW' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}>
                      <span className="text-white">{card.iconEmoji}</span>
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="flex-1 space-y-2">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={`${getSafetyStatusStyle(card.safetyStatus)} border font-semibold`}
                    >
                      {getSafetyStatusIcon(card.safetyStatus)}
                      <span className="ml-1">
                        {card.safetyStatus.replace(/_/g, ' ')}
                      </span>
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-3 w-3" />
                      {formatTime(card.timestamp)} - {formatTimeAgo(card.timestamp)}
                    </div>
                    {card.integrationTarget && (
                      <Badge variant="outline" className="text-blue-600 border-blue-300">
                        <ArrowRight className="h-3 w-3 mr-1" />
                        {card.integrationTarget}
                      </Badge>
                    )}
                  </div>

                  {/* Description */}
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {card.description}
                  </div>

                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>📍 {card.location}</span>
                    <span className="flex items-center gap-1">
                      {Array.isArray(card.reportedBy) && card.reportedBy.length > 1 ? (
                        <Users className="h-3 w-3" />
                      ) : (
                        <User className="h-3 w-3" />
                      )}
                      {formatReporters(card.reportedBy)}
                    </span>
                    {card.hasVoiceNote && (
                      <span className="flex items-center gap-1">
                        <Mic className="h-3 w-3" />
                        Voice note attached
                      </span>
                    )}
                    {card.photoCount > 0 && (
                      <span className="flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        {card.photoCount} photo{card.photoCount > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  {getCardActions(card)}
                </div>
              </div>
            ))}
          </div>

          {filteredCards.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No ConvoCards match your current filters. Try adjusting your search criteria.
            </div>
          )}

          {/* Load More */}
          {filteredCards.length > 0 && (
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="gap-2">
                Load More Cards
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ConvoCard Detail Modal */}
      <ConvoCardDetailModal
        card={selectedCard}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCard(null);
        }}
        onStatusChange={handleStatusChange}
        onReward={handleReward}
        onCloseOut={handleCloseOut}
      />
    </div>
  );
};

export default SiteConvoCards;