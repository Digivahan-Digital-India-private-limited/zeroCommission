import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Local partner logos
import adityaBirlaLogo from '../assets/61684_profilepicture_267beef7.png'
import bajajFinservLogo from '../assets/bajaj-finserv-ltd-dadar-west-mumbai-finance-companies-0ew6n1czpc.avif'
import tataCapitalLogo from '../assets/images (1).png'
import piramalFinanceLogo from '../assets/images (25).jpg'
import cholamandalamLogo from '../assets/images.png'
import standardCharteredLogo from '../assets/Standard_Chartered_(2021).svg.webp'

gsap.registerPlugin(ScrollTrigger)

const partners = [
  { name: 'Tata Capital', logo: tataCapitalLogo },
  { name: 'Cholamandalam', logo: cholamandalamLogo },
  { name: 'Piramal Finance', logo: piramalFinanceLogo },
  { name: 'Bajaj Finserv', logo: bajajFinservLogo },
  { name: 'Aditya Birla Capital', logo: adityaBirlaLogo },
  { name: 'Standard Chartered', logo: standardCharteredLogo },
]

export default function Partners() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
        }
      )
      gsap.fromTo(gridRef.current?.querySelectorAll('.partner-card'),
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: gridRef.current, start: 'top 88%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-14 md:py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f3f5ff 0%, #ffffff 100%)' }}>

      {/* Subtle background dots */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #1a237e 1.5px, transparent 1.5px)', backgroundSize: '44px 44px' }} />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 relative z-10">

        {/* Heading */}
        <div ref={headRef} className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ background: '#e8eaf6', border: '1px solid #c5cae9' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a237e]" />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#1a237e' }}>Our Partners</span>
          </div>
          <h2 className="font-display font-black leading-tight mb-3"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: '#1a237e' }}>
            Trusted by India's{' '}
            <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">
              Leading Lenders
            </span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            We partner with India's most reputed financial institutions to bring you the best loan options — commission-free.
          </p>
        </div>

        {/* Partner Logos Grid */}
        <div ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-6 md:gap-x-5 md:gap-y-8">
          {partners.map((p) => (
            <div key={p.name} className="partner-card flex flex-col items-center gap-3">
              {/* Card with logo */}
              <div className="w-full flex items-center justify-center px-3 py-4 md:py-5 rounded-2xl bg-white border border-[#e8edf5] hover:border-[#c7d9f5] hover:shadow-lg transition-all duration-300 cursor-default"
                style={{ minHeight: 96 }}>
                <img
                  src={p.logo}
                  alt={p.name}
                  className="w-full h-16 md:h-20 object-contain transition-all duration-300"
                />
              </div>
              {/* Name always visible below card */}
              <p className="text-center text-[11px] md:text-[12px] font-bold text-[#0f1857] leading-tight w-full">
                {p.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
