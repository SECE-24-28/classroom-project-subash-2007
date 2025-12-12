import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Zap } from 'lucide-react';
import { ProviderName, Plan, ProviderTheme } from '../types';
import { ALL_PLANS } from '../constants';
import { User } from '../types';
import ProviderSelector from './ProviderSelector';
import PlanCard from './PlanCard';

interface Props {
  selectedProvider: ProviderName;
  onProviderSelect: (provider: ProviderName) => void;
  mobileNumber: string;
  onMobileNumberChange: (number: string) => void;
  onRechargeClick: (plan: Plan) => void;
  theme: ProviderTheme;
  user: User | null;
}

const HomePage: React.FC<Props> = ({
  selectedProvider,
  onProviderSelect,
  mobileNumber,
  onMobileNumberChange,
  onRechargeClick,
  theme,
  user
}) => {
  const getProviderBgClass = () => {
    switch(selectedProvider) {
      case 'AIRTEL': return 'bg-gradient-to-br from-red-100 to-red-50';
      case 'JIO': return 'bg-gradient-to-br from-blue-100 to-blue-50';
      case 'VI': return 'bg-gradient-to-br from-yellow-100 to-yellow-50';
      case 'BSNL': return 'bg-gradient-to-br from-green-100 to-green-50';
      default: return 'bg-white';
    }
  };
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  
  // Get plans from localStorage if admin has added custom plans, otherwise use default
  const getPlans = () => {
    const adminPlans = localStorage.getItem('adminPlans');
    if (adminPlans) {
      const customPlans = JSON.parse(adminPlans);
      return customPlans[selectedProvider] || ALL_PLANS[selectedProvider];
    }
    return ALL_PLANS[selectedProvider];
  };
  
  const currentPlans = getPlans();
  const categories = ['ALL', 'POPULAR', 'DATA_ONLY', 'ANNUAL', 'TOP_UP'];

  const filteredPlans = currentPlans.filter(plan => 
    selectedCategory === 'ALL' ? true : plan.category === selectedCategory
  );

  const isMobileValid = mobileNumber.length === 10;

  return (
    <>
      {/* Hero Section */}
      <header className={`relative pt-6 pb-32 px-4 overflow-hidden ${getProviderBgClass()}`}>
        <div className="absolute inset-0 z-0 opacity-10">
          <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br ${theme.gradient} blur-3xl transition-colors duration-500`}></div>
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-bl ${theme.gradient} blur-3xl transition-colors duration-500`}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Fast & Secure <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>Recharges</span>
            </h1>
          </motion.div>
          
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Instant activation, exclusive cashback offers, and seamless payments.
          </p>

          {/* Mobile Number Input */}
          <div className="max-w-md mx-auto mb-12 relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient} rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200`}></div>
            <div className={`relative bg-white rounded-xl shadow-lg flex items-center p-2 border ${
              mobileNumber && !isMobileValid ? 'border-red-300' : 'border-gray-100'
            }`}>
              <div className="pl-3 pr-2 text-gray-400">
                <Smartphone size={20} />
              </div>
              <div className="pl-2 border-l border-gray-200">
                <span className="text-gray-500 font-medium">+91</span>
              </div>
              <input 
                type="tel" 
                maxLength={10}
                value={mobileNumber}
                onChange={(e) => onMobileNumberChange(e.target.value.replace(/\D/g,''))}
                placeholder="Enter Mobile Number" 
                className="w-full p-3 outline-none text-lg font-medium text-gray-800 bg-transparent placeholder:font-normal"
              />
            </div>
            {mobileNumber && !isMobileValid && (
              <p className="text-red-500 text-sm mt-2 text-left">Please enter a valid 10-digit mobile number</p>
            )}

          </div>

          <ProviderSelector 
            selected={selectedProvider} 
            onSelect={onProviderSelect} 
          />
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-6xl mx-auto px-4 -mt-20 relative z-20 py-8 rounded-t-3xl ${getProviderBgClass()}`}>
        
        {/* Categories */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm
                ${selectedCategory === cat 
                  ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md transform scale-105` 
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              {cat === 'ALL' ? 'All Plans' : cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPlans.map((plan) => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                theme={theme}
                onRecharge={onRechargeClick}
                disabled={false}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <Zap size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No plans found in this category.</p>
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;