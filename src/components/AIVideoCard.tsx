import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Clock, Film, ArrowUpRight } from 'lucide-react';
import { AIVideoProject } from '../types';

interface AIVideoCardProps {
  video: AIVideoProject;
  onSelect: (video: AIVideoProject) => void;
}

export const AIVideoCard: React.FC<AIVideoCardProps> = ({ video, onSelect }) => {
  const isVertical = video.aspectRatio === '9:16';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }}
      transition={{ duration: 0.2 }}
      className="group bg-white/95 dark:bg-[#1a1714] border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/50 dark:hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-2xs hover:shadow-[0_10px_35px_rgba(234,88,12,0.12)] transition-all duration-300 flex flex-col justify-between break-inside-avoid print-break-avoid"
    >
      {/* Media Video / Poster Container */}
      <div
        onClick={() => onSelect(video)}
        data-cursor-text="PLAY"
        className="relative overflow-hidden cursor-pointer bg-stone-950 block group/media"
      >
        <div
          className={`w-full overflow-hidden ${
            isVertical ? 'aspect-[4/5] sm:aspect-[3/4]' : 'aspect-[16/10]'
          }`}
        >
          {video.videoUrl && !videoError ? (
            <video
              ref={videoRef}
              src={video.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover object-center group-hover/media:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <img
              src={video.posterUrl}
              alt={video.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover/media:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover/media:opacity-100"
            />
          )}
        </div>

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-stone-900/85 backdrop-blur-md text-stone-200 border border-white/10 shadow-xs">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>{video.aspectRatio}</span>
          </span>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-amber-950/90 text-amber-200 border border-amber-500/40 print:hidden">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
              <span>Playing</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-black/75 backdrop-blur-md text-white">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{video.duration}</span>
            </span>
          </div>
        </div>

        {/* Center Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none print:hidden">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:from-amber-500 group-hover:to-orange-500 transition-colors transform group-hover:scale-110 duration-200"
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </motion.div>
        </div>

        {/* Pipeline Tag on Thumbnail Bottom */}
        <div className="absolute bottom-3 left-3 right-3 pointer-events-none flex items-center justify-between text-xs text-stone-300">
          <span className="font-mono text-[11px] text-amber-300 bg-[#1c1815]/90 backdrop-blur-md px-2 py-0.5 rounded border border-amber-500/40">
            {video.generationWorkflow.pipeline}
          </span>
          <span className="text-[11px] font-mono text-stone-300 truncate max-w-[150px]">
            {video.tools[0]}
          </span>
        </div>
      </div>

      {/* Card Body & Details */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-amber-900 dark:text-amber-200 bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded">
              {video.category}
            </span>
          </div>

          <h3
            onClick={() => onSelect(video)}
            data-cursor-text="PLAY"
            className="text-base sm:text-lg font-display font-bold text-stone-950 dark:text-stone-100 tracking-tight hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors leading-snug"
          >
            {video.title}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed font-normal">
            {video.tagline}
          </p>
        </div>

        {/* Tool badges & CTA */}
        <div className="pt-2 border-t border-amber-900/10 dark:border-amber-500/15">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {video.tools.map((tool) => (
              <span
                key={tool}
                className="text-[10px] font-mono px-2 py-0.5 bg-[#fdfbf7] dark:bg-[#201c18] text-stone-700 dark:text-stone-300 rounded border border-amber-900/10 dark:border-amber-500/15"
              >
                {tool}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onSelect(video)}
            id={`btn-view-video-${video.id}`}
            data-cursor-text="WATCH"
            className="w-full inline-flex items-center justify-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-stone-900 dark:text-stone-100 hover:text-white dark:hover:text-stone-950 bg-amber-500/10 dark:bg-amber-500/15 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600 dark:hover:bg-amber-400 border border-amber-500/20 hover:border-amber-600 py-2.5 px-4 rounded-full transition-all duration-300 shadow-2xs hover:scale-102 active:scale-98 group/btn cursor-pointer print:hidden"
          >
            <Play className="w-3.5 h-3.5 fill-current text-amber-600 group-hover/btn:text-white" />
            <span>Watch Reel &amp; Breakdown</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover/btn:text-white dark:group-hover/btn:text-stone-950 transition-colors ml-auto" />
          </button>

          {/* Print-only pipeline metadata */}
          <div className="hidden print:block text-[11px] font-mono text-stone-700 pt-2 border-t border-stone-300 space-y-0.5">
            <div><strong>Spec:</strong> {video.aspectRatio} • {video.duration} runtime</div>
            <div><strong>Workflow:</strong> {video.generationWorkflow.pipeline}</div>
            <div><strong>Narration:</strong> {video.generationWorkflow.audio}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
