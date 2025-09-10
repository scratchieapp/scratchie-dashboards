import React, { useState } from 'react';
import { AlertCircle, Check, ChevronRight, Shield, Building2, Calendar, DollarSign, Info, MapPin } from 'lucide-react';
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

interface SiteConsentData {
  siteName: string;
  siteMonthlyCapCeiling: string;
  billingDay: string;
  startDate: string;
  endDate: string;
  acceptTerms: boolean;
  acceptPayTo: boolean;
}

interface SiteBankConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: SiteConsentData) => void;
  siteName?: string;
  companyBankDetails?: {
    accountName: string;
    bsb: string;
    accountNumber: string;
    email: string;
    monthlyCapCeiling: number;
  };
}

const SiteBankConsentModal: React.FC<SiteBankConsentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  siteName = 'New Site - 123 Main Street',
  companyBankDetails = {
    accountName: 'ABC Construction Pty Ltd',
    bsb: '123456',
    accountNumber: '12345678',
    email: 'finance@abcconstruction.com.au',
    monthlyCapCeiling: 2000
  }
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'success'>('pending');
  
  const [formData, setFormData] = useState({
    siteName: siteName,
    siteMonthlyCapCeiling: '1000', // Site-specific, must be <= company ceiling
    billingDay: '1',
    startDate: new Date().toISOString().split('T')[0], // Default to today
    endDate: '',
    acceptTerms: false,
    acceptPayTo: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate weekly max from monthly cap (1/4 of monthly)
  const siteWeeklyMax = Math.floor(parseFloat(formData.siteMonthlyCapCeiling || '0') / 4);
  const companyWeeklyMax = Math.floor(companyBankDetails.monthlyCapCeiling / 4);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    // Validate site cap doesn't exceed company cap
    if (name === 'siteMonthlyCapCeiling') {
      const siteValue = parseFloat(value);
      if (siteValue > companyBankDetails.monthlyCapCeiling) {
        setErrors(prev => ({
          ...prev,
          siteMonthlyCapCeiling: `Cannot exceed company ceiling of $${companyBankDetails.monthlyCapCeiling}`
        }));
        return;
      }
    }
    
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
    const numbers = value.toString().replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}`;
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.siteMonthlyCapCeiling || parseFloat(formData.siteMonthlyCapCeiling) <= 0) {
      newErrors.siteMonthlyCapCeiling = 'Site monthly cap is required';
    }
    
    const siteCap = parseFloat(formData.siteMonthlyCapCeiling);
    if (siteCap > companyBankDetails.monthlyCapCeiling) {
      newErrors.siteMonthlyCapCeiling = `Cannot exceed company ceiling of $${companyBankDetails.monthlyCapCeiling}`;
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
    
    // Simulate API call to create and verify payment consent for new site
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
      siteName: siteName,
      siteMonthlyCapCeiling: '1000',
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
            <Shield className="w-6 h-6 text-green-600" />
            <DialogTitle className="text-xl">
              {verificationStatus === 'success' ? 'Site Consent Verified' : 'Site Payment Consent'}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Progress Steps */}
        {verificationStatus !== 'success' && (
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-center gap-8">
              <div className={`flex items-center gap-2 ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium">Site Payment Terms</span>
              </div>
              
              <ChevronRight className="w-4 h-4 text-gray-400" />
              
              <div className={`flex items-center gap-2 ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium">Review & Authorise</span>
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
                Site Payment Consent Authorised
              </h3>
              <p className="text-gray-600 mb-6">
                PayTo consent has been authorised for {formData.siteName}
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Site:</span>
                    <span className="font-medium">{formData.siteName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Company Account:</span>
                    <span className="font-medium">{companyBankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Site Monthly Cap:</span>
                    <span className="font-medium">${formData.siteMonthlyCapCeiling}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Weekly Payment Limit:</span>
                    <span className="font-medium">${siteWeeklyMax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Start Date:</span>
                    <span className="font-medium">
                      {new Date(formData.startDate).toLocaleDateString('en-AU')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : verificationStatus === 'verifying' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Verifying site consent...
              </h3>
              <p className="text-gray-600">
                Authorising PayTo agreement for this site
              </p>
            </div>
          ) : (
            <>
              {/* Step 1: Site Payment Terms */}
              {step === 1 && (
                <div className="space-y-4">
                  {/* Company Bank Account Info (Read-only) */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <h3 className="font-medium text-blue-900">Company Bank Account</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Account Name:</span>
                        <span className="font-medium text-blue-900">{companyBankDetails.accountName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">BSB / Account:</span>
                        <span className="font-medium text-blue-900">
                          {formatBSB(companyBankDetails.bsb)} / •••• {companyBankDetails.accountNumber.slice(-4)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Company Cap Ceiling:</span>
                        <span className="font-medium text-blue-900">
                          ${companyBankDetails.monthlyCapCeiling}/month (${companyWeeklyMax}/week)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="siteMonthlyCapCeiling">Site Monthly Cap (AUD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="siteMonthlyCapCeiling"
                        type="number"
                        name="siteMonthlyCapCeiling"
                        value={formData.siteMonthlyCapCeiling}
                        onChange={handleInputChange}
                        placeholder="1000"
                        max={companyBankDetails.monthlyCapCeiling}
                        className={`pl-9 ${errors.siteMonthlyCapCeiling ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.siteMonthlyCapCeiling && (
                      <p className="mt-1 text-sm text-red-600">{errors.siteMonthlyCapCeiling}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Maximum monthly amount for this site (up to ${companyBankDetails.monthlyCapCeiling} company limit)
                    </p>
                    
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-600" />
                        <p className="text-sm text-gray-700">
                          Weekly payment limit for this site: <span className="font-semibold">${siteWeeklyMax}</span> 
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
                      Weekly payments for this site will be processed on this day
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
                        <p className="font-medium mb-1">Site-Specific Consent</p>
                        <p className="text-amber-700">
                          Each site requires its own PayTo consent agreement. Payments will be processed 
                          weekly based on actual site activity, up to ${siteWeeklyMax} per week.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Review & Authorise */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Review Site Consent Details</h3>
                    <div className="space-y-3">
                      {/* Site Details */}
                      <div className="pb-3 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-900">Site Details</span>
                        </div>
                        <div className="space-y-1 text-sm ml-6">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Site Name:</span>
                            <span className="font-medium">{formData.siteName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Monthly Cap:</span>
                            <span className="font-medium">${formData.siteMonthlyCapCeiling}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Weekly Limit:</span>
                            <span className="font-medium">${siteWeeklyMax}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Company Account */}
                      <div className="pb-3 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">Company Account</span>
                        </div>
                        <div className="space-y-1 text-sm ml-6">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Account:</span>
                            <span className="font-medium">{companyBankDetails.accountName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">BSB / Account:</span>
                            <span className="font-medium">
                              {formatBSB(companyBankDetails.bsb)} / •••• {companyBankDetails.accountNumber.slice(-4)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Schedule */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">Payment Schedule</span>
                        </div>
                        <div className="space-y-1 text-sm ml-6">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Frequency:</span>
                            <span className="font-medium">Weekly (Variable Amount)</span>
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
                          {formData.endDate && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">End Date:</span>
                              <span className="font-medium">
                                {new Date(formData.endDate).toLocaleDateString('en-AU')}
                              </span>
                            </div>
                          )}
                        </div>
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
                          Authorise Site PayTo Agreement
                        </p>
                        <p className="text-gray-600">
                          I authorise Scratchie to initiate weekly direct debit payments from the 
                          company account for rewards at {formData.siteName}. Variable amounts up to 
                          ${siteWeeklyMax} per week will be debited based on actual site activity.
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
                          I confirm I'm authorised to set up payment consent for this site and agree 
                          to the terms of this PayTo agreement. This agreement can be cancelled at any 
                          time through the company's bank.
                        </p>
                      </div>
                    </label>
                  </div>

                  {errors.consent && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-800">{errors.consent}</p>
                    </div>
                  )}

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex gap-2">
                      <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-900">
                        <p className="font-medium mb-1">Quick Authorisation</p>
                        <p className="text-green-700">
                          Since the company bank account is already verified, this consent will be 
                          processed immediately without requiring additional bank authorisation.
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
              className="ml-auto bg-green-600 hover:bg-green-700"
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
                
                {step < 2 ? (
                  <Button
                    onClick={handleNext}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !formData.acceptTerms || !formData.acceptPayTo}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Authorise Site Consent
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

export default SiteBankConsentModal;