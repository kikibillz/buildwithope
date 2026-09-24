import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';

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
      <span className={`inline-flex flex-wrap items-center gap-2 sm:gap-3 align-baseline ${className}`}>
        <motion.span
          id="hero-animated-name-container"
          onClick={handleReplay}
          title="Click to replay typewriter animation"
          className="relative inline-flex items-center cursor-pointer select-none group"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {/* Subtle Hover Highlight */}
          <span className="absolute -inset-x-2 -inset-y-1 bg-primary/10 rounded-xs -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Letter by letter render */}
          <span className="inline-flex tracking-tight font-display font-black break-words">
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
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 18,
                  }}
                  className={`inline-block font-display font-black ${
                    isOpe
                      ? 'text-primary underline decoration-primary/40 decoration-4 underline-offset-4'
                      : 'text-foreground'
                  } ${char === ' ' ? 'mr-1 sm:mr-2' : ''}`}
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
            className="inline-block w-2 sm:w-2.5 md:w-3 h-7 sm:h-10 md:h-12 bg-primary ml-1 rounded-xs align-middle shadow-brutal-sm"
          />
        </motion.span>

        {/* Python Mode Switcher Button */}
        <button
          type="button"
          onClick={toggleSyntaxMode}
          id="btn-toggle-name-mode"
          title="Toggle Python function syntax"
          className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold px-2.5 sm:px-3 py-1 rounded-xs bg-muted text-foreground border-2 border-foreground shadow-brutal-sm hover:shadow-brutal hover:bg-foreground hover:text-background transition-all cursor-pointer active:translate-y-0.5"
        >
          <Code2 className="w-3.5 h-3.5 text-primary" />
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
        <span className="font-bold text-foreground group-hover:text-primary transition-colors">
          {name}
        </span>
        <motion.span
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="w-1.5 h-3.5 bg-primary inline-block rounded-xs ml-0.5"
        />
      </span>
    );
  }

  // ----------------------------------------------------
  // BADGE VARIANT
  // ----------------------------------------------------
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-xs ${className}`}>
      <span className="text-primary font-bold">{name}</span>
    </span>
  );
};
