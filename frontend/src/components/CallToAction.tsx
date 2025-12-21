'use client';

import { useWallet } from '@/contexts/WalletContext';
import WalletButton from './WalletButton';
import DripEffect from './DripEffect';

export default function CallToAction() {
  const { isConnected } = useWallet();

  return (
    <section id="cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 lg:p-16 text-center text-white overflow-hidden">
        <DripEffect count={6} color="rgba(255, 255, 255, 0.1)" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/50 via-purple-700/50 to-pink-700/50 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold">
              ✨ Start Your Savings Journey Today
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-6">
            {isConnected ? 'Ready to Create Your Vault?' : 'Ready to Start Saving?'}
          </h2>
          
          <p className="text-xl lg:text-2xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">
            {isConnected 
              ? 'Create your first time-locked vault and start building your savings on the blockchain. Your future self will thank you.' 
              : 'Connect your Stacks wallet and create your first time-locked vault in minutes. Take control of your financial future with blockchain-enforced discipline.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {isConnected ? (
              <a
                href="/dashboard"
                className="group relative px-10 py-5 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 active:scale-95 font-bold text-lg overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Go to Dashboard
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ) : (
              <div className="transform scale-110">
                <WalletButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

