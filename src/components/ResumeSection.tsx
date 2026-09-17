import React, { useState } from 'react';
import { Download, ExternalLink, FileText, CheckCircle2, ChevronDown, ChevronUp, Printer, GraduationCap, Briefcase, Code } from 'lucide-react';
import { PortfolioConfig } from '../types';

interface ResumeSectionProps {
  config: PortfolioConfig;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ config }) => {
  const [showFullPreview, setShowFullPreview] = useState(false);

  const resumePdfPath = '/Opeyemi_Olamiju_Resume.pdf';
  const resumeHtmlPath = '/resume.html';

  return (
    <section id="resume" className="py-16 sm:py-24 border-b border-stone-200/80 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/50 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-2">
            Curriculum Vitae &amp; Credentials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3">
            Want the full picture?
          </h2>
          <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
            Download my comprehensive résumé detailing my technical skills, machine learning pipelines, backend services, work experience, and academic foundation.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <a
            href={resumePdfPath}
            download="Opeyemi_Olamiju_Resume.pdf"
            id="btn-download-resume"
            className="inline-flex items-center gap-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-950 font-medium text-sm px-6 py-3 rounded-lg transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>Download PDF Résumé</span>
            <span className="text-[11px] font-mono opacity-70 px-1.5 py-0.5 rounded bg-white/10 dark:bg-black/10">
              .PDF
            </span>
          </a>

          <a
            href={resumeHtmlPath}
            target="_blank"
            rel="noreferrer"
            id="btn-view-printable-cv"
            className="inline-flex items-center gap-2 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 font-medium text-sm px-5 py-3 rounded-lg transition-all shadow-2xs active:scale-[0.98] cursor-pointer"
          >
            <Printer className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            <span>View &amp; Print Clean CV</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>

          <button
            type="button"
            onClick={() => setShowFullPreview(!showFullPreview)}
            id="btn-toggle-resume-preview"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 px-3.5 py-2.5 rounded-lg border border-transparent hover:border-stone-300 dark:hover:border-stone-700 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{showFullPreview ? 'Hide Quick Preview' : 'Interactive On-Page Preview'}</span>
            {showFullPreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Executive Resume Card Preview */}
        <div className="bg-white dark:bg-stone-950 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden transition-all">
          {/* Card Top Banner */}
          <div className="p-6 sm:p-8 border-b border-stone-100 dark:border-stone-900 bg-stone-50/50 dark:bg-stone-900/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                    OPEYEMI OLAMIJU
                  </span>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Build with Ope
                  </span>
                </div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400 mt-1">
                  Data Scientist • Python &amp; FastAPI Backend Developer • AI Video Creator
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-stone-500 dark:text-stone-400 mt-2">
                  <span>📍 Lagos, Nigeria</span>
                  <span>✉️ {config.email}</span>
                  <span>💻 github.com/kikibillz</span>
                </div>
              </div>

              <div className="shrink-0 flex sm:flex-col items-start sm:items-end gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 text-xs font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  Available for Roles &amp; Contracts
                </span>
                <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500">
                  BSc in Computer Science (2023)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Highlights Summary */}
          <div className="p-6 sm:p-8 space-y-6 text-sm">
            {/* Core Competencies Quick Badges */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
                <Code className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Core Technical Proficiencies</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Python',
                  'TypeScript',
                  'JavaScript',
                  'HTML',
                  'SQL',
                  'FastAPI',
                  'Pydantic v2',
                  'Scikit-learn',
                  'XGBoost',
                  'Streamlit',
                  'Docker',
                  'Google Veo 3',
                  'Runway Gen-3',
                  'Pandas',
                  'NumPy',
                  'Git',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-mono text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Expandable Extended Section */}
            {showFullPreview && (
              <div className="space-y-6 pt-4 border-t border-stone-100 dark:border-stone-900">
                {/* Experience Highlights */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-3">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Work Experience</span>
                  </div>
                  <div className="space-y-3.5">
                    <div className="rounded-lg p-3.5 bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="font-semibold text-stone-900 dark:text-stone-100">
                          Machine Learning Developer &amp; Data Analyst
                        </h4>
                        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                          2023 – Present
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                        Independent &amp; Applied Open-Source Deployments
                      </div>
                      <ul className="text-xs text-stone-600 dark:text-stone-400 list-disc list-inside space-y-1">
                        <li>Deployed production ML services (Streamlit &amp; FastAPI) with sub-50ms inference.</li>
                        <li>Crafted feature pipelines, handled high-cardinality data, and balanced sets with SMOTE.</li>
                        <li>Implemented asynchronous REST endpoints with Pydantic v2 validation contracts.</li>
                      </ul>
                    </div>

                    <div className="rounded-lg p-3.5 bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800">
                      <div className="flex justify-between items-baseline gap-2">
                        <h4 className="font-semibold text-stone-900 dark:text-stone-100">
                          People Leader &amp; Agile People Operations Specialist
                        </h4>
                        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                          Aug 2024 – Jul 2025
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                        Culturelligence
                      </div>
                      <ul className="text-xs text-stone-600 dark:text-stone-400 list-disc list-inside space-y-1">
                        <li>Managed workforce records, recruitment tracking metrics, and internal people data.</li>
                        <li>Promoted to People Leader for workflow efficiency, cross-team accountability, and operational excellence.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Education</span>
                  </div>
                  <div className="rounded-lg p-3.5 bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200/80 dark:border-stone-800">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-semibold text-stone-900 dark:text-stone-100">
                        Bachelor of Science (BSc) in Computer Science
                      </h4>
                      <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                        2019 – 2023
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Olabisi Onabanjo University (O.O.U) — Ogun State, Nigeria
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                      Focus: Algorithms, Object-Oriented Programming, Relational Databases (SQL), Software Engineering &amp; Statistics.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Card Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-stone-900">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Verified &amp; Updated Document • PDF and HTML Formats Available
              </span>
              <a
                href={resumePdfPath}
                download="Opeyemi_Olamiju_Resume.pdf"
                className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Opeyemi_Olamiju_Resume.pdf</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
