import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  ExternalLink,
  CheckCircle2,
  Linkedin,
  BadgeCheck,
  Shield,
  Search,
  Key,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Building,
} from 'lucide-react';
import { CertificationItem, PortfolioConfig } from '../types';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
  certificationsUrl: string;
  config: PortfolioConfig;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  certificationsUrl,
  config: _config,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedCert, setInspectedCert] = useState<CertificationItem | null>(null);

  const categories = useMemo(() => {
    const cats = ['All', 'Data & AI', 'Product & Design', 'Management & Agile', 'Professional & Soft Skills'];
    return cats;
  }, []);

  const filteredCertifications = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesCategory =
        selectedCategory === 'All' || cert.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.description && cert.description.toLowerCase().includes(q)) ||
        (cert.credentialId && cert.credentialId.toLowerCase().includes(q)) ||
        (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [certifications, selectedCategory, searchQuery]);

  // Horizontal Reel scroll logic for Certifications
  const certsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollCertsLeft, setCanScrollCertsLeft] = useState(false);
  const [canScrollCertsRight, setCanScrollCertsRight] = useState(true);
  const [activeCertIndex, setActiveCertIndex] = useState(0);

  const handleCertsScroll = () => {
    if (!certsScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = certsScrollRef.current;
    setCanScrollCertsLeft(scrollLeft > 15);
    setCanScrollCertsRight(scrollLeft < scrollWidth - clientWidth - 15);

    const firstCard = certsScrollRef.current.firstElementChild as HTMLElement;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 20; // width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveCertIndex(Math.min(Math.max(0, index), filteredCertifications.length - 1));
    }
  };

  const scrollCerts = (direction: 'left' | 'right') => {
    if (!certsScrollRef.current) return;
    const container = certsScrollRef.current;
    const firstCard = container.firstElementChild as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth + 20 : 360;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5,
      behavior: 'smooth',
    });
  };

  const scrollToCert = (index: number) => {
    if (!certsScrollRef.current) return;
    const container = certsScrollRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      setActiveCertIndex(index);
    }
  };

  useEffect(() => {
    if (certsScrollRef.current) {
      certsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setActiveCertIndex(0);
    setCanScrollCertsLeft(false);
    setCanScrollCertsRight(filteredCertifications.length > 1);
  }, [selectedCategory, searchQuery]);

  return (
    <section
      id="certifications"
      className="py-20 sm:py-28 lg:py-32 border-b border-foreground/15 bg-background text-foreground transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-2">
              04 / Credentials
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display uppercase leading-[.92] text-foreground mb-3">
              Verified Technical Credentials.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              Selected certifications validating practical data science pipelines, AI engineering, executive BI dashboards, and agile recruitment operations.
            </p>
          </div>

          {/* LinkedIn Profile Deep-Link */}
          <div className="shrink-0 flex items-center gap-3">
            <a
              href={certificationsUrl}
              target="_blank"
              rel="noreferrer"
              id="btn-linkedin-certifications"
              data-cursor-text="LINKEDIN"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xs text-xs font-mono font-bold uppercase bg-card text-foreground border-2 border-foreground shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all"
              title="View all 13 credentials on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-primary" />
              <span>LinkedIn Credentials</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? certifications.length
                  : certifications.filter((c) => c.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  data-cursor-text={cat === 'All' ? 'ALL' : 'FILTER'}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xs text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-foreground text-background shadow-brutal-sm'
                      : 'border border-foreground/20 text-foreground/70 hover:text-foreground'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-xs ${
                      isActive
                        ? 'bg-background text-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-foreground/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search credentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xs text-xs font-mono bg-card border border-foreground/30 text-foreground placeholder-foreground/50 focus:outline-none focus:border-foreground"
            />
          </div>
        </div>

        {/* Horizontal Navigation Toolbar for Certifications */}
        {filteredCertifications.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-stone-700 dark:text-stone-300 bg-amber-500/10 dark:bg-[#1c1815] border border-amber-500/20 dark:border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                <span>Scroll or swipe left-to-right</span>
              </span>
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                Credential <strong className="text-stone-900 dark:text-stone-100">{activeCertIndex + 1}</strong> of {filteredCertifications.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollCerts('left')}
                disabled={!canScrollCertsLeft}
                data-cursor-text="PREV"
                aria-label="Previous credential"
                className="w-9 h-9 rounded-full bg-white dark:bg-[#1a1714] border border-amber-900/15 dark:border-amber-500/20 hover:border-amber-500/50 text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCerts('right')}
                disabled={!canScrollCertsRight}
                data-cursor-text="NEXT"
                aria-label="Next credential"
                className="w-9 h-9 rounded-full bg-white dark:bg-[#1a1714] border border-amber-900/15 dark:border-amber-500/20 hover:border-amber-500/50 text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Credentials Carousel List */}
        {filteredCertifications.length === 0 ? (
          <div className="text-center py-12 bg-white/90 dark:bg-[#1a1714] rounded-xl border border-amber-900/10 dark:border-amber-500/20 p-6">
            <Award className="w-8 h-8 text-amber-500/60 mx-auto mb-2 opacity-60" />
            <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">No certifications match your filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-mono text-amber-800 dark:text-amber-300 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <div
              ref={certsScrollRef}
              onScroll={handleCertsScroll}
              className="flex gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory print:grid print:grid-cols-2 print:overflow-visible select-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {filteredCertifications.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  id={`cert-card-${cert.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-card text-foreground border-2 border-foreground rounded-xs p-6 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col justify-between group w-[310px] sm:w-[350px] md:w-[380px] shrink-0 snap-start print:w-full"
                >
                  <div>
                    {/* Category & Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-xs bg-muted text-foreground border border-foreground/30">
                        <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                        <span>{cert.category || 'Professional'}</span>
                      </span>

                      {(cert.issueDate || cert.expiresDate) && (
                        <span className="text-[11px] font-mono text-foreground/70 font-semibold text-right">
                          {cert.issueDate && `Issued ${cert.issueDate}`}
                          {cert.expiresDate && ` · Exp ${cert.expiresDate}`}
                        </span>
                      )}
                    </div>

                    {/* Title & Issuer */}
                    <h3 className="text-base sm:text-lg font-display font-black text-foreground mb-1 leading-snug group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono font-bold text-foreground/80 mb-3">
                      {cert.issuer}
                    </div>

                    {/* Credential ID badge if present */}
                    {cert.credentialId && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-muted text-foreground font-mono text-[11px] border border-foreground/30 mb-3">
                        <Key className="w-3 h-3 text-foreground/70 shrink-0" />
                        <span>ID: <strong>{cert.credentialId}</strong></span>
                      </div>
                    )}

                    {/* Description */}
                    {cert.description && (
                      <p className="text-xs text-foreground/80 leading-relaxed font-sans mb-4 line-clamp-3">
                        {cert.description}
                      </p>
                    )}

                    {/* Skills tags */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-xs bg-muted text-foreground font-mono text-[10.5px] font-semibold border border-foreground/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Footer */}
                  <div className="pt-3 border-t border-foreground/15 flex items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setInspectedCert(cert)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-foreground hover:text-primary transition-colors cursor-pointer text-left truncate"
                      title="Inspect verifiable credential details"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-status-foreground fill-status shrink-0" />
                      <span className="truncate">{cert.credentialId ? `ID: ${cert.credentialId}` : 'Verified Badge'}</span>
                    </button>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setInspectedCert(cert)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-1 rounded-xs bg-muted text-foreground border border-foreground/30 hover:border-foreground transition-all cursor-pointer uppercase"
                        title={`Inspect certificate record for ${cert.title}`}
                      >
                        <Shield className="w-3 h-3 text-primary" />
                        <span>Inspect</span>
                      </button>

                      <a
                        href={cert.credentialUrl || certificationsUrl}
                        target="_blank"
                        rel="noreferrer"
                        id={`cert-link-${cert.id}`}
                        data-cursor-text="VERIFY"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-xs bg-foreground text-background shadow-2xs hover:opacity-90 transition-all uppercase"
                        title={`Verify credential badge for ${cert.title}`}
                      >
                        <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                        <span>Verify Badge</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination indicator dots */}
            <div className="flex items-center justify-center gap-2 mt-4 print:hidden">
              {filteredCertifications.map((c, dotIdx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => scrollToCert(dotIdx)}
                  aria-label={`Jump to credential ${dotIdx + 1}: ${c.title}`}
                  data-cursor-text={`${dotIdx + 1}`}
                  className={`h-2 rounded-xs transition-all duration-200 cursor-pointer ${
                    dotIdx === activeCertIndex
                      ? 'w-8 bg-foreground shadow-brutal-sm'
                      : 'w-2 bg-foreground/20 hover:bg-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Live sync callout */}
        <div className="mt-10 bg-card border-2 border-foreground rounded-xs p-5 shadow-brutal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-highlight text-highlight-foreground border border-foreground flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground font-mono uppercase tracking-wider">
                {certifications.length} Verified Licenses &amp; Certificates
              </div>
              <p className="text-xs text-muted-foreground font-sans mt-0.5">
                Every credential links directly to an accredited badge issuer (ALX Africa, Hirist / Cutshort, Hotjar, New Horizons, Culturelligence) with verifiable serial IDs and dates.
              </p>
            </div>
          </div>

          <a
            href={certificationsUrl}
            target="_blank"
            rel="noreferrer"
            id="cert-callout-linkedin"
            className="shrink-0 inline-flex items-center gap-2 text-xs font-mono font-bold text-foreground hover:text-primary uppercase"
          >
            <span>Open LinkedIn Certifications</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Verified Credential Badge Modal */}
      <AnimatePresence>
        {inspectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-card text-foreground border-2 border-foreground rounded-xs shadow-brutal-lg p-6 font-sans overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b-2 border-foreground/15">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xs bg-primary text-primary-foreground font-mono">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-primary tracking-wider block">
                      Accredited Credential Record
                    </span>
                    <h3 className="font-display font-black text-lg text-foreground uppercase leading-tight">
                      {inspectedCert.title}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectedCert(null)}
                  className="p-1 rounded-xs border border-foreground/30 hover:bg-muted text-foreground transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 p-3.5 bg-muted/40 rounded-xs border border-foreground/20 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold">
                    Issuing Authority
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-foreground mt-0.5">
                    <Building className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{inspectedCert.issuer}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-muted-foreground uppercase block font-semibold">
                    Issue Date &amp; Validity
                  </span>
                  <div className="flex items-center gap-1.5 font-bold text-foreground mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{inspectedCert.issueDate || 'Verified'}</span>
                    {inspectedCert.expiresDate && (
                      <span className="text-[10px] text-muted-foreground">· Exp {inspectedCert.expiresDate}</span>
                    )}
                  </div>
                </div>

                <div className="col-span-2 pt-2 border-t border-foreground/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block font-semibold">
                      Credential Serial ID
                    </span>
                    <span className="font-bold text-foreground font-mono text-xs">
                      {inspectedCert.credentialId || 'ACCREDITED-ACTIVE-BADGE'}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-status-foreground bg-status px-2 py-0.5 rounded-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              {inspectedCert.description && (
                <div className="mb-4 text-xs text-foreground/85 leading-relaxed font-sans">
                  {inspectedCert.description}
                </div>
              )}

              {/* Competencies */}
              {inspectedCert.skills && inspectedCert.skills.length > 0 && (
                <div className="mb-5">
                  <span className="font-mono text-[10px] uppercase font-bold text-muted-foreground block mb-1.5">
                    Verified Competencies &amp; Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {inspectedCert.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-xs bg-muted text-foreground font-mono text-[11px] font-semibold border border-foreground/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t-2 border-foreground/15 font-mono text-xs font-bold uppercase">
                <button
                  type="button"
                  onClick={() => setInspectedCert(null)}
                  className="px-3 py-1.5 rounded-xs border border-foreground/30 hover:bg-muted text-foreground cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={inspectedCert.credentialUrl || certificationsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xs bg-primary text-primary-foreground hover:bg-primary/90 shadow-brutal-sm cursor-pointer"
                >
                  <span>Open Verification Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
