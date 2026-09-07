import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  Terminal,
  Layers,
  BarChart3,
  Cpu,
  CheckCircle2,
  Play,
  Film,
} from 'lucide-react';
import { initialConfig, projects, skillCategories, experienceItems } from './data/portfolioData';
import { PortfolioConfig, Project, AIVideoProject } from './types';
import { Navbar } from './components/Navbar';
import { HeroWorkspaceVisual } from './components/HeroWorkspaceVisual';
import { ProjectCard } from './components/ProjectCard';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';
import { LiveStreamlitModal } from './components/LiveStreamlitModal';
import { ContactSection } from './components/ContactSection';
import { GitHubReposSection } from './components/GitHubReposSection';
import { AnimatedName } from './components/AnimatedName';
import { AIVideoSection } from './components/AIVideoSection';
import { AIVideoModal } from './components/AIVideoModal';

export default function App() {
  const [config, setConfig] = useState<PortfolioConfig>(initialConfig);
  const [allProjects, setAllProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [streamlitProject, setStreamlitProject] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<AIVideoProject | null>(null);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] flex flex-col font-sans selection:bg-stone-800 selection:text-white">
      {/* Navigation */}
      <Navbar config={config} />

      <main className="flex-grow pt-20">
        {/* =========================================================================
            1. HERO SECTION
           ========================================================================= */}
        <section id="hero" className="py-12 sm:py-20 lg:py-24 border-b border-stone-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Natural, Credible Editorial Intro */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span>Available for Roles &amp; AI Media Projects</span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950 leading-[1.2] flex flex-wrap items-baseline gap-x-2.5">
                    <span>Hi, I&apos;m</span>
                    <AnimatedName name={config.name} variant="hero" />
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-semibold text-stone-700 tracking-tight">
                    Data Scientist, ML Engineer &amp; AI Video Creator
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-normal">
                  I engineer practical data &amp; machine learning solutions and direct cinematic, high-conversion AI video commercials using Google Veo 3, Runway Gen-3, Kling, and Luma.
                </p>

                {/* Secondary line */}
                <div className="pt-1 text-xs sm:text-sm font-mono text-stone-500 flex flex-wrap items-center gap-2">
                  <span>Python</span>
                  <span className="text-stone-300">•</span>
                  <span>Machine Learning</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-emerald-700 font-semibold">Generative AI Video</span>
                  <span className="text-stone-300">•</span>
                  <span>Veo 3 / Runway</span>
                  <span className="text-stone-300">•</span>
                  <span>SQL</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="#ai-videos"
                    id="hero-btn-videos"
                    className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-medium text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm"
                  >
                    <Film className="w-4 h-4 text-emerald-200" />
                    <span>Watch AI Videos</span>
                  </a>

                  <a
                    href="#projects"
                    id="hero-btn-work"
                    className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white font-medium text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm"
                  >
                    <span>ML Projects</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>

                  <a
                    href="#contact"
                    id="hero-btn-talk"
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-100 active:bg-stone-200 text-stone-900 border border-stone-300 font-medium text-sm px-4 py-2.5 rounded-md transition-colors"
                  >
                    <span>Let&apos;s Talk</span>
                    <ArrowUpRight className="w-4 h-4 text-stone-500" />
                  </a>
                </div>
              </div>

              {/* Right Column: Authentic Developer Workspace Visual */}
              <div className="lg:col-span-6">
                <HeroWorkspaceVisual />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. ABOUT SECTION
           ========================================================================= */}
        <section id="about" className="py-16 sm:py-24 border-b border-stone-200/80 bg-[#f7f7f5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <span className="text-xs font-mono font-medium text-stone-600 uppercase tracking-wider block mb-2">
                Background &amp; Approach
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-6">
                About Me
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-stone-700 leading-relaxed font-normal">
                <p>
                  I earned my Bachelor of Science (BSc) in Computer Science from Olabisi Onabanjo University (O.O.U), building a rigorous foundation in algorithms, relational databases, Python scripting, and statistics.
                </p>
                <p>
                  My work combines machine learning, statistical modeling, exploratory data analysis, and interactive dashboard development. Alongside applied data science projects in predictive churn and attrition modeling, I have practical experience as an Agile People Operations Specialist and People Leader at Culturelligence and in virtual operational data management.
                </p>
                <p>
                  My goal is to continue deploying practical, value-driving machine learning models while contributing to forward-thinking engineering and analytics teams.
                </p>
              </div>

              {/* Pragmatic Working Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 mt-8 border-t border-stone-300/80">
                <div className="bg-white/80 border border-stone-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1.5 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Clean Data First</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Spending careful effort handling missing values, anomalies, and schema validation before touching any modeling algorithm.
                  </p>
                </div>

                <div className="bg-white/80 border border-stone-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1.5 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Explainable Insights</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Prioritizing interpretable metrics and diagnostic charts that operational teams can understand and act upon.
                  </p>
                </div>

                <div className="bg-white/80 border border-stone-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1.5 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Code Hygiene</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Writing structured Python scripts, reproducible pipelines, and lightweight Streamlit interfaces for hands-on evaluation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SKILLS SECTION
           ========================================================================= */}
        <section id="skills" className="py-16 sm:py-24 border-b border-stone-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono font-medium text-stone-600 uppercase tracking-wider block mb-2">
                Technical Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-3">
                Skills &amp; Technologies
              </h2>
              <p className="text-base text-stone-600 leading-relaxed">
                Technologies I have actively learned and applied across coursework, personal data science projects, and analytical dashboards.
              </p>
            </div>

            {/* Categorized Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((cat) => (
                <div
                  key={cat.title}
                  id={`skill-cat-${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 tracking-tight font-mono uppercase mb-1.5 flex items-center justify-between">
                      <span>{cat.title}</span>
                      <span className="text-[10px] text-stone-600 font-mono">
                        {cat.skills.length} item{cat.skills.length > 1 ? 's' : ''}
                      </span>
                    </h3>
                    <p className="text-xs text-stone-500 mb-4 leading-relaxed font-sans">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center text-xs font-mono bg-stone-100 hover:bg-stone-200 text-stone-800 px-2.5 py-1 rounded border border-stone-200/80 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. FEATURED PROJECTS
           ========================================================================= */}
        <section id="projects" className="py-16 sm:py-24 border-b border-stone-200/80 bg-[#f7f7f5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-900 text-stone-200 text-xs font-mono mb-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Streamlit Cloud Deployments Verified</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-3">
                Selected Projects
              </h2>
              <p className="text-base text-stone-600 leading-relaxed mb-4">
                Applied machine learning classifiers and interactive data intelligence systems deployed on Streamlit Community Cloud.
              </p>

              {/* Streamlit Entrypoints Quick Reference Bar */}
              <div className="p-4 bg-white border border-stone-200 rounded-xl shadow-sm">
                <div className="text-[11px] font-mono uppercase text-stone-600 font-semibold tracking-wider mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Streamlit Model Entry Points (Live Cloud Deployments)</span>
                  </div>
                  <span className="text-stone-400 font-normal">branch: main</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono">
                  {allProjects
                    .filter((p) => p.streamlitDeployment)
                    .map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setStreamlitProject(p)}
                        className="group flex flex-col p-2.5 rounded-lg bg-stone-50 hover:bg-stone-900 text-stone-800 hover:text-stone-100 border border-stone-200 hover:border-stone-900 transition-all text-left shadow-xs hover:shadow-md"
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[11px] font-bold tracking-tight truncate group-hover:text-red-400 text-stone-900">
                            {p.id === 'bank-churn'
                              ? 'Bank Churn Predictor'
                              : p.id === 'hr-analytics'
                              ? 'HR Analytics System'
                              : 'HR Attrition Classifier'}
                          </span>
                          <span className="p-1 rounded bg-red-100 group-hover:bg-red-600 text-red-700 group-hover:text-white transition-colors flex-shrink-0">
                            <Play className="w-2.5 h-2.5 fill-current" />
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-500 group-hover:text-stone-400 truncate">
                          {p.streamlitDeployment}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Project Showcase List */}
            <div className="space-y-10">
              {allProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenCaseStudy={(p) => setSelectedProject(p)}
                  onOpenStreamlit={(p) => setStreamlitProject(p)}
                />
              ))}
            </div>

            {/* All Public GitHub Repositories */}
            <GitHubReposSection />
          </div>
        </section>

        {/* =========================================================================
            5. AI VIDEO & GENERATIVE MEDIA SHOWCASE
           ========================================================================= */}
        <AIVideoSection
          onSelectVideo={(v) => setSelectedVideo(v)}
        />

        {/* =========================================================================
            6. EXPERIENCE & EDUCATION
           ========================================================================= */}
        <section id="experience" className="py-16 sm:py-24 border-b border-stone-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono font-medium text-stone-600 uppercase tracking-wider block mb-2">
                Timeline
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-3">
                Education &amp; Experience
              </h2>
              <p className="text-base text-stone-600 leading-relaxed">
                Academic foundation in Computer Science from Olabisi Onabanjo University (O.O.U) combined with applied machine learning, people operations, and administrative data management.
              </p>
            </div>

            <div className="relative border-l border-stone-200 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
              {experienceItems.map((item) => (
                <div key={item.id} id={`timeline-${item.id}`} className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-stone-900 bg-white" />

                  <div className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-sm max-w-3xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {item.category === 'Education' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>{item.category}</span>
                          </span>
                        ) : item.id === 'exp-ds' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-indigo-800 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Data Science &amp; ML</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-stone-800 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>{item.category}</span>
                          </span>
                        )}
                        <h3 className="text-base sm:text-lg font-bold text-stone-900">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-stone-600 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-stone-600 mb-3">
                      <span>{item.roleOrDegree}</span>
                      <span className="mx-2">•</span>
                      <span>{item.organization}</span>
                    </div>

                    <p className="text-sm text-stone-700 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-stone-100 space-y-1.5">
                      <div className="text-xs font-mono text-stone-600 uppercase font-medium mb-1">
                        Key Focus &amp; Responsibilities:
                      </div>
                      <ul className="space-y-1 text-xs text-stone-600 list-disc list-inside">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="leading-relaxed">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. RESUME SECTION
           ========================================================================= */}
        <section id="resume" className="py-14 sm:py-20 border-b border-stone-200/80 bg-stone-100/70">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <span className="text-xs font-mono font-medium text-stone-600 uppercase tracking-wider block mb-2">
              Full Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-3">
              Want the full picture?
            </h2>
            <p className="text-base text-stone-600 max-w-xl mx-auto mb-6 leading-relaxed">
              Download my résumé to see my background, skills, education, and experience.
            </p>

            <a
              href={config.resumeUrl}
              target="_blank"
              rel="noreferrer"
              id="btn-download-resume"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white font-medium text-sm px-6 py-3 rounded-md transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Résumé</span>
            </a>

            <div className="mt-3 text-xs font-mono text-stone-500">
              Target destination: {config.resumeUrl}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. CONTACT SECTION
           ========================================================================= */}
        <ContactSection config={config} />
      </main>

      {/* =========================================================================
          8. FOOTER
         ========================================================================= */}
      <footer id="site-footer" className="bg-[#121214] text-stone-400 py-12 border-t border-stone-800 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-stone-800">
            <div>
              <div className="text-sm font-bold text-stone-100 font-mono tracking-tight">
                {config.name}
              </div>
              <div className="text-stone-400 mt-0.5">
                Data Scientist • Python Developer
              </div>
            </div>

            {/* Clean footer links */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={config.github}
                target="_blank"
                rel="noreferrer"
                id="footer-link-github"
                className="hover:text-stone-200 transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={config.linkedin}
                target="_blank"
                rel="noreferrer"
                id="footer-link-linkedin"
                className="hover:text-stone-200 transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${config.email}`}
                id="footer-link-email"
                className="hover:text-stone-200 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-[11px] font-mono">
            <div>&copy; 2026 {config.name}. All rights reserved.</div>
            <div className="text-stone-500">
              Data Science • Python Development • Generative Media
            </div>
          </div>
        </div>
      </footer>

      {/* Case Study Deep-Dive Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Live Streamlit Model Explorer Modal */}
      <LiveStreamlitModal
        project={streamlitProject}
        isOpen={!!streamlitProject}
        onClose={() => setStreamlitProject(null)}
        onUpdateStreamlitUrl={(projectId, newUrl) => {
          setAllProjects((prev) =>
            prev.map((p) => (p.id === projectId ? { ...p, streamlitUrl: newUrl } : p))
          );
        }}
      />

      {/* AI Video Modal & Interactive Player */}
      <AIVideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
