'use client';

import { useEffect, useRef } from 'react';
import { animateSectionTitle } from '@/lib/animations';
import styles from './Skills.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  {
    title: "Frontend Development",
    disclaimer: "Don't try to scroll, it's not a bug. There are just too many skills I have 😅, btw a new technology just dropped while you were reading this let's learn that 🧑‍💻",
    skills: [
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "Vue.js", icon: "💚" },
      { name: "React Native", icon: "📱" },
      { name: "JavaScript", icon: "⚡" },
      { name: "HTML5", icon: "🌐" },
      { name: "CSS3", icon: "🎨" },
    ]
  },
  {
    title: "Backend, Database & CMS",
    disclaimer: "Yes, I know PHP is here. It pays the bills so don't judge 🤫",
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "PHP", icon: "🐘" },
      { name: "Java", icon: "☕" },
      { name: "MongoDB", icon: "🍃" },
      { name: "SQL", icon: "🗄️" },
      { name: "WordPress", icon: "W" },
      { name: "Shopify", icon: "🛍️" },
      { name: "BigCommerce", icon: "🅱️" },
    ]
  },
  {
    title: "Creative & Tools",
    disclaimer: "I make things pretty so you ignore the bugs (just kidding, usually) 🎨",
    skills: [
      { name: "Figma", icon: "🖌️" },
      { name: "Adobe XD", icon: "💎" },
      { name: "Photoshop", icon: "🖼️" },
      { name: "Illustrator", icon: "✒️" },
      { name: "GitHub", icon: "🐙" },
      { name: "OOP", icon: "🧩" },
    ]
  }
];

export default function Skills() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    animateSectionTitle('.skills-title');

    // Stagger animation for skill cards
    const categories = containerRef.current.querySelectorAll(`.${styles.scrollContainer}`);
    
    categories.forEach((container) => {
      gsap.fromTo(container.children,
        { 
          x: 50, // Slight slide from right instead of up
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
          }
        }
      );
    });
    
  }, []);

  const handleMouseMove = (e) => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <section id="skills" className={styles.skills} ref={containerRef}>
      <div className="container">
        <h2 className="skills-title text-center">Skills & Expertise</h2>

        {skillCategories.map((category, index) => (
          <div key={index} className={styles.categoryGroup}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div 
              className={styles.scrollContainer}
              onMouseMove={handleMouseMove}
            >
              {category.skills.map((skill, i) => (
                <div 
                  key={i} 
                  ref={el => cardsRef.current.push(el)}
                  className={styles.skillCardWrapper}
                >
                  <div className={`${styles.skillCard} glass-card`}>
                    <div className={styles.icon}>{skill.icon}</div>
                    <span className={styles.name}>{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.disclaimer}>{category.disclaimer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
