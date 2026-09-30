import React from 'react';
import { PortfolioConfig } from '../types';

interface PrintableCoverLetterProps {
  config: PortfolioConfig;
  roleTitle?: string;
  companyName?: string;
  hiringManager?: string;
  focusArea?: string;
  date?: string;
}

export const PrintableCoverLetter: React.FC<PrintableCoverLetterProps> = ({
  config,
  roleTitle = 'Data Scientist & Machine Learning Engineer',
  companyName = 'Hiring Organization',
  hiringManager = 'Hiring Team & Leadership',
  focusArea = 'ML & Workforce Analytics Synergy',
  date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
}) => {
  return (
    <div id="printable-cover-letter-container" className="printable-cover-letter-root bg-white text-slate-900 font-sans leading-normal">
      <div className="cover-letter-page p-8 sm:p-12 max-w-[850px] mx-auto bg-white border border-slate-200 print:border-none print:p-0 print:m-0 print:max-w-none min-h-[1050px] flex flex-col justify-between">
        <div>
          {/* Top Editorial Accent Stripe */}
          <div className="w-full h-1.5 bg-[#0f766e] mb-6" />

          {/* Letterhead Header */}
          <header className="border-b-2 border-slate-200 pb-5 mb-6">
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                  OPEYEMI OLAMIJU{' '}
                  <span className="text-xs font-mono font-bold text-[#0f766e] normal-case tracking-normal">
                    (Build with Ope)
                  </span>
                </h1>
                <p className="text-xs sm:text-sm font-bold text-[#0f766e] mt-1 tracking-wide">
                  Data Scientist • ML Systems Engineer • People Analytics Specialist
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-300">
                  ● AVAILABLE FOR ROLES
                </span>
                <p className="text-[11px] font-mono text-slate-500 mt-1">
                  BSc in Computer Science · OOU
                </p>
              </div>
            </div>

            {/* Contact Metadata Bar */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-[11.5px] text-slate-600 mt-3 font-mono">
              <span>✉️ {config.email}</span>
              <span>🔗 linkedin.com/in/opeyemiolamiju</span>
              <span>💻 github.com/kikibillz</span>
              <span>📍 Remote &amp; Relocation Ready</span>
            </div>
          </header>

          {/* Date & Recipient Block */}
          <div className="mb-6 text-[12px] font-mono text-slate-600">
            <p className="font-semibold text-slate-800">{date}</p>
            <div className="mt-3">
              <p className="font-bold text-slate-900 text-sm">{hiringManager}</p>
              <p className="text-slate-700">{companyName}</p>
              <p className="text-slate-500 italic mt-0.5">Re: Application for {roleTitle}</p>
            </div>
          </div>

          {/* Formal Salutation */}
          <div className="mb-4">
            <p className="text-sm font-bold text-slate-900">
              Dear {hiringManager},
            </p>
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-4 text-[12.5px] sm:text-[13px] leading-relaxed text-slate-700 text-justify">
            <p>
              I am writing to express my strong enthusiasm for the <strong className="text-slate-900 font-semibold">{roleTitle}</strong> position at <strong className="text-slate-900 font-semibold">{companyName}</strong>. With a Bachelor of Science in Computer Science from Olabisi Onabanjo University (OOU), 13 verified certifications, and hands-on experience building end-to-end predictive machine learning pipelines and high-throughput Python backends, I bring a unique dual-domain foundation that bridges mathematical model engineering with empirical business and workforce operations.
            </p>

            <p>
              My primary differentiator is where <strong className="text-slate-900 font-semibold">statistical machine learning meets real-world HR and workforce intelligence</strong>. Unlike candidates with purely academic or textbook machine learning backgrounds, I have operated inside fast-moving People Operations environments at Culturelligence, managing headcount distribution, auditing recruitment tracking funnels, and computing retention hazard variance. I transform abstract organizational telemetry—such as employee tenure, engagement signals, and voluntary turnover patterns—into calibrated predictive classification systems (XGBoost, Random Forest, SMOTE balancing) and executive Power BI / Tableau dashboards that empower leadership to take proactive, data-informed intervention.
            </p>

            <p>
              Because self-directed engineering claims carry weight through verifiable execution, every system I build is validated by employer-grade standards. My production portfolio includes containerized <strong className="text-slate-900 font-semibold">FastAPI microservices</strong> adhering to Pydantic v2 validation contracts with automated Swagger documentation, asynchronous database querying (PostgreSQL &amp; MongoDB), and rigorous unit test suites achieving <strong className="text-slate-900 font-semibold">&gt;90% Pytest code coverage</strong>. Furthermore, I have developed automated financial ETL pipelines in Python (OpenPyXL/Pandas) calculating statutory 20% tax withholdings with dynamic formulas and zero calculation discrepancies, alongside live public cloud deployments running on Streamlit and Vercel.
            </p>

            <p>
              Beyond modeling and backend architecture, I leverage modern <strong className="text-slate-900 font-semibold">MLOps tooling (MLflow, Docker, CI/CD with GitHub Actions, AWS/GCP runtimes)</strong> and generative AI workflows (LLM APIs, prompt engineering, and commercial multimodal video generation). I thrive in collaborative, high-velocity teams where technical precision, clean software design, and quantifiable business outcomes are paramount.
            </p>

            <p>
              Thank you for your time and consideration. I would welcome the opportunity to discuss how my combined expertise in predictive machine learning, high-reliability Python engineering, and people data analytics can drive immediate value for <strong className="text-slate-900 font-semibold">{companyName}</strong>. All of my code repositories and interactive cloud demos are publicly inspectable at <a href="https://github.com/kikibillz" target="_blank" rel="noreferrer" className="text-[#0f766e] font-semibold underline">github.com/kikibillz</a>.
            </p>
          </div>
        </div>

        {/* Formal Sign-off and Signature Block */}
        <div className="mt-8 pt-5 border-t border-slate-200">
          <p className="text-[12px] font-mono text-slate-600 mb-2">Sincerely,</p>
          <div className="font-display font-black text-xl uppercase tracking-wider text-slate-900">
            OPEYEMI OLAMIJU
          </div>
          <p className="text-xs font-mono text-[#0f766e] font-semibold mt-0.5">
            Data Scientist &amp; Machine Learning Engineer · Build with Ope
          </p>
          <p className="text-[11px] font-mono text-slate-500 mt-1">
            B.Sc. Computer Science · OOU Alumnus · Available Worldwide (Remote / Relocation)
          </p>
        </div>
      </div>
    </div>
  );
};
