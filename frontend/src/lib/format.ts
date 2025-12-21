/**
 * Formatting utilities for display
 */

/**
 * Format number with thousand separators
 */
export function formatNumber(num: number | string): string {
  return Number(num).toLocaleString('en-US');
}

/**
 * Format days remaining text
 */
export function formatDaysRemaining(days: number): string {
  if (days < 1) return 'Less than 1 day';
  if (days === 1) return '1 day';
  if (days < 7) return `${Math.floor(days)} days`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    const remainingDays = Math.floor(days % 7);
    if (remainingDays === 0) return `${weeks} week${weeks > 1 ? 's' : ''}`;
    return `${weeks} week${weeks > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    const remainingDays = Math.floor(days % 30);
    if (remainingDays === 0) return `${months} month${months > 1 ? 's' : ''}`;
    return `${months} month${months > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
  }
  const years = Math.floor(days / 365);
  const remainingDays = Math.floor(days % 365);
  if (remainingDays === 0) return `${years} year${years > 1 ? 's' : ''}`;
  return `${years} year${years > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format block height
 */
export function formatBlockHeight(height: number): string {
  return `#${formatNumber(height)}`;
}

/**
 * Get status badge color classes
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'locked':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'unlocked':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'withdrawn':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(currentHeight: number, unlockHeight: number, createdAt: number): number {
  const totalBlocks = unlockHeight - createdAt;
  const elapsedBlocks = currentHeight - createdAt;
  return Math.max(0, Math.min(100, (elapsedBlocks / totalBlocks) * 100));
}

