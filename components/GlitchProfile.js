'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './GlitchProfile.module.css';

export default function GlitchProfile() {
    const containerRef = useRef(null);
    const [text, setText] = useState('');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    const generateRandomText = (length) => {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update CSS variables for gradient position
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);

        // Regenerate text on every move ("glitch" effect)
        // Roughly calculate chars needed to fill box: 
        // Approx 350px width / 8px char width * 350px height / 14px line height ≈ 1100 chars
        // We'll generate enough to ensure overflow (2500)
        setText(generateRandomText(2500));
    };

    const handleMouseLeave = () => {
        // Reset or clear text? User said fade to zero.
        // We'll keep the text but CSS opacity will handle the fade out.
        // Optional: could clear text to stop "glitching" state, but keeping it ensures smooth fade out.
    };

    return (
        <div
            className={styles.card}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glitch Text Layer */}
            <div className={styles.textLayer}>
                {text}
            </div>

            {/* Profile Image Layer */}
            <div className={styles.imageWrapper}>
                <div className={styles.imageContainer}>
                    <Image
                        src="/salman.png"
                        alt="Salman Lakhani"
                        width={350}
                        height={350}
                        className={styles.profileImg}
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
