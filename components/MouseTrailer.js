'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './MouseTrailer.module.css';

const CODING_ICONS = ['< >', '{ }', '</>', 'div', '#', '//', '[]', ';'];
const THEME_COLORS_DARK = ['#6366f1', '#8b5cf6', '#ec4899', '#ffffff']; // Indigo, Violet, Pink, White
const THEME_COLORS_LIGHT = ['#6366f1', '#8b5cf6', '#ec4899', '#1a1a1f']; // Dark text for light mode

export default function MouseTrailer() {
  const containerRef = useRef(null);
  
  // Tracking for icon spawning
  const lastSpawnPos = useRef({ x: 0, y: 0 });
  const lastSpawnTime = useRef(0);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      const now = Date.now();
      const dist = Math.hypot(clientX - lastSpawnPos.current.x, clientY - lastSpawnPos.current.y);
      
      // Spawn icon if moved enough distance and enough time passed
      if (now - lastSpawnTime.current > 200 && dist > 30) {
        spawnItem(clientX, clientY);
        lastSpawnTime.current = now;
        lastSpawnPos.current = { x: clientX, y: clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const spawnItem = (x, y) => {
    if (!containerRef.current) return;

    const item = document.createElement('div');
    item.className = styles.codingIcon;
    
    // Check for light theme
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const themeColors = isLight ? THEME_COLORS_LIGHT : THEME_COLORS_DARK;
    
    const icon = CODING_ICONS[Math.floor(Math.random() * CODING_ICONS.length)];
    const color = themeColors[Math.floor(Math.random() * themeColors.length)];
    
    item.textContent = icon;
    item.style.color = color;
    item.style.fontSize = `${Math.random() * 0.8 + 0.8}rem`; 
    item.style.fontWeight = 'bold';
    item.style.fontFamily = 'monospace';

    // Random offset around mouse
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;
    
    gsap.set(item, {
      x: x + offsetX,
      y: y + offsetY,
      scale: 0,
      rotation: Math.random() * 45 - 22.5
    });

    containerRef.current.appendChild(item);

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current && containerRef.current.contains(item)) containerRef.current.removeChild(item);
      }
    });

    tl.to(item, { scale: 1, duration: 0.2, ease: 'back.out(1.7)' })
      .to(item, {
        y: `+=${50 + Math.random() * 50}`,
        opacity: 0,
        duration: .5,
        ease: 'power2.in',
        rotation: `+=${Math.random() * 90 - 45}`
      }, '>'); 
  };

  return (
    <div ref={containerRef} className={styles.trailerContainer} />
  );
}
