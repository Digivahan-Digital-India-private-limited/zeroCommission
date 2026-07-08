import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { useModal } from './ModalContext'
import bgImage from '../assets/image (23).png'
import bgImageMobile from '../assets/image (24).png'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef(null)
  const bgRef = useRef(null)
  const { openModal } = useModal()

  useEffect(() => {
    const h = heroRef.current
    if (!h) return

    gsap.set(h.querySelectorAll('.al'), { opacity: 0, x: -45 })
    gsap.set(h.querySelectorAll('.ar'), { opacity: 0, x: 45 })
    gsap.set(bgRef.current, { opacity: 0 })

    const tl = gsap.timeline({ delay: 0.15 })
    tl.to(bgRef.current, { opacity: 1, duration: 1.1, ease: 'power3.out' }, 0)
    tl.to(h.querySelectorAll('.al'), { opacity: 1, x: 0, duration: 0.75, stagger: 0.11, ease: 'power3.out' }, 0.2)
    tl.to(h.querySelectorAll('.ar'), { opacity: 1, x: 0, duration: 0.75, stagger: 0.11, ease: 'power3.out' }, 0.3)

    return () => { tl.kill(); ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [])

  const features = [
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <rect x="5" y="2" width="11" height="16" rx="2" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <path d="M8 7h5M8 10h5M8 13h3" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: '100% Paperless',
      desc: 'Digital & hassle-free loan process',
      bg: '#eff6ff',
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M3 21V9l9-6 9 6v12" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="9" y="13" width="6" height="8" rx="1" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
        </svg>
      ),
      title: '50+ Bank Partners',
      desc: 'Compare from top banks & NBFCs',
      bg: '#f0fdf4',
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" fill="#fff7ed" stroke="#f97316" strokeWidth="1.5" />
          <text x="12" y="16.5" textAnchor="middle" fontSize="9" fill="#f97316" fontWeight="bold">%</text>
        </svg>
      ),
      title: 'Lowest Interest Rates',
      desc: 'Get the best rates specially for you',
      bg: '#fff7ed',
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Quick Approval',
      desc: 'Approval in 24 hours* in most cases',
      bg: '#fefce8',
    },
    {
      icon: (
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path d="M12 3l8 4v5c0 4.97-3.64 8.22-8 9-4.36-.78-8-4.03-8-9V7l8-4z" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
          <path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Zero Hidden Charges',
      desc: 'Transparent process with no extra fees',
      bg: '#f0fdf4',
    },
  ]

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

      {/* ── DESKTOP BACKGROUND IMAGE (absolute positioned) ── */}
      <img
        ref={bgRef}
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="hero-bg-image hero-bg-desktop"
      />

      {/* ── MOBILE BACKGROUND IMAGE ── */}
      <img
        src={bgImageMobile}
        alt=""
        aria-hidden="true"
        className="hero-bg-image hero-bg-mobile"
      />

      {/* Left glow overlay for text readability */}
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
          MAIN CONTENT GRID
      ══════════════════════ */}
      <div
        className="hero-content-grid"
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: '1440px',
          margin: '0 auto',
          padding: '100px 40px 140px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '32px',
          alignItems: 'flex-start',
        }}
      >

        {/* ── LEFT: Text & CTAs ── */}
        <div className="hero-left-col" style={{ maxWidth: '560px' }}>

          {/* Badge */}
          <div className="al hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '22px',
            padding: '8px 18px',
            borderRadius: '50px',
            background: 'rgba(1,118,199,0.10)',
            border: '1.5px solid rgba(1,118,199,0.30)',
          }}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
              <path d="M12 3l8 4v5c0 5-4 8-8 9-4-1-8-4-8-9V7l8-4z" fill="#0176C7" />
            </svg>
            <span style={{ color: '#0155AD', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              India's Trusted Loan Marketplace
            </span>
          </div>

          {/* Heading */}
          <div className="al hero-heading-text" style={{ marginBottom: '18px' }}>
            <h1 style={{
              fontFamily: "'Inter','Segoe UI',sans-serif",
              fontWeight: 900, lineHeight: 1.06, margin: 0,
            }}>
              <span style={{ display: 'block', fontSize: 'clamp(1.8rem, 6vw, 3.2rem)', color: '#0c1a3a' }}>Why Pay Brokerage?</span>
              <span style={{ display: 'block', fontSize: 'clamp(1.8rem, 6vw, 3.2rem)', color: '#0176C7', marginTop: '3px' }}>Earn Commission</span>
              <span style={{ display: 'block', fontSize: 'clamp(1.8rem, 6vw, 3.2rem)', color: '#0176C7' }}>Instead.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="al" style={{
            color: '#4f5d7a', fontSize: '0.95rem', lineHeight: 1.80,
            marginBottom: '28px', maxWidth: '400px',
          }}>
            Compare offers from 50+ banks &amp; NBFCs. Get the best
            interest rates, complete paperless processing, and
            earn commission on eligible loans.
          </p>

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
                background: 'rgba(255,255,255,0.90)',
                backdropFilter: 'blur(8px)',
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

          {/* Social Proof */}
          <div className="al hero-social-row" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="hero-avatars" style={{ display: 'flex', alignItems: 'center' }}>
              {[
                'https://i.pravatar.cc/40?img=12',
                'https://i.pravatar.cc/40?img=25',
                'https://i.pravatar.cc/40?img=47',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Customer ${i + 1}`}
                  className="hero-avatar-img"
                  style={{
                    width: '46px', height: '46px',
                    borderRadius: '50%',
                    border: '3px solid #fff',
                    objectFit: 'cover',
                    marginLeft: i === 0 ? 0 : '-14px',
                    zIndex: 3 - i,
                    position: 'relative',
                    flexShrink: 0,
                  }}
                />
              ))}
              <div className="hero-avatar-k" style={{
                width: '46px', height: '46px', borderRadius: '50%',
                border: '3px solid #fff', background: '#0176C7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '11px', fontWeight: 700,
                marginLeft: '-14px', zIndex: 0, position: 'relative',
                flexShrink: 0,
              }}>10K+</div>
            </div>
            <div className="hero-social-text" style={{ marginTop: '4px' }}>
              <div className="hero-social-title" style={{ color: '#0176C7', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.3 }}>10,000+ Happy Customers</div>
              <div className="hero-social-desc" style={{ color: '#6b7a99', fontSize: '0.85rem' }}>Trusted by customers across India</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Feature Cards (desktop only, hidden on mobile via CSS) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '270px' }}
          className="hero-cards-col">
          {features.map((f, i) => (
            <div
              key={i}
              className="ar"
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '14px 16px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                border: '1px solid rgba(255,255,255,0.80)',
                transition: 'transform 0.2s,box-shadow 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.11)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)' }}
            >
              <div style={{
                flexShrink: 0, width: '44px', height: '44px',
                borderRadius: '12px', background: f.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {f.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0c1a3a', lineHeight: 1.35 }}>{f.title}</div>
                <div style={{ color: '#8a93a8', fontSize: '0.78rem', lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── ALL STYLES ── */}
      <style>{`
        /* Desktop: absolute positioned background image */
        .hero-bg-image {
          position: absolute;
          top: 50%;
          height: auto;
          object-fit: contain;
          pointer-events: none;
          z-index: 1;
          filter: drop-shadow(0 30px 60px rgba(1,100,200,0.18));
        }

        /* Desktop image */
        .hero-bg-desktop {
          left: 62%;
          transform: translate(-50%, -50%);
          width: 74%;
          max-width: 980px;
          min-width: 450px;
        }

        /* Mobile image: hidden by default on desktop */
        .hero-bg-mobile {
          display: none;
        }

        /* ── TABLET (900-1024px) ── */
        @media (max-width: 1024px) and (min-width: 901px) {
          .hero-bg-image {
            width: 78%;
            top: 100px;
            transform: translateX(-35%);
            opacity: 0.8;
          }
        }

        /* ── MOBILE (<=900px) ── */
        @media (max-width: 900px) {
          /* Single column layout */
          .hero-content-grid {
            grid-template-columns: 1fr !important;
            padding: 25px 20px 30px !important;
            gap: 16px !important;
            align-items: center !important;
            min-height: 100vh;
          }

          /* Constrain left column text width so it fits beside the image */
          .hero-left-col {
            width: 40% !important;
            max-width: none !important;
            position: relative;
            z-index: 5;
          }

          /* Hide desktop image on mobile */
          .hero-bg-desktop {
            display: none !important;
          }

          /* Show mobile image, positioned right side vertically centered */
          .hero-bg-mobile {
            display: block !important;
            width: 1300%;
            min-width: 20px;
            top: 50%;
            left: auto;
            right: -8%;
            transform: translateY(-50%);
            opacity: 1;
            z-index: 1;
          }

          /* Hide right feature cards column */
          .hero-cards-col {
            display: none !important;
          }

          /* Badge styling adjust */
          .hero-badge {
            margin-bottom: 14px !important;
            padding: 6px 12px !important;
          }
          .hero-badge span {
            font-size: 8px !important;
          }

          .hero-heading-text {
            margin-bottom: 12px !important;
          }

          /* Full-width buttons stacked */
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

          /* Social proof: avatars on top, text below (match photo) */
          .hero-social-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }
          .hero-avatar-img,
          .hero-avatar-k {
            width: 38px !important;
            height: 38px !important;
            border-width: 2px !important;
            font-size: 9px !important;
          }
          .hero-avatar-k {
            margin-left: -10px !important;
          }
          .hero-avatar-img:not(:first-child) {
            margin-left: -10px !important;
          }
          .hero-social-title {
            font-size: 0.9rem !important;
            font-weight: 700 !important;
            line-height: 1.2 !important;
          }
          .hero-social-desc {
            font-size: 0.72rem !important;
            color: #6b7a99 !important;
          }
        }

        @media (max-width: 480px) {
          .hero-content-grid {
            padding: 25px 16px 30px !important;
            min-height: 100vh;
          }
          .hero-left-col {
            width: 50% !important;
          }
          .hero-bg-mobile {
            width: 65%;
            min-width: 200px;
            top: 50%;
            right: -8%;
            transform: translateY(-50%);
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
