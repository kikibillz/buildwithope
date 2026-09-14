import React, { useState } from 'react';
import { Terminal, Send, CheckCircle2, Copy, Check, Server, Shield, Sparkles, Activity } from 'lucide-react';

export const FastApiServicePreview: React.FC = () => {
  const [endpoint, setEndpoint] = useState<'churn' | 'attrition' | 'health'>('churn');
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(true);
  const [copied, setCopied] = useState(false);

  // Request payloads
  const [churnPayload, setChurnPayload] = useState(
    JSON.stringify(
      {
        customer_id: 'CUST-84920',
        credit_score: 685,
        geography: 'France',
        gender: 'Female',
        age: 44,
        tenure: 5,
        balance: 92450.5,
        num_of_products: 1,
        has_credit_card: 1,
        is_active_member: 0,
        estimated_salary: 82000.0,
      },
      null,
      2
    )
  );

  const [attritionPayload, setAttritionPayload] = useState(
    JSON.stringify(
      {
        employee_id: 'EMP-1042',
        department: 'Sales',
        job_role: 'Sales Executive',
        business_travel: 'Travel_Frequently',
        overtime: 'Yes',
        age: 33,
        monthly_income: 4800,
        job_satisfaction: 2,
        years_at_company: 3,
        stock_option_level: 0,
      },
      null,
      2
    )
  );

  const [responseResult, setResponseResult] = useState({
    statusCode: 200,
    latencyMs: 14.6,
    body: {
      status: 'success',
      model_version: 'xgboost-v2.1.0',
      prediction: 1,
      prediction_label: 'At Risk of Churn',
      probability: 0.7842,
      risk_tier: 'High Risk',
      feature_attributions: {
        age: '+0.34',
        balance_salary_ratio: '+0.28',
        is_active_member: '-0.19',
        num_of_products: '+0.12',
      },
      timestamp: '2026-09-14T16:22:08.120Z',
    },
  });

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);

      if (endpoint === 'churn') {
        setResponseResult({
          statusCode: 200,
          latencyMs: +(11 + Math.random() * 6).toFixed(1),
          body: {
            status: 'success',
            model_version: 'xgboost-v2.1.0',
            prediction: 1,
            prediction_label: 'At Risk of Churn',
            probability: 0.7842,
            risk_tier: 'High Risk',
            feature_attributions: {
              age: '+0.34',
              balance_salary_ratio: '+0.28',
              is_active_member: '-0.19',
              num_of_products: '+0.12',
            },
            timestamp: new Date().toISOString(),
          },
        });
      } else if (endpoint === 'attrition') {
        setResponseResult({
          statusCode: 200,
          latencyMs: +(10 + Math.random() * 5).toFixed(1),
          body: {
            status: 'success',
            model_version: 'randomforest-v1.4.0',
            prediction: 1,
            prediction_label: 'High Departure Hazard',
            probability: 0.812,
            risk_tier: 'Critical',
            feature_attributions: {
              overtime: '+0.41',
              stock_option_level: '-0.29',
              job_satisfaction: '-0.22',
              business_travel: '+0.16',
            },
            timestamp: new Date().toISOString(),
          },
        });
      } else {
        setResponseResult({
          statusCode: 200,
          latencyMs: 3.2,
          body: {
            status: 'healthy',
            api_version: '1.2.0',
            uptime_seconds: 148920,
            models_loaded: ['bank_churn_xgb', 'hr_attrition_rf'],
            workers: 4,
            engine: 'FastAPI + Uvicorn ASGI',
            timestamp: new Date().toISOString(),
          },
        });
      }
    }, 350);
  };

  const getCurlSnippet = () => {
    if (endpoint === 'health') {
      return `curl -X 'GET' 'https://api.buildwithope.dev/api/v1/health' -H 'accept: application/json'`;
    }
    const path = endpoint === 'churn' ? '/predict/churn' : '/predict/attrition';
    const payload = endpoint === 'churn' ? churnPayload : attritionPayload;
    return `curl -X 'POST' \\
  'https://api.buildwithope.dev/api/v1${path}' \\
  -H 'accept: application/json' \\
  -H 'Content-Type: application/json' \\
  -d '${payload.replace(/\n\s*/g, '')}'`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurlSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-lg p-4 sm:p-5 font-sans">
      {/* Top Bar / Swagger Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-teal-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-2xs">
            0.1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wide">
                FastAPI Interactive OpenAPI Console
              </span>
              <span className="text-[10px] font-mono bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 px-1.5 py-0.5 rounded border border-teal-300 dark:border-teal-800">
                Pydantic v2
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-mono">
              Base URL: <code className="text-stone-700 dark:text-stone-300">/api/v1</code> • Async ASGI Service
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white dark:bg-stone-950 p-1 rounded-md border border-stone-200 dark:border-stone-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => setEndpoint('churn')}
            className={`px-2.5 py-1 rounded transition-colors ${
              endpoint === 'churn'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-medium'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            POST /churn
          </button>
          <button
            type="button"
            onClick={() => setEndpoint('attrition')}
            className={`px-2.5 py-1 rounded transition-colors ${
              endpoint === 'attrition'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-medium'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            POST /attrition
          </button>
          <button
            type="button"
            onClick={() => setEndpoint('health')}
            className={`px-2.5 py-1 rounded transition-colors ${
              endpoint === 'health'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-medium'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            GET /health
          </button>
        </div>
      </div>

      {/* Endpoint Path Banner */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span
            className={`font-bold px-2 py-0.5 rounded text-[11px] ${
              endpoint === 'health'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
            }`}
          >
            {endpoint === 'health' ? 'GET' : 'POST'}
          </span>
          <span className="font-semibold text-stone-900 dark:text-stone-100">
            {endpoint === 'churn'
              ? '/api/v1/predict/churn'
              : endpoint === 'attrition'
              ? '/api/v1/predict/attrition'
              : '/api/v1/health'}
          </span>
        </div>

        <button
          type="button"
          onClick={handleExecute}
          disabled={isExecuting}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-700 hover:bg-teal-600 active:bg-teal-800 text-white text-xs font-mono font-medium rounded transition-colors shadow-2xs cursor-pointer"
        >
          <Send className={`w-3 h-3 ${isExecuting ? 'animate-spin' : ''}`} />
          <span>{isExecuting ? 'Inferring...' : 'Execute Request'}</span>
        </button>
      </div>

      {/* Two-Column Request & Response Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Request Body */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              {endpoint === 'health' ? 'Query Parameters (None)' : 'Pydantic Request Payload (JSON)'}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[11px] hover:text-stone-900 dark:hover:text-stone-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied curl' : 'Copy curl'}</span>
            </button>
          </div>

          {endpoint === 'health' ? (
            <div className="p-4 rounded-lg bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 font-mono">
              <p>No request body required for standard liveness and system health probes.</p>
              <p className="mt-2 text-stone-500">FastAPI validates engine status, memory utilization, and active model workers.</p>
            </div>
          ) : (
            <textarea
              value={endpoint === 'churn' ? churnPayload : attritionPayload}
              onChange={(e) =>
                endpoint === 'churn' ? setChurnPayload(e.target.value) : setAttritionPayload(e.target.value)
              }
              rows={11}
              className="w-full bg-[#18181b] text-emerald-400 font-mono text-[11px] p-3 rounded-lg border border-stone-700 focus:outline-none focus:ring-1 focus:ring-teal-500 leading-relaxed resize-none shadow-inner"
              spellCheck={false}
            />
          )}

          <div className="flex items-center gap-2 text-[11px] text-stone-500 font-mono">
            <Shield className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Strict Type Validation: Schema rejects NaN, null, or out-of-range parameters.</span>
          </div>
        </div>

        {/* Right: Response Body */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              Response Payload &amp; Telemetry
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>{responseResult.statusCode} OK</span>
              </span>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                {responseResult.latencyMs}ms
              </span>
            </div>
          </div>

          <div className="bg-[#121214] text-stone-300 font-mono text-[11px] p-3 rounded-lg border border-stone-800 min-h-[220px] overflow-x-auto shadow-inner leading-relaxed">
            <pre className="text-stone-200">
              {JSON.stringify(responseResult.body, null, 2)}
            </pre>
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
            <span>Serialization: JSON via Pydantic</span>
            <span className="text-teal-600 dark:text-teal-400 font-medium">Sub-20ms ASGI Inference</span>
          </div>
        </div>
      </div>
    </div>
  );
};
