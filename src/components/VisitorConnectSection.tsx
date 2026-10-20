import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Send,
  Sparkles,
  CheckCircle2,
  FileText,
  AlertCircle,
  Database,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  getVisitorData,
  saveCapturedLead,
  sendAutomatedFollowupEmail,
  recordAction,
  VisitorTrackingData,
} from '../utils/cookieTracking';

interface VisitorConnectSectionProps {
  ownerEmail?: string;
}

export const VisitorConnectSection: React.FC<VisitorConnectSectionProps> = ({
  ownerEmail = 'odunayoopamiju@gmail.com',
}) => {
  const [visitor, setVisitor] = useState<VisitorTrackingData>(getVisitorData());
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('Recruiter / Hiring Team');
  const [note, setNote] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState<string>('');

  useEffect(() => {
    const data = getVisitorData();
    setVisitor(data);
    if (data.email) {
      setEmail(data.email);
    }
    if (data.name) {
      setName(data.name);
    }
    if (data.role) {
      setRole(data.role);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setStatusMsg('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    setStatusMsg('');

    try {
      recordAction('requested_technical_deck');

      // Silently dispatch automated packet to visitor & telemetry notification to owner
      const result = await sendAutomatedFollowupEmail({
        visitorName: name.trim() || 'Visitor',
        visitorEmail: email.trim(),
        visitorRole: role,
        note: note.trim() || 'Requested technical case studies and architecture deck.',
        ownerEmail,
        trackingContext: {
          visitCount: visitor.visitCount,
          sectionsViewed: visitor.sectionsViewed,
          referrer: visitor.referrer,
          visitorId: visitor.visitorId,
        },
      });

      // Save lead locally in background for owner hub
      saveCapturedLead({
        name: name.trim() || 'Portfolio Colleague',
        email: email.trim(),
        role,
        note: note.trim(),
        visitCount: visitor.visitCount,
        sectionsViewed: visitor.sectionsViewed,
        autoEmailSent: true,
      });

      setVisitor(getVisitorData());
      setStatus('success');
      setStatusMsg(result.message || `Technical briefing dispatched to ${email.trim()}!`);
    } catch {
      setStatus('error');
      setStatusMsg('Could not dispatch message. Please check your internet connection.');
    }
  };

  return (
    <section className="py-12 sm:py-16 border-t border-foreground/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-card border border-foreground/15 p-6 sm:p-10 lg:p-12 shadow-xl">
          {/* Subtle accent glow */}
          <div className="absolute -top-24 -right-24 size-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 size-80 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Context & Value */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20">
                <Sparkles className="size-3.5 text-amber-600 dark:text-amber-400" />
                <span>Executive Deliverables & Case Studies</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-foreground">
                Request Technical Architecture & Engineering Deep-Dives.
              </h2>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Evaluating Opeyemi for a Data Science role, AI engineering lead, or technical project? Enter your email to immediately receive production architecture blueprints, benchmark metrics, and source repositories.
              </p>

              {/* Engineering Highlights */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-foreground/80 font-mono">
                  <div className="size-6 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                    <Database className="size-3.5" />
                  </div>
                  <span>Enterprise RAG vector pipeline & multi-tenant schema</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-foreground/80 font-mono">
                  <div className="size-6 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                    <Cpu className="size-3.5" />
                  </div>
                  <span>FastAPI production microservice & async task runner specs</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-foreground/80 font-mono">
                  <div className="size-6 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                    <Layers className="size-3.5" />
                  </div>
                  <span>Machine learning attrition risk model evaluation & AUC logs</span>
                </div>
              </div>
            </div>

            {/* Right Column: Seamless Professional Form */}
            <div className="lg:col-span-6">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
                >
                  <div className="size-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="size-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Technical Deck Dispatched!
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1.5">
                      The portfolio packet and architecture breakdown have been delivered to <strong>{email}</strong>. Check your inbox for direct access links.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-4 py-2 rounded-lg bg-foreground/10 hover:bg-foreground/15 text-foreground text-xs font-medium transition-colors cursor-pointer"
                    >
                      Request with another email
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 p-5 sm:p-7 rounded-2xl bg-card border border-foreground/15 shadow-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2 rounded-lg bg-background border border-foreground/15 text-foreground text-xs focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-muted-foreground mb-1">
                        Work / Primary Email <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@company.com"
                        className="w-full px-3.5 py-2 rounded-lg bg-background border border-foreground/15 text-foreground text-xs focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1">
                      Primary Focus Area
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-background border border-foreground/15 text-foreground text-xs focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                    >
                      <option value="Recruiter / Hiring Team">Full-time Hiring / Role Evaluation</option>
                      <option value="Engineering Lead / CTO">Enterprise AI / RAG Architecture</option>
                      <option value="Data Science & ML Lead">Predictive Modeling & Analytics</option>
                      <option value="Creative Director / Producer">AI Commercial Video Direction</option>
                      <option value="Founder / Technical Consultant">Contract & Advisory Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-muted-foreground mb-1">
                      Note or Specific Requirement (Optional)
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. Reviewing for Senior ML Engineer role"
                      className="w-full px-3.5 py-2 rounded-lg bg-background border border-foreground/15 text-foreground text-xs focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-rose-500 text-xs bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                      <AlertCircle className="size-4 shrink-0" />
                      <span>{statusMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm active:scale-98"
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Briefing...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="size-3.5" />
                        <span>Request Architecture Deck</span>
                        <ArrowRight className="size-3.5" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-muted-foreground text-center pt-1">
                    Direct delivery to your inbox. No marketing spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
