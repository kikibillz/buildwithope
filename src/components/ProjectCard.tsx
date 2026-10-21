import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  ExternalLink,
  ArrowRight,
  Play,
  TrendingUp,
  Maximize2,
  Terminal,
  FileSpreadsheet,
  ShieldAlert,
  Binary,
  CheckCircle2,
  Cpu,
  Layers,
  Database,
  Table,
  Gauge,
  BarChart3,
} from 'lucide-react';
import { Project } from '../types';

import bankChurnImg from '../assets/images/bank_churn_app_1789401191137.jpg';
import hrAnalyticsImg from '../assets/images/hr_analytics_app_1789401204328.jpg';
import leadFinderImg from '../assets/images/lead_finder_app_1789401276532.jpg';
import begiBegiImg from '../assets/images/begibegi_site_1789401219333.jpg';
import careerBoostImg from '../assets/images/career_boost_site_1789401234185.jpg';

interface ProjectCardProps {
  project: Project;
  index?: number;
  onOpenCaseStudy: (project: Project) => void;
  onOpenStreamlit?: (project: Project) => void;
  onOpenBiDashboard?: (project: Project) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index = 0,
  onOpenCaseStudy,
  onOpenStreamlit,
  onOpenBiDashboard,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Status and URL for window chrome
  const getWindowMeta = () => {
    switch (project.id) {
      case 'enterprise-rag-prompt-engine':
        return {
          url: 'nexus-copilot.internal/v1/chat',
          type: 'AI Copilot · RAG',
          status: '98.2% Factual Grounding',
          accent: 'text-teal-400',
        };
      case 'hybrid-sql-nosql-engine':
        return {
          url: 'hybrid-database-engine.internal/sql-nosql-bench',
          type: 'PostgreSQL & MongoDB',
          status: '1.2M Records · < 25ms',
          accent: 'text-cyan-400',
        };
      case 'fastapi-ml-service':
        return {
          url: 'fastapi-service.internal/docs',
          type: 'FastAPI ASGI',
          status: 'Active · < 15ms',
          accent: 'text-teal-400',
        };
      case 'python-automated-ledger':
        return {
          url: 'client-ledger-automated.xlsx',
          type: 'Excel & Sheets ETL',
          status: '100% Tax Accuracy',
          accent: 'text-emerald-400',
        };
      case 'bank-churn':
        return {
          url: 'bank-customer-churn.streamlit.app',
          type: 'Streamlit Cloud',
          status: '86.4% Recall',
          accent: 'text-rose-400',
        };
      case 'hr-analytics':
      case 'hr-attrition':
        return {
          url: 'hr-analytics-2026.streamlit.app',
          type: 'Streamlit Cloud',
          status: '87.1% Accuracy',
          accent: 'text-cyan-400',
        };
      case 'lead-finder':
        return {
          url: 'api.cqc.org.uk/python-etl',
          type: 'REST Automation',
          status: '100 hrs/mo saved',
          accent: 'text-amber-400',
        };
      case 'begi-begi':
        return {
          url: 'begi-begi.vercel.app',
          type: 'Vercel Production',
          status: 'Live Web App',
          accent: 'text-emerald-400',
        };
      case 'career-boost':
      case 'nigerian-career-boost-hub':
        return {
          url: 'career-boostng.vercel.app',
          type: 'Vercel Production',
          status: 'Live Web App',
          accent: 'text-blue-400',
        };
      case 'safesite':
        return {
          url: 'safesite-incident-risk.streamlit.app',
          type: 'Safety Classifier',
          status: '3 Risk Tiers',
          accent: 'text-orange-400',
        };
      case 'income-prediction':
      default:
        return {
          url: 'census-income-pipeline.py',
          type: 'Scikit-learn ML',
          status: 'ROC-AUC 0.868',
          accent: 'text-indigo-400',
        };
    }
  };

  const windowMeta = getWindowMeta();

  // Render 16:9 Visual Preview
  const renderVisualContent = () => {
    switch (project.id) {
      case 'bank-churn':
        return (
          <img
            src={bankChurnImg}
            alt="Bank Customer Churn Predictor"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        );
      case 'hr-analytics':
      case 'hr-attrition':
        return (
          <img
            src={hrAnalyticsImg}
            alt="HR Workforce Analytics System"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        );
      case 'lead-finder':
        return (
          <img
            src={leadFinderImg}
            alt="Healthcare Provider Data Extraction Tool"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        );
      case 'begi-begi':
        return (
          <img
            src={begiBegiImg}
            alt="Begi-Begi Social Micro-Funding Platform"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        );
      case 'career-boost':
      case 'nigerian-career-boost-hub':
        return (
          <img
            src={careerBoostImg}
            alt="Career Boost Platform"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        );
      case 'hybrid-sql-nosql-engine':
        return (
          <div className="w-full h-full bg-[#080d1a] text-slate-100 p-3 sm:p-4 flex flex-col justify-between font-mono text-[11px] select-none">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1.5">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Database className="size-3" />
                  Dual-Engine: Relational SQL + NoSQL Document Store
                </span>
                <span className="bg-cyan-950/80 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-800 text-[9px]">
                  PostgreSQL &amp; MongoDB
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900/90 border border-blue-900/50 rounded p-2">
                  <div className="flex items-center justify-between text-[9px] mb-1">
                    <span className="text-blue-400 font-bold flex items-center gap-1">
                      <Table className="size-2.5" /> PostgreSQL (SQL)
                    </span>
                    <span className="text-slate-400 font-mono">B-Tree Index</span>
                  </div>
                  <code className="text-[9.5px] text-blue-200 block truncate">
                    SELECT c.id, SUM(o.amt)
                  </code>
                  <code className="text-[9.5px] text-slate-400 block truncate">
                    FROM clients c JOIN orders o
                  </code>
                  <div className="mt-1 flex items-center justify-between text-[9px] text-emerald-400 pt-1 border-t border-slate-800">
                    <span>ACID Schema</span>
                    <span className="font-bold">14ms · 850k rows</span>
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-emerald-900/50 rounded p-2">
                  <div className="flex items-center justify-between text-[9px] mb-1">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Layers className="size-2.5" /> MongoDB (NoSQL)
                    </span>
                    <span className="text-slate-400 font-mono">Aggregation</span>
                  </div>
                  <code className="text-[9.5px] text-emerald-200 block truncate">
                    db.telemetry.aggregate([
                  </code>
                  <code className="text-[9.5px] text-slate-400 block truncate">
                    {`{ $match: { status: 'live' } }`}
                  </code>
                  <div className="mt-1 flex items-center justify-between text-[9px] text-emerald-400 pt-1 border-t border-slate-800">
                    <span>Flexible JSON</span>
                    <span className="font-bold">18ms · 380k docs</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80">
              <span className="text-cyan-400 font-bold">Query Speedup: 4.5x Index Optimization</span>
              <span className="text-slate-300">1.2M+ Records Tested</span>
            </div>
          </div>
        );
      case 'fastapi-ml-service':
        return (
          <div className="w-full h-full bg-[#0a0f18] text-slate-100 p-3 sm:p-4 flex flex-col justify-between font-mono text-[11px] select-none">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1.5">
                <span className="flex items-center gap-1.5 text-teal-400 font-bold">
                  <Terminal className="size-3" />
                  FastAPI OpenAPI Swagger UI
                </span>
                <span className="bg-teal-950/80 text-teal-300 px-1.5 py-0.5 rounded border border-teal-800 text-[9px]">
                  v2.0 Pydantic
                </span>
              </div>
              <div className="bg-slate-900/90 border border-emerald-900/40 rounded p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-600 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px]">
                    POST
                  </span>
                  <span className="text-slate-200 font-semibold text-xs">/api/v1/predict/churn</span>
                </div>
                <span className="text-emerald-400 font-bold text-[10px]">200 OK · 12ms</span>
              </div>
              <div className="bg-slate-900/90 border border-blue-900/40 rounded p-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px]">
                    POST
                  </span>
                  <span className="text-slate-200 font-semibold text-xs">/api/v1/predict/attrition</span>
                </div>
                <span className="text-blue-400 font-bold text-[10px]">200 OK · 14ms</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80">
              <span className="text-teal-400">Lifespan Hooks: XGBoost &amp; Joblib</span>
              <span className="text-slate-300">Pytest Coverage: 92%</span>
            </div>
          </div>
        );
      case 'python-automated-ledger':
        return (
          <div className="w-full h-full bg-[#06140e] text-slate-100 p-3 sm:p-4 flex flex-col justify-between font-mono text-[11px] select-none">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-emerald-950 pb-1.5">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <FileSpreadsheet className="size-3" />
                  Automated Reconciliation Ledger
                </span>
                <span className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800 text-[9px]">
                  OpenPyXL + Pandas
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[10px] bg-emerald-950/60 p-1.5 rounded border border-emerald-800/50 text-emerald-200 font-semibold">
                <span>Invoice #</span>
                <span>Client</span>
                <span className="text-right">Gross</span>
                <span className="text-right">Net (80%)</span>
              </div>
              <div className="space-y-1 text-[10px]">
                <div className="grid grid-cols-4 gap-1 bg-slate-900/80 px-1.5 py-1 rounded border border-slate-800">
                  <span className="text-emerald-400 font-bold">INV-1042</span>
                  <span className="truncate text-slate-300">Nexus Fintech</span>
                  <span className="text-right text-slate-200">$4,500</span>
                  <span className="text-right text-emerald-300 font-bold">$3,600</span>
                </div>
                <div className="grid grid-cols-4 gap-1 bg-slate-900/80 px-1.5 py-1 rounded border border-slate-800">
                  <span className="text-emerald-400 font-bold">INV-1043</span>
                  <span className="truncate text-slate-300">Crestview Media</span>
                  <span className="text-right text-slate-200">$3,200</span>
                  <span className="text-right text-emerald-300 font-bold">$2,560</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-emerald-950">
              <span className="text-emerald-400 font-bold">=SUM(Net) Auto-Computed</span>
              <span className="text-slate-300">85% Faster Bookkeeping</span>
            </div>
          </div>
        );
      case 'safesite':
        return (
          <div className="w-full h-full bg-[#140f07] text-slate-100 p-3 sm:p-4 flex flex-col justify-between font-mono text-[11px] select-none">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-orange-950 pb-1.5">
                <span className="flex items-center gap-1.5 text-orange-400 font-bold">
                  <ShieldAlert className="size-3" />
                  SafeSite Incident Stratification Engine
                </span>
                <span className="bg-orange-950 text-orange-300 px-1.5 py-0.5 rounded border border-orange-800 text-[9px]">
                  Scikit-learn RF
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-red-950/40 border border-red-800/50 p-1.5 rounded">
                  <span className="text-red-400 font-bold text-xs">Tier 1: High Hazard Incident</span>
                  <span className="text-[10px] text-red-300 font-mono">Immediate Alert</span>
                </div>
                <div className="flex items-center justify-between bg-amber-950/40 border border-amber-800/50 p-1.5 rounded">
                  <span className="text-amber-400 font-bold text-xs">Tier 2: Moderate Operational Risk</span>
                  <span className="text-[10px] text-amber-300 font-mono">Monitor Shift</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-orange-950">
              <span className="text-orange-400 font-bold">40% Faster Intervention</span>
              <span className="text-slate-300">Macro-F1 Precision Focus</span>
            </div>
          </div>
        );
      case 'income-prediction':
      default:
        return (
          <div className="w-full h-full bg-[#0b101b] text-slate-100 p-3 sm:p-4 flex flex-col justify-between font-mono text-[11px] select-none">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-indigo-950 pb-1.5">
                <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                  <Cpu className="size-3" />
                  Census Income Classification Pipeline
                </span>
                <span className="bg-indigo-950 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-800 text-[9px]">
                  ColumnTransformer
                </span>
              </div>
              <div className="bg-slate-900/90 border border-indigo-900/40 rounded p-2.5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Predicted Socioeconomic Bracket</div>
                  <div className="text-emerald-400 font-extrabold text-sm sm:text-base mt-0.5">
                    &gt; $50,000 / yr (84% Probability)
                  </div>
                </div>
                <span className="text-indigo-400 font-bold text-xs bg-indigo-950 px-2 py-1 rounded border border-indigo-800">
                  ROC-AUC: 0.868
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-indigo-950">
              <span className="text-indigo-400">Zero Data Leakage Guard</span>
              <span className="text-slate-300">5-Fold Stratified Split</span>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.article
      id={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group bg-card border-2 border-foreground rounded-sm overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col justify-between ${
        className || ''
      }`}
    >
      {/* 1. TOP 16:9 VISUAL PREVIEW FRAME (Uniform across all cards) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950 border-b-2 border-foreground cursor-pointer select-none">
        {/* Mockup Browser / Terminal Chrome Bar */}
        <div className="bg-stone-950/95 text-stone-400 px-3 py-1.5 border-b border-stone-800 flex items-center justify-between text-[11px] font-mono z-10 relative">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shrink-0" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shrink-0" />
            <span className="text-stone-400 font-mono text-[10px] ml-1 truncate">
              {windowMeta.url}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] bg-stone-900 text-stone-300 px-2 py-0.5 rounded border border-stone-800 font-semibold hidden xs:inline">
              {windowMeta.type}
            </span>
            <span className={`text-[10px] font-bold flex items-center gap-1 ${windowMeta.accent}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span>{windowMeta.status}</span>
            </span>
          </div>
        </div>

        {/* Visual Content Frame */}
        <div className="w-full h-[calc(100%-29px)] overflow-hidden relative" onClick={() => onOpenCaseStudy(project)}>
          {renderVisualContent()}

          {/* Hover Overlay with Quick Actions */}
          <div
            className={`absolute inset-0 bg-stone-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 gap-3 text-center transition-opacity duration-200 ${
              isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="space-y-1 max-w-sm">
              <h4 className="text-white font-extrabold text-base tracking-tight font-display uppercase line-clamp-1">
                {project.title}
              </h4>
              <p className="text-xs text-stone-300 font-sans line-clamp-2">
                {project.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => onOpenCaseStudy(project)}
                className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-mono font-bold px-3.5 py-1.5 rounded-xs shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer uppercase"
              >
                <Maximize2 className="size-3" />
                <span>Case Study</span>
              </button>

              {project.streamlitDeployment && onOpenStreamlit && project.id !== 'fastapi-ml-service' && (
                <button
                  type="button"
                  onClick={() => onOpenStreamlit(project)}
                  className="inline-flex items-center gap-1.5 bg-foreground text-background text-xs font-mono font-bold px-3.5 py-1.5 rounded-xs shadow-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer uppercase"
                >
                  <Play className="size-3 fill-current" />
                  <span>Launch Demo</span>
                </button>
              )}

              {project.links.demo && project.links.demo.startsWith('http') && !project.links.demo.includes('github') && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-mono font-bold px-3.5 py-1.5 rounded-xs shadow-sm hover:scale-105 transition-transform cursor-pointer uppercase"
                >
                  <ExternalLink className="size-3" />
                  <span>Live Web App</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. CARD BODY (Balanced Typography & Quantified Impact) */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Index & Category Row */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-xs font-black px-2 py-0.5 border-2 border-foreground bg-primary/20 text-foreground rounded-xs shrink-0">
                PROJ {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[11px] font-bold text-muted-foreground uppercase tracking-wider truncate">
                {project.category}
              </span>
            </div>

            {project.badge && (
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs border border-foreground/30 bg-muted text-foreground shrink-0">
                {project.badge}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenCaseStudy(project)}
            className="font-display font-extrabold text-xl sm:text-2xl text-foreground leading-tight group-hover:text-primary transition-colors cursor-pointer line-clamp-2"
          >
            {project.title}
          </h3>

          {/* Tagline / Summary (Strictly clamped to 2 lines for uniform card alignment) */}
          <p className="mt-2 text-sm text-foreground/80 font-sans leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* 3. KEY PERFORMANCE INDICATORS ROW */}
          {project.keyMetrics && project.keyMetrics.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                <Gauge className="size-3 text-primary shrink-0" />
                <span>Key Performance Indicators</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {project.keyMetrics.slice(0, 3).map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className="bg-muted/70 border border-foreground/20 rounded-xs p-2 flex flex-col justify-between"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider font-semibold truncate">
                      {metric.label}
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-black text-foreground mt-0.5 truncate">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. TECH STACK PILLS */}
          <div className="mt-4 flex flex-wrap gap-1.5 items-center">
            {project.tools.slice(0, 5).map((tool) => (
              <span
                key={tool}
                className="font-mono text-[11px] px-2 py-0.5 rounded-xs bg-muted text-foreground/80 border border-foreground/20 font-medium"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 5 && (
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-xs text-muted-foreground font-semibold">
                +{project.tools.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* 5. CARD ACTION FOOTER */}
        <div className="pt-4 border-t-2 border-foreground/15 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="inline-flex items-center gap-1.5 bg-foreground text-background px-4 py-2 rounded-xs font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm hover:translate-x-0.5 transition-all cursor-pointer"
          >
            <span>Case Study</span>
            <ArrowRight className="size-3.5" />
          </button>

          <div className="flex items-center gap-2">
            {onOpenBiDashboard && (project.id.includes('hr') || project.id.includes('ledger') || project.id.includes('churn') || project.tools.includes('Power BI') || project.tools.includes('Microsoft Excel')) && (
              <button
                type="button"
                onClick={() => onOpenBiDashboard(project)}
                className="inline-flex items-center gap-1 bg-[#f59e0b] hover:bg-[#d97706] text-stone-950 px-2.5 py-2 rounded-xs font-mono text-xs font-black uppercase tracking-wider shadow-brutal-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                title="Launch Interactive Power BI & Excel Dashboard"
              >
                <BarChart3 className="size-3.5" />
                <span className="hidden xs:inline">BI &amp; Excel</span>
              </button>
            )}

            {project.streamlitDeployment && onOpenStreamlit && project.id !== 'fastapi-ml-service' && (
              <button
                type="button"
                onClick={() => onOpenStreamlit(project)}
                className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-2 rounded-xs font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Play className="size-3 fill-current" />
                <span>Live Demo</span>
              </button>
            )}

            {project.links.demo &&
              project.links.demo.startsWith('http') &&
              !project.links.demo.includes('github') && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-2 rounded-xs font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <ExternalLink className="size-3" />
                  <span>Live App</span>
                </a>
              )}

            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 bg-card text-foreground border-2 border-foreground/30 px-3 py-2 rounded-xs font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm hover:border-foreground transition-all cursor-pointer"
              title="View GitHub Repository"
            >
              <Github className="size-3.5" />
              <span className="hidden xs:inline">Code</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
