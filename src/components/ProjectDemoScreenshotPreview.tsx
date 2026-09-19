import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  Play,
  Sparkles,
  Maximize2,
  TrendingUp,
  Activity,
  Layers,
  BarChart3,
  Sliders,
  CheckCircle2,
  Database,
  Terminal,
} from 'lucide-react';
import { Project } from '../types';
import { LiveWebEmbedPreview } from './LiveWebEmbedPreview';
import { AutomatedSpreadsheetPreview } from './AutomatedSpreadsheetPreview';

import bankChurnImg from '../assets/images/bank_churn_app_1789401191137.jpg';
import hrAnalyticsImg from '../assets/images/hr_analytics_app_1789401204328.jpg';
import leadFinderImg from '../assets/images/lead_finder_app_1789401276532.jpg';

interface ProjectDemoScreenshotPreviewProps {
  project: Project;
  onOpenLiveDemo?: () => void;
  onOpenCaseStudy?: () => void;
}

export const ProjectDemoScreenshotPreview: React.FC<ProjectDemoScreenshotPreviewProps> = ({
  project,
  onOpenLiveDemo,
  onOpenCaseStudy,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // If this project is an actual live web app, render the real embedded interactive application
  if (project.id === 'begi-begi') {
    return (
      <LiveWebEmbedPreview
        url="https://begi-begi.vercel.app"
        title="Begi-Begi: Social Micro-Funding Platform"
        domain="begi-begi.vercel.app"
        projectId={project.id}
        onExpand={onOpenLiveDemo}
        heightClass="h-72 sm:h-84 md:h-[390px]"
      />
    );
  }

  if (project.id === 'career-boost') {
    return (
      <LiveWebEmbedPreview
        url="https://career-boostng.vercel.app"
        title="Career Boost (Nigeria)"
        domain="career-boostng.vercel.app"
        projectId={project.id}
        onExpand={onOpenLiveDemo}
        heightClass="h-72 sm:h-84 md:h-[390px]"
      />
    );
  }

  if (project.id === 'nigerian-career-boost-hub') {
    return (
      <LiveWebEmbedPreview
        url="https://nigerian-career-boost-hub.vercel.app"
        title="Nigerian Career Boost Hub (ELEVATR)"
        domain="nigerian-career-boost-hub.vercel.app"
        projectId={project.id}
        onExpand={onOpenLiveDemo}
        heightClass="h-72 sm:h-84 md:h-[390px]"
      />
    );
  }

  if (project.id === 'python-automated-ledger') {
    return <AutomatedSpreadsheetPreview />;
  }

  // Render high-fidelity demo interface screenshot based on project ID
  const renderScreenshotContent = () => {
    switch (project.id) {
      case 'bank-churn':
        return (
          <div className="relative w-full h-full bg-stone-950 overflow-hidden">
            <img
              src={bankChurnImg}
              alt="Bank Customer Churn Predictor Streamlit Web App"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] flex items-center gap-2 border border-white/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>bank-customer-churn-project.streamlit.app</span>
            </div>
          </div>
        );

      case 'hr-analytics':
      case 'hr-attrition':
        return (
          <div className="relative w-full h-full bg-stone-950 overflow-hidden">
            <img
              src={hrAnalyticsImg}
              alt="HR Workforce Analytics Streamlit Dashboard"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] flex items-center gap-2 border border-white/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>hr-analytics-2026.streamlit.app</span>
            </div>
          </div>
        );

      case 'lead-finder':
        return (
          <div className="relative w-full h-full bg-stone-950 overflow-hidden">
            <img
              src={leadFinderImg}
              alt="CQC Healthcare Provider Extraction Tool"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] flex items-center gap-2 border border-white/10 shadow-sm">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>api.cqc.org.uk / Python ETL</span>
            </div>
          </div>
        );

      case 'safesite':
      case 'income-prediction':
      default:
        return (
          <div className="w-full h-full bg-[#0b101b] text-slate-100 flex flex-col font-mono text-[11px] select-none">
            <div className="bg-[#141b2d] px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-white font-bold text-xs">Census Income Classification Pipeline</span>
              </div>
              <span className="bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800 text-[10px]">
                Random Forest &amp; Logistic Regression
              </span>
            </div>

            <div className="p-3 sm:p-4 grid grid-cols-12 gap-3 flex-1 overflow-hidden">
              <div className="col-span-12 sm:col-span-6 bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="text-[10px] uppercase text-slate-400 font-semibold">Preprocessed Features</div>
                <div className="space-y-1.5 text-[10px]">
                  <div className="flex justify-between bg-slate-950 px-2.5 py-1.5 rounded">
                    <span className="text-slate-400">Education</span>
                    <span className="text-indigo-300 font-semibold">Bachelors (Encoded)</span>
                  </div>
                  <div className="flex justify-between bg-slate-950 px-2.5 py-1.5 rounded">
                    <span className="text-slate-400">Work Hours</span>
                    <span className="text-slate-200">42 hrs / week (StandardScaler)</span>
                  </div>
                  <div className="flex justify-between bg-slate-950 px-2.5 py-1.5 rounded">
                    <span className="text-slate-400">Capital Gains</span>
                    <span className="text-slate-200">Log-transformed</span>
                  </div>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6 bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-semibold mb-2">
                    Classification Result
                  </div>
                  <div className="bg-slate-950 border border-indigo-900/60 rounded p-3 text-center">
                    <span className="text-emerald-400 font-bold text-base block">&gt; $50,000 / yr</span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Confidence score: 84% probability
                    </span>
                  </div>
                </div>
                <div className="text-[10px] text-stone-400 flex items-center justify-between pt-1 border-t border-slate-800">
                  <span>Scikit-learn Pipeline</span>
                  <span className="text-emerald-400">AUC-ROC: 0.91</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-stone-900 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mock Browser/App Chrome Toolbar */}
      <div className="bg-stone-950/90 text-stone-400 px-3.5 py-2 border-b border-stone-800 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-stone-500 text-[11px] ml-1">
            {project.streamlitDeployment
              ? 'streamlit.app ∙ live demo'
              : 'app_preview.py ∙ local inference'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-stone-900 text-stone-300 px-2 py-0.5 rounded border border-stone-800">
            {project.badge || 'Machine Learning'}
          </span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Demo</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Screenshot / Demo Frame with Hover Animation */}
      <div className="relative aspect-[16/9] sm:aspect-[16/8.5] w-full overflow-hidden bg-stone-950">
        {/* Animated Scale and Glow on Container */}
        <motion.div
          animate={{
            scale: isHovered ? 1.025 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          {renderScreenshotContent()}
        </motion.div>

        {/* Hover Overlay with Live Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-stone-950/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 gap-3 text-center pointer-events-none group-hover:pointer-events-auto"
        >
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="space-y-1 max-w-md"
          >
            <h4 className="text-white font-bold text-base sm:text-lg tracking-tight">
              {project.title}
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed font-sans line-clamp-2">
              {project.tagline}
            </p>
          </motion.div>

          {/* Action buttons inside hover state */}
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 12, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-2.5 pt-1"
          >
            {project.streamlitDeployment && onOpenLiveDemo && (
              <button
                type="button"
                onClick={onOpenLiveDemo}
                id={`btn-hover-live-${project.id}`}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer font-mono"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Launch Live Demo</span>
              </button>
            )}

            {onOpenCaseStudy && (
              <button
                type="button"
                onClick={onOpenCaseStudy}
                id={`btn-hover-study-${project.id}`}
                className="inline-flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-medium px-3.5 py-2 rounded-lg border border-stone-600 transition-colors cursor-pointer font-mono"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Case Study</span>
              </button>
            )}

            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              id={`btn-hover-github-${project.id}`}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3.5 py-2 rounded-lg border border-white/20 backdrop-blur-xs transition-colors cursor-pointer font-mono"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Subtle Bottom Badge When Not Hovered */}
        <div className="absolute bottom-2.5 right-2.5 pointer-events-none group-hover:opacity-0 transition-opacity">
          <span className="inline-flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md text-stone-200 border border-white/10 px-2 py-1 rounded text-[10px] font-mono shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span>Interactive Preview</span>
          </span>
        </div>
      </div>
    </div>
  );
};
