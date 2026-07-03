import React from 'react'
import { Home, User, Briefcase, Car, CheckCircle2, Calendar, ShieldCheck, Lock, FileText, Zap, Users } from 'lucide-react'

const criteriaCards = [
  {
    title: 'Home Loan',
    icon: Home,
    theme: 'blue',
    checks: [
      { label: 'Salaried', desc: 'Minimum 2 years of work experience' },
      { label: 'Self-employed', desc: 'Minimum 2 years of business experience' }
    ],
    minAge: '21 Years',
    maxAge: '65 Years'
  },
  {
    title: 'Personal Loan',
    icon: User,
    theme: 'green',
    checks: [
      { label: 'Minimum Income', desc: '₹20,000 per month' },
      { label: 'Salaried / Self-employed', desc: 'Both eligible' },
      { label: 'Stable Income Source', desc: 'Required' }
    ],
    minAge: '21 Years',
    maxAge: '60 Years'
  },
  {
    title: 'Business Loan',
    icon: Briefcase,
    theme: 'purple',
    checks: [
      { label: 'GST Registration', desc: 'Required' },
      { label: 'ITR / Financial Statements', desc: 'Last 2 Years' },
      { label: 'Business Vintage', desc: 'Minimum 1 Year' }
    ],
    minAge: '21 Years',
    maxAge: '65 Years'
  },
  {
    title: 'Car Loan',
    icon: Car,
    theme: 'orange',
    checks: [
      { label: 'New Car', desc: 'All brands & models' },
      { label: 'Used Car', desc: 'Up to 8 Years old' },
      { label: 'Salaried / Self-employed', desc: 'Both eligible' }
    ],
    minAge: '21 Years',
    maxAge: '60 Years'
  }
]

const highlights = [
  { icon: ShieldCheck, title: 'Simple & Transparent Process', desc: 'Our eligibility criteria is simple, transparent and designed to help you get the best loan offers.', flex: 'xl:flex-[1.8]', iconColor: 'text-[#0155AD]', iconBg: 'bg-blue-50' },
  { icon: Lock, title: 'No Hidden Charges', desc: '100% transparent process', flex: 'xl:flex-1', iconColor: 'text-green-600', iconBg: 'bg-green-50' },
  { icon: FileText, title: 'Minimal Documentation', desc: 'Only essential documents required', flex: 'xl:flex-1', iconColor: 'text-[#0155AD]', iconBg: 'bg-blue-50' },
  { icon: Zap, title: 'Quick Approval', desc: 'Fast verification & approval', flex: 'xl:flex-1', iconColor: 'text-orange-600', iconBg: 'bg-orange-50' },
  { icon: ShieldCheck, title: 'Secure & Safe', desc: 'Your data is safe with us', flex: 'xl:flex-1', iconColor: 'text-purple-600', iconBg: 'bg-purple-50' }
]

const getThemeStyles = (theme) => {
  switch (theme) {
    case 'blue': return { iconBg: 'bg-blue-100', text: 'text-blue-600', check: 'text-blue-600', line: 'bg-blue-600', boxBg: 'bg-blue-50' }
    case 'green': return { iconBg: 'bg-green-100', text: 'text-green-600', check: 'text-green-600', line: 'bg-green-500', boxBg: 'bg-green-50' }
    case 'purple': return { iconBg: 'bg-purple-100', text: 'text-purple-600', check: 'text-purple-600', line: 'bg-purple-500', boxBg: 'bg-purple-50' }
    case 'orange': return { iconBg: 'bg-orange-100', text: 'text-orange-600', check: 'text-orange-500', line: 'bg-orange-500', boxBg: 'bg-orange-50' }
    default: return { iconBg: 'bg-blue-100', text: 'text-blue-600', check: 'text-blue-600', line: 'bg-blue-600', boxBg: 'bg-blue-50' }
  }
}

export default function EligibilityCriteria() {
  return (
    <>
      <section className="pt-8 pb-10 relative bg-[#f8fafc]">

        {/* Header */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10 mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0155AD] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-blue-100">
            <Users size={14} className="text-[#0155AD]" />
            ELIGIBILITY CRITERIA
          </div>
          <h2 className="text-3xl md:text-4.5xl font-black text-[#1a1b4b] mb-4" style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)' }}>Check Your Eligibility</h2>
          <p className="text-gray-500 text-[15px] max-w-xl mx-auto">Simple criteria to help you understand what's required to get your loan approved quickly.</p>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {criteriaCards.map((card, idx) => {
              const styles = getThemeStyles(card.theme)
              return (
                <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                  {/* Icon & Title */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${styles.iconBg}`}>
                      <card.icon size={32} className={styles.text} />
                    </div>
                    <h3 className="font-black text-[22px] text-[#1a1b4b]">{card.title}</h3>
                    <div className={`w-8 h-0.5 mt-3 ${styles.line}`}></div>
                  </div>

                  {/* Checks */}
                  <div className="flex-grow space-y-5 mb-8">
                    {card.checks.map((check, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${styles.check}`} fill="currentColor" stroke="white" />
                        <div>
                          <div className="font-bold text-gray-900 text-sm md:text-[15px]">{check.label}</div>
                          <div className="text-[13px] text-gray-600 font-medium mt-0.5 leading-snug">{check.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Age Box */}
                  <div className={`mt-auto rounded-2xl p-4 flex items-center justify-between ${styles.boxBg}`}>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 ${styles.text}`}>
                        <User size={16} />
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-600 font-semibold mb-0.5">Minimum Age</div>
                        <div className={`font-bold text-[15px] ${styles.text}`}>{card.minAge}</div>
                      </div>
                    </div>
                    <div className="w-px h-8 bg-black/5 mx-2"></div>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 ${styles.text}`}>
                        <Calendar size={16} />
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-600 font-semibold mb-0.5">Max Age</div>
                        <div className={`font-bold text-[15px] ${styles.text}`}>{card.maxAge}</div>
                      </div>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

          {/* Highlights Banner */}
          <div className="bg-[#f4f7ff] rounded-2xl p-6 md:p-8 xl:p-6 2xl:p-8 border border-[#0155AD]/10">
            <div className="flex flex-col xl:flex-row xl:divide-x divide-[#0155AD]/10 gap-y-6 xl:gap-y-0">

              {highlights.map((h, i) => (
                <div key={i} className={`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 md:gap-4 px-0 xl:px-5 ${i === 0 ? 'xl:pl-0' : ''} ${i === highlights.length - 1 ? 'xl:pr-0' : ''} w-full ${h.flex}`}>
                  <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full flex items-center justify-center border border-white shadow-sm ${h.iconBg} ${h.iconColor}`}>
                    <h.icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-[#1a1b4b] text-[11px] md:text-[13px] mb-1 leading-tight">{h.title}</div>
                    <div className="text-[10px] md:text-xs text-gray-500 font-medium leading-relaxed pr-0 xl:pr-2">{h.desc}</div>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* Zero Commission / Our Promise Section */}
      {/* ─── Our Services / Zero Commission Section ── */}
      <section className="py-8 md:py-10 bg-white relative">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center">

          {/* OUR SERVICES pill */}
          <div className="inline-flex items-center gap-2 bg-white text-[#1a1b4b] text-[11px] font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8 border border-gray-200 shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#1a1b4b] rounded-full" />
            OUR SERVICES
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-black text-[#0d1245] mb-5 tracking-tight leading-tight">
            Financial Solutions{' '}
            <span className="text-[#0155AD]">For Every Need</span>
          </h2>

          <p className="text-gray-500 text-[17px] md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            From home loans to business financing — we connect you with the best lenders at zero commission.
          </p>

          {/* Dark Navy Banner */}
          <div
            className="rounded-2xl md:rounded-3xl p-7 md:p-10 text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
            style={{
              background: 'linear-gradient(120deg, #1a2980 0%, #1e3178 50%, #162060 100%)',
              boxShadow: '0 20px 60px rgba(20,40,130,0.25)'
            }}
          >
            {/* subtle right glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,160,255,0.15) 0%, transparent 70%)' }}
            />

            {/* Left text */}
            <div className="relative z-10 max-w-[560px] w-full">
              <div className="text-[#00b4ff] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                OUR PROMISE
              </div>
              <h3 className="text-white text-2xl md:text-3xl lg:text-[36px] font-black mb-4 leading-tight">
                Zero Commission — Always
              </h3>
              <p className="text-gray-300/75 text-sm leading-relaxed max-w-[460px]">
                We never charge our clients a single rupee in commission.<br className="hidden md:block" />
                Our revenue comes from lending partners, not from you. Ever.
              </p>
            </div>

            {/* Right Badge — cyan square */}
            <div className="relative z-10 shrink-0">
              <div
                className="rounded-2xl flex flex-col items-center justify-center px-10 py-7 hover:scale-105 transition-transform duration-500"
                style={{
                  background: 'linear-gradient(145deg, #00b4ff 0%, #0088ee 100%)',
                  boxShadow: '0 12px 36px rgba(0,136,238,0.5)',
                  minWidth: '180px'
                }}
              >
                {/* ₹0 */}
                <div className="flex items-start text-white leading-none mb-1">
                  <span className="font-bold text-xl mt-2 mr-0.5">₹</span>
                  <span className="font-black text-[72px] leading-none">0</span>
                </div>
                <div className="text-white font-semibold text-[13px] tracking-wide whitespace-nowrap">
                  Your Cost. Always.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
