export const departments = ['Engineering', 'Operations', 'Sales', 'People'] as const;
export const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
// Fictional monthly snapshots: opening + hires - exits = closing.
export const workforce = departments.flatMap((department, d) => {
  let opening = [28, 35, 22, 8][d];
  return months.map((month, m) => {
    const hires = 1 + ((d + m) % 4), exits = (d * 2 + m) % 3;
    const row = { department, month, opening, hires, exits, closing: opening + hires - exits };
    opening = row.closing;
    return row;
  });
});
export const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Closed'] as const;
export type Stage = typeof stages[number];
export const candidates = Array.from({ length: 24 }, (_, i) => ({ id: `C${String(i + 1).padStart(3, '0')}`, department: departments[i % 4], role: ['Data Analyst', 'Operations Associate', 'Sales Executive', 'HR Coordinator'][i % 4], stage: stages[Math.floor(i / 4)] as Stage, days: 2 + ((i * 7) % 24), source: ['Referral', 'LinkedIn', 'Job board'][i % 3] }));
export function summarize(rows: typeof workforce) {
  const selectedMonths = months.filter(m => rows.some(r => r.month === m));
  const first = rows.filter(r => r.month === selectedMonths[0]), last = rows.filter(r => r.month === selectedMonths[selectedMonths.length - 1]);
  const opening = first.reduce((s,r) => s+r.opening,0), closing = last.reduce((s,r)=>s+r.closing,0);
  const exits = rows.reduce((s,r)=>s+r.exits,0), hires = rows.reduce((s,r)=>s+r.hires,0);
  const average = selectedMonths.length ? rows.reduce((s,r)=>s+(r.opening+r.closing)/2,0)/selectedMonths.length : 0;
  return { opening, closing, exits, hires, turnover: average ? exits/average*100 : 0 };
}
export function csv(rows: Record<string, unknown>[]) {
  if (!rows.length) return '';
  const keys = Object.keys(rows[0]);
  const escape = (v: unknown) => '"'+(/^[\s]*[=+\-@]/.test(String(v ?? '')) ? "'" + String(v ?? '') : String(v ?? '')).replace(/"/g, '""')+'"';
  return [keys.map(escape).join(','), ...rows.map(r=>keys.map(k=>escape(r[k])).join(','))].join('\r\n');
}
