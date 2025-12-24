'use client';

import { useBlockHeight } from '@/hooks/useBlockHeight';
import LoadingSpinner from './LoadingSpinner';

export default function BlockHeightDisplay() {
  const { blockHeight, loading, error } = useBlockHeight();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <LoadingSpinner size="sm" />
        <span>Loading block height...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
      <span>Current Block: <span className="font-mono font-semibold text-[var(--foreground)]">{blockHeight?.toLocaleString() || 'N/A'}</span></span>
    </div>
  );
}

