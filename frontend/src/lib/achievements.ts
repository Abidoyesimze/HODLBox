/**
 * Achievement system utilities
 */

import {
  MILESTONE_1_WEEK,
  MILESTONE_1_MONTH,
  MILESTONE_3_MONTHS,
  MILESTONE_6_MONTHS,
  MILESTONE_1_YEAR,
} from './constants';

export type AchievementType =
  | 'first-lock'
  | 'week-warrior'
  | 'bronze-believer'
  | 'silver-saver'
  | 'gold-holder'
  | 'diamond-hands';

export interface Achievement {
  type: AchievementType;
  name: string;
  description: string;
  icon: string;
  milestone: number; // in blocks
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    type: 'first-lock',
    name: 'First Lock',
    description: 'Created your first vault',
    icon: '🎯',
    milestone: 0,
  },
  {
    type: 'week-warrior',
    name: 'Week Warrior',
    description: 'Locked funds for at least 1 week',
    icon: '⚔️',
    milestone: MILESTONE_1_WEEK,
  },
  {
    type: 'bronze-believer',
    name: 'Bronze Believer',
    description: 'Locked funds for at least 1 month',
    icon: '🥉',
    milestone: MILESTONE_1_MONTH,
  },
  {
    type: 'silver-saver',
    name: 'Silver Saver',
    description: 'Locked funds for at least 3 months',
    icon: '🥈',
    milestone: MILESTONE_3_MONTHS,
  },
  {
    type: 'gold-holder',
    name: 'Gold Holder',
    description: 'Locked funds for at least 6 months',
    icon: '🥇',
    milestone: MILESTONE_6_MONTHS,
  },
  {
    type: 'diamond-hands',
    name: 'Diamond Hands',
    description: 'Locked funds for at least 1 year',
    icon: '💎',
    milestone: MILESTONE_1_YEAR,
  },
];

/**
 * Get achievement type based on lock duration
 */
export function getAchievementType(lockDuration: number): AchievementType {
  if (lockDuration >= MILESTONE_1_YEAR) return 'diamond-hands';
  if (lockDuration >= MILESTONE_6_MONTHS) return 'gold-holder';
  if (lockDuration >= MILESTONE_3_MONTHS) return 'silver-saver';
  if (lockDuration >= MILESTONE_1_MONTH) return 'bronze-believer';
  if (lockDuration >= MILESTONE_1_WEEK) return 'week-warrior';
  return 'first-lock';
}

/**
 * Get achievement details by type
 */
export function getAchievement(type: AchievementType): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.type === type);
}

/**
 * Get next achievement for a given lock duration
 */
export function getNextAchievement(lockDuration: number): Achievement | null {
  const sortedAchievements = [...ACHIEVEMENTS].sort((a, b) => b.milestone - a.milestone);
  
  for (const achievement of sortedAchievements) {
    if (lockDuration < achievement.milestone) {
      return achievement;
    }
  }
  
  return null; // All achievements unlocked
}

