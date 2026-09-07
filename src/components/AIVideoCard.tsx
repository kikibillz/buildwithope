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
      className="group bg-white border border-stone-200/90 hover:border-emerald-500/60 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      {/* Media Video / Poster Container */}
      <div
        onClick={() => onSelect(video)}
        className="relative overflow-hidden cursor-pointer bg-stone-950 block"
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
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <img
              src={video.posterUrl}
              alt={video.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
          )}
        </div>

        {/* Ambient Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-stone-900/85 backdrop-blur-md text-stone-200 border border-white/10 shadow-xs">
            <Film className="w-3 h-3 text-emerald-400" />
            <span>{video.aspectRatio}</span>
          </span>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-900/90 text-emerald-200 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Playing</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-black/75 backdrop-blur-md text-white">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{video.duration}</span>
            </span>
          </div>
        </div>

        {/* Center Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-12 h-12 rounded-full bg-emerald-600/95 text-white flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-emerald-500 transition-colors transform group-hover:scale-110 duration-200"
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </motion.div>
        </div>

        {/* Pipeline Tag on Thumbnail Bottom */}
        <div className="absolute bottom-3 left-3 right-3 pointer-events-none flex items-center justify-between text-xs text-stone-300">
          <span className="font-mono text-[11px] text-emerald-300 bg-emerald-950/70 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30">
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
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {video.category}
            </span>
          </div>

          <h3
            onClick={() => onSelect(video)}
            className="text-base sm:text-lg font-bold text-stone-950 tracking-tight hover:text-emerald-800 cursor-pointer transition-colors leading-snug"
          >
            {video.title}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed font-normal">
            {video.tagline}
          </p>
        </div>

        {/* Tool badges & CTA */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {video.tools.map((tool) => (
              <span
                key={tool}
                className="text-[10px] font-mono px-2 py-0.5 bg-stone-100 text-stone-700 rounded border border-stone-200"
              >
                {tool}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onSelect(video)}
            id={`btn-view-video-${video.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-white bg-stone-100 hover:bg-stone-900 border border-stone-200 hover:border-stone-900 py-2.5 px-3 rounded-md transition-all shadow-2xs group/btn"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Reel &amp; Breakdown</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 group-hover/btn:text-white transition-colors ml-auto" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
