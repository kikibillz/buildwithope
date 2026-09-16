import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  FolderPlus,
  RefreshCw,
  FileCode,
  Copy,
  Check,
  Sparkles,
  Camera,
  Info,
} from 'lucide-react';

interface ProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhoto: string | null;
  onPhotoUpdated: (newPhotoUrl: string | null) => void;
}

export const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  isOpen,
  onClose,
  currentPhoto,
  onPhotoUpdated,
}) => {
  const [copiedPath, setCopiedPath] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (result) {
        localStorage.setItem('portfolio_natural_photo', result);
        onPhotoUpdated(result);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('portfolio_natural_photo');
    onPhotoUpdated('/images/odunayo.jpg');
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleCopyPath = () => {
    navigator.clipboard.writeText('public/images/odunayo.jpg');
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  const activeDisplaySrc = currentPhoto || '/images/odunayo.jpg';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 id="photo-modal-title" className="text-sm sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                Profile Photo &amp; Static Asset Documentation
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Manage your photograph, view folder paths, or upload a custom picture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Current Live Status Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
            <div className="relative shrink-0">
              <img
                src={activeDisplaySrc}
                alt="Active profile preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-white dark:border-stone-800 shadow-md ring-2 ring-emerald-500/40"
              />
              <span className="absolute bottom-0 right-0 p-1 bg-emerald-600 text-white rounded-full shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-sm font-bold text-stone-900 dark:text-stone-100">Active Profile Photo</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Rendering Live
                </span>
              </div>
              <p className="text-xs font-mono text-stone-500 dark:text-stone-400 break-all">
                Source: <span className="text-stone-800 dark:text-stone-200">{activeDisplaySrc.startsWith('data:') ? 'Custom Upload (Saved in LocalStorage)' : activeDisplaySrc}</span>
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                This image is rendered in the Header, Hero editorial introduction, About section card, and navigation bar.
              </p>
            </div>
          </div>

          {/* Vercel & GitHub Deployment Explanation Callout */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-semibold text-xs sm:text-sm">
              <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <span>Why an AI image showed on Vercel &amp; GitHub</span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-300/90 leading-relaxed">
              When using in-browser &quot;Choose Photo&quot;, the image is stored only in your local browser storage (LocalStorage). 
              Because LocalStorage is <strong>never</strong> committed to Git, your Vercel deployment could not see it and fell back to the placeholder image in the repository.
            </p>
            <p className="text-xs text-amber-900 dark:text-amber-200 font-medium">
              👉 To make your real photo show on Vercel for all visitors, place your image directly in the <code className="bg-amber-200/60 dark:bg-amber-900/60 px-1 py-0.5 rounded font-mono">public/images/</code> folder in the project file explorer.
            </p>
          </div>

          {/* Alert feedback */}
          {uploadSuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>Profile photo successfully updated in preview! (Remember to save to public/images/ for Vercel)</span>
            </div>
          )}

          {/* Option 1: Instant Browser Upload */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-mono text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                  Preview Your Photo (Instant Browser Preview)
                </h4>
              </div>
              <span className="text-[11px] font-mono text-stone-500 font-medium">Local Preview</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Select your photo from your device to immediately preview how it looks across your entire portfolio layout.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                className="hidden"
                id="profile-file-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Choose Photo from Computer</span>
              </button>

              <button
                type="button"
                onClick={handleResetToDefault}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                <span>Reset to Static Repo Image</span>
              </button>
            </div>
          </div>

          {/* Option 2: Folder Documentation for Developer / Git Workflow */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Permanent Vercel &amp; GitHub Deployment (Static File)
              </h4>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              To guarantee that Vercel serves your genuine headshot to every visitor, upload or drop your photo file into the project&apos;s static <code className="font-mono text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">public/images/</code> folder using the AI Studio File Explorer:
            </p>

            {/* Code Block Showing Folder Tree */}
            <div className="relative rounded-lg bg-stone-950 text-stone-200 p-3.5 font-mono text-xs overflow-x-auto border border-stone-800">
              <div className="text-stone-500 mb-1">// Supported filenames in public/images/:</div>
              <div className="text-emerald-400 font-semibold flex items-center justify-between">
                <span>public/images/odunayo.jpg  (or opeyemi picture.png)</span>
                <button
                  onClick={handleCopyPath}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-300 transition-colors cursor-pointer"
                >
                  {copiedPath ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Path</span>
                    </>
                  )}
                </button>
              </div>
              <div className="text-stone-400 mt-2 text-[11px] leading-relaxed">
                ├── public/<br />
                │&nbsp;&nbsp; ├── <span className="text-amber-300 font-bold">images/</span><br />
                │&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span className="text-emerald-400 font-bold">odunayo.jpg</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-stone-500">&lt;-- Primary headshot</span><br />
                │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span className="text-emerald-400 font-bold">opeyemi picture.png</span>&nbsp;<span className="text-stone-500">&lt;-- Auto-detected if uploaded</span><br />
                │&nbsp;&nbsp; └── videos/
              </div>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1">
              <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                <span>Automatic Detection Hierarchy</span>
              </div>
              <p>
                The portfolio checks for your authentic image in this exact order:
              </p>
              <ol className="list-decimal list-inside font-mono text-[11px] text-stone-700 dark:text-stone-300 space-y-0.5 mt-1">
                <li><code className="text-emerald-700 dark:text-emerald-400 font-semibold">/images/opeyemi picture.png</code> (Top priority)</li>
                <li><code className="text-emerald-700 dark:text-emerald-400 font-semibold">/images/opeyemi.png</code></li>
                <li><code className="text-emerald-700 dark:text-emerald-400 font-semibold">/images/odunayo.png</code> / <code className="text-emerald-700 dark:text-emerald-400 font-semibold">/images/odunayo.jpg</code></li>
                <li><code className="text-stone-600 dark:text-stone-400">/odunayo.jpg</code> (Root fallback)</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/70">
          <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
            Odunayo Opamiju • Portfolio Assets
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
