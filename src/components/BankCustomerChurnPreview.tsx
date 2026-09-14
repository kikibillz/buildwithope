import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, TrendingDown, RefreshCw } from 'lucide-react';

export const BankCustomerChurnPreview: React.FC = () => {
  const [creditScore, setCreditScore] = useState<number>(640);
  const [age, setAge] = useState<number>(44);
  const [balance, setBalance] = useState<number>(85000);
  const [estimatedSalary, setEstimatedSalary] = useState<number>(65000);
  const [isActiveMember, setIsActiveMember] = useState<boolean>(false);
  const [numOfProducts, setNumOfProducts] = useState<number>(1);

  // Exact engineered feature from user's data_pipeline.py:
  // df['Balance_Salary_Ratio'] = df['Balance'] / (df['EstimatedSalary'] + 1)
  const balanceSalaryRatio = (balance / (estimatedSalary + 1)).toFixed(2);

  // Heuristic reflecting the trained XGBoost + SMOTE decision boundary
  const calculateChurnRisk = () => {
    let risk = 0.15; // baseline

    // Age factor (older demographics in churn datasets exhibit higher churn sensitivity)
    if (age > 50) risk += 0.35;
    else if (age > 40) risk += 0.2;

    // Inactivity factor
    if (!isActiveMember) risk += 0.22;

    // Balance to salary ratio factor
    const ratioNum = parseFloat(balanceSalaryRatio);
    if (ratioNum > 1.5) risk += 0.15;
    if (balance === 0) risk -= 0.05;

    // Number of products (1 product has higher churn than 2; >2 has severe churn)
    if (numOfProducts === 1) risk += 0.1;
    else if (numOfProducts >= 3) risk += 0.35;
    else if (numOfProducts === 2) risk -= 0.15;

    // Credit score impact
    if (creditScore < 580) risk += 0.15;

    const finalPct = Math.min(Math.max(Math.round(risk * 100), 4), 94);
    const willChurn = finalPct >= 50;

    return {
      percentage: finalPct,
      willChurn,
      riskLevel: finalPct >= 65 ? 'HIGH RISK' : finalPct >= 40 ? 'MODERATE RISK' : 'LOW RISK',
      reasons: [
        `Balance-to-Salary Ratio: ${balanceSalaryRatio}x`,
        isActiveMember ? 'Active digital engagement' : 'Dormant / inactive member status',
        `${numOfProducts} product relationship${numOfProducts > 1 ? 's' : ''}`,
      ],
    };
  };

  const outcome = calculateChurnRisk();

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-5 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-200">
        <div>
          <span className="text-xs font-mono font-medium text-stone-600 uppercase tracking-wider">
            Streamlit App Simulation (`app/main_app.py`)
          </span>
          <h4 className="text-sm font-semibold text-stone-900">XGBoost Customer Retention Analyzer</h4>
        </div>
        <span className="text-[11px] font-mono bg-stone-200/80 text-stone-700 px-2 py-0.5 rounded">
          SMOTE Resampled
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Controls */}
        <div className="space-y-3 text-xs">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium text-stone-700">Customer Age</span>
              <span className="font-mono text-stone-600">{age} yrs</span>
            </div>
            <input
              type="range"
              min="20"
              max="75"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              aria-label="Customer Age"
              className="w-full accent-stone-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-stone-700">Credit Score</span>
                <span className="font-mono text-stone-600">{creditScore}</span>
              </div>
              <input
                type="range"
                min="400"
                max="850"
                step="10"
                value={creditScore}
                onChange={(e) => setCreditScore(parseInt(e.target.value))}
                aria-label="Credit Score"
                className="w-full accent-stone-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium text-stone-700">Products</span>
                <span className="font-mono text-stone-600">{numOfProducts}</span>
              </div>
              <select
                value={numOfProducts}
                onChange={(e) => setNumOfProducts(parseInt(e.target.value))}
                aria-label="Number of Products"
                className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-stone-800"
              >
                <option value={1}>1 Product</option>
                <option value={2}>2 Products</option>
                <option value={3}>3 Products</option>
                <option value={4}>4 Products</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Account Balance</label>
              <select
                value={balance}
                onChange={(e) => setBalance(parseInt(e.target.value))}
                aria-label="Account Balance"
                className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-stone-800"
              >
                <option value={0}>$0 (Zero balance)</option>
                <option value={45000}>$45,000</option>
                <option value={85000}>$85,000</option>
                <option value={140000}>$140,000</option>
              </select>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1">Est. Annual Salary</label>
              <select
                value={estimatedSalary}
                onChange={(e) => setEstimatedSalary(parseInt(e.target.value))}
                aria-label="Estimated Annual Salary"
                className="w-full bg-white border border-stone-300 rounded px-2 py-1 text-stone-800"
              >
                <option value={35000}>$35,000</option>
                <option value={65000}>$65,000</option>
                <option value={110000}>$110,000</option>
              </select>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <span className="text-stone-700 font-medium">Active Member Status:</span>
            <button
              onClick={() => setIsActiveMember(!isActiveMember)}
              className={`text-xs px-2.5 py-1 rounded border font-mono transition-colors ${
                isActiveMember
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                  : 'bg-stone-100 text-stone-700 border-stone-300'
              }`}
            >
              {isActiveMember ? 'Active Member' : 'Inactive Member'}
            </button>
          </div>
        </div>

        {/* Prediction Results */}
        <div className="bg-white border border-stone-200 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-stone-500 font-mono">XGBoost Churn Likelihood</span>
              <span className="text-[10px] font-mono text-stone-400">joblib.load(&apos;models/churn_model.pkl&apos;)</span>
            </div>

            <div className="flex items-baseline gap-3 my-2">
              <span className="text-2xl font-bold font-mono text-stone-900">
                {outcome.percentage}%
              </span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${
                  outcome.willChurn
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                {outcome.riskLevel}
              </span>
            </div>

            {/* Visual Probability Bar */}
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  outcome.willChurn ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${outcome.percentage}%` }}
              />
            </div>

            <div className="text-xs text-stone-600">
              <span className="font-semibold text-stone-800">Engineered Feature Analysis:</span>
              <ul className="mt-1 space-y-0.5 text-[11px] text-stone-600 list-disc list-inside">
                {outcome.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 font-mono flex items-center justify-between">
            <span>Class Weight: Balanced (SMOTE)</span>
            <span className="text-stone-400">Model: XGBClassifier</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500">
        <span className="italic flex items-center gap-1.5">
          <span>Model evaluation metrics available in the project documentation.</span>
          <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            Synthetic Benchmark • Zero Customer PII
          </span>
        </span>
        <button
          onClick={() => {
            setCreditScore(640);
            setAge(44);
            setBalance(85000);
            setEstimatedSalary(65000);
            setIsActiveMember(false);
            setNumOfProducts(1);
          }}
          className="text-stone-600 hover:text-stone-900 inline-flex items-center gap-1 font-mono text-[11px]"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset simulation</span>
        </button>
      </div>
    </div>
  );
};
