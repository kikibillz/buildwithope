import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Github,
  ExternalLink,
  Terminal,
  Code2,
  FolderTree,
  Layers,
  Sparkles,
  Globe,
} from 'lucide-react';
import { GitHubRepo } from '../types';
import { LiveWebEmbedPreview } from './LiveWebEmbedPreview';

import bankChurnImg from '../assets/images/bank_churn_app_1789401191137.jpg';
import hrAnalyticsImg from '../assets/images/hr_analytics_app_1789401204328.jpg';
import leadFinderImg from '../assets/images/lead_finder_app_1789401276532.jpg';

interface RepoDemoScreenshotPreviewProps {
  repo: GitHubRepo;
}

export const RepoDemoScreenshotPreview: React.FC<RepoDemoScreenshotPreviewProps> = ({ repo }) => {
  const [isHovered, setIsHovered] = useState(false);

  // If this repo has an actual live web app deployed on Vercel, embed the real interactive app
  if (repo.name === 'Begi-Begi') {
    return (
      <LiveWebEmbedPreview
        url="https://begi-begi.vercel.app"
        title="Begi-Begi"
        domain="begi-begi.vercel.app"
        compact={true}
      />
    );
  }

  if (repo.name === 'career-boost') {
    return (
      <LiveWebEmbedPreview
        url="https://career-boostng.vercel.app"
        title="career-boost"
        domain="career-boostng.vercel.app"
        compact={true}
      />
    );
  }

  if (repo.name === 'nigerian-career-boost-hub') {
    return (
      <LiveWebEmbedPreview
        url="https://nigerian-career-boost-hub.vercel.app"
        title="nigerian-career-boost-hub"
        domain="nigerian-career-boost-hub.vercel.app"
        compact={true}
      />
    );
  }

  // Render actual screenshot image or clean code preview based on repository
  const renderRepoVisual = () => {
    switch (repo.name) {
      // Repositories with actual live sites/demos use real website screenshots
      case 'Bank-Customer-Churn-Project':
        return (
          <div className="relative w-full h-full bg-stone-950 overflow-hidden">
            <img
              src={bankChurnImg}
              alt="Bank Customer Churn Predictor Streamlit Web App"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white font-mono text-[9px] flex items-center gap-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>Streamlit Live App</span>
            </div>
          </div>
        );

      case 'HR-Analytics-2026':
        return (
          <div className="relative w-full h-full bg-stone-950 overflow-hidden">
            <img
              src={hrAnalyticsImg}
              alt="HR Workforce Analytics Streamlit Dashboard"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white font-mono text-[9px] flex items-center gap-1.5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Streamlit Dashboard</span>
            </div>
          </div>
        );

      case 'lead-finder':
        return (
          <div className="relative w-full h-full bg-stone-950 overflow-hidden">
            <img
              src={leadFinderImg}
              alt="CQC Healthcare Provider Extraction Tool"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-white font-mono text-[9px] flex items-center gap-1.5 border border-white/10">
              <Terminal className="w-2.5 h-2.5 text-emerald-400" />
              <span>API Extraction Tool</span>
            </div>
          </div>
        );

      // Repositories that are developer utilities, CLI tools or scripts
      case 'filr':
        return (
          <div className="w-full h-full bg-[#131316] text-stone-200 flex flex-col font-mono text-[10px] select-none">
            <div className="bg-[#1e1e24] px-2.5 py-1.5 border-b border-stone-800 flex items-center justify-between text-[9px]">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <FolderTree className="w-3 h-3" />
                <span>filr_organizer.py</span>
              </div>
              <span className="bg-amber-950 text-amber-300 px-1.5 py-0.2 rounded border border-amber-800 text-[8px]">
                Python CLI
              </span>
            </div>
            <div className="p-3 flex-1 bg-[#0c0c0e] space-y-1.5 text-[9px] leading-relaxed">
              <div className="text-stone-500"># Automated directory indexing utility</div>
              <div className="text-amber-300">$ python filr.py --path ~/Downloads</div>
              <div className="text-stone-400">[INDEX] Scanning target directory...</div>
              <div className="text-emerald-400">✓ 48 Datasets (.csv, .json) organized</div>
              <div className="text-sky-400">✓ 56 Documents (.pdf, .docx) sorted</div>
              <div className="text-stone-500 pt-1 text-[8px]">Clean local file system automation</div>
            </div>
          </div>
        );

      case 'cardflip':
        return (
          <div className="w-full h-full bg-[#1c1917] text-stone-200 flex flex-col font-mono text-[10px] select-none">
            <div className="bg-[#292524] px-2.5 py-1.5 border-b border-stone-700 flex items-center justify-between text-[9px]">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Code2 className="w-3 h-3" />
                <span>cardflip_gui.py</span>
              </div>
              <span className="bg-stone-800 text-stone-300 px-1.5 py-0.2 rounded border border-stone-600 text-[8px]">
                Python Tkinter
              </span>
            </div>
            <div className="p-2.5 flex-1 flex flex-col justify-between items-center bg-[#141211]">
              <div className="flex justify-between w-full text-[9px] text-stone-400 px-1">
                <span>Score: 12 Moves</span>
                <span className="text-emerald-400">Time: 00:24</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 w-full max-w-[170px] my-1">
                <div className="aspect-square bg-amber-500/20 border border-amber-500/50 rounded flex items-center justify-center text-amber-300 font-bold text-xs">
                  ★
                </div>
                <div className="aspect-square bg-stone-800 border border-stone-700 rounded flex items-center justify-center text-stone-500 text-xs">
                  ?
                </div>
                <div className="aspect-square bg-amber-500/20 border border-amber-500/50 rounded flex items-center justify-center text-amber-300 font-bold text-xs">
                  ★
                </div>
                <div className="aspect-square bg-stone-800 border border-stone-700 rounded flex items-center justify-center text-stone-500 text-xs">
                  ?
                </div>
              </div>
              <div className="text-[8px] text-stone-500 text-center">
                Desktop memory matching game with Python Tkinter
              </div>
            </div>
          </div>
        );

      case 'Kolochain':
        return (
          <div className="w-full h-full bg-[#0d141e] text-stone-200 flex flex-col font-mono text-[10px] select-none">
            <div className="bg-[#142030] px-2.5 py-1.5 border-b border-blue-900/60 flex items-center justify-between text-[9px]">
              <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
                <Layers className="w-3 h-3" />
                <span>KoloVault.sol</span>
              </div>
              <span className="bg-blue-950 text-sky-300 px-1.5 py-0.2 rounded border border-blue-800 text-[8px]">
                Solidity 0.8.x
              </span>
            </div>
            <div className="p-3 flex-1 bg-[#080d14] space-y-1 text-[9px] leading-relaxed">
              <div className="text-stone-500">// Decentralized revolving savings contract</div>
              <div>
                <span className="text-sky-400">contract</span>{' '}
                <span className="text-amber-300">KoloVault</span> {'{'}
              </div>
              <div className="pl-2 text-stone-400">
                <span className="text-sky-400">mapping</span>(address &rarr; uint256) public balances;
              </div>
              <div className="pl-2 text-stone-400">
                <span className="text-purple-400">function</span> deposit() external payable;
              </div>
              <div>{'}'}</div>
            </div>
          </div>
        );

      case 'gads-2020-pratice-project':
      case 'Cloud-challenge':
      default:
        return (
          <div className="w-full h-full bg-[#0e1117] text-stone-200 flex flex-col font-mono text-[10px] select-none">
            <div className="bg-[#181d26] px-2.5 py-1.5 border-b border-stone-800 flex items-center justify-between text-[9px]">
              <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                <Terminal className="w-3 h-3" />
                <span>cloud_setup.sh</span>
              </div>
              <span className="bg-indigo-950 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-800 text-[8px]">
                Google Cloud
              </span>
            </div>
            <div className="p-3 flex-1 bg-[#080a0e] space-y-1.5 text-[9px] leading-relaxed">
              <div className="text-stone-500"># Cloud environment configuration</div>
              <div className="text-indigo-300">$ gcloud compute instances create lab-node</div>
              <div className="text-stone-400">[GCP] Provisioning Compute Engine instance</div>
              <div className="text-emerald-400">[READY] Jupyter Notebook server connected</div>
            </div>
          </div>
        );
    }
  };

  const getRepoUrl = () => {
    return repo.homepage || repo.html_url;
  };

  const hasLiveSite = Boolean(repo.homepage);

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden border border-stone-200 shadow-2xs bg-stone-900 group select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top simulated toolbar */}
      <div className="bg-stone-950 px-2.5 py-1 border-b border-stone-800 flex items-center justify-between text-[10px] font-mono text-stone-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block" />
          <span className="text-stone-400 text-[9px] ml-1 truncate max-w-[140px]">
            {repo.homepage ? new URL(repo.homepage).hostname : `github.com/kikibillz/${repo.name}`}
          </span>
        </div>
        {hasLiveSite && (
          <div className="flex items-center gap-1 text-[9px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Site</span>
          </div>
        )}
      </div>

      {/* Main visual frame with animated hover scale */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
        <motion.div
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full h-full"
        >
          {renderRepoVisual()}
        </motion.div>

        {/* Hover overlay with action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-stone-950/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 gap-2 text-center pointer-events-none group-hover:pointer-events-auto"
        >
          <motion.div
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 6, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-0.5 max-w-xs"
          >
            <div className="text-white font-bold text-xs font-mono tracking-tight truncate">
              {repo.displayName}
            </div>
            <p className="text-[10px] text-stone-300 line-clamp-2 leading-relaxed">
              {repo.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="flex items-center gap-2 pt-1"
          >
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-semibold font-mono px-3 py-1.5 rounded shadow-xs transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Visit Site</span>
              </a>
            )}

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-white text-stone-950 hover:bg-stone-200 text-[10px] font-semibold font-mono px-3 py-1.5 rounded shadow-xs transition-colors cursor-pointer"
            >
              <Github className="w-3 h-3" />
              <span>GitHub Repo</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Subtle hover cue */}
        <div className="absolute bottom-1.5 right-1.5 pointer-events-none group-hover:opacity-0 transition-opacity">
          <span className="text-[8px] font-mono bg-stone-950/80 text-stone-400 px-1.5 py-0.5 rounded border border-stone-800">
            {hasLiveSite ? 'Live Website' : 'View Code'}
          </span>
        </div>
      </div>
    </div>
  );
};

