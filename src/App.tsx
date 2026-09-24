import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  CodeXml,
  Check,
  MapPin,
  Search,
  X,
  Play,
  LayoutGrid,
  List,
} from 'lucide-react';
import { initialConfig, projects, certifications, certificationsUrl } from './data/portfolioData';
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
import { CertificationsSection } from './components/CertificationsSection';
import { ResumeSection } from './components/ResumeSection';
import { MagicCursor } from './components/MagicCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { SkillsMarquee } from './components/SkillsMarquee';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [config] = useState<PortfolioConfig>(initialConfig);
  const [allProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [streamlitProject, setStreamlitProject] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<AIVideoProject | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [projectSearch, setProjectSearch] = useState<string>('');
  const [viewMode, setViewMode] = useState<'rows' | 'cards'>('rows');

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

    const candidatePaths = [
      '/images/opeyemi picture.png',
      '/images/opeyemi%20picture.png',
      '/images/opeyemi.png',
      '/opeyemi picture.png',
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
          // continue checking
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

  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory =
      projectFilter === 'all'
        ? true
        : projectFilter === 'backend'
        ? p.category.toLowerCase().includes('backend') || p.tools.some((t) => t.toLowerCase().includes('fastapi'))
        : projectFilter === 'ml'
        ? p.category.toLowerCase().includes('machine learning') || p.category.toLowerCase().includes('predictive')
        : projectFilter === 'data'
        ? p.category.toLowerCase().includes('data analysis') || p.category.toLowerCase().includes('automation') || p.category.toLowerCase().includes('analytics')
        : projectFilter === 'web'
        ? p.category.toLowerCase().includes('web') || p.category.toLowerCase().includes('product')
        : true;

    const query = projectSearch.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesSearch =
      p.title.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tools.some((t) => t.toLowerCase().includes(query)) ||
      (p.businessImpact && p.businessImpact.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-highlight selection:text-highlight-foreground transition-colors overflow-x-hidden">
      {/* Scroll Progress & Cursor */}
      <ScrollProgress />
      <MagicCursor />

      {/* Navigation */}
      <Navbar config={activeConfig} />

      <main className="flex-grow">
        {/* =========================================================================
            1. HERO SECTION (Hi, I'm + def .py Switch + Multi-Discipline Punchline)
           ========================================================================= */}
        <section id="top" className="relative mx-auto grid max-w-7xl gap-8 lg:gap-12 px-4 sm:px-6 lg:px-10 pb-12 sm:pb-16 lg:pb-24 pt-8 sm:pt-14 lg:pt-20 lg:grid-cols-[1.2fr_.8fr] items-start">
          <div className="relative z-10 w-full min-w-0">
            {/* Status Badge & Location */}
            <div className="mb-5 sm:mb-7 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-bold uppercase tracking-widest font-mono">
              <span className="inline-flex items-center gap-2 bg-status px-3 py-1.5 sm:py-2 text-status-foreground shadow-brutal-sm rounded-xs">
                <span className="size-2 animate-pulse rounded-full bg-current" />
                Available for roles &amp; projects
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground font-semibold">
                <MapPin className="size-3.5" />
                Lagos, Nigeria
              </span>
            </div>

            {/* Giant Display Headline: Hi, I'm + AnimatedName (with def .py switch) */}
            <div className="max-w-4xl">
              <span className="block text-foreground/75 font-sans text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wider mb-2">
                Hi, I&apos;m
              </span>
              
              <div className="mb-2 sm:mb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-display uppercase tracking-tight text-foreground leading-[1.05]">
                <AnimatedName name="Opeyemi Olamiju" variant="hero" />
              </div>

              <h1 className="font-display uppercase tracking-tight text-foreground leading-[.92] text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                <span className="block text-primary">Data Scientist,</span>
                <span className="block text-accent">ML Engineer</span>
                <span className="block text-secondary">&amp; AI Video Creator</span>
              </h1>
            </div>

            {/* Subtext and Action Buttons */}
            <div className="mt-8 sm:mt-9 grid gap-6 border-t border-foreground/15 pt-6 sm:pt-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                Computer science foundation in predictive modeling, high-throughput FastAPI services, and cinematic generative AI video commercials.
              </p>
              <div className="flex flex-col xs:flex-row flex-wrap gap-3 w-full sm:w-auto">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary/88 hover:-translate-y-0.5 h-12 rounded-xs px-6 text-sm font-mono uppercase"
                >
                  <span>Explore work</span>
                  <ArrowDown className="size-4" />
                </a>
                <a
                  href="#video"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors border-2 border-foreground bg-card text-foreground shadow-brutal-sm hover:shadow-brutal hover:bg-foreground hover:text-background h-12 rounded-xs px-6 text-sm font-mono uppercase"
                >
                  <Play className="size-4" />
                  <span>Watch reel</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Workspace Box (Responsive on Android/Tablet/Laptop) */}
          <div className="w-full min-w-0">
            <HeroWorkspaceVisual onSelectVideo={setSelectedVideo} />
          </div>
        </section>

        {/* Marquee Ticker */}
        <SkillsMarquee />

        {/* =========================================================================
            01 / SELECTED WORK
           ========================================================================= */}
        <section id="work" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-28">
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-[180px_1fr] sm:items-end">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              01 / Selected work
            </p>
            <h2 className="max-w-4xl font-display text-3xl xs:text-4xl sm:text-5xl lg:text-7xl uppercase leading-[.92] text-foreground">
              Built to solve real problems.
            </h2>
          </div>

          {/* Filter & Controls Toolbar */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-foreground/15">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none font-mono text-xs w-full sm:w-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'backend', label: 'Backend & APIs' },
                { id: 'ml', label: 'Machine Learning' },
                { id: 'data', label: 'Data & Automation' },
                { id: 'web', label: 'Web Apps' },
              ].map((tab) => {
                const isActive = projectFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setProjectFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-foreground text-background shadow-brutal-sm'
                        : 'border border-foreground/20 text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-foreground/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-8 pr-7 py-1.5 text-xs font-mono bg-card border border-foreground/30 rounded-xs text-foreground placeholder-foreground/50 focus:outline-none focus:border-foreground"
                />
                {projectSearch && (
                  <button
                    type="button"
                    onClick={() => setProjectSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* View Switcher */}
              <div className="hidden sm:flex items-center border border-foreground/30 p-0.5 rounded-xs bg-card shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('rows')}
                  title="Editorial Rows View"
                  className={`p-1.5 rounded-xs cursor-pointer ${
                    viewMode === 'rows' ? 'bg-foreground text-background' : 'text-foreground/60'
                  }`}
                >
                  <List className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  title="Card Grid View"
                  className={`p-1.5 rounded-xs cursor-pointer ${
                    viewMode === 'cards' ? 'bg-foreground text-background' : 'text-foreground/60'
                  }`}
                >
                  <LayoutGrid className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Editorial Project Rows */}
          {viewMode === 'rows' ? (
            <div className="mt-8 divide-y divide-foreground/15 border-y border-foreground/15">
              {filteredProjects.map((project, idx) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="project-row group grid gap-4 sm:gap-6 py-6 sm:py-9 grid-cols-1 sm:grid-cols-[50px_1fr] lg:grid-cols-[60px_1fr_1.1fr_auto] lg:items-center cursor-pointer transition-colors"
                >
                  <span className="font-mono text-xs text-muted-foreground font-bold">
                    /{String(idx + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <span
                      className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-xs ${
                        idx % 3 === 0
                          ? 'bg-project-one text-foreground'
                          : idx % 3 === 1
                          ? 'bg-project-two text-foreground'
                          : 'bg-project-three text-foreground'
                      }`}
                    >
                      {project.category}
                    </span>
                    <h3 className="mt-2.5 sm:mt-3 max-w-md text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight text-foreground group-hover:text-primary transition-colors font-display">
                      {project.title}
                    </h3>
                  </div>

                  <div>
                    <p className="max-w-xl leading-relaxed text-muted-foreground font-sans text-sm sm:text-base">
                      {project.description}
                    </p>
                    {project.businessImpact && (
                      <p className="mt-2.5 sm:mt-3 font-mono text-xs font-bold uppercase text-primary">
                        {project.businessImpact.split('.')[0]}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end pt-2 lg:pt-0">
                    <span className="font-mono text-[11px] text-muted-foreground font-bold">
                      {project.tools.slice(0, 3).join(' · ')}
                    </span>
                    <span className="grid size-10 sm:size-11 place-items-center rounded-full border border-foreground/20 transition-all group-hover:bg-foreground group-hover:text-background shrink-0">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Card Grid View */
            <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenCaseStudy={(p) => setSelectedProject(p)}
                  onOpenStreamlit={(p) => setStreamlitProject(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* =========================================================================
            02 / AI VIDEO DIRECTION
           ========================================================================= */}
        <AIVideoSection onSelectVideo={(v) => setSelectedVideo(v)} />

        {/* =========================================================================
            03 / CAPABILITIES
           ========================================================================= */}
        <section id="skills" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-28">
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-[180px_1fr] sm:items-end">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              03 / Capabilities
            </p>
            <h2 className="max-w-4xl font-display text-3xl xs:text-4xl sm:text-5xl lg:text-7xl uppercase leading-[.92] text-foreground">
              One builder. Three disciplines.
            </h2>
          </div>

          <div className="mt-8 sm:mt-12 grid border-2 border-foreground grid-cols-1 md:grid-cols-3">
            {/* Discipline 1 */}
            <article className="p-6 sm:p-8 lg:p-9">
              <div className="grid size-12 place-items-center font-mono text-sm font-bold bg-accent text-accent-foreground shadow-brutal-sm rounded-xs">
                01
              </div>
              <h3 className="mt-8 sm:mt-10 text-xl sm:text-2xl font-extrabold font-display uppercase text-foreground">
                Data &amp; machine learning
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground font-sans text-sm sm:text-base">
                From messy source data to explainable models, statistical validation, and decision-ready insights.
              </p>
              <ul className="mt-6 sm:mt-7 flex flex-wrap gap-2">
                {['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'SQL', 'Plotly'].map((tool) => (
                  <li key={tool} className="border border-foreground/20 px-2.5 py-1 font-mono text-[11px] text-foreground font-semibold rounded-xs bg-card">
                    {tool}
                  </li>
                ))}
              </ul>
            </article>

            {/* Discipline 2 */}
            <article className="p-6 sm:p-8 lg:p-9 border-t-2 border-foreground md:border-l-2 md:border-t-0">
              <div className="grid size-12 place-items-center font-mono text-sm font-bold bg-secondary text-secondary-foreground shadow-brutal-sm rounded-xs">
                02
              </div>
              <h3 className="mt-8 sm:mt-10 text-xl sm:text-2xl font-extrabold font-display uppercase text-foreground">
                Production engineering
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground font-sans text-sm sm:text-base">
                Reliable APIs and automated pipelines designed to move smoothly from notebook exploration to production runtime.
              </p>
              <ul className="mt-6 sm:mt-7 flex flex-wrap gap-2">
                {['FastAPI', 'Pydantic', 'Docker', 'PostgreSQL', 'Pytest', 'CI/CD'].map((tool) => (
                  <li key={tool} className="border border-foreground/20 px-2.5 py-1 font-mono text-[11px] text-foreground font-semibold rounded-xs bg-card">
                    {tool}
                  </li>
                ))}
              </ul>
            </article>

            {/* Discipline 3 */}
            <article className="p-6 sm:p-8 lg:p-9 border-t-2 border-foreground md:border-l-2 md:border-t-0">
              <div className="grid size-12 place-items-center font-mono text-sm font-bold bg-highlight text-highlight-foreground shadow-brutal-sm rounded-xs">
                03
              </div>
              <h3 className="mt-8 sm:mt-10 text-xl sm:text-2xl font-extrabold font-display uppercase text-foreground">
                Generative AI video
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground font-sans text-sm sm:text-base">
                Cinematic concepts, multi-shot direction, sound design, and pacing for memorable commercial brand stories.
              </p>
              <ul className="mt-6 sm:mt-7 flex flex-wrap gap-2">
                {['Veo 3', 'Runway Gen-3', 'Kling', 'Luma', 'Midjourney', 'ElevenLabs'].map((tool) => (
                  <li key={tool} className="border border-foreground/20 px-2.5 py-1 font-mono text-[11px] text-foreground font-semibold rounded-xs bg-card">
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* =========================================================================
            04 / ABOUT OPE
           ========================================================================= */}
        <section id="about" className="border-y-2 border-foreground bg-secondary text-secondary-foreground">
          <div className="mx-auto grid max-w-7xl gap-8 lg:gap-12 px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-28 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary-foreground">
                04 / About Ope
              </p>
              <div className="mt-6 sm:mt-8 aspect-[4/3] bg-foreground p-6 text-background flex flex-col justify-between shadow-brutal border-2 border-foreground rounded-xs">
                <CodeXml className="size-9 sm:size-10 text-accent" />
                <blockquote className="mt-10 sm:mt-16 font-display text-2xl sm:text-3xl uppercase leading-tight text-background">
                  “I don&apos;t just write code; I engineer solutions.”
                </blockquote>
              </div>
            </div>

            <div className="lg:pt-12">
              <h2 className="max-w-3xl text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight font-display uppercase text-secondary-foreground">
                Computer science foundations. AI-powered execution. Business-minded outcomes.
              </h2>
              <p className="mt-5 sm:mt-7 max-w-3xl text-base sm:text-lg leading-relaxed text-secondary-foreground/90 font-sans">
                I use artificial intelligence as a force multiplier—from high-throughput FastAPI services and predictive models to commercial-grade generative video. My focus is practical: clean inputs, explainable decisions, structured delivery, and work people can use.
              </p>
              <div className="mt-7 sm:mt-9 grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 border-t border-secondary-foreground/25 pt-4 text-xs sm:text-sm font-bold font-mono">
                  <Check className="size-4 shrink-0 text-accent" />
                  <span>B.Sc. Computer Science · Crawford University</span>
                </div>
                <div className="flex items-center gap-3 border-t border-secondary-foreground/25 pt-4 text-xs sm:text-sm font-bold font-mono">
                  <Check className="size-4 shrink-0 text-accent" />
                  <span>13 verified certifications</span>
                </div>
                <div className="flex items-center gap-3 border-t border-secondary-foreground/25 pt-4 text-xs sm:text-sm font-bold font-mono">
                  <Check className="size-4 shrink-0 text-accent" />
                  <span>Remote &amp; relocation ready</span>
                </div>
                <div className="flex items-center gap-3 border-t border-secondary-foreground/25 pt-4 text-xs sm:text-sm font-bold font-mono">
                  <Check className="size-4 shrink-0 text-accent" />
                  <span>Data, engineering &amp; creative AI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            05 / CREDENTIALS (13 Verified Certifications)
           ========================================================================= */}
        <CertificationsSection
          certifications={certifications}
          certificationsUrl={certificationsUrl}
          config={config}
        />

        {/* =========================================================================
            06 / PRODUCTION API (FastAPI Backend Console)
           ========================================================================= */}
        <section id="fastapi" className="py-14 sm:py-20 lg:py-28 border-b-2 border-foreground/15 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-12">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                06 / Production API
              </p>
              <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl lg:text-6xl uppercase leading-[.92] text-foreground">
                FastAPI REST Service.
              </h2>
            </div>
            <FastApiBackendSection />
          </div>
        </section>

        {/* =========================================================================
            07 / CODE REPOSITORIES (GitHub Repos)
           ========================================================================= */}
        <section id="repos" className="py-14 sm:py-20 lg:py-28 border-b-2 border-foreground/15 bg-muted">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-12">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
                07 / Open Source
              </p>
              <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl lg:text-6xl uppercase leading-[.92] text-foreground">
                Production Code Repositories.
              </h2>
            </div>
            <GitHubReposSection />
          </div>
        </section>

        {/* =========================================================================
            08 / EXECUTIVE RECORD & RESUME
           ========================================================================= */}
        <section id="resume" className="py-14 sm:py-20 lg:py-28 border-b-2 border-foreground/15 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-8 sm:mb-12">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                08 / Executive Record
              </p>
              <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl lg:text-6xl uppercase leading-[.92] text-foreground">
                Curriculum Vitae &amp; Credentials.
              </h2>
            </div>
            <ResumeSection config={activeConfig} />
          </div>
        </section>

        {/* =========================================================================
            09 / START A CONVERSATION & FOOTER
           ========================================================================= */}
        <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-28">
          <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                09 / Start a conversation
              </p>
              <h2 className="mt-4 sm:mt-5 max-w-4xl font-display text-3xl xs:text-4xl sm:text-6xl md:text-7xl uppercase leading-[.88] text-foreground">
                Have a problem worth <span className="text-primary">solving?</span>
              </h2>
            </div>
            <div>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
                I&apos;m open to data and ML roles, engineering collaborations, and ambitious AI media projects.
              </p>
              <a
                href={`mailto:${config.email || 'odunayoopamiju@gmail.com'}`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors bg-primary text-primary-foreground shadow-[var(--shadow-button)] hover:bg-primary/88 hover:-translate-y-0.5 h-12 rounded-xs px-6 text-sm mt-6 sm:mt-7 w-full sm:w-auto font-mono uppercase"
              >
                <Mail className="size-4" />
                <span>Send an email</span>
              </a>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="mt-12 sm:mt-16">
            <ContactSection config={activeConfig} />
          </div>

          {/* Site Footer */}
          <footer className="mt-16 sm:mt-20 flex flex-col gap-4 sm:gap-5 border-t border-foreground/15 pt-6 sm:pt-7 sm:flex-row sm:items-center sm:justify-between text-foreground">
            <span className="font-bold font-mono text-xs sm:text-sm">Build with Ope © 2026</span>
            <div className="flex gap-3">
              <a
                href="https://github.com/kikibillz"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center justify-center size-9 rounded-full border border-foreground/20 bg-card hover:bg-foreground hover:text-background transition-colors"
              >
                <Github className="size-4" />
              </a>
              <a
                href={config.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center size-9 rounded-full border border-foreground/20 bg-card hover:bg-foreground hover:text-background transition-colors"
              >
                <Linkedin className="size-4" />
              </a>
              <a
                href={`mailto:${config.email || 'odunayoopamiju@gmail.com'}`}
                aria-label="Email"
                className="inline-flex items-center justify-center size-9 rounded-full border border-foreground/20 bg-card hover:bg-foreground hover:text-background transition-colors"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </footer>
        </section>
      </main>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenStreamlit={(p) => {
            setSelectedProject(null);
            setStreamlitProject(p);
          }}
        />
      )}

      {/* Streamlit Live Preview Modal */}
      {streamlitProject && (
        <LiveStreamlitModal
          project={streamlitProject}
          onClose={() => setStreamlitProject(null)}
        />
      )}

      {/* AI Video Modal */}
      {selectedVideo && (
        <AIVideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
