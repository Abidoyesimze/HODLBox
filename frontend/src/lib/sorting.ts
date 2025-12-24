/**
 * Sorting utilities
 */

import { Vault } from '@/types/vault';

export type SortOption = 'newest' | 'oldest' | 'amount-high' | 'amount-low' | 'unlock-soon' | 'unlock-later';

/**
 * Sort vaults by various criteria
 */
export function sortVaults(vaults: Vault[], sortBy: SortOption): Vault[] {
  const sorted = [...vaults];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'oldest':
      return sorted.sort((a, b) => a.id - b.id);
    case 'amount-high':
      return sorted.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    case 'amount-low':
      return sorted.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
    case 'unlock-soon':
      return sorted.sort((a, b) => a.unlockHeight - b.unlockHeight);
    case 'unlock-later':
      return sorted.sort((a, b) => b.unlockHeight - a.unlockHeight);
    default:
      return sorted;
  }
}

/**
 * Get sort option label
 */
export function getSortLabel(sortBy: SortOption): string {
  const labels: Record<SortOption, string> = {
    newest: 'Newest First',
    oldest: 'Oldest First',
    'amount-high': 'Highest Amount',
    'amount-low': 'Lowest Amount',
    'unlock-soon': 'Unlock Soon',
    'unlock-later': 'Unlock Later',
  };
  return labels[sortBy];
}

