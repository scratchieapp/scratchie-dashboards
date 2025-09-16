import React, { useState } from 'react';
import { CreditCard, Building2, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PaymentMethodSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPayTo: () => void;
  onSelectCreditCard: () => void;
  onSelectInherit?: () => void;
  isCompanyLevel?: boolean;
  siteName?: string;
  companyPaymentMethod?: 'payto' | 'card' | null;
}

const PaymentMethodSelectionModal: React.FC<PaymentMethodSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectPayTo,
  onSelectCreditCard,
  onSelectInherit,
  isCompanyLevel = false,
  siteName,
  companyPaymentMethod
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'inherit' | 'payto' | 'card' | null>(null);

  const handleContinue = () => {
    if (selectedMethod === 'inherit' && onSelectInherit) {
      onSelectInherit();
    } else if (selectedMethod === 'payto') {
      onSelectPayTo();
    } else if (selectedMethod === 'card') {
      onSelectCreditCard();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Choose Payment Method
            {siteName && <span className="text-gray-500 text-sm ml-2">for {siteName}</span>}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-600 mb-6">
            Select how you'd like to set up payments for {isCompanyLevel ? 'your company' : 'this site'}. 
            You can change this later in settings.
          </p>

          <div className="space-y-4">
            {/* Inherit from Company Option (for sites only) */}
            {!isCompanyLevel && companyPaymentMethod && (
              <button
                onClick={() => setSelectedMethod('inherit')}
                className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                  selectedMethod === 'inherit' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    selectedMethod === 'inherit' ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    <Building2 className={`w-6 h-6 ${
                      selectedMethod === 'inherit' ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      Use Company Payment Method
                      <span className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        Default
                      </span>
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Inherit payment method from company ({companyPaymentMethod === 'payto' ? 'PayTo' : 'Credit Card'})
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>No additional setup required</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Payments handled by company</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span>Simplest option for site management</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )}

            {/* PayTo Option */}
            <button
              onClick={() => setSelectedMethod('payto')}
              className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                selectedMethod === 'payto' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  selectedMethod === 'payto' ? 'bg-blue-600' : 'bg-gray-200'
                }`}>
                  <Building2 className={`w-6 h-6 ${
                    selectedMethod === 'payto' ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    PayTo Direct Debit
                    <span className="ml-2 text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      Recommended
                    </span>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Automated direct debit from your bank account
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Lower transaction fees</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Automatic top-ups when balance is low</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Best for regular, predictable spending</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                      <span>Requires bank authorization (one-time setup)</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Credit Card Option */}
            <button
              onClick={() => setSelectedMethod('card')}
              className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                selectedMethod === 'card' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  selectedMethod === 'card' ? 'bg-purple-600' : 'bg-gray-200'
                }`}>
                  <CreditCard className={`w-6 h-6 ${
                    selectedMethod === 'card' ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    Credit Card
                    <span className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      Quick Setup
                    </span>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Pay with credit card for instant top-ups
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Instant setup and activation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Perfect for urgent or one-time top-ups</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>Flexible payment timing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                      <span>Higher transaction fees apply</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Information Box */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-900 mb-1">
                  {isCompanyLevel ? 'Company Payment Setup' : 'Site Payment Options'}
                </p>
                {isCompanyLevel ? (
                  <p className="text-amber-700">
                    This payment method will be the default for all sites under your company. 
                    Individual sites can override this with their own payment method if needed.
                  </p>
                ) : (
                  <p className="text-amber-700">
                    You can choose to use the company's payment method or set up your own. 
                    Having your own payment method gives you more control over site spending.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedMethod}
            className={
              selectedMethod === 'inherit'
                ? 'bg-blue-600 hover:bg-blue-700'
                : selectedMethod === 'payto' 
                ? 'bg-green-600 hover:bg-green-700' 
                : selectedMethod === 'card'
                ? 'bg-purple-600 hover:bg-purple-700'
                : ''
            }
          >
            Continue with {selectedMethod === 'inherit' ? 'Company Method' : selectedMethod === 'payto' ? 'PayTo' : selectedMethod === 'card' ? 'Credit Card' : 'Selection'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodSelectionModal;