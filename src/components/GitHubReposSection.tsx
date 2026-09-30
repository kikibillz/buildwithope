import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  ExternalLink,
  FolderGit2,
  LayoutGrid,
  ListFilter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MoveHorizontal,
  ArrowUpRight,
} from 'lucide-react';
import { GitHubRepo } from '../types';
import { RepoDemoScreenshotPreview } from './RepoDemoScreenshotPreview';

export const allGithubRepos: GitHubRepo[] = [
  {
    name: 'fastapi-ml-service',
    displayName: 'fastapi-ml-service',
    description:
      'Production-grade asynchronous FastAPI backend serving machine learning inference pipelines with Pydantic v2 schemas, automated Swagger UI, and Docker.',
    language: 'Python',
    html_url: 'https://github.com/kikibillz/fastapi-ml-service',
    homepage: 'https://github.com/kikibillz/fastapi-ml-service#readme',
    category: 'Machine Learning',
    tags: ['Python', 'FastAPI', 'Pydantic v2', 'REST APIs', 'Docker', 'Uvicorn'],
    isFeatured: true,
  },
  {
    name: 'HR-Analytics-2026',
    displayName: 'HR-Analytics-2026',
    description:
      'End-to-end workforce analytics pipeline with data cleaning, MongoDB integration, exploratory analysis, and Streamlit visualization.',
    language: 'Python',
    html_url: 'https://github.com/kikibillz/HR-Analytics-2026',
    homepage: 'https://hr-analytics-2026-msc.streamlit.app',
    category: 'Data Analysis',
    tags: ['Python', 'Pandas', 'Plotly', 'Streamlit', 'MongoDB'],
    isFeatured: true,
  },
  {
    name: 'Bank-Customer-Churn-Project',
    displayName: 'Bank-Customer-Churn-Project',
    description:
      'Customer retention & churn prediction engine using XGBoost, SMOTE class balancing, feature engineering, and an interactive Streamlit app.',
    language: 'Python',
    html_url: 'https://github.com/kikibillz/Bank-Customer-Churn-Project',
    homepage: 'https://bank-customer-churn-project-mcrbap8m8yqf7y3yghq87c.streamlit.app/',
    category: 'Machine Learning',
    tags: ['Python', 'XGBoost', 'Scikit-learn', 'SMOTE', 'Streamlit'],
    isFeatured: true,
  },
  {
    name: 'lead-finder',
    displayName: 'lead-finder',
    description:
      'Automated Python ETL script querying the UK Care Quality Commission (CQC) REST API to extract, parse, and export care provider records to CSV.',
    language: 'Python',
    html_url: 'https://github.com/kikibillz/lead-finder',
    homepage: null,
    category: 'Automation & Python',
    tags: ['Python', 'Requests', 'REST APIs', 'ETL', 'CSV'],
    isFeatured: true,
  },
  {
    name: 'nigerian-career-boost-hub',
    displayName: 'nigerian-career-boost-hub',
    description:
      'Interactive workforce resource platform supporting Nigerian job seekers and tech career switchers with verified tools and guidance.',
    language: 'TypeScript',
    html_url: 'https://github.com/kikibillz/nigerian-career-boost-hub',
    homepage: 'https://nigerian-career-boost-hub.vercel.app',
    category: 'Web & Tools',
    tags: ['TypeScript', 'React', 'Next.js', 'Vercel Deployment'],
    isFeatured: true,
  },
  {
    name: 'career-boost',
    displayName: 'career-boost',
    description:
      'Career readiness platform and curated resources for Nigerian professionals and early-stage talent.',
    language: 'TypeScript',
    html_url: 'https://github.com/kikibillz/career-boost',
    homepage: 'https://career-boostng.vercel.app',
    category: 'Web & Tools',
    tags: ['TypeScript', 'Web App', 'Vercel'],
  },
  {
    name: 'Begi-Begi',
    displayName: 'Begi-Begi',
    description:
      'Full-stack social funding and micro-request web application with responsive layout and live deployment.',
    language: 'TypeScript',
    html_url: 'https://github.com/kikibillz/Begi-Begi',
    homepage: 'https://begi-begi.vercel.app',
    category: 'Web & Tools',
    tags: ['TypeScript', 'React', 'Vercel'],
    isFeatured: true,
  },
  {
    name: 'filr',
    displayName: 'filr',
    description:
      'Python utility for automated file management, directory indexing, and structured file sorting.',
    language: 'Python',
    html_url: 'https://github.com/kikibillz/filr',
    homepage: null,
    category: 'Automation & Python',
    tags: ['Python', 'Automation', 'OS & File I/O'],
  },
  {
    name: 'cardflip',
    displayName: 'cardflip',
    description:
      'Interactive desktop memory matching game engineered with Python and Tkinter GUI event loop.',
    language: 'Python',
    html_url: 'https://github.com/kikibillz/cardflip',
    homepage: null,
    category: 'Automation & Python',
    tags: ['Python', 'Tkinter', 'Desktop GUI'],
  },
  {
    name: 'gads-2020-pratice-project',
    displayName: 'gads-2020-practice-project',
    description:
      'Google Africa Developer Scholarship practice project configuring GCP Compute Engine and Cloud Datalab notebook environments.',
    language: 'Cloud / Shell',
    html_url: 'https://github.com/kikibillz/gads-2020-pratice-project',
    homepage: null,
    category: 'Data Analysis',
    tags: ['Google Cloud', 'Cloud Datalab', 'GCP', 'Jupyter'],
  },
  {
    name: 'Kolochain',
    displayName: 'Kolochain',
    description:
      'Blockchain smart contract and decentralized savings experiments inspired by traditional revolving cooperative structures.',
    language: 'Solidity / Web3',
    html_url: 'https://github.com/kikibillz/Kolochain',
    homepage: null,
    category: 'Web & Tools',
    tags: ['Smart Contracts', 'Web3', 'Solidity'],
  },
  {
    name: 'Cloud-challenge',
    displayName: 'Cloud-challenge',
    description:
      'Hands-on cloud architecture labs covering compute instances, API configurations, and Linux cloud services.',
    language: 'Cloud Infrastructure',
    html_url: 'https://github.com/kikibillz/Cloud-challenge',
    homepage: null,
    category: 'Web & Tools',
    tags: ['Cloud Computing', 'Infrastructure', 'Linux'],
  },
];

export const GitHubReposSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'swipe' | 'visual' | 'compact'>('swipe');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAutoGliding, setIsAutoGliding] = useState<boolean>(false);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftPos = useRef<number>(0);
  const isHovered = useRef<boolean>(false);

  const categories = ['All', 'Live Demos', 'Python & Data', 'Web & TypeScript'];

  const filteredRepos = allGithubRepos.filter((repo) => {
    if (filter === 'All') return true;
    if (filter === 'Live Demos') {
      return Boolean(repo.homepage);
    }
    if (filter === 'Python & Data') {
      return (
        repo.category === 'Machine Learning' ||
        repo.category === 'Data Analysis' ||
        repo.language === 'Python'
      );
    }
    if (filter === 'Web & TypeScript') {
      return repo.language === 'TypeScript' || repo.category === 'Web & Tools';
    }
    return true;
  });

  // Calculate scroll boundaries & progress
  const updateScrollStatus = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const current = el.scrollLeft;
    setCanScrollLeft(current > 10);
    setCanScrollRight(current < maxScroll - 10);
    const progress = Math.min(100, Math.max(0, (current / maxScroll) * 100));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollStatus();
    el.addEventListener('scroll', updateScrollStatus, { passive: true });
    window.addEventListener('resize', updateScrollStatus);
    return () => {
      el.removeEventListener('scroll', updateScrollStatus);
      window.removeEventListener('resize', updateScrollStatus);
    };
  }, [updateScrollStatus, filteredRepos, viewMode]);

  // Smooth scroll handler
  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Drag-to-scroll implementation
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftPos.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Continuous auto-glide animation
  useEffect(() => {
    if (!isAutoGliding || viewMode !== 'swipe') return;
    let animId: number;

    const glide = () => {
      const el = scrollRef.current;
      if (el && !isHovered.current && !isDragging.current) {
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 5) {
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += 1;
        }
      }
      animId = requestAnimationFrame(glide);
    };

    animId = requestAnimationFrame(glide);
    return () => cancelAnimationFrame(animId);
  }, [isAutoGliding, viewMode]);

  return (
    <div id="repositories" className="mt-14 pt-10 border-t border-foreground/15">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6"
      >
        <div>
          <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest block mb-1">
            07 / Open Source Codebases
          </span>
          <h3 className="text-xl sm:text-3xl font-display font-extrabold tracking-tight uppercase text-foreground">
            Repositories &amp; Code
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl font-sans">
            Horizontal swipeable reel of production machine learning models, exploratory data pipelines, web platforms, and utilities.
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Switcher: Swipeable Reel / Grid / List */}
          <div className="inline-flex items-center bg-card p-1 rounded-xs border-2 border-foreground shadow-brutal-sm text-xs font-mono font-bold uppercase">
            <button
              type="button"
              onClick={() => setViewMode('swipe')}
              data-cursor-text="REEL"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-all cursor-pointer ${
                viewMode === 'swipe'
                  ? 'bg-foreground text-background shadow-xs'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <MoveHorizontal className="w-3.5 h-3.5" />
              <span>Swipe Reel</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('visual')}
              data-cursor-text="GRID"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-all cursor-pointer ${
                viewMode === 'visual'
                  ? 'bg-foreground text-background shadow-xs'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compact')}
              data-cursor-text="LIST"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs transition-all cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-foreground text-background shadow-xs'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1 bg-card p-1 rounded-xs border border-foreground/30">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setFilter(cat);
                  if (scrollRef.current) scrollRef.current.scrollLeft = 0;
                }}
                data-cursor-text={cat === 'All' ? 'ALL' : 'FILTER'}
                className={`text-xs px-2.5 py-1 rounded-xs transition-all font-mono font-bold uppercase cursor-pointer ${
                  filter === cat
                    ? 'bg-foreground text-background shadow-brutal-sm'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Swipeable View Controls & Progress Bar */}
      {viewMode === 'swipe' && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-3 bg-muted/60 border border-foreground/20 rounded-xs font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-bold uppercase text-foreground">
              <MoveHorizontal className="w-4 h-4 text-primary animate-pulse" />
              <span>Swipeable Animated Reel</span>
            </span>
            <span className="text-muted-foreground hidden md:inline">
              · Drag with mouse or swipe on touch
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto-Glide Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoGliding(!isAutoGliding)}
              title={isAutoGliding ? 'Pause auto glide' : 'Start smooth auto glide'}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xs border text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                isAutoGliding
                  ? 'bg-primary text-primary-foreground border-foreground shadow-2xs'
                  : 'bg-card text-foreground border-foreground/30 hover:border-foreground'
              }`}
            >
              {isAutoGliding ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isAutoGliding ? 'Auto-Gliding' : 'Auto Glide'}</span>
            </button>

            {/* Left Scroll Button */}
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous repositories"
              className="p-1.5 rounded-xs border border-foreground/30 bg-card text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right Scroll Button */}
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next repositories"
              className="p-1.5 rounded-xs border border-foreground/30 bg-card text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Progress Track */}
      {viewMode === 'swipe' && (
        <div className="w-full h-1 bg-foreground/15 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-primary transition-all duration-150"
            style={{ width: `${Math.max(8, scrollProgress)}%` }}
          />
        </div>
      )}

      {/* Repositories Display */}
      {viewMode === 'swipe' ? (
        /* ========================================================
           HORIZONTAL SWIPEABLE ANIMATED TRACK
           ======================================================== */
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={() => {
            handleMouseUpOrLeave();
            isHovered.current = false;
          }}
          onMouseEnter={() => {
            isHovered.current = true;
          }}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 scrollbar-none select-none cursor-grab active:cursor-grabbing w-full"
          style={{ scrollBehavior: isDragging.current ? 'auto' : 'smooth' }}
        >
          {filteredRepos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: idx * 0.03 }}
              className="w-[85vw] sm:w-[380px] md:w-[410px] shrink-0 snap-start bg-card text-foreground border-2 border-foreground rounded-xs overflow-hidden flex flex-col justify-between shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all group"
            >
              <div>
                {/* Visual Screenshot with Hover Animation */}
                <div className="p-2 pb-0 bg-muted/40 border-b border-foreground/15">
                  <RepoDemoScreenshotPreview repo={repo} />
                </div>

                {/* Card Content */}
                <div className="p-5 pt-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-foreground">
                      <FolderGit2 className="w-3.5 h-3.5 text-primary" />
                      <span>{repo.language || 'Code'}</span>
                    </span>
                    {repo.isFeatured && (
                      <span className="text-[10px] font-mono text-foreground bg-highlight px-2 py-0.5 rounded-xs font-bold border border-foreground uppercase flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-foreground font-mono tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {repo.displayName}
                  </h4>
                  <p className="text-xs text-foreground/80 leading-relaxed font-sans mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex flex-wrap gap-1 mb-3 pt-3 border-t border-foreground/15">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-semibold bg-muted text-foreground px-2 py-0.5 rounded-xs border border-foreground/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-foreground/15 text-xs">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-foreground hover:text-primary font-bold transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>

                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-primary hover:underline font-bold"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : viewMode === 'visual' ? (
        /* Visual Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="bg-card text-foreground border-2 border-foreground rounded-xs overflow-hidden flex flex-col justify-between shadow-brutal hover:shadow-brutal-lg transition-all group"
            >
              <div>
                <div className="p-2 pb-0 bg-muted/40 border-b border-foreground/15">
                  <RepoDemoScreenshotPreview repo={repo} />
                </div>

                <div className="p-5 pt-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-foreground">
                      <FolderGit2 className="w-3.5 h-3.5 text-primary" />
                      <span>{repo.language || 'Code'}</span>
                    </span>
                    {repo.isFeatured && (
                      <span className="text-[10px] font-mono text-foreground bg-highlight px-2 py-0.5 rounded-xs font-bold border border-foreground uppercase flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-foreground font-mono tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {repo.displayName}
                  </h4>
                  <p className="text-xs text-foreground/80 leading-relaxed font-sans mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex flex-wrap gap-1 mb-3 pt-3 border-t border-foreground/15">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-semibold bg-muted text-foreground px-2 py-0.5 rounded-xs border border-foreground/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-foreground/15 text-xs">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-foreground hover:text-primary font-bold transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>

                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-primary hover:underline font-bold"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Compact List View */
        <div className="bg-card border-2 border-foreground rounded-xs overflow-hidden divide-y-2 divide-foreground/15 shadow-brutal">
          {filteredRepos.map((repo) => (
            <div
              key={repo.name}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/40 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-bold text-foreground font-mono">{repo.displayName}</h4>
                  <span className="text-[10px] font-mono bg-muted text-foreground px-1.5 py-0.5 rounded-xs border border-foreground/20">
                    {repo.language}
                  </span>
                  {repo.isFeatured && (
                    <span className="text-[10px] font-mono bg-highlight text-foreground border border-foreground px-1.5 py-0.5 rounded-xs font-bold">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 font-sans">{repo.description}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {repo.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono text-foreground/75 bg-muted px-1.5 py-0.5 rounded-xs border border-foreground/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs font-mono">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-text="CODE"
                  className="inline-flex items-center gap-1 text-foreground hover:bg-foreground hover:text-background px-2.5 py-1 rounded-xs bg-muted border border-foreground/20 transition-colors"
                >
                  <Github className="w-3 h-3" />
                  <span>GitHub</span>
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-text="DEMO"
                    className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2.5 py-1 rounded-xs transition-colors border border-foreground font-bold shadow-2xs"
                  >
                    <span>Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer link to all GitHub Repos */}
      <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="https://github.com/kikibillz"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-foreground bg-card border-2 border-foreground hover:bg-foreground hover:text-background px-5 py-2.5 rounded-xs transition-colors shadow-brutal-sm hover:shadow-brutal cursor-pointer"
        >
          <Github className="w-4 h-4" />
          <span>Explore all 12 repositories on GitHub (@kikibillz)</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
