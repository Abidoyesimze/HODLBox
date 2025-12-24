'use client';

import { Achievement, getAchievement } from '@/lib/achievements';

interface AchievementDisplayProps {
  achievementType: string;
  className?: string;
}

export default function AchievementDisplay({ achievementType, className = '' }: AchievementDisplayProps) {
  const achievement = getAchievement(achievementType as any);

  if (!achievement) return null;

  return (
    <div className={`flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 ${className}`}>
      <div className="text-4xl">{achievement.icon}</div>
      <div>
        <h4 className="font-bold text-indigo-900 dark:text-indigo-100">{achievement.name}</h4>
        <p className="text-sm text-indigo-700 dark:text-indigo-300">{achievement.description}</p>
      </div>
    </div>
  );
}

