import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, Copy, Check, X, FileText, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SuccessModal({ token, loanType, onClose }) {
  const [copied, setCopied] = useState(false)
  const overlayRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const card = cardRef.current
    if (!overlay || !card) return
    overlay.style.opacity = '0'
    card.style.transform = 'scale(0.7) translateY(40px)'
    card.style.opacity = '0'
    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.3s ease'
      overlay.style.opacity = '1'
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease'
      card.style.transform = 'scale(1) translateY(0)'
      card.style.opacity = '1'
    })
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(token).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,15,50,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div ref={cardRef} className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">

        {/* Top gradient bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #0197E0, #0155AD, #6366f1)' }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 transition-all"
        >
          <X size={16} />
        </button>

        <div className="px-8 py-10 text-center">

          {/* Success Icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute w-24 h-24 rounded-full animate-ping opacity-20" style={{ background: '#0197E0' }} />
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
              style={{ background: 'linear-gradient(135deg, #0197E0, #0155AD)' }}>
              <CheckCircle2 size={38} className="text-white" strokeWidth={2.5} />
            </div>
          </div>

          <h2 className="font-display font-black text-2xl mb-2" style={{ color: '#0f1857' }}>
            Application Submitted!
          </h2>
          {loanType && (
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
              style={{ background: 'rgba(1,151,224,0.1)', color: '#0176C7' }}>
              {loanType}
            </div>
          )}
          <p className="text-gray-500 text-[15px] mb-8 leading-relaxed">
            Your loan application has been received. Our expert team will contact you within <strong>24 hours</strong>.
          </p>

          {/* Token Box */}
          <div className="rounded-2xl p-6 mb-8" style={{ background: 'linear-gradient(135deg, #f0fdf9, #eff6ff)', border: '1.5px dashed #0197E0' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Your Application Token</p>
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="font-display font-black text-3xl sm:text-4xl tracking-widest break-all text-center" style={{ color: '#0f1857' }}>
                {token}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300"
                style={copied
                  ? { background: '#0197E0', color: 'white' }
                  : { background: '#e8eaf6', color: '#1a237e' }
                }
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied!' : 'Copy Token'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              ⚠️ Save this token — you'll need it to upload your documents.
            </p>
          </div>

          {/* Upload Documents CTA */}
          <Link
            to="/upload-documents"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:-translate-y-0.5 mb-3"
            style={{ background: 'linear-gradient(135deg, #0197E0, #0155AD)', boxShadow: '0 10px 30px rgba(1,151,224,0.3)' }}
          >
            <FileText size={18} />
            Upload Documents Now
            <ArrowRight size={16} />
          </Link>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-600 transition-colors">
            I'll upload later
          </button>

        </div>
      </div>
    </div>
  )
}
