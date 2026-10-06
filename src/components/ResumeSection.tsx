import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, ExternalLink, FileText, CheckCircle2, ChevronDown, ChevronUp, Printer, GraduationCap, Briefcase, Code, Award, Copy, Check, Mail } from 'lucide-react';
import { PortfolioConfig } from '../types';
import { PrintableResume } from './PrintableResume';
import { CoverLetterSection } from './CoverLetterSection';

interface ResumeSectionProps {
  config: PortfolioConfig;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState<'cv' | 'cover-letter'>('cv');
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [copiedAts, setCopiedAts] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#cover-letter') {
      setActiveTab('cover-letter');
    }
  }, []);

  const resumePdfPath = '/Opeyemi_Olamiju_Resume.pdf';
  const resumeHtmlPath = '/resume.html';

  const copyAtsText = () => {
    const atsText = `OPEYEMI OLAMIJU
Data Scientist & ML Engineer | Workforce & People Analytics Specialist
Email: ${config.email}
LinkedIn: https://www.linkedin.com/in/opeyemiolamiju/
GitHub: https://github.com/kikibillz
Work Model: Remote & Relocation Ready

SUMMARY:
Data Scientist, Machine Learning Engineer, and Python Backend Developer with a B.Sc. in Computer Science (Olabisi Onabanjo University - OOU). Bridges the high-impact intersection of Machine Learning Engineering (XGBoost, Scikit-learn, FastAPI, SQL/NoSQL) and empirical People Operations & HR domain experience (Culturelligence). Proven track record translating workforce records into predictive retention models, building sub-25ms REST APIs with Pydantic v2 validation contracts, engineering domain-specific RAG knowledge assistants with citation grounding, and automating multi-client financial/tax ledgers with zero error rate. All engineering claims are validated by live open-source GitHub repositories with >90% Pytest test coverage and interactive cloud deployments.

TECHNICAL SKILLS:
- RAG & Prompt Engineering: Retrieval-Augmented Generation (RAG), Advanced Prompt Engineering (Chain-of-Thought, ReAct, Few-Shot, System Prompts), Vector Search (ChromaDB, FAISS), Semantic Embeddings, BM25 Hybrid Retrieval, Hallucination Guardrails, Grounded Citations, Context Window Optimization, LangChain
- Machine Learning & Analytics: Scikit-learn, XGBoost, Random Forest, SMOTE Class Balancing, People Analytics, Attrition Modeling, Feature Engineering, Cross-Validation, Pandas, NumPy
- Backend & Microservices: FastAPI, Pydantic v2, Uvicorn ASGI, REST APIs, SQLAlchemy, Pytest (>90% coverage), OpenAPI / Swagger
- Cloud & Infrastructure: AWS (EC2, S3), Google Cloud Platform (GCP - Cloud Run), Docker Containerization, Linux CLI, Vercel Edge, Azure Fundamentals
- Business Intelligence & Data Viz: Power BI (DAX, Star Schema, Executive KPI Dashboards), Tableau, Streamlit, Plotly Interactive, Matplotlib, Seaborn
- MLOps & Delivery: Docker, MLflow Experiment Tracking, CI/CD (GitHub Actions), Model Registry & Serialization (Joblib / Pickle), Automated Unit Testing
- LLMs & Generative AI: Large Language Models (LLMs), OpenAI API, Gemini API, Prompt Engineering, RAG Architectures, LangChain, Google Veo 3, Runway Gen-3, ElevenLabs
- Databases & Storage: SQL (PostgreSQL, MySQL, SQLite), NoSQL (MongoDB), Schema Normalization, Complex Multi-Table Joins, CTEs, Window Functions, Indexing Optimization, Redis Caching
- Programming & Web: Python, SQL, TypeScript, JavaScript, HTML5, CSS3, OpenPyXL, XlsxWriter, Git, GitHub

PROFESSIONAL EXPERIENCE:
1. Machine Learning Developer & Data Systems Engineer | Client Engagements & Open-Source (2023 - Present)
- Architected, trained, and deployed end-to-end machine learning microservices and analytical web apps using Python, FastAPI, and Streamlit.
- Serialized trained classification models (XGBoost, Random Forest) via Joblib, achieving sub-25ms real-time inference latency.
- Engineered automated REST ETL pipelines extracting, paginating, and validating healthcare provider datasets (UK CQC compliance), saving ~100 hours/month of manual entry.
- Formulated custom statutory financial reconciliation pipelines in Python (OpenPyXL/Pandas) calculating 20% tax withholdings with dynamic formulas and zero calculation errors.
- Authored comprehensive test suites with Pytest achieving >90% code coverage; containerized applications with Docker for reproducible deployment.

2. People Leader & Agile People Operations Specialist | Culturelligence (Aug 2024 - Jul 2025)
- Managed workforce databases, audited recruitment tracking funnels, and optimized employee onboarding data operations.
- Prepared departmental headcount distributions, turnover variance analytics, and employee retention summaries for executive leadership.
- Bridged organizational people workflows with predictive questions around employee engagement, turnover risk signals, and retention intervention.
- Rapidly promoted to People Leader for demonstrated workflow efficiency, cross-team accountability, and operational excellence.

3. Administrative Support & Virtual Assistant | Freelance & Private Clients (Dec 2023 - Present)
- Automated administrative data workflows, maintaining structured tracking spreadsheets and executive databases with high data hygiene.
- Standardized operational SOPs, cleaned multi-source business records, and authored weekly KPI progress briefs for stakeholders.

EDUCATION:
Bachelor of Science (BSc) in Computer Science (2019 - 2023)
Olabisi Onabanjo University (OOU) — Ogun State
Core Coursework: Data Structures & Algorithms, Object-Oriented Programming (Python & Java), Database Management Systems (SQL), Software Engineering, Probability & Statistics.

VERIFIED CREDENTIALS & CERTIFICATIONS (13 TOTAL):
1. Certified Data Scientist — New Horizons Computer Learning Centers (Aug 2024 | ID: NH-DS-2024-9104)
2. Agile People Operation Specialist — Culturelligence (Jul 2024 | ID: APOS-2024-0711)
3. Artificial Intelligence Career Essentials (AiCE) — ALX Africa (May 2024 | ID: ALX-AICE-2024-8842)
4. Certified Technical Recruiter — Hirist / Cutshort (Nov 2023 | ID: cert_bfxyxv9d | Verify: https://hirist.tech/certificate/cert_bfxyxv9d)
5. Data Visualization & BI Intern — Excelerate (Sep 2024 | ID: EXC-DVI-2024-3401)
6. Behavioral Product Analytics Specialist — Hotjar by Contentsquare (Jul 2024 | ID: x3ftgg2pwb2f | Verify: https://verify.skilljar.com/c/x3ftgg2pwb2f)
7. Certified Product Manager (CPM) — BeTechified (Feb 2024 | ID: CPM-BT-2024-1829)
8. UI/UX Design Certification — Dev and Design (May 2024 | ID: DD-UIUX-2024-5510)
9. Applied Product Management — Prodefied (Oct 2024 | ID: PDF-PM-2024-6012)
10. Professional Virtual Assistant Certification — ALX Africa (Dec 2023 | ID: ALX-VA-2023-7190)
11. Remote Work Professional — FOGDEV (Jun 2024 | ID: FOG-RWP-2024-2098)
12. Workplace Soft Skills & Emotional Intelligence — Jobberman (Oct 2020 | ID: JBM-SS-2020-4491)
13. Certified Digital Educator — IOC of UNESCO (Feb 2023 | ID: UNESCO-IOC-DT-2023)
Verification Profile: https://www.linkedin.com/in/opeyemiolamiju/details/certifications/
`;
    navigator.clipboard.writeText(atsText).then(() => {
      setCopiedAts(true);
      setTimeout(() => setCopiedAts(false), 2500);
    });
  };

  return (
    <div className="w-full">
      {/* Document Type Switcher: CV vs Cover Letter */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8 print:hidden">
        <button
          type="button"
          onClick={() => setActiveTab('cv')}
          id="tab-btn-cv"
          data-cursor-text="CV"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xs font-mono text-xs font-bold uppercase transition-all border-2 border-foreground cursor-pointer ${
            activeTab === 'cv'
              ? 'bg-foreground text-background shadow-brutal translate-y-[-2px]'
              : 'bg-card text-foreground hover:bg-muted shadow-brutal-sm'
          }`}
        >
          <FileText className="w-4 h-4 text-primary" />
          <span>Curriculum Vitae (CV)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-xs bg-primary/20 text-foreground font-mono">
            2-Page
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cover-letter')}
          id="tab-btn-cover-letter"
          data-cursor-text="LETTER"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xs font-mono text-xs font-bold uppercase transition-all border-2 border-foreground cursor-pointer ${
            activeTab === 'cover-letter'
              ? 'bg-foreground text-background shadow-brutal translate-y-[-2px]'
              : 'bg-card text-foreground hover:bg-muted shadow-brutal-sm'
          }`}
        >
          <Mail className="w-4 h-4 text-accent" />
          <span>Tailored Cover Letter</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-xs bg-accent/20 text-foreground font-mono">
            Customizable
          </span>
        </button>
      </div>

      {activeTab === 'cover-letter' ? (
        <CoverLetterSection config={config} />
      ) : (
        <>
          {/* Action Controls Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 print:hidden font-mono text-xs font-bold uppercase">
        {/* Download PDF button */}
        <a
          href={resumePdfPath}
          download="Opeyemi_Olamiju_Resume.pdf"
          id="btn-download-resume"
          data-cursor-text="DOWNLOAD"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground border-2 border-foreground shadow-brutal hover:shadow-brutal-sm px-5 py-3 rounded-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Download PDF Résumé</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-white/20">
            .PDF (25 KB)
          </span>
        </a>

        {/* Print CV button */}
        <button
          type="button"
          onClick={() => window.print()}
          id="btn-print-portfolio"
          data-cursor-text="PRINT"
          className="inline-flex items-center gap-2 bg-card text-foreground border-2 border-foreground shadow-brutal hover:shadow-brutal-sm px-5 py-3 rounded-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-primary" />
          <span>Print CV / Save to PDF</span>
        </button>

        {/* View Standalone HTML CV */}
        <a
          href={resumeHtmlPath}
          target="_blank"
          rel="noreferrer"
          id="btn-view-printable-cv"
          data-cursor-text="VIEW"
          className="inline-flex items-center gap-2 bg-card text-foreground border-2 border-foreground shadow-brutal-sm hover:shadow-brutal px-4 py-3 rounded-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 text-secondary" />
          <span>Standalone HTML CV</span>
        </a>

        {/* Toggle Full Preview */}
        <button
          type="button"
          onClick={() => setShowFullPreview(!showFullPreview)}
          id="btn-toggle-resume-preview"
          data-cursor-text="PREVIEW"
          className="inline-flex items-center gap-2 bg-muted text-foreground border-2 border-foreground shadow-brutal-sm hover:shadow-brutal px-4 py-3 rounded-xs transition-transform cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-accent" />
          <span>{showFullPreview ? 'Hide Document Preview' : 'Interactive 2-Page Preview'}</span>
          {showFullPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {/* Copy ATS Text */}
        <button
          type="button"
          onClick={copyAtsText}
          id="btn-copy-ats-text"
          className="inline-flex items-center gap-1.5 bg-muted/80 text-foreground/90 border border-foreground/30 px-3.5 py-3 rounded-xs transition-colors hover:bg-muted cursor-pointer"
          title="Copy ATS formatted plain text version"
        >
          {copiedAts ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedAts ? 'Copied ATS Text!' : 'Copy ATS Text'}</span>
        </button>
      </div>

      {/* Expanded Interactive 2-Page CV Document Preview */}
      {showFullPreview && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10 print:hidden"
        >
          <div className="p-4 sm:p-6 bg-stone-100 dark:bg-stone-900 border-2 border-foreground rounded-xs shadow-brutal">
            <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b-2 border-foreground/20">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  Live Curriculum Vitae Preview (Exact Print Geometry)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-bold bg-primary text-primary-foreground rounded-xs"
                >
                  <Printer className="w-3 h-3" />
                  Print Now
                </button>
                <a
                  href={resumePdfPath}
                  download="Opeyemi_Olamiju_Resume.pdf"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-bold bg-card border border-foreground rounded-xs"
                >
                  <Download className="w-3 h-3" />
                  Download
                </a>
              </div>
            </div>
            <div className="overflow-x-auto shadow-inner rounded-xs bg-stone-200 dark:bg-stone-950 p-2 sm:p-6">
              <div className="scale-[0.88] sm:scale-100 origin-top">
                <PrintableResume config={config} />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Executive Resume Card Preview */}
      <div className="bg-card text-foreground rounded-xs border-2 border-foreground shadow-brutal overflow-hidden transition-all">
        {/* Card Top Banner */}
        <div className="p-6 sm:p-8 border-b-2 border-foreground bg-muted/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-black font-display text-foreground">
                  OPEYEMI OLAMIJU
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-xs bg-highlight text-highlight-foreground border border-foreground">
                  Build with Ope
                </span>
              </div>
              <p className="text-sm font-bold text-foreground/85 mt-1 font-mono">
                Data Scientist • Python &amp; FastAPI Backend Developer • AI Video Creator
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-foreground/75 mt-2">
                <span>✉️ {config.email}</span>
                <span>💻 github.com/kikibillz</span>
                <span>🔗 linkedin.com/in/opeyemiolamiju</span>
                <span>📍 Remote &amp; Relocation Ready</span>
              </div>
            </div>

            <div className="shrink-0 flex sm:flex-col items-start sm:items-end gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-status text-status-foreground border border-foreground text-xs font-mono font-bold shadow-brutal-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Available for Roles
              </span>
              <span className="text-[11px] font-mono text-foreground/80 font-bold bg-muted px-2 py-0.5 rounded-xs border border-foreground/20">
                BSc in Computer Science · OOU (2023)
              </span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Summary */}
        <div className="p-6 sm:p-8 space-y-6 text-sm">
          {/* Executive Summary Paragraph */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-2 text-foreground/90">
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>Executive Profile &amp; Strategic Intersection</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-sans">
              Data Scientist and ML Backend Developer backed by a Computer Science foundation from <strong>Olabisi Onabanjo University (OOU)</strong>. Bridges the gap between statistical machine learning (XGBoost, Scikit-learn, FastAPI, SQL/NoSQL) and empirical People Operations &amp; HR domain experience (Culturelligence). Proven in training sub-25ms inference APIs, modeling workforce retention/turnover risk, and automating multi-client statutory financial engines with 100% calculation precision. All engineering claims are validated by live open-source GitHub repositories and cloud deployments.
            </p>
          </div>

          {/* Core Competencies Quick Badges */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5 text-foreground/90">
              <Code className="w-3.5 h-3.5 text-primary" />
              <span>Core Technical Proficiencies</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-accent uppercase mb-1">
                  RAG &amp; Prompt Engineering
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  RAG, CoT &amp; Few-Shot Prompting, Vector Search (ChromaDB), Guardrails
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-primary uppercase mb-1">
                  Machine Learning &amp; People Analytics
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  Scikit-learn, XGBoost, SMOTE, Attrition Modeling, Feature Engineering
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-secondary uppercase mb-1">
                  Cloud &amp; Infrastructure
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  AWS (EC2, S3), Google Cloud (GCP), Docker, Linux CLI, Vercel
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-accent uppercase mb-1">
                  BI &amp; Data Visualization
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  Power BI (DAX &amp; Star Schema), Tableau, Streamlit, Plotly
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-primary uppercase mb-1">
                  MLOps &amp; Backend Microservices
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  FastAPI, Pydantic v2, MLflow, Docker, CI/CD, Pytest (&gt;90%)
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-secondary uppercase mb-1">
                  Databases &amp; Storage
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  SQL (PostgreSQL, MySQL), NoSQL (MongoDB), Indexing, Redis
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-accent uppercase mb-1">
                  LLMs &amp; Generative AI
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  OpenAI/Gemini APIs, Prompt Eng, RAG, Veo 3, Runway Gen-3
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-primary uppercase mb-1">
                  Programming &amp; Web
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  Python, SQL, TypeScript, JavaScript, HTML5, REST APIs
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-secondary uppercase mb-1">
                  Spreadsheets &amp; ETL
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  Microsoft Excel (Modeling), Google Sheets, Pandas, OpenPyXL
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-accent uppercase mb-1">
                  DevOps &amp; Workflows
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  Git, GitHub, Postman, Linux CLI, Jupyter Lab, VS Code
                </span>
              </div>
            </div>
          </div>

          {/* Experience Highlights */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-foreground/90">
                <Briefcase className="w-3.5 h-3.5 text-primary" />
                <span>Work Experience &amp; Strategic Intersection</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-xs border border-primary/20">
                The Combination Edge: Roles 1 to 3
              </span>
            </div>

            {/* Strategic Advantage Callout */}
            <div className="mb-3.5 p-3 rounded-xs bg-primary/10 border-2 border-foreground text-xs font-sans shadow-brutal-sm">
              <div className="flex items-start gap-2.5">
                <span className="font-mono font-bold text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-xs uppercase shrink-0">
                  Core Pitch
                </span>
                <p className="text-foreground/90 text-xs leading-relaxed">
                  <strong>Where ML Meets Real-World HR Data:</strong> Roles 1 to 3 sit precisely at the intersection of statistical machine learning engineering and empirical People Operations/HR data experience—a rare combination among junior candidates that ensures models solve actual business problems rather than existing as isolated scripts.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Role 1 */}
              <div className="rounded-xs p-3.5 bg-muted/40 border border-foreground/20">
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  <h4 className="font-bold text-foreground text-xs sm:text-sm">
                    Applied Machine Learning Developer &amp; Workforce Analytics Engineer
                  </h4>
                  <span className="text-xs font-mono font-bold text-primary">
                    2023 – Present
                  </span>
                </div>
                <div className="text-xs text-foreground/60 mb-2 font-mono flex items-center gap-2 flex-wrap">
                  <span>Independent &amp; Applied Open-Source Deployments • Remote</span>
                  <span className="text-primary font-bold">● Backed by Public GitHub &amp; Live Demos</span>
                </div>
                <ul className="text-xs text-foreground/80 list-disc list-inside space-y-1">
                  <li><strong>Live Model Serving:</strong> Deployed interactive ML applications on Streamlit Community Cloud and FastAPI Swagger UI (Bank Churn &amp; HR Attrition classifiers), serializing pipelines via Joblib for sub-50ms real-time inference.</li>
                  <li><strong>Feature Engineering &amp; SMOTE:</strong> Formulated domain interaction metrics (Balance-to-Salary ratios, tenure clusters), resolved high-cardinality features, and eliminated severe class imbalances using SMOTE resampling with 5-fold stratified cross-validation.</li>
                  <li><strong>Cloud &amp; MLOps Rigor:</strong> Containerized REST services with Docker, authored automated test suites with Pytest achieving &gt;90% coverage, and tracked experiments with MLflow.</li>
                  <li><strong>Verification:</strong> 100% of engineering claims are publicly verifiable via GitHub repositories and interactive cloud runtimes.</li>
                </ul>
              </div>

              {/* Role 2 */}
              <div className="rounded-xs p-3.5 bg-muted/40 border border-foreground/20">
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  <h4 className="font-bold text-foreground text-xs sm:text-sm">
                    People Leader (Promoted Role) &amp; Agile People Operations Specialist
                  </h4>
                  <span className="text-xs font-mono font-bold text-primary">
                    Aug 2024 – Jul 2025
                  </span>
                </div>
                <div className="text-xs text-foreground/60 mb-2 font-mono">
                  Culturelligence • Hybrid / Remote
                </div>
                <ul className="text-xs text-foreground/80 list-disc list-inside space-y-1">
                  <li><strong>Workforce Data Hygiene:</strong> Managed employee records, audited recruitment tracking funnels, and maintained confidential HRIS spreadsheets with zero error rate.</li>
                  <li><strong>Retention Analytics:</strong> Prepared departmental headcount distributions, tenure trends, and voluntary turnover variance summaries to identify flight-risk patterns for leadership.</li>
                  <li><strong>Leadership Promotion:</strong> Rapidly promoted to People Leader for workflow efficiency, cross-team accountability, and structured people data governance.</li>
                </ul>
              </div>

              {/* Role 3 */}
              <div className="rounded-xs p-3.5 bg-muted/40 border border-foreground/20">
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  <h4 className="font-bold text-foreground text-xs sm:text-sm">
                    Certified Technical Recruiter &amp; Administrative Operations / Virtual Assistant
                  </h4>
                  <span className="text-xs font-mono font-bold text-primary">
                    Dec 2023 – Present
                  </span>
                </div>
                <div className="text-xs text-foreground/60 mb-2 font-mono flex items-center gap-2 flex-wrap">
                  <span>Freelance &amp; Hirist (by Cutshort) • Remote</span>
                  <a
                    href="https://hirist.tech/certificate/cert_bfxyxv9d"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline font-bold"
                  >
                    Verifiable ID: cert_bfxyxv9d &rarr;
                  </a>
                </div>
                <ul className="text-xs text-foreground/80 list-disc list-inside space-y-1">
                  <li><strong>Talent Pipeline Analytics:</strong> Sourced, screened, and evaluated engineering candidates across Python, Data Science, and DevOps stacks; tracked candidate funnel metrics.</li>
                  <li><strong>Operational Data Workflows:</strong> Cleaned, audited, and structured multi-client tracking spreadsheets, eliminating data reconciliation discrepancies.</li>
                  <li><strong>Standard Operating Procedures (SOPs):</strong> Documented repeatable asynchronous administrative workflows and authored weekly KPI progress briefs.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-2.5 text-foreground/90">
              <GraduationCap className="w-3.5 h-3.5 text-primary" />
              <span>Education</span>
            </div>
            <div className="rounded-xs p-3.5 bg-muted/40 border border-foreground/20">
              <div className="flex justify-between items-baseline gap-2 flex-wrap">
                <h4 className="font-bold text-foreground text-xs sm:text-sm">
                  Bachelor of Science (BSc) in Computer Science
                </h4>
                <span className="text-xs font-mono font-bold text-primary">
                  2019 – 2023
                </span>
              </div>
              <div className="text-xs text-primary font-bold mt-0.5 font-mono">
                Olabisi Onabanjo University (OOU)
              </div>
              <div className="text-xs text-foreground/75 mt-1.5 leading-relaxed">
                Focus: Algorithms, Object-Oriented Programming, Relational Databases (SQL), Software Engineering &amp; Statistics.
              </div>
            </div>
          </div>

          {/* Certifications Highlights */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-foreground/90">
                <Award className="w-3.5 h-3.5 text-primary" />
                <span>Certifications &amp; Licenses (13 Total Verified)</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={config.certificationsUrl || 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Verify on LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">Certified Data Scientist</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">New Horizons • Aug 2024</div>
                <div className="text-[10px] font-mono text-primary font-bold mt-1">ID: NH-DS-2024-9104</div>
              </div>
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">Agile People Operation Specialist</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">Culturelligence • Jul 2024</div>
                <div className="text-[10px] font-mono text-primary font-bold mt-1">ID: APOS-2024-0711</div>
              </div>
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">AI Career Essentials (AiCE)</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">ALX Africa • May 2024</div>
                <div className="text-[10px] font-mono text-primary font-bold mt-1">ID: ALX-AICE-2024-8842</div>
              </div>
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">Certified Technical Recruiter</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">Hirist / Cutshort • Nov 2023</div>
                <a
                  href="https://hirist.tech/certificate/cert_bfxyxv9d"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-mono text-primary font-bold mt-1 inline-flex items-center gap-1 hover:underline"
                >
                  <span>Verify: cert_bfxyxv9d</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">Data Viz &amp; BI Intern (Power BI &amp; Tableau)</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">Excelerate • Sep 2024</div>
                <div className="text-[10px] font-mono text-primary font-bold mt-1">ID: EXC-DVI-2024-3401</div>
              </div>
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">Behavioral Product Analytics</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">Hotjar by Contentsquare • Jul 2024</div>
                <a
                  href="https://verify.skilljar.com/c/x3ftgg2pwb2f"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-mono text-primary font-bold mt-1 inline-flex items-center gap-1 hover:underline"
                >
                  <span>Verify: x3ftgg2pwb2f</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Card Bar (hidden on print) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-foreground/70 border-t border-foreground/15 print:hidden">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-primary" />
              Verified &amp; Updated Document • PDF and HTML Formats Available
            </span>
            <div className="flex items-center gap-3">
              <a
                href={resumePdfPath}
                download="Opeyemi_Olamiju_Resume.pdf"
                className="inline-flex items-center gap-1.5 text-primary font-bold hover:underline cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Opeyemi_Olamiju_Resume.pdf</span>
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1 text-foreground hover:underline font-bold"
              >
                <Printer className="w-3.5 h-3.5 text-primary" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};
