import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  Bell, 
  Plus, 
  X, 
  Save,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  User
} from 'lucide-react';

type NotificationMethod = 'in_app' | 'email' | 'sms';
type SafetyStatus = 'SAFE_TO_WORK' | 'NOT_SAFE_TO_WORK' | 'I_DONT_KNOW';

interface NotificationRecipient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  methods: NotificationMethod[];
  safetyStatuses: SafetyStatus[];
}

interface NotificationSettingsProps {
  level: 'site' | 'company';
  siteName?: string;
}

const NotificationSettings = ({ level, siteName }: NotificationSettingsProps) => {
  const [recipients, setRecipients] = useState<NotificationRecipient[]>([
    {
      id: '1',
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@mcdonalds.com',
      phone: '+61 411 234 567',
      role: 'Site Manager',
      methods: ['in_app', 'email', 'sms'],
      safetyStatuses: ['NOT_SAFE_TO_WORK']
    },
    {
      id: '2',
      name: 'Marcus Thompson',
      email: 'marcus.thompson@mcdonalds.com',
      phone: '+61 422 345 678',
      role: 'Safety Officer',
      methods: ['in_app', 'email'],
      safetyStatuses: ['NOT_SAFE_TO_WORK', 'I_DONT_KNOW']
    },
    {
      id: '3',
      name: 'David Martinez',
      email: 'david.martinez@mcdonalds.com',
      role: 'Supervisor',
      methods: ['email'],
      safetyStatuses: ['NOT_SAFE_TO_WORK']
    }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newRecipient, setNewRecipient] = useState<Partial<NotificationRecipient>>({
    name: '',
    email: '',
    phone: '',
    role: '',
    methods: [],
    safetyStatuses: []
  });

  const handleAddRecipient = () => {
    if (newRecipient.name && newRecipient.email) {
      setRecipients([...recipients, {
        ...newRecipient as NotificationRecipient,
        id: Date.now().toString()
      }]);
      setNewRecipient({
        name: '',
        email: '',
        phone: '',
        role: '',
        methods: [],
        safetyStatuses: []
      });
      setIsAddingNew(false);
    }
  };

  const handleRemoveRecipient = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  const toggleMethod = (recipientId: string, method: NotificationMethod) => {
    setRecipients(recipients.map(r => {
      if (r.id === recipientId) {
        const methods = r.methods.includes(method)
          ? r.methods.filter(m => m !== method)
          : [...r.methods, method];
        return { ...r, methods };
      }
      return r;
    }));
  };

  const toggleStatus = (recipientId: string, status: SafetyStatus) => {
    setRecipients(recipients.map(r => {
      if (r.id === recipientId) {
        const safetyStatuses = r.safetyStatuses.includes(status)
          ? r.safetyStatuses.filter(s => s !== status)
          : [...r.safetyStatuses, status];
        return { ...r, safetyStatuses };
      }
      return r;
    }));
  };

  const getStatusIcon = (status: SafetyStatus) => {
    switch (status) {
      case 'SAFE_TO_WORK':
        return <CheckCircle className="h-3 w-3" />;
      case 'NOT_SAFE_TO_WORK':
        return <AlertTriangle className="h-3 w-3" />;
      case 'I_DONT_KNOW':
        return <HelpCircle className="h-3 w-3" />;
    }
  };

  const getStatusStyle = (status: SafetyStatus) => {
    switch (status) {
      case 'SAFE_TO_WORK':
        return 'bg-green-100 text-green-800';
      case 'NOT_SAFE_TO_WORK':
        return 'bg-red-100 text-red-800';
      case 'I_DONT_KNOW':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {level === 'site' ? 'Site' : 'Company'} Notification Settings
              </CardTitle>
              {siteName && (
                <p className="text-sm text-gray-600 mt-1">{siteName}</p>
              )}
            </div>
            <Button 
              onClick={() => setIsAddingNew(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Recipient
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Configure who gets notified when ConvoCards are submitted. 
            {level === 'company' && ' These settings apply to all sites under your company.'}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{recipients.filter(r => r.safetyStatuses.includes('NOT_SAFE_TO_WORK')).length}</div>
              <div className="text-xs text-gray-600">Notified for Critical</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{recipients.filter(r => r.safetyStatuses.includes('I_DONT_KNOW')).length}</div>
              <div className="text-xs text-gray-600">Notified for Unknown</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{recipients.filter(r => r.safetyStatuses.includes('SAFE_TO_WORK')).length}</div>
              <div className="text-xs text-gray-600">Notified for Safe</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recipients List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notification Recipients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add New Recipient Form */}
            {isAddingNew && (
              <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name *</label>
                    <Input
                      placeholder="John Smith"
                      value={newRecipient.name}
                      onChange={(e) => setNewRecipient({...newRecipient, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Input
                      placeholder="Site Manager"
                      value={newRecipient.role}
                      onChange={(e) => setNewRecipient({...newRecipient, role: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email *</label>
                    <Input
                      type="email"
                      placeholder="john.smith@company.com"
                      value={newRecipient.email}
                      onChange={(e) => setNewRecipient({...newRecipient, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone (for SMS)</label>
                    <Input
                      placeholder="+61 4XX XXX XXX"
                      value={newRecipient.phone}
                      onChange={(e) => setNewRecipient({...newRecipient, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium">Notification Methods</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={newRecipient.methods?.includes('in_app')}
                        onCheckedChange={(checked) => {
                          const methods = checked 
                            ? [...(newRecipient.methods || []), 'in_app' as NotificationMethod]
                            : newRecipient.methods?.filter(m => m !== 'in_app') || [];
                          setNewRecipient({...newRecipient, methods});
                        }}
                      />
                      <Bell className="h-4 w-4" />
                      In-App
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={newRecipient.methods?.includes('email')}
                        onCheckedChange={(checked) => {
                          const methods = checked 
                            ? [...(newRecipient.methods || []), 'email' as NotificationMethod]
                            : newRecipient.methods?.filter(m => m !== 'email') || [];
                          setNewRecipient({...newRecipient, methods});
                        }}
                      />
                      <Mail className="h-4 w-4" />
                      Email
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={newRecipient.methods?.includes('sms')}
                        onCheckedChange={(checked) => {
                          const methods = checked 
                            ? [...(newRecipient.methods || []), 'sms' as NotificationMethod]
                            : newRecipient.methods?.filter(m => m !== 'sms') || [];
                          setNewRecipient({...newRecipient, methods});
                        }}
                      />
                      <Phone className="h-4 w-4" />
                      SMS
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium">Notify for ConvoCard Types</label>
                  <div className="flex gap-3 mt-2">
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={newRecipient.safetyStatuses?.includes('NOT_SAFE_TO_WORK')}
                        onCheckedChange={(checked) => {
                          const statuses = checked 
                            ? [...(newRecipient.safetyStatuses || []), 'NOT_SAFE_TO_WORK' as SafetyStatus]
                            : newRecipient.safetyStatuses?.filter(s => s !== 'NOT_SAFE_TO_WORK') || [];
                          setNewRecipient({...newRecipient, safetyStatuses: statuses});
                        }}
                      />
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      Not Safe to Work
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={newRecipient.safetyStatuses?.includes('I_DONT_KNOW')}
                        onCheckedChange={(checked) => {
                          const statuses = checked 
                            ? [...(newRecipient.safetyStatuses || []), 'I_DONT_KNOW' as SafetyStatus]
                            : newRecipient.safetyStatuses?.filter(s => s !== 'I_DONT_KNOW') || [];
                          setNewRecipient({...newRecipient, safetyStatuses: statuses});
                        }}
                      />
                      <HelpCircle className="h-4 w-4 text-yellow-600" />
                      I Don't Know
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox
                        checked={newRecipient.safetyStatuses?.includes('SAFE_TO_WORK')}
                        onCheckedChange={(checked) => {
                          const statuses = checked 
                            ? [...(newRecipient.safetyStatuses || []), 'SAFE_TO_WORK' as SafetyStatus]
                            : newRecipient.safetyStatuses?.filter(s => s !== 'SAFE_TO_WORK') || [];
                          setNewRecipient({...newRecipient, safetyStatuses: statuses});
                        }}
                      />
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Safe to Work
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddRecipient}
                    disabled={!newRecipient.name || !newRecipient.email}
                  >
                    Add Recipient
                  </Button>
                </div>
              </div>
            )}

            {/* Existing Recipients */}
            {recipients.map((recipient) => (
              <div key={recipient.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Recipient Info */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{recipient.name}</div>
                        <div className="text-sm text-gray-600">{recipient.role}</div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {recipient.email}
                      </span>
                      {recipient.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {recipient.phone}
                        </span>
                      )}
                    </div>

                    {/* Notification Methods */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500">Methods:</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={recipient.methods.includes('in_app') ? 'default' : 'outline'}
                          className={recipient.methods.includes('in_app') ? 'h-7 bg-blue-600' : 'h-7'}
                          onClick={() => toggleMethod(recipient.id, 'in_app')}
                        >
                          <Bell className="h-3 w-3 mr-1" />
                          In-App
                        </Button>
                        <Button
                          size="sm"
                          variant={recipient.methods.includes('email') ? 'default' : 'outline'}
                          className={recipient.methods.includes('email') ? 'h-7 bg-blue-600' : 'h-7'}
                          onClick={() => toggleMethod(recipient.id, 'email')}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                        <Button
                          size="sm"
                          variant={recipient.methods.includes('sms') ? 'default' : 'outline'}
                          className={recipient.methods.includes('sms') ? 'h-7 bg-purple-600' : 'h-7'}
                          onClick={() => toggleMethod(recipient.id, 'sms')}
                          disabled={!recipient.phone}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          SMS
                        </Button>
                      </div>
                    </div>

                    {/* ConvoCard Types */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Notified for:</span>
                      <div className="flex gap-2">
                        {(['NOT_SAFE_TO_WORK', 'I_DONT_KNOW', 'SAFE_TO_WORK'] as SafetyStatus[]).map(status => (
                          <Badge
                            key={status}
                            className={`cursor-pointer ${
                              recipient.safetyStatuses.includes(status)
                                ? getStatusStyle(status)
                                : 'bg-gray-100 text-gray-400'
                            }`}
                            onClick={() => toggleStatus(recipient.id, status)}
                          >
                            {getStatusIcon(status)}
                            <span className="ml-1 text-xs">
                              {status === 'NOT_SAFE_TO_WORK' ? 'Critical' :
                               status === 'I_DONT_KNOW' ? 'Unknown' : 'Safe'}
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleRemoveRecipient(recipient.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {recipients.length === 0 && !isAddingNew && (
            <div className="text-center py-8 text-gray-500">
              No notification recipients configured. Click "Add Recipient" to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-1" />
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;