'use client';

import StatsCard from './StatsCard';

export default function StatsSection() {
  const stats = [
    {
      title: 'Total Vaults Created',
      value: '1,234',
      subtitle: 'Active savings vaults',
      icon: '📦',
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: 'Total STX Locked',
      value: '45,678',
      subtitle: 'STX securely locked',
      icon: '🔒',
      trend: { value: 8.3, isPositive: true },
    },
    {
      title: 'Average Lock Period',
      value: '90 days',
      subtitle: 'Most popular duration',
      icon: '⏰',
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      subtitle: 'Completed vaults',
      icon: '✅',
      trend: { value: 2.1, isPositive: true },
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-transparent via-[var(--muted)]/30 to-transparent">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Platform Statistics</h2>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Real-time data from the HODLBox network
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <StatsCard {...stat} />
          </div>
        ))}
      </div>
    </section>
  );
}

