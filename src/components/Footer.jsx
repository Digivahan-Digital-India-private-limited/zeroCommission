import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone, IndianRupee, Shield, Clock, Handshake, Percent, Headphones, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoFull from '../assets/finale logo white.png';
import ctaBg from '../assets/footer-team.webp';
import { useModal } from './ModalContext';
import { useState } from 'react';
import ConsultationModal from './ConsultationModal';

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const products = [
  { label: 'Home Loan', href: '/services' },
  { label: 'Personal Loan', href: '/services' },
  { label: 'Business Loan', href: '/services' },
  { label: 'Car Loan', href: '/services' },
];

const companyLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
];

const toolsLinks = [
  { label: 'Eligibility Calculator', href: '/eligibility-calculator' },
  { label: 'EMI Calculator', href: '/emi-calculator' },
];

const resourceLinks = [
  { label: "FAQ's", href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-conditions' },
];

const features = [
  { icon: IndianRupee, title: 'Zero Commission', sub: '100% Transparent' },
  { icon: Shield, title: 'Safe & Secure', sub: 'Your Data is Protected' },
  { icon: Clock, title: 'Fast Approval', sub: 'Quick & Hassle-free' },
  { icon: Handshake, title: 'Expert Guidance', sub: 'End-to-End Support' },
  { icon: Percent, title: 'Best Interest Rates', sub: 'Compare & Save More' },
];

const avatars = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
  'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=100',
];

/* matches Values / WhyChooseUs / other sections: max-w-[1440px] px-10 */
const SIDE = '40px';
const SIDE_MOBILE = '20px';
const MAX = 1440;

export default function Footer() {
  const { openModal } = useModal();
  const { pathname } = useLocation();
  const showCTA = pathname === '/contact' || pathname === '/services';
  const [consultOpen, setConsultOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <footer style={{ fontFamily: "'Inter','Segoe UI',Arial,sans-serif", background: '#fff' }}>

      {/* ── 1. CTA CARD (only on /contact and /services) ─────────────────── */}
      {showCTA && (
        <div style={{ padding: `24px ${SIDE_MOBILE} 0`, maxWidth: MAX, margin: '0 auto' }} className="md:px-10">
          <div style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 16,
            boxShadow: '0 6px 32px rgba(13,36,120,0.10)',
            minHeight: 200,
          }}>
            {/* bg photo */}
            <img src={ctaBg} alt="team"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            {/* gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg,rgba(235,243,255,0.97) 0%,rgba(230,241,255,0.92) 36%,rgba(210,230,255,0.5) 60%,transparent 100%)',
              pointerEvents: 'none',
            }} />

            {/* content */}
            <div style={{ position: 'relative', zIndex: 1, maxWidth: MAX, margin: '0 auto', padding: '28px 20px' }} className="md:px-9 md:py-9">
              <div style={{ maxWidth: 460 }}>

                {/* badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: 'rgba(255,255,255,0.88)', border: '1px solid #d0ddf5',
                  borderRadius: 999, padding: '6px 15px',
                  fontSize: 11.5, fontWeight: 700, letterSpacing: '0.13em',
                  textTransform: 'uppercase', color: '#0176C7', marginBottom: 16,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0176C7', display: 'inline-block' }} />
                  GET STARTED TODAY
                </div>

                {/* heading */}
                <h2 style={{ fontSize: 'clamp(1.9rem,3vw,2.8rem)', fontWeight: 900, lineHeight: 1.1, color: '#0d2478', margin: '0 0 12px' }}>
                  Ready To Get The<br />
                  Best <span style={{ color: '#0176C7' }}>Loan Offer?</span>
                </h2>

                {/* sub */}
                <p style={{ color: '#3a4a65', fontSize: 15, lineHeight: 1.65, margin: '0 0 20px' }}>
                  Our experts are ready to help you find the perfect loan solution
                  with the best interest rates and zero commission.
                </p>

                {/* buttons */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                  <button onClick={() => setConsultOpen(true)} style={{
                    background: '#0d2478', color: '#fff', border: 'none',
                    borderRadius: 10, padding: '12px 22px',
                    fontWeight: 700, fontSize: 14.5,
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    boxShadow: '0 6px 16px rgba(13,36,120,0.28)',
                    cursor: 'pointer',
                  }}>
                    <Headphones size={16} /> Get Free Consultation
                  </button>
                </div>

                {/* social proof */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-2">
                  <div style={{ display: 'flex' }}>
                    {avatars.map((url, i) => (
                      <img key={i} src={url} alt="customer"
                        style={{ width: 32, height: 32, borderRadius: '50%', border: '2.5px solid #fff', marginLeft: i === 0 ? 0 : -9, objectFit: 'cover', position: 'relative', zIndex: avatars.length - i }} />
                    ))}
                  </div>
                  <span style={{ color: '#1e293b', fontSize: 14, fontWeight: 600 }}>9,000+ Happy Customers</span>
                  <span className="hidden sm:inline" style={{ color: '#e2e8f0' }}>|</span>
                  <span style={{ color: '#475569', fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#f59e0b', fontSize: 16 }}>★</span> 4.8/5 Customer Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 2. FEATURES GRID (only on /contact and /services) ──────────── */}
      {showCTA && (
        <div style={{ maxWidth: MAX, margin: '16px auto 16px', padding: `0 ${SIDE_MOBILE}`, position: 'relative', zIndex: 2 }} className="md:px-10">
          <div className="bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{
            borderRadius: 20,
            border: '1px solid #e8edf5',
            boxShadow: '0 4px 24px rgba(13,36,120,0.07)',
            overflow: 'hidden',
          }}>
            {features.map(({ icon: Icon, title, sub }, i) => (
              <div key={i} className="flex items-center gap-4 p-5 lg:border-r border-b lg:border-b-0 border-[#eef2f8] last:border-0">
                <div style={{
                  width: 46, height: 46, borderRadius: '50%',
                  border: '1.5px solid #c7d9f5', background: '#f0f6ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={20} color="#0176C7" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: '#0f172a' }}>{title}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. DARK BLUE FOOTER ─────────────────────────────────────── */}
      <div style={{ background: '#0d2478', color: '#fff' }}>
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-4" style={{
          maxWidth: MAX, margin: '0 auto',
          padding: `28px ${SIDE_MOBILE} 20px`,
        }} id="footer-grid">

          {/* Brand — full width on mobile, 3 cols on lg */}
          <div className="col-span-2 lg:col-span-3">
            <img src={logoFull} alt="Zero Commission Logo"
              className="h-8 md:h-11 object-contain mb-3" />
            <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 13, lineHeight: 1.7, margin: '0 0 4px', maxWidth: 210 }}>
              Making loans simple, transparent<br />and accessible for everyone.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 12, fontWeight: 500, margin: '0 0 14px' }}>
              Zero Commission (A Unit Of Digivahan Digital India Private Limited).
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', textDecoration: 'none',
                }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Our Products */}
          <div className="col-span-1 lg:col-span-2">
            <h4 style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, margin: '0 0 12px' }}>Our Products</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {products.map(({ label }) => (
                <li key={label}>
                  <button
                    onClick={() => openModal(label)}
                    style={{
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: 13.5,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.65)'}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 lg:col-span-2">
            <h4 style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, margin: '0 0 12px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13.5, textDecoration: 'none' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1 lg:col-span-2">
            <h4 style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, margin: '0 0 12px' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              
              {/* Nested Collapsible Tools */}
              <li>
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: 13.5,
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontWeight: 600,
                  }}
                >
                  Tools
                  <ChevronDown size={12} className="transition-transform duration-200" style={{ transform: toolsOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                <ul style={{
                  listStyle: 'none',
                  paddingLeft: 12,
                  marginTop: 8,
                  display: toolsOpen ? 'flex' : 'none',
                  flexDirection: 'column',
                  gap: 8,
                  borderLeft: '1px solid rgba(255,255,255,0.15)'
                }}>
                  {toolsLinks.map(({ label, href }) => (
                    <li key={label}>
                      <Link to={href} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12.5, textDecoration: 'none' }}
                        onMouseEnter={(e) => e.target.style.color = '#fff'}
                        onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {resourceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13.5, textDecoration: 'none' }}
                    onMouseEnter={(e) => e.target.style.color = '#fff'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.65)'}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us — full width on mobile, 3 cols on lg */}
          <div className="col-span-2 lg:col-span-3">
            <h4 style={{ color: '#fff', fontSize: 13.5, fontWeight: 700, margin: '0 0 12px' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={14} color="rgba(255,255,255,0.85)" />
                </div>
                <a href="tel:+919990323833" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, textDecoration: 'none' }}>
                  +91 9990323833
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={14} color="rgba(255,255,255,0.85)" />
                </div>
                <a href="mailto:support@zerocommissionloan.com" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, textDecoration: 'none', wordBreak: 'break-all' }}>
                  support@zerocommissionloan.com
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <MapPin size={14} color="rgba(255,255,255,0.85)" />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, lineHeight: 1.7 }}>
                  Unit No. 309, 3rd Floor, Tower-A,<br />
                  SAS Tower, Medicity, Sector-38,<br />
                  Gurgaon – 122001
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{
            maxWidth: MAX, margin: '0 auto',
            padding: `12px ${SIDE_MOBILE}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 8,
            fontSize: 11, color: 'rgba(255,255,255,0.38)',
          }}>
            <span>© {new Date().getFullYear()} Zero Commission A Unit Of Digivahan Digital India Private Limited.</span>
            <div style={{ display: 'flex', gap: 16 }}>
              <Link to="/privacy-policy" style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link to="/terms-conditions" style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none' }}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>


      {/* Consultation Modal */}
      <ConsultationModal isOpen={consultOpen} onClose={() => setConsultOpen(false)} />

    </footer>
  );
}