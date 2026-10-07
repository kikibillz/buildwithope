import React from 'react';
import { Project } from '../types';
import { demoUrl } from '../utils/projectLinks';
import { ProjectDemoScreenshotPreview } from './ProjectDemoScreenshotPreview';
export const ProjectDemoSection: React.FC<{ project: Project; onOpenStreamlit?: (project: Project) => void; onOpenCaseStudy?: (project: Project) => void }> = ({ project, onOpenCaseStudy }) => {
 const url = demoUrl(project);
 return <div className="space-y-3"><ProjectDemoScreenshotPreview project={project} /><div className="flex flex-wrap gap-4 text-sm">{url ? <a href={url} target="_blank" rel="noopener noreferrer" className="underline">Open deployment in a new tab</a> : <p className="text-muted-foreground">No standalone deployment linked. See the source and case study.</p>}{onOpenCaseStudy ? <button className="underline" type="button" onClick={() => onOpenCaseStudy(project)}>Read case study</button> : null}</div></div>;
};
