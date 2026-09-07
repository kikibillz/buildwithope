import React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, ArrowRight, Play } from 'lucide-react';
import { Project } from '../types';
import { SafeSitePreview } from './SafeSitePreview';
import { HrAnalyticsPreview } from './HrAnalyticsPreview';
import { IncomePredictionPreview } from './IncomePredictionPreview';
import { BankCustomerChurnPreview } from './BankCustomerChurnPreview';
import { LeadFinderPreview } from './LeadFinderPreview';
import { HrAttritionPredictorPreview } from './HrAttritionPredictorPreview';

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
  const renderPreview = () => {
    switch (project.id) {
      case 'bank-churn':
        return <BankCustomerChurnPreview />;
      case 'hr-analytics':
        return <HrAnalyticsPreview />;
      case 'hr-attrition':
        return <HrAttritionPredictorPreview />;
      case 'safesite':
        return <SafeSitePreview />;
      case 'lead-finder':
        return <LeadFinderPreview />;
      case 'income-prediction':
        return <IncomePredictionPreview />;
      default:
        return null;
    }
  };

  return (
    <motion.article
      id={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-stone-400 hover:shadow-md transition-all duration-300"
    >
      <div className="p-5 sm:p-7">
        {/* Top meta & badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono font-medium text-stone-600 uppercase tracking-wide">
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.badge && (
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded border ${
                  project.badge === 'Sample Dataset'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : project.badge === 'XGBoost & SMOTE'
                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                    : project.badge === 'RandomForest ML'
                    ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                    : project.badge === 'API ETL Pipeline'
                    ? 'bg-sky-50 text-sky-800 border-sky-200'
                    : 'bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                {project.badge}
              </span>
            )}
          </div>
        </div>

        {/* Streamlit Cloud Deployment Ribbon */}
        {project.streamlitDeployment && (
          <div className="mb-3.5 px-3 py-2 bg-stone-950 text-stone-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs font-mono border border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block animate-pulse" />
              <span className="text-stone-400">Streamlit:</span>
              <span className="text-white font-semibold">{project.streamlitDeployment}</span>
            </div>
            {onOpenStreamlit && (
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
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-stone-600 leading-relaxed mb-6 font-sans max-w-3xl">
          {project.description}
        </p>

        {/* Problem & Approach Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-stone-50 border border-stone-200/80 rounded-lg p-4 text-xs sm:text-sm">
          <div>
            <div className="text-stone-600 font-mono text-xs uppercase mb-1 font-medium">Problem</div>
            <p className="text-stone-700 leading-relaxed">{project.problemSummary}</p>
          </div>
          <div>
            <div className="text-stone-600 font-mono text-xs uppercase mb-1 font-medium">Approach</div>
            <p className="text-stone-700 leading-relaxed">{project.approachSummary}</p>
          </div>
        </div>

        {/* Interactive Visual Preview */}
        <div className="mb-6">
          <div className="text-xs font-mono text-stone-600 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Project Preview & Architecture</span>
            <span className="text-stone-500 text-[11px] font-sans">Interactive exploration</span>
          </div>
          {renderPreview()}
        </div>

        {/* Tools and Result */}
        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-stone-600 uppercase mb-1.5 font-medium">Tools & Technologies</div>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-xs bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs font-mono text-stone-600 uppercase mb-1 font-medium">Evaluation & Result</div>
            <p className="text-xs text-stone-700 font-sans italic">
              {project.resultsSummary}
            </p>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onOpenCaseStudy(project)}
            id={`btn-case-study-${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-md transition-colors"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {project.streamlitDeployment && onOpenStreamlit && (
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
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-stone-950 bg-white border border-stone-300 hover:border-stone-400 px-3 py-1.5 rounded-md transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>

            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              id={`btn-demo-${project.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 px-3 py-1.5 rounded-md transition-colors"
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
