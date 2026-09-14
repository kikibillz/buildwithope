import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'expanded';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'icon', className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'expanded') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        id="theme-toggle-expanded"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer border ${
          isDark
            ? 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700'
            : 'bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200'
        } ${className}`}
      >
        <span className="flex items-center gap-2">
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-stone-600" />
          )}
          <span>{isDark ? 'Light Theme' : 'Dark Theme'}</span>
        </span>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-200/60 dark:bg-stone-900 text-stone-600 dark:text-stone-400">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      id="theme-toggle-btn"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative p-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center border ${
        isDark
          ? 'bg-stone-800/90 text-amber-300 border-stone-700 hover:bg-stone-700 hover:text-amber-200 shadow-inner'
          : 'bg-stone-100 text-stone-700 border-stone-200/90 hover:bg-stone-200 hover:text-stone-950 shadow-2xs'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>
    </button>
  );
};
