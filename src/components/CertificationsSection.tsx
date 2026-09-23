import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
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
      className="py-20 sm:py-28 lg:py-32 border-b border-stone-200/80 dark:border-white/[0.08] bg-[#f8f8f5] dark:bg-[#0c0c0f] transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60 mb-3 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Verified Qualifications &amp; Licenses</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3">
              Certifications &amp; Licenses
            </h2>
            <p className="text-base text-stone-600 dark:text-stone-400 leading-relaxed">
              Verified credentials, specialized industry certifications, and accredited licenses spanning Data Science, Product Management, UI/UX, Agile Operations, and AI workflows.
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-white dark:bg-[#121216] text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white border border-stone-300 dark:border-white/[0.08] hover:border-emerald-500/40 dark:hover:border-emerald-400/30 shadow-2xs hover:shadow-sm transition-all"
              title="View all 13 credentials on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              <span>LinkedIn Credentials</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 ml-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
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
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-white dark:bg-emerald-400 dark:text-stone-950 font-semibold shadow-xs'
                      : 'bg-stone-200/60 dark:bg-[#141418] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#1a1a20] border border-stone-300/60 dark:border-white/[0.08]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-white/20 dark:bg-black/20 text-current'
                        : 'bg-stone-300/60 dark:bg-white/[0.08] text-stone-500 dark:text-stone-400'
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
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search credentials, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-400 dark:focus:border-stone-600 transition-colors"
            />
          </div>
        </div>

        {/* Horizontal Navigation Toolbar for Certifications */}
        {filteredCertifications.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-[#141418] border border-stone-200/80 dark:border-white/[0.08]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
                className="w-9 h-9 rounded-full bg-white dark:bg-[#121216] border border-stone-200/90 dark:border-white/[0.08] hover:border-emerald-500/40 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCerts('right')}
                disabled={!canScrollCertsRight}
                data-cursor-text="NEXT"
                aria-label="Next credential"
                className="w-9 h-9 rounded-full bg-white dark:bg-[#121216] border border-stone-200/90 dark:border-white/[0.08] hover:border-emerald-500/40 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Credentials Carousel List */}
        {filteredCertifications.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6">
            <Award className="w-8 h-8 text-stone-400 mx-auto mb-2 opacity-60" />
            <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">No certifications match your filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-mono text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
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
                  className="bg-white dark:bg-[#121216] border border-stone-200/90 dark:border-white/[0.08] hover:border-emerald-500/40 dark:hover:border-emerald-400/30 rounded-2xl p-5.5 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group w-[310px] sm:w-[350px] md:w-[380px] shrink-0 snap-start print:w-full"
                >
                  <div>
                    {/* Category & Date */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-white/[0.08]">
                        <BadgeCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>{cert.category || 'Professional'}</span>
                      </span>

                      {(cert.issueDate || cert.expiresDate) && (
                        <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 text-right">
                          {cert.issueDate && `Issued ${cert.issueDate}`}
                          {cert.expiresDate && ` · Exp ${cert.expiresDate}`}
                        </span>
                      )}
                    </div>

                    {/* Title & Issuer */}
                    <h3 className="text-base font-display font-bold text-stone-900 dark:text-stone-100 mb-1 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono font-medium text-stone-600 dark:text-stone-400 mb-2.5">
                      {cert.issuer}
                    </div>

                    {/* Credential ID badge if present */}
                    {cert.credentialId && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 font-mono text-[10.5px] border border-stone-200/80 dark:border-white/[0.06] mb-3">
                        <Key className="w-2.5 h-2.5 text-stone-400 shrink-0" />
                        <span>ID: <strong>{cert.credentialId}</strong></span>
                      </div>
                    )}

                    {/* Description */}
                    {cert.description && (
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-3.5 line-clamp-3">
                        {cert.description}
                      </p>
                    )}

                    {/* Skills tags */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-stone-50 dark:bg-white/[0.04] text-stone-600 dark:text-stone-400 font-mono text-[10.5px] border border-stone-200/80 dark:border-white/[0.06]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Footer */}
                  <div className="pt-3 border-t border-stone-100 dark:border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      Verified
                    </span>

                    <a
                      href={cert.credentialUrl || certificationsUrl}
                      target="_blank"
                      rel="noreferrer"
                      id={`cert-link-${cert.id}`}
                      data-cursor-text="VIEW"
                      className="inline-flex items-center gap-1 text-xs font-medium text-stone-800 dark:text-stone-200 hover:text-emerald-600 dark:hover:text-emerald-400 group-hover:underline transition-colors"
                    >
                      <span>View on LinkedIn</span>
                      <ExternalLink className="w-3 h-3 text-stone-400 ml-0.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination indicator dots */}
            <div className="flex items-center justify-center gap-1.5 mt-4 print:hidden">
              {filteredCertifications.map((c, dotIdx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => scrollToCert(dotIdx)}
                  aria-label={`Jump to credential ${dotIdx + 1}: ${c.title}`}
                  data-cursor-text={`${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === activeCertIndex
                      ? 'w-7 bg-stone-900 dark:bg-emerald-400'
                      : 'w-1.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-500'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Live sync callout */}
        <div className="mt-10 bg-stone-100/70 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-700 dark:text-stone-300 shrink-0">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 font-mono">
                {certifications.length} Verified Licenses &amp; Certificates
              </div>
            
            </div>
          </div>

          <a
            href={certificationsUrl}
            target="_blank"
            rel="noreferrer"
            id="cert-callout-linkedin"
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline"
          >
            <span>Open linkedin.com/in/opeyemiolamiju/details/certifications</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
