'use client';

import { useState } from 'react';

export default function VaultForm() {
  const [amount, setAmount] = useState('');
  const [lockPeriod, setLockPeriod] = useState('30');
  const [note, setNote] = useState('');
  const [estimatedBlocks, setEstimatedBlocks] = useState(4320); // ~30 days default

  const handleLockPeriodChange = (days: string) => {
    setLockPeriod(days);
    const daysNum = parseInt(days);
    setEstimatedBlocks(daysNum * 144); // 144 blocks per day
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Create Your Vault</h2>
        <p className="text-[var(--text-secondary)] mb-8">
          Lock your STX for a set period. Funds cannot be withdrawn until the unlock block height.
        </p>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Amount to Lock (STX)
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
                STX
              </span>
            </div>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Minimum: 0.001 STX
            </p>
          </div>

          <div>
            <label htmlFor="lockPeriod" className="block text-sm font-medium mb-2">
              Lock Period
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {['7', '30', '90', '365'].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => handleLockPeriodChange(days)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    lockPeriod === days
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-[var(--border)] hover:bg-[var(--muted)]'
                  }`}
                >
                  {days === '7' ? '1 Week' : days === '30' ? '1 Month' : days === '90' ? '3 Months' : '1 Year'}
                </button>
              ))}
            </div>
            <input
              type="number"
              id="lockPeriod"
              value={lockPeriod}
              onChange={(e) => handleLockPeriodChange(e.target.value)}
              placeholder="Days"
              min="1"
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Estimated unlock block: <span className="font-mono font-semibold">+{estimatedBlocks.toLocaleString()} blocks</span>
              <span className="ml-2">(~{parseInt(lockPeriod) || 0} days at ~10 min/block)</span>
            </p>
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium mb-2">
              Goal Note (Optional)
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., Emergency fund, Vacation savings, Long-term investment..."
              maxLength={256}
              rows={3}
              className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              {note.length}/256 characters
            </p>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
            <h3 className="font-semibold mb-2 text-indigo-900 dark:text-indigo-100">Summary</h3>
            <div className="space-y-1 text-sm text-indigo-800 dark:text-indigo-200">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-mono">{amount || '0.00'} STX</span>
              </div>
              <div className="flex justify-between">
                <span>Lock Period:</span>
                <span>{lockPeriod || '0'} days</span>
              </div>
              <div className="flex justify-between">
                <span>Unlock Blocks:</span>
                <span className="font-mono">+{estimatedBlocks.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold text-lg shadow-lg shadow-indigo-500/30"
          >
            Create Vault
          </button>
        </form>
      </div>
    </section>
  );
}

