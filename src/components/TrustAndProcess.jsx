import React from 'react';
import { Zap, UserCheck, Building2, Headset, FileText, ShieldCheck, Rocket, Upload, ClipboardCheck, Medal, CheckCircle2, FilePlus2 } from 'lucide-react';

const trustCards = [
  {
    icon: <Zap size={28} className="text-[#3b82f6]" />,
    iconBg: 'bg-[#eff6ff]',
    title: '100% Transparent',
    titleColor: 'text-[#1e293b]',
    desc: 'No hidden fees or charges. What you see is what you get.'
  },
  {
    icon: <UserCheck size={28} className="text-[#22c55e]" />,
    iconBg: 'bg-[#f0fdf4]',
    title: 'Fast & Easy',
    titleColor: 'text-[#16a34a]',
    desc: 'Quick approvals with minimal documentation.'
  },
  {
    icon: <Building2 size={28} className="text-[#a855f7]" />,
    iconBg: 'bg-[#faf5ff]',
    title: '50+ Lenders',
    titleColor: 'text-[#9333ea]',
    desc: 'We compare top banks & NBFCs to get you the best offers.'
  },
  {
    icon: <Headset size={28} className="text-[#f97316]" />,
    iconBg: 'bg-[#fff7ed]',
    title: 'Expert Support',
    titleColor: 'text-[#ea580c]',
    desc: 'Dedicated experts to guide you at every step.'
  },
  {
    icon: <FileText size={28} className="text-[#0d9488]" />,
    iconBg: 'bg-[#f0fdfa]',
    title: 'Paperless Process',
    titleColor: 'text-[#0d9488]',
    desc: 'Digital application and paperless document upload.'
  },
  {
    icon: <ShieldCheck size={28} className="text-[#ef4444]" />,
    iconBg: 'bg-[#fef2f2]',
    title: 'Secure & Safe',
    titleColor: 'text-[#dc2626]',
    desc: 'Bank-level security to keep your data protected.'
  }
];

const workSteps = [
  {
    icon: <Rocket size={28} className="text-[#3b82f6]" />,
    iconBg: 'bg-[#eff6ff]',
    num: 1,
    numBg: 'bg-[#3b82f6]',
    title: 'Apply Online',
    desc: 'Fill out a simple online application in just minutes.'
  },
  {
    icon: <Upload size={28} className="text-[#22c55e]" />,
    iconBg: 'bg-[#f0fdf4]',
    num: 2,
    numBg: 'bg-[#22c55e]',
    title: 'Document Upload',
    desc: 'Upload your documents securely online.'
  },
  {
    icon: <ClipboardCheck size={28} className="text-[#a855f7]" />,
    iconBg: 'bg-[#faf5ff]',
    num: 3,
    numBg: 'bg-[#a855f7]',
    title: 'Verification',
    desc: 'Our team verifies your details quickly.'
  },
  {
    icon: <Medal size={28} className="text-[#f97316]" />,
    iconBg: 'bg-[#fff7ed]',
    num: 4,
    numBg: 'bg-[#f97316]',
    title: 'Best Match',
    desc: 'We match you with the best lenders and offers.'
  },
  {
    icon: <CheckCircle2 size={28} className="text-[#0d9488]" />,
    iconBg: 'bg-[#f0fdfa]',
    num: 5,
    numBg: 'bg-[#0d9488]',
    title: 'Approval',
    desc: 'Get quick approval from the selected lender.'
  },
  {
    icon: (
      <div className="relative">
        <FilePlus2 size={28} className="text-[#3b82f6]" />
        <div className="absolute inset-0 flex items-center justify-center mt-1">
          <span className="text-[11px] font-bold text-[#3b82f6]">₹</span>
        </div>
      </div>
    ),
    iconBg: 'bg-[#eff6ff]',
    num: 6,
    numBg: 'bg-[#3b82f6]',
    title: 'Disbursement',
    desc: 'Loan amount disbursed directly to your account.'
  }
];

export default function TrustAndProcess() {
  return (
    <section className="py-8 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0f4fa 0%, #ffffff 100%)' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Why Customers Trust Us */}
        <div className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-[32px] font-black text-[#1a237e] mb-2 tracking-tight">
              Why Customers Trust Zero Commission
            </h2>
            <p className="text-[#64748b] text-[17px]">We go the extra mile to deliver the best experience</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {trustCards.map((card, idx) => (
              <div key={idx} className="bg-white rounded-[24px] p-6 flex flex-col items-center text-center border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                <div className={`w-[72px] h-[72px] rounded-full flex items-center justify-center mb-6 ${card.iconBg}`}>
                  {card.icon}
                </div>
                <h4 className={`text-[15px] font-bold mb-3 ${card.titleColor}`}>
                  {card.title}
                </h4>
                <p className="text-[#64748b] text-[13.5px] leading-[1.6]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How We Work */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 md:p-12 mb-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-[32px] font-black text-[#1a237e] mb-2 tracking-tight">
              How We Work
            </h2>
            <p className="text-[#64748b] text-[17px]">A simple process for a hassle-free loan experience</p>
          </div>

          <div className="relative">
            {/* Dotted Lines (Desktop) */}
            <div className="hidden lg:flex absolute top-10 left-[10%] right-[10%] justify-between items-center z-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-1 flex items-center justify-center">
                  <div className="w-[60%] border-t-[1.5px] border-dashed border-[#93c5fd]"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#93c5fd] ml-1"></div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-12 relative z-10">
              {workSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="relative mb-5">
                    <div className={`w-[84px] h-[84px] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${step.iconBg}`}>
                      {step.icon}
                    </div>
                    <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold border-2 border-white ${step.numBg}`}>
                      {step.num}
                    </div>
                  </div>
                  
                  <h4 className="text-[15px] font-bold text-[#1e293b] mb-2 mt-2">
                    {step.title}
                  </h4>
                  <p className="text-[#64748b] text-[13px] leading-[1.6] max-w-[180px]">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
