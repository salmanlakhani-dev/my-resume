'use client';

import { useEffect, useRef } from 'react';
import { animateSectionTitle } from '@/lib/animations';
import styles from './Experience.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: 1,
    company: 'ELEVATE TALENT & MARKETING',
    position: 'Project Manager',
    duration: 'Apr 2022 - Current',
    description: 'I manage a talented team of web developers, mobile app developers, and SEO specialists. My role involves overseeing React and Node.js projects to ensure they run smoothly and load quickly. I work closely with different teams to add new features seamlessly and create responsive designs that provide great user experiences. I also handle client communications, develop strategies to bring in new clients, and make sure all projects are delivered on time while maintaining a positive team environment.'
  },
  {
    id: 2,
    company: 'DESIGNS IN PK',
    position: 'Software Developer',
    duration: 'Feb 2024 - Current',
    description: 'As a software developer, I work with a diverse team to build modern web applications using React and Node.js. I focus on writing clean code that makes websites fast and user-friendly. I collaborate with designers and other developers to integrate new features smoothly. I also help improve our website\'s visibility on search engines and maintain clear communication with clients to ensure their needs are met. My goal is to deliver high-quality projects that exceed expectations.'
  },
  {
    id: 3,
    company: 'GEEKSLOGICITY',
    position: 'MERN Stack Developer',
    duration: 'Jan 2022 - Mar 2024',
    description: 'I led a team of developers and successfully completed over 20 projects. My focus was on building fast, responsive websites using React and Node.js technologies. I improved our team\'s efficiency, which helped us finish projects 15% faster than before. Notable achievements include building the backend for OneDay.AE, a major e-commerce platform, and leading the development of the 24-7 Carwash platform, including both the website and mobile app.'
  },
  {
    id: 4,
    company: 'ANNZEH DIGITALS',
    position: 'Web Developer',
    duration: 'Aug 2021 - Jan 2022',
    description: 'I started as a WordPress developer and was promoted to MERN Stack Developer within months. I built multiple websites and created two mobile applications using React Native and Node.js. I handled all aspects of client projects, from understanding their requirements to delivering the final product. This role taught me how to manage projects independently and communicate effectively with clients.'
  },
  {
    id: 5,
    company: 'BBW SUPPLY',
    position: 'Web Developer',
    duration: 'Jun 2020 - Dec 2021',
    description: 'I developed and maintained multiple e-commerce websites using WordPress and WooCommerce. I customized themes and plugins to meet specific client needs and integrated payment gateways for smooth transactions. I also optimized websites for better performance and search engine rankings. This role gave me a solid foundation in web development and taught me the importance of understanding client requirements.'
  },
  {
    id: 6,
    company: 'UNIVERSITY OF KARACHI',
    position: 'Assistant Lecturer',
    duration: 'Sep 2019 - May 2020',
    description: 'I worked as an assistant lecturer where I built strong relationships with students and colleagues. I used interactive teaching methods like group projects and hands-on activities to make learning more engaging. I collaborated with other teachers to create lessons that connected different subjects and helped students understand concepts better. This experience developed my communication and teamwork skills.'
  }
];

export default function Experience() {
  const shapesRef = useRef([]);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    animateSectionTitle('.experience-title');

    // GSAP ScrollTrigger for horizontal parallax movement of background shapes
    if (typeof window !== 'undefined' && shapesRef.current.length > 0) {
      shapesRef.current.forEach((shape, index) => {
        if (shape) {
          const direction = index % 2 === 0 ? 1 : -1;
          
          // Use functional value for x so it recalculates on resize
          gsap.to(shape, {
            x: () => direction * ((window.innerWidth * 0.6) + (index * 100)),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true, // Key: Recalculate values on resize
            }
          });
        }
      });
    }

    // Circle expansion animation using matchMedia for robust responsiveness
    if (typeof window !== 'undefined' && timelineRef.current) {
      ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 960px)": function() {
          setupAnimations(900);
        },
        // Mobile/Tablet
        "(max-width: 959px)": function() {
          setupAnimations("calc(100vw - 32px)");
        } 
      });

      function setupAnimations(targetWidth) {
        experiences.forEach((exp, index) => {
          const circle = document.querySelector(`.expanding-circle-${index}`);
          if (!circle) return;

          const content = circle.querySelector(`.${styles.itemContent}`);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: circle,
              start: `top ${80 - (index * 20)}%`,
              end: `top ${10 - (index * 30)}%`,
              scrub: 1.5,
              markers: false, 
            }
          });

          // 1. Expand circle horizontally
          tl.to(circle, {
            width: targetWidth,
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            marginBottom: index < experiences.length - 1 ? 48 : 0,
            duration: 0.5,
          })
          // 2. Smoothly reveal content vertically
          .to(content, {
            opacity: 1,
            maxHeight: 1000,
            paddingTop: '2rem',
            paddingBottom: '2rem',
            duration: 0.5,
          }, '-=0.2');
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="experience" className={styles.experience} ref={sectionRef}>
      {/* Floating background shapes */}
      <div className={styles.floatingShapes}>
        <div 
          ref={el => shapesRef.current[0] = el} 
          className={`${styles.shape} ${styles.shape1}`}
        ></div>
        <div 
          ref={el => shapesRef.current[1] = el} 
          className={`${styles.shape} ${styles.shape2}`}
        ></div>
        <div 
          ref={el => shapesRef.current[2] = el} 
          className={`${styles.shape} ${styles.shape3}`}
        ></div>
        <div 
          ref={el => shapesRef.current[3] = el} 
          className={`${styles.shape} ${styles.shape4}`}
        ></div>
        <div 
          ref={el => shapesRef.current[4] = el} 
          className={`${styles.shape} ${styles.shape5}`}
        ></div>
      </div>

      <div className="container">
        <h2 className="experience-title text-center">Work Experience</h2>
        
        <div className={styles.timeline} ref={timelineRef}>
          {/* Timeline line */}
          <div className={styles.timelineLine}></div>
          
          {/* Render all circles as siblings */}
          {experiences.map((exp, index) => (
            <div 
              key={exp.id}
              className={`${styles.expandingCircle} expanding-circle-${index}`}
              data-index={index}
            >
              <div className={styles.itemContent}>
                <div className={styles.experienceHeader}>
                  <div>
                    <h3 className={styles.position}>{exp.position}</h3>
                    <h4 className={styles.company}>{exp.company}</h4>
                  </div>
                  <span className={styles.duration}>{exp.duration}</span>
                </div>
                <p className={styles.description}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
