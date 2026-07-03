import React from 'react';
import { Lightbulb, Handshake, Users, Trophy, Globe, Eye, Target } from 'lucide-react';

const milestones = [
  {
    year: '2022',
    yearColor: 'text-[#3b82f6]',
    icon: <Lightbulb size={26} className="text-[#3b82f6]" />,
    bg: 'bg-[#eff6ff]',
    border: 'border-[#bfdbfe]',
    desc: 'The idea of Zero Commission was born to make loans simple and transparent.'
  },
  {
    year: '2023',
    yearColor: 'text-[#1e1b4b]',
    icon: <Handshake size={26} className="text-[#22c55e]" />,
    bg: 'bg-[#f0fdf4]',
    border: 'border-[#bbf7d0]',
    desc: 'Partnered with leading banks and NBFCs to offer best deals.'
  },
  {
    year: '2024',
    yearColor: 'text-[#3b82f6]',
    icon: <Users size={26} className="text-[#a855f7]" />,
    bg: 'bg-[#faf5ff]',
    border: 'border-[#e9d5ff]',
    desc: 'Reached 10,000+ happy customers across major cities in India.'
  },
  {
    year: '2025',
    yearColor: 'text-[#f97316]',
    icon: <Trophy size={26} className="text-[#f97316]" />,
    bg: 'bg-[#fff7ed]',
    border: 'border-[#fed7aa]',
    desc: 'Crossed ₹500Cr+ in loans delivered with 50+ lending partners.'
  },
  {
    year: '2026',
    yearColor: 'text-[#06b6d4]',
    icon: <Globe size={26} className="text-[#06b6d4]" />,
    bg: 'bg-[#ecfeff]',
    border: 'border-[#a5f3fc]',
    desc: 'Expanding across India with advanced technology and stronger network.'
  }
];

export default function OurJourney() {
  return (
    <section className="py-8 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f4fa 100%)' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a237e] mb-3">Our Journey</h2>
          <p className="text-gray-400 text-sm font-medium">Milestones that define our growth</p>
        </div>

        {/* Timeline */}
        <div className="relative mb-14">
          {/* Connecting Dotted Line */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-[#c5cae9] -z-0" />

          {/* Small dot markers on the line */}
          <div className="hidden lg:flex absolute top-[40px] left-[10%] right-[10%] z-0 items-center justify-between px-[44px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-[6px] h-[6px] rounded-full bg-gray-300 flex-shrink-0" />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {milestones.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                {/* Circle Icon */}
                <div
                  className={`w-[88px] h-[88px] rounded-full flex items-center justify-center mb-5 transition-transform duration-300 group-hover:-translate-y-2 ${item.bg} border-2 ${item.border} shadow-sm`}
                >
                  {item.icon}
                </div>

                {/* Year */}
                <h3 className={`text-[17px] font-extrabold mb-3 ${item.yearColor}`}>
                  {item.year}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-[13.5px] leading-relaxed max-w-[200px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Vision Card */}
          <div className="relative bg-[#f8fafc] rounded-3xl p-8 md:p-10 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <div className="w-[72px] h-[72px] shrink-0 rounded-full bg-[#e8f0fe] flex items-center justify-center">
                <Eye size={32} className="text-[#3b82f6]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1e1b4b] mb-3 mt-1">Our Vision</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  To become India's most trusted and transparent financial platform, making loans accessible and commission-free for everyone.
                </p>
              </div>
            </div>

            {/* Target Watermark */}
            <div className="absolute -bottom-8 -right-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <Target size={220} className="text-[#3b82f6]" />
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative bg-[#f6fcf8] rounded-3xl p-8 md:p-10 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
              <div className="w-[72px] h-[72px] shrink-0 rounded-full bg-[#e6f7ec] flex items-center justify-center">
                <Target size={32} className="text-[#22c55e]" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1e1b4b] mb-3 mt-1">Our Mission</h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  To simplify the borrowing process with transparency, speed and expert guidance while ensuring the best loan solutions for our customers.
                </p>
              </div>
            </div>

            {/* Mountain / Flag Watermark */}
            <div className="absolute -bottom-6 -right-6 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-700 text-[#22c55e]">
              <svg width="200" height="200" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                {/* Mountains */}
                <polygon points="32,20 0,64 64,64" />
                <polygon points="16,36 0,64 32,64" opacity="0.7" />
                <polygon points="48,40 24,64 64,64" opacity="0.5" />
                {/* Flag pole */}
                <rect x="31" y="8" width="2" height="15" fill="currentColor" />
                {/* Flag */}
                <polygon points="33,8 48,12 33,16" fill="currentColor" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}