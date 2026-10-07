import React from 'react';
export function LabButton({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
 return <button type="button" className={`border border-foreground/25 px-4 py-2 min-h-11 rounded-lg text-sm hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary ${className}`} {...props}>{children}</button>;
}
export function LabMetrics({values}: {values:[string, string | number][]}) {
 return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{values.map(([label,value])=><article key={label} className="min-w-0 border border-foreground/15 rounded-xl p-4 bg-card"><p className="text-xs text-muted-foreground">{label}</p><p className="text-2xl sm:text-3xl font-bold mt-2" aria-live="polite">{value}</p></article>)}</div>;
}
export function LabBars({title, values}: {title:string; values:{label:string; value:number}[]}) {
 const max=Math.max(1,...values.map(v=>v.value));
 return <article className="min-w-0 rounded-xl border border-foreground/15 p-5 bg-card"><h4 className="font-bold mb-5">{title}</h4><div className="space-y-3">{values.map(v=><div key={v.label}><div className="flex justify-between gap-3 text-sm mb-1"><span>{v.label}</span><strong>{v.value}</strong></div><div aria-hidden="true" className="h-3 rounded bg-foreground/10"><div className="h-full rounded bg-primary transition-all" style={{width:`${v.value/max*100}%`}}/></div></div>)}</div></article>;
}
export function LabCaseStudy(props: {problem:string;data:string;approach:string;results:string;learning:string;limitations:string;source:string}) {
 const entries = [['Problem',props.problem],['Data',props.data],['Approach & tools',props.approach+' Built with React and TypeScript.'],['Delivered',props.results],['What I learned',props.learning],['Limitations',props.limitations]];
 return <details className="mt-6 p-5 border border-foreground/20 rounded-xl"><summary className="font-bold cursor-pointer min-h-8">Read case study & inspect source</summary><div className="mt-4 grid md:grid-cols-2 gap-5 text-sm">{entries.map(([h,t])=><div key={h}><h4 className="font-bold">{h}</h4><p className="mt-2 text-muted-foreground">{t}</p></div>)}</div><a className="mt-5 inline-block underline text-sm" href={`https://github.com/kikibillz/buildwithope/blob/fix/portfolio-credibility-and-demos/${props.source}`} target="_blank" rel="noopener noreferrer">Read this tool’s source code</a></details>;
}
