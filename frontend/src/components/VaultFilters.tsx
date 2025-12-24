'use client';

interface VaultFiltersProps {
  filter: 'all' | 'locked' | 'unlocked' | 'withdrawn';
  onFilterChange: (filter: 'all' | 'locked' | 'unlocked' | 'withdrawn') => void;
}

export default function VaultFilters({ filter, onFilterChange }: VaultFiltersProps) {
  const filters = [
    { value: 'all' as const, label: 'All Vaults' },
    { value: 'locked' as const, label: 'Locked' },
    { value: 'unlocked' as const, label: 'Unlocked' },
    { value: 'withdrawn' as const, label: 'Withdrawn' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`px-4 py-2 rounded-lg border transition-colors font-medium text-sm ${
            filter === f.value
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'border-[var(--border)] hover:bg-[var(--muted)]'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

