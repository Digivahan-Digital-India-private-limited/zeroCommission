import { useState, useMemo } from 'react'
import { IndianRupee, TrendingUp, Calendar, RefreshCw, Shield, Clock, BarChart3, Info, Wallet, Lightbulb } from 'lucide-react'
import sipIllustration from '../assets/Screenshot 2026-07-06 134518.png'

function fmtIN(n) { return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n || 0) }

/* ── Slider + Editable Input Row ── */
function SliderField({ label, icon: Icon, value, onChange, min, max, step = 1, prefix = '', suffix = '', minLabel, maxLabel, info }) {
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
        <div className="flex-1 flex items-center gap-1.5">
          <span className="text-sm font-semibold text-[#0f1857]">{label}</span>
          {info && (
            <div className="w-4 h-4 rounded-full border border-[#94a3b8] flex items-center justify-center flex-shrink-0 cursor-help" title={info}>
              <span className="text-[10px] font-black text-[#94a3b8]">i</span>
            </div>
          )}
        </div>
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

// Format for graph Y-axis
function fmtGraphY(n) {
  if (n === 0) return '0'
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`
  if (n >= 100000) return `${(n / 100000).toFixed(0)}L`
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
  return String(n)
}

// SVG area chart
function AreaChart({ invested, returns, years }) {
  const W = 400, H = 160
  const points = Array.from({ length: years + 1 }, (_, y) => {
    const inv = (invested / years) * y
    // Rough exponential curve for visual
    const ret = returns > 0 ? returns * Math.pow(y / years, 2.2) : 0
    return { y, inv, ret }
  })
  
  // To leave space for Y-axis labels
  const leftPad = 30
  const bottomPad = 20
  const graphW = W - leftPad
  const graphH = H - bottomPad

  const maxVal = invested + returns || 1
  const toX = y => leftPad + (y / years) * graphW
  const toY = v => graphH - (v / maxVal) * graphH * 0.9

  const invPath = points.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(d.y)} ${toY(d.inv)}`).join(' ')
  const retPath = points.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(d.y)} ${toY(d.inv + d.ret)}`).join(' ')
  const areaRet = `${retPath} L ${toX(years)} ${graphH} L ${leftPad} ${graphH} Z`
  const areaInv = `${invPath} L ${toX(years)} ${graphH} L ${leftPad} ${graphH} Z`

  // Generate Y axis lines
  const ySteps = 4
  const yLines = Array.from({ length: ySteps + 1 }, (_, i) => {
    const val = (maxVal / ySteps) * i
    const yPos = graphH - (val / maxVal) * graphH * 0.9
    return { val, yPos }
  })

  // Generate X axis labels
  const xLabels = [0, ...Array.from({ length: 5 }, (_, i) => Math.round(years * (i + 1) / 5))]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: 220 }}>
      <defs>
        <linearGradient id="retG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="invG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid Lines */}
      {yLines.map(({ val, yPos }, i) => (
        <g key={i}>
          <text x={leftPad - 8} y={yPos + 3} fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="bold" textAnchor="end">
            {fmtGraphY(val)}
          </text>
          <line x1={leftPad} y1={yPos} x2={W} y2={yPos} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </g>
      ))}

      {/* Axis Lines */}
      <line x1={leftPad} y1={0} x2={leftPad} y2={graphH} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1={leftPad} y1={graphH} x2={W} y2={graphH} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      {/* Area Fills */}
      <path d={areaRet} fill="url(#retG)" />
      <path d={areaInv} fill="url(#invG)" />
      
      {/* Stroke Lines */}
      <path d={retPath} fill="none" stroke="#a78bfa" strokeWidth="2.5" />
      <path d={invPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

      {/* Dots on Returns line */}
      {points.map((d, i) => (
        i > 0 && i % Math.max(1, Math.floor(years/5)) === 0 && (
          <circle key={i} cx={toX(d.y)} cy={toY(d.inv + d.ret)} r="3" fill="#a78bfa" stroke="#fff" strokeWidth="1.5" />
        )
      ))}
      <circle cx={toX(years)} cy={toY(invested + returns)} r="3.5" fill="#a78bfa" stroke="#fff" strokeWidth="1.5" />
      <circle cx={toX(years)} cy={toY(invested)} r="3.5" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />

      {/* X Axis Labels */}
      {xLabels.map(y => (
        <text key={y} x={toX(y)} y={H - 2} fill="rgba(255,255,255,0.7)" fontSize="9" fontWeight="bold" textAnchor="middle">
          {y === 0 ? '0' : `${y}Y`}
        </text>
      ))}
    </svg>
  )
}

const features = [
  { icon: TrendingUp, title: 'Build Wealth', sub: 'Invest regularly and build long-term wealth' },
  { icon: Shield, title: 'Disciplined Investing', sub: 'SIP helps you invest with discipline every month' },
  { icon: Clock, title: 'Power of Compounding', sub: 'Earn returns on both your investment and returns' },
  { icon: IndianRupee, title: 'Rupee Cost Averaging', sub: 'Reduces impact of market volatility over time' },
]

export default function SipCalculatorPage() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(15)
  const [stepUp, setStepUp] = useState(0)

  const result = useMemo(() => {
    let totalInvested = 0, futureValue = 0
    const r = rate / 100 / 12
    for (let y = 0; y < years; y++) {
      const sip = monthly * Math.pow(1 + stepUp / 100, y)
      for (let m = 0; m < 12; m++) {
        const rem = (years - y) * 12 - m
        futureValue += sip * Math.pow(1 + r, rem)
        totalInvested += sip
      }
    }
    return {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      estReturns: Math.round(futureValue - totalInvested),
    }
  }, [monthly, rate, years, stepUp])

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
            <BarChart3 size={14} color="#0176C7" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#0176C7]">SIP Calculator</span>
          </div>
          <h1 className="font-black text-[#0f1857] mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Plan Your{' '}
            <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">Wealth with SIP</span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Calculate your SIP returns and build wealth step by step.<br className="hidden md:block" /> Start small, grow big with the power of compounding.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8 items-start">
          
          {/* LEFT — Input Panel */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e8edf5]">
            <div className="space-y-6">
              
              <SliderField
                label="Monthly Investment (SIP Amount)" icon={IndianRupee}
                value={monthly} onChange={setMonthly}
                min={500} max={100000} step={500}
                prefix="₹" minLabel="₹500" maxLabel="₹1,00,000+"
              />

              <SliderField
                label="Expected Annual Return Rate (%)" icon={TrendingUp}
                value={rate} onChange={setRate}
                min={1} max={30} step={0.5}
                suffix="%" minLabel="1%" maxLabel="30%+"
              />

              <SliderField
                label="Investment Period" icon={Calendar}
                value={years} onChange={setYears}
                min={1} max={40} step={1}
                suffix=" Years" minLabel="1 Year" maxLabel="40+ Years"
              />

              <SliderField
                label="Step-up (Annual Increase)" icon={RefreshCw}
                value={stepUp} onChange={setStepUp}
                min={0} max={30} step={1}
                suffix="%" minLabel="0%" maxLabel="30%"
                info="Increase your SIP amount every year by this percentage to build wealth faster."
              />

              <div className="flex items-start gap-4 p-4 rounded-xl border border-[#dbeafe] bg-[#f0f6ff]">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 border border-[#bfdbfe]">
                  <Lightbulb size={20} color="#0176C7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0176C7] mb-1">Power of Compounding</p>
                  <p className="text-sm text-[#334155] leading-relaxed font-medium">
                    The earlier you start, the more you benefit from compounding and the higher your wealth grows.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — Results Panel */}
          <div className="rounded-2xl p-6 md:p-8 text-white relative overflow-hidden" 
            style={{ background: '#092279', minHeight: 520 }}>
            {/* 3D Illustration */}
            <img 
              src={sipIllustration} 
              alt="SIP Illustration" 
              className="absolute right-0 top-2 md:right-4 md:top-4 object-contain pointer-events-none w-36 h-36 md:w-52 md:h-52 lg:w-60 lg:h-60"
              style={{ zIndex: 1 }}
            />

            <div className="relative z-10 flex flex-col h-full justify-between">
              
              {/* Header Info */}
              <div style={{ maxWidth: '65%' }} className="mb-6">
                <p className="text-white/80 text-sm font-medium mb-1">Estimated Future Value</p>
                <p className="font-black leading-none my-1.5" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#38bdf8' }}>
                  ₹ {fmtIN(result.futureValue)}
                </p>
                <p className="text-white/70 text-sm font-medium">
                  in <span className="text-white font-bold">{years} Years</span>
                </p>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-6 mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                  <span className="text-white/80 text-xs font-semibold">Invested Amount</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a78bfa]" />
                  <span className="text-white/80 text-xs font-semibold">Est. Returns</span>
                </div>
              </div>

              {/* Area Chart */}
              <div className="mb-6">
                <AreaChart invested={result.totalInvested} returns={result.estReturns} years={years} />
              </div>

              {/* 3 Stats Boxes */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4">
                {[
                  { label: 'Total Invested', value: `₹ ${fmtIN(result.totalInvested)}`, icon: Wallet },
                  { label: 'Est. Returns', value: `₹ ${fmtIN(result.estReturns)}`, icon: TrendingUp },
                  { label: 'Return Rate (XIRR)', value: `${rate}%`, icon: BarChart3 },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-xl p-3 md:p-4 flex flex-col" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <Icon size={14} className="text-white" />
                    </div>
                    <p className="text-white/80 text-[10px] md:text-[11px] font-bold mb-1">{label}</p>
                    <p className="text-white font-black text-sm md:text-base leading-tight">{value}</p>
                  </div>
                ))}
              </div>

              {/* Disclaimer Box */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl border border-white/10" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <Info size={16} className="text-white/60 flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-xs font-medium leading-relaxed">
                  This calculation is an estimate and for illustration purposes only. Actual returns may vary based on market performance.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ── Feature Cards ── */}
        <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 mb-6 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl border-2 border-[#dbeafe] bg-[#f0f6ff] flex items-center justify-center flex-shrink-0">
                  <Icon size={24} color="#0176C7" />
                </div>
                <div className="pt-0.5">
                  <p className="text-sm font-bold text-[#0f1857] mb-1 leading-tight">{title}</p>
                  <p className="text-xs text-[#64748b] leading-snug font-medium">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
