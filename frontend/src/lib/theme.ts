/**
 * Theme utilities
 */

/**
 * Check if dark mode is preferred
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Get theme from localStorage or system preference
 */
export function getTheme(): 'light' | 'dark' | 'system' {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem('hodlbox_theme');
  return (stored as 'light' | 'dark' | 'system') || 'system';
}

/**
 * Set theme preference
 */
export function setTheme(theme: 'light' | 'dark' | 'system'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('hodlbox_theme', theme);
  
  const root = document.documentElement;
  if (theme === 'system') {
    root.classList.remove('light', 'dark');
    root.classList.add(prefersDarkMode() ? 'dark' : 'light');
  } else {
    root.classList.remove('light', 'dark', 'system');
    root.classList.add(theme);
  }
}

/**
 * Initialize theme on page load
 */
export function initTheme(): void {
  if (typeof window === 'undefined') return;
  const theme = getTheme();
  setTheme(theme);
}

