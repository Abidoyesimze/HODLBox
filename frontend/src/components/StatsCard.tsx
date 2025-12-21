'use client';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, subtitle, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-[var(--text-secondary)] mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && (
            <p className="text-sm text-[var(--text-secondary)] mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-4xl opacity-20">{icon}</div>
        )}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm ${
          trend.isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}
    </div>
  );
}

