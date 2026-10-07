import React, { useState } from 'react';
import { Mail, Copy, ExternalLink } from 'lucide-react';
import { PortfolioConfig } from '../types';

interface ContactSectionProps { config: PortfolioConfig }
export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
 const [name,setName]=useState(''),[email,setEmail]=useState(''),[subject,setSubject]=useState(''),[message,setMessage]=useState('');
 const [notice,setNotice]=useState(''),[error,setError]=useState('');
 const body=`From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`;
 const mailto=`mailto:${config.email}?subject=${encodeURIComponent(subject.trim()||'Portfolio enquiry')}&body=${encodeURIComponent(body)}`;
 const validate=()=>{
  if(name.trim().length<2){setError('Enter a name of at least two characters.');return false;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())){setError('Enter a valid reply email.');return false;}
  if(message.trim().length<10){setError('Enter a message of at least ten characters.');return false;}
  setError('');return true;
 };
 const compose=(event:React.FormEvent)=>{event.preventDefault();if(!validate())return;setNotice('Your email app was requested. Review the draft and press Send there. If no app opens, copy the message below. This website does not send or confirm delivery.');window.location.href=mailto;};
 const copy=async()=>{if(!validate())return;try{await navigator.clipboard.writeText(`To: ${config.email}\nSubject: ${subject.trim()||'Portfolio enquiry'}\n\n${body}`);setNotice('Message copied. Paste it into your email app, review it and send.');}catch{setError('Clipboard access is unavailable. Select and copy the draft below.');}};
 const input='w-full min-h-[44px] p-3 rounded-lg border border-foreground/25 bg-background text-foreground';
 return <section id="contact-form" className="py-20 border-t border-foreground/15 scroll-mt-20"><div className="max-w-6xl mx-auto px-4 sm:px-6">
 <p className="text-primary text-xs font-mono uppercase">Contact</p><h2 className="text-3xl font-bold mt-3">Let’s work together.</h2><p className="text-muted-foreground mt-3 max-w-2xl">Have an opportunity or a project in mind? Prepare a message, then send it from your email app.</p>
 <div className="grid lg:grid-cols-2 gap-8 mt-8"><div className="rounded-xl border border-foreground/20 bg-card p-6 space-y-5"><h3 className="font-bold">Direct channels</h3>
 <a id="contact-channel-email" className="flex items-center gap-3 underline break-all min-h-[44px]" href={`mailto:${config.email}`}><Mail className="w-5 h-5 shrink-0"/>{config.email}</a>
 {[[config.linkedin,'LinkedIn','linkedin'],[config.github,'GitHub','github']].map(([url,label,id])=><a key={id} id={`contact-channel-${id}`} className="flex gap-3 items-center underline min-h-[44px]" href={url} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-5 h-5"/>{label}</a>)}
 <p className="text-sm text-muted-foreground">{config.location}</p><p className="text-sm text-muted-foreground">The form keeps your draft in this browser tab. No message is uploaded to a third-party form service.</p></div>
 <form onSubmit={compose} noValidate className="rounded-xl border border-foreground/20 bg-card p-6 space-y-4">
 <div className="grid sm:grid-cols-2 gap-4"><label className="text-sm">Your name<input id="contact-name" autoComplete="name" required maxLength={100} className={input} value={name} onChange={e=>setName(e.target.value)}/></label><label className="text-sm">Reply email<input id="contact-email" type="email" autoComplete="email" required maxLength={120} className={input} value={email} onChange={e=>setEmail(e.target.value)}/></label></div>
 <label className="block text-sm">Subject<input id="contact-subject" maxLength={140} className={input} value={subject} onChange={e=>setSubject(e.target.value)}/></label><label className="block text-sm">Message<textarea id="contact-message" required maxLength={1500} rows={6} className={input} value={message} onChange={e=>setMessage(e.target.value)}/></label>
 {error&&<p role="alert" className="text-sm text-rose-700 dark:text-rose-300">{error}</p>}{notice&&<p role="status" className="text-sm">{notice}</p>}
 <div className="flex flex-wrap gap-3"><button type="submit" className="min-h-[44px] px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold">Open email draft</button><button type="button" onClick={copy} className="flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border border-foreground/30"><Copy className="w-4 h-4"/>Copy message</button></div>
 <p className="text-xs text-muted-foreground">You send the email yourself. Delivery depends on your email service.</p><details><summary className="cursor-pointer text-sm">View draft for manual copying</summary><pre className="whitespace-pre-wrap break-words mt-3 text-xs">{`To: ${config.email}\nSubject: ${subject.trim()||'Portfolio enquiry'}\n\n${body}`}</pre></details>
 </form></div></div></section>;
};
