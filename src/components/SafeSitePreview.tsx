import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export const SafeSitePreview: React.FC = () => {
  const [department, setDepartment] = useState<'Assembly' | 'Logistics' | 'Fabrication'>('Logistics');
  const [shift, setShift] = useState<'Day' | 'Night'>('Night');
  const [equipment, setEquipment] = useState<'Hand Tools' | 'Forklift' | 'Heavy Press'>('Forklift');
  const [experienceYears, setExperienceYears] = useState<number>(1.2);

  // Realistic deterministic heuristic simulating trained model decision function
  const calculateRisk = (): { level: 'LOW' | 'MEDIUM' | 'HIGH'; score: number; rationale: string } => {
    let score = 0;
    if (department === 'Fabrication') score += 35;
    else if (department === 'Logistics') score += 25;
    else score += 10;

    if (shift === 'Night') score += 20;
    if (equipment === 'Heavy Press') score += 35;
    else if (equipment === 'Forklift') score += 25;
    else score += 5;

    if (experienceYears < 1.0) score += 20;
    else if (experienceYears < 3.0) score += 10;

    if (score >= 65) {
      return {
        level: 'HIGH',
        score,
        rationale: 'Night shift + heavy mobile equipment with limited tenure indicates heightened probability of operational incidents.',
      };
    }
    if (score >= 40) {
      return {
        level: 'MEDIUM',
        score,
        rationale: 'Moderate incident probability. Standard safety checklists and supervisor oversight recommended.',
      };
    }
    return {
      level: 'LOW',
      score,
      rationale: 'Controlled parameters within baseline safety margins during daylight operating hours.',
    };
  };

  const riskResult = calculateRisk();

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-5 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-200">
        <div>
          <span className="text-xs font-mono font-medium text-stone-600 uppercase tracking-wider">
            Live Inference Preview
          </span>
          <h4 className="text-sm font-semibold text-stone-900">Incident Parameter Simulator</h4>
        </div>
        <span className="text-[11px] font-mono bg-stone-200/80 text-stone-700 px-2 py-0.5 rounded">
          Streamlit Mock UI
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Controls */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Department</label>
            <div className="grid grid-cols-3 gap-1">
              {(['Assembly', 'Logistics', 'Fabrication'] as const).map((dept) => (
                <button
                  key={dept}
                  onClick={() => setDepartment(dept)}
                  className={`text-xs py-1.5 px-2 rounded border transition-colors ${
                    department === dept
                      ? 'bg-stone-900 text-white border-stone-900 font-medium'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Shift</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as 'Day' | 'Night')}
                aria-label="Shift Timing"
                className="w-full text-xs bg-white border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-500"
              >
                <option value="Day">Day Shift</option>
                <option value="Night">Night Shift</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Equipment</label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value as 'Hand Tools' | 'Forklift' | 'Heavy Press')}
                aria-label="Equipment Type"
                className="w-full text-xs bg-white border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-500"
              >
                <option value="Hand Tools">Hand Tools</option>
                <option value="Forklift">Forklift / Mobile</option>
                <option value="Heavy Press">Heavy Press</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-stone-700">Operator Experience</span>
              <span className="font-mono text-stone-600">{experienceYears.toFixed(1)} yrs</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="6.0"
              step="0.2"
              value={experienceYears}
              onChange={(e) => setExperienceYears(parseFloat(e.target.value))}
              aria-label="Operator Experience (years)"
              className="w-full accent-stone-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
          </div>
        </div>

        {/* Prediction Output Card */}
        <div className="bg-white border border-stone-200 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-stone-500 font-mono">Predicted Risk Tier</span>
              <span className="text-[11px] font-mono text-stone-400">RandomForest v1</span>
            </div>

            {/* Risk Category Badge */}
            <div className="flex items-center gap-3 my-2">
              {riskResult.level === 'LOW' && (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-base font-bold tracking-wider font-mono">LOW</div>
                    <div className="text-[10px] text-emerald-700 font-medium">Standard baseline precautions</div>
                  </div>
                </div>
              )}

              {riskResult.level === 'MEDIUM' && (
                <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="text-base font-bold tracking-wider font-mono">MEDIUM</div>
                    <div className="text-[10px] text-amber-700 font-medium">Secondary checks advised</div>
                  </div>
                </div>
              )}

              {riskResult.level === 'HIGH' && (
                <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-md">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <div>
                    <div className="text-base font-bold tracking-wider font-mono">HIGH</div>
                    <div className="text-[10px] text-rose-700 font-medium">Supervisor clearance required</div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              {riskResult.rationale}
            </p>
          </div>

          <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-mono flex items-center justify-between">
            <span>Model: Joblib pipeline</span>
            <span className="text-stone-400">Features: 12 encoded</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
        <span className="italic text-stone-500">
          Model evaluation metrics available in the project documentation.
        </span>
        <button
          onClick={() => {
            setDepartment('Assembly');
            setShift('Day');
            setEquipment('Hand Tools');
            setExperienceYears(3.5);
          }}
          className="text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 font-mono text-[11px]"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset inputs</span>
        </button>
      </div>
    </div>
  );
};
