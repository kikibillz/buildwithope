import React from 'react';
import { Project } from '../types';
import { demoUrl, sourceLabel } from '../utils/projectLinks';
import { ProjectDemoScreenshotPreview } from './ProjectDemoScreenshotPreview';
interface ProjectCardProps { project: Project; index?: number; onOpenCaseStudy: (project: Project) => void; onOpenStreamlit?: (project: Project) => void; className?: string; }
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenCaseStudy, onOpenStreamlit, className = '' }) => {
 const deployment = demoUrl(project);
 return <article className={`border-2 border-foreground/20 bg-card rounded-sm overflow-hidden flex flex-col ${className}`}>
  <ProjectDemoScreenshotPreview project={project} />
  <div className="p-5 flex flex-col gap-4 flex-1"><p className="font-mono text-xs text-primary uppercase">{project.category} · Portfolio project</p><h3 className="font-bold text-xl">{project.title}</h3><p className="text-sm text-muted-foreground">{project.description}</p>
  <div className="flex flex-wrap gap-2">{project.tools.map(tool => <span key={tool} className="text-xs border px-2 py-1">{tool}</span>)}</div>
  <div className="flex flex-wrap gap-4 mt-auto text-sm font-semibold"><button type="button" className="underline" onClick={() => onOpenCaseStudy(project)}>Read case study</button><a href={project.links.github} target="_blank" rel="noopener noreferrer" className="underline">{sourceLabel(project.links.github)}</a>
  {project.links.demo.startsWith('#hr-lab-') ? <a href={project.links.demo} className="underline">Try working tool</a> : null}
  {deployment ? <a href={deployment} target="_blank" rel="noopener noreferrer" className="underline">External demo · unverified</a> : null}
  {project.id === 'enterprise-rag-prompt-engine' && onOpenStreamlit ? <button type="button" className="underline" onClick={() => onOpenStreamlit(project)}>Try portfolio FAQ</button> : null}</div></div>
 </article>;
};
