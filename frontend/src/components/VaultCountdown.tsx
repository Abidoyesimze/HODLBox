'use client';

import { useState, useEffect } from 'react';
import { getTimeUntilUnlock } from '@/lib/vaultCalculations';

interface VaultCountdownProps {
  currentHeight: number;
  unlockHeight: number;
  className?: string;
}

export default function VaultCountdown({ currentHeight, unlockHeight, className = '' }: VaultCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState(getTimeUntilUnlock(currentHeight, unlockHeight));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeUntilUnlock(currentHeight, unlockHeight));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [currentHeight, unlockHeight]);

  if (currentHeight >= unlockHeight) {
    return (
      <div className={`text-green-600 dark:text-green-400 font-semibold ${className}`}>
        ✓ Unlocked
      </div>
    );
  }

  return (
    <div className={`text-[var(--foreground)] ${className}`}>
      <span className="font-semibold">{timeRemaining}</span>
      <span className="text-[var(--text-secondary)] ml-1">remaining</span>
    </div>
  );
}

