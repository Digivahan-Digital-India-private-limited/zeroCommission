import { useState, useMemo } from 'react'
import { Percent, Shield, RefreshCw, Clock, FileText, CheckCircle, BookOpen, IndianRupee, Calculator } from 'lucide-react'
import gstIllustration from '../assets/Screenshot 2026-07-06 134433.png'

function fmt2(n) {
  return new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n || 0)
}

function numberToWords(num) {
  if (!num || num === 0) return 'Zero Rupees Only'
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  function helper(n) {
    if (n === 0) return ''
    if (n < 20) return ones[n] + ' '
    if (n < 100) return tens[Math.floor(n / 10)] + (ones[n % 10] ? ' ' + ones[n % 10] : '') + ' '
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred ' + helper(n % 100)
    if (n < 100000) return helper(Math.floor(n / 1000)) + 'Thousand ' + helper(n % 1000)
    if (n < 10000000) return helper(Math.floor(n / 100000)) + 'Lakh ' + helper(n % 100000)
    return helper(Math.floor(n / 10000000)) + 'Crore ' + helper(n % 10000000)
  }
  const intPart = Math.floor(num)
  const decPart = Math.round((num - intPart) * 100)
  let result = 'Rupees ' + helper(intPart).trim()
  if (decPart > 0) result += ' and ' + helper(decPart).trim() + ' Paise'
  return result + ' Only'
}

const GST_RATES = [0, 5, 12, 18, 28]

const features = [
  {
    icon: Shield,
    title: '100% Accurate',
    sub: 'Our calculator provides accurate GST calculations as per latest tax rules.',
  },
  {
    icon: RefreshCw,
    title: 'Latest GST Rates',
    sub: 'Updated with current GST rates and tax regulations.',
  },
  {
    icon: Clock,
    title: 'Instant Results',
    sub: 'Get results instantly with detailed breakdown.',
  },
  {
    icon: FileText,
    title: 'Easy to Use',
    sub: 'Simple and intuitive design for quick calculations.',
  },
]

export default function GstCalculatorPage() {
  const [calcType, setCalcType] = useState('add')
  const [amountStr, setAmountStr] = useState('10000')
  const [amount, setAmount] = useState(10000)
  const [gstRate, setGstRate] = useState(18)
  const [roundOff, setRoundOff] = useState(true)

  const result = useMemo(() => {
    let base, gstAmt, total
    if (calcType === 'add') {
      base = amount; gstAmt = base * gstRate / 100; total = base + gstAmt
    } else {
      total = amount; base = total / (1 + gstRate / 100); gstAmt = total - base
    }
    if (roundOff) { total = Math.round(total); base = Math.round(base); gstAmt = Math.round(gstAmt) }
    return { base, gstAmt, total, words: numberToWords(total) }
  }, [amount, gstRate, calcType, roundOff])

  return (
    <div className="min-h-screen pt-24 pb-16 relative" style={{ background: '#f4f6fb' }}>
      {/* Background dot decorations */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-40 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #c7d7f5 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
      <div className="absolute top-0 right-0 w-48 h-48 opacity-40 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #c7d7f5 1.5px, transparent 1.5px)', backgroundSize: '22px 22px' }} />
      {/* Circle decor top-right */}
      <div className="absolute top-16 right-8 w-16 h-16 rounded-full border-2 border-[#dbeafe] opacity-40 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 border"
            style={{ background: 'rgba(1,118,199,0.07)', borderColor: 'rgba(1,118,199,0.25)' }}>
            <Calculator size={14} color="#0176C7" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#0176C7]">GST Calculator</span>
          </div>
          <h1 className="font-black text-[#0f1857] mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Calculate{' '}
            <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">GST</span>
            {' '}Instantly
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Easily calculate GST on any amount. Add or remove GST and<br className="hidden md:block" />
            get accurate results in seconds.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* LEFT — Inputs */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e8edf5]">
            <h2 className="text-base font-bold text-[#0f1857] mb-6">Enter Details</h2>

            {/* Calculation Type */}
            <div className="mb-6">
              <p className="text-sm font-bold text-[#0f1857] mb-3">Select Calculation Type</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'add', label: 'Add GST', sub: 'Calculate GST on amount' },
                  { key: 'remove', label: 'Remove GST', sub: 'Remove GST from amount' },
                ].map(({ key, label, sub }) => (
                  <button key={key} onClick={() => setCalcType(key)}
                    className="flex items-start gap-2.5 p-4 rounded-xl border-2 text-left transition-all duration-200"
                    style={{
                      borderColor: calcType === key ? '#0176C7' : '#e2e8f0',
                      background: calcType === key ? '#f0f6ff' : '#fff',
                    }}>
                    {/* Radio indicator */}
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors
                      ${calcType === key ? 'border-[#0176C7] bg-[#0176C7]' : 'border-gray-300'}`}>
                      {calcType === key && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-bold leading-tight ${calcType === key ? 'text-[#0176C7]' : 'text-[#0f1857]'}`}>{label}</p>
                      <p className="text-xs text-[#64748b] font-medium mt-0.5">{sub}</p>
                    </div>
                    {calcType === key && (
                      <CheckCircle size={18} className="text-[#0176C7] flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <p className="text-sm font-bold text-[#0f1857] mb-2">Amount (₹)</p>
              <div className="flex items-center gap-3 border-2 rounded-xl px-4 py-3.5 focus-within:border-[#0176C7] transition-colors border-[#e2e8f0] bg-white">
                <IndianRupee size={18} color="#0176C7" className="flex-shrink-0" />
                <input
                  type="text" inputMode="decimal" value={amountStr}
                  onChange={e => { setAmountStr(e.target.value); setAmount(parseFloat(e.target.value.replace(/,/g, '')) || 0) }}
                  onBlur={e => { const v = parseFloat(e.target.value.replace(/,/g, '')) || 0; setAmount(v); setAmountStr(String(v)) }}
                  className="flex-1 outline-none text-[#0176C7] font-bold text-base text-right bg-transparent"
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-[#64748b] font-medium mt-1.5">Enter the amount on which GST is to be calculated</p>
            </div>

            {/* GST Rate */}
            <div className="mb-6">
              <p className="text-sm font-bold text-[#0f1857] mb-3">GST Rate</p>
              <div className="flex flex-wrap gap-2.5">
                {GST_RATES.map(r => (
                  <button key={r} onClick={() => setGstRate(r)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 border-2"
                    style={{
                      background: gstRate === r ? '#0176C7' : '#fff',
                      color: gstRate === r ? '#fff' : '#0f1857',
                      borderColor: gstRate === r ? '#0176C7' : '#e2e8f0',
                    }}>
                    {r}%
                    {gstRate === r && <CheckCircle size={14} />}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#64748b] font-medium mt-2">Select the applicable GST rate</p>
            </div>

            {/* Round Off */}
            <div className="flex items-center justify-between mb-7 pb-6 border-b border-[#f1f5f9]">
              <div>
                <p className="text-sm font-bold text-[#0f1857]">Round Off</p>
                <p className="text-xs text-[#64748b] font-medium">Round off to nearest rupee</p>
              </div>
              <button onClick={() => setRoundOff(!roundOff)}
                className="relative w-12 h-6 rounded-full transition-colors duration-300 flex-shrink-0"
                style={{ background: roundOff ? '#0176C7' : '#e2e8f0' }}>
                <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300"
                  style={{ left: roundOff ? '26px' : '2px' }} />
              </button>
            </div>

            {/* Button */}
            <button className="w-full py-4 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
              style={{ background: 'linear-gradient(135deg, #0176C7, #0155AD)' }}>
              <Calculator size={18} /> Calculate GST
            </button>
          </div>

          {/* RIGHT — Results (2 stacked cards) */}
          <div className="flex flex-col gap-4">

            {/* Dark navy summary card */}
            <div className="rounded-2xl p-6 md:p-7 text-white relative overflow-hidden flex-shrink-0 min-h-[220px]"
              style={{ background: 'linear-gradient(to bottom, #09206c, #061a61)' }}>
              {/* Dot pattern */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

              {/* Absolutely positioned GST Illustration */}
              <img src={gstIllustration} alt="GST Illustration"
                className="absolute right-4 top-4 w-32 h-32 md:w-44 md:h-44 object-contain pointer-events-none z-0" />

              <div className="relative z-10 max-w-[60%]">
                <h2 className="text-base font-bold text-white mb-6">GST Calculation Summary</h2>
                {/* Total amount */}
                <div className="mb-5">
                  <p className="text-white/70 text-sm font-medium mb-1">Total Amount (Incl. GST)</p>
                  <p className="font-black text-white text-2xl md:text-3xl lg:text-4xl" style={{ color: '#4dd9f0' }}>
                    ₹ {fmt2(result.total)}
                  </p>
                </div>
              </div>

              {/* 3-col stats */}
              <div className="grid grid-cols-3 gap-0 border-t border-white/15 pt-5 relative z-10 mt-5">
                {[
                  { label: 'Base Amount (Excl. GST)', value: `₹ ${fmt2(result.base)}`, color: '#38bdf8' },
                  { label: 'GST Amount', value: `₹ ${fmt2(result.gstAmt)}`, color: '#38bdf8' },
                  { label: 'GST Rate', value: `${gstRate}%`, color: '#a78bfa' },
                ].map(({ label, value, color }, idx) => (
                  <div key={label} className={`px-3 py-2 ${idx < 2 ? 'border-r border-white/15' : ''}`}>
                    <p className="text-white/70 text-xs md:text-sm font-semibold leading-tight mb-1.5">{label}</p>
                    <p className="font-black text-sm md:text-lg lg:text-xl" style={{ color }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* White breakdown card */}
            <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-[#e8edf5] flex-1">
              <h3 className="text-base font-bold text-[#0f1857] mb-4">Detailed Breakdown</h3>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#475569] font-medium">Base Amount (Excl. GST)</span>
                  <span className="text-sm font-bold text-[#0f1857]">₹ {fmt2(result.base)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#475569] font-medium">GST @ {gstRate}%</span>
                  <span className="text-sm font-bold text-[#0f1857]">₹ {fmt2(result.gstAmt)}</span>
                </div>
                <div className="border-t border-[#e8edf5] pt-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0f1857]">Total Amount (Incl. GST)</span>
                    <span className="text-base font-black text-[#0176C7]">₹ {fmt2(result.total)}</span>
                  </div>
                </div>
              </div>

              {/* Words box */}
              <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-[#e8edf5] bg-[#f8faff]">
                <div className="w-6 h-6 rounded-full border border-[#0176C7] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#0176C7] text-xs font-black">i</span>
                </div>
                <p className="text-sm text-[#334155] font-medium leading-snug">{result.words}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature Cards ── */}
        <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-sm p-6 md:p-8 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-start gap-4">
                {/* Square-rounded icon box */}
                <div className="w-12 h-12 rounded-xl border-2 border-[#dbeafe] bg-[#eef3ff] flex items-center justify-center flex-shrink-0">
                  <Icon size={22} color="#0176C7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0f1857] mb-1">{title}</p>
                  <p className="text-xs text-[#475569] leading-relaxed font-medium">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── About GST ── */}
        <div className="rounded-2xl border border-[#dbeafe] p-6 md:p-8 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f0f6ff 0%, #e8f0fe 100%)' }}>
          {/* Decorative calculator icon (right) */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden md:block">
            <svg width="130" height="130" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#0176C7]">
              <rect x="15" y="10" width="90" height="100" rx="16" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="3" />
              <rect x="27" y="22" width="66" height="24" rx="6" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="36" cy="62" r="7" fill="currentColor" fillOpacity="0.8" />
              <circle cx="60" cy="62" r="7" fill="currentColor" fillOpacity="0.8" />
              <circle cx="84" cy="62" r="7" fill="currentColor" fillOpacity="0.8" />
              <circle cx="36" cy="82" r="7" fill="currentColor" fillOpacity="0.8" />
              <circle cx="60" cy="82" r="7" fill="currentColor" fillOpacity="0.8" />
              <rect x="77" y="75" width="14" height="14" rx="4" fill="currentColor" fillOpacity="0.8" />
            </svg>
          </div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl border-2 border-[#bfdbfe] bg-white/70 flex items-center justify-center flex-shrink-0">
              <BookOpen size={22} color="#0176C7" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0176C7] mb-1.5">About GST</p>
              <p className="text-sm text-[#334155] leading-relaxed max-w-2xl font-medium">
                Goods and Services Tax (GST) is an indirect tax levied on the supply of goods and services in India.
                The standard GST rates are 0%, 5%, 12%, 18% and 28%.
              </p>
            </div>
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
