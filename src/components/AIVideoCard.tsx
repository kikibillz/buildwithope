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
      whileHover={{ y: -3 }}
      onMouseEnter={() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }}
      transition={{ duration: 0.2 }}
      className="group bg-card text-foreground border-2 border-foreground rounded-xs overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col justify-between break-inside-avoid print-break-avoid"
    >
      {/* Media Video / Poster Container */}
      <div
        onClick={() => onSelect(video)}
        data-cursor-text="PLAY"
        className="relative overflow-hidden cursor-pointer bg-foreground block group/media border-b-2 border-foreground"
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
              className="w-full h-full object-cover object-center group-hover/media:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <img
              src={video.posterUrl}
              alt={video.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover/media:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover/media:opacity-100"
            />
          )}
        </div>

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-[11px] font-mono font-bold bg-background text-foreground border border-foreground shadow-brutal-sm">
            <Film className="w-3.5 h-3.5 text-primary" />
            <span>{video.aspectRatio}</span>
          </span>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-mono font-bold bg-status text-status-foreground border border-foreground shadow-brutal-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-status-foreground animate-pulse" />
              <span>Playing</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs text-[11px] font-mono font-bold bg-background text-foreground border border-foreground">
              <Clock className="w-3 h-3 text-foreground/70" />
              <span>{video.duration}</span>
            </span>
          </div>
        </div>

        {/* Center Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none print:hidden">
          <div className="size-12 rounded-full bg-accent text-accent-foreground border-2 border-foreground flex items-center justify-center shadow-brutal group-hover:scale-110 transition-transform duration-150">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Pipeline Tag on Thumbnail Bottom */}
        <div className="absolute bottom-3 left-3 right-3 pointer-events-none flex items-center justify-between text-xs text-background font-mono font-bold">
          <span className="text-[11px] bg-foreground px-2 py-0.5 border border-background/30 rounded-xs text-secondary">
            {video.generationWorkflow.pipeline}
          </span>
          <span className="text-[11px] text-background/80 truncate max-w-[150px]">
            {video.tools[0]}
          </span>
        </div>
      </div>

      {/* Card Body & Details */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest font-black text-foreground bg-project-two px-2 py-0.5 rounded-xs border border-foreground">
              {video.category}
            </span>
          </div>

          <h3
            onClick={() => onSelect(video)}
            data-cursor-text="PLAY"
            className="text-base sm:text-lg font-display font-black text-foreground tracking-tight hover:text-primary cursor-pointer transition-colors leading-snug"
          >
            {video.title}
          </h3>

          <p className="text-xs sm:text-sm text-foreground/80 line-clamp-2 leading-relaxed font-sans">
            {video.tagline}
          </p>
        </div>

        {/* Tool badges & CTA */}
        <div className="pt-3 border-t-2 border-foreground/15">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {video.tools.map((tool) => (
              <span
                key={tool}
                className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-muted text-foreground rounded-xs border border-foreground/30"
              >
                {tool}
              </span>
            ))}
          </div>

          <button
            onClick={() => onSelect(video)}
            data-cursor-text="WATCH"
            className="w-full brutal-btn flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-mono font-bold uppercase tracking-wider py-2 rounded-xs cursor-pointer"
          >
            <span>Watch Commercial</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
