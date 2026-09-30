import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, ExternalLink, FileText, CheckCircle2, ChevronDown, ChevronUp, Printer, GraduationCap, Briefcase, Code, Award, Copy, Check } from 'lucide-react';
import { PortfolioConfig } from '../types';
import { PrintableResume } from './PrintableResume';

interface ResumeSectionProps {
  config: PortfolioConfig;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ config }) => {
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [copiedAts, setCopiedAts] = useState(false);

  const resumePdfPath = '/Opeyemi_Olamiju_Resume.pdf';
  const resumeHtmlPath = '/resume.html';

  const copyAtsText = () => {
    const atsText = `OPEYEMI OLAMIJU
Data Scientist | Python & FastAPI Backend Developer | AI Video Creator
Email: ${config.email}
LinkedIn: https://www.linkedin.com/in/opeyemiolamiju/
GitHub: https://github.com/kikibillz
Work Model: Remote & Relocation Ready

SUMMARY:
Data Scientist, Python Backend Developer, and AI Integration Specialist with a solid Computer Science foundation (BSc from Olabisi Onabanjo University - OOU). Combines applied machine learning, production API engineering (FastAPI), and generative AI workflows to build scalable software solutions that deliver immediate business impact. Proven expertise in building sub-50ms ML inference pipelines, robust REST APIs with strict Pydantic v2 schemas, and directing high-conversion commercial generative media.

TECHNICAL SKILLS:
- Programming: Python, TypeScript, JavaScript, SQL, HTML5, CSS3, REST APIs
- Databases & Storage: Relational SQL (PostgreSQL, MySQL, SQLite), NoSQL (MongoDB), Schema Design, Complex Joins & CTEs, Window Functions, Indexing & Query Tuning, Redis
- Machine Learning & Data: Pandas, NumPy, Scikit-learn, XGBoost, Random Forest, SMOTE, Joblib
- Backend & Architecture: FastAPI, Pydantic v2, Uvicorn ASGI, Docker, OpenAPI / Swagger, SQLAlchemy, Pytest (>90% coverage)
- Generative AI & Video: Google Veo 3, Runway Gen-3, Kling AI, Luma Dream Machine, Midjourney v6.1, ElevenLabs
- Visualization & Interfaces: Streamlit, Matplotlib, Seaborn, Plotly, React, Tailwind CSS
- DevOps & Tools: Git, GitHub, Docker, Postman, Linux CLI, Jupyter Lab, VS Code, CI/CD, Vercel

PROFESSIONAL EXPERIENCE:
1. Machine Learning Developer & Data Analyst | Independent & Applied Deployments (2023 - Present)
- Architected, evaluated, and deployed machine learning systems and interactive web applications using Python, Streamlit, and FastAPI.
- Serialized trained classification models (XGBoost, Random Forest) via Joblib, enabling sub-50ms real-time inference latency.
- Engineered domain-specific interaction variables, resolved high-cardinality categorical data, and countered severe class imbalance with SMOTE.
- Built asynchronous REST API endpoints with FastAPI and Pydantic v2 validation contracts, achieving >90% test coverage with Pytest.

2. People Leader & Agile People Operations Specialist | Culturelligence (Aug 2024 - Jul 2025)
- Managed workforce databases, monitored recruitment funnels, and optimized internal employee onboarding data operations.
- Prepared departmental headcount distributions, tenure analytics, and employee retention summaries for leadership review.
- Rapidly promoted to People Leader for demonstrated workflow efficiency, cross-team accountability, and operational excellence.

3. Administrative Support & Virtual Assistant | Freelance & Private Clients (Dec 2024 - Present)
- Automated administrative workflows, maintaining structured tracking spreadsheets and executive databases with zero error rate.
- Standardized operational SOPs, cleaned multi-source business data, and authored weekly KPI progress briefs for stakeholders.

EDUCATION:
Bachelor of Science (BSc) in Computer Science (2019 - 2023)
Olabisi Onabanjo University (OOU) — Ogun State
Core Coursework: Data Structures & Algorithms, Object-Oriented Programming (Python & Java), Database Management Systems (SQL), Software Engineering, Probability & Statistics.

VERIFIED CERTIFICATIONS (13 TOTAL):
- Certified Data Scientist (New Horizons)
- Certified Product Manager - CPM (BeTechified)
- Agile People Operation Specialist (Culturelligence)
- UI/UX Design (Dev and Design)
- Product Management (Prodefied)
- AI Career Essentials (alx_africa)
- Hotjar Learning - Behavioral Analytics (Contentsquare | ID: x3ftgg2pwb2f)
- Tech Recruiter (hirist | ID: cert_bfxyxv9d)
- Remote Work Certification (FOGDEV)
- Data Visualization Intern (Excelerate)
- Digital Teacher (UNESCO IOC)
- Virtual Assistant (alx_africa)
- Jobberman Soft Skills Training (Jobberman)
Verification URL: https://www.linkedin.com/in/opeyemiolamiju/details/certifications/
`;
    navigator.clipboard.writeText(atsText).then(() => {
      setCopiedAts(true);
      setTimeout(() => setCopiedAts(false), 2500);
    });
  };

  return (
    <div className="w-full">
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
              <span>Executive Profile</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-sans">
              Data Scientist and Backend Developer backed by a Computer Science foundation from <strong>Olabisi Onabanjo University (OOU)</strong>. Bridges theoretical machine learning with production software systems—engineering high-throughput asynchronous REST APIs (FastAPI), training serialized predictive models (XGBoost, Random Forest), and directing generative AI multimedia workflows with rapid turnaround.
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
                <span className="font-mono font-bold block text-[11px] text-primary uppercase mb-1">
                  Programming
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  Python, TypeScript, JavaScript, SQL, HTML
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-primary uppercase mb-1">
                  Databases &amp; Storage
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  SQL (PostgreSQL), NoSQL (MongoDB), SQLite, Redis
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-secondary uppercase mb-1">
                  Data Science &amp; ML
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  Pandas, NumPy, Scikit-learn, XGBoost, SMOTE
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-accent uppercase mb-1">
                  Backend &amp; APIs
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  FastAPI, Pydantic v2, Uvicorn, Docker, Pytest
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-primary uppercase mb-1">
                  Generative AI
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  Google Veo 3, Runway Gen-3, Kling, ElevenLabs
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-secondary uppercase mb-1">
                  Visualization &amp; UI
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  Streamlit, Matplotlib, Seaborn, React, Tailwind
                </span>
              </div>
              <div className="p-2.5 rounded-xs bg-muted/50 border border-foreground/20">
                <span className="font-mono font-bold block text-[11px] text-accent uppercase mb-1">
                  DevOps &amp; Tools
                </span>
                <span className="text-foreground/80 font-mono text-[11px]">
                  Git, GitHub, Docker, Postman, Linux CLI
                </span>
              </div>
            </div>
          </div>

          {/* Experience Highlights */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider mb-3 text-foreground/90">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <span>Work Experience</span>
            </div>
            <div className="space-y-3">
              <div className="rounded-xs p-3.5 bg-muted/40 border border-foreground/20">
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  <h4 className="font-bold text-foreground text-xs sm:text-sm">
                    Machine Learning Developer &amp; Data Analyst
                  </h4>
                  <span className="text-xs font-mono font-bold text-primary">
                    2023 – Present
                  </span>
                </div>
                <div className="text-xs text-foreground/60 mb-2 font-mono">
                  Independent &amp; Applied Open-Source Deployments • Remote
                </div>
                <ul className="text-xs text-foreground/80 list-disc list-inside space-y-1">
                  <li>Deployed production ML services (Streamlit &amp; FastAPI) with sub-50ms inference.</li>
                  <li>Crafted feature pipelines, handled high-cardinality data, and balanced sets with SMOTE.</li>
                  <li>Implemented asynchronous REST endpoints with Pydantic v2 validation contracts.</li>
                </ul>
              </div>

              <div className="rounded-xs p-3.5 bg-muted/40 border border-foreground/20">
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  <h4 className="font-bold text-foreground text-xs sm:text-sm">
                    People Leader &amp; Agile People Operations Specialist
                  </h4>
                  <span className="text-xs font-mono font-bold text-primary">
                    Aug 2024 – Jul 2025
                  </span>
                </div>
                <div className="text-xs text-foreground/60 mb-2 font-mono">
                  Culturelligence • Hybrid / Remote
                </div>
                <ul className="text-xs text-foreground/80 list-disc list-inside space-y-1">
                  <li>Managed workforce records, recruitment tracking metrics, and internal people data.</li>
                  <li>Promoted to People Leader for workflow efficiency, cross-team accountability, and operational excellence.</li>
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
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">New Horizons • Aug 2026</div>
              </div>
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">Certified Product Manager (CPM)</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">BeTechified • Feb 2025</div>
              </div>
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">Agile People Operation Specialist</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">Culturelligence • Jul 2025</div>
              </div>
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">UI/UX Design</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">Dev and Design • May 2025</div>
              </div>
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">AI Career Essentials</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">alx_africa • Generative AI</div>
              </div>
              <div className="rounded-xs p-2.5 bg-muted/50 border border-foreground/20">
                <div className="font-bold text-foreground">Hotjar Learning (Analytics)</div>
                <div className="text-[11px] text-foreground/70 font-mono mt-0.5">Contentsquare • ID: x3ftgg2pwb2f</div>
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
    </div>
  );
};
