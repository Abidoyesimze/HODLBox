'use client';

import { useState } from 'react';

type TransactionStatus = 'idle' | 'pending' | 'success' | 'failed';

interface UseTransactionReturn {
  status: TransactionStatus;
  txId: string | null;
  error: string | null;
  execute: (fn: () => Promise<string>) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for managing transaction states
 */
export function useTransaction(): UseTransactionReturn {
  const [status, setStatus] = useState<TransactionStatus>('idle');
  const [txId, setTxId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = async (fn: () => Promise<string>) => {
    try {
      setStatus('pending');
      setError(null);
      const id = await fn();
      setTxId(id);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      setStatus('failed');
    }
  };

  const reset = () => {
    setStatus('idle');
    setTxId(null);
    setError(null);
  };

  return {
    status,
    txId,
    error,
    execute,
    reset,
  };
}

