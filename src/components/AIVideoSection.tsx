import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
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
    <section id="video" className="bg-foreground py-14 sm:py-20 lg:py-28 text-background transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Editorial Section Header */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[.55fr_1.45fr] lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-secondary">
              07 / Creative Media &amp; AI Direction
            </p>
            <h2 className="mt-3 sm:mt-4 font-display text-3xl xs:text-4xl sm:text-5xl lg:text-7xl uppercase leading-[.92]">
              Built with code.<br />
              <span className="text-accent">Directed by taste.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-background/65 lg:justify-self-end">
            AI-created commercial concepts and cinematic sequences. Explore my dedicated AI UGC Creator portfolio for product stories, creative services, and collaboration.
          </p>
        </div>

        <a href="/ugc/" className="mt-6 inline-flex items-center gap-3 border border-background/40 px-5 py-3 font-mono text-sm font-bold hover:bg-background/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
          Explore AI UGC Creator portfolio <span aria-hidden="true">↗</span>
        </a>

        {/* Featured Reel Banner */}
        <figure className="group relative mt-8 sm:mt-12 overflow-hidden border border-background/20 rounded-xs shadow-brutal">
          <img
            src="/images/video-hero-collage.jpg"
            onError={(e) => {
              // Fallback to first video poster if collage is not present
              e.currentTarget.src = aiVideoProjects[0]?.posterUrl || '';
            }}
            alt="Cinematic AI video commercial collage"
            width="1536"
            height="1024"
            className="aspect-[16/9] sm:aspect-[2.4/1] w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 bg-foreground/90 p-3.5 sm:p-6 backdrop-blur-md border-t border-background/20">
            <div>
              <b className="block text-base sm:text-lg font-bold text-background font-sans">
                AI Commercial Reel 2026
              </b>
              <span className="text-xs sm:text-sm text-background/60 font-mono">
                Commercials · Fashion · Luxury Media · 4K
              </span>
            </div>
            <button
              onClick={() => onSelectVideo(aiVideoProjects[0])}
              className="grid size-10 sm:size-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-brutal-sm hover:scale-105 active:scale-95 transition-transform cursor-pointer shrink-0"
              title="Play Featured Reel"
            >
              <Play className="size-4 sm:size-5 fill-current ml-0.5" />
            </button>
          </figcaption>
        </figure>

        {/* Category Filters Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-background/20">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xs text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-secondary text-secondary-foreground shadow-brutal-sm'
                    : 'text-background/70 hover:text-background border border-background/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="font-mono text-xs text-background/60">
            {filteredVideos.length} Commercial Showcase Projects
          </span>
        </div>

        {/* Video Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <AIVideoCard
              key={video.id}
              video={video}
              onSelect={onSelectVideo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

