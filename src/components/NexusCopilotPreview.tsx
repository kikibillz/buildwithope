import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  ShieldCheck,
  CheckCircle2,
  Database,
  ArrowRight,
  MessageSquare,
} from 'lucide-react';

interface NexusCopilotPreviewProps {
  onOpenLiveDemo?: () => void;
  onOpenCaseStudy?: () => void;
}

export const NexusCopilotPreview: React.FC<NexusCopilotPreviewProps> = ({
  onOpenLiveDemo,
  onOpenCaseStudy,
}) => {
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  const PREVIEW_QA = [
    {
      q: 'What is your offer for HR teams and recruitment agencies?',
      a: 'Practical data and automation support: 1) Automated candidate pipeline & placement tracking for recruitment agencies (cuts processing time by 60%), and 2) Proactive retention hazard modeling & automated weekly headcount reporting for in-house HR teams.',
      clause: 'Core Solutions: HR & Recruitment Automation',
      match: '98.8%',
      latency: '32ms',
    },
    {
      q: 'What is our mandatory protocol when an employee exceeds 70% turnover hazard?',
      a: 'Under [Clause 2.3: Retention SLA], whenever turnover hazard exceeds 70%, People Operations and the engineering manager must schedule a formal 1-on-1 check-in within exactly 48 hours to evaluate compensation, career mobility, and workload fatigue.',
      clause: 'Culturelligence Retention Playbook (Clause 2.3)',
      match: '98.4%',
      latency: '38ms',
    },
    {
      q: 'How do you prevent hallucinations in this RAG copilot?',
      a: 'Via multi-tier grounding: dense ChromaDB embeddings + sparse BM25 keyword matching (RRF rank fusion), strict negative prompt constraints ("declare UNVERIFIED if uncited"), and 98.2% verified factual alignment across 120 test cases.',
      clause: 'Nexus Provenance Spec (Section 1.1)',
      match: '98.1%',
      latency: '41ms',
    },
  ];

  const currentQA = PREVIEW_QA[activeQueryIndex];

  return (
    <div className="w-full bg-[#0d1117] text-slate-100 rounded-t-xs p-4 sm:p-5 font-mono text-xs select-none">
      {/* App Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded bg-teal-600/90 text-white grid place-items-center font-bold">
            <Bot className="size-3.5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-200 tracking-wide">
              Nexus Copilot
            </span>
            <span className="text-[10px] text-teal-400 ml-2 hidden sm:inline">
              ● RAG &amp; Policy Grounding
            </span>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 font-bold">
          LIVE DEMO AVAILABLE
        </span>
      </div>

      {/* Query Sample Switcher */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 scrollbar-none">
        {PREVIEW_QA.map((qa, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveQueryIndex(idx)}
            className={`text-[10px] px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
              activeQueryIndex === idx
                ? 'bg-teal-900/90 text-teal-200 border border-teal-700'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {idx === 0 ? 'Offer for HR & Agencies' : idx === 1 ? '70% Hazard SLA' : 'Hallucination Guardrails'}
          </button>
        ))}
      </div>

      {/* Simulated Chat Dialogue */}
      <div className="space-y-2.5 mb-3 bg-slate-950/80 p-3 rounded border border-slate-800/80">
        {/* User Bubble */}
        <div className="flex justify-end">
          <div className="max-w-[85%] bg-slate-800 text-slate-100 px-3 py-1.5 rounded text-[11px] font-sans">
            {currentQA.q}
          </div>
        </div>

        {/* Bot Response Bubble */}
        <div className="flex justify-start">
          <div className="max-w-[90%] bg-teal-950/70 border border-teal-800/60 text-slate-200 px-3 py-2 rounded text-[11px] font-sans leading-relaxed">
            <div>
              {currentQA.a}
            </div>
            <div className="mt-1.5 pt-1 border-t border-teal-800/40 flex items-center justify-between text-[10px] font-mono text-teal-400">
              <span className="truncate max-w-[200px]">Doc: {currentQA.clause}</span>
              <span>Match: {currentQA.match} · {currentQA.latency}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Launcher Footer */}
      <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
        <span className="text-[10px] text-slate-400 font-sans">
          Grounded on: <b className="text-slate-200">HR Automation SOPs, FastAPI SLAs &amp; ML Models</b>
        </span>

        {onOpenLiveDemo && (
          <button
            type="button"
            onClick={onOpenLiveDemo}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-teal-200 bg-teal-950/80 border border-teal-700/60 hover:border-teal-500 px-3 py-1 rounded transition-colors cursor-pointer"
          >
            <MessageSquare className="size-3" />
            <span>Chat with Nexus Copilot</span>
            <ArrowRight className="size-3" />
          </button>
        )}
      </div>
    </div>
  );
};
