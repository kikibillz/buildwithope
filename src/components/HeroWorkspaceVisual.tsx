import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Table, BarChart2, Play, CheckCircle2, RefreshCw } from 'lucide-react';

export const HeroWorkspaceVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'code' | 'table' | 'chart'>('code');
  const [isExecuting, setIsExecuting] = useState(false);
  const [execCount, setExecCount] = useState(1);

  const handleRun = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecCount((prev) => prev + 1);
    }, 450);
  };

  return (
    <motion.div
      id="hero-workspace-panel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-[#18181b] text-stone-300 rounded-xl border border-stone-800 shadow-xl overflow-hidden font-mono text-xs"
    >
      {/* Window Header */}
      <div className="bg-[#121214] px-3 sm:px-4 py-2 sm:py-2.5 border-b border-stone-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-700 inline-block" />
          </div>
          <span className="text-[11px] text-stone-400 pl-1 sm:pl-2 tracking-wide font-sans truncate">
            workspace / pipeline_inspection.py
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="text-[10px] text-emerald-400 hidden xs:flex sm:flex items-center gap-1 bg-emerald-950/60 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-800/40">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Python 3.11</span>
          </span>
          <button
            onClick={handleRun}
            id="workspace-run-btn"
            disabled={isExecuting}
            title="Execute pipeline cell"
            className="flex items-center gap-1 bg-stone-800 hover:bg-stone-700 active:bg-stone-600 text-stone-200 px-2 sm:px-2.5 py-1 rounded transition-all text-[11px] hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isExecuting ? (
              <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
            ) : (
              <Play className="w-3 h-3 fill-current text-emerald-400" />
            )}
            <span>{isExecuting ? 'Running...' : `Run (${execCount})`}</span>
          </button>
        </div>
      </div>

      {/* Execution Progress Bar */}
      {isExecuting && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="h-0.5 bg-emerald-400 w-full"
        />
      )}

      {/* Tabs */}
      <div className="bg-[#161619] px-3 pt-2 border-b border-stone-800/80 flex gap-1 overflow-x-auto whitespace-nowrap scrollbar-none">
        <button
          onClick={() => setActiveTab('code')}
          id="hero-tab-code"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs transition-colors border-t border-x shrink-0 ${
            activeTab === 'code'
              ? 'bg-[#18181b] text-stone-100 border-stone-700 font-medium'
              : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-800/40'
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-stone-400" />
          <span>model_pipeline.py</span>
        </button>

        <button
          onClick={() => setActiveTab('table')}
          id="hero-tab-table"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs transition-colors border-t border-x shrink-0 ${
            activeTab === 'table'
              ? 'bg-[#18181b] text-stone-100 border-stone-700 font-medium'
              : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-800/40'
          }`}
        >
          <Table className="w-3.5 h-3.5 text-stone-400" />
          <span>df.head() [Cleaned]</span>
        </button>

        <button
          onClick={() => setActiveTab('chart')}
          id="hero-tab-chart"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs transition-colors border-t border-x shrink-0 ${
            activeTab === 'chart'
              ? 'bg-[#18181b] text-stone-100 border-stone-700 font-medium'
              : 'text-stone-400 border-transparent hover:text-stone-200 hover:bg-stone-800/40'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5 text-stone-400" />
          <span>Distribution</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 min-h-[220px]">
        {activeTab === 'code' && (
          <div className="space-y-1 text-stone-300 leading-relaxed overflow-x-auto">
            <div className="text-stone-400 select-none"># 1. Load, clean, and stratify dataset</div>
            <div>
              <span className="text-purple-400">import</span> pandas <span className="text-purple-400">as</span> pd
            </div>
            <div>
              <span className="text-purple-400">from</span> sklearn.model_selection{' '}
              <span className="text-purple-400">import</span> train_test_split
            </div>
            <div>
              <span className="text-purple-400">from</span> sklearn.ensemble{' '}
              <span className="text-purple-400">import</span> RandomForestClassifier
            </div>
            <div className="pt-2">
              df = pd.<span className="text-sky-300">read_csv</span>(
              <span className="text-emerald-400">&quot;incident_records.csv&quot;</span>)
            </div>
            <div className="text-stone-400">df = df.dropna(subset=[&apos;department&apos;, &apos;shift&apos;])</div>
            <div className="pt-2 text-stone-400 select-none"># 2. Encode categorical indicators</div>
            <div>
              X = pd.<span className="text-sky-300">get_dummies</span>(df[[&apos;dept&apos;, &apos;tenure&apos;, &apos;hours&apos;]], drop_first=<span className="text-amber-400">True</span>)
            </div>
            <div>
              y = df[<span className="text-emerald-400">&apos;risk_tier&apos;</span>]
            </div>
            <div className="pt-2 text-stone-400 select-none"># 3. Model validation without leakage</div>
            <div>
              clf = <span className="text-amber-300">RandomForestClassifier</span>(n_estimators=100, random_state=42)
            </div>
            <div>
              clf.<span className="text-sky-300">fit</span>(X_train, y_train)
            </div>
            <div className="pt-2 text-emerald-400/90 text-[11px] flex items-center gap-1.5 border-t border-stone-800 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pipeline validated • Ready for inference</span>
            </div>
          </div>
        )}

        {activeTab === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-2 pr-3">id</th>
                  <th className="pb-2 pr-3">dept</th>
                  <th className="pb-2 pr-3">shift</th>
                  <th className="pb-2 pr-3">exp_yrs</th>
                  <th className="pb-2 pr-3">equipment</th>
                  <th className="pb-2 text-right">risk_tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 text-stone-300 font-mono">
                <tr className="hover:bg-stone-800/30">
                  <td className="py-1.5 pr-3 text-stone-400">#0481</td>
                  <td className="py-1.5 pr-3 text-stone-200">Assembly</td>
                  <td className="py-1.5 pr-3">Day</td>
                  <td className="py-1.5 pr-3">3.2</td>
                  <td className="py-1.5 pr-3 text-stone-400">Pneumatic Press</td>
                  <td className="py-1.5 text-right font-medium text-emerald-400">LOW</td>
                </tr>
                <tr className="hover:bg-stone-800/30">
                  <td className="py-1.5 pr-3 text-stone-400">#0482</td>
                  <td className="py-1.5 pr-3 text-stone-200">Logistics</td>
                  <td className="py-1.5 pr-3">Night</td>
                  <td className="py-1.5 pr-3">0.8</td>
                  <td className="py-1.5 pr-3 text-stone-400">Reach Truck</td>
                  <td className="py-1.5 text-right font-medium text-amber-400">MEDIUM</td>
                </tr>
                <tr className="hover:bg-stone-800/30">
                  <td className="py-1.5 pr-3 text-stone-400">#0483</td>
                  <td className="py-1.5 pr-3 text-stone-200">Fabrication</td>
                  <td className="py-1.5 pr-3">Night</td>
                  <td className="py-1.5 pr-3">1.1</td>
                  <td className="py-1.5 pr-3 text-stone-400">Arc Welder</td>
                  <td className="py-1.5 text-right font-medium text-rose-400">HIGH</td>
                </tr>
                <tr className="hover:bg-stone-800/30">
                  <td className="py-1.5 pr-3 text-stone-400">#0484</td>
                  <td className="py-1.5 pr-3 text-stone-200">Quality Assur.</td>
                  <td className="py-1.5 pr-3">Day</td>
                  <td className="py-1.5 pr-3">5.0</td>
                  <td className="py-1.5 pr-3 text-stone-400">Optical Gauge</td>
                  <td className="py-1.5 text-right font-medium text-emerald-400">LOW</td>
                </tr>
              </tbody>
            </table>
            <div className="pt-2 text-[10px] text-stone-400 flex justify-between">
              <span>Showing 4 of 1,240 records</span>
              <span>Memory: 184.2 KB</span>
            </div>
          </div>
        )}

        {activeTab === 'chart' && (
          <div className="space-y-3">
            <div className="text-[11px] text-stone-400 flex justify-between items-center">
              <span>Class Distribution Across Incident Records</span>
              <span className="text-[10px] text-stone-400">N = 1,240</span>
            </div>

            <div className="space-y-2 pt-1 font-sans">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-mono text-emerald-400">LOW Risk</span>
                  <span className="text-stone-400 font-mono">682 records (55%)</span>
                </div>
                <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: '55%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-mono text-amber-400">MEDIUM Risk</span>
                  <span className="text-stone-400 font-mono">396 records (32%)</span>
                </div>
                <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: '32%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-mono text-rose-400">HIGH Risk</span>
                  <span className="text-stone-400 font-mono">162 records (13%)</span>
                </div>
                <div className="w-full h-3 bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: '13%' }} />
                </div>
              </div>
            </div>

            <div className="text-[10px] text-stone-400 pt-2 border-t border-stone-800">
              Note: Handled class imbalance via stratified sampling and custom class weights.
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="bg-[#121214] px-4 py-1.5 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Pandas • Scikit-learn • Matplotlib</span>
        </span>
        <span>UTF-8 • Unix (LF)</span>
      </div>
    </motion.div>
  );
};
