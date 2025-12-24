'use client';

import { formatStx } from '@/lib/utils';

interface PriceDisplayProps {
  amount: string | number;
  showSymbol?: boolean;
  className?: string;
}

export default function PriceDisplay({ amount, showSymbol = true, className = '' }: PriceDisplayProps) {
  return (
    <span className={`font-mono ${className}`}>
      {formatStx(amount)}
      {showSymbol && <span className="ml-1">STX</span>}
    </span>
  );
}

