'use client';

import { useEffect, useState } from 'react';

interface DripEffectProps {
  count?: number;
  color?: string;
}

export default function DripEffect({ count = 5, color = 'rgba(99, 102, 241, 0.1)' }: DripEffectProps) {
  const [drips, setDrips] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newDrips = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }));
    setDrips(newDrips);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {drips.map((drip) => (
        <div
          key={drip.id}
          className="absolute top-0 w-1 h-20 rounded-full animate-drip"
          style={{
            left: `${drip.left}%`,
            background: `linear-gradient(to bottom, ${color}, transparent)`,
            animationDelay: `${drip.delay}s`,
            animationDuration: `${drip.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

