import React from 'react';

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
    <div className="py-3 border-y-2 border-foreground bg-highlight text-highlight-foreground select-none print:hidden overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-2 flex items-center justify-between">
        <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-foreground">
          Core Capabilities &amp; Engineering Stack
        </span>
        <span className="text-[11px] font-mono font-bold text-foreground/80 hidden sm:inline-block">
          Continuous Integration • 28s Loop • Production Ready
        </span>
      </div>

      {/* Infinite Marquee Track utilizing user's marquee utility classes */}
      <div className="marquee w-full py-1">
        <div className="marquee-track">
          {skillsList.concat(skillsList).map((skill, index) => (
            <div
              key={`marquee-item-${index}`}
              className="inline-flex items-center gap-3 font-display font-black text-xs sm:text-sm uppercase tracking-wide text-foreground hover:text-primary transition-colors cursor-default"
            >
              <span>{skill}</span>
              <span className="w-2.5 h-2.5 bg-foreground inline-block rotate-45" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
