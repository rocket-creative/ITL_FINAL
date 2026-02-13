/**
 * useScrollAnimation Hook
 * Replaces GSAP ScrollTrigger with Intersection Observer API
 * 
 * Usage:
 * const ref = useScrollAnimation();
 * <div ref={ref} className="animate-initial animate-fade-in-up">...</div>
 * 
 * When element scrolls into view, removes .animate-initial to trigger CSS animation
 */

'use client';

import { useEffect, useRef } from 'react';

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Remove initial state, animation classes take over
          element.classList.remove('animate-initial', 'animate-initial-down');
          observer.disconnect();
        }
      },
      { 
        threshold, 
        rootMargin: '0px 0px -100px 0px' // Trigger slightly before element is visible
      }
    );

    observer.observe(element);
    
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
