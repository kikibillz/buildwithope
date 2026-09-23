import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-stone-200/20 dark:bg-white/5 print:hidden"
    >
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-indigo-500 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
