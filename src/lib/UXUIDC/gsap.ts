/**
 * |UXUIDC| GSAP Configuration and Utilities
 * @version 1.0.0
 * @created 2026
 * @description GSAP setup with ScrollTrigger for animations
 */

'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

// Animation presets
export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  duration: 0.8,
  ease: 'power2.out',
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  duration: 0.6,
  ease: 'power2.out',
};

export const staggerChildren = {
  stagger: 0.15,
  ease: 'power2.out',
};

// Scroll-triggered animation helper
export function createScrollAnimation(
  element: Element | string,
  animation: gsap.TweenVars,
  triggerOptions?: ScrollTrigger.Vars
) {
  return gsap.from(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
      ...triggerOptions,
    },
  });
}

// Stagger animation helper
export function createStaggerAnimation(
  container: string,
  items: string,
  animation: gsap.TweenVars = fadeInUp
) {
  return gsap.from(items, {
    ...animation.initial,
    duration: animation.duration || 0.6,
    stagger: 0.15,
    scrollTrigger: {
      trigger: container,
      start: 'top 75%',
    },
  });
}

// Parallax effect helper
export function createParallaxEffect(element: string, speed: number = -100) {
  return gsap.to(element, {
    y: speed,
    scrollTrigger: {
      trigger: element,
      scrub: true,
      start: 'top bottom',
      end: 'bottom top',
    },
  });
}

// Cleanup helper for useEffect
export function cleanupAnimation(animation: gsap.core.Tween | gsap.core.Timeline) {
  return () => {
    animation.kill();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
