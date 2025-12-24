'use client';

import { useBlockHeight } from '@/hooks/useBlockHeight';
import { NETWORK } from '@/lib/constants';

export default function NetworkStatus() {
  const { blockHeight, loading, error } = useBlockHeight();

  return (
    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
      <div className={`w-2 h-2 rounded-full ${error ? 'bg-red-500' : loading ? 'bg-yellow-500' : 'bg-green-500'} ${!error && !loading ? 'animate-pulse' : ''}`}></div>
      <span className="uppercase font-semibold">{NETWORK}</span>
      {blockHeight && (
        <span className="font-mono">#{blockHeight.toLocaleString()}</span>
      )}
    </div>
  );
}

