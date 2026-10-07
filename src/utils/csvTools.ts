export type CsvTable = { headers: string[]; rows: string[][] };
export const messySample = 'candidate_id,name,email,department,stage\nC001,  Ada Example  ,ADA@EXAMPLE.COM, People ,Applied\nC002,Sam Example,sam@example.com,Sales,Screening\nC001,  Ada Example  ,ADA@EXAMPLE.COM, People ,Applied\nC003, Lee Example,,Engineering,Interview\nC004, Jo Example,jo@example.com,Operations,\n';
// Comma-separated CSV, including escaped quotes, quoted commas and embedded newlines.
export function parseCsv(input: string): CsvTable {
  if (input.length > 1_000_000) throw Error('Use a CSV smaller than 1 MB.');
  const text = input.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const records: string[][] = []; let row: string[] = [], cell = '', quoted = false, afterQuote = false;
  const field = () => { row.push(cell); cell = ''; afterQuote = false; };
  const record = () => { field(); if (row.some(v => v.trim())) records.push(row); row = []; };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else { quoted = false; afterQuote = true; } }
      else cell += c;
    } else if (c === ',') field();
    else if (c === '\n') record();
    else if (c === '"') { if (cell || afterQuote) throw Error('Unexpected quote in CSV. Quote the entire field.'); quoted = true; }
    else { if (afterQuote) throw Error('Unexpected characters after a quoted field.'); cell += c; }
  }
  if (quoted) throw Error('Unclosed quoted field. Check your CSV.');
  if (cell || row.length || afterQuote) record();
  if (!records.length) throw Error('The CSV is empty. Include a header row.');
  const headers = records[0].map(h => h.trim());
  if (headers.some(h => !h) || new Set(headers.map(h => h.toLowerCase())).size !== headers.length) throw Error('Every column needs a unique, non-empty heading.');
  if (headers.length > 50 || records.length > 5001) throw Error('Use at most 50 columns and 5,000 data rows.');
  const rows = records.slice(1);
  const bad = rows.findIndex(r => r.length !== headers.length);
  if (bad >= 0) throw Error(`Data row ${bad + 1} has ${rows[bad].length} fields; expected ${headers.length}. No data was changed.`);
  return { headers, rows };
}
export function exportCsv(table: CsvTable) {
  const escape = (s: string) => { const safe = /^[\s]*[=+\-@]/.test(s) ? "'" + s : s; return '"' + safe.replace(/"/g, '""') + '"'; };
  return [table.headers, ...table.rows].map(r => r.map(escape).join(',')).join('\r\n');
}
export function cleanCsv(table: CsvTable, removeDuplicates: boolean) {
  const emailColumns = table.headers.map((h, i) => /(^|[_\s])email($|[_\s])|^emailaddress$/i.test(h) ? i : -1).filter(i => i >= 0);
  let changedCells = 0, duplicates = 0;
  const seen = new Set<string>(); const audit: string[][] = []; const rows: string[][] = [];
  table.rows.forEach((raw, index) => {
    const cleaned = raw.map((v, col) => {
      let value = v.trim(); if (emailColumns.includes(col)) value = value.toLowerCase();
      if (v !== value) { changedCells++; audit.push([String(index + 1), table.headers[col], 'normalised', v, value]); }
      return value;
    });
    const key = JSON.stringify(cleaned);
    if (seen.has(key)) { duplicates++; audit.push([String(index + 1), '(row)', removeDuplicates ? 'exact duplicate removed' : 'exact duplicate flagged', '', '']); if (removeDuplicates) return; }
    seen.add(key); rows.push(cleaned);
    cleaned.forEach((v, col) => { if (!v) audit.push([String(index + 1), table.headers[col], 'missing value: retained for review', '', '']); });
  });
  return { table: { headers: table.headers, rows }, changedCells, duplicates, missing: rows.reduce((n,r)=>n+r.filter(v=>!v).length,0), audit: { headers: ['source_data_row','column','action','before','after'], rows: audit } };
}
export function downloadText(name: string, contents: string, type = 'text/csv;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
