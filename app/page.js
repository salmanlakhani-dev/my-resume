'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import ThemeToggle from '@/components/ThemeToggle';
import RippleTransition from '@/components/RippleTransition';

export default function Home() {
  const [rippleState, setRippleState] = useState({
    isAnimating: false,
    position: { x: 0, y: 0 },
    newTheme: 'dark'
  });

  const handleThemeChange = (newTheme, position) => {
    setRippleState({
      isAnimating: true,
      position,
      newTheme
    });

    // Switch theme at 50% of animation
    setTimeout(() => {
      document.documentElement.setAttribute('data-theme', newTheme);
    }, 400);
  };

  const handleRippleComplete = () => {
    setRippleState(prev => ({ ...prev, isAnimating: false }));
  };

  return (
    <main>
      <ThemeToggle onThemeChange={handleThemeChange} />
      <RippleTransition 
        isAnimating={rippleState.isAnimating}
        position={rippleState.position}
        newTheme={rippleState.newTheme}
        onComplete={handleRippleComplete}
      />
      <Hero />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </main>
  );
}
