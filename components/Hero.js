'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animateHero } from '@/lib/animations';
import styles from './Hero.module.css';
import SarcasticPopup from './SarcasticPopup';
import GlitchProfile from './GlitchProfile';

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

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

  const handleDownload = () => {
    setShowPopup(true);
  };

  const confirmDownload = () => {
    // Open PDF in new tab (browser will handle download)
    window.open('/Salman Lakhani.pdf', '_blank');
    setShowPopup(false);
  };

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.heroBackground} ref={bgRef}></div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={`${styles.heroImageWrapper} hero-image`}>
            <GlitchProfile />
          </div>

          <div className={styles.heroText}>
            <h1 className="hero-title">
              Salman Lakhani
            </h1>
            <h2 className={`${styles.subtitle} hero-subtitle`}>
              Web Developer
            </h2>
            <p className={`${styles.description} hero-description`}>
              &quot;Hey, I&apos;m Salman. I was coding before AI could even finish a sentence.
              If you&apos;re terrified it&apos;s going to replace you, you clearly haven&apos;t seen it try to debug itself.
              If you&apos;re not—welcome to the community.&quot;
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
              <button
                className={`btn ${styles.btnSecondary}`}
                onClick={handleDownload}
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <SarcasticPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={confirmDownload}
      />
    </section>
  );
}
