import React, { useEffect, useState, useRef } from 'react';

export const MagicCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Smooth mouse coordinates with trailing physics
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices, disabled for touch and reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || !canHover || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if target has cursor attributes or is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor], [data-cursor-text], .cursor-pointer'
        );

        if (interactiveEl) {
          setIsHovered(true);
          const customText = interactiveEl.getAttribute('data-cursor-text') || '';
          setCursorText(customText);
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Render loop with smooth lerp interpolation for the trailing ring
    const render = () => {
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isEnabled) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[999] transition-opacity duration-300 print:hidden ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Inner precise dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-white pointer-events-none transition-transform duration-75 ease-out ${
          isHovered ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      />

      {/* Outer trailing magnetic ring / text badge */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center font-mono pointer-events-none transition-all duration-200 ease-out ${
          cursorText
            ? 'w-16 h-16 bg-stone-900/90 dark:bg-white/95 text-white dark:text-stone-950 text-[10px] font-bold tracking-widest uppercase shadow-xl backdrop-blur-xs scale-100'
            : isHovered
            ? 'w-10 h-10 border border-stone-900/40 dark:border-white/50 bg-stone-900/10 dark:bg-white/10 backdrop-blur-xs scale-100'
            : isClicking
            ? 'w-6 h-6 border border-stone-800 dark:border-stone-200 bg-stone-900/20 dark:bg-white/20 scale-90'
            : 'w-8 h-8 border border-stone-400/50 dark:border-stone-500/50 scale-100'
        }`}
      >
        {cursorText && <span className="select-none animate-in fade-in zoom-in-90 duration-150">{cursorText}</span>}
      </div>
    </div>
  );
};
