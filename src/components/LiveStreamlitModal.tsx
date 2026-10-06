import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  RefreshCw,
  Sliders,
  Monitor,
  Smartphone,
  Tablet,
  CheckCircle2,
  AlertCircle,
  Radio,
  Edit2,
  Check,
  Sparkles,
} from 'lucide-react';
import { Project } from '../types';
import { BankCustomerChurnPreview } from './BankCustomerChurnPreview';
import { HrAnalyticsPreview } from './HrAnalyticsPreview';
import { HrAttritionPredictorPreview } from './HrAttritionPredictorPreview';
import { ProjectDemoScreenshotPreview } from './ProjectDemoScreenshotPreview';
import { NexusCopilotPreview } from './NexusCopilotPreview';

interface LiveStreamlitModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStreamlitUrl?: (projectId: string, newUrl: string) => void;
}

export const LiveStreamlitModal: React.FC<LiveStreamlitModalProps> = ({
  project,
  isOpen,
  onClose,
  onUpdateStreamlitUrl,
}) => {
  const isVercelApp = Boolean(
    project &&
      (project.id === 'begi-begi' ||
        project.id === 'career-boost' ||
        project.id === 'nigerian-career-boost-hub' ||
        project.streamlitDeployment?.includes('vercel.app'))
  );

  const [viewMode, setViewMode] = useState<'screenshot' | 'simulator' | 'embed'>(
    isVercelApp ? 'embed' : 'screenshot'
  );
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState(project?.streamlitUrl || '');

  // Reset view mode when project changes
  React.useEffect(() => {
    if (project) {
      const isVercel =
        project.id === 'begi-begi' ||
        project.id === 'career-boost' ||
        project.id === 'nigerian-career-boost-hub' ||
        project.streamlitDeployment?.includes('vercel.app');
      setViewMode(isVercel ? 'embed' : 'screenshot');
      setCustomUrl(project.streamlitUrl || '');
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const currentUrl = customUrl || project.streamlitUrl || 'https://share.streamlit.io';

  const handleSaveUrl = () => {
    setIsEditingUrl(false);
    if (onUpdateStreamlitUrl && project) {
      onUpdateStreamlitUrl(project.id, customUrl);
    }
  };

  const renderSimulator = () => {
    switch (project.id) {
      case 'enterprise-rag-prompt-engine':
      case 'nexus-enterprise-copilot':
      case 'workforce-rag-knowledge-base':
        return (
          <div className="bg-slate-950 rounded-xl p-4 sm:p-6 border border-slate-800 text-slate-100 shadow-xl">
            <NexusCopilotPreview />
          </div>
        );
      case 'bank-churn':
        return <BankCustomerChurnPreview />;
      case 'hr-analytics':
        return <HrAnalyticsPreview />;
      case 'hr-attrition':
        return <HrAttritionPredictorPreview />;
      default:
        return (
          <div className="p-8 text-center text-stone-500 font-mono text-sm">
            Interactive application console available.
          </div>
        );
    }
  };

  const getContainerWidth = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-md mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'w-full';
    }
  };

  return (
    <AnimatePresence>
      <div
        id="streamlit-modal-backdrop"
        className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          id="streamlit-modal-dialog"
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border border-stone-300 rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-stone-950 text-stone-100 p-4 sm:p-5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded flex items-center justify-center font-bold font-mono text-sm shadow-sm flex-shrink-0 text-white ${
                  isVercelApp ? 'bg-emerald-600' : 'bg-red-600/90'
                }`}
              >
                <span>▲</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5 ${
                      isVercelApp ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full inline-block animate-ping ${
                        isVercelApp ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                    />
                    {isVercelApp ? 'Vercel Production Deployment' : 'Streamlit Community Cloud'}
                  </span>
                  <span className="text-[11px] font-mono bg-stone-800 text-stone-300 px-2 py-0.5 rounded border border-stone-700">
                    {isVercelApp ? 'Live Web App' : 'Live Model'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {project.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={currentUrl}
                target="_blank"
                rel="noreferrer"
                id="btn-open-streamlit-tab"
                className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white px-3 py-1.5 rounded transition-colors shadow-sm ${
                  isVercelApp ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                <span>Launch in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                id="btn-close-streamlit-modal"
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader: Deployment Spec & Mode Switcher */}
          <div className="bg-stone-900 text-stone-300 px-4 py-2.5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 flex-wrap text-stone-400">
              <span className="text-stone-500">Target:</span>
              <span className="text-stone-200 bg-stone-800 px-2 py-0.5 rounded border border-stone-700">
                {project.streamlitDeployment || 'Production Deployment'}
              </span>
              {!isEditingUrl ? (
                <button
                  onClick={() => {
                    setCustomUrl(currentUrl);
                    setIsEditingUrl(true);
                  }}
                  title="Configure custom URL"
                  className="text-stone-400 hover:text-stone-200 inline-flex items-center gap-1 underline text-[11px] ml-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>{currentUrl}</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-1 ml-1">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://your-app.vercel.app"
                    className="bg-stone-800 text-white border border-stone-600 rounded px-2 py-0.5 text-xs w-60"
                  />
                  <button
                    onClick={handleSaveUrl}
                    className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded"
                    title="Apply URL"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setIsEditingUrl(false)}
                    className="p-1 bg-stone-700 hover:bg-stone-600 text-stone-300 rounded"
                    title="Cancel"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-md border border-stone-800">
              {isVercelApp ? (
                <button
                  onClick={() => setViewMode('embed')}
                  className="px-3 py-1 rounded text-xs transition-all flex items-center gap-1.5 bg-stone-800 text-white font-semibold shadow-sm"
                >
                  <Radio className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Actual Live Web App</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setViewMode('screenshot')}
                    className={`px-3 py-1 rounded text-xs transition-all flex items-center gap-1.5 ${
                      viewMode === 'screenshot'
                        ? 'bg-stone-800 text-white font-semibold shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-red-400" />
                    <span>Application Overview</span>
                  </button>

                  <button
                    onClick={() => setViewMode('simulator')}
                    className={`px-3 py-1 rounded text-xs transition-all flex items-center gap-1.5 ${
                      viewMode === 'simulator'
                        ? 'bg-stone-800 text-white font-semibold shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5 text-red-400" />
                    <span>Interactive Console</span>
                  </button>

                  <button
                    onClick={() => setViewMode('embed')}
                    className={`px-3 py-1 rounded text-xs transition-all flex items-center gap-1.5 ${
                      viewMode === 'embed'
                        ? 'bg-stone-800 text-white font-semibold shadow-sm'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5 text-red-400" />
                    <span>Cloud Deployment</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-stone-100">
            {viewMode === 'screenshot' ? (
              <motion.div
                key="screenshot"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="bg-stone-900 border border-stone-800 rounded-lg p-3 text-xs text-stone-300 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block mb-0.5">
                      Application Interface & Architecture Overview
                    </span>
                    <p className="text-stone-400 leading-relaxed font-sans">
                      Production interface visual and feature architecture. Use the tabs above to explore the interactive console or launch the live deployment.
                    </p>
                  </div>
                </div>

                <ProjectDemoScreenshotPreview
                  project={project}
                  onOpenLiveDemo={() => setViewMode('embed')}
                />
              </motion.div>
            ) : viewMode === 'simulator' ? (
              <motion.div
                key="simulator"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">
                      Interactive Production Model Console
                    </span>
                    <p className="text-amber-800 leading-relaxed">
                      Interactive execution environment replicating the production pipeline of{' '}
                      <code className="font-mono bg-amber-100/70 px-1 py-0.5 rounded">
                        {project.streamlitDeployment}
                      </code>
                      . Adjust values below to run real-time inference or switch to the{' '}
                      <button
                        onClick={() => setViewMode('embed')}
                        className="underline font-semibold hover:text-amber-950"
                      >
                        Live Cloud Deployment tab
                      </button>{' '}
                      to connect to the remote host.
                    </p>
                  </div>
                </div>

                {renderSimulator()}
              </motion.div>
            ) : (
              <motion.div
                key="embed"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-full space-y-3"
              >
                {/* Embed Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-stone-200 rounded-lg p-2.5 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500">Device Viewport:</span>
                    <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded">
                      <button
                        onClick={() => setDeviceView('desktop')}
                        className={`p-1 rounded ${
                          deviceView === 'desktop' ? 'bg-white shadow text-stone-900' : 'text-stone-500'
                        }`}
                        title="Desktop view"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeviceView('tablet')}
                        className={`p-1 rounded ${
                          deviceView === 'tablet' ? 'bg-white shadow text-stone-900' : 'text-stone-500'
                        }`}
                        title="Tablet view"
                      >
                        <Tablet className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeviceView('mobile')}
                        className={`p-1 rounded ${
                          deviceView === 'mobile' ? 'bg-white shadow text-stone-900' : 'text-stone-500'
                        }`}
                        title="Mobile view"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIframeKey((prev) => prev + 1)}
                      className="inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 px-2 py-1 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
                      title="Reload iframe"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reload Frame</span>
                    </button>

                    <a
                      href={currentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 px-2 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Open in Browser</span>
                    </a>
                  </div>
                </div>

                {/* Deployment Notice */}
                {isVercelApp ? (
                  <div className="bg-emerald-50 border border-emerald-200/80 rounded-lg p-2.5 text-xs text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      <strong>Actual Live App:</strong> Running live on Vercel. You can interact directly with the application, navigate views, or test responsiveness using the device viewport controls.
                    </span>
                  </div>
                ) : (
                  <div className="bg-sky-50 border border-sky-200/80 rounded-lg p-2.5 text-xs text-sky-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-sky-700 flex-shrink-0" />
                    <span>
                      <strong>Note:</strong> Streamlit Community Cloud apps go to sleep after period of inactivity. If the frame displays &ldquo;App is sleeping&rdquo;, click the blue &ldquo;Wake app up&rdquo; button directly inside the frame.
                    </span>
                  </div>
                )}

                {/* Iframe Window */}
                <div className={`${getContainerWidth()} transition-all duration-300 w-full`}>
                  <div className="bg-white border border-stone-300 rounded-lg shadow-inner overflow-hidden h-[540px] relative">
                    <iframe
                      key={iframeKey}
                      src={currentUrl}
                      title={isVercelApp ? project.title : `Streamlit Cloud - ${project.title}`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-white px-4 py-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
            <span className="font-mono">
              Model Artifacts: <code className="text-stone-800 font-semibold">{project.badge || 'Joblib Pipeline'}</code>
            </span>
            <div className="flex items-center gap-3">
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-stone-900 font-mono text-stone-600 underline"
              >
                Inspect Python Source on GitHub
              </a>
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-md bg-stone-900 hover:bg-stone-800 text-white font-medium transition-colors"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
