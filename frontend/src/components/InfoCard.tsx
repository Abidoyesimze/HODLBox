'use client';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: string;
  className?: string;
}

export default function InfoCard({ title, description, icon, className = '' }: InfoCardProps) {
  return (
    <div className={`p-6 rounded-xl border border-[var(--border)] bg-[var(--card)] ${className}`}>
      {icon && (
        <div className="text-4xl mb-4">{icon}</div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{description}</p>
    </div>
  );
}

