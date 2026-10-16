import React, { useEffect, useRef, useState } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Global Lenis smooth scroll, driven by the GSAP ticker and
 * synced with ScrollTrigger so scrub/pin animations stay in frame.
 * Respects prefers-reduced-motion (disables wheel smoothing).
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    let cancelled = false;

    const attachScrollSync = () => {
      if (cancelled) return;
      const lenis = lenisRef.current?.lenis;
      if (!lenis) {
        requestAnimationFrame(attachScrollSync);
        return;
      }
      lenis.on('scroll', ScrollTrigger.update);
      ScrollTrigger.refresh();
    };

    attachScrollSync();

    return () => {
      cancelled = true;
      gsap.ticker.remove(update);
      lenisRef.current?.lenis?.off('scroll', ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: reduceMotion ? 0 : 1.15,
        smoothWheel: !reduceMotion,
        touchMultiplier: 1.6,
        wheelMultiplier: 0.95,
      }}
    >
      {children}
    </ReactLenis>
  );
}
