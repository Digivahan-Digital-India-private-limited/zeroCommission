import { useState, useMemo } from 'react'
import { IndianRupee, Percent, Calendar, RefreshCw, Shield, TrendingUp, Lightbulb, Banknote, LayoutGrid } from 'lucide-react'
import fdIllustration from '../assets/Screenshot 2026-07-06 134503.png'

function fmtIN(n) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n || 0)
}

/* ── Slider + Editable Input Row ── */
function SliderField({ label, icon: Icon, value, onChange, min, max, step = 1, prefix = '', suffix = '', minLabel, maxLabel }) {
  const [str, setStr] = useState(String(value))
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))

  const commit = raw => {
    const n = parseFloat(String(raw).replace(/,/g, '')) || min
    const c = Math.min(max, Math.max(min, n))
    onChange(c); setStr(String(c))
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: '#eef3ff' }}>
          <Icon size={18} color="#0176C7" />
        </div>
        <span className="flex-1 text-sm font-semibold text-[#0f1857]">{label}</span>
        <div className="flex items-center gap-1 border border-[#e2e8f0] rounded-xl px-3 py-2 min-w-[110px] focus-within:border-[#0176C7] transition-colors bg-white">
          {prefix && <span className="text-[#0176C7] font-bold text-sm">{prefix}</span>}
          <input
            type="text" inputMode="decimal" value={str}
            onChange={e => { setStr(e.target.value); const n = parseFloat(e.target.value.replace(/,/g, '')) || 0; onChange(Math.min(max, Math.max(min, n))) }}
            onBlur={e => commit(e.target.value)}
            className="w-full outline-none text-[#0176C7] font-bold text-sm text-right bg-transparent"
          />
          {suffix && <span className="text-[#0176C7] font-bold text-sm whitespace-nowrap">{suffix}</span>}
        </div>
      </div>
      <div className="relative h-1.5 bg-[#e8edf5] rounded-full mb-2">
        <div className="absolute h-1.5 rounded-full bg-gradient-to-r from-[#0176C7] to-[#0155AD]" style={{ width: `${pct}%` }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => { const v = Number(e.target.value); onChange(v); setStr(String(v)) }}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5" style={{ zIndex: 2 }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#0176C7] shadow-md pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }} />
      </div>
      <div className="flex justify-between text-xs text-[#64748b] font-semibold">
        <span>{minLabel || `${prefix}${min >= 1000 ? fmtIN(min) : min}${suffix}`}</span>
        <span>{maxLabel || `${prefix}${max >= 1000 ? fmtIN(max) : max}${suffix}+`}</span>
      </div>
    </div>
  )
}

/* ── Tenure Field (Dropdown + Slider) ── */
const TENURE_OPTIONS = [
  { label: '7 Days', days: 7 }, { label: '15 Days', days: 15 }, { label: '1 Month', days: 30 },
  { label: '3 Months', days: 90 }, { label: '6 Months', days: 180 }, { label: '1 Year', days: 365 },
  { label: '2 Years', days: 730 }, { label: '3 Years', days: 1095 }, { label: '4 Years', days: 1460 },
  { label: '5 Years', days: 1825 }, { label: '7 Years', days: 2555 }, { label: '10 Years', days: 3650 },
]

function TenureField({ idx, onChange }) {
  const pct = (idx / (TENURE_OPTIONS.length - 1)) * 100
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eef3ff' }}>
          <Calendar size={18} color="#0176C7" />
        </div>
        <span className="flex-1 text-sm font-semibold text-[#0f1857]">Tenure</span>
        <select value={idx} onChange={e => onChange(Number(e.target.value))}
          className="border border-[#e2e8f0] rounded-xl px-3 py-2 text-[#0176C7] font-bold text-sm bg-white outline-none cursor-pointer focus:border-[#0176C7]">
          {TENURE_OPTIONS.map((t, i) => <option key={t.days} value={i}>{t.label}</option>)}
        </select>
      </div>
      <div className="relative h-1.5 bg-[#e8edf5] rounded-full mb-2">
        <div className="absolute h-1.5 rounded-full bg-gradient-to-r from-[#0176C7] to-[#0155AD]" style={{ width: `${pct}%` }} />
        <input type="range" min={0} max={TENURE_OPTIONS.length - 1} step={1} value={idx}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5" style={{ zIndex: 2 }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#0176C7] shadow-md pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }} />
      </div>
      <div className="flex justify-between text-xs text-[#64748b] font-semibold">
        <span>7 Days</span><span>10 Years</span>
      </div>
    </div>
  )
}

/* ── Dropdown-only Row ── */
function DropRow({ label, icon: Icon, value, onChange, options, info }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eef3ff' }}>
        <Icon size={18} color="#0176C7" />
      </div>
      <div className="flex-1 flex items-center gap-1.5">
        <span className="text-sm font-semibold text-[#0f1857]">{label}</span>
        {info && (
          <div className="w-4 h-4 rounded-full border border-[#94a3b8] flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-black text-[#94a3b8]">i</span>
          </div>
        )}
      </div>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="border border-[#e2e8f0] rounded-xl px-3 py-2 text-[#0176C7] font-bold text-sm bg-white outline-none cursor-pointer focus:border-[#0176C7]">
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </div>
  )
}

/* ── Donut Chart ── */
function DonutChart({ principal, interest }) {
  const total = principal + interest || 1
  const R = 46, C = 2 * Math.PI * R
  const pDash = (principal / total) * C
  const pPct = (principal / total * 100).toFixed(1)
  const iPct = (interest / total * 100).toFixed(1)

  return (
    <div className="relative flex-shrink-0" style={{ width: 148, height: 148 }}>
      <svg viewBox="0 0 120 120" style={{ width: 148, height: 148 }} className="-rotate-90">
        {/* Purple background (interest) */}
        <circle cx="60" cy="60" r={R} fill="none" stroke="#a78bfa" strokeWidth="17" />
        {/* Blue (principal) overlay */}
        <circle cx="60" cy="60" r={R} fill="none" stroke="#38bdf8" strokeWidth="17"
          strokeDasharray={`${pDash} ${C}`} />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[10px] text-white/60 font-semibold leading-none">Total Amount</p>
        <p className="text-xs font-black text-white mt-0.5 leading-tight">₹{fmtIN(total)}</p>
      </div>
      {/* % labels on ring (approximate positions) */}
      <div className="absolute text-[10px] font-bold text-white/90 select-none"
        style={{ left: 2, top: '60%', transform: 'translateY(-50%)' }}>{iPct}%</div>
      <div className="absolute text-[10px] font-bold text-white/90 select-none"
        style={{ right: 0, bottom: '22%' }}>{pPct}%</div>
    </div>
  )
}

const FREQ_OPTIONS = [
  { label: 'Monthly', value: '12' },
  { label: 'Quarterly', value: '4' },
  { label: 'Half-Yearly', value: '2' },
  { label: 'Yearly', value: '1' },
  { label: 'Simple Interest', value: '0' },
]
const DEPOSIT_TYPES = ['Regular FD', 'Senior Citizen FD', 'Tax Saving FD']

const features = [
  { icon: Shield, title: '100% Secure', sub: 'Invest with RBI-regulated banks & NBFCs' },
  { icon: Percent, title: 'Best Interest Rates', sub: 'Compare & choose from top FD schemes' },
  { icon: Calendar, title: 'Flexible Tenure', sub: 'Choose tenure from 7 days to 10 years' },
  { icon: TrendingUp, title: 'Assured Returns', sub: 'Guaranteed returns with zero market risk' },
]

export default function FdCalculatorPage() {
  const [amount, setAmount] = useState(500000)
  const [rate, setRate] = useState(7.5)
  const [tenureIdx, setTenureIdx] = useState(9)   // 5 Years
  const [freq, setFreq] = useState('4')            // Quarterly
  const [depositType, setDepositType] = useState('Regular FD')

  const result = useMemo(() => {
    const tenure = TENURE_OPTIONS[tenureIdx]
    const actualRate = depositType === 'Senior Citizen FD' ? rate + 0.5 : rate
    const r = actualRate / 100
    const t = tenure.days / 365
    const n = Number(freq)
    const maturity = n === 0
      ? amount * (1 + r * t)
      : amount * Math.pow(1 + r / n, n * t)
    const interest = maturity - amount
    const matDate = new Date()
    matDate.setDate(matDate.getDate() + tenure.days)
    const freqLabel = FREQ_OPTIONS.find(f => f.value === freq)?.label ?? 'Quarterly'
    const principalPct = (amount / maturity * 100)
    const interestPct = (interest / maturity * 100)
    return {
      maturity: Math.round(maturity),
      interest: Math.round(interest),
      interestPctDisp: interestPct.toFixed(2),
      principalPctDisp: principalPct.toFixed(1),
      interestPctShow: interestPct.toFixed(1),
      maturityDate: matDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      tenureLabel: tenure.label,
      freqLabel,
      actualRate,
    }
  }, [amount, rate, tenureIdx, freq, depositType])

  return (
    <div className="min-h-screen pt-24 pb-16 relative" style={{ background: '#f4f6fb' }}>
      {/* Dot decorations */}
      <div className="absolute top-0 left-0 w-52 h-52 opacity-40 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #c7d7f5 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
      <div className="absolute top-0 right-0 w-52 h-52 opacity-40 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #c7d7f5 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
      <div className="absolute top-20 right-10 w-16 h-16 rounded-full border-2 border-[#dbeafe] opacity-30 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 border"
            style={{ background: 'rgba(1,118,199,0.07)', borderColor: 'rgba(1,118,199,0.25)' }}>
            <Banknote size={14} color="#0176C7" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#0176C7]">FD Calculator</span>
          </div>
          <h1 className="font-black text-[#0f1857] mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Calculate Your{' '}
            <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">Fixed Deposit</span>
            {' '}Returns
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Plan your savings better with our FD calculator.<br className="hidden md:block" />
            See your maturity amount and interest earnings instantly.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8 items-start">

          {/* LEFT — Input Panel */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e8edf5]">
            <div className="space-y-6">

              <SliderField
                label="Deposit Amount" icon={IndianRupee}
                value={amount} onChange={setAmount}
                min={1000} max={10000000} step={1000}
                prefix="₹" minLabel="₹1,000" maxLabel="₹1,00,00,000+"
              />

              <SliderField
                label="Interest Rate (% p.a.)" icon={Percent}
                value={rate} onChange={setRate}
                min={1} max={15} step={0.1}
                suffix="%" minLabel="1%" maxLabel="15%"
              />

              <TenureField idx={tenureIdx} onChange={setTenureIdx} />

              <DropRow
                label="Compounding Frequency" icon={LayoutGrid}
                value={freq} onChange={setFreq} info
                options={FREQ_OPTIONS}
              />

              <DropRow
                label="Deposit Type" icon={RefreshCw}
                value={depositType} onChange={setDepositType}
                options={DEPOSIT_TYPES}
              />

              {/* Did You Know */}
              <div className="flex items-start gap-3 p-4 rounded-xl border border-[#dbeafe] bg-[#f0f6ff]">
                <Lightbulb size={22} color="#0176C7" className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-[#0176C7] mb-1">Did You Know?</p>
                  <p className="text-sm text-[#334155] leading-relaxed font-medium">
                    Quarterly compounding can earn you higher returns compared to annual compounding.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — Results Panel */}
          <div className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
            style={{ background: '#011e69', minHeight: 500 }}>
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.055] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            {/* 3D Illustration — absolutely positioned, blends with bg */}
            <img 
              src={fdIllustration} 
              alt="FD Illustration" 
              className="absolute right-0 top-2 md:right-4 md:top-4 object-contain pointer-events-none w-36 h-36 md:w-52 md:h-52 lg:w-60 lg:h-60"
              style={{ zIndex: 1 }}
            />

            <div className="relative" style={{ zIndex: 2 }}>

              {/* Top Summary */}
              <div style={{ maxWidth: '58%' }} className="mb-7">
                <p className="text-white/70 text-sm font-semibold mb-1">Maturity Summary</p>
                <p className="text-white/60 text-xs mb-0.5">Maturity Amount</p>
                <p className="font-black leading-none" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#38bdf8' }}>
                  ₹ {fmtIN(result.maturity)}
                </p>
                <p className="text-white/70 text-sm font-medium mt-3 mb-0.5">Total Interest Earned</p>
                <p className="font-bold text-base" style={{ color: '#a78bfa' }}>
                  ₹ {fmtIN(result.interest)} ({result.interestPctDisp}%)
                </p>
              </div>

              {/* Donut + Legend */}
              <div className="flex items-center gap-6 mb-7">
                <DonutChart principal={amount} interest={result.interest} />
                <div className="flex flex-col gap-5 flex-1">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#38bdf8' }} />
                      <span className="text-white/70 text-xs font-semibold">Principal Amount</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">₹ {fmtIN(amount)}</p>
                      <p className="text-white/60 text-xs font-semibold mt-0.5">{result.principalPctDisp}%</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#a78bfa' }} />
                      <span className="text-white/70 text-xs font-semibold">Total Interest</span>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">₹ {fmtIN(result.interest)}</p>
                      <p className="text-white/60 text-xs font-semibold mt-0.5">{result.interestPctShow}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Table */}
              <div className="border-t pt-4 mb-5 space-y-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {[
                  { label: 'Deposit Amount', value: `₹ ${fmtIN(amount)}` },
                  { label: 'Interest Rate (p.a.)', value: `${result.actualRate}%` },
                  { label: 'Tenure', value: result.tenureLabel },
                  { label: 'Compounding Frequency', value: result.freqLabel },
                  { label: 'Maturity Date', value: result.maturityDate },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-white/60 text-sm font-medium">{label}</span>
                    <span className="text-white font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>

              {/* Secure Box */}
              <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: '#1a1c5e' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#2a2b7e' }}>
                  <Shield size={18} color="#a78bfa" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-snug">Your FD is completely safe and secure.</p>
                  <p className="text-white/60 text-xs font-medium mt-0.5">We partner with RBI-regulated banks & NBFCs.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Feature Cards ── */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl border-2 border-[#dbeafe] bg-[#eef3ff] flex items-center justify-center flex-shrink-0">
                  <Icon size={22} color="#0176C7" />
                </div>
                <div className="pt-0.5">
                  <p className="text-sm font-bold text-[#0f1857] mb-1 leading-tight">{title}</p>
                  <p className="text-xs text-[#64748b] leading-snug font-medium">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-[#334155] font-semibold flex items-center justify-center gap-1.5 mt-8">
          <Shield size={14} color="#334155" /> All calculations are estimates. Actual returns may vary based on bank policies.
        </p>

      </div>
    </div>
  )
}
