import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Menu, X, ChevronRight, Upload, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import logoFull from '../assets/main logo.png'
import logoIcon from '../assets/logo-icon.png'
import ExpertModal from './ExpertModal'

const NavLink = ({ href, children, onClick }) => {
  const { pathname } = useLocation()
  const isHash = href.startsWith('#') || href.startsWith('/#')

  // Active: exact match for '/', startsWith for others
  const isActive = !isHash && (href === '/' ? pathname === '/' : pathname.startsWith(href))

  if (isHash) {
    return (
      <a href={href} onClick={onClick}
        className="relative font-semibold transition-colors duration-200 group text-[15px]"
        style={{ color: '#0f1857' }}>
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0197E0] group-hover:w-full transition-all duration-300 rounded-full" />
      </a>
    )
  }
  return (
    <Link to={href} onClick={onClick}
      className="relative font-semibold transition-colors duration-200 group text-[15px]"
      style={{ color: isActive ? '#0176C7' : '#0f1857cc' }}>
      {children}
      {/* Active underline — always visible when active */}
      <span
        className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300"
        style={{
          width: isActive ? '100%' : '0%',
          background: 'linear-gradient(90deg, #0176C7, #0197E0)',
        }}
      />
      {/* Hover underline — shown on hover when NOT active */}
      {!isActive && (
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0197E0] group-hover:w-full transition-all duration-300 rounded-full" />
      )}
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const mounted = useRef(false)
  const location = useLocation()

  const isContactPage = location.pathname === '/contact'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Navbar entrance animation
  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.7 }
    )
  }, [])

  // Mobile menu open/close GSAP animations
  useEffect(() => {
    const menu = mobileMenuRef.current
    if (!menu) return
    if (menuOpen) {
      menu.style.display = 'block'
      gsap.fromTo(menu,
        { opacity: 0, y: -15, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
      )
      const items = menu.querySelectorAll('a')
      gsap.fromTo(items, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' })
    } else {
      gsap.to(menu, {
        opacity: 0, y: -10, scale: 0.96, duration: 0.2, ease: 'power2.in',
        onComplete: () => { if (menu) menu.style.display = 'none' }
      })
    }
  }, [menuOpen])

  // Removed links array as we are hardcoding the links to accommodate the dropdown

  return (
    <>
      <nav ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'bg-transparent py-5'}`}
        style={{
          opacity: 0,
          background: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : 'none',
          backdropFilter: scrolled ? 'blur(20px)' : 'none'
        }}>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center hover:scale-105 transition-transform duration-300">
              {/* Full transparent logo */}
              <img
                src={logoFull}
                alt="Zero Commission Logo"
                className="w-auto object-contain h-8 md:h-[46px]"
              />
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex items-center justify-between"></div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 z-50">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/services">Services</NavLink>

            {/* Tools Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 font-semibold transition-colors duration-200 text-[15px] py-2"
                style={{ color: '#0f1857cc' }}>
                Tools <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="flex flex-col py-2">
                  <Link to="/eligibility-calculator" className="block px-4 py-2.5 text-sm font-semibold text-[#0f1857]/80 hover:bg-[#f0f6ff] hover:text-[#0176C7] transition-colors">
                    Eligibility Calculator
                  </Link>
                  <Link to="/emi-calculator" className="block px-4 py-2.5 text-sm font-semibold text-[#0f1857]/80 hover:bg-[#f0f6ff] hover:text-[#0176C7] transition-colors">
                    EMI Calculator
                  </Link>
                </div>
              </div>
            </div>

            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* CTA & Hamburger */}
          <div className="flex items-center gap-4">
            {isContactPage ? (
              <Link to="/upload-documents"
                className="hidden md:flex items-center gap-1.5 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #0176C7, #0155AD)', boxShadow: '0 4px 15px rgba(1,118,199,0.3)' }}>
                <Upload size={14} /> Upload Documents
              </Link>
            ) : (
              <button onClick={() => setIsExpertModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #0176C7, #0155AD)', boxShadow: '0 4px 15px rgba(1,118,199,0.3)' }}>
                Connect to Expert <ChevronRight size={14} />
              </button>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[#0f1857] p-2 rounded-xl hover:bg-black/5 transition-colors">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef}
        className="fixed top-[64px] left-4 right-4 z-40 rounded-2xl shadow-xl border border-black/5 p-6 md:hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          display: 'none',
          opacity: 0
        }}>
        <div className="flex flex-col gap-1">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-[#0f1857]/80 hover:text-[#0f1857] hover:bg-black/5 px-4 py-3 rounded-xl font-semibold transition-all duration-250">Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-[#0f1857]/80 hover:text-[#0f1857] hover:bg-black/5 px-4 py-3 rounded-xl font-semibold transition-all duration-250">About Us</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)} className="text-[#0f1857]/80 hover:text-[#0f1857] hover:bg-black/5 px-4 py-3 rounded-xl font-semibold transition-all duration-250">Services</Link>
          
          {/* Tools Expandable in Mobile */}
          <div className="flex flex-col">
            <div className="text-[#0f1857]/50 px-4 pt-4 pb-1 text-xs font-bold uppercase tracking-wider">Tools</div>
            <Link to="/eligibility-calculator" onClick={() => setMenuOpen(false)} className="text-[#0f1857]/80 hover:text-[#0f1857] hover:bg-black/5 px-4 py-3 rounded-xl font-semibold transition-all duration-250 text-[15px]">
              Eligibility Calculator
            </Link>
            <Link to="/emi-calculator" onClick={() => setMenuOpen(false)} className="text-[#0f1857]/80 hover:text-[#0f1857] hover:bg-black/5 px-4 py-3 rounded-xl font-semibold transition-all duration-250 text-[15px]">
              EMI Calculator
            </Link>
          </div>

          <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-[#0f1857]/80 hover:text-[#0f1857] hover:bg-black/5 px-4 py-3 rounded-xl font-semibold transition-all duration-250">Contact</Link>
          {isContactPage ? (
            <Link to="/upload-documents" onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 text-white px-5 py-3 rounded-xl font-semibold"
              style={{ background: 'linear-gradient(135deg, #0176C7, #0155AD)' }}>
              <Upload size={16} /> Upload Documents
            </Link>
          ) : (
            <button onClick={() => { setMenuOpen(false); setIsExpertModalOpen(true); }}
              className="mt-3 flex items-center justify-center gap-2 text-white px-5 py-3 rounded-xl font-semibold"
              style={{ background: 'linear-gradient(135deg, #0176C7, #0155AD)' }}>
              Connect to Expert <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      <ExpertModal isOpen={isExpertModalOpen} onClose={() => setIsExpertModalOpen(false)} />
    </>
  )
}
