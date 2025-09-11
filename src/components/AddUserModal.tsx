import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
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
import type { UserRole } from '../types/user';
import { knownUserEmails } from '../data/mockUsers';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (userData: {
    email: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    role: UserRole;
    password?: string;
    isExisting: boolean;
  }) => void;
  isCompanyLevel?: boolean;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddUser,
  isCompanyLevel = false 
}) => {
  const [step, setStep] = useState<'email' | 'existing' | 'new'>('email');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState<UserRole>('Site Worker');
  const [password, setPassword] = useState('');
  const [useRandomPassword, setUseRandomPassword] = useState(true);
  const [searchingEmail, setSearchingEmail] = useState(false);

  const roles: UserRole[] = isCompanyLevel
    ? ['Company Owner', 'Company Admin', 'Site Superadmin', 'Site Admin', 'Site Manager', 'Site Worker']
    : ['Site Superadmin', 'Site Admin', 'Site Manager', 'Site Worker'];

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  const handleEmailLookup = async () => {
    setSearchingEmail(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (knownUserEmails.includes(email.toLowerCase())) {
      setStep('existing');
    } else {
      setStep('new');
      if (useRandomPassword) {
        setPassword(generateRandomPassword());
      }
    }
    setSearchingEmail(false);
  };

  const handleSubmit = () => {
    const userData = {
      email,
      firstName,
      lastName,
      mobile,
      role,
      password: step === 'new' ? password : undefined,
      isExisting: step === 'existing'
    };
    onAddUser(userData);
    handleClose();
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setFirstName('');
    setLastName('');
    setMobile('');
    setRole('Site Worker');
    setPassword('');
    setUseRandomPassword(true);
    onClose();
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'email' && 'Add User'}
            {step === 'existing' && 'Assign Role'}
            {step === 'new' && 'Create New User'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {step === 'email' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">User Email</Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter user email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && isValidEmail(email)) {
                        handleEmailLookup();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleEmailLookup}
                    disabled={!isValidEmail(email) || searchingEmail}
                  >
                    {searchingEmail ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Enter the email address to check if the user already exists
                </p>
              </div>
            </>
          )}

          {step === 'existing' && (
            <>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-900">User Found</p>
                <p className="text-sm text-blue-700 mt-1">{email}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Assign Role</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(r => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600">
                  This user already exists. Select their role for this {isCompanyLevel ? 'company' : 'site'}.
                </p>
              </div>
            </>
          )}

          {step === 'new' && (
            <>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-900">New User</p>
                <p className="text-sm text-green-700 mt-1">{email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="0412345678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newRole">Role</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(r => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex gap-2">
                  <Input
                    id="password"
                    type="text"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setUseRandomPassword(false);
                    }}
                    placeholder="Enter password"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newPass = generateRandomPassword();
                      setPassword(newPass);
                      setUseRandomPassword(true);
                    }}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  {useRandomPassword ? 'Auto-generated secure password' : 'Custom password'}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          {step !== 'email' && (
            <Button 
              onClick={handleSubmit}
              disabled={
                (step === 'new' && (!firstName || !lastName || !mobile || !password)) ||
                !role
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {step === 'existing' ? 'Assign User' : 'Create & Invite User'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;