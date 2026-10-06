import React from 'react';

const skillsTicker = [
  'RAG (Retrieval-Augmented Generation)',
  'Prompt Engineering (CoT & Few-Shot)',
  'Vector Embeddings & ChromaDB',
  'Hallucination Guardrails',
  'Python',
  'SQL (PostgreSQL)',
  'NoSQL (MongoDB)',
  'Machine Learning',
  'FastAPI Microservices',
  'AWS & GCP Cloud',
  'Power BI & Tableau',
  'MLOps & MLflow',
  'Docker & CI/CD',
  'People Analytics',
  'Azure Fundamentals',
  'Veo 3 & Runway Gen-3',
  'Scikit-learn & XGBoost',
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
