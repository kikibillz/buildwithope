import React from 'react';
import { motion } from 'motion/react';

const skillsList = [
  'Python 3.12 & OOP',
  'Machine Learning & Predictive Modeling',
  'FastAPI Microservices',
  'Generative AI Video (Veo 3 · Runway Gen-3 · Kling)',
  'PyTorch & Scikit-Learn',
  'Interactive Streamlit Web Apps',
  'XGBoost & SMOTE Imbalanced Learning',
  'Docker Containerization & CI/CD',
  'Automated ETL Pipelines & Pandas',
  'Computer Vision & Image Processing',
  'PostgreSQL & Relational Data',
  'ROI & Quantitative Business Impact',
];

export const SkillsMarquee: React.FC = () => {
  return (
    <div className="py-6 sm:py-8 border-y border-stone-200/80 dark:border-white/10 bg-white/50 dark:bg-[#0c0c0e]/80 backdrop-blur-sm overflow-hidden select-none print:hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-3 flex items-center justify-between">
        <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400">
          Core Capabilities &amp; Engineering Stack
        </span>
        <span className="text-[11px] font-mono text-stone-400 dark:text-stone-600 hidden sm:inline-block">
          Continuous Integration • Production Ready
        </span>
      </div>

      {/* Infinite Marquee Track */}
      <div className="relative w-full flex overflow-x-hidden group">
        <div className="flex shrink-0 items-center gap-6 sm:gap-10 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] py-1">
          {skillsList.concat(skillsList).map((skill, index) => (
            <div
              key={`marquee-1-${index}`}
              className="inline-flex items-center gap-4 text-xs sm:text-sm font-display font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
            >
              <span>{skill}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 inline-block" />
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="flex shrink-0 items-center gap-6 sm:gap-10 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] py-1"
        >
          {skillsList.concat(skillsList).map((skill, index) => (
            <div
              key={`marquee-2-${index}`}
              className="inline-flex items-center gap-4 text-xs sm:text-sm font-display font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
            >
              <span>{skill}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 inline-block" />
            </div>
          ))}
        </div>

        {/* Gradient edge masks */}
        <div className="absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-[#fafaf9] dark:from-[#0c0a09] to-transparent pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-[#fafaf9] dark:from-[#0c0a09] to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
