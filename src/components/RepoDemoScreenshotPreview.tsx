import React from 'react';
import { GitHubRepo } from '../types';
export const RepoDemoScreenshotPreview: React.FC<{ repo: GitHubRepo }> = ({ repo }) => <div className="bg-slate-950 text-slate-100 min-h-48 p-6"><p className="text-xs text-teal-300 font-mono uppercase">Repository overview</p><h3 className="text-xl font-bold mt-4">{repo.displayName}</h3><p className="text-sm text-slate-300 mt-3">{repo.description}</p><p className="text-xs text-slate-400 mt-4">See the repository for implementation details. This card is not a running application.</p></div>;
