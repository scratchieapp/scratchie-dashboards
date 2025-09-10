import React, { useState } from 'react';
import { CreditCard, Lock, Check, Info } from 'lucide-react';
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

interface CreditCardData {
  cardNumber: string;
  cardName: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  saveCard: boolean;
  topUpAmount: string;
  isRecurring: boolean;
  recurringDay?: string;
}

interface CreditCardPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: CreditCardData) => void;
  isCompanyLevel?: boolean;
  siteName?: string;
  isQuickTopUp?: boolean;
  suggestedAmount?: number;
}

const CreditCardPaymentModal: React.FC<CreditCardPaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess,
  isCompanyLevel = false,
  siteName,
  isQuickTopUp = false,
  suggestedAmount = 500
}) => {
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verifying' | 'success'>('pending');
  
  const [formData, setFormData] = useState<CreditCardData>({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    saveCard: true,
    topUpAmount: suggestedAmount.toString(),
    isRecurring: !isQuickTopUp,
    recurringDay: '1'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    let processedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      processedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (processedValue.length > 19) return; // 16 digits + 3 spaces
    }

    // Limit CVC to 4 digits
    if (name === 'cvc' && value.length > 4) return;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : processedValue
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Card number validation (basic)
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (cardNumberClean.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    if (!formData.expiryMonth) {
      newErrors.expiryMonth = 'Expiry month is required';
    }
    
    if (!formData.expiryYear) {
      newErrors.expiryYear = 'Expiry year is required';
    }
    
    if (!formData.cvc || formData.cvc.length < 3) {
      newErrors.cvc = 'Valid CVC is required (3-4 digits)';
    }
    
    if (!formData.topUpAmount || parseFloat(formData.topUpAmount) <= 0) {
      newErrors.topUpAmount = 'Top-up amount must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call to create payment consent
    setTimeout(() => {
      setVerificationStatus('verifying');
      
      // Simulate 3DS verification
      setTimeout(() => {
        setVerificationStatus('success');
        setLoading(false);
        if (onSuccess) {
          onSuccess(formData);
        }
      }, 2000);
    }, 1500);
  };

  const resetModal = () => {
    setFormData({
      cardNumber: '',
      cardName: '',
      expiryMonth: '',
      expiryYear: '',
      cvc: '',
      saveCard: true,
      topUpAmount: suggestedAmount.toString(),
      isRecurring: !isQuickTopUp,
      recurringDay: '1'
    });
    setErrors({});
    setVerificationStatus('pending');
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-purple-600" />
            <DialogTitle className="text-xl">
              {verificationStatus === 'success' 
                ? 'Payment Method Added' 
                : isQuickTopUp 
                ? `Quick Top-Up${siteName ? ` - ${siteName}` : ''}` 
                : `Add Credit Card${isCompanyLevel ? ' (Company)' : siteName ? ` - ${siteName}` : ''}`}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="py-4">
          {verificationStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Credit Card Successfully Added
              </h3>
              <p className="text-gray-600 mb-4">
                {isQuickTopUp 
                  ? `Your top-up of $${formData.topUpAmount} has been processed.`
                  : 'Your credit card has been saved for future payments.'}
              </p>
              {formData.saveCard && (
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                  Card ending in •••• {formData.cardNumber.slice(-4)} has been saved
                </div>
              )}
            </div>
          ) : verificationStatus === 'verifying' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Verifying Payment...
              </h3>
              <p className="text-gray-600">
                Processing your card details securely
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Top-up Amount (for quick top-up) */}
              {isQuickTopUp && (
                <div>
                  <Label htmlFor="topUpAmount">Top-up Amount (AUD)</Label>
                  <div className="flex gap-2 mt-2">
                    {[100, 250, 500, 1000].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={formData.topUpAmount === amount.toString() ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, topUpAmount: amount.toString() }))}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <Input
                    id="topUpAmount"
                    type="number"
                    name="topUpAmount"
                    value={formData.topUpAmount}
                    onChange={handleInputChange}
                    placeholder="Enter custom amount"
                    className={`mt-2 ${errors.topUpAmount ? 'border-red-500' : ''}`}
                  />
                  {errors.topUpAmount && (
                    <p className="mt-1 text-sm text-red-600">{errors.topUpAmount}</p>
                  )}
                </div>
              )}

              {/* Card Details */}
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={errors.cardNumber ? 'border-red-500' : ''}
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                )}
              </div>

              <div>
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="John Smith"
                  className={errors.cardName ? 'border-red-500' : ''}
                />
                {errors.cardName && (
                  <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryMonth">Month</Label>
                  <Select
                    value={formData.expiryMonth}
                    onValueChange={(value) => handleSelectChange('expiryMonth', value)}
                  >
                    <SelectTrigger className={errors.expiryMonth ? 'border-red-500' : ''}>
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, '0');
                        return (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.expiryMonth && (
                    <p className="mt-1 text-sm text-red-600">{errors.expiryMonth}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="expiryYear">Year</Label>
                  <Select
                    value={formData.expiryYear}
                    onValueChange={(value) => handleSelectChange('expiryYear', value)}
                  >
                    <SelectTrigger className={errors.expiryYear ? 'border-red-500' : ''}>
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.expiryYear && (
                    <p className="mt-1 text-sm text-red-600">{errors.expiryYear}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    name="cvc"
                    type="password"
                    value={formData.cvc}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength={4}
                    className={errors.cvc ? 'border-red-500' : ''}
                  />
                  {errors.cvc && (
                    <p className="mt-1 text-sm text-red-600">{errors.cvc}</p>
                  )}
                </div>
              </div>

              {/* Recurring Payment Option (for regular setup) */}
              {!isQuickTopUp && (
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <Checkbox
                      checked={formData.isRecurring}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, isRecurring: checked as boolean }))
                      }
                    />
                    <span className="text-sm font-medium">Set up recurring payments</span>
                  </label>
                  
                  {formData.isRecurring && (
                    <div className="ml-7 p-3 bg-gray-50 rounded-lg">
                      <Label htmlFor="recurringDay">Billing Day</Label>
                      <Select
                        value={formData.recurringDay}
                        onValueChange={(value) => handleSelectChange('recurringDay', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st of each month</SelectItem>
                          <SelectItem value="15">15th of each month</SelectItem>
                          <SelectItem value="28">28th of each month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              {/* Save Card Option */}
              <label className="flex items-center gap-3">
                <Checkbox
                  checked={formData.saveCard}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, saveCard: checked as boolean }))
                  }
                />
                <span className="text-sm font-medium">Save card for future payments</span>
              </label>

              {/* Security Notice */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <Lock className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-600">
                    <p className="font-medium mb-1">Secure Payment</p>
                    <p>Your card details are encrypted and processed securely through Airwallex. 
                    We never store your full card number or CVC.</p>
                  </div>
                </div>
              </div>

              {/* Transaction Fee Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex gap-2">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900">
                    <p className="font-medium mb-1">Transaction Fees</p>
                    <p className="text-amber-700">
                      Credit card payments incur a 2.9% + $0.30 transaction fee. 
                      Consider PayTo for lower fees on recurring payments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          {verificationStatus === 'success' ? (
            <Button
              onClick={handleClose}
              className="ml-auto bg-purple-600 hover:bg-purple-700"
            >
              Done
            </Button>
          ) : verificationStatus !== 'verifying' && (
            <>
              <Button
                onClick={handleClose}
                variant="ghost"
              >
                Cancel
              </Button>
              
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    {isQuickTopUp ? `Pay $${formData.topUpAmount}` : 'Add Card'}
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditCardPaymentModal;