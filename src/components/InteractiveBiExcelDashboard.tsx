import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart3,
  FileSpreadsheet,
  Download,
  Sliders,
  Filter,
  CheckCircle2,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Calculator,
  X,
  Search,
  Users,
  DollarSign,
  Clock,
  Briefcase,
  Layers,
  ChevronRight,
  Database,
  Check,
  PieChart,
  Target,
  ArrowUpRight,
  Maximize2,
  Minimize2,
  Table,
} from 'lucide-react';

export type DashboardMode =
  | 'powerbi_hr'
  | 'powerbi_sales'
  | 'excel_pivot'
  | 'churn_fintech'
  | 'whatif';

interface EmployeeRecord {
  id: string;
  name: string;
  role: string;
  department: 'Research & Development' | 'Sales' | 'Human Resources';
  monthlyIncome: number;
  overtime: 'Yes' | 'No';
  jobSatisfaction: 1 | 2 | 3 | 4;
  tenureYears: number;
  stockOptionLevel: 0 | 1 | 2 | 3;
  predictedRiskPct: number;
  flightRiskTier: 'High' | 'Medium' | 'Low';
  replacementCost: number;
  keyRiskSignal: string;
}

const SAMPLE_HR_DATA: EmployeeRecord[] = [
  {
    id: 'EMP-0142',
    name: 'Marcus Vance',
    role: 'Laboratory Technician',
    department: 'Research & Development',
    monthlyIncome: 2850,
    overtime: 'Yes',
    jobSatisfaction: 1,
    tenureYears: 1.8,
    stockOptionLevel: 0,
    predictedRiskPct: 88.4,
    flightRiskTier: 'High',
    replacementCost: 17100,
    keyRiskSignal: 'Mandatory Overtime + Low Base Pay',
  },
  {
    id: 'EMP-0219',
    name: 'Sophia Chen',
    role: 'Sales Representative',
    department: 'Sales',
    monthlyIncome: 3420,
    overtime: 'Yes',
    jobSatisfaction: 2,
    tenureYears: 2.1,
    stockOptionLevel: 0,
    predictedRiskPct: 84.1,
    flightRiskTier: 'High',
    replacementCost: 20520,
    keyRiskSignal: 'Overtime + Zero Equity Grant',
  },
  {
    id: 'EMP-0388',
    name: 'Adekunle Adeleke',
    role: 'Research Scientist',
    department: 'Research & Development',
    monthlyIncome: 6890,
    overtime: 'Yes',
    jobSatisfaction: 2,
    tenureYears: 3.5,
    stockOptionLevel: 1,
    predictedRiskPct: 76.5,
    flightRiskTier: 'High',
    replacementCost: 41340,
    keyRiskSignal: 'Extended Project Overtime Burnout',
  },
  {
    id: 'EMP-0412',
    name: 'Elena Rostova',
    role: 'Human Resources Specialist',
    department: 'Human Resources',
    monthlyIncome: 4100,
    overtime: 'Yes',
    jobSatisfaction: 1,
    tenureYears: 1.2,
    stockOptionLevel: 0,
    predictedRiskPct: 82.0,
    flightRiskTier: 'High',
    replacementCost: 24600,
    keyRiskSignal: 'Sub-2yr Tenure + Low Satisfaction',
  },
  {
    id: 'EMP-0518',
    name: 'David O\'Connor',
    role: 'Sales Executive',
    department: 'Sales',
    monthlyIncome: 6200,
    overtime: 'No',
    jobSatisfaction: 3,
    tenureYears: 4.8,
    stockOptionLevel: 1,
    predictedRiskPct: 34.2,
    flightRiskTier: 'Medium',
    replacementCost: 37200,
    keyRiskSignal: 'Moderate Tenure Stagnation',
  },
  {
    id: 'EMP-0604',
    name: 'Amina Bello',
    role: 'Senior Research Scientist',
    department: 'Research & Development',
    monthlyIncome: 9400,
    overtime: 'No',
    jobSatisfaction: 4,
    tenureYears: 7.2,
    stockOptionLevel: 2,
    predictedRiskPct: 8.5,
    flightRiskTier: 'Low',
    replacementCost: 56400,
    keyRiskSignal: 'Stable (High Compensation & Equity)',
  },
  {
    id: 'EMP-0721',
    name: 'Liam Gallagher',
    role: 'Manufacturing Director',
    department: 'Research & Development',
    monthlyIncome: 13500,
    overtime: 'No',
    jobSatisfaction: 4,
    tenureYears: 10.5,
    stockOptionLevel: 2,
    predictedRiskPct: 5.1,
    flightRiskTier: 'Low',
    replacementCost: 81000,
    keyRiskSignal: 'High Institutional Attachment',
  },
  {
    id: 'EMP-0842',
    name: 'Priya Sharma',
    role: 'Sales Executive',
    department: 'Sales',
    monthlyIncome: 5800,
    overtime: 'Yes',
    jobSatisfaction: 2,
    tenureYears: 2.9,
    stockOptionLevel: 0,
    predictedRiskPct: 78.9,
    flightRiskTier: 'High',
    replacementCost: 34800,
    keyRiskSignal: 'Overtime + Quota Pressure',
  },
  {
    id: 'EMP-0911',
    name: 'Tariq Al-Mansoor',
    role: 'Research Scientist',
    department: 'Research & Development',
    monthlyIncome: 7100,
    overtime: 'No',
    jobSatisfaction: 3,
    tenureYears: 5.1,
    stockOptionLevel: 1,
    predictedRiskPct: 22.0,
    flightRiskTier: 'Low',
    replacementCost: 42600,
    keyRiskSignal: 'Stable Retention Profile',
  },
  {
    id: 'EMP-1024',
    name: 'Khadija Umar',
    role: 'HR Business Partner',
    department: 'Human Resources',
    monthlyIncome: 5900,
    overtime: 'No',
    jobSatisfaction: 3,
    tenureYears: 3.8,
    stockOptionLevel: 1,
    predictedRiskPct: 28.4,
    flightRiskTier: 'Low',
    replacementCost: 35400,
    keyRiskSignal: 'Moderate Market Risk',
  },
  {
    id: 'EMP-1135',
    name: 'Lucas Silva',
    role: 'Sales Representative',
    department: 'Sales',
    monthlyIncome: 2950,
    overtime: 'Yes',
    jobSatisfaction: 1,
    tenureYears: 0.9,
    stockOptionLevel: 0,
    predictedRiskPct: 91.2,
    flightRiskTier: 'High',
    replacementCost: 17700,
    keyRiskSignal: 'First-Year Onboarding Churn Risk',
  },
  {
    id: 'EMP-1249',
    name: 'Zainab Idris',
    role: 'Laboratory Technician',
    department: 'Research & Development',
    monthlyIncome: 3100,
    overtime: 'No',
    jobSatisfaction: 3,
    tenureYears: 3.2,
    stockOptionLevel: 1,
    predictedRiskPct: 18.2,
    flightRiskTier: 'Low',
    replacementCost: 18600,
    keyRiskSignal: 'Stable Workload Ratio',
  },
];

interface SalesDeal {
  id: string;
  account: string;
  region: 'North America' | 'EMEA' | 'APAC' | 'LATAM';
  stage: 'Lead' | 'MQL' | 'SQL' | 'Proposal' | 'Closed-Won';
  amount: number;
  repName: string;
  closeDate: string;
  probability: number;
  winLossStatus: 'Won' | 'In Pipeline' | 'Lost';
}

const SAMPLE_SALES_DEALS: SalesDeal[] = [
  { id: 'DEAL-901', account: 'Apex Logistics Global', region: 'North America', stage: 'Closed-Won', amount: 145000, repName: 'Sarah Jenkins', closeDate: '2026-09-15', probability: 100, winLossStatus: 'Won' },
  { id: 'DEAL-902', account: 'BioHealth Dynamics', region: 'EMEA', stage: 'Closed-Won', amount: 98000, repName: 'Liam Vance', closeDate: '2026-09-18', probability: 100, winLossStatus: 'Won' },
  { id: 'DEAL-903', account: 'Krona Financial', region: 'EMEA', stage: 'Proposal', amount: 120000, repName: 'Liam Vance', closeDate: '2026-10-30', probability: 75, winLossStatus: 'In Pipeline' },
  { id: 'DEAL-904', account: 'Tokyo Systems KK', region: 'APAC', stage: 'Closed-Won', amount: 210000, repName: 'Kenji Sato', closeDate: '2026-09-22', probability: 100, winLossStatus: 'Won' },
  { id: 'DEAL-905', account: 'Meridian Capital', region: 'North America', stage: 'SQL', amount: 75000, repName: 'Sarah Jenkins', closeDate: '2026-11-12', probability: 50, winLossStatus: 'In Pipeline' },
  { id: 'DEAL-906', account: 'Sao Paulo Retail Tech', region: 'LATAM', stage: 'Closed-Won', amount: 62000, repName: 'Maria Rossi', closeDate: '2026-09-29', probability: 100, winLossStatus: 'Won' },
  { id: 'DEAL-907', account: 'Nordic CleanEnergy', region: 'EMEA', stage: 'MQL', amount: 45000, repName: 'Liam Vance', closeDate: '2026-12-05', probability: 25, winLossStatus: 'In Pipeline' },
  { id: 'DEAL-908', account: 'Pacific Edge Media', region: 'APAC', stage: 'Proposal', amount: 160000, repName: 'Kenji Sato', closeDate: '2026-10-25', probability: 80, winLossStatus: 'In Pipeline' },
];

interface BankChurnCustomer {
  customerId: string;
  surname: string;
  geography: 'France' | 'Germany' | 'Spain';
  creditScore: number;
  balance: number;
  products: number;
  isActive: 'Active' | 'Dormant';
  estimatedSalary: number;
  churnProbability: number;
  predictedStatus: 'Churn Risk' | 'Retained';
}

const SAMPLE_CHURN_DATA: BankChurnCustomer[] = [
  { customerId: '15634602', surname: 'Hargrave', geography: 'France', creditScore: 619, balance: 0, products: 1, isActive: 'Active', estimatedSalary: 101348, churnProbability: 82.4, predictedStatus: 'Churn Risk' },
  { customerId: '15647311', surname: 'Hill', geography: 'Spain', creditScore: 608, balance: 83807, products: 1, isActive: 'Active', estimatedSalary: 112542, churnProbability: 24.1, predictedStatus: 'Retained' },
  { customerId: '15619304', surname: 'Onio', geography: 'France', creditScore: 502, balance: 159660, products: 3, isActive: 'Dormant', estimatedSalary: 113931, churnProbability: 91.5, predictedStatus: 'Churn Risk' },
  { customerId: '15701354', surname: 'Boni', geography: 'France', creditScore: 699, balance: 0, products: 2, isActive: 'Dormant', estimatedSalary: 93826, churnProbability: 18.2, predictedStatus: 'Retained' },
  { customerId: '15737888', surname: 'Mitchell', geography: 'Germany', creditScore: 850, balance: 125510, products: 1, isActive: 'Dormant', estimatedSalary: 79084, churnProbability: 77.8, predictedStatus: 'Churn Risk' },
  { customerId: '15574012', surname: 'Chu', geography: 'Germany', creditScore: 645, balance: 113755, products: 2, isActive: 'Active', estimatedSalary: 149756, churnProbability: 15.6, predictedStatus: 'Retained' },
];

interface InteractiveBiExcelDashboardProps {
  onClose?: () => void;
  initialMode?: DashboardMode;
  isEmbedded?: boolean;
}

export const InteractiveBiExcelDashboard: React.FC<InteractiveBiExcelDashboardProps> = ({
  onClose,
  initialMode = 'powerbi_hr',
  isEmbedded = false,
}) => {
  const [mode, setMode] = useState<DashboardMode>(initialMode);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Power BI HR Filters
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedOvertime, setSelectedOvertime] = useState<string>('All');
  const [selectedRiskTier, setSelectedRiskTier] = useState<string>('All');
  const [hrSearchQuery, setHrSearchQuery] = useState<string>('');

  // Sales Pipeline Filters
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedStage, setSelectedStage] = useState<string>('All');

  // Churn Filters
  const [selectedGeo, setSelectedGeo] = useState<string>('All');
  const [selectedActiveStatus, setSelectedActiveStatus] = useState<string>('All');

  // Excel Interactive State
  const [activeCell, setActiveCell] = useState<{ row: number; col: string }>({ row: 2, col: 'H' });
  const [pivotRowDimension, setPivotRowDimension] = useState<'department' | 'role'>('department');
  const [pivotMetric, setPivotMetric] = useState<'headcount' | 'avgSalary' | 'highRiskCount' | 'turnoverExposure'>('highRiskCount');
  const [copiedCell, setCopiedCell] = useState(false);

  // What-If Simulation Controls
  const [simOvertimeReduction, setSimOvertimeReduction] = useState<number>(40);
  const [simCompensationBoost, setSimCompensationBoost] = useState<number>(8);
  const [simFlexibleWorkDays, setSimFlexibleWorkDays] = useState<number>(2);

  // 1. HR Filtered Records
  const filteredHrData = useMemo(() => {
    return SAMPLE_HR_DATA.filter((item) => {
      if (selectedDept !== 'All' && item.department !== selectedDept) return false;
      if (selectedOvertime !== 'All' && item.overtime !== selectedOvertime) return false;
      if (selectedRiskTier !== 'All' && item.flightRiskTier !== selectedRiskTier) return false;
      if (hrSearchQuery.trim()) {
        const q = hrSearchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.role.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedDept, selectedOvertime, selectedRiskTier, hrSearchQuery]);

  // HR KPIs
  const hrKpis = useMemo(() => {
    const total = filteredHrData.length;
    if (total === 0) return { total: 0, highRisk: 0, rate: 0, avgSalary: 0, costExposure: 0 };
    const highRisk = filteredHrData.filter((d) => d.flightRiskTier === 'High').length;
    const avgSalary = Math.round(filteredHrData.reduce((acc, d) => acc + d.monthlyIncome, 0) / total);
    const costExposure = filteredHrData
      .filter((d) => d.flightRiskTier === 'High')
      .reduce((acc, d) => acc + d.replacementCost, 0);
    const rate = Math.round((highRisk / total) * 100);
    return { total, highRisk, rate, avgSalary, costExposure };
  }, [filteredHrData]);

  // 2. Sales Filtered Records
  const filteredSalesData = useMemo(() => {
    return SAMPLE_SALES_DEALS.filter((d) => {
      if (selectedRegion !== 'All' && d.region !== selectedRegion) return false;
      if (selectedStage !== 'All' && d.stage !== selectedStage) return false;
      return true;
    });
  }, [selectedRegion, selectedStage]);

  const salesKpis = useMemo(() => {
    const totalWon = filteredSalesData.filter((d) => d.stage === 'Closed-Won').reduce((acc, d) => acc + d.amount, 0);
    const totalPipeline = filteredSalesData.reduce((acc, d) => acc + d.amount, 0);
    const wonCount = filteredSalesData.filter((d) => d.stage === 'Closed-Won').length;
    const winRate = filteredSalesData.length > 0 ? Math.round((wonCount / filteredSalesData.length) * 100) : 0;
    const avgDeal = wonCount > 0 ? Math.round(totalWon / wonCount) : 0;
    return { totalWon, totalPipeline, winRate, avgDeal, dealsWon: wonCount };
  }, [filteredSalesData]);

  // 3. Churn Filtered Records
  const filteredChurnData = useMemo(() => {
    return SAMPLE_CHURN_DATA.filter((d) => {
      if (selectedGeo !== 'All' && d.geography !== selectedGeo) return false;
      if (selectedActiveStatus !== 'All' && d.isActive !== selectedActiveStatus) return false;
      return true;
    });
  }, [selectedGeo, selectedActiveStatus]);

  // 4. Excel Pivot Table computation
  const pivotTableData = useMemo(() => {
    const departments = ['Research & Development', 'Sales', 'Human Resources'];
    return departments.map((dept) => {
      const cohort = SAMPLE_HR_DATA.filter((d) => d.department === dept);
      const headcount = cohort.length;
      const avgSalary = Math.round(cohort.reduce((acc, d) => acc + d.monthlyIncome, 0) / headcount);
      const highRiskCount = cohort.filter((d) => d.flightRiskTier === 'High').length;
      const turnoverExposure = cohort
        .filter((d) => d.flightRiskTier === 'High')
        .reduce((acc, d) => acc + d.replacementCost, 0);
      const overtimeYes = cohort.filter((d) => d.overtime === 'Yes').length;
      const overtimeNo = cohort.filter((d) => d.overtime === 'No').length;

      return {
        dimension: dept,
        headcount,
        avgSalary,
        highRiskCount,
        turnoverExposure,
        overtimeYes,
        overtimeNo,
      };
    });
  }, []);

  // 5. What-If Simulation
  const simulationResults = useMemo(() => {
    const baselineHighRisk = SAMPLE_HR_DATA.filter((d) => d.flightRiskTier === 'High').length;
    const otFactor = (simOvertimeReduction / 100) * 0.45;
    const compFactor = (simCompensationBoost / 20) * 0.30;
    const flexFactor = (simFlexibleWorkDays / 4) * 0.20;
    const totalEfficacy = Math.min(0.75, otFactor + compFactor + flexFactor);
    const preventedResignations = Math.round(baselineHighRisk * totalEfficacy);
    const totalCostSaved = preventedResignations * 26500;
    const estimatedProgramCost = Math.round(preventedResignations * (simCompensationBoost * 450 + 2000));
    const netRoi = Math.round(((totalCostSaved - estimatedProgramCost) / Math.max(estimatedProgramCost, 1)) * 100);

    return { preventedResignations, totalCostSaved, estimatedProgramCost, netRoi };
  }, [simOvertimeReduction, simCompensationBoost, simFlexibleWorkDays]);

  // Active Excel Formula
  const currentFormula = useMemo(() => {
    const { row, col } = activeCell;
    switch (col) {
      case 'D': return `=VLOOKUP(A${row}, Master_Salaries, 4, FALSE)`;
      case 'E': return `=AVERAGEIFS(D$2:D$14, C$2:C$14, C${row})`;
      case 'H': return `=IF(AND(F${row}="Yes", G${row}<3), "HIGH RISK", IF(OR(F${row}="Yes", D${row}<3500), "MODERATE", "LOW"))`;
      case 'I': return `=D${row} * 6 [6-Month Replacement Cost]`;
      default: return `=GETPIVOTDATA("Value", $A$3, "Dept", C${row})`;
    }
  }, [activeCell]);

  // Real CSV Download
  const handleExportCsv = () => {
    const headers = ['Employee ID', 'Name', 'Department', 'Role', 'Monthly Salary ($)', 'Overtime', 'Satisfaction', 'Tenure (Yrs)', 'Flight Risk %', 'Risk Tier', 'Turnover Exposure ($)'];
    const rows = filteredHrData.map((d) => [
      d.id, `"${d.name}"`, `"${d.department}"`, `"${d.role}"`, d.monthlyIncome, d.overtime, d.jobSatisfaction, d.tenureYears, `${d.predictedRiskPct}%`, d.flightRiskTier, d.replacementCost
    ]);
    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Ope_Olamiju_Data_Analyst_Dashboard_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`w-full bg-[#18181b] dark:bg-[#09090b] text-stone-100 rounded-sm border-2 border-foreground shadow-brutal overflow-hidden transition-all ${
        isFullscreen ? 'fixed inset-2 sm:inset-4 z-50 overflow-y-auto' : ''
      }`}
    >
      {/* =========================================================================
          DATA ANALYST DASHBOARD BANNER & APPLICATION TABS
         ========================================================================= */}
      <div className="bg-[#121214] border-b-2 border-foreground/20 p-3.5 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xs bg-[#f59e0b] text-stone-950 grid place-items-center font-mono font-black text-sm shrink-0 shadow-brutal-xs">
            DA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-sm sm:text-base uppercase tracking-tight text-white">
                Data Analyst Interactive Dashboard Suite
              </h3>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                LIVE INTERACTIVE
              </span>
            </div>
            <p className="text-[11px] font-mono text-stone-400 mt-0.5">
              Power BI DAX Models &bull; Dynamic Excel Pivot Tables &bull; Churn &amp; Funnel Analytics
            </p>
          </div>
        </div>

        {/* Center: Top Dashboard Mode Switcher */}
        <div className="flex flex-wrap items-center bg-stone-900 border border-stone-700 p-1 rounded-xs gap-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => setMode('powerbi_hr')}
            className={`px-3 py-1.5 rounded-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'powerbi_hr'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <BarChart3 className="size-3.5" />
            <span>1. HR Workforce BI</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('powerbi_sales')}
            className={`px-3 py-1.5 rounded-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'powerbi_sales'
                ? 'bg-cyan-500 text-stone-950 shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Target className="size-3.5" />
            <span>2. Sales Funnel BI</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('excel_pivot')}
            className={`px-3 py-1.5 rounded-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'excel_pivot'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="size-3.5" />
            <span>3. Excel Dynamic Pivot</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('churn_fintech')}
            className={`px-3 py-1.5 rounded-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'churn_fintech'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <TrendingDown className="size-3.5" />
            <span>4. Churn Analytics</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('whatif')}
            className={`px-3 py-1.5 rounded-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'whatif'
                ? 'bg-purple-500 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Calculator className="size-3.5" />
            <span>5. What-If Simulator</span>
          </button>
        </div>

        {/* Right: Fullscreen / Close actions */}
        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={handleExportCsv}
            title="Download full interactive dataset as CSV"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 text-xs font-mono font-bold uppercase transition-all cursor-pointer"
          >
            <Download className="size-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xs bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-600 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Canvas'}
          >
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xs text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: POWER BI HR WORKFORCE & ATTRITION INTELLIGENCE
         ========================================================================= */}
      {mode === 'powerbi_hr' && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Top Slicers Bar */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-xs p-3.5 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                <Filter className="size-3.5 text-amber-400" />
                <span>Power BI Slicers &bull; Instant Cross-Filter</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                Public IBM HR Benchmark (1,470 records)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <label className="block text-stone-400 text-[10px] uppercase font-bold mb-1">
                  Department
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xs px-2.5 py-1.5 text-stone-100 text-xs focus:border-amber-400 outline-none"
                >
                  <option value="All">All Departments</option>
                  <option value="Research & Development">Research &amp; Development</option>
                  <option value="Sales">Sales</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 text-[10px] uppercase font-bold mb-1">
                  Overtime Status
                </label>
                <select
                  value={selectedOvertime}
                  onChange={(e) => setSelectedOvertime(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xs px-2.5 py-1.5 text-stone-100 text-xs focus:border-amber-400 outline-none"
                >
                  <option value="All">All Workload Schedules</option>
                  <option value="Yes">Yes (Mandatory Overtime)</option>
                  <option value="No">No (Standard Hours)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 text-[10px] uppercase font-bold mb-1">
                  Risk Tier
                </label>
                <select
                  value={selectedRiskTier}
                  onChange={(e) => setSelectedRiskTier(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xs px-2.5 py-1.5 text-stone-100 text-xs focus:border-amber-400 outline-none"
                >
                  <option value="All">All Risk Tiers</option>
                  <option value="High">High Risk (&gt;75% Propensity)</option>
                  <option value="Medium">Moderate Risk</option>
                  <option value="Low">Low / Stable</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4 Primary KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Total Headcount
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                {hrKpis.total.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-emerald-400 mt-0.5 block">
                DAX: COUNTROWS(Cohort)
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Predicted Turnover Hazard
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-rose-400 mt-1">
                {hrKpis.rate}%
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                {hrKpis.highRisk} employees at risk
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Average Monthly Salary
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-emerald-400 mt-1">
                ${hrKpis.avgSalary.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                DAX: AVERAGE(Salary)
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Turnover Cost Exposure
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-amber-400 mt-1">
                ${hrKpis.costExposure.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                Based on 6mo replacement cost
              </span>
            </div>
          </div>

          {/* Visual Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart 1: Department Attrition Rate */}
            <div className="bg-stone-900 border border-stone-800 rounded-xs p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-800">
                <span className="font-mono text-xs font-bold uppercase text-stone-300">
                  Attrition % by Department (Power BI Bar Chart)
                </span>
                <span className="text-[10px] font-mono text-amber-400">DAX Measure</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { dept: 'Sales', pct: 28.4, count: 446, color: 'bg-rose-500' },
                  { dept: 'Research & Development', pct: 13.8, count: 961, color: 'bg-amber-500' },
                  { dept: 'Human Resources', pct: 19.0, count: 63, color: 'bg-cyan-500' },
                ].map((item) => (
                  <div key={item.dept}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-stone-300 font-bold">{item.dept}</span>
                      <span className="text-stone-400">{item.pct}% ({item.count} staff)</span>
                    </div>
                    <div className="h-3 w-full bg-stone-950 rounded-xs overflow-hidden flex">
                      <div className={`h-full ${item.color} transition-all duration-500`} style={{ width: `${item.pct * 2.5}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: Top Drivers (SHAP Weights) */}
            <div className="bg-stone-900 border border-stone-800 rounded-xs p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-800">
                <span className="font-mono text-xs font-bold uppercase text-stone-300">
                  Leading Turnover Predictors (Feature Importance)
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Random Forest</span>
              </div>
              <div className="space-y-2.5 font-mono text-xs">
                {[
                  { feature: 'Overtime Requirements', weight: 0.34 },
                  { feature: 'Stock Option Grant Level', weight: 0.22 },
                  { feature: 'Monthly Base Income', weight: 0.18 },
                  { feature: 'Tenure with Current Manager', weight: 0.14 },
                  { feature: 'Commute Distance from Home', weight: 0.12 },
                ].map((item) => (
                  <div key={item.feature}>
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="text-stone-300 truncate">{item.feature}</span>
                      <span className="text-amber-400 font-bold">{(item.weight * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-stone-950 rounded-xs overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-xs" style={{ width: `${item.weight * 100 * 2.2}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: POWER BI / TABLEAU SALES & REVENUE PIPELINE
         ========================================================================= */}
      {mode === 'powerbi_sales' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-xs p-3.5 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                <Filter className="size-3.5 text-cyan-400" />
                <span>Commercial Revenue Slicers</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                B2B Commercial Pipeline &bull; YTD Performance
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="block text-stone-400 text-[10px] uppercase font-bold mb-1">
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xs px-2.5 py-1.5 text-stone-100 text-xs focus:border-cyan-400 outline-none"
                >
                  <option value="All">All Regions (Global)</option>
                  <option value="North America">North America</option>
                  <option value="EMEA">EMEA</option>
                  <option value="APAC">APAC</option>
                  <option value="LATAM">LATAM</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 text-[10px] uppercase font-bold mb-1">
                  Pipeline Stage
                </label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xs px-2.5 py-1.5 text-stone-100 text-xs focus:border-cyan-400 outline-none"
                >
                  <option value="All">All Stages</option>
                  <option value="Closed-Won">Closed-Won</option>
                  <option value="Proposal">Proposal / Contract</option>
                  <option value="SQL">Sales Qualified Lead (SQL)</option>
                  <option value="MQL">Marketing Qualified Lead (MQL)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sales KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Closed-Won Revenue
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-emerald-400 mt-1">
                ${salesKpis.totalWon.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-emerald-400 mt-0.5 block">
                108.4% of YTD Target
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Total Pipeline Value
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-cyan-400 mt-1">
                ${salesKpis.totalPipeline.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                Weighted pipeline coverage: 3.4x
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Commercial Win Rate
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-amber-400 mt-1">
                {salesKpis.winRate}%
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                Industry benchmark: 22%
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Average Deal Size
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-purple-400 mt-1">
                ${salesKpis.avgDeal.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                ACV (Annual Contract Value)
              </span>
            </div>
          </div>

          {/* Sales Funnel Visual */}
          <div className="bg-stone-900 border border-stone-800 rounded-xs p-4 sm:p-5">
            <h4 className="font-mono text-xs font-bold uppercase text-stone-200 mb-4 pb-2 border-b border-stone-800">
              Commercial Stage Conversion Funnel (Leads &rarr; Closed-Won)
            </h4>
            <div className="space-y-3 font-mono text-xs">
              {[
                { stage: '1. Inbound & Outbound Leads', count: 1420, value: '$18.2M', pct: 100, color: 'bg-blue-600' },
                { stage: '2. Marketing Qualified (MQL)', count: 860, value: '$12.4M', pct: 60, color: 'bg-cyan-500' },
                { stage: '3. Sales Qualified Demo (SQL)', count: 420, value: '$7.8M', pct: 35, color: 'bg-teal-500' },
                { stage: '4. Executive Proposal & Security Review', count: 210, value: '$4.2M', pct: 20, color: 'bg-amber-500' },
                { stage: '5. Closed-Won Enterprise Contracts', count: 148, value: '$4.85M', pct: 14, color: 'bg-emerald-500' },
              ].map((stg) => (
                <div key={stg.stage}>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-stone-300 font-bold">{stg.stage}</span>
                    <span className="text-stone-400">{stg.count} deals &bull; {stg.value}</span>
                  </div>
                  <div className="h-3 w-full bg-stone-950 rounded-xs overflow-hidden">
                    <div className={`h-full ${stg.color}`} style={{ width: `${stg.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: MICROSOFT EXCEL DYNAMIC PIVOT TABLE
         ========================================================================= */}
      {mode === 'excel_pivot' && (
        <div className="bg-[#107c41]/10 border-t border-stone-800 p-4 sm:p-6 space-y-4">
          <div className="bg-[#107c41] text-white px-4 py-2 rounded-t flex items-center justify-between text-xs font-mono font-bold">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="size-4" />
              <span>Microsoft Excel &bull; PivotTable_Executive_Summary.xlsx</span>
            </div>
            <button
              onClick={handleExportCsv}
              className="bg-white text-[#107c41] px-3 py-1 rounded text-xs hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Export Workbook (.csv)
            </button>
          </div>

          {/* Formula Bar */}
          <div className="bg-stone-900 border border-stone-700 px-3 py-1.5 rounded flex items-center gap-2 font-mono text-xs">
            <div className="bg-stone-950 px-2 py-0.5 rounded text-amber-400 font-bold w-12 text-center">
              {activeCell.col}{activeCell.row}
            </div>
            <span className="text-stone-400 italic font-serif text-sm px-1">fx</span>
            <div className="flex-1 bg-stone-950 px-3 py-1 rounded text-stone-200 text-xs">
              {currentFormula}
            </div>
          </div>

          {/* Real Interactive Pivot Table */}
          <div className="bg-stone-950 border border-stone-700 rounded p-4 font-mono text-xs overflow-x-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-800">
              <span className="text-stone-300 font-bold uppercase text-[11px] flex items-center gap-1.5">
                <Table className="size-3.5 text-emerald-400" />
                <span>PivotTable Fields: Row = Department &bull; Values = Headcount, Risk &amp; Payroll</span>
              </span>
              <span className="text-[10px] text-stone-400">
                Click any cell to inspect Excel formula
              </span>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-stone-900 text-stone-300 text-[11px] border-b border-stone-700">
                  <th className="py-2 px-3 text-left">Department (Row Labels)</th>
                  <th className="py-2 px-3 text-right">Headcount</th>
                  <th className="py-2 px-3 text-right">Overtime: YES</th>
                  <th className="py-2 px-3 text-right">Overtime: NO</th>
                  <th className="py-2 px-3 text-right">High Flight Risk</th>
                  <th className="py-2 px-3 text-right">Avg Monthly Salary</th>
                  <th className="py-2 px-3 text-right">Total Turnover Exposure ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800 text-stone-300">
                {pivotTableData.map((row, idx) => (
                  <tr key={row.dimension} className="hover:bg-stone-900/60">
                    <td className="py-2.5 px-3 font-bold text-white">{row.dimension}</td>
                    <td className="py-2.5 px-3 text-right">{row.headcount}</td>
                    <td className="py-2.5 px-3 text-right text-rose-400 font-bold">{row.overtimeYes}</td>
                    <td className="py-2.5 px-3 text-right text-stone-400">{row.overtimeNo}</td>
                    <td className="py-2.5 px-3 text-right text-amber-400 font-bold">{row.highRiskCount}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">${row.avgSalary.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-stone-200">${row.turnoverExposure.toLocaleString()}</td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-stone-900 font-bold text-white border-t-2 border-stone-600">
                  <td className="py-2.5 px-3">Grand Total</td>
                  <td className="py-2.5 px-3 text-right">12</td>
                  <td className="py-2.5 px-3 text-right text-rose-400">6</td>
                  <td className="py-2.5 px-3 text-right text-stone-400">6</td>
                  <td className="py-2.5 px-3 text-right text-amber-400">6</td>
                  <td className="py-2.5 px-3 text-right text-emerald-400">$5,833</td>
                  <td className="py-2.5 px-3 text-right text-amber-300">$218,460</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 4: FINTECH CUSTOMER CHURN ANALYTICS
         ========================================================================= */}
      {mode === 'churn_fintech' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-xs p-3.5 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                <Filter className="size-3.5 text-rose-400" />
                <span>Customer Churn Demographics &amp; Balances</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                Public Retail Banking Benchmark (10,000 records)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="block text-stone-400 text-[10px] uppercase font-bold mb-1">
                  Geography
                </label>
                <select
                  value={selectedGeo}
                  onChange={(e) => setSelectedGeo(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xs px-2.5 py-1.5 text-stone-100 text-xs focus:border-rose-400 outline-none"
                >
                  <option value="All">All Geographies</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany (High Churn Cohort)</option>
                  <option value="Spain">Spain</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 text-[10px] uppercase font-bold mb-1">
                  Member Activity Status
                </label>
                <select
                  value={selectedActiveStatus}
                  onChange={(e) => setSelectedActiveStatus(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xs px-2.5 py-1.5 text-stone-100 text-xs focus:border-rose-400 outline-none"
                >
                  <option value="All">All Members</option>
                  <option value="Active">Active Customers</option>
                  <option value="Dormant">Dormant / Low Activity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Churn KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Total Benchmark Accounts
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                10,000
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                Tabular banking records
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Predicted Churn Rate
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-rose-400 mt-1">
                20.4%
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                86.4% recall on churners via SMOTE
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                Model ROC-AUC Score
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-emerald-400 mt-1">
                0.882
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                XGBoost Classifier
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xs">
              <span className="text-stone-400 text-[11px] font-mono uppercase font-bold block">
                At-Risk Deposit Balances
              </span>
              <div className="font-display font-black text-2xl sm:text-3xl text-amber-400 mt-1">
                $140,000+
              </div>
              <span className="text-[10px] font-mono text-stone-400 mt-0.5 block">
                Flagged for relationship managers
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 5: WHAT-IF RETENTION & ROI SIMULATOR
         ========================================================================= */}
      {mode === 'whatif' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="bg-stone-900/90 border border-stone-800 rounded-xs p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
              <Sliders className="size-4 text-purple-400" />
              <span>Retention Policy &amp; Budget Optimization Simulator</span>
            </div>
            <p className="text-xs text-stone-300 font-sans leading-relaxed max-w-3xl">
              Adjust levers to model impact on employee resignations, replacement costs saved, and net bottom-line return.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300 font-bold">Overtime Reduction:</span>
                  <span className="text-cyan-400 font-black">{simOvertimeReduction}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={80}
                  step={5}
                  value={simOvertimeReduction}
                  onChange={(e) => setSimOvertimeReduction(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300 font-bold">Comp Adjustment:</span>
                  <span className="text-emerald-400 font-black">+{simCompensationBoost}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={1}
                  value={simCompensationBoost}
                  onChange={(e) => setSimCompensationBoost(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300 font-bold">Remote Flex Days:</span>
                  <span className="text-amber-400 font-black">{simFlexibleWorkDays} days/wk</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={1}
                  value={simFlexibleWorkDays}
                  onChange={(e) => setSimFlexibleWorkDays(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-stone-900 border border-stone-800 rounded-xs">
              <span className="text-[11px] font-mono uppercase font-bold text-stone-400 block">Prevented Resignations</span>
              <div className="font-display font-black text-3xl sm:text-4xl text-cyan-400 mt-1">+{simulationResults.preventedResignations}</div>
            </div>
            <div className="p-4 bg-stone-900 border border-stone-800 rounded-xs">
              <span className="text-[11px] font-mono uppercase font-bold text-stone-400 block">Gross Cost Saved</span>
              <div className="font-display font-black text-3xl sm:text-4xl text-emerald-400 mt-1">${simulationResults.totalCostSaved.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-stone-900 border border-stone-800 rounded-xs">
              <span className="text-[11px] font-mono uppercase font-bold text-stone-400 block">Program Investment</span>
              <div className="font-display font-black text-3xl sm:text-4xl text-stone-300 mt-1">${simulationResults.estimatedProgramCost.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-stone-900 border border-stone-800 rounded-xs">
              <span className="text-[11px] font-mono uppercase font-bold text-stone-400 block">Projected Net ROI</span>
              <div className="font-display font-black text-3xl sm:text-4xl text-amber-400 mt-1">+{simulationResults.netRoi}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
