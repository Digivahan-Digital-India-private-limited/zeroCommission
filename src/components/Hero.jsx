import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { useModal } from './ModalContext'
import bgImageMobile from '../assets/image (24).png'

import img1 from '../assets/image (23).png'
import img2 from '../assets/image (26).png'
import img3 from '../assets/image (27).png'
import img4 from '../assets/image (28).png'
import img5 from '../assets/image (29).png'
import img6 from '../assets/image (30).png'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────
//  SLIDE DATA  – add heading / subtitle / etc.
//  for each image here when user provides text
// ─────────────────────────────────────────────
const SLIDES = [
  {
    image: img1,
    bgType: 'right',           // original right-side positioned image
    badge: "India's Trusted Loan Marketplace",
    headingLines: [
      { text: 'Why Pay Brokerage?', color: '#0c1a3a' },
      { text: 'Earn Commission', color: '#0176C7' },
      { text: 'Instead.', color: '#0176C7' },
    ],
    subtitle: 'Compare offers from 50+ banks & NBFCs. Get the best interest rates, complete paperless processing, and earn commission on eligible loans.',
    showSocialProof: true,
  },
  {
    image: img2,
    bgType: 'right-margin',
    badge: "India's Trusted Loan Marketplace",
    headingLines: [
      { text: 'Paise Ki Tension Chhodo,', color: '#0c1a3a' },
      { text: 'Apne Business', color: '#0176C7' },
      { text: 'Ko Aage Badhao.', color: '#0176C7' },
    ],
    subtitle: 'Zero Commission Business Loan ke saath, aapke sapno ko milta hai sahi sahara.',
    showSocialProof: false,
  },
  {
    image: img3,
    bgType: 'right-margin',
    badge: "India's Trusted Loan Marketplace",
    headingLines: [
      { text: 'Sapne Dekho.', color: '#0c1a3a' },
      { text: 'Duniya Ghumo.', color: '#0c1a3a' },
      { text: 'Zero Commission', color: '#0176C7' },
      { text: 'Ke Saath!', color: '#0176C7' },
    ],
    subtitle: 'World tour ka sapna ho ya koi bhi personal need – Personal Loan ke saath kijiye apne plans ko reality.',
    showSocialProof: false,
  },
  {
    image: img4,
    bgType: 'right-margin',
    badge: "India's Trusted Loan Marketplace",
    headingLines: [
      { text: 'Apply Your Loan.', color: '#0c1a3a' },
      { text: 'Earn Your', color: '#0176C7' },
      { text: 'Commission.', color: '#0176C7' },
    ],
    subtitle: 'At Zero Commission, you get 100% of your loan amount and earn your commission – because your money belongs to you.',
    showSocialProof: false,
  },
  {
    image: img5,
    bgType: 'right-shifted',
    badge: "India's Trusted Loan Marketplace",
    headingLines: [
      { text: 'Your Loan.', color: '#0c1a3a' },
      { text: 'Your Money.', color: '#0c1a3a' },
      { text: 'Zero Commission.', color: '#0176C7' },
    ],
    subtitle: 'We give you 100% of your loan amount without any commission.',
    showSocialProof: false,
  },
  {
    image: img6,
    bgType: 'right-margin',
    badge: "India's Trusted Loan Marketplace",
    headingLines: [
      { text: 'Why Pay Brokerage?', color: '#0c1a3a' },
      { text: 'Earn Commission', color: '#0176C7' },
      { text: 'Instead.', color: '#0176C7' },
    ],
    subtitle: 'Compare offers from 50+ banks & NBFCs. Get the best interest rates, complete paperless processing, and earn commission on eligible loans.',
    showSocialProof: false,
  },
]

const HOLD_MS = 3000
const FADE_MS = 3500

// Apply inline styles based on bgType
function applyLayerStyle(el, bgType) {
  if (!el) return

  // Clear any previously set styles first to avoid conflicts
  el.style.cssText = ''

  if (bgType === 'cover') {
    // Make it a full background cover
    el.style.position = 'absolute'
    el.style.top = '60px'
    el.style.left = '0'
    el.style.right = '0'
    el.style.bottom = '60px'
    el.style.width = '100%'
    el.style.height = 'calc(100% - 120px)'
    el.style.objectFit = 'contain'
    el.style.objectPosition = 'center top'
    el.style.zIndex = '1'
    el.style.pointerEvents = 'none'
    el.style.mixBlendMode = 'multiply'
    el.style.backgroundColor = 'transparent'
  } else if (bgType === 'right' || bgType === 'right-margin' || bgType === 'right-shifted') {
    // 'right' / 'right-margin' / 'right-shifted' – desktop style
    el.style.position = 'absolute'
    el.style.inset = ''
    el.style.top = '50%'
    el.style.marginTop = bgType === 'right-margin' ? '60px' : '0px'

    // Shift the 5 images towards the right to reduce right margin
    if (bgType === 'right-margin' || bgType === 'right-shifted') {
      el.style.left = '67%'
    } else {
      el.style.left = '62%' // original for image 23
    }

    el.style.transform = 'translate(-50%, -50%)'
    el.style.width = '74%'
    el.style.height = 'auto'
    el.style.objectFit = 'contain'
    el.style.objectPosition = ''
    el.style.maxWidth = '980px'
    el.style.minWidth = '450px'
    el.style.filter = 'drop-shadow(0 30px 60px rgba(1,100,200,0.18))'
    el.style.zIndex = '1'
    el.style.display = 'block'
    el.style.pointerEvents = 'none'
    el.style.backgroundColor = 'transparent'
    el.style.mixBlendMode = 'multiply'
  }
}

export default function Hero() {
  const heroRef = useRef(null)
  const imageRef = useRef(null)
  const textWrapRef = useRef(null)
  const indexRef = useRef(0)
  const timerRef = useRef(null)
  const timelineRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { openModal } = useModal()

  // ── Entry animations ──
  useEffect(() => {
    const h = heroRef.current
    if (!h) return
    gsap.set(h.querySelectorAll('.al'), { opacity: 0, x: -45 })
    const tl = gsap.timeline({ delay: 0.15 })
    tl.to(h.querySelectorAll('.al'), { opacity: 1, x: 0, duration: 0.75, stagger: 0.11, ease: 'power3.out' }, 0.2)
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  // ── Sequential slideshow (fade out completely over 5s, then fade in next) ──
  useEffect(() => {
    const imgEl = imageRef.current
    if (!imgEl) return

    // Init the first image
    imgEl.src = SLIDES[0].image
    applyLayerStyle(imgEl, SLIDES[0].bgType)
    gsap.set(imgEl, { opacity: 1 })

    const advance = () => {
      const nextIndex = (indexRef.current + 1) % SLIDES.length
      const nextSlide = SLIDES[nextIndex]

      // Kill any active timeline animations to prevent overlaps or speed-ups
      if (timelineRef.current) {
        timelineRef.current.kill()
      }

      const tl = gsap.timeline({
        onComplete: () => {
          indexRef.current = nextIndex
          // Hold the new slide for HOLD_MS before advancing again
          timerRef.current = setTimeout(advance, HOLD_MS)
        }
      })
      timelineRef.current = tl

      // 1. Fade out current image and text together (3.0s)
      tl.to(imgEl, {
        opacity: 0,
        duration: 3.0,
        ease: 'power2.inOut'
      }, 0)

      tl.to(textWrapRef.current, {
        opacity: 0,
        duration: 3.0,
        ease: 'power2.inOut'
      }, 0)

      // 2. Change image src and update text state when fade-out is complete
      tl.call(() => {
        imgEl.src = nextSlide.image
        applyLayerStyle(imgEl, nextSlide.bgType)
        imgEl.style.opacity = '0' // Restore opacity to 0 since applyLayerStyle clears cssText
        setCurrentSlide(nextIndex)
      })

      // 3. Fade in new image and new text together (3.0s) slowly without overlapping
      tl.to(imgEl, {
        opacity: 1,
        duration: 3.0,
        ease: 'power2.inOut'
      })

      tl.to(textWrapRef.current, {
        opacity: 1,
        duration: 3.0,
        ease: 'power2.inOut'
      }, '<') // Starts at the same time as the image fade-in
    }

    // Trigger the first transition after HOLD_MS
    timerRef.current = setTimeout(advance, HOLD_MS)

    return () => {
      clearTimeout(timerRef.current)
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  const slide = SLIDES[currentSlide]

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ddeefa 0%, #eaf4fd 30%, #f0f7fe 55%, #e4f0fb 80%, #d8ebf7 100%)',
      }}
    >

      {/* ── BG IMAGE ── */}
      <img ref={imageRef} alt="" aria-hidden="true" />

      {/* ── MOBILE BACKGROUND IMAGE ── */}
      <img
        src={bgImageMobile}
        alt=""
        aria-hidden="true"
        className="hero-bg-mobile"
      />

      {/* Left glow overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'radial-gradient(ellipse 55% 80% at 18% 50%, rgba(232,243,255,0.92) 0%, rgba(232,243,255,0.60) 40%, transparent 70%)',
      }} />

      {/* Right glow overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'radial-gradient(ellipse 35% 70% at 98% 50%, rgba(224,240,255,0.75) 0%, transparent 65%)',
      }} />

      {/* ══════════════════════
          MAIN CONTENT
      ══════════════════════ */}
      <div
        className="hero-content-grid"
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '1440px',
          margin: '0 auto',
          padding: '100px 40px 140px',
        }}
      >
        {/* ── LEFT: Text & CTAs (fades per slide) ── */}
        <div ref={textWrapRef} className="hero-left-col" style={{ maxWidth: '560px' }}>

          {/* Badge */}
          {slide.badge && (
            <div className="al hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              marginBottom: '22px', padding: '8px 18px',
              borderRadius: '50px',
              background: 'rgba(1,118,199,0.10)',
              border: '1.5px solid rgba(1,118,199,0.30)',
            }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                <path d="M12 3l8 4v5c0 5-4 8-8 9-4-1-8-4-8-9V7l8-4z" fill="#0176C7" />
              </svg>
              <span style={{ color: '#0155AD', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {slide.badge}
              </span>
            </div>
          )}

          {/* Heading */}
          {slide.headingLines.length > 0 && (
            <div className="al hero-heading-text" style={{ marginBottom: '18px' }}>
              <h1 style={{ fontFamily: "'Inter','Segoe UI',sans-serif", fontWeight: 900, lineHeight: 1.06, margin: 0 }}>
                {slide.headingLines.map((line, i) => (
                  <span key={i} style={{ display: 'block', fontSize: 'clamp(1.8rem, 6vw, 3.2rem)', color: line.color, marginTop: i > 0 ? '3px' : 0 }}>
                    {line.text}
                  </span>
                ))}
              </h1>
            </div>
          )}

          {/* Subtitle */}
          {slide.subtitle && (
            <p className="al" style={{
              color: '#4f5d7a', fontSize: '0.95rem', lineHeight: 1.80,
              marginBottom: '28px', maxWidth: '400px',
            }}>
              {slide.subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="al hero-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '28px' }}>
            <button
              onClick={openModal}
              className="hero-btn-primary"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'linear-gradient(135deg,#0176C7,#0155AD)',
                color: '#fff', fontWeight: 700,
                padding: '13px 30px', borderRadius: '12px',
                fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(1,118,199,0.40)',
                transition: 'transform 0.2s,box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(1,118,199,0.52)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(1,118,199,0.40)' }}
            >
              Apply Now
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <Link
              to="/services"
              className="hero-btn-outline"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.90)', backdropFilter: 'blur(8px)',
                color: '#0c1a3a', fontWeight: 600,
                padding: '13px 28px', borderRadius: '12px',
                fontSize: '0.9rem',
                border: '1.8px solid rgba(1,118,199,0.35)',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                transition: 'background 0.2s,border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = '#0176C7' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.90)'; e.currentTarget.style.borderColor = 'rgba(1,118,199,0.35)' }}
            >
              Explore Loans
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Social Proof – only on slide 1 */}
          {slide.showSocialProof && (
            <div className="al hero-social-row" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="hero-avatars" style={{ display: 'flex', alignItems: 'center' }}>
                {[
                  'https://i.pravatar.cc/40?img=12',
                  'https://i.pravatar.cc/40?img=25',
                  'https://i.pravatar.cc/40?img=47',
                ].map((src, i) => (
                  <img
                    key={i} src={src} alt={`Customer ${i + 1}`}
                    className="hero-avatar-img"
                    style={{
                      width: '46px', height: '46px', borderRadius: '50%',
                      border: '3px solid #fff', objectFit: 'cover',
                      marginLeft: i === 0 ? 0 : '-14px',
                      zIndex: 3 - i, position: 'relative', flexShrink: 0,
                    }}
                  />
                ))}
                <div className="hero-avatar-k" style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  border: '3px solid #fff', background: '#0176C7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '11px', fontWeight: 700,
                  marginLeft: '-14px', zIndex: 0, position: 'relative', flexShrink: 0,
                }}>10K+</div>
              </div>
              <div style={{ marginTop: '4px' }}>
                <div style={{ color: '#0176C7', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.3 }}>
                  <span>9,000</span>
                  <span style={{ position: 'relative', top: '-0.45em', fontSize: '0.65em', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 700, marginLeft: '2px' }}>+</span>
                  <span> Happy Customers</span>
                </div>
                <div style={{ color: '#6b7a99', fontSize: '0.85rem' }}>Trusted by customers across India</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── ALL STYLES ── */}
      <style>{`
        /* Mobile image: hidden by default on desktop */
        .hero-bg-mobile {
          display: none;
          position: absolute;
          pointer-events: none;
        }

        /* ── MOBILE (<=900px) ── */
        @media (max-width: 900px) {
          .hero-content-grid {
            padding: 25px 20px 30px !important;
            min-height: 100vh;
          }
          .hero-left-col {
            width: 45% !important;
            max-width: none !important;
            position: relative;
            z-index: 5;
          }

          .hero-bg-mobile {
            display: block !important;
            width: 130%;
            min-width: 20px;
            top: 50%;
            left: auto;
            right: -8%;
            transform: translateY(-50%);
            opacity: 1;
            z-index: 1;
          }

          .hero-badge { margin-bottom: 14px !important; padding: 6px 12px !important; }
          .hero-badge span { font-size: 8px !important; }
          .hero-heading-text { margin-bottom: 12px !important; }

          .hero-btns {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
            margin-bottom: 22px !important;
          }
          .hero-btn-primary,
          .hero-btn-outline {
            width: 210px !important;
            justify-content: center !important;
            padding: 12px 16px !important;
            font-size: 0.88rem !important;
          }
          .hero-social-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }
          .hero-avatar-img,
          .hero-avatar-k {
            width: 38px !important; height: 38px !important;
            border-width: 2px !important; font-size: 9px !important;
          }
          .hero-avatar-k { margin-left: -10px !important; }
          .hero-avatar-img:not(:first-child) { margin-left: -10px !important; }
        }

        @media (max-width: 480px) {
          .hero-content-grid { padding: 25px 16px 30px !important; min-height: 100vh; }
          .hero-left-col { width: 55% !important; }
          .hero-bg-mobile {
            display: block !important;
            width: 95%;
            min-width: 320px;
            top: 35%;
            right: -15%;
            transform: translateY(-50%) scale(1.18);
            opacity: 1;
            z-index: 1;
          }
        }

        /* ── Wave animations ── */
        @keyframes wave-move-left {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        @keyframes wave-move-right {
          0%   { transform: translate3d(-50%,0,0); }
          100% { transform: translate3d(0,0,0); }
        }
        .wave-layer {
          width: 200%; height: 100%;
          position: absolute; bottom: 0; left: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .animate-wave-slow { animation: wave-move-left  24s linear infinite; }
        .animate-wave-mid  { animation: wave-move-right 17s linear infinite; }
        .animate-wave-fast { animation: wave-move-left  11s linear infinite; }
      `}</style>

      {/* ── BOTTOM WAVES ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '100px', overflow: 'hidden',
        pointerEvents: 'none', zIndex: 10,
      }}>
        <svg className="wave-layer animate-wave-slow" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none">
          <path d="M 0,50 C 360,20 360,80 720,50 C 1080,20 1080,80 1440,50 C 1800,20 1800,80 2160,50 C 2520,20 2520,80 2880,50 L 2880,100 L 0,100 Z" fill="rgba(1,151,224,0.15)" />
        </svg>
        <svg className="wave-layer animate-wave-mid" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none">
          <path d="M 0,60 C 360,80 360,40 720,60 C 1080,80 1080,40 1440,60 C 1800,80 1800,40 2160,60 C 2520,80 2520,40 2880,60 L 2880,100 L 0,100 Z" fill="rgba(1,85,173,0.20)" />
        </svg>
        <svg className="wave-layer animate-wave-fast" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none">
          <path d="M 0,70 C 360,55 360,85 720,70 C 1080,55 1080,85 1440,70 C 1800,55 1800,85 2160,70 C 2520,55 2520,85 2880,70 L 2880,100 L 0,100 Z" fill="#ffffff" />
        </svg>
      </div>

    </section>
  )
}
