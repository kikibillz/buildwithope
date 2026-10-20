import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Send,
  Users,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  Copy,
  ExternalLink,
  RefreshCw,
  Sliders,
  FileText,
  AlertCircle,
  Inbox,
} from 'lucide-react';
import {
  getVisitorData,
  getCapturedLeads,
  sendAutomatedFollowupEmail,
  CapturedLead,
  VisitorTrackingData,
} from '../utils/cookieTracking';

interface OwnerAutoMailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerEmail?: string;
}

const EMAIL_TEMPLATES = [
  {
    id: 'portfolio-brief',
    name: 'Instant Portfolio Brief & Live Demos',
    subject: 'Automated Portfolio Brief · Opeyemi Olamiju (Build with Ope)',
    body: (name: string) => `Hi ${name || 'there'},

Thank you for exploring my portfolio, Build with Ope!

Here is your automated briefing packet with direct links to my core projects and architectures:

1. Enterprise RAG Prompt Engine:
   Multi-tenant knowledge base, vector embeddings retrieval, and hallucination reduction.
   Repository: https://github.com/kikibillz

2. FastAPI Async Microservice:
   Full-stack REST API with JWT security, Pydantic v2 schemas, and background job queues.

3. HR Analytics & Attrition Predictor:
   Machine learning model predicting employee turnover hazard with 88%+ recall.

4. AI Commercial Video Production:
   Cinematic generative video ads with professional sound design.

Feel free to reply directly to this email to discuss roles, projects, or schedule a quick intro call.

Best regards,
Opeyemi Olamiju
Data Scientist & AI Automation Engineer
odunayoopamiju@gmail.com | https://github.com/kikibillz`,
  },
  {
    id: 'recruiter-followup',
    name: 'Recruiter / Hiring Follow-Up',
    subject: 'Follow-up regarding Data Science / AI Engineer role · Opeyemi Olamiju',
    body: (name: string) => `Hi ${name || 'there'},

Thank you for checking out my work. I saw that you reviewed my portfolio and wanted to share a concise snapshot of my technical competencies:

• Core Stack: Python, SQL, FastAPI, Scikit-learn, LangChain, Pandas, TypeScript
• Machine Learning: Supervised/Unsupervised models, LLM RAG pipelines, predictive churn/attrition
• Data Engineering: Automated ETL pipelines, deduplication workflows, database architecture

I am actively open to high-impact Data Science, ML Engineering, and Python Developer roles. Would you be open to a 15-minute introductory conversation this week?

Best regards,
Opeyemi Olamiju
odunayoopamiju@gmail.com
LinkedIn: https://linkedin.com/in/opeyemiolamiju`,
  },
  {
    id: 'consulting-intro',
    name: 'Client / Project Scoping Intro',
    subject: 'Next steps for your AI & Automation Project · Opeyemi Olamiju',
    body: (name: string) => `Hi ${name || 'there'},

Thanks for reaching out through Build with Ope!

Whether you are looking to build a generative RAG system, automate internal spreadsheet/data pipelines, or direct an AI commercial video campaign, I'd love to help you build it.

Could you share a brief 2-3 sentence overview of what you're looking to build, along with your target timeline? We can also jump on a 15-minute discovery call to map out the technical roadmap.

Looking forward to hearing from you.

Best,
Opeyemi Olamiju
odunayoopamiju@gmail.com`,
  },
];

export const OwnerAutoMailerModal: React.FC<OwnerAutoMailerModalProps> = ({
  isOpen,
  onClose,
  ownerEmail = 'odunayoopamiju@gmail.com',
}) => {
  const [visitor, setVisitor] = useState<VisitorTrackingData>(getVisitorData());
  const [leads, setLeads] = useState<CapturedLead[]>(getCapturedLeads());
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('portfolio-brief');
  const [targetRecipient, setTargetRecipient] = useState<string>(visitor.email || ownerEmail);
  const [targetName, setTargetName] = useState<string>(visitor.name || 'Website Visitor');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [customBody, setCustomBody] = useState<string>('');
  const [sendingStatus, setSendingStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusText, setStatusText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      const v = getVisitorData();
      const l = getCapturedLeads();
      setVisitor(v);
      setLeads(l);

      if (v.email) {
        setTargetRecipient(v.email);
      }
      if (v.name) {
        setTargetName(v.name);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const tmpl = EMAIL_TEMPLATES.find((t) => t.id === selectedTemplateId) || EMAIL_TEMPLATES[0];
    setCustomSubject(tmpl.subject);
    setCustomBody(tmpl.body(targetName));
  }, [selectedTemplateId, targetName]);

  if (!isOpen) return null;

  const handleSendAutomatedEmail = async () => {
    if (!targetRecipient || !targetRecipient.includes('@')) {
      setSendingStatus('error');
      setStatusText('Please enter a valid recipient email address.');
      return;
    }

    setSendingStatus('sending');
    setStatusText('');

    try {
      const result = await sendAutomatedFollowupEmail({
        visitorName: targetName,
        visitorEmail: targetRecipient,
        visitorRole: 'Auto-Mailer Triggered Dispatch',
        note: customBody,
        ownerEmail,
        trackingContext: {
          visitCount: visitor.visitCount,
          sectionsViewed: visitor.sectionsViewed,
          referrer: visitor.referrer,
          visitorId: visitor.visitorId,
        },
      });

      setSendingStatus('success');
      setStatusText(result.message || `Automated mail dispatched to ${targetRecipient}!`);
      setLeads(getCapturedLeads());
    } catch {
      setSendingStatus('error');
      setStatusText('Network error dispatching automated email.');
    }
  };

  const mailtoHref = `mailto:${encodeURIComponent(targetRecipient)}?subject=${encodeURIComponent(
    customSubject
  )}&body=${encodeURIComponent(customBody)}`;

  const handleCopyBody = () => {
    navigator.clipboard.writeText(customBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl rounded-2xl bg-stone-950 text-stone-100 border border-amber-500/30 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800 bg-stone-900/60">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Mail className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-base sm:text-lg text-stone-100">
                  Visitor Tracking & Auto-Mailer Hub
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Automated Dispatch
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Track visitor cookies & send automated follow-up emails directly to leads
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content Tabs / Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Top Bar: Live Cookie Telemetry */}
          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Eye className="size-4" />
                <span>Live Cookie Telemetry for Current Visitor</span>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                ID: {visitor.visitorId}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
              <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800">
                <div className="text-[10px] text-stone-500">Visit Count</div>
                <div className="text-amber-400 font-bold text-sm">
                  {visitor.visitCount} {visitor.visitCount === 1 ? 'visit' : 'visits'}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800">
                <div className="text-[10px] text-stone-500">Cookie Consent</div>
                <div className="text-emerald-400 font-bold text-xs uppercase">
                  {visitor.consentStatus}
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800">
                <div className="text-[10px] text-stone-500">Sections Viewed</div>
                <div className="text-stone-200 font-bold text-xs">
                  {visitor.sectionsViewed.length} section(s)
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-950/70 border border-stone-800">
                <div className="text-[10px] text-stone-500">Auto-Email Sent</div>
                <div className="text-stone-200 font-bold text-xs">
                  {visitor.autoEmailSent ? 'Yes (Sent)' : 'Pending'}
                </div>
              </div>
            </div>

            {visitor.sectionsViewed.length > 0 && (
              <div className="text-[11px] text-stone-400">
                <span className="text-stone-500 font-mono">Sections: </span>
                {visitor.sectionsViewed.join(' · ')}
              </div>
            )}
          </div>

          {/* Captured Visitor Leads Section */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <Users className="size-3.5 text-amber-400" />
                Tracked Visitor Leads ({leads.length})
              </h3>
              <span className="text-[11px] text-stone-500">
                Persisted in browser cookies & storage
              </span>
            </div>

            {leads.length === 0 ? (
              <div className="p-4 rounded-xl bg-stone-900/30 border border-stone-800/80 text-center text-xs text-stone-400">
                <Inbox className="size-6 text-stone-500 mx-auto mb-1.5" />
                No captured visitor emails yet. Visitors who submit their email via the connect banner or contact form will appear here.
              </div>
            ) : (
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => {
                      setTargetRecipient(lead.email);
                      setTargetName(lead.name);
                    }}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      targetRecipient === lead.email
                        ? 'bg-amber-500/15 border-amber-500/40 text-stone-100'
                        : 'bg-stone-900/50 border-stone-800 text-stone-300 hover:bg-stone-900'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-stone-100 flex items-center gap-1.5">
                        <span>{lead.name}</span>
                        <span className="text-[10px] text-stone-400 font-mono">({lead.email})</span>
                      </div>
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        {lead.role} · {lead.visitCount} visit(s) · {new Date(lead.capturedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-2 py-1 rounded bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-[10px] font-medium transition-colors"
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Automated Email Dispatcher Composer */}
          <div className="space-y-3.5 pt-2 border-t border-stone-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-amber-400" />
                Automated Email Dispatcher
              </h3>
              <div className="flex gap-1.5">
                {EMAIL_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                      selectedTemplateId === tmpl.id
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    {tmpl.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-stone-400 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={targetRecipient}
                  onChange={(e) => setTargetRecipient(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-400 mb-1">
                Email Subject
              </label>
              <input
                type="text"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono text-stone-400">
                  Email Message Body
                </label>
                <button
                  type="button"
                  onClick={handleCopyBody}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <Copy className="size-3" />
                  <span>{copied ? 'Copied!' : 'Copy Body'}</span>
                </button>
              </div>
              <textarea
                rows={6}
                value={customBody}
                onChange={(e) => setCustomBody(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 font-mono text-xs focus:outline-none focus:border-amber-400 leading-relaxed resize-y"
              />
            </div>

            {sendingStatus === 'success' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
                <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                <span>{statusText}</span>
              </div>
            )}

            {sendingStatus === 'error' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
                <AlertCircle className="size-4 shrink-0 text-rose-400" />
                <span>{statusText}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-800 bg-stone-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={mailtoHref}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <ExternalLink className="size-3.5" />
            <span>Open in Mail Client</span>
          </a>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleSendAutomatedEmail}
              disabled={sendingStatus === 'sending'}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-md"
            >
              {sendingStatus === 'sending' ? (
                <>
                  <div className="size-3.5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>Dispatching...</span>
                </>
              ) : (
                <>
                  <Send className="size-3.5" />
                  <span>Send Automated Mail</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
