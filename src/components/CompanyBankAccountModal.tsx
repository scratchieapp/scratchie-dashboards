import React, { useState } from 'react';
import { AlertCircle, Check, ChevronRight, Shield, DollarSign, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BankAccountData {
  accountName: string;
  bsb: string;
  accountNumber: string;
  email: string;
  monthlyCapCeiling: string;
  billingDay: string;
  startDate: string;
  endDate: string;
  acceptTerms: boolean;
  acceptPayTo: boolean;
}

interface CompanyBankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: BankAccountData) => void;
}

const CompanyBankAccountModal: React.FC<CompanyBankAccountModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess 
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'success'>('pending');
  
  const [formData, setFormData] = useState({
    accountName: '',
    bsb: '',
    accountNumber: '',
    email: '',
    monthlyCapCeiling: '2000', // Company-wide ceiling for all sites
    billingDay: '1',
    startDate: new Date().toISOString().split('T')[0], // Default to today
    endDate: '',
    acceptTerms: false,
    acceptPayTo: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate weekly max from monthly cap (1/4 of monthly)
  const weeklyMax = Math.floor(parseFloat(formData.monthlyCapCeiling || '0') / 4);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatBSB = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}`;
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.accountName.trim()) {
      newErrors.accountName = 'Account name is required';
    }
    
    const bsbNumbers = formData.bsb.replace(/\D/g, '');
    if (bsbNumbers.length !== 6) {
      newErrors.bsb = 'BSB must be 6 digits';
    }
    
    if (!formData.accountNumber || formData.accountNumber.length < 6) {
      newErrors.accountNumber = 'Valid account number is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.monthlyCapCeiling || parseFloat(formData.monthlyCapCeiling) <= 0) {
      newErrors.monthlyCapCeiling = 'Monthly cap ceiling must be greater than 0';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (formData.endDate && formData.endDate <= formData.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!formData.acceptTerms || !formData.acceptPayTo) {
      setErrors({ consent: 'You must accept all terms to proceed' });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call to create and verify payment consent
    setTimeout(() => {
      setVerificationStatus('verifying');
      
      // Simulate redirect to bank for PayTo authorization
      setTimeout(() => {
        setVerificationStatus('success');
        setLoading(false);
        if (onSuccess) {
          onSuccess(formData);
        }
      }, 3000);
    }, 2000);
  };

  const resetModal = () => {
    setStep(1);
    setFormData({
      accountName: '',
      bsb: '',
      accountNumber: '',
      email: '',
      monthlyCapCeiling: '2000',
      billingDay: '1',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      acceptTerms: false,
      acceptPayTo: false
    });
    setErrors({});
    setVerificationStatus('pending');
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <DialogTitle className="text-xl">
              {verificationStatus === 'success' ? 'Bank Account Verified' : 'Company Bank Account Setup'}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Progress Steps */}
        {verificationStatus !== 'success' && (
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium">Account Details</span>
              </div>
              
              <ChevronRight className="w-4 h-4 text-gray-400" />
              
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Payment Terms</span>
              </div>
              
              <ChevronRight className="w-4 h-4 text-gray-400" />
              
              <div className={`flex items-center gap-2 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium">Consent & Verify</span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[60vh]">
          {verificationStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Company Bank Account Successfully Verified
              </h3>
              <p className="text-gray-600 mb-6">
                Your bank account has been connected and PayTo consent has been authorised for your first site.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Name:</span>
                    <span className="font-medium">{formData.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">BSB:</span>
                    <span className="font-medium">{formatBSB(formData.bsb)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account:</span>
                    <span className="font-medium">•••• {formData.accountNumber.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Company Payment Ceiling:</span>
                    <span className="font-medium">${weeklyMax}/week</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Billing Day:</span>
                    <span className="font-medium">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][parseInt(formData.billingDay) - 1]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-blue-900">
                  This account is now set up for all sites under this company. 
                  New sites will require separate consent agreements.
                </p>
              </div>
            </div>
          ) : verificationStatus === 'verifying' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Verifying with your bank...
              </h3>
              <p className="text-gray-600">
                You'll be redirected to complete PayTo authorisation
              </p>
            </div>
          ) : (
            <>
              {/* Step 1: Account Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="accountName">Company Account Name</Label>
                    <Input
                      id="accountName"
                      name="accountName"
                      value={formData.accountName}
                      onChange={handleInputChange}
                      placeholder="ABC Construction Pty Ltd"
                      className={errors.accountName ? 'border-red-500' : ''}
                    />
                    {errors.accountName && (
                      <p className="mt-1 text-sm text-red-600">{errors.accountName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bsb">BSB</Label>
                      <Input
                        id="bsb"
                        name="bsb"
                        value={formatBSB(formData.bsb)}
                        onChange={(e) => handleInputChange({
                          ...e,
                          target: { ...e.target, name: 'bsb', value: e.target.value.replace(/\D/g, '') }
                        } as React.ChangeEvent<HTMLInputElement>)}
                        placeholder="123-456"
                        maxLength={7}
                        className={errors.bsb ? 'border-red-500' : ''}
                      />
                      {errors.bsb && (
                        <p className="mt-1 text-sm text-red-600">{errors.bsb}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="12345678"
                        className={errors.accountNumber ? 'border-red-500' : ''}
                      />
                      {errors.accountNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Authorised Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="finance@company.com.au"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      This email will be used for PayTo authorisation
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex gap-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-900">
                        <p className="font-medium mb-1">Company-Wide Bank Account</p>
                        <p className="text-blue-700">
                          This account will be used for all sites under your company. Each new site 
                          will require its own consent agreement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Terms */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="monthlyCapCeiling">Company Monthly Cap Ceiling (AUD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="monthlyCapCeiling"
                        type="number"
                        name="monthlyCapCeiling"
                        value={formData.monthlyCapCeiling}
                        onChange={handleInputChange}
                        placeholder="2000"
                        className={`pl-9 ${errors.monthlyCapCeiling ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.monthlyCapCeiling && (
                      <p className="mt-1 text-sm text-red-600">{errors.monthlyCapCeiling}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Maximum monthly amount for all sites. Sites can set lower limits.
                    </p>
                    
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-600" />
                        <p className="text-sm text-gray-700">
                          Weekly payment limit: <span className="font-semibold">${weeklyMax}</span> 
                          <span className="text-gray-500 ml-1">(¼ of monthly cap)</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billingDay">Billing Day</Label>
                    <Select
                      value={formData.billingDay}
                      onValueChange={(value) => handleSelectChange('billingDay', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Monday</SelectItem>
                        <SelectItem value="2">Tuesday</SelectItem>
                        <SelectItem value="3">Wednesday</SelectItem>
                        <SelectItem value="4">Thursday</SelectItem>
                        <SelectItem value="5">Friday</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="mt-1 text-xs text-gray-500">
                      Weekly payments will be processed on this day
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={errors.startDate ? 'border-red-500' : ''}
                      />
                      {errors.startDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="endDate">End Date (Optional)</Label>
                      <Input
                        id="endDate"
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                        className={errors.endDate ? 'border-red-500' : ''}
                      />
                      {errors.endDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex gap-2">
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-900">
                        <p className="font-medium mb-1">Payment Schedule</p>
                        <p className="text-amber-700">
                          Payments are processed weekly as variable amounts based on actual site activity, 
                          up to the weekly limit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Consent & Verify */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Review Company Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Account:</span>
                        <span className="font-medium">{formData.accountName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">BSB / Account:</span>
                        <span className="font-medium">
                          {formatBSB(formData.bsb)} / •••• {formData.accountNumber.slice(-4)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Company Cap Ceiling:</span>
                        <span className="font-medium">${formData.monthlyCapCeiling}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Weekly Payment Limit:</span>
                        <span className="font-medium">${weeklyMax}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Billing Day:</span>
                        <span className="font-medium">
                          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][parseInt(formData.billingDay) - 1]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Start Date:</span>
                        <span className="font-medium">
                          {new Date(formData.startDate).toLocaleDateString('en-AU')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <Checkbox
                        id="acceptPayTo"
                        checked={formData.acceptPayTo}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, acceptPayTo: checked as boolean }))
                        }
                        className="mt-1"
                      />
                      <div className="text-sm">
                        <p className="font-medium text-gray-900 mb-1">
                          Authorise PayTo Agreement
                        </p>
                        <p className="text-gray-600">
                          I authorise Scratchie to initiate weekly direct debit payments from the 
                          nominated account for site rewards. Variable amounts up to ${weeklyMax} per 
                          week will be debited based on actual site activity.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                        }
                        className="mt-1"
                      />
                      <div className="text-sm">
                        <p className="font-medium text-gray-900 mb-1">
                          Terms & Conditions
                        </p>
                        <p className="text-gray-600">
                          I confirm I'm authorised to set up this payment method for the company and 
                          agree to Scratchie's terms of service and Airwallex's payment processing terms.
                        </p>
                      </div>
                    </label>
                  </div>

                  {errors.consent && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800">{errors.consent}</p>
                    </div>
                  )}

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-900">
                        <p className="font-medium mb-1">Bank Authorisation Required</p>
                        <p className="text-amber-700">
                          After clicking verify, you'll be redirected to your bank to complete 
                          PayTo authorisation. This consent covers your first site - additional sites 
                          will require separate consent agreements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          {verificationStatus === 'success' ? (
            <Button
              onClick={handleClose}
              className="ml-auto bg-blue-600 hover:bg-blue-700"
            >
              Done
            </Button>
          ) : verificationStatus !== 'verifying' && (
            <>
              {step > 1 ? (
                <Button
                  onClick={handleBack}
                  variant="ghost"
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              <div className="flex gap-3">
                <Button
                  onClick={handleClose}
                  variant="ghost"
                >
                  Cancel
                </Button>
                
                {step < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !formData.acceptTerms || !formData.acceptPayTo}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Verify with Bank
                      </>
                    )}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyBankAccountModal;