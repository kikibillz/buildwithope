import React, { useState, useMemo } from 'react';
import { Table, FileSpreadsheet, Code2, Download, Plus, Trash2, CheckCircle2, Clock, AlertCircle, Copy, Check } from 'lucide-react';

interface LedgerRow {
  id: string;
  date: string;
  invoiceNo: string;
  clientName: string;
  projectDescription: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  grossAmount: number;
}

const INITIAL_ROWS: LedgerRow[] = [
  {
    id: 'row-1',
    date: '2026-08-12',
    invoiceNo: 'INV-1042',
    clientName: 'Nexus Fintech Ltd',
    projectDescription: 'FastAPI ML Risk Pipeline REST Service',
    status: 'Paid',
    grossAmount: 4500,
  },
  {
    id: 'row-2',
    date: '2026-08-28',
    invoiceNo: 'INV-1043',
    clientName: 'Crestview Media Group',
    projectDescription: 'Commercial AI Video Direction (Veo 3 & Runway)',
    status: 'Paid',
    grossAmount: 3200,
  },
  {
    id: 'row-3',
    date: '2026-09-05',
    invoiceNo: 'INV-1044',
    clientName: 'Stratford Logistics',
    projectDescription: 'Predictive Churn Classifier & Streamlit Deployment',
    status: 'Pending',
    grossAmount: 2800,
  },
  {
    id: 'row-4',
    date: '2026-09-14',
    invoiceNo: 'INV-1045',
    clientName: 'Apex Talent Africa',
    projectDescription: 'HR Analytics Attrition Model & Pipeline',
    status: 'Paid',
    grossAmount: 1950,
  },
];

export const AutomatedSpreadsheetPreview: React.FC = () => {
  const [rows, setRows] = useState<LedgerRow[]>(INITIAL_ROWS);
  const [activeTab, setActiveTab] = useState<'sheet' | 'python'>('sheet');
  const [copiedCode, setCopiedCode] = useState(false);

  // Dynamic calculations: 20% tax withholding and net income
  const calculatedRows = useMemo(() => {
    return rows.map((r) => {
      const taxWithholding = r.grossAmount * 0.20;
      const netIncome = r.grossAmount - taxWithholding;
      return {
        ...r,
        taxWithholding,
        netIncome,
      };
    });
  }, [rows]);

  // Financial summary calculations
  const totalGross = useMemo(() => calculatedRows.reduce((sum, r) => sum + r.grossAmount, 0), [calculatedRows]);
  const totalTax = useMemo(() => calculatedRows.reduce((sum, r) => sum + r.taxWithholding, 0), [calculatedRows]);
  const totalNet = useMemo(() => calculatedRows.reduce((sum, r) => sum + r.netIncome, 0), [calculatedRows]);

  const handleAddRow = () => {
    const newNo = `INV-10${46 + rows.length}`;
    const today = new Date().toISOString().split('T')[0];
    const newRow: LedgerRow = {
      id: `row-${Date.now()}`,
      date: today,
      invoiceNo: newNo,
      clientName: 'New Client Enterprise',
      projectDescription: 'Data Engineering & Automated ETL Workflow',
      status: 'Pending',
      grossAmount: 2500,
    };
    setRows([...rows, newRow]);
  };

  const handleUpdateAmount = (id: string, value: number) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, grossAmount: isNaN(value) ? 0 : value } : r)));
  };

  const handleUpdateStatus = (id: string, status: 'Paid' | 'Pending' | 'Overdue') => {
    setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const handleDeleteRow = (id: string) => {
    if (rows.length <= 1) return;
    setRows(rows.filter((r) => r.id !== id));
  };

  const handleDownloadCsv = () => {
    let csvContent = 'Date,Invoice #,Client Name,Project Description,Status,Gross Amount ($),Tax Withholding (20%),Net Income ($),,,Financial Summary,\n';
    calculatedRows.forEach((r, index) => {
      let extraCols = '';
      if (index === 0) extraCols = `,,Total Gross:,$${totalGross.toFixed(2)}`;
      else if (index === 1) extraCols = `,,Total Tax:,$${totalTax.toFixed(2)}`;
      else if (index === 2) extraCols = `,,Total Net:,$${totalNet.toFixed(2)}`;

      csvContent += `"${r.date}","${r.invoiceNo}","${r.clientName}","${r.projectDescription}","${r.status}",$${r.grossAmount.toFixed(2)},$${r.taxWithholding.toFixed(2)},$${r.netIncome.toFixed(2)}${extraCols}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'client_financial_ledger_withholding.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pythonScript = `"""
generate_client_ledger.py
Automated Python Script for generating structured Excel and Google Sheets
Financial Ledgers with dynamic 20% tax withholdings, currency formatting, and summary calculations.
Author: Opeyemi Opamiju | Data Science & Python Development
"""

import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def build_client_ledger(invoices_data, output_filename="client_financial_ledger.xlsx"):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Financial Summary"

    # Header Schema
    headers = [
        "Date", "Invoice #", "Client Name", "Project Description",
        "Status", "Gross Amount ($)", "Tax Withholding (20%)", "Net Income ($)"
    ]

    header_fill = PatternFill(start_color="1E293B", end_color="1E293B", fill_type="solid")
    header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    align_center = Alignment(horizontal="center", vertical="center")
    align_right = Alignment(horizontal="right", vertical="center")
    currency_format = '"$"#,##0.00'

    # Write Headers
    for col_num, header in enumerate(headers, 1):
        cell = ws.cell(row=1, column=col_num, value=header)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = align_center

    # Write Data Rows & Dynamic Excel Formulas
    start_row = 2
    for idx, inv in enumerate(invoices_data, start=start_row):
        ws.cell(row=idx, column=1, value=inv["date"])
        ws.cell(row=idx, column=2, value=inv["invoice_no"]).alignment = align_center
        ws.cell(row=idx, column=3, value=inv["client_name"])
        ws.cell(row=idx, column=4, value=inv["description"])
        ws.cell(row=idx, column=5, value=inv["status"]).alignment = align_center

        # Gross Amount
        gross_cell = ws.cell(row=idx, column=6, value=inv["gross_amount"])
        gross_cell.number_format = currency_format

        # Dynamic Formula: Tax Withholding (20%) = F{idx} * 0.20
        tax_cell = ws.cell(row=idx, column=7, value=f"=F{idx}*0.20")
        tax_cell.number_format = currency_format

        # Dynamic Formula: Net Income ($) = F{idx} - G{idx}
        net_cell = ws.cell(row=idx, column=8, value=f"=F{idx}-G{idx}")
        net_cell.number_format = currency_format

    last_data_row = start_row + len(invoices_data) - 1

    # Write Financial Summary Block (Columns J & K)
    summary_headers = ["Financial Summary", ""]
    summary_fill = PatternFill(start_color="0F766E", end_color="0F766E", fill_type="solid")
    sum_title_cell = ws.cell(row=1, column=11, value="Financial Summary")
    sum_title_cell.fill = summary_fill
    sum_title_cell.font = header_font

    ws.cell(row=2, column=11, value="Total Gross:").font = Font(bold=True)
    ws.cell(row=2, column=12, value=f"=SUM(F2:F{last_data_row})").number_format = currency_format

    ws.cell(row=3, column=11, value="Total Tax:").font = Font(bold=True)
    ws.cell(row=3, column=12, value=f"=SUM(G2:G{last_data_row})").number_format = currency_format

    ws.cell(row=4, column=11, value="Total Net:").font = Font(bold=True)
    ws.cell(row=4, column=12, value=f"=SUM(H2:H{last_data_row})").number_format = currency_format

    # Auto-fit Column Widths
    for col in ws.columns:
        max_len = max(len(str(cell.value or '')) for cell in col)
        col_letter = get_column_letter(col[0].column)
        ws.column_dimensions[col_letter].width = max(max_len + 3, 12)

    wb.save(output_filename)
    print(f"Successfully generated {output_filename}")

if __name__ == "__main__":
    # Sample execution data
    sample_invoices = [
        {"date": "2026-08-12", "invoice_no": "INV-1042", "client_name": "Nexus Fintech Ltd", "description": "FastAPI ML Pipeline", "status": "Paid", "gross_amount": 4500},
        {"date": "2026-08-28", "invoice_no": "INV-1043", "client_name": "Crestview Media Group", "description": "Commercial AI Video Direction", "status": "Paid", "gross_amount": 3200},
        {"date": "2026-09-05", "invoice_no": "INV-1044", "client_name": "Stratford Logistics", "description": "Predictive Churn Model", "status": "Pending", "gross_amount": 2800},
        {"date": "2026-09-14", "invoice_no": "INV-1045", "client_name": "Apex Talent Africa", "description": "HR Analytics System", "status": "Paid", "gross_amount": 1950}
    ]
    build_client_ledger(sample_invoices)
`;

  const copyPythonCode = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm">
      {/* Top Toolbar */}
      <div className="p-4 sm:p-5 bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>Client Ledger &amp; Tax Withholding Workbook</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Python + Excel / Sheets
              </span>
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 font-mono">
              Formula: Tax = Gross * 0.20 | Net = Gross - Tax | Dynamic SUM Reconciliation
            </div>
          </div>
        </div>

        {/* View switcher & Actions */}
        <div className="flex items-center gap-2">
          <div className="flex bg-stone-200/80 dark:bg-stone-800 p-0.5 rounded-lg text-xs font-mono">
            <button
              onClick={() => setActiveTab('sheet')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'sheet'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Interactive Sheet</span>
            </button>
            <button
              onClick={() => setActiveTab('python')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'python'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Python Script</span>
            </button>
          </div>

          <button
            onClick={handleDownloadCsv}
            title="Download CSV Ledger matching user schema"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {activeTab === 'sheet' ? (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Main Grid: Spreadsheet Table + Financial Summary Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Spreadsheet Table (Left 8-9 cols) */}
            <div className="lg:col-span-8 xl:col-span-9 overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-lg shadow-xs">
              <table className="w-full text-left text-xs font-mono border-collapse min-w-[750px]">
                <thead>
                  <tr className="bg-stone-900 text-stone-100 border-b border-stone-800 text-[11px] uppercase tracking-wider">
                    <th className="p-2.5 pl-3 font-semibold">Date</th>
                    <th className="p-2.5 font-semibold">Invoice #</th>
                    <th className="p-2.5 font-semibold">Client Name</th>
                    <th className="p-2.5 font-semibold">Project Description</th>
                    <th className="p-2.5 font-semibold text-center">Status</th>
                    <th className="p-2.5 text-right font-semibold">Gross ($)</th>
                    <th className="p-2.5 text-right font-semibold text-amber-300">Tax (20%)</th>
                    <th className="p-2.5 text-right font-semibold text-emerald-300">Net ($)</th>
                    <th className="p-2.5 text-center font-semibold w-10">Act</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 bg-white dark:bg-stone-950">
                  {calculatedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                      <td className="p-2.5 pl-3 text-stone-600 dark:text-stone-400 whitespace-nowrap">{row.date}</td>
                      <td className="p-2.5 font-bold text-stone-900 dark:text-stone-200 whitespace-nowrap">{row.invoiceNo}</td>
                      <td className="p-2.5 text-stone-800 dark:text-stone-200 font-medium whitespace-nowrap">{row.clientName}</td>
                      <td className="p-2.5 text-stone-600 dark:text-stone-400 truncate max-w-xs">{row.projectDescription}</td>
                      <td className="p-2.5 text-center whitespace-nowrap">
                        <select
                          value={row.status}
                          onChange={(e) => handleUpdateStatus(row.id, e.target.value as any)}
                          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border cursor-pointer focus:outline-none ${
                            row.status === 'Paid'
                              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                              : row.status === 'Pending'
                              ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                              : 'bg-red-50 text-red-800 dark:bg-red-950/80 dark:text-red-300 border-red-300 dark:border-red-800'
                          }`}
                        >
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending</option>
                          <option value="Overdue">Overdue</option>
                        </select>
                      </td>
                      <td className="p-2.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <span className="text-stone-400">$</span>
                          <input
                            type="number"
                            value={row.grossAmount}
                            onChange={(e) => handleUpdateAmount(row.id, parseFloat(e.target.value))}
                            className="w-20 text-right bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded px-1.5 py-0.5 font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          />
                        </div>
                      </td>
                      <td className="p-2.5 text-right font-medium text-amber-700 dark:text-amber-400 whitespace-nowrap">
                        ${row.taxWithholding.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="p-2.5 text-right font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                        ${row.netIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="p-2.5 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteRow(row.id)}
                          disabled={rows.length <= 1}
                          className="text-stone-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors"
                          title="Delete row"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Table Footer Actions */}
              <div className="p-2.5 bg-stone-50 dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <button
                  onClick={handleAddRow}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white px-2.5 py-1 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Add Invoice Row</span>
                </button>
                <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                  {rows.length} total invoice entries
                </div>
              </div>
            </div>

            {/* Financial Summary Card (Exact user structure: Total Gross, Total Tax, Total Net) */}
            <div className="lg:col-span-4 xl:col-span-3 bg-stone-50 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 rounded-lg p-4 sm:p-5 shadow-xs">
              <div className="border-b border-stone-200 dark:border-stone-800 pb-3 mb-4 flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase font-bold text-stone-900 dark:text-stone-100 tracking-wider">
                  Financial Summary
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  Live SUM
                </span>
              </div>

              <div className="space-y-3 font-mono">
                <div className="flex items-center justify-between py-1.5 border-b border-stone-200/60 dark:border-stone-800/80">
                  <span className="text-xs text-stone-600 dark:text-stone-400 font-medium">Total Gross:</span>
                  <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    ${totalGross.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-stone-200/60 dark:border-stone-800/80">
                  <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">Total Tax (20%):</span>
                  <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                    ${totalTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">Total Net:</span>
                  <span className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                    ${totalNet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Rule: 20% statutory withholding</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Formulas: OpenPyXL / Sheets SUM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Python Script Inspector */
        <div className="p-4 sm:p-6 bg-stone-950 text-stone-100 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-stone-400 text-xs">
            <span>generate_client_ledger.py (OpenPyXL / Pandas / Google Sheets API)</span>
            <button
              onClick={copyPythonCode}
              className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-white bg-stone-800 px-2.5 py-1 rounded transition-colors cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy Script'}</span>
            </button>
          </div>
          <pre className="overflow-x-auto max-h-96 p-3 bg-stone-900/80 rounded-lg text-[11px] leading-relaxed text-stone-300">
            {pythonScript}
          </pre>
        </div>
      )}
    </div>
  );
};
