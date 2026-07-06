import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Values from './components/Values'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Team from './components/Team'
import TeamLeaders from './components/TeamLeaders'
import OurJourney from './components/OurJourney'
import TrustAndProcess from './components/TrustAndProcess'
import PageLoader from './components/PageLoader'
import HowItWorks from './components/HowItWorks'
import WhyChooseUs from './components/WhyChooseUs'
import Partners from './components/Partners'
import RequiredDocuments from './components/RequiredDocuments'
import SecurityCompliance from './components/SecurityCompliance'
import ApplicationPortal from './components/ApplicationPortal'
import PrivacyPolicyPage from './components/PrivacyPolicyPage'
import TermsConditionsPage from './components/TermsConditionsPage'
import EmiCalculatorPage from './components/EmiCalculatorPage'
import EligibilityCalculatorPage from './components/EligibilityCalculatorPage'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import RdCalculatorPage from './components/RdCalculatorPage'
import SipCalculatorPage from './components/SipCalculatorPage'
import FdCalculatorPage from './components/FdCalculatorPage'
import GstCalculatorPage from './components/GstCalculatorPage'
import TotalApplications from './components/TotalApplications'
import ViewApplications from './components/ViewApplications'
import UnviewedApplications from './components/UnviewedApplications'
import PendingApplications from './components/PendingApplications'
import RejectedApplications from './components/RejectedApplications'
import UploadedDocuments from './components/UploadedDocuments'
import PendingDocuments from './components/PendingDocuments'
import ApprovedLoans from './components/ApprovedLoans'
import DisbursedLoans from './components/DisbursedLoans'
import { AdminProvider } from './components/AdminContext'
import { ModalProvider } from './components/ModalContext'
import SuccessModal from './components/SuccessModal'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Percent, Zap, Users, Eye, Headphones, Coins, MapPin, Clock, Briefcase, Upload, FileSearch } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// High-end GSAP-powered marquee ticker
function Ticker() {
  const items = [
    { label: 'Zero Commission — Always', icon: Percent },
    { label: 'Fast Loan Approval', icon: Zap },
    { label: '10,000+ Satisfied Clients', icon: Users },
    { label: 'Transparent Process', icon: Eye },
    { label: 'Dedicated Support', icon: Headphones },
    { label: 'No Hidden Fees', icon: Coins },
    { label: 'Trusted in Gurgaon', icon: MapPin },
    { label: '24-Hour Approval', icon: Clock },
    { label: 'Expert Loan Managers', icon: Briefcase },
  ]

  const doubled = [...items, ...items, ...items, ...items] // Quadrupled for flawless loop
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth / 4

    // Smooth infinite marquee
    tweenRef.current = gsap.fromTo(track,
      { x: 0 },
      { x: -totalWidth, duration: 40, ease: 'none', repeat: -1 }
    )

    // Entry animation for cards
    gsap.fromTo(track.querySelectorAll('.tk-card'),
      { opacity: 0, scale: 0, rotateY: 90 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, stagger: 0.05, ease: 'back.out(1.5)' }
    )

    // High-level modern GSAP motion (Float + Magnetic Hover)
    track.querySelectorAll('.tk-card').forEach((card, i) => {

      // 1. Sleek Floating & Rocking Animation
      gsap.to(card, {
        y: i % 2 === 0 ? 14 : -14,
        rotate: i % 2 === 0 ? 2 : -2,
        duration: 3 + (i % 3) * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1
      })

      // 2. Advanced 3D Magnetic Hover
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotateX: -y * 22, // Strong 3D tilt
          rotateY: x * 22,
          scale: 1.12,
          z: 50,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      card.addEventListener('mouseleave', () => {
        // Snap back with elastic bounce
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          z: 0,
          duration: 1,
          ease: 'elastic.out(1.2, 0.4)',
          overwrite: 'auto'
        });

        // Resume float smoothly
        gsap.to(card, {
          y: i % 2 === 0 ? 14 : -14,
          rotate: i % 2 === 0 ? 2 : -2,
          duration: 3 + (i % 3) * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0,
          overwrite: false
        });
      });
    })

    return () => { tweenRef.current?.kill(); gsap.killTweensOf('.tk-card') }
  }, [])

  // Slow down on hover for readability
  const onEnter = () => gsap.to(tweenRef.current, { timeScale: 0.15, duration: 0.8, ease: 'power2.out' })
  const onLeave = () => gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.in' })

  // Bright, attractive gradients (3-4 colors mesh style, avoiding orange/dark colors)
  const cardStyles = [
    { bg: 'linear-gradient(135deg, #06b6d4 0%, #0155AD 50%, #4f46e5 100%)', shadow: 'rgba(14, 165, 233, 0.35)' }, // Teal to Blue to Indigo
    { bg: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)', shadow: 'rgba(168, 85, 247, 0.35)' }, // Pink to Purple to Indigo
    { bg: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)', shadow: 'rgba(6, 182, 212, 0.35)' },  // Emerald to Cyan to Blue
    { bg: 'linear-gradient(135deg, #f43f5e 0%, #d946ef 50%, #8b5cf6 100%)', shadow: 'rgba(217, 70, 239, 0.35)' }  // Rose to Magenta to Violet
  ]

  return (
    <div className="relative pt-6 pb-12 md:pt-8 md:pb-24 overflow-hidden"
      style={{ perspective: '1200px', backgroundColor: '#f8f9ff' }}
      onMouseEnter={onEnter} onMouseLeave={onLeave}>

      {/* Fade edges matching the body background */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-56 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #f8f9ff 15%, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-16 md:w-56 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #f8f9ff 15%, transparent)' }} />

      <div ref={trackRef} className="flex items-center gap-6 md:gap-12 w-max px-4 md:px-6" style={{ transformStyle: 'preserve-3d' }}>
        {doubled.map((item, i) => {
          const style = cardStyles[i % cardStyles.length];
          const IconComponent = item.icon;
          return (
            <div key={i} className="tk-card relative flex items-center gap-2 md:gap-3 px-4 py-3 md:px-6 md:py-4 rounded-[12px] md:rounded-xl cursor-pointer group hover:z-20 overflow-hidden"
              style={{
                background: style.bg,
                border: '1px solid rgba(255,255,255,0.4)',
                transformStyle: 'preserve-3d',
                boxShadow: `0 15px 35px ${style.shadow}, inset 0 2px 6px rgba(255,255,255,0.5), inset 0 -2px 6px rgba(0,0,0,0.1)`
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 25px 55px ${style.shadow}, inset 0 2px 6px rgba(255,255,255,0.6)`}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 15px 35px ${style.shadow}, inset 0 2px 6px rgba(255,255,255,0.5), inset 0 -2px 6px rgba(0,0,0,0.1)`}>

              {/* Glass shine overlay */}
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

import EmiCalculator from './components/EmiCalculator'
import { Routes, Route, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Temporarily disable smooth scrolling to instantly jump to top
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      // Restore smooth scrolling for anchor links
      document.documentElement.style.scrollBehavior = '';
      ScrollTrigger.refresh();
    }, 50);
  }, [pathname]);

  return null;
}


function Home() {
  return (
    <>
      <Hero />
      <EmiCalculator />
      <Ticker />
      <Team />
      <Partners />
      <WhyChooseUs />
      <RequiredDocuments />
      <HowItWorks />
      <SecurityCompliance />
      <Values />
      <Testimonials />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/page/admin')

  return (
    <ModalProvider>
      <div className="min-h-screen font-body">
        <ScrollToTop />
        <PageLoader />
        {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<><About /><OurJourney /><TrustAndProcess /><TeamLeaders /></>} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/upload-documents" element={<ApplicationPortal />} />
          <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
          <Route path="/eligibility-calculator" element={<EligibilityCalculatorPage />} />
          <Route path="/rd-calculator" element={<RdCalculatorPage />} />
          <Route path="/sip-calculator" element={<SipCalculatorPage />} />
          <Route path="/fd-calculator" element={<FdCalculatorPage />} />
          <Route path="/gst-calculator" element={<GstCalculatorPage />} />
          <Route path="/page/admin/*" element={
            <AdminProvider>
              <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="total-applications" element={<TotalApplications />} />
                <Route path="view-applications" element={<ViewApplications />} />
                <Route path="unviewed-applications" element={<UnviewedApplications />} />
                <Route path="pending-applications" element={<PendingApplications />} />
                <Route path="rejected-applications" element={<RejectedApplications />} />
                <Route path="uploaded-documents" element={<UploadedDocuments />} />
                <Route path="pending-documents" element={<PendingDocuments />} />
                <Route path="approved-loans" element={<ApprovedLoans />} />
                <Route path="disbursed-loans" element={<DisbursedLoans />} />
              </Routes>
            </AdminProvider>
          } />
        </Routes>
        {!isAdminRoute && <Footer />}
      </div>
    </ModalProvider>
  )
}
