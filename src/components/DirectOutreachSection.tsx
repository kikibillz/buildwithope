import React, { useState } from 'react';
import {
  Copy,
  Check,
  Mail,
  Target,
  Download,
  Building2,
  Users,
  FileSpreadsheet,
} from 'lucide-react';
import { PortfolioConfig } from '../types';

interface DirectOutreachSectionProps {
  config: PortfolioConfig;
}

const OUTREACH_TEMPLATES = [
  {
    id: 'agency-pipeline',
    title: 'Recruitment Agency Founder / Managing Director',
    badge: 'Recruitment Agencies',
    icon: Building2,
    outcome: 'Cut candidate processing time by 60% and eliminate lost placement fees.',
    subject: (company: string) => `Automating candidate pipeline & placement tracking for ${company}`,
    body: (name: string, company: string, sector: string) =>
`Hi ${name},

Notice your team is actively placing talent across ${sector || 'your market'}. Most agency owners I speak with lose 8–10 hours every week wrangling candidate data across disconnected spreadsheets and job boards, causing high-value candidates to go cold or get double-submitted.

I build automated Python pipelines that consolidate candidate submissions, eliminate duplicate records, and track placement stages in one live dashboard—cutting manual tracking by 60%.

Would you be open to a 10-minute intro call this Thursday to see how this works for teams like ${company}?

Best,
Opeyemi Olamiju
Data Scientist & Automation Engineer · Build with Ope
Email: odunayoopamiju@gmail.com | GitHub: github.com/kikibillz`,
  },
  {
    id: 'hr-retention',
    title: 'Head of People Operations / HR Director',
    badge: 'In-House People Ops',
    icon: Users,
    outcome: 'Spot employee flight risks 60–90 days before exit notices land.',
    subject: (company: string) => `Proactive turnover hazard & flight-risk tracking at ${company}`,
    body: (name: string, company: string) =>
`Hi ${name},

Replacing a key team member currently costs 6–9 months of their salary in lost momentum and recruiting fees. Most People Ops teams only find out an employee is unhappy during their exit interview.

Having managed HR headcount tracking at Culturelligence, I developed predictive models that analyze tenure stagnation, overtime variance, and engagement telemetry to pinpoint retention risks with 88%+ recall—giving managers 60 to 90 days to intervene proactively.

Could I share a 2-minute video walkthrough showing how this dashboard plugs into existing HR spreadsheets at ${company}?

Best regards,
Opeyemi Olamiju
Data Scientist & People Analytics Engineer · Build with Ope
Email: odunayoopamiju@gmail.com | LinkedIn: linkedin.com/in/opeyemiolamiju`,
  },
  {
    id: 'talent-ops-dedup',
    title: 'Talent Operations & Sourcing Lead',
    badge: 'Candidate Data & ETL',
    icon: FileSpreadsheet,
    outcome: 'Eliminate duplicate applicant records and stop spreadsheet formula breakage.',
    subject: (company: string) => `Zero-breakage candidate ETL & deduplication pipeline for ${company}`,
    body: (name: string, company: string) =>
`Hi ${name},

Quick question: how much time does your talent operations team spend manually cross-checking candidate emails, fixing broken spreadsheet VLOOKUPs, and cleaning messy exports from job boards?

I build lightweight Python automations (Pydantic v2 + OpenPyXL) that ingest applicant records, deduplicate contacts automatically, and update talent pipelines with dynamic formula calculation and zero breakage.

Happy to send over a sample workflow or run a test batch on 50 dummy records to show you how clean the pipeline is. Let me know if that sounds useful for ${company}!

Best,
Opeyemi Olamiju
Data Scientist & Automation Developer · Build with Ope
Email: odunayoopamiju@gmail.com`,
  },
];

export const DirectOutreachSection: React.FC<DirectOutreachSectionProps> = ({ config }) => {
  const [selectedOutreachId, setSelectedOutreachId] = useState<string>('agency-pipeline');
  const [recipientName, setRecipientName] = useState<string>('Alex');
  const [companyName, setCompanyName] = useState<string>('Apex Talent Partners');
  const [targetSector, setTargetSector] = useState<string>('Tech & Healthcare Staffing');
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  const currentTemplate =
    OUTREACH_TEMPLATES.find((t) => t.id === selectedOutreachId) || OUTREACH_TEMPLATES[0];

  const currentPitchBody = currentTemplate.body(recipientName, companyName, targetSector);
  const currentPitchSubject = currentTemplate.subject(companyName);

  const copyOutreachMessage = () => {
    navigator.clipboard.writeText(currentPitchBody).then(() => {
      setCopiedPitch(true);
      setTimeout(() => setCopiedPitch(false), 2500);
    });
  };

  const downloadTextPitch = () => {
    const text = `SUBJECT: ${currentPitchSubject}\n\n${currentPitchBody}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Outreach_Pitch_${companyName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div id="outreach" className="w-full">
      {/* Top Banner */}
      <div className="bg-card text-foreground rounded-xs border-2 border-foreground shadow-brutal p-5 sm:p-7 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b-2 border-foreground/15">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 bg-primary text-primary-foreground rounded-xs font-mono text-[10px] font-bold uppercase tracking-wider">
                Direct Outreach &amp; Proposals
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                One Clear Outcome · Zero Jargon
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black font-display uppercase tracking-tight text-foreground">
              Direct Outreach &amp; Proposal Hub
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl font-sans leading-relaxed">
              Tailored outcome-focused proposals for recruitment agency founders, HR directors, and operations managers. Focused on one measurable result.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-status text-status-foreground border border-foreground text-xs font-mono font-bold uppercase rounded-xs">
              <Target className="size-3.5" />
              <span>Single-Outcome Outreach</span>
            </span>
          </div>
        </div>

        {/* The One Clear Outcome Callout */}
        <div className="mt-6 space-y-6">
          <div className="p-4 rounded-xs border-2 border-foreground bg-primary/10 shadow-brutal-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary block mb-0.5">
                Core Outreach Proposition:
              </span>
              <p className="font-mono text-xs sm:text-sm font-black text-foreground">
                &ldquo;Turn messy candidate spreadsheets &amp; HR turnover data into an automated pipeline dashboard that alerts you to flight risks before exit interviews — cutting manual weekly reporting from 15 hours to under 30 minutes.&rdquo;
              </p>
            </div>
          </div>

          {/* Template Selector Cards */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-foreground/80 mb-2">
              Select Your Outreach Target:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {OUTREACH_TEMPLATES.map((tmpl) => {
                const IconComponent = tmpl.icon;
                const isSelected = selectedOutreachId === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => setSelectedOutreachId(tmpl.id)}
                    className={`p-3.5 rounded-xs border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-foreground bg-background shadow-brutal-sm ring-1 ring-primary'
                        : 'border-foreground/30 bg-muted/40 hover:border-foreground/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-xs bg-muted border border-foreground/20 text-muted-foreground block w-fit">
                          {tmpl.badge}
                        </span>
                        <IconComponent className="size-4 text-primary" />
                      </div>
                      <h4 className="font-display font-extrabold text-xs uppercase text-foreground">
                        {tmpl.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-sans mt-2 pt-2 border-t border-foreground/15">
                      <b className="text-foreground font-mono">Outcome:</b> {tmpl.outcome}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customizer Inputs */}
          <div className="p-4 rounded-xs border border-foreground/20 bg-muted/40 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-foreground/80 mb-1">
                Recipient First Name:
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Alex"
                className="w-full px-3 py-1.5 text-xs font-mono bg-background border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-foreground/80 mb-1">
                Company / Agency Name:
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Apex Talent Partners"
                className="w-full px-3 py-1.5 text-xs font-mono bg-background border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase text-foreground/80 mb-1">
                Sector / Industry:
              </label>
              <input
                type="text"
                value={targetSector}
                onChange={(e) => setTargetSector(e.target.value)}
                placeholder="e.g. Tech & Healthcare Staffing"
                className="w-full px-3 py-1.5 text-xs font-mono bg-background border border-foreground/30 rounded-xs text-foreground focus:outline-none focus:border-foreground"
              />
            </div>
          </div>

          {/* Outreach Message Box */}
          <div className="relative">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-foreground/15 text-xs font-mono">
              <span className="text-muted-foreground">
                Subject: <b className="text-foreground font-sans">{currentPitchSubject}</b>
              </span>
              <span className="text-[11px] text-emerald-600 font-bold hidden sm:inline">
                ● 4-Sentence High-Conversion Format
              </span>
            </div>

            <pre className="p-4 sm:p-5 rounded-xs border-2 border-foreground bg-background text-foreground font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-brutal-sm">
              {currentPitchBody}
            </pre>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-muted-foreground">
                Ready to send via LinkedIn message or direct email.
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={downloadTextPitch}
                  className="inline-flex items-center gap-1.5 bg-card text-foreground border border-foreground/40 hover:border-foreground shadow-brutal-xs px-3 py-2 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span>Download .txt</span>
                </button>

                <a
                  href={`mailto:?subject=${encodeURIComponent(currentPitchSubject)}&body=${encodeURIComponent(currentPitchBody)}`}
                  className="inline-flex items-center gap-2 bg-card text-foreground border-2 border-foreground shadow-brutal-xs hover:shadow-brutal px-3.5 py-2 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  <Mail className="size-3.5 text-primary" />
                  <span>Open in Email Client</span>
                </a>

                <button
                  type="button"
                  onClick={copyOutreachMessage}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground border-2 border-foreground shadow-brutal-xs hover:shadow-brutal px-4 py-2 rounded-xs font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  {copiedPitch ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  <span>{copiedPitch ? 'Copied to Clipboard!' : 'Copy Pitch Message'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
