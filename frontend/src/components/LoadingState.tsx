'use client';

import LoadingSpinner from './LoadingSpinner';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingState({ message = 'Loading...', size = 'md' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <LoadingSpinner size={size} />
      {message && (
        <p className="mt-4 text-[var(--text-secondary)]">{message}</p>
      )}
    </div>
  );
}

