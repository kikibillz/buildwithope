import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      id="btn-back-to-top"
      onClick={scrollToTop}
      data-cursor-text="TOP"
      aria-label="Back to top of page"
      className="fixed bottom-6 right-6 z-40 p-3 sm:px-4 sm:py-2.5 rounded-full bg-stone-900/90 hover:bg-stone-900 dark:bg-stone-100/90 dark:hover:bg-white text-white dark:text-stone-950 shadow-lg hover:shadow-xl backdrop-blur-md border border-stone-800 dark:border-stone-200 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer print:hidden group"
    >
      <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
      <span className="hidden sm:inline-block text-xs font-mono font-medium tracking-wider uppercase">
        Back Top
      </span>
    </button>
  );
};
