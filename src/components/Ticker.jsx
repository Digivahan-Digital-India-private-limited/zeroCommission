import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Percent, Zap, Users, Eye, Headphones, Coins, MapPin, Clock, Briefcase } from 'lucide-react'

// ─── High-end GSAP-powered marquee ticker ─────────────────────────────────
// App.jsx se nikaala — ab yeh apna alag lazy chunk hai
// Sirf tab download hoga jab Home page ka ticker section viewport me aaye

const items = [
  { label: 'Zero Commission — Always', icon: Percent },
  { label: 'Fast Loan Approval',       icon: Zap },
  { label: '10,000+ Satisfied Clients', icon: Users },
  { label: 'Transparent Process',      icon: Eye },
  { label: 'Dedicated Support',        icon: Headphones },
  { label: 'No Hidden Fees',           icon: Coins },
  { label: 'Trusted in Gurgaon',       icon: MapPin },
  { label: '24-Hour Approval',         icon: Clock },
  { label: 'Expert Loan Managers',     icon: Briefcase },
]

const cardStyles = [
  { bg: 'linear-gradient(135deg, #06b6d4 0%, #0155AD 50%, #4f46e5 100%)', shadow: 'rgba(14, 165, 233, 0.35)' },
  { bg: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)', shadow: 'rgba(168, 85, 247, 0.35)' },
  { bg: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)', shadow: 'rgba(6, 182, 212, 0.35)' },
  { bg: 'linear-gradient(135deg, #f43f5e 0%, #d946ef 50%, #8b5cf6 100%)', shadow: 'rgba(217, 70, 239, 0.35)' },
]

const doubled = [...items, ...items, ...items, ...items]

export default function Ticker() {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth / 4

    tweenRef.current = gsap.fromTo(track,
      { x: 0 },
      { x: -totalWidth, duration: 40, ease: 'none', repeat: -1 }
    )

    gsap.fromTo(track.querySelectorAll('.tk-card'),
      { opacity: 0, scale: 0, rotateY: 90 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, stagger: 0.05, ease: 'back.out(1.5)' }
    )

    track.querySelectorAll('.tk-card').forEach((card, i) => {
      gsap.to(card, {
        y: i % 2 === 0 ? 14 : -14,
        rotate: i % 2 === 0 ? 2 : -2,
        duration: 3 + (i % 3) * 0.5,
        repeat: -1, yoyo: true,
        ease: 'sine.inOut', delay: i * 0.1,
      })

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        gsap.to(card, { rotateX: -y * 22, rotateY: x * 22, scale: 1.12, z: 50, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, z: 0, duration: 1, ease: 'elastic.out(1.2, 0.4)', overwrite: 'auto' })
        gsap.to(card, { y: i % 2 === 0 ? 14 : -14, rotate: i % 2 === 0 ? 2 : -2, duration: 3 + (i % 3) * 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0, overwrite: false })
      })
    })

    return () => { tweenRef.current?.kill(); gsap.killTweensOf('.tk-card') }
  }, [])

  const onEnter = () => gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.8, ease: 'power2.out' })
  const onLeave = () => gsap.to(tweenRef.current, { timeScale: 1,    duration: 0.8, ease: 'power2.in'  })

  return (
    <div className="relative pt-6 pb-12 md:pt-8 md:pb-24 overflow-hidden"
      style={{ perspective: '1200px', backgroundColor: '#f8f9ff' }}
      onMouseEnter={onEnter} onMouseLeave={onLeave}>

      <div className="absolute inset-y-0 left-0 w-16 md:w-56 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #f8f9ff 15%, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-16 md:w-56 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #f8f9ff 15%, transparent)' }} />

      <div ref={trackRef} className="flex items-center gap-6 md:gap-12 w-max px-4 md:px-6" style={{ transformStyle: 'preserve-3d' }}>
        {doubled.map((item, i) => {
          const style = cardStyles[i % cardStyles.length]
          const IconComponent = item.icon
          return (
            <div key={i} className="tk-card relative flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 rounded-[12px] md:rounded-xl cursor-pointer group hover:z-20 overflow-hidden"
              style={{
                background: style.bg,
                border: '1px solid rgba(255,255,255,0.4)',
                transformStyle: 'preserve-3d',
                boxShadow: `0 15px 35px ${style.shadow}, inset 0 2px 6px rgba(255,255,255,0.5), inset 0 -2px 6px rgba(0,0,0,0.1)`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 25px 55px ${style.shadow}, inset 0 2px 6px rgba(255,255,255,0.6)`}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 15px 35px ${style.shadow}, inset 0 2px 6px rgba(255,255,255,0.5), inset 0 -2px 6px rgba(0,0,0,0.1)`}>

              <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.25), transparent)' }} />

              <div className="relative z-10 flex items-center gap-2 md:gap-3" style={{ transform: 'translateZ(30px)' }}>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border border-white/40 group-hover:bg-white/35 group-hover:rotate-[360deg] transition-all duration-700 ease-out"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(5px)', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}>
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-md" strokeWidth={2.2} />
                </div>
                <span className="font-display text-[12px] md:text-[14px] font-black tracking-wider uppercase whitespace-nowrap text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.85)] transition-all duration-300">
                  {item.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
