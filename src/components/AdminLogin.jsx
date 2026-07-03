import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Mail, KeyRound, ArrowRight, ShieldCheck, Loader2, Lock, Eye, EyeOff } from 'lucide-react';
import { adminLoginAPI, adminVerifyAPI, adminPasswordLoginAPI } from '../services/loanService';

export default function AdminLogin() {
  const [loginMode, setLoginMode] = useState('otp'); // 'otp' | 'password'
  const [step, setStep] = useState(1); // OTP mode: 1=Email, 2=OTP
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState('');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Switch login mode with animation
  const switchMode = (mode) => {
    if (mode === loginMode) return;
    setError('');
    setStep(1);
    gsap.to(formRef.current, {
      opacity: 0, x: -15, duration: 0.25,
      onComplete: () => {
        setLoginMode(mode);
        gsap.fromTo(formRef.current, { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
      }
    });
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      await adminLoginAPI(email);
      setResendTimer(30);
      setError('OTP has been resent to the registered email!');
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const res = await adminLoginAPI(email);
      if (res.data?.email) setMaskedEmail(res.data.email);
      setResendTimer(30);
      gsap.to(formRef.current, {
        opacity: 0, x: -20, duration: 0.3,
        onComplete: () => {
          setStep(2);
          gsap.fromTo(formRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' });
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to authenticate email. Only registered admins are allowed.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^\d{4,6}$/.test(otp)) {
      setError('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    try {
      await adminVerifyAPI(email, otp);
      gsap.to(formRef.current, {
        scale: 0.95, opacity: 0, duration: 0.4, ease: 'power2.in',
        onComplete: () => navigate('/page/admin/dashboard')
      });
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    try {
      await adminPasswordLoginAPI(email, password);
      gsap.to(formRef.current, {
        scale: 0.95, opacity: 0, duration: 0.4, ease: 'power2.in',
        onComplete: () => navigate('/page/admin/dashboard')
      });
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden bg-[#f8f9ff]">

      {/* Background Elements */}
      <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-40 pointer-events-none"></div>
      <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-60 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-100 glow-teal">
            <ShieldCheck className="text-[#0197E0]" size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-display font-bold text-[#1a237e] mb-3">Admin Portal</h1>
          <p className="text-gray-500">Secure access to the ZeroCommission dashboard</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
          <button
            onClick={() => switchMode('otp')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${loginMode === 'otp' ? 'bg-white text-[#1a237e] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Login with OTP
          </button>
          <button
            onClick={() => switchMode('password')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${loginMode === 'password' ? 'bg-white text-[#1a237e] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Login with Password
          </button>
        </div>

        <div
          ref={formRef}
          className="bg-white border border-gray-100 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        >
          {/* ─── OTP Mode ─── */}
          {loginMode === 'otp' && (
            <>
              {step === 1 ? (
                <form onSubmit={handleEmailSubmit}>
                  <h2 className="text-2xl font-bold text-[#1a237e] mb-6">Welcome Back</h2>

                  <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="text-gray-400" size={20} />
                      </div>
                      <input
                        type="email"
                        className="w-full bg-gray-50 border border-gray-200 text-[#1a237e] rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0197E0] focus:border-transparent transition-all placeholder-gray-400"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#0197E0] to-[#0155AD] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_8px_25px_rgba(1,151,224,0.3)] transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <>Send OTP <ArrowRight size={20} /></>}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleOtpSubmit}>
                  <h2 className="text-2xl font-bold text-[#1a237e] mb-2">Verify OTP</h2>
                  <p className="text-gray-500 text-sm mb-6">
                    Code sent to <strong className="text-[#0f1857]">{maskedEmail || email}</strong>
                    <button
                      type="button"
                      onClick={() => { setStep(1); setError(''); }}
                      className="ml-2 text-[#0197E0] hover:underline"
                    >
                      Edit
                    </button>
                  </p>

                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Enter OTP</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <KeyRound className="text-gray-400" size={20} />
                      </div>
                      <input
                        type="text"
                        maxLength="6"
                        className="w-full bg-gray-50 border border-gray-200 text-[#1a237e] rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0197E0] focus:border-transparent transition-all placeholder-gray-400 tracking-widest text-lg"
                        placeholder="••••••"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mb-6">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={resendTimer > 0 || loading}
                      className="text-sm font-medium transition-colors disabled:opacity-50"
                      style={{ color: resendTimer > 0 ? '#9ca3af' : '#0197E0' }}
                    >
                      {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                    </button>
                  </div>

                  {error && <p className={`text-sm mb-4 ${error.includes('resent') ? 'text-green-600' : 'text-red-500'}`}>{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#0197E0] to-[#0155AD] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_8px_25px_rgba(1,151,224,0.3)] transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <>Login to Dashboard <ArrowRight size={20} /></>}
                  </button>
                </form>
              )}
            </>
          )}

          {/* ─── Password Mode ─── */}
          {loginMode === 'password' && (
            <form onSubmit={handlePasswordSubmit}>
              <h2 className="text-2xl font-bold text-[#1a237e] mb-6">Welcome Back</h2>

              <div className="mb-5">
                <label className="block text-gray-600 text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="email"
                    className="w-full bg-gray-50 border border-gray-200 text-[#1a237e] rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0197E0] focus:border-transparent transition-all placeholder-gray-400"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full bg-gray-50 border border-gray-200 text-[#1a237e] rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-[#0197E0] focus:border-transparent transition-all placeholder-gray-400"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#0197E0] to-[#0155AD] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_8px_25px_rgba(1,151,224,0.3)] transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Login to Dashboard <ArrowRight size={20} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
