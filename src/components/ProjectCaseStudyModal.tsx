import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, Database, Code, CheckCircle, BookOpen, Layers, Terminal, Sparkles, TrendingUp, Gauge, BarChart3, FileSpreadsheet, Play } from 'lucide-react';
import { Project } from '../types';
import { ProjectDemoScreenshotPreview } from './ProjectDemoScreenshotPreview';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenStreamlit?: (project: Project) => void;
  onOpenBiDashboard?: (project: Project) => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
  onOpenStreamlit,
  onOpenBiDashboard,
}) => {
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
        className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl bg-[#fafaf9] dark:bg-[#141210] rounded-xl border border-stone-300 dark:border-stone-800 shadow-2xl overflow-hidden my-6 transition-all"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header Bar */}
        <div className="bg-[#18181b] dark:bg-[#0c0a09] text-stone-100 p-5 sm:p-6 flex items-start justify-between border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded">
                Case Study Deep-Dive
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

        {/* Key Performance Indicators Row (Prominent Quick Scanning Banner) */}
        {project.keyMetrics && project.keyMetrics.length > 0 && (
          <div className="bg-[#18181b] dark:bg-[#0c0a09] border-b border-stone-800 px-5 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <Gauge className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Key Performance Indicators</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider hidden xs:inline">
                Data-Driven Benchmarks
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.keyMetrics.map((kpi, idx) => (
                <div
                  key={idx}
                  className="bg-stone-900/90 border border-stone-800 hover:border-emerald-500/50 rounded-md p-2.5 sm:p-3 flex flex-col justify-between transition-colors shadow-2xs"
                >
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-tight font-semibold truncate">
                    {kpi.label}
                  </span>
                  <div className="text-xs sm:text-sm font-mono font-bold text-emerald-400 mt-1 truncate">
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body: Editorial Structured 01 - 08 Layout */}
        <div className="p-5 sm:p-7 space-y-7 max-h-[75vh] overflow-y-auto font-sans text-stone-800 dark:text-stone-200">
          {/* 01 : Problem */}
          <section id="case-study-problem" className="border-b border-stone-200 dark:border-stone-800 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              <span className="text-stone-900 dark:text-stone-100 font-bold">01</span>
              <span>:</span>
              <span>Problem & Business Context</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              {caseStudy.problem}
            </p>
          </section>

          {/* 02 : Business Impact & Quantitative Return */}
          {project.businessImpact && (
            <section id="case-study-impact" className="border-b border-stone-200 dark:border-stone-800 pb-5">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
                <span className="text-emerald-800 dark:text-emerald-300 font-bold">02</span>
                <span>:</span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Business Impact &amp; Quantitative Value
                </span>
              </div>
              <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50 rounded-lg p-4">
                <p className="text-sm leading-relaxed text-stone-800 dark:text-stone-200 mb-3 font-sans">
                  {project.businessImpact}
                </p>
                {project.keyMetrics && project.keyMetrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-emerald-200/60 dark:border-emerald-800/40">
                    {project.keyMetrics.map((metric, idx) => (
                      <div key={idx} className="bg-white/80 dark:bg-stone-900/80 p-2 rounded border border-emerald-200/50 dark:border-emerald-900/40">
                        <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-tight">
                          {metric.label}
                        </div>
                        <div className="text-xs sm:text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 truncate">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 03 : Dataset */}
          <section id="case-study-dataset" className="border-b border-stone-200 dark:border-stone-800 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              <span className="text-stone-900 dark:text-stone-100 font-bold">03</span>
              <span>:</span>
              <span>Dataset & Ingestion Schema</span>
            </div>
            <div className="bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-md p-3.5 flex items-start gap-3">
              <Database className="w-4 h-4 text-stone-600 dark:text-stone-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {caseStudy.dataset}
              </p>
            </div>
          </section>

          {/* 04 : Process */}
          <section id="case-study-process" className="border-b border-stone-200 dark:border-stone-800 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
              <span className="text-stone-900 dark:text-stone-100 font-bold">04</span>
              <span>:</span>
              <span>Process & Implementation Details</span>
            </div>

            <div className="space-y-3">
              <div className="bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 block mb-0.5">
                  1. Data Collection & Inspection
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {caseStudy.process.collection}
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 block mb-0.5">
                  2. Cleaning & Missing-Value Handling
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {caseStudy.process.cleaning}
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 block mb-0.5">
                  3. Exploratory Data Analysis (EDA)
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {caseStudy.process.exploration}
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 block mb-0.5">
                  4. Feature Engineering & Transformations
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {caseStudy.process.featureEngineering}
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 block mb-0.5">
                  5. Modeling & Hyperparameter Tuning
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {caseStudy.process.modeling}
                </p>
              </div>

              <div className="bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded-md p-3">
                <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 block mb-0.5">
                  6. Evaluation & Diagnostics
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {caseStudy.process.evaluation}
                </p>
              </div>
            </div>
          </section>

          {/* 05 : Results & Live Demo Screenshot */}
          <section id="case-study-results" className="border-b border-stone-200 dark:border-stone-800 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              <span className="text-stone-900 dark:text-stone-100 font-bold">05</span>
              <span>:</span>
              <span>Results, Delivery &amp; Live Demo Interface</span>
            </div>
            <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-md p-3.5 mb-3.5">
              {caseStudy.results}
            </p>

            {/* Visual Screenshot of Live Demo */}
            <div>
              <div className="text-xs font-mono text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold text-stone-800 dark:text-stone-200">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  <span>Interactive Application Interface (Demo Screenshot)</span>
                </span>
                <span className="text-stone-400 text-[11px]">Hover for interactive preview</span>
              </div>
              <ProjectDemoScreenshotPreview project={project} />
            </div>
          </section>

          {/* 06 : Lessons */}
          <section id="case-study-lessons" className="border-b border-stone-200 dark:border-stone-800 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              <span className="text-stone-900 dark:text-stone-100 font-bold">06</span>
              <span>:</span>
              <span>Production Lessons & Architectural Takeaways</span>
            </div>
            <ul className="space-y-2">
              {caseStudy.lessons.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 07 : Tools */}
          <section id="case-study-tools" className="border-b border-stone-200 dark:border-stone-800 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
              <span className="text-stone-900 dark:text-stone-100 font-bold">07</span>
              <span>:</span>
              <span>Tools & Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.tools.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-2.5 py-1 rounded border border-stone-300 dark:border-stone-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* 08 : Links */}
          <section id="case-study-links">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
              <span className="text-stone-900 dark:text-stone-100 font-bold">08</span>
              <span>:</span>
              <span>Verified Repositories & Artifacts</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {onOpenBiDashboard && (project.id.includes('hr') || project.id.includes('ledger') || project.id.includes('churn') || project.tools.includes('Power BI') || project.tools.includes('Microsoft Excel')) && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBiDashboard(project);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 border border-amber-500 px-3.5 py-2 rounded-md transition-colors shadow-xs cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Launch Interactive Power BI &amp; Excel Dashboard</span>
                </button>
              )}

              {onOpenStreamlit && project.streamlitDeployment && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenStreamlit(project);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 border border-teal-700 px-3.5 py-2 rounded-md transition-colors shadow-xs cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Interactive Streamlit App</span>
                </button>
              )}

              <a
                href={caseStudy.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:border-stone-400 hover:bg-stone-50 dark:hover:bg-stone-700 px-3.5 py-2 rounded-md transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>

              <a
                href={caseStudy.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white px-3.5 py-2 rounded-md transition-colors font-medium shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live App Demo</span>
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-stone-100 dark:bg-stone-900 px-5 py-3 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center text-xs text-stone-500 dark:text-stone-400">
          <span className="font-mono">Press ESC to close</span>
          <button
            onClick={onClose}
            className="text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white font-medium px-3 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            Close
          </button>
        </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
