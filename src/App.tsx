import React, { useState, useEffect } from 'react';
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
  MapPin,
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
import { FastApiBackendSection } from './components/FastApiBackendSection';
import { ResumeSection } from './components/ResumeSection';

export default function App() {
  const [config, setConfig] = useState<PortfolioConfig>(initialConfig);
  const [allProjects, setAllProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [streamlitProject, setStreamlitProject] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<AIVideoProject | null>(null);

  // Auto-detect and display the natural photograph (from local storage or candidate static paths)
  const [naturalPhoto, setNaturalPhoto] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio_natural_photo');
      if (stored && (stored.includes('opeyemi') || stored.startsWith('data:image'))) {
        return stored;
      }
      localStorage.removeItem('portfolio_natural_photo');
    }
    return null;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Strict priority: ONLY Opeyemi picture paths
    const candidatePaths = [
      '/images/opeyemi picture.png',
      '/images/opeyemi%20picture.png',
      '/images/opeyemi.png',
      '/opeyemi picture.png',
      '/opeyemi%20picture.png',
      '/opeyemi.png',
    ];

    let isMounted = true;

    const testCandidates = async () => {
      for (const path of candidatePaths) {
        try {
          const isValid = await new Promise<boolean>((resolve) => {
            const testImg = new window.Image();
            testImg.onload = () => resolve(testImg.naturalWidth > 0);
            testImg.onerror = () => resolve(false);
            testImg.src = path;
          });

          if (isValid && isMounted) {
            setNaturalPhoto(path);
            break;
          }
        } catch {
          // continue checking next path
        }
      }
    };

    testCandidates();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeConfig = {
    ...config,
    avatarUrl: naturalPhoto || '/images/opeyemi picture.png',
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] dark:bg-[#0c0a09] text-[#1c1917] dark:text-stone-100 flex flex-col font-sans selection:bg-stone-800 dark:selection:bg-stone-200 selection:text-white dark:selection:text-stone-950 transition-colors">
      {/* Navigation */}
      <Navbar config={activeConfig} />

      <main className="flex-grow pt-20">
        {/* =========================================================================
            1. HERO SECTION
           ========================================================================= */}
        <section id="hero" className="py-12 sm:py-20 lg:py-24 border-b border-stone-200/80 dark:border-stone-800 bg-[#fafaf9] dark:bg-[#0c0a09] transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Natural, Credible Editorial Intro */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    {activeConfig.avatarUrl ? (
                      <img
                        src={activeConfig.avatarUrl}
                        alt={config.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.triedFallback) {
                            target.dataset.triedFallback = 'true';
                            target.src = '/images/opeyemi.png';
                          } else {
                            target.style.display = 'none';
                          }
                        }}
                        className="w-13 h-13 sm:w-15 sm:h-15 rounded-full object-cover border-2 border-white dark:border-stone-800 shadow-sm ring-1 ring-stone-300 dark:ring-stone-700 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-mono font-bold text-base flex items-center justify-center shrink-0 shadow-xs ring-1 ring-stone-300 dark:ring-stone-700">
                        BO
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 inline-block animate-pulse" />
                      <span>Available for Roles &amp; AI Media Projects</span>
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 font-mono mt-1">
                      {config.location} • Nigeria
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950 dark:text-stone-100 leading-[1.2] flex flex-wrap items-baseline gap-x-2.5">
                    <span>Hi, I&apos;m</span>
                    <AnimatedName name={config.name} variant="hero" />
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-semibold text-stone-700 dark:text-stone-300 tracking-tight">
                    Data Scientist, ML Engineer &amp; AI Video Creator
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl font-normal">
                  I engineer practical data &amp; machine learning solutions and direct cinematic, high-conversion AI video commercials using Google Veo 3, Runway Gen-3, Kling, and Luma.
                </p>

                {/* Secondary line */}
                <div className="pt-1 text-xs sm:text-sm font-mono text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-2">
                  <span>Python</span>
                  <span className="text-stone-300 dark:text-stone-700">•</span>
                  <span>Machine Learning</span>
                  <span className="text-stone-300 dark:text-stone-700">•</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Generative AI Video</span>
                  <span className="text-stone-300 dark:text-stone-700">•</span>
                  <span>Veo 3 / Runway</span>
                  <span className="text-stone-300 dark:text-stone-700">•</span>
                  <span>SQL</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="#ai-videos"
                    id="hero-btn-videos"
                    className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-medium text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm cursor-pointer"
                  >
                    <Film className="w-4 h-4 text-emerald-200" />
                    <span>Watch AI Videos</span>
                  </a>

                  <a
                    href="#projects"
                    id="hero-btn-work"
                    className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white active:bg-stone-950 text-white dark:text-stone-950 font-medium text-sm px-5 py-2.5 rounded-md transition-colors shadow-sm cursor-pointer"
                  >
                    <span>ML Projects</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>

                  <a
                    href="#contact"
                    id="hero-btn-talk"
                    className="inline-flex items-center gap-1.5 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 active:bg-stone-200 text-stone-900 dark:text-stone-100 border border-stone-300 dark:border-stone-700 font-medium text-sm px-4 py-2.5 rounded-md transition-colors cursor-pointer"
                  >
                    <span>Let&apos;s Talk</span>
                    <ArrowUpRight className="w-4 h-4 text-stone-500 dark:text-stone-400" />
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
        <section id="about" className="py-16 sm:py-24 border-b border-stone-200/80 dark:border-stone-800 bg-[#f7f7f5] dark:bg-[#121214] transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Background, Education & Principles */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-2">
                    Background &amp; Approach
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-6">
                    About Me
                  </h2>
                </div>

                <div className="space-y-4 text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-stone-300/80 dark:border-stone-800">
                  <div className="bg-white/90 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4 shadow-2xs">
                    <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm mb-1.5 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      <span>Clean Data First</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      Handling missing values, outliers, and schema validation before any modeling.
                    </p>
                  </div>

                  <div className="bg-white/90 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4 shadow-2xs">
                    <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm mb-1.5 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      <span>Explainable Insights</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      Prioritizing interpretable metrics and charts operational teams can trust.
                    </p>
                  </div>

                  <div className="bg-white/90 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-4 shadow-2xs">
                    <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm mb-1.5 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      <span>Code Hygiene</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      Writing structured Python pipelines and lightweight Streamlit apps for testing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Portrait Card */}
              <div className="lg:col-span-5 pt-2">
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 sm:p-5 shadow-sm">
                  <div className="relative aspect-[4/4.8] sm:aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-950 border border-stone-200/80 dark:border-stone-800">
                    <img
                      src={activeConfig.avatarUrl || '/images/opeyemi picture.png'}
                      alt={config.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        // Fallback strictly to /images/opeyemi.png
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = 'true';
                          target.src = '/images/opeyemi.png';
                        } else {
                          (e.target as HTMLElement).style.display = 'none';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-lg font-bold tracking-tight">{config.name}</div>
                      <div className="text-xs font-mono text-stone-200 mt-0.5">B.Sc. Computer Science • O.O.U</div>
                      <div className="text-[11px] text-emerald-300 font-mono mt-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        <span>Data Scientist &amp; AI Video Creator</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400 px-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{config.location}</span>
                    </div>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">Remote &amp; Relocation Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SKILLS SECTION
           ========================================================================= */}
        <section id="skills" className="py-16 sm:py-24 border-b border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#0c0a09] transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-2">
                Technical Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3">
                Skills &amp; Technologies
              </h2>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                Technologies I have actively learned and applied across coursework, personal data science projects, and analytical dashboards.
              </p>
            </div>

            {/* Categorized Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((cat) => (
                <div
                  key={cat.title}
                  id={`skill-cat-${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 tracking-tight font-mono uppercase mb-1.5 flex items-center justify-between">
                      <span>{cat.title}</span>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                        {cat.skills.length} item{cat.skills.length > 1 ? 's' : ''}
                      </span>
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-relaxed font-sans">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center text-xs font-mono bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 px-2.5 py-1 rounded border border-stone-200/80 dark:border-stone-700 transition-colors"
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
        <section id="projects" className="py-16 sm:py-24 border-b border-stone-200/80 dark:border-stone-800 bg-[#f7f7f5] dark:bg-[#121214] transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-stone-900 dark:bg-stone-800 text-stone-200 text-xs font-mono mb-3 border border-stone-800 dark:border-stone-700">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Streamlit Cloud Deployments Verified</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3">
                Selected Projects
              </h2>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                Applied machine learning classifiers and interactive data intelligence systems deployed on Streamlit Community Cloud.
              </p>

              {/* Streamlit Entrypoints Quick Reference Bar */}
              <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm">
                <div className="text-[11px] font-mono uppercase text-stone-600 dark:text-stone-400 font-semibold tracking-wider mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Streamlit Model Entry Points (Live Cloud Deployments)</span>
                  </div>
                  <span className="text-stone-400 dark:text-stone-500 font-normal">branch: main</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-mono">
                  {allProjects
                    .filter((p) => p.streamlitDeployment)
                    .map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setStreamlitProject(p)}
                        className="group flex flex-col p-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 hover:bg-stone-900 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 hover:text-stone-100 dark:hover:text-white border border-stone-200 dark:border-stone-800 hover:border-stone-900 dark:hover:border-stone-700 transition-all text-left shadow-xs hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[11px] font-bold tracking-tight truncate group-hover:text-red-400 text-stone-900 dark:text-stone-100">
                            {p.id === 'bank-churn'
                              ? 'Bank Churn Predictor'
                              : p.id === 'hr-analytics'
                              ? 'HR Analytics System'
                              : 'HR Attrition Classifier'}
                          </span>
                          <span className="p-1 rounded bg-red-100 dark:bg-red-950/70 group-hover:bg-red-600 text-red-700 dark:text-red-300 group-hover:text-white transition-colors flex-shrink-0">
                            <Play className="w-2.5 h-2.5 fill-current" />
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 group-hover:text-stone-300 truncate">
                          {p.streamlitDeployment}
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Project Showcase List */}
            <div className="space-y-10 mb-16">
              {allProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenCaseStudy={(p) => setSelectedProject(p)}
                  onOpenStreamlit={(p) => setStreamlitProject(p)}
                />
              ))}
            </div>

            {/* Dedicated FastAPI Backend Section */}
            <div className="mb-16">
              <FastApiBackendSection />
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
        <section id="experience" className="py-16 sm:py-24 border-b border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#0c0a09] transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-mono font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-2">
                Timeline
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3">
                Education &amp; Experience
              </h2>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                Academic foundation in Computer Science from Olabisi Onabanjo University (O.O.U) combined with applied machine learning, people operations, and administrative data management.
              </p>
            </div>

            <div className="relative border-l border-stone-200 dark:border-stone-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
              {experienceItems.map((item) => (
                <div key={item.id} id={`timeline-${item.id}`} className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-stone-900 dark:border-stone-100 bg-white dark:bg-stone-900" />

                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6 shadow-sm max-w-3xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {item.category === 'Education' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>{item.category}</span>
                          </span>
                        ) : item.id === 'exp-ds' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded">
                            <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            <span>Data Science &amp; ML</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-stone-800 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-2 py-0.5 rounded">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>{item.category}</span>
                          </span>
                        )}
                        <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-950 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800">
                        {item.period}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-stone-600 dark:text-stone-400 mb-3">
                      <span>{item.roleOrDegree}</span>
                      <span className="mx-2">•</span>
                      <span>{item.organization}</span>
                    </div>

                    <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-1.5">
                      <div className="text-xs font-mono text-stone-600 dark:text-stone-400 uppercase font-medium mb-1">
                        Key Focus &amp; Responsibilities:
                      </div>
                      <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400 list-disc list-inside">
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
        <ResumeSection config={config} />

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
