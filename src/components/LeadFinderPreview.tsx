import React, { useState } from 'react';
import { Terminal, Database, FileSpreadsheet, Play, CheckCircle2, ArrowRight } from 'lucide-react';

export const LeadFinderPreview: React.FC = () => {
  const [maxPages, setMaxPages] = useState<number>(2);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [outputRows, setOutputRows] = useState<number>(20);

  const handleSimulateFetch = () => {
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      setOutputRows(maxPages * 10);
    }, 500);
  };

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 sm:p-5 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-stone-200">
        <div>
          <span className="text-xs font-mono font-medium text-stone-600 uppercase tracking-wider">
            Automated API Pipeline (`main.py`)
          </span>
          <h4 className="text-sm font-semibold text-stone-900">
            CQC Public API Care Provider Scraper &amp; CSV Exporter
          </h4>
        </div>
        <span className="text-[11px] font-mono bg-stone-200/80 text-stone-700 px-2 py-0.5 rounded">
          Python Requests + CSV
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pipeline Controls & Code Snippet */}
        <div className="space-y-3">
          <div className="bg-[#18181b] text-stone-300 p-3 rounded font-mono text-[11px] space-y-1 overflow-x-auto">
            <div className="text-stone-400"># API Endpoint &amp; Pagination Loop</div>
            <div>
              <span className="text-purple-400">CQC_API_URL</span> ={' '}
              <span className="text-emerald-400">&quot;https://api.cqc.org.uk/public/v1/locations&quot;</span>
            </div>
            <div>
              <span className="text-purple-400">response</span> = requests.get(CQC_API_URL, params={`{`}&quot;page&quot;: page, &quot;perPage&quot;: 10{`}`})
            </div>
            <div>
              locations = response.json().get(<span className="text-emerald-400">&quot;locations&quot;</span>, [])
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-medium text-stone-700">Pages to fetch:</span>
              <select
                value={maxPages}
                onChange={(e) => setMaxPages(parseInt(e.target.value))}
                aria-label="Pages to fetch"
                className="bg-white border border-stone-300 rounded px-2 py-1 text-stone-800 text-xs font-mono"
              >
                <option value={1}>1 page (10 records)</option>
                <option value={2}>2 pages (20 records)</option>
                <option value={4}>4 pages (40 records)</option>
              </select>
            </div>

            <button
              onClick={handleSimulateFetch}
              disabled={isFetching}
              className="inline-flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors disabled:opacity-50"
            >
              <Play className={`w-3 h-3 ${isFetching ? 'animate-spin' : ''}`} />
              <span>{isFetching ? 'Querying API...' : 'Run Pipeline'}</span>
            </button>
          </div>
        </div>

        {/* Output structured data table preview */}
        <div className="bg-white border border-stone-200 rounded-lg p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-medium text-stone-700 flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-stone-500" />
                <span>Extracted Schema Output (CSV)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                {outputRows} rows processed
              </span>
            </div>

            <div className="overflow-x-auto text-[10px] font-mono">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500">
                    <th className="pb-1 pr-2">location_id</th>
                    <th className="pb-1 pr-2">provider_name</th>
                    <th className="pb-1 pr-2">region</th>
                    <th className="pb-1 text-right">status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  <tr>
                    <td className="py-1 pr-2 text-stone-500">1-100032</td>
                    <td className="py-1 pr-2 font-medium">St. Jude Care Hub</td>
                    <td className="py-1 pr-2">London</td>
                    <td className="py-1 text-right text-emerald-600">Active</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-2 text-stone-500">1-100084</td>
                    <td className="py-1 pr-2 font-medium">Meadow Health Ltd</td>
                    <td className="py-1 pr-2">Yorkshire</td>
                    <td className="py-1 text-right text-emerald-600">Active</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-2 text-stone-500">1-100119</td>
                    <td className="py-1 pr-2 font-medium">Cedar Senior Res.</td>
                    <td className="py-1 pr-2">Midlands</td>
                    <td className="py-1 text-right text-emerald-600">Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 text-[10px] font-mono text-stone-500 flex justify-between items-center">
            <span>Encoding: UTF-8 with RFC 4180 quotes</span>
            <span>Automated CSV output</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-stone-200 text-xs text-stone-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="italic">
          Real repository script: queries official healthcare provider registers with rate limiting and automated CSV serialization.
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
          Open Data Compliant • Zero Patient PII
        </span>
      </div>
    </div>
  );
};
