import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ceoPhoto from '../assets/WhatsApp Image 2026-06-18 at 2.46.33 PM.jpeg'
import LazyImage from './LazyImage'

gsap.registerPlugin(ScrollTrigger)

export default function Team() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left panel entrance
      gsap.fromTo(leftRef.current,
        { x: -90, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' } }
      )
      // Card entrance
      gsap.fromTo(cardRef.current,
        { x: 90, opacity: 0, scale: 0.92 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.4)', delay: 0.2, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      // 3D tilt on hover
      const card = cardRef.current
      if (card) {
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect()
          gsap.to(card, { rotateX: -((e.clientY - r.top) / r.height - 0.5) * 9, rotateY: ((e.clientX - r.left) / r.width - 0.5) * 9, scale: 1.04, duration: 0.3, ease: 'power2.out' })
        })
        card.addEventListener('mouseleave', () =>
          gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: 'power2.out' })
        )
      }
      // Floating decorations
      gsap.to('.tdeco-1', { y: -22, rotation: 12, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.tdeco-2', { y: 18, rotation: -9, duration: 5.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 })
      gsap.to('.tdeco-3', { y: -14, x: 10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.5 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="team" className="py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f3f5ff 100%)' }}>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #1a237e 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} />

      {/* Gradient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent)', filter: 'blur(80px)', transform: 'translate(20%, -20%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.08), transparent)', filter: 'blur(70px)', transform: 'translate(-20%, 20%)' }} />

      {/* Floating decorative shapes */}
      <div className="tdeco-1 absolute top-16 right-[12%] w-20 h-20 rounded-2xl border-2 border-indigo-200/50 pointer-events-none" />
      <div className="tdeco-2 absolute bottom-20 left-[10%] w-14 h-14 rounded-full border-2 border-blue-200/50 pointer-events-none" />
      <div className="tdeco-3 absolute top-1/2 right-[5%] w-10 h-10 rounded-xl bg-purple-100/60 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 xl:gap-20 items-center">

          {/* LEFT: Heading + description */}
          <div ref={leftRef} className="lg:col-span-2 flex flex-col">
            {/* Badge */}
            <div className="inline-flex items-center self-start gap-2 px-4 py-2 rounded-full mb-7"
              style={{ background: '#e8eaf6', border: '1px solid #c5cae9' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a237e]" />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#1a237e' }}>Our Founder</span>
            </div>

            {/* Heading */}
            <h2 className="font-display font-black leading-[1.1] mb-5" style={{ fontSize: 'clamp(1.85rem, 3vw, 2.8rem)', color: '#1a237e' }}>
              Meet the Founder Driving{' '}
              <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">
                Zero Commission's
              </span>{' '}
              Vision and Success
            </h2>

            <p className="text-gray-500 text-[17px] leading-relaxed mb-10 max-w-sm">
              Sandeep Rathor is the visionary behind Zero Commission — a platform built to eliminate broker fees and bring complete transparency to the loan process. With over a decade of experience in financial services, he is committed to making loans accessible and commission-free for every Indian.
            </p>
          </div>

          {/* RIGHT: Founder Card */}
          <div className="lg:col-span-3 flex justify-center" style={{ perspective: '1200px' }}>
            <div
              ref={cardRef}
              className="group flex flex-col rounded-3xl overflow-hidden cursor-default w-full max-w-[380px]"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(26,35,126,0.07)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                transformStyle: 'preserve-3d',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 24px 60px rgba(1,151,224,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)' }}
            >
              {/* Photo area */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3.2', background: 'rgba(1,151,224,0.07)' }}>
                <LazyImage src={ceoPhoto} alt="Sandeep Rathor" className="w-full h-full object-cover object-top" />

                {/* Exp badge — bottom center */}
                <div style={{
                  position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(1,118,199,0.18)',
                  borderRadius: 999, padding: '4px 14px',
                  fontSize: 12, fontWeight: 700, color: '#0176C7',
                  whiteSpace: 'nowrap', boxShadow: '0 2px 10px rgba(1,118,199,0.15)',
                }}>
                  15+ Years Exp.
                </div>

                {/* Shield badge — top right */}
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(1,118,199,0.20)',
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0176C7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Accent bar — expands on hover */}
                <div className="h-0.5 rounded-full mb-4 group-hover:w-full transition-all duration-500"
                  style={{ width: '2rem', background: 'linear-gradient(90deg, #0176C7, #0155AD)' }} />

                <h3 className="font-display font-bold text-[17px] mb-1 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#1a237e' }}>
                  Sandeep Rathor
                </h3>

                <div className="text-sm font-semibold mb-3 group-hover:translate-x-1 transition-transform duration-300 delay-75" style={{ color: '#0197E0' }}>
                  CEO &amp; Founder
                </div>

                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  Sandeep Rathor is the visionary behind Zero Commission — a platform built to eliminate broker fees and bring complete transparency to the loan process. With over a decade of experience in financial services, he is committed to making loans accessible and commission-free for every Indian.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
