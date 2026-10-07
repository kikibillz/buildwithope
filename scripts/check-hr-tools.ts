import assert from 'node:assert/strict';
import { parseCsv, cleanCsv, exportCsv, messySample } from '../src/utils/csvTools';
import { departments, months, workforce, summarize, candidates } from '../src/data/hrDemo';
import { onboardingSample, onboardingSummary } from '../src/data/onboardingDemo';
const sample=parseCsv(messySample);
assert.equal(sample.rows.length,5);
const retained=cleanCsv(sample,false),removed=cleanCsv(sample,true);
assert.equal(retained.table.rows.length,5);assert.equal(removed.table.rows.length,4);assert.equal(removed.duplicates,1);assert.equal(removed.missing,2);
assert.equal(removed.table.rows[0][2],'ada@example.com');
assert.equal(removed.table.rows[2][2],'');
assert.equal(parseCsv('a,b\n"with, comma","line1\nline2"\n').rows[0][1],'line1\nline2');
assert.equal(parseCsv('a,b\n"say ""hi""",yes').rows[0][0],'say "hi"');
assert.equal(parseCsv('\uFEFFa,b\r\n1,2\r\n').rows.length,1);
for(const text of ['a,a\n1,2','a,b\n1,2,3','a,b\n"open,2','a,b\n"closed"x,2','a,\n1,2'])assert.throws(()=>parseCsv(text));
assert.match(exportCsv({headers:['value'],rows:[['=SUM(A1)'],['@cmd']]}),/'=SUM/);
assert.deepEqual(parseCsv(exportCsv(sample)),sample);
for(const d of ['All',...departments])for(let start=0;start<months.length;start++)for(let end=start;end<months.length;end++){
 const rows=workforce.filter(r=>(d==='All'||r.department===d)&&months.slice(start,end+1).includes(r.month));
 const s=summarize(rows);assert.equal(s.opening+s.hires-s.exits,s.closing);
 const independently=rows.reduce((sum,r)=>sum+(r.opening+r.closing)/2,0)/(end-start+1);
 assert.ok(Math.abs(s.turnover-(s.exits/independently*100))<1e-9);
}
assert.equal(summarize([]).turnover,0);assert.equal(new Set(candidates.map(c=>c.id)).size,candidates.length);
assert.equal(onboardingSummary(onboardingSample,'2026-10-07').overdue,2);
assert.equal(onboardingSummary(onboardingSample,'2026-10-07').complete,2);
assert.equal(onboardingSummary(onboardingSample,'2026-10-05').overdue,0);
assert.equal(onboardingSummary([],'2026-10-07').completion,0);
console.log('Passed: CSV parsing/validation/escaping/cleanup, all 105 department-period combinations, onboarding dates and empty cases.');
