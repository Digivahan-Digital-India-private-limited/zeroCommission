import { useState, useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calculator, ArrowRightLeft, CreditCard, Plus, ChevronDown, ListTodo, ChevronUp, Edit, Trash2, Home, User, Building2, Car, Bike, ShoppingCart, Medal, Info } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const LOAN_TYPES = [
  'Personal Loan',
  'Home Loan',
  'Property Loan',
  'Car Loan / Auto Loan',
  'Two Wheeler Loan',
  'Consumer Loan',
  'Gold Loan',
  'Credit Card',
  'Other'
]

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

const getLoanTypeIcon = (loanType) => {
  const style = LOAN_TYPE_STYLE[loanType] || LOAN_TYPE_STYLE['Other']
  const icons = { User, Home, Building2, Car, Bike, ShoppingCart, Medal, CreditCard, ListTodo }
  return { Icon: icons[style.Icon] || ListTodo, bg: style.bg, color: style.color }
}

export default function BalanceTransferPage() {
  const sectionRef = useRef(null)

  // -- Add Loan State --
  const emptyLoanForm = useRef({ loanType: '', loanAmount: '', outstanding: '', declaredEmi: '', financerName: '', status: '' }).current
  const [loans, setLoans] = useState([])
  const [showLoanForm, setShowLoanForm] = useState(false)
  const [loanMenuId, setLoanMenuId] = useState(null)
  const [showAllLoans, setShowAllLoans] = useState(false)
  const [editLoanId, setEditLoanId] = useState(null)
  const [loanSort, setLoanSort] = useState('recent')
  const [loanFormData, setLoanFormData] = useState(() => ({ ...emptyLoanForm }))

  // -- Calculator State (hidden defaults for the blue card) --
  const rate = 10.5
  const tenureYears = 5
  const tenureMonths = 0

  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  // -- Derived Values --
  const totalOutstanding = useMemo(() => loans.reduce((sum, l) => sum + (Number(l.outstanding) || 0), 0), [loans])
  const oldTotalEmi = useMemo(() => loans.reduce((sum, l) => sum + (Number(l.declaredEmi) || 0), 0), [loans])

  // -- Add Loan Handlers --
  useEffect(() => {
    if (!loanMenuId) return
    const handler = (e) => {
      if (e.target.closest('.loan-menu-container') || e.target.closest('.loan-menu-trigger')) return
      setLoanMenuId(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [loanMenuId])

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

  // -- Calculator Effect --
  useEffect(() => {
    const P = totalOutstanding
    const R = rate / 12 / 100
    const N = (tenureYears * 12) + tenureMonths

    if (P > 0 && R > 0 && N > 0) {
      const emiVal = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1)
      const totalAmt = emiVal * N
      const totalInt = totalAmt - P

      setEmi(Math.round(emiVal))
      setTotalAmount(Math.round(totalAmt))
      setTotalInterest(Math.round(totalInt))
    } else if (P > 0 && N > 0) {
      setEmi(Math.round(P / N))
      setTotalAmount(Math.round(P))
      setTotalInterest(0)
    } else {
      setEmi(0)
      setTotalAmount(0)
      setTotalInterest(0)
    }
  }, [totalOutstanding, rate, tenureYears, tenureMonths])

  // -- GSAP Animations --
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      })

      tl.fromTo('.emi-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo('.emi-card-left',
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('.emi-card-right',
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const fmt = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num || 0)
  }

  // Calculate percentages for the progress bar visual
  const principalPercent = totalAmount > 0 ? (totalOutstanding / totalAmount) * 100 : 100
  const interestPercent = totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0

  return (
    <div className="min-h-screen" style={{ background: '#f8f9ff', paddingTop: '100px' }}>
      <section ref={sectionRef} id="bt-calculator" className="pt-4 pb-32 relative overflow-hidden"
        style={{ background: '#f8f9ff' }}>

        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(1,151,224,0.05) 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(15,24,87,0.04) 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(-30%, 30%)' }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">

          {/* Header */}
          <div className="emi-header text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
              style={{ background: '#e8eaf6', border: '1px solid #c5cae9' }}>
              <ArrowRightLeft size={14} className="text-[#1a237e]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#1a237e]">BT Calculator</span>
            </div>
            <h2 className="font-display font-black leading-tight mb-3" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#0f1857' }}>
              Plan Your <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">Finances Smartly</span>
            </h2>
            <p className="text-gray-500 text-[15px] max-w-2xl mx-auto">
              Add your existing loan obligations below to calculate your new monthly installment, total interest, and total outstanding amount with our easy-to-use Balance Transfer calculator.
            </p>
          </div>

          {/* Calculator Body */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

            {/* Left: Add Loan */}
            <div className="emi-card-left lg:col-span-7 rounded-3xl relative overflow-hidden flex flex-col h-fit">

              {/* Exact My Loans block from Eligibility Calculator */}
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
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div className="emi-card-right lg:col-span-5 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center text-white"
              style={{ background: 'linear-gradient(145deg, #1a237e 0%, #080e38 100%)', boxShadow: '0 20px 50px rgba(26,35,126,0.25)' }}>

              {/* Background Glows */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #0197E0, transparent)', filter: 'blur(50px)' }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)', filter: 'blur(50px)' }} />

              <div className="relative z-10">

                <div className="mb-8 text-center">
                  <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">New Equated Monthly Installment</p>
                  <div className="font-display font-black text-4xl md:text-5xl text-[#0197E0] drop-shadow-lg">
                    {fmt(emi)}
                  </div>
                  {oldTotalEmi > 0 && emi > 0 && oldTotalEmi > emi && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                      Savings: {fmt(oldTotalEmi - emi)} / month
                    </div>
                  )}
                </div>

                {/* Visual Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs font-semibold mb-3 text-white/80">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#0197E0] shadow-[0_0_10px_rgba(45,212,191,0.5)]"></span> Total Outstanding</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></span> Total Interest</div>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden flex bg-white/10 p-0.5">
                    <div className="h-full bg-[#0197E0] rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: `${principalPercent}%` }}></div>
                    <div className="h-full bg-indigo-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(129,140,248,0.5)] ml-1" style={{ width: `${interestPercent}%` }}></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2.5 border-b border-white/10">
                    <span className="text-white/70 font-medium text-sm">Total BT Outstanding</span>
                    <span className="font-bold text-base">{fmt(totalOutstanding)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-white/10">
                    <span className="text-white/70 font-medium text-sm">Total Interest Amount</span>
                    <span className="font-bold text-base">{fmt(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-white/10">
                    <span className="text-white/70 font-medium text-sm">Total Amount Payable</span>
                    <span className="font-bold text-lg text-white">{fmt(totalAmount)}</span>
                  </div>
                  {oldTotalEmi > 0 && (
                    <div className="flex justify-between items-center py-2.5 pt-4">
                      <span className="text-amber-300/80 font-medium text-sm">Current Total EMI</span>
                      <span className="font-bold text-base text-amber-300">{fmt(oldTotalEmi)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-start gap-3">
                  <Info size={16} className="text-white/50 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-white/50 leading-relaxed">
                    This calculator provides an estimate. Actual EMI may vary slightly based on final loan terms, processing fees, and specific lender criteria.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  )
}
