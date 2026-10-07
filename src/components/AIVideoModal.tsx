import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { AIVideoProject } from '../types';

interface AIVideoModalProps {
  video: AIVideoProject | null;
  onClose: () => void;
}

export const AIVideoModal: React.FC<AIVideoModalProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState<'prompt' | 'workflow' | 'highlights'>('prompt');
  const [videoLoadError, setVideoLoadError] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  // Reset state when active video changes
  useEffect(() => {
    setVideoLoadError(false);
    setCurrentTime(0);
    setIsPlaying(true);
  }, [video?.id]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const isVertical = video.aspectRatio === '9:16';

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTo;
      setCurrentTime(seekTo);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleFullscreen = () => {
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        playerContainerRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-[#fafaf9] rounded-2xl border border-stone-300 shadow-2xl max-w-5xl w-full overflow-hidden text-stone-900 font-sans my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-200/90 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {video.category}
                </span>
                <span className="text-xs font-mono text-stone-500">
                  {video.aspectRatio} • {video.duration}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-950 tracking-tight mt-0.5">
                {video.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-video-modal-btn"
            className="p-2 text-stone-500 hover:text-stone-950 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content (Split Grid) */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-grow">
          {/* Left Column: Video Screen / Player Container */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              ref={playerContainerRef}
              className={`w-full max-w-[360px] sm:max-w-[400px] rounded-xl overflow-hidden bg-black border border-stone-800 shadow-xl relative flex flex-col justify-between ${
                isVertical ? 'aspect-[9/16]' : 'aspect-[16/9]'
              }`}
            >
              {/* Native Video Player Canvas */}
              <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden group">
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  poster={video.posterUrl}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  onTimeUpdate={() => {
                    if (videoRef.current) {
                      setCurrentTime(videoRef.current.currentTime);
                    }
                  }}
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      setDuration(videoRef.current.duration);
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={() => setVideoLoadError(true)}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={handleTogglePlay}
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isPlaying ? 'Playing HD' : 'Paused'}</span>
                  </span>
                </div>
              </div>

              {/* Player Bottom Control Bar */}
              <div className="bg-stone-950/95 backdrop-blur-md p-3 border-t border-stone-800/80 space-y-2 z-10">
                {/* Seek Scrubber */}
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 10}
                    step="0.05"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-stone-800 accent-emerald-500 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-stone-300">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="p-1 rounded hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleReplay}
                      className="p-1 rounded hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                      title="Replay from start"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleMute}
                      className="p-1 rounded hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <span className="font-mono text-[11px] text-stone-400">
                      {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : video.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleFullscreen}
                      title="Fullscreen"
                      className="p-1 rounded hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Case Study, Prompt & Technical Pipeline Specs */}
          <div className="lg:col-span-6 space-y-5">
            {/* Tagline & Core Summary */}
            <div className="bg-white border border-stone-200 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                Creative Overview
              </h3>
              <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-normal">
                {video.description}
              </p>

              {/* Tools Badges */}
              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-mono text-stone-500 mr-1">Tools:</span>
                {video.tools.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded bg-stone-100 text-stone-900 border border-stone-200"
                  >
                    <Cpu className="w-3 h-3 text-emerald-700" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Tabbed Technical Deep-Dive */}
            <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-stone-200 bg-stone-50 text-xs font-mono font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab('prompt')}
                  className={`flex-1 py-2.5 px-3 border-b-2 text-center transition-colors ${
                    activeTab === 'prompt'
                      ? 'border-emerald-600 text-emerald-900 bg-white font-bold'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Prompt Engineering
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('workflow')}
                  className={`flex-1 py-2.5 px-3 border-b-2 text-center transition-colors ${
                    activeTab === 'workflow'
                      ? 'border-emerald-600 text-emerald-900 bg-white font-bold'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Physics &amp; Motion
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('highlights')}
                  className={`flex-1 py-2.5 px-3 border-b-2 text-center transition-colors ${
                    activeTab === 'highlights'
                      ? 'border-emerald-600 text-emerald-900 bg-white font-bold'
                      : 'border-transparent text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Key Highlights
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-5 space-y-4">
                {activeTab === 'prompt' && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-semibold text-stone-700">
                          Direct Generation Prompt:
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Creative sample
                        </span>
                      </div>
                      <div className="bg-stone-900 text-stone-200 font-mono text-xs p-3.5 rounded-lg leading-relaxed border border-stone-800 select-all">
                        &quot;{video.generationWorkflow.promptEngineering}&quot;
                      </div>
                    </div>

                    {video.generationWorkflow.audioVoiceover && (
                      <div className="pt-2">
                        <span className="text-xs font-mono font-semibold text-stone-700 block mb-1">
                          Audio &amp; Voiceover Script:
                        </span>
                        <p className="text-xs sm:text-sm text-stone-700 italic bg-stone-50 border border-stone-200 p-3 rounded-lg leading-relaxed">
                          &ldquo;{video.generationWorkflow.audioVoiceover}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'workflow' && (
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-mono font-semibold text-stone-700 block mb-1">
                        Motion Dynamics &amp; Camera Control:
                      </span>
                      <p className="text-xs sm:text-sm text-stone-700 bg-stone-50 border border-stone-200 p-3.5 rounded-lg leading-relaxed">
                        {video.generationWorkflow.motionDynamics}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                      <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
                        <span className="text-stone-500 block text-[10px]">Pipeline</span>
                        <span className="font-semibold text-stone-900">
                          {video.generationWorkflow.pipeline}
                        </span>
                      </div>
                      <div className="p-2.5 bg-stone-50 border border-stone-200 rounded">
                        <span className="text-stone-500 block text-[10px]">Aspect Ratio</span>
                        <span className="font-semibold text-stone-900">
                          {video.aspectRatio} (Vertical Reel)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'highlights' && (
                  <div className="space-y-2.5">
                    <span className="text-xs font-mono font-semibold text-stone-700 block mb-1">
                      Creative workflow &amp; visual details:
                    </span>
                    <ul className="space-y-2">
                      {video.keyVisualHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 font-mono">
          <div>Built by {video.tools.join(' • ')}</div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-md font-sans text-xs font-medium transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
