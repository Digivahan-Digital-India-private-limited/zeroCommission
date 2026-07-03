import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IndianRupee, FileText, Scale, UserCheck, Rocket, ShieldCheck } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: IndianRupee, title: 'Broker Fee',        desc: 'Pay hefty brokerage on every loan',  others: { status: 'bad',     text: 'Yes'     }, us: 'No'              },
  { icon: FileText,    title: 'Paperless Process', desc: 'Digital and paperless experience',    others: { status: 'partial', text: 'Partial' }, us: 'Complete'        },
  { icon: Scale,       title: 'Loan Comparison',   desc: 'Compare from multiple lenders',       others: { status: 'partial', text: 'Limited' }, us: 'Multiple Lenders'},
  { icon: UserCheck,   title: 'Expert Support',    desc: 'Guidance from loan experts',          others: { status: 'partial', text: 'Limited' }, us: 'Dedicated'       },
  { icon: Rocket,      title: 'Approval Speed',    desc: 'Faster loan approvals',               others: { status: 'bad',     text: 'Slow'    }, us: 'Fast'            },
]

/* ── small icon‑badge for the "Others" column ─────────────────────────── */
function OthersBadge({ status, text }) {
  const isBad = status === 'bad'
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-start', gap:8, width: '90px' }}>
      <span style={{
        width:24, height:24, borderRadius:'50%', flexShrink:0,
        background: isBad ? '#ef4444' : '#f59e0b',
        display:'inline-flex', alignItems:'center', justifyContent:'center',
      }}>
        {isBad ? (
          /* ✕ */
          <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
            <path d="M2 2L9 9M9 2L2 9" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          /* — */
          <svg width="10" height="2" viewBox="0 0 11 3" fill="none">
            <rect y="0.5" width="11" height="2" rx="1" fill="white"/>
          </svg>
        )}
      </span>
      <span style={{ color:'#374151', fontWeight:600, fontSize:15 }}>{text}</span>
    </div>
  )
}

/* ── green check for the "Zero Commission" column ─────────────────────── */
function GreenCheck({ label }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-start', gap:14, width: '100%' }}>
      <span style={{
        width:28, height:28, borderRadius:'50%', flexShrink:0,
        background:'#22c55e',
        display:'inline-flex', alignItems:'center', justifyContent:'center',
      }}>
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
          <path d="M1.5 5L5 8.5L11.5 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span style={{ color:'#fff', fontWeight:700, fontSize:17 }}>{label}</span>
    </div>
  )
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header  = sectionRef.current?.querySelector('.wcu-header')
      const table   = sectionRef.current?.querySelector('.wcu-table')
      const banner  = sectionRef.current?.querySelector('.wcu-banner')

      if (header) gsap.fromTo(header,  { y:50, opacity:0 }, { y:0, opacity:1, duration:1,   ease:'power4.out', scrollTrigger:{ trigger:header, start:'top 88%' } })
      if (table)  gsap.fromTo(table,   { y:60, opacity:0 }, { y:0, opacity:1, duration:0.9, ease:'power4.out', scrollTrigger:{ trigger:table,  start:'top 85%' } })
      if (banner) gsap.fromTo(banner,  { y:30, opacity:0 }, { y:0, opacity:1, duration:0.8, ease:'power4.out', scrollTrigger:{ trigger:banner, start:'top 92%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ─── row height shared between the two panels ──────────── */
  const ROW_H = 82   // px  — adjust if you want taller/shorter rows

  return (
    <section ref={sectionRef} style={{
      background:'linear-gradient(180deg,#eef2ff 0%,#f5f7ff 100%)',
      padding:'48px 40px', position:'relative', overflow:'hidden',
    }}>

      {/* subtle dot-grid overlay */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', opacity:0.025,
        backgroundImage:'radial-gradient(#1a237e 1px,transparent 1px)',
        backgroundSize:'30px 30px',
      }} />

      <div style={{ maxWidth:1440, margin:'0 auto', position:'relative' }}>

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="wcu-header" style={{ textAlign:'center', marginBottom:48 }}>

          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            background:'#e8edf8', border:'1px solid #c5cae9', borderRadius:999,
            padding:'7px 20px', fontSize:11, fontWeight:700,
            letterSpacing:'0.18em', textTransform:'uppercase', color:'#1a237e', marginBottom:18,
          }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#1a237e', display:'inline-block' }} />
            WHY CHOOSE US
          </div>

          <h2 style={{ fontSize:'clamp(1.85rem,3vw,2.8rem)', fontWeight:900, color:'#1a237e', margin:'0 0 14px', lineHeight:1.2 }}>
            Why Choose{' '}
            <span style={{ background:'linear-gradient(90deg,#0176C7,#0155AD)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Zero Commission?
            </span>
          </h2>

          <p style={{ color:'#6b7280', fontSize:17, lineHeight:1.7, margin:0 }}>
            We make borrowing simple, transparent, and affordable. Here's how<br/>
            we stand out from the traditional loan process.
          </p>
        </div>

        {/* ── COMPARISON TABLE ────────────────────────────────────────────── */}
        {/*
            Layout: [white card with feature+others cols] + [blue card for ZC col]
            The blue card is a separate rounded box so it looks exactly like the screenshot.
        */}
        <div className="wcu-table overflow-x-auto pb-6 w-full custom-scrollbar">
          <div style={{ display:'flex', gap:0, alignItems:'stretch', minWidth: '800px', padding: '0 8px' }}>

          {/* ── LEFT PANEL (white card) ─────────────────────────────── */}
          <div style={{
            flex:1, background:'#fff',
            borderRadius:'24px',
            border:'1px solid #e8edf5',
            boxShadow:'0 10px 40px rgba(26,35,126,0.06)',
            overflow:'hidden',
            margin: '24px 0',
            position: 'relative',
            zIndex: 1
          }}>

            {/* column headers */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 0.65fr', borderBottom:'1px solid #f0f2fb', height: 60 }}>
              <div style={{ display:'flex', alignItems:'center', padding:'0 28px', fontSize:11, fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', color:'#0176C7' }}>
                FEATURE
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', color:'#1a237e', borderLeft:'1px solid #f0f2fb', paddingRight: 24 }}>
                OTHERS
              </div>
            </div>

            {/* feature rows */}
            {features.map(({ icon: Icon, title, desc, others }, i) => (
              <div key={title} style={{
                display:'grid', gridTemplateColumns:'1fr 0.65fr',
                borderTop: i === 0 ? 'none' : '1px solid #f4f6fc',
                height: ROW_H,
              }}>
                {/* feature cell */}
                <div style={{ display:'flex', alignItems:'center', gap:16, padding:'0 28px' }}>
                  <div style={{
                    width:44, height:44, borderRadius:12, flexShrink:0,
                    background:'linear-gradient(135deg,#e8f0fe,#dbeafe)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <Icon size={20} color="#0176C7" />
                  </div>
                  <div>
                    <div style={{ fontWeight:800, color:'#1a237e', fontSize:15, marginBottom:2 }}>{title}</div>
                    <div style={{ color:'#6b7280', fontSize:14 }}>{desc}</div>
                  </div>
                </div>

                {/* others cell */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', borderLeft:'1px solid #f4f6fc', paddingRight: 24 }}>
                  <OthersBadge {...others} />
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT PANEL (blue "Zero Commission" card) ──────────── */}
          <div style={{
            width: 340,
            background:'linear-gradient(160deg,#1e3fa8 0%,#0d2478 100%)',
            borderRadius:'24px',
            boxShadow:'-12px 10px 40px rgba(13,36,120,0.3)',
            display:'flex', flexDirection:'column',
            position: 'relative',
            zIndex: 2,
            marginLeft: '-24px',
            paddingTop: '24px',
            paddingBottom: '24px',
          }}>

            {/* column header */}
            <div style={{
              height:60,
              display:'flex', alignItems:'center', justifyContent:'center',
              borderBottom:'1px solid rgba(255,255,255,0.1)',
            }}>
              <span style={{ fontSize:18, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'#fff' }}>
                ZERO COMMISSION
              </span>
            </div>

            {/* value rows */}
            <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
              {features.map(({ us }, i) => (
                <div key={i} style={{
                  height: ROW_H,
                  display:'flex', alignItems:'center', justifyContent:'flex-start',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  paddingLeft: 60,
                }}>
                  <GreenCheck label={us} />
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* ── BOTTOM BANNER ────────────────────────────────────────────────── */}
        <div className="wcu-banner flex flex-col lg:flex-row items-center justify-between gap-6 bg-white rounded-2xl p-5 md:p-7 border border-[#e8edf8]" style={{
          marginTop: 20,
          boxShadow: '0 4px 24px rgba(26,35,126,0.06)',
        }}>
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div style={{
              width:46, height:46, borderRadius:12, flexShrink:0,
              background:'linear-gradient(135deg,#dbeafe,#e0f2fe)',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <ShieldCheck size={22} color="#0176C7" />
            </div>
            <p className="text-[#374151] text-sm md:text-[15px] leading-relaxed m-0">
              <strong style={{ color:'#1a237e' }}>100% Transparent</strong>
              <span className="hidden md:inline"> {' • '} </span>
              <span className="md:hidden"><br/></span>
              <strong style={{ color:'#1a237e' }}>No Hidden Charges</strong>
              <span className="hidden md:inline"> {' • '} </span>
              <span className="md:hidden"><br/></span>
              <strong style={{ color:'#1a237e' }}>Best Loan Offers</strong>
              <br className="md:hidden"/>
              <span className="hidden md:inline">{'  '}</span>
              <span style={{ color:'#9ca3af', fontWeight:400 }}>We work for you, not the lenders.</span>
            </p>
          </div>

          <Link to="/services" className="w-full lg:w-auto text-center" style={{
            background:'linear-gradient(135deg,#1e3fa8,#0d2478)',
            color:'#fff', fontSize:13, fontWeight:800, letterSpacing:'0.05em',
            padding:'14px 28px', borderRadius:14, whiteSpace:'nowrap',
            boxShadow:'0 4px 12px rgba(13,36,120,0.2)', transition:'all 0.3s'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 10px 28px rgba(26,35,126,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)';    e.currentTarget.style.boxShadow='0 6px 20px rgba(26,35,126,0.25)' }}
          >
            Get Started Now <span style={{ fontSize:17 }}>›</span>
          </Link>
        </div>

      </div>
    </section>
  )
}