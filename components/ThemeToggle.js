'use client';

import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ onThemeChange }) {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = (e) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Get button position for ripple animation
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Trigger ripple animation
    if (onThemeChange) {
      onThemeChange(newTheme, { x, y });
    }
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) return null;

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        // Sun icon for dark mode (click to go light)
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.icon}>
          <circle cx="12" cy="12" r="5" strokeWidth="2" />
          <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" />
          <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2" />
          <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" />
          <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2" />
        </svg>
      ) : (
        // Moon icon for light mode (click to go dark)
        <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
