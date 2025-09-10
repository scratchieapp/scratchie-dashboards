import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { User, UserRole, UserStatus } from '../types/user';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
  isCompanyLevel?: boolean;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ 
  isOpen, 
  onClose, 
  user,
  onSave,
  isCompanyLevel = false 
}) => {
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        ...user
      });
    }
  }, [user]);

  const roles: UserRole[] = isCompanyLevel
    ? ['Company Owner', 'Company Admin', 'Site Superadmin', 'Site Admin', 'Site Manager', 'Site Worker']
    : ['Site Superadmin', 'Site Admin', 'Site Manager', 'Site Worker'];

  const handleSave = () => {
    if (user && formData) {
      onSave({
        ...user,
        ...formData,
        updatedAt: new Date()
      } as User);
      onClose();
    }
  };

  const handleStatusChange = (status: UserStatus) => {
    setFormData({
      ...formData,
      status,
      lastActive: status === 'active' ? new Date() : formData.lastActive
    });
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Status</p>
                <p className="text-xs text-gray-500 mt-1">
                  Last active: {new Date(formData.lastActive || '').toLocaleDateString()}
                </p>
              </div>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleStatusChange(value as UserStatus)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      Active
                    </span>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                      Inactive
                    </span>
                  </SelectItem>
                  <SelectItem value="pending">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                      Pending
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName || ''}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName || ''}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile</Label>
            <Input
              id="mobile"
              value={formData.mobile || ''}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select 
              value={formData.role} 
              onValueChange={(value) => setFormData({...formData, role: value as UserRole})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select 
              value={formData.department || ''} 
              onValueChange={(value) => setFormData({...formData, department: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kitchen">Kitchen</SelectItem>
                <SelectItem value="Front Counter">Front Counter</SelectItem>
                <SelectItem value="Drive-Thru">Drive-Thru</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sites */}
          {isCompanyLevel && formData.sites && (
            <div className="space-y-2">
              <Label>Assigned Sites</Label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {formData.sites.map(site => (
                    <span 
                      key={site}
                      className="px-2 py-1 bg-white border rounded-md text-sm"
                    >
                      {site}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {formData.awardsReceived || 0}
              </p>
              <p className="text-sm text-gray-600">Awards Received</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {formData.recognitionsGiven || 0}
              </p>
              <p className="text-sm text-gray-600">Recognitions Given</p>
            </div>
          </div>

          {/* Dates */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>Created: {new Date(formData.createdAt || '').toLocaleString()}</p>
            <p>Updated: {new Date(formData.updatedAt || '').toLocaleString()}</p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;