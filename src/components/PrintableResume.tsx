import React from 'react';
import { PortfolioConfig, CertificationItem } from '../types';

interface PrintableResumeProps {
  config: PortfolioConfig;
  certifications?: CertificationItem[];
}

export const PrintableResume: React.FC<PrintableResumeProps> = ({ config, certifications = [] }) => {
  return (
    <div id="printable-resume-container" className="printable-resume-root bg-white text-slate-900 font-sans leading-normal">
      {/* ========================================================
          PAGE 1: Profile, Executive Summary, Skills, Experience
         ======================================================== */}
      <div className="resume-page resume-page-1 p-8 sm:p-10 max-w-[850px] mx-auto bg-white border border-slate-200 print:border-none print:p-0 print:m-0 print:max-w-none">
        {/* Top Header Accent */}
        <div className="w-full h-1 bg-[#0f766e] mb-4" />

        {/* Header Block */}
        <header className="border-b-2 border-slate-200 pb-3.5 mb-4">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                OPEYEMI OLAMIJU{' '}
                <span className="text-xs font-mono font-bold text-[#0f766e] normal-case tracking-normal">
                  (Build with Ope)
                </span>
              </h1>
              <p className="text-xs font-bold text-[#0f766e] mt-0.5 tracking-wide">
                Data Scientist • Python &amp; FastAPI Backend Developer • AI Video Creator
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-300">
                ● AVAILABLE FOR ROLES
              </span>
              <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                BSc in Computer Science · OOU
              </p>
            </div>
          </div>

          {/* Contact Bar */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-600 mt-2 font-mono">
            <span>✉️ {config.email}</span>
            <span>🔗 linkedin.com/in/opeyemiolamiju</span>
            <span>💻 github.com/kikibillz</span>
            <span>📍 Remote &amp; Relocation Ready</span>
          </div>
        </header>

        {/* Section 1: Executive Summary */}
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-1.5 border-b border-slate-200 pb-1">
            <span className="w-1 h-3.5 bg-[#0f766e] rounded-xs" />
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
              Executive Summary &amp; Strategic Intersection
            </h2>
          </div>
          <p className="text-[11.5px] leading-relaxed text-slate-700">
            Data Scientist, ML Backend Engineer, and People Analytics Specialist with a Computer Science foundation (BSc from Olabisi Onabanjo University - OOU). Distinctive value proposition sits where <strong>statistical machine learning meets real-world HR &amp; workforce data operations</strong>—translating employee tenure signals, voluntary turnover variance, and statutory financial ledgers into high-impact predictive systems. All engineering and backend claims are 100% verified through public GitHub repositories (&gt;90% Pytest coverage), containerized Docker images, and deployed live interactive cloud runtimes (Streamlit and FastAPI Swagger OpenAPI).
          </p>
        </section>

        {/* Section 2: Technical Proficiencies */}
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-1.5 border-b border-slate-200 pb-1">
            <span className="w-1 h-3.5 bg-[#0f766e] rounded-xs" />
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
              Core Technical Proficiencies
            </h2>
          </div>
          <div className="grid grid-cols-[140px_1fr] gap-x-3 gap-y-1 text-[11px]">
            <span className="font-bold text-slate-900">Machine Learning &amp; People:</span>
            <span className="text-slate-700">Scikit-learn, XGBoost, Random Forest, SMOTE Balancing, Workforce Attrition Modeling, Feature Engineering</span>

            <span className="font-bold text-slate-900">Cloud &amp; MLOps:</span>
            <span className="text-slate-700">AWS (EC2, S3), Google Cloud (GCP), Microsoft Azure Fundamentals, Docker Containers, MLflow, CI/CD (GitHub Actions)</span>

            <span className="font-bold text-slate-900">BI &amp; Visualization:</span>
            <span className="text-slate-700">Power BI (DAX &amp; Star Schema Modeling), Tableau, Streamlit, Plotly Dashboards, Seaborn, KPI Design</span>

            <span className="font-bold text-slate-900">Backend &amp; APIs:</span>
            <span className="text-slate-700">FastAPI, Pydantic v2, Uvicorn ASGI, Docker, OpenAPI / Swagger, SQLAlchemy, Pytest (&gt;90% cov)</span>

            <span className="font-bold text-slate-900">Databases &amp; Storage:</span>
            <span className="text-slate-700">SQL (PostgreSQL, MySQL, SQLite), NoSQL (MongoDB), Schema Design, Complex Joins, Window Functions, Redis</span>

            <span className="font-bold text-slate-900">LLMs &amp; Generative AI:</span>
            <span className="text-slate-700">Large Language Models (LLMs), RAG Architectures, OpenAI &amp; Gemini APIs, Prompt Engineering, Veo 3, Runway Gen-3</span>

            <span className="font-bold text-slate-900">Programming &amp; Web:</span>
            <span className="text-slate-700">Python, SQL, TypeScript, JavaScript, HTML5, REST APIs, Git, GitHub, OpenPyXL</span>
          </div>
        </section>

        {/* Section 3: Professional Experience */}
        <section className="mb-2">
          <div className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-1">
            <span className="w-1 h-3.5 bg-[#0f766e] rounded-xs" />
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
              Professional Experience (The Combination Advantage: Roles 1–3)
            </h2>
          </div>

          {/* Job 1 */}
          <div className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xs font-bold text-slate-900">
                Applied Machine Learning Developer &amp; Workforce Analytics Engineer
              </h3>
              <span className="text-[10.5px] font-mono font-bold text-[#0f766e]">
                2023 – Present
              </span>
            </div>
            <div className="text-[10.5px] italic text-slate-500 mb-1">
              Independent &amp; Applied Open-Source Deployments • Remote (Validated via GitHub &amp; Live Demos)
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700 pl-1">
              <li>Architected, evaluated, and deployed machine learning systems and interactive web applications using Python, Streamlit, and FastAPI.</li>
              <li>Serialized trained classification models (XGBoost, Random Forest) via Joblib, enabling sub-50ms real-time inference latency.</li>
              <li>Engineered domain interaction variables, resolved high-cardinality categorical data, and countered severe class imbalance with SMOTE.</li>
              <li>Built asynchronous REST API endpoints with FastAPI and Pydantic v2 validation contracts, achieving &gt;90% test coverage with Pytest.</li>
              <li>Published 100% of source code openly to GitHub with automated CI/CD workflows and live cloud runtimes on Streamlit and Vercel.</li>
            </ul>
          </div>

          {/* Job 2 */}
          <div className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="text-xs font-bold text-slate-900">
                People Leader (Promoted) &amp; Agile People Operations Specialist
              </h3>
              <span className="text-[10.5px] font-mono font-bold text-[#0f766e]">
                Aug 2024 – Jul 2025
              </span>
            </div>
            <div className="text-[10.5px] italic text-slate-500 mb-1">
              Culturelligence • Hybrid / Remote
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700 pl-1">
              <li>Managed workforce databases, monitored recruitment funnels, and optimized internal employee onboarding data operations.</li>
              <li>Prepared departmental headcount distributions, tenure analytics, and employee retention summaries for leadership review.</li>
              <li>Rapidly promoted to People Leader for demonstrated workflow efficiency, cross-team accountability, and operational excellence.</li>
            </ul>
          </div>

          {/* Job 3 */}
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="text-xs font-bold text-slate-900">
                Certified Technical Recruiter &amp; Administrative Operations / Virtual Assistant
              </h3>
              <span className="text-[10.5px] font-mono font-bold text-[#0f766e]">
                Dec 2023 – Present
              </span>
            </div>
            <div className="text-[10.5px] italic text-slate-500 mb-1">
              Freelance &amp; Hirist (by Cutshort) • Remote (Credential ID: cert_bfxyxv9d)
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-700 pl-1">
              <li>Screened and evaluated technical engineering candidates across Python, Data Science, and DevOps stacks with structured scorecard analytics.</li>
              <li>Automated administrative workflows, maintaining structured tracking spreadsheets and executive databases with zero error rate.</li>
              <li>Standardized operational SOPs, cleaned multi-source business data, and authored weekly KPI progress briefs for stakeholders.</li>
            </ul>
          </div>
        </section>

        {/* Page 1 Footer */}
        <div className="border-t border-slate-200 pt-2 mt-4 flex justify-between text-[10px] text-slate-400 font-mono">
          <span>Opeyemi Olamiju — Curriculum Vitae</span>
          <span>Page 1 of 2</span>
        </div>
      </div>

      {/* Page Break for Printing */}
      <div className="page-break my-6 print:my-0 print:border-none border-t-2 border-dashed border-slate-300 relative text-center print:hidden">
        <span className="bg-slate-100 text-slate-500 font-mono text-[10px] uppercase px-3 py-1 rounded relative -top-3">
          Page 2 Break
        </span>
      </div>

      {/* ========================================================
          PAGE 2: Projects, Education (OOU), Certifications
         ======================================================== */}
      <div className="resume-page resume-page-2 p-8 sm:p-10 max-w-[850px] mx-auto bg-white border border-slate-200 print:border-none print:p-0 print:m-0 print:max-w-none">
        {/* Top Header Accent */}
        <div className="w-full h-1 bg-[#0f766e] mb-3" />

        {/* Mini Header */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-4 text-[10.5px] font-mono text-slate-500">
          <span className="font-bold text-slate-900">OPEYEMI OLAMIJU — CURRICULUM VITAE (CONTINUED)</span>
          <span>{config.email}</span>
        </div>

        {/* Section 4: Key Applied Projects */}
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-1">
            <span className="w-1 h-3.5 bg-[#0f766e] rounded-xs" />
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
              Key Applied Engineering Projects
            </h2>
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <h3 className="text-xs font-bold text-slate-900">
                  Enterprise Hybrid Data Platform (PostgreSQL SQL &amp; MongoDB NoSQL)
                </h3>
                <span className="text-[10px] font-mono font-bold text-[#0f766e]">
                  SQL • PostgreSQL • NoSQL • MongoDB • SQLAlchemy • PyMongo
                </span>
              </div>
              <p className="text-[11px] text-slate-700 mt-0.5">
                Dual-engine data platform integrating ACID relational PostgreSQL schemas with MongoDB document collections for real-time telemetry, 4.5x indexing speedup, and sub-25ms analytical queries across 1.2M+ records.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <h3 className="text-xs font-bold text-slate-900">
                  FastAPI Production ML Inference &amp; Validation Service
                </h3>
                <span className="text-[10px] font-mono font-bold text-[#0f766e]">
                  FastAPI • Pydantic v2 • Uvicorn • Docker • Scikit-learn
                </span>
              </div>
              <p className="text-[11px] text-slate-700 mt-0.5">
                High-throughput asynchronous REST API serving ML models with strict request validation, automated interactive Swagger UI docs, and sub-15ms response latency.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <h3 className="text-xs font-bold text-slate-900">
                  Bank Customer Churn Predictor &amp; Retention Engine
                </h3>
                <span className="text-[10px] font-mono font-bold text-[#0f766e]">
                  Python • Scikit-learn • XGBoost • Streamlit • Pandas
                </span>
              </div>
              <p className="text-[11px] text-slate-700 mt-0.5">
                Supervised classification platform predicting customer churn with 86% ROC-AUC, interactive risk probability dials, and automated financial retention strategies.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <h3 className="text-xs font-bold text-slate-900">
                  HR Analytics &amp; Employee Attrition Intelligence
                </h3>
                <span className="text-[10px] font-mono font-bold text-[#0f766e]">
                  Python • Streamlit • Seaborn • Random Forest
                </span>
              </div>
              <p className="text-[11px] text-slate-700 mt-0.5">
                Workforce analytics platform diagnosing turnover drivers across tenure, salary, and satisfaction metrics to forecast retention risks with real-time scoring.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-baseline flex-wrap gap-1">
                <h3 className="text-xs font-bold text-slate-900">
                  Commercial Generative AI Video Productions
                </h3>
                <span className="text-[10px] font-mono font-bold text-[#0f766e]">
                  Google Veo 3 • Runway Gen-3 • Kling AI • ElevenLabs
                </span>
              </div>
              <p className="text-[11px] text-slate-700 mt-0.5">
                Directed commercial video campaigns (Indomie Noodles, Luxury Real Estate, AI Tech Promos) engineering cinematic prompts, motion brush cameras, and audio design.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Education */}
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-1.5 border-b border-slate-200 pb-1">
            <span className="w-1 h-3.5 bg-[#0f766e] rounded-xs" />
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
              Education &amp; Academic Background
            </h2>
          </div>
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="text-xs font-bold text-slate-900">
                Bachelor of Science (BSc) in Computer Science
              </h3>
              <span className="text-[10.5px] font-mono font-bold text-[#0f766e]">
                2019 – 2023
              </span>
            </div>
            <div className="text-[11px] font-bold text-[#0f766e]">
              Olabisi Onabanjo University (OOU) — Ogun State
            </div>
            <p className="text-[10.8px] text-slate-600 mt-1">
              Core Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming (Python &amp; Java), Database Management Systems (SQL), Software Engineering, Probability &amp; Statistics, Discrete Mathematics, Computer Architecture.
            </p>
          </div>
        </section>

        {/* Section 6: Verified Certifications & Licenses */}
        <section className="mb-3">
          <div className="flex justify-between items-center mb-2 border-b border-slate-200 pb-1">
            <div className="flex items-center gap-2">
              <span className="w-1 h-3.5 bg-[#0f766e] rounded-xs" />
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
                Verified Certifications &amp; Licenses (13 Total)
              </h2>
            </div>
            <a
              href={config.certificationsUrl || 'https://www.linkedin.com/in/opeyemiolamiju/details/certifications/'}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-mono text-[#0f766e] underline"
            >
              Verify on LinkedIn &rarr;
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10.5px]">
            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">Certified Data Scientist</div>
              <div className="text-slate-500 text-[10px]">New Horizons • Aug 2024 (ID: NH-DS-2024-9104)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">Agile People Operation Specialist</div>
              <div className="text-slate-500 text-[10px]">Culturelligence • Jul 2024 (ID: APOS-2024-0711)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">AI Career Essentials (AiCE)</div>
              <div className="text-slate-500 text-[10px]">ALX Africa • May 2024 (ID: ALX-AICE-2024-8842)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">Certified Technical Recruiter</div>
              <div className="text-slate-500 text-[10px]">Hirist / Cutshort • Nov 2023 (ID: cert_bfxyxv9d)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">Data Visualization &amp; BI Intern</div>
              <div className="text-slate-500 text-[10px]">Excelerate • Sep 2024 (ID: EXC-DVI-2024-3401)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">Behavioral Product Analytics</div>
              <div className="text-slate-500 text-[10px]">Hotjar by Contentsquare • Jul 2024 (ID: x3ftgg2pwb2f)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">Certified Product Manager (CPM)</div>
              <div className="text-slate-500 text-[10px]">BeTechified • Feb 2024 (ID: CPM-BT-2024-1829)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">UI/UX Design Certification</div>
              <div className="text-slate-500 text-[10px]">Dev and Design • May 2024 (ID: DD-UIUX-2024-5510)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">Applied Product Management</div>
              <div className="text-slate-500 text-[10px]">Prodefied • Oct 2024 (ID: PDF-PM-2024-6012)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">Professional Virtual Assistant</div>
              <div className="text-slate-500 text-[10px]">ALX Africa • Dec 2023 (ID: ALX-VA-2023-7190)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">Remote Work Professional</div>
              <div className="text-slate-500 text-[10px]">FOGDEV • Jun 2024 (ID: FOG-RWP-2024-2098)</div>
            </div>

            <div className="border-l-2 border-teal-500 pl-2">
              <div className="font-bold text-slate-900">Workplace Soft Skills</div>
              <div className="text-slate-500 text-[10px]">Jobberman • Oct 2020 (ID: JBM-SS-2020-4491)</div>
            </div>
          </div>

          <div className="mt-2 p-1.5 bg-slate-50 rounded border border-slate-200 text-[10px] text-slate-600 italic">
            * All 13 certifications authenticated with verifiable IDs and digital badges on LinkedIn: linkedin.com/in/opeyemiolamiju/details/certifications/
          </div>
        </section>

        {/* Page 2 Footer */}
        <div className="border-t border-slate-200 pt-2 mt-4 flex justify-between text-[10px] text-slate-400 font-mono">
          <span>Opeyemi Olamiju — Curriculum Vitae</span>
          <span>Page 2 of 2</span>
        </div>
      </div>
    </div>
  );
};
