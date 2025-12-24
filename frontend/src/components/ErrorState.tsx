'use client';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

