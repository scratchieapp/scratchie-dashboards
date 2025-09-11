import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Clock,
  Camera,
  Mic,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import type { ConvoCard, SafetyStatus } from '../types/convoCard';
import { siteConvoCards, siteConvoCardSummary } from '../data/mockConvoCards';

const SiteConvoCards = () => {
  const [cards] = useState<ConvoCard[]>(siteConvoCards);
  const [summary] = useState(siteConvoCardSummary);

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

  const getCardActions = (card: ConvoCard) => {
    if (card.status === 'closed') {
      return (
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Checkbox checked disabled />
            <span className="text-sm text-gray-600">Closed out</span>
          </div>
          <div className="text-xs text-green-600">
            ✓ Closed by {card.closedBy} at {card.closedAt ? formatTime(card.closedAt) : ''}
          </div>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      );
    }

    if (card.status === 'open' && card.safetyStatus === 'NOT_SAFE_TO_WORK') {
      return (
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <Checkbox />
            <span className="text-sm">Close out</span>
          </div>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
      );
    }

    if (card.status === 'needs_review' || card.status === 'open') {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-green-50 hover:bg-green-100">
              Accept
            </Button>
            <Button variant="outline" size="sm" className="bg-red-50 hover:bg-red-100">
              Reject
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-50 hover:bg-blue-100">
              Reward
            </Button>
          </div>
        </div>
      );
    }

    if (card.status === 'accepted') {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-green-50">
              Accept
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-50 hover:bg-blue-100">
              Reward
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">Site Safety Snapshot</CardTitle>
            <span className="text-sm text-gray-600">
              Last updated: {formatTime(summary.lastUpdated)}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className={`${summary.unclosedCritical > 0 ? 'bg-red-50 border-red-200' : ''}`}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{summary.unclosedCritical}</div>
                <div className="text-xs text-gray-600 uppercase">Unclosed Critical</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{summary.needsReview}</div>
                <div className="text-xs text-gray-600 uppercase">Needs Review</div>
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

          {/* Key Findings */}
          <div className="space-y-3">
            <h3 className="font-semibold text-base">Key Findings</h3>
            <div className={`p-3 rounded-lg ${
              summary.unclosedCritical > 0 
                ? 'bg-red-50 border border-red-200' 
                : 'bg-green-50 border border-green-200'
            }`}>
              <strong className="text-red-700">
                {summary.unclosedCritical > 0 ? '🚨 Immediate Action Required:' : '✅ All Clear:'} 
              </strong>{' '}
              <span className="text-gray-700">{summary.summary}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Convo Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cards.map((card) => (
              <div 
                key={card.id} 
                className={`flex gap-4 p-4 border rounded-lg ${
                  card.safetyStatus === 'NOT_SAFE_TO_WORK' ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
                } hover:shadow-md transition-shadow`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 flex items-center justify-center rounded-lg text-2xl ${
                  card.safetyStatus === 'NOT_SAFE_TO_WORK' ? 'bg-red-500' :
                  card.safetyStatus === 'I_DONT_KNOW' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}>
                  <span className="text-white">{card.iconEmoji}</span>
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
                    <span>👤 {card.reportedBy}</span>
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
                <div className="flex-shrink-0">
                  {getCardActions(card)}
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="gap-2">
              Load More Cards
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteConvoCards;