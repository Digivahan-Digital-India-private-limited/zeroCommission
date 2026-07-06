import { useState, useMemo } from 'react'
import { IndianRupee, Percent, Calendar, RefreshCw, Shield, TrendingUp, Info, Lightbulb, Calculator, Target, BarChart3, Lock } from 'lucide-react'
import rdIllustration from '../assets/Screenshot 2026-07-06 134535.png'

function fmtIN(n) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n || 0)
}

/* ── Shared Input Row: slider + manual editable input ── */
function SliderField({ label, icon: Icon, value, onChange, min, max, step = 1, prefix = '', suffix = '', minLabel, maxLabel }) {
  const [str, setStr] = useState(String(value))
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))

  const commit = (raw) => {
    const n = parseFloat(String(raw).replace(/,/g, '')) || min
    const c = Math.min(max, Math.max(min, n))
    onChange(c); setStr(String(c))
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eef3ff' }}>
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

const TENURE_OPTIONS = [
  { label: '6 Months', months: 6 }, { label: '1 Year', months: 12 }, { label: '2 Years', months: 24 },
  { label: '3 Years', months: 36 }, { label: '4 Years', months: 48 }, { label: '5 Years', months: 60 },
  { label: '6 Years', months: 72 }, { label: '7 Years', months: 84 }, { label: '8 Years', months: 96 },
  { label: '9 Years', months: 108 }, { label: '10 Years', months: 120 },
]

function TenureField({ value, onChange }) {
  const min = 6
  const max = 120
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eef3ff' }}>
          <Calendar size={18} color="#0176C7" />
        </div>
        <span className="flex-1 text-sm font-semibold text-[#0f1857]">Tenure</span>
        <select value={value} onChange={e => onChange(Number(e.target.value))}
          className="border border-[#e2e8f0] rounded-xl px-3 py-2 text-[#0176C7] font-bold text-sm bg-white outline-none cursor-pointer focus:border-[#0176C7]">
          {TENURE_OPTIONS.map(t => <option key={t.months} value={t.months}>{t.label}</option>)}
        </select>
      </div>
      <div className="relative h-1.5 bg-[#e8edf5] rounded-full mb-2">
        <div className="absolute h-1.5 rounded-full bg-gradient-to-r from-[#0176C7] to-[#0155AD]" style={{ width: `${pct}%` }} />
        <input type="range" min={min} max={max} step={6} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5" style={{ zIndex: 2 }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#0176C7] shadow-md pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }} />
      </div>
      <div className="flex justify-between text-xs text-[#64748b] font-semibold">
        <span>6 Months</span><span>10 Years</span>
      </div>
    </div>
  )
}

function DropRow({ label, icon: Icon, value, onChange, options, info }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eef3ff' }}>
        <Icon size={18} color="#0176C7" />
      </div>
      <div className="flex-1 flex items-center gap-1.5">
        <span className="text-sm font-semibold text-[#0f1857]">{label}</span>
        {info && (
          <div className="w-4 h-4 rounded-full border border-[#94a3b8] flex items-center justify-center flex-shrink-0 cursor-help" title={info}>
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

const FREQ_OPTIONS = [
  { label: 'Monthly', n: 12 }, { label: 'Quarterly', n: 4 }, { label: 'Half-Yearly', n: 2 }, { label: 'Yearly', n: 1 },
]

export default function RdCalculatorPage() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(6.5)
  const [tenureMonths, setTenureMonths] = useState(60)
  const [freq, setFreq] = useState(4)
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0])

  const result = useMemo(() => {
    const r = rate / 100
    const n = freq
    let maturity = 0
    for (let i = 1; i <= tenureMonths; i++) {
      const rem = (tenureMonths - i + 1) / 12
      maturity += monthly * Math.pow(1 + r / n, n * rem)
    }
    const totalDeposit = monthly * tenureMonths
    const interest = maturity - totalDeposit
    const matDate = new Date(startDate)
    matDate.setMonth(matDate.getMonth() + tenureMonths)
    return {
      maturity: Math.round(maturity),
      totalDeposit: Math.round(totalDeposit),
      interest: Math.round(interest),
      interestPct: ((interest / totalDeposit) * 100).toFixed(2),
      maturityDate: matDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
  }, [monthly, rate, tenureMonths, freq, startDate])

  const tenureLabel = TENURE_OPTIONS.find(t => t.months === tenureMonths)?.label || `${(tenureMonths / 12).toFixed(1)} Yrs`
  const freqLabel = FREQ_OPTIONS.find(f => f.n === freq)?.label || 'Quarterly'

  return (
    <div className="min-h-screen pt-24 pb-16 relative" style={{ background: '#f4f6fb' }}>
      {/* Dot decorations */}
      <div className="absolute top-0 left-0 w-52 h-52 opacity-40 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #c7d7f5 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
      <div className="absolute top-0 right-0 w-52 h-52 opacity-40 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #c7d7f5 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 border" style={{ background: 'rgba(1,118,199,0.07)', borderColor: 'rgba(1,118,199,0.25)' }}>
            <Calculator size={14} color="#0176C7" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#0176C7]">RD Calculator</span>
          </div>
          <h1 className="font-black text-[#0f1857] mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Plan Your Future with{' '}
            <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">Recurring Deposits</span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Calculate your returns, maturity amount and interest earned<br className="hidden md:block" /> with our simple RD calculator.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8 items-start">
          
          {/* LEFT — Input Panel */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e8edf5]">
            <h2 className="text-base font-bold text-[#0f1857] mb-6">Enter RD Details</h2>
            <div className="space-y-6">
              
              <SliderField
                label="Monthly Deposit Amount (₹)" icon={IndianRupee}
                value={monthly} onChange={setMonthly}
                min={100} max={100000} step={100}
                prefix="₹" minLabel="₹100" maxLabel="₹1,00,000+"
              />

              <SliderField
                label="Interest Rate (% p.a.)" icon={Percent}
                value={rate} onChange={setRate}
                min={1} max={12} step={0.1}
                suffix="%" minLabel="1%" maxLabel="12%"
              />

              <TenureField value={tenureMonths} onChange={setTenureMonths} />

              <DropRow
                label="Compounding Frequency" icon={RefreshCw}
                value={freq} onChange={e => setFreq(Number(e))}
                options={FREQ_OPTIONS.map(f => ({ label: f.label, value: f.n }))}
                info="Frequency at which interest is compounded"
              />

              {/* Start Date */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#eef3ff' }}>
                  <Calendar size={18} color="#0176C7" />
                </div>
                <span className="flex-1 text-sm font-semibold text-[#0f1857]">Deposit Starting Date</span>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                  className="border border-[#e2e8f0] rounded-xl px-3 py-2 text-[#0176C7] font-bold text-sm bg-white outline-none cursor-pointer focus:border-[#0176C7]" />
              </div>

              {/* Did You Know */}
              <div className="flex items-start gap-4 p-4 rounded-xl border border-[#dbeafe] bg-[#f0f6ff]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-[#bfdbfe]">
                  <Lightbulb size={20} color="#0176C7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0176C7] mb-1">Did You Know?</p>
                  <p className="text-sm text-[#334155] leading-relaxed font-medium">
                    RD is a safe savings option that helps you build discipline and grow your money steadily over time.
                  </p>
                </div>
              </div>

              <button className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md mt-4"
                style={{ background: '#0155AD' }}>
                <Calculator size={18} /> Calculate RD
              </button>

            </div>
          </div>

          {/* RIGHT — Results Panel */}
          <div className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden" 
            style={{ background: '#041b57', minHeight: 520 }}>
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.055] pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            {/* 3D Illustration */}
            <img 
              src={rdIllustration} 
              alt="RD Illustration" 
              className="absolute right-0 top-2 md:right-4 md:top-4 object-contain pointer-events-none w-36 h-36 md:w-52 md:h-52 lg:w-60 lg:h-60"
              style={{ zIndex: 1 }}
            />

            <div className="relative z-10 flex flex-col h-full justify-between">
              
              {/* Header Info */}
              <div style={{ maxWidth: '65%' }} className="mb-8 mt-2">
                <p className="text-white font-bold text-[15px] mb-6">Maturity Summary</p>
                
                <p className="text-white/80 text-sm font-medium mb-1.5">Maturity Amount</p>
                <p className="font-black leading-none mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#38bdf8' }}>
                  ₹ {fmtIN(result.maturity)}
                </p>
                <p className="text-white/80 text-sm font-medium mb-1">Total Interest Earned</p>
                <p className="font-bold text-lg" style={{ color: '#a78bfa' }}>
                  ₹ {fmtIN(result.interest)} ({result.interestPct}%)
                </p>
              </div>

              {/* Summary Table */}
              <div className="space-y-0.5 mb-5 relative z-10 border-t border-white/10 pt-5">
                {[
                  { label: 'Monthly Deposit', value: `₹ ${fmtIN(monthly)}`, color: '#60a5fa' },
                  { label: 'Total Deposits', value: `₹ ${fmtIN(result.totalDeposit)}`, color: '#a78bfa' },
                  { label: 'Interest Rate (p.a.)', value: `${rate}%`, color: '#34d399' },
                  { label: 'Tenure', value: tenureLabel, color: '#4ade80' },
                  { label: 'Compounding Frequency', value: freqLabel, color: '#fbbf24' },
                  { label: 'Maturity Date', value: result.maturityDate, color: '#a78bfa' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                      <span className="text-white/70 text-sm font-medium">{label}</span>
                    </div>
                    <span className="text-white font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>

              {/* Secure Box */}
              <div className="flex items-center gap-4 p-4 rounded-xl relative z-10" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                  <Info size={18} className="text-[#38bdf8]" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight mb-1">About RD</p>
                  <p className="text-white/70 text-[13px] font-medium leading-snug">
                    Recurring Deposit (RD) helps you save a fixed amount regularly and earn assured returns with low risk.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Feature Cards ── */}
        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 mb-6 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: Shield, title: 'Safe & Secure', sub: 'Assured returns with low risk' },
              { icon: Target, title: 'Disciplined Savings', sub: 'Build the habit of regular savings' },
              { icon: BarChart3, title: 'Better Returns', sub: 'Earn higher returns than savings account' },
              { icon: Calculator, title: 'Flexible Tenure', sub: 'Choose tenure from 6 months to 10 years' },
              { icon: IndianRupee, title: 'Small Investments', sub: 'Start your RD with as low as ₹100' },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex flex-col items-center text-center px-2">
                <div className="w-14 h-14 rounded-full border-2 border-[#dbeafe] bg-[#f0f6ff] flex items-center justify-center mb-3">
                  <Icon size={24} color="#0176C7" />
                </div>
                <p className="text-[13px] font-bold text-[#0f1857] mb-1.5 leading-tight">{title}</p>
                <p className="text-[11px] text-[#64748b] leading-relaxed font-medium">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#dbeafe] bg-[#f0f6ff]">
            <Lock size={14} className="text-[#0176C7]" />
            <p className="text-xs font-semibold text-[#334155]">
              All calculations are estimates. Actual returns may vary based on bank policies.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
