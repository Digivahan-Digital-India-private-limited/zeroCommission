import { FileText, Shield, FileLock2, Lock } from 'lucide-react'

const docs = [
  {
    title: 'Aadhaar Card',
    desc: 'Aadhaar Card copy for identity verification (Front & Back)',
    badge: 'Mandatory', badgeColor: '#2563eb', badgeBg: '#f8fafc', underline: '#2563eb',
    circleBg: '#eef2ff',
    icon: (
      <svg width="70" height="54" viewBox="0 0 70 54" fill="none">
        <rect x="3" y="3" width="64" height="48" rx="6" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5"/>
        <circle cx="22" cy="24" r="10" fill="#2563eb"/>
        <circle cx="22" cy="20" r="4.5" fill="#fff" opacity="0.9"/>
        <rect x="37" y="14" width="24" height="4" rx="2" fill="#93c5fd"/>
        <rect x="37" y="22" width="18" height="3" rx="1.5" fill="#60a5fa"/>
        <rect x="37" y="29" width="21" height="3" rx="1.5" fill="#60a5fa"/>
        <rect x="10" y="40" width="50" height="3" rx="1.5" fill="#93c5fd"/>
      </svg>
    ),
  },
  {
    title: 'PAN Card',
    desc: 'Permanent Account Number (PAN) for financial verification',
    badge: 'Mandatory', badgeColor: '#16a34a', badgeBg: '#f0fdf4', underline: '#16a34a',
    circleBg: '#ecfdf5',
    icon: (
      <svg width="70" height="54" viewBox="0 0 70 54" fill="none">
        <rect x="3" y="3" width="64" height="48" rx="6" fill="#bbf7d0" stroke="#86efac" strokeWidth="1.5"/>
        <rect x="9" y="10" width="22" height="16" rx="3" fill="#10b981"/>
        <circle cx="20" cy="18" r="4.5" fill="#fff" opacity="0.8"/>
        <text x="36" y="23" fontSize="12" fontWeight="800" fill="#047857" fontFamily="monospace">PAN</text>
        <rect x="9" y="32" width="52" height="3" rx="1.5" fill="#86efac"/>
        <rect x="9" y="38" width="34" height="3" rx="1.5" fill="#6ee7b7"/>
        <circle cx="57" cy="35" r="6" fill="#16a34a"/>
        <path d="M54 35L56.5 37.5L61 32" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Bank Statement',
    desc: "Last 6 months' bank statements for income validation",
    badge: 'Mandatory', badgeColor: '#ea580c', badgeBg: '#fffbeb', underline: '#ea580c',
    circleBg: '#fff7ed',
    icon: (
      <svg width="60" height="62" viewBox="0 0 60 62" fill="none">
        <rect x="6" y="2" width="42" height="54" rx="5" fill="#fed7aa" stroke="#fdba74" strokeWidth="1.5"/>
        <text x="16" y="18" fontSize="9" fontWeight="700" fill="#c2410c" fontFamily="sans-serif">BANK</text>
        <rect x="12" y="22" width="28" height="3" rx="1.5" fill="#fb923c"/>
        <rect x="12" y="28" width="22" height="2.5" rx="1.25" fill="#fdba74"/>
        <rect x="12" y="33" width="25" height="2.5" rx="1.25" fill="#fdba74"/>
        <rect x="12" y="38" width="18" height="2.5" rx="1.25" fill="#fdba74"/>
        <path d="M42 2L54 14H42V2Z" fill="#fb923c"/>
        <circle cx="42" cy="46" r="12" fill="#ea580c"/>
        <text x="37" y="51" fontSize="14" fontWeight="800" fill="#fff" fontFamily="sans-serif">₹</text>
      </svg>
    ),
  },
  {
    title: 'Salary Slip',
    desc: "Last 3 months' salary slips for employment verification",
    badge: 'Mandatory', badgeColor: '#7c3aed', badgeBg: '#faf5ff', underline: '#7c3aed',
    circleBg: '#f5f3ff',
    icon: (
      <svg width="60" height="62" viewBox="0 0 60 62" fill="none">
        <rect x="6" y="2" width="42" height="54" rx="5" fill="#e9d5ff" stroke="#d8b4fe" strokeWidth="1.5"/>
        <text x="11" y="18" fontSize="9" fontWeight="700" fill="#6d28d9" fontFamily="sans-serif">SALARY</text>
        <rect x="12" y="22" width="28" height="2.5" rx="1.25" fill="#c084fc"/>
        <rect x="12" y="28" width="22" height="2.5" rx="1.25" fill="#d8b4fe"/>
        <rect x="12" y="33" width="25" height="2.5" rx="1.25" fill="#d8b4fe"/>
        <rect x="12" y="38" width="18" height="2.5" rx="1.25" fill="#d8b4fe"/>
        <path d="M42 2L54 14H42V2Z" fill="#c084fc"/>
        <circle cx="42" cy="46" r="12" fill="#7c3aed"/>
        <text x="37" y="51" fontSize="14" fontWeight="800" fill="#fff" fontFamily="sans-serif">₹</text>
      </svg>
    ),
  },
  {
    title: 'ITR / Income Proof',
    desc: "Last 2 years' ITR or Form 16 / Income Proof (if applicable)",
    badge: 'Conditional', badgeColor: '#2563eb', badgeBg: '#f8fafc', underline: '#2563eb',
    circleBg: '#eef2ff',
    icon: (
      <svg width="60" height="62" viewBox="0 0 60 62" fill="none">
        <rect x="6" y="2" width="42" height="54" rx="5" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5"/>
        <text x="16" y="18" fontSize="11" fontWeight="800" fill="#1d4ed8" fontFamily="sans-serif">ITR</text>
        <rect x="12" y="22" width="28" height="2.5" rx="1.25" fill="#60a5fa"/>
        <rect x="12" y="28" width="22" height="2.5" rx="1.25" fill="#93c5fd"/>
        <rect x="12" y="33" width="25" height="2.5" rx="1.25" fill="#93c5fd"/>
        <rect x="12" y="38" width="18" height="2.5" rx="1.25" fill="#93c5fd"/>
        <path d="M42 2L54 14H42V2Z" fill="#60a5fa"/>
        <circle cx="42" cy="46" r="12" fill="#3b82f6"/>
        <text x="37" y="51" fontSize="14" fontWeight="800" fill="#fff" fontFamily="sans-serif">₹</text>
      </svg>
    ),
  },
]

export default function RequiredDocuments() {
  return (
    <section className="px-6 md:px-10 py-12 relative overflow-hidden" style={{
      background:'linear-gradient(180deg,#eef2ff 0%,#f5f7ff 100%)',
    }}>
      {/* subtle dot-grid overlay */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', opacity:0.025,
        backgroundImage:'radial-gradient(#1a237e 1px,transparent 1px)',
        backgroundSize:'30px 30px',
      }} />
      <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#eef2ff', border: '1px solid #dbeafe', borderRadius: 999,
            padding: '7px 20px', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2563eb', marginBottom: 20
          }}>
            <FileText size={14} color="#2563eb" /> DOCUMENTS
          </div>
          <h2 style={{ fontSize: 'clamp(1.85rem,3vw,2.8rem)', fontWeight: 900, color: '#1a237e', margin: '0 0 14px', lineHeight: 1.2 }}>
            Required{' '}
            <span style={{ color: '#0176C7' }}>
              Documents
            </span>
          </h2>
          <p style={{ color: '#6b7280', fontSize: 17, lineHeight: 1.7, margin: 0 }}>
            Keep these documents ready to help us process your loan faster<br />
            with complete transparency.
          </p>
        </div>

        {/* 5 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {docs.map(({ title, desc, badge, badgeColor, badgeBg, underline, circleBg, icon }) => (
            <div key={title} style={{
              background: '#fff', borderRadius: 22, border: '1px solid #e8edf8',
              boxShadow: '0 6px 28px rgba(26,35,126,0.06)',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              paddingTop: 30,
            }}>
              
              <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, textAlign: 'center' }}>
                <div style={{
                  width: 96, height: 96, borderRadius: '50%', background: circleBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20, flexShrink: 0,
                }}>
                  {icon}
                </div>

                {/* Title */}
                <div style={{ fontWeight: 800, fontSize: 15.5, color: '#1e293b', marginBottom: 10 }}>{title}</div>

                {/* Colored underline */}
                <div style={{ width: 24, height: 3, borderRadius: 2, background: underline, marginBottom: 14 }} />

                {/* Desc */}
                <p style={{ color: '#6b7280', fontSize: 17, lineHeight: 1.6, margin: '0 0 20px' }}>{desc}</p>
              </div>

              {/* Badge (Full width at bottom) */}
              <div style={{
                marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, width: '100%', padding: '14px 0',
                background: badgeBg,
                fontSize: 13, fontWeight: 700, color: badgeColor,
                borderTop: '1px solid rgba(0,0,0,0.03)'
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: '50%', background: badgeColor,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {badge}
              </div>
            </div>
          ))}
        </div>

        {/* Security Banner */}
        <div style={{
          marginTop: 24, background: '#fff',
          borderRadius: 16, border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 36px', flexWrap: 'wrap', gap: 20,
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flex: 1 }}>
            <div style={{ position: 'relative', width: 68, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={68} fill="#e0f2fe" color="#e0f2fe" strokeWidth={1} style={{ position: 'absolute' }} />
              <Shield size={40} fill="#2563eb" color="#2563eb" strokeWidth={1} style={{ position: 'absolute' }} />
              <Lock size={18} color="#ffffff" strokeWidth={2.5} style={{ position: 'absolute', marginTop: -2 }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#1a237e', fontSize: 18, marginBottom: 8 }}>Your Data is Safe &amp; Secure</div>
              <div style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.5 }}>We use bank-level encryption to keep your documents safe and confidential.</div>
            </div>
          </div>

          <div style={{ width: 1, background: '#e2e8f0', alignSelf: 'stretch', display: 'block', minHeight: 60, margin: '0 10px' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 0.8 }}>
            <div style={{ flexShrink: 0 }}>
              <FileLock2 size={40} color="#3b82f6" strokeWidth={1.5} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#1e293b', fontSize: 15 }}>100% Secure Upload</div>
              <div style={{ color: '#64748b', fontSize: 13.5, marginTop: 3, lineHeight: 1.5 }}>Your documents are encrypted<br />and stored securely.</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}