import React, { useState } from 'react';
import {
  ExternalLink,
  RefreshCw,
  Maximize2,
  Lock,
  Globe,
  Radio,
  Sparkles,
} from 'lucide-react';

interface LiveWebEmbedPreviewProps {
  url: string;
  title: string;
  domain?: string;
  projectId?: string;
  onExpand?: () => void;
  heightClass?: string;
  compact?: boolean;
}

export const LiveWebEmbedPreview: React.FC<LiveWebEmbedPreviewProps> = ({
  url,
  title,
  domain,
  projectId,
  onExpand,
  heightClass = 'h-80 sm:h-96 md:h-[420px]',
  compact = false,
}) => {
  const [reloadKey, setReloadKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const displayDomain =
    domain ||
    (() => {
      try {
        return new URL(url).hostname;
      } catch {
        return url;
      }
    })();

  const handleReload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setHasError(false);
    setReloadKey((prev) => prev + 1);
  };

  const handleOpenExternal = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`w-full bg-stone-900 border border-stone-800 rounded-lg overflow-hidden flex flex-col shadow-inner ${
        compact ? 'h-52 sm:h-60' : heightClass
      }`}
    >
      {/* Browser Chrome Header */}
      <div className="bg-stone-950 px-3 py-2 border-b border-stone-800 flex items-center justify-between gap-2 text-xs font-mono text-stone-300 select-none shrink-0">
        {/* Window controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-auto flex items-center justify-center">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            title={`Open ${displayDomain} in new tab`}
            className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 px-3 py-1 rounded-md text-[11px] text-stone-200 border border-stone-800/80 transition-colors truncate max-w-full group"
          >
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate font-mono">{displayDomain}</span>
            <ExternalLink className="w-3 h-3 text-stone-500 group-hover:text-stone-300 shrink-0 ml-0.5" />
          </a>
        </div>

        {/* Actions & Status */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Actual Live App</span>
          </span>

          <button
            type="button"
            onClick={handleReload}
            title="Reload live preview"
            aria-label="Reload live application"
            className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          {onExpand && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              title="Expand in full preview modal"
              aria-label="Expand in modal"
              className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Frame Canvas Area */}
      <div className="relative flex-1 w-full h-full bg-white overflow-hidden">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-stone-950/90 z-10 flex flex-col items-center justify-center gap-3 text-stone-300 font-mono text-xs">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <div className="flex items-center gap-1.5 text-stone-400">
              <span>Connecting to</span>
              <span className="text-emerald-400 font-semibold">{displayDomain}</span>
              <span>...</span>
            </div>
          </div>
        )}

        {/* Actual Live Web App Iframe */}
        <iframe
          key={reloadKey}
          src={url}
          title={title}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          className="w-full h-full border-0 bg-white"
        />

        {/* Fallback if error or blocked */}
        {hasError && (
          <div className="absolute inset-0 bg-stone-900 text-stone-200 z-20 flex flex-col items-center justify-center p-6 text-center gap-3 font-mono text-xs">
            <Globe className="w-8 h-8 text-amber-400" />
            <div>Preview unable to load in frame context.</div>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded text-xs font-semibold"
            >
              <span>Launch Live Site in New Window</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Non-intrusive bottom interactive hint & launch button */}
        <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none flex items-center gap-2">
          <div className="pointer-events-auto flex items-center gap-1.5 bg-stone-950/85 backdrop-blur-xs text-white px-2.5 py-1 rounded-md border border-white/10 text-[10px] font-mono shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Live App</span>
            <button
              type="button"
              onClick={handleOpenExternal}
              className="ml-1 text-emerald-400 hover:text-emerald-300 underline inline-flex items-center gap-0.5"
            >
              <span>Launch tab</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
