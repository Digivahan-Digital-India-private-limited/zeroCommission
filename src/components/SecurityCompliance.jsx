import React from "react";
import { Shield, Lock, FileText, User } from "lucide-react";
import securityShield from "../assets/security-shield.png";

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A6FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CardIcon256 = () => (
  <div style={{ position: 'relative', width: 68, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Shield size={68} fill="#e0f2fe" color="#e0f2fe" strokeWidth={1} style={{ position: 'absolute' }} />
    <Shield size={40} fill="#2563eb" color="#2563eb" strokeWidth={1} style={{ position: 'absolute' }} />
    <Lock size={18} color="#ffffff" strokeWidth={2.5} style={{ position: 'absolute', marginTop: -2 }} />
  </div>
);

const CardIconDoc = () => (
  <div style={{
    width: 64, height: 64, borderRadius: 16,
    background: 'linear-gradient(to bottom right, #0176C7, #0155AD)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 10px 15px -3px rgba(1, 118, 199, 0.3)',
  }}>
    <FileText size={28} color="#ffffff" strokeWidth={2} />
  </div>
);

const CardIconBank = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9B59B6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 2 7 22 7" />
  </svg>
);

const CardIconPrivacy = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E67E22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M16 11l1.5 1.5L21 9" />
  </svg>
);

const Hero3DShield = () => (
  <div style={{
    position: 'relative',
    width: 340, height: 300,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }}>

    {/* ── Platform / Base ── */}
    <div style={{
      position: 'absolute',
      bottom: 10, left: '50%',
      transform: 'translateX(-50%)',
      width: 160, height: 36,
      background: 'radial-gradient(ellipse at 50% 40%, #c8ddf7 0%, #ddeeff 60%, transparent 100%)',
      borderRadius: '50%',
    }} />

    {/* ── Orbit ring ── */}
    <div style={{
      position: 'absolute',
      width: 230, height: 68,
      border: '1.5px solid #b8d4f0',
      borderRadius: '50%',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -44%) rotateX(72deg)',
      opacity: 0.7,
    }} />

    {/* ── Main 3D Shield SVG ── */}
    <div style={{ position: 'relative', zIndex: 2 }}>
      <svg width="170" height="195" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sg1" x1="20" y1="0" x2="100" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#89C4F4" />
            <stop offset="45%" stopColor="#2980E4" />
            <stop offset="100%" stopColor="#1452B3" />
          </linearGradient>
          <linearGradient id="sg2" x1="20" y1="0" x2="60" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="sdrop" x="-20%" y="-10%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1452B3" floodOpacity="0.35"/>
          </filter>
          {/* Inner lighter shield gradient */}
          <linearGradient id="sg3" x1="32" y1="22" x2="88" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#aed6f8" />
            <stop offset="100%" stopColor="#2060c8" />
          </linearGradient>
        </defs>

        {/* Outer shield */}
        <path
          d="M60 8 L104 26 L104 72 Q104 112 60 132 Q16 112 16 72 L16 26 Z"
          fill="url(#sg1)"
          filter="url(#sdrop)"
        />
        {/* Sheen highlight */}
        <path
          d="M60 8 L104 26 L104 72 Q104 112 60 132 Q16 112 16 72 L16 26 Z"
          fill="url(#sg2)"
        />
        {/* Inner shield border */}
        <path
          d="M60 20 L92 34 L92 68 Q92 100 60 116 Q28 100 28 68 L28 34 Z"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.5"
        />

        {/* White lock body */}
        <rect x="45" y="68" width="30" height="24" rx="5" fill="white" opacity="0.96"/>
        {/* Lock shackle */}
        <path
          d="M50 68 L50 60 Q50 48 60 48 Q70 48 70 60 L70 68"
          fill="none"
          stroke="white"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        {/* Keyhole */}
        <circle cx="60" cy="78" r="4" fill="#2563EB"/>
        <rect x="57.5" y="78" width="5" height="7" rx="2.5" fill="#2563EB"/>
      </svg>
    </div>

    {/* ── Server Card — top left ── */}
    <div style={{
      position: 'absolute', top: 18, left: 6,
      background: '#fff', borderRadius: 12,
      padding: '10px 12px',
      boxShadow: '0 4px 16px rgba(37,99,235,0.12)',
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      {/* Server stack lines */}
      {[0,1,2].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 28, height: 7, borderRadius: 3, background: '#dbeafe', border: '1px solid #bfdbfe' }} />
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#60a5fa' }} />
        </div>
      ))}
      {/* Lock badge */}
      <div style={{
        position: 'absolute', bottom: -7, right: -7,
        width: 18, height: 18, borderRadius: '50%',
        background: '#2563EB',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 6px rgba(37,99,235,0.4)',
      }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
          <rect x="5" y="10" width="14" height="11" rx="2"/>
          <path d="M8 10V7a4 4 0 018 0v3"/>
        </svg>
      </div>
    </div>

    {/* ── Document Card — top right ── */}
    <div style={{
      position: 'absolute', top: 14, right: 4,
      background: '#fff', borderRadius: 12,
      padding: '10px 12px',
      boxShadow: '0 4px 16px rgba(37,99,235,0.12)',
    }}>
      {/* Page lines */}
      <svg width="32" height="38" viewBox="0 0 32 38" fill="none">
        <rect x="1" y="1" width="24" height="30" rx="3" fill="#EEF4FF" stroke="#BFDBFE" strokeWidth="1.5"/>
        <path d="M7 8 H20" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 13 H20" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 18 H16" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      {/* Lock badge */}
      <div style={{
        position: 'absolute', bottom: -7, right: -7,
        width: 18, height: 18, borderRadius: '50%',
        background: '#2563EB',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 6px rgba(37,99,235,0.4)',
      }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
          <rect x="5" y="10" width="14" height="11" rx="2"/>
          <path d="M8 10V7a4 4 0 018 0v3"/>
        </svg>
      </div>
    </div>

    {/* ── 100% Protected Badge ── */}
    <div style={{
      position: 'absolute', bottom: 36, right: -4,
      background: '#fff', borderRadius: 10,
      padding: '8px 12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
      display: 'flex', alignItems: 'center', gap: 8,
      zIndex: 3,
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'rgba(46,204,113,0.12)',
        border: '1.5px solid #2ecc71',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <polyline points="4 12 9 17 20 6" stroke="#2ecc71" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 13, color: '#1e293b', lineHeight: 1.1 }}>100%</div>
        <div style={{ fontSize: 9.5, color: '#64748b', fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' }}>Protected</div>
      </div>
    </div>

    {/* ── Dots ── */}
    <div style={{ position: 'absolute', top: 68, left: 28, width: 8, height: 8, borderRadius: '50%', background: '#93c5fd', opacity: 0.8 }} />
    <div style={{ position: 'absolute', top: 100, right: 22, width: 6, height: 6, borderRadius: '50%', background: '#60a5fa', opacity: 0.6 }} />
    <div style={{ position: 'absolute', bottom: 80, left: 14, width: 6, height: 6, borderRadius: '50%', background: '#93c5fd', opacity: 0.6 }} />
    <div style={{ position: 'absolute', top: 42, left: 58, width: 5, height: 5, borderRadius: '50%', background: '#bfdbfe', opacity: 0.9 }} />
  </div>
);


const cards = [
  { icon: <CardIcon256 />, iconBg: "transparent", title: "256-bit Encryption", titleColor: "#2563EB", desc: "All your data is protected with bank-level 256-bit SSL encryption to prevent unauthorized access.", barColor: "#2563EB" },
  { icon: <CardIconDoc />, iconBg: "transparent", title: "Secure Document Upload", titleColor: "#0176C7", desc: "Your documents are uploaded and stored securely with multi-layer protection.", barColor: "#0176C7" },
  { icon: <CardIconBank />, iconBg: "#F3ECF9", title: "RBI Guidelines Compliant", titleColor: "#9B59B6", desc: "We strictly follow RBI guidelines and industry best practices for safe and transparent lending.", barColor: "#9B59B6" },
  { icon: <CardIconPrivacy />, iconBg: "#FEF3E8", title: "Privacy Protected", titleColor: "#E67E22", desc: "We respect your privacy. Your information is never shared without your consent.", barColor: "#E67E22" },
];

const RBIIcon = () => (
  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #b8860b, #8B6914)", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #8B6914", overflow: "hidden", flexShrink: 0 }}>
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" stroke="#d4a017" strokeWidth="1.5" fill="#8B6914" />
      <text x="18" y="16" textAnchor="middle" fontSize="7" fill="#f5d77a" fontWeight="bold">RBI</text>
      <text x="18" y="24" textAnchor="middle" fontSize="4.5" fill="#f5d77a">INDIA</text>
      <circle cx="18" cy="18" r="12" stroke="#d4a017" strokeWidth="0.5" fill="none" />
    </svg>
  </div>
);

const ISO27001Icon = () => (
  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #1B4F8A, #2563EB)", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #1B4F8A", overflow: "hidden", flexShrink: 0 }}>
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#1B4F8A" />
      <text x="18" y="14" textAnchor="middle" fontSize="5" fill="white" fontWeight="bold">ISO</text>
      <text x="18" y="21" textAnchor="middle" fontSize="5.5" fill="#FFD700" fontWeight="bold">27001</text>
      <path d="M10 26 L18 30 L26 26" stroke="#FFD700" strokeWidth="1.2" fill="none" />
    </svg>
  </div>
);

const DPDPIcon = () => (
  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #27AE60, #1a7a44)", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #1a7a44", overflow: "hidden", flexShrink: 0 }}>
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="16" fill="#27AE60" />
      <polyline points="10,18 15,23 26,13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function SecurityCompliance() {
  return (
    <div style={{
      background: "#F0F4FA",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: "0 0 48px 0",
    }}>
      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-12 pb-8 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
        {/* Left */}
        <div className="w-full lg:max-w-[500px] flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full" style={{ background: "#E8EEF8", border: "1px solid #c5d4ee" }}>
            <ShieldIcon />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#4A6FA5", letterSpacing: 1, textTransform: "uppercase" }}>Security &amp; Compliance</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.85rem,3vw,2.8rem)', fontWeight: 800, lineHeight: 1.1, margin: "0 0 18px 0", color: "#0F2A4A" }}>
            Your Data{" "}<span style={{ color: "#2563EB" }}>Is Secure</span>
          </h2>
          <p style={{ fontSize: 17, color: "#5A6A7E", lineHeight: 1.7, margin: 0 }}>
            We use industry-leading security practices and follow strict compliance standards to protect your data and ensure complete peace of mind.
          </p>
        </div>
        {/* Right: 3D Shield Image */}
        <div className="flex-shrink-0 flex items-center justify-center lg:justify-end flex-1 w-full mt-4 lg:mt-0">
          <img
            src={securityShield}
            alt="Security Shield"
            className="w-full max-w-[400px] lg:max-w-[560px] object-contain"
            style={{
              filter: 'drop-shadow(0 16px 32px rgba(37,99,235,0.12))',
            }}
          />
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "28px 22px 0 22px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
              {card.icon}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: card.titleColor, margin: "0 0 10px 0" }}>{card.title}</h3>
            <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.65, margin: "0 0 24px 0" }}>{card.desc}</p>
            <div style={{ width: "60%", height: 3, background: card.barColor, borderRadius: 2, marginBottom: 20, alignSelf: "center" }} />
          </div>
        ))}
      </div>

      {/* Promise Bar */}
      <div className="max-w-[1440px] mt-8 mx-auto px-6 md:px-10 pb-6">
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row overflow-hidden">
          
          {/* Column 1 */}
          <div className="p-8 lg:p-10 lg:w-[28%] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100 bg-[#fafcff]">
            <div className="relative w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <Shield size={28} className="text-blue-600" fill="#2563EB" color="#2563EB" />
              <div className="absolute text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
            <h3 className="text-2xl font-black text-[#0F2A4A] leading-[1.2] mb-4">
              Your Trust,<br/>
              <span className="text-blue-600">Our Promise</span>
            </h3>
            <p className="text-[15px] text-gray-500 font-medium leading-relaxed m-0">
              We are committed to providing a secure, transparent and hassle-free loan experience.
            </p>
          </div>

          {/* Columns 2-5 Container */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Column 2 */}
            <div className="p-8 flex flex-col items-center text-center border-b sm:border-b-0 sm:border-r border-gray-100">
              <div className="w-20 h-20 rounded-full bg-[#f0f7ff] flex items-center justify-center mb-5">
                <div className="relative">
                  <Shield size={36} className="text-blue-500" strokeWidth={1.5} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={16} className="text-blue-500" strokeWidth={2} />
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                <div className="w-1.5 h-1 bg-blue-500 rounded-full" />
                <div className="w-6 h-1 bg-blue-500 rounded-full" />
              </div>
              <h4 className="font-bold text-[#0F2A4A] mb-3">Secure & Encrypted</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed m-0">
                Your personal and financial data is protected with industry-standard encryption and never shared.
              </p>
            </div>

            {/* Column 3 */}
            <div className="p-8 flex flex-col items-center text-center border-b lg:border-b-0 sm:border-r border-gray-100">
              <div className="w-20 h-20 rounded-full bg-[#f0fdf4] flex items-center justify-center mb-5">
                <div className="relative">
                  <User size={36} className="text-green-500" strokeWidth={1.5} />
                  <div className="absolute -bottom-1 -right-2 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                <div className="w-1.5 h-1 bg-green-500 rounded-full" />
                <div className="w-6 h-1 bg-green-500 rounded-full" />
              </div>
              <h4 className="font-bold text-[#0F2A4A] mb-3">Trusted Loan Experts</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed m-0">
                Get free guidance from experienced financial advisors who are here to help you at every step.
              </p>
            </div>

            {/* Column 4 */}
            <div className="p-8 flex flex-col items-center text-center border-b sm:border-b-0 lg:border-r border-gray-100">
              <div className="w-20 h-20 rounded-full bg-[#fffbeb] flex items-center justify-center mb-5">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#fb923c" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <div className="flex gap-1 mb-4">
                <div className="w-1.5 h-1 bg-orange-400 rounded-full" />
                <div className="w-6 h-1 bg-orange-400 rounded-full" />
              </div>
              <h4 className="font-bold text-[#0F2A4A] mb-3">Fast Digital Process</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed m-0">
                Apply online with a simple and hassle-free process and get quick assistance at every step.
              </p>
            </div>

            {/* Column 5 */}
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#faf5ff] flex items-center justify-center mb-5">
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 rounded-full w-7 h-7 flex items-center justify-center border border-purple-600 mb-0.5 z-10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12"/><path d="M6 8h12"/><path d="M6 13l8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
                  </div>
                  <svg width="28" height="16" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="-mt-1">
                    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                    <path d="m2 16 6 6" />
                  </svg>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                <div className="w-1.5 h-1 bg-purple-600 rounded-full" />
                <div className="w-6 h-1 bg-purple-600 rounded-full" />
              </div>
              <h4 className="font-bold text-[#0F2A4A] mb-3">Zero Commission Promise</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed m-0">
                Earn back the commission on eligible loan applications. It's our promise!
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
