import { Project } from '../types';
export function demoUrl(project: Project): string | null {
  for (const candidate of [project.streamlitUrl, project.streamlitDeployment, project.links.demo]) {
    try { const url = new URL(candidate || ''); if (url.protocol === 'https:' && url.hostname !== 'github.com') return url.href; } catch { /* Local anchors and missing links are not deployments. */ }
  }
  return null;
}
export function sourceLabel(url: string): string {
  try { return new URL(url).pathname.split('/').filter(Boolean).length < 2 ? 'GitHub profile' : 'Source repository'; } catch { return 'Project source'; }
}
