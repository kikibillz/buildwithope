import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  MoveHorizontal,
  ArrowRight,
  Github,
  ExternalLink,
  Sparkles,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import { Project } from '../types';
import { demoUrl, sourceLabel } from '../utils/projectLinks';
import { ProjectDemoScreenshotPreview } from './ProjectDemoScreenshotPreview';

interface SelectedWorkSwipeableProps {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
  onOpenStreamlit: (project: Project) => void;
}

export const SelectedWorkSwipeable: React.FC<SelectedWorkSwipeableProps> = ({
  projects,
  onOpenCaseStudy,
  onOpenStreamlit,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAutoGliding, setIsAutoGliding] = useState<boolean>(false);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(1);

  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const scrollLeftPos = useRef<number>(0);
  const isHovered = useRef<boolean>(false);

  const updateScrollStatus = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      setActiveSlideIndex(1);
      return;
    }
    const current = el.scrollLeft;
    setCanScrollLeft(current > 10);
    setCanScrollRight(current < maxScroll - 10);
    const progress = Math.min(100, Math.max(0, (current / maxScroll) * 100));
    setScrollProgress(progress);

    // Approximate active slide index
    if (projects.length > 0) {
      const cardWidth = el.scrollWidth / projects.length;
      const idx = Math.min(projects.length, Math.max(1, Math.round(current / cardWidth) + 1));
      setActiveSlideIndex(idx);
    }
  }, [projects.length]);

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
  }, [updateScrollStatus, projects]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

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
    if (!isAutoGliding) return;
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
  }, [isAutoGliding]);

  return (
    <div className="w-full mt-6">
      {/* Control bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-3 bg-muted/60 border-2 border-foreground/15 rounded-xs font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-bold uppercase text-foreground">
            <MoveHorizontal className="w-4 h-4 text-primary animate-pulse" />
            <span>Interactive Swipeable Showcase</span>
          </span>
          <span className="text-muted-foreground hidden sm:inline">
            · Slide {activeSlideIndex} of {projects.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-glide toggle */}
          <button
            type="button"
            onClick={() => setIsAutoGliding(!isAutoGliding)}
            title={isAutoGliding ? 'Pause auto glide' : 'Start smooth auto glide'}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xs border text-[11px] font-bold uppercase transition-colors cursor-pointer ${
              isAutoGliding
                ? 'bg-primary text-primary-foreground border-foreground shadow-2xs'
                : 'bg-card text-foreground border-foreground/30 hover:border-foreground'
            }`}
          >
            {isAutoGliding ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isAutoGliding ? 'Auto-Gliding' : 'Auto Glide'}</span>
          </button>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous project"
            className="p-1.5 rounded-xs border-2 border-foreground bg-card text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-brutal-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next project"
            className="p-1.5 rounded-xs border-2 border-foreground bg-card text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-brutal-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1 bg-foreground/15 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${Math.max(6, scrollProgress)}%` }}
        />
      </div>

      {/* Horizontal Swipeable Track */}
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
        className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 scrollbar-none select-none cursor-grab active:cursor-grabbing w-full"
        style={{ scrollBehavior: isDragging.current ? 'auto' : 'smooth' }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="w-[88vw] sm:w-[520px] lg:w-[600px] shrink-0 snap-start bg-card text-foreground border-2 border-foreground rounded-xs overflow-hidden flex flex-col justify-between shadow-brutal hover:shadow-brutal-lg transition-all group"
          >
            <div>
              {/* Card Top Banner: Category and Index */}
              <div className="p-4 sm:p-5 pb-3 border-b-2 border-foreground/15 bg-muted/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-black text-primary">
                    /{String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-muted text-foreground border border-foreground/30">
                    {project.category.split('&')[0].trim()}
                  </span>
                  {project.badge && (
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-highlight text-highlight-foreground border border-foreground">
                      {project.badge}
                    </span>
                  )}
                </div>

                {demoUrl(project) && (
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded-xs">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                    External demo · unverified
                  </span>
                )}
              </div>

              {/* Screenshot / Live Embed preview */}
              <div className="border-b-2 border-foreground/15">
                <ProjectDemoScreenshotPreview
                  project={project}
                  onOpenCaseStudy={() => onOpenCaseStudy(project)}
                  onOpenLiveDemo={() => {
                    if (project.streamlitDeployment) {
                      onOpenStreamlit(project);
                    } else if (project.links.demo) {
                      window.open(project.links.demo, '_blank');
                    }
                  }}
                />
              </div>

              {/* Title & Tagline */}
              <div className="p-5 sm:p-6 pb-3">
                <h3 className="font-display font-extrabold text-lg sm:text-2xl uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-foreground/80 font-sans leading-relaxed line-clamp-3">
                  {project.tagline}
                </p>

                {/* Key Metrics Grid */}
                {project.keyMetrics && project.keyMetrics.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-foreground/15">
                    {project.keyMetrics.slice(0, 2).map((metric) => (
                      <div
                        key={metric.label}
                        className="p-2 rounded-xs bg-muted/60 border border-foreground/20"
                      >
                        <span className="block font-mono text-[10px] uppercase text-muted-foreground font-semibold truncate">
                          {metric.label}
                        </span>
                        <span className="block font-mono text-xs sm:text-sm font-black text-foreground mt-0.5">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tools and Action Footer */}
            <div className="p-5 sm:p-6 pt-0">
              <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-foreground/15">
                {project.tools.slice(0, 5).map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-[11px] px-2 py-0.5 bg-muted rounded-xs text-foreground/80 border border-foreground/20 font-semibold"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t-2 border-foreground/15">
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(project)}
                  className="inline-flex items-center gap-1.5 bg-foreground text-background px-4 py-2 rounded-xs font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm hover:shadow-brutal hover:bg-foreground/90 transition-all cursor-pointer"
                >
                  <span>Case Study</span>
                  <ArrowRight className="size-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.links.demo.startsWith('#hr-lab-') ? <a href={project.links.demo} className="underline text-sm font-bold">Try working tool</a> : null}
                  {demoUrl(project) && (
                    <button
                      type="button"
                      onClick={() => onOpenStreamlit(project)}
                      className="inline-flex items-center gap-1 px-3 py-2 border-2 border-foreground bg-primary text-primary-foreground rounded-xs font-mono text-xs font-bold uppercase shadow-brutal-sm hover:shadow-brutal transition-all cursor-pointer"
                      title="External demo; availability has not been verified"
                    >
                      <Play className="size-3.5 fill-current" />
                      <span>External demo</span>
                    </button>
                  )}

                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 border-2 border-foreground rounded-xs bg-card hover:bg-muted text-foreground transition-all shadow-brutal-sm hover:shadow-brutal"
                    title={sourceLabel(project.links.github)}
                  >
                    <Github className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
