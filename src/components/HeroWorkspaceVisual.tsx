import React from 'react';
import { projects, certifications } from '../data/portfolioData';
import { AIVideoProject } from '../types';
export const HeroWorkspaceVisual: React.FC<{ onSelectVideo?: (video: AIVideoProject) => void }> = () => <div className="bg-slate-950 text-white border-2 border-foreground/20 rounded-sm p-6 sm:p-8">
<p className="font-mono text-xs uppercase tracking-widest text-teal-300">How I approach a project</p><ol className="mt-6 space-y-5">{['Understand your reporting question and agree the scope.','Review an approved sample and check data quality.','Build a clear tracker, report or repeatable workflow.','Validate outputs together and document the handover.'].map((step,i) => <li key={step} className="flex gap-4"><span className="font-mono text-teal-300">0{i+1}</span><span>{step}</span></li>)}</ol>
<div className="mt-8 border-t border-slate-700 pt-4 flex flex-wrap gap-6 text-sm"><span>{projects.length} portfolio projects</span><span>{certifications.length} listed credentials</span></div><p className="mt-3 text-xs text-slate-400">Browse the evidence and source links; delivery scope is agreed per project.</p></div>;
