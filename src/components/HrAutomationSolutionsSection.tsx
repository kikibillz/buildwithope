import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Briefcase,
  TrendingDown,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  FileSpreadsheet,
  Cpu,
  BarChart3,
  Sparkles,
  Zap,
  Mail,
  ChevronRight,
  Calculator,
} from 'lucide-react';
import { PortfolioConfig } from '../types';

interface HrAutomationSolutionsSectionProps {
  config: PortfolioConfig;
  onOpenCopilot?: () => void;
}

export const HrAutomationSolutionsSection: React.FC<HrAutomationSolutionsSectionProps> = ({
  config,
  onOpenCopilot,
}) => {
  const [activeAudience, setActiveAudience] = useState<'agency' | 'inhouse'>('agency');
  const [teamSize, setTeamSize] = useState<number>(10);

  // Computed ROI metrics
  const agencyWeeklyHoursSaved = Math.round(teamSize * 3.5);
  const agencyMonthlyHoursSaved = agencyWeeklyHoursSaved * 4;
  const inHouseTurnoverCostSaved = Math.round(teamSize * 1800); // estimated retention risk savings
  const inHouseWeeklyReportingSaved = Math.min(15, Math.max(5, Math.round(teamSize * 0.2 + 4)));

  return (
    <section id="hr-offer" className="py-14 sm:py-20 lg:py-24 border-b-2 border-foreground/15 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-[200px_1fr] sm:items-end mb-10 sm:mb-14">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              02 / Core Offer
            </p>
            <span className="inline-block mt-2 px-2.5 py-1 rounded-xs bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-wide">
              High-ROI Solution
            </span>
          </div>
          <div>
            <h2 className="font-display text-3xl xs:text-4xl sm:text-5xl lg:text-6xl uppercase leading-[.92] text-foreground">
              Practical Data &amp; Automation Support for HR Teams &amp; Recruitment Agencies.
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground font-sans max-w-3xl leading-relaxed">
              Stop losing high-bill-rate talent in spreadsheet clutter and discovering employee flight risk at exit interviews. Hands-on data engineering, predictive modeling, and automated workflows grounded in real People Operations experience.
            </p>
          </div>
        </div>

        {/* 3 Core Solutions Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {/* Solution 1: Recruitment Agencies */}
          <div className="bg-background border-2 border-foreground rounded-xs shadow-brutal p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-foreground/15">
                <span className="font-mono text-[11px] font-bold uppercase px-2 py-0.5 rounded-xs bg-secondary text-secondary-foreground">
                  Recruitment Agencies
                </span>
                <span className="text-xs font-mono font-bold text-muted-foreground">01</span>
              </div>

              <div className="size-11 rounded-xs bg-secondary/15 text-secondary border border-foreground/20 grid place-items-center mb-4">
                <Users className="size-6 text-secondary" />
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-foreground leading-tight">
                Candidate Pipeline &amp; Placement Automation
              </h3>

              <div className="mt-3 p-2.5 rounded-xs bg-muted/60 border border-foreground/15 text-xs font-sans text-muted-foreground leading-relaxed">
                <b className="text-foreground block font-mono text-[11px] uppercase mb-0.5">The Pain:</b>
                Recruiters lose 8–10 hrs/week wrangling scattered spreadsheets and job boards; top candidates go cold or get double-submitted.
              </div>

              <div className="mt-4 space-y-2.5 text-xs font-sans">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Automated Python ingestion deduplicating applicant records across sources.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Live submittal-to-placement pipeline dashboard with fee velocity metrics.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Instant alerts for candidates stalling at interview stages.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-foreground/15">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                One Clear Outcome:
              </span>
              <p className="font-mono text-xs font-bold text-foreground bg-primary/10 p-2.5 rounded-xs border border-foreground/20">
                Cuts candidate tracking time by 60% and gives owners 1-click placement fee visibility.
              </p>
            </div>
          </div>

          {/* Solution 2: In-House HR Flight Risk */}
          <div className="bg-background border-2 border-foreground rounded-xs shadow-brutal p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-transform relative">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-primary text-primary-foreground font-mono text-[10px] font-bold uppercase rounded-xs border border-foreground shadow-brutal-xs">
              Culturelligence Method
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-foreground/15">
                <span className="font-mono text-[11px] font-bold uppercase px-2 py-0.5 rounded-xs bg-primary text-primary-foreground">
                  In-House People Ops
                </span>
                <span className="text-xs font-mono font-bold text-muted-foreground">02</span>
              </div>

              <div className="size-11 rounded-xs bg-primary/15 text-primary border border-foreground/20 grid place-items-center mb-4">
                <TrendingDown className="size-6 text-primary" />
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-foreground leading-tight">
                Turnover Hazard &amp; Retention Early Warning
              </h3>

              <div className="mt-3 p-2.5 rounded-xs bg-muted/60 border border-foreground/15 text-xs font-sans text-muted-foreground leading-relaxed">
                <b className="text-foreground block font-mono text-[11px] uppercase mb-0.5">The Pain:</b>
                Replacing a key hire costs $25k–$45k, yet HR only learns employees are unhappy when 2-week resignation notices arrive.
              </div>

              <div className="mt-4 space-y-2.5 text-xs font-sans">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Calibrated Random Forest departure models (87.1% accuracy on 1,470 records).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Identifies hidden risk drivers: overtime spikes, role stagnation &gt;4 yrs.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Automated 48-hour manager intervention workflow for critical hazard tiers.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-foreground/15">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                One Clear Outcome:
              </span>
              <p className="font-mono text-xs font-bold text-foreground bg-primary/10 p-2.5 rounded-xs border border-foreground/20">
                Flags retention risk 60–90 days early, giving leaders runway to retain top performers.
              </p>
            </div>
          </div>

          {/* Solution 3: Automated Headcount & Payroll Reporting */}
          <div className="bg-background border-2 border-foreground rounded-xs shadow-brutal p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-foreground/15">
                <span className="font-mono text-[11px] font-bold uppercase px-2 py-0.5 rounded-xs bg-highlight text-highlight-foreground border border-foreground">
                  HR Ops &amp; Finance
                </span>
                <span className="text-xs font-mono font-bold text-muted-foreground">03</span>
              </div>

              <div className="size-11 rounded-xs bg-highlight/20 text-highlight-foreground border border-foreground/20 grid place-items-center mb-4">
                <FileSpreadsheet className="size-6 text-foreground" />
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-foreground leading-tight">
                Hands-Off Headcount &amp; Payroll Reporting
              </h3>

              <div className="mt-3 p-2.5 rounded-xs bg-muted/60 border border-foreground/15 text-xs font-sans text-muted-foreground leading-relaxed">
                <b className="text-foreground block font-mono text-[11px] uppercase mb-0.5">The Pain:</b>
                Teams spend entire Friday afternoons manually reconciling messy CSVs, contractor withholdings, and departmental variance.
              </div>

              <div className="mt-4 space-y-2.5 text-xs font-sans">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Python (OpenPyXL/Pandas) pipelines injecting live, dynamic formulas (=SUM, =PRODUCT).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Statutory 20% withholding calculations with zero formula breakage.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>Scheduled weekly executive PDF and workbook generation without manual touch.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-foreground/15">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                One Clear Outcome:
              </span>
              <p className="font-mono text-xs font-bold text-foreground bg-primary/10 p-2.5 rounded-xs border border-foreground/20">
                Reduces weekly spreadsheet reporting from 15 hours to under 30 minutes with 100% auditability.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive ROI & Scope Estimator */}
        <div className="bg-background border-2 border-foreground rounded-xs shadow-brutal p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b-2 border-foreground/15">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Calculator className="size-4 text-primary" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Scope &amp; Value Estimator
                </span>
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-foreground">
                See what automated data hygiene saves your team
              </h3>
            </div>

            {/* Audience Toggle */}
            <div className="flex items-center border-2 border-foreground p-1 rounded-xs bg-muted">
              <button
                type="button"
                onClick={() => {
                  setActiveAudience('agency');
                  setTeamSize(10);
                }}
                className={`px-3 py-1.5 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAudience === 'agency'
                    ? 'bg-foreground text-background shadow-brutal-xs'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                Recruitment Agency
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveAudience('inhouse');
                  setTeamSize(150);
                }}
                className={`px-3 py-1.5 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeAudience === 'inhouse'
                    ? 'bg-foreground text-background shadow-brutal-xs'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                In-House HR / People Ops
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Slider Input */}
            <div className="md:col-span-6 space-y-4">
              <label className="block text-xs font-mono font-bold uppercase text-foreground">
                {activeAudience === 'agency' ? 'Number of Active Recruiters:' : 'Total Company Headcount:'}{' '}
                <span className="text-primary text-sm font-black font-display ml-1">{teamSize}</span>
              </label>
              <input
                type="range"
                min={activeAudience === 'agency' ? 2 : 25}
                max={activeAudience === 'agency' ? 50 : 800}
                step={activeAudience === 'agency' ? 1 : 25}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>{activeAudience === 'agency' ? '2 Recruiters' : '25 Employees'}</span>
                <span>{activeAudience === 'agency' ? '50+ Recruiters' : '800+ Employees'}</span>
              </div>
            </div>

            {/* Metric Readouts */}
            <div className="md:col-span-6 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xs border-2 border-foreground bg-card shadow-brutal-xs">
                <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
                  {activeAudience === 'agency' ? 'Monthly Hours Saved' : 'Weekly Collation Saved'}
                </span>
                <span className="font-display font-black text-2xl sm:text-3xl text-primary">
                  {activeAudience === 'agency' ? `~${agencyMonthlyHoursSaved} hrs` : `${inHouseWeeklyReportingSaved} hrs/wk`}
                </span>
                <p className="text-[10px] text-muted-foreground font-sans mt-0.5">
                  Eliminates manual status pinging and data entry.
                </p>
              </div>

              <div className="p-4 rounded-xs border-2 border-foreground bg-card shadow-brutal-xs">
                <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground block">
                  {activeAudience === 'agency' ? 'Placement Acceleration' : 'Estimated Turnover Guard'}
                </span>
                <span className="font-display font-black text-2xl sm:text-3xl text-secondary">
                  {activeAudience === 'agency' ? '60% Faster' : `~$${(inHouseTurnoverCostSaved).toLocaleString()}`}
                </span>
                <p className="text-[10px] text-muted-foreground font-sans mt-0.5">
                  {activeAudience === 'agency'
                    ? 'Stops candidate drop-off in active deals.'
                    : 'Early intervention before resignation notices.'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA row */}
          <div className="mt-8 pt-5 border-t border-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-sans text-muted-foreground">
              Ready to automate your candidate pipeline or retention tracking? Let&apos;s start with one clear outcome.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="#outreach"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xs border-2 border-foreground bg-muted font-mono text-xs font-bold uppercase hover:bg-muted/80 shadow-brutal-xs cursor-pointer w-full sm:w-auto"
              >
                <span>View One-Outcome Pitches</span>
                <ChevronRight className="size-3.5" />
              </a>
              <a
                href={`mailto:${config.email}?subject=Practical%20HR%20Data%20%26%20Automation%20Support`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xs border-2 border-foreground bg-primary text-primary-foreground font-mono text-xs font-bold uppercase hover:bg-primary/90 shadow-brutal-xs cursor-pointer w-full sm:w-auto"
              >
                <Mail className="size-3.5" />
                <span>Discuss Your Project</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
