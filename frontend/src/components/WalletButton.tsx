'use client';

import { useWallet } from '@/contexts/WalletContext';
import { useEffect, useState } from 'react';

export default function WalletButton() {
  const { isConnected, address, connectWallet, disconnectWallet, loading } = useWallet();
  const [copied, setCopied] = useState(false);

  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 5)}...${addr.slice(-4)}`;
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <button className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed text-sm font-medium opacity-50">
        Loading...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={copyAddress}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-sm font-medium flex items-center gap-2"
        >
          <span>{copied ? 'Copied!' : formatAddress(address)}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {copied ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            )}
          </svg>
        </button>
        <button
          onClick={disconnectWallet}
          className="px-3 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-all duration-200 text-sm font-medium"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 text-sm font-medium"
    >
      Connect Wallet
    </button>
  );
}


