import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

interface UseGsapRevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  once?: boolean;
}

/**
 * Fade/slide-in children on scroll via GSAP ScrollTrigger.
 * Scope selectors to the container ref returned by this hook.
 */
export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  childSelector = '[data-reveal]',
  options: UseGsapRevealOptions = {}
) {
  const containerRef = useRef<T>(null);
  const {
    y = 36,
    duration = 0.85,
    stagger = 0.1,
    delay = 0,
    once = true,
  } = options;

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const targets = root.querySelectorAll(childSelector);
      if (!targets.length) return;

      gsap.from(targets, {
        y,
        opacity: 0,
        duration,
        stagger,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}
