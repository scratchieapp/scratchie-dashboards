import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Phone,
  User
} from 'lucide-react';
import type { SiteConvoCardSummary } from '../types/convoCard';
import { companyConvoCards, companyConvoCardSummary } from '../data/mockConvoCards';

const CompanyConvoCards = () => {
  const [sites] = useState<SiteConvoCardSummary[]>(companyConvoCards);
  const [summary] = useState(companyConvoCardSummary);
  const [showCriticalDetails, setShowCriticalDetails] = useState(false);

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-AU', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
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

  const getSiteStatusStyle = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSiteStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'normal':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Company-Wide Summary */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">Company Safety Snapshot</CardTitle>
            <span className="text-sm text-gray-600">
              Last updated: {formatTime(summary.lastUpdated)} AEST
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {/* Company Stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${
                summary.unclosedCritical > 0 ? 'bg-red-50 border-red-200' : ''
              }`}
              onClick={() => setShowCriticalDetails(!showCriticalDetails)}
            >
              <CardContent className="p-4 text-center relative">
                <div className="text-2xl font-bold text-red-600">
                  {summary.unclosedCritical}{' '}
                  <span className="text-lg opacity-80">
                    (of {summary.unclosedCriticalTotal})
                  </span>
                </div>
                <div className="text-xs text-gray-600 uppercase flex items-center justify-center gap-1">
                  Unclosed Critical Issues
                  {showCriticalDetails ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{summary.totalCardsToday}</div>
                <div className="text-xs text-gray-600 uppercase">Total Cards Today</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{summary.safeToWorkRate}%</div>
                <div className="text-xs text-gray-600 uppercase">Safe to Work Rate</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{summary.sitesNeedAttention}</div>
                <div className="text-xs text-gray-600 uppercase">Sites Need Attention</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{summary.responseCompliance}%</div>
                <div className="text-xs text-gray-600 uppercase">Response Compliance</div>
              </CardContent>
            </Card>
          </div>

          {/* Executive Summary */}
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <strong className="text-blue-900">Executive Summary:</strong>{' '}
              <span className="text-blue-800">{summary.executiveSummary}</span>
            </div>
          </div>

          {/* Critical Details (Expandable) */}
          {showCriticalDetails && summary.unclosedCritical > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold mb-3 text-red-900">Unclosed Critical Issues:</h4>
              <div className="space-y-4">
                {summary.criticalIssues.map((issue, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-red-200">
                    <div className="text-sm text-red-800 mb-2">
                      <strong>{issue.site}:</strong> {issue.description}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      Reported {formatTimeAgo(issue.reportedAt)}
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1 text-blue-700">
                        <User className="h-3 w-3" />
                        <span className="font-medium">Site Manager:</span>
                        <span>{issue.siteManager.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-700">
                        <Phone className="h-3 w-3" />
                        <a 
                          href={`tel:${issue.siteManager.mobile}`}
                          className="hover:underline font-mono"
                        >
                          {issue.siteManager.mobile}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Site Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sites.map((site, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{site.siteName}</CardTitle>
                <Badge 
                  className={`${getSiteStatusStyle(site.status)} border font-semibold`}
                >
                  {getSiteStatusIcon(site.status)}
                  <span className="ml-1 uppercase">
                    {site.status}
                  </span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Site Metrics */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center">
                  <div className={`text-xl font-bold ${
                    site.unclosedCritical > 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {site.unclosedCritical}
                  </div>
                  <div className="text-xs text-gray-600">Unclosed</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{site.needsReview}</div>
                  <div className="text-xs text-gray-600">Unknown</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{site.safeToWork}</div>
                  <div className="text-xs text-gray-600">Safe</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{site.responseRate}%</div>
                  <div className="text-xs text-gray-600">Response</div>
                </div>
              </div>

              {/* Site Summary */}
              <div className="mb-4">
                <div className="text-sm text-gray-700 leading-relaxed">
                  <strong>Scratchie Brief:</strong> {site.summary}
                </div>
              </div>

              {/* View Details Button */}
              <div className="flex justify-end">
                <Button variant="outline" className="gap-2">
                  View {site.siteName} Dashboard
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Company-Wide Hazard Identification Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">24.5min</div>
              <div className="text-sm text-gray-600">Avg. Critical Response Time</div>
              <div className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                15% improvement this month
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">94.2%</div>
              <div className="text-sm text-gray-600">Avg. Site Engagement</div>
              <div className="text-xs text-blue-600 flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                Consistent across all sites
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">127</div>
              <div className="text-sm text-gray-600">Hazards Identified This Week</div>
              <div className="text-xs text-purple-600 flex items-center justify-center gap-1 mt-1">
                <CheckCircle className="h-3 w-3" />
                Proactive safety culture
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyConvoCards;