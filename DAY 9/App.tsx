import React, { useState } from 'react';
import { ProviderName, Plan, User } from './types';
import { PROVIDERS } from './constants';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import HistoryPage from './components/HistoryPage';
import AdminPage from './components/AdminPage';
import RechargeModal from './components/RechargeModal';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<ProviderName>('JIO');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [currentPage, setCurrentPage] = useState<'home' | 'history' | 'admin'>('home');
  const [showLanding, setShowLanding] = useState(true);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<Plan | null>(null);

  const currentTheme = PROVIDERS[selectedProvider];

  const handleRechargeClick = (plan: Plan) => {
    if (!user) {
      setPendingPlan(plan);
      setIsAuthModalOpen(true);
      return;
    }
    
    if (!mobileNumber || mobileNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setSelectedPlan(plan);
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setIsAuthModalOpen(false);
    setShowLanding(false);
    if (pendingPlan) {
      setSelectedPlan(pendingPlan);
      setPendingPlan(null);
    }
  };

  if (showLanding && !user) {
    return (
      <>
        <LandingPage 
          theme={currentTheme} 
          onGetStarted={() => setIsAuthModalOpen(true)} 
        />
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLoginSuccess}
          theme={currentTheme}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen pb-20 transition-colors duration-500 bg-gray-50">
      {/* Navigation */}
      <div className={`relative pt-6 px-4 bg-white`}>
        <div className="absolute inset-0 z-0 opacity-10">
          <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br ${currentTheme.gradient} blur-3xl transition-colors duration-500`}></div>
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-bl ${currentTheme.gradient} blur-3xl transition-colors duration-500`}></div>
        </div>
        
        <Navbar
          user={user}
          theme={currentTheme}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onLogout={() => {
            setUser(null);
            setShowLanding(true);
          }}
        />
      </div>

      {/* Page Content */}
      {currentPage === 'home' && (
        <HomePage
          selectedProvider={selectedProvider}
          onProviderSelect={setSelectedProvider}
          mobileNumber={mobileNumber}
          onMobileNumberChange={setMobileNumber}
          onRechargeClick={handleRechargeClick}
          theme={currentTheme}
          user={user}
        />
      )}
      {currentPage === 'history' && (
        <HistoryPage theme={currentTheme} user={user} />
      )}
      {currentPage === 'admin' && user?.isAdmin && (
        <AdminPage theme={currentTheme} />
      )}

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-gray-400 text-sm border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <p>© 2024 RechargeHub. All rights reserved.</p>
        <p className="mt-2">Supported Operators: Jio, Airtel, Vi, BSNL</p>
      </footer>

      {/* Global Components */}
      <RechargeModal 
        plan={selectedPlan} 
        theme={currentTheme} 
        onClose={() => setSelectedPlan(null)}
        mobileNumber={mobileNumber}
        user={user}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLoginSuccess}
        theme={currentTheme}
      />
    </div>
  );
};

export default App;