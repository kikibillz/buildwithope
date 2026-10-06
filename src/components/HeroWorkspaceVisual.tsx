import React, { useState } from 'react';
import { Play, RefreshCw } from 'lucide-react';

interface HeroWorkspaceVisualProps {
  onSelectVideo?: (video: any) => void;
}

export const HeroWorkspaceVisual: React.FC<HeroWorkspaceVisualProps> = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [runCount, setRunCount] = useState(1);
  const [statusText, setStatusText] = useState('● Pytest: 48 passed (94.2% coverage)');

  const handleRun = () => {
    setIsRunning(true);
    setStatusText('● pytest -v --cov=src tests/');
    setTimeout(() => {
      setIsRunning(false);
      setRunCount((prev) => prev + 1);
      setStatusText('● 48 passed in 1.42s (94.2% coverage)');
    }, 600);
  };

  return (
    <aside
      id="hero-workspace-panel"
      className="relative w-full max-w-full min-h-[380px] sm:min-h-[420px] flex flex-col justify-between border-2 border-foreground bg-foreground p-4 sm:p-6 text-background shadow-brutal lg:mt-6 rounded-xs selection:bg-highlight selection:text-highlight-foreground font-mono transition-all"
    >
      <div>
        {/* Terminal Title Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-background/20 pb-3 sm:pb-4 text-[11px] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-status inline-block" />
            <span className="text-background font-bold font-mono text-xs">pipeline_inspection.py</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-status text-[10px] sm:text-[11px] font-bold">{statusText}</span>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-background text-foreground text-[11px] font-mono font-bold hover:bg-secondary hover:text-secondary-foreground transition-colors cursor-pointer rounded-xs active:scale-95"
            >
              {isRunning ? (
                <RefreshCw className="size-3 animate-spin" />
              ) : (
                <Play className="size-3 fill-current" />
              )}
              <span>Run ({runCount})</span>
            </button>
          </div>
        </div>

        {/* Code Snippet with Line Numbers */}
        <div className="mt-4 sm:mt-6 text-[11px] sm:text-xs leading-6 sm:leading-8 text-background/85 overflow-x-auto pb-2 scrollbar-none">
          <p className="whitespace-nowrap">
            <span className="text-accent font-bold select-none pr-3">01</span>
            <span className="text-secondary font-bold">clean_and_validate</span>(raw_records, schema=pydantic_v2)
          </p>
          <p className="whitespace-nowrap">
            <span className="text-accent font-bold select-none pr-3">02</span>
            <span className="text-secondary font-bold">engineer_features</span>(stratified=True, encode=one_hot)
          </p>
          <p className="whitespace-nowrap">
            <span className="text-accent font-bold select-none pr-3">03</span>
            <span className="text-secondary font-bold">train_without_leakage</span>(model=XGBoost, folds=5)
          </p>
          <p className="whitespace-nowrap">
            <span className="text-accent font-bold select-none pr-3">04</span>
            <span className="text-secondary font-bold">explain_and_deploy</span>(runtime=FastAPI_ASGI)
          </p>
          <p className="text-background/50 pt-2 text-[10px] sm:text-[11px] whitespace-nowrap">
            <span className="text-accent font-bold select-none pr-3">05</span>
            # Validated 99.4% inference uptime • ROC-AUC: 0.942
          </p>
        </div>
      </div>

      {/* Bottom Metric Cards in Grid (Responsive) */}
      <div className="mt-6 pt-4 border-t border-background/20 grid grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-background/10 p-3 sm:p-4 rounded-xs border border-background/15">
          <span className="block font-display text-2xl sm:text-3xl text-highlight">13</span>
          <span className="text-[11px] sm:text-xs text-background/70 font-sans block mt-0.5">Verified certifications</span>
        </div>
        <div className="bg-background/10 p-3 sm:p-4 rounded-xs border border-background/15">
          <span className="block font-display text-2xl sm:text-3xl text-secondary">11</span>
          <span className="text-[11px] sm:text-xs text-background/70 font-sans block mt-0.5">Project case studies</span>
        </div>
      </div>
    </aside>
  );
};
