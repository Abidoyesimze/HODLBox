/**
 * Filtering utilities
 */

import { Vault } from '@/types/vault';

export type VaultFilter = 'all' | 'locked' | 'unlocked' | 'withdrawn' | 'cancelled';

/**
 * Filter vaults by status
 */
export function filterVaultsByStatus(vaults: Vault[], filter: VaultFilter): Vault[] {
  if (filter === 'all') return vaults;
  return vaults.filter((vault) => vault.status === filter);
}

/**
 * Filter vaults by search query
 */
export function filterVaultsBySearch(vaults: Vault[], query: string): Vault[] {
  if (!query.trim()) return vaults;
  
  const lowerQuery = query.toLowerCase();
  return vaults.filter((vault) => {
    return (
      vault.id.toString().includes(lowerQuery) ||
      vault.amount.toLowerCase().includes(lowerQuery) ||
      vault.note?.toLowerCase().includes(lowerQuery) ||
      vault.status.toLowerCase().includes(lowerQuery)
    );
  });
}

/**
 * Combine multiple filters
 */
export function applyFilters(
  vaults: Vault[],
  statusFilter: VaultFilter,
  searchQuery: string
): Vault[] {
  let filtered = filterVaultsByStatus(vaults, statusFilter);
  filtered = filterVaultsBySearch(filtered, searchQuery);
  return filtered;
}

