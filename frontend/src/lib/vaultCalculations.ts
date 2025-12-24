/**
 * Vault calculation utilities
 */

import { BLOCKS_PER_DAY } from './constants';

/**
 * Calculate unlock height from current height and days
 */
export function calculateUnlockHeight(currentHeight: number, days: number): number {
  const blocks = Math.floor(days * BLOCKS_PER_DAY);
  return currentHeight + blocks;
}

/**
 * Calculate days remaining until unlock
 */
export function calculateDaysRemaining(currentHeight: number, unlockHeight: number): number {
  const blocksRemaining = unlockHeight - currentHeight;
  return Math.max(0, blocksRemaining / BLOCKS_PER_DAY);
}

/**
 * Calculate blocks remaining until unlock
 */
export function calculateBlocksRemaining(currentHeight: number, unlockHeight: number): number {
  return Math.max(0, unlockHeight - currentHeight);
}

/**
 * Calculate estimated unlock date
 */
export function calculateUnlockDate(currentHeight: number, unlockHeight: number): Date {
  const blocksRemaining = unlockHeight - currentHeight;
  const daysRemaining = blocksRemaining / BLOCKS_PER_DAY;
  const date = new Date();
  date.setDate(date.getDate() + Math.ceil(daysRemaining));
  return date;
}

/**
 * Check if vault is unlocked
 */
export function isVaultUnlocked(currentHeight: number, unlockHeight: number): boolean {
  return currentHeight >= unlockHeight;
}

/**
 * Calculate time until unlock in human-readable format
 */
export function getTimeUntilUnlock(currentHeight: number, unlockHeight: number): string {
  const blocksRemaining = unlockHeight - currentHeight;
  if (blocksRemaining <= 0) return 'Unlocked';
  
  const days = blocksRemaining / BLOCKS_PER_DAY;
  if (days < 1) {
    const hours = days * 24;
    if (hours < 1) {
      const minutes = hours * 60;
      return `${Math.ceil(minutes)} minutes`;
    }
    return `${Math.ceil(hours)} hours`;
  }
  if (days < 7) {
    return `${Math.ceil(days)} day${Math.ceil(days) !== 1 ? 's' : ''}`;
  }
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks !== 1 ? 's' : ''}`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? 's' : ''}`;
}

