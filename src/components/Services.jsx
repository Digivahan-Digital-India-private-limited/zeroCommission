import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Home, Briefcase, Car, GraduationCap, HeartHandshake, Plane, CheckCircle2, ArrowRight, Clock, FileText, User, Percent, Building2, ArrowLeftRight, Shield, Zap, ShieldCheck, Headset } from 'lucide-react'
import { useModal } from './ModalContext'
import ServicesHero from './ServicesHero'
import EligibilityCriteria from './EligibilityCriteria'
import LazyImage from './LazyImage'
import homeLoanImg from '../assets/Home Loan.webp'
import carLoanImg from '../assets/Car loan.webp'
import businessLoanImg from '../assets/Business loan.webp'
import personalLoanImg from '../assets/Personal loan.webp'
import educationLoanImg from '../assets/Education loan.webp'
import travelLoanImg from '../assets/Travel loan.webp'
import odLimitImg from '../assets/OD Limit.webp'
import balanceTransferImg from '../assets/Balance Tranfer.webp'

gsap.registerPlugin(ScrollTrigger)

const loanProducts = [
  { 
    id: 'home',
    icon: Home, 
    title: 'Home Loan', 
    desc: 'Make your dream home a reality with our home loans.', 
    theme: 'blue',
    startingRate: '8.35%*',
    upToAmount: '₹5 Cr',
    time: '24 - 48 Hrs',
    docs: 'Minimal',
    eligibility: 'Salaried / Self Employed',
    interestType: 'Floating Interest Rate',
    image: homeLoanImg, 
  },
  { 
    id: 'car',
    icon: Car, 
    title: 'Car Loan', 
    desc: 'Drive your dream car with attractive interest rates.', 
    theme: 'green',
    startingRate: '7.99%*',
    upToAmount: '100%',
    amountLabel: 'Funding',
    time: '2 - 24 Hrs',
    docs: 'Minimal',
    eligibility: 'Salaried / Self Employed',
    interestType: 'Floating Interest Rate',
    image: carLoanImg, 
  },
  { 
    id: 'business',
    icon: Briefcase, 
    title: 'Business Loan', 
    desc: 'Grow your business with flexible financing options.', 
    theme: 'purple',
    startingRate: '10.50%*',
    upToAmount: '₹2 Cr',
    time: '24 - 72 Hrs',
    docs: 'Minimal',
    eligibility: 'Business Vintage 1+ Year',
    interestType: 'Floating Interest Rate',
    image: businessLoanImg, 
  },
  { 
    id: 'personal',
    icon: User, 
    title: 'Personal Loan', 
    desc: 'Fulfill your needs with quick and easy loans', 
    theme: 'blue',
    startingRate: '10.99%*',
    upToAmount: '₹50 Lakh',
    time: '12 - 24 Hrs',
    docs: 'Minimal',
    eligibility: 'Salaried / Self Employed',
    interestType: 'Floating Interest Rate',
    image: personalLoanImg, 
  },
  { 
    id: 'education',
    icon: GraduationCap, 
    title: 'Education Loan', 
    desc: 'Invest in your future with affordable education loans', 
    theme: 'purple',
    startingRate: '8.75%*',
    upToAmount: '₹1 Crore',
    time: '24 - 48 Hrs',
    docs: 'Minimal',
    eligibility: 'Student / Co-applicant Required',
    interestType: 'Floating Interest Rate',
    image: educationLoanImg, 
  },
  { 
    id: 'travel',
    icon: Plane, 
    title: 'Travel Loan', 
    desc: 'Explore the world with hassle-free travel loans', 
    theme: 'teal',
    startingRate: '11.49%*',
    upToAmount: '₹20 Lakh',
    time: '12 - 24 Hrs',
    docs: 'Minimal',
    eligibility: 'Salaried / Self Employed',
    interestType: 'Floating Interest Rate',
    image: travelLoanImg, 
  },
]

const specialProducts = [
  { 
    id: 'od-limit',
    icon: Building2, 
    title: 'OD Limit', 
    desc: 'Flexible credit for your business & personal needs', 
    theme: 'blue',
    startingRate: '12.49%*',
    upToAmount: '₹5 Crore',
    amountLabel: 'Credit Limit',
    time: '24 - 48 Hrs',
    docs: 'Minimal',
    eligibility: 'Salaried / Self Employed',
    interestType: 'Floating Interest Rate',
    image: odLimitImg, 
  },
  { 
    id: 'balance-transfer',
    icon: ArrowLeftRight, 
    title: 'Balance Transfer', 
    desc: 'Transfer your existing loan & save on high interest', 
    theme: 'green',
    startingRate: '8.49%*',
    upToAmount: '₹2 Crore',
    amountLabel: 'Transfer Amount',
    time: '24 - 48 Hrs',
    docs: 'Minimal',
    eligibility: 'Salaried / Self Employed',
    interestType: 'Floating Interest Rate',
    image: balanceTransferImg, 
  },
]

const highlightsData = [
  { icon: ShieldCheck, title: 'No Hidden Charges', desc: 'Zero commission, 100% transparent' },
  { icon: FileText, title: 'Minimal Documents', desc: 'Only essential documents required' },
  { icon: Zap, title: 'Quick Approval', desc: 'Disbursal in as fast as 24 hrs' },
  { icon: ShieldCheck, title: '100% Secure', desc: 'Your data is protected with top security' },
  { icon: Headset, title: 'Expert Support', desc: 'Get assistance from loan experts' }
]

const getThemeColors = (theme) => {
  switch(theme) {
    case 'blue': return { bg: 'bg-[#f4f7ff]', text: 'text-[#0155AD]', iconBg: 'bg-[#e5effa]', btnBg: 'bg-[#0155AD]', btnHover: 'hover:bg-[#014185]', border: 'border-[#0155AD]/10' };
    case 'green': return { bg: 'bg-[#f0fdf4]', text: 'text-[#16a34a]', iconBg: 'bg-[#dcfce7]', btnBg: 'bg-[#16a34a]', btnHover: 'hover:bg-[#15803d]', border: 'border-[#16a34a]/10' };
    case 'purple': return { bg: 'bg-[#faf5ff]', text: 'text-[#6d28d9]', iconBg: 'bg-[#f3e8ff]', btnBg: 'bg-[#6d28d9]', btnHover: 'hover:bg-[#5b21b6]', border: 'border-[#6d28d9]/10' };
    case 'teal': return { bg: 'bg-[#f0fdfa]', text: 'text-[#0d9488]', iconBg: 'bg-[#ccfbf1]', btnBg: 'bg-[#0d9488]', btnHover: 'hover:bg-[#0f766e]', border: 'border-[#0d9488]/10' };
    default: return { bg: 'bg-[#f4f7ff]', text: 'text-[#0155AD]', iconBg: 'bg-[#e5effa]', btnBg: 'bg-[#0155AD]', btnHover: 'hover:bg-[#014185]', border: 'border-[#0155AD]/10' };
  }
}

export default function Services() {
  const sectionRef = useRef(null)
  const { openModal } = useModal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.svc-card')

      if (cards?.length) {
        gsap.fromTo(cards, { y: 60, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: { amount: 0.3 }, ease: 'power3.out', scrollTrigger: { trigger: cards[0], start: 'top 85%' } })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <ServicesHero />
      <section ref={sectionRef} id="services-grid" className="pt-4 pb-10 relative bg-[#f8fafc]">
        
        {/* Header inside the section */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10 mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0155AD] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4 border border-blue-100">
            <span className="w-1.5 h-1.5 bg-[#0155AD] rounded-full" /> FEATURED LOAN PRODUCTS
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a237e] mb-4">Explore Our Loan Solutions</h2>
          <p className="text-gray-500 text-[15px] max-w-2xl mx-auto">Choose from a wide range of loan options designed to meet your personal and business needs.</p>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
          
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {loanProducts.map((srv) => {
              const theme = getThemeColors(srv.theme);
              return (
                <div key={srv.title} className="svc-card group relative bg-white rounded-3xl overflow-hidden flex flex-col shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  
                  {/* Top Half: Info & Image */}
                  <div className={`p-6 pb-4 relative overflow-hidden ${theme.bg} min-h-[260px] md:min-h-[280px]`}>
                    <div className="absolute inset-0">
                      {srv.image ? (
                        <>
                          {/* LazyImage: Flipkart-style — blur-to-sharp, tabhi load ho jab viewport me aaye */}
                          <LazyImage
                            src={srv.image}
                            alt={srv.title}
                            rootMargin="400px 0px"
                            className={`absolute inset-0 h-full w-full object-cover ${srv.id === 'travel' ? 'object-left' : 'object-center'}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
                        </>
                      ) : (
                        <div className={`absolute inset-0 border-l border-b border-dashed ${theme.border} bg-white/40`} />
                      )}
                    </div>
                    {srv.id === 'travel' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
                    )}
                    
                    <div className="relative z-10 w-full max-w-[58%] pr-2 md:pr-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${theme.iconBg} shadow-sm`}>
                        <srv.icon size={22} className={theme.text} strokeWidth={2.5} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-bold text-xl text-[#1e1b4b] mb-1 leading-tight">{srv.title}</h3>
                      <p className="text-gray-600 font-medium text-[13px] mb-4 min-h-[32px] leading-relaxed">{srv.desc}</p>
                      
                      {/* Rates & Amount */}
                      <div className="space-y-3 mb-2">
                        <div>
                          <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-0.5">Starting From</div>
                          <div className={`text-2xl font-black ${theme.text}`}>{srv.startingRate} <span className="text-[13px] font-bold text-gray-600">p.a.</span></div>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-0.5">Up to</div>
                          <div className={`text-xl font-bold ${theme.text}`}>{srv.upToAmount}</div>
                          <div className="text-[11px] font-semibold text-gray-600">{srv.amountLabel || 'Loan Amount'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Half: Metrics & Button */}
                  <div className="p-6 pt-5 bg-white flex flex-col flex-grow">
                    <div className="grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-y-4 gap-x-2 mb-6">
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${theme.iconBg}`}><Clock size={14} className={theme.text} /></div>
                        <div className="text-[10px] text-gray-600 font-semibold mb-1">Processing Time</div>
                        <div className={`text-[11px] font-bold ${theme.text}`}>{srv.time}</div>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${theme.iconBg}`}><FileText size={14} className={theme.text} /></div>
                        <div className="text-[10px] text-gray-600 font-semibold mb-1">Documents Required</div>
                        <div className="text-[11px] font-bold text-gray-900">{srv.docs}</div>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${theme.iconBg}`}><User size={14} className={theme.text} /></div>
                        <div className="text-[10px] text-gray-600 font-semibold mb-1">Eligibility</div>
                        <div className="text-[11px] font-bold text-gray-900 leading-tight">{srv.eligibility}</div>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${theme.iconBg}`}><Percent size={14} className={theme.text} /></div>
                        <div className="text-[10px] text-gray-600 font-semibold mb-1">Interest Rate</div>
                        <div className="text-[11px] font-bold text-gray-900 leading-tight">{srv.interestType}</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => openModal(srv.title)}
                      className={`mt-auto w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm transition-all shadow-sm ${theme.btnBg} ${theme.btnHover}`}
                    >
                      Apply Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Wide Cards Row (OD Limit & Balance Transfer) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {specialProducts.map((srv) => {
              const theme = getThemeColors(srv.theme);
              return (
                <div key={srv.title} className="svc-card group relative bg-white rounded-3xl overflow-hidden flex flex-col shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  
                  <div className={`p-6 md:p-8 pb-4 relative overflow-hidden flex-grow min-h-[260px] md:min-h-[280px] ${theme.bg}`}>
                    <div className="absolute inset-0">
                      {srv.image ? (
                        <>
                          <LazyImage src={srv.image} alt={srv.title} className="absolute inset-0 h-full w-full object-cover object-center" />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
                        </>
                      ) : (
                        <div className={`absolute inset-0 border-l border-b border-dashed ${theme.border} bg-white/40`} />
                      )}
                    </div>
                    
                    <div className="relative z-10 w-full max-w-[58%] pr-2 md:pr-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-5 ${theme.iconBg} shadow-sm`}>
                        <srv.icon size={24} className={theme.text} strokeWidth={2.5} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-bold text-xl md:text-2xl text-[#1e1b4b] mb-1.5 leading-tight">{srv.title}</h3>
                      <p className="text-gray-600 text-[13px] md:text-[15px] font-medium mb-5 leading-relaxed pr-2">{srv.desc}</p>
                      
                      {/* Rates & Amount */}
                      <div className="space-y-4 mb-2">
                        <div>
                          <div className="text-[11px] md:text-xs font-bold text-gray-600 uppercase tracking-wider mb-0.5">Starting From</div>
                          <div className={`text-2xl md:text-3xl font-black ${theme.text}`}>{srv.startingRate} <span className="text-[13px] md:text-[15px] font-bold text-gray-600">p.a.</span></div>
                        </div>
                        <div>
                          <div className="text-[11px] md:text-xs font-bold text-gray-600 uppercase tracking-wider mb-0.5">Up to</div>
                          <div className={`text-xl md:text-2xl font-bold ${theme.text}`}>{srv.upToAmount}</div>
                          <div className="text-[11px] md:text-[13px] font-semibold text-gray-600">{srv.amountLabel || 'Loan Amount'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Half: Metrics & Button */}
                  <div className="p-6 md:p-8 pt-5 md:pt-6 bg-white flex flex-col">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 md:gap-4 mb-6 md:mb-8">
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 ${theme.iconBg}`}><Clock size={16} className={theme.text} /></div>
                        <div className="text-[10px] md:text-[11px] text-gray-600 font-semibold mb-1">Processing Time</div>
                        <div className={`text-[11px] md:text-xs font-bold ${theme.text}`}>{srv.time}</div>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 ${theme.iconBg}`}><FileText size={16} className={theme.text} /></div>
                        <div className="text-[10px] md:text-[11px] text-gray-600 font-semibold mb-1">Documents Required</div>
                        <div className="text-[11px] md:text-xs font-bold text-gray-900">{srv.docs}</div>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 ${theme.iconBg}`}><User size={16} className={theme.text} /></div>
                        <div className="text-[10px] md:text-[11px] text-gray-600 font-semibold mb-1">Eligibility</div>
                        <div className="text-[11px] md:text-xs font-bold text-gray-900 leading-tight">{srv.eligibility}</div>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 ${theme.iconBg}`}><Percent size={16} className={theme.text} /></div>
                        <div className="text-[10px] md:text-[11px] text-gray-600 font-semibold mb-1">Interest Rate</div>
                        <div className="text-[11px] md:text-xs font-bold text-gray-900 leading-tight">{srv.interestType}</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => openModal(srv.title)}
                      className={`w-full py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm md:text-base transition-all shadow-sm ${theme.btnBg} ${theme.btnHover}`}
                    >
                      Apply Now <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Highlights Banner */}
          <div className="bg-[#f0f6ff] rounded-3xl p-6 md:p-8 lg:p-10 border border-[#0155AD]/10 mt-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {highlightsData.map((h, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl bg-white border border-[#0155AD]/10 flex items-center justify-center text-[#0155AD] shadow-sm">
                    <h.icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a237e] text-xs md:text-sm mb-1 leading-tight">{h.title}</div>
                    <div className="text-xs md:text-[13px] text-gray-600 font-medium leading-relaxed">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
      
      <EligibilityCriteria />
    </>
  )
}
