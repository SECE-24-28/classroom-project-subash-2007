import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plan, ProviderTheme } from '../types';
import { X, Smartphone, CreditCard, CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  plan: Plan | null;
  theme: ProviderTheme;
  onClose: () => void;
  mobileNumber: string;
  user: User | null;
}

const RechargeModal: React.FC<Props> = ({ plan, theme, onClose, mobileNumber, user }) => {
  const [step, setStep] = useState<'CONFIRM' | 'PROCESSING' | 'SUCCESS'>('CONFIRM');

  // Reset step when modal opens
  useEffect(() => {
    if (plan) setStep('CONFIRM');
  }, [plan]);

  const handlePay = () => {
    setStep('PROCESSING');
    setTimeout(() => {
      // Store recharge in history only if user is logged in
      if (user) {
        const recharge = {
          id: Date.now().toString(),
          amount: plan!.price,
          mobileNumber: mobileNumber,
          provider: 'JIO',
          date: new Date().toISOString(),
          status: 'SUCCESS' as const,
          referenceId: `TXN${Math.floor(Math.random()*100000)}`,
          planDetails: {
            data: plan!.data,
            validity: plan!.validity,
            calls: plan!.calls
          },
          userId: user.email
        };
        
        const existingHistory = JSON.parse(localStorage.getItem('rechargeHistory') || '[]');
        existingHistory.unshift(recharge);
        localStorage.setItem('rechargeHistory', JSON.stringify(existingHistory));
      }
      
      setStep('SUCCESS');
    }, 2000);
  };

  if (!plan) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className={`p-6 bg-gradient-to-r ${theme.gradient} text-white`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {step === 'SUCCESS' ? 'Recharge Successful!' : 'Complete Payment'}
              </h3>
              <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Smartphone size={16} />
              <span className="font-medium">+91 {mobileNumber || 'XXXXXXXXXX'}</span>
            </div>
          </div>

          <div className="p-8">
            {step === 'CONFIRM' && (
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b pb-4 border-gray-100">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Plan Amount</p>
                    <p className={`text-3xl font-bold ${theme.textColor}`}>₹{plan.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm mb-1">Validity</p>
                    <p className="font-semibold text-gray-800">{plan.validity}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Data</span>
                    <span className="font-medium">{plan.data}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Calls</span>
                    <span className="font-medium">{plan.calls}</span>
                  </div>
                </div>

                <button
                  onClick={handlePay}
                  className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r ${theme.gradient} hover:opacity-90 transition-opacity`}
                >
                  <CreditCard size={20} />
                  <span>Pay ₹{plan.price}</span>
                </button>
                <p className="text-xs text-center text-gray-400">Secure 128-bit SSL Payment</p>
              </div>
            )}

            {step === 'PROCESSING' && (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <Loader2 size={48} className={`animate-spin ${theme.textColor}`} />
                <p className="text-gray-600 font-medium">Processing your payment...</p>
                <p className="text-gray-400 text-sm text-center">Please do not close this window</p>
              </div>
            )}

            {step === 'SUCCESS' && (
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-500"
                >
                  <CheckCircle size={64} fill="currentColor" className="text-white" />
                </motion.div>
                <div className="text-center">
                   <h4 className="text-xl font-bold text-gray-800">Done!</h4>
                   <p className="text-gray-500 mt-1">Reference ID: #TXN{Math.floor(Math.random()*100000)}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3 mt-4 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RechargeModal;