'use client';

import WalletConnectBadge from './WalletConnectBadge';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-fade-in-up animation-delay-100">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold">HODLBox</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Time-locked STX savings vaults on Stacks blockchain. Lock your funds, build your future.
            </p>
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>
                <a
                  href="https://explorer.stacks.co/?chain=testnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors duration-200 inline-block hover:translate-x-1 transform"
                >
                  View Contract
                </a>
              </li>
              <li>
                <a
                  href="https://docs.stacks.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors duration-200 inline-block hover:translate-x-1 transform"
                >
                  Stacks Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://www.stacks.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--foreground)] transition-colors duration-200 inline-block hover:translate-x-1 transform"
                >
                  About Stacks
                </a>
              </li>
            </ul>
          </div>
          <div className="animate-fade-in-up animation-delay-300">
            <h3 className="font-semibold mb-4">Security</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
              Built on Stacks with Clarity smart contracts. Your funds, your custody.
            </p>
            <p className="text-xs text-[var(--text-secondary)] font-mono break-all">
              Contract: <span className="font-mono">STM2GQAYZKBVAV6EYDEMM42H1Z666KAXARM5RX8X.hodlbox</span>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--text-secondary)] animate-fade-in animation-delay-400">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <WalletConnectBadge />
            </div>
            <p>© {new Date().getFullYear()} HODLBox. Built on Stacks blockchain.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

