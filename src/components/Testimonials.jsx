import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { name: 'Rahul Sharma', role: 'Small Business Owner, Delhi', initials: 'RS', rating: 5, gradient: 'from-blue-500 to-indigo-600', text: "Zero Commission made my business loan process incredibly smooth. Their team was helpful at every step, and I got my loan approved within 24 hours. No hidden charges, zero commission — exactly as promised!" },
  { name: 'Priya Mehta', role: 'Homebuyer, Gurgaon', initials: 'PM', rating: 5, gradient: 'from-[#0176C7] to-[#0155AD]', text: "I was nervous about applying for a home loan, but Zero Commission's team walked me through everything. They found me the best rate available. Transparent, fast, and genuinely caring — highly recommend!" },
  { name: 'Amit Verma', role: 'IT Professional, Noida', initials: 'AV', rating: 5, gradient: 'from-purple-500 to-violet-600', text: "Outstanding service! I applied for a personal loan through Zero Commission and was amazed by how quickly everything moved. The team explained each step clearly. Got my amount in less than 48 hours." },
  { name: 'Sneha Kapoor', role: 'Doctor, New Delhi', initials: 'SK', rating: 5, gradient: 'from-rose-500 to-pink-500', text: "As a healthcare professional with a demanding schedule, I needed a hassle-free loan experience. Zero Commission delivered exactly that — minimal paperwork, quick processing, and excellent support." },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const isAnimating = useRef(false)

  const animateCard = (dir) => {
    if (isAnimating.current) return
    isAnimating.current = true
    const card = cardRef.current
    gsap.to(card, {
      x: dir * -100, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        setCurrent(c => (c + dir + testimonials.length) % testimonials.length)
        gsap.fromTo(card,
          { x: dir * 100, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', onComplete: () => { isAnimating.current = false } }
        )
      }
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.tm-header')
      const card = sectionRef.current?.querySelector('.tm-main-card')
      const minis = sectionRef.current?.querySelectorAll('.tm-mini')
      const nav = sectionRef.current?.querySelector('.tm-nav')

      if (header) gsap.fromTo(header, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: header, start: 'top 88%' } })
      if (card) gsap.fromTo(card, { y: 60, opacity: 0, scale: 0.92 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 86%' }, delay: 0.2 })
      if (minis?.length) gsap.fromTo(minis, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)', scrollTrigger: { trigger: minis[0], start: 'top 88%' }, delay: 0.4 })
      if (nav) gsap.fromTo(nav, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: nav, start: 'top 92%' }, delay: 0.3 })

      const interval = setInterval(() => animateCard(1), 5500)
      return () => clearInterval(interval)
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const t = testimonials[current]

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0197E0] via-blue-500 to-purple-500" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #1a237e 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">

        <div className="tm-header text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full mb-5 border"
            style={{ backgroundColor: '#fff8e1', color: '#f59e0b', borderColor: '#fde68a' }}>
            <Star size={12} className="fill-amber-400 text-amber-400" /> Success Stories
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#1a237e' }}>
            What Our Clients Say
          </h2>
          <p className="text-gray-700 mt-4 text-xl font-medium">Real stories from our satisfied customers</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center mb-10">

          {/* Left mini cards */}
          <div className="hidden lg:flex flex-col gap-4">
            {testimonials.slice(0, 2).map((item, i) => (
              <div key={i} className="tm-mini bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
                onClick={() => { if (!isAnimating.current) setCurrent(i) }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-xs shadow`}>{item.initials}</div>
                  <div><div className="font-bold text-sm" style={{ color: '#1a237e' }}>{item.name}</div><div className="text-gray-400 text-[11px]">{item.role}</div></div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">"{item.text}"</p>
              </div>
            ))}
          </div>

          {/* Main card */}
          <div>
            <div ref={cardRef} className="tm-main-card relative rounded-3xl p-8 md:p-10"
              style={{ background: 'linear-gradient(145deg,#f8f9ff,#ffffff)', border: '1px solid rgba(26,35,126,0.07)', boxShadow: '0 20px 60px rgba(26,35,126,0.1)' }}>
              <Quote size={36} className="text-blue-200 mb-5" />
              <p className="text-gray-600 text-lg leading-[1.8] mb-8">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>{t.initials}</div>
                  <div><div className="font-bold" style={{ color: '#1a237e' }}>{t.name}</div><div className="text-gray-400 text-sm">{t.role}</div></div>
                </div>
                <div className="flex gap-1">{[...Array(t.rating)].map((_, i) => <Star key={i} size={15} className="fill-amber-400 text-amber-400" />)}</div>
              </div>
            </div>
          </div>

          {/* Right mini cards */}
          <div className="hidden lg:flex flex-col gap-4">
            {testimonials.slice(2, 4).map((item, i) => (
              <div key={i} className="tm-mini bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                style={{ border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
                onClick={() => { if (!isAnimating.current) setCurrent(i + 2) }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold text-xs shadow`}>{item.initials}</div>
                  <div><div className="font-bold text-sm" style={{ color: '#1a237e' }}>{item.name}</div><div className="text-gray-400 text-[11px]">{item.role}</div></div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">"{item.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="tm-nav flex items-center justify-center gap-5">
          <button onClick={() => animateCard(-1)}
            className="w-11 h-11 rounded-2xl border border-gray-200 flex items-center justify-center hover:border-[#0197E0] hover:text-[#0176C7] hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => { if (!isAnimating.current) setCurrent(i) }}
                className="rounded-full transition-all duration-400"
                style={{ width: i === current ? 28 : 10, height: 10, background: i === current ? '#14b8a6' : '#e2e8f0' }} />
            ))}
          </div>
          <button onClick={() => animateCard(1)}
            className="w-11 h-11 rounded-2xl border border-gray-200 flex items-center justify-center hover:border-[#0197E0] hover:text-[#0176C7] hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
