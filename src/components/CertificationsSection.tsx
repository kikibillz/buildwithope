import React, { useState, useMemo } from 'react';
import { Award, ExternalLink, CheckCircle2, Linkedin, BadgeCheck, Shield, Search, Key } from 'lucide-react';
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

  return (
    <section
      id="certifications"
      className="py-16 sm:py-24 border-b border-stone-200/80 dark:border-stone-800 bg-[#fafaf9] dark:bg-[#0c0a09] transition-colors"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 mb-3">
              <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Verified Qualifications &amp; Licenses</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3">
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white border border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 shadow-2xs hover:shadow-xs transition-all active:scale-[0.98]"
              title="View all 13 credentials on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-[#0077b5]" />
              <span>LinkedIn Credentials</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 ml-0.5" />
            </a>
          </div>
        </div>

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
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-medium shadow-xs'
                      : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 border border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-stone-700 text-stone-200 dark:bg-stone-300 dark:text-stone-900'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
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

        {/* Credentials Grid */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCertifications.map((cert) => (
              <div
                key={cert.id}
                id={`cert-card-${cert.id}`}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Date */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
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
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-mono font-medium text-stone-600 dark:text-stone-400 mb-2.5">
                    {cert.issuer}
                  </div>

                  {/* Credential ID badge if present */}
                  {cert.credentialId && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 font-mono text-[10.5px] border border-stone-200/80 dark:border-stone-800 mb-3">
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
                          className="px-1.5 py-0.5 rounded bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 font-mono text-[10.5px] border border-stone-200 dark:border-stone-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    Verified
                  </span>

                  <a
                    href={cert.credentialUrl || certificationsUrl}
                    target="_blank"
                    rel="noreferrer"
                    id={`cert-link-${cert.id}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white group-hover:underline transition-colors"
                  >
                    <span>View on LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-stone-400 ml-0.5" />
                  </a>
                </div>
              </div>
            ))}
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
