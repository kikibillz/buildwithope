import React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, ArrowRight, Play, TrendingUp } from 'lucide-react';
import { Project } from '../types';
import { ProjectDemoSection } from './ProjectDemoSection';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
  onOpenStreamlit?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenCaseStudy,
  onOpenStreamlit,
}) => {
  return (
    <motion.article
      id={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-stone-400 dark:hover:border-stone-700 hover:shadow-md transition-all duration-300"
    >
      <div className="p-5 sm:p-7">
        {/* Top meta & badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wide">
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.badge && (
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded border ${
                  project.badge === 'FastAPI REST API'
                    ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800 font-semibold'
                    : project.badge === 'Sample Dataset'
                    ? 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    : project.badge === 'XGBoost & SMOTE'
                    ? 'bg-purple-50 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                    : project.badge === 'RandomForest ML'
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                    : project.badge === 'API ETL Pipeline'
                    ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                {project.badge}
              </span>
            )}
          </div>
        </div>

        {/* Streamlit / ASGI Deployment Ribbon */}
        {project.streamlitDeployment && (
          <div className="mb-3.5 px-3 py-2 bg-stone-950 text-stone-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs font-mono border border-stone-800">
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full inline-block animate-pulse ${
                  project.id === 'fastapi-ml-service' ? 'bg-teal-400' : 'bg-red-500'
                }`}
              />
              <span className="text-stone-400">
                {project.id === 'fastapi-ml-service' ? 'Deployment:' : 'Streamlit:'}
              </span>
              <span className="text-white font-semibold">{project.streamlitDeployment}</span>
            </div>
            {onOpenStreamlit && project.id !== 'fastapi-ml-service' && (
              <button
                onClick={() => onOpenStreamlit(project)}
                id={`btn-ribbon-live-${project.id}`}
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Live Model View</span>
              </button>
            )}
          </div>
        )}

        {/* Title & Tagline */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4 font-sans max-w-3xl">
          {project.description}
        </p>

        {/* Quantified Business Impact & Metric Chips */}
        {project.businessImpact && (
          <div className="mb-5 p-3.5 sm:p-4 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1.5">
              <TrendingUp className="w-3.5 h-3.5 shrink-0" />
              <span>Quantified Business Impact &amp; ROI</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans mb-3">
              {project.businessImpact}
            </p>
            {project.keyMetrics && project.keyMetrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-emerald-200/60 dark:border-emerald-800/40">
                {project.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="bg-white/80 dark:bg-stone-900/80 p-2 rounded border border-emerald-200/50 dark:border-emerald-900/50">
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
        )}

        {/* Problem & Approach Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 rounded-lg p-4 text-xs sm:text-sm">
          <div>
            <div className="text-stone-600 dark:text-stone-400 font-mono text-xs uppercase mb-1 font-medium">Problem</div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{project.problemSummary}</p>
          </div>
          <div>
            <div className="text-stone-600 dark:text-stone-400 font-mono text-xs uppercase mb-1 font-medium">Approach</div>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{project.approachSummary}</p>
          </div>
        </div>

        {/* Live Demo Showcase with Screenshots & Interactive Tweaks (hidden on print) */}
        <div className="mb-6 print:hidden">
          <ProjectDemoSection
            project={project}
            onOpenStreamlit={onOpenStreamlit}
            onOpenCaseStudy={onOpenCaseStudy}
          />
        </div>

        {/* Print-only Business Impact & Repository details */}
        <div className="hidden print:block my-3 p-3 bg-stone-50 rounded border border-stone-300 text-xs font-mono">
          <div className="text-stone-800">
            <span className="font-bold text-stone-900">Business Impact:</span> {project.businessImpact}
          </div>
          <div className="mt-1.5 text-stone-600">
            <span className="font-bold text-stone-900">Repository URL:</span> {project.links.github}
          </div>
        </div>

        {/* Tools and Result */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-stone-600 dark:text-stone-400 uppercase mb-1.5 font-medium">Tools & Technologies</div>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-xs bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs font-mono text-stone-600 dark:text-stone-400 uppercase mb-1 font-medium">Evaluation & Result</div>
            <p className="text-xs text-stone-700 dark:text-stone-300 font-sans italic">
              {project.resultsSummary}
            </p>
          </div>
        </div>

        {/* CTA Actions (hidden on print) */}
        <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button
            onClick={() => onOpenCaseStudy(project)}
            id={`btn-case-study-${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 px-3.5 py-2 rounded-md transition-colors"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {project.streamlitDeployment && onOpenStreamlit && project.id !== 'fastapi-ml-service' && (
              <button
                onClick={() => onOpenStreamlit(project)}
                id={`btn-live-app-${project.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded-md transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Live Streamlit</span>
              </button>
            )}

            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              id={`btn-github-${project.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 px-3 py-1.5 rounded-md transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>

            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              id={`btn-demo-${project.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white px-3 py-1.5 rounded-md transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Explore Code</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
