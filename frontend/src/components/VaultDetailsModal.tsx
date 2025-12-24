'use client';

import Modal from './Modal';
import { Vault } from '@/types/vault';
import { formatStx, formatNumber } from '@/lib/utils';
import { formatDaysRemaining, getStatusColor } from '@/lib/format';
import VaultProgressBar from './VaultProgressBar';
import VaultCountdown from './VaultCountdown';

interface VaultDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vault: Vault | null;
}

export default function VaultDetailsModal({ isOpen, onClose, vault }: VaultDetailsModalProps) {
  if (!vault) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Vault #${vault.id}`} size="lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{formatStx(vault.amount)} STX</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vault.status)}`}>
              {vault.status.charAt(0).toUpperCase() + vault.status.slice(1)}
            </span>
          </div>
        </div>

        {vault.note && (
          <div className="p-4 bg-[var(--muted)] rounded-lg">
            <p className="text-[var(--text-secondary)]">💭 {vault.note}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[var(--text-secondary)] mb-1">Unlock Time</p>
            <p className="font-semibold">
              <VaultCountdown currentHeight={vault.currentHeight} unlockHeight={vault.unlockHeight} />
            </p>
          </div>
          <div>
            <p className="text-sm text-[var(--text-secondary)] mb-1">Days Remaining</p>
            <p className="font-semibold">{formatDaysRemaining(vault.daysRemaining)}</p>
          </div>
          <div>
            <p className="text-sm text-[var(--text-secondary)] mb-1">Blocks Remaining</p>
            <p className="font-mono font-semibold">{formatNumber(vault.blocksRemaining)}</p>
          </div>
          <div>
            <p className="text-sm text-[var(--text-secondary)] mb-1">Unlock Height</p>
            <p className="font-mono font-semibold">{formatNumber(vault.unlockHeight)}</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-secondary)]">Progress</span>
            <span className="font-semibold">
              {Math.round(((vault.unlockHeight - vault.currentHeight - vault.blocksRemaining) / (vault.unlockHeight - vault.currentHeight)) * 100)}%
            </span>
          </div>
          <VaultProgressBar
            currentHeight={vault.currentHeight}
            unlockHeight={vault.unlockHeight}
            createdAt={vault.currentHeight - vault.blocksRemaining}
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
          {vault.status === 'unlocked' && (
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              Withdraw
            </button>
          )}
          <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            Add Funds
          </button>
        </div>
      </div>
    </Modal>
  );
}

