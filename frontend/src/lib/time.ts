/**
 * Time and date utilities
 */

/**
 * Get current block height estimate (mock for now)
 * In production, this would fetch from Stacks API
 */
export async function getCurrentBlockHeight(): Promise<number> {
  // TODO: Implement actual API call to Stacks network
  // For now, return a mock value
  return 120000;
}

/**
 * Calculate unlock height from days
 */
export function calculateUnlockHeight(currentHeight: number, days: number): number {
  const blocks = Math.floor(days * 144); // 144 blocks per day
  return currentHeight + blocks;
}

/**
 * Calculate days until unlock
 */
export function calculateDaysUntilUnlock(currentHeight: number, unlockHeight: number): number {
  const blocksRemaining = unlockHeight - currentHeight;
  return Math.max(0, blocksRemaining / 144);
}

/**
 * Format date to relative time (e.g., "in 5 days", "2 weeks ago")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'tomorrow';
  if (diffDays === -1) return 'yesterday';
  if (diffDays > 0) {
    if (diffDays < 7) return `in ${diffDays} days`;
    if (diffDays < 30) return `in ${Math.floor(diffDays / 7)} weeks`;
    if (diffDays < 365) return `in ${Math.floor(diffDays / 30)} months`;
    return `in ${Math.floor(diffDays / 365)} years`;
  } else {
    const absDays = Math.abs(diffDays);
    if (absDays < 7) return `${absDays} days ago`;
    if (absDays < 30) return `${Math.floor(absDays / 7)} weeks ago`;
    if (absDays < 365) return `${Math.floor(absDays / 30)} months ago`;
    return `${Math.floor(absDays / 365)} years ago`;
  }
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number | Date): string {
  const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : timestamp;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format timestamp to readable date and time
 */
export function formatDateTime(timestamp: number | Date): string {
  const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : timestamp;
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

