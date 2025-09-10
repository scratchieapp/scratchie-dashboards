import React, { useState } from 'react';
import { X, AlertCircle, Check, ChevronRight, Shield, Building2, Calendar, DollarSign, Info, MapPin } from 'lucide-react';

const SiteBankConsentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('pending');
  
  // Inherited company bank details (would come from API)
  const companyBankDetails = {
    accountName: 'ABC Construction Pty Ltd',
    bsb: '123456',
    accountNumber: '12345678',
    email: 'finance@abcconstruction.com.au',
    monthlyCapCeiling: 2000 // Company-wide ceiling
  };
  
  const [formData, setFormData] = useState({
    siteName: 'New Site - 123 Main Street',
    siteMonthlyCapCeiling: '1000', // Site-specific, must be <= company ceiling
    billingDay: '1',
    startDate: new Date().toISOString().split('T')[0], // Default to today
    endDate: '',
    acceptTerms: false,
    acceptPayTo: false
  });

  const [errors, setErrors] = useState({});

  // Calculate weekly max from monthly cap (1/4 of monthly)
  const siteWeeklyMax = Math.floor(parseFloat(formData.siteMonthlyCapCeiling || 0) / 4);
  const companyWeeklyMax = Math.floor(companyBankDetails.monthlyCapCeiling / 4);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
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
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatBSB = (value) => {
    const numbers = value.toString().replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}`;
  };

  const validateStep1 = () => {
    const newErrors = {};
    
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
      }, 3000);
    }, 2000);
  };

  const resetModal = () => {
    setStep(1);
    setFormData({
      siteName: 'New Site - 123 Main Street',
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

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(resetModal, 300);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        <MapPin className="w-5 h-5" />
        Set Up Site Payment Consent
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {verificationStatus === 'success' ? 'Site Consent Verified' : 'Site Payment Consent'}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Site Monthly Cap (AUD)
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            name="siteMonthlyCapCeiling"
                            value={formData.siteMonthlyCapCeiling}
                            onChange={handleInputChange}
                            placeholder="1000"
                            max={companyBankDetails.monthlyCapCeiling}
                            className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                              errors.siteMonthlyCapCeiling ? 'border-red-500' : 'border-gray-300'
                            }`}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Billing Day
                        </label>
                        <select
                          name="billingDay"
                          value={formData.billingDay}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="1">Monday</option>
                          <option value="2">Tuesday</option>
                          <option value="3">Wednesday</option>
                          <option value="4">Thursday</option>
                          <option value="5">Friday</option>
                        </select>
                        <p className="mt-1 text-xs text-gray-500">
                          Weekly payments for this site will be processed on this day
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                              errors.startDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.startDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date (Optional)
                          </label>
                          <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleInputChange}
                            min={formData.startDate || new Date().toISOString().split('T')[0]}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                              errors.endDate ? 'border-red-500' : 'border-gray-300'
                            }`}
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
                          <input
                            type="checkbox"
                            name="acceptPayTo"
                            checked={formData.acceptPayTo}
                            onChange={handleInputChange}
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
                          <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
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
                <button
                  onClick={closeModal}
                  className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Done
                </button>
              ) : verificationStatus !== 'verifying' && (
                <>
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  <div className="flex gap-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Cancel
                    </button>
                    
                    {step < 2 ? (
                      <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={loading || !formData.acceptTerms || !formData.acceptPayTo}
                        className={`px-6 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                          loading || !formData.acceptTerms || !formData.acceptPayTo
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4" />
                            Authorise Site Consent
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SiteBankConsentModal;