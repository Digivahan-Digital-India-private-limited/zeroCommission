import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import mohitPhoto from '../assets/mohit.webp'
import dineshPhoto from '../assets/dinesh.webp'
import mamtaPhoto from '../assets/mamta.webp'
import rekhaPhoto from '../assets/rekha.webp'
import rahulPhoto from '../assets/rahul.webp'
import sachinPhoto from '../assets/sachin.webp'
import rehanPhoto from '../assets/rehan.webp'
import pinkuPhoto from '../assets/pinku.webp'

gsap.registerPlugin(ScrollTrigger)

const team = [
  {
    name: 'Rehan',
    title: 'Financial Advisory',
    exp: '8+ Years Exp.',
    desc: 'Leads the advisory team with a strategic vision, ensuring every client gets the most optimized and reliable financial solutions.',
    accent: '#0197E0',
    titleColor: '#1a237e',
    gradientBg: 'linear-gradient(145deg, #cffafe 0%, #e0f2fe 100%)',
    photo: rehanPhoto,
  },
  {
    name: 'Sachin Rathor',
    title: 'Financial Advisor',
    exp: '3+ Years Exp.',
    desc: 'Dedicated to providing expert guidance and helping customers secure the best financial solutions tailored to their needs.',
    accent: '#0197E0',
    titleColor: '#0176C7',
    gradientBg: 'linear-gradient(145deg, #cffafe 0%, #e0f2fe 100%)',
    photo: sachinPhoto,
  },
  {
    name: 'Rekha Verma',
    title: 'Financial Advisor',
    exp: '8+ Years Exp.',
    desc: 'Expert in assessing credit needs and finding the best loan solutions tailored to customer requirements.',
    accent: '#0197E0',
    titleColor: '#0176C7',
    gradientBg: 'linear-gradient(145deg, #cffafe 0%, #e0f2fe 100%)',
    photo: rekhaPhoto,
  },
  {
    name: 'Mamta Mehra',
    title: 'Financial Advisor',
    exp: '8+ Years Exp.',
    desc: 'Focused on delivering seamless loan experiences and providing solutions tailored to every customer\'s needs.',
    accent: '#0197E0',
    titleColor: '#0176C7',
    gradientBg: 'linear-gradient(145deg, #cffafe 0%, #e0f2fe 100%)',
    photo: mamtaPhoto,
  },
  {
    name: 'Mohit Tiwari',
    title: 'Financial Advisor',
    exp: '3+ Years Exp.',
    desc: 'Specializes in creating smart financial strategies and helping customers achieve their goals with the right loan solutions.',
    accent: '#0176C7',
    titleColor: '#1a237e',
    gradientBg: 'linear-gradient(145deg, #dbeafe 0%, #eff6ff 100%)',
    photo: mohitPhoto,
  },
  {
    name: 'Dinesh Raghav',
    title: 'Financial Advisor',
    exp: '3+ Years Exp.',
    desc: 'Helps customers choose the right financial products with lower interest rates and maximum benefits.',
    accent: '#0176C7',
    titleColor: '#1a237e',
    gradientBg: 'linear-gradient(145deg, #dbeafe 0%, #eff6ff 100%)',
    photo: dineshPhoto,
  },
  {
    name: 'Rahul Chauhan',
    title: 'Financial Advisor',
    exp: '2+ Years Exp.',
    desc: 'Builds strong partnerships with banks and NBFCs to bring the best offers and solutions for our customers.',
    accent: '#0176C7',
    titleColor: '#1a237e',
    gradientBg: 'linear-gradient(145deg, #dbeafe 0%, #eff6ff 100%)',
    photo: rahulPhoto,
  },

  {
    name: 'Pinku Sharma',
    title: 'Technical Support Specialist',
    exp: '2+ Years Exp.',
    desc: 'Committed to delivering expert technical support, troubleshooting complex issues, and ensuring smooth system performance with timely and customer-focused solutions.',
    accent: '#0197E0',
    titleColor: '#0176C7',
    gradientBg: 'linear-gradient(145deg, #cffafe 0%, #e0f2fe 100%)',
    photo: pinkuPhoto,
  },
]

const ShieldIcon = ({ color = '#0176C7' }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const Avatar = ({ name, gradientBg }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2)
  return (
    <div className="w-full h-full flex items-end justify-center" style={{ background: gradientBg }}>
      <div style={{
        width: 110, height: 110,
        borderRadius: '50% 50% 0 0 / 60% 60% 0 0',
        background: 'linear-gradient(180deg, #bfdbfe 0%, #93c5fd 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36, fontWeight: 800, color: '#1a237e', letterSpacing: 2,
        marginBottom: 0,
      }}>
        {initials}
      </div>
    </div>
  )
}

export default function TeamLeaders() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tm-header',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.tm-header', start: 'top 88%' } }
      )
      const cards = sectionRef.current?.querySelectorAll('.tm-card')
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 60, scale: 0.92 })
        gsap.to(cards, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          delay: 0.2,
        })

        cards.forEach(card => {
          card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect()
            gsap.to(card, {
              rotateX: -((e.clientY - r.top) / r.height - 0.5) * 8,
              rotateY: ((e.clientX - r.left) / r.width - 0.5) * 8,
              scale: 1.04, duration: 0.3, ease: 'power2.out',
            })
          })
          card.addEventListener('mouseleave', () =>
            gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'power2.out' })
          )
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f0f4fa 0%, #ffffff 100%)' }}>

      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #1a237e 1.5px, transparent 1.5px)', backgroundSize: '44px 44px' }} />

      <div className="absolute top-0 right-0 w-[420px] h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(1,151,224,0.08), transparent)', filter: 'blur(80px)', transform: 'translate(20%,-20%)' }} />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,35,126,0.07), transparent)', filter: 'blur(70px)', transform: 'translate(-20%,20%)' }} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">

        <div className="tm-header text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: '#e8eaf6', border: '1px solid #c5cae9' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a237e" strokeWidth="2.2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#1a237e' }}>Our Team Leaders</span>
          </div>

          <h2 className="font-display font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#1a237e' }}>
            Expert Guidance.{' '}
            <span className="bg-gradient-to-r from-[#0176C7] to-[#0197E0] bg-clip-text text-transparent">
              Real Solutions.
            </span>
          </h2>

          <p className="text-gray-500 text-[16px] max-w-lg mx-auto leading-relaxed">
            Our experienced advisors provide free financial advice and personalized
            solutions to solve your financial problems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          style={{ perspective: '1200px' }}>
          {team.map((member) => (
            <div
              key={member.name}
              className="tm-card group flex flex-col rounded-2xl overflow-hidden cursor-default"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(26,35,126,0.08)',
                boxShadow: '0 6px 28px rgba(0,0,0,0.07)',
                transformStyle: 'preserve-3d',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 50px ${member.accent}28` }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,0,0,0.07)' }}
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/3.4' }}>

                {member.photo
                  ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-top" />
                  : <Avatar name={member.name} gradientBg={member.gradientBg} />
                }

                <div style={{
                  position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                  background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(1,118,199,0.18)',
                  borderRadius: 999, padding: '3px 12px',
                  fontSize: 11, fontWeight: 700, color: '#0176C7',
                  whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(1,118,199,0.15)',
                }}>
                  {member.exp}
                </div>

                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(1,118,199,0.18)',
                }}>
                  <ShieldIcon color={member.accent} />
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="h-0.5 rounded-full mb-3 group-hover:w-full transition-all duration-500"
                  style={{ width: '2rem', background: `linear-gradient(90deg, ${member.accent}, #0155AD)` }} />

                <h3 className="font-display font-bold text-[15px] mb-0.5 group-hover:translate-x-1 transition-transform duration-300"
                  style={{ color: member.titleColor }}>
                  {member.name}
                </h3>

                <div className="text-[12px] font-semibold mb-2.5 group-hover:translate-x-1 transition-transform duration-300 delay-75"
                  style={{ color: member.accent }}>
                  {member.title}
                </div>

                <p className="text-gray-500 text-[12.5px] leading-relaxed flex-1">
                  {member.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
