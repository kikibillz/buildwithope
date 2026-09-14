import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sliders,
  ExternalLink,
  Play,
  Monitor,
  CheckCircle2,
  Maximize2,
  Info,
  ImageIcon,
  Terminal,
} from 'lucide-react';
import { Project } from '../types';
import { ProjectDemoScreenshotPreview } from './ProjectDemoScreenshotPreview';
import { BankCustomerChurnPreview } from './BankCustomerChurnPreview';
import { HrAnalyticsPreview } from './HrAnalyticsPreview';
import { HrAttritionPredictorPreview } from './HrAttritionPredictorPreview';
import { SafeSitePreview } from './SafeSitePreview';
import { LeadFinderPreview } from './LeadFinderPreview';
import { IncomePredictionPreview } from './IncomePredictionPreview';
import { FastApiServicePreview } from './FastApiServicePreview';

interface ProjectDemoSectionProps {
  project: Project;
  onOpenStreamlit?: (project: Project) => void;
  onOpenCaseStudy?: (project: Project) => void;
}

export const ProjectDemoSection: React.FC<ProjectDemoSectionProps> = ({
  project,
  onOpenStreamlit,
  onOpenCaseStudy,
}) => {
  // Check if project is an actual live web app (deployed on Vercel)
  const isLiveWebApp =
    project.id === 'begi-begi' ||
    project.id === 'career-boost' ||
    project.id === 'nigerian-career-boost-hub';

  const isFastApiProject = project.id === 'fastapi-ml-service';

  // Default to the interactive console for FastAPI, screenshot preview for others
  const [activeTab, setActiveTab] = useState<'screenshot' | 'interactive'>(
    isFastApiProject ? 'interactive' : 'screenshot'
  );

  const renderInteractiveWidget = () => {
    switch (project.id) {
      case 'fastapi-ml-service':
        return <FastApiServicePreview />;
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
    <div className="space-y-2.5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-stone-600 dark:text-stone-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Application Interface</span>
          </span>
          <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500 hidden sm:inline">
            {isFastApiProject
              ? '∙ interactive openapi console & rest test bench'
              : isLiveWebApp
              ? '∙ live embedded web app'
              : '∙ live captures & interactive model'}
          </span>
        </div>

        {/* Header controls: for live web apps, show live badge & launch link; for ML apps, show tabs */}
        {isLiveWebApp ? (
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-md text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live on Vercel</span>
            </span>

            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white border border-stone-200 dark:border-stone-700 px-2.5 py-1 rounded-md text-[11px] transition-colors shadow-2xs"
              >
                <span>Open Site</span>
                <ExternalLink className="w-3 h-3 text-stone-500 dark:text-stone-400" />
              </a>
            )}
          </div>
        ) : (
          <div className="flex items-center bg-stone-100 dark:bg-stone-900 p-0.5 rounded-lg border border-stone-200 dark:border-stone-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('screenshot')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'screenshot'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold shadow-xs border border-stone-200/80 dark:border-stone-700'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-200'
              }`}
            >
              <ImageIcon className="w-3 h-3 text-red-500" />
              <span>Screenshot</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'interactive'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold shadow-xs border border-stone-200/80 dark:border-stone-700'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-200'
              }`}
            >
              {isFastApiProject ? (
                <Terminal className="w-3 h-3 text-teal-600 dark:text-teal-400" />
              ) : (
                <Sliders className="w-3 h-3 text-stone-500" />
              )}
              <span>{isFastApiProject ? 'OpenAPI Console' : 'Test Parameters'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main View Area */}
      {isLiveWebApp ? (
        <ProjectDemoScreenshotPreview
          project={project}
          onOpenLiveDemo={onOpenStreamlit ? () => onOpenStreamlit(project) : undefined}
          onOpenCaseStudy={onOpenCaseStudy ? () => onOpenCaseStudy(project) : undefined}
        />
      ) : (
        <AnimatePresence mode="wait">
          {activeTab === 'screenshot' ? (
            <motion.div
              key="screenshot-view"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectDemoScreenshotPreview
                project={project}
                onOpenLiveDemo={onOpenStreamlit ? () => onOpenStreamlit(project) : undefined}
                onOpenCaseStudy={onOpenCaseStudy ? () => onOpenCaseStudy(project) : undefined}
              />
            </motion.div>
          ) : (
            <motion.div
              key="interactive-view"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {renderInteractiveWidget()}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
