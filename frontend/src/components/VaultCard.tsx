'use client';

import { Vault } from '@/types/vault';
import { formatDaysRemaining, getStatusColor, formatNumber, calculateProgress } from '@/lib/format';
import { formatStx } from '@/lib/utils';

interface VaultCardProps {
  vault: Vault;
  onViewDetails?: (vault: Vault) => void;
  onWithdraw?: (vault: Vault) => void;
  onAddFunds?: (vault: Vault) => void;
}

export default function VaultCard({ vault, onViewDetails, onWithdraw, onAddFunds }: VaultCardProps) {
  const progress = calculateProgress(vault.currentHeight, vault.unlockHeight, vault.currentHeight - vault.blocksRemaining);

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold">#{vault.id}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {formatStx(vault.amount)} STX
              </h3>
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(vault.status)}`}>
                {vault.status === 'locked' ? 'Locked' : vault.status === 'unlocked' ? 'Unlocked' : vault.status}
              </span>
            </div>
          </div>
          {vault.note && (
            <p className="text-[var(--text-secondary)] mb-2">💭 {vault.note}</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-[var(--text-secondary)]">Unlocks in:</span>
              <p className="font-semibold">{formatDaysRemaining(vault.daysRemaining)}</p>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Blocks remaining:</span>
              <p className="font-mono font-semibold">{formatNumber(vault.blocksRemaining)}</p>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Unlock height:</span>
              <p className="font-mono font-semibold">{formatNumber(vault.unlockHeight)}</p>
            </div>
            <div>
              <span className="text-[var(--text-secondary)]">Progress:</span>
              <div className="w-full bg-[var(--muted)] rounded-full h-2 mt-1">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(vault)}
              className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors font-medium text-sm"
            >
              View Details
            </button>
          )}
          {vault.status === 'unlocked' && onWithdraw && (
            <button
              onClick={() => onWithdraw(vault)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
            >
              Withdraw
            </button>
          )}
          {onAddFunds && (
            <button
              onClick={() => onAddFunds(vault)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
            >
              Add Funds
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

