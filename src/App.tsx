import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
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
  MoveHorizontal,
} from 'lucide-react';
import { initialConfig, projects, certifications, certificationsUrl } from './data/portfolioData';
import { PortfolioConfig, Project, AIVideoProject } from './types';
import { Navbar } from './components/Navbar';
import { HeroWorkspaceVisual } from './components/HeroWorkspaceVisual';
import { ProjectCard } from './components/ProjectCard';
import { SelectedWorkSwipeable } from './components/SelectedWorkSwipeable';
import { ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';
import { LiveStreamlitModal } from './components/LiveStreamlitModal';
import { ContactSection } from './components/ContactSection';
import { GitHubReposSection } from './components/GitHubReposSection';
import { AnimatedName } from './components/AnimatedName';
import { AIVideoSection } from './components/AIVideoSection';
import { AIVideoModal } from './components/AIVideoModal';
import { FastApiBackendSection } from './components/FastApiBackendSection';
import { NexusCopilotModal } from './components/NexusCopilotModal';
import { CertificationsSection } from './components/CertificationsSection';
import { ResumeSection } from './components/ResumeSection';
import { PrintableResume } from './components/PrintableResume';
import { PrintableCoverLetter } from './components/PrintableCoverLetter';
import { MagicCursor } from './components/MagicCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { SkillsMarquee } from './components/SkillsMarquee';
import { BackToTop } from './components/BackToTop';

export default function App() {
  const [config] = useState<PortfolioConfig>(initialConfig);
  const [allProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [streamlitProject, setStreamlitProject] = useState<Project | null>(null);
  const [nexusCopilotOpen, setNexusCopilotOpen] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<AIVideoProject | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [projectSearch, setProjectSearch] = useState<string>('');
  const [viewMode, setViewMode] = useState<'swipe' | 'cards' | 'rows'>('swipe');

  const handleOpenAppOrCopilot = (p: Project) => {
    if (p.id === 'enterprise-rag-prompt-engine' || p.id === 'nexus-enterprise-copilot') {
      setNexusCopilotOpen(true);
    } else {
      setStreamlitProject(p);
    }
  };

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

  const categoryCounts = useMemo(() => {
    return {
      all: allProjects.length,
      rag: allProjects.filter((p) => p.category.toLowerCase().includes('rag') || p.tools.some((t) => t.toLowerCase().includes('rag') || t.toLowerCase().includes('prompt'))).length,
      ml: allProjects.filter((p) => p.category.toLowerCase().includes('machine learning') || p.category.toLowerCase().includes('predictive') || p.category.toLowerCase().includes('safety')).length,
      backend: allProjects.filter((p) => p.category.toLowerCase().includes('backend') || p.tools.some((t) => t.toLowerCase().includes('fastapi'))).length,
      databases: allProjects.filter((p) => p.category.toLowerCase().includes('database') || p.category.toLowerCase().includes('sql') || p.tools.some((t) => t.toLowerCase().includes('sql') || t.toLowerCase().includes('mongo'))).length,
      data: allProjects.filter((p) => p.category.toLowerCase().includes('data analysis') || p.category.toLowerCase().includes('automation') || p.category.toLowerCase().includes('spreadsheets') || p.category.toLowerCase().includes('etl')).length,
      web: allProjects.filter((p) => p.category.toLowerCase().includes('web') || p.category.toLowerCase().includes('product') || p.category.toLowerCase().includes('career')).length,
    };
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesCategory =
        projectFilter === 'all'
          ? true
          : projectFilter === 'rag'
          ? p.category.toLowerCase().includes('rag') || p.tools.some((t) => t.toLowerCase().includes('rag') || t.toLowerCase().includes('prompt'))
          : projectFilter === 'backend'
          ? p.category.toLowerCase().includes('backend') || p.tools.some((t) => t.toLowerCase().includes('fastapi'))
          : projectFilter === 'ml'
          ? p.category.toLowerCase().includes('machine learning') || p.category.toLowerCase().includes('predictive') || p.category.toLowerCase().includes('safety')
          : projectFilter === 'databases'
          ? p.category.toLowerCase().includes('database') || p.category.toLowerCase().includes('sql') || p.tools.some((t) => t.toLowerCase().includes('sql') || t.toLowerCase().includes('mongo'))
          : projectFilter === 'data'
          ? p.category.toLowerCase().includes('data analysis') || p.category.toLowerCase().includes('automation') || p.category.toLowerCase().includes('spreadsheets') || p.category.toLowerCase().includes('etl')
          : projectFilter === 'web'
          ? p.category.toLowerCase().includes('web') || p.category.toLowerCase().includes('product') || p.category.toLowerCase().includes('career')
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
  }, [allProjects, projectFilter, projectSearch]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-highlight selection:text-highlight-foreground transition-colors overflow-x-hidden">
      {/* Interactive Website Shell (Hidden on Print) */}
      <div id="portfolio-interactive-shell" className="print:hidden flex flex-col flex-grow w-full">
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
            {/* Status Badge */}
            <div className="mb-5 sm:mb-7 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs font-bold uppercase tracking-widest font-mono">
              <span className="inline-flex items-center gap-2 bg-status px-3 py-1.5 sm:py-2 text-status-foreground shadow-brutal-sm rounded-xs">
                <span className="size-2 animate-pulse rounded-full bg-current" />
                Available for roles &amp; projects
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
                Computer science foundation bridging predictive machine learning with enterprise RAG architectures, prompt engineering, real-world HR workforce intelligence, cloud microservices (AWS, GCP, Azure), and MLOps tooling—with all engineering claims 100% backed by public GitHub repositories and live interactive cloud runtimes.
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

          {/* Domain Focus & Production Standards Highlights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-xs border-2 border-foreground bg-primary/10 flex items-start gap-3 shadow-brutal-sm">
              <span className="p-1.5 sm:p-2 bg-primary text-primary-foreground rounded-xs font-mono text-xs font-bold shrink-0">
                FOCUS
              </span>
              <div>
                <h4 className="font-display font-extrabold text-sm sm:text-base uppercase text-foreground">
                  Applied Machine Learning &amp; Workforce Intelligence
                </h4>
                <p className="mt-1 text-xs text-foreground/80 font-sans leading-relaxed">
                  Bridging statistical machine learning (XGBoost, Scikit-learn), retrieval-augmented generation (RAG), and high-throughput Python backends directly with real-world workforce and People Operations data (Culturelligence, retention hazard modeling, and turnover analytics).
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-xs border-2 border-foreground bg-secondary/15 flex items-start gap-3 shadow-brutal-sm">
              <span className="p-1.5 sm:p-2 bg-secondary text-secondary-foreground rounded-xs font-mono text-xs font-bold shrink-0">
                STANDARDS
              </span>
              <div>
                <h4 className="font-display font-extrabold text-sm sm:text-base uppercase text-foreground">
                  Production-Grade Quality &amp; Live Cloud Deployments
                </h4>
                <p className="mt-1 text-xs text-foreground/80 font-sans leading-relaxed">
                  Every engineering implementation is backed by public source repositories on GitHub, automated CI/CD test suites (&gt;90% Pytest code coverage), Docker containerization, and live interactive deployments running on Streamlit and Vercel.
                </p>
              </div>
            </div>
          </div>

          {/* Filter & Controls Toolbar */}
          <div className="mt-8 sm:mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b-2 border-foreground/15">
            {/* Category Filter Pills with counts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none font-mono text-xs w-full md:w-auto">
              {[
                { id: 'all', label: 'All', count: categoryCounts.all },
                { id: 'rag', label: 'RAG & GenAI', count: categoryCounts.rag },
                { id: 'databases', label: 'Databases & SQL', count: categoryCounts.databases },
                { id: 'ml', label: 'Machine Learning', count: categoryCounts.ml },
                { id: 'backend', label: 'Backend & APIs', count: categoryCounts.backend },
                { id: 'data', label: 'Data & Automation', count: categoryCounts.data },
                { id: 'web', label: 'Web Apps', count: categoryCounts.web },
              ].map((tab) => {
                const isActive = projectFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setProjectFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 inline-flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-foreground text-background shadow-brutal-sm'
                        : 'border border-foreground/20 text-foreground/70 hover:text-foreground hover:border-foreground/40 bg-card'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-xs font-mono font-bold ${
                        isActive
                          ? 'bg-background/20 text-background'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search & View Switcher */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Search work, stack, ROI..."
                  className="w-full pl-8 pr-7 py-1.5 text-xs font-mono bg-card border border-foreground/30 rounded-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-foreground"
                />
                {projectSearch && (
                  <button
                    type="button"
                    onClick={() => setProjectSearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* View Switcher: Swipeable Reel vs Card Grid vs Table List */}
              <div className="flex items-center border-2 border-foreground p-0.5 rounded-xs bg-card shrink-0 shadow-brutal-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('swipe')}
                  title="Horizontal Swipeable Showcase"
                  className={`px-2 py-1.5 rounded-xs cursor-pointer transition-colors flex items-center gap-1 font-mono text-xs font-bold uppercase ${
                    viewMode === 'swipe'
                      ? 'bg-foreground text-background shadow-xs'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <MoveHorizontal className="size-3.5" />
                  <span>Swipe</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  title="Card Grid View"
                  className={`px-2 py-1.5 rounded-xs cursor-pointer transition-colors flex items-center gap-1 font-mono text-xs font-bold uppercase ${
                    viewMode === 'cards'
                      ? 'bg-foreground text-background shadow-xs'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <LayoutGrid className="size-3.5" />
                  <span>Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('rows')}
                  title="Table / List View"
                  className={`px-2 py-1.5 rounded-xs cursor-pointer transition-colors flex items-center gap-1 font-mono text-xs font-bold uppercase ${
                    viewMode === 'rows'
                      ? 'bg-foreground text-background shadow-xs'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <List className="size-3.5" />
                  <span>Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results summary counter */}
          <div className="mt-3 flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>
              Showing <b className="text-foreground">{filteredProjects.length}</b> of {allProjects.length} production projects
            </span>
            {(projectFilter !== 'all' || projectSearch) && (
              <button
                type="button"
                onClick={() => {
                  setProjectFilter('all');
                  setProjectSearch('');
                }}
                className="text-primary hover:underline cursor-pointer font-bold"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Content View: Swipeable vs Card Grid vs Table List */}
          {filteredProjects.length === 0 ? (
            <div className="mt-8 p-12 text-center border-2 border-dashed border-foreground/20 rounded-sm bg-card">
              <p className="font-mono text-sm text-foreground/80 font-bold uppercase tracking-wider">
                No matching projects found
              </p>
              <p className="mt-1 text-xs text-muted-foreground font-sans">
                Try searching for a different keyword or resetting your filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setProjectFilter('all');
                  setProjectSearch('');
                }}
                className="mt-4 px-4 py-1.5 bg-foreground text-background font-mono text-xs font-bold uppercase rounded-xs cursor-pointer"
              >
                Show All Projects
              </button>
            </div>
          ) : viewMode === 'swipe' ? (
            /* Horizontal Swipeable Showcase */
            <SelectedWorkSwipeable
              projects={filteredProjects}
              onOpenCaseStudy={(p) => setSelectedProject(p)}
              onOpenStreamlit={(p) => handleOpenAppOrCopilot(p)}
            />
          ) : viewMode === 'cards' ? (
            /* Pristine Card Grid View: 2 equal-height columns on desktop, 1 on mobile */
            <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpenCaseStudy={(p) => setSelectedProject(p)}
                  onOpenStreamlit={(p) => handleOpenAppOrCopilot(p)}
                />
              ))}
            </div>
          ) : (
            /* Pristine Table / List View: Linear & Bloomberg-grade alignment */
            <div className="mt-6 sm:mt-8 border-2 border-foreground rounded-sm overflow-hidden bg-card shadow-brutal divide-y-2 divide-foreground/15">
              {/* Header */}
              <div className="hidden lg:grid grid-cols-[50px_2.2fr_1.6fr_1.4fr_auto] items-center gap-4 px-6 py-3.5 bg-muted font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground border-b-2 border-foreground">
                <span>#</span>
                <span>Project &amp; Category</span>
                <span>Key Performance Indicators</span>
                <span>Tech Stack</span>
                <span className="text-right">Actions</span>
              </div>

              {/* Rows */}
              {filteredProjects.map((project, idx) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group grid grid-cols-1 lg:grid-cols-[50px_2.2fr_1.6fr_1.4fr_auto] items-start lg:items-center gap-3 lg:gap-4 p-4 sm:p-5 hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <span className="font-mono text-xs font-black text-primary">
                    /{String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-muted text-foreground border border-foreground/20">
                        {project.category.split('&')[0].trim()}
                      </span>
                      {project.badge && (
                        <span className="font-mono text-[10px] text-muted-foreground font-semibold">
                          · {project.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-extrabold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans line-clamp-1 mt-0.5">
                      {project.tagline}
                    </p>
                  </div>

                  <div>
                    {project.keyMetrics && project.keyMetrics[0] ? (
                      <div className="inline-flex items-center gap-2 bg-muted/80 border border-foreground/20 px-2.5 py-1 rounded-xs">
                        <span className="font-mono text-[10px] uppercase text-muted-foreground font-semibold">
                          {project.keyMetrics[0].label}:
                        </span>
                        <span className="font-mono text-xs font-black text-foreground">
                          {project.keyMetrics[0].value}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground font-mono">Rule-Enforced</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-[11px] px-2 py-0.5 bg-muted rounded-xs text-foreground/75 border border-foreground/10"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center gap-2 justify-end pt-2 lg:pt-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 bg-foreground text-background px-3 py-1.5 rounded-xs font-mono text-[11px] font-bold uppercase tracking-wider shadow-brutal-sm hover:bg-foreground/90 transition-all cursor-pointer shrink-0"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="size-3" />
                    </button>

                    {project.streamlitDeployment && (
                      <button
                        type="button"
                        onClick={() => handleOpenAppOrCopilot(project)}
                        className="p-1.5 border border-foreground/30 rounded-xs bg-primary text-primary-foreground hover:scale-105 transition-all shrink-0 cursor-pointer"
                        title={project.id === 'enterprise-rag-prompt-engine' ? 'Launch AI Copilot' : 'Live Interactive App'}
                      >
                        <Play className="size-3.5 fill-current" />
                      </button>
                    )}

                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 border border-foreground/30 rounded-xs bg-card hover:border-foreground text-foreground transition-all shrink-0"
                      title="GitHub"
                    >
                      <Github className="size-3.5" />
                    </a>
                  </div>
                </article>
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
                From raw, messy records to predictive models, workforce analytics, statistical validation, and executive Power BI / Tableau dashboards.
              </p>
              <ul className="mt-6 sm:mt-7 flex flex-wrap gap-2">
                {['Python', 'Scikit-learn', 'XGBoost', 'Power BI', 'Tableau', 'SQL (PostgreSQL)', 'NoSQL (MongoDB)', 'SMOTE'].map((tool) => (
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
                MLOps, Cloud &amp; APIs
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground font-sans text-sm sm:text-base">
                Production-ready REST APIs, containerized runtimes on AWS/GCP/Azure, automated CI/CD pipelines, and MLflow experiment tracking.
              </p>
              <ul className="mt-6 sm:mt-7 flex flex-wrap gap-2">
                {['FastAPI', 'Docker', 'AWS & GCP', 'Azure', 'MLflow', 'Pytest (>90%)', 'CI/CD'].map((tool) => (
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
                RAG, LLMs &amp; Prompt Engineering
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground font-sans text-sm sm:text-base">
                Production Retrieval-Augmented Generation (RAG) with vector embeddings (ChromaDB), systematic prompt engineering (CoT, few-shot schemas, citation guardrails), and multimodal generative AI.
              </p>
              <ul className="mt-6 sm:mt-7 flex flex-wrap gap-2">
                {['RAG Architectures', 'Prompt Engineering', 'Vector Search (ChromaDB)', 'OpenAI & Gemini APIs', 'Guardrails', 'LangChain', 'Runway Gen-3'].map((tool) => (
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
              <div className="mt-6 sm:mt-8 relative border-2 border-foreground bg-foreground rounded-xs shadow-brutal overflow-hidden group">
                <div className="aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-foreground">
                  <img
                    src={activeConfig.avatarUrl}
                    alt="Opeyemi Olamiju - Data Scientist & AI Video Creator"
                    className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-5 sm:p-6 bg-foreground text-background border-t-2 border-foreground">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                      Opeyemi Olamiju
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-xs bg-highlight text-highlight-foreground font-bold">
                      OOU ALUMNI
                    </span>
                  </div>
                  <blockquote className="font-display text-lg sm:text-xl uppercase leading-tight text-background">
                    “I don&apos;t just write code; I engineer solutions.”
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="lg:pt-12">
              <h2 className="max-w-3xl text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight font-display uppercase text-secondary-foreground">
                Computer science foundations. AI-powered execution. Business-minded outcomes.
              </h2>
              <p className="mt-5 sm:mt-7 max-w-3xl text-base sm:text-lg leading-relaxed text-secondary-foreground/90 font-sans">
                My strongest edge is the combination: Roles 1 to 3 sit precisely where statistical machine learning and cloud microservices meet real-world People Operations and HR data experience (Culturelligence). While many know ML purely in theory, I apply it to high-stakes business challenges—workforce retention hazard triage, turnover variance analytics, statutory tax ledgers, and commercial generative AI—with every claim 100% verified via public GitHub repositories, automated CI/CD test suites (&gt;90% Pytest coverage), and live interactive cloud runtimes.
              </p>
              <div className="mt-7 sm:mt-9 grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 border-t border-secondary-foreground/25 pt-4 text-xs sm:text-sm font-bold font-mono">
                  <Check className="size-4 shrink-0 text-accent" />
                  <span>B.Sc. Computer Science · OOU (Olabisi Onabanjo University)</span>
                </div>
                <div className="flex items-center gap-3 border-t border-secondary-foreground/25 pt-4 text-xs sm:text-sm font-bold font-mono">
                  <Check className="size-4 shrink-0 text-accent" />
                  <span>13 verified certifications with badges (ALX, Hirist, Hotjar, New Horizons)</span>
                </div>
                <div className="flex items-center gap-3 border-t border-secondary-foreground/25 pt-4 text-xs sm:text-sm font-bold font-mono">
                  <Check className="size-4 shrink-0 text-accent" />
                  <span>Cloud &amp; MLOps: AWS, GCP, Azure, Docker, CI/CD, MLflow</span>
                </div>
                <div className="flex items-center gap-3 border-t border-secondary-foreground/25 pt-4 text-xs sm:text-sm font-bold font-mono">
                  <Check className="size-4 shrink-0 text-accent" />
                  <span>BI &amp; LLMs: Power BI (DAX), Tableau, Large Language Models (LLMs), RAG</span>
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
            handleOpenAppOrCopilot(p);
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

      {/* Dedicated Interactive Nexus Copilot AI Modal */}
      <NexusCopilotModal
        isOpen={nexusCopilotOpen}
        onClose={() => setNexusCopilotOpen(false)}
      />

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

    {/* ========================================================
        DEDICATED PRINTABLE RESUME (Active exclusively on print)
       ======================================================== */}
    <div id="printable-resume-wrapper" className="hidden print:block w-full">
      <PrintableResume config={activeConfig} certifications={certifications} />
    </div>

    {/* ========================================================
        DEDICATED PRINTABLE COVER LETTER (Active on Cover Letter print)
       ======================================================== */}
    <div id="printable-cover-letter-wrapper" className="hidden print:block w-full">
      <PrintableCoverLetter config={activeConfig} />
    </div>
  </div>
);
}
