import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calculator, IndianRupee, PieChart, Info } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function EmiCalculator() {
  const sectionRef = useRef(null)

  const [principal, setPrincipal] = useState(1000000) // 10 Lakhs
  const [rate, setRate] = useState(8.5) // 8.5%
  const [tenureMode, setTenureMode] = useState('Yr') // 'Yr' or 'Mo'
  const [tenureVal, setTenureVal] = useState(15) // 15 years or 180 months

  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    // EMI Calculation
    const P = principal
    const R = rate / 12 / 100
    const N = tenureMode === 'Yr' ? tenureVal * 12 : tenureVal

    if (P > 0 && R > 0 && N > 0) {
      const emiVal = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1)
      const totalAmt = emiVal * N
      const totalInt = totalAmt - P

      setEmi(Math.round(emiVal))
      setTotalAmount(Math.round(totalAmt))
      setTotalInterest(Math.round(totalInt))
    } else {
      setEmi(0)
      setTotalAmount(0)
      setTotalInterest(0)
    }
  }, [principal, rate, tenureVal, tenureMode])

  // GSAP Animations
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

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num)
  }

  // Calculate percentages for the progress bar visual
  const principalPercent = totalAmount > 0 ? (principal / totalAmount) * 100 : 100
  const interestPercent = totalAmount > 0 ? (totalInterest / totalAmount) * 100 : 0

  return (
    <section ref={sectionRef} id="emi-calculator" className="pt-4 pb-32 relative overflow-hidden"
      style={{ background: '#ffffff' }}>

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
            <Calculator size={14} className="text-[#1a237e]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#1a237e]">EMI Calculator</span>
          </div>
          <h2 className="font-display font-black leading-tight mb-3" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#0f1857' }}>
            Plan Your <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">Finances Smartly</span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mx-auto">
            Calculate your monthly installment, total interest, and principal amount with our easy-to-use EMI calculator. Transparency from the very first step.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Left: Input Controls */}
          <div className="emi-card-left lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xl shadow-indigo-900/5 relative overflow-hidden"
            style={{ boxShadow: '0 20px 40px rgba(15,24,87,0.06)' }}>

            <div className="space-y-6">

              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[#0f1857] font-bold text-sm md:text-base">Loan Amount</label>
                  <div className="flex items-center bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-2 focus-within:border-[#0155AD] focus-within:ring-1 focus-within:ring-[#0155AD] transition-all">
                    <span className="text-[#0155AD] font-display font-bold text-lg mr-1">₹</span>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="bg-transparent text-[#0155AD] font-display font-bold text-lg w-28 text-right outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="50000000"
                  step="100000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0197E0]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                  <span>1 Lakh</span>
                  <span>5 Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[#0f1857] font-bold text-sm md:text-base">Interest Rate (p.a)</label>
                  <div className="flex items-center bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-2 focus-within:border-[#0155AD] focus-within:ring-1 focus-within:ring-[#0155AD] transition-all">
                    <input
                      type="number"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      onBlur={() => {
                        if (rate < 1) setRate(1);
                        if (rate > 20) setRate(20);
                      }}
                      className="bg-transparent text-[#0155AD] font-display font-bold text-lg w-16 text-right outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-[#0155AD] font-display font-bold text-lg ml-1">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0197E0]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[#0f1857] font-bold text-sm md:text-base">Loan Tenure</label>
                  
                  <div className="flex items-center gap-2 md:gap-3">
                    {/* Toggle */}
                    <div className="flex bg-blue-50/80 border border-blue-100 rounded-lg overflow-hidden">
                      {['Mo', 'Yr'].map(m => (
                        <button key={m} onClick={() => { setTenureMode(m); setTenureVal(m === 'Yr' ? Math.max(1, Math.round(tenureVal / 12)) : tenureVal * 12) }}
                          className="px-2 py-1 md:px-3 md:py-1.5 text-xs font-bold transition-all cursor-pointer"
                          style={{ background: tenureMode === m ? '#0155AD' : 'transparent', color: tenureMode === m ? '#fff' : '#0155AD' }}>
                          {m}
                        </button>
                      ))}
                    </div>
                    
                    {/* Input Box */}
                    <div className="flex items-center bg-blue-50/50 border border-blue-100 rounded-xl px-2 py-1 md:px-4 md:py-2 focus-within:border-[#0155AD] focus-within:ring-1 focus-within:ring-[#0155AD] transition-all">
                      <input
                        type="number"
                        value={tenureVal}
                        onChange={(e) => setTenureVal(Number(e.target.value))}
                        onBlur={() => {
                          const min = tenureMode === 'Mo' ? 6 : 1;
                          const max = tenureMode === 'Mo' ? 360 : 30;
                          if (tenureVal < min) setTenureVal(min);
                          if (tenureVal > max) setTenureVal(max);
                        }}
                        className="bg-transparent text-[#0155AD] font-display font-bold text-base md:text-lg w-10 md:w-12 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                </div>
                
                <input
                  type="range"
                  min={tenureMode === 'Mo' ? 6 : 1}
                  max={tenureMode === 'Mo' ? 360 : 30}
                  step="1"
                  value={tenureVal}
                  onChange={(e) => setTenureVal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0197E0]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                  <span>{tenureMode === 'Mo' ? '6 Mo' : '1 Yr'}</span>
                  <span>{tenureMode === 'Mo' ? '360 Mos' : '30 Yrs'}</span>
                </div>
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
                <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">Equated Monthly Installment</p>
                <div className="font-display font-black text-4xl md:text-5xl text-[#0197E0] drop-shadow-lg">
                  {formatCurrency(emi)}
                </div>
              </div>

              {/* Visual Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs font-semibold mb-3 text-white/80">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#0197E0] shadow-[0_0_10px_rgba(45,212,191,0.5)]"></span> Principal Amount</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"></span> Total Interest</div>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex bg-white/10 p-0.5">
                  <div className="h-full bg-[#0197E0] rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: `${principalPercent}%` }}></div>
                  <div className="h-full bg-indigo-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(129,140,248,0.5)] ml-1" style={{ width: `${interestPercent}%` }}></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2.5 border-b border-white/10">
                  <span className="text-white/70 font-medium text-sm">Principal Amount</span>
                  <span className="font-bold text-base">{formatCurrency(principal)}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-white/10">
                  <span className="text-white/70 font-medium text-sm">Total Interest Amount</span>
                  <span className="font-bold text-base">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-white/70 font-medium text-sm">Total Amount Payable</span>
                  <span className="font-bold text-lg text-white">{formatCurrency(totalAmount)}</span>
                </div>
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
      {/* Animated Bottom Wave Layout */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] overflow-hidden pointer-events-none z-10">

        {/* Wave 1: Soft Teal Tint (Back Layer) */}
        <svg className="wave-layer animate-wave-slow" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,50 C 360,20 360,80 720,50 C 1080,20 1080,80 1440,50 C 1800,20 1800,80 2160,50 C 2520,20 2520,80 2880,50 L 2880,100 L 0,100 Z" fill="rgba(1, 151, 224, 0.08)" />
        </svg>

        {/* Wave 2: Soft Purple/Indigo Tint (Middle Layer) */}
        <svg className="wave-layer animate-wave-mid" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,60 C 360,80 360,40 720,60 C 1080,80 1080,40 1440,60 C 1800,80 1800,40 2160,60 C 2520,80 2520,40 2880,60 L 2880,100 L 0,100 Z" fill="rgba(99, 102, 241, 0.05)" />
        </svg>

        {/* Wave 3: Solid Light-Blue Front (Matches Ticker background) */}
        <svg className="wave-layer animate-wave-fast" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,70 C 360,55 360,85 720,70 C 1080,55 1080,85 1440,70 C 1800,55 1800,85 2160,70 C 2520,55 2520,85 2880,70 L 2880,100 L 0,100 Z" fill="#f8f9ff" />
        </svg>

      </div>
    </section>
  )
}
