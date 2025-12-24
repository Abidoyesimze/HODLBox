'use client';

import { useState } from 'react';
import Modal from './Modal';
import { validateStxAmount } from '@/lib/validation';
import { formatStx } from '@/lib/utils';

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => Promise<void>;
  vaultId: number;
  currentAmount: string;
}

export default function AddFundsModal({ isOpen, onClose, onConfirm, vaultId, currentAmount }: AddFundsModalProps) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = validateStxAmount(amount);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    try {
      await onConfirm(parseFloat(amount));
      setAmount('');
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add funds');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Add Funds to Vault #${vaultId}`} size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Current Amount: <span className="font-semibold">{formatStx(currentAmount)} STX</span>
          </label>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-2">
            Amount to Add (STX)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError(null);
            }}
            placeholder="0.00"
            min="0.001"
            step="0.01"
            className="w-full px-4 py-3 border border-[var(--border)] rounded-xl bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Add Funds'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

