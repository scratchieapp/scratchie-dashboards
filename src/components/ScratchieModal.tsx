import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Trophy, 
  Zap, 
  Search, 
  Mic, 
  MicOff,
  ChevronLeft,
  ChevronRight,
  Users,
  CheckCircle
} from 'lucide-react';

interface ScratchieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: 'safety', name: 'Safety Procedures', icon: '🦺', color: 'bg-red-100 text-red-700' },
  { id: 'team', name: 'Team Collaboration', icon: '🤝', color: 'bg-blue-100 text-blue-700' },
  { id: 'guest', name: 'Guest Satisfaction', icon: '😊', color: 'bg-green-100 text-green-700' },
  { id: 'clean', name: 'Cleanliness Champion', icon: '✨', color: 'bg-purple-100 text-purple-700' },
  { id: 'extra', name: 'Going Extra Mile', icon: '🚀', color: 'bg-orange-100 text-orange-700' },
  { id: 'problem', name: 'Problem Resolution', icon: '💡', color: 'bg-yellow-100 text-yellow-700' }
];

const mockParticipants = [
  { id: '1', name: 'John Smith', role: 'Crew Member', department: 'Kitchen' },
  { id: '2', name: 'Sarah Chen', role: 'Shift Manager', department: 'Front Counter' },
  { id: '3', name: 'Mike O\'Brien', role: 'Crew Member', department: 'Drive Thru' },
  { id: '4', name: 'Lisa Wong', role: 'Crew Trainer', department: 'Kitchen' },
  { id: '5', name: 'Tom Anderson', role: 'Crew Member', department: 'McCafe' },
  { id: '6', name: 'Emma Thompson', role: 'Assistant Manager', department: 'Management' },
  { id: '7', name: 'James Liu', role: 'Crew Member', department: 'Kitchen' },
  { id: '8', name: 'Amy Johnson', role: 'Crew Member', department: 'Front Counter' },
  { id: '9', name: 'Robert White', role: 'Maintenance', department: 'Operations' },
  { id: '10', name: 'David Park', role: 'Crew Member', department: 'Drive Thru' }
];

const ScratchieModal = ({ isOpen, onClose }: ScratchieModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [scratchieType, setScratchieType] = useState<'scratchie' | 'turbo' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [numberOfWinners, setNumberOfWinners] = useState(1);
  const [allWinners, setAllWinners] = useState(false);
  const [awardMessage, setAwardMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleParticipantToggle = (participantId: string) => {
    setSelectedParticipants(prev =>
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const filteredParticipants = mockParticipants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    // Here you would submit to the API endpoint
    console.log({
      type: scratchieType,
      category: selectedCategory,
      participants: selectedParticipants,
      winners: allWinners ? selectedParticipants.length : numberOfWinners,
      message: awardMessage
    });
    
    // Reset and close
    setCurrentStep(1);
    setScratchieType(null);
    setSelectedCategory(null);
    setSelectedParticipants([]);
    setNumberOfWinners(1);
    setAllWinners(false);
    setAwardMessage('');
    onClose();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return scratchieType !== null;
      case 2: return selectedCategory !== null;
      case 3: return selectedParticipants.length > 0;
      case 4: return true; // Winners selection is always valid
      case 5: return awardMessage.trim() !== '';
      default: return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Issue a Scratchie
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Choose Type */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Choose Award Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${
                  scratchieType === 'scratchie' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'
                }`}
                onClick={() => setScratchieType('scratchie')}
              >
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <h4 className="font-semibold text-lg mb-2">Scratchie</h4>
                  <p className="text-sm text-gray-600">
                    Standard recognition award for great work
                  </p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${
                  scratchieType === 'turbo' ? 'border-orange-500 bg-orange-50' : 'hover:border-gray-400'
                }`}
                onClick={() => setScratchieType('turbo')}
              >
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-3 text-orange-600" />
                  <h4 className="font-semibold text-lg mb-2">Turbo Scratchie</h4>
                  <p className="text-sm text-gray-600">
                    Premium cash reward for exceptional performance
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Select Category */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Select Category</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(category => (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category.id ? 'border-blue-500 shadow-md' : 'hover:border-gray-400'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium">{category.name}</p>
                    </div>
                    {selectedCategory === category.id && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Participants */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Select Participants</h3>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, role, or department..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="border rounded-lg max-h-64 overflow-y-auto">
              {filteredParticipants.map(participant => (
                <div
                  key={participant.id}
                  className={`flex items-center justify-between p-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                    selectedParticipants.includes(participant.id) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleParticipantToggle(participant.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedParticipants.includes(participant.id)}
                      onCheckedChange={() => handleParticipantToggle(participant.id)}
                    />
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-gray-600">
                        {participant.role} • {participant.department}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedParticipants.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">
                  {selectedParticipants.length} participant(s) selected
                </span>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Choose Winners */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Choose Number of Winners</h3>
            
            {selectedParticipants.length > 1 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="all-winners" className="cursor-pointer">
                      All players will receive an award
                    </Label>
                    <Checkbox
                      id="all-winners"
                      checked={allWinners}
                      onCheckedChange={(checked: boolean) => {
                        setAllWinners(checked);
                        if (checked) {
                          setNumberOfWinners(selectedParticipants.length);
                        } else {
                          setNumberOfWinners(1);
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {!allWinners && selectedParticipants.length > 1 && (
              <div className="space-y-2">
                <Label>Number of Winners</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNumberOfWinners(Math.max(1, numberOfWinners - 1))}
                    disabled={numberOfWinners <= 1}
                  >
                    -
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center">{numberOfWinners}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNumberOfWinners(Math.min(selectedParticipants.length, numberOfWinners + 1))}
                    disabled={numberOfWinners >= selectedParticipants.length}
                  >
                    +
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Maximum: {selectedParticipants.length} (number of selected participants)
                </p>
              </div>
            )}

            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm">
                  <span className="font-semibold">{numberOfWinners}</span> winner(s) will be 
                  randomly selected from <span className="font-semibold">{selectedParticipants.length}</span> participant(s)
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 5: Award Details */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Add Award Details</h3>
            
            <div className="space-y-4">
              <div>
                <Label>Recognition Message</Label>
                <Textarea
                  placeholder="Type your recognition message here..."
                  value={awardMessage}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAwardMessage(e.target.value)}
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <div className="flex items-center justify-center">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="lg"
                  onClick={() => setIsRecording(!isRecording)}
                  className="gap-2"
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-5 h-5" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5" />
                      Record Voice Message
                    </>
                  )}
                </Button>
              </div>

              {isRecording && (
                <div className="text-center text-sm text-gray-600">
                  Recording... Click stop when finished
                </div>
              )}
            </div>

            {/* Summary */}
            <Card className="bg-gray-50">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-semibold mb-2">Award Summary</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Type:</span> {scratchieType === 'turbo' ? 'Turbo Scratchie' : 'Scratchie'}</p>
                  <p><span className="font-medium">Category:</span> {categories.find(c => c.id === selectedCategory)?.name}</p>
                  <p><span className="font-medium">Participants:</span> {selectedParticipants.length}</p>
                  <p><span className="font-medium">Winners:</span> {numberOfWinners}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handleBack}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="bg-green-600 hover:bg-green-700"
            >
              Give Award
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScratchieModal;