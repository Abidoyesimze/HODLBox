'use client';

import DripEffect from './DripEffect';

export default function Hero() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
      <DripEffect count={8} color="rgba(99, 102, 241, 0.08)" />
      
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="mb-6 animate-fade-in-up">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-4 animate-pulse-glow">
            🔒 Non-Custodial • Self-Sovereign Savings
          </span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient animate-fade-in-up">
          HODLBox
        </h1>
        
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-[var(--foreground)] animate-fade-in-up animation-delay-100">
          Time-Locked STX Savings Vaults
        </h2>
        
        <p className="text-xl lg:text-2xl text-[var(--text-secondary)] mb-6 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
          Lock your STX until a future block height. Full custody, enforced by smart contract logic on the Stacks blockchain. 
          <span className="block mt-2 text-lg">
            Perfect for emergency funds, goal savings, or long-term HODLing.
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-300">
          <a 
            href="#how-it-works"
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 font-semibold text-lg overflow-hidden animate-pulse-glow"
          >
            <span className="relative z-10 flex items-center gap-2">
              Learn How It Works
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a 
            href="#cta"
            className="px-8 py-4 border-2 border-indigo-600 dark:border-indigo-400 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-700 dark:hover:border-indigo-300 transition-all duration-300 hover:scale-105 active:scale-95 font-semibold text-lg text-indigo-600 dark:text-indigo-400"
          >
            Start Saving Now
          </a>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-secondary)] animate-fade-in-up animation-delay-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>No Minimum Lock</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span>Add Funds Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span>Earn Achievement NFTs</span>
          </div>
        </div>
      </div>
    </section>
  );
}

