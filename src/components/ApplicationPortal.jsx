import { useState } from 'react'
import { FileText, CheckCircle2, AlertCircle, Search, Lock, Loader2, Upload, FileSearch, Key, Mail } from 'lucide-react'
import { sendApplicationOtp, verifyApplicationOtp } from '../services/loanService'
import UploadDocuments from './UploadDocuments'
import TrackApplication from './TrackApplication'

export default function ApplicationPortal() {
  const [step, setStep] = useState(1) // 1: Email, 2: OTP, 3: Verified (Tabs)
  const [loginMethod, setLoginMethod] = useState('email')
  const [tokenInput, setTokenInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [emailError, setEmailError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [otpInput, setOtpInput] = useState('')
  const [otpError, setOtpError] = useState('')
  const [tempEmail, setTempEmail] = useState('')
  const [appData, setAppData] = useState(null)
  const [showResend, setShowResend] = useState(false)

  const [activeTab, setActiveTab] = useState('track')

  const handleVerifyEmail = async () => {
    const email = emailInput.trim()
    if (!email) { setEmailError('Please enter your email address.'); return }
    setVerifying(true); setEmailError('')
    try {
      await sendApplicationOtp(email)
      setTempEmail(email)
      setStep(2)
    } catch (err) {
      setEmailError(err.message || 'No application found with this email.')
    } finally {
      setVerifying(false)
    }
  }

  const handleVerifyToken = async () => {
    const token = tokenInput.trim()
    if (!token) { setEmailError('Please enter your application token/ID.'); return }
    setVerifying(true); setEmailError('')
    try {
      const res = await sendApplicationOtp(token, true)
      // Save the exact email returned by the API so verify_otp uses it
      setTempEmail(res.data?.email || token)
      setStep(2)
    } catch (err) {
      setEmailError(err.message || 'No application found with this token.')
    } finally {
      setVerifying(false)
    }
  }


  const handleVerifyOtp = async () => {
    if (otpInput.length !== 4) { setOtpError('Please enter a valid 4-digit OTP.'); return }
    setOtpError('')
    try {
      const result = await verifyApplicationOtp(tempEmail, otpInput)
      setAppData(result.data)
      setStep(3)
    } catch {
      setOtpError('Invalid OTP or expired. Please try again.')
    }
  }

  const handleReset = () => {
    setStep(1); setEmailInput(''); setOtpInput('')
    setAppData(null); setEmailError(''); setOtpError('')
  }

  if (step === 3 && appData) {
    return (
      <div className="min-h-screen pt-28 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#f8f9ff 0%,#ffffff 100%)' }}>

        {/* BG decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle,#c5cae9,transparent)', filter: 'blur(80px)', transform: 'translate(30%,-30%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle,#b2dfdb,transparent)', filter: 'blur(70px)', transform: 'translate(-30%,30%)' }} />

        {/* Tab Bar */}
        <div className="relative z-40 flex justify-center px-4 mb-8">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl"
            style={{ background: 'white', border: '1px solid rgba(26,35,126,0.1)', boxShadow: '0 4px 24px rgba(26,35,126,0.08)' }}>
            <button
              onClick={() => setActiveTab('track')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300"
              style={activeTab === 'track'
                ? { background: 'linear-gradient(135deg,#0197E0,#0155AD)', color: 'white', boxShadow: '0 4px 16px rgba(1,151,224,0.35)' }
                : { color: '#6b7280', background: 'transparent' }
              }>
              <FileSearch size={15} /> Track Application
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300"
              style={activeTab === 'upload'
                ? { background: 'linear-gradient(135deg,#0197E0,#0155AD)', color: 'white', boxShadow: '0 4px 16px rgba(1,151,224,0.35)' }
                : { color: '#6b7280', background: 'transparent' }
              }>
              <Upload size={15} /> Upload Documents
            </button>
          </div>
        </div>

        <div className="relative z-10">
          {activeTab === 'track' ? (
            <TrackApplication appData={appData} onReset={handleReset} />
          ) : (
            <UploadDocuments appData={appData} onReset={handleReset} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-36 pb-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#f8f9ff 0%,#ffffff 100%)' }}>

      {/* BG decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle,#c5cae9,transparent)', filter: 'blur(80px)', transform: 'translate(30%,-30%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle,#b2dfdb,transparent)', filter: 'blur(70px)', transform: 'translate(-30%,30%)' }} />

      <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ background: '#e8eaf6', border: '1px solid #c5cae9' }}>
            <FileText size={13} className="text-[#1a237e]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#1a237e]">Application Portal</span>
          </div>
          <h1 className="font-display font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: '#0f1857' }}>
            Access Your{' '}
            <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">Application</span>
            <span style={{ color: '#0197E0' }}>.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Track your status and manage your required documents.
          </p>
        </div>

        {step === 1 && (
          <div className="max-w-[860px] mx-auto">
            {/* Toggle bar */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center p-1 rounded-2xl bg-white/60 border border-gray-200 shadow-sm backdrop-blur-sm">
                <button
                  onClick={() => { setLoginMethod('email'); setEmailError(''); setOtpError(''); }}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2"
                  style={loginMethod === 'email' ? { background: '#1a237e', color: 'white', boxShadow: '0 4px 12px rgba(26,35,126,0.2)' } : { color: '#6b7280' }}>
                  <Mail size={16} /> Email & OTP
                </button>
                <button
                  onClick={() => { setLoginMethod('token'); setEmailError(''); setOtpError(''); }}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2"
                  style={loginMethod === 'token' ? { background: '#1a237e', color: 'white', boxShadow: '0 4px 12px rgba(26,35,126,0.2)' } : { color: '#6b7280' }}>
                  <Key size={16} /> Application Token
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-10"
              style={{ border: '1px solid rgba(26,35,126,0.08)', boxShadow: '0 20px 60px rgba(26,35,126,0.08)' }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#1a237e,#080e38)' }}>
                  {loginMethod === 'email' ? <Lock size={20} className="text-white" /> : <Key size={20} className="text-white" />}
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl" style={{ color: '#0f1857' }}>Verify Your Identity</h2>
                  <p className="text-gray-500 text-sm">
                    {loginMethod === 'email' ? 'Enter the email you used for your loan application' : 'Enter your unique application token or ID'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                {loginMethod === 'email' ? (
                  <input type="email" value={emailInput}
                    onChange={e => { setEmailInput(e.target.value); setEmailError('') }}
                    onKeyDown={e => e.key === 'Enter' && handleVerifyEmail()}
                    placeholder="e.g. you@email.com"
                    className="flex-1 border border-gray-200 rounded-2xl px-5 py-4 text-xl font-bold text-center focus:outline-none focus:border-[#0197E0] focus:ring-2 focus:ring-blue-50 transition-all"
                    style={{ color: '#0f1857' }} />
                ) : (
                  <input type="text" value={tokenInput}
                    onChange={e => { setTokenInput(e.target.value); setEmailError('') }}
                    onKeyDown={e => e.key === 'Enter' && handleVerifyToken()}
                    placeholder="e.g. ZCL2606000106"
                    className="flex-1 border border-gray-200 rounded-2xl px-5 py-4 text-xl font-bold text-center focus:outline-none focus:border-[#0197E0] focus:ring-2 focus:ring-blue-50 transition-all uppercase"
                    style={{ color: '#0f1857' }} />
                )}
                <button onClick={loginMethod === 'email' ? handleVerifyEmail : handleVerifyToken} disabled={verifying}
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg,#0197E0,#0155AD)', boxShadow: '0 10px 24px rgba(1,151,224,0.3)', whiteSpace: 'nowrap' }}>
                  {verifying ? <><Loader2 size={18} className="animate-spin" /> Verifying...</> : <><Search size={18} /> Continue</>}
                </button>
              </div>
              {emailError && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">
                  <AlertCircle size={15} className="flex-shrink-0" /> {emailError}
                </div>
              )}
              <div className="mt-6 p-4 rounded-2xl flex items-start gap-3"
                style={{ background: '#f8f9ff', border: '1px solid rgba(26,35,126,0.06)' }}>
                <AlertCircle size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  We will send a 4-digit OTP to your registered email address to verify your identity.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-[860px] mx-auto">
            <div className="bg-white rounded-3xl p-6 md:p-10"
              style={{ border: '1px solid rgba(26,35,126,0.08)', boxShadow: '0 20px 60px rgba(26,35,126,0.08)' }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#1a237e,#080e38)' }}>
                  <Lock size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl" style={{ color: '#0f1857' }}>Enter OTP</h2>
                  <p className="text-gray-500 text-sm">Sent to <strong className="text-[#0f1857]">{tempEmail}</strong></p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <input type="text" value={otpInput}
                  onChange={e => { setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 4)); setOtpError('') }}
                  onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
                  placeholder="0000" maxLength={4}
                  className="flex-1 border border-gray-200 rounded-2xl px-5 py-4 text-2xl font-black text-center focus:outline-none focus:border-[#0197E0] focus:ring-2 focus:ring-blue-50 transition-all"
                  style={{ color: '#0f1857', letterSpacing: '1em' }} />
                <button onClick={handleVerifyOtp}
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                  style={{ background: 'linear-gradient(135deg,#0197E0,#0155AD)', boxShadow: '0 10px 24px rgba(1,151,224,0.3)', whiteSpace: 'nowrap' }}>
                  <CheckCircle2 size={18} /> Verify
                </button>
              </div>
              {otpError && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl">
                  <AlertCircle size={15} className="flex-shrink-0" /> {otpError}
                </div>
              )}
              <p className="text-center text-xs text-gray-500 mt-4">
                Didn't receive the OTP?{' '}
                <button className="text-[#0176C7] font-bold hover:underline"
                  onClick={() => { setShowResend(true); setTimeout(() => setShowResend(false), 3000) }}>
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Resend popup */}
      {showResend && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          style={{ background: 'rgba(10,15,50,0.65)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowResend(false)}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full"
            style={{ animation: 'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
            onClick={e => e.stopPropagation()}>
            <style>{`@keyframes scaleIn { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-[#0197E0] rounded-full animate-ping opacity-20" />
              <CheckCircle2 size={32} className="text-[#0197E0]" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#0f1857] mb-2">OTP Resent!</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">A new 4-digit OTP has been sent to your email address.</p>
            <button onClick={() => setShowResend(false)}
              className="w-full py-3 text-white rounded-2xl font-bold hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg,#0176C7,#0155AD)', boxShadow: '0 10px 24px rgba(1,151,224,0.3)' }}>
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
