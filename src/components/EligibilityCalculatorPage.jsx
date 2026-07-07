import { useState, useMemo, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ShieldCheck, Plus, Minus, CreditCard, Download, Printer, Search,
  TrendingUp, Calculator, FileText, Copy, Trash2, Edit, ChevronDown, ChevronUp,
  RefreshCw, Save, User, Banknote, Percent, Clock, Home, Car, Bike,
  ShoppingCart, Medal, ListTodo, SlidersHorizontal, CheckCircle2, AlertTriangle,
  XCircle, BarChart3, ArrowLeft, ArrowRight, Bookmark, Filter, SortAsc,
  CalendarDays, IndianRupee, Wallet, TrendingDown, Building2
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ── helpers ─────────────────────────── */
function fmt(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0)
}
function fmtShort(n) {
  if (!n) return '₹0'
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`
  return `₹${n}`
}
function calcEMI(principal, annualRate, months) {
  if (!principal || !months) return 0
  if (annualRate === 0) return principal / months
  const r = annualRate / 12 / 100
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1)
}
function calcPrincipal(emi, annualRate, months) {
  if (!emi || !months) return 0
  if (annualRate === 0) return emi * months
  const r = annualRate / 12 / 100
  return emi * (Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months))
}
function buildSchedule(principal, annualRate, months) {
  if (!principal || !months) return []
  const emi = calcEMI(principal, annualRate, months)
  let balance = principal
  const rows = []
  const r = annualRate / 12 / 100
  for (let m = 1; m <= months; m++) {
    const intPaid = balance * r
    const prinPaid = emi - intPaid
    const closeBal = Math.max(0, balance - prinPaid)
    rows.push({ month: m, openBal: Math.round(balance), intPaid: Math.round(intPaid), prinPaid: Math.round(prinPaid), closeBal: Math.round(closeBal) })
    balance = closeBal
  }
  return rows
}

/* ── NumField ─────────────── */
function NumField({ value, onChange }) {
  const [str, setStr] = useState(value === 0 ? '' : value.toString())
  useEffect(() => { setStr(value === 0 ? '' : value.toString()) }, [value])

  return (
    <input type="text" inputMode="decimal" value={str} placeholder="0"
      onChange={e => {
        let val = e.target.value.replace(/[^0-9.]/g, '')
        if (val !== '0') val = val.replace(/^0+(?=\d)/, '')
        setStr(val)
        onChange(Number(val) || 0)
      }}
      className="w-full bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[#0f1857] font-bold text-[15px] outline-none focus:border-[#0176C7] focus:ring-1 focus:ring-[#0176C7] transition-all"
    />
  )
}

/* ── StepField ─────────────── */
function StepField({ label, icon, value, onChange, step = 1000 }) {
  const [str, setStr] = useState(value === 0 ? '' : value.toString())
  useEffect(() => { setStr(value === 0 ? '' : value.toString()) }, [value])

  return (
    <div>
      <div className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
        <span className="text-[#0176C7]">{icon}</span> {label}
      </div>
      <div className="flex items-center gap-2">
        <input type="text" inputMode="numeric" value={str} placeholder="0"
          onChange={e => {
            let val = e.target.value.replace(/[^0-9]/g, '')
            if (val !== '0') val = val.replace(/^0+(?=\d)/, '')
            setStr(val)
            onChange(Number(val) || 0)
          }}
          className="flex-1 min-w-0 bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl px-3 py-2.5 text-[#0f1857] font-bold text-sm outline-none focus:border-[#0176C7] transition-all"
        />
        <button onClick={() => onChange(value + step)}
          className="w-8 h-8 rounded-lg bg-[#e8f0fe] text-[#0176C7] flex items-center justify-center hover:bg-[#dbeafe] transition-colors cursor-pointer flex-shrink-0">
          <Plus size={14} />
        </button>
        <button onClick={() => onChange(Math.max(0, value - step))}
          className="w-8 h-8 rounded-lg bg-[#fef2f2] text-[#ef4444] flex items-center justify-center hover:bg-[#fee2e2] transition-colors cursor-pointer flex-shrink-0">
          <Minus size={14} />
        </button>
      </div>
    </div>
  )
}

/* ── SectionTitle ─────────────── */
function SectionTitle({ icon, children, className = '' }) {
  return (
    <h3 className={`flex items-center gap-2.5 text-[#0f1857] font-black text-[15px] uppercase tracking-wide ${className}`}>
      <span className="text-[#0176C7]">{icon}</span>
      {children}
    </h3>
  )
}

/* ── Donut Chart ─────────────── */
function DonutChart({ principal, interest }) {
  const total = (principal || 0) + (interest || 0)
  const pPct = total > 0 ? principal / total : 0
  const iPct = total > 0 ? interest / total : 0
  const r = 70, cx = 90, cy = 90, stroke = 20
  const circ = 2 * Math.PI * r
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" className="flex-shrink-0">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0176C7" strokeWidth={stroke}
          strokeDasharray={`${circ * pPct} ${circ}`}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#a5b4fc" strokeWidth={stroke}
          strokeDasharray={`${circ * iPct} ${circ}`}
          strokeDashoffset={-(circ * pPct)}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dasharray 0.6s ease, stroke-dashoffset 0.6s ease' }} />
        <text x={cx} y={cy - 6} fontSize="11" fill="#0f1857" fontWeight="900" textAnchor="middle">
          {total > 0 ? Math.round(pPct * 100) : 0}%
        </text>
        <text x={cx} y={cy + 10} fontSize="8" fill="#94a3b8" fontWeight="700" textAnchor="middle">PRINCIPAL</text>
      </svg>
      <div className="space-y-3 text-sm w-full max-w-[200px]">
        <div className="flex items-start gap-2">
          <span className="w-3 h-3 rounded-full bg-[#0176C7] mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-bold text-[#0f1857] text-xs">Principal</div>
            <div className="text-[#0f1857] font-black">{fmt(principal)}</div>
            <div className="text-[#0176C7] font-bold text-xs">({total > 0 ? Math.round(pPct * 100) : 0}%)</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="w-3 h-3 rounded-full bg-[#a5b4fc] mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-bold text-[#0f1857] text-xs">Interest</div>
            <div className="text-[#0f1857] font-black">{fmt(interest)}</div>
            <div className="text-[#a5b4fc] font-bold text-xs">({total > 0 ? Math.round(iPct * 100) : 0}%)</div>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Total Repayment</div>
          <div className="text-[#0f1857] font-black text-base">{fmt(total)}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Balance Chart ─────────────── */
function BalanceChart({ schedule }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  if (!schedule || !schedule.length) return (
    <div className="flex items-center justify-center h-40 text-gray-400 text-sm font-semibold">
      <BarChart3 size={20} className="mr-2 opacity-50" /> Enter loan details to see chart
    </div>
  )
  const startBal = schedule[0]?.openBal || 0
  const data = [{ month: 0, balance: startBal }, ...schedule.map(s => ({ month: s.month, balance: s.closeBal }))]
  const w = 500, h = 200
  const padding = { left: 55, right: 20, top: 20, bottom: 30 }
  const chartWidth = w - padding.left - padding.right
  const chartHeight = h - padding.top - padding.bottom
  const totalMonths = schedule.length
  const points = data.map((d, i) => ({
    x: padding.left + (i / totalMonths) * chartWidth,
    y: padding.top + (1 - d.balance / startBal) * chartHeight,
    month: d.month, balance: d.balance
  }))
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const areaD = pathD + ` L ${points[points.length - 1].x.toFixed(1)} ${(padding.top + chartHeight).toFixed(1)} L ${padding.left} ${(padding.top + chartHeight).toFixed(1)} Z`
  const yTicks = [0, 0.25, 0.5, 0.75, 1]
  const xTicks = [0, Math.round(totalMonths * 0.25), Math.round(totalMonths * 0.5), Math.round(totalMonths * 0.75), totalMonths]
  const formatY = v => { if (v >= 10000000) return `₹${(v / 10000000).toFixed(1)}Cr`; if (v >= 100000) return `₹${(v / 100000).toFixed(0)}L`; return `₹${(v / 1000).toFixed(0)}K` }
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width * w
    const relX = x - padding.left
    let idx = Math.round((relX / chartWidth) * totalMonths)
    setHoveredIndex(Math.max(0, Math.min(totalMonths, idx)))
  }
  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : null
  return (
    <div className="w-full relative select-none">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto cursor-crosshair"
        onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredIndex(null)}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        {yTicks.map(f => (
          <line key={f} x1={padding.left} x2={w - padding.right} y1={padding.top + f * chartHeight} y2={padding.top + f * chartHeight} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 2" />
        ))}
        {yTicks.map(f => (
          <text key={`y${f}`} x={padding.left - 8} y={padding.top + f * chartHeight + 3} fontSize="8" fill="#94a3b8" fontWeight="700" textAnchor="end">
            {formatY(startBal * (1 - f))}
          </text>
        ))}
        <path d={areaD} fill="url(#areaGrad)" />
        <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {xTicks.map(idx => {
          const pt = points[idx]
          if (!pt) return null
          return <text key={`x${idx}`} x={pt.x} y={h - 10} fontSize="8" fill="#94a3b8" fontWeight="700" textAnchor="middle">Mo {idx}</text>
        })}
        {activePoint && (
          <>
            <line x1={activePoint.x} x2={activePoint.x} y1={padding.top} y2={padding.top + chartHeight} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 2px 4px rgba(99,102,241,0.4))' }} />
            <foreignObject
              x={activePoint.x + 160 > w - padding.right ? activePoint.x - 160 : activePoint.x + 10}
              y={Math.max(padding.top, activePoint.y - 30)}
              width="148" height="60" style={{ pointerEvents: 'none' }}>
              <div className="bg-white rounded-lg p-2.5 border border-slate-100 shadow-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                <div className="text-[10px] font-bold text-slate-400">Month {activePoint.month}</div>
                <div className="text-xs font-black text-indigo-600 mt-0.5">Outstanding: {fmt(activePoint.balance)}</div>
              </div>
            </foreignObject>
          </>
        )}
      </svg>
    </div>
  )
}

/* ── Default Dummy Data ─────────────── */
const defaultScenarios = [
  {
    id: 'sc-1', customerName: 'Priya Mehta', date: '03 Jul 2026',
    monthlyIncome: 95000, foirPct: 50, roi: 9.5, tenureMode: 'Mo', tenureVal: 120,
    personalLoan: 0, homeLoan: 0, carLoan: 0, twoWheeler: 0, consumerLoan: 0,
    goldLoan: 0, otherEmi: 0, ccOutstanding: 0, procFee: 1.0, insurance: 0.5,
    fixedMisc: 2500, plOutstanding: 0, ccDebtOutstanding: 0
  },
  {
    id: 'sc-2', customerName: 'Aishwarya Roy', date: '02 Jul 2026',
    monthlyIncome: 180000, foirPct: 60, roi: 8.9, tenureMode: 'Mo', tenureVal: 240,
    personalLoan: 20000, homeLoan: 0, carLoan: 0, twoWheeler: 0, consumerLoan: 0,
    goldLoan: 0, otherEmi: 2000, ccOutstanding: 50000, procFee: 1.0, insurance: 0.5,
    fixedMisc: 2500, plOutstanding: 200000, ccDebtOutstanding: 50000
  },
  {
    id: 'sc-3', customerName: 'Rahul Sharma', date: '30 Jun 2026',
    monthlyIncome: 120000, foirPct: 50, roi: 9.5, tenureMode: 'Mo', tenureVal: 120,
    personalLoan: 15000, homeLoan: 0, carLoan: 5000, twoWheeler: 0, consumerLoan: 0,
    goldLoan: 0, otherEmi: 0, ccOutstanding: 0, procFee: 1.0, insurance: 0.5,
    fixedMisc: 2500, plOutstanding: 0, ccDebtOutstanding: 0
  }
]

/* ── Loan type config ─────────────── */
const LOAN_TYPES = ['Personal Loan', 'Home Loan', 'Property Loan', 'Car Loan / Auto Loan', 'Two Wheeler Loan', 'Consumer Loan', 'Gold Loan', 'Credit Card', 'Other']
const LOAN_STATUS_OPTIONS = ['Live', 'BT', 'Proposed Closure', 'Closed']

const LOAN_TYPE_STYLE = {
  'Personal Loan': { bg: '#ede9fe', color: '#7c3aed', Icon: 'User' },
  'Home Loan': { bg: '#dbeafe', color: '#1d4ed8', Icon: 'Home' },
  'Property Loan': { bg: '#ede9fe', color: '#6d28d9', Icon: 'Building2' },
  'Car Loan / Auto Loan': { bg: '#ffedd5', color: '#c2410c', Icon: 'Car' },
  'Two Wheeler Loan': { bg: '#dcfce7', color: '#16a34a', Icon: 'Bike' },
  'Consumer Loan': { bg: '#ccfbf1', color: '#0f766e', Icon: 'ShoppingCart' },
  'Gold Loan': { bg: '#fef9c3', color: '#b45309', Icon: 'Medal' },
  'Credit Card': { bg: '#fee2e2', color: '#dc2626', Icon: 'CreditCard' },
  'Other': { bg: '#f1f5f9', color: '#475569', Icon: 'ListTodo' },
}

const STATUS_STYLE = {
  'Live': { bg: '#dcfce7', color: '#16a34a' },
  'BT': { bg: '#ffedd5', color: '#c2410c' },
  'Proposed Closure': { bg: '#e0e7ff', color: '#4338ca' },
  'Closed': { bg: '#f1f5f9', color: '#64748b' },
}

/* ── Compute derived values ─────────────── */
function computeValues(s) {
  const tenureMonths = s.tenureMode === 'Yr' ? s.tenureVal * 12 : s.tenureVal
  // Support override from new loans array, fall back to legacy individual fields
  const totalLoanEmi = s.totalLoanEmiOverride !== undefined
    ? s.totalLoanEmiOverride
    : ((s.personalLoan || 0) + (s.homeLoan || 0) + (s.carLoan || 0) + (s.twoWheeler || 0) + (s.consumerLoan || 0) + (s.goldLoan || 0) + (s.otherEmi || 0))
  const ccObligation = s.ccObligationOverride !== undefined
    ? s.ccObligationOverride
    : Math.round((s.ccOutstanding || 0) * 0.05)
  const totalEmiObligation = totalLoanEmi + ccObligation
  const allowedEmi = Math.round(s.monthlyIncome * s.foirPct / 100)
  const eligibleEmi = Math.max(0, allowedEmi - totalEmiObligation)
  const eligibleLoan = Math.round(calcPrincipal(eligibleEmi, s.roi, tenureMonths))
  const emi = calcEMI(eligibleLoan, s.roi, tenureMonths)
  const totalRepayment = Math.round(emi * tenureMonths)
  const totalInterest = Math.max(0, totalRepayment - eligibleLoan)
  const procFee = s.procFee !== undefined ? s.procFee : 1.0
  const insurance = s.insurance !== undefined ? s.insurance : 0.5
  const fixedMisc = s.fixedMisc !== undefined ? s.fixedMisc : 2500
  const procFeeAmt = Math.round(eligibleLoan * procFee / 100)
  const gstOnProc = Math.round(procFeeAmt * 0.18)
  const insuranceAmt = Math.round(eligibleLoan * insurance / 100)
  const netDisbursed = eligibleLoan - procFeeAmt - gstOnProc - insuranceAmt - fixedMisc
  const btOutstanding = (s.plOutstanding || 0) + (s.ccDebtOutstanding || 0)
  const btNetDisbursal = eligibleLoan - btOutstanding
  const netFoir = s.monthlyIncome > 0 ? Math.round(((totalEmiObligation + eligibleEmi) / s.monthlyIncome) * 100) : 0
  const schedule = buildSchedule(eligibleLoan, s.roi, tenureMonths)
  return { tenureMonths, totalLoanEmi, ccObligation, totalEmiObligation, allowedEmi, eligibleEmi, eligibleLoan, totalRepayment, totalInterest, procFeeAmt, gstOnProc, insuranceAmt, netDisbursed, btOutstanding, btNetDisbursal, netFoir, schedule }
}

/* ═══════════════════════════════════════════════════ */
export default function EligibilityCalculatorPage() {
  const sectionRef = useRef(null)

  /* Tabs */
  const [activeTab, setActiveTab] = useState('calculator')
  const [showPrintPreview, setShowPrintPreview] = useState(false)
  const [saveModalData, setSaveModalData] = useState(null)

  /* Saved Scenarios */
  const [savedSearch, setSavedSearch] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortDesc, setSortDesc] = useState(true)
  const [expandedCardIds, setExpandedCardIds] = useState([])

  const getStoredScenarios = () => {
    try {
      const saved = localStorage.getItem('finflex_scenarios')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.length > 0) return parsed
      }
    } catch (e) { /* ignore */ }
    return defaultScenarios
  }
  const [scenarios, setScenarios] = useState(getStoredScenarios)
  useEffect(() => { localStorage.setItem('finflex_scenarios', JSON.stringify(scenarios)) }, [scenarios])

  /* Calculator Fields */
  const [customerName, setCustomerName] = useState('')
  const [monthlyIncome, setIncome] = useState(100000)
  const [foirPct, setFoir] = useState(75)
  const [roi, setRoi] = useState(9.5)
  const [tenureMode, setTenureMode] = useState('Mo')
  const [tenureVal, setTenureVal] = useState(120)
  const [plOutstanding, setPlOutstanding] = useState(0)
  const [ccDebtOutstanding, setCcDebtOutstanding] = useState(0)

  /* My Loans state */
  const [loans, setLoans] = useState([])
  const [showLoanForm, setShowLoanForm] = useState(false)
  const [loanMenuId, setLoanMenuId] = useState(null)
  const [showAllLoans, setShowAllLoans] = useState(false)
  const [editLoanId, setEditLoanId] = useState(null)
  const [loanSort, setLoanSort] = useState('recent')
  const emptyLoanForm = useRef({ loanType: '', loanAmount: '', outstanding: '', declaredEmi: '', financerName: '', status: '' }).current
  const [loanFormData, setLoanFormData] = useState(() => ({ ...emptyLoanForm }))

  // Close dropdown on outside click
  useEffect(() => {
    if (!loanMenuId) return
    const handler = (e) => {
      if (e.target.closest('.loan-menu-container') || e.target.closest('.loan-menu-trigger')) {
        return
      }
      setLoanMenuId(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [loanMenuId])

  useEffect(() => {
    if (monthlyIncome <= 25000) {
      setFoir(50)
    } else if (monthlyIncome <= 50000) {
      setFoir(60)
    } else if (monthlyIncome < 75000) {
      setFoir(70)
    } else {
      setFoir(75)
    }
  }, [monthlyIncome])

  /* Schedule state */
  const [searchMonth, setSearchMonth] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 12

  /* Derived from loans */
  const totalLoanEmiOverride = useMemo(() => loans.reduce((sum, l) => sum + (Number(l.declaredEmi) || 0), 0), [loans])
  const ccObligationOverride = 0
  const procFee = 1.0
  const insurance = 0.5
  const fixedMisc = 2500

  /* Current scenario object */
  const currentState = {
    tenureMode, tenureVal, monthlyIncome, foirPct, roi,
    procFee, insurance, fixedMisc,
    plOutstanding, ccDebtOutstanding,
    totalLoanEmiOverride,
    ccObligationOverride,
    loans
  }

  const {
    tenureMonths, totalLoanEmi, ccObligation, totalEmiObligation,
    allowedEmi, eligibleEmi, eligibleLoan, totalRepayment, totalInterest,
    procFeeAmt, gstOnProc, insuranceAmt, netDisbursed,
    btOutstanding, btNetDisbursal, netFoir, schedule
  } = useMemo(() => computeValues(currentState), [
    monthlyIncome, foirPct, roi, tenureMode, tenureVal,
    plOutstanding, ccDebtOutstanding, totalLoanEmiOverride
  ])

  /* Schedule pagination */
  const filteredSchedule = useMemo(() => {
    if (!searchMonth.trim()) return schedule
    return schedule.filter(r => r.month.toString().includes(searchMonth.trim()))
  }, [schedule, searchMonth])

  const totalPages = Math.max(1, Math.ceil(filteredSchedule.length / PAGE_SIZE))
  const paginatedSchedule = filteredSchedule.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  useEffect(() => setCurrentPage(1), [searchMonth, schedule])

  /* FOIR status */
  const foirColor = netFoir <= 40 ? '#22c55e' : netFoir <= 55 ? '#f59e0b' : '#ef4444'
  const foirStatus = netFoir <= 40 ? 'Excellent' : netFoir <= 55 ? 'Moderate' : 'High Risk'
  const FoirIcon = netFoir <= 40 ? CheckCircle2 : netFoir <= 55 ? AlertTriangle : XCircle

  /* Scenarios helpers */
  const toggleCardExpand = (id) => setExpandedCardIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  const saveCurrentScenario = () => {
    const newSc = {
      id: `sc-${Date.now()}`,
      customerName: customerName.trim() || `Scenario ${new Date().toLocaleDateString('en-IN')}`,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      ...currentState,
    }
    setScenarios(prev => [newSc, ...prev])
    setSaveModalData(newSc.customerName)
  }
  const loadScenario = (sc) => {
    setCustomerName(sc.customerName)
    setIncome(sc.monthlyIncome)
    setFoir(sc.foirPct)
    setRoi(sc.roi)
    setTenureMode(sc.tenureMode)
    setTenureVal(sc.tenureVal)
    setLoans(sc.loans || [])
    setPlOutstanding(sc.plOutstanding || 0)
    setCcDebtOutstanding(sc.ccDebtOutstanding || 0)
    setActiveTab('calculator')
  }
  const cloneScenario = (sc) => setScenarios(prev => [{ ...sc, id: `sc-${Date.now()}`, customerName: `${sc.customerName} (Copy)`, date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }, ...prev])
  const deleteScenario = (id) => {
    const updated = scenarios.filter(s => s.id !== id)
    setScenarios(updated.length > 0 ? updated : defaultScenarios)
  }
  const clearAll = () => { localStorage.removeItem('finflex_scenarios'); setScenarios(defaultScenarios) }
  const resetCalculator = () => {
    setCustomerName(''); setIncome(100000); setFoir(75); setRoi(9.5)
    setTenureMode('Mo'); setTenureVal(120)
    setLoans([]); setLoanFormData(emptyLoanForm); setShowLoanForm(false)
    setPlOutstanding(0); setCcDebtOutstanding(0)
  }

  /* Loan helpers */
  const getLoanTypeIcon = (loanType) => {
    const style = LOAN_TYPE_STYLE[loanType] || LOAN_TYPE_STYLE['Other']
    const icons = { User, Home, Building2, Car, Bike, ShoppingCart, Medal, CreditCard, ListTodo }
    return { Icon: icons[style.Icon] || ListTodo, bg: style.bg, color: style.color }
  }
  const addLoan = () => {
    if (!loanFormData.loanType || !loanFormData.declaredEmi) return
    if (editLoanId) {
      setLoans(prev => prev.map(l => l.id === editLoanId ? { ...loanFormData, id: editLoanId } : l))
      setEditLoanId(null)
    } else {
      setLoans(prev => [{ ...loanFormData, id: `loan-${Date.now()}` }, ...prev])
    }
    setLoanFormData(emptyLoanForm)
    setShowLoanForm(false)
  }
  const deleteLoan = (id) => { setLoans(prev => prev.filter(l => l.id !== id)); setLoanMenuId(null) }
  const editLoan = (loan) => { setLoanFormData({ ...loan }); setEditLoanId(loan.id); setShowLoanForm(true); setLoanMenuId(null) }
  const sortedLoans = useMemo(() => {
    const list = [...loans]
    if (loanSort === 'emi_high') return list.sort((a, b) => (Number(b.declaredEmi) || 0) - (Number(a.declaredEmi) || 0))
    if (loanSort === 'emi_low') return list.sort((a, b) => (Number(a.declaredEmi) || 0) - (Number(b.declaredEmi) || 0))
    if (loanSort === 'type') return list.sort((a, b) => a.loanType.localeCompare(b.loanType))
    return list // recently added
  }, [loans, loanSort])
  const visibleLoans = showAllLoans ? sortedLoans : sortedLoans.slice(0, 4)

  /* Filtered + sorted scenarios */
  const filteredScenarios = useMemo(() => {
    let list = scenarios.filter(sc => sc.customerName?.toLowerCase().includes(savedSearch.toLowerCase()))
    const compute = sc => computeValues(sc)
    list = list.sort((a, b) => {
      let va, vb
      if (sortBy === 'date') { va = new Date(a.date).getTime(); vb = new Date(b.date).getTime() }
      else if (sortBy === 'salary') { va = a.monthlyIncome; vb = b.monthlyIncome }
      else { va = compute(a).eligibleLoan; vb = compute(b).eligibleLoan }
      return sortDesc ? vb - va : va - vb
    })
    return list
  }, [scenarios, savedSearch, sortBy, sortDesc])

  /* GSAP */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.elig-header', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* Excel export */
  const exportExcel = () => {
    if (!schedule.length) return
    const BOM = '\uFEFF'
    const rows = ['Month,Opening Balance,Monthly EMI,Principal Paid,Interest Paid,Closing Balance',
      ...schedule.map(r => `${r.month},${r.openBal},${Math.round(calcEMI(schedule[0].openBal, roi, schedule.length))},${r.prinPaid},${r.intPaid},${r.closeBal}`)].join('\n')
    const url = URL.createObjectURL(new Blob([BOM + rows], { type: 'text/csv;charset=utf-8;' }))
    const a = document.createElement('a'); a.href = url
    a.download = `Amortization_${customerName.trim() || 'Loan'}.xlsx`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div ref={sectionRef} className="min-h-screen" style={{ background: '#f8f9ff', paddingTop: '100px' }}>

      {showPrintPreview ? (
        /* ── PRINT PREVIEW PAGE (INLINE IN PAGE FLOW) ── */
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 pb-16">
          <style>{`
            @media print {
              body * { visibility: hidden; }
              .print-preview-wrapper, .print-preview-wrapper * { visibility: visible; }
              .print-preview-wrapper { position: absolute; left: 0; top: 0; width: 100%; }
              .no-print, .no-print * { display: none !important; height: 0 !important; }
              .print-page { box-shadow: none !important; border: none !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; }
              * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
            }
          `}</style>
          <div className="print-preview-wrapper min-h-screen">

            {/* In-page top bar - hidden on print */}
            <div className="no-print bg-white border border-slate-100 rounded-xl px-5 py-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-sm text-slate-600 font-bold">
                <FileText size={16} className="text-slate-400" />
                <span>Premium Banking Proposal Preview. Ready to download or print?</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowPrintPreview(false)}
                  className="text-xs border border-slate-400 px-3 py-2 rounded-xl font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer px-2">
                  Close
                </button>
                <button onClick={() => window.print()}
                  className="px-6 py-2.5 text-xs font-black text-white rounded-lg transition-colors cursor-pointer shadow-sm hover:opacity-90"
                  style={{ background: '#4f46e5' }}>
                  Print / Save as PDF
                </button>
              </div>
            </div>

            {/* Printable Document Sheet */}
            <div className="print-page max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

              {/* Document Header */}
              <div className="px-8 pt-8 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Proposal Date</div>
                    <div className="font-bold text-slate-500 text-sm">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    <div className="text-[10px] text-slate-400 mt-1">Ref: FF-{Date.now().toString().slice(-6)}</div>
                  </div>
                </div>
              </div>

              {/* Client Summary Strip */}
              <div className="px-8 pb-4">
                <div className="px-6 py-5 bg-[#f8f9fc] rounded-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#8c98a4] mb-2">Prepared For</div>
                      <div className="font-black text-slate-800 text-[15px]">{customerName.trim() || 'Valued Client'}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#8c98a4] mb-2">Gross Monthly Income</div>
                      <div className="font-black text-slate-800 text-[15px]">{fmt(monthlyIncome)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#8c98a4] mb-2">Affordability Status</div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md bg-[#e2e8f0] text-slate-700">
                          {foirStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disbursal Hero */}
              <div className="px-8 pb-6">
                <div className="rounded-xl p-8 text-white relative overflow-hidden" style={{ backgroundColor: '#2d2665' }}>
                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-2">Final Net Disbursal Amount</div>
                      <div className="font-black text-5xl tracking-tight text-white mb-2">{fmt(Math.max(0, netDisbursed))}</div>
                      <div className="text-indigo-200/80 text-xs font-semibold">Net credited to bank account after consolidation payoffs &amp; premium banking charges</div>
                    </div>
                    <div className="bg-white/10 rounded-xl px-6 py-5 flex-shrink-0 min-w-[200px] text-center border border-white/5">
                      <div className="text-[9px] font-black uppercase tracking-widest text-indigo-200 mb-2">Eligible Loan Principal</div>
                      <div className="font-black text-2xl text-white">{fmt(eligibleLoan)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Summary + Deduction Breakdown */}
              <div className="px-8 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Loan Summary */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 size={14} className="text-[#0176C7]" />
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-800">Loan Summary</h5>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      ['Monthly Income', fmt(monthlyIncome)],
                      ['FOIR', `${foirPct}%`],
                      ['Maximum Allowed EMI', fmt(allowedEmi)],
                      ['Total EMI Obligation', fmt(totalEmiObligation)],
                      ['Eligible EMI Capacity', fmt(eligibleEmi)],
                      ['Interest Rate (ROI)', `${roi}%`],
                      ['Loan Tenure', `${tenureMonths} Months (${(tenureMonths / 12).toFixed(1)} Years)`],
                      ['Monthly EMI', fmt(eligibleEmi)],
                      ['Total Interest', fmt(totalInterest)],
                    ].map(([l, v]) => (
                      <div key={l} className="flex justify-between items-center text-sm border-b border-slate-50 pb-1.5">
                        <span className="text-[#0176C7] font-semibold text-xs">{l}</span>
                        <span className="font-bold text-slate-800 text-xs">{v}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-sm pt-1">
                      <span className="font-black text-slate-800">Total Repayment</span>
                      <span className="font-black text-slate-800">{fmt(totalRepayment)}</span>
                    </div>
                  </div>
                </div>

                {/* Deduction Breakdown */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingDown size={14} className="text-red-500" />
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-800">Deduction Breakdown</h5>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      ['Eligible Loan Amount', fmt(eligibleLoan), false],
                      ['Total Personal Loan BT Outstanding', fmt(plOutstanding), false],
                      ['Total Credit Card BT Outstanding', fmt(ccDebtOutstanding), false],
                      ['Total Balance Transfer Outstanding', fmt(btOutstanding), false],
                      ['Balance Transfer Eligible Amount', fmt(eligibleLoan), true],
                      ['GST (18%)', fmt(gstOnProc), false],
                      ['Insurance', fmt(insuranceAmt), false],
                      ['Miscellaneous Charges', fmt(fixedMisc), false],
                    ].map(([l, v, highlight]) => (
                      <div key={l} className={`flex justify-between items-center text-sm border-b border-slate-50 pb-1.5 ${highlight ? 'font-bold' : ''}`}>
                        <span className={`text-xs font-semibold ${highlight ? 'text-[#0176C7]' : 'text-slate-600'}`}>{l}</span>
                        <span className={`font-bold text-xs ${highlight ? 'text-[#0176C7]' : 'text-slate-800'}`}>{v}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-sm pt-1 border-t-2 border-slate-200 mt-2">
                      <span className="font-black text-[#1a237e]">Total Charges</span>
                      <span className="font-black text-red-600">{fmt(procFeeAmt + gstOnProc + insuranceAmt + fixedMisc)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-black text-[#1a237e]">Final Net Disbursal Amount</span>
                      <span className="font-black text-[#1a237e]">{fmt(Math.max(0, netDisbursed))}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="px-8 pb-6">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-[10px] text-amber-800 leading-relaxed">
                    <span className="font-black">Important Disclaimer:</span> This loan eligibility analysis is generated based entirely on the customized financial coordinates provided by the user. It does not constitute a formal commitment, pre-approval, or guarantee of a loan by any specific financial institution. Actual loan terms, processing timelines, insurance costs, and interest rates are determined upon comprehensive underwriting, credit checks (e.g. CIBIL score), and document validation.
                  </p>
                </div>
              </div>

              {/* Complete Repayment Schedule */}
              <div className="px-8 pb-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText size={15} className="text-[#0176C7]" />
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-800">Complete Repayment Schedule</h5>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Tenure: {tenureMonths} Months</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-xs min-w-[580px]">
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg,#1a237e,#0d47a1)' }}>
                        {['EMI #', 'Month', 'Opening Balance', 'Monthly EMI', 'Principal Paid', 'Interest Paid', 'Closing Balance'].map(h => (
                          <th key={h} className="text-left py-3 px-3 text-[10px] font-black uppercase tracking-wider text-white">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((row, idx) => (
                        <tr key={row.month} className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                          <td className="py-2.5 px-3 font-bold text-slate-400">{row.month}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-800">Month {row.month}</td>
                          <td className="py-2.5 px-3 text-slate-700">{fmt(row.openBal)}</td>
                          <td className="py-2.5 px-3 font-black text-[#1a237e]">{fmt(eligibleEmi)}</td>
                          <td className="py-2.5 px-3 font-bold text-green-600">+{fmt(row.prinPaid)}</td>
                          <td className="py-2.5 px-3 font-bold text-red-500">+{fmt(row.intPaid)}</td>
                          <td className="py-2.5 px-3 text-slate-700">{fmt(row.closeBal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {schedule.length === 0 && (
                    <p className="text-center text-gray-400 py-8 text-sm">No schedule to display. Enter loan parameters first.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : (
        <>
          {/* ── PAGE HEADER ── */}
          <div className="elig-header text-center pt-6 pb-8 px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
              style={{ background: '#e8eaf6', border: '1px solid #c5cae9' }}>
              <ShieldCheck size={14} className="text-[#1a237e]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#1a237e]">Eligibility Calculator</span>
            </div>
            <h1 className="font-black leading-tight mb-2" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', color: '#0f1857' }}>
              Check Your <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">Loan Eligibility</span>
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto mb-6">
              Find out instantly how much loan you can get based on your income and credit profile. Transparency from the very first step.
            </p>

            {/* Tab Toggle */}
            <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl shadow-sm">
              <button onClick={() => setActiveTab('calculator')}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'calculator' ? 'bg-white text-[#0176C7] shadow-sm font-black' : 'text-slate-500 hover:text-slate-800'}`}>
                <Calculator size={13} /> Core Calculator
              </button>
              <button onClick={() => setActiveTab('saved')}
                className={`px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'saved' ? 'bg-white text-[#0176C7] shadow-sm font-black' : 'text-slate-500 hover:text-slate-800'}`}>
                <Bookmark size={13} /> Saved Scenarios
                {scenarios.length > 0 && (
                  <span className="ml-0.5 bg-[#0176C7] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{scenarios.length}</span>
                )}
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════ */}
          {activeTab === 'saved' ? (

            /* ── SAVED SCENARIOS TAB ── */
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 pb-16">

              {/* Filters Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 mb-6 shadow-sm">
                <div className="relative w-full sm:max-w-xs">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="Search saved client..." value={savedSearch}
                    onChange={e => setSavedSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl text-sm text-[#0f1857] font-bold outline-none focus:border-[#0176C7] transition-all" />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1"><Filter size={12} /> Sort:</span>
                  {[['date', 'Date', CalendarDays], ['salary', 'Salary', Wallet], ['loan', 'Loan', IndianRupee]].map(([key, label, Icon]) => (
                    <button key={key} onClick={() => { if (sortBy === key) setSortDesc(d => !d); else { setSortBy(key); setSortDesc(true) } }}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${sortBy === key ? 'bg-[#0176C7] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                      <Icon size={12} /> {label} {sortBy === key ? (sortDesc ? '↓' : '↑') : ''}
                    </button>
                  ))}
                  <button onClick={clearAll}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 font-bold text-xs rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
                    <Trash2 size={12} /> Clear All
                  </button>
                </div>
              </div>

              {/* Scenario Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredScenarios.map(sc => {
                  const isExpanded = expandedCardIds.includes(sc.id)
                  const cv = computeValues(sc)
                  const tenM = sc.tenureMode === 'Yr' ? sc.tenureVal * 12 : sc.tenureVal
                  return (
                    <div key={sc.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition-shadow" style={{ boxShadow: '0 4px 20px rgba(15,24,87,0.06)' }}>
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg,#0176C7,#1a237e)', color: '#fff' }}>
                            {sc.customerName?.charAt(0)?.toUpperCase() || 'S'}
                          </div>
                          <div>
                            <div className="font-black text-[#0f1857] text-base leading-tight line-clamp-1">{sc.customerName}</div>
                            <div className="text-xs text-slate-700 font-bold flex items-center gap-1 mt-0.5">
                              <CalendarDays size={12} /> {sc.date}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-black px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">#{sc.id.slice(-4)}</span>
                      </div>

                      {/* Eligible Loan highlight */}
                      <div className="rounded-xl p-3 mb-4" style={{ background: 'linear-gradient(135deg,#f0f6ff,#e8eaf6)' }}>
                        <div className="text-[11px] font-black uppercase tracking-wider text-slate-700 mb-0.5">Eligible Loan Amount</div>
                        <div className="font-black text-xl text-[#0176C7]">{fmt(cv.eligibleLoan)}</div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-2 text-xs mb-4">
                        {[
                          { icon: <Wallet size={12} />, label: 'Monthly Salary', value: fmt(sc.monthlyIncome) },
                          { icon: <Percent size={12} />, label: 'ROI / Tenure', value: `${sc.roi}% @ ${tenM} Mo` },
                          { icon: <IndianRupee size={12} />, label: 'Monthly EMI', value: fmt(cv.eligibleEmi) },
                          { icon: <TrendingUp size={12} />, label: 'Total Repayment', value: fmt(cv.totalRepayment) },
                        ].map(item => (
                          <div key={item.label} className="flex justify-between items-center">
                            <span className="text-slate-600 font-bold flex items-center gap-1">{item.icon}{item.label}:</span>
                            <span className="font-black text-slate-800">{item.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Collapsible Breakdown */}
                      <div>
                        <button onClick={() => toggleCardExpand(sc.id)}
                          className="flex items-center justify-between w-full text-xs font-black text-indigo-700 uppercase tracking-wider py-2 border-t border-slate-100 hover:text-indigo-900 transition-colors cursor-pointer">
                          Show Breakdown Details
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {isExpanded && (
                          <div className="space-y-1.5 text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-1">
                            {[
                              ['Personal Loan EMI', fmt(sc.personalLoan)],
                              ['Home Loan EMI', fmt(sc.homeLoan)],
                              ['Car Loan EMI', fmt(sc.carLoan)],
                              ['CC Outstanding', fmt(sc.ccOutstanding)],
                              ['CC Obligation (5%)', fmt(cv.ccObligation)],
                              ['Proc. Fee', `${sc.procFee}%`],
                              ['Net Disbursed', fmt(cv.netDisbursed)],
                            ].map(([l, v]) => (
                              <div key={l} className="flex justify-between"><span>{l}:</span><span className="font-bold">{v}</span></div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                        <button onClick={() => loadScenario(sc)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-xl hover:bg-indigo-100 transition-colors cursor-pointer">
                          <Edit size={12} /> Load
                        </button>
                        <button onClick={() => cloneScenario(sc)}
                          className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 cursor-pointer" title="Duplicate">
                          <Copy size={12} />
                        </button>
                        <button onClick={() => deleteScenario(sc.id)}
                          className="w-8 h-8 flex items-center justify-center border border-red-100 rounded-xl hover:bg-red-50 transition-colors text-red-500 cursor-pointer" title="Delete">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
              {filteredScenarios.length === 0 && (
                <p className="text-center text-slate-400 py-12 text-sm font-semibold">No saved scenarios found.</p>
              )}
            </div>

          ) : (

            /* ── CORE CALCULATOR TAB ── */
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 pb-16">
              <div className="grid lg:grid-cols-12 gap-6 items-start">

                {/* ════════ LEFT PANEL ════════ */}
                <div className="lg:col-span-7 space-y-6">

                  {/* Financial Coordinates */}
                  <div className="bg-white rounded-2xl border border-[#e8edf5] p-5 md:p-7" style={{ boxShadow: '0 8px 30px rgba(15,24,87,0.05)' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[#f8fafc]">
                      <div className="flex items-center gap-2">
                        <SectionTitle icon={<Calculator size={15} />} className="!mb-0">Financial Coordinates</SectionTitle>
                        <button onClick={resetCalculator}
                          className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer text-slate-400 hover:text-indigo-600" title="Reset">
                          <RefreshCw size={12} />
                        </button>
                      </div>
                      <button onClick={saveCurrentScenario}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#0176C7] text-white font-bold text-xs rounded-xl hover:bg-[#0155AD] transition-all cursor-pointer shadow-sm">
                        <Save size={12} /> Save Scenario
                      </button>
                    </div>

                    {/* Customer Name */}
                    <div className="mb-5">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-750 mb-2 flex items-center gap-1.5">
                        <User size={12} className="text-[#0176C7]" /> Customer Name <span className="text-slate-500 normal-case font-medium">(optional)</span>
                      </label>
                      <input type="text" placeholder="e.g. Rahul Sharma" value={customerName} onChange={e => setCustomerName(e.target.value)}
                        className="w-full bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[#0f1857] font-bold text-sm outline-none focus:border-[#0176C7] transition-all placeholder:text-gray-400" />
                    </div>

                    {/* Income & FOIR */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-750 flex items-center gap-1"><Banknote size={12} className="text-[#0176C7]" /> Monthly Income</label>
                          <span className="text-sm font-black text-[#0176C7]">{fmt(monthlyIncome)}</span>
                        </div>
                        <NumField value={monthlyIncome} onChange={setIncome} />
                        <input type="range" min="10000" max="2000000" step="5000" value={monthlyIncome} onChange={e => setIncome(Number(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0176C7] mt-3" />
                        <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-bold"><span>₹10K</span><span>₹20L</span></div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-750 flex items-center gap-1"><Percent size={12} className="text-[#0176C7]" /> Allowed FOIR (%)</label>
                          <span className="text-sm font-black text-[#0176C7]">{foirPct}%</span>
                        </div>
                        <input type="text" readOnly value={foirPct}
                          className="w-full bg-[#f1f5f9] border border-[#e2e8f0] rounded-xl px-4 py-3 text-[#94a3b8] font-bold text-[15px] outline-none cursor-not-allowed transition-all"
                        />
                        <div className="text-[11px] text-[#0176C7] mt-2 font-bold bg-[#e8f0fe] px-2 py-1 rounded-md inline-block">Auto-calculated based on income</div>
                      </div>
                    </div>

                    {/* ROI & Tenure */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-750 flex items-center gap-1"><Percent size={12} className="text-[#0176C7]" /> Interest Rate (ROI %)</label>
                          <span className="text-sm font-black text-[#0176C7]">{roi}%</span>
                        </div>
                        <NumField value={roi} onChange={setRoi} />
                        <input type="range" min="1" max="30" step="0.1" value={roi} onChange={e => setRoi(Number(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0176C7] mt-3" />
                        <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-bold"><span>1%</span><span>30%</span></div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-750 flex items-center gap-1"><Clock size={12} className="text-[#0176C7]" /> Loan Tenure</label>
                          <div className="flex bg-[#e8f0fe] rounded-lg overflow-hidden">
                            {['Mo', 'Yr'].map(m => (
                              <button key={m} onClick={() => { setTenureMode(m); setTenureVal(m === 'Yr' ? Math.max(1, Math.round(tenureVal / 12)) : tenureVal * 12) }}
                                className="px-3 py-1.5 text-xs font-black transition-all cursor-pointer"
                                style={{ background: tenureMode === m ? '#0176C7' : 'transparent', color: tenureMode === m ? '#fff' : '#0176C7' }}>
                                {m}
                              </button>
                            ))}
                          </div>
                        </div>
                        <NumField value={tenureVal} onChange={v => setTenureVal(Math.max(1, v))} />
                        <input type="range" min={tenureMode === 'Mo' ? 6 : 1} max={tenureMode === 'Mo' ? 360 : 30} step="1" value={tenureVal}
                          onChange={e => setTenureVal(Number(e.target.value))}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0176C7] mt-3" />
                        <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-bold">
                          <span>{tenureMode === 'Mo' ? '6 Mo' : '1 Yr'}</span><span>{tenureMode === 'Mo' ? '360 Mo' : '30 Yr'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── MY LOANS CARD ── */}
                  <div className="bg-white rounded-2xl border border-[#e8edf5]" style={{ boxShadow: '0 8px 30px rgba(15,24,87,0.05)' }}>

                    {/* Card Header */}
                    <div className="flex items-start justify-between p-5 md:p-6 pb-4 border-b border-[#f1f5f9]">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <CreditCard size={16} className="text-[#0176C7]" />
                          <h3 className="font-black text-[#0f1857] text-[15px]">My Loans</h3>
                        </div>
                        <p className="text-xs text-slate-500 font-semibold">Add and manage all your loan obligations</p>
                      </div>
                      <button onClick={() => { setShowLoanForm(true); setEditLoanId(null); setLoanFormData(emptyLoanForm) }}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-black text-white rounded-xl transition-all cursor-pointer shadow-sm hover:opacity-90 flex-shrink-0"
                        style={{ background: '#0176C7' }}>
                        <Plus size={13} /> Add Loan
                      </button>
                    </div>

                    {/* Add / Edit Form */}
                    {showLoanForm && (
                      <div className="p-5 md:p-6 border-b border-[#f1f5f9] bg-[#f8f9ff]">
                        <div className="flex items-center gap-2 mb-4">
                          <CreditCard size={14} className="text-[#0176C7]" />
                          <span className="text-sm font-black text-[#0f1857]">{editLoanId ? 'Edit Loan' : 'Add New Loan'}</span>
                        </div>

                        {/* Row 1 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5 block">Loan Type</label>
                            <div className="relative">
                              <select value={loanFormData.loanType} onChange={e => setLoanFormData(p => ({ ...p, loanType: e.target.value }))}
                                className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 text-[#0f1857] font-bold text-sm outline-none focus:border-[#0176C7] transition-all appearance-none cursor-pointer pr-8">
                                <option value="">Select Loan Type</option>
                                {LOAN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                              </select>
                              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                          </div>
                          <div>
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5 block">Loan Amount (₹)</label>
                            <input type="text" inputMode="numeric" placeholder="Enter loan amount"
                              value={loanFormData.loanAmount}
                              onChange={e => setLoanFormData(p => ({ ...p, loanAmount: e.target.value.replace(/[^0-9]/g, '') }))}
                              className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 text-[#0f1857] font-bold text-sm outline-none focus:border-[#0176C7] transition-all" />
                          </div>
                          <div>
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5 block">Outstanding (₹)</label>
                            <input type="text" inputMode="numeric" placeholder="Enter outstanding amount"
                              value={loanFormData.outstanding}
                              onChange={e => setLoanFormData(p => ({ ...p, outstanding: e.target.value.replace(/[^0-9]/g, '') }))}
                              className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 text-[#0f1857] font-bold text-sm outline-none focus:border-[#0176C7] transition-all" />
                          </div>
                          <div>
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5 block">Declared EMI (₹)</label>
                            <input type="text" inputMode="numeric" placeholder="Enter declared EMI"
                              value={loanFormData.declaredEmi}
                              onChange={e => setLoanFormData(p => ({ ...p, declaredEmi: e.target.value.replace(/[^0-9]/g, '') }))}
                              className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 text-[#0f1857] font-bold text-sm outline-none focus:border-[#0176C7] transition-all" />
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                          <div>
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5 block">Financer Name</label>
                            <input type="text" placeholder="Enter financer name"
                              value={loanFormData.financerName}
                              onChange={e => setLoanFormData(p => ({ ...p, financerName: e.target.value.toUpperCase() }))}
                              className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 text-[#0f1857] font-bold text-sm outline-none focus:border-[#0176C7] transition-all" />
                          </div>
                          <div>
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-600 mb-1.5 block">Status</label>
                            <div className="relative">
                              <select value={loanFormData.status} onChange={e => setLoanFormData(p => ({ ...p, status: e.target.value }))}
                                className="w-full bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 text-[#0f1857] font-bold text-sm outline-none focus:border-[#0176C7] transition-all appearance-none cursor-pointer pr-8">
                                <option value="">Select Status</option>
                                {LOAN_STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end gap-3">
                          <button onClick={() => {
                            if (editLoanId) { setShowLoanForm(false); setEditLoanId(null); }
                            setLoanFormData(emptyLoanForm)
                          }}
                            className="px-5 py-2 text-xs font-black border border-slate-300 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                            {editLoanId ? 'Cancel' : 'Reset'}
                          </button>
                          <button onClick={addLoan} disabled={!loanFormData.loanType || !loanFormData.declaredEmi}
                            className="px-6 py-2 text-xs font-black text-white rounded-xl transition-all cursor-pointer shadow-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                            style={{ background: '#0176C7' }}>
                            {editLoanId ? 'Update Loan' : 'Add Loan'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Loans List */}
                    <div className="p-5 md:p-6">
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <ListTodo size={14} className="text-[#0176C7]" />
                          <span className="font-black text-[#0f1857] text-sm">Your Loans ({loans.length})</span>
                        </div>
                        {loans.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500">Sort by:</span>
                            <div className="relative">
                              <select value={loanSort} onChange={e => setLoanSort(e.target.value)}
                                className="text-xs font-bold bg-[#f8f9ff] border border-[#e2e8f0] rounded-lg px-3 py-1.5 text-[#0f1857] outline-none focus:border-[#0176C7] appearance-none cursor-pointer pr-7">
                                <option value="recent">Recently Added</option>
                                <option value="emi_high">EMI: High to Low</option>
                                <option value="emi_low">EMI: Low to High</option>
                                <option value="type">Loan Type</option>
                              </select>
                              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Empty state */}
                      {loans.length === 0 && (
                        <div className="text-center py-10 text-slate-400">
                          <CreditCard size={32} className="mx-auto mb-3 opacity-30" />
                          <p className="text-sm font-semibold">No loans added yet</p>
                          <p className="text-xs mt-1">Click "+ Add Loan" to add your loan obligations</p>
                        </div>
                      )}

                      {/* Loan rows */}
                      <div className="space-y-0 divide-y divide-[#f1f5f9]">
                        {visibleLoans.map(loan => {
                          const { Icon, bg, color } = getLoanTypeIcon(loan.loanType)
                          const statusStyle = STATUS_STYLE[loan.status] || STATUS_STYLE['Live']
                          return (
                            <div key={loan.id} className="flex items-center gap-3 py-4 relative group">
                              {/* Icon */}
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                                <Icon size={16} style={{ color }} />
                              </div>
                              {/* Name + Financer */}
                              <div className="flex-1 min-w-0">
                                <div className="font-black text-[#0f1857] text-sm leading-tight truncate">{loan.loanType}</div>
                                {loan.financerName && <div className="text-xs text-slate-500 font-semibold truncate mt-0.5">{loan.financerName}</div>}
                              </div>
                              {/* Details - responsive grid */}
                              <div className="hidden sm:flex items-center gap-6 text-xs">
                                {loan.loanAmount && (
                                  <div>
                                    <div className="text-slate-500 font-medium mb-1">Loan Amount</div>
                                    <div className="font-black text-[#0f1857] mt-0.5">{fmt(Number(loan.loanAmount))}</div>
                                  </div>
                                )}
                                {loan.outstanding && (
                                  <div>
                                    <div className="text-slate-500 font-medium mb-1">Outstanding</div>
                                    <div className="font-black text-[#0f1857] mt-0.5">{fmt(Number(loan.outstanding))}</div>
                                  </div>
                                )}
                                <div>
                                  <div className="text-slate-500 font-medium mb-1">Declared EMI</div>
                                  <div className="font-black text-[#0f1857] mt-0.5">{fmt(Number(loan.declaredEmi))}</div>
                                </div>
                                {loan.status && (
                                  <div>
                                    <div className="text-slate-500 font-medium mb-1">Status</div>
                                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-black" style={{ background: statusStyle.bg, color: statusStyle.color }}>{loan.status}</span>
                                  </div>
                                )}
                              </div>
                              {/* Mobile: just show EMI + status */}
                              <div className="flex sm:hidden flex-col items-end gap-1">
                                <div className="font-black text-[#0176C7] text-sm">{fmt(Number(loan.declaredEmi))}</div>
                                {loan.status && <span className="px-2 py-0.5 rounded-full text-[10px] font-black" style={{ background: statusStyle.bg, color: statusStyle.color }}>{loan.status}</span>}
                              </div>
                              {/* 3-dot menu */}
                              <div className="relative flex-shrink-0">
                                <button onClick={() => setLoanMenuId(loanMenuId === loan.id ? null : loan.id)}
                                  className="loan-menu-trigger w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-slate-400">
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3" r="1.5" /><circle cx="8" cy="8" r="1.5" /><circle cx="8" cy="13" r="1.5" /></svg>
                                </button>
                                {loanMenuId === loan.id && (
                                  <div className="loan-menu-container absolute right-0 top-9 z-50 bg-white border border-slate-100 rounded-xl shadow-xl w-32 overflow-hidden" style={{ boxShadow: '0 8px 24px rgba(15,24,87,0.12)' }}>
                                    <button onClick={() => editLoan(loan)} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-[#f0f6ff] transition-colors cursor-pointer">
                                      <Edit size={12} className="text-[#0176C7]" /> Edit
                                    </button>
                                    <button onClick={() => deleteLoan(loan.id)} className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                                      <Trash2 size={12} /> Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* View All toggle */}
                      {loans.length > 4 && (
                        <button onClick={() => setShowAllLoans(p => !p)}
                          className="w-full flex items-center justify-center gap-1.5 pt-4 mt-2 border-t border-[#f1f5f9] text-xs font-black text-[#0176C7] hover:text-[#0155AD] transition-colors cursor-pointer">
                          {showAllLoans ? <><ChevronUp size={13} /> Show Less</> : <><ChevronDown size={13} /> View All Loans ({loans.length})</>}
                        </button>
                      )}

                      {/* Summary bar */}
                      {loans.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-[#f1f5f9] grid grid-cols-2 gap-3">
                          <div className="bg-[#f8f9ff] rounded-xl p-3 border border-[#e8edf5]">
                            <div className="text-xs font-bold text-slate-600 mb-1">Total Loan EMI</div>
                            <div className="font-black text-[#0176C7] text-sm">{fmt(totalLoanEmi)}</div>
                          </div>
                          <div className="bg-[#f8f9ff] rounded-xl p-3 border border-[#e8edf5]">
                            <div className="text-xs font-bold text-slate-600 mb-1">Total EMI Obligation</div>
                            <div className="font-black text-[#0176C7] text-sm">{fmt(totalEmiObligation)}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Debt Consolidation */}
                  <div className="bg-white rounded-2xl border border-[#e8edf5] p-5 md:p-7" style={{ boxShadow: '0 8px 30px rgba(15,24,87,0.05)' }}>
                    <SectionTitle icon={<TrendingDown size={15} />} className="mb-5">Debt Consolidation</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="bg-[#f8f9ff] rounded-xl p-4 border border-[#e8edf5]">
                        <StepField label="Personal Loan Outstanding" icon={<Building2 size={11} />} value={plOutstanding} onChange={setPlOutstanding} step={5000} />
                        <div className="flex justify-between mt-3 text-xs">
                          <span className="text-[#0176C7] font-black uppercase tracking-wider">Total Personal Outstanding</span>
                          <span className="text-[#0f1857] font-black">{fmt(plOutstanding)}</span>
                        </div>
                      </div>
                      <div className="bg-[#f8f9ff] rounded-xl p-4 border border-[#e8edf5]">
                        <StepField label="Credit Card Outstanding" icon={<CreditCard size={11} />} value={ccDebtOutstanding} onChange={setCcDebtOutstanding} step={5000} />
                        <div className="flex justify-between mt-3 text-xs">
                          <span className="text-[#0176C7] font-black uppercase tracking-wider">Total CC Outstanding</span>
                          <span className="text-[#0f1857] font-black">{fmt(ccDebtOutstanding)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 bg-[#fffbeb] rounded-xl p-4 border border-[#fde68a]">
                      <h5 className="text-[#0f1857] font-black text-xs uppercase mb-2">BT Outstanding Formula</h5>
                      <p className="text-xs text-slate-750 font-bold mb-2">Personal Outstanding + Credit Card Outstanding = BT Outstanding</p>
                      <div className="flex items-center gap-2 text-sm font-bold text-[#0f1857] flex-wrap">
                        <span>{fmt(plOutstanding)}</span><span className="text-gray-400">+</span>
                        <span>{fmt(ccDebtOutstanding)}</span><span className="text-gray-400">=</span>
                        <span className="text-[#0176C7] font-black">{fmt(btOutstanding)}</span>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-[#f0f2fb]">
                      <h5 className="text-[#0176C7] font-bold text-xs uppercase tracking-wider mb-3">Balance Transfer Eligibility</h5>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { label: 'Eligible Loan', value: fmt(eligibleLoan), color: '#0f1857' },
                          { label: 'BT Outstanding', value: fmt(btOutstanding), color: '#0f1857' },
                          { label: 'BT Eligible Amt', value: fmt(eligibleLoan), color: '#22c55e' },
                          { label: 'Net Disbursal', value: fmt(Math.max(0, btNetDisbursal)), color: '#7c3aed' },
                        ].map(item => (
                          <div key={item.label} className="bg-[#f8f9ff] rounded-xl p-3 border border-[#e8edf5]">
                            <div className="text-[11px] font-black uppercase tracking-wider text-slate-750 mb-1">{item.label}</div>
                            <div className="font-black text-sm" style={{ color: item.color }}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ════════ RIGHT PANEL ════════ */}
                <div className="lg:col-span-5 lg:sticky lg:top-[100px] space-y-5">

                  {/* Loan Assessment Card */}
                  <div className="rounded-2xl p-6 md:p-7 text-white relative overflow-hidden"
                    style={{ background: 'linear-gradient(145deg, #1a237e 0%, #080e38 100%)', boxShadow: '0 20px 50px rgba(26,35,126,0.25)' }}>
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30 pointer-events-none"
                      style={{ background: 'radial-gradient(circle, #0197E0, transparent)', filter: 'blur(50px)' }} />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-black uppercase tracking-widest text-[#0197E0] bg-[#0197E0]/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <ShieldCheck size={11} /> Loan Assessment
                        </span>
                      </div>
                      <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">Eligible Loan Amount</p>
                      <div className="font-black text-3xl md:text-4xl text-[#0197E0] drop-shadow-lg mb-5">{fmt(eligibleLoan)}</div>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs mb-5">
                        {[
                          ['Eligible EMI Capacity', fmt(allowedEmi)],
                          ['Max Allowed EMI', fmt(eligibleEmi)],
                          ['Total EMI Obligation', fmt(totalEmiObligation)],
                          ['CC Obligation (5%)', fmt(ccObligation)],
                        ].map(([label, value]) => (
                          <div key={label}>
                            <span className="text-white/70 uppercase tracking-wider font-black text-[11px]">{label}</span>
                            <div className="text-white font-black text-sm mt-0.5">{value}</div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Monthly EMI:</span>
                          <span className="font-bold">{fmt(eligibleEmi)} <span className="text-white/60 text-xs font-bold">({tenureMonths} Mo)</span></span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Total Interest Paid:</span>
                          <span className="font-bold">{fmt(totalInterest)}</span>
                        </div>
                        <div className="flex justify-between text-base font-black">
                          <span className="text-white/80">Total Repayment:</span>
                          <span>{fmt(totalRepayment)}</span>
                        </div>
                      </div>

                      {/* Affordability */}
                      <div className="mt-5 rounded-xl p-4" style={{ background: `${foirColor}15`, border: `1px solid ${foirColor}30` }}>
                        <div className="flex items-start gap-3">
                          <FoirIcon size={22} style={{ color: foirColor, flexShrink: 0 }} />
                          <div>
                            <div className="text-xs font-black uppercase tracking-wider" style={{ color: foirColor }}>
                              Affordability: {foirStatus} ({netFoir}%)
                            </div>
                            <p className="text-xs text-white/75 mt-0.5 leading-relaxed">
                              Your net debt-to-income ratio is {netFoir}%. FOIR limits prevent excessive leverage.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Processing Cost Breakdown */}
                  <div className="bg-white rounded-2xl border border-[#e8edf5] p-5" style={{ boxShadow: '0 8px 30px rgba(15,24,87,0.05)' }}>
                    <SectionTitle icon={<BarChart3 size={15} />} className="mb-4">Processing Cost Breakdown</SectionTitle>
                    <div className="space-y-2.5 text-sm">
                      {[
                        { label: 'Gross Eligible Loan:', value: fmt(eligibleLoan) },
                        { label: 'GST on Proc Fee (18%):', value: fmt(gstOnProc) },
                        { label: 'Insurance (0.5%):', value: fmt(insuranceAmt) },
                        { label: 'Other Fixed Charges:', value: fmt(fixedMisc) },
                      ].map(row => (
                        <div key={row.label} className="flex justify-between">
                          <span className="text-slate-700 text-xs font-semibold">{row.label}</span>
                          <span className="font-black text-[#0f1857] text-xs">{row.value}</span>
                        </div>
                      ))}
                      <div className="flex justify-between pt-3 border-t border-[#f0f2fb] text-sm">
                        <span className="font-bold text-[#22c55e] flex items-center gap-1"><CheckCircle2 size={13} /> Net Loan Disbursed:</span>
                        <span className="font-black text-[#22c55e]">{fmt(Math.max(0, netDisbursed))}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ════════ FULL-WIDTH SECTIONS ════════ */}

              {/* Eligibility Visualizations */}
              <div className="mt-8">
                <SectionTitle icon={<TrendingUp size={16} />} className="mb-5">Eligibility Visualizations</SectionTitle>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border border-[#e8edf5] p-5 md:p-7" style={{ boxShadow: '0 8px 30px rgba(15,24,87,0.05)' }}>
                    <h4 className="text-[#0f1857] font-black text-sm mb-1 flex items-center gap-2"><BarChart3 size={14} className="text-[#0176C7]" /> Principal vs. Interest</h4>
                    <p className="text-slate-600 text-xs font-semibold mb-5">Total cost allocation of the eligible loan.</p>
                    <DonutChart principal={eligibleLoan} interest={totalInterest} />
                  </div>
                  <div className="bg-white rounded-2xl border border-[#e8edf5] p-5 md:p-7" style={{ boxShadow: '0 8px 30px rgba(15,24,87,0.05)' }}>
                    <h4 className="text-[#0f1857] font-black text-sm mb-1 flex items-center gap-2"><TrendingDown size={14} className="text-[#0176C7]" /> Outstanding Loan Balance</h4>
                    <p className="text-slate-600 text-xs font-semibold mb-5">Visual amortization of principal over tenure.</p>
                    <BalanceChart schedule={schedule} />
                  </div>
                </div>
              </div>

              {/* Amortization Schedule */}
              <div className="mt-8 bg-white rounded-2xl border border-[#e8edf5] p-5 md:p-7" style={{ boxShadow: '0 8px 30px rgba(15,24,87,0.05)' }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#f1f5f9]">
                  <div>
                    <h4 className="flex items-center gap-2 text-[#0f1857] font-black text-sm">
                      <FileText size={15} className="text-[#0176C7]" /> Repayment Amortization Schedule
                    </h4>
                    <p className="text-slate-600 text-xs font-semibold mt-1">Month-by-month breakdown of principal reduction and interest payouts.</p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <button onClick={exportExcel}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#f8fafc] border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                      <Download size={13} className="text-slate-500" /> Export to Excel
                    </button>
                    <button onClick={() => setShowPrintPreview(true)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#e0e7ff] text-[#4f46e5] font-bold text-xs rounded-xl hover:bg-[#c7d2fe] transition-colors cursor-pointer">
                      <Printer size={13} /> Print Report
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5">
                  <div className="relative max-w-xs w-full">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search specific month..." value={searchMonth} onChange={e => setSearchMonth(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#f8f9ff] border border-[#e2e8f0] rounded-xl text-sm text-[#0f1857] font-bold outline-none focus:border-[#0176C7] transition-all" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Clock size={11} /> TOTAL MONTHS: <span className="text-[#0f1857] font-black">{schedule.length}</span>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-[#f0f2fb]">
                  <table className="w-full text-xs min-w-[520px]">
                    <thead>
                      <tr className="bg-[#f8f9ff] border-b-2 border-[#e8edf5]">
                        {['Month', 'Opening Balance', 'Principal Paid', 'Interest Paid', 'Closing Balance'].map(h => (
                          <th key={h} className="text-left py-3 px-4 text-xs font-black uppercase tracking-wider text-slate-800">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedSchedule.map(row => (
                        <tr key={row.month} className="border-b border-[#f4f6fc] hover:bg-[#f8f9ff] transition-colors">
                          <td className="py-3 px-4 font-bold text-[#0f1857]">Month {row.month}</td>
                          <td className="py-3 px-4 text-[#0f1857]">{fmt(row.openBal)}</td>
                          <td className="py-3 px-4 font-bold text-[#22c55e]">+{fmt(row.prinPaid)}</td>
                          <td className="py-3 px-4 font-bold text-[#ef4444]">-{fmt(row.intPaid)}</td>
                          <td className="py-3 px-4 text-[#0f1857]">{fmt(row.closeBal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {paginatedSchedule.length === 0 && (
                    <p className="text-center text-gray-400 py-10 text-sm flex items-center justify-center gap-2">
                      <Search size={16} /> {schedule.length === 0 ? 'Enter loan details to generate schedule.' : 'No matching months found.'}
                    </p>
                  )}
                </div>

                {filteredSchedule.length > 0 && (
                  <div className="flex justify-between items-center mt-5 pt-4 border-t border-[#f1f5f9]">
                    <div className="text-xs font-bold text-slate-400">
                      Page {currentPage} of {totalPages} &nbsp;·&nbsp; {filteredSchedule.length} rows
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-slate-600">
                        <ArrowLeft size={14} />
                      </button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let page; const half = 2
                        if (totalPages <= 5) page = i + 1
                        else if (currentPage <= 3) page = i + 1
                        else if (currentPage >= totalPages - 2) page = totalPages - 4 + i
                        else page = currentPage - 2 + i
                        return (
                          <button key={page} onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer ${currentPage === page ? 'bg-[#0176C7] text-white shadow-sm' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                            {page}
                          </button>
                        )
                      })}
                      <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-[#0176C7]">
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Save Success Modal */}
      {saveModalData && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100 transform scale-100">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Scenario Saved!</h3>
              <p className="text-slate-500 text-sm font-semibold mb-6">
                Your loan scenario for <span className="text-slate-800 font-bold">"{saveModalData}"</span> has been saved successfully.
              </p>
              <button
                onClick={() => setSaveModalData(null)}
                className="w-full py-3 text-white rounded-xl font-bold transition-colors shadow-sm hover:opacity-90"
                style={{ background: '#4f46e5' }}>
                Awesome!
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
