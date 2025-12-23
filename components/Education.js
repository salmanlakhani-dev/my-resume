'use client';

import { useEffect } from 'react';
import { animateEducation, animateSectionTitle } from '@/lib/animations';
import styles from './Education.module.css';

const education = [
  {
    id: 1,
    institution: 'ILMA University',
    degree: 'Bachelor in Computer Science',
    field: 'Computer Science',
    duration: 'Aug 2021 - June 2025',
    description: 'Pursuing undergraduate degree in Computer Science, building strong foundation in programming, algorithms, data structures, and software engineering principles.'
  },
  {
    id: 2,
    institution: 'Awwwards',
    degree: 'Online Course',
    field: 'Building an Immersive Creative Website from Scratch Without Frameworks',
    duration: 'Aug 2024 - Aug 2024',
    description: 'Specialized course focused on creating immersive and creative websites using vanilla JavaScript and modern web techniques without relying on frameworks.'
  },
  {
    id: 3,
    institution: 'Aptech Learning Institute',
    degree: 'High School Diploma',
    field: 'Computer Science & Programming',
    duration: '2018 - 2021',
    description: 'Comprehensive program covering modern web technologies, programming fundamentals, software development practices, and technical skills in web development.'
  },
  {
    id: 4,
    institution: 'College For Advance Studies',
    degree: 'Upper Secondary Education',
    field: 'General Studies',
    duration: '2018 - 2020',
    description: 'Completed upper secondary education with focus on academic excellence and preparation for higher education in technology field.'
  },
  {
    id: 5,
    institution: 'Metropolitan Foundation School',
    degree: 'Secondary Education',
    field: 'General Studies',
    duration: '2017',
    description: 'Completed secondary education, building foundational knowledge and academic skills for future educational pursuits.'
  }
];

export default function Education() {
  useEffect(() => {
    animateSectionTitle('.education-title');
    animateEducation();
  }, []);

  return (
    <section id="education" className={`${styles.education} education-section`}>
      <div className="container">
        <h2 className="education-title text-center">Education</h2>
        
        <div className={styles.educationGrid}>
          {education.map((edu) => (
            <div key={edu.id} className={`${styles.educationCard} education-card glass-card`}>
              <div className={styles.iconWrapper}>
                <div className={styles.icon}>🎓</div>
              </div>
              
              <h3 className={styles.degree}>{edu.degree}</h3>
              <h4 className={styles.institution}>{edu.institution}</h4>
              <p className={styles.field}>{edu.field}</p>
              <span className={styles.duration}>{edu.duration}</span>
              <p className={styles.description}>{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
