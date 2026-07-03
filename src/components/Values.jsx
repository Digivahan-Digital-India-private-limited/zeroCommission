import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, BarChart2, Zap, Heart, Eye, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useModal } from './ModalContext'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: Shield, title: 'Integrity', desc: 'We believe in honesty and transparency. Every loan option, detail, and process is clearly communicated so you can make informed decisions with complete confidence.', gradient: 'from-blue-500 to-indigo-600', glow: 'rgba(99,102,241,0.2)' },
  { icon: BarChart2, title: 'Simplicity', desc: "Finance should be easy to understand. We keep our processes simple, paperwork minimal, and guidance clear — so you never feel confused or overwhelmed.", gradient: 'from-[#0176C7] to-[#0155AD]', glow: 'rgba(20,184,166,0.2)' },
  { icon: Zap, title: 'Performance', desc: 'We focus on speed, accuracy, and reliability. From quick analysis to fast approvals, we work efficiently to ensure you get the financial support you need on time.', gradient: 'from-amber-500 to-orange-500', glow: 'rgba(245,158,11,0.2)' },
  { icon: Heart, title: 'Customer First', desc: "Our clients are at the heart of everything we do. We listen, understand, and deliver — because your financial success is our greatest achievement.", gradient: 'from-rose-500 to-pink-500', glow: 'rgba(244,63,94,0.2)' },
  { icon: Eye, title: 'Transparency', desc: 'No hidden fees, no surprise charges, no fine print. We lay everything out in plain language so you always know exactly where you stand.', gradient: 'from-purple-500 to-violet-600', glow: 'rgba(139,92,246,0.2)' },
  { icon: Globe, title: 'Accessibility', desc: 'We believe financial support should be accessible to everyone. Our network of lenders ensures solutions for diverse needs across India.', gradient: 'from-[#0176C7] to-[#0155AD]', glow: 'rgba(16,185,129,0.2)' },
]

export default function Values() {
  const sectionRef = useRef(null)
  const { openModal } = useModal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.val-header')
      const cards = sectionRef.current?.querySelectorAll('.val-card')
      const cta = sectionRef.current?.querySelector('.val-cta')

      if (header) gsap.fromTo(header, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: header, start: 'top 88%' } })

      if (cards?.length) {
        gsap.fromTo(cards, { y: 80, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: { amount: 0.6 }, ease: 'back.out(1.3)', scrollTrigger: { trigger: cards[0], start: 'top 82%' } })

        cards.forEach(card => {
          card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect()
            gsap.to(card, { rotateX: -((e.clientY - r.top) / r.height - 0.5) * 7, rotateY: ((e.clientX - r.left) / r.width - 0.5) * 7, scale: 1.03, duration: 0.3, ease: 'power2.out' })
          })
          card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'power2.out' }))
        })
      }

      if (cta) gsap.fromTo(cta, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)', scrollTrigger: { trigger: cta, start: 'top 92%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="values" className="py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #eef0ff 0%, #f5f7ff 100%)' }}>

      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-25 pointer-events-none" style={{ background: 'radial-gradient(circle, #c5cae9, transparent)', filter: 'blur(80px)' }} />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #b2dfdb, transparent)', filter: 'blur(70px)' }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">

        <div className="val-header text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full mb-5 border"
            style={{ backgroundColor: '#e8eaf6', color: '#1a237e', borderColor: '#c5cae9' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a237e]" /> Our Values
          </div>
          <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#1a237e' }}>
            Principles That{' '}
            <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">Drive Us</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-xl">Our values are the foundation of every interaction, decision, and service we provide.</p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-16" style={{ perspective: '1000px' }}>
          {values.map(({ icon: Icon, title, desc, gradient, glow }) => (
            <div key={title} className="val-card group bg-white rounded-3xl p-8 cursor-default"
              style={{ border: '1px solid rgba(26,35,126,0.07)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', transformStyle: 'preserve-3d', transition: 'box-shadow 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 50px ${glow}` }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)' }}>
              <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={26} className="text-white" />
              </div>
              <div className={`h-1 w-12 bg-gradient-to-r ${gradient} rounded-full mb-5 group-hover:w-20 transition-all duration-500`} />
              <h3 className="font-display font-bold text-xl mb-3" style={{ color: '#1a237e' }}>{title}</h3>
              <p className="text-gray-500 text-[17px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="val-cta text-center">
          <p className="text-gray-500 mb-6 text-base">Ready to experience finance the Zero Commission way?</p>
          <Link to="/about" className="inline-flex items-center gap-3 text-white px-10 py-4 rounded-2xl font-bold text-base hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            style={{ background: 'linear-gradient(135deg,#0197E0,#0155AD)', boxShadow: '0 10px 30px rgba(1,151,224,0.3)' }}>
            Our Team
          </Link>
        </div>
      </div>
    </section>
  )
}
