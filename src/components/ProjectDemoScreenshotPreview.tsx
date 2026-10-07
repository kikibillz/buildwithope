import React from 'react';
import { Project } from '../types';
import bank from '../assets/images/bank_churn_app_1789401191137.jpg';
import hr from '../assets/images/hr_analytics_app_1789401204328.jpg';
import lead from '../assets/images/lead_finder_app_1789401276532.jpg';
const screenshots: Record<string, string> = { 'bank-churn': bank, 'hr-analytics': hr, 'lead-finder': lead };
export const ProjectDemoScreenshotPreview: React.FC<{ project: Project; onOpenLiveDemo?: () => void; onOpenCaseStudy?: () => void }> = ({ project }) => {
  const screenshot = screenshots[project.id];
  return <div className="bg-slate-950 text-slate-100 p-5 min-h-48 rounded-sm">
    <p className="font-mono text-xs uppercase tracking-widest text-teal-300 mb-3">{screenshot ? 'Static project screenshot' : 'Project overview'}</p>
    {screenshot ? <img src={screenshot} alt={`${project.title} — static screenshot, not live output`} loading="lazy" className="w-full h-48 object-contain" /> : <><h3 className="text-xl font-bold mb-3">{project.title}</h3><p className="text-sm text-slate-300 leading-relaxed">{project.approachSummary}</p></>}
    <p className="mt-4 text-xs text-slate-400">Illustrative portfolio material. This preview does not run a model or measure performance.</p>
  </div>;
};
