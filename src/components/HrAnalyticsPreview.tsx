import React, { useState } from 'react';
import { Users, DollarSign, Clock, UserMinus } from 'lucide-react';

interface DeptMetric {
  name: string;
  headcount: number;
  pctOfTotal: number;
  medianSalary: string;
  avgTenure: string;
  attritionRate: number;
  turnoverRisk: 'Low' | 'Moderate' | 'Elevated';
}

const sampleDeptMetrics: DeptMetric[] = [
  {
    name: 'Engineering',
    headcount: 142,
    pctOfTotal: 34,
    medianSalary: '$118k',
    avgTenure: '2.8 yrs',
    attritionRate: 8.4,
    turnoverRisk: 'Low',
  },
  {
    name: 'Operations',
    headcount: 110,
    pctOfTotal: 26,
    medianSalary: '$74k',
    avgTenure: '3.4 yrs',
    attritionRate: 14.1,
    turnoverRisk: 'Moderate',
  },
  {
    name: 'Sales & BD',
    headcount: 86,
    pctOfTotal: 20,
    medianSalary: '$92k',
    avgTenure: '1.7 yrs',
    attritionRate: 21.3,
    turnoverRisk: 'Elevated',
  },
  {
    name: 'Customer Success',
    headcount: 52,
    pctOfTotal: 12,
    medianSalary: '$68k',
    avgTenure: '2.1 yrs',
    attritionRate: 16.8,
    turnoverRisk: 'Moderate',
  },
  {
    name: 'Product & Design',
    headcount: 34,
    pctOfTotal: 8,
    medianSalary: '$112k',
    avgTenure: '2.4 yrs',
    attritionRate: 9.1,
    turnoverRisk: 'Low',
  },
];

export const HrAnalyticsPreview: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('Sales & BD');

  const current = sampleDeptMetrics.find((d) => d.name === selectedDept) || sampleDeptMetrics[0];

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-5 font-sans">
      {/* Top Banner with Sample Dataset notice */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded">
            Sample Dataset
          </span>
          <span className="text-xs text-stone-600 font-mono">N = 424 employees</span>
        </div>
        <div className="text-xs text-stone-500 font-mono">
          Seaborn & Plotly Pipeline
        </div>
      </div>

      {/* Interactive Department Selector */}
      <div className="mb-4">
        <div className="text-xs font-medium text-stone-700 mb-1.5">Select Department Cohort:</div>
        <div className="flex flex-wrap gap-1.5">
          {sampleDeptMetrics.map((dept) => (
            <button
              key={dept.name}
              onClick={() => setSelectedDept(dept.name)}
              className={`text-xs px-2.5 py-1 rounded transition-colors ${
                selectedDept === dept.name
                  ? 'bg-stone-900 text-white font-medium'
                  : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Metric Cards for Selected Department */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
        <div className="bg-white border border-stone-200 rounded p-3">
          <div className="flex items-center gap-1.5 text-stone-500 text-[11px] mb-1">
            <Users className="w-3.5 h-3.5 text-stone-500" />
            <span>Headcount</span>
          </div>
          <div className="text-lg font-bold font-mono text-stone-900">{current.headcount}</div>
          <div className="text-[10px] text-stone-500">{current.pctOfTotal}% of organization</div>
        </div>

        <div className="bg-white border border-stone-200 rounded p-3">
          <div className="flex items-center gap-1.5 text-stone-500 text-[11px] mb-1">
            <DollarSign className="w-3.5 h-3.5 text-stone-500" />
            <span>Median Salary</span>
          </div>
          <div className="text-lg font-bold font-mono text-stone-900">{current.medianSalary}</div>
          <div className="text-[10px] text-stone-500">Department midpoint</div>
        </div>

        <div className="bg-white border border-stone-200 rounded p-3">
          <div className="flex items-center gap-1.5 text-stone-500 text-[11px] mb-1">
            <Clock className="w-3.5 h-3.5 text-stone-500" />
            <span>Avg Tenure</span>
          </div>
          <div className="text-lg font-bold font-mono text-stone-900">{current.avgTenure}</div>
          <div className="text-[10px] text-stone-500">Retention marker</div>
        </div>

        <div className="bg-white border border-stone-200 rounded p-3">
          <div className="flex items-center gap-1.5 text-stone-500 text-[11px] mb-1">
            <UserMinus className="w-3.5 h-3.5 text-stone-500" />
            <span>Attrition Rate</span>
          </div>
          <div className="text-lg font-bold font-mono text-stone-900">{current.attritionRate}%</div>
          <div className="text-[10px] text-stone-500">Annualized turnover</div>
        </div>
      </div>

      {/* Comparative Visual Bars */}
      <div className="bg-white border border-stone-200 rounded p-3.5 space-y-3">
        <div className="text-xs font-semibold text-stone-800 flex justify-between items-center">
          <span>Comparative Department Attrition Rates (Sample Data)</span>
          <span className="text-[10px] font-mono text-stone-500">Benchmark: 13.5% Org Avg</span>
        </div>

        <div className="space-y-2">
          {sampleDeptMetrics.map((dept) => {
            const isSelected = dept.name === selectedDept;
            const barWidth = `${(dept.attritionRate / 25) * 100}%`;
            return (
              <div key={dept.name} className="text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className={`font-mono ${isSelected ? 'font-bold text-stone-950' : 'text-stone-700'}`}>
                    {dept.name} {isSelected && '•'}
                  </span>
                  <span className="font-mono text-stone-600 text-[11px]">{dept.attritionRate}%</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      dept.attritionRate > 18
                        ? 'bg-rose-500'
                        : dept.attritionRate > 12
                        ? 'bg-amber-500'
                        : 'bg-emerald-600'
                    }`}
                    style={{ width: barWidth }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
          <span>Analyzed factors: tenure, compensation tier, overtime frequency</span>
          <span className="font-mono text-[10px]">Cleaned via Pandas</span>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-stone-500 italic">
        Dataset clearly designated as sample data for exploratory research and dashboard development.
      </div>
    </div>
  );
};
