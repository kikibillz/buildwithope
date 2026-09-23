import React from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, ArrowRight, Play, TrendingUp } from 'lucide-react';
import { Project } from '../types';
import { ProjectDemoSection } from './ProjectDemoSection';

interface ProjectCardProps {
  project: Project;
  index?: number;
  onOpenCaseStudy: (project: Project) => void;
  onOpenStreamlit?: (project: Project) => void;
  className?: string;
}

const tintStyles = [
  { badgeBg: 'bg-project-one text-foreground border-foreground', ribbon: 'bg-project-one/20 border-foreground text-foreground' },
  { badgeBg: 'bg-project-two text-foreground border-foreground', ribbon: 'bg-project-two/20 border-foreground text-foreground' },
  { badgeBg: 'bg-project-three text-foreground border-foreground', ribbon: 'bg-project-three/20 border-foreground text-foreground' },
];

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index = 0,
  onOpenCaseStudy,
  onOpenStreamlit,
  className,
}) => {
  const currentTint = tintStyles[index % 3];

  return (
    <motion.article
      id={`project-card-${project.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group bg-card border-2 border-foreground rounded-sm overflow-hidden shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col justify-between ${
        className || ''
      }`}
    >
      <div className="p-6 sm:p-8">
        {/* Top meta & Editorial Numbering */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className={`text-xs font-mono font-black tracking-wider px-2 py-0.5 border-2 border-foreground rounded-sm ${currentTint.badgeBg}`}>
              PROJ {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-xs font-mono font-bold text-foreground/70 uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.badge && (
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-sm border-2 border-foreground bg-muted text-foreground">
                {project.badge}
              </span>
            )}
          </div>
        </div>

        {/* Streamlit / ASGI Deployment Ribbon */}
        {project.streamlitDeployment && (
          <div className="mb-4 px-3.5 py-2 bg-foreground text-background rounded-sm flex flex-wrap items-center justify-between gap-2 text-xs font-mono border-2 border-foreground shadow-brutal-sm">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full inline-block animate-pulse ${
                  project.id === 'fastapi-ml-service' ? 'bg-secondary' : 'bg-primary'
                }`}
              />
              <span className="text-background/70 font-bold">
                {project.id === 'fastapi-ml-service' ? 'Deployment:' : 'Streamlit:'}
              </span>
              <span className="text-background font-bold">{project.streamlitDeployment}</span>
            </div>
            {onOpenStreamlit && project.id !== 'fastapi-ml-service' && (
              <button
                onClick={() => onOpenStreamlit(project)}
                id={`btn-ribbon-live-${project.id}`}
                data-cursor-text="LIVE"
                className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1 rounded-sm text-[11px] font-mono font-bold uppercase transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-primary-foreground"
              >
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Live Model View</span>
              </button>
            )}
          </div>
        )}

        {/* Title & Tagline */}
        <h3 className="text-xl sm:text-2xl font-display font-black tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-5 font-sans max-w-3xl">
          {project.description}
        </p>

        {/* Quantified Business Impact & Metric Chips */}
        {project.businessImpact && (
          <div className="mb-5 p-4 rounded-sm bg-muted border-2 border-foreground shadow-brutal-sm">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Quantified Business Impact &amp; ROI</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans mb-3">
              {project.businessImpact}
            </p>
            {project.keyMetrics && project.keyMetrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 border-t border-foreground/20">
                {project.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="bg-card p-2 rounded-sm border border-foreground/30">
                    <div className="text-[10px] font-mono text-foreground/60 uppercase tracking-tight font-bold">
                      {metric.label}
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-black text-primary mt-0.5 truncate">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Problem & Approach Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-muted/60 border-2 border-foreground/30 rounded-sm p-4 text-xs sm:text-sm">
          <div>
            <div className="text-foreground/70 font-mono text-xs uppercase mb-1 font-bold">Problem</div>
            <p className="text-foreground/90 leading-relaxed font-sans">{project.problemSummary}</p>
          </div>
          <div>
            <div className="text-foreground/70 font-mono text-xs uppercase mb-1 font-bold">Approach</div>
            <p className="text-foreground/90 leading-relaxed font-sans">{project.approachSummary}</p>
          </div>
        </div>

        {/* Live Demo Showcase with Screenshots & Interactive Tweaks (hidden on print) */}
        <div className="mb-6 print:hidden">
          <ProjectDemoSection
            project={project}
            onOpenStreamlit={onOpenStreamlit}
            onOpenCaseStudy={onOpenCaseStudy}
          />
        </div>

        {/* Print-only Business Impact & Repository details */}
        <div className="hidden print:block my-3 p-3 bg-muted rounded-sm border border-foreground text-xs font-mono">
          <div className="text-foreground">
            <span className="font-bold">Business Impact:</span> {project.businessImpact}
          </div>
          <div className="mt-1.5 text-foreground/70">
            <span className="font-bold">Repository URL:</span> {project.links.github}
          </div>
        </div>

        {/* Tools and Result */}
        <div className="pt-4 border-t-2 border-foreground/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-foreground/70 uppercase mb-1.5 font-bold">Tools &amp; Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-xs bg-muted text-foreground px-2 py-0.5 rounded-sm border border-foreground font-semibold"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs font-mono text-foreground/70 uppercase mb-1 font-bold">Evaluation &amp; Result</div>
            <p className="text-xs text-foreground/90 font-sans italic">
              {project.resultsSummary}
            </p>
          </div>
        </div>

        {/* CTA Actions (hidden on print) */}
        <div className="mt-8 pt-5 border-t-2 border-foreground/20 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button
            onClick={() => onOpenCaseStudy(project)}
            id={`btn-case-study-${project.id}`}
            data-cursor-text="STUDY"
            className="brutal-btn inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-background bg-foreground px-4 py-2 cursor-pointer"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <div className="flex items-center gap-2.5">
            {project.streamlitDeployment && onOpenStreamlit && project.id !== 'fastapi-ml-service' && (
              <button
                onClick={() => onOpenStreamlit(project)}
                id={`btn-live-app-${project.id}`}
                data-cursor-text="DEMO"
                className="brutal-btn inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-primary-foreground bg-primary px-3.5 py-1.5 cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Live Streamlit</span>
              </button>
            )}

            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              id={`btn-github-${project.id}`}
              data-cursor-text="CODE"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-foreground bg-card border-2 border-foreground rounded-sm px-3.5 py-1.5 shadow-brutal-sm hover:shadow-brutal transition-all cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>

            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              id={`btn-demo-${project.id}`}
              data-cursor-text="VIEW"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-secondary-foreground bg-secondary border-2 border-foreground rounded-sm px-4 py-1.5 shadow-brutal-sm hover:shadow-brutal transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Explore Code</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
