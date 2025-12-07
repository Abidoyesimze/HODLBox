'use client';

export default function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm sticky top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300">
              HODLBox
            </span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#features" 
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-all duration-200 relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-all duration-200 relative group"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-sm font-medium">
              Connect Wallet
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

