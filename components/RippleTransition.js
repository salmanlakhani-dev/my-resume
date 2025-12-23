'use client';

import { useState } from 'react';
import styles from './RippleTransition.module.css';

export default function RippleTransition({ isAnimating, position, newTheme, onComplete }) {
  if (!isAnimating) return null;

  return (
    <div 
      className={styles.rippleOverlay}
      style={{
        '--ripple-x': `${position.x}px`,
        '--ripple-y': `${position.y}px`,
      }}
      onAnimationEnd={onComplete}
    >
      <div className={styles.ripple} data-theme={newTheme}></div>
    </div>
  );
}
