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
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-amber-200/20 dark:bg-amber-500/10 print:hidden"
    >
      <div
        className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(245,158,11,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
