import React, { useState } from 'react';
import { ChevronUp, DollarSign, Building2, Smartphone, MessageSquare, AlertTriangle, Wallet, IndianRupee } from 'lucide-react';

export default function WhatsAppPayLater() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [instructions, setInstructions] = useState('');

  return (
    <div data-theme="light" className="mx-auto pb-6 bg-gray-50 h-full">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl font-semibold text-gray-900">WhatsApp Pay Later</h2>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
                0% FEE
              </span>
              <span className="px-3 py-1 border border-gray-300 text-gray-700 text-sm font-medium rounded-full">
                Plus
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronUp
                className={`w-5 h-5 text-gray-600 transition-transform ${
                  isExpanded ? '' : 'rotate-180'
                }`}
              />
            </button>
          </div>

          {/* Features - Show when collapsed */}
          
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
                <span>0% transaction fee</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <span>Money directly into your bank account</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Smartphone className="w-5 h-5 text-purple-600" />
                <span>Available on Plus plans</span>
              </div>
            </div>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="p-6 border-t border-gray-200">
            {/* Description */}
            <p className="text-gray-600 mb-6">
              Let shoppers complete checkout and coordinate payment with you on WhatsApp—no Razorpay required.
            </p>

            {/* Enable Checkbox */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={(e) => setIsEnabled(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <div className="font-medium text-gray-900 mb-1">Enable Pay on WhatsApp</div>
                  <div className="text-sm text-gray-600">
                    Customers will see a "Pay on WhatsApp / Pay Later" option during checkout.
                  </div>
                </div>
              </label>

              {/* Warning Message */}
              <div className="mt-4 flex items-start gap-2 text-orange-700 bg-orange-50 p-3 rounded-lg">
                <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Upgrade to Plus to unlock WhatsApp payments.
                </span>
              </div>
            </div>

            {/* WhatsApp Number Section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <MessageSquare className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">WhatsApp number</div>
                  <div className="text-sm text-gray-600 font-mono mb-2">Not configured</div>
                  <p className="text-sm text-gray-600 mb-3">
                    Manage this number in Store → General settings. We reuse it for the customer chat link and owner alerts.
                  </p>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1">
                    Update in Store Profile
                    <span className="text-lg">›</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Instructions */}
            <div className="mb-6">
              <label className="block mb-2">
                <span className="font-semibold text-gray-900">Customer instructions</span>
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Share how customers can complete payment—for example, UPI ID, bank transfer, or COD confirmation."
                maxLength={600}
                disabled={!isEnabled}
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg resize-none text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-500"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">
                  Enable Pay on WhatsApp to edit these instructions.
                </span>
                <span className="text-sm text-gray-500">{instructions.length}/600</span>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Orders from this method start in{' '}
                <span className="font-semibold">pending manual payment</span>. Mark them paid or cancel them from the Orders page.
              </p>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                Save changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}