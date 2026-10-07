import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { HrWorkLab } from '../src/components/HrWorkLab';
const dom = new JSDOM('<!doctype html><div id="root"></div>', {url:'https://example.com/'});
Object.assign(globalThis,{window:dom.window,document:dom.window.document,HTMLElement:dom.window.HTMLElement,IS_REACT_ACT_ENVIRONMENT:true});
const { createRoot } = await import('react-dom/client');
const root=createRoot(document.getElementById('root')!);
const downloads:{name:string;blob:Blob}[]=[];let pending:Blob;
URL.createObjectURL=(blob:Blob)=>{pending=blob;return 'blob:local';}; URL.revokeObjectURL=()=>{};
dom.window.HTMLAnchorElement.prototype.click=function(){downloads.push({name:this.download,blob:pending});};
const text=()=>document.body.textContent!;
function button(name:string){const b=[...document.querySelectorAll('button')].find(x=>x.textContent===name);assert.ok(b,`Missing button ${name}`);return b;}
async function click(name:string){await act(async()=>button(name).click());}
async function select(label:string,value:string){const el=document.querySelector(`[aria-label="${label}"]`) as HTMLSelectElement;assert.ok(el,label);await act(async()=>{el.value=value;el.dispatchEvent(new dom.window.Event('change',{bubbles:true}));});}
await act(async()=>root.render(<HrWorkLab/>));
assert.match(text(),/Closing headcount129/);
await select('Department','People');assert.match(text(),/Closing headcount17/);
await select('From month','4');assert.match(text(),/Opening \+ hires − exits = closing: 15 \+ 5 − 3 = 17/);
await click('Export workforce CSV');assert.equal(downloads.at(-1)?.name,'workforce-report.csv');
await select('Department','All');await click('Recruitment tracker');
await select('Role filter','HR Coordinator');assert.match(text(),/Applications in scope6/);
await select('Role filter','All');await select('Stage for C001','Hired');assert.match(text(),/Hired5/);
await click('Export weekly handover');assert.match(await downloads.at(-1)!.blob.text(),/Active: 15/);
await click('Reset sample');assert.match(text(),/Active applications16/);
await click('Onboarding tracker');assert.match(text(),/Overdue starters2/);
const task=document.querySelector('[aria-label="Equipment ready for E001"]') as HTMLInputElement;
await act(async()=>task.click());assert.equal(task.checked,true);
await act(async()=>(document.querySelector('[aria-label="Orientation complete for E001"]') as HTMLInputElement).click());assert.match(text(),/Overdue starters1/);
await click('Export onboarding checklist');assert.match(await downloads.at(-1)!.blob.text(),/E001.*Complete/);
await click('Spreadsheet cleanup');assert.match(text(),/Input records5/);
const checkbox=[...document.querySelectorAll('input[type="checkbox"]')][0] as HTMLInputElement;
await act(async()=>checkbox.click());assert.match(text(),/Output records4/);
await click('Download cleaned CSV');assert.match(await downloads.at(-1)!.blob.text(),/ada@example.com/);
await click('Download change report');assert.match(await downloads.at(-1)!.blob.text(),/exact duplicate removed/);
const input=document.querySelector('[aria-label="CSV input"]') as HTMLTextAreaElement;
await act(async()=>{Object.getOwnPropertyDescriptor(dom.window.HTMLTextAreaElement.prototype,'value')!.set!.call(input,'a,b\n1,2,3');input.dispatchEvent(new dom.window.Event('input',{bubbles:true}));});
assert.match(document.querySelector('[role="alert"]')!.textContent!,/expected 2/);
assert.ok(![...document.querySelectorAll('button')].some(b=>b.textContent==='Download cleaned CSV'));
await click('Load messy sample');
const upload=document.querySelector('[aria-label="Upload CSV"]') as HTMLInputElement;
Object.defineProperty(upload,'files',{configurable:true,value:[{size:25,text:async()=>'id,email\nA, A@EXAMPLE.COM'}]});
await act(async()=>upload.dispatchEvent(new dom.window.Event('change',{bubbles:true})));
assert.match(text(),/a@example.com/);

await act(async()=>{window.location.hash='#hr-lab-onboarding';window.dispatchEvent(new dom.window.HashChangeEvent('hashchange'));});
assert.ok(button('Onboarding tracker').getAttribute('aria-pressed')==='true');
await act(async()=>root.unmount());
console.log('Passed DOM interactions: department/date filters, stage edits, role filter, recruitment exports/reset, onboarding ticks/export, cleanup dedupe/exports and deep-link navigation.');
