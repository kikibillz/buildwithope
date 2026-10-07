import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  Printer,
  Copy,
  Check,
  FileText,
  Send,
  Building,
  Briefcase,
  User,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users,
  TrendingDown,
  FileSpreadsheet,
  Mail,
  Zap,
  Target,
} from 'lucide-react';
import { PortfolioConfig } from '../types';
import { PrintableCoverLetter } from './PrintableCoverLetter';

interface CoverLetterSectionProps {
  config: PortfolioConfig;
  onSelectPrintCoverLetter?: () => void;
}

const OUTREACH_TEMPLATES = [
  {
    id: 'agency-pipeline',
    title: 'Recruitment Agency Founder / Managing Director',
    badge: 'Recruitment Agencies',
    outcome: 'Cut candidate processing time by 60% and eliminate lost placement fees.',
    subject: (company: string) => `Automating candidate pipeline & placement tracking for ${company}`,
    body: (name: string, company: string, sector: string) =>
`Hi ${name},

Notice your team is actively placing talent across ${sector || 'your market'}. Most agency owners I speak with lose 8–10 hours every week wrangling candidate data across disconnected spreadsheets and job boards, causing high-value candidates to go cold or get double-submitted.

I build automated Python pipelines that consolidate candidate submissions, eliminate duplicate records, and track placement stages in one live dashboard—cutting manual tracking by 60%.

Would you be open to a 10-minute intro call this Thursday to see how this works for teams like ${company}?

Best,
Opeyemi Olamiju
Data Scientist & Automation Engineer · Build with Ope
Email: odunayoopamiju@gmail.com | GitHub: github.com/kikibillz`,
  },
  {
    id: 'hr-retention',
    title: 'Head of People Operations / HR Director',
    badge: 'In-House People Ops',
    outcome: 'Spot employee flight risks 60–90 days before exit notices land.',
    subject: (company: string) => `Proactive turnover hazard & flight-risk tracking at ${company}`,
    body: (name: string, company: string) =>
`Hi ${name},

Replacing a key mid-level hire costs between $25,000 and $45,000, yet most People Ops leaders only find out an employee is unhappy during their exit interview.

Having operated inside People Operations at Culturelligence, I build practical turnover hazard models (calibrated Random Forest & XGBoost) that flag retention risk drivers—like tenure stagnation >4 years, overtime spikes, and compensation variance—months before resignation notices are submitted.

Could I share a 2-minute walkthrough of how this early-warning system alerts managers before top performers leave ${company}?

Best,
Opeyemi Olamiju
Data Scientist & Automation Engineer · Build with Ope
Email: odunayoopamiju@gmail.com | GitHub: github.com/kikibillz`,
  },
  {
    id: 'hr-ops-reporting',
    title: 'People Ops Specialist & Finance Lead',
    badge: 'HR Ops & Finance',
    outcome: 'Reduce weekly HR spreadsheet reporting from 15 hours to under 30 minutes.',
    subject: (company: string) => `Automating weekly headcount & payroll reconciliations for ${company}`,
    body: (name: string, company: string) =>
`Hi ${name},

If your team is spending entire Friday afternoons manually reconciling headcount, contractor withholdings, and departmental variance across messy CSVs, I can automate the entire workflow.

I build automated Python pipelines (OpenPyXL & Pandas) that validate and format your executive reports with dynamic, audit-proof formulas in under 30 minutes with 0% formula breakage.

Would you be open to a quick 10-minute chat this week to see how we can eliminate the manual spreadsheet grind at ${company}?

Best,
Opeyemi Olamiju
Data Scientist & Automation Engineer · Build with Ope
Email: odunayoopamiju@gmail.com | GitHub: github.com/kikibillz`,
  },
];

const ROLE_PRESETS = [
  {
    id: 'hr-automation',
    title: 'Practical HR & Recruitment Automation Specialist',
    focus: 'Candidate pipeline ETL, candidate deduplication, flight-risk hazard modeling, and automated OpenPyXL headcount ledgers.',
    company: 'Recruitment Agency / People Ops Enterprise',
    hiringManager: 'Founder & Head of Talent Operations',
  },
  {
    id: 'people-analytics',
    title: 'Applied ML & People Analytics Specialist',
    focus: 'Where ML meets Culturelligence HR operations: retention hazard modeling, headcount variance, and executive Power BI.',
    company: 'Workforce Intelligence / People Ops Enterprise',
    hiringManager: 'Head of People Analytics & Talent Strategy',
  },
  {
    id: 'ds-ml',
    title: 'Data Scientist & Machine Learning Engineer',
    focus: 'Predictive modeling, Scikit-learn, XGBoost, sub-25ms FastAPI microservices, and verified Pytest coverage.',
    company: 'Tech Scale-Up / AI Product Team',
    hiringManager: 'Hiring Team & Data Leadership',
  },
  {
    id: 'fastapi-backend',
    title: 'Python / FastAPI Backend & MLOps Engineer',
    focus: 'Asynchronous APIs with Pydantic v2 schemas, Docker containerization, AWS/GCP runtimes, and >90% test coverage.',
    company: 'Cloud Platform & Infrastructure Engineering',
    hiringManager: 'VP of Engineering & Backend Team',
  },
];

export const CoverLetterSection: React.FC<CoverLetterSectionProps> = ({
  config,
  onSelectPrintCoverLetter,
}) => {
  const [activeTab, setActiveTab] = useState<'outreach' | 'cover-letter'>('outreach');

  // Outreach Pitch State
  const [selectedOutreachId, setSelectedOutreachId] = useState<string>('agency-pipeline');
  const [recipientName, setRecipientName] = useState<string>('Alex');
  const [companyName, setCompanyName] = useState<string>('Apex Talent Partners');
  const [targetSector, setTargetSector] = useState<string>('Tech & Healthcare Staffing');
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  // Cover Letter State
  const [selectedPreset, setSelectedPreset] = useState<string>('hr-automation');
  const [roleTitle, setRoleTitle] = useState<string>('Practical HR & Recruitment Automation Specialist');
  const [hiringManager, setHiringManager] = useState<string>('Hiring Team & Leadership');
  const [showFullPreview, setShowFullPreview] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<boolean>(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const currentTemplate =
    OUTREACH_TEMPLATES.find((t) => t.id === selectedOutreachId) || OUTREACH_TEMPLATES[0];

  const currentPitchBody = currentTemplate.body(recipientName, companyName, targetSector);
  const currentPitchSubject = currentTemplate.subject(companyName);

  const handleApplyPreset = (presetId: string) => {
    const preset = ROLE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPreset(preset.id);
      setRoleTitle(preset.title);
      setCompanyName(preset.company);
      setHiringManager(preset.hiringManager);
    }
  };

  const copyOutreachMessage = () => {
    navigator.clipboard.writeText(currentPitchBody).then(() => {
      setCopiedPitch(true);
      setTimeout(() => setCopiedPitch(false), 2500);
    });
  };

  const getPlainTextCoverLetter = () => {
    return `OPEYEMI OLAMIJU
Data Scientist • Automation Engineer • People Analytics Specialist
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

I am writing to express my strong enthusiasm for the ${roleTitle} position at ${companyName}. With a Bachelor of Science in Computer Science from Olabisi Onabanjo University (OOU), 13 verified certifications, and hands-on experience building end-to-end data automation pipelines and machine learning systems, I bring a unique dual-domain foundation bridging computer science precision with empirical HR and recruitment operations.

My primary differentiator is practical data and automation support for HR teams and recruitment agencies. Unlike candidates with purely textbook backgrounds, I have operated inside fast-moving People Operations environments at Culturelligence, managing headcount distribution, auditing recruitment tracking funnels, and computing retention hazard variance. I transform abstract organizational telemetry—such as employee tenure stagnation, overtime signals, and voluntary turnover patterns—into calibrated predictive classification systems (XGBoost, Random Forest, SMOTE balancing) and executive dashboards that empower leadership to take proactive intervention.

Because engineering claims carry weight through verifiable execution, every system I build is validated by employer-grade standards. My production portfolio includes containerized FastAPI microservices adhering to Pydantic v2 validation contracts, asynchronous database querying (PostgreSQL & MongoDB), and rigorous unit test suites achieving >90% Pytest code coverage. Furthermore, I have developed automated financial ETL pipelines in Python (OpenPyXL/Pandas) calculating statutory 20% tax withholdings with dynamic formulas and 0% formula breakage, alongside live public cloud deployments running on Streamlit and Vercel.

Beyond modeling and backend architecture, I leverage modern MLOps tooling (MLflow, Docker, CI/CD with GitHub Actions, AWS/GCP runtimes) and generative AI workflows (LLM APIs, prompt engineering with citation guardrails). I thrive in collaborative, high-velocity teams where technical precision, clean software design, and quantifiable business outcomes are paramount.

Thank you for your time and consideration. I would welcome the opportunity to discuss how my combined expertise in predictive modeling, high-reliability Python engineering, and workforce data automation can drive immediate value for ${companyName}. All of my code repositories and interactive cloud demos are publicly inspectable at https://github.com/kikibillz.

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
    link.download = `Opeyemi_Olamiju_Proposal_${companyName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (onSelectPrintCoverLetter) {
      onSelectPrintCoverLetter();
    }
    document.body.setAttribute('data-print-mode', 'cover-letter');
    window.print();
    setTimeout(() => {
      document.body.removeAttribute('data-print-mode');
    }, 1000);
  };

  return (
    <div id="outreach" className="w-full">
      {/* Top Banner and Navigation Tabs */}
      <div className="bg-card text-foreground rounded-xs border-2 border-foreground shadow-brutal p-5 sm:p-7 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b-2 border-foreground/15">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 bg-primary text-primary-foreground rounded-xs font-mono text-[10px] font-bold uppercase tracking-wider">
                Outreach &amp; Proposals
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                One Clear Outcome · Zero Jargon
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black font-display uppercase tracking-tight text-foreground">
              Direct Outreach &amp; Proposal Hub
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl font-sans leading-relaxed">
              Tailored outreach emails for recruitment agency founders and HR directors, paired with an executive ATS cover letter.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center border-2 border-foreground p-1 rounded-xs bg-muted self-start lg:self-center">
            <button
              type="button"
              onClick={() => setActiveTab('outreach')}
              className={`px-3.5 py-1.5 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                activeTab === 'outreach'
                  ? 'bg-foreground text-background shadow-brutal-xs'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <Target className="size-3.5" />
              <span>1-Outcome Outreach</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cover-letter')}
              className={`px-3.5 py-1.5 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                activeTab === 'cover-letter'
                  ? 'bg-foreground text-background shadow-brutal-xs'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <FileText className="size-3.5" />
              <span>Formal Cover Letter</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: ONE-OUTCOME OUTREACH MESSAGES
           ========================================================================= */}
        {activeTab === 'outreach' && (
          <div className="mt-6 space-y-6">
            {/* The One Clear Outcome Callout */}
            <div className="p-4 rounded-xs border-2 border-foreground bg-primary/10 shadow-brutal-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary block mb-0.5">
                  Core Outreach Proposition:
                </span>
                <p className="font-mono text-xs sm:text-sm font-black text-foreground">
                  &ldquo;Turn messy candidate spreadsheets &amp; HR turnover data into an automated pipeline dashboard that alerts you to flight risks before exit interviews — cutting manual weekly reporting from 15 hours to under 30 minutes.&rdquo;
                </p>
              </div>
            </div>

            {/* Template Selector Pills */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-foreground/80 mb-2">
                Select Your Outreach Target:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {OUTREACH_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => setSelectedOutreachId(tmpl.id)}
                    className={`p-3 rounded-xs border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedOutreachId === tmpl.id
                        ? 'border-foreground bg-background shadow-brutal-sm'
                        : 'border-foreground/30 bg-muted/40 hover:border-foreground/60'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-xs bg-muted border border-foreground/20 text-muted-foreground block w-fit mb-1.5">
                        {tmpl.badge}
                      </span>
                      <h4 className="font-display font-extrabold text-xs uppercase text-foreground">
                        {tmpl.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-sans mt-2 pt-2 border-t border-foreground/15">
                      <b className="text-foreground font-mono">Outcome:</b> {tmpl.outcome}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Customizer Inputs */}
            <div className="p-4 rounded-xs border border-foreground/20 bg-muted/40 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-foreground/80 mb-1">
                  Recipient First Name:
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-3 py-1.5 text-xs font-mono bg-background border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-foreground/80 mb-1">
                  Company / Agency Name:
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Talent Partners"
                  className="w-full px-3 py-1.5 text-xs font-mono bg-background border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-foreground/80 mb-1">
                  Sector / Industry:
                </label>
                <input
                  type="text"
                  value={targetSector}
                  onChange={(e) => setTargetSector(e.target.value)}
                  placeholder="e.g. Tech & Healthcare Staffing"
                  className="w-full px-3 py-1.5 text-xs font-mono bg-background border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
                />
              </div>
            </div>

            {/* Outreach Message Box */}
            <div className="relative">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-foreground/15 text-xs font-mono">
                <span className="text-muted-foreground">
                  Subject: <b className="text-foreground font-sans">{currentPitchSubject}</b>
                </span>
                <span className="text-[11px] text-emerald-600 font-bold hidden sm:inline">
                  ● 4-Sentence High-Conversion Format
                </span>
              </div>

              <pre className="p-4 sm:p-5 rounded-xs border-2 border-foreground bg-background text-foreground font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-brutal-sm">
                {currentPitchBody}
              </pre>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-muted-foreground">
                  Ready to send via LinkedIn message or direct email.
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:?subject=${encodeURIComponent(currentPitchSubject)}&body=${encodeURIComponent(currentPitchBody)}`}
                    className="inline-flex items-center gap-2 bg-card text-foreground border-2 border-foreground shadow-brutal-xs hover:shadow-brutal px-3.5 py-2 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                  >
                    <Mail className="size-3.5 text-primary" />
                    <span>Open in Email Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={copyOutreachMessage}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground border-2 border-foreground shadow-brutal-xs hover:shadow-brutal px-4 py-2 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                  >
                    {copiedPitch ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    <span>{copiedPitch ? 'Copied to Clipboard!' : 'Copy Pitch Message'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: FORMAL EXECUTIVE PROPOSAL & COVER LETTER
           ========================================================================= */}
        {activeTab === 'cover-letter' && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-foreground/15">
              <div className="text-xs font-mono text-muted-foreground">
                Formal ATS-optimized application letter ready to print or export.
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  id="btn-print-cover-letter"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground border-2 border-foreground shadow-brutal-xs hover:shadow-brutal px-3.5 py-2 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>

                <button
                  type="button"
                  onClick={downloadTextCoverLetter}
                  className="inline-flex items-center gap-2 bg-card text-foreground border-2 border-foreground shadow-brutal-xs hover:shadow-brutal px-3.5 py-2 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-secondary" />
                  <span>Download (.TXT)</span>
                </button>

                <button
                  type="button"
                  onClick={copyPlainCoverLetter}
                  className="inline-flex items-center gap-2 bg-muted text-foreground border border-foreground/30 px-3 py-2 rounded-xs font-mono text-xs font-bold uppercase transition-colors hover:bg-muted/80 cursor-pointer"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText ? 'Copied ATS Text!' : 'Copy ATS Text'}</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
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

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-foreground/80 mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-secondary" />
                  <span>Target Company</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Culturelligence, ScaleTech"
                  className="w-full px-3 py-2 text-xs font-mono bg-muted/50 border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-foreground/80 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-accent" />
                  <span>Hiring Manager / Team</span>
                </label>
                <input
                  type="text"
                  value={hiringManager}
                  onChange={(e) => setHiringManager(e.target.value)}
                  placeholder="e.g. Hiring Team & Leadership"
                  className="w-full px-3 py-2 text-xs font-mono bg-muted/50 border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
                />
              </div>
            </div>

            {/* Document Preview Toggle */}
            <div className="flex justify-center my-4">
              <button
                type="button"
                onClick={() => setShowFullPreview(!showFullPreview)}
                className="inline-flex items-center gap-2 bg-muted text-foreground border-2 border-foreground shadow-brutal-xs hover:shadow-brutal px-4 py-2 rounded-xs font-mono text-xs font-bold uppercase transition-transform cursor-pointer"
              >
                <FileText className="w-4 h-4 text-primary" />
                <span>{showFullPreview ? 'Hide Paper Document View' : 'Show Paper Document View'}</span>
                {showFullPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Document Paper Preview */}
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
        )}
      </div>
    </div>
  );
};
