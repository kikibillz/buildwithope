import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Database, Code, CheckCircle, BookOpen, Layers, Terminal } from 'lucide-react';
import { Project } from '../types';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl bg-[#fafaf9] rounded-xl border border-stone-300 shadow-2xl overflow-hidden my-6 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header Bar */}
        <div className="bg-[#18181b] text-stone-100 p-5 sm:p-6 flex items-start justify-between border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded">
                Case Study
              </span>
              {project.badge && (
                <span className="text-xs font-mono text-amber-300 bg-amber-950/70 border border-amber-800/60 px-2 py-0.5 rounded">
                  {project.badge}
                </span>
              )}
            </div>
            <h2 id="case-study-title" className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 font-sans max-w-xl">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close case study modal"
            className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Editorial Structured 01 - 07 Layout */}
        <div className="p-5 sm:p-7 space-y-7 max-h-[75vh] overflow-y-auto font-sans text-stone-800">
          {/* 01 — Problem */}
          <section id="case-study-problem" className="border-b border-stone-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 uppercase tracking-wider mb-2">
              <span className="text-stone-900 font-bold">01</span>
              <span>—</span>
              <span>Problem</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-700">
              {caseStudy.problem}
            </p>
          </section>

          {/* 02 — Dataset */}
          <section id="case-study-dataset" className="border-b border-stone-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 uppercase tracking-wider mb-2">
              <span className="text-stone-900 font-bold">02</span>
              <span>—</span>
              <span>Dataset</span>
            </div>
            <div className="bg-stone-100 border border-stone-200 rounded-md p-3.5 flex items-start gap-3">
              <Database className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                {caseStudy.dataset}
              </p>
            </div>
          </section>

          {/* 03 — Process */}
          <section id="case-study-process" className="border-b border-stone-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 uppercase tracking-wider mb-3">
              <span className="text-stone-900 font-bold">03</span>
              <span>—</span>
              <span>Process & Implementation</span>
            </div>

            <div className="space-y-3">
              <div className="bg-white border border-stone-200 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 block mb-0.5">
                  1. Data Collection & Inspection
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {caseStudy.process.collection}
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 block mb-0.5">
                  2. Cleaning & Missing-Value Handling
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {caseStudy.process.cleaning}
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 block mb-0.5">
                  3. Exploratory Data Analysis (EDA)
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {caseStudy.process.exploration}
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 block mb-0.5">
                  4. Feature Engineering & Transformations
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {caseStudy.process.featureEngineering}
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 block mb-0.5">
                  5. Modeling & Hyperparameter Tuning
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {caseStudy.process.modeling}
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 block mb-0.5">
                  6. Evaluation & Diagnostics
                </span>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {caseStudy.process.evaluation}
                </p>
              </div>
            </div>
          </section>

          {/* 04 — Results */}
          <section id="case-study-results" className="border-b border-stone-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 uppercase tracking-wider mb-2">
              <span className="text-stone-900 font-bold">04</span>
              <span>—</span>
              <span>Results & Delivery</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-700 bg-stone-100 border border-stone-200 rounded-md p-3.5">
              {caseStudy.results}
            </p>
          </section>

          {/* 05 — Lessons */}
          <section id="case-study-lessons" className="border-b border-stone-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 uppercase tracking-wider mb-2">
              <span className="text-stone-900 font-bold">05</span>
              <span>—</span>
              <span>Lessons & Technical Takeaways</span>
            </div>
            <ul className="space-y-2">
              {caseStudy.lessons.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 06 — Tools */}
          <section id="case-study-tools" className="border-b border-stone-200 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 uppercase tracking-wider mb-2">
              <span className="text-stone-900 font-bold">06</span>
              <span>—</span>
              <span>Tools & Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.tools.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs bg-stone-200/80 text-stone-800 px-2.5 py-1 rounded border border-stone-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* 07 — Links */}
          <section id="case-study-links">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 uppercase tracking-wider mb-3">
              <span className="text-stone-900 font-bold">07</span>
              <span>—</span>
              <span>Links & Artifacts</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={caseStudy.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-stone-800 bg-white border border-stone-300 hover:border-stone-400 hover:bg-stone-50 px-3.5 py-2 rounded-md transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository ({caseStudy.links.github})</span>
              </a>

              <a
                href={caseStudy.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 px-3.5 py-2 rounded-md transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo ({caseStudy.links.demo})</span>
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-stone-100 px-5 py-3 border-t border-stone-200 flex justify-between items-center text-xs text-stone-500">
          <span className="font-mono">Press ESC to close</span>
          <button
            onClick={onClose}
            className="text-stone-700 hover:text-stone-950 font-medium px-3 py-1 rounded border border-stone-300 bg-white hover:bg-stone-50 transition-colors"
          >
            Close
          </button>
        </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
