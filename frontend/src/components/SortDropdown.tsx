'use client';

import { SortOption, getSortLabel } from '@/lib/sorting';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  options?: SortOption[];
}

const defaultOptions: SortOption[] = ['newest', 'oldest', 'amount-high', 'amount-low', 'unlock-soon', 'unlock-later'];

export default function SortDropdown({ value, onChange, options = defaultOptions }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-sm"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {getSortLabel(option)}
        </option>
      ))}
    </select>
  );
}

