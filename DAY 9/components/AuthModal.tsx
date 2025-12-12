import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProviderTheme, User } from '../types';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Loader2, LogIn } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  theme: ProviderTheme;
}

type AuthMode = 'LOGIN' | 'SIGNUP';

const AuthModal: React.FC<Props> = ({ isOpen, onClose, onLogin, theme }) => {
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password || (mode === 'SIGNUP' && !name)) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      // Mock success - make admin@admin.com an admin user
      onLogin({
        name: mode === 'SIGNUP' ? name : email.split('@')[0],
        email: email,
        isAdmin: email === 'admin@admin.com'
      });
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setMode('LOGIN');
    }, 1500);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
    setError('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="relative p-8 pb-16 bg-gradient-to-br from-pink-400 to-pink-500 text-white text-center">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>
            <div className="mb-4 inline-flex p-3 rounded-full bg-white/20 backdrop-blur-md shadow-inner">
               <LogIn size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {mode === 'LOGIN' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-white/80">
              {mode === 'LOGIN' 
                ? 'Login to manage your recharges' 
                : 'Join us for exclusive offers and rewards'}
            </p>
            {mode === 'LOGIN' && (
              <p className="text-white/60 text-xs mt-2">
                Use admin@admin.com for admin access
              </p>
            )}

            {/* Wave Decoration at bottom */}
            <svg className="absolute bottom-0 left-0 w-full h-12 text-white fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
               <path fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,213.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 rounded-lg bg-red-50 text-red-500 text-sm font-medium text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {mode === 'SIGNUP' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-gray-600" size={20} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-0 transition-all duration-200"
                    />
                  </div>
                </motion.div>
              )}

              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-gray-600" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-0 transition-all duration-200"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-gray-600" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-0 transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-gray-200 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all bg-gradient-to-r from-pink-400 to-pink-500"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <span>{mode === 'LOGIN' ? 'Login' : 'Sign Up'}</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                {mode === 'LOGIN' ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                onClick={toggleMode}
                className="font-semibold mt-1 hover:underline text-pink-500"
              >
                {mode === 'LOGIN' ? 'Create New Account' : 'Login Here'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;