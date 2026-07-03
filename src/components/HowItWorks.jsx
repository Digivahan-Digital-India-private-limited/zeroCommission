import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FileText, Upload, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useModal } from './ModalContext'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Fill the Application',
    desc: 'Complete our simple online form in just 5 minutes',
    icon: FileText
  },
  {
    num: '02',
    title: 'Upload Documents',
    desc: 'Submit your required documents securely online',
    icon: Upload
  },
  {
    num: '03',
    title: 'Get Loan Approval',
    desc: 'Receive instant approval and funds in your account',
    icon: CheckCircle2
  }
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const { openModal } = useModal()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.hiw-header')
      const cards = sectionRef.current?.querySelectorAll('.hiw-card')
      const arrows = sectionRef.current?.querySelectorAll('.hiw-arrow')

      // Header Animation
      if (header) {
        gsap.fromTo(header, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: header, start: 'top 85%' } }
        )
      }

      // Cards 3D Entry and Hover Animation
      if (cards?.length) {
        gsap.fromTo(cards, 
          { y: 80, opacity: 0, rotateX: 30, scale: 0.9 }, 
          { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.2)', scrollTrigger: { trigger: cards[0], start: 'top 80%' } }
        )

        cards.forEach((card) => {
          // Magnetic Hover Effect
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            gsap.to(card, {
              rotateX: -y * 20,
              rotateY: x * 20,
              scale: 1.05,
              duration: 0.4,
              ease: 'power3.out',
              overwrite: 'auto'
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.8,
              ease: 'elastic.out(1.2, 0.4)',
              overwrite: 'auto'
            });
          });
        })
      }

      // Arrows Animation
      if (arrows?.length) {
        gsap.fromTo(arrows, 
          { opacity: 0, x: -20 }, 
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.2, delay: 0.6, ease: 'power2.out', scrollTrigger: { trigger: cards[0], start: 'top 80%' } }
        )
        
        // Continuous float for arrows
        gsap.to(arrows, {
          x: 10,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      }

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #eef0ff 100%)' }}>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none" 
        style={{ background: 'radial-gradient(circle, #b2dfdb, transparent)', filter: 'blur(80px)', transform: 'translate(30%,-30%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none" 
        style={{ background: 'radial-gradient(circle, #e0f2fe, transparent)', filter: 'blur(70px)', transform: 'translate(-30%,30%)' }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="hiw-header text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0155AD] text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full mb-5 border border-blue-100">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> How It Works
          </div>
          <h2 className="font-display font-bold text-[#1a237e] leading-tight mt-2" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)' }}>
            Get your loan in <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">3 simple steps</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 lg:gap-10 perspective-[1000px]">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-6 md:gap-4 lg:gap-10">
              
              {/* Card */}
              <div className="hiw-card w-full max-w-[340px] rounded-3xl p-8 relative bg-white"
                style={{ 
                  border: '1px solid rgba(26,35,126,0.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                  cursor: 'default'
                }}>
                
                <div className="text-gray-200 font-display font-black text-4xl mb-6">
                  {step.num}
                </div>
                
                <div className="flex justify-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0176C7] to-[#0155AD] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon size={28} className="text-white" />
                  </div>
                </div>

                <h3 className="text-[#1a237e] font-display font-bold text-xl text-center mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-center text-[17px] leading-relaxed">
                  {step.desc}
                </p>
                
                {idx === 0 && (
                  <div className="mt-6 text-center">
                    <button onClick={() => openModal()} className="inline-flex items-center gap-2 mt-4 text-xs font-bold tracking-wide uppercase hover:text-[#0f1857] transition-colors group/btn">
                      Click to start <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>

              {/* Arrow separator (don't show after last card) */}
              {idx < steps.length - 1 && (
                <div className="hiw-arrow hidden md:flex text-[#0197E0]">
                  <ArrowRight size={28} />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
