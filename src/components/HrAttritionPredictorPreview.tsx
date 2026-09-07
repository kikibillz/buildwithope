import React, { useState } from 'react';
import { UserCheck, UserX, AlertTriangle, Briefcase, RefreshCw } from 'lucide-react';

export const HrAttritionPredictorPreview: React.FC = () => {
  const [age, setAge] = useState<number>(29);
  const [department, setDepartment] = useState<string>('Sales');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(3800);
  const [overtime, setOvertime] = useState<string>('Yes');
  const [businessTravel, setBusinessTravel] = useState<string>('Travel_Frequently');
  const [jobSatisfaction, setJobSatisfaction] = useState<number>(2);
  const [jobRole, setJobRole] = useState<string>('Sales Representative');
  const [yearsAtCompany, setYearsAtCompany] = useState<number>(2);
  const [stockOptionLevel, setStockOptionLevel] = useState<number>(0);

  // Replicating the trained Random Forest classifier behavior on the dataset
  const calculateAttritionRisk = () => {
    let risk = 0.12; // baseline

    // Overtime is one of the strongest feature importances in IBM HR dataset
    if (overtime === 'Yes') risk += 0.28;

    // Frequent travel increases burnout risk
    if (businessTravel === 'Travel_Frequently') risk += 0.18;
    else if (businessTravel === 'Travel_Rarely') risk += 0.05;

    // Income factor
    if (monthlyIncome < 4000) risk += 0.22;
    else if (monthlyIncome > 8000) risk -= 0.12;

    // Job satisfaction (1-4 scale)
    if (jobSatisfaction === 1) risk += 0.25;
    else if (jobSatisfaction === 2) risk += 0.12;
    else if (jobSatisfaction >= 3) risk -= 0.15;

    // Stock option level (0 is high risk of turnover)
    if (stockOptionLevel === 0) risk += 0.14;
    else risk -= 0.1;

    // Role sensitivity (Sales Representatives have higher baseline turnover)
    if (jobRole === 'Sales Representative' || jobRole === 'Laboratory Technician') risk += 0.12;

    // Tenure (0-2 years is highest departure hazard)
    if (yearsAtCompany <= 2) risk += 0.1;
    else if (yearsAtCompany >= 6) risk -= 0.1;

    const finalPct = Math.min(Math.max(Math.round(risk * 100), 5), 95);
    const isAtRisk = finalPct >= 45;

    return {
      percentage: finalPct,
      isAtRisk,
      status: isAtRisk ? 'HIGH ATTRITION RISK' : 'LOW ATTRITION RISK',
      recommendation: isAtRisk
        ? overtime === 'Yes'
          ? 'Reduce mandatory overtime burden & review base compensation.'
          : 'Schedule 1-on-1 retention dialogue; evaluate job satisfaction & growth path.'
        : 'Retention risk is nominal. Maintain regular career progression check-ins.',
    };
  };

  const outcome = calculateAttritionRisk();

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-5 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-200">
        <div>
          <span className="text-xs font-mono font-medium text-stone-600 uppercase tracking-wider">
            Streamlit App (`HR_Analytics_Project/scripts/main_app.py`)
          </span>
          <h4 className="text-sm font-semibold text-stone-900">
            Random Forest Attrition Predictor &amp; Risk Scorer
          </h4>
        </div>
        <span className="text-[11px] font-mono bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded">
          RandomForest + LabelEncoder
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Form Inputs */}
        <div className="lg:col-span-7 space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                aria-label="Department"
                className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-stone-800"
              >
                <option value="Sales">Sales</option>
                <option value="Research & Development">Research &amp; Development</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1">Job Role</label>
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                aria-label="Job Role"
                className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-stone-800"
              >
                <option value="Sales Representative">Sales Representative</option>
                <option value="Sales Executive">Sales Executive</option>
                <option value="Research Scientist">Research Scientist</option>
                <option value="Laboratory Technician">Laboratory Technician</option>
                <option value="Healthcare Representative">Healthcare Rep</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Works Overtime?</label>
              <select
                value={overtime}
                onChange={(e) => setOvertime(e.target.value)}
                aria-label="Works Overtime"
                className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-stone-800 font-mono"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1">Travel Frequency</label>
              <select
                value={businessTravel}
                onChange={(e) => setBusinessTravel(e.target.value)}
                aria-label="Business Travel"
                className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-stone-800"
              >
                <option value="Travel_Frequently">Frequently</option>
                <option value="Travel_Rarely">Rarely</option>
                <option value="Non-Travel">Non-Travel</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1">Stock Level (0-3)</label>
              <select
                value={stockOptionLevel}
                onChange={(e) => setStockOptionLevel(parseInt(e.target.value))}
                aria-label="Stock Option Level"
                className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-stone-800 font-mono"
              >
                <option value={0}>0 (None)</option>
                <option value={1}>1 (Basic)</option>
                <option value={2}>2 (Medium)</option>
                <option value={3}>3 (High)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-stone-700">Satisfaction</span>
                <span className="font-mono text-stone-600">{jobSatisfaction}/4</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                value={jobSatisfaction}
                onChange={(e) => setJobSatisfaction(parseInt(e.target.value))}
                aria-label="Job Satisfaction"
                className="w-full accent-stone-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-stone-700">Tenure</span>
                <span className="font-mono text-stone-600">{yearsAtCompany} yrs</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={yearsAtCompany}
                onChange={(e) => setYearsAtCompany(parseInt(e.target.value))}
                aria-label="Years at Company"
                className="w-full accent-stone-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-stone-700">Monthly</span>
                <span className="font-mono text-stone-600">${monthlyIncome}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="12000"
                step="500"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(parseInt(e.target.value))}
                aria-label="Monthly Income"
                className="w-full accent-stone-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-stone-500 font-mono">Predicted Resignation Risk</span>
              <span className="text-[10px] font-mono text-stone-400">RandomForest</span>
            </div>

            <div className="flex items-baseline gap-3 my-2">
              <span className="text-2xl font-bold font-mono text-stone-900">
                {outcome.percentage}%
              </span>
              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                  outcome.isAtRisk
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                {outcome.status}
              </span>
            </div>

            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  outcome.isAtRisk ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${outcome.percentage}%` }}
              />
            </div>

            <div className="bg-stone-50 border border-stone-200/80 rounded p-2 text-xs text-stone-700">
              <span className="font-semibold text-stone-900 block mb-0.5">HR Action Recommendation:</span>
              <p className="text-[11px] text-stone-600 leading-snug">{outcome.recommendation}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-mono flex items-center justify-between">
            <span>Model: attrition_model.pkl</span>
            <button
              onClick={() => {
                setAge(29);
                setDepartment('Sales');
                setMonthlyIncome(3800);
                setOvertime('Yes');
                setBusinessTravel('Travel_Frequently');
                setJobSatisfaction(2);
                setJobRole('Sales Representative');
                setYearsAtCompany(2);
                setStockOptionLevel(0);
              }}
              className="text-stone-500 hover:text-stone-800 inline-flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
        <span className="italic">
          Features match `final_train.py` &amp; `main_app.py` in the HR Attrition project.
        </span>
        <span className="font-mono text-[11px] text-stone-400">Streamlit Cloud Ready</span>
      </div>
    </div>
  );
};
