'use client';

import { calculateProgress } from '@/lib/format';

interface VaultProgressBarProps {
  currentHeight: number;
  unlockHeight: number;
  createdAt: number;
  className?: string;
}

export default function VaultProgressBar({ 
  currentHeight, 
  unlockHeight, 
  createdAt,
  className = '' 
}: VaultProgressBarProps) {
  const progress = calculateProgress(currentHeight, unlockHeight, createdAt);

  return (
    <div className={`w-full bg-[var(--muted)] rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500 relative overflow-hidden"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      >
        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
      </div>
    </div>
  );
}

