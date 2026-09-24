import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  ExternalLink,
  Code2,
  Database,
  Terminal,
  ArrowUpRight,
  FolderGit2,
  ShieldCheck,
  LayoutGrid,
  ListFilter,
  CheckCircle2,
  Sparkles,
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
  const [viewMode, setViewMode] = useState<'visual' | 'compact'>('visual');

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

  return (
    <div id="repositories" className="mt-14 pt-10 border-t border-amber-900/10 dark:border-amber-500/15">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6"
      >
        <div>
          <span className="text-xs font-mono font-medium text-amber-800 dark:text-amber-300 uppercase tracking-widest block mb-1">
            Open Source Codebases
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Repositories &amp; Code
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-xl">
            Machine learning models, exploratory data pipelines, web platforms, and developer utilities on GitHub.
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Visual / Compact Switcher */}
          <div className="inline-flex items-center bg-amber-500/10 dark:bg-[#1a1714] p-1 rounded-full border border-amber-500/20 text-xs">
            <button
              onClick={() => setViewMode('visual')}
              data-cursor-text="GRID"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all font-medium cursor-pointer ${
                viewMode === 'visual'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-amber-900 dark:hover:text-amber-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Screenshots &amp; Demos</span>
            </button>
            <button
              onClick={() => setViewMode('compact')}
              data-cursor-text="LIST"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full transition-all font-medium cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-amber-900 dark:hover:text-amber-200'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1 bg-amber-500/10 dark:bg-[#1a1714] p-1 rounded-full border border-amber-500/20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-cursor-text={cat === 'All' ? 'ALL' : 'FILTER'}
                className={`text-xs px-3 py-1 rounded-xs transition-all font-mono font-bold uppercase cursor-pointer ${
                  filter === cat
                    ? 'bg-foreground text-background shadow-brutal-sm'
                    : 'text-foreground/70 hover:text-foreground border border-foreground/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Repositories Display */}
      {viewMode === 'visual' ? (
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
                      className="inline-flex items-center gap-1 font-mono text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 font-medium hover:underline"
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
        /* Compact Matrix Table View */
        <div className="bg-white/95 dark:bg-[#1a1714] border border-amber-900/10 dark:border-amber-500/20 rounded-2xl overflow-hidden divide-y divide-amber-900/10 dark:divide-amber-500/15 shadow-2xs">
          {filteredRepos.map((repo) => (
            <div
              key={repo.name}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-amber-50/50 dark:hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 font-mono">{repo.displayName}</h4>
                  <span className="text-[10px] font-mono bg-[#fdfbf7] dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 px-1.5 py-0.2 rounded border border-amber-900/10 dark:border-stone-700">
                    {repo.language}
                  </span>
                  {repo.isFeatured && (
                    <span className="text-[10px] font-mono text-amber-900 dark:text-amber-200 bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.2 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-1">{repo.description}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {repo.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-[9px] font-mono text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/80 px-1.5 py-0.2 rounded border border-stone-200 dark:border-stone-700">
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
                  className="inline-flex items-center gap-1 text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-white px-2.5 py-1 rounded-md bg-stone-100 dark:bg-[#1a1a20] hover:bg-amber-100/60 dark:hover:bg-[#222228] transition-colors"
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
                    className="inline-flex items-center gap-1 text-amber-900 dark:text-amber-200 hover:text-amber-950 dark:hover:text-amber-100 px-2.5 py-1 rounded-md bg-amber-500/15 dark:bg-amber-500/20 hover:bg-amber-500/25 transition-colors border border-amber-500/30"
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
          className="inline-flex items-center gap-2 text-xs font-mono text-stone-800 dark:text-stone-200 hover:text-amber-900 dark:hover:text-white bg-white dark:bg-[#1a1714] border border-amber-900/15 dark:border-amber-500/20 hover:border-amber-500/50 px-4 py-2 rounded-full transition-colors shadow-2xs"
        >
          <Github className="w-4 h-4" />
          <span>Explore all 12 repositories on GitHub (@kikibillz)</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
        </a>
      </div>
    </div>
  );
};

