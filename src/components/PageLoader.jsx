import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoIcon from '../assets/logo-icon.png'

export default function PageLoader() {
  const loaderRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const loader = loaderRef.current
    const bar = barRef.current
    if (!loader || !bar) return

    // Prevent page scroll during loading
    document.body.style.overflow = 'hidden'

    // Initial setups for GSAP
    gsap.set(loader.querySelectorAll('.loader-orb'), { scale: 0, opacity: 0 })
    gsap.set(loader.querySelector('.loader-card'), { scale: 0.85, opacity: 0 })
    gsap.set(loader.querySelector('.loader-logo-svg'), { rotate: -180 })
    gsap.set(loader.querySelectorAll('.loader-char'), { y: 40, opacity: 0, rotateX: -90 })
    gsap.set(loader.querySelectorAll('.loader-animate-in'), { opacity: 0, y: 15 })

    const tl = gsap.timeline({
      onComplete: () => {
        // Restore scroll and hide loader
        document.body.style.overflow = ''
        loader.style.display = 'none'
        ScrollTrigger.refresh() // Fixes footer and other layout-based scroll triggers
      }
    })

    // 1. Fade/Scale in mesh background orbs
    tl.to(loader.querySelectorAll('.loader-orb'), {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out'
    }, 0.05)

    // 2. Animate the central glass card container
    tl.to(loader.querySelector('.loader-card'), {
      scale: 1,
      opacity: 1,
      duration: 0.45,
      ease: 'back.out(1.3)'
    }, 0.15)

    // 3. Logo diamond entrance
    tl.to(loader.querySelector('.loader-logo-svg'), { rotate: 0, duration: 0.5, ease: 'power2.out' }, 0.4)

    // 4. Stagger letters of brand name
    tl.to(loader.querySelectorAll('.loader-char'), {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.35,
      stagger: 0.015,
      ease: 'back.out(1.5)'
    }, 0.4)

    // 5. Fade in state widgets (percentage, progress wrap)
    tl.to(loader.querySelectorAll('.loader-animate-in'), {
      opacity: 1,
      y: 0,
      duration: 0.25,
      stagger: 0.05,
      ease: 'power2.out'
    }, 0.6)

    // 6. Fill progress bar & increment percentage
    const counter = { val: 0 }
    tl.to(counter, {
      val: 100,
      duration: 0.7,
      ease: 'power2.inOut',
      onUpdate: () => {
        const percentageText = loader.querySelector('.loader-percentage')
        const statusText = loader.querySelector('.loader-status')
        const progress = Math.floor(counter.val)
        
        if (percentageText) {
          percentageText.innerText = `${progress}%`
        }
        
        if (statusText) {
          if (progress < 20) {
            statusText.innerText = 'CONNECTING TO SECURE FINANCIAL CORE...'
          } else if (progress < 40) {
            statusText.innerText = 'LOADING PREMIUM INTERACTIVE MODULES...'
          } else if (progress < 60) {
            statusText.innerText = 'ESTABLISHING ZERO-COMMISSION SCHEMES...'
          } else if (progress < 80) {
            statusText.innerText = 'OPTIMIZING PORTAL INTERFACE LAYOUT...'
          } else if (progress < 98) {
            statusText.innerText = 'SECURE CLIENT TUNNEL ESTABLISHED...'
          } else {
            statusText.innerText = 'WELCOME TO ZERO COMMISSION!'
          }
        }
      }
    }, 0.4)

    tl.fromTo(bar, { width: '0%' }, { width: '100%', duration: 0.7, ease: 'power2.inOut' }, 0.4)

    // 7. Glass Card and elements exit
    tl.to(loader.querySelector('.loader-card'), {
      scale: 0.95,
      opacity: 0,
      duration: 0.2,
      ease: 'power3.in'
    }, '+=0.1')

    tl.to(loader.querySelectorAll('.loader-orb'), {
      opacity: 0,
      scale: 0.8,
      duration: 0.2,
      ease: 'power3.in'
    }, '<')

    // 8. Wipe container up
    tl.to(loader, {
      yPercent: -100,
      duration: 0.3,
      ease: 'power4.inOut'
    }, '-=0.08')

    // Ambient floating/drifting motion for orbs
    const orb1 = loader.querySelector('.loader-orb-1');
    const orb2 = loader.querySelector('.loader-orb-2');
    const orb3 = loader.querySelector('.loader-orb-3');
    const drift1 = orb1 ? gsap.to(orb1, { x: 40, y: -30, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' }) : null;
    const drift2 = orb2 ? gsap.to(orb2, { x: -40, y: 40, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' }) : null;
    const drift3 = orb3 ? gsap.to(orb3, { x: 30, y: 30, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' }) : null;

    return () => {
      tl.kill()
      if (drift1) drift1.kill()
      if (drift2) drift2.kill()
      if (drift3) drift3.kill()
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#f8f9ff' }}>

      {/* Mesh gradient orbs (identical to Hero section styles but optimized for loader showcase) */}
      <div className="loader-orb loader-orb-1 absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(1,151,224,0.12) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      <div className="loader-orb loader-orb-2 absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="loader-orb loader-orb-3 absolute top-[30%] right-[25%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Light subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.1) 1px,transparent 1px)', backgroundSize: '70px 70px' }} />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.008] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Glassmorphic Container Card */}
      <div className="loader-card relative z-10 w-full max-w-[450px] px-8 py-12 rounded-[28px] border border-white/60 bg-gradient-to-tr from-white/60 to-white shadow-[0_32px_64px_-12px_rgba(15,24,87,0.1)] flex flex-col items-center text-center"
        style={{ backdropFilter: 'blur(16px)' }}>
        
        {/* Glow Behind Container */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#0176C7] to-[#001139] opacity-20 rounded-[28px] blur-2xl" />

        {/* Animated Logo Icon */}
        <div className="mb-6 flex justify-center">
          <img
            src={logoIcon}
            alt="Zero Commission"
            className="loader-logo-svg w-20 h-20 object-contain"
            style={{ filter: 'drop-shadow(0 4px 16px rgba(1,118,199,0.25))' }}
          />
        </div>

        {/* Split Text Heading */}
        <div className="mb-3" style={{ perspective: '400px' }}>
          <h1 className="text-3xl font-display font-black tracking-tight text-center flex flex-wrap justify-center gap-x-2">
            <span className="flex">
              {"Zero".split("").map((char, index) => (
                <span key={index} className="loader-char inline-block text-navy-800" style={{ transformOrigin: 'top center' }}>
                  {char}
                </span>
              ))}
            </span>
            <span className="flex">
              {"Commission".split("").map((char, index) => (
                <span key={index} className="loader-char inline-block bg-gradient-to-r from-[#0176C7] via-[#0197E0] to-[#0155AD] bg-clip-text text-transparent" style={{ transformOrigin: 'top center' }}>
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Status Text Indicator */}
        <div className="loader-animate-in mb-8">
          <span className="loader-status text-[#8b8fae] text-[10px] font-extrabold tracking-[0.25em] uppercase whitespace-nowrap block min-h-[15px]" />
        </div>

        {/* Numeric Ticker Indicator */}
        <div className="loader-animate-in mb-4">
          <span className="loader-percentage text-navy-800 font-black text-6xl tracking-tight leading-none block">
            0%
          </span>
        </div>

        {/* Modern Progress Line Bar */}
        <div className="loader-animate-in w-full max-w-[280px] mt-2 relative">
          <div className="h-1.5 w-full bg-[#0f1857]/5 rounded-full overflow-hidden p-[1px]">
            <div ref={barRef} className="h-full rounded-full relative"
              style={{ width: 0, background: 'linear-gradient(90deg, #0197E0, #0155AD)' }}>
              {/* Inner glow sweep inside progress bar */}
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
