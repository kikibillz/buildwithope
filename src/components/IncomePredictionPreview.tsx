import React, { useState } from 'react';
import { ArrowRight, Sliders, CheckCircle2, HelpCircle } from 'lucide-react';

export const IncomePredictionPreview: React.FC = () => {
  const [educationLevel, setEducationLevel] = useState<'High School' | 'Bachelors' | 'Masters / Doctorate'>('Bachelors');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(42);
  const [workclass, setWorkclass] = useState<'Private Sector' | 'Self-Employed' | 'State / Gov'>('Private Sector');
  const [capitalGains, setCapitalGains] = useState<'None' | 'Moderate' | 'Substantial'>('None');

  // Realistic sample classification output based on feature weights
  const getPrediction = () => {
    let score = 0;
    if (educationLevel === 'Masters / Doctorate') score += 40;
    else if (educationLevel === 'Bachelors') score += 25;
    else score += 10;

    if (hoursPerWeek >= 50) score += 20;
    else if (hoursPerWeek >= 40) score += 12;
    else score += 5;

    if (capitalGains === 'Substantial') score += 30;
    else if (capitalGains === 'Moderate') score += 15;

    if (workclass === 'Self-Employed') score += 8;

    const isAboveThreshold = score >= 55;
    return {
      tier: isAboveThreshold ? '> $50K / yr' : '<= $50K / yr',
      confidence: isAboveThreshold ? 'High probability bracket' : 'Baseline probability bracket',
      factors: [
        `${educationLevel} tier encoding`,
        `${hoursPerWeek} hrs/week scaled factor`,
        `Capital gains category: ${capitalGains}`,
      ],
    };
  };

  const pred = getPrediction();

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-5 font-sans">
      {/* Pipeline Architecture Diagram */}
      <div className="mb-4 pb-3 border-b border-stone-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-medium text-stone-600 uppercase tracking-wider">
            Scikit-learn Pipeline Architecture
          </span>
          <span className="text-[11px] font-mono text-stone-500">ColumnTransformer</span>
        </div>

        {/* Step-by-step visual pipeline flow */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px] font-mono">
          <div className="bg-white border border-stone-200 rounded p-2 text-stone-700">
            <div className="text-[10px] text-stone-600 uppercase">Step 01: Clean</div>
            <div className="font-semibold text-stone-900 mt-0.5">SimpleImputer</div>
            <div className="text-[10px] text-stone-500 mt-1">Handles missing (?) tags</div>
          </div>

          <div className="bg-white border border-stone-200 rounded p-2 text-stone-700">
            <div className="text-[10px] text-stone-600 uppercase">Step 02: Encode</div>
            <div className="font-semibold text-stone-900 mt-0.5">OneHotEncoder</div>
            <div className="text-[10px] text-stone-500 mt-1">Categorical features</div>
          </div>

          <div className="bg-white border border-stone-200 rounded p-2 text-stone-700">
            <div className="text-[10px] text-stone-600 uppercase">Step 03: Scale</div>
            <div className="font-semibold text-stone-900 mt-0.5">StandardScaler</div>
            <div className="text-[10px] text-stone-500 mt-1">Age & working hours</div>
          </div>

          <div className="bg-white border border-stone-200 rounded p-2 text-stone-700">
            <div className="text-[10px] text-stone-600 uppercase">Step 04: Classify</div>
            <div className="font-semibold text-stone-900 mt-0.5">Ensemble / LR</div>
            <div className="text-[10px] text-stone-500 mt-1">Stratified CV check</div>
          </div>
        </div>
      </div>

      {/* Interactive Interface */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Education Level</label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value as any)}
              aria-label="Education Level"
              className="w-full text-xs bg-white border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-500"
            >
              <option value="High School">High School / Secondary</option>
              <option value="Bachelors">Bachelors Degree</option>
              <option value="Masters / Doctorate">Masters / Doctorate</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-stone-700">Hours Per Week</span>
              <span className="font-mono text-stone-600">{hoursPerWeek} hrs</span>
            </div>
            <input
              type="range"
              min="15"
              max="70"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
              aria-label="Hours Worked Per Week"
              className="w-full accent-stone-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Work Class</label>
              <select
                value={workclass}
                onChange={(e) => setWorkclass(e.target.value as any)}
                aria-label="Work Class"
                className="w-full text-xs bg-white border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-500"
              >
                <option value="Private Sector">Private Sector</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="State / Gov">State / Gov</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Capital Gains</label>
              <select
                value={capitalGains}
                onChange={(e) => setCapitalGains(e.target.value as any)}
                aria-label="Capital Gains Tier"
                className="w-full text-xs bg-white border border-stone-300 rounded px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-500"
              >
                <option value="None">None ($0)</option>
                <option value="Moderate">Moderate</option>
                <option value="Substantial">Substantial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inference output */}
        <div className="bg-white border border-stone-200 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs text-stone-500 font-mono mb-1">Target Class Outcome</div>
            <div className="text-xl font-bold font-mono text-stone-900 my-1 flex items-center gap-2">
              <span>{pred.tier}</span>
              <span className="text-xs font-normal font-sans px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                Classification
              </span>
            </div>
            <div className="text-xs text-stone-600 mt-2">
              <span className="font-semibold text-stone-800">Key feature contributions:</span>
              <ul className="mt-1 space-y-1 text-[11px] text-stone-600 list-disc list-inside">
                {pred.factors.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-mono">
            Deployed via lightweight Streamlit container
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-stone-200 text-xs text-stone-500 italic">
        Model evaluation metrics available in the project documentation.
      </div>
    </div>
  );
};
