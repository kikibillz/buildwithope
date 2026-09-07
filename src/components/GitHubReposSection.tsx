import React, { useState } from 'react';
import { Github, ExternalLink, Code2, Database, Terminal, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { GitHubRepo } from '../types';

export const allGithubRepos: GitHubRepo[] = [
  {
    name: 'HR-Analytics-2026',
    displayName: 'HR-Analytics-2026',
    description:
      'End-to-end workforce analytics pipeline with data cleaning (HR_cleaned.csv), MongoDB integration, exploratory analysis, and Streamlit visualization.',
    language: 'Python',
    html_url: 'https://github.com/kikibillz/HR-Analytics-2026',
    homepage: null,
    category: 'Data Analysis',
    tags: ['Python', 'Pandas', 'Plotly', 'Streamlit', 'MongoDB', 'Joblib'],
    isFeatured: true,
  },
  {
    name: 'Bank-Customer-Churn-Project',
    displayName: 'Bank-Customer-Churn-Project',
    description:
      'Customer retention & churn prediction engine using XGBoost, SMOTE class imbalance handling, feature engineering, and an interactive Streamlit app.',
    language: 'Python',
    html_url: 'https://github.com/kikibillz/Bank-Customer-Churn-Project',
    homepage: null,
    category: 'Machine Learning',
    tags: ['Python', 'XGBoost', 'Scikit-learn', 'SMOTE', 'Streamlit', 'Joblib'],
    isFeatured: true,
  },
  {
    name: 'lead-finder',
    displayName: 'lead-finder',
    description:
      'Automated Python ETL script querying the UK Care Quality Commission (CQC) REST API to extract, parse, and export regulated care provider records to CSV.',
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
    name: 'filr',
    displayName: 'filr',
    description:
      'Python utility for automated file management, directory indexing, and structured data handling.',
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
    name: 'Begi-Begi',
    displayName: 'Begi-Begi',
    description:
      'Full-stack social funding and micro-request web application with responsive layout and live deployment.',
    language: 'TypeScript',
    html_url: 'https://github.com/kikibillz/Begi-Begi',
    homepage: 'https://begi-begi.vercel.app',
    category: 'Web & Tools',
    tags: ['TypeScript', 'React', 'Vercel'],
  },
  {
    name: 'gads-2020-pratice-project',
    displayName: 'gads-2020-practice-project',
    description:
      'Google Africa Developer Scholarship (GADS) practice project setting up Google Cloud Platform (GCP) Compute Engine and Cloud Datalab notebook environments.',
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
      'Hands-on cloud architecture and deployment labs covering compute instances, API configurations, and cloud services.',
    language: 'Cloud Infrastructure',
    html_url: 'https://github.com/kikibillz/Cloud-challenge',
    homepage: null,
    category: 'Web & Tools',
    tags: ['Cloud Computing', 'Infrastructure', 'Linux'],
  },
];

export const GitHubReposSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Python & Data Science', 'Web & TypeScript', 'Cloud & Systems'];

  const filteredRepos = allGithubRepos.filter((repo) => {
    if (filter === 'All') return true;
    if (filter === 'Python & Data Science') {
      return (
        repo.category === 'Machine Learning' ||
        repo.category === 'Data Analysis' ||
        repo.language === 'Python'
      );
    }
    if (filter === 'Web & TypeScript') {
      return repo.language === 'TypeScript' || repo.category === 'Web & Tools';
    }
    if (filter === 'Cloud & Systems') {
      return repo.tags.some((t) => t.includes('Cloud') || t.includes('GCP') || t.includes('Infrastructure'));
    }
    return true;
  });

  return (
    <div id="all-github-repositories" className="mt-16 pt-12 border-t border-stone-300/80">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span className="text-xs font-mono uppercase tracking-wider text-stone-600 font-medium">
              Verified Public Repositories
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900">
            All Repositories on github.com/kikibillz
          </h3>
          <p className="text-sm text-stone-600 mt-1">
            Real repositories covering machine learning pipelines, HR analytics, automated scraping, and full-stack web tools.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1 bg-stone-200/70 p-1 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors font-medium ${
                filter === cat
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Repositories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRepos.map((repo) => (
          <div
            key={repo.name}
            className="bg-white border border-stone-200 rounded-lg p-4 flex flex-col justify-between hover:border-stone-400 hover:shadow-xs transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500">
                  <FolderGit2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>{repo.language || 'Code'}</span>
                </span>
                {repo.isFeatured && (
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-medium">
                    Featured
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-stone-900 font-mono tracking-tight mb-1">
                {repo.displayName}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed font-sans mb-3 line-clamp-3">
                {repo.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1 mb-3 pt-2 border-t border-stone-100">
                {repo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-stone-800 hover:text-stone-950 font-medium hover:underline"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Code</span>
                </a>

                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-emerald-700 hover:text-emerald-800 font-medium"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://github.com/kikibillz"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-stone-700 hover:text-stone-950 bg-white border border-stone-300 hover:border-stone-400 px-4 py-2 rounded-md transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>Explore all 11 repositories on GitHub (@kikibillz)</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
        </a>
      </div>
    </div>
  );
};
