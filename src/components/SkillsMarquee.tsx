import React from 'react';

const skillsTicker = [
  'Python',
  'Machine Learning',
  'FastAPI',
  'Generative AI Video',
  'Data Storytelling',
  'Predictive Modeling',
  'Docker & CI/CD',
  'Veo 3 & Runway',
  'Scikit-learn',
  'PostgreSQL',
];

export const SkillsMarquee: React.FC = () => {
  return (
    <div className="marquee border-y border-foreground/15 bg-highlight py-3 text-highlight-foreground select-none print:hidden overflow-hidden" aria-hidden="true">
      <div className="marquee-track font-mono text-xs font-bold uppercase tracking-widest">
        {skillsTicker.concat(skillsTicker).map((skill, index) => (
          <React.Fragment key={`ticker-${index}`}>
            <span>{skill}</span>
            <span className="text-highlight-foreground/80">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
