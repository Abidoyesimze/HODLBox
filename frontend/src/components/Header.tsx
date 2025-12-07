'use client';

export default function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              HODLBox
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors">
              How It Works
            </a>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
              Connect Wallet
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

