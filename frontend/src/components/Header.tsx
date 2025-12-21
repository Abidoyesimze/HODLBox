'use client';

import WalletButton from './WalletButton';

export default function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-md sticky top-0 z-50 animate-fade-in shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 animate-pulse-glow">
              <span className="text-white font-extrabold text-xl">H</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300">
              HODLBox
            </span>
          </a>
          <nav className="hidden md:flex items-center space-x-10">
            <a 
              href="#features" 
              className="text-sm font-semibold text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 relative group py-2"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-semibold text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 relative group py-2"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#faq" 
              className="text-sm font-semibold text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 relative group py-2"
            >
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <WalletButton />
          </nav>
        </div>
      </div>
    </header>
  );
}

