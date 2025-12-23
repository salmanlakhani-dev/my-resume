import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Hero Section Animations
export const animateHero = () => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  tl.fromTo('.hero-image', 
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: 'back.out(1.7)',
    }
  )
  .fromTo('.hero-title',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    '-=0.6'
  )
  .fromTo('.hero-subtitle',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    '-=0.4'
  )
  .fromTo('.hero-description',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8 },
    '-=0.4'
  )
  .fromTo('.hero-cta',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    '-=0.3'
  );
  
  return tl;
};

// Experience Section Scroll Animations
export const animateExperience = () => {
  const experienceItems = gsap.utils.toArray('.experience-item');
  
  experienceItems.forEach((item, index) => {
    gsap.fromTo(item,
      {
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }
    );
  });
};

// Education Section Animations
export const animateEducation = () => {
  const educationCards = gsap.utils.toArray('.education-card');
  
  gsap.fromTo(educationCards,
    { y: 60, opacity: 0 },
    {
      scrollTrigger: {
        trigger: '.education-section',
        start: 'top 70%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      },
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power2.out',
    }
  );
};

// Contact Section Animations
export const animateContact = () => {
  gsap.fromTo('.contact-content',
    { y: 50, opacity: 0 },
    {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }
  );
  
  const socialLinks = gsap.utils.toArray('.social-link');
  gsap.fromTo(socialLinks,
    { scale: 0, opacity: 0 },
    {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
      scale: 1,
      opacity: 1,
      stagger: 0.1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    }
  );
};

// Section Title Animations
export const animateSectionTitle = (selector) => {
  gsap.fromTo(selector,
    { y: 30, opacity: 0 },
    {
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }
  );
};

// Smooth Scroll Setup
export const setupSmoothScroll = () => {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 0 },
          ease: 'power2.inOut',
        });
      }
    });
  });
};
