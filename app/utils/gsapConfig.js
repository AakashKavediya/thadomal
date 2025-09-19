import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Global GSAP configuration
export const gsapConfig = {
  // Default animation settings
  defaults: {
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1
  },
  
  // Common animation presets
  presets: {
    fadeInUp: {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1 }
    },
    fadeInLeft: {
      from: { x: -50, opacity: 0 },
      to: { x: 0, opacity: 1 }
    },
    fadeInRight: {
      from: { x: 50, opacity: 0 },
      to: { x: 0, opacity: 1 }
    },
    scaleIn: {
      from: { scale: 0, opacity: 0 },
      to: { scale: 1, opacity: 1 }
    },
    slideInUp: {
      from: { y: 100, opacity: 0 },
      to: { y: 0, opacity: 1 }
    }
  },
  
  // ScrollTrigger defaults
  scrollTriggerDefaults: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    markers: false // Set to true for debugging
  }
};

// Utility functions for common animations
export const gsapUtils = {
  // Animate elements with a preset
  animateWithPreset: (elements, preset, options = {}) => {
    const config = { ...gsapConfig.defaults, ...options };
    return gsap.fromTo(elements, preset.from, {
      ...preset.to,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger
    });
  },
  
  // Create a scroll-triggered animation
  createScrollAnimation: (elements, animation, scrollOptions = {}) => {
    const scrollConfig = { ...gsapConfig.scrollTriggerDefaults, ...scrollOptions };
    return gsap.fromTo(elements, animation.from, {
      ...animation.to,
      scrollTrigger: {
        trigger: elements,
        ...scrollConfig
      }
    });
  },
  
  // Animate on scroll with preset
  scrollAnimateWithPreset: (elements, preset, scrollOptions = {}) => {
    return gsapUtils.createScrollAnimation(elements, preset, scrollOptions);
  },
  
  // Create a timeline with common settings
  createTimeline: (options = {}) => {
    return gsap.timeline({
      defaults: { ...gsapConfig.defaults },
      ...options
    });
  },
  
  // Animate cards in a grid
  animateCardGrid: (cards, options = {}) => {
    const config = {
      from: { y: 100, opacity: 0, scale: 0.8 },
      to: { y: 0, opacity: 1, scale: 1 },
      ...options
    };
    
    return gsap.fromTo(cards, config.from, {
      ...config.to,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: cards,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
  },
  
  // Animate text reveal
  animateTextReveal: (textElements, options = {}) => {
    const config = {
      from: { y: 50, opacity: 0 },
      to: { y: 0, opacity: 1 },
      ...options
    };
    
    return gsap.fromTo(textElements, config.from, {
      ...config.to,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: textElements,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });
  },
  
  // Animate modal appearance
  animateModalIn: (modal, options = {}) => {
    const config = {
      from: { scale: 0.8, opacity: 0, y: 50 },
      to: { scale: 1, opacity: 1, y: 0 },
      ...options
    };
    
    return gsap.fromTo(modal, config.from, {
      ...config.to,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  },
  
  // Animate modal exit
  animateModalOut: (modal, options = {}) => {
    const config = {
      to: { scale: 0.8, opacity: 0, y: 50 },
      ...options
    };
    
    return gsap.to(modal, {
      ...config.to,
      duration: 0.3,
      ease: 'back.in(1.7)'
    });
  },
  
  // Setup hover animations for interactive elements
  setupHoverAnimations: (elements, options = {}) => {
    const config = {
      hoverScale: 1.05,
      hoverDuration: 0.3,
      ...options
    };
    
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: config.hoverScale,
          duration: config.hoverDuration,
          ease: 'power2.out'
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: config.hoverDuration,
          ease: 'power2.out'
        });
      });
    });
  },
  
  // Clean up all ScrollTrigger instances
  cleanup: () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
};

// Export default configuration
export default gsapConfig;
