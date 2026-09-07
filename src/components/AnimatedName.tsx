import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Sparkles, Code2 } from 'lucide-react';

interface AnimatedNameProps {
  name: string;
  variant?: 'hero' | 'nav' | 'badge';
  className?: string;
}

export const AnimatedName: React.FC<AnimatedNameProps> = ({
  name,
  variant = 'hero',
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [syntaxMode, setSyntaxMode] = useState<'standard' | 'python'>('standard');
  const [keyTrigger, setKeyTrigger] = useState(0);

  // Derive target string based on mode
  const targetText =
    syntaxMode === 'python'
      ? name.toLowerCase().replace(/\s+/g, '_') + '()'
      : name;

  // Typewriter effect on load or when syntax mode / keyTrigger changes
  useEffect(() => {
    let index = 0;
    setDisplayText('');
    setIsTypingComplete(false);

    const interval = setInterval(() => {
      index++;
      setDisplayText(targetText.slice(0, index));
      if (index >= targetText.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [targetText, keyTrigger]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setKeyTrigger((prev) => prev + 1);
  };

  const toggleSyntaxMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSyntaxMode((prev) => (prev === 'standard' ? 'python' : 'standard'));
  };

  // ----------------------------------------------------
  // HERO VARIANT
  // ----------------------------------------------------
  if (variant === 'hero') {
    return (
      <span className={`inline-flex flex-wrap items-center gap-2 align-baseline ${className}`}>
        <motion.span
          id="hero-animated-name-container"
          onClick={handleReplay}
          title="Click to replay animation"
          className="relative inline-flex items-center font-mono cursor-pointer select-none group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated Background Highlight on Hover */}
          <span className="absolute -inset-x-2 -inset-y-1 bg-stone-200/50 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Letter by letter render with subtle hover waves */}
          <span className="inline-flex tracking-tight">
            {displayText.split('').map((char, index) => {
              const isOpe =
                syntaxMode === 'standard' &&
                (char === 'O' || char === 'p' || char === 'e') &&
                index >= displayText.toLowerCase().indexOf('ope');

              return (
                <motion.span
                  key={`${keyTrigger}-${index}-${char}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, scale: 1.15 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 15,
                  }}
                  className={`inline-block font-bold ${
                    isOpe
                      ? 'text-emerald-700 font-extrabold underline decoration-emerald-400/60 decoration-2 underline-offset-4'
                      : 'text-stone-900'
                  } ${char === ' ' ? 'mr-1.5' : ''}`}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              );
            })}
          </span>

          {/* Blinking Terminal Cursor */}
          <motion.span
            id="hero-name-cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block w-2.5 h-6 sm:h-8 bg-emerald-600 ml-1 rounded-xs align-middle"
          />
        </motion.span>

        {/* Python Mode Switcher Chip */}
        <button
          onClick={toggleSyntaxMode}
          id="btn-toggle-name-mode"
          title="Toggle Python function syntax"
          className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border border-stone-200 transition-all shadow-2xs hover:scale-105 active:scale-95 ml-1"
        >
          <Code2 className="w-3 h-3 text-emerald-600" />
          <span>{syntaxMode === 'standard' ? 'def .py' : 'text'}</span>
        </button>
      </span>
    );
  }

  // ----------------------------------------------------
  // NAV VARIANT
  // ----------------------------------------------------
  if (variant === 'nav') {
    return (
      <span className={`inline-flex items-center gap-1 font-mono tracking-tight ${className}`}>
        <span className="font-semibold text-stone-900 group-hover:text-emerald-800 transition-colors">
          {name}
        </span>
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="w-1.5 h-3 bg-emerald-600 inline-block rounded-xs ml-0.5"
        />
      </span>
    );
  }

  // ----------------------------------------------------
  // BADGE VARIANT
  // ----------------------------------------------------
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-xs ${className}`}>
      <span className="text-emerald-700 font-bold">{name}</span>
    </span>
  );
};
