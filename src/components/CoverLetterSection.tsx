import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  Printer,
  Copy,
  Check,
  FileText,
  Sliders,
  Sparkles,
  Building,
  Briefcase,
  User,
  RefreshCw,
  Send,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PortfolioConfig } from '../types';
import { PrintableCoverLetter } from './PrintableCoverLetter';

interface CoverLetterSectionProps {
  config: PortfolioConfig;
  onSelectPrintCoverLetter?: () => void;
}

const ROLE_PRESETS = [
  {
    id: 'ds-ml',
    title: 'Data Scientist & Machine Learning Engineer',
    focus: 'Predictive modeling, Scikit-learn, XGBoost, sub-25ms FastAPI microservices, and verified Pytest coverage.',
    company: 'Tech Scale-Up / AI Product Team',
    hiringManager: 'Hiring Team & Data Leadership',
  },
  {
    id: 'rag-prompt',
    title: 'Generative AI, RAG & Prompt Systems Engineer',
    focus: 'Retrieval-Augmented Generation, vector search (ChromaDB/FAISS), BM25 hybrid ranking, and systematic prompt engineering with citation guardrails.',
    company: 'AI Product Lab / Enterprise GenAI Team',
    hiringManager: 'Head of Applied AI & Engineering',
  },
  {
    id: 'people-analytics',
    title: 'Applied ML & People Analytics Specialist',
    focus: 'Where ML meets Culturelligence HR operations: retention hazard modeling, headcount variance, and executive Power BI.',
    company: 'Workforce Intelligence / People Ops Enterprise',
    hiringManager: 'Head of People Analytics & Talent Strategy',
  },
  {
    id: 'fastapi-backend',
    title: 'Python / FastAPI Backend & MLOps Engineer',
    focus: 'Asynchronous APIs with Pydantic v2 schemas, Docker containerization, AWS/GCP runtimes, and >90% test coverage.',
    company: 'Cloud Platform & Infrastructure Engineering',
    hiringManager: 'VP of Engineering & Backend Team',
  },
  {
    id: 'bi-analyst',
    title: 'Business Intelligence & Data Analytics Specialist',
    focus: 'Power BI DAX modeling, Tableau interactive visual architectures, SQL/NoSQL querying, and C-suite KPI design.',
    company: 'Enterprise Data & Analytics Practice',
    hiringManager: 'Director of Business Intelligence',
  },
];

export const CoverLetterSection: React.FC<CoverLetterSectionProps> = ({
  config,
  onSelectPrintCoverLetter,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('ds-ml');
  const [roleTitle, setRoleTitle] = useState<string>('Data Scientist & Machine Learning Engineer');
  const [companyName, setCompanyName] = useState<string>('Your Organization');
  const [hiringManager, setHiringManager] = useState<string>('Hiring Manager & Team');
  const [showFullPreview, setShowFullPreview] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([
    'ml-hr-synergy',
    'pytest-proof',
    'cloud-mlops',
    'power-bi',
  ]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleApplyPreset = (presetId: string) => {
    const preset = ROLE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPreset(preset.id);
      setRoleTitle(preset.title);
      setCompanyName(preset.company);
      setHiringManager(preset.hiringManager);
    }
  };

  const getPlainTextCoverLetter = () => {
    return `OPEYEMI OLAMIJU
Data Scientist • ML Systems Engineer • People Analytics Specialist
Build with Ope
Email: ${config.email}
LinkedIn: https://www.linkedin.com/in/opeyemiolamiju/
GitHub: https://github.com/kikibillz
Work Model: Remote & Relocation Ready

Date: ${currentDate}

To: ${hiringManager}
Company: ${companyName}
Re: Application for ${roleTitle}

Dear ${hiringManager},

I am writing to express my strong enthusiasm for the ${roleTitle} position at ${companyName}. With a Bachelor of Science in Computer Science from Olabisi Onabanjo University (OOU), 13 verified certifications, and hands-on experience building end-to-end predictive machine learning pipelines and high-throughput Python backends, I bring a unique dual-domain foundation that bridges mathematical model engineering with empirical business and workforce operations.

My primary differentiator is where statistical machine learning meets real-world HR and workforce intelligence. Unlike candidates with purely academic or textbook machine learning backgrounds, I have operated inside fast-moving People Operations environments at Culturelligence, managing headcount distribution, auditing recruitment tracking funnels, and computing retention hazard variance. I transform abstract organizational telemetry—such as employee tenure, engagement signals, and voluntary turnover patterns—into calibrated predictive classification systems (XGBoost, Random Forest, SMOTE balancing) and executive Power BI / Tableau dashboards that empower leadership to take proactive, data-informed intervention.

Because self-directed engineering claims carry weight through verifiable execution, every system I build is validated by employer-grade standards. My production portfolio includes containerized FastAPI microservices adhering to Pydantic v2 validation contracts with automated Swagger documentation, asynchronous database querying (PostgreSQL & MongoDB), and rigorous unit test suites achieving >90% Pytest code coverage. Furthermore, I have developed automated financial ETL pipelines in Python (OpenPyXL/Pandas) calculating statutory 20% tax withholdings with dynamic formulas and zero calculation discrepancies, alongside live public cloud deployments running on Streamlit and Vercel.

Beyond modeling and backend architecture, I leverage modern MLOps tooling (MLflow, Docker, CI/CD with GitHub Actions, AWS/GCP runtimes) and generative AI workflows (LLM APIs, prompt engineering, and commercial multimodal video generation). I thrive in collaborative, high-velocity teams where technical precision, clean software design, and quantifiable business outcomes are paramount.

Thank you for your time and consideration. I would welcome the opportunity to discuss how my combined expertise in predictive machine learning, high-reliability Python engineering, and people data analytics can drive immediate value for ${companyName}. All of my code repositories and interactive cloud demos are publicly inspectable at https://github.com/kikibillz.

Sincerely,

OPEYEMI OLAMIJU
Data Scientist & Machine Learning Engineer · Build with Ope
B.Sc. Computer Science · OOU Alumnus
`;
  };

  const copyPlainCoverLetter = () => {
    const text = getPlainTextCoverLetter();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    });
  };

  const downloadTextCoverLetter = () => {
    const text = getPlainTextCoverLetter();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Opeyemi_Olamiju_Cover_Letter_${companyName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (onSelectPrintCoverLetter) {
      onSelectPrintCoverLetter();
    }
    // Set data attribute on body so print style targets cover letter
    document.body.setAttribute('data-print-mode', 'cover-letter');
    window.print();
    setTimeout(() => {
      document.body.removeAttribute('data-print-mode');
    }, 1000);
  };

  return (
    <div id="cover-letter" className="w-full">
      {/* Top Banner and Role Tailoring Toolbar */}
      <div className="bg-card text-foreground rounded-xs border-2 border-foreground shadow-brutal p-5 sm:p-7 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b-2 border-foreground/15">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 bg-primary text-primary-foreground rounded-xs font-mono text-[10px] font-bold uppercase tracking-wider">
                Interactive Tailoring
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Matches CV Typography &amp; Strategy
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-foreground">
              Tailored Executive Cover Letter
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl font-sans">
              Customized for recruiters and hiring managers. Highlight the winning combination of predictive machine learning and real-world HR data experience.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              id="btn-print-cover-letter"
              data-cursor-text="PRINT"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground border-2 border-foreground shadow-brutal-sm hover:shadow-brutal px-4 py-2.5 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={downloadTextCoverLetter}
              className="inline-flex items-center gap-2 bg-card text-foreground border-2 border-foreground shadow-brutal-sm hover:shadow-brutal px-4 py-2.5 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-secondary" />
              <span>Download (.TXT)</span>
            </button>

            <button
              type="button"
              onClick={copyPlainCoverLetter}
              className="inline-flex items-center gap-2 bg-muted text-foreground border border-foreground/30 px-3.5 py-2.5 rounded-xs font-mono text-xs font-bold uppercase transition-colors hover:bg-muted/80 cursor-pointer"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText ? 'Copied ATS Text!' : 'Copy ATS Text'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Customizer Inputs */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Target Role Preset / Custom */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-foreground/80 mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <span>Target Role Preset</span>
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => handleApplyPreset(e.target.value)}
              className="w-full px-3 py-2 text-xs font-mono bg-muted/50 border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
            >
              {ROLE_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Target Company Name */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-foreground/80 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-secondary" />
              <span>Company / Organization</span>
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Anthropic, Google, Culturelligence"
              className="w-full px-3 py-2 text-xs font-mono bg-muted/50 border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
            />
          </div>

          {/* Hiring Manager / Recruiter Name */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-foreground/80 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-accent" />
              <span>Hiring Manager / Team</span>
            </label>
            <input
              type="text"
              value={hiringManager}
              onChange={(e) => setHiringManager(e.target.value)}
              placeholder="e.g. Dr. Alex Vance or Data Science Hiring Team"
              className="w-full px-3 py-2 text-xs font-mono bg-muted/50 border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
            />
          </div>
        </div>

        {/* Strategic Differentiators Tagged in Letter */}
        <div className="mt-4 pt-4 border-t border-foreground/15 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase text-foreground/70 mr-1">
            Core Pitch Highlights:
          </span>
          <span className="px-2.5 py-1 rounded-xs bg-primary/10 border border-primary/30 text-foreground font-mono text-[11px] font-semibold">
            ✓ ML + Real HR Data Synergy (Roles 1–3)
          </span>
          <span className="px-2.5 py-1 rounded-xs bg-secondary/10 border border-secondary/30 text-foreground font-mono text-[11px] font-semibold">
            ✓ &gt;90% Pytest Coverage &amp; Docker
          </span>
          <span className="px-2.5 py-1 rounded-xs bg-accent/10 border border-accent/30 text-foreground font-mono text-[11px] font-semibold">
            ✓ Live Streamlit &amp; OpenAPI Demos
          </span>
          <span className="px-2.5 py-1 rounded-xs bg-highlight/30 border border-highlight text-foreground font-mono text-[11px] font-semibold">
            ✓ Power BI, AWS, GCP &amp; MLOps
          </span>
          <span className="px-2.5 py-1 rounded-xs bg-accent/20 border border-accent text-foreground font-mono text-[11px] font-semibold">
            ✓ RAG &amp; Prompt Engineering (ChromaDB)
          </span>
        </div>
      </div>

      {/* Toggle Document Preview Button */}
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => setShowFullPreview(!showFullPreview)}
          className="inline-flex items-center gap-2 bg-muted text-foreground border-2 border-foreground shadow-brutal-sm hover:shadow-brutal px-5 py-2.5 rounded-xs font-mono text-xs font-bold uppercase transition-transform cursor-pointer"
        >
          <FileText className="w-4 h-4 text-primary" />
          <span>{showFullPreview ? 'Hide Live Paper Preview' : 'Show Live Paper Preview'}</span>
          {showFullPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Full Live Document Preview (Paper Layout) */}
      {showFullPreview && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="p-3 sm:p-8 bg-stone-200 dark:bg-stone-900 border-2 border-foreground rounded-xs shadow-brutal overflow-x-auto"
        >
          <div className="max-w-[850px] mx-auto bg-white rounded-xs shadow-xl scale-[0.92] sm:scale-100 origin-top">
            <PrintableCoverLetter
              config={config}
              roleTitle={roleTitle}
              companyName={companyName}
              hiringManager={hiringManager}
              focusArea={ROLE_PRESETS.find((p) => p.id === selectedPreset)?.focus}
              date={currentDate}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};
