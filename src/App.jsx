import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Percent, Zap, Users, Eye, Headphones, Coins, MapPin, Clock, Briefcase } from 'lucide-react'
import { ModalProvider } from './components/ModalContext'
import { AdminProvider } from './components/AdminContext'

// ─────────────────────────────────────────────────────────────────────────────
//  EAGER (Critical Path) — ye sab pehle hi load honge kyunki yeh har page par hain
// ─────────────────────────────────────────────────────────────────────────────
import Navbar   from './components/Navbar'
const Footer = lazy(() => import('./components/Footer'))
import PageLoader from './components/PageLoader'
import Hero     from './components/Hero'          // Above-the-fold, eager zaroori hai

// ─────────────────────────────────────────────────────────────────────────────
//  LAZY — HOME PAGE sections (scroll karne par load honge)
//  Flipkart pattern: har section ka alag JS chunk, tabhi download hoga jab zarurat ho
// ─────────────────────────────────────────────────────────────────────────────
const EmiCalculator     = lazy(() => import('./components/EmiCalculator'))
const Ticker            = lazy(() => import('./components/Ticker'))          // Moved to own file
const Team              = lazy(() => import('./components/Team'))
const Partners          = lazy(() => import('./components/Partners'))
const WhyChooseUs       = lazy(() => import('./components/WhyChooseUs'))
const RequiredDocuments = lazy(() => import('./components/RequiredDocuments'))
const HowItWorks        = lazy(() => import('./components/HowItWorks'))
const SecurityCompliance = lazy(() => import('./components/SecurityCompliance'))
const Values            = lazy(() => import('./components/Values'))
const Testimonials      = lazy(() => import('./components/Testimonials'))

// ─────────────────────────────────────────────────────────────────────────────
//  LAZY — ROUTE PAGES (sirf tab download honge jab user us route par jaye)
// ─────────────────────────────────────────────────────────────────────────────
const Services              = lazy(() => import('./components/Services'))
const About                 = lazy(() => import('./components/About'))
const OurJourney            = lazy(() => import('./components/OurJourney'))
const TrustAndProcess       = lazy(() => import('./components/TrustAndProcess'))
const TeamLeaders           = lazy(() => import('./components/TeamLeaders'))
const Contact               = lazy(() => import('./components/Contact'))
const PrivacyPolicyPage     = lazy(() => import('./components/PrivacyPolicyPage'))
const TermsConditionsPage   = lazy(() => import('./components/TermsConditionsPage'))
const ApplicationPortal     = lazy(() => import('./components/ApplicationPortal'))
const EmiCalculatorPage     = lazy(() => import('./components/EmiCalculatorPage'))
const EligibilityCalculatorPage = lazy(() => import('./components/EligibilityCalculatorPage'))
const RdCalculatorPage      = lazy(() => import('./components/RdCalculatorPage'))
const SipCalculatorPage     = lazy(() => import('./components/SipCalculatorPage'))
const FdCalculatorPage      = lazy(() => import('./components/FdCalculatorPage'))
const GstCalculatorPage     = lazy(() => import('./components/GstCalculatorPage'))
const BalanceTransferPage   = lazy(() => import('./components/BalanceTransferPage'))

// ─────────────────────────────────────────────────────────────────────────────
//  LAZY — ADMIN PANEL (sirf admin visit kare to download ho)
//  Ye sabse badi saving hai — admin ka sara code pehle download nahi hoga
// ─────────────────────────────────────────────────────────────────────────────
const AdminLogin            = lazy(() => import('./components/AdminLogin'))
const AdminDashboard        = lazy(() => import('./components/AdminDashboard'))
const TotalApplications     = lazy(() => import('./components/TotalApplications'))
const ViewApplications      = lazy(() => import('./components/ViewApplications'))
const UnviewedApplications  = lazy(() => import('./components/UnviewedApplications'))
const PendingApplications   = lazy(() => import('./components/PendingApplications'))
const RejectedApplications  = lazy(() => import('./components/RejectedApplications'))
const UploadedDocuments     = lazy(() => import('./components/UploadedDocuments'))
const PendingDocuments      = lazy(() => import('./components/PendingDocuments'))
const ApprovedLoans         = lazy(() => import('./components/ApprovedLoans'))
const DisbursedLoans        = lazy(() => import('./components/DisbursedLoans'))
const CheckCibil            = lazy(() => import('./components/CheckCibil'))

gsap.registerPlugin(ScrollTrigger)

// ─── Smooth route transition fallback ────────────────────────────────────────
// Jab lazy component load ho raha ho tab ye dikhega (Flipkart jaisa skeleton)
function RouteFallback() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f7fe 0%, #e8f3ff 100%)',
    }}>
      <div style={{ textAlign: 'center' }}>
        {/* Animated skeleton pulse */}
        <div style={{
          width: 48, height: 48,
          borderRadius: '50%',
          border: '3px solid #e2e8f0',
          borderTopColor: '#0176C7',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px',
        }} />
        <p style={{ color: '#0176C7', fontWeight: 600, fontSize: '0.9rem' }}>Loading...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}

// ─── Section Lazy Wrapper — for Home page scroll sections ────────────────────
// Har section tabhi render hoga jab user scroll karke paas aaye
// Ye Flipkart ka exact pattern hai: below-the-fold content lazy hai
function LazySection({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '300px' });
    
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense fallback={
          <div style={{ height: 200, background: 'linear-gradient(90deg, #f0f4f8 25%, #e8eef4 50%, #f0f4f8 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 16, margin: '8px 0' }}>
            <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
          </div>
        }>
          {children}
        </Suspense>
      ) : (
        <div style={{ height: 200, margin: '8px 0' }} />
      )}
    </div>
  )
}

// ─── ScrollToTop ──────────────────────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = ''
      ScrollTrigger.refresh()
    }, 50)
  }, [pathname])
  return null
}

// ─── Home Page — sections lazy load as user scrolls ──────────────────────────
function Home() {
  return (
    <>
      {/* Hero is EAGER — above the fold, user turant dekhe */}
      <Hero />

      {/* Baaki sab LAZY — scroll karne par load honge */}
      <LazySection><EmiCalculator /></LazySection>
      <LazySection><Ticker /></LazySection>
      <LazySection><Team /></LazySection>
      <LazySection><Partners /></LazySection>
      <LazySection><WhyChooseUs /></LazySection>
      <LazySection><RequiredDocuments /></LazySection>
      <LazySection><HowItWorks /></LazySection>
      <LazySection><SecurityCompliance /></LazySection>
      <LazySection><Values /></LazySection>
      <LazySection><Testimonials /></LazySection>
    </>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/page/admin')

  return (
    <ModalProvider>
      <div className="min-h-screen font-body">
        <ScrollToTop />
        <PageLoader />
        {!isAdminRoute && <Navbar />}

        {/* Suspense wraps all lazy routes — shows RouteFallback during chunk download */}
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Public Routes — sirf jab navigate karo tab download */}
            <Route path="/about" element={
              <>
                <About />
                <LazySection><OurJourney /></LazySection>
                <LazySection><TrustAndProcess /></LazySection>
                <LazySection><TeamLeaders /></LazySection>
              </>
            } />
            <Route path="/services"               element={<Services />} />
            <Route path="/contact"                element={<Contact />} />
            <Route path="/privacy-policy"         element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions"       element={<TermsConditionsPage />} />
            <Route path="/upload-documents"       element={<ApplicationPortal />} />
            <Route path="/emi-calculator"         element={<EmiCalculatorPage />} />
            <Route path="/eligibility-calculator" element={<EligibilityCalculatorPage />} />
            <Route path="/rd-calculator"          element={<RdCalculatorPage />} />
            <Route path="/sip-calculator"         element={<SipCalculatorPage />} />
            <Route path="/fd-calculator"          element={<FdCalculatorPage />} />
            <Route path="/gst-calculator"         element={<GstCalculatorPage />} />
            <Route path="/balance-transfer"       element={<BalanceTransferPage />} />

            {/* Admin — poora admin panel ek alag chunk mein, sirf admin ko download hoga */}
            <Route path="/page/admin/*" element={
              <AdminProvider>
                <Routes>
                  <Route path="/"                      element={<AdminLogin />} />
                  <Route path="dashboard"              element={<AdminDashboard />} />
                  <Route path="total-applications"     element={<TotalApplications />} />
                  <Route path="view-applications"      element={<ViewApplications />} />
                  <Route path="unviewed-applications"  element={<UnviewedApplications />} />
                  <Route path="pending-applications"   element={<PendingApplications />} />
                  <Route path="rejected-applications"  element={<RejectedApplications />} />
                  <Route path="uploaded-documents"     element={<UploadedDocuments />} />
                  <Route path="pending-documents"      element={<PendingDocuments />} />
                  <Route path="approved-loans"         element={<ApprovedLoans />} />
                  <Route path="disbursed-loans"        element={<DisbursedLoans />} />
                  <Route path="check-cibil"            element={<CheckCibil />} />
                </Routes>
              </AdminProvider>
            } />
          </Routes>
        </Suspense>

        {!isAdminRoute && (
          <LazySection>
            <Footer />
          </LazySection>
        )}
      </div>
    </ModalProvider>
  )
}
