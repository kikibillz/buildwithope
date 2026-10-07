import React, { useEffect, useRef } from 'react';
import { Project } from '../types';
import { demoUrl } from '../utils/projectLinks';
import { ProjectDemoScreenshotPreview } from './ProjectDemoScreenshotPreview';
export const LiveStreamlitModal: React.FC<{ project: Project | null; isOpen: boolean; onClose: () => void; onUpdateStreamlitUrl?: (projectId: string, newUrl: string) => void }> = ({ project, isOpen, onClose }) => {
 const close = useRef<HTMLButtonElement>(null);
 useEffect(()=>{ if(!isOpen) return; const previous=document.activeElement as HTMLElement|null; close.current?.focus(); const key=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();}; window.addEventListener('keydown',key); return ()=>{window.removeEventListener('keydown',key);previous?.focus();};},[isOpen,onClose]);
 if(!project || !isOpen) return null; const url=demoUrl(project);
 return <div className="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center" onClick={onClose}><div role="dialog" aria-modal="true" aria-labelledby="deployment-title" className="bg-card max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto" onClick={e=>e.stopPropagation()}><div className="flex justify-between gap-4 mb-4"><h2 id="deployment-title" className="font-bold text-xl">{project.title}</h2><button ref={close} onClick={onClose} className="underline">Close</button></div><ProjectDemoScreenshotPreview project={project}/>{url ? <a className="block underline mt-4" href={url} target="_blank" rel="noopener noreferrer">Open external deployment</a> : <p className="mt-4">No standalone deployment linked. <a className="underline" href={project.links.github} target="_blank" rel="noopener noreferrer">Inspect the source link</a>.</p>}<p className="mt-3 text-xs text-muted-foreground">External deployment availability and outputs are not verified by this preview.</p></div></div>;
};
