import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Search,
  FileText,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Code2,
  Database,
  Terminal,
  Zap,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface RagEnginePreviewProps {
  onOpenStudio?: () => void;
  onOpenCaseStudy?: () => void;
}

const SAMPLE_QUERIES = [
  {
    query: 'What is the mandatory retention protocol for >70% turnover hazard?',
    topDoc: 'Culturelligence HR Retention SOP 2026',
    topChunk: 'Clause 4.2: Immediate 1-on-1 manager check-in within 48h; review compensation variance against industry benchmark.',
    score: '97.4%',
    strategy: 'Strict Grounded Guardrail',
  },
  {
    query: 'How does the backend achieve sub-25ms inference latency?',
    topDoc: 'FastAPI ML Architecture Spec',
    topChunk: 'Section 2.1: Pre-warmed Joblib classification pipelines running on async Uvicorn workers with Pydantic v2 schemas.',
    score: '96.8%',
    strategy: 'Chain-of-Thought (CoT)',
  },
  {
    query: 'What are the statutory rules for 20% financial withholding calculation?',
    topDoc: 'Statutory Financial Ledgers SOP',
    topChunk: 'Rule 3.4: Withhold 20% flat tax on gross invoices prior to net disbursement, dynamically evaluated via OpenPyXL formulas.',
    score: '98.9%',
    strategy: 'Structured JSON Schema',
  },
];

export const RagEnginePreview: React.FC<RagEnginePreviewProps> = ({
  onOpenStudio,
  onOpenCaseStudy,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeSample = SAMPLE_QUERIES[selectedIdx];

  return (
    <div className="w-full bg-[#0d1117] text-slate-100 rounded-t-xs p-4 sm:p-5 font-mono text-xs select-none">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="text-[11px] font-bold text-slate-300 ml-2 tracking-wide flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>rag-engine-v2 // hybrid-vector-search</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
            ● CHROMA + BM25 ACTIVE
          </span>
        </div>
      </div>

      {/* Query Selector Tabs */}
      <div className="mb-3">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>Sample Prompt Inquiries:</span>
          <span className="text-cyan-400 font-semibold">Click to inspect retrieval</span>
        </div>
        <div className="flex flex-col gap-1">
          {SAMPLE_QUERIES.map((sample, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIdx(i)}
              className={`text-left px-2.5 py-1.5 rounded text-[11px] transition-all flex items-center justify-between gap-2 cursor-pointer ${
                selectedIdx === i
                  ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-500 font-semibold'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span className="truncate">{sample.query}</span>
              <span className="text-[10px] shrink-0 text-cyan-400 font-bold">
                {sample.score} match
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Retrieval Inspector Box */}
      <div className="bg-slate-950/90 border border-slate-800 rounded p-3 mb-3 space-y-2">
        <div className="flex items-center justify-between text-[10px] border-b border-slate-800/80 pb-1.5">
          <span className="text-slate-400">
            Source: <b className="text-slate-200">{activeSample.topDoc}</b>
          </span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Cosine Score: {activeSample.score}
          </span>
        </div>

        <div className="text-[11px] text-slate-300 font-sans leading-relaxed">
          <span className="text-yellow-400 font-mono text-[10px] mr-1 font-bold">[Top Chunk 1]:</span>
          {activeSample.topChunk}
        </div>

        <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-slate-400">
          <span className="text-cyan-400">Strategy: {activeSample.strategy}</span>
          <span className="text-slate-500">Retrieval latency: 42ms</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] text-slate-400 font-sans">
          Grounding: <b className="text-emerald-400">100% Citation Backed</b> · 0 Hallucinations
        </span>

        {onOpenStudio && (
          <button
            type="button"
            onClick={onOpenStudio}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
          >
            <span>Launch Live Studio</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
