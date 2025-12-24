'use client';

import AchievementDisplay from './AchievementDisplay';
import { ACHIEVEMENTS } from '@/lib/achievements';

interface AchievementsListProps {
  earnedAchievements: string[];
  className?: string;
}

export default function AchievementsList({ earnedAchievements, className = '' }: AchievementsListProps) {
  return (
    <div className={className}>
      <h3 className="text-2xl font-bold mb-6">Your Achievements</h3>
      {earnedAchievements.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-[var(--border)] rounded-xl">
          <div className="text-5xl mb-4">🏆</div>
          <p className="text-[var(--text-secondary)]">No achievements earned yet</p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Complete your first vault to earn achievements!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {earnedAchievements.map((achievementType) => (
            <AchievementDisplay key={achievementType} achievementType={achievementType} />
          ))}
        </div>
      )}
    </div>
  );
}

