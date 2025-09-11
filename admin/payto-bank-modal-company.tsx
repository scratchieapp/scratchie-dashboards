import React, { useState } from 'react';
import { X, AlertCircle, Check, ChevronRight, Shield, Building2, DollarSign, Info } from 'lucide-react';

const CompanyBankAccountModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('pending');
  
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

  const [errors, setErrors] = useState({});

  // Calculate weekly max from monthly cap (1/4 of monthly)
  const weeklyMax = Math.floor(parseFloat(formData.monthlyCapCeiling || 0) / 4);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
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
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}`;
  };

  const validateStep1 = () => {
    const newErrors = {};
    
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
    const newErrors = {};
    
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

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(resetModal, 300);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <Building2 className="w-5 h-5" />
        Set Up Company Bank Account
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  {verificationStatus === 'success' ? 'Bank Account Verified' : 'Company Bank Account Setup'}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Account Name
                        </label>
                        <input
                          type="text"
                          name="accountName"
                          value={formData.accountName}
                          onChange={handleInputChange}
                          placeholder="ABC Construction Pty Ltd"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.accountName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.accountName && (
                          <p className="mt-1 text-sm text-red-600">{errors.accountName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            BSB
                          </label>
                          <input
                            type="text"
                            name="bsb"
                            value={formatBSB(formData.bsb)}
                            onChange={(e) => handleInputChange({
                              target: { name: 'bsb', value: e.target.value.replace(/\D/g, '') }
                            })}
                            placeholder="123-456"
                            maxLength="7"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.bsb ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.bsb && (
                            <p className="mt-1 text-sm text-red-600">{errors.bsb}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Account Number
                          </label>
                          <input
                            type="text"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            placeholder="12345678"
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.accountNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                          {errors.accountNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Authorised Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="finance@company.com.au"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Monthly Cap Ceiling (AUD)
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            name="monthlyCapCeiling"
                            value={formData.monthlyCapCeiling}
                            onChange={handleInputChange}
                            placeholder="2000"
                            className={`w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.monthlyCapCeiling ? 'border-red-500' : 'border-gray-300'
                            }`}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Billing Day
                        </label>
                        <select
                          name="billingDay"
                          value={formData.billingDay}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="1">Monday</option>
                          <option value="2">Tuesday</option>
                          <option value="3">Wednesday</option>
                          <option value="4">Thursday</option>
                          <option value="5">Friday</option>
                        </select>
                        <p className="mt-1 text-xs text-gray-500">
                          Weekly payments will be processed on this day
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
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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
                          <input
                            type="checkbox"
                            name="acceptPayTo"
                            checked={formData.acceptPayTo}
                            onChange={handleInputChange}
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
                <button
                  onClick={closeModal}
                  className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                    
                    {step < 3 ? (
                      <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                            : 'bg-blue-600 text-white hover:bg-blue-700'
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
                            Verify with Bank
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

export default CompanyBankAccountModal;