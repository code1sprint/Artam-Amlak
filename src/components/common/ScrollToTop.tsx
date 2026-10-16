import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { ArrowUp } from 'lucide-react';
import { ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);
  const lenis = useLenis();

  // Scroll to top on every route/pathname change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // Recalculate ScrollTrigger positions after layout settles
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname, lenis]);

  // Monitor scroll distance for back-to-top button (via Lenis when available)
  useLenis((instance) => {
    setShowButton(instance.scroll > 280);
  });

  useEffect(() => {
    if (lenis) return;

    const handleScroll = () => {
      setShowButton(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lenis]);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="بازگشت به بالای صفحه"
      className={cn(
        'fixed bottom-20 md:bottom-8 start-6 z-40 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-900 text-accent-400 shadow-elevated border border-accent-500/30 transition-all duration-300 hover:bg-primary-800 hover:scale-105 active:scale-95 cursor-pointer',
        showButton
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ArrowUp className="h-5 w-5 stroke-[2.2]" />
    </button>
  );
}
