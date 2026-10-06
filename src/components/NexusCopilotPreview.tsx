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
  const [activeQuery, setActiveQuery] = useState(
    'What is our mandatory protocol when an employee exceeds 70% turnover hazard?'
  );

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

      {/* Simulated Chat Dialogue */}
      <div className="space-y-2.5 mb-3 bg-slate-950/80 p-3 rounded border border-slate-800/80">
        {/* User Bubble */}
        <div className="flex justify-end">
          <div className="max-w-[85%] bg-slate-800 text-slate-100 px-3 py-1.5 rounded text-[11px] font-sans">
            {activeQuery}
          </div>
        </div>

        {/* Bot Response Bubble */}
        <div className="flex justify-start">
          <div className="max-w-[90%] bg-teal-950/70 border border-teal-800/60 text-slate-200 px-3 py-2 rounded text-[11px] font-sans leading-relaxed">
            <div>
              Under <span className="text-teal-300 font-mono font-bold">[Clause 2.3: Retention SLA]</span>, whenever turnover hazard exceeds 70%, People Operations and the engineering manager must schedule a formal 1-on-1 check-in within exactly 48 hours to evaluate compensation, career mobility, and workload fatigue.
            </div>
            <div className="mt-1.5 pt-1 border-t border-teal-800/40 flex items-center justify-between text-[10px] font-mono text-teal-400">
              <span>Cosine Match: 98.4%</span>
              <span>Latency: 38ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Launcher Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-slate-400 font-sans">
          Grounded on: <b className="text-slate-200">Culturelligence HR SOPs, FastAPI SLAs &amp; ML Portfolio</b>
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
