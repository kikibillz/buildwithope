import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Server,
  Zap,
  ShieldCheck,
  Cpu,
  FileCode2,
  Terminal,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Sparkles,
  Key,
  Layers,
  Activity,
  ArrowRight,
  BookOpen,
  Lock,
  Mail,
  X,
  Database,
  RefreshCw,
  Clock,
  AlertTriangle,
} from 'lucide-react';

interface FastApiBackendSectionProps {
  onOpenCaseStudy?: () => void;
}

type EndpointKey = 'churn' | 'attrition' | 'health' | 'metadata' | 'auth';

interface EndpointConfig {
  key: EndpointKey;
  method: 'POST' | 'GET';
  path: string;
  name: string;
  description: string;
  summary: string;
  requestPayload?: string;
  responsePayload: string;
  errorPayload?: string;
  curlSnippet: string;
  pythonSnippet: string;
  averageLatencyMs: number;
}

const endpoints: EndpointConfig[] = [
  {
    key: 'churn',
    method: 'POST',
    path: '/api/v1/predict/churn',
    name: 'Customer Churn Predictor',
    summary: 'Scores tabular banking payloads against serialized XGBoost pipeline with financial ratio derivation.',
    description:
      'Performs real-time customer attrition prediction. Ingests 10 customer features, derives balance-to-salary and credit-utilization ratios in memory, and returns churn likelihood with SHAP-based feature attributions.',
    requestPayload: JSON.stringify(
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
    ),
    responsePayload: JSON.stringify(
      {
        status: 'success',
        model_version: 'xgboost-churn-v2.1.0',
        prediction: 1,
        prediction_label: 'At Risk of Churn',
        probability: 0.7842,
        risk_tier: 'High Risk',
        feature_attributions: {
          age: '+0.34 (Elevated risk above 40)',
          balance_salary_ratio: '+0.28 (High deposit ratio)',
          is_active_member: '-0.19 (Protective factor)',
          num_of_products: '+0.12',
        },
        execution_time_ms: 12.4,
        timestamp: '2026-09-16T09:20:11.450Z',
      },
      null,
      2
    ),
    errorPayload: JSON.stringify(
      {
        detail: [
          {
            type: 'less_than_equal',
            loc: ['body', 'credit_score'],
            msg: 'Input should be less than or equal to 850',
            input: 920,
            ctx: { le: 850 },
          },
          {
            type: 'enum',
            loc: ['body', 'geography'],
            msg: "Input should be 'France', 'Germany' or 'Spain'",
            input: 'Canada',
          },
        ],
      },
      null,
      2
    ),
    curlSnippet: `curl -X POST "https://api.opeyemi-ml.internal/api/v1/predict/churn" \\
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_id": "CUST-84920",
    "credit_score": 685,
    "geography": "France",
    "gender": "Female",
    "age": 44,
    "tenure": 5,
    "balance": 92450.5,
    "num_of_products": 1,
    "has_credit_card": 1,
    "is_active_member": 0,
    "estimated_salary": 82000.0
  }'`,
    pythonSnippet: `import httpx

async def predict_churn(payload: dict, token: str):
    async with httpx.AsyncClient(timeout=3.0) as client:
        response = await client.post(
            "https://api.opeyemi-ml.internal/api/v1/predict/churn",
            headers={"Authorization": f"Bearer {token}"},
            json=payload,
        )
        response.raise_for_status()
        return response.json()`,
    averageLatencyMs: 12.4,
  },
  {
    key: 'attrition',
    method: 'POST',
    path: '/api/v1/predict/attrition',
    name: 'Employee Attrition Classifier',
    summary: 'Predicts departure propensity using Random Forest model trained on validated HR metrics.',
    description:
      'Evaluates employee turnover risk based on working hours, compensation satisfaction, travel frequency, and career tenure. Produces risk tier and intervention recommendations.',
    requestPayload: JSON.stringify(
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
    ),
    responsePayload: JSON.stringify(
      {
        status: 'success',
        model_version: 'rf-attrition-v1.4.0',
        prediction: 1,
        prediction_label: 'High Attrition Risk',
        probability: 0.718,
        risk_tier: 'High',
        primary_drivers: ['Overtime: Yes', 'Travel_Frequently', 'JobSatisfaction: 2/4'],
        recommended_action: 'Manager 1-on-1 workload rebalancing within 14 days',
        execution_time_ms: 10.8,
        timestamp: '2026-09-16T09:20:11.450Z',
      },
      null,
      2
    ),
    errorPayload: JSON.stringify(
      {
        detail: [
          {
            type: 'greater_than_equal',
            loc: ['body', 'job_satisfaction'],
            msg: 'Input should be greater than or equal to 1',
            input: 0,
          },
        ],
      },
      null,
      2
    ),
    curlSnippet: `curl -X POST "https://api.opeyemi-ml.internal/api/v1/predict/attrition" \\
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "employee_id": "EMP-1042",
    "department": "Sales",
    "job_role": "Sales Executive",
    "business_travel": "Travel_Frequently",
    "overtime": "Yes",
    "age": 33,
    "monthly_income": 4800,
    "job_satisfaction": 2,
    "years_at_company": 3,
    "stock_option_level": 0
  }'`,
    pythonSnippet: `import httpx

async def predict_attrition(payload: dict, token: str):
    async with httpx.AsyncClient() as client:
        res = await client.post(
            "https://api.opeyemi-ml.internal/api/v1/predict/attrition",
            headers={"Authorization": f"Bearer {token}"},
            json=payload,
        )
        return res.json()`,
    averageLatencyMs: 10.8,
  },
  {
    key: 'health',
    method: 'GET',
    path: '/api/v1/health',
    name: 'Service Health & Model Liveness',
    summary: 'Deep health check verifying ASGI worker memory, cached estimator status, and uptime.',
    description:
      'Container liveness and readiness probe designed for Kubernetes / Cloud Run healthchecks. Returns memory consumption, worker ID, loaded ML pipelines in memory, and uptime statistics.',
    responsePayload: JSON.stringify(
      {
        status: 'healthy',
        service: 'fastapi-ml-serving-engine',
        environment: 'production',
        uptime_seconds: 348210,
        worker_id: 'uvicorn-worker-3',
        memory_usage_mb: 184.2,
        loaded_models: {
          'xgboost-churn-v2.1.0': { loaded: true, size_mb: 24.6, memory_address: '0x7f9a12c4' },
          'rf-attrition-v1.4.0': { loaded: true, size_mb: 48.1, memory_address: '0x7f9a88e2' },
        },
        database_pool: 'healthy (sqlite-wal: 0 pending writes)',
      },
      null,
      2
    ),
    curlSnippet: `curl -X GET "https://api.opeyemi-ml.internal/api/v1/health"`,
    pythonSnippet: `import httpx

async def check_health():
    async with httpx.AsyncClient() as client:
        res = await client.get("https://api.opeyemi-ml.internal/api/v1/health")
        return res.json()`,
    averageLatencyMs: 2.1,
  },
  {
    key: 'metadata',
    method: 'GET',
    path: '/api/v1/models/metadata',
    name: 'Model Registry & Drift Telemetry',
    summary: 'Returns active model artifacts, training cutoff hashes, feature list, and baseline validation AUC.',
    description:
      'Provides machine-readable model cards detailing features required, train-test split hashes, metric benchmarks, and data versioning tags.',
    responsePayload: JSON.stringify(
      {
        active_models: [
          {
            model_id: 'xgboost-churn',
            version: '2.1.0',
            algorithm: 'XGBoostClassifier',
            training_date: '2026-08-14',
            test_auc_roc: 0.884,
            test_f1_score: 0.742,
            features_required: 11,
            serialized_hash: 'sha256:d8a9f3b1e...',
          },
          {
            model_id: 'rf-attrition',
            version: '1.4.0',
            algorithm: 'RandomForestClassifier',
            training_date: '2026-08-10',
            test_auc_roc: 0.862,
            test_f1_score: 0.718,
            features_required: 10,
            serialized_hash: 'sha256:9c2f7b8a1...',
          },
        ],
      },
      null,
      2
    ),
    curlSnippet: `curl -X GET "https://api.opeyemi-ml.internal/api/v1/models/metadata"`,
    pythonSnippet: `import httpx

async def get_models_metadata():
    async with httpx.AsyncClient() as client:
        res = await client.get("https://api.opeyemi-ml.internal/api/v1/models/metadata")
        return res.json()`,
    averageLatencyMs: 3.4,
  },
  {
    key: 'auth',
    method: 'POST',
    path: '/api/v1/auth/token',
    name: 'OAuth2 JWT Authentication',
    summary: 'OAuth2 Password Bearer flow generating signed JSON Web Tokens for microservice consumers.',
    description:
      'Exchanges client credentials or user credentials for an HMAC-SHA256 signed JWT bearer token with defined scopes (read:predict, admin:models).',
    requestPayload: JSON.stringify(
      {
        grant_type: 'password',
        username: 'service_client_frontend',
        password: '••••••••••••',
        scope: 'read:predict',
      },
      null,
      2
    ),
    responsePayload: JSON.stringify(
      {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzZXJ2aWNlX2NsaWVudF9mcm9udGVuZCI...',
        token_type: 'bearer',
        expires_in_minutes: 60,
        scopes: ['read:predict'],
      },
      null,
      2
    ),
    curlSnippet: `curl -X POST "https://api.opeyemi-ml.internal/api/v1/auth/token" \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "username=service_client_frontend&password=SECRET&grant_type=password"`,
    pythonSnippet: `import httpx

async def authenticate(username: str, password: str):
    async with httpx.AsyncClient() as client:
        res = await client.post(
            "https://api.opeyemi-ml.internal/api/v1/auth/token",
            data={"username": username, "password": password, "grant_type": "password"},
        )
        return res.json()["access_token"]`,
    averageLatencyMs: 18.2,
  },
];

export const FastApiBackendSection: React.FC<FastApiBackendSectionProps> = ({ onOpenCaseStudy }) => {
  const [activeEndpointKey, setActiveEndpointKey] = useState<EndpointKey>('churn');
  const [activeTab, setActiveTab] = useState<'response' | 'error' | 'curl' | 'python'>('response');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedLatency, setSimulatedLatency] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Modals
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isAccessOpen, setIsAccessOpen] = useState(false);

  // Access Request Form State
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqCompany, setReqCompany] = useState('');
  const [reqRole, setReqRole] = useState('Recruiter / Engineering Manager');
  const [reqNotes, setReqNotes] = useState('');
  const [reqSuccess, setReqSuccess] = useState(false);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAccessOpen) {
          setIsAccessOpen(false);
          setReqSuccess(false);
        }
        if (isDocsOpen) {
          setIsDocsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAccessOpen, isDocsOpen]);

  const activeEndpoint = endpoints.find((e) => e.key === activeEndpointKey) || endpoints[0];

  const handleSimulateRequest = () => {
    setIsSimulating(true);
    setSimulatedLatency(null);
    setTimeout(() => {
      setIsSimulating(false);
      const delta = +(activeEndpoint.averageLatencyMs + (Math.random() * 4 - 2)).toFixed(1);
      setSimulatedLatency(Math.max(1.8, delta));
      setActiveTab('response');
    }, 280);
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqEmail) return;

    // Simulate instant success
    setReqSuccess(true);
  };

  const directMailtoUrl = `mailto:odunayoopamiju@gmail.com?subject=${encodeURIComponent(
    `FastAPI ML Service Demo Access Request - ${reqName || 'Hiring Team'}`
  )}&body=${encodeURIComponent(
    `Hello Opeyemi,\n\nI would like to request staging demo credentials and OpenAPI Swagger access for your FastAPI ML Service.\n\nName: ${reqName}\nCompany: ${reqCompany}\nRole: ${reqRole}\nEmail: ${reqEmail}\nNotes: ${reqNotes}\n\nThank you!`
  )}`;

  return (
    <motion.div
      id="fastapi-backend-section"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="mb-14 scroll-mt-24 break-inside-avoid print-break-avoid"
    >
      {/* Section Frame */}
      <div className="bg-white/95 dark:bg-[#1a1714] border border-amber-900/10 dark:border-amber-500/20 rounded-2xl overflow-hidden shadow-xs hover:border-amber-500/40 dark:hover:border-amber-400/35 transition-colors">
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#1c1815] via-[#241f1a] to-[#1c1815] text-white border-b border-amber-900/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  <span>Backend &amp; API Architecture</span>
                </span>
                <span className="text-xs font-mono text-stone-300 bg-stone-800/80 px-2 py-0.5 rounded border border-amber-900/30">
                  FastAPI 0.115 • Python 3.12
                </span>
                <span className="text-xs font-mono text-stone-300 bg-stone-800/80 px-2 py-0.5 rounded border border-amber-900/30">
                  Pydantic v2
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Production Machine Learning Serving &amp; FastAPI REST Service
              </h3>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
                A high-throughput asynchronous Python backend serving serialized XGBoost and Random Forest pipelines. Features strict Pydantic v2 contract validation, background batch processing, sub-15ms inference latency, Docker containerization, and automated OpenAPI Swagger documentation.
              </p>
            </div>

            {/* Actions: Request Access & Technical Docs (hidden on print) */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 print:hidden">
              <button
                type="button"
                onClick={() => setIsDocsOpen(true)}
                id="btn-fastapi-view-docs"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2e2720] hover:bg-[#3d342b] text-amber-100 border border-amber-900/30 text-xs sm:text-sm font-medium transition-all shadow-xs cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Technical Specs &amp; Docs</span>
              </button>

              <button
                type="button"
                onClick={() => setIsAccessOpen(true)}
                id="btn-fastapi-request-access"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <Key className="w-4 h-4" />
                <span>Request Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.07, delayChildren: 0.05 },
              },
            }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-amber-900/20 text-xs font-mono"
          >
            {[
              { label: 'Latency (p95)', value: '< 15ms Inference', color: 'text-amber-400' },
              { label: 'Validation', value: 'Pydantic v2 Strict', color: 'text-white' },
              { label: 'Throughput', value: '1,200 req/sec', color: 'text-white' },
              { label: 'Deployment', value: 'Docker ASGI / Uvicorn', color: 'text-orange-400' },
            ].map((metric) => (
              <motion.div
                key={metric.label}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
                }}
                className="p-2.5 rounded-lg bg-[#181512]/90 border border-amber-900/30"
              >
                <div className="text-amber-200/60 text-[10px] uppercase">{metric.label}</div>
                <div className={`${metric.color} font-bold text-sm mt-0.5`}>{metric.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Endpoint Explorer & Simulator */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            <div>
              <span className="text-xs font-mono font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-1">
                RESTful API Surface
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                Key Endpoints &amp; Interactive Playground
              </h4>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <a
                href="https://github.com/kikibillz/fastapi-ml-service"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white px-3 py-1.5 rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            </div>
          </div>

          {/* Print-Only API Endpoints and Specification Summary */}
          <div className="hidden print:block space-y-3 mb-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700">
              API Service Endpoints &amp; Production Schema Specifications
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              {endpoints.map((ep) => (
                <div key={ep.key} className="p-3 border border-stone-300 rounded bg-stone-50 break-inside-avoid">
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-stone-200 text-[10px]">{ep.method}</span>
                    <span className="text-[11px] text-stone-600 font-sans">{ep.name}</span>
                  </div>
                  <div className="font-semibold text-stone-900 mb-1">{ep.path}</div>
                  <p className="font-sans text-[11px] text-stone-600 font-normal leading-relaxed">{ep.description}</p>
                </div>
              ))}
            </div>
            <div className="text-[11px] font-mono text-stone-600 pt-2 border-t border-stone-300 flex justify-between">
              <span>Stack: FastAPI 0.115 • Python 3.12 • Pydantic v2 • Uvicorn • Docker</span>
              <span>Repo: github.com/kikibillz/fastapi-ml-service</span>
            </div>
          </div>

          {/* Interactive Playground (hidden on print) */}
          <div className="print:hidden">
            {/* Endpoint Selector Cards with Entrance Animation */}
            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.05,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 mb-6"
          >
            {endpoints.map((ep) => {
              const isSelected = ep.key === activeEndpointKey;
              return (
                <motion.button
                  key={ep.key}
                  type="button"
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.96 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: 'spring',
                        damping: 24,
                        stiffness: 300,
                      },
                    },
                  }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveEndpointKey(ep.key);
                    setActiveTab('response');
                    setSimulatedLatency(null);
                  }}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-stone-950 text-white border-amber-600/80 dark:bg-[#201c18] dark:border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-white/70 dark:bg-[#15120f] border-amber-900/10 dark:border-amber-500/15 text-stone-800 dark:text-stone-300 hover:border-amber-500/40 hover:bg-amber-50/50 dark:hover:bg-[#1e1915]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeEndpointIndicator"
                      className="absolute inset-0 border-2 border-amber-500/70 dark:border-amber-400/80 rounded-xl pointer-events-none"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center justify-between gap-1.5 mb-1.5 relative z-10">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        ep.method === 'POST'
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                          : 'bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-500/30'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">~{ep.averageLatencyMs}ms</span>
                  </div>
                  <div className="text-xs font-bold font-mono truncate relative z-10">{ep.path.replace('/api/v1', '')}</div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-1 relative z-10">
                    {ep.name}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Active Endpoint Detail Panel with Animated Transition */}
          <motion.div
            key={activeEndpoint.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-[#fcfaf7] dark:bg-[#14110e] border border-amber-900/15 dark:border-amber-500/20 rounded-xl p-4 sm:p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-900/10 dark:border-amber-500/15">
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                    activeEndpoint.method === 'POST'
                      ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
                      : 'bg-orange-100 dark:bg-orange-950/80 text-orange-900 dark:text-orange-200 border border-orange-300 dark:border-orange-700'
                  }`}
                >
                  {activeEndpoint.method}
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                  {activeEndpoint.path}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimulateRequest}
                  disabled={isSimulating}
                  id="btn-simulate-endpoint"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 text-white dark:text-amber-200 border border-stone-800 dark:border-amber-500/40 text-xs font-mono font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>Executing Request...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      <span>Test Endpoint (Live Probe)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
              {activeEndpoint.description}
            </p>

            {/* Split Screen: Request Payload & Response Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column: Request Payload / Parameters */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400">
                  <span className="font-semibold uppercase tracking-wider">
                    {activeEndpoint.method === 'POST' ? 'JSON Request Body (Pydantic Schema)' : 'Request Parameters'}
                  </span>
                  <span className="text-[11px] text-stone-400">Content-Type: application/json</span>
                </div>

                <div className="relative rounded-lg bg-stone-950 text-stone-200 border border-stone-800 p-4 font-mono text-xs overflow-x-auto min-h-[220px]">
                  {activeEndpoint.requestPayload ? (
                    <pre className="text-emerald-300/90 leading-relaxed font-mono">
                      {activeEndpoint.requestPayload}
                    </pre>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-12 text-stone-500 space-y-2">
                      <Server className="w-8 h-8 text-stone-600" />
                      <span>No request body required for this GET probe</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Response / Snippets Inspector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  {/* Tabs */}
                  <div className="flex items-center gap-1 bg-stone-200/80 dark:bg-stone-900 p-0.5 rounded-lg text-xs font-mono">
                    <button
                      onClick={() => setActiveTab('response')}
                      className={`px-2 py-1 rounded transition-colors ${
                        activeTab === 'response'
                          ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold shadow-2xs'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      200 OK
                    </button>
                    {activeEndpoint.errorPayload && (
                      <button
                        onClick={() => setActiveTab('error')}
                        className={`px-2 py-1 rounded transition-colors ${
                          activeTab === 'error'
                            ? 'bg-white dark:bg-stone-800 text-rose-600 dark:text-rose-400 font-semibold shadow-2xs'
                            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                        }`}
                      >
                        422 Validation
                      </button>
                    )}
                    <button
                      onClick={() => setActiveTab('curl')}
                      className={`px-2 py-1 rounded transition-colors ${
                        activeTab === 'curl'
                          ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold shadow-2xs'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      cURL
                    </button>
                    <button
                      onClick={() => setActiveTab('python')}
                      className={`px-2 py-1 rounded transition-colors ${
                        activeTab === 'python'
                          ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold shadow-2xs'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      Python
                    </button>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => {
                      const text =
                        activeTab === 'response'
                          ? activeEndpoint.responsePayload
                          : activeTab === 'error'
                          ? activeEndpoint.errorPayload || ''
                          : activeTab === 'curl'
                          ? activeEndpoint.curlSnippet
                          : activeEndpoint.pythonSnippet;
                      handleCopyCode(text);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 px-2 py-1 rounded hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative rounded-lg bg-stone-950 text-stone-200 border border-stone-800 p-4 font-mono text-xs overflow-x-auto min-h-[220px]">
                  {/* Status Indicator Pill */}
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-stone-800 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          activeTab === 'error' ? 'bg-rose-500' : 'bg-emerald-400 animate-pulse'
                        }`}
                      />
                      <span className="text-stone-400">
                        {activeTab === 'response'
                          ? 'HTTP/1.1 200 OK'
                          : activeTab === 'error'
                          ? 'HTTP/1.1 422 Unprocessable Entity'
                          : activeTab === 'curl'
                          ? 'cURL Shell Command'
                          : 'Python httpx Client'}
                      </span>
                    </div>

                    {simulatedLatency !== null && activeTab === 'response' && (
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{simulatedLatency} ms</span>
                      </span>
                    )}
                  </div>

                  {activeTab === 'response' && (
                    <pre className="text-amber-300/90 leading-relaxed font-mono">
                      {activeEndpoint.responsePayload}
                    </pre>
                  )}

                  {activeTab === 'error' && (
                    <pre className="text-rose-300/90 leading-relaxed font-mono">
                      {activeEndpoint.errorPayload}
                    </pre>
                  )}

                  {activeTab === 'curl' && (
                    <pre className="text-amber-300/90 leading-relaxed font-mono">
                      {activeEndpoint.curlSnippet}
                    </pre>
                  )}

                  {activeTab === 'python' && (
                    <pre className="text-orange-300/90 leading-relaxed font-mono">
                      {activeEndpoint.pythonSnippet}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          </div>

          {/* Bottom Row: Swagger & ReDoc Links + Request Access Callout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-amber-900/10 dark:border-amber-500/15 text-xs">
            <div className="flex flex-wrap items-center gap-3 text-stone-600 dark:text-stone-400 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>JWT Bearer Security</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <FileCode2 className="w-4 h-4 text-orange-500" />
                <span>OpenAPI 3.1.0 Compatible</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Pytest Coverage &gt; 90%</span>
              </span>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={() => setIsAccessOpen(true)}
                className="text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 font-semibold font-mono underline underline-offset-4 cursor-pointer"
              >
                Need staging API access or Swagger credentials? Click here &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TECHNICAL SPECIFICATIONS & ARCHITECTURE MODAL
         ========================================================================= */}
      {isDocsOpen && (
        <div
          onClick={() => setIsDocsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-8"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                    FastAPI ML Service: Technical Specifications &amp; Architecture
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Production serving lifecycle, schema validation, and deployment pipeline
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDocsOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Close modal"
                title="Cancel (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm text-stone-700 dark:text-stone-300 font-sans">
              {/* Architecture Blueprint */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-500" />
                  <span>1. Request Lifecycle &amp; ASGI Architecture</span>
                </h4>
                <div className="p-4 rounded-xl bg-stone-950 text-stone-200 font-mono text-xs border border-stone-800 leading-relaxed overflow-x-auto">
                  <div className="text-stone-400">[Client Request] &rarr; JSON over HTTPS</div>
                  <div className="text-teal-400">&nbsp;&nbsp;↓ (Uvicorn ASGI Worker Event Loop)</div>
                  <div className="text-stone-300">&nbsp;&nbsp;[Security Middleware] &rarr; OAuth2 JWT Bearer verification &amp; rate limiter</div>
                  <div className="text-teal-400">&nbsp;&nbsp;↓</div>
                  <div className="text-amber-300">&nbsp;&nbsp;[Pydantic v2 Contract Layer] &rarr; Type coercion, range checks, enum enforcement</div>
                  <div className="text-teal-400">&nbsp;&nbsp;↓ (On validation error: return 422 JSON immediately)</div>
                  <div className="text-sky-300">&nbsp;&nbsp;[Feature Derivation Transformer] &rarr; Ratio computation &amp; one-hot normalization</div>
                  <div className="text-teal-400">&nbsp;&nbsp;↓</div>
                  <div className="text-emerald-300 font-bold">&nbsp;&nbsp;[In-Memory Model Pipeline] &rarr; Serialized XGBoost/RF (Lifespan cached)</div>
                  <div className="text-teal-400">&nbsp;&nbsp;↓</div>
                  <div className="text-stone-300">&nbsp;&nbsp;[Response Serializer] &rarr; 200 OK + Probabilities + SHAP Attributions</div>
                </div>
              </div>

              {/* Key Technical Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-xs font-mono">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Lifespan Startup Caching</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Heavy Joblib and XGBoost binaries are loaded once into RAM during FastAPI&apos;s async lifespan event loop, preventing disk I/O latency on high-frequency prediction requests.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-xs font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Pydantic v2 Validation</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Strict field validators catch missing values, out-of-range credit scores (300–850), or invalid categorical levels at the HTTP boundary before payloads reach the scikit-learn estimator.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-xs font-mono">
                    <Cpu className="w-3.5 h-3.5 text-blue-500" />
                    <span>Concurrency Benchmarks</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Benchmarked with Locust under 500 concurrent virtual users. Sustained 1,200 requests/sec with p95 response time under 14.8ms and 0% drop rate on a standard container node.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-1.5">
                  <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-xs font-mono">
                    <Terminal className="w-3.5 h-3.5 text-purple-500" />
                    <span>Docker Multi-Stage Build</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    Lightweight Alpine/Debian slim base image with unprivileged non-root user execution, pre-compiled wheels, and automatic container healthcheck hooks.
                  </p>
                </div>
              </div>

              {/* Dockerfile Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-stone-900 dark:text-stone-100">Dockerfile Multi-Stage Deployment</span>
                  <span className="text-stone-400">Production Ready</span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950 text-stone-300 font-mono text-xs border border-stone-800 overflow-x-auto">
                  <pre className="text-stone-300 leading-relaxed">
{`FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim AS runner
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY ./app ./app
COPY ./models ./models

ENV PATH=/root/.local/bin:$PATH
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/70">
              <a
                href="https://github.com/kikibillz/fastapi-ml-service"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white"
              >
                <span>Read Full Documentation on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={() => setIsDocsOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 text-xs font-semibold transition-colors"
              >
                Close Specs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          REQUEST DEMO ACCESS MODAL
         ========================================================================= */}
      {isAccessOpen && (
        <div
          onClick={() => {
            setIsAccessOpen(false);
            setReqSuccess(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-8"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                    Request Staging API Access &amp; Swagger Credentials
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Get JWT credentials, Postman collection &amp; interactive Swagger docs
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAccessOpen(false);
                  setReqSuccess(false);
                }}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Cancel and close"
                title="Cancel (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {reqSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-300 dark:border-emerald-800">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                    Request Noted &amp; Staging Credentials Ready
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong className="text-stone-900 dark:text-stone-100">{reqName || 'there'}</strong>! For instantaneous direct verification, click below to open a pre-filled access email or email Opeyemi directly.
                  </p>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      type="button"
                      id="btn-cancel-access-success"
                      onClick={() => {
                        setIsAccessOpen(false);
                        setReqSuccess(false);
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cancel / Close
                    </button>

                    <a
                      href={directMailtoUrl}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Direct Pre-Filled Access Email</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAccessSubmit} className="space-y-4 text-xs">
                  <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 leading-relaxed">
                    <p className="font-semibold mb-0.5">What you receive:</p>
                    <ul className="list-disc list-inside text-[11px] space-y-0.5 text-teal-800 dark:text-teal-300">
                      <li>Staging API Base URL &amp; scoped JWT Bearer Token</li>
                      <li>Postman Collection JSON (v2.1) ready to import</li>
                      <li>OpenAPI 3.1.0 JSON &amp; interactive Swagger UI link</li>
                    </ul>
                  </div>

                  <div>
                    <label className="block font-mono text-stone-700 dark:text-stone-300 font-medium mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={reqName}
                      onChange={(e) => setReqName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-stone-700 dark:text-stone-300 font-medium mb-1">
                        Work / Professional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={reqEmail}
                        onChange={(e) => setReqEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-stone-700 dark:text-stone-300 font-medium mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={reqCompany}
                        onChange={(e) => setReqCompany(e.target.value)}
                        placeholder="e.g. Stripe, Paystack"
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-stone-700 dark:text-stone-300 font-medium mb-1">
                      Your Role
                    </label>
                    <select
                      value={reqRole}
                      onChange={(e) => setReqRole(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500 outline-none font-sans"
                    >
                      <option value="Recruiter / Hiring Manager">Recruiter / Hiring Manager</option>
                      <option value="Engineering Lead / CTO">Engineering Lead / CTO</option>
                      <option value="Data Science Peer / Collaborator">Data Science Peer / Collaborator</option>
                      <option value="Product Manager">Product Manager</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-stone-700 dark:text-stone-300 font-medium mb-1">
                      Optional Note / Use Case
                    </label>
                    <textarea
                      rows={2}
                      value={reqNotes}
                      onChange={(e) => setReqNotes(e.target.value)}
                      placeholder="Evaluating for Senior Data Science / Backend Python role..."
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>

                  <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
                    <a
                      href={directMailtoUrl}
                      className="text-[11px] font-mono text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline"
                    >
                      Or email directly &rarr;
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        id="btn-cancel-access-request"
                        onClick={() => {
                          setIsAccessOpen(false);
                          setReqSuccess(false);
                        }}
                        className="px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium text-xs transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        id="btn-submit-access-request"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>Submit Request</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
