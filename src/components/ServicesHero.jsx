import React from 'react';
import { Building2, Percent, FileText, Zap, ArrowRight, CheckCircle2, Clock, PhoneCall, Star } from 'lucide-react';
import heroImage from '../assets/services_hero.webp';
import serviceHeaderImg from '../assets/services_hero.webp';
import { Link } from 'react-router-dom';

export default function ServicesHero() {
  return (
    <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden bg-gradient-to-b from-[#ffffff] to-[#f4f9ff]">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.15 }} />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-60 -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-70 translate-x-1/3 pointer-events-none" />

      {/* Inline styles for the wave animations */}
      <style>{`
        @keyframes wave-move-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes wave-move-right {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .wave-layer {
          width: 200%;
          height: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .animate-wave-slow {
          animation: wave-move-left 24s linear infinite;
        }
        .animate-wave-mid {
          animation: wave-move-right 17s linear infinite;
        }
        .animate-wave-fast {
          animation: wave-move-left 11s linear infinite;
        }
      `}</style>

      {/* Animated Bottom Wave Layout */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] md:h-[120px] overflow-hidden pointer-events-none z-10">

        {/* Wave 1: Soft Blue Tint (Back Layer) */}
        <svg className="wave-layer animate-wave-slow" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,50 C 360,20 360,80 720,50 C 1080,20 1080,80 1440,50 C 1800,20 1800,80 2160,50 C 2520,20 2520,80 2880,50 L 2880,100 L 0,100 Z" fill="rgba(1, 151, 224, 0.15)" />
        </svg>

        {/* Wave 2: Soft Darker Blue Tint (Middle Layer) */}
        <svg className="wave-layer animate-wave-mid" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,60 C 360,80 360,40 720,60 C 1080,80 1080,40 1440,60 C 1800,80 1800,40 2160,60 C 2520,80 2520,40 2880,60 L 2880,100 L 0,100 Z" fill="rgba(1, 85, 173, 0.2)" />
        </svg>

        {/* Wave 3: Solid White Front */}
        <svg className="wave-layer animate-wave-fast" viewBox="0 0 2880 100" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,70 C 360,55 360,85 720,70 C 1080,55 1080,85 1440,70 C 1800,55 1800,85 2160,70 C 2520,55 2520,85 2880,70 L 2880,100 L 0,100 Z" fill="#ffffff" />
        </svg>

      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">

        {/* Left Side Content */}
        <div className="lg:w-[55%] max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#f0f7ff] text-[#0155AD] text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6 border border-[#bfdbfe]">
            <span className="w-2 h-2 bg-[#0176C7] rounded-full" /> OUR SERVICES
          </div>

          {/* Heading */}
          <h1 className="font-display font-bold leading-tight text-[#1a237e] mb-5" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}>
            Financial Solutions <br />
            <span className="text-[#3b82f6]">For Every Need</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-[19px] leading-relaxed mb-8 pr-4">
            Compare 50+ lenders, enjoy zero brokerage, a paperless process, and get fast approval on the loan that's right for you.
          </p>

          {/* 4 Feature Icons Row */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-y-6 gap-x-4 md:gap-8 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#1a237e]">
                <Building2 size={20} />
              </div>
              <div>
                <div className="font-bold text-[#1a237e] leading-tight text-sm md:text-base">50+</div>
                <div className="text-[11px] md:text-xs text-gray-500 font-medium">Lenders</div>
              </div>
            </div>

            <div className="w-px h-10 bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#0176C7]">
                <Percent size={20} />
              </div>
              <div>
                <div className="font-bold text-[#1a237e] leading-tight text-sm md:text-base">0%</div>
                <div className="text-[11px] md:text-xs text-gray-500 font-medium">Brokerage</div>
              </div>
            </div>

            <div className="w-px h-10 bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#2563eb]">
                <FileText size={20} />
              </div>
              <div>
                <div className="font-bold text-[#1a237e] leading-tight text-sm md:text-base">100%</div>
                <div className="text-[11px] md:text-xs text-gray-500 font-medium">Paperless</div>
              </div>
            </div>

            <div className="w-px h-10 bg-gray-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#e8f0fe] flex items-center justify-center text-[#2563eb]">
                <Zap size={20} />
              </div>
              <div>
                <div className="font-bold text-[#1a237e] leading-tight text-sm md:text-base">Fast</div>
                <div className="text-[11px] md:text-xs text-gray-500 font-medium">Approval</div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link to="/upload-documents" className="inline-flex items-center justify-center gap-2 bg-[#0155AD] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#014185] transition-all shadow-lg hover:shadow-xl shadow-blue-500/30">
              <FileText size={20} />
              Track application
              <ArrowRight size={20} />
            </Link>
            <a href="tel:+919990323833" className="inline-flex items-center justify-center gap-2 bg-white text-[#0155AD] border-2 border-[#0155AD] px-8 py-3.5 rounded-xl font-bold hover:bg-[#f8faff] transition-all">
              <PhoneCall size={20} />
              Talk to Expert
              <ArrowRight size={20} />
            </a>
          </div>

          {/* Trust Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Customer" />
              <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Customer" />
              <img src="https://i.pravatar.cc/100?img=13" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Customer" />
              <img src="https://i.pravatar.cc/100?img=14" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Customer" />
            </div>
            <div>
              <div className="text-sm text-gray-600 font-medium mb-1">25,000+ Customers Trust Zero Commission</div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
                <span className="text-xs font-bold text-[#1a237e]">4.8/5 Customer Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Image & Floating Cards */}
        <div className="lg:w-[45%] relative w-full flex justify-center mt-12 lg:mt-0">

          <div className="relative z-0 w-full max-w-[360px] md:max-w-[500px]">
            {/* Background Blob behind image */}
            <div className="absolute inset-0 bg-blue-100/50 rounded-[40px] transform rotate-3 scale-105"></div>

            {/* Main Image */}
            <img src={serviceHeaderImg} alt="Professional Loan Advisors" className="relative z-10 w-full h-auto object-cover object-center rounded-[32px] shadow-2xl" />



          </div>
        </div>

      </div>
    </section>
  );
}
