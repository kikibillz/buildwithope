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

          {/* Alert feedback */}
          {uploadSuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>Profile photo successfully updated and synced across the whole portfolio!</span>
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
                  Instant Browser Upload (No code required)
                </h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-medium">Recommended</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Select any personal photograph from your device. It will be loaded immediately and persisted in your browser&apos;s storage.
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
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                <span>Reset to Default Asset</span>
              </button>
            </div>
          </div>

          {/* Option 2: Folder Documentation for Developer / Git Workflow */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-mono text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Project Folder Structure &amp; Git Asset Placement
              </h4>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              If you prefer to commit your photo directly to your GitHub repository or project directory, place your image in the static <code className="font-mono text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">public/images/</code> folder:
            </p>

            {/* Code Block Showing Folder Tree */}
            <div className="relative rounded-lg bg-stone-950 text-stone-200 p-3.5 font-mono text-xs overflow-x-auto border border-stone-800">
              <div className="text-stone-500 mb-1">// Target directory &amp; file name:</div>
              <div className="text-emerald-400 font-semibold flex items-center justify-between">
                <span>public/images/odunayo.jpg</span>
                <button
                  onClick={handleCopyPath}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-300 transition-colors"
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
                │&nbsp;&nbsp; ├── <span className="text-amber-300 font-bold">images/</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-stone-500">&lt;-- Folder created</span><br />
                │&nbsp;&nbsp; │&nbsp;&nbsp; └── <span className="text-emerald-400 font-bold">odunayo.jpg</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-stone-500">&lt;-- Your headshot photo</span><br />
                │&nbsp;&nbsp; └── videos/
              </div>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-1">
              <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                <span>Automatic Fallback Hierarchy</span>
              </div>
              <p>
                The portfolio checks the following locations automatically:
              </p>
              <ol className="list-decimal list-inside font-mono text-[11px] text-stone-700 dark:text-stone-300 space-y-0.5 mt-1">
                <li><code className="text-emerald-700 dark:text-emerald-400 font-semibold">/images/odunayo.jpg</code> (Primary standard)</li>
                <li><code className="text-stone-600 dark:text-stone-400">/odunayo.jpg</code> (Root public fallback)</li>
                <li><code className="text-stone-600 dark:text-stone-400">/profile.jpg</code> (Alternative fallback)</li>
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
