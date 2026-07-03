import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Home, User, Briefcase, ShieldCheck, ArrowRight, Clock, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useModal } from './ModalContext'

gsap.registerPlugin(ScrollTrigger)

function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = [], raf
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    
    // Generate soft, subtle particles for a light background
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.25 + 0.05
      })
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        // OLD: ctx.fillStyle = `rgba(0, 180, 140, ${p.alpha})` // Emerald teal tint
        ctx.fillStyle = `rgba(1, 151, 224, ${p.alpha})` // Accent Blue tint
        ctx.fill()
        
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      
      // Connect nearby particles with thin, light lines
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
          if (d < 130) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            // OLD: ctx.strokeStyle = `rgba(0, 180, 140, ${0.04 * (1 - d / 130)})`
            ctx.strokeStyle = `rgba(1, 151, 224, ${0.04 * (1 - d / 130)})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
}

const headline = 'Earn Commission'

export default function Hero() {
  const heroRef = useRef(null)
  const rightWrapperRef = useRef(null)
  const { openModal } = useModal()

  const [currentSlide, setCurrentSlide] = useState(0)
  const heroImages = [
    "/loan_types.webp",
    "/hero1.webp",
    "/hero2.webp",
    "/hero3.webp",
    "/hero4.webp",
    "/hero5.webp"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const h = heroRef.current
    if (!h) return

    // Set initial states via GSAP
    gsap.set(h.querySelectorAll('.will-animate'), { opacity: 0 })
    gsap.set(h.querySelectorAll('.hero-char'), { opacity: 0, y: 70, rotateX: -60 })
    gsap.set(h.querySelectorAll('.hero-orb'), { scale: 0, opacity: 0 })
    gsap.set(h.querySelector('.hero-right-visual'), { opacity: 0, x: 120, rotateY: 15, scale: 0.9 })
    gsap.set(h.querySelector('.hero-badge'), { opacity: 0, y: -25, scale: 0.85 })
    gsap.set(h.querySelector('.hero-line2'), { opacity: 0, y: 50, skewY: 3 })
    gsap.set(h.querySelector('.hero-line3'), { opacity: 0, y: 50, skewY: 3 })
    gsap.set(h.querySelector('.hero-sub'), { opacity: 0, y: 25 })
    gsap.set(h.querySelectorAll('.hero-loan-card'), { opacity: 0, y: 30, scale: 0.95 })
    gsap.set(h.querySelectorAll('.hero-cta'), { opacity: 0, y: 20, scale: 0.92 })
    gsap.set(h.querySelector('.hero-scroll'), { opacity: 0 })
    gsap.set(h.querySelectorAll('.floating-tag'), { scale: 0, opacity: 0, y: 20 })

    const tl = gsap.timeline({ delay: 0.8 })

    // 1. Orbs reveal
    tl.to(h.querySelectorAll('.hero-orb'), { scale: 1, opacity: 1, duration: 1.5, stagger: 0.3, ease: 'power3.out' }, 0)

    // 2. Trust badge
    tl.to(h.querySelector('.hero-badge'), { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, 0.2)

    // 3. Characters flip in
    tl.to(h.querySelectorAll('.hero-char'), {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: 'back.out(1.5)'
    }, 0.2)

    // 4. Headline lines
    tl.to(h.querySelector('.hero-line2'), { y: 0, opacity: 1, skewY: 0, duration: 0.6, ease: 'power3.out' }, 0.5)
    tl.to(h.querySelector('.hero-line3'), { y: 0, opacity: 1, skewY: 0, duration: 0.6, ease: 'power3.out' }, 0.6)

    // 5. Subtitle
    tl.to(h.querySelector('.hero-sub'), { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.7)

    // 6. Interactive Loan Category Cards (Staggered)
    tl.to(h.querySelectorAll('.hero-loan-card'), { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, 1.2)

    // 7. CTA Buttons
    tl.to(h.querySelectorAll('.hero-cta'), { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)' }, 0.9)

    // 8. Right 3D Visual & Floating Tags
    tl.to(h.querySelector('.hero-right-visual'), { x: 0, opacity: 1, rotateY: 0, scale: 1, duration: 1.0, ease: 'power3.out' }, 0.5)
    tl.to(h.querySelectorAll('.floating-tag'), { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.6)' }, 0.8)

    // 9. Scroll hint
    tl.to(h.querySelector('.hero-scroll'), { opacity: 1, duration: 0.5 }, 1.5)

    // Infinite Float Drifts
    tl.add(() => {
      if (rightWrapperRef.current) {
        gsap.to(rightWrapperRef.current, { y: -15, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      }
      
      // Floating sub-tags drift at slightly different speeds
      const tags = h.querySelectorAll('.floating-tag')
      if (tags[0]) gsap.to(tags[0], { y: -8, x: 5, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      if (tags[1]) gsap.to(tags[1], { y: 8, x: -5, duration: 4.0, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.5 })

      gsap.to(h.querySelector('.hero-scroll'), { y: 10, duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      
      // Ambient gradient blobs
      gsap.to(h.querySelectorAll('.hero-orb')[0], { x: 40, y: -30, duration: 15, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to(h.querySelectorAll('.hero-orb')[1], { x: -30, y: 40, duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 })
    })

    // 10. Interactive 3D mouse parallax
    const onMouseMove = (e) => {
      const { clientX, clientY } = e
      const width = window.innerWidth
      const height = window.innerHeight
      const x = (clientX / width - 0.5) * 2 // -1 to 1
      const y = (clientY / height - 0.5) * 2 // -1 to 1

      // Subtle backdrop orb shift
      gsap.to(h.querySelectorAll('.hero-orb'), {
        x: (i) => (i + 1) * -x * 25,
        y: (i) => (i + 1) * -y * 25,
        duration: 1.2,
        ease: 'power2.out'
      })

      // 3D tilt interaction for primary image mockup
      const visual = h.querySelector('.hero-right-visual')
      if (visual) {
        gsap.to(visual, {
          rotateY: x * 12,
          rotateX: -y * 12,
          duration: 0.5,
          ease: 'power2.out'
        })
      }

      // Parallax for floating tags
      const tags = h.querySelectorAll('.floating-tag')
      if (tags[0]) gsap.to(tags[0], { x: x * 15, y: y * 10, duration: 0.8, ease: 'power2.out' })
      if (tags[1]) gsap.to(tags[1], { x: -x * 12, y: -y * 15, duration: 0.8, ease: 'power2.out' })

      gsap.to(h.querySelector('.hero-badge'), { x: x * 5, y: y * 3, duration: 0.8, ease: 'power2.out' })
      gsap.to(h.querySelector('.hero-sub'), { x: -x * 6, y: -y * 3, duration: 1.0, ease: 'power2.out' })
    }

    h.addEventListener('mousemove', onMouseMove)

    // Parallax on scroll
    ScrollTrigger.create({
      trigger: h,
      start: 'top top',
      end: 'bottom top',
      onUpdate: self => {
        gsap.set(h.querySelectorAll('.hero-orb')[0], { y: self.progress * 100 })
        gsap.set(h.querySelectorAll('.hero-orb')[1], { y: self.progress * 60 })
      }
    })

    return () => {
      tl.kill()
      h.removeEventListener('mousemove', onMouseMove)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen overflow-hidden flex flex-col justify-center py-20 lg:py-24"
      style={{ backgroundColor: '#f8f9ff' }}>

      <ParticleCanvas />

      {/* Mesh gradients orbs for backdrop */}
      {/* OLD:
      <div className="hero-orb absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(1,151,224,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="hero-orb absolute -bottom-60 -right-20 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)', filter: 'blur(90px)' }} />
      <div className="hero-orb absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.04) 0%, transparent 70%)', filter: 'blur(70px)' }} />
      */}
      <div className="hero-orb absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(1,85,173,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="hero-orb absolute -bottom-60 -right-20 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(1,118,199,0.15) 0%, transparent 70%)', filter: 'blur(90px)' }} />
      <div className="hero-orb absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(1,151,224,0.15) 0%, transparent 70%)', filter: 'blur(70px)' }} />

      {/* Light subtle grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.1) 1px,transparent 1px)', backgroundSize: '70px 70px' }} />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.008] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Grid Layout */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">

          {/* LEFT: Text Copy & Interactive Loan Grid */}
          <div className="lg:col-span-6 flex flex-col justify-center pr-4">

            {/* Badge */}
            {/* OLD style={{ background: 'rgba(1,151,224,0.08)', border: '1px solid rgba(1,151,224,0.22)', borderRadius: 50 }} */}
            <div className="hero-badge will-animate inline-flex items-center self-start gap-2 mb-6 px-4 py-2"
              style={{ background: 'rgba(1,151,224,0.15)', border: '1px solid rgba(1,151,224,0.4)', borderRadius: 50 }}>
              <span className="relative flex h-2 w-2">
                {/* OLD: bg-blue-500 */}
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#0197E0' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#0197E0' }} />
              </span>
              {/* OLD: text-[#0155AD] */}
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase flex items-center gap-1.5" style={{ color: '#0197E0' }}>
                <Sparkles size={11} color="#0197E0" />FINANCIAL PROVIDER
              </span>
            </div>

            {/* Headings */}
            <div className="mb-6" style={{ perspective: '600px' }}>
              <div className="overflow-hidden mb-1">
                <div className="flex flex-wrap font-display font-black leading-[1.05]"
                  style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', color: '#0f1857' }}>
                  {headline.split(' ').map((word, wi) => (
                    <span key={wi} className="inline-block mr-[0.25em] whitespace-nowrap">
                      {word.split('').map((c, i) => (
                        <span key={i} className="hero-char inline-block" style={{ transformOrigin: 'top center' }}>
                          {c}
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden mb-2">
                <div className="hero-line2 will-animate font-display font-black leading-[1.05]"
                  style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', color: '#0f1857' }}>
                  with
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="hero-line3 will-animate font-display font-black leading-[1.05]"
                  style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', color: '#0f1857' }}>
                  {/* OLD: <span className="bg-gradient-to-r from-[#0176C7] via-[#0197E0] to-[#0155AD] bg-clip-text text-transparent"> */}
                  <span className="bg-gradient-to-r from-[#0176C7] via-[#0197E0] to-[#0155AD] bg-clip-text text-transparent">
                    Zero Commission.
                  </span>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="hero-sub will-animate text-[0.95rem] md:text-[1.05rem] leading-[1.75] mb-8 max-w-[560px]" style={{ color: '#5b6189' }}>
              Your loan. Your commission. Apply through Zero Commission and receive the commission back on eligible loans. Compare offers from leading banks and NBFCs with complete transparency and zero hidden charges.
            </p>


            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* OLD style={{ background: 'linear-gradient(135deg, #0197E0, #029476)', boxShadow: '0 8px 24px rgba(1,151,224,0.22)' }} */}
              <Link to="/services" className="hero-cta will-animate group relative flex items-center gap-3 text-white font-bold px-8 py-3.5 rounded-xl text-[0.9rem] overflow-hidden hover:-translate-y-0.5 active:scale-[0.98] transition-transform duration-300"
                style={{ background: 'linear-gradient(135deg, #0176C7, #0155AD)', boxShadow: '0 8px 24px rgba(1,118,199,0.4)' }}>
                <div className="absolute inset-0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                Explore Our Services
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-250" />
              </Link>
              {/* OLD: className="... text-navy-800/70 hover:text-navy-800 ... bg-white/60 hover:bg-white ..." style={{ color: '#0f1857' }} */}
              <a href="#how-it-works" className="hero-cta will-animate flex items-center gap-2 font-semibold px-8 py-3.5 rounded-xl text-[0.9rem] border transition-all duration-300 bg-white/60 hover:bg-white"
                style={{ 
                  color: '#0f1857',
                  borderColor: '#0155AD'
                }}
              >
                How It Works
              </a>
            </div>

          </div>

          {/* RIGHT: Floating 3D Illustration & Overlay Tags */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div ref={rightWrapperRef} className="relative z-10 w-full max-w-[550px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[900px] transition-all duration-500" style={{ perspective: '1200px' }}>
              
              {/* Primary 3D Image Card */}
              <div className="hero-right-visual will-animate relative rounded-[28px] overflow-hidden border border-white/60 shadow-[0_32px_64px_-12px_rgba(15,24,87,0.12)] p-2 bg-gradient-to-tr from-white/60 to-white"
                style={{ transformStyle: 'preserve-3d', backdropFilter: 'blur(8px)' }}>
                
                {/* Glow Behind */}
                {/* OLD: <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#0176C7] to-[#001139] opacity-30 rounded-[28px] blur-2xl" /> */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[#0176C7] to-[#001139] opacity-30 rounded-[28px] blur-2xl" />
                
                <div className="relative rounded-[20px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden w-full aspect-[16/10] bg-white group">
                  {heroImages.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`Funding Solution ${idx + 1}`} 
                      className={`absolute top-0 left-0 w-full h-full transform transition-all duration-1000 ease-in-out ${
                        idx === 0 ? 'object-contain' : 'object-cover'
                      } ${currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} 
                    />
                  ))}
                </div>
              </div>

              {/* Floating Overlay Badge 1 */}
              <div className="floating-tag absolute -top-5 -left-6 bg-white/95 border border-black/5 px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3 backdrop-blur-md"
                style={{ transformStyle: 'preserve-3d', zIndex: 30 }}>
                {/* OLD: <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#0197E0]"> */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#001139', color: '#0197E0' }}>
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h5 className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#0155AD' /* OLD: '#8b8fae' */ }}>Verification</h5>
                  <p className="font-bold text-xs" style={{ color: '#001139' /* OLD: '#0f1857' */ }}>100% Paperless Process</p>
                </div>
              </div>

              {/* Floating Overlay Badge 2 */}
              <div className="floating-tag absolute -bottom-5 -right-6 bg-white/95 border border-black/5 px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3 backdrop-blur-md"
                style={{ transformStyle: 'preserve-3d', zIndex: 30 }}>
                {/* OLD: <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#0176C7] animate-pulse"> */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: '#001139', color: '#0197E0' }}>
                  <Clock size={16} />
                </div>
                <div>
                  <h5 className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#0155AD' /* OLD: '#8b8fae' */ }}>Approval Speed</h5>
                  <p className="font-bold text-xs" style={{ color: '#001139' /* OLD: '#0f1857' */ }}>Disbursed in 24 Hours</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Inline styles for the wave animations */}
      <style>{`
        @keyframes wave-move-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes wave-move-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .wave-layer {
          width: 200%;
          height: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .animate-wave-slow {
          animation: wave-move-left 24s linear infinite;
        }
        .animate-wave-mid {
          animation: wave-move-right 17s linear infinite;
        }
        .animate-wave-fast {
          animation: wave-move-left 11s linear infinite;
        }
      `}</style>

      {/* Animated Bottom Wave Layout */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] overflow-hidden pointer-events-none z-10">
        
        {/* Wave 1: Soft Teal Tint (Back Layer) */}
        <svg className="wave-layer animate-wave-slow" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* OLD: <path d="M 0,50 C 360,20 360,80 720,50 C 1080,20 1080,80 1440,50 C 1800,20 1800,80 2160,50 C 2520,20 2520,80 2880,50 L 2880,100 L 0,100 Z" fill="rgba(1, 151, 224, 0.08)" /> */}
          <path d="M 0,50 C 360,20 360,80 720,50 C 1080,20 1080,80 1440,50 C 1800,20 1800,80 2160,50 C 2520,20 2520,80 2880,50 L 2880,100 L 0,100 Z" fill="rgba(1, 151, 224, 0.15)" />
        </svg>

        {/* Wave 2: Soft Purple/Indigo Tint (Middle Layer) */}
        <svg className="wave-layer animate-wave-mid" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* OLD: <path d="M 0,60 C 360,80 360,40 720,60 C 1080,80 1080,40 1440,60 C 1800,80 1800,40 2160,60 C 2520,80 2520,40 2880,60 L 2880,100 L 0,100 Z" fill="rgba(99, 102, 241, 0.05)" /> */}
          <path d="M 0,60 C 360,80 360,40 720,60 C 1080,80 1080,40 1440,60 C 1800,80 1800,40 2160,60 C 2520,80 2520,40 2880,60 L 2880,100 L 0,100 Z" fill="rgba(1, 85, 173, 0.2)" />
        </svg>

        {/* Wave 3: Solid Light-Blue Front */}
        <svg className="wave-layer animate-wave-fast" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,70 C 360,55 360,85 720,70 C 1080,55 1080,85 1440,70 C 1800,55 1800,85 2160,70 C 2520,55 2520,85 2880,70 L 2880,100 L 0,100 Z" fill="#ffffff" />
        </svg>

      </div>
    </section>
  )
}
