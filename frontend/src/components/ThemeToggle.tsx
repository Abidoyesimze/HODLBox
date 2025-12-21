'use client';

import { useEffect, useState } from 'react';
import { getTheme, setTheme } from '@/lib/theme';

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>(getTheme());

  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setCurrentTheme(nextTheme);
  };

  const getIcon = () => {
    switch (currentTheme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '💻';
      default:
        return '💻';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors"
      title={`Current theme: ${currentTheme}`}
      aria-label="Toggle theme"
    >
      <span className="text-lg">{getIcon()}</span>
    </button>
  );
}

