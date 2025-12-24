'use client';

import { useWallet } from '@/contexts/WalletContext';
import StatsCard from './StatsCard';

export default function QuickStats() {
  const { isConnected, address } = useWallet();

  if (!isConnected) {
    return null;
  }

  // Mock stats - in production, these would come from contract calls
  const stats = [
    {
      title: 'Your Vaults',
      value: '0',
      subtitle: 'Active vaults',
      icon: '📦',
    },
    {
      title: 'Total Locked',
      value: '0 STX',
      subtitle: 'Currently locked',
      icon: '🔒',
    },
    {
      title: 'Achievements',
      value: '0',
      subtitle: 'NFTs earned',
      icon: '🏆',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold mb-6">Your Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
}

