'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { animateHero } from '@/lib/animations';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    animateHero();

    // Fade background on scroll
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / 600);
        bgRef.current.style.opacity = opacity;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.heroBackground} ref={bgRef}></div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroImageWrapper}>
            <div className={`${styles.heroImageContainer} hero-image`}>
              <Image
                src="/salman.jpg"
                alt="Salman Lakhani"
                width={300}
                height={300}
                className={styles.profileImage}
                priority
              />
              <div className={styles.imageGlow}></div>
            </div>
          </div>
          
          <div className={styles.heroText}>
            <h1 className="hero-title">
              Salman Lakhani
            </h1>
            <h2 className={`${styles.subtitle} hero-subtitle`}>
              Web Developer
            </h2>
            <p className={`${styles.description} hero-description`}>
              Crafting exceptional digital experiences with modern web technologies.
              Passionate about creating beautiful, functional, and user-centric applications.
            </p>
            <div className={`${styles.ctaButtons} hero-cta`}>
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('contact')}
              >
                Get In Touch
              </button>
              <button 
                className={`btn ${styles.btnSecondary}`}
                onClick={() => scrollToSection('experience')}
              >
                View Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
