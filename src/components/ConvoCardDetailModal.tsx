import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Clock,
  MapPin,
  User,
  Users,
  Camera,
  Mic,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Gift,
  X,
  Check
} from 'lucide-react';
import type { ConvoCard, SafetyStatus } from '../types/convoCard';

interface ConvoCardDetailModalProps {
  card: ConvoCard | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (cardId: string, status: 'accepted' | 'rejected' | 'closed') => void;
  onReward: (cardId: string) => void;
  onCloseOut: (cardId: string, isChecked: boolean) => void;
}

const ConvoCardDetailModal = ({ 
  card, 
  isOpen, 
  onClose, 
  onStatusChange,
  onReward,
  onCloseOut
}: ConvoCardDetailModalProps) => {
  if (!card) return null;

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

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-AU', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timestamp: Date) => {
    return timestamp.toLocaleDateString('en-AU', { 
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatReporters = (reportedBy: string | string[]) => {
    if (Array.isArray(reportedBy)) {
      if (reportedBy.length === 1) return reportedBy[0];
      if (reportedBy.length === 2) return reportedBy.join(' and ');
      return `${reportedBy.slice(0, -1).join(', ')} and ${reportedBy[reportedBy.length - 1]}`;
    }
    return reportedBy;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge 
                className={`${getSafetyStatusStyle(card.safetyStatus)} border font-semibold`}
              >
                {getSafetyStatusIcon(card.safetyStatus)}
                <span className="ml-1">
                  {card.safetyStatus.replace(/_/g, ' ')}
                </span>
              </Badge>
              {card.integrationTarget && (
                <Badge variant="outline" className="text-blue-600 border-blue-300">
                  <ArrowRight className="h-3 w-3 mr-1" />
                  {card.integrationTarget}
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Photo Gallery */}
          {card.photoUrls && card.photoUrls.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-gray-700">Photos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {card.photoUrls.map((url, index) => (
                  <img 
                    key={index}
                    src={url} 
                    alt={`Safety observation ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(url, '_blank')}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-700">Description</h3>
            <p className="text-gray-800 leading-relaxed">{card.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium">{card.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                {Array.isArray(card.reportedBy) && card.reportedBy.length > 1 ? (
                  <Users className="h-4 w-4 text-gray-500 mt-0.5" />
                ) : (
                  <User className="h-4 w-4 text-gray-500 mt-0.5" />
                )}
                <div>
                  <p className="text-xs text-gray-500">Reported By</p>
                  <p className="text-sm font-medium">{formatReporters(card.reportedBy)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Date & Time</p>
                  <p className="text-sm font-medium">
                    {formatDate(card.timestamp)} at {formatTime(card.timestamp)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Camera className="h-4 w-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Attachments</p>
                  <p className="text-sm">
                    {card.photoCount} photo{card.photoCount !== 1 ? 's' : ''}
                    {card.hasVoiceNote && (
                      <span className="ml-2">
                        <Mic className="h-3 w-3 inline mr-1" />
                        Voice note
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Note Player */}
          {card.hasVoiceNote && card.voiceNoteUrl && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-gray-700">Voice Note</h3>
              <audio controls className="w-full">
                <source src={card.voiceNoteUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Status Section */}
          {card.status === 'closed' && card.closedBy && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ Closed by {card.closedBy} at {card.closedAt ? formatTime(card.closedAt) : ''}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            {/* Left side actions */}
            <div className="flex items-center gap-3">
              {card.safetyStatus === 'NOT_SAFE_TO_WORK' && (
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={card.status === 'closed'}
                    onCheckedChange={(checked) => onCloseOut(card.id, checked as boolean)}
                  />
                  <span className="text-sm">Close out</span>
                </div>
              )}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {(card.status === 'open' || card.status === 'needs_review') && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-green-50 hover:bg-green-100"
                    onClick={() => onStatusChange(card.id, 'accepted')}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-red-50 hover:bg-red-100"
                    onClick={() => onStatusChange(card.id, 'rejected')}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </>
              )}
              
              {card.status === 'accepted' && !card.isRewarded && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-purple-50 hover:bg-purple-100"
                  onClick={() => onReward(card.id)}
                >
                  <Gift className="h-4 w-4 mr-1" />
                  Reward
                </Button>
              )}

              {card.isRewarded && (
                <Badge className="bg-purple-100 text-purple-700">
                  <Gift className="h-3 w-3 mr-1" />
                  Rewarded
                </Badge>
              )}

              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConvoCardDetailModal;