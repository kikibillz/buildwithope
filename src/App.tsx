import React, { useState, useEffect, useRef } from 'react';
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
  Award,
  ShieldCheck,
  Search,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { initialConfig, projects, skillCategories, experienceItems, certifications, certificationsUrl } from './data/portfolioData';
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
  const [config, setConfig] = useState<PortfolioConfig>(initialConfig);
  const [allProjects, setAllProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [streamlitProject, setStreamlitProject] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<AIVideoProject | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [projectSearch, setProjectSearch] = useState<string>('');
  const [activeTrack, setActiveTrack] = useState<'all' | 'data' | 'ai-media'>('all');

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

  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory =
      projectFilter === 'all'
        ? true
        : projectFilter === 'ml'
        ? p.category.toLowerCase().includes('machine learning') || p.category.toLowerCase().includes('predictive')
        : projectFilter === 'backend'
        ? p.category.toLowerCase().includes('backend') || p.tools.some((t) => t.toLowerCase().includes('fastapi'))
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

  // Horizontal Carousel scroll logic for Projects
  const projectsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollProjectsLeft, setCanScrollProjectsLeft] = useState(false);
  const [canScrollProjectsRight, setCanScrollProjectsRight] = useState(true);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const updateProjectsScrollState = () => {
    if (!projectsScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = projectsScrollRef.current;
    setCanScrollProjectsLeft(scrollLeft > 15);
    setCanScrollProjectsRight(scrollLeft < scrollWidth - clientWidth - 15);

    const firstCard = projectsScrollRef.current.firstElementChild as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveProjectIndex(Math.min(Math.max(0, index), filteredProjects.length - 1));
    }
  };

  const scrollProjects = (direction: 'left' | 'right') => {
    if (!projectsScrollRef.current) return;
    const container = projectsScrollRef.current;
    const firstCard = container.firstElementChild as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 640;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollToProject = (index: number) => {
    if (!projectsScrollRef.current) return;
    const container = projectsScrollRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      setActiveProjectIndex(index);
    }
  };

  useEffect(() => {
    if (projectsScrollRef.current) {
      projectsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setActiveProjectIndex(0);
    setCanScrollProjectsLeft(false);
    setCanScrollProjectsRight(filteredProjects.length > 1);
  }, [projectFilter, projectSearch]);

  return (
    <div className="min-h-screen bg-[#fbf8f3] dark:bg-[#141210] text-[#1c1815] dark:text-[#faf5ee] flex flex-col font-sans selection:bg-amber-500 selection:text-white dark:selection:bg-orange-600 dark:selection:text-white transition-colors">
      {/* Top Scroll Reading Progress Indicator */}
      <ScrollProgress />

      {/* Montoya-Inspired Smooth Magnetic Magic Cursor */}
      <MagicCursor />

      {/* Navigation */}
      <Navbar config={activeConfig} />

      <main className="flex-grow pt-20 print:pt-4">
        {/* =========================================================================
            PRINT-ONLY RESUME & CV DOCUMENT HEADER
           ========================================================================= */}
        <div className="hidden print:block max-w-6xl mx-auto px-4 pb-6 mb-4 border-b-2 border-stone-800">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-stone-950 tracking-tight font-sans">
                {config.name}
              </h1>
              <p className="text-sm font-semibold text-stone-800 mt-1">
                Data Scientist • Machine Learning Engineer • Python &amp; FastAPI Backend Developer
              </p>
              <p className="text-xs text-stone-600 font-mono mt-1">
                B.Sc. Computer Science (First Class Honours, 4.87/5.0 CGPA) • Crawford University
              </p>
            </div>
            <div className="text-right text-xs font-mono text-stone-700 space-y-1 shrink-0">
              <div><strong>Email:</strong> {config.email}</div>
              <div><strong>Phone:</strong> {config.phone}</div>
              <div><strong>Location:</strong> {config.location}, Nigeria</div>
              <div><strong>GitHub:</strong> github.com/kikibillz</div>
              <div><strong>LinkedIn:</strong> linkedin.com/in/opeyemi-olamiju</div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            1. HERO SECTION (Luminous Warm Lighting)
           ========================================================================= */}
        <section id="hero" className="relative py-12 sm:py-20 lg:py-24 border-b border-amber-900/10 dark:border-amber-500/15 bg-[#fbf8f3] dark:bg-[#141210] overflow-hidden transition-colors print:py-4">
          {/* Subtle warm ambient radial glows */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.14),rgba(234,88,12,0.07),transparent_70%)] pointer-events-none -z-0"
          />
          <div
            aria-hidden="true"
            className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-amber-400/10 via-orange-500/5 to-transparent blur-3xl pointer-events-none -z-0"
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Natural, Credible Editorial Intro */}
              <div className="lg:col-span-6 print:col-span-12 space-y-6">
                <div className="flex items-center gap-3.5 print:hidden">
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
                        className="w-13 h-13 sm:w-15 sm:h-15 rounded-full object-cover border-2 border-amber-500/40 dark:border-amber-400/50 shadow-md ring-2 ring-amber-500/20 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600 to-orange-600 text-white font-mono font-bold text-base flex items-center justify-center shrink-0 shadow-md ring-2 ring-amber-500/20">
                        BO
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/25 dark:border-amber-400/25 text-amber-900 dark:text-amber-200 text-xs font-mono shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                      <span>Available for Roles &amp; AI Media Projects</span>
                    </div>
                    <div className="text-xs text-amber-900/60 dark:text-amber-400/60 font-mono mt-1">
                      {config.location} • Nigeria
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-stone-950 dark:text-stone-100 leading-[1.15] flex flex-wrap items-baseline gap-x-3 print:hidden">
                    <span>Hi, I&apos;m</span>
                    <AnimatedName name={config.name} variant="hero" />
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-display font-semibold text-stone-800 dark:text-stone-200 tracking-tight">
                    Data Scientist, ML Engineer &amp;{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-400 dark:to-amber-300">
                      AI Video Creator
                    </span>
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl font-normal">
                  I engineer practical data &amp; machine learning solutions and direct cinematic, high-conversion AI video commercials using Google Veo 3, Runway Gen-3, Kling, and Luma.
                </p>

                {/* Secondary line with warm highlights */}
                <div className="pt-1 text-xs sm:text-sm font-mono text-stone-500 dark:text-stone-400 flex flex-wrap items-center gap-2">
                  <span className="text-amber-900 dark:text-amber-300 font-medium">Python 3.12</span>
                  <span className="text-amber-400/60">•</span>
                  <span>Machine Learning</span>
                  <span className="text-amber-400/60">•</span>
                  <span className="text-orange-600 dark:text-orange-400 font-semibold">Generative AI Video</span>
                  <span className="text-amber-400/60">•</span>
                  <span>Veo 3 / Runway</span>
                  <span className="text-amber-400/60">•</span>
                  <span>FastAPI &amp; SQL</span>
                </div>

                {/* Action Buttons (hidden on print) */}
                <div className="pt-2 flex flex-wrap items-center gap-3 print:hidden">
                  <a
                    href="#projects"
                    id="hero-btn-work"
                    data-cursor-text="WORK"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:via-orange-500 hover:to-amber-600 active:from-amber-700 active:to-orange-700 text-white font-mono font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_6px_25px_rgba(234,88,12,0.45)] hover:scale-105 active:scale-95 cursor-pointer border border-amber-500/40"
                  >
                    <span>Explore Projects &amp; Code</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="#ai-videos"
                    id="hero-btn-videos"
                    data-cursor-text="REEL"
                    className="inline-flex items-center gap-2 bg-white/80 dark:bg-[#1a1714] hover:bg-amber-50 dark:hover:bg-[#25201b] text-stone-800 dark:text-stone-200 border border-amber-900/15 dark:border-amber-500/20 hover:border-amber-500/50 dark:hover:border-amber-400/40 font-mono font-medium text-xs tracking-wider uppercase px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
                  >
                    <Film className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                    <span>AI Video Reel</span>
                  </a>

                  <a
                    href="#contact"
                    id="hero-btn-talk"
                    data-cursor-text="TALK"
                    className="inline-flex items-center gap-1.5 text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 font-mono font-medium text-xs tracking-wider uppercase px-4 py-3 rounded-full hover:bg-amber-500/10 dark:hover:bg-amber-500/10 transition-all duration-200 cursor-pointer"
                  >
                    <span>Contact</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Focus Lens Track Switcher (hidden on print) */}
                <div className="pt-3 border-t border-amber-900/10 dark:border-amber-500/15 print:hidden">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-mono text-amber-900/70 dark:text-amber-400/70 uppercase tracking-wider font-medium">
                      Focus View:
                    </span>
                    <div className="inline-flex p-1 rounded-lg bg-amber-500/10 dark:bg-[#1c1815] border border-amber-500/20 dark:border-amber-500/20 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTrack('all');
                          setProjectFilter('all');
                        }}
                        className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                          activeTrack === 'all'
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs font-semibold'
                            : 'text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200'
                        }`}
                      >
                        All Work
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTrack('data');
                          setProjectFilter('all');
                          const el = document.getElementById('projects');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-3 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          activeTrack === 'data'
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs font-semibold'
                            : 'text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200'
                        }`}
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Data Science &amp; Python</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTrack('ai-media');
                          const el = document.getElementById('ai-videos');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-3 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          activeTrack === 'ai-media'
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xs font-semibold'
                            : 'text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200'
                        }`}
                      >
                        <Film className="w-3.5 h-3.5" />
                        <span>AI Video Direction</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Authentic Developer Workspace Visual (hidden on print) */}
              <div className="lg:col-span-6 print:hidden">
                <HeroWorkspaceVisual />
              </div>
            </div>

            {/* Executive Highlights & Value Delivery Matrix */}
            <div className="mt-12 pt-8 border-t border-amber-900/10 dark:border-amber-500/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/80 dark:bg-[#1a1714] p-3.5 rounded-xl border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/40 shadow-xs transition-colors">
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 text-xs font-mono mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Certifications</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-mono">
                  13 Verified
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                  Google Cloud • New Horizons • ALX
                </div>
              </div>

              <div className="bg-white/80 dark:bg-[#1a1714] p-3.5 rounded-xl border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/40 shadow-xs transition-colors">
                <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 text-xs font-mono mb-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Production ML &amp; API</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-mono">
                  FastAPI &amp; ASGI
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                  Pydantic v2 • Docker • Scikit-learn
                </div>
              </div>

              <div className="bg-white/80 dark:bg-[#1a1714] p-3.5 rounded-xl border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/40 shadow-xs transition-colors">
                <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 text-xs font-mono mb-1">
                  <Film className="w-3.5 h-3.5" />
                  <span>AI Video Direction</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-mono">
                  Veo 3 &amp; Runway
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                  Cinematic Commercials &amp; Media
                </div>
              </div>

              <div className="bg-white/80 dark:bg-[#1a1714] p-3.5 rounded-xl border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/40 shadow-xs transition-colors">
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-mono mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Engineering Rigor</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-mono">
                  90%+ Coverage
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                  Pytest • CI/CD • Contract Validated
                </div>
              </div>
            </div>

            {/* Montoya-Inspired Hero Footer Bar */}
            <div className="mt-12 pt-6 border-t border-amber-900/10 dark:border-amber-500/15 flex flex-wrap items-center justify-between gap-4 print:hidden">
              <a
                href="#projects"
                data-cursor-text="SCROLL"
                className="group inline-flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
              >
                <span className="w-8 h-8 rounded-full border border-amber-900/20 dark:border-amber-500/30 flex items-center justify-center group-hover:border-amber-600 dark:group-hover:border-amber-400 group-hover:scale-110 transition-all">
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-amber-600 dark:text-amber-400" />
                </span>
                <span className="font-semibold">Scroll to Explore</span>
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <span className="tracking-wider uppercase">Featured Works • Machine Learning &amp; AI Systems</span>
              </div>
            </div>
          </div>
        </section>

        {/* Continuous Montoya-Style Capabilities Marquee Strip */}
        <SkillsMarquee />

        {/* =========================================================================
            2. ABOUT SECTION (Warm Earth & Linen Surfaces)
           ========================================================================= */}
        <section id="about" className="py-20 sm:py-28 lg:py-32 border-b border-amber-900/10 dark:border-amber-500/15 bg-[#f6f2ea] dark:bg-[#181512] transition-colors">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto px-4 sm:px-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Background, Education & Principles */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono font-medium text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-2">
                    Background &amp; Approach
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-6">
                    About Me
                  </h2>
                </div>

                <div className="space-y-4 text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-normal">
                  <p>
                    I am a Data Scientist, Python Developer, and AI Orchestrator who leverages artificial intelligence to solve complex business problems at scale. While my foundation is rooted in a Computer Science degree from Olabisi Onabanjo University (O.O.U), my true value lies in my ability to use AI as a force multiplier.
                  </p>
                  <p>
                    Whether that means architecting high-throughput FastAPI machine learning services, building predictive churn models with XGBoost, or directing commercial-grade generative AI video productions, I don't just write code; I engineer solutions. I use advanced AI tools (like LLMs, Veo, and Runway) to accelerate development, automate workflows, and deliver production-ready software faster than traditional cycles.
                  </p>
                  <p>
                    If there is a problem to solve, I know how to engineer an AI-driven approach to do it efficiently, making me a versatile, high-impact addition ready to bring immediate velocity to any forward-thinking engineering or data team.
                  </p>
                </div>

                {/* Pragmatic Working Principles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-amber-900/10 dark:border-amber-500/15">
                  <div className="bg-white/90 dark:bg-[#1f1b17] border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/50 dark:hover:border-amber-400/40 rounded-xl p-4.5 shadow-2xs hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm mb-1.5 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Clean Data First</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      Handling missing values, outliers, and schema validation before any modeling.
                    </p>
                  </div>

                  <div className="bg-white/90 dark:bg-[#1f1b17] border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/50 dark:hover:border-amber-400/40 rounded-xl p-4.5 shadow-2xs hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm mb-1.5 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span>Explainable Insights</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      Prioritizing interpretable metrics and charts operational teams can trust.
                    </p>
                  </div>

                  <div className="bg-white/90 dark:bg-[#1f1b17] border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/50 dark:hover:border-amber-400/40 rounded-xl p-4.5 shadow-2xs hover:shadow-md transition-all duration-300 group">
                    <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-sm mb-1.5 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
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
                <div className="bg-white/90 dark:bg-[#1f1b17] border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/40 dark:hover:border-amber-400/40 rounded-2xl p-4 sm:p-5 shadow-sm transition-all duration-300">
                  <div className="relative aspect-[4/4.8] sm:aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 dark:bg-[#141210] border border-amber-900/10 dark:border-amber-500/20 shadow-inner">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-lg font-display font-bold tracking-tight">{config.name}</div>
                      <div className="text-xs font-mono text-amber-200/90 mt-0.5">B.Sc. Computer Science • O.O.U</div>
                      <div className="text-[11px] text-amber-300 font-mono mt-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                        <span>Data Scientist &amp; AI Video Creator</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-900/10 dark:border-amber-500/20 flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400 px-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span>{config.location}</span>
                    </div>
                    <span className="text-amber-700 dark:text-amber-400 font-medium">Remote &amp; Relocation Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* =========================================================================
            3. SKILLS SECTION
           ========================================================================= */}
        <section id="skills" className="py-20 sm:py-28 lg:py-32 border-b border-amber-900/10 dark:border-amber-500/15 bg-[#fbf8f3] dark:bg-[#141210] transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mb-12"
            >
              <span className="text-xs font-mono font-medium text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-2">
                Technical Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3">
                Skills &amp; Technologies
              </h2>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                Technologies I have actively learned and applied across coursework, personal data science projects, and analytical dashboards.
              </p>
            </motion.div>

            {/* Categorized Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((cat, catIdx) => (
                <motion.div
                  key={cat.title}
                  id={`skill-cat-${cat.title.toLowerCase().replace(/\s+/g, '-')}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: catIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/90 dark:bg-[#1a1714] border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/40 dark:hover:border-amber-400/40 rounded-2xl p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 tracking-tight font-mono uppercase mb-2 flex items-center justify-between">
                      <span className="group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">{cat.title}</span>
                      <span className="text-[10px] text-amber-900/60 dark:text-amber-400/60 font-mono">
                        {cat.skills.length} items
                      </span>
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 leading-relaxed font-sans">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-amber-900/10 dark:border-amber-500/15">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center text-xs font-mono bg-[#fdfbf7] dark:bg-[#201c18] hover:bg-amber-500/15 hover:border-amber-500/40 hover:text-amber-900 dark:hover:text-amber-200 text-stone-800 dark:text-stone-200 px-2.5 py-1 rounded-lg border border-amber-900/10 dark:border-amber-500/20 transition-all duration-200 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. FEATURED PROJECTS
           ========================================================================= */}
        <section id="projects" className="py-20 sm:py-28 lg:py-32 border-b border-amber-900/10 dark:border-amber-500/15 bg-[#f6f2ea] dark:bg-[#181512] transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mb-12"
            >
              <span className="text-xs font-mono font-medium text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-2">
                Engineering &amp; Code
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3">
                Selected Work &amp; Case Studies
              </h2>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                Production REST microservices, machine learning classifiers with live inference, automated financial ledgers, and full-stack web applications.
              </p>
            </motion.div>

            {/* Project Showcase Controls (Category Filters & Live Search) (hidden on print) */}
            <div className="mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 print:hidden">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 bg-amber-500/10 dark:bg-[#1c1815] p-1.5 rounded-full border border-amber-500/20 dark:border-amber-500/20 text-xs font-mono">
                {[
                  { id: 'all', label: 'All Projects', count: allProjects.length },
                  {
                    id: 'backend',
                    label: 'Backend & APIs',
                    count: allProjects.filter(
                      (p) => p.category.toLowerCase().includes('backend') || p.tools.some((t) => t.toLowerCase().includes('fastapi'))
                    ).length,
                  },
                  {
                    id: 'ml',
                    label: 'Machine Learning',
                    count: allProjects.filter(
                      (p) => p.category.toLowerCase().includes('machine learning') || p.category.toLowerCase().includes('predictive')
                    ).length,
                  },
                  {
                    id: 'data',
                    label: 'Data & Analytics',
                    count: allProjects.filter(
                      (p) =>
                        p.category.toLowerCase().includes('data analysis') ||
                        p.category.toLowerCase().includes('automation') ||
                        p.category.toLowerCase().includes('analytics')
                    ).length,
                  },
                  {
                    id: 'web',
                    label: 'Web Apps',
                    count: allProjects.filter(
                      (p) => p.category.toLowerCase().includes('web') || p.category.toLowerCase().includes('product')
                    ).length,
                  },
                ].map((tab) => {
                  const isActive = projectFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setProjectFilter(tab.id)}
                      data-cursor-text="VIEW"
                      className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-xs'
                          : 'text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200 hover:bg-amber-500/10'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-white/25 text-current'
                            : 'bg-amber-900/10 dark:bg-white/10 text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[240px] sm:w-72">
                <Search className="w-4 h-4 text-amber-700/60 dark:text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Filter by tech or keyword..."
                  className="w-full pl-9 pr-8 py-2 text-xs font-mono bg-white/90 dark:bg-[#1c1815] border border-amber-900/15 dark:border-amber-500/20 rounded-full text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 shadow-2xs"
                />
                {projectSearch && (
                  <button
                    type="button"
                    onClick={() => setProjectSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-0.5"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Results Counter if filtered */}
            {(projectFilter !== 'all' || projectSearch) && (
              <div className="mb-6 flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 px-1 print:hidden">
                <span>
                  Showing {filteredProjects.length} of {allProjects.length} projects
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setProjectFilter('all');
                    setProjectSearch('');
                  }}
                  className="text-amber-800 dark:text-amber-300 underline hover:no-underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}

            {/* Horizontal Carousel Controls & Navigation Toolbar */}
            {filteredProjects.length > 0 && (
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-stone-700 dark:text-stone-300 bg-amber-500/10 dark:bg-[#1c1815] border border-amber-500/20 dark:border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                    <span>Scroll or swipe left-to-right</span>
                  </span>
                  <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                    Project <strong className="text-stone-900 dark:text-stone-100">{activeProjectIndex + 1}</strong> of {filteredProjects.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollProjects('left')}
                    disabled={!canScrollProjectsLeft}
                    data-cursor-text="PREV"
                    aria-label="Previous project"
                    className="w-9 h-9 rounded-full bg-white dark:bg-[#1a1714] border border-amber-900/15 dark:border-amber-500/20 hover:border-amber-500/50 text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollProjects('right')}
                    disabled={!canScrollProjectsRight}
                    data-cursor-text="NEXT"
                    aria-label="Next project"
                    className="w-9 h-9 rounded-full bg-white dark:bg-[#1a1714] border border-amber-900/15 dark:border-amber-500/20 hover:border-amber-500/50 text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Project Showcase List - Horizontal Reel */}
            {filteredProjects.length === 0 ? (
              <div className="bg-white/90 dark:bg-[#1a1714] border border-amber-900/10 dark:border-amber-500/20 rounded-xl p-12 text-center my-10">
                <Search className="w-8 h-8 text-amber-500/60 mx-auto mb-3" />
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1">
                  No matching projects found
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 max-w-sm mx-auto">
                  Try clearing your search query or selecting a different project category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setProjectFilter('all');
                    setProjectSearch('');
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-medium cursor-pointer shadow-xs"
                >
                  View All Projects
                </button>
              </div>
            ) : (
              <div className="mb-16">
                <div
                  ref={projectsScrollRef}
                  onScroll={updateProjectsScrollState}
                  className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory print:block print:overflow-visible print:space-y-8 select-none"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      className="w-[88vw] sm:w-[620px] lg:w-[740px] shrink-0 snap-start print:w-full print:mb-8"
                      onOpenCaseStudy={(p) => setSelectedProject(p)}
                      onOpenStreamlit={(p) => setStreamlitProject(p)}
                    />
                  ))}
                </div>

                {/* Horizontal Navigation Dots */}
                <div className="flex items-center justify-center gap-2 mt-4 print:hidden">
                  {filteredProjects.map((p, dotIdx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => scrollToProject(dotIdx)}
                      aria-label={`Jump to project ${dotIdx + 1}: ${p.title}`}
                      data-cursor-text={`${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        dotIdx === activeProjectIndex
                          ? 'w-8 bg-gradient-to-r from-amber-500 to-orange-500 shadow-xs'
                          : 'w-2 bg-amber-900/20 dark:bg-amber-400/20 hover:bg-amber-500/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

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
        <section id="experience" className="py-20 sm:py-28 lg:py-32 border-b border-amber-900/10 dark:border-amber-500/15 bg-[#fbf8f3] dark:bg-[#141210] transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mb-12"
            >
              <span className="text-xs font-mono font-medium text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-2">
                Timeline
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3">
                Education &amp; Experience
              </h2>
              <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                Academic foundation in Computer Science from Olabisi Onabanjo University (O.O.U) combined with applied machine learning, people operations, and administrative data management.
              </p>
            </motion.div>

            <div className="relative border-l-2 border-amber-500/30 dark:border-amber-400/30 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
              {experienceItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  id={`timeline-${item.id}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <span className="absolute -left-[32px] sm:-left-[41px] top-2 w-4 h-4 rounded-full border-2 border-amber-500 dark:border-amber-400 bg-white dark:bg-[#141210] shadow-[0_0_10px_rgba(245,158,11,0.5)]" />

                  <div className="bg-white/90 dark:bg-[#1a1714] border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/40 dark:hover:border-amber-400/40 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 max-w-3xl group">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {item.category === 'Education' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-amber-900 dark:text-amber-200 bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-md">
                            <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            <span>{item.category}</span>
                          </span>
                        ) : item.id === 'exp-ds' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-orange-900 dark:text-orange-200 bg-orange-500/15 dark:bg-orange-500/20 border border-orange-500/30 px-2.5 py-0.5 rounded-md">
                            <Cpu className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                            <span>Data Science &amp; ML</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-amber-900 dark:text-amber-300 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md">
                            <Briefcase className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                            <span>{item.category}</span>
                          </span>
                        )}
                        <h3 className="text-base sm:text-lg font-display font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-stone-600 dark:text-stone-400 bg-[#fdfbf7] dark:bg-[#201c18] px-2.5 py-0.5 rounded-md border border-amber-900/10 dark:border-amber-500/15">
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

                    <div className="pt-3 border-t border-amber-900/10 dark:border-amber-500/15 space-y-1.5">
                      <div className="text-xs font-mono text-amber-900/70 dark:text-amber-400/70 uppercase font-medium mb-1">
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. CERTIFICATIONS & LICENSES SECTION
           ========================================================================= */}
        <CertificationsSection
          certifications={certifications}
          certificationsUrl={certificationsUrl}
          config={config}
        />

        {/* =========================================================================
            7. RESUME SECTION
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
      <footer id="site-footer" className="bg-[#14110e] text-stone-400 py-12 border-t border-amber-900/25 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-amber-900/20">
            <div>
              <div className="text-sm font-bold text-stone-100 font-mono tracking-tight flex items-center gap-2">
                <span>{config.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              </div>
              <div className="text-stone-400 mt-0.5">
                Data Scientist • Python &amp; Backend Developer • AI Video Creator
              </div>
            </div>

            {/* Clean footer links */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={config.github}
                target="_blank"
                rel="noreferrer"
                id="footer-link-github"
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5 text-amber-500/80" />
                <span>GitHub</span>
              </a>

              <a
                href={config.linkedin}
                target="_blank"
                rel="noreferrer"
                id="footer-link-linkedin"
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5 text-amber-500/80" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${config.email}`}
                id="footer-link-email"
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-amber-500/80" />
                <span>Email</span>
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-[11px] font-mono">
            <div>
              <span>&copy; 2026 {config.name}. All rights reserved.</span>
            </div>
            <div className="text-amber-500/80">
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

      {/* Montoya-Inspired Floating Back to Top Trigger */}
      <BackToTop />
    </div>
  );
}
