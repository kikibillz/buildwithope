import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { PortfolioConfig } from '../types';

interface ContactSectionProps {
  config: PortfolioConfig;
}

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'activation_required' | 'error';

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const targetEmail = config.email || 'odunayoopamiju@gmail.com';

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!message.trim()) {
      newErrors.message = 'Please include a message.';
    } else if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    setErrorMessage('');

    const mailSubject = subject.trim()
      ? subject.trim()
      : `Portfolio Message from ${name.trim()}`;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          _subject: mailSubject,
          message: message.trim(),
          _replyto: email.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (data?.success === 'true' || data?.success === true)) {
        setStatus('success');
      } else if (data?.message && data.message.toLowerCase().includes('activation')) {
        // FormSubmit sent a one-time activation confirmation email to targetEmail
        setStatus('activation_required');
      } else {
        // FormSubmit or network returned a non-success response
        setStatus('error');
        setErrorMessage(
          data?.message || 'Unable to deliver message right now. Please use the direct mail link below.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Network error connecting to email service. Please use the direct mail button below to send your message.'
      );
    }
  };

  // Helper to open direct mailto pre-filled with the typed content
  const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
    subject.trim() || `Portfolio Contact from ${name.trim() || 'Website Visitor'}`
  )}&body=${encodeURIComponent(
    `From: ${name.trim()} <${email.trim()}>\n\nMessage:\n${message.trim()}`
  )}`;

  const handleReset = () => {
    setStatus('idle');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});
    setErrorMessage('');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-stone-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 mb-3">
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Inbox Connection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-2">
            Let&apos;s work together.
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Have a project, job opportunity, or question? Send a message directly to my inbox at{' '}
            <a
              href={`mailto:${targetEmail}`}
              className="text-stone-950 font-medium underline underline-offset-4 decoration-stone-400 hover:decoration-stone-900"
            >
              {targetEmail}
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct channels & context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#fafaf9] border border-stone-200 rounded-xl p-6 space-y-4 shadow-2xs">
              <h3 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono">
                Direct Channels
              </h3>

              <div className="space-y-3">
                <a
                  href={`mailto:${targetEmail}`}
                  id="contact-channel-email"
                  className="flex items-center gap-3 text-stone-700 hover:text-stone-950 group p-2 rounded-lg hover:bg-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-100 transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono text-stone-500 uppercase">Primary Email</div>
                    <div className="text-xs sm:text-sm font-medium text-stone-900 truncate">
                      {targetEmail}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 ml-auto shrink-0" />
                </a>

                <a
                  href={config.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  id="contact-channel-linkedin"
                  className="flex items-center gap-3 text-stone-700 hover:text-stone-950 group p-2 rounded-lg hover:bg-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-stone-200 transition-colors shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono text-stone-500 uppercase">LinkedIn Profile</div>
                    <div className="text-xs sm:text-sm font-medium text-stone-900 truncate">
                      {config.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 ml-auto shrink-0" />
                </a>

                <a
                  href={config.github}
                  target="_blank"
                  rel="noreferrer"
                  id="contact-channel-github"
                  className="flex items-center gap-3 text-stone-700 hover:text-stone-950 group p-2 rounded-lg hover:bg-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-stone-200 transition-colors shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono text-stone-500 uppercase">GitHub Repositories</div>
                    <div className="text-xs sm:text-sm font-medium text-stone-900 truncate">
                      {config.github.replace(/^https?:\/\/(www\.)?/, '')}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 ml-auto shrink-0" />
                </a>

                <div className="flex items-center gap-3 text-stone-700 p-2">
                  <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-stone-500 uppercase">Location</div>
                    <div className="text-xs sm:text-sm font-medium text-stone-900">{config.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Note on availability */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-xs text-stone-600 leading-relaxed font-sans">
              <span className="font-semibold text-stone-900 block mb-1">Response Window</span>
              Open to Data Science, Python Developer, and Data/Business Analyst roles, as well as AI video &amp; ML collaborations. Emails are delivered directly to {targetEmail} and answered within 24–48 hours.
            </div>
          </div>

          {/* Form / Delivery Status */}
          <div className="lg:col-span-7">
            <div className="bg-[#fafaf9] border border-stone-200 rounded-xl p-6 sm:p-8 shadow-2xs">
              {/* SUCCESS STATE */}
              {status === 'success' && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                    Message Delivered to My Inbox
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-stone-900">{name}</strong>. Your message has been transmitted directly to{' '}
                    <strong className="text-stone-900">{targetEmail}</strong>. I will reply to your email address (
                    <span className="font-mono text-xs text-stone-800">{email}</span>) as soon as possible.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-700 hover:text-stone-950 underline underline-offset-4"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Send another message</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ONE-TIME ACTIVATION NOTICE */}
              {status === 'activation_required' && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto border border-amber-300">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">
                    Delivery Initiated — Activation Step
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    FormSubmit has sent a 1-click activation email to{' '}
                    <strong className="text-stone-900">{targetEmail}</strong>. Please check your inbox (or spam) and click{' '}
                    <em>&quot;Activate Form&quot;</em> once to enable instant email forwarding.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium px-4 py-2 rounded-md transition-colors shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Directly via Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-mono text-stone-600 hover:text-stone-900 underline"
                    >
                      Back to form
                    </button>
                  </div>
                </div>
              )}

              {/* ERROR STATE */}
              {status === 'error' && (
                <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 space-y-3">
                  <div className="flex items-start gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Unable to complete automated delivery</p>
                      <p className="text-rose-700 mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-1.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-medium px-3.5 py-1.5 rounded-md transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send with Your Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="text-xs font-mono text-rose-800 hover:underline"
                    >
                      Try submitting again
                    </button>
                  </div>
                </div>
              )}

              {/* FORM INPUTS */}
              {status !== 'success' && status !== 'activation_required' && (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-stone-700 mb-1">
                        Your Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        disabled={status === 'sending'}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full text-sm bg-white border ${
                          errors.name ? 'border-rose-400 ring-1 ring-rose-300' : 'border-stone-300'
                        } rounded-md px-3 py-2 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-colors`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-stone-700 mb-1">
                        Your Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        disabled={status === 'sending'}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="sarah@company.com"
                        className={`w-full text-sm bg-white border ${
                          errors.email ? 'border-rose-400 ring-1 ring-rose-300' : 'border-stone-300'
                        } rounded-md px-3 py-2 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-colors`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-stone-700 mb-1">
                      Subject <span className="text-stone-400 text-[11px] font-normal">(Optional)</span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      disabled={status === 'sending'}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Data Science Opportunity / AI Video Project"
                      className="w-full text-sm bg-white border border-stone-300 rounded-md px-3 py-2 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-stone-700 mb-1">
                      Your Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      disabled={status === 'sending'}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Hi Odunayo, I came across your portfolio and would like to connect regarding..."
                      className={`w-full text-sm bg-white border ${
                        errors.message ? 'border-rose-400 ring-1 ring-rose-300' : 'border-stone-300'
                      } rounded-md px-3 py-2 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-colors`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      disabled={status === 'sending'}
                      className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white text-sm font-medium px-6 py-2.5 rounded-md transition-colors disabled:opacity-50 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{status === 'sending' ? 'Transmitting to Mailbox...' : 'Send Message'}</span>
                    </button>

                    <a
                      href={mailtoUrl}
                      id="contact-mailto-fallback"
                      className="inline-flex items-center justify-center gap-1.5 text-xs text-stone-600 hover:text-stone-950 font-mono py-2 px-3 rounded hover:bg-stone-100 transition-colors"
                      title="Open directly in your default email client"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Or open in email app</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
