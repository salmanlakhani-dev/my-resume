"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './SarcasticPopup.module.css';

export default function SarcasticPopup({ isOpen, onClose, onConfirm }) {
  const popupRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Show overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: 'auto'
      });

      // Grow popup
      gsap.fromTo(popupRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }
      );
    } else {
      // Hide popup
      gsap.to(popupRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });

      // Hide overlay
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none'
      });
    }
  }, [isOpen]);

  if (!isOpen && !popupRef.current) return null;

  return (
    <div className={styles.overlay} ref={overlayRef} onClick={onClose}>
      <div
        className={`${styles.popup} glass-card`}
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.icon}>🤨</div>
        <h3 className={styles.title}>Wait... Really? A PDF? 📄</h3>
        <p className={styles.message}>
          After exploring this entire interactive, animated, premium website... you still want a boring old PDF?
          <br /><br />
          I mean, I get it. Old habits die hard. But come on! 😅
        </p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            You&apos;re right, I&apos;ll stay 🙌
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            I&apos;m old school, give me the PDF 📥
          </button>
        </div>
      </div>
    </div>
  );
}
