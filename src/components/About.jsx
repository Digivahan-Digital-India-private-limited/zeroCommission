import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Shield, Users, IndianRupee, Landmark, ShieldCheck, CheckCircle2, Play, ArrowRight, Star, FileText, Target, Award, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import aboutCardImg from '../assets/about_us_hero.webp';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Users, val: '10,000', suffix: '+', label: 'Satisfied Clients' },
  { icon: Award, val: '4.5', suffix: '★', label: 'Customer Rating' },
  { icon: Clock, val: '24', suffix: 'Hrs', label: 'Avg. Approval Time' },
  { icon: Target, val: '100', suffix: '%', label: 'Transparent Process' },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = {
        label: sectionRef.current?.querySelector('.abt-label'),
        heading: sectionRef.current?.querySelector('.abt-heading'),
        text: sectionRef.current?.querySelector('.abt-text'),
        btn: sectionRef.current?.querySelector('.abt-btn'),
        card: sectionRef.current?.querySelector('.abt-card'),
        floatBadge: sectionRef.current?.querySelector('.abt-float-badge'),
        statCards: sectionRef.current?.querySelectorAll('.abt-stat'),
        bars: sectionRef.current?.querySelectorAll('.abt-bar'),
      };

      const st = (el, from, to, extra = {}) => {
        if (!el) return;
        gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, start: 'top 88%' }, ...extra });
      };

      st(els.label, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
      st(els.heading, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' });
      st(els.text, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' });
      st(els.btn, { y: 25, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' });
      st(els.card, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' });

      if (els.floatBadge) {
        gsap.fromTo(els.floatBadge, { scale: 0 }, { scale: 1, duration: 0.8, ease: 'back.out(2)', delay: 0.3, scrollTrigger: { trigger: els.card, start: 'top 80%' } });
        gsap.to(els.floatBadge, { y: -12, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }

      els.bars?.forEach((bar, i) => {
        const val = [92, 98, 87][i];
        gsap.fromTo(bar, { width: '0%' }, { width: `${val}%`, duration: 1.6, delay: 0.3 + i * 0.2, ease: 'power2.inOut', scrollTrigger: { trigger: els.card, start: 'top 78%' } });
      });

      if (els.statCards?.length) {
        gsap.fromTo(els.statCards, { y: 50, opacity: 0, scale: 0.85 }, { y: 0, opacity: 1, scale: 1, duration: 0.65, stagger: 0.12, ease: 'back.out(1.5)', scrollTrigger: { trigger: els.statCards[0], start: 'top 88%' } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col">
      {/* ── NEW HERO SECTION ── */}
      <section className="relative pt-16 pb-40 lg:pt-20 lg:pb-52 overflow-hidden bg-white font-sans">
        
        {/* Background Shapes */}
        <div 
          className="absolute top-0 right-0 w-full lg:w-[65%] h-full lg:h-[110%] bg-gradient-to-br from-[#f4f9ff] to-[#e6f0ff] lg:rounded-bl-[200px] pointer-events-none -z-10"
          style={{ transform: 'translateY(-5%)' }}
        />
        <div className="absolute bottom-0 right-0 w-full lg:w-[40%] h-[300px] bg-[#0155AD] lg:rounded-tl-[150px] pointer-events-none -z-20 transform translate-y-1/3" />
        <div className="absolute top-20 left-0 w-64 h-64 pointer-events-none opacity-30 -z-10"
          style={{ backgroundImage: 'radial-gradient(#94a3b8 2px, transparent 2px)', backgroundSize: '24px 24px', opacity: 0.15 }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Column */}
          <div className="lg:w-[50%] max-w-2xl pt-10">
            <div className="inline-flex items-center gap-2 bg-[#f0f7ff] text-[#0155AD] text-[11px] md:text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8 border border-[#bfdbfe]">
              <Users size={14} className="text-[#0176C7]" />
              ABOUT ZERO COMMISSION
            </div>

            <h1 className="font-display font-black leading-[1.1] text-[#0f1857] mb-6" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)' }}>
              Building a Better <br className="hidden sm:block" />
              Loan Experience, <br className="hidden sm:block" />
              <span className="text-[#0155AD]">Together.</span>
            </h1>

            <p className="text-gray-600 text-base md:text-[17px] leading-relaxed mb-10 pr-4 md:pr-12">
              Zero Commission is a customer-first loan platform that eliminates broker fees and hidden charges. We partner with trusted banks and NBFCs to bring you the best loan solutions with complete transparency.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#0155AD]">
                  <Shield size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-bold text-[#0f1857] text-[15px]">100% Transparent</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">No hidden fees or surprises</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#0155AD]">
                  <FileText size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-bold text-[#0f1857] text-[15px]">Zero Commission</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">You pay zero brokerage</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#0155AD]">
                  <Users size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-bold text-[#0f1857] text-[15px]">Expert Guidance</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">From application to approval</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button className="inline-flex items-center justify-center gap-2 bg-[#0155AD] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#014185] transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-1" onClick={() => { document.getElementById('about-info')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Our Journey
                <ArrowRight size={18} />
              </button>
              <button className="inline-flex items-center justify-center gap-3 bg-white text-[#0155AD] border border-gray-200 px-8 py-3.5 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow hover:-translate-y-1 group">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0155AD] group-hover:bg-[#0155AD] group-hover:text-white transition-colors">
                  <Play size={14} fill="currentColor" />
                </div>
                Watch Our Story
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-[55%] relative w-full flex justify-center mt-10 lg:mt-0">
            <div className="relative z-10 w-full max-w-[600px] xl:max-w-[700px]">
              <LazyImage 
                src={aboutCardImg} 
                alt="Professional Loan Advisors" 
                className="w-full h-[500px] lg:h-[650px] object-cover object-center rounded-[32px] shadow-2xl relative z-10" 
              />

          </div>
        </div>
      </div>
        {/* Bottom Stats Bar */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] bg-white rounded-2xl md:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-50 p-6 md:p-8 z-30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x-0 md:divide-x divide-gray-100">
            {[
              { icon: Users, val: '9,000',suffix: '+', label: 'Happy Customers' },
              { icon: IndianRupee, val: '₹800',suffix: '+ Cr', label: 'Loans Processed' },
              { icon: Landmark, val: '50',suffix: '+', label: 'Bank & NBFC Partners' },
              { icon: ShieldCheck, val: '98',suffix: '%', label: 'Customer Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 px-2 md:px-6 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-[#0155AD] flex items-center justify-center text-white shrink-0 shadow-md">
                  <stat.icon size={22} />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                <div className="font-sans font-bold text-[#0f1857] text-[22px] md:text-[26px] leading-none mb-1.5 tracking-tight">
                  {stat.val}
                  <span className="relative -top-2 ml-0.5 text-[0.65em] font-bold font-sans">
                    {stat.suffix}
                  </span>
                </div>
                  <div className="text-[11px] md:text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">{stat.label}</div>
                  <div className="w-6 h-0.5 bg-[#0155AD] rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OLD ABOUT SECTION ── */}
      <section ref={sectionRef} id="about-info" className="pt-24 pb-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)' }}>

        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(#1a237e 1px,transparent 1px),linear-gradient(to right,#1a237e 1px,transparent 1px)', backgroundSize: '70px 70px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#c5cae9,transparent)', filter: 'blur(60px)' }} />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-20">
            <div className="abt-label inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full mb-5 border"
              style={{ backgroundColor: '#e8eaf6', color: '#1a237e', borderColor: '#c5cae9' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a237e]" /> About Company
            </div>
            <h2 className="abt-heading font-display font-bold leading-tight"
              style={{ fontSize: 'clamp(2.2rem,4vw,3.5rem)', color: '#1a237e' }}>
              Focus on Your Goals,{' '}
              <span className="bg-gradient-to-r from-[#0176C7] to-[#0155AD] bg-clip-text text-transparent">
                We'll Handle Your Finances
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-24">
            <div className="abt-text">
              <div className="space-y-5 mb-8">
                <p className="text-gray-600 text-[17px] leading-[1.8]">You focus on achieving your personal and business goals, while we take care of your financial needs. Our experienced team takes time to understand your situation and connects you with the most suitable loan solutions.</p>
                <p className="text-gray-600 text-[17px] leading-[1.8]">From application to approval, we ensure a smooth and transparent process with clear guidance at every step. With trusted financial partners and dedicated support, we help reduce stress and save your time.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {['Zero Commission', 'Fast Approvals', 'Expert Guidance', 'Trusted Partners'].map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                    <CheckCircle size={16} className="text-[#0197E0] flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <Link className="abt-btn inline-flex items-center gap-3 text-white px-8 py-4 rounded-2xl font-bold text-base hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                to="/services"
                style={{ background: 'linear-gradient(135deg,#0197E0,#0155AD)', boxShadow: '0 10px 30px rgba(1,151,224,0.3)' }}>
                Explore Our Services <span className="text-lg">→</span>
              </Link>
            </div>

            <div className="abt-card relative" style={{ perspective: '1200px' }}>
            <div
              className="relative rounded-3xl overflow-hidden p-8 shadow-2xl"
              style={{
                background: 'linear-gradient(145deg,#1a237e 0%,#080e38 100%)',
                boxShadow: '0 40px 80px rgba(26,35,126,0.35)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle,#0197E0,transparent)',
                  filter: 'blur(40px)',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-7">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(1,151,224,0.2)' }}
                  >
                    <Target size={22} className="text-[#0197E0]" />
                  </div>

                  <div>
                    <div className="text-white font-bold">Our Mission</div>
                    <div className="text-white/50 text-xs">
                      Empowering Financial Goals
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      label: 'Loan Processing Speed',
                      color: 'from-[#0197E0] to-[#0155AD]',
                    },
                    {
                      label: 'Client Satisfaction',
                      color: 'from-blue-400 to-indigo-400',
                    },
                    {
                      label: 'Approval Rate',
                      color: 'from-amber-400 to-orange-400',
                    },
                  ].map(({ label, color }, i) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/70">{label}</span>
                        <span className="text-white font-semibold">
                          {[92, 98, 87][i]}%
                        </span>
                      </div>

                      <div
                        className="h-2 rounded-full overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.08)' }}
                      >
                        <div
                          className={`abt-bar h-full bg-gradient-to-r ${color} rounded-full`}
                          style={{ width: 0 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-7 pt-6 flex items-center justify-between"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {/* Loans Disbursed */}
                  <div>
                    <div className="text-white text-4xl leading-none">
                      <span className="font-sans font-bold">₹</span>

                      <span className="font-sans font-extrabold">800</span>

                      <span className="relative -top-3 ml-0.5 text-[0.55em] font-bold font-sans">
                        +
                      </span>

                      <span className="font-sans font-semibold text-[0.72em] ml-1">
                        Cr
                      </span>
                    </div>

                    <div className="text-white/50 text-xs mt-1">
                      Loans Disbursed
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="text-right">
                  <div className="font-sans font-extrabold text-4xl text-[#0197E0] leading-none">
                    5
                    <span className="relative -top-3 ml-0.5 text-[0.5em] font-bold text-[#FFD700]">
                      ★
                    </span>
                  </div>

                    <div className="text-white/50 text-xs mt-1">
                      Average Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {stats.map(({ icon: Icon, val, suffix, label, color }) => (
                <div
                  key={label}
                  className="abt-stat group bg-white rounded-2xl p-6 text-center border border-gray-100/80 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-default"
                  style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>

                  <div
                    className="font-display font-black text-2xl md:text-3xl mb-1 leading-none"
                    style={{ color: '#1a237e' }}
                  >
                    {val}

                    {suffix === "+" && (
                      <span className="relative -top-2 ml-0.5 text-[0.65em] font-sans font-bold">
                        +
                      </span>
                    )}

                    {suffix === "%" && (
                      <span className="relative -top-2 ml-0.5 text-[0.65em] font-sans font-bold">
                        %
                      </span>
                    )}

                    {suffix === "Stars" && (
                      <span className="relative -top-2 ml-1 text-[0.5em] font-sans font-bold">
                        
                      </span>
                    )}

                    {suffix === "Hrs" && (
                      <span className="ml-1 text-[0.7em] font-sans font-semibold">
                        Hrs
                      </span>
                    )}
                  </div>

                  <div className="text-gray-500 text-xs font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>
        </div>
      </section>
    </div>
  );
}
