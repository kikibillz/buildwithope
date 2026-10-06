import React from 'react';
import { motion } from 'motion/react';

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
  // Normalize display name
  const displayName = name === 'Build with Ope' ? 'Opeyemi Olamiju' : name;

  // ----------------------------------------------------
  // HERO VARIANT
  // ----------------------------------------------------
  if (variant === 'hero') {
    return (
      <span className={`inline-flex items-center align-baseline ${className}`}>
        <span className="relative inline-flex items-center select-none group font-display font-black tracking-tight text-foreground">
          {/* Subtle Accent on Ope */}
          <span className="text-foreground">
            Ope
            <span className="text-primary underline decoration-primary/50 decoration-4 underline-offset-6">
              yemi
            </span>{' '}
            Olamiju
          </span>

          {/* Terminal Block Cursor */}
          <motion.span
            id="hero-name-cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block w-2 sm:w-2.5 md:w-3.5 h-8 sm:h-11 md:h-14 bg-primary ml-2 rounded-xs align-middle shadow-brutal-xs"
            aria-hidden="true"
          />
        </span>
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
          {displayName}
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
      <span className="text-primary font-bold">{displayName}</span>
    </span>
  );
};

