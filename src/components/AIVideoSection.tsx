import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Film,
  Sparkles,
  Video,
  Tv,
} from 'lucide-react';
import { aiVideoProjects } from '../data/videoData';
import { AIVideoProject } from '../types';
import { AIVideoCard } from './AIVideoCard';

interface AIVideoSectionProps {
  onSelectVideo: (video: AIVideoProject) => void;
}

export const AIVideoSection: React.FC<AIVideoSectionProps> = ({ onSelectVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Commercial & Ads', 'Product Showcase'];

  const filteredVideos = useMemo(() => {
    return aiVideoProjects.filter((video) => {
      return selectedCategory === 'All' || video.category === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <section
      id="ai-videos"
      className="py-20 sm:py-28 lg:py-32 border-b border-amber-900/10 dark:border-amber-500/15 bg-[#f6f2ea] dark:bg-[#181512] transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-amber-900 dark:text-amber-200 bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Generative Video Production</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-stone-950 dark:text-stone-100">
              AI Video &amp; Generative Media
            </h2>
            <p className="mt-2 text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              Commercial advertising reels, high-fidelity beauty macro cinematography, and architectural property tours with synchronized voiceover narration engineered with Runway Gen-3 Alpha, Luma Dream Machine, and ElevenLabs.
            </p>
          </div>

          {/* Stat Badges */}
          <div className="flex items-center gap-4 text-xs font-mono text-stone-600 dark:text-stone-300 border border-amber-900/15 dark:border-amber-500/20 bg-white/95 dark:bg-[#1a1714] p-3.5 rounded-2xl shadow-2xs self-start md:self-auto">
            <div>
              <span className="block text-lg font-bold text-stone-900 dark:text-stone-100 font-sans">
                {aiVideoProjects.length}
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">Commercial Reels</span>
            </div>
            <div className="h-8 w-px bg-amber-900/10 dark:bg-amber-500/20" />
            <div>
              <span className="block text-lg font-bold text-amber-600 dark:text-amber-400 font-sans">9:16</span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">Social HD Masters</span>
            </div>
            <div className="h-8 w-px bg-amber-900/10 dark:bg-amber-500/20" />
            <div>
              <span className="block text-lg font-bold text-stone-900 dark:text-stone-100 font-sans">VO &amp; SFX</span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">ElevenLabs Audio</span>
            </div>
          </div>
        </motion.div>

        {/* Filters Bar (hidden on print) */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-amber-900/10 dark:border-amber-500/15 print:hidden">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                data-cursor-text={cat === 'All' ? 'ALL' : 'FILTER'}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold shadow-xs'
                    : 'bg-amber-500/10 dark:bg-[#1a1714] hover:bg-amber-500/20 text-stone-700 dark:text-stone-300 border border-amber-500/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
            Showing {filteredVideos.length} of {aiVideoProjects.length} reels
          </span>
        </div>

        {/* Video Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <AnimatePresence>
            {filteredVideos.map((video) => (
              <AIVideoCard
                key={video.id}
                video={video}
                onSelect={onSelectVideo}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state if filter doesn't match */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16 bg-white/95 dark:bg-[#1a1714] rounded-xl border border-amber-900/10 dark:border-amber-500/20 p-8 space-y-3">
            <Video className="w-8 h-8 text-amber-500/60 mx-auto" />
            <p className="text-stone-700 dark:text-stone-300 font-medium">No videos found for this filter.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs font-mono text-amber-800 dark:text-amber-300 hover:underline cursor-pointer"
            >
              Show all reels
            </button>
          </div>
        )}

        {/* Production Philosophy Banner */}
        <div className="mt-14 bg-white/95 dark:bg-[#1a1714] border border-amber-900/10 dark:border-amber-500/20 rounded-xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xs">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-stone-900 dark:text-stone-100 uppercase">
              <Film className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Cinematographic Directing</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Applying formal lens theory, focal length choices, lighting ratios, and deliberate camera trajectories to bypass generic AI artifacts.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-stone-900 dark:text-stone-100 uppercase">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Macro &amp; Fluid Dynamics</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Subsurface light scattering on human skin, fluid droplet viscosity, and architectural perspective stabilization.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-stone-900 dark:text-stone-100 uppercase">
              <Tv className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Voiceover &amp; Foley Audio</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Integrating natural speech rhythms via ElevenLabs with tactile ASMR sound effects, ambient scoring, and commercial pacing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
