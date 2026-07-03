import { X, MessageCircle, FileText, User, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useModal } from './ModalContext'

export default function ExpertModal({ isOpen, onClose }) {
  const { openModal } = useModal()
  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,15,50,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden relative"
        style={{ animation: 'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <style>{`@keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
        
        {/* Top gradient bar */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #0197E0, #0155AD)' }} />
        
        {/* Close Button */}
        <button onClick={onClose} 
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors z-10">
          <X size={16} />
        </button>

        <div className="p-8 text-center flex flex-col items-center">
          
          {/* Photo */}
          <div className="relative w-24 h-24 rounded-full p-1 mb-5"
            style={{ background: 'linear-gradient(135deg, #0197E0, #0155AD)' }}>
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white">
              <User size={40} className="text-gray-300" />
            </div>
            {/* Online badge */}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full" />
          </div>

          <h3 className="font-display font-black text-xl mb-1" style={{ color: '#0f1857' }}>
            Our Expert
          </h3>
          <p className="text-sm font-bold text-[#0176C7] mb-3">Senior Loan Expert</p>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-8 px-2">
            Connect to our expert for a better experience after filling the form.
          </p>

          <div className="w-full flex flex-col gap-3">
            {/* Highlighted Fill Form Button */}
            <button onClick={() => { onClose(); openModal(); }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white transition-all hover:-translate-y-0.5 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #0197E0, #0155AD)', boxShadow: '0 8px 20px rgba(1,151,224,0.25)' }}>
              <FileText size={18} />
              Fill Form
            </button>

            {/* Connect Expert (WhatsApp) Button */}
            <a href="https://api.whatsapp.com/send/?phone=919990323833&text=Hello%2C+I+want+to+connect+regarding+a+loan.&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all hover:bg-gray-50 active:scale-95"
              style={{ color: '#0f1857', border: '1.5px solid #e5e7eb' }}>
              <MessageCircle size={18} className="text-green-500" />
              Connect Expert
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
